'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Check,
  ExternalLink,
  Gem,
  Swords,
  Target,
  Zap,
} from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { LeagueWidget } from '@/components/LeagueWidget';
import { useLevelUp } from '@/context/LevelUpContext';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { getTrackBySlug } from '@/lib/curriculum/tracks';
import { getAffiliateBySlug } from '@/lib/curriculum/affiliates';
import { l } from '@/lib/i18n/dictionaries';
import { playFeedbackSound } from '@/lib/sound';
import { cn } from '@/lib/utils';

interface TodayActivity {
  lessons: number;
  missions: number;
  xp: number;
}

export default function QuestsPage() {
  const { t, locale, state, soundEnabled, claimDailyQuest, completeActionMission, trackAffiliateClick } =
    useLevelUp();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [activity, setActivity] = useState<TodayActivity>({ lessons: 0, missions: 0, xp: 0 });
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [claiming, setClaiming] = useState<string | null>(null);

  const track = getTrackBySlug(state.activeTrackSlug);

  const loadActivity = useCallback(async () => {
    const since = new Date();
    since.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from('xp_transactions')
      .select('source, amount, created_at')
      .gte('created_at', since.toISOString());

    if (!error && Array.isArray(data)) {
      setActivity({
        lessons: data.filter((row) => row.source === 'lesson').length,
        missions: data.filter((row) => row.source === 'mission').length,
        xp: data.reduce((sum, row) => sum + (row.amount ?? 0), 0),
      });
    }
    setLoadingActivity(false);
  }, [supabase]);

  useEffect(() => {
    loadActivity();
  }, [loadActivity, state.totalXp]);

  const todayKey = new Date().toISOString().slice(0, 10);

  const dailyQuests = [
    {
      key: 'lessons-2',
      icon: BookOpen,
      color: '#58CC02',
      lip: '#58A700',
      label: t.quests.questLessons,
      progress: Math.min(2, activity.lessons),
      target: 2,
      xp: 30,
    },
    {
      key: 'xp-60',
      icon: Zap,
      color: '#FFC800',
      lip: '#E5A800',
      label: t.quests.questXp,
      progress: Math.min(60, activity.xp),
      target: 60,
      xp: 20,
    },
    {
      key: 'mission-1',
      icon: Swords,
      color: '#1CB0F6',
      lip: '#1899D6',
      label: locale === 'es' ? 'Confirma 1 tarea práctica' : 'Confirm 1 real-world task',
      progress: Math.min(1, activity.missions),
      target: 1,
      xp: 25,
    },
  ];

  const missions = track.units.flatMap((unit) =>
    unit.lessons.map((lesson) => ({ lesson, mission: lesson.actionMission }))
  );

  const onClaim = async (questKey: string, xp: number) => {
    setClaiming(questKey);
    const ok = await claimDailyQuest({ questKey, xpReward: xp });
    if (ok) playFeedbackSound('complete', soundEnabled);
    setClaiming(null);
  };

  return (
    <AppShell aside={<LeagueWidget limit={5} refreshKey={state.weeklyXp} />}>
      <header className="mb-6">
        <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.1em] text-wolf">
          <Target className="h-4 w-4 text-ecto" strokeWidth={2.8} />
          {t.quests.dailyList}
        </div>
        <h1 className="mt-1 text-[26px] font-extrabold tracking-tight text-navy sm:text-[30px]">
          {t.quests.title}
        </h1>
        <p className="mt-1 max-w-xl text-[13px] font-semibold leading-relaxed text-wolf">
          {t.quests.subtitle}
        </p>
      </header>

      {/* Daily quests — progress read from today's real XP ledger */}
      <div className="grid gap-3 sm:grid-cols-3">
        {dailyQuests.map((quest) => {
          const Icon = quest.icon;
          const done = quest.progress >= quest.target;
          const claimKey = `${todayKey}:${quest.key}`;
          const claimed = state.claimedQuestKeys.includes(claimKey);
          const pct = Math.round((quest.progress / quest.target) * 100);

          return (
            <motion.div
              key={quest.key}
              layout
              className={cn('panel p-4', claimed && 'bg-polar')}
              style={done && !claimed ? { borderColor: quest.color } : undefined}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-paper"
                  style={{ backgroundColor: quest.color, boxShadow: `0 3px 0 0 ${quest.lip}` }}
                >
                  <Icon className="h-5 w-5" strokeWidth={2.8} />
                </span>
                <div className="min-w-0">
                  <div className="truncate text-[13.5px] font-extrabold text-graphite">
                    {quest.label}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-wolf">
                    <Gem className="h-3 w-3 text-macaw" strokeWidth={3} />
                    <span className="tabular-nums text-ecto">+{quest.xp} XP</span>
                  </div>
                </div>
              </div>

              <div className="progress-track mt-3 !h-3">
                <motion.div
                  className="progress-fill"
                  style={{ backgroundColor: quest.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ type: 'spring', stiffness: 140, damping: 22 }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-bold tabular-nums text-hare">
                  {loadingActivity ? '…' : `${quest.progress}/${quest.target}`}
                </span>
                {claimed ? (
                  <span className="flex items-center gap-1 rounded-lg bg-ecto-wash px-2.5 py-1 text-[10.5px] font-extrabold uppercase tracking-wide text-ecto-dark">
                    <Check className="h-3.5 w-3.5" strokeWidth={3.4} />
                    {t.quests.claimed}
                  </span>
                ) : (
                  <button
                    type="button"
                    disabled={!done || claiming === quest.key}
                    onClick={() => onClaim(quest.key, quest.xp)}
                    className="btn-arcade !px-3.5 !py-2 !text-[11px]"
                    style={{ backgroundColor: quest.color, '--lip': quest.lip } as React.CSSProperties}
                  >
                    {done ? t.quests.claimReward : t.quests.inProgress}
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Real-world missions from the active track */}
      <section className="mt-9">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.1em] text-wolf">
              <Swords className="h-4 w-4 text-fox" strokeWidth={2.8} />
              {t.quests.missionsList}
            </div>
            <h2 className="mt-1 text-[20px] font-extrabold tracking-tight text-navy">
              {t.quests.actionMissionsSection}
            </h2>
            <p className="mt-1 text-[12.5px] font-semibold text-wolf">
              {t.quests.actionMissionsSub}
            </p>
          </div>
          <span
            className="rounded-xl px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-paper"
            style={{ backgroundColor: track.accent, boxShadow: `0 3px 0 0 ${track.accentLip}` }}
          >
            {l(track.name, locale)}
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {missions.map(({ lesson, mission }) => {
            const done = state.completedMissionIds.includes(mission.id);
            const tool = getAffiliateBySlug(mission.affiliateToolSlug);

            return (
              <motion.div
                key={mission.id}
                layout
                className={cn('panel p-4 sm:p-5', done && 'border-ecto bg-ecto-wash')}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-[10.5px] font-extrabold uppercase tracking-[0.1em] text-hare">
                      <span>{l(lesson.title, locale)}</span>
                    </div>
                    <h3 className="mt-1 text-[16px] font-extrabold leading-snug text-navy">
                      {l(mission.title, locale)}
                    </h3>
                    <p className="mt-1 text-[12.5px] font-semibold leading-relaxed text-wolf">
                      {l(mission.objective, locale)}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <span className="rounded-lg bg-bee-wash px-2 py-1 text-[11px] font-extrabold tabular-nums text-fox-dark">
                      +{mission.xpBonus} XP
                    </span>
                    <Link
                      href={`/lesson/${lesson.slug}`}
                      className="btn-ghost !px-3.5 !py-2 !text-[11px]"
                    >
                      {t.path.reviewLesson}
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={3} />
                    </Link>
                  </div>
                </div>

                <ol className="mt-3 space-y-1.5">
                  {mission.steps.map((step, i) => (
                    <li
                      key={i}
                      className="flex gap-2.5 text-[12.5px] font-semibold leading-snug text-graphite"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-polar font-mono text-[10px] font-extrabold text-wolf">
                        {i + 1}
                      </span>
                      {l(step, locale)}
                    </li>
                  ))}
                </ol>

                <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:items-center">
                  {tool && (
                    <a
                      href={tool.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      onClick={() => trackAffiliateClick(tool.slug, 'quests')}
                      className="btn-ghost flex-1 !py-2.5 !text-[11.5px]"
                    >
                      {tool.name}
                      <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.8} />
                    </a>
                  )}
                  <button
                    type="button"
                    disabled={done}
                    onClick={async () => {
                      const ok = await completeActionMission({
                        missionId: mission.id,
                        xpBonus: mission.xpBonus,
                      });
                      if (ok) playFeedbackSound('complete', soundEnabled);
                    }}
                    className={cn('btn-arcade flex-1 !py-2.5 !text-[11.5px]', done && 'opacity-70')}
                  >
                    <Check className="h-4 w-4" strokeWidth={3.2} />
                    {done ? t.lesson.missionCompleted : t.lesson.markMissionDone}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
