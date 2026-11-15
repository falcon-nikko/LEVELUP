"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Flame, Sparkles, BookOpen, Target } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { QuestPanel } from "@/components/QuestPanel";
import { PathNode } from "@/components/PathNode";
import { computeQuests } from "@/lib/quests";
import { readDailyLog } from "@/lib/daily-log";
import { todayKey, isUnlocked, nextLessonId, courseProgress } from "@/lib/progress";
import { courses, worlds, lessonMap, unlockOrder, curriculumStats } from "@/content/curriculum";

export default function LearnPage() {
  const { profile } = useAuth();
  const completed = profile.completedLessonSlugs;

  const nextId = nextLessonId(completed);
  const next = lessonMap.get(nextId);

  const today = todayKey();
  const [log, setLog] = useState({ date: today, lessons: 0, xp: 0, exercises: 0 });
  useEffect(() => setLog(readDailyLog(today)), [today, completed.length]);
  const quests = computeQuests(log, profile.activityDates.includes(today));

  const totalDone = completed.filter((id) => lessonMap.has(id)).length;

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
      <div>
        {/* cabecera de ruta */}
        <section className="card relative overflow-hidden p-5">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-500/15 blur-3xl" />
          <div className="relative flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-300/80">
                Primera ruta · {today}
              </p>
              <h1 className="mt-1.5 text-2xl font-black leading-tight tracking-tight sm:text-[28px]">
                {next ? next.title : "Ruta completada"}
              </h1>
              <p className="mt-1 text-sm text-white/55">
                {next ? `${next.courseTitle} · ${next.minutes} min · +${next.xp} XP` : "Enhorabuena, ya has hecho todo el currículo actual."}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Link href={`/learn/${nextId}`} className="btn btn-primary px-5 py-3 text-sm">
                  Continuar <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/courses" className="btn btn-ghost px-4 py-3 text-sm">
                  <BookOpen className="h-4 w-4" /> Ver cursos
                </Link>
              </div>
            </div>

            <div className="grid w-full grid-cols-3 gap-2 sm:w-auto">
              <Mini label="Lecciones" value={`${totalDone}/${curriculumStats.lessons}`} />
              <Mini label="Racha" value={`${profile.streak} d`} icon={<Flame className="h-3.5 w-3.5 text-orange-400" />} />
              <Mini label="Semana" value={`${profile.weeklyXp} XP`} />
            </div>
          </div>

          <div className="relative mt-4">
            <div className="flex items-center justify-between text-[11px] font-bold text-white/40">
              <span>Progreso de la ruta</span>
              <span>{Math.round((totalDone / curriculumStats.lessons) * 100)}%</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-300 transition-all"
                style={{ width: `${Math.max(2, (totalDone / curriculumStats.lessons) * 100)}%` }}
              />
            </div>
          </div>
        </section>

        {/* ruta */}
        <section className="mt-5">
          {courses.map((course) => {
            const world = worlds.find((w) => w.slug === course.world)!;
            const cp = courseProgress(course.slug, completed);
            return (
              <div key={course.slug} className="mb-6">
                <div className="mb-3 flex flex-wrap items-center gap-2.5 rounded-xl border border-white/8 bg-white/[0.035] px-3.5 py-3">
                  <span
                    className="h-8 w-1.5 shrink-0 rounded-full"
                    style={{ background: world.color }}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: world.color }}>
                      {world.name}
                    </p>
                    <h2 className="truncate text-[15px] font-extrabold">{course.title}</h2>
                  </div>
                  <span className="shrink-0 text-[11px] font-bold text-white/40">
                    {cp.done}/{cp.total} · {cp.pct}%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-y-5 py-2 sm:grid-cols-4">
                  {course.units.flatMap((u) => u.lessons).map((lesson, i) => {
                    const state = completed.includes(lesson.id)
                      ? "done"
                      : isUnlocked(lesson.id, completed)
                        ? "current"
                        : "locked";
                    return (
                      <PathNode
                        key={lesson.id}
                        id={lesson.id}
                        title={lesson.title}
                        index={i + unlockOrder.indexOf(lesson.id)}
                        state={state}
                        xp={lesson.xp}
                        courseColor={world.color}
                        isNext={lesson.id === nextId}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      </div>

      <aside className="grid gap-4 self-start lg:sticky lg:top-24">
        <QuestPanel quests={quests} />

        <div className="card p-4">
          <h2 className="mb-2 flex items-center gap-1.5 text-sm font-extrabold">
            <Sparkles className="h-4 w-4 text-amber-300" /> Siguiente paso
          </h2>
          <p className="text-[13px] leading-snug text-white/55">
            {next?.action ?? "Repasa una lección legendaria para consolidar."}
          </p>
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
            <Target className="h-4 w-4 shrink-0 text-brand-400" />
            <p className="text-[12px] leading-snug text-white/60">
              Meta diaria: <b className="text-white/85">{profile.dailyGoalMinutes} min</b>
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Mini({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="card-tight px-2.5 py-2 text-center">
      <p className="flex items-center justify-center gap-1 text-[13px] font-black tabular-nums">
        {icon}
        {value}
      </p>
      <p className="text-[9.5px] font-bold uppercase tracking-wider text-white/40">{label}</p>
    </div>
  );
}
