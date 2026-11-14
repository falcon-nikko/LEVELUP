'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Crown,
  Gem,
  Gift,
  Lock,
  RotateCcw,
  Snowflake,
  Swords,
  Target,
  Zap,
} from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { StreakCalendar } from '@/components/StreakCalendar';
import { useLevelUp } from '@/context/LevelUpContext';
import { getLessonBySlug, getTrackBySlug } from '@/lib/curriculum/tracks';
import { buildTrackPath } from '@/lib/curriculum/path';
import { countExercises } from '@/lib/curriculum/tracks';
import { l } from '@/lib/i18n/dictionaries';

export default function PracticePage() {
  const { t, locale, state, activateXpBoost } = useLevelUp();
  const track = getTrackBySlug(state.activeTrackSlug);

  const boostActive = Boolean(
    state.xpBoostUntil && new Date(state.xpBoostUntil).getTime() > Date.now()
  );

  /** Mistake ledger grouped by the lesson that owns each exercise. */
  const mistakeGroups = useMemo(() => {
    const map = new Map<string, number>();
    for (const key of state.mistakeKeys) {
      const hash = key.indexOf('#');
      if (hash < 0) continue;
      const slug = key.slice(0, hash);
      map.set(slug, (map.get(slug) ?? 0) + 1);
    }
    return Array.from(map.entries())
      .map(([slug, count]) => ({ slug, count, lesson: getLessonBySlug(slug) }))
      .filter((row) => row.lesson)
      .sort((a, b) => b.count - a.count);
  }, [state.mistakeKeys]);

  const { chests, lessonProgress } = useMemo(() => {
    const { nodes } = buildTrackPath(
      track,
      state.completedLessonSlugs,
      state.completedMissionIds,
      state.isPro
    );
    const reviewNodes = nodes.filter((n) => n.type === 'chest' || n.type === 'boss');
    const lessons = nodes.filter((n) => n.type === 'lesson');
    const done = lessons.filter((n) => n.status === 'complete').length;
    return {
      chests: reviewNodes,
      lessonProgress: { done, total: lessons.length },
    };
  }, [state.completedLessonSlugs, state.completedMissionIds, state.isPro, track]);

  const legendary = useMemo(
    () =>
      state.legendarySlugs
        .map((slug) => getLessonBySlug(slug))
        .filter((lesson): lesson is NonNullable<typeof lesson> => Boolean(lesson)),
    [state.legendarySlugs]
  );

  const trackLessons = track.units.flatMap((unit) => unit.lessons);
  const progressPct = lessonProgress.total
    ? Math.round((lessonProgress.done / lessonProgress.total) * 100)
    : 0;

  return (
    <AppShell
      aside={
        <div className="space-y-4">
          <StreakCalendar />
        </div>
      }
    >
      <header className="mb-6">
        <h1 className="text-[26px] font-extrabold leading-tight tracking-tight text-navy">
          {t.practice.title}
        </h1>
        <p className="mt-1 max-w-xl text-[13px] font-semibold leading-relaxed text-wolf">
          {t.practice.subtitle}
        </p>
      </header>

      {/* ------------------------------ route progress ------------------- */}
      <section className="panel mb-4 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.1em] text-wolf">
            <Target className="h-4 w-4" style={{ color: track.accent }} strokeWidth={2.8} />
            {t.practice.routeProgress}
          </div>
          <span
            className="rounded-lg px-2 py-1 font-mono text-[11px] font-extrabold tabular-nums"
            style={{ backgroundColor: track.accentWash, color: track.accentLip }}
          >
            {l(track.name, locale)}
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-mono text-[28px] font-extrabold tabular-nums text-navy">
            {lessonProgress.done}
            <span className="text-[16px] text-hare">/{lessonProgress.total}</span>
          </span>
          <span className="text-[11.5px] font-bold text-wolf">{t.practice.lessonsLabel}</span>
          <span className="ml-auto font-mono text-[13px] font-extrabold tabular-nums text-wolf">
            {progressPct}%
          </span>
        </div>

        <div className="progress-track mt-2 h-4">
          <motion.div
            className="progress-fill h-full"
            style={{ backgroundColor: track.accent }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 22 }}
          />
        </div>

        <p className="mt-2.5 text-[11.5px] font-semibold text-wolf">
          {countExercises(trackLessons)} {t.practice.exercises} · {legendary.length}{' '}
          {t.practice.legendaryTitle.toLowerCase()}
        </p>
      </section>

      {/* -------------------------------- mistakes ----------------------- */}
      <section className="panel mb-4 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <RotateCcw className="h-4 w-4 text-cardinal" strokeWidth={2.8} />
          <h2 className="text-[15px] font-extrabold tracking-tight text-navy">
            {t.practice.mistakesTitle}
          </h2>
          <span className="ml-auto rounded-lg bg-cardinal-wash px-2 py-1 font-mono text-[11px] font-extrabold tabular-nums text-cardinal-dark">
            {state.mistakeKeys.length}
          </span>
        </div>
        <p className="mt-1.5 text-[12.5px] font-semibold leading-relaxed text-wolf">
          {t.practice.mistakesDesc}
        </p>

        {mistakeGroups.length > 0 ? (
          <>
            <ul className="mt-3 space-y-1.5">
              {mistakeGroups.slice(0, 5).map(({ slug, count, lesson }) => (
                <li
                  key={slug}
                  className="flex items-center gap-2.5 rounded-xl border-2 border-swan bg-paper px-3 py-2"
                >
                  <span className="min-w-0 flex-1 truncate text-[12.5px] font-bold text-graphite">
                    {lesson ? l(lesson.title, locale) : slug}
                  </span>
                  <span className="shrink-0 font-mono text-[11px] font-extrabold tabular-nums text-cardinal-dark">
                    {count} {t.practice.mistakesFrom.split(' ')[0]}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/lesson/mistakes"
              className="btn-arcade mt-3.5 w-full"
              style={
                {
                  backgroundColor: '#FF4B4B',
                  color: '#FFFFFF',
                  '--lip': '#EA2B2B',
                } as React.CSSProperties
              }
            >
              {t.practice.practiceMistakes}
              <ArrowRight className="h-4 w-4" strokeWidth={3} />
            </Link>
          </>
        ) : (
          <div className="mt-3 rounded-xl border-2 border-ecto bg-ecto-wash px-3.5 py-3">
            <div className="text-[12.5px] font-extrabold text-ecto-dark">
              {t.practice.mistakesEmpty}
            </div>
            <p className="mt-0.5 text-[12px] font-semibold leading-snug text-navy">
              {t.practice.mistakesEmptyDesc}
            </p>
          </div>
        )}
      </section>

      {/* --------------------------------- boost ------------------------- */}
      <section className="panel mb-4 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Zap className="h-4 w-4 text-bee-dark" strokeWidth={2.8} />
          <h2 className="text-[15px] font-extrabold tracking-tight text-navy">
            {t.practice.boostTitle}
          </h2>
          <span className="ml-auto flex items-center gap-1.5 rounded-lg bg-polar px-2 py-1 font-mono text-[11px] font-extrabold tabular-nums text-wolf">
            <Gem className="h-3.5 w-3.5 text-macaw" strokeWidth={3} />
            {state.gems}
          </span>
        </div>
        <p className="mt-1.5 text-[12.5px] font-semibold leading-relaxed text-wolf">
          {t.practice.boostDesc}
        </p>

        {boostActive ? (
          <div className="mt-3 flex items-center gap-2 rounded-xl border-2 border-ecto bg-ecto-wash px-3.5 py-2.5">
            <Zap className="h-4 w-4 text-ecto-dark" strokeWidth={3} />
            <span className="text-[12.5px] font-extrabold text-ecto-dark">
              {t.practice.boostActive}{' '}
              {new Date(state.xpBoostUntil!).toLocaleTimeString(locale === 'es' ? 'es-ES' : 'en-GB', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        ) : (
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
            <button
              type="button"
              disabled={state.gems < 30}
              onClick={() => {
                void activateXpBoost(15);
              }}
              className={
                state.gems < 30
                  ? 'btn-arcade pointer-events-none flex-1 opacity-45'
                  : 'btn-arcade flex-1'
              }
              style={
                {
                  backgroundColor: '#FFC800',
                  color: '#042C60',
                  '--lip': '#E5A800',
                } as React.CSSProperties
              }
            >
              <Gem className="h-4 w-4" strokeWidth={3} />
              {t.practice.boostActivate} · 30
            </button>
            {state.gems < 30 && (
              <span className="text-[11.5px] font-bold text-cardinal-dark">
                {t.practice.boostNoGems}
              </span>
            )}
          </div>
        )}
      </section>

      {/* --------------------------- chests & bosses --------------------- */}
      <section className="panel mb-4 p-4">
        <div className="flex items-center gap-2">
          <Gift className="h-4 w-4 text-bee-dark" strokeWidth={2.8} />
          <h2 className="text-[15px] font-extrabold tracking-tight text-navy">
            {t.practice.chestsTitle}
          </h2>
        </div>
        <p className="mt-1.5 text-[12.5px] font-semibold leading-relaxed text-wolf">
          {t.practice.chestsDesc}
        </p>

        <ul className="mt-3 space-y-2">
          {chests.map((node) => {
            const locked = node.status === 'locked';
            const done = node.status === 'complete';
            const isBoss = node.type === 'boss';
            return (
              <li key={node.id}>
                {locked ? (
                  <div className="flex items-center gap-3 rounded-xl border-2 border-swan bg-polar px-3.5 py-2.5">
                    <Lock className="h-4 w-4 shrink-0 text-hare" strokeWidth={3} />
                    <span className="min-w-0 flex-1 truncate text-[12.5px] font-bold text-hare">
                      {l(node.unitTitle, locale)} ·{' '}
                      {isBoss ? t.practice.boss : t.practice.chest}
                    </span>
                  </div>
                ) : (
                  <Link
                    href={`/lesson/${node.id}`}
                    className="flex items-center gap-3 rounded-xl border-2 bg-paper px-3.5 py-2.5 transition-transform hover:-translate-y-0.5"
                    style={{
                      borderColor: isBoss ? '#FF4B4B' : '#FFC800',
                      boxShadow: `0 3px 0 0 ${isBoss ? '#EA2B2B' : '#E5A800'}`,
                    }}
                  >
                    {isBoss ? (
                      <Swords className="h-4 w-4 shrink-0 text-cardinal" strokeWidth={2.8} />
                    ) : (
                      <Gift className="h-4 w-4 shrink-0 text-bee-dark" strokeWidth={2.8} />
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[12.5px] font-extrabold text-navy">
                        {l(node.unitTitle, locale)}
                      </span>
                      <span className="block text-[11px] font-semibold text-wolf">
                        {isBoss ? t.practice.boss : t.practice.chest}
                        {done ? ' · ✓' : ''}
                      </span>
                    </span>
                    <span className="shrink-0 font-mono text-[10.5px] font-extrabold uppercase tracking-wide text-wolf">
                      {t.practice.open}
                    </span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* ------------------------------ legendary ------------------------ */}
      <section className="panel mb-4 p-4">
        <div className="flex items-center gap-2">
          <Crown className="h-4 w-4 text-bee-dark" strokeWidth={2.8} />
          <h2 className="text-[15px] font-extrabold tracking-tight text-navy">
            {t.practice.legendaryTitle}
          </h2>
          <span className="ml-auto rounded-lg bg-bee-wash px-2 py-1 font-mono text-[11px] font-extrabold tabular-nums text-fox-dark">
            {legendary.length}
          </span>
        </div>
        <p className="mt-1.5 text-[12.5px] font-semibold leading-relaxed text-wolf">
          {t.practice.legendaryDesc}
        </p>

        {legendary.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {legendary.map((lesson) => (
              <li
                key={lesson.slug}
                className="flex items-center gap-1.5 rounded-xl border-2 border-bee bg-bee-wash px-2.5 py-1.5 text-[11.5px] font-extrabold text-fox-dark"
              >
                <Snowflake className="h-3 w-3" strokeWidth={3} />
                {l(lesson.title, locale)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 rounded-xl border-2 border-swan bg-polar px-3.5 py-2.5 text-[12px] font-semibold text-wolf">
            {t.practice.legendaryEmpty}
          </p>
        )}
      </section>
    </AppShell>
  );
}
