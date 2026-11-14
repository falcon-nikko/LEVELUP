'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, Trophy, Users } from 'lucide-react';
import { useLevelUp } from '@/context/LevelUpContext';
import { useLeague } from '@/lib/supabase/league';
import { avatarStyle, cn, formatCountdown, initialsOf } from '@/lib/utils';

const MEDALS = ['#FFC800', '#C1C1C1', '#FF9600'];

export function LeagueWidget({
  limit = 5,
  refreshKey = 0,
}: {
  limit?: number;
  refreshKey?: number | string;
}) {
  const { t, locale } = useLevelUp();
  const { rows, loading, secondsLeft, week } = useLeague(limit, refreshKey);

  const me = rows.find((row) => row.isSelf);

  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center justify-between gap-2 border-b-2 border-swan bg-paper px-4 py-3">
        <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.08em] text-wolf">
          <Trophy className="h-4 w-4 text-bee" strokeWidth={2.8} />
          {t.league.divisionGold}
        </div>
        {week && (
          <span className="rounded-lg border-2 border-swan bg-polar px-2 py-1 font-mono text-[10px] font-bold tabular-nums text-wolf">
            {formatCountdown(secondsLeft)}
          </span>
        )}
      </div>

      {loading ? (
        <div className="space-y-2 p-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-9 w-9 animate-pulse rounded-full bg-polar" />
              <div className="h-3 flex-1 animate-pulse rounded-full bg-polar" />
            </div>
          ))}
        </div>
      ) : rows.length === 0 ? (
        <div className="px-4 py-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-swan bg-polar">
            <Users className="h-5 w-5 text-hare" strokeWidth={2.6} />
          </div>
          <p className="mt-3 text-[13px] font-extrabold text-navy">{t.league.emptyTitle}</p>
          <p className="mx-auto mt-1 max-w-[240px] text-[12px] font-semibold leading-snug text-wolf">
            {t.league.emptyDesc}
          </p>
        </div>
      ) : (
        <>
          <ul className="divide-y-2 divide-polar">
            {rows.map((row, index) => (
              <li
                key={row.userId}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5',
                  row.isSelf && 'bg-macaw-wash'
                )}
              >
                <span
                  className={cn(
                    'w-5 shrink-0 text-center text-[13px] font-extrabold tabular-nums',
                    index < 3 ? '' : 'text-hare'
                  )}
                  style={index < 3 ? { color: MEDALS[index] } : undefined}
                >
                  {row.rank}
                </span>

                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-[12px] font-extrabold"
                  style={avatarStyle(row.avatarHue)}
                >
                  {initialsOf(row.displayName)}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5">
                    <span className="truncate text-[13px] font-extrabold text-graphite">
                      {row.displayName}
                    </span>
                    {row.isSelf && (
                      <span className="shrink-0 rounded-md bg-macaw px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-paper">
                        {t.league.youTag}
                      </span>
                    )}
                  </span>
                  {row.streak > 0 && (
                    <span className="mt-0.5 flex items-center gap-1 text-[11px] font-bold text-fox">
                      <Flame className="h-3 w-3" strokeWidth={3} />
                      {row.streak} {locale === 'es' ? 'días' : 'days'}
                    </span>
                  )}
                </span>

                <span className="shrink-0 text-[13px] font-extrabold tabular-nums text-ecto">
                  {row.weeklyXp}
                  <span className="ml-0.5 text-[10px] font-bold text-hare">XP</span>
                </span>
              </li>
            ))}
          </ul>

          <Link
            href="/leaderboard"
            className="flex items-center justify-between gap-2 border-t-2 border-swan bg-polar px-4 py-3 text-[12px] font-extrabold uppercase tracking-[0.06em] text-macaw transition-colors hover:text-macaw-dark"
          >
            {me
              ? `${t.league.yourRank}: #${me.rank}`
              : `${week?.memberCount ?? rows.length} ${t.league.memberCount}`}
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="inline-flex"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={3} />
            </motion.span>
          </Link>
        </>
      )}
    </div>
  );
}
