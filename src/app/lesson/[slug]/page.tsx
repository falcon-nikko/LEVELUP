'use client';

import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Gem,
  Heart,
  Lightbulb,
  Loader2,
  Swords,
  Trophy,
  X,
  Zap,
} from 'lucide-react';
import { useLevelUp } from '@/context/LevelUpContext';
import {
  getLessonBySlug,
  getNextLesson,
  getTrackBySlug,
  getUnitBySlug,
} from '@/lib/curriculum/tracks';
import { Lesson, Exercise, ActionMission } from '@/lib/curriculum/types';
import { bi, orderExercises } from '@/lib/curriculum/authoring';
import { getAffiliateBySlug } from '@/lib/curriculum/affiliates';
import { LocalizedText, l } from '@/lib/i18n/dictionaries';
import { playFeedbackSound } from '@/lib/sound';
import { cn } from '@/lib/utils';
import {
  AnswerState,
  correctAnswerSummary,
  initialAnswer,
  isAnswerCorrect,
  isAnswerReady,
  pickOption,
  placePiece,
  slotCount,
  unplacePiece,
} from '@/lib/curriculum/grading';
import { ExerciseBody, Verdict } from '@/components/lesson/ExerciseBody';
import {
  Accent,
  ExamplePhase,
  LessonIntro,
  MissionScreen,
  RecapScreen,
  StageLabels,
  TheoryScreen,
  ExampleScreen,
} from '@/components/lesson/LessonStages';

/* ==========================================================================
   Session model
   ========================================================================== */

type SessionKind = 'lesson' | 'chest' | 'boss' | 'practice';

interface SessionExercise extends Exercise {
  sourceLessonSlug: string;
  key: string;
  attempt: number;
  /** Self-explanation prompts teach but must never cost a heart. */
  free?: boolean;
}

interface Session {
  kind: SessionKind;
  id: string;
  unitSlug: string;
  trackSlug: string;
  lesson?: Lesson;
  title: LocalizedText;
  accent: Accent;
  exercises: SessionExercise[];
  mission?: ActionMission;
  bonusXp: number;
  bonusGems: number;
  xpMultiplier: number;
  durationMin: number;
}

type Screen =
  | { kind: 'intro'; key: string }
  | { kind: 'theory'; key: string; index: number }
  | { kind: 'example'; key: string; phase: ExamplePhase }
  | { kind: 'exercise'; key: string; exercise: SessionExercise }
  | { kind: 'recap'; key: string }
  | { kind: 'mission'; key: string }
  | { kind: 'done'; key: string };

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function toSessionExercise(
  ex: Exercise,
  sourceLessonSlug: string,
  attempt = 0,
  free = false
): SessionExercise {
  return { ...ex, sourceLessonSlug, attempt, free, key: `${sourceLessonSlug}-${ex.id}-${attempt}` };
}

/** Self-explanation prompt of a worked example, rendered as a graded exercise. */
function selfCheckExercise(exampleId: string, lessonSlug: string, lesson: Lesson): SessionExercise {
  const example = lesson.examples[0];
  return {
    id: `${exampleId}-selfcheck`,
    format: 'worked_why',
    difficulty: 2,
    badge: bi('COMPRENSIÓN', 'CHECK'),
    prompt: example.selfCheck.prompt,
    options: example.selfCheck.options,
    correctOptionId: example.selfCheck.correctOptionId,
    explanation: example.selfCheck.explanation,
    xp: 10,
    sourceLessonSlug: lessonSlug,
    attempt: 0,
    free: true,
    key: `${lessonSlug}-${exampleId}-selfcheck`,
  };
}

function buildSession(slug: string, reviewMode: boolean): Session | null {
  const lesson = getLessonBySlug(slug);

  if (lesson) {
    const track = getTrackBySlug(lesson.trackSlug);
    const unit = getUnitBySlug(lesson.unitSlug);
    const accent: Accent = {
      accent: track.accent,
      accentLip: track.accentLip,
      accentWash: track.accentWash,
      accentInk: track.accentInk,
      accentSoft: track.accentSoft,
      badgeCode: track.badgeCode,
      unitTitle: unit?.title ?? track.name,
      trackName: track.name,
    };
    const ordered = orderExercises(lesson.exercises).map((ex) =>
      toSessionExercise(ex, lesson.slug)
    );

    return {
      kind: reviewMode ? 'practice' : 'lesson',
      id: lesson.slug,
      unitSlug: lesson.unitSlug,
      trackSlug: track.slug,
      lesson,
      title: lesson.title,
      accent,
      exercises: reviewMode ? shuffle(ordered).slice(0, 8) : ordered,
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
    const unit = getUnitBySlug(unitSlug);
    if (!unit) return null;
    const track = getTrackBySlug(unit.trackSlug);

    const pool: SessionExercise[] = unit.lessons.flatMap((lsn) =>
      lsn.exercises.map((ex) => toSessionExercise(ex, lsn.slug))
    );
    const picked = shuffle(pool).slice(0, isBoss ? 6 : 4);

    const accent: Accent = {
      accent: isBoss ? '#FF4B4B' : '#FFC800',
      accentLip: isBoss ? '#EA2B2B' : '#E5A800',
      accentWash: isBoss ? '#FFDFE0' : '#FFF4CC',
      accentInk: isBoss ? '#FFFFFF' : '#042C60',
      accentSoft: isBoss ? 'rgba(255,75,75,0.14)' : 'rgba(255,200,0,0.18)',
      badgeCode: track.badgeCode,
      unitTitle: unit.title,
      trackName: track.name,
    };

    return {
      kind: isBoss ? 'boss' : 'chest',
      id: slug,
      unitSlug: unit.slug,
      trackSlug: track.slug,
      title: isBoss
        ? bi(`Reto final · ${unit.title.es}`, `Final challenge · ${unit.title.en}`)
        : bi(`Cofre de repaso · ${unit.title.es}`, `Review chest · ${unit.title.en}`),
      accent,
      exercises: picked,
      mission: isBoss ? unit.lessons[unit.lessons.length - 1]?.actionMission : undefined,
      bonusXp: isBoss ? 25 : 0,
      bonusGems: isBoss ? 15 : 10,
      xpMultiplier: 1,
      durationMin: isBoss ? 10 : 5,
    };
  }

  return null;
}

/**
 * Screen order follows the mandated lesson anatomy:
 * intro → theory → worked example (+ self-check) → practice → recap → mission → done.
 */
function buildScreens(session: Session): Screen[] {
  const screens: Screen[] = [];
  const lesson = session.lesson;

  if (session.kind === 'lesson' && lesson) {
    screens.push({ kind: 'intro', key: 'intro' });
    lesson.theory.forEach((block, i) =>
      screens.push({ kind: 'theory', key: `theory-${block.id}`, index: i })
    );

    const example = lesson.examples[0];
    if (example) {
      screens.push({ kind: 'example', key: 'ex-situation', phase: { kind: 'situation' } });
      example.steps.forEach((step, i) =>
        screens.push({ key: `ex-step-${i}`, kind: 'example', phase: { kind: 'step', index: i } })
      );
      screens.push({ kind: 'example', key: 'ex-result', phase: { kind: 'result' } });
      screens.push({
        kind: 'exercise',
        key: selfCheckExercise(example.id, lesson.slug, lesson).key,
        exercise: selfCheckExercise(example.id, lesson.slug, lesson),
      });
    }
  }

  session.exercises.forEach((ex) =>
    screens.push({ kind: 'exercise', key: ex.key, exercise: ex })
  );

  if (session.kind === 'lesson' && lesson) {
    screens.push({ kind: 'recap', key: 'recap' });
    screens.push({ kind: 'mission', key: 'mission' });
  }

  screens.push({ kind: 'done', key: 'done' });
  return screens;
}

/* ==========================================================================
   Player
   ========================================================================== */

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
    refillHeartWithGems,
    completeLesson,
    completeActionMission,
    trackAffiliateClick,
  } = useLevelUp();

  /* The session is pure data, so it is built during the FIRST render: no
     spinner flash when a lesson opens. State is only needed because mistakes
     get re-queued into the screen list while playing. */
  const boot = useMemo(() => buildSession(params.slug, reviewMode), [params.slug, reviewMode]);
  const bootScreens = useMemo(() => (boot ? buildScreens(boot) : []), [boot]);
  const bootCursor = useMemo(() => {
    if (!boot || boot.kind !== 'practice') return 0;
    const first = bootScreens.findIndex((s) => s.kind === 'exercise');
    return first >= 0 ? first : 0;
  }, [boot, bootScreens]);

  const [session, setSession] = useState<Session | null>(boot);
  const [screens, setScreens] = useState<Screen[]>(bootScreens);
  const [cursor, setCursor] = useState(bootCursor);
  const [answer, setAnswer] = useState<AnswerState>(() => {
    const target = bootScreens[bootCursor];
    return target?.kind === 'exercise'
      ? initialAnswer(target.exercise)
      : { kind: 'option', selectedId: null };
  });
  const [verdict, setVerdict] = useState<Verdict>('idle');
  const [showHint, setShowHint] = useState(false);
  const [shakeToken, setShakeToken] = useState(0);
  const [mistakes, setMistakes] = useState<string[]>([]);
  const [firstTryHits, setFirstTryHits] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [xpBank, setXpBank] = useState(0);
  const [outOfHearts, setOutOfHearts] = useState(false);
  const [refilling, setRefilling] = useState(false);
  const [quitOpen, setQuitOpen] = useState(false);
  const [finished, setFinished] = useState(false);
  const [missionDone, setMissionDone] = useState(false);
  const [summary, setSummary] = useState<{
    xp: number;
    gems: number;
    accuracy: number;
    minutes: number;
  } | null>(null);
  const startedAt = useRef<number>(Date.now());

  /* ----------------------------- navigation ---------------------------- */
  /** Moving to a screen also resets the answer to the shape that screen needs. */
  const goTo = useCallback((index: number, list: Screen[]) => {
    const target = list[index];
    setCursor(index);
    setVerdict('idle');
    setShowHint(false);
    setAnswer(
      target?.kind === 'exercise'
        ? initialAnswer(target.exercise)
        : { kind: 'option', selectedId: null }
    );
  }, []);

  const advance = useCallback(() => {
    goTo(cursor + 1, screens);
  }, [cursor, goTo, screens]);

  /* ------------------------------- boot -------------------------------- */
  useEffect(() => {
    const built = buildSession(params.slug, reviewMode);
    if (!built) return;
    const builtScreens = buildScreens(built);
    setSession(built);
    setScreens(builtScreens);
    // Practice mode skips straight into the exercises.
    const start =
      built.kind === 'practice'
        ? Math.max(0, builtScreens.findIndex((s) => s.kind === 'exercise'))
        : 0;
    goTo(start, builtScreens);
    setVerdict('idle');
    setFinished(false);
    setSummary(null);
    setMistakes([]);
    setFirstTryHits(0);
    setAttempts(0);
    setXpBank(0);
    startedAt.current = Date.now();
    setMissionDone(
      built.mission ? state.completedMissionIds.includes(built.mission.id) : false
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug, reviewMode]);

  const screen = screens[cursor];
  const currentExercise = screen?.kind === 'exercise' ? screen.exercise : undefined;
  const lesson = session?.lesson;

  const totalSteps = Math.max(1, screens.length - 1);
  const progressPct = Math.min(100, Math.round((cursor / totalSteps) * 100));
  const ready = currentExercise ? isAnswerReady(currentExercise, answer) : false;

  const stageLabels: StageLabels | null = useMemo(() => {
    if (!session) return null;
    return {
      startLesson: t.lesson.startLesson,
      skipToPractice: t.lesson.skipToPractice,
      outcomeLabel: t.lesson.outcomeLabel,
      whyLabel: t.lesson.whyLabel,
      exampleBadge: t.lesson.exampleBadge,
      situationLabel: t.lesson.situationLabel,
      resultLabel: t.lesson.resultLabel,
      selfCheckLabel: t.lesson.selfCheckLabel,
      recapTitle: t.lesson.recapTitle,
      missionObjective: t.lesson.missionObjective,
      missionProof: t.lesson.missionProof,
      missionSteps: t.lesson.missionSteps,
      actionMissionBadge: t.lesson.actionMissionBadge,
      recommendedTool: t.lesson.recommendedTool,
      openToolBtn: t.lesson.openToolBtn,
      markMissionDone: t.lesson.markMissionDone,
      missionCompleted: t.lesson.missionCompleted,
      theoryCount: t.lesson.theoryCount,
      exerciseCount: t.lesson.exerciseCount,
      nextBlock: t.lesson.nextBlock,
    };
  }, [session, t]);

  const exerciseLabels = useMemo(
    () => ({
      yourAnswer: t.lesson.yourAnswer,
      correctLine: t.lesson.correctLine,
      formula: t.lesson.formula,
      tolerance: t.lesson.tolerance,
      lockedHint: t.lesson.lockedHint,
      pairingHint: t.lesson.pairingHint,
      bugHuntHint: t.lesson.bugHuntHint,
      typeNumber: t.lesson.typeNumber,
    }),
    [t]
  );

  const affiliateTool = useMemo(
    () => (session?.mission ? getAffiliateBySlug(session.mission.affiliateToolSlug) ?? null : null),
    [session]
  );

  const onCheck = useCallback(async () => {
    if (!currentExercise || verdict !== 'idle' || !ready) return;

    const correct = isAnswerCorrect(currentExercise, answer);
    setAttempts((a) => a + 1);
    playFeedbackSound(correct ? 'correct' : 'wrong', soundEnabled);

    if (correct) {
      setVerdict('correct');
      const alreadyMissed = mistakes.includes(currentExercise.id);
      if (!alreadyMissed) setFirstTryHits((n) => n + 1);
      setXpBank((xp) => xp + Math.round(currentExercise.xp * (alreadyMissed ? 0.5 : 1)));
      return;
    }

    setVerdict('wrong');
    setShakeToken((s) => s + 1);

    // Re-queue the missed item once, after the last exercise of the block.
    if (!mistakes.includes(currentExercise.id)) {
      setMistakes((m) => [...m, currentExercise.id]);
      const retry = toSessionExercise(
        currentExercise,
        currentExercise.sourceLessonSlug,
        currentExercise.attempt + 1,
        currentExercise.free
      );
      setScreens((prev) => {
        let lastExercise = -1;
        prev.forEach((s, i) => {
          if (s.kind === 'exercise') lastExercise = i;
        });
        if (lastExercise < 0) return prev;
        const next = [...prev];
        next.splice(lastExercise + 1, 0, { kind: 'exercise', key: retry.key, exercise: retry });
        return next;
      });
    }

    if (!currentExercise.free) {
      const remaining = await consumeHeart();
      if (remaining <= 0) setOutOfHearts(true);
    }
  }, [answer, consumeHeart, currentExercise, mistakes, ready, soundEnabled, verdict]);

  const confirmMission = useCallback(async () => {
    if (!session?.mission || missionDone) return;
    const ok = await completeActionMission({
      missionId: session.mission.id,
      xpBonus: Math.round(session.mission.xpBonus * session.xpMultiplier),
    });
    if (ok) {
      setMissionDone(true);
      playFeedbackSound('correct', soundEnabled);
    }
  }, [completeActionMission, missionDone, session, soundEnabled]);

  /* ---------------------------- completion ----------------------------- */
  useEffect(() => {
    if (screen?.kind !== 'done' || !session || finished) return;
    setFinished(true);

    const accuracy = attempts > 0 ? Math.round((firstTryHits / attempts) * 100) : 100;
    const minutes = Math.max(
      1,
      Math.min(session.durationMin, Math.round((Date.now() - startedAt.current) / 60000))
    );
    const baseXp = Math.round((xpBank + session.bonusXp) * session.xpMultiplier);

    const run = async () => {
      if (session.kind === 'lesson' || session.kind === 'practice') {
        await completeLesson({
          lessonSlug: session.id,
          xpEarned: baseXp,
          durationMin: minutes,
        });
      } else {
        await completeActionMission({ missionId: session.id, xpBonus: baseXp });
      }
      setSummary({ xp: baseXp, gems: session.bonusGems, accuracy, minutes });
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen?.kind]);

  /* ------------------------------ keyboard ----------------------------- */
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
      if (screen?.kind === 'done') {
        if (e.key === 'Enter') router.push('/learn');
        return;
      }
      if (!screen) return;

      if (screen.kind !== 'exercise') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          advance();
        }
        return;
      }

      const ex = screen.exercise;

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
        const slots = slotCount(ex);
        if (idx >= slots) return;
        playFeedbackSound('click', soundEnabled);

        if (ex.format === 'ordering' || ex.format === 'faded') {
          const bank = (ex.pieces ?? []).filter(
            (p) => !(answer.kind === 'order' && answer.placed.includes(p.id))
          );
          const piece = bank[idx];
          if (piece && answer.kind === 'order') {
            setAnswer(placePiece(ex, answer, piece.id));
          }
          return;
        }
        if (ex.format === 'bug_hunt') {
          const line = ex.lines?.[idx];
          if (line && answer.kind === 'line') setAnswer(pickOption(answer, line.id));
          return;
        }
        const option = ex.options?.[idx];
        if (option && answer.kind === 'option') setAnswer(pickOption(answer, option.id));
        return;
      }
      if (e.key === 'Backspace' && answer.kind === 'order') {
        const lastFilled = answer.placed.reduce(
          (acc, id, i) => (id !== null ? i : acc),
          -1
        );
        if (lastFilled >= 0) {
          e.preventDefault();
          setAnswer(unplacePiece(ex, answer, lastFilled));
        }
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
    answer,
    onCheck,
    outOfHearts,
    quitOpen,
    router,
    screen,
    soundEnabled,
    verdict,
  ]);

  /* ------------------------------ not found ---------------------------- */
  if (!session || !stageLabels) {
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

  /* ---------------------------- out of hearts -------------------------- */
  if (outOfHearts) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cardinal-wash px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          className="panel w-full max-w-md p-7 text-center"
        >
          <span
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cardinal text-paper"
            style={{ boxShadow: '0 5px 0 0 #EA2B2B' }}
          >
            <Heart className="h-8 w-8" strokeWidth={2.8} fill="currentColor" />
          </span>
          <h1 className="mt-5 text-[22px] font-extrabold tracking-tight text-navy">
            {t.lesson.outOfHeartsTitle}
          </h1>
          <p className="mx-auto mt-2 max-w-sm text-[13.5px] font-semibold leading-relaxed text-wolf">
            {t.lesson.outOfHeartsDesc}
          </p>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              disabled={refilling || state.gems < 20}
              onClick={async () => {
                setRefilling(true);
                const ok = await refillHeartWithGems();
                setRefilling(false);
                if (ok) setOutOfHearts(false);
              }}
              className={cn(
                'btn-arcade w-full',
                state.gems < 20 && 'pointer-events-none opacity-45'
              )}
              style={{ backgroundColor: '#1CB0F6', '--lip': '#1899D6' } as React.CSSProperties}
            >
              <Gem className="h-4 w-4" strokeWidth={3} />
              {refilling ? t.common.loading : t.lesson.refillBtn}
            </button>
            {state.gems < 20 && (
              <p className="text-[11.5px] font-bold text-cardinal-dark">
                {t.lesson.notEnoughGems}
              </p>
            )}
            <Link
              href="/pro"
              className="btn-arcade w-full"
              style={{ backgroundColor: '#FF9600', '--lip': '#D97B00' } as React.CSSProperties}
            >
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

  /* ------------------------------ celebration -------------------------- */
  if (screen?.kind === 'done') {
    const next = session.lesson ? getNextLesson(session.lesson.slug) : undefined;
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
            className="flex h-24 w-24 items-center justify-center rounded-full text-paper"
            style={{
              backgroundColor: session.kind === 'boss' ? '#FF4B4B' : '#58CC02',
              boxShadow: `0 8px 0 0 ${session.kind === 'boss' ? '#EA2B2B' : '#58A700'}`,
            }}
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
            className="mt-6 text-[28px] font-extrabold uppercase leading-tight tracking-tight sm:text-[30px]"
            style={{ color: session.accent.accentLip }}
          >
            {session.kind === 'lesson' || session.kind === 'practice'
              ? t.lesson.completeTitle
              : l(session.title, locale)}
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
                { label: t.lesson.timeLabel, value: `${summary.minutes} min`, color: '#1CB0F6', lip: '#1899D6', Icon: ArrowRight },
                { label: t.lesson.streakLabel, value: `${state.streakDays}`, color: '#FF9600', lip: '#D97B00', Icon: Heart },
              ].map(({ label, value, color, lip, Icon }) => (
                <div
                  key={label}
                  className="overflow-hidden rounded-2xl border-2"
                  style={{ borderColor: color, boxShadow: `0 4px 0 0 ${lip}` }}
                >
                  <div
                    className="flex items-center justify-center gap-1.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-paper"
                    style={{ backgroundColor: color }}
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={3} />
                    {label}
                  </div>
                  <div
                    className="bg-paper py-3 text-[20px] font-extrabold tabular-nums"
                    style={{ color: lip }}
                  >
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

          {summary && summary.gems > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 flex items-center gap-2 rounded-2xl border-2 border-macaw bg-macaw-wash px-4 py-2"
            >
              <Gem className="h-4 w-4 text-macaw-dark" strokeWidth={3} />
              <span className="text-[13px] font-extrabold text-macaw-dark">
                +{summary.gems} {t.lesson.gemsEarned}
              </span>
            </motion.div>
          )}

          {session.mission && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34 }}
              className="panel mt-6 w-full p-5 text-left"
            >
              <div className="flex items-center gap-2 text-[10.5px] font-extrabold uppercase tracking-[0.12em] text-fox-dark">
                <Swords className="h-4 w-4" strokeWidth={2.8} />
                {t.lesson.actionMissionBadge} · +{session.mission.xpBonus} XP
              </div>
              <h3 className="mt-2 text-[16px] font-extrabold leading-snug text-navy">
                {l(session.mission.title, locale)}
              </h3>
              <p className="mt-1.5 text-[13px] font-semibold leading-relaxed text-wolf">
                {l(session.mission.objective, locale)}
              </p>
              <div className="mt-3 rounded-xl border-2 border-macaw bg-macaw-wash px-3.5 py-2.5">
                <div className="text-[9.5px] font-extrabold uppercase tracking-[0.12em] text-ecto-dark">
                  {t.lesson.missionProof}
                </div>
                <p className="mt-0.5 text-[12.5px] font-bold leading-snug text-navy">
                  {l(session.mission.proof, locale)}
                </p>
              </div>

              {affiliateTool && (
                <div className="mt-4 flex flex-col gap-3 rounded-2xl border-2 border-swan bg-polar p-3.5 sm:flex-row sm:items-center">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[13.5px] font-extrabold text-navy">
                        {affiliateTool.name}
                      </span>
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
                  </a>
                </div>
              )}

              <button
                type="button"
                disabled={missionDone}
                onClick={confirmMission}
                className={cn(
                  'btn-arcade mt-4 w-full',
                  missionDone && 'pointer-events-none opacity-60'
                )}
                style={
                  missionDone
                    ? ({ backgroundColor: '#E5E5E5', color: '#777777', '--lip': '#AFAFAF' } as React.CSSProperties)
                    : ({ backgroundColor: '#58CC02', color: '#FFFFFF', '--lip': '#58A700' } as React.CSSProperties)
                }
              >
                <Check className="h-4 w-4" strokeWidth={3} />
                {missionDone ? t.lesson.missionCompleted : t.lesson.markMissionDone}
              </button>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex w-full flex-col gap-2.5 sm:flex-row"
          >
            {next && (
              <Link
                href={`/lesson/${next.slug}`}
                className="btn-arcade flex-1"
                style={
                  {
                    backgroundColor: session.accent.accent,
                    color: session.accent.accentInk,
                    '--lip': session.accent.accentLip,
                  } as React.CSSProperties
                }
              >
                {l(next.title, locale)}
                <ArrowRight className="h-4 w-4" strokeWidth={3} />
              </Link>
            )}
            <Link href="/learn" className="btn-ghost sm:w-auto">
              {t.lesson.backToPath}
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  /* -------------------------------- HUD -------------------------------- */
  const hud = (
    <div className="sticky top-0 z-20 border-b-2 border-swan bg-paper/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-xl items-center gap-3 px-5 py-3">
        <button
          type="button"
          onClick={() => setQuitOpen(true)}
          aria-label={t.lesson.quitLeave}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-hare transition-colors hover:bg-polar hover:text-cardinal"
        >
          <X className="h-5 w-5" strokeWidth={3} />
        </button>
        <div className="progress-track h-4 flex-1">
          <motion.div
            className="progress-fill h-full"
            style={{ backgroundColor: session.accent.accent }}
            animate={{ width: `${progressPct}%` }}
            transition={{ type: 'spring', stiffness: 220, damping: 28 }}
          />
        </div>
        <div className="flex shrink-0 items-center gap-1.5 rounded-xl bg-cardinal-wash px-2.5 py-1">
          <Heart className="h-4 w-4 text-cardinal" strokeWidth={3} fill="currentColor" />
          <span className="font-mono text-[12px] font-extrabold tabular-nums text-cardinal-dark">
            {state.hearts}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 rounded-xl bg-bee-wash px-2.5 py-1">
          <Zap className="h-4 w-4 text-bee-dark" strokeWidth={3} />
          <span className="font-mono text-[12px] font-extrabold tabular-nums text-fox-dark">
            {xpBank}
          </span>
        </div>
      </div>
    </div>
  );

  const quitDialog = (
    <AnimatePresence>
      {quitOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/45 px-5"
          onClick={() => setQuitOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.92, y: 14 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 10 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="panel w-full max-w-sm p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-[19px] font-extrabold tracking-tight text-navy">
              {t.lesson.quitTitle}
            </h2>
            <p className="mt-2 text-[13px] font-semibold leading-relaxed text-wolf">
              {t.lesson.quitDesc}
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => setQuitOpen(false)}
                className="btn-arcade w-full"
                style={
                  {
                    backgroundColor: session.accent.accent,
                    color: session.accent.accentInk,
                    '--lip': session.accent.accentLip,
                  } as React.CSSProperties
                }
              >
                {t.lesson.quitStay}
              </button>
              <Link href="/learn" className="btn-ghost w-full">
                {t.lesson.quitLeave}
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  /* ------------------------------ stage body --------------------------- */
  let body: React.ReactNode = null;

  if (screen?.kind === 'intro' && lesson) {
    body = (
      <LessonIntro
        lesson={lesson}
        accent={session.accent}
        labels={stageLabels}
        locale={locale}
        onStart={advance}
        onSkipToPractice={() => {
          const first = screens.findIndex((s) => s.kind === 'exercise');
          if (first >= 0) goTo(first, screens);
        }}
      />
    );
  } else if (screen?.kind === 'theory' && lesson) {
    body = (
      <TheoryScreen
        block={lesson.theory[screen.index]}
        index={screen.index}
        total={lesson.theory.length}
        accent={session.accent}
        labels={stageLabels}
        locale={locale}
        onNext={advance}
      />
    );
  } else if (screen?.kind === 'example' && lesson?.examples[0]) {
    body = (
      <ExampleScreen
        example={lesson.examples[0]}
        phase={screen.phase}
        accent={session.accent}
        labels={stageLabels}
        locale={locale}
        onNext={advance}
      />
    );
  } else if (screen?.kind === 'recap' && lesson) {
    body = (
      <RecapScreen
        lesson={lesson}
        accent={session.accent}
        labels={stageLabels}
        locale={locale}
        onNext={advance}
      />
    );
  } else if (screen?.kind === 'mission' && lesson) {
    body = (
      <MissionScreen
        lesson={lesson}
        accent={session.accent}
        labels={stageLabels}
        locale={locale}
        tool={affiliateTool}
        alreadyDone={missionDone}
        onOpenTool={() => trackAffiliateClick(affiliateTool?.slug ?? '', 'lesson-mission')}
        onConfirm={confirmMission}
        onNext={advance}
        confirmLabel={missionDone ? t.lesson.missionCompleted : t.lesson.markMissionDone}
      />
    );
  } else if (screen?.kind === 'exercise' && currentExercise) {
    body = (
      <div className="mx-auto w-full max-w-xl px-5 pb-44 pt-6">
        <motion.div
          key={screen.key}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0, x: shakeToken ? [0, -8, 8, -5, 5, 0] : 0 }}
          transition={{ duration: shakeToken ? 0.42 : 0.26 }}
        >
          <ExerciseBody
            exercise={currentExercise}
            answer={answer}
            verdict={verdict}
            locale={locale}
            disabled={verdict !== 'idle'}
            labels={exerciseLabels}
            onAnswer={setAnswer}
            onPick={() => playFeedbackSound('click', soundEnabled)}
          />
        </motion.div>

        {showHint && currentExercise.hint && (
          <div className="mt-4 flex items-start gap-2.5 rounded-2xl border-2 border-bee bg-bee-wash px-3.5 py-3">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-fox-dark" strokeWidth={2.8} />
            <p className="text-[12.5px] font-bold leading-snug text-navy">
              {l(currentExercise.hint, locale)}
            </p>
          </div>
        )}
      </div>
    );
  }

  /* --------------------------- exercise footer -------------------------- */
  const exerciseFooter =
    screen?.kind === 'exercise' && currentExercise ? (
      <div className="fixed inset-x-0 bottom-0 z-20 border-t-2 border-swan bg-paper">
        {verdict !== 'idle' && (
          <div
            className={cn(
              'border-b-2 px-5 py-3',
              verdict === 'correct' ? 'border-ecto bg-ecto-wash' : 'border-cardinal bg-cardinal-wash'
            )}
          >
            <div className="mx-auto w-full max-w-xl">
              <div
                className={cn(
                  'flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-wide',
                  verdict === 'correct' ? 'text-ecto-dark' : 'text-cardinal-dark'
                )}
              >
                {verdict === 'correct' ? (
                  <Check className="h-4 w-4" strokeWidth={3.4} />
                ) : (
                  <X className="h-4 w-4" strokeWidth={3.4} />
                )}
                {verdict === 'correct' ? t.lesson.correctTitle : t.lesson.wrongTitle}
                <span className="ml-auto font-mono text-[12px] normal-case tracking-normal">
                  +{currentExercise.xp} XP
                </span>
              </div>
              {verdict === 'wrong' && currentExercise.format !== 'numeric' && (
                <p className="mt-1 text-[12.5px] font-bold leading-snug text-navy">
                  {t.lesson.solutionLabel} {correctAnswerSummary(currentExercise, locale)}
                </p>
              )}
              {verdict === 'wrong' && currentExercise.format === 'numeric' && (
                <p className="mt-1 font-mono text-[12.5px] font-bold leading-snug text-navy">
                  {t.lesson.solutionLabel} {currentExercise.answer}
                  {currentExercise.unit ? ` ${currentExercise.unit}` : ''}
                  {currentExercise.formula ? `  ·  ${l(currentExercise.formula, locale)}` : ''}
                </p>
              )}
              <p className="mt-1.5 text-[12.5px] font-semibold leading-relaxed text-graphite">
                {l(currentExercise.explanation, locale)}
              </p>
            </div>
          </div>
        )}

        <div className="px-5 py-4">
          <div className="mx-auto flex w-full max-w-xl items-center gap-3">
            {verdict === 'idle' && currentExercise.hint && (
              <button
                type="button"
                onClick={() => setShowHint((v) => !v)}
                className={cn(
                  'btn-ghost shrink-0 !px-3.5',
                  showHint && '!border-bee !bg-bee-wash !text-fox-dark'
                )}
                aria-label={t.lesson.hintLabel}
              >
                <Lightbulb className="h-4 w-4" strokeWidth={2.8} />
              </button>
            )}
            {verdict === 'idle' ? (
              <button
                type="button"
                disabled={!ready}
                onClick={onCheck}
                className={cn('btn-arcade flex-1', !ready && 'pointer-events-none opacity-45')}
                style={
                  {
                    backgroundColor: '#58CC02',
                    color: '#FFFFFF',
                    '--lip': '#58A700',
                  } as React.CSSProperties
                }
              >
                {t.lesson.checkAnswer}
              </button>
            ) : (
              <button
                type="button"
                onClick={advance}
                className="btn-arcade flex-1"
                style={
                  verdict === 'correct'
                    ? ({ backgroundColor: '#58CC02', color: '#FFFFFF', '--lip': '#58A700' } as React.CSSProperties)
                    : ({ backgroundColor: '#FF4B4B', color: '#FFFFFF', '--lip': '#EA2B2B' } as React.CSSProperties)
                }
              >
                {t.lesson.continueBtn}
                <ArrowRight className="h-4 w-4" strokeWidth={3} />
              </button>
            )}
          </div>
          <p className="mx-auto mt-2 w-full max-w-xl text-center text-[10.5px] font-semibold text-hare">
            {t.lesson.keyboardHint}
          </p>
        </div>
      </div>
    ) : null;

  return (
    <div className="min-h-screen bg-paper">
      {hud}
      <AnimatePresence mode="wait">
        <motion.div
          key={screen?.key ?? 'screen'}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          transition={{ duration: 0.2 }}
        >
          {body}
        </motion.div>
      </AnimatePresence>
      {exerciseFooter}
      {quitDialog}
    </div>
  );
}

export default function LessonPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-polar">
          <Loader2 className="h-7 w-7 animate-spin text-ecto" strokeWidth={3} />
        </div>
      }
    >
      <LessonPlayer />
    </Suspense>
  );
}
