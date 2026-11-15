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
        <h1 className="text-2xl font-black tracking-tight">Catálogo</h1>
        <p className="mt-1 text-sm text-white/55">
          {courses.length} cursos · {profile.completedLessonSlugs.length} lecciones completadas
        </p>
      </header>

      <div className="mb-5 flex flex-wrap gap-2">
        <FilterPill active={world === "all"} onClick={() => setWorld("all")} label="Todo" />
        {worlds.map((w) => (
          <FilterPill key={w.slug} active={world === w.slug} onClick={() => setWorld(w.slug)} label={w.name} color={w.color} />
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {visible.map((c) => {
          const w = worlds.find((x) => x.slug === c.world)!;
          const Icon = icons[c.world];
          const cp = courseProgress(c.slug, profile.completedLessonSlugs);
          const first = c.units[0].lessons[0].id;
          const minutes = c.units.reduce((n, u) => n + u.lessons.reduce((m, l) => m + l.minutes, 0), 0);
          const lessonCount = c.units.reduce((n, u) => n + u.lessons.length, 0);

          return (
            <Link key={c.slug} href={`/learn/${first}`} className="card group flex flex-col p-4 transition hover:border-white/20">
              <div className="flex items-start gap-2.5">
                <span
                  className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl"
                  style={{ background: `${w.color}22`, border: `1px solid ${w.color}44` }}
                >
                  <Icon className="h-4 w-4" style={{ color: w.color }} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: w.color }}>
                    {w.name} · {c.level}
                  </p>
                  <h3 className="text-[15px] font-extrabold leading-tight">{c.title}</h3>
                </div>
              </div>

              <p className="mt-2.5 text-[13px] leading-snug text-white/55">{c.shortDescription}</p>

              <p className="mt-2.5 rounded-lg border border-white/8 bg-white/[0.03] px-2.5 py-2 text-[11.5px] leading-snug text-white/50">
                <b className="text-white/70">Resultado:</b> {c.outcome}
              </p>

              <div className="mt-3 flex items-center gap-3 text-[11px] font-bold text-white/40">
                <span className="flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5" /> {lessonCount}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {minutes} min
                </span>
              </div>

              <div className="mt-auto pt-3">
                <div className="flex items-center justify-between text-[10.5px] font-bold text-white/35">
                  <span>
                    {cp.done}/{cp.total}
                  </span>
                  <span className="flex items-center gap-1 text-brand-400/80 group-hover:text-brand-300">
                    {cp.pct === 100 ? "Repasar" : cp.done > 0 ? "Continuar" : "Empezar"}
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/8">
                  <div className="h-full rounded-full" style={{ width: `${Math.max(2, cp.pct)}%`, background: w.color }} />
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
      className={`rounded-full border px-3 py-1.5 text-[12px] font-bold transition ${
        active ? "border-white/25 bg-white/12 text-white" : "border-white/10 bg-white/[0.03] text-white/50 hover:text-white/80"
      }`}
      style={active && color ? { borderColor: `${color}66`, background: `${color}22` } : undefined}
    >
      {label}
    </button>
  );
}
