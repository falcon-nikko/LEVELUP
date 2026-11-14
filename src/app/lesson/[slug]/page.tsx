'use client';

import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  ExternalLink,
  Gem,
  Heart,
  Lightbulb,
  Loader2,
  RotateCcw,
  Swords,
  Trophy,
  X,
  Zap,
} from 'lucide-react';
import { useLevelUp } from '@/context/LevelUpContext';
import {
  CAREER_TRACKS,
  CurriculumLesson,
  LessonExercise,
  ActionMission,
  getLessonBySlug,
} from '@/lib/curriculum/tracks';
import { getAffiliateBySlug } from '@/lib/curriculum/affiliates';
import { LocalizedText, l } from '@/lib/i18n/dictionaries';
import { playFeedbackSound } from '@/lib/sound';
import { cn } from '@/lib/utils';

type SessionKind = 'lesson' | 'chest' | 'boss';

interface SessionExercise extends LessonExercise {
  sourceLessonSlug: string;
  key: string;
}

interface Session {
  kind: SessionKind;
  id: string;
  unitSlug: string;
  trackSlug: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  accent: string;
  accentLip: string;
  accentInk: string;
  exercises: SessionExercise[];
  mission?: ActionMission;
  bonusXp: number;
  bonusGems: number;
  xpMultiplier: number;
  durationMin: number;
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function findUnit(unitSlug: string) {
  for (const track of CAREER_TRACKS) {
    const unit = track.units.find((u) => u.slug === unitSlug);
    if (unit) return { track, unit };
  }
  return null;
}

function buildSession(slug: string, reviewMode: boolean): Session | null {
  const lesson = getLessonBySlug(slug);

  if (lesson) {
    const track = CAREER_TRACKS.find((t) => t.slug === lesson.trackSlug)!;
    return {
      kind: 'lesson',
      id: lesson.slug,
      unitSlug: lesson.unitSlug,
      trackSlug: track.slug,
      title: lesson.title,
      subtitle: lesson.subtitle,
      accent: track.accent,
      accentLip: track.accentLip,
      accentInk: track.accentInk,
      exercises: lesson.exercises.map((ex, i) => ({
        ...ex,
        sourceLessonSlug: lesson.slug,
        key: `${lesson.slug}-${ex.id}-${i}`,
      })),
      mission: lesson.actionMission,
      bonusXp: 0,
      bonusGems: 0,
      xpMultiplier: reviewMode ? 0.4 : 1,
      durationMin: lesson.durationMin,
    };
  }

  if (slug.startsWith('chest-') || slug.startsWith('boss-')) {
    const isBoss = slug.startsWith('boss-');
    const unitSlug = slug.slice(isBoss ? 5 : 6);
    const found = findUnit(unitSlug);
    if (!found) return null;
    const { track, unit } = found;

    const pool: SessionExercise[] = unit.lessons.flatMap((l2: CurriculumLesson) =>
      l2.exercises.map((ex, i) => ({
        ...ex,
        sourceLessonSlug: l2.slug,
        key: `${l2.slug}-${ex.id}-${i}`,
      }))
    );

    const picked = shuffle(pool).slice(0, isBoss ? 6 : 4);

    return {
      kind: isBoss ? 'boss' : 'chest',
      id: slug,
      unitSlug: unit.slug,
      trackSlug: track.slug,
      title: isBoss
        ? { es: `Reto final · ${unit.title.es}`, en: `Final challenge · ${unit.title.en}` }
        : { es: `Cofre de repaso · ${unit.title.es}`, en: `Review chest · ${unit.title.en}` },
      subtitle: unit.description,
      accent: isBoss ? '#FF4B4B' : '#FFC800',
      accentLip: isBoss ? '#EA2B2B' : '#E5A800',
      accentInk: isBoss ? '#FFFFFF' : '#042C60',
      exercises: picked,
      mission: isBoss ? unit.lessons[0]?.actionMission : undefined,
      bonusXp: isBoss ? 25 : 0,
      bonusGems: isBoss ? 15 : 10,
      xpMultiplier: 1,
      durationMin: isBoss ? 10 : 5,
    };
  }

  return null;
}

function LessonPlayer() {
  const params = useParams<{ slug: string }>();
  const search = useSearchParams();
  const router = useRouter();
  const reviewMode = search.get('mode') === 'review';

  const {
    t,
    locale,
    state,
    soundEnabled,
    consumeHeart,
    completeLesson,
    completeActionMission,
    trackAffiliateClick,
  } = useLevelUp();

  const [session, setSession] = useState<Session | null>(null);
  const [queue, setQueue] = useState<SessionExercise[]>([]);
  const [cursor, setCursor] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [placedPieces, setPlacedPieces] = useState<string[]>([]);
  const [verdict, setVerdict] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showHint, setShowHint] = useState(false);
  const [shakeToken, setShakeToken] = useState(0);
  const [mistakes, setMistakes] = useState<string[]>([]);
  const [firstTryHits, setFirstTryHits] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [xpBank, setXpBank] = useState(0);
  const [outOfHearts, setOutOfHearts] = useState(false);
  const [quitOpen, setQuitOpen] = useState(false);
  const [finished, setFinished] = useState(false);
  const [summary, setSummary] = useState<{
    xp: number;
    gems: number;
    accuracy: number;
    streak: number;
  } | null>(null);
  const [missionDone, setMissionDone] = useState(false);
  const startedAt = useRef<number>(Date.now());

  /* ------------------------------ session boot -------------------------- */
  useEffect(() => {
    const built = buildSession(params.slug, reviewMode);
    if (!built) return;
    setSession(built);
    setQueue(built.exercises);
    setCursor(0);
    startedAt.current = Date.now();
    setMissionDone(
      built.mission ? state.completedMissionIds.includes(built.mission.id) : false
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug, reviewMode]);

  const current = queue[cursor];
  const totalSteps = Math.max(1, session?.exercises.length ?? 1) + mistakes.length;
  const answeredSteps = Math.min(totalSteps, cursor + (verdict === 'idle' ? 0 : 1));
  const progressPct = Math.round((answeredSteps / totalSteps) * 100);

  const isOrdering = current?.format === 'ordering';
  const canCheck = isOrdering
    ? placedPieces.length === (current?.pieces?.length ?? 0)
    : Boolean(selectedOption);

  /* -------------------------------- checking ---------------------------- */
  const evaluate = useCallback((): boolean => {
    if (!current) return false;
    if (current.format === 'ordering') {
      const expected = current.correctOrderIds ?? [];
      return (
        placedPieces.length === expected.length &&
        placedPieces.every((id, i) => id === expected[i])
      );
    }
    return selectedOption === current.correctOptionId;
  }, [current, placedPieces, selectedOption]);

  const resetAnswerState = () => {
    setSelectedOption(null);
    setPlacedPieces([]);
    setVerdict('idle');
    setShowHint(false);
  };

  const advance = useCallback(() => {
    resetAnswerState();
    if (cursor + 1 >= queue.length) {
      setFinished(true);
      return;
    }
    setCursor((c) => c + 1);
  }, [cursor, queue.length]);

  const onCheck = useCallback(async () => {
    if (!current || verdict !== 'idle' || !canCheck) return;

    const correct = evaluate();
    setAttempts((a) => a + 1);
    playFeedbackSound(correct ? 'correct' : 'wrong', soundEnabled);

    if (correct) {
      setVerdict('correct');
      if (!mistakes.includes(current.key)) {
        setFirstTryHits((n) => n + 1);
        setXpBank((xp) => xp + current.xpReward);
      } else {
        setXpBank((xp) => xp + Math.round(current.xpReward * 0.5));
      }
      return;
    }

    setVerdict('wrong');
    setShakeToken((s) => s + 1);
    if (!mistakes.includes(current.key)) {
      setMistakes((m) => [...m, current.key]);
      setQueue((q) => [...q, current]);
    }

    const remaining = await consumeHeart();
    if (remaining <= 0) setOutOfHearts(true);
  }, [canCheck, consumeHeart, current, evaluate, mistakes, soundEnabled, verdict]);

  /* ------------------------------ completion ---------------------------- */
  useEffect(() => {
    if (!finished || !session || summary) return;

    const accuracy = attempts > 0 ? Math.round((firstTryHits / attempts) * 100) : 100;
    const elapsedMin = Math.max(
      1,
      Math.min(session.durationMin, Math.round((Date.now() - startedAt.current) / 60000))
    );

    const run = async () => {
      const baseXp = Math.round(
        (xpBank + session.bonusXp) * session.xpMultiplier
      );

      if (session.kind === 'lesson') {
        await completeLesson({
          lessonSlug: session.id,
          xpEarned: baseXp,
          durationMin: elapsedMin,
        });
      } else {
        await completeActionMission({ missionId: session.id, xpBonus: baseXp });
      }

      const activeToday = state.activityDates.includes(new Date().toISOString().slice(0, 10));
      setSummary({
        xp: baseXp,
        gems: session.bonusGems,
        accuracy,
        streak: activeToday ? state.streakDays : state.streakDays + 1,
      });
    };

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  /* ------------------------------- keyboard ----------------------------- */
  useEffect(() => {
    const onKey = async (e: KeyboardEvent) => {
      if (quitOpen || outOfHearts) {
        if (e.key === 'Escape') setQuitOpen(false);
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        setQuitOpen(true);
        return;
      }

      if (finished) {
        if (e.key === 'Enter') router.push('/learn');
        return;
      }

      if (!current) return;

      if (e.key.toLowerCase() === 'h') {
        e.preventDefault();
        setShowHint((v) => !v);
        return;
      }

      if (verdict !== 'idle') {
        if (e.key === 'Enter') {
          e.preventDefault();
          advance();
        }
        return;
      }

      if (/^[1-9]$/.test(e.key)) {
        e.preventDefault();
        const idx = Number(e.key) - 1;
        if (isOrdering) {
          const piece = current.pieces?.[idx];
          if (piece && !placedPieces.includes(piece.id)) {
            playFeedbackSound('click', soundEnabled);
            setPlacedPieces((p) => [...p, piece.id]);
          }
        } else {
          const option = current.options?.[idx];
          if (option) {
            playFeedbackSound('click', soundEnabled);
            setSelectedOption(option.id);
          }
        }
        return;
      }

      if (e.key === 'Backspace' && isOrdering) {
        e.preventDefault();
        setPlacedPieces((p) => p.slice(0, -1));
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        await onCheck();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [
    advance,
    current,
    finished,
    isOrdering,
    onCheck,
    outOfHearts,
    placedPieces,
    quitOpen,
    router,
    soundEnabled,
    verdict,
  ]);

  const affiliateTool = useMemo(
    () => (session?.mission ? getAffiliateBySlug(session.mission.affiliateToolSlug) : null),
    [session]
  );

  /* ------------------------------ not found ----------------------------- */
  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-polar px-6">
        <Loader2 className="h-7 w-7 animate-spin text-ecto" strokeWidth={3} />
        <p className="text-[13px] font-bold text-wolf">{t.common.loading}</p>
        <Link href="/learn" className="btn-ghost !py-2.5 !text-[12px]">
          {t.lesson.backToPath}
        </Link>
      </div>
    );
  }

  /* ----------------------------- out of hearts --------------------------- */
  if (outOfHearts) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cardinal-wash px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          className="panel w-full max-w-md p-7 text-center"
        >
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cardinal text-paper" style={{ boxShadow: '0 5px 0 0 #EA2B2B' }}>
            <Heart className="h-8 w-8" strokeWidth={2.8} fill="currentColor" />
          </span>
          <h1 className="mt-5 text-[22px] font-extrabold tracking-tight text-navy">
            {t.lesson.outOfHeartsTitle}
          </h1>
          <p className="mx-auto mt-2 max-w-sm text-[13.5px] font-semibold leading-relaxed text-wolf">
            {t.lesson.outOfHeartsDesc}
          </p>

          <div className="mt-6 space-y-3">
            <Link href="/pro" className="btn-arcade w-full" style={{ backgroundColor: '#FF9600', '--lip': '#D97B00' } as React.CSSProperties}>
              <Zap className="h-4 w-4" strokeWidth={3} />
              {t.lesson.getSuper}
            </Link>
            <Link href="/learn" className="btn-ghost w-full">
              {t.lesson.backToPath}
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const mission = session.mission;

  /* ------------------------------ celebration ---------------------------- */
  if (finished) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-paper px-5 py-10">
        {summary && (
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, i) => {
              const colors = ['#58CC02', '#1CB0F6', '#FFC800', '#FF9600', '#FF4B4B'];
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
                  animate={{
                    opacity: 0,
                    y: [0, -120, 260],
                    x: [(i % 5) * 22 - 44, (i % 7) * 30 - 90],
                    rotate: 360,
                  }}
                  transition={{ duration: 2.4, delay: i * 0.05, ease: 'easeOut' }}
                  className="absolute left-1/2 top-1/3 h-3 w-3 rounded-[3px]"
                  style={{ backgroundColor: colors[i % colors.length] }}
                />
              );
            })}
          </div>
        )}

        <div className="relative mx-auto flex min-h-[80vh] w-full max-w-lg flex-col items-center justify-center text-center">
          <motion.span
            initial={{ scale: 0.4, opacity: 0, rotate: -12 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16 }}
            className="flex h-24 w-24 items-center justify-center rounded-full bg-ecto text-paper"
            style={{ boxShadow: '0 8px 0 0 #58A700' }}
          >
            {session.kind === 'boss' ? (
              <Trophy className="h-12 w-12" strokeWidth={2.6} />
            ) : session.kind === 'chest' ? (
              <Gem className="h-12 w-12" strokeWidth={2.6} />
            ) : (
              <Check className="h-14 w-14" strokeWidth={3.2} />
            )}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-6 text-[30px] font-extrabold uppercase leading-tight tracking-tight"
            style={{ color: session.accentLip }}
          >
            {session.kind === 'lesson' ? t.lesson.completeTitle : l(session.title, locale)}
          </motion.h1>

          {summary ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-7 grid w-full grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {[
                { label: t.lesson.xpEarned, value: `${summary.xp}`, color: '#FFC800', lip: '#E5A800', Icon: Zap },
                { label: t.lesson.accuracy, value: `${summary.accuracy}%`, color: '#58CC02', lip: '#58A700', Icon: Check },
                { label: t.lesson.gemsEarned, value: `+${summary.gems}`, color: '#1CB0F6', lip: '#1899D6', Icon: Gem },
                { label: t.lesson.streakLabel, value: `${state.streakDays}`, color: '#FF9600', lip: '#D97B00', Icon: Heart },
              ].map(({ label, value, color, lip, Icon }) => (
                <div
                  key={label}
                  className="overflow-hidden rounded-2xl border-2"
                  style={{ borderColor: color, boxShadow: `0 4px 0 0 ${lip}` }}
                >
                  <div className="flex items-center justify-center gap-1.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-paper" style={{ backgroundColor: color }}>
                    <Icon className="h-3.5 w-3.5" strokeWidth={3} />
                    {label}
                  </div>
                  <div className="bg-paper py-3 text-[22px] font-extrabold tabular-nums" style={{ color }}>
                    {value}
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <div className="mt-8 flex items-center gap-2 text-[13px] font-bold text-wolf">
              <Loader2 className="h-4 w-4 animate-spin text-ecto" strokeWidth={3} />
              {t.common.loading}
            </div>
          )}

          {/* Real-world mission */}
          {mission && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="panel mt-7 w-full p-5 text-left"
            >
              <div className="flex items-center gap-2 text-[10.5px] font-extrabold uppercase tracking-[0.12em] text-fox-dark">
                <Swords className="h-4 w-4" strokeWidth={2.8} />
                {t.lesson.actionMissionBadge}
              </div>
              <h3 className="mt-2 text-[16px] font-extrabold leading-snug text-navy">
                {l(mission.title, locale)}
              </h3>
              <p className="mt-1.5 text-[13px] font-semibold leading-relaxed text-wolf">
                {l(mission.objective, locale)}
              </p>

              <ol className="mt-3 space-y-1.5">
                {mission.steps.map((step, i) => (
                  <li key={i} className="flex gap-2.5 text-[12.5px] font-semibold leading-snug text-graphite">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-polar font-mono text-[10px] font-extrabold text-wolf">
                      {i + 1}
                    </span>
                    {l(step, locale)}
                  </li>
                ))}
              </ol>

              {affiliateTool && (
                <div className="mt-4 flex flex-col gap-3 rounded-2xl border-2 border-swan bg-polar p-3.5 sm:flex-row sm:items-center">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[13.5px] font-extrabold text-navy">{affiliateTool.name}</span>
                      <span className="rounded-md bg-bee-wash px-1.5 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wide text-fox-dark">
                        {l(affiliateTool.perkBadge, locale)}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11.5px] font-semibold leading-snug text-wolf">
                      {t.lesson.recommendedTool}
                    </p>
                  </div>
                  <a
                    href={affiliateTool.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    onClick={() => trackAffiliateClick(affiliateTool.slug, 'lesson-complete')}
                    className="btn-arcade btn-macaw shrink-0 !px-4 !py-2.5 !text-[11.5px]"
                  >
                    {t.lesson.openToolBtn}
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={3} />
                  </a>
                </div>
              )}

              <button
                type="button"
                disabled={missionDone}
                onClick={async () => {
                  const ok = await completeActionMission({
                    missionId: mission.id,
                    xpBonus: mission.xpBonus,
                  });
                  if (ok) {
                    playFeedbackSound('complete', soundEnabled);
                    setMissionDone(true);
                  }
                }}
                className={cn('btn-arcade mt-4 w-full', missionDone && '!bg-ecto-wash !text-ecto-dark')}
                style={
                  missionDone
                    ? ({ '--lip': '#B6E88E', boxShadow: '0 4px 0 0 #B6E88E' } as React.CSSProperties)
                    : undefined
                }
              >
                {missionDone ? (
                  <>
                    <Check className="h-4 w-4" strokeWidth={3.2} />
                    {t.lesson.missionCompleted} (+{mission.xpBonus} XP)
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" strokeWidth={3.2} />
                    {t.lesson.markMissionDone} (+{mission.xpBonus} XP)
                  </>
                )}
              </button>
            </motion.div>
          )}

          <button
            type="button"
            onClick={() => router.push('/learn')}
            className="btn-arcade mt-7 w-full max-w-sm"
          >
            {t.lesson.continueBtn}
            <ArrowRight className="h-4 w-4" strokeWidth={3} />
          </button>
        </div>
      </div>
    );
  }

  /* ------------------------------- quit modal ---------------------------- */
  const quitModal = (
    <AnimatePresence>
      {quitOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/35 px-5"
          onClick={() => setQuitOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.94, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 6 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="panel w-full max-w-sm p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cardinal-wash text-cardinal">
              <X className="h-7 w-7" strokeWidth={3} />
            </span>
            <h2 className="mt-4 text-[18px] font-extrabold text-navy">
              {locale === 'es' ? '¿Salir de la lección?' : 'Leave the lesson?'}
            </h2>
            <p className="mt-1.5 text-[13px] font-semibold leading-snug text-wolf">
              {locale === 'es'
                ? 'Perderás el progreso de esta sesión, pero tus vidas se mantienen.'
                : 'You will lose this session progress, but your hearts stay.'}
            </p>
            <div className="mt-5 space-y-2.5">
              <button type="button" onClick={() => router.push('/learn')} className="btn-arcade w-full !bg-cardinal" style={{ '--lip': '#EA2B2B' } as React.CSSProperties}>
                {locale === 'es' ? 'Salir' : 'Quit'}
              </button>
              <button type="button" onClick={() => setQuitOpen(false)} className="btn-ghost w-full">
                {locale === 'es' ? 'Seguir practicando' : 'Keep practicing'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  /* ------------------------------- player UI ----------------------------- */
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-paper">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-4 px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => setQuitOpen(true)}
            className="text-hare transition-colors hover:text-cardinal"
            aria-label={locale === 'es' ? 'Salir' : 'Quit'}
          >
            <X className="h-7 w-7" strokeWidth={3} />
          </button>

          <div className="progress-track flex-1">
            <motion.div
              className="progress-fill"
              animate={{ width: `${progressPct}%` }}
              transition={{ type: 'spring', stiffness: 160, damping: 24 }}
            />
          </div>

          <div className="flex items-center gap-1.5">
            <Heart className="h-6 w-6 text-cardinal" strokeWidth={2.8} fill="currentColor" />
            <span className="text-[17px] font-extrabold tabular-nums text-cardinal">
              {state.hearts}
            </span>
          </div>
        </div>
      </header>

      {/* Exercise */}
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-40 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -28 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="rounded-lg px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-paper"
                style={{ backgroundColor: session.accent }}
              >
                {l(current.badge, locale)}
              </span>
              {mistakes.includes(current.key) && (
                <span className="flex items-center gap-1 rounded-lg bg-fox-wash px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-fox-dark">
                  <RotateCcw className="h-3 w-3" strokeWidth={3} />
                  {t.lesson.mistakeQueue}
                </span>
              )}
              <span className="ml-auto font-mono text-[11px] font-bold tabular-nums text-hare">
                +{current.xpReward} XP
              </span>
            </div>

            <h1 className="mt-4 text-[22px] font-extrabold leading-snug tracking-tight text-navy sm:text-[26px]">
              {l(current.prompt, locale)}
            </h1>

            {current.contextCodeOrCard && (
              <div className="panel-polar mt-4 overflow-hidden">
                <div className="border-b-2 border-swan bg-swan/50 px-4 py-2 text-[10.5px] font-extrabold uppercase tracking-[0.1em] text-wolf">
                  {l(current.contextCodeOrCard.label, locale)}
                </div>
                <pre
                  className={cn(
                    'whitespace-pre-wrap px-4 py-3.5 text-[12.5px] font-semibold leading-relaxed text-graphite',
                    current.contextCodeOrCard.mono !== false && 'font-mono text-[12px]'
                  )}
                >
                  {l(current.contextCodeOrCard.content, locale)}
                </pre>
              </div>
            )}

            {showHint && current.flashInsight && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-start gap-2.5 rounded-2xl border-2 border-bee bg-bee-wash px-4 py-3"
              >
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-fox-dark" strokeWidth={2.8} />
                <p className="text-[12.5px] font-bold leading-snug text-fox-dark">
                  {l(current.flashInsight, locale)}
                </p>
              </motion.div>
            )}

            {/* Options */}
            {!isOrdering && (
              <div className="mt-6 grid gap-3">
                {current.options?.map((option, idx) => {
                  const isSelected = selectedOption === option.id;
                  const isCorrectAnswer = option.id === current.correctOptionId;
                  const showCorrect = verdict !== 'idle' && isCorrectAnswer;
                  const showWrong = verdict === 'wrong' && isSelected;

                  return (
                    <motion.button
                      key={option.id}
                      type="button"
                      disabled={verdict !== 'idle'}
                      animate={showWrong ? { x: [0, -8, 7, -5, 0] } : { x: 0 }}
                      transition={{ duration: 0.34 }}
                      onClick={() => {
                        playFeedbackSound('click', soundEnabled);
                        setSelectedOption(option.id);
                      }}
                      className={cn(
                        'flex w-full items-start gap-3.5 rounded-2xl border-2 bg-paper px-4 py-3.5 text-left transition-colors',
                        verdict === 'idle' && 'lip lip-swan hover:border-hare',
                        isSelected && verdict === 'idle' && 'border-macaw bg-macaw-wash',
                        showCorrect && 'border-ecto bg-ecto-wash',
                        showWrong && 'border-cardinal bg-cardinal-wash'
                      )}
                      style={
                        isSelected && verdict === 'idle'
                          ? ({ '--lip': '#1899D6', boxShadow: '0 4px 0 0 #1899D6' } as React.CSSProperties)
                          : showCorrect
                          ? ({ '--lip': '#58A700', boxShadow: '0 4px 0 0 #58A700' } as React.CSSProperties)
                          : showWrong
                          ? ({ '--lip': '#EA2B2B', boxShadow: '0 4px 0 0 #EA2B2B' } as React.CSSProperties)
                          : undefined
                      }
                    >
                      <span
                        className={cn(
                          'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 font-mono text-[12px] font-extrabold',
                          isSelected && verdict === 'idle'
                            ? 'border-macaw bg-macaw text-paper'
                            : showCorrect
                            ? 'border-ecto bg-ecto text-paper'
                            : showWrong
                            ? 'border-cardinal bg-cardinal text-paper'
                            : 'border-swan bg-polar text-wolf'
                        )}
                      >
                        {showCorrect ? <Check className="h-4 w-4" strokeWidth={3.4} /> : idx + 1}
                      </span>
                      <span className="min-w-0">
                        <span
                          className={cn(
                            'block text-[14px] font-bold leading-snug',
                            showCorrect ? 'text-ecto-dark' : showWrong ? 'text-cardinal-dark' : 'text-graphite'
                          )}
                        >
                          {l(option.label, locale)}
                        </span>
                        {option.sublabel && (
                          <span className="mt-0.5 block text-[11.5px] font-semibold text-hare">
                            {l(option.sublabel, locale)}
                          </span>
                        )}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Ordering builder */}
            {isOrdering && (
              <div className="mt-6">
                <p className="text-[12px] font-bold text-wolf">{t.lesson.selectPiecesHint}</p>

                <div className="panel-polar mt-3 flex min-h-[104px] flex-wrap content-start gap-2 p-3">
                  <AnimatePresence>
                    {placedPieces.map((pieceId, i) => {
                      const piece = current.pieces?.find((p) => p.id === pieceId);
                      if (!piece) return null;
                      return (
                        <motion.button
                          key={pieceId}
                          type="button"
                          layout
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.85 }}
                          transition={{ type: 'spring', stiffness: 480, damping: 32 }}
                          onClick={() =>
                            setPlacedPieces((prev) => prev.filter((id) => id !== pieceId))
                          }
                          className="lip lip-macaw flex items-center gap-2 rounded-xl border-2 border-macaw bg-macaw-wash px-3 py-2 text-[12.5px] font-bold text-navy"
                        >
                          <span className="font-mono text-[10px] font-extrabold text-macaw">
                            {i + 1}
                          </span>
                          {l(piece.text, locale)}
                          <X className="h-3.5 w-3.5 text-macaw" strokeWidth={3} />
                        </motion.button>
                      );
                    })}
                  </AnimatePresence>
                  {placedPieces.length === 0 && (
                    <span className="self-center px-2 text-[12px] font-semibold text-hare">
                      {t.lesson.tapToRemoveHint}
                    </span>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {current.pieces?.map((piece, idx) => {
                    const used = placedPieces.includes(piece.id);
                    return (
                      <motion.button
                        key={piece.id}
                        type="button"
                        layout
                        disabled={used || verdict !== 'idle'}
                        onClick={() => {
                          playFeedbackSound('click', soundEnabled);
                          setPlacedPieces((prev) => [...prev, piece.id]);
                        }}
                        className={cn(
                          'rounded-xl border-2 px-3 py-2 text-[12.5px] font-bold transition-colors',
                          used
                            ? 'border-swan bg-polar text-hare opacity-50'
                            : 'lip lip-swan border-swan bg-paper text-graphite hover:border-hare'
                        )}
                      >
                        <span className="mr-1.5 font-mono text-[10px] font-extrabold text-hare">
                          {idx + 1}
                        </span>
                        {l(piece.text, locale)}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Feedback / action bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <AnimatePresence>
          {verdict !== 'idle' && (
            <motion.div
              key={verdict + shakeToken}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 32 }}
              className={cn(
                'border-t-2 px-4 py-4 sm:px-6',
                verdict === 'correct'
                  ? 'border-ecto bg-ecto-wash'
                  : 'border-cardinal bg-cardinal-wash'
              )}
            >
              <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <div
                    className={cn(
                      'flex items-center gap-2 text-[16px] font-extrabold uppercase tracking-tight',
                      verdict === 'correct' ? 'text-ecto-dark' : 'text-cardinal-dark'
                    )}
                  >
                    {verdict === 'correct' ? (
                      <Check className="h-5 w-5" strokeWidth={3.4} />
                    ) : (
                      <X className="h-5 w-5" strokeWidth={3.4} />
                    )}
                    {verdict === 'correct' ? t.lesson.correctTitle : t.lesson.wrongTitle}
                  </div>
                  <p
                    className={cn(
                      'mt-1 text-[12.5px] font-semibold leading-snug',
                      verdict === 'correct' ? 'text-graphite' : 'text-cardinal-dark'
                    )}
                  >
                    {verdict === 'wrong' && (
                      <span className="font-extrabold">
                        {t.lesson.solutionLabel}{' '}
                        {isOrdering
                          ? (current.correctOrderIds ?? [])
                              .map((id) => {
                                const piece = current.pieces?.find((p) => p.id === id);
                                return piece ? l(piece.text, locale) : '';
                              })
                              .join(' → ')
                          : l(
                              current.options?.find((o) => o.id === current.correctOptionId)
                                ?.label ?? { es: '', en: '' },
                              locale
                            )}
                        <br />
                      </span>
                    )}
                    {l(current.explanation, locale)}
                  </p>
                </div>

                <button type="button" onClick={advance} className="btn-arcade shrink-0 sm:w-[190px]">
                  {t.lesson.continueBtn}
                  <ArrowRight className="h-4 w-4" strokeWidth={3} />
                </button>
              </div>
            </motion.div>
          )}

          {verdict === 'idle' && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              className="border-t-2 border-swan bg-paper px-4 py-4 sm:px-6"
            >
              <div className="mx-auto flex w-full max-w-3xl items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowHint((v) => !v)}
                  disabled={!current.flashInsight}
                  className={cn(
                    'btn-ghost shrink-0 !px-4 !py-3.5',
                    !current.flashInsight && 'opacity-40'
                  )}
                  title={`${t.lesson.hintLabel} (H)`}
                >
                  <Lightbulb className="h-4 w-4" strokeWidth={2.8} />
                  <span className="hidden sm:inline">{t.lesson.hintLabel}</span>
                </button>

                <button
                  type="button"
                  disabled={!canCheck}
                  onClick={onCheck}
                  className="btn-arcade flex-1"
                >
                  {t.lesson.checkAnswer}
                </button>
              </div>
              <p className="mx-auto mt-2 hidden w-full max-w-3xl text-center text-[11px] font-semibold text-hare sm:block">
                {t.lesson.keyboardHint}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {quitModal}
    </div>
  );
}


export default function LessonPlayerPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-paper">
          <Loader2 className="h-6 w-6 animate-spin text-ecto" strokeWidth={3} />
        </div>
      }
    >
      <LessonPlayer />
    </Suspense>
  );
}
