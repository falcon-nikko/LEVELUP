'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Gem, Heart, Lock, ShieldCheck, Zap } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { useLevelUp } from '@/context/LevelUpContext';
import { playFeedbackSound } from '@/lib/sound';
import { cn } from '@/lib/utils';

type Interval = 'month' | 'year';

export default function ProPage() {
  const { t, locale, state, activateSuper, soundEnabled } = useLevelUp();
  const [interval, setInterval_] = useState<Interval>('year');
  const [activating, setActivating] = useState(false);

  const onActivate = async () => {
    setActivating(true);
    await activateSuper(interval);
    playFeedbackSound('complete', soundEnabled);
    setActivating(false);
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl">
        <header className="text-center">
          <span
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-fox text-paper"
            style={{ boxShadow: '0 5px 0 0 #D97B00' }}
          >
            <ShieldCheck className="h-8 w-8" strokeWidth={2.8} />
          </span>
          <h1 className="mt-4 text-[30px] font-extrabold uppercase tracking-tight text-navy sm:text-[36px]">
            {t.pro.title}
          </h1>
          <p className="mx-auto mt-2 max-w-md text-[13.5px] font-semibold leading-relaxed text-wolf">
            {t.pro.subtitle}
          </p>
        </header>

        {/* Interval switch */}
        <div className="mx-auto mt-7 flex w-fit gap-1 rounded-2xl border-2 border-swan bg-paper p-1">
          {(['month', 'year'] as const).map((option) => {
            const active = interval === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setInterval_(option)}
                className={cn(
                  'relative rounded-xl px-5 py-2.5 text-[12px] font-extrabold uppercase tracking-[0.06em] transition-colors',
                  active ? 'text-ecto-dark' : 'text-wolf hover:text-graphite'
                )}
              >
                {active && (
                  <motion.span
                    layoutId="intervalPill"
                    transition={{ type: 'spring', stiffness: 520, damping: 34 }}
                    className="absolute inset-0 rounded-xl bg-ecto-wash"
                  />
                )}
                <span className="relative flex items-center gap-2">
                  {option === 'month' ? t.pro.monthly : t.pro.yearly}
                  {option === 'year' && (
                    <span className="rounded-md bg-fox px-1.5 py-0.5 text-[9.5px] font-extrabold text-paper">
                      {t.pro.saveBadge}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Plan cards */}
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {/* Free */}
          <div className="panel flex flex-col p-5">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-hare">
              {t.pro.freePlan}
            </div>
            <div className="mt-2 flex items-end gap-1">
              <span className="text-[38px] font-extrabold leading-none tabular-nums text-navy">$0</span>
            </div>
            <p className="mt-2 text-[12.5px] font-semibold leading-snug text-wolf">
              {t.pro.freePlanDesc}
            </p>
            <ul className="mt-4 flex-1 space-y-2">
              {[
                { icon: Heart, text: locale === 'es' ? '5 vidas · 1 cada 20 min' : '5 hearts · 1 every 20 min' },
                { icon: Zap, text: locale === 'es' ? 'Las 4 rutas completas' : 'All 4 tracks' },
                { icon: Gem, text: locale === 'es' ? 'Liga semanal real' : 'Real weekly league' },
                { icon: Lock, text: locale === 'es' ? 'Plantillas del taller bloqueadas' : 'Workbench playbooks locked', muted: true },
              ].map((row) => {
                const Icon = row.icon;
                return (
                  <li key={row.text} className="flex items-start gap-2.5">
                    <span
                      className={cn(
                        'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                        'muted' in row && row.muted ? 'bg-swan text-hare' : 'bg-ecto-wash text-ecto-dark'
                      )}
                    >
                      <Icon className="h-3 w-3" strokeWidth={3.2} />
                    </span>
                    <span className={cn('text-[12.5px] font-bold leading-snug', 'muted' in row && row.muted ? 'text-hare' : 'text-graphite')}>
                      {row.text}
                    </span>
                  </li>
                );
              })}
            </ul>
            <Link href="/learn" className="btn-ghost mt-5 w-full !py-3 !text-[12px]">
              {locale === 'es' ? 'Seguir practicando' : 'Keep practicing'}
            </Link>
          </div>

          {/* Super */}
          <div
            className="relative flex flex-col overflow-hidden rounded-2xl border-2 p-5"
            style={{
              borderColor: '#FF9600',
              backgroundColor: '#FFF9F0',
              boxShadow: '0 5px 0 0 #D97B00',
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-fox-dark">
                  {t.pro.title}
                </div>
                <div className="mt-2 flex items-end gap-1.5">
                  <motion.span
                    key={interval}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[38px] font-extrabold leading-none tabular-nums text-navy"
                  >
                    {interval === 'year' ? '$6.58' : '$12.99'}
                  </motion.span>
                  <span className="pb-1 text-[12px] font-extrabold text-wolf">{t.pro.perMonth}</span>
                </div>
                <p className="mt-1 text-[11.5px] font-bold text-wolf">
                  {interval === 'year'
                    ? `$79 ${locale === 'es' ? 'al año' : 'per year'} · ${t.pro.billedYearly}`
                    : locale === 'es'
                    ? 'facturación mensual'
                    : 'billed monthly'}
                </p>
              </div>
              <span className="rounded-xl bg-fox px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-paper">
                {t.pro.saveBadge}
              </span>
            </div>

            <ul className="mt-4 flex-1 space-y-2">
              {t.pro.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-fox text-paper">
                    <Check className="h-3 w-3" strokeWidth={3.6} />
                  </span>
                  <span className="text-[12.5px] font-bold leading-snug text-graphite">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={onActivate}
              disabled={state.isPro || activating}
              className="btn-arcade mt-5 w-full !bg-fox"
              style={{ '--lip': '#D97B00' } as React.CSSProperties}
            >
              {state.isPro ? (
                <>
                  <Check className="h-4 w-4" strokeWidth={3.4} />
                  {t.pro.activeBadge}
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" strokeWidth={3} />
                  {t.pro.activateBtn}
                </>
              )}
            </button>

            <p className="mt-2 text-center text-[11px] font-semibold text-wolf">{t.pro.trialNote}</p>
          </div>
        </div>

        <p className="mt-6 mb-10 text-center text-[11.5px] font-semibold leading-relaxed text-hare">
          {locale === 'es'
            ? 'El plan se activa sobre tu cuenta real; la facturación se gestiona fuera de la aplicación.'
            : 'The plan is activated on your real account; billing is handled outside the app.'}
        </p>

        <div className="mb-10 flex justify-center">
          <Link href="/learn" className="btn-ghost !text-[12px]">
            {locale === 'es' ? 'Volver a la ruta' : 'Back to the path'}
            <ArrowRight className="h-4 w-4" strokeWidth={3} />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
