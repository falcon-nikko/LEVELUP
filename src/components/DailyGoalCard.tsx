'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Target } from 'lucide-react';
import { useLevelUp } from '@/context/LevelUpContext';
import { cn } from '@/lib/utils';

export function DailyGoalCard() {
  const { t, locale, state } = useLevelUp();
  const goal = state.dailyGoalMinutes;
  const done = Math.min(goal, state.minutesStudiedToday);
  const pct = goal > 0 ? Math.round((done / goal) * 100) : 0;
  const complete = pct >= 100;

  const R = 34;
  const C = 2 * Math.PI * R;

  return (
    <div className={cn('panel p-4', complete && 'border-ecto bg-ecto-wash')}>
      <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.08em] text-wolf">
        <Target className="h-4 w-4 text-ecto" strokeWidth={2.8} />
        {t.path.todayGoal}
      </div>

      <div className="mt-3 flex items-center gap-4">
        <div className="relative h-[84px] w-[84px] shrink-0">
          <svg viewBox="0 0 84 84" className="h-full w-full -rotate-90">
            <circle cx="42" cy="42" r={R} fill="none" stroke="#E5E5E5" strokeWidth="10" />
            <motion.circle
              cx="42"
              cy="42"
              r={R}
              fill="none"
              stroke={complete ? '#FF9600' : '#58CC02'}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={C}
              initial={{ strokeDashoffset: C }}
              animate={{ strokeDashoffset: C - (C * pct) / 100 }}
              transition={{ type: 'spring', stiffness: 90, damping: 20 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[19px] font-extrabold leading-none tabular-nums text-navy">
              {done}
            </span>
            <span className="text-[10px] font-bold uppercase text-hare">
              {t.hud.ofGoal} {goal}
            </span>
          </div>
        </div>

        <div className="min-w-0">
          {complete ? (
            <>
              <div className="flex items-center gap-1.5 text-[15px] font-extrabold text-fox-dark">
                <Flame className="h-[18px] w-[18px] animate-flicker" strokeWidth={2.8} />
                {t.path.goalDone}
              </div>
              <p className="mt-1 text-[12px] font-semibold leading-snug text-wolf">
                {locale === 'es'
                  ? 'Tu racha de hoy ya está asegurada. Sigue si quieres sumar XP a la liga.'
                  : "Today's streak is safe. Keep going to add XP to the league."}
              </p>
            </>
          ) : (
            <>
              <div className="text-[15px] font-extrabold text-navy">
                {goal - done} {t.path.minutesLeft}
              </div>
              <p className="mt-1 text-[12px] font-semibold leading-snug text-wolf">
                {locale === 'es'
                  ? 'Completa una lección para asegurar tu racha de hoy.'
                  : 'Finish one lesson to keep your streak alive today.'}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
