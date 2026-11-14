'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Check,
  Gift,
  Lock,
  MoveDown,
  Swords,
  Trophy,
} from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { DailyGoalCard } from '@/components/DailyGoalCard';
import { HeartsCard } from '@/components/HeartsCard';
import { LeagueWidget } from '@/components/LeagueWidget';
import { useLevelUp } from '@/context/LevelUpContext';
import { CAREER_TRACKS, getTrackBySlug } from '@/lib/curriculum/tracks';
import { buildTrackPath, nodeX, PathNode } from '@/lib/curriculum/path';
import { playFeedbackSound } from '@/lib/sound';
import { l } from '@/lib/i18n/dictionaries';
import { cn } from '@/lib/utils';

const PATH_W = 340;
const NODE_GAP = 104;
const NODE_SIZE = 68;
const AMPLITUDE = 74;

function nodePoint(globalIndex: number, localIndex: number) {
  return {
    cx: PATH_W / 2 + nodeX(globalIndex, AMPLITUDE),
    cy: 54 + localIndex * NODE_GAP,
  };
}

function ribbonPath(points: { cx: number; cy: number }[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].cx} ${points[0].cy}`;
  let d = `M ${points[0].cx} ${points[0].cy}`;
  for (let i = 1; i < points.length; i += 1) {
    const prev = points[i - 1];
    const cur = points[i];
    const midY = (prev.cy + cur.cy) / 2;
    d += ` C ${prev.cx} ${midY}, ${cur.cx} ${midY}, ${cur.cx} ${cur.cy}`;
  }
  return d;
}

function NodeIcon({ node }: { node: PathNode }) {
  if (node.status === 'locked') return <Lock className="h-6 w-6" strokeWidth={3} />;
  if (node.status === 'complete') return <Check className="h-7 w-7" strokeWidth={3.4} />;
  if (node.type === 'chest') return <Gift className="h-6 w-6" strokeWidth={2.8} />;
  if (node.type === 'boss') return <Swords className="h-6 w-6" strokeWidth={2.8} />;
  return <BookOpen className="h-6 w-6" strokeWidth={2.8} />;
}

export default function LearnPage() {
  const router = useRouter();
  const { t, locale, state, setActiveTrack, soundEnabled, status, profileLoaded } = useLevelUp();
  const track = getTrackBySlug(state.activeTrackSlug);

  const [lockedHint, setLockedHint] = useState<string | null>(null);
  const currentNodeRef = useRef<HTMLDivElement | null>(null);

  const { groups, nodes, currentIndex } = useMemo(
    () =>
      buildTrackPath(
        track,
        state.completedLessonSlugs,
        state.completedMissionIds,
        state.isPro
      ),
    [
      state.completedLessonSlugs,
      state.completedMissionIds,
      state.isPro,
      track,
    ]
  );

  const completedNodes = nodes.filter((n) => n.status === 'complete').length;
  const progressPct = nodes.length ? completedNodes / nodes.length : 0;

  useEffect(() => {
    if (!lockedHint) return;
    const id = setTimeout(() => setLockedHint(null), 2400);
    return () => clearTimeout(id);
  }, [lockedHint]);

  useEffect(() => {
    if (status === 'authenticated' && profileLoaded && !state.onboardingCompleted) {
      router.replace('/onboarding');
    }
  }, [profileLoaded, router, state.onboardingCompleted, status]);

  const flatIndexOf = (nodeId: string) => nodes.findIndex((n) => n.id === nodeId);

  const openNode = (node: PathNode) => {
    if (node.status === 'locked') {
      playFeedbackSound('wrong', soundEnabled);
      setLockedHint(node.id);
      return;
    }
    playFeedbackSound('click', soundEnabled);
    if (node.type === 'lesson' && node.lesson) {
      const suffix = node.status === 'complete' ? '?mode=review' : '';
      router.push(`/lesson/${node.lesson.slug}${suffix}`);
      return;
    }
    router.push(`/lesson/${node.id}`);
  };

  return (
    <AppShell
      aside={
        <div className="space-y-4">
          <DailyGoalCard />
          <LeagueWidget limit={5} refreshKey={state.weeklyXp} />
          <HeartsCard />
        </div>
      }
    >
      {/* ---------------------------- Track switcher ---------------------- */}
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.1em] text-wolf">
          <Trophy className="h-4 w-4 text-bee" strokeWidth={2.8} />
          {t.path.switchTrack}
        </div>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 lg:mx-0 lg:px-0">
          {CAREER_TRACKS.map((tr) => {
            const active = tr.slug === state.activeTrackSlug;
            return (
              <button
                key={tr.slug}
                type="button"
                onClick={() => setActiveTrack(tr.slug)}
                className={cn(
                  'relative shrink-0 rounded-2xl border-2 px-4 py-2.5 text-left transition-transform',
                  active ? 'border-transparent text-paper' : 'border-swan bg-paper text-wolf hover:-translate-y-0.5'
                )}
                style={
                  active
                    ? { backgroundColor: tr.accent, boxShadow: `0 4px 0 0 ${tr.accentLip}` }
                    : undefined
                }
              >
                <span className="block text-[10px] font-extrabold uppercase tracking-[0.12em] opacity-80">
                  {tr.badgeCode}
                </span>
                <span className="block text-[13.5px] font-extrabold">{l(tr.name, locale)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------- Path ----------------------------- */}
      <div className="mx-auto w-full max-w-[420px]">
        {groups.map((group) => {
          const startFlat = flatIndexOf(group.nodes[0]?.id ?? '');
          const points = group.nodes.map((node, localIndex) =>
            nodePoint(startFlat + localIndex, localIndex)
          );
          const height = 54 + (group.nodes.length - 1) * NODE_GAP + 70;
          const groupDone = group.nodes.every((n) => n.status === 'complete');

          return (
            <section key={group.unitSlug} className="mb-9">
              {/* Unit banner */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                className="relative overflow-hidden rounded-2xl px-5 py-4 text-paper"
                style={{
                  backgroundColor: track.accent,
                  color: track.accentInk,
                  boxShadow: `0 4px 0 0 ${track.accentLip}`,
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[10.5px] font-extrabold uppercase tracking-[0.16em] opacity-85">
                      {t.path.unitLabel} {group.unitIndex + 1}
                    </div>
                    <h2 className="mt-0.5 text-[19px] font-extrabold leading-tight">
                      {l(group.title, locale)}
                    </h2>
                    <p className="mt-1 max-w-[280px] text-[12.5px] font-semibold leading-snug opacity-90">
                      {l(group.description, locale)}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-[24px] font-extrabold leading-none tabular-nums">
                      {group.completedCount}
                      <span className="text-[15px] opacity-75">/{group.lessonCount}</span>
                    </div>
                    <div className="mt-1 text-[10px] font-extrabold uppercase tracking-wider opacity-85">
                      {t.path.lessonsLabel}
                    </div>
                  </div>
                </div>

                <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-navy/15">
                  <motion.div
                    className="h-full rounded-full bg-paper"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${group.lessonCount ? (group.completedCount / group.lessonCount) * 100 : 0}%`,
                    }}
                    transition={{ type: 'spring', stiffness: 120, damping: 22 }}
                  />
                </div>

                {groupDone && (
                  <span className="absolute right-4 top-3 rounded-lg bg-paper/90 px-2 py-1 text-[9.5px] font-extrabold uppercase tracking-wider" style={{ color: track.accentLip }}>
                    {t.path.completedLabel}
                  </span>
                )}
              </motion.div>

              {/* Winding node column */}
              <div className="relative mt-6" style={{ height }}>
                <svg
                  width={PATH_W}
                  height={height}
                  viewBox={`0 0 ${PATH_W} ${height}`}
                  className="absolute left-1/2 top-0 -translate-x-1/2"
                  aria-hidden="true"
                >
                  <path
                    d={ribbonPath(points)}
                    stroke="#E5E5E5"
                    strokeWidth="16"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <motion.path
                    d={ribbonPath(points)}
                    stroke={track.accent}
                    strokeWidth="16"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{
                      pathLength:
                        group.nodes.length > 1
                          ? group.nodes.filter((n) => n.status === 'complete').length /
                            (group.nodes.length - 1)
                          : 0,
                    }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                  />
                </svg>

                {group.nodes.map((node, localIndex) => {
                  const { cx, cy } = points[localIndex];
                  const isLocked = node.status === 'locked';
                  const isCurrent = node.status === 'current';
                  const fill =
                    node.status === 'locked'
                      ? '#E5E5E5'
                      : node.type === 'chest'
                      ? '#FFC800'
                      : node.type === 'boss'
                      ? '#FF4B4B'
                      : track.accent;
                  const lip =
                    node.status === 'locked'
                      ? '#D4D4D4'
                      : node.type === 'chest'
                      ? '#E5A800'
                      : node.type === 'boss'
                      ? '#EA2B2B'
                      : track.accentLip;
                  const ink = node.status === 'locked' ? '#AFAFAF' : '#FFFFFF';

                  return (
                    <div
                      key={node.id}
                      ref={isCurrent ? currentNodeRef : undefined}
                      className="absolute"
                      style={{
                        left: `calc(50% + ${cx - PATH_W / 2 - NODE_SIZE / 2}px)`,
                        top: cy - NODE_SIZE / 2,
                        width: NODE_SIZE,
                      }}
                    >
                      {/* Callout on the node you should play next */}
                      {isCurrent && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                          className="absolute bottom-[calc(100%+16px)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap"
                        >
                          <div
                            className="rounded-xl border-2 border-swan bg-paper px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em]"
                            style={{ color: track.accentLip, boxShadow: '0 3px 0 0 #E5E5E5' }}
                          >
                            {node.status === 'complete'
                              ? t.path.reviewLesson
                              : node.type === 'boss'
                              ? t.path.bossTitle
                              : node.type === 'chest'
                              ? t.path.chestTitle
                              : t.path.startLesson}
                          </div>
                          <div
                            className="mx-auto h-2.5 w-2.5 -translate-y-[7px] rotate-45 border-b-2 border-r-2 border-swan bg-paper"
                            aria-hidden="true"
                          />
                        </motion.div>
                      )}

                      {isCurrent && (
                        <span
                          className="absolute inset-0 animate-ring-pulse rounded-full"
                          style={{ border: `4px solid ${fill}` }}
                          aria-hidden="true"
                        />
                      )}

                      <motion.div animate={isCurrent ? { y: [0, -7, 0] } : { y: 0 }}
                        transition={
                          isCurrent
                            ? { repeat: Infinity, duration: 1.5, ease: 'easeInOut' }
                            : { type: 'spring', stiffness: 400, damping: 28 }
                        }
                      >
                        <button
                          type="button"
                          onClick={() => openNode(node)}
                          aria-label={
                            node.type === 'lesson' && node.lesson
                              ? l(node.lesson.title, locale)
                              : node.type === 'chest'
                              ? t.path.chestTitle
                              : t.path.bossTitle
                          }
                          className={cn(
                            'path-node h-[68px] w-[68px]',
                            isLocked && 'cursor-not-allowed'
                          )}
                          style={{
                            backgroundColor: fill,
                            color: ink,
                            boxShadow: `0 7px 0 0 ${lip}`,
                          }}
                        >
                          <span
                            className="pointer-events-none absolute left-3 top-2.5 h-3 w-8 rounded-full"
                            style={{ backgroundColor: 'rgba(255,255,255,0.28)' }}
                            aria-hidden="true"
                          />
                          <NodeIcon node={node} />
                        </button>
                      </motion.div>

                      {lockedHint === node.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="animate-shake absolute left-1/2 top-[calc(100%+10px)] z-10 w-[190px] -translate-x-1/2 rounded-xl border-2 border-swan bg-paper px-3 py-2 text-center text-[11.5px] font-bold leading-snug text-wolf"
                          style={{ boxShadow: '0 3px 0 0 #E5E5E5' }}
                        >
                          {node.type === 'chest' ? t.path.chestNeedsLessons : t.path.lockedLesson}
                        </motion.div>
                      )}

                      {node.status === 'complete' && node.type !== 'lesson' && (
                        <span className="pointer-events-none absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-paper bg-ecto text-paper">
                          <Check className="h-3.5 w-3.5" strokeWidth={3.6} />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        {currentIndex >= nodes.length && nodes.length > 0 && (
          <div className="panel mb-10 flex flex-col items-center gap-2 px-5 py-7 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-bee text-navy" style={{ boxShadow: '0 4px 0 0 #E5A800' }}>
              <Trophy className="h-7 w-7" strokeWidth={2.8} />
            </span>
            <h3 className="text-[17px] font-extrabold text-navy">{t.path.allUnitsDone}</h3>
            <p className="max-w-xs text-[12.5px] font-semibold leading-snug text-wolf">
              {t.path.allUnitsDoneDesc}
            </p>
          </div>
        )}
      </div>

      {/* Jump-to-current floating control */}
      {currentIndex >= 0 && currentIndex < nodes.length && (
        <button
          type="button"
          onClick={() =>
            currentNodeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
          className="lip lip-swan fixed bottom-24 right-5 z-30 flex items-center gap-2 rounded-2xl border-2 border-swan bg-paper px-4 py-2.5 text-[11.5px] font-extrabold uppercase tracking-[0.06em] text-wolf lg:bottom-8"
        >
          <MoveDown className="h-4 w-4 text-ecto" strokeWidth={3} />
          {t.path.jumpToCurrent}
          <span className="rounded-lg bg-polar px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-hare">
            {Math.round(progressPct * 100)}%
          </span>
        </button>
      )}
    </AppShell>
  );
}
