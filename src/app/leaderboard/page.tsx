'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, Info, ShieldCheck, Trophy, Users } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { useLevelUp } from '@/context/LevelUpContext';
import { useLeague } from '@/lib/supabase/league';
import { getTrackBySlug } from '@/lib/curriculum/tracks';
import { l } from '@/lib/i18n/dictionaries';
import { avatarStyle, cn, formatCountdown, initialsOf } from '@/lib/utils';

const PODIUM = [
  { color: '#FFC800', lip: '#E5A800', height: 96 },
  { color: '#C1C1C1', lip: '#A8A8A8', height: 76 },
  { color: '#FF9600', lip: '#D97B00', height: 62 },
];

const PROMOTION_CUT = 5;

export default function LeaderboardPage() {
  const { t, locale, state } = useLevelUp();
  const { rows, week, loading, secondsLeft, refresh } = useLeague(30, state.weeklyXp);

  const me = rows.find((row) => row.isSelf);
  const leaderXp = rows[0]?.weeklyXp ?? 0;

  const xpToNextPlace = useMemo(() => {
    if (!me) return null;
    const above = rows.filter((row) => row.rank === me.rank - 1)[0];
    if (!above) return null;
    return Math.max(0, above.weeklyXp - me.weeklyXp + 1);
  }, [me, rows]);

  const demotionStart = Math.max(PROMOTION_CUT, rows.length - 5);

  return (
    <AppShell
      aside={
        <div className="space-y-4">
          {/* Real personal standing */}
          <div className="panel p-4">
            <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.08em] text-wolf">
              <Trophy className="h-4 w-4 text-bee" strokeWidth={2.8} />
              {t.league.yourRank}
            </div>

            {me ? (
              <>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-[38px] font-extrabold leading-none tabular-nums text-navy">
                    #{me.rank}
                  </span>
                  <span className="pb-1 text-[12px] font-bold text-hare">/ {rows.length}</span>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-[12.5px] font-bold">
                    <span className="text-wolf">{t.league.weeklyXp}</span>
                    <span className="tabular-nums text-ecto">{me.weeklyXp} XP</span>
                  </div>
                  <div className="flex items-center justify-between text-[12.5px] font-bold">
                    <span className="text-wolf">{t.league.totalXp}</span>
                    <span className="tabular-nums text-navy">{me.totalXp} XP</span>
                  </div>
                  {xpToNextPlace !== null && (
                    <div className="flex items-center justify-between text-[12.5px] font-bold">
                      <span className="text-wolf">{t.league.rankGain}</span>
                      <span className="tabular-nums text-macaw">{xpToNextPlace} XP</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <p className="mt-2 text-[12.5px] font-semibold leading-snug text-wolf">
                {locale === 'es'
                  ? 'Completa una lección para entrar en la clasificación de esta semana.'
                  : 'Finish a lesson to join this week’s standings.'}
              </p>
            )}

            <Link href="/learn" className="btn-arcade mt-4 w-full !py-2.5 !text-[12px]">
              {locale === 'es' ? 'Sumar XP ahora' : 'Earn XP now'}
              <ArrowRight className="h-4 w-4" strokeWidth={3} />
            </Link>
          </div>

          {/* Honesty card */}
          <div className="panel-polar flex items-start gap-2.5 p-4">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-macaw" strokeWidth={2.8} />
            <p className="text-[12px] font-semibold leading-snug text-wolf">{t.league.honestNote}</p>
          </div>

          {week && (
            <div className="panel p-4">
              <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.08em] text-wolf">
                <Users className="h-4 w-4 text-ecto" strokeWidth={2.8} />
                {t.league.endsIn}
              </div>
              <div className="mt-2 font-mono text-[26px] font-extrabold tabular-nums text-navy">
                {formatCountdown(secondsLeft)}
              </div>
              <p className="mt-1 text-[12px] font-semibold text-wolf">
                {week.memberCount} {t.league.memberCount}
              </p>
              <button
                type="button"
                onClick={refresh}
                className="btn-ghost mt-3 w-full !py-2 !text-[11px]"
              >
                {locale === 'es' ? 'Actualizar' : 'Refresh'}
              </button>
            </div>
          )}
        </div>
      }
    >
      {/* Division banner */}
      <div
        className="relative overflow-hidden rounded-2xl px-5 py-5 text-paper"
        style={{ backgroundColor: '#FFC800', color: '#042C60', boxShadow: '0 5px 0 0 #E5A800' }}
      >
        <div className="bg-confetti-dots pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-paper text-bee"
              style={{ boxShadow: '0 4px 0 0 rgba(4,44,96,0.18)' }}
            >
              <Trophy className="h-7 w-7" strokeWidth={2.8} />
            </span>
            <div>
              <div className="text-[10.5px] font-extrabold uppercase tracking-[0.16em] opacity-80">
                {week?.weekKey ?? ''}
              </div>
              <h1 className="text-[24px] font-extrabold leading-tight tracking-tight">
                {t.league.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl border-2 border-navy/15 bg-paper/70 px-3.5 py-2 text-center">
              <div className="text-[9.5px] font-extrabold uppercase tracking-wider opacity-75">
                {t.league.endsIn}
              </div>
              <div className="font-mono text-[15px] font-extrabold tabular-nums">
                {formatCountdown(secondsLeft)}
              </div>
            </div>
            <div className="rounded-2xl border-2 border-navy/15 bg-paper/70 px-3.5 py-2 text-center">
              <div className="text-[9.5px] font-extrabold uppercase tracking-wider opacity-75">
                {t.league.memberCount}
              </div>
              <div className="font-mono text-[15px] font-extrabold tabular-nums">
                {week?.memberCount ?? 0}
              </div>
            </div>
          </div>
        </div>
        <p className="relative mt-3 max-w-2xl text-[12.5px] font-bold leading-snug opacity-90">
          {t.league.subtitle}
        </p>
      </div>

      {loading ? (
        <div className="panel mt-6 space-y-3 p-5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-10 w-10 animate-pulse rounded-full bg-polar" />
              <div className="h-3.5 flex-1 animate-pulse rounded-full bg-polar" />
              <div className="h-3.5 w-14 animate-pulse rounded-full bg-polar" />
            </div>
          ))}
        </div>
      ) : rows.length === 0 ? (
        /* Real empty state: nobody has earned XP yet */
        <div className="panel mt-6 flex flex-col items-center gap-3 px-6 py-12 text-center">
          <span
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-polar text-hare"
            style={{ boxShadow: '0 4px 0 0 #E5E5E5' }}
          >
            <Users className="h-8 w-8" strokeWidth={2.6} />
          </span>
          <h2 className="text-[20px] font-extrabold tracking-tight text-navy">
            {t.league.emptyTitle}
          </h2>
          <p className="max-w-sm text-[13px] font-semibold leading-relaxed text-wolf">
            {t.league.emptyDesc}
          </p>
          <Link href="/learn" className="btn-arcade mt-2">
            {t.league.emptyCta}
            <ArrowRight className="h-4 w-4" strokeWidth={3} />
          </Link>
        </div>
      ) : (
        <>
          {/* Podium */}
          <div className="mt-7 flex items-end justify-center gap-3 sm:gap-5">
            {[1, 0, 2].map((slot) => {
              const row = rows[slot];
              if (!row) return <div key={slot} className="w-[92px] sm:w-[112px]" />;
              const meta = PODIUM[slot];
              const track = getTrackBySlug(row.trackSlug);
              return (
                <motion.div
                  key={row.userId}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: slot * 0.08, type: 'spring', stiffness: 260, damping: 24 }}
                  className="flex w-[92px] flex-col items-center sm:w-[112px]"
                >
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-paper text-[15px] font-extrabold sm:h-16 sm:w-16 sm:text-[17px]"
                    style={{ ...avatarStyle(row.avatarHue), boxShadow: `0 4px 0 0 ${meta.lip}` }}
                  >
                    {initialsOf(row.displayName)}
                  </span>
                  <span className="mt-2 max-w-full truncate text-[12px] font-extrabold text-graphite">
                    {row.displayName}
                  </span>
                  <span className="text-[11px] font-bold tabular-nums" style={{ color: meta.lip }}>
                    {row.weeklyXp} XP
                  </span>
                  <span
                    className="mt-1.5 flex w-full items-start justify-center rounded-t-xl pt-2 text-[19px] font-extrabold text-paper"
                    style={{
                      backgroundColor: meta.color,
                      height: meta.height,
                      boxShadow: `inset 0 -4px 0 0 ${meta.lip}`,
                    }}
                  >
                    {slot + 1}
                  </span>
                  <span className="mt-1 max-w-full truncate text-[9.5px] font-bold uppercase tracking-wide text-hare">
                    {l(track.shortTag, locale)}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Full standings */}
          <div className="panel mt-7 overflow-hidden">
            {rows.map((row, index) => {
              const track = getTrackBySlug(row.trackSlug);
              const barPct = leaderXp > 0 ? Math.round((row.weeklyXp / leaderXp) * 100) : 0;
              const inPromotion = index < PROMOTION_CUT;
              const inDemotion = rows.length > PROMOTION_CUT && index >= demotionStart;

              return (
                <React.Fragment key={row.userId}>
                  <div
                    className={cn(
                      'relative flex items-center gap-3 px-4 py-3 transition-colors',
                      row.isSelf && 'bg-macaw-wash',
                      index > 0 && 'border-t-2 border-polar'
                    )}
                  >
                    <span
                      className={cn(
                        'w-7 shrink-0 text-center text-[14px] font-extrabold tabular-nums',
                        index < 3 ? '' : 'text-hare'
                      )}
                      style={index < 3 ? { color: PODIUM[index].lip } : undefined}
                    >
                      {row.rank}
                    </span>

                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 text-[13px] font-extrabold"
                      style={avatarStyle(row.avatarHue)}
                    >
                      {initialsOf(row.displayName)}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="truncate text-[14px] font-extrabold text-graphite">
                          {row.displayName}
                        </span>
                        {row.isSelf && (
                          <span className="rounded-md bg-macaw px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-paper">
                            {t.league.youTag}
                          </span>
                        )}
                        {row.isPro && (
                          <span className="flex items-center gap-0.5 rounded-md bg-bee-wash px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-fox-dark">
                            <ShieldCheck className="h-2.5 w-2.5" strokeWidth={3.4} />
                            Super
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="h-2 w-full max-w-[140px] overflow-hidden rounded-full bg-polar">
                          <motion.span
                            className="block h-full rounded-full"
                            style={{ backgroundColor: track.accent }}
                            initial={{ width: 0 }}
                            animate={{ width: `${barPct}%` }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                          />
                        </span>
                        <span className="flex shrink-0 items-center gap-1 text-[11px] font-bold text-fox">
                          <Flame className="h-3 w-3" strokeWidth={3} />
                          {row.streak}
                        </span>
                      </div>
                    </div>

                    <span className="shrink-0 text-[15px] font-extrabold tabular-nums text-ecto">
                      {row.weeklyXp}
                      <span className="ml-0.5 text-[10px] font-bold text-hare">XP</span>
                    </span>
                  </div>

                  {index === PROMOTION_CUT - 1 && rows.length > PROMOTION_CUT && (
                    <div className="flex items-center justify-center gap-2 border-y-2 border-ecto bg-ecto-wash px-4 py-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.1em] text-ecto-dark">
                      ↑ {t.league.promotionZone} · Top {PROMOTION_CUT} ↑
                    </div>
                  )}

                  {inDemotion && index === demotionStart && (
                    <div className="flex items-center justify-center gap-2 border-y-2 border-cardinal bg-cardinal-wash px-4 py-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.1em] text-cardinal-dark">
                      ↓ {t.league.demotionZone} ↓
                    </div>
                  )}

                  {inPromotion && rows.length <= PROMOTION_CUT && index === rows.length - 1 && (
                    <div className="border-t-2 border-ecto bg-ecto-wash px-4 py-1.5 text-center text-[10.5px] font-extrabold uppercase tracking-[0.1em] text-ecto-dark">
                      {t.league.promotionZone}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <p className="mt-4 text-center text-[11.5px] font-semibold text-hare">
            {t.league.honestNote}
          </p>
        </>
      )}
    </AppShell>
  );
}
