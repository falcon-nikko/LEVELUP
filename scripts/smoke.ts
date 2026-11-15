import { isCorrect, scoreLesson } from "../lib/lesson-engine";
import { allLessons, lessonMap } from "../content/curriculum";
import { emptyProfile, awardXpLocal, completeLessonLocal, isUnlocked, nextLessonId } from "../lib/progress";

// 1) Cada ejercicio se autoevalúa bien con su propia respuesta
let fails = 0;
for (const l of allLessons) for (const e of l.exercises) {
  const a: any = e.type === "multi_select" ? { kind: "multi", values: e.correct.values }
    : e.type === "ordering" ? { kind: "order", order: e.correct.order }
    : ["fill_blank","short_answer"].includes(e.type) ? { kind: "text", value: (e.correct.acceptable as string[])[0] }
    : { kind: "choice", value: e.correct.value };
  if (!isCorrect(e, a)) { fails++; console.log("FAIL", l.id, e.id, e.type); }
}
console.log("auto-evaluación fallos:", fails);

// 2) Respuestas malas no aciertan
const wrong = { kind: "choice", value: "zzz" } as any;
console.log("respuesta mala:", lessonMap.get("ms-1-1")!.exercises.map(e=>isCorrect(e, wrong)).join(","));

// 3) Flujo de perfil
let p = emptyProfile();
const l = lessonMap.get("ms-1-1")!;
const c = completeLessonLocal(p, l.id, true);
const x = awardXpLocal(c.profile, 40, 5);
console.log("xp", x.awarded.totalXp, "streak", x.awarded.streak, "gems", x.profile.gems, "semana", x.profile.weeklyXp);
console.log("desbloqueo ms-1-2 tras ms-1-1:", isUnlocked("ms-1-2", [l.id]), "| ms-1-3:", isUnlocked("ms-1-3", [l.id]));
console.log("siguiente:", nextLessonId([l.id]));
const s = scoreLesson(l.exercises, l.exercises.map(e=>({ kind:"choice", value: e.correct.value }) as any));
const s2 = scoreLesson(l.exercises, l.exercises.map(e=>(e.type==="multi_select"?{kind:"multi",values:e.correct.values}:e.type==="ordering"?{kind:"order",order:e.correct.order}:["fill_blank","short_answer"].includes(e.type)?{kind:"text",value:(e.correct.acceptable as string[])[0]}:{kind:"choice",value:e.correct.value}) as any));
console.log("score correcto:", s2);
