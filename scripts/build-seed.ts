/**
 * Genera supabase/seed.sql a partir del currículo en TypeScript.
 * Ejecutar: npm run seed:build
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { courses, worlds, unlockOrder } from "../content/curriculum";
import type { Exercise } from "../content/courses/types";

const q = (v: string) => `'${v.replace(/'/g, "''")}'`;
const json = (v: unknown) => `${q(JSON.stringify(v))}::jsonb`;
const arr = (v: string[]) => (v.length ? `ARRAY[${v.map(q).join(",")}]::text[]` : `ARRAY[]::text[]`);

const lines: string[] = [];
lines.push("-- LEVELUP · seed generado automáticamente desde content/curriculum.ts");
lines.push("-- No editar a mano. Regenerar con: npm run seed:build");
lines.push("begin;");
lines.push("");

/* ---------------------------------------------------------------- mundos */
for (const w of worlds) {
  lines.push(
    `insert into public.worlds (slug, name, description, icon, color, order_index, is_published)
values (${q(w.slug)}, ${q(w.name)}, ${q(w.description)}, ${q(w.icon)}, ${q(w.color)}, ${worlds.indexOf(w) + 1}, true)
on conflict do nothing;`,
  );
}
lines.push("");

/* ---------------------------------------------------------------- cursos */
for (const [ci, c] of courses.entries()) {
  const lessonCount = c.units.reduce((n, u) => n + u.lessons.length, 0);
  const minutes = c.units.reduce((n, u) => n + u.lessons.reduce((m, l) => m + l.minutes, 0), 0);
  lines.push(
    `insert into public.courses (world_id, slug, title, description, short_description, level, estimated_duration, units_count, lessons_count, objectives, is_published, is_premium, order_index)
select w.id, ${q(c.slug)}, ${q(c.title)}, ${q(c.description)}, ${q(c.shortDescription)}, ${q(c.level)}, ${minutes}, ${c.units.length}, ${lessonCount}, ${arr(c.units.flatMap((u) => u.objectives))}, true, false, ${ci + 1}
from public.worlds w where w.slug = ${q(c.world)}
on conflict (world_id, slug) do update set
  title = excluded.title,
  description = excluded.description,
  short_description = excluded.short_description,
  level = excluded.level,
  estimated_duration = excluded.estimated_duration,
  units_count = excluded.units_count,
  lessons_count = excluded.lessons_count,
  objectives = excluded.objectives,
  order_index = excluded.order_index;`,
  );
}
lines.push("");

/* --------------------------------------------------------------- unidades */
for (const c of courses) {
  for (const [ui, u] of c.units.entries()) {
    const xp = u.lessons.reduce((n, l) => n + l.xp, 0);
    lines.push(
      `insert into public.units (course_id, slug, title, description, objectives, order_index, xp_reward, is_published)
select c.id, ${q(u.id)}, ${q(u.title)}, ${q(u.description)}, ${arr(u.objectives)}, ${ui + 1}, ${xp}, true
from public.courses c join public.worlds w on w.id = c.world_id
where c.slug = ${q(c.slug)} and w.slug = ${q(c.world)}
on conflict (course_id, slug) do update set
  title = excluded.title, description = excluded.description, objectives = excluded.objectives,
  order_index = excluded.order_index, xp_reward = excluded.xp_reward, is_published = true;`,
    );
  }
}
lines.push("");

/* --------------------------------------------------------------- lecciones */
for (const c of courses) {
  for (const [ui, u] of c.units.entries()) {
    for (const [li, l] of u.lessons.entries()) {
      const content = {
        schema: 1,
        keyIdea: l.keyIdea,
        theory: l.theory,
        action: l.action,
        outcome: c.outcome,
        exercises: l.exercises.map((e) => ({
          id: e.id,
          type: e.type,
          prompt: e.prompt,
          options: e.options ?? null,
          correct: e.correct,
          explanation: e.explanation,
          hint: e.hint ?? null,
        })),
      };
      lines.push(
        `insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, ${q(l.id)}, ${q(l.title)}, ${q(l.description)}, ${json(content)}, ${li + 1}, ${l.minutes}, ${l.xp}, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = ${q(u.id)} and c.slug = ${q(c.slug)} and w.slug = ${q(c.world)}
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;`,
      );
    }
  }
}
lines.push("");

/* ----------------------------------------------- fila normalizada (opcional) */
lines.push("-- Espejo normalizado en public.exercises para analítica de aciertos.");
for (const c of courses) {
  for (const u of c.units) {
    for (const l of u.lessons) {
      for (const [ei, e] of l.exercises.entries()) {
        lines.push(
          `insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, ${q(e.type)}, ${q(e.prompt)}, ${e.options ? json(e.options) : "null"}, ${json(e.correct)}, ${q(e.explanation)}, ${q(e.difficulty ?? "easy")}, ${ei + 1}, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = ${q(l.id)} and u.slug = ${q(u.id)}
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = ${ei + 1}
);`,
        );
      }
    }
  }
}
lines.push("");

/* ------------------------------------------------------------ ruta de desbloqueo */
lines.push(
  `-- Ruta recomendada (orden de lecciones).
insert into public.app_config (key, value)
values ('unlock_order', ${json(unlockOrder)})
on conflict (key) do update set value = excluded.value;`,
);

lines.push("");
lines.push("commit;");

mkdirSync("supabase", { recursive: true });
writeFileSync("supabase/seed.sql", lines.join("\n") + "\n");
console.log(`supabase/seed.sql generado: ${lines.length} sentencias`);

// sanity: ejercicios sin respuesta válida
let bad = 0;
for (const c of courses)
  for (const u of c.units)
    for (const l of u.lessons)
      for (const e of l.exercises as Exercise[]) {
        const ids = (e.options ?? []).map((o) => o.id);
        const v = e.correct.value as string;
        const list = (e.correct.values ?? e.correct.order) as string[] | undefined;
        if (["multiple_choice", "simulation", "true_false"].includes(e.type) && !ids.includes(v)) bad++;
        if (list && list.some((x) => !ids.includes(x))) bad++;
      }
console.log(bad === 0 ? "OK: todas las respuestas apuntan a opciones existentes" : `AVISO: ${bad} respuestas inválidas`);
