'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Gem, Heart, ShieldCheck, TimerReset } from 'lucide-react';
import { useLevelUp } from '@/context/LevelUpContext';
import { cn } from '@/lib/utils';

function msUntil(iso: string | null): number {
  if (!iso) return 0;
  const target = new Date(iso).getTime();
  if (Number.isNaN(target)) return 0;
  return Math.max(0, target - Date.now());
}

function mmss(ms: number): string {
  const total = Math.floor(ms / 1000);
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

export function HeartsCard() {
  const { t, locale, state, refillHeartWithGems, refreshHearts } = useLevelUp();
  const [msLeft, setMsLeft] = useState(0);
  const [refilling, setRefilling] = useState(false);

  useEffect(() => {
    setMsLeft(msUntil(state.heartsRefillAt));
  }, [state.heartsRefillAt, state.hearts]);

  useEffect(() => {
    if (msLeft <= 0) return;
    const id = setInterval(() => {
      setMsLeft((prev) => {
        const next = Math.max(0, prev - 1000);
        if (next === 0) refreshHearts();
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msLeft > 0, refreshHearts]);

  const full = state.hearts >= state.maxHearts;
  const canRefill = state.gems >= 20 && !full;

  const onRefill = async () => {
    setRefilling(true);
    await refillHeartWithGems();
    setRefilling(false);
  };

  return (
    <div
      className={cn(
        'panel p-4',
        !full && state.hearts === 0 && 'border-cardinal bg-cardinal-wash'
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.08em] text-wolf">
          <Heart className="h-4 w-4 text-cardinal" strokeWidth={2.8} />
          {t.hud.hearts}
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: state.maxHearts }).map((_, i) => (
            <motion.span
              key={i}
              animate={i < state.hearts ? { scale: 1 } : { scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 420, damping: 22 }}
              className={cn(i < state.hearts ? 'text-cardinal' : 'text-swan')}
            >
              <Heart className="h-[18px] w-[18px]" strokeWidth={2.6} fill="currentColor" />
            </motion.span>
          ))}
        </div>
      </div>

      {state.isPro ? (
        <p className="mt-3 flex items-center gap-2 text-[12.5px] font-bold text-fox-dark">
          <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={2.8} />
          {locale === 'es' ? 'Vidas ilimitadas con Super activo.' : 'Unlimited hearts with Super.'}
        </p>
      ) : full ? (
        <p className="mt-3 text-[12.5px] font-bold leading-snug text-wolf">
          {locale === 'es'
            ? 'Vidas completas. Cada fallo en una lección cuesta una vida.'
            : 'Hearts full. Every wrong answer in a lesson costs one heart.'}
        </p>
      ) : (
        <>
          <div className="mt-3 flex items-center gap-2 rounded-xl border-2 border-swan bg-polar px-3 py-2">
            <TimerReset className="h-4 w-4 shrink-0 text-macaw" strokeWidth={2.8} />
            <span className="text-[12px] font-bold text-wolf">{t.hud.refillIn}</span>
            <span className="ml-auto font-mono text-[13px] font-extrabold tabular-nums text-navy">
              {mmss(msLeft)}
            </span>
          </div>

          <button
            type="button"
            onClick={onRefill}
            disabled={!canRefill || refilling}
            className={cn('btn-arcade btn-macaw mt-3 w-full !py-2.5 !text-[12px]')}
          >
            <Gem className="h-4 w-4" strokeWidth={2.8} />
            <span className="tabular-nums">20</span>
            <span className="opacity-70">→</span>
            <Heart className="h-4 w-4" strokeWidth={2.8} fill="currentColor" />
            <span className="tabular-nums">+1</span>
          </button>

          {!canRefill && !refilling && (
            <p className="mt-2 text-center text-[11px] font-bold text-hare">
              {t.lesson.notEnoughGems}
            </p>
          )}

          {state.hearts === 0 && (
            <Link
              href="/pro"
              className="btn-arcade mt-2 w-full !bg-fox !py-2.5 !text-[12px]"
              style={{ '--lip': '#D97B00' } as React.CSSProperties}
            >
              <ShieldCheck className="h-4 w-4" strokeWidth={2.8} />
              {t.lesson.getSuper}
            </Link>
          )}
        </>
      )}
    </div>
  );
}
