"use client";

import Link from "next/link";
import { useState } from "react";
import { Clock, Layers, ArrowRight, Bot, Briefcase, Code2, TrendingUp } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { courses, worlds } from "@/content/curriculum";
import { courseProgress } from "@/lib/progress";

const icons = { programming: Code2, business: Briefcase, ai: Bot, finance: TrendingUp } as const;

export default function CoursesPage() {
  const { profile } = useAuth();
  const [world, setWorld] = useState<string>("all");

  const visible = courses.filter((c) => world === "all" || c.world === world);

  return (
    <div>
      <header className="mb-4">
        <h1 className="font-display text-[26px] uppercase leading-none tracking-tight">Catálogo</h1>
        <p className="mt-2 text-[12.5px] font-semibold text-ink/60">
          {courses.length} cursos · {profile.completedLessonSlugs.length} lecciones completadas
        </p>
      </header>

      <div className="mb-5 flex flex-wrap gap-2">
        <FilterPill active={world === "all"} onClick={() => setWorld("all")} label="Todo" />
        {worlds.map((w) => (
          <FilterPill
            key={w.slug}
            active={world === w.slug}
            onClick={() => setWorld(w.slug)}
            label={w.name}
            color={w.color}
          />
        ))}
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        {visible.map((c) => {
          const w = worlds.find((x) => x.slug === c.world)!;
          const Icon = icons[c.world];
          const cp = courseProgress(c.slug, profile.completedLessonSlugs);
          const first = c.units[0].lessons[0].id;
          const minutes = c.units.reduce(
            (n, u) => n + u.lessons.reduce((m, l) => m + l.minutes, 0),
            0,
          );
          const lessonCount = c.units.reduce((n, u) => n + u.lessons.length, 0);

          return (
            <Link
              key={c.slug}
              href={`/learn/${first}`}
              className="group flex flex-col border-2 border-ink bg-white p-4 shadow-hard transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-2.5">
                <span
                  className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center border-2 border-ink"
                  style={{ background: `${w.color}66` }}
                >
                  <Icon className="h-4 w-4" strokeWidth={2.8} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[9.5px] font-extrabold uppercase tracking-[0.12em] text-ink/55">
                    {w.name} · {c.level}
                  </p>
                  <h3 className="font-display text-[14.5px] uppercase leading-tight tracking-tight">
                    {c.title}
                  </h3>
                </div>
              </div>

              <p className="mt-2.5 text-[12.5px] font-medium leading-snug text-ink/70">
                {c.shortDescription}
              </p>

              <p className="mt-2.5 border-2 border-ink bg-cream-200 px-2.5 py-2 text-[11.5px] font-medium leading-snug">
                <b className="font-extrabold uppercase">Resultado:</b> {c.outcome}
              </p>

              <div className="mt-3 flex items-center gap-3 text-[10.5px] font-extrabold uppercase">
                <span className="flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5" strokeWidth={2.8} /> {lessonCount}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" strokeWidth={2.8} /> {minutes} min
                </span>
              </div>

              <div className="mt-auto pt-3">
                <div className="flex items-center justify-between text-[10.5px] font-extrabold uppercase">
                  <span className="tabular-nums">
                    {cp.done}/{cp.total}
                  </span>
                  <span className="flex items-center gap-1">
                    {cp.pct === 100 ? "Repasar" : cp.done > 0 ? "Continuar" : "Empezar"}
                    <ArrowRight className="h-3 w-3" strokeWidth={3} />
                  </span>
                </div>
                <div className="progress mt-1.5 h-2">
                  <span style={{ width: `${Math.max(2, cp.pct)}%` }} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  label,
  color,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`border-2 border-ink px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide transition ${
        active ? "shadow-hard-sm" : "bg-white hover:bg-cream-200"
      }`}
      style={active ? { background: color ? `${color}88` : "var(--color-yellow-brand)" } : undefined}
    >
      {label}
    </button>
  );
}
