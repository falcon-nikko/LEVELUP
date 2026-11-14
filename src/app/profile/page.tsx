'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Award,
  BookOpen,
  Clock,
  Eye,
  EyeOff,
  Flame,
  Gem,
  Lock,
  LogOut,
  ShieldCheck,
  Swords,
  Timer,
  Trophy,
  Volume2,
  VolumeX,
  Zap,
} from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { useLevelUp } from '@/context/LevelUpContext';
import { getAllLessons } from '@/lib/curriculum/tracks';
import { avatarStyle, cn, getOperatorRank, initialsOf, OPERATOR_RANKS } from '@/lib/utils';

interface Achievement {
  id: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  color: string;
  lip: string;
  labelEs: string;
  labelEn: string;
  unlocked: boolean;
  progress: number;
  target: number;
}

export default function ProfilePage() {
  const {
    t,
    locale,
    state,
    user,
    soundEnabled,
    setSoundEnabled,
    setLocale,
    setDailyGoal,
    setShowInLeague,
    signOut,
  } = useLevelUp();

  const router = useRouter();
  const rank = getOperatorRank(state.totalXp);
  const lessonsTotal = useMemo(() => getAllLessons().length, []);

  const activity = useMemo(() => {
    const set = new Set(state.activityDates);
    const days: { iso: string; active: boolean }[] = [];
    for (let i = 27; i >= 0; i -= 1) {
      const d = new Date(Date.now() - i * 86400000);
      const iso = d.toISOString().slice(0, 10);
      days.push({ iso, active: set.has(iso) });
    }
    return days;
  }, [state.activityDates]);

  const bosses = state.completedMissionIds.filter((id) => id.startsWith('boss-')).length;
  const chests = state.completedMissionIds.filter((id) => id.startsWith('chest-')).length;
  const tracksTouched = new Set(
    state.completedLessonSlugs
      .map((slug) => getAllLessons().find((les) => les.slug === slug)?.trackSlug)
      .filter(Boolean)
  ).size;

  const achievements: Achievement[] = [
    {
      id: 'first-lesson',
      icon: BookOpen,
      color: '#58CC02',
      lip: '#58A700',
      labelEs: 'Primera lección',
      labelEn: 'First lesson',
      unlocked: state.completedLessonSlugs.length >= 1,
      progress: Math.min(1, state.completedLessonSlugs.length),
      target: 1,
    },
    {
      id: 'streak-3',
      icon: Flame,
      color: '#FF9600',
      lip: '#D97B00',
      labelEs: 'Racha de 3 días',
      labelEn: '3-day streak',
      unlocked: state.longestStreak >= 3,
      progress: Math.min(3, state.longestStreak),
      target: 3,
    },
    {
      id: 'streak-7',
      icon: Flame,
      color: '#FF4B4B',
      lip: '#EA2B2B',
      labelEs: 'Racha de 7 días',
      labelEn: '7-day streak',
      unlocked: state.longestStreak >= 7,
      progress: Math.min(7, state.longestStreak),
      target: 7,
    },
    {
      id: 'xp-250',
      icon: Zap,
      color: '#FFC800',
      lip: '#E5A800',
      labelEs: '250 XP ganados',
      labelEn: '250 XP earned',
      unlocked: state.totalXp >= 250,
      progress: Math.min(250, state.totalXp),
      target: 250,
    },
    {
      id: 'xp-1000',
      icon: Trophy,
      color: '#1CB0F6',
      lip: '#1899D6',
      labelEs: '1.000 XP ganados',
      labelEn: '1,000 XP earned',
      unlocked: state.totalXp >= 1000,
      progress: Math.min(1000, state.totalXp),
      target: 1000,
    },
    {
      id: 'boss-1',
      icon: Swords,
      color: '#FF4B4B',
      lip: '#EA2B2B',
      labelEs: 'Primer reto final',
      labelEn: 'First final challenge',
      unlocked: bosses >= 1,
      progress: Math.min(1, bosses),
      target: 1,
    },
    {
      id: 'chest-1',
      icon: Gem,
      color: '#FFC800',
      lip: '#E5A800',
      labelEs: 'Primer cofre de repaso',
      labelEn: 'First review chest',
      unlocked: chests >= 1,
      progress: Math.min(1, chests),
      target: 1,
    },
    {
      id: 'two-tracks',
      icon: Award,
      color: '#58CC02',
      lip: '#58A700',
      labelEs: 'Practica en 2 rutas',
      labelEn: 'Practice in 2 tracks',
      unlocked: tracksTouched >= 2,
      progress: Math.min(2, tracksTouched),
      target: 2,
    },
  ];

  const stats = [
    { label: t.profile.totalXp, value: state.totalXp, color: '#FFC800', lip: '#E5A800', icon: Zap },
    { label: t.profile.weeklyXp, value: state.weeklyXp, color: '#58CC02', lip: '#58A700', icon: Trophy },
    { label: t.profile.lessonsDone, value: `${state.completedLessonSlugs.length}/${lessonsTotal}`, color: '#1CB0F6', lip: '#1899D6', icon: BookOpen },
    { label: t.profile.longestStreak, value: `${state.longestStreak}d`, color: '#FF9600', lip: '#D97B00', icon: Flame },
    { label: t.profile.minutes, value: state.minutesPracticed, color: '#58CC02', lip: '#58A700', icon: Clock },
    { label: t.profile.gems, value: state.gems, color: '#1CB0F6', lip: '#1899D6', icon: Gem },
  ];

  return (
    <AppShell>
      {/* Identity card */}
      <div
        className="relative overflow-hidden rounded-2xl px-5 py-6 text-paper"
        style={{ backgroundColor: rank.accent, boxShadow: `0 5px 0 0 ${rank.lip}` }}
      >
        <div className="bg-confetti-dots pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative flex flex-wrap items-center gap-5">
          <span
            className="flex h-20 w-20 items-center justify-center rounded-3xl border-4 border-paper text-[26px] font-extrabold"
            style={avatarStyle(state.avatarHue)}
          >
            {initialsOf(state.displayName)}
          </span>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-[24px] font-extrabold leading-tight tracking-tight">
              {state.displayName || user?.email?.split('@')[0]}
            </h1>
            <p className="truncate text-[12.5px] font-bold opacity-90">{state.email}</p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-paper/25 px-2.5 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.1em]">
                {locale === 'es' ? rank.labelEs : rank.labelEn}
              </span>
              {state.isPro && (
                <span className="flex items-center gap-1 rounded-lg bg-paper px-2.5 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.1em]" style={{ color: rank.lip }}>
                  <ShieldCheck className="h-3 w-3" strokeWidth={3.2} />
                  {t.nav.proActive}
                </span>
              )}
            </div>

            <div className="mt-3 h-3 w-full max-w-sm overflow-hidden rounded-full bg-navy/15">
              <motion.div
                className="h-full rounded-full bg-paper"
                initial={{ width: 0 }}
                animate={{ width: `${rank.progressPct}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 22 }}
              />
            </div>
            <p className="mt-1.5 text-[11px] font-bold opacity-85">
              {rank.nextXp
                ? `${rank.nextXp - state.totalXp} XP · ${locale === 'es' ? 'siguiente nivel' : 'next level'}`
                : locale === 'es'
                ? 'Nivel máximo alcanzado'
                : 'Max level reached'}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <section className="mt-7">
        <h2 className="text-[13px] font-extrabold uppercase tracking-[0.1em] text-wolf">
          {t.profile.statsTitle}
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map(({ label, value, color, lip, icon: Icon }) => (
            <div
              key={label}
              className="overflow-hidden rounded-2xl border-2"
              style={{ borderColor: color, boxShadow: `0 4px 0 0 ${lip}` }}
            >
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-paper"
                style={{ backgroundColor: color }}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={3} />
                <span className="truncate">{label}</span>
              </div>
              <div className="bg-paper px-3 py-2.5 text-[20px] font-extrabold tabular-nums" style={{ color }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 28-day activity — real dates only */}
      <section className="mt-8">
        <h2 className="text-[13px] font-extrabold uppercase tracking-[0.1em] text-wolf">
          {t.profile.consistencyTitle}
        </h2>
        <div className="panel mt-3 p-4">
          {activity.every((d) => !d.active) ? (
            <p className="text-[12.5px] font-semibold text-wolf">{t.profile.noActivity}</p>
          ) : (
            <div className="grid grid-cols-[repeat(7,minmax(0,1fr))] gap-1.5 sm:grid-cols-[repeat(14,minmax(0,1fr))]">
              {activity.map((day) => (
                <motion.span
                  key={day.iso}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                  title={day.iso}
                  className={cn(
                    'aspect-square rounded-md border-2',
                    day.active ? 'border-ecto-dark bg-ecto' : 'border-swan bg-polar'
                  )}
                />
              ))}
            </div>
          )}
          <div className="mt-3 flex items-center gap-2 text-[11px] font-bold text-hare">
            <Timer className="h-3.5 w-3.5" strokeWidth={2.8} />
            {state.minutesStudiedToday} {t.common.minutes} · {t.hud.minutesToday}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="mt-8">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[13px] font-extrabold uppercase tracking-[0.1em] text-wolf">
            {t.profile.achievementsTitle}
          </h2>
          <span className="text-[11px] font-bold text-hare">
            {achievements.filter((a) => a.unlocked).length}/{achievements.length}
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {achievements.map((ach) => {
            const Icon = ach.icon;
            return (
              <div
                key={ach.id}
                className={cn('panel p-3.5 text-center', !ach.unlocked && 'bg-polar')}
                style={ach.unlocked ? { borderColor: ach.color, boxShadow: `0 4px 0 0 ${ach.lip}` } : undefined}
              >
                <span
                  className={cn(
                    'mx-auto flex h-12 w-12 items-center justify-center rounded-2xl',
                    ach.unlocked ? 'text-paper' : 'bg-swan text-hare'
                  )}
                  style={ach.unlocked ? { backgroundColor: ach.color } : undefined}
                >
                  {ach.unlocked ? <Icon className="h-6 w-6" strokeWidth={2.8} /> : <Lock className="h-5 w-5" strokeWidth={2.8} />}
                </span>
                <div className={cn('mt-2 text-[12px] font-extrabold leading-tight', ach.unlocked ? 'text-navy' : 'text-hare')}>
                  {locale === 'es' ? ach.labelEs : ach.labelEn}
                </div>
                {!ach.unlocked && (
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-swan">
                    <div
                      className="h-full rounded-full bg-hare"
                      style={{ width: `${Math.round((ach.progress / ach.target) * 100)}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Settings */}
      <section className="mt-8 mb-10">
        <h2 className="text-[13px] font-extrabold uppercase tracking-[0.1em] text-wolf">
          {t.profile.settingsTitle}
        </h2>
        <div className="panel mt-3 divide-y-2 divide-polar">
          {/* Sound */}
          <div className="flex items-center justify-between gap-4 px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-polar text-wolf">
                {soundEnabled ? <Volume2 className="h-4 w-4" strokeWidth={2.8} /> : <VolumeX className="h-4 w-4" strokeWidth={2.8} />}
              </span>
              <span className="text-[13.5px] font-extrabold text-graphite">{t.profile.soundToggle}</span>
            </div>
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={cn(
                'relative h-8 w-14 rounded-full border-2 transition-colors',
                soundEnabled ? 'border-ecto-dark bg-ecto' : 'border-swan bg-swan'
              )}
              aria-pressed={soundEnabled}
            >
              <motion.span
                layout
                transition={{ type: 'spring', stiffness: 520, damping: 32 }}
                className={cn(
                  'absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-paper',
                  soundEnabled ? 'right-1' : 'left-1'
                )}
              />
            </button>
          </div>

          {/* League privacy */}
          <div className="flex items-center justify-between gap-4 px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-polar text-wolf">
                {state.showInLeague ? <Eye className="h-4 w-4" strokeWidth={2.8} /> : <EyeOff className="h-4 w-4" strokeWidth={2.8} />}
              </span>
              <span className="text-[13.5px] font-extrabold text-graphite">{t.profile.privacySetting}</span>
            </div>
            <button
              type="button"
              onClick={() => setShowInLeague(!state.showInLeague)}
              className={cn(
                'rounded-xl border-2 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide transition-colors',
                state.showInLeague
                  ? 'border-ecto bg-ecto-wash text-ecto-dark'
                  : 'border-swan bg-polar text-wolf'
              )}
            >
              {state.showInLeague ? t.profile.privacyOn : t.profile.privacyOff}
            </button>
          </div>

          {/* Daily goal */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5">
            <span className="text-[13.5px] font-extrabold text-graphite">{t.profile.dailyGoalSetting}</span>
            <div className="flex gap-2">
              {([5, 10, 15] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setDailyGoal(g)}
                  className={cn(
                    'rounded-xl border-2 px-3 py-1.5 text-[12px] font-extrabold tabular-nums transition-transform',
                    state.dailyGoalMinutes === g
                      ? 'border-fox bg-fox-wash text-fox-dark'
                      : 'border-swan bg-paper text-wolf hover:-translate-y-0.5'
                  )}
                >
                  {g} {t.common.minutes}
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="flex items-center justify-between gap-4 px-4 py-3.5">
            <span className="text-[13.5px] font-extrabold text-graphite">{t.profile.languageSetting}</span>
            <div className="flex gap-2">
              {(['es', 'en'] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLocale(code)}
                  className={cn(
                    'rounded-xl border-2 px-3 py-1.5 text-[12px] font-extrabold uppercase transition-colors',
                    locale === code
                      ? 'border-macaw bg-macaw-wash text-macaw-dark'
                      : 'border-swan bg-paper text-wolf'
                  )}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          {/* Rank ladder */}
          <div className="px-4 py-3.5">
            <span className="text-[13.5px] font-extrabold text-graphite">{t.hud.rank}</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {OPERATOR_RANKS.map((r) => (
                <span
                  key={r.slug}
                  className={cn(
                    'rounded-xl border-2 px-2.5 py-1 text-[10.5px] font-extrabold uppercase tracking-wide',
                    r.level === rank.level ? 'text-paper' : 'border-swan bg-paper text-hare'
                  )}
                  style={r.level === rank.level ? { backgroundColor: r.accent, borderColor: r.accent } : undefined}
                >
                  {locale === 'es' ? r.labelEs : r.labelEn}
                </span>
              ))}
            </div>
          </div>

          {/* Sign out */}
          <div className="px-4 py-3.5">
            <button
              type="button"
              onClick={async () => {
                await signOut();
                router.replace('/auth');
                router.refresh();
              }}
              className="btn-ghost w-full !bg-cardinal-wash !text-cardinal-dark"
              style={{ borderColor: '#FF4B4B' }}
            >
              <LogOut className="h-4 w-4" strokeWidth={2.8} />
              {t.profile.signOut}
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-[11.5px] font-semibold text-hare">
          {locale === 'es'
            ? 'Todos los datos de esta pantalla salen de tu cuenta real en Supabase.'
            : 'Everything on this screen comes from your real account in Supabase.'}
        </p>
      </section>
    </AppShell>
  );
}
