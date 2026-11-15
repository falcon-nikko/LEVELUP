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
  const pct = Math.round((totalDone / curriculumStats.lessons) * 100);

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_310px]">
      <div>
        {/* cabecera de ruta */}
        <section className="border-2 border-ink bg-white p-4 shadow-hard sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-ink/50">
                Primera ruta · {today}
              </p>
              <h1 className="mt-1 font-display text-[22px] uppercase leading-[1.05] tracking-tight sm:text-[26px]">
                {next ? next.title : "Ruta completada"}
              </h1>
              <p className="mt-1.5 text-[12.5px] font-semibold text-ink/60">
                {next
                  ? `${next.courseTitle} · ${next.minutes} min · +${next.xp} XP`
                  : "Enhorabuena, ya has hecho todo el currículo actual."}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Link href={`/learn/${nextId}`} className="btn btn-primary px-5 py-3 text-[13px]">
                  Continuar <ArrowRight className="h-4 w-4" strokeWidth={3} />
                </Link>
                <Link href="/courses" className="btn btn-ghost px-4 py-3 text-[13px]">
                  <BookOpen className="h-4 w-4" strokeWidth={2.6} /> Ver cursos
                </Link>
              </div>
            </div>

            <div className="grid w-full grid-cols-3 gap-2 sm:w-auto">
              <Mini label="Lecciones" value={`${totalDone}/${curriculumStats.lessons}`} bg="var(--color-mint-brand)" />
              <Mini
                label="Racha"
                value={`${profile.streak} d`}
                bg="var(--color-pink-brand)"
                icon={<Flame className="h-3.5 w-3.5" strokeWidth={2.8} />}
              />
              <Mini label="Semana" value={`${profile.weeklyXp} XP`} bg="var(--color-yellow-brand)" />
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-[10px] font-extrabold uppercase">
              <span>Progreso de la ruta</span>
              <span className="tabular-nums">{pct}%</span>
            </div>
            <div className="progress mt-1.5">
              <span style={{ width: `${Math.max(2, pct)}%` }} />
            </div>
          </div>
        </section>

        {/* ruta */}
        <section className="mt-5">
          {courses.map((course) => {
            const world = worlds.find((w) => w.slug === course.world)!;
            const cp = courseProgress(course.slug, completed);
            return (
              <div key={course.slug} className="mb-7">
                <div className="mb-3 flex flex-wrap items-center gap-2.5 border-2 border-ink bg-cream-200 px-3 py-2.5 shadow-hard-sm">
                  <span
                    className="h-8 w-2.5 shrink-0 border-2 border-ink"
                    style={{ background: world.color }}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[9.5px] font-extrabold uppercase tracking-[0.14em]">
                      {world.name}
                    </p>
                    <h2 className="truncate font-display text-[14px] uppercase tracking-tight">
                      {course.title}
                    </h2>
                  </div>
                  <span className="shrink-0 border-2 border-ink bg-white px-1.5 py-0.5 text-[10px] font-extrabold tabular-nums">
                    {cp.done}/{cp.total}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-y-6 py-2 sm:grid-cols-4">
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

        <div className="border-2 border-ink bg-white p-3.5 shadow-hard-sm">
          <h2 className="mb-2 flex items-center gap-1.5 font-display text-[13px] uppercase tracking-tight">
            <Sparkles className="h-4 w-4" strokeWidth={2.8} /> Siguiente paso
          </h2>
          <p className="text-[12.5px] font-medium leading-snug text-ink/70">
            {next?.action ?? "Repasa una lección legendaria para consolidar."}
          </p>
          <div className="mt-3 flex items-center gap-2 border-2 border-ink bg-mint-brand px-2.5 py-2">
            <Target className="h-4 w-4 shrink-0" strokeWidth={2.8} />
            <p className="text-[11.5px] font-bold">
              Meta diaria: <b>{profile.dailyGoalMinutes} min</b>
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Mini({
  label,
  value,
  bg,
  icon,
}: {
  label: string;
  value: string;
  bg: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="border-2 border-ink px-2 py-1.5 text-center" style={{ background: bg }}>
      <p className="flex items-center justify-center gap-1 text-[13px] font-extrabold tabular-nums">
        {icon}
        {value}
      </p>
      <p className="text-[9px] font-extrabold uppercase tracking-wide">{label}</p>
    </div>
  );
}
