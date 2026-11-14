'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  Briefcase,
  Check,
  Code2,
  Flame,
  Loader2,
  ShoppingBag,
} from 'lucide-react';
import { BrandMark } from '@/components/BrandMark';
import { useLevelUp, ExperienceLevel } from '@/context/LevelUpContext';
import { CAREER_TRACKS } from '@/lib/curriculum/tracks';
import { TrackSlug } from '@/lib/curriculum/affiliates';
import { l } from '@/lib/i18n/dictionaries';
import { playFeedbackSound } from '@/lib/sound';
import { cn } from '@/lib/utils';

const TRACK_ICONS: Record<TrackSlug, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  'ai-automation': Bot,
  'modern-coding': Code2,
  'smart-dropshipping': ShoppingBag,
  'digital-agency': Briefcase,
};

const LEVELS: ExperienceLevel[] = ['beginner', 'intermediate', 'advanced'];
const GOALS: (5 | 10 | 15)[] = [5, 10, 15];

export default function OnboardingPage() {
  const router = useRouter();
  const { t, locale, state, status, profileLoaded, completeOnboarding, soundEnabled, setDailyGoal } =
    useLevelUp();

  const [step, setStep] = useState(0);
  const [trackSlug, setTrackSlug] = useState<TrackSlug>(state.activeTrackSlug);
  const [level, setLevel] = useState<ExperienceLevel>(state.experienceLevel);
  const [goal, setGoal] = useState<5 | 10 | 15>(state.dailyGoalMinutes);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/auth');
    if (status === 'authenticated' && profileLoaded && state.onboardingCompleted) {
      router.replace('/learn');
    }
  }, [profileLoaded, router, state.onboardingCompleted, status]);

  const trackMeta = useMemo(
    () => CAREER_TRACKS.find((tr) => tr.slug === trackSlug) ?? CAREER_TRACKS[0],
    [trackSlug]
  );

  const finish = async () => {
    setSaving(true);
    await completeOnboarding({
      trackSlug,
      experienceLevel: level,
      dailyGoalMinutes: goal,
    });
    playFeedbackSound('complete', soundEnabled);
    router.push('/learn');
    router.refresh();
  };

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <Loader2 className="h-6 w-6 animate-spin text-ecto" strokeWidth={3} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-polar">
      <header className="border-b-2 border-swan bg-paper">
        <div className="mx-auto flex h-[68px] w-full max-w-3xl items-center justify-between gap-4 px-4 sm:px-6">
          <BrandMark size="sm" withLabel />
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-bold tabular-nums text-hare">
              {t.onboarding.stepOf} {step + 1} {t.onboarding.of} 3
            </span>
            <div className="h-3 w-28 overflow-hidden rounded-full bg-swan sm:w-40">
              <motion.div
                className="h-full rounded-full bg-ecto"
                animate={{ width: `${((step + 1) / 3) * 100}%` }}
                transition={{ type: 'spring', stiffness: 180, damping: 24 }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 26 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -26 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {step === 0 && (
            <>
              <h1 className="text-[26px] font-extrabold tracking-tight text-navy sm:text-[30px]">
                {t.onboarding.step1Title}
              </h1>
              <p className="mt-1.5 max-w-lg text-[13px] font-semibold leading-relaxed text-wolf">
                {t.onboarding.step1Sub}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {CAREER_TRACKS.map((tr) => {
                  const Icon = TRACK_ICONS[tr.slug];
                  const active = tr.slug === trackSlug;
                  return (
                    <button
                      key={tr.slug}
                      type="button"
                      onClick={() => {
                        setTrackSlug(tr.slug);
                        playFeedbackSound('click', soundEnabled);
                      }}
                      className={cn(
                        'relative rounded-2xl border-2 p-4 text-left transition-transform',
                        active ? 'border-transparent' : 'border-swan bg-paper hover:-translate-y-0.5'
                      )}
                      style={
                        active
                          ? { backgroundColor: tr.accent, boxShadow: `0 5px 0 0 ${tr.accentLip}` }
                          : { boxShadow: '0 4px 0 0 #E5E5E5' }
                      }
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2',
                            active ? 'border-paper/60 bg-paper/25 text-paper' : 'border-swan bg-polar'
                          )}
                          style={!active ? { color: tr.accent } : undefined}
                        >
                          <Icon className="h-6 w-6" strokeWidth={2.6} />
                        </span>
                        <div className="min-w-0">
                          <div
                            className={cn(
                              'text-[10px] font-extrabold uppercase tracking-[0.12em]',
                              active ? 'text-paper/85' : 'text-hare'
                            )}
                          >
                            {tr.badgeCode}
                          </div>
                          <div
                            className={cn(
                              'text-[15px] font-extrabold leading-tight',
                              active ? 'text-paper' : 'text-navy'
                            )}
                          >
                            {l(tr.name, locale)}
                          </div>
                        </div>
                        {active && (
                          <span className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-paper text-ecto">
                            <Check className="h-4 w-4" strokeWidth={3.4} />
                          </span>
                        )}
                      </div>
                      <p
                        className={cn(
                          'mt-3 text-[12px] font-semibold leading-snug',
                          active ? 'text-paper/90' : 'text-wolf'
                        )}
                      >
                        {l(tr.shortTag, locale)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h1 className="text-[26px] font-extrabold tracking-tight text-navy sm:text-[30px]">
                {t.onboarding.step2Title}
              </h1>
              <p className="mt-1.5 max-w-lg text-[13px] font-semibold leading-relaxed text-wolf">
                {t.onboarding.step2Sub}
              </p>

              <div className="mt-6 space-y-3">
                {LEVELS.map((lv) => {
                  const active = lv === level;
                  const copy = t.onboarding.levels[lv];
                  return (
                    <button
                      key={lv}
                      type="button"
                      onClick={() => {
                        setLevel(lv);
                        playFeedbackSound('click', soundEnabled);
                      }}
                      className={cn(
                        'flex w-full items-center gap-4 rounded-2xl border-2 px-4 py-4 text-left transition-transform',
                        active
                          ? 'border-macaw bg-macaw-wash'
                          : 'border-swan bg-paper hover:-translate-y-0.5'
                      )}
                      style={{ boxShadow: `0 4px 0 0 ${active ? '#1899D6' : '#E5E5E5'}` }}
                    >
                      <span
                        className={cn(
                          'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2',
                          active ? 'border-macaw bg-macaw text-paper' : 'border-swan bg-polar text-hare'
                        )}
                      >
                        {active ? <Check className="h-4 w-4" strokeWidth={3.4} /> : null}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[15px] font-extrabold text-navy">
                          {copy.title}
                        </span>
                        <span className="mt-0.5 block text-[12.5px] font-semibold leading-snug text-wolf">
                          {copy.desc}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-[26px] font-extrabold tracking-tight text-navy sm:text-[30px]">
                {t.onboarding.step3Title}
              </h1>
              <p className="mt-1.5 max-w-lg text-[13px] font-semibold leading-relaxed text-wolf">
                {t.onboarding.step3Sub}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {GOALS.map((g) => {
                  const active = g === goal;
                  const copy = t.onboarding.goals[g];
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => {
                        setGoal(g);
                        setDailyGoal(g);
                        playFeedbackSound('click', soundEnabled);
                      }}
                      className={cn(
                        'rounded-2xl border-2 p-4 text-center transition-transform',
                        active ? 'border-fox bg-fox-wash' : 'border-swan bg-paper hover:-translate-y-0.5'
                      )}
                      style={{ boxShadow: `0 4px 0 0 ${active ? '#D97B00' : '#E5E5E5'}` }}
                    >
                      <div className="flex items-center justify-center gap-1.5">
                        {active && <Flame className="h-4 w-4 text-fox" strokeWidth={2.8} />}
                        <span
                          className={cn(
                            'text-[26px] font-extrabold tabular-nums',
                            active ? 'text-fox-dark' : 'text-navy'
                          )}
                        >
                          {copy.label}
                        </span>
                      </div>
                      <div
                        className={cn(
                          'mt-1 text-[10.5px] font-extrabold uppercase tracking-[0.1em]',
                          active ? 'text-fox-dark' : 'text-hare'
                        )}
                      >
                        {copy.tag}
                      </div>
                      <p className="mt-2 text-[12px] font-semibold leading-snug text-wolf">
                        {copy.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="panel mt-6 flex items-start gap-3 p-4">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-paper"
                  style={{
                    backgroundColor: trackMeta.accent,
                    color: trackMeta.accentInk,
                    boxShadow: `0 3px 0 0 ${trackMeta.accentLip}`,
                  }}
                >
                  <Check className="h-5 w-5" strokeWidth={3} />
                </span>
                <div>
                  <div className="text-[14px] font-extrabold text-navy">{t.onboarding.welcome}</div>
                  <p className="mt-0.5 text-[12.5px] font-semibold leading-snug text-wolf">
                    {t.onboarding.welcomeSub} {l(trackMeta.name, locale)} · {goal} {t.common.minutes}/
                    {locale === 'es' ? 'día' : 'day'}.
                  </p>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </main>

      <footer className="border-t-2 border-swan bg-paper">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-3 px-4 py-4 sm:px-6">
          {step > 0 && (
            <button type="button" onClick={() => setStep(step - 1)} className="btn-ghost !px-5">
              {t.onboarding.back}
            </button>
          )}
          <button
            type="button"
            onClick={() => (step < 2 ? setStep(step + 1) : finish())}
            disabled={saving}
            className="btn-arcade flex-1"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={3} />
            ) : step < 2 ? (
              <>
                {t.onboarding.next}
                <ArrowRight className="h-4 w-4" strokeWidth={3} />
              </>
            ) : (
              <>
                {t.onboarding.finishBtn}
                <ArrowRight className="h-4 w-4" strokeWidth={3} />
              </>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
}
