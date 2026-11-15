"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Flame,
  Gem,
  Lightbulb,
  Sparkles,
  Zap,
  Heart,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { ExerciseView } from "./ExerciseView";
import { isCorrect, scoreLesson, xpForLesson } from "@/lib/lesson-engine";
import { consumeHeartRemote, submitLesson } from "@/lib/submit";
import type { Answer } from "@/lib/lesson-engine";
import type { LessonWithCourse } from "@/content/curriculum";
import type { LessonResult, Profile } from "@/lib/types";

type Phase = "theory" | "quiz" | "result";

export function LessonPlayer({ lesson }: { lesson: LessonWithCourse; prevId?: string | null }) {
  const { profile, mode, setProfile } = useAuth();
  const router = useRouter();

  const [phase, setPhase] = useState<Phase>("theory");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(Answer | null)[]>(() => lesson.exercises.map(() => null));
  const [checked, setChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<LessonResult | null>(null);
  const [finalProfile, setFinalProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showXp, setShowXp] = useState(false);

  // Cada lección empieza arriba: evita aterrizar a mitad de página al navegar.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [phase, index]);

  const ex = lesson.exercises[index];
  const answer = answers[index];
  const correctNow = checked ? isCorrect(ex, answer) : null;
  const isLast = index === lesson.exercises.length - 1;
  const progress =
    phase === "theory" ? 0 : ((index + (checked ? 1 : 0)) / lesson.exercises.length) * 100;

  const mistakes = useMemo(() => {
    const list: string[] = [];
    lesson.exercises.forEach((e, i) => {
      if (!isCorrect(e, answers[i])) list.push(`${lesson.id}#${e.id}`);
    });
    return list;
  }, [answers, lesson]);

  async function finish() {
    setSubmitting(true);
    setError(null);
    const scored = scoreLesson(lesson.exercises, answers);
    try {
      const { result: r, profile: p } = await submitLesson({
        profile,
        mode,
        lessonId: lesson.id,
        courseSlug: lesson.courseSlug,
        unitId: lesson.unitId,
        xp: xpForLesson(lesson.xp, scored.perfect),
        minutes: lesson.minutes,
        score: scored.score,
        total: scored.total,
        perfect: scored.perfect,
        mistakes,
      });
      setResult(r);
      setFinalProfile(p);
      setProfile(p);
      setPhase("result");
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo guardar el progreso.");
    } finally {
      setSubmitting(false);
    }
  }

  async function check() {
    if (!answer) return;
    const ok = isCorrect(ex, answer);
    setChecked(true);
    if (!ok && mode !== "demo") {
      const left = await consumeHeartRemote();
      if (left !== null) setProfile({ ...profile, hearts: left });
    } else if (!ok) {
      setProfile({ ...profile, hearts: Math.max(0, profile.hearts - 1) });
    }
    if (ok) setShowXp(true);
  }

  function next() {
    setChecked(false);
    setShowHint(false);
    setShowXp(false);
    if (isLast) void finish();
    else setIndex((i) => i + 1);
  }

  /* ------------------------------------------------------------- resultado */
  if (phase === "result" && result) {
    const totalXp = finalProfile?.totalXp ?? profile.totalXp;
    const perfect = result.perfect;
    const passed = result.score / result.total >= 0.6;
    return (
      <div className="mx-auto max-w-xl py-6">
        <div className="animate-pop border-2 border-ink bg-white p-6 text-center shadow-hard-lg sm:p-7">
          <div
            className="mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-ink"
            style={{ background: perfect ? "var(--color-yellow-brand)" : "var(--color-mint-brand)" }}
          >
            {perfect ? (
              <Sparkles className="h-9 w-9" strokeWidth={2.6} />
            ) : passed ? (
              <Check className="h-10 w-10" strokeWidth={4} />
            ) : (
              <Heart className="h-9 w-9" strokeWidth={2.6} />
            )}
          </div>
          <h1 className="mt-4 font-display text-[24px] uppercase leading-tight tracking-tight">
            {perfect ? "¡Lección legendaria!" : passed ? "Lección completada" : "Lección terminada"}
          </h1>
          <p className="mt-1 text-[12.5px] font-semibold text-ink/60">
            {result.score}/{result.total} correctas · {Math.round((result.score / result.total) * 100)}%
          </p>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <Stat
              icon={<Zap className="h-4 w-4" strokeWidth={2.8} />}
              value={`+${result.xp}`}
              label="XP"
              bg="var(--color-yellow-brand)"
            />
            <Stat
              icon={<Flame className="h-4 w-4" strokeWidth={2.8} />}
              value={result.awarded?.streak ?? profile.streak}
              label="racha"
              bg="var(--color-pink-brand)"
            />
            <Stat
              icon={<Gem className="h-4 w-4" strokeWidth={2.8} />}
              value={result.awarded?.gems ?? 0}
              label="gemas"
              bg="var(--color-purple-brand)"
            />
          </div>

          <div className="mt-4 border-2 border-ink bg-mint-brand p-3.5 text-left">
            <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider">
              <Lightbulb className="h-3.5 w-3.5" strokeWidth={3} /> Acción para hoy
            </p>
            <p className="mt-1.5 text-[13px] font-medium leading-relaxed">{lesson.action}</p>
          </div>

          {!!mistakes.length && (
            <p className="mt-3 text-[11.5px] font-semibold text-ink/60">
              {mistakes.length} ejercicio{mistakes.length > 1 ? "s" : ""} guardado
              {mistakes.length > 1 ? "s" : ""} para repaso.
            </p>
          )}

          {error && <p className="mt-3 text-[12px] font-bold">{error}</p>}

          <div className="mt-6 grid gap-2">
            <Link href="/learn" className="btn btn-primary py-3.5 text-[13px]">
              Continuar la ruta <ArrowRight className="h-4 w-4" strokeWidth={3} />
            </Link>
            <button
              onClick={() => router.push(`/learn/${lesson.id}`)}
              className="btn btn-ghost py-3 text-[12px]"
            >
              Repetir lección
            </button>
          </div>
          <p className="mt-3 text-[10px] font-extrabold uppercase text-ink/45">XP total: {totalXp}</p>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- teoría */
  if (phase === "theory") {
    return (
      <div className="mx-auto max-w-2xl">
        <LessonHeader lesson={lesson} progress={0} onExit={() => router.push("/learn")} />

        <div className="mt-4 border-2 border-ink bg-white p-4 shadow-hard sm:p-6">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink/55">
            {lesson.courseTitle} · {lesson.minutes} min
          </p>
          <h1 className="mt-1.5 font-display text-[23px] uppercase leading-[1.05] tracking-tight sm:text-[27px]">
            {lesson.title}
          </h1>
          <p className="mt-1.5 text-[12.5px] font-semibold text-ink/60">{lesson.description}</p>

          <p className="mt-5 text-[14.5px] font-medium leading-[1.7]">{lesson.theory}</p>

          <div className="mt-5 border-2 border-ink bg-yellow-brand p-3.5">
            <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={3} /> Idea clave
            </p>
            <p className="mt-1.5 text-[14px] font-bold leading-relaxed">{lesson.keyIdea}</p>
          </div>

          <div className="mt-3 border-2 border-ink bg-cream-200 p-3.5">
            <p className="text-[10px] font-extrabold uppercase tracking-wider">Hazlo hoy</p>
            <p className="mt-1 text-[13px] font-medium leading-relaxed">{lesson.action}</p>
          </div>
        </div>

        <button
          onClick={() => setPhase("quiz")}
          className="btn btn-primary mt-4 w-full py-4 text-[14px]"
        >
          Empezar {lesson.exercises.length} ejercicios <ArrowRight className="h-4 w-4" strokeWidth={3} />
        </button>
      </div>
    );
  }

  /* ---------------------------------------------------------------- quiz */
  return (
    <div className="mx-auto max-w-2xl">
      <LessonHeader lesson={lesson} progress={progress} onExit={() => router.push("/learn")} />

      <div className="mt-4 border-2 border-ink bg-white p-4 shadow-hard sm:p-5">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-ink/50">
            Ejercicio {index + 1} de {lesson.exercises.length}
          </p>
          {showXp && (
            <span className="xp-float text-[12px] font-extrabold">
              +{Math.round(lesson.xp / lesson.exercises.length)} XP
            </span>
          )}
        </div>

        <h2 className="mt-2.5 text-[17px] font-extrabold leading-snug tracking-tight">{ex.prompt}</h2>

        {ex.code && (
          <pre className="mt-3 overflow-x-auto border-2 border-ink bg-ink p-3 text-[12px] leading-relaxed text-yellow-brand">
            <code>{ex.code}</code>
          </pre>
        )}

        <div className="mt-4">
          <ExerciseView
            exercise={ex}
            answer={answer}
            onChange={(a) => setAnswers((prev) => prev.map((x, i) => (i === index ? a : x)))}
            locked={checked}
            correct={correctNow}
          />
        </div>

        {checked && correctNow && (
          <div className="mt-3 border-2 border-ink bg-mint-brand px-3.5 py-3 text-[13px] font-medium">
            <b className="font-extrabold uppercase">¡Correcto!</b> {ex.explanation}
          </div>
        )}

        {!checked && ex.hint && (
          <div className="mt-3">
            {showHint ? (
              <p className="border-2 border-ink bg-cream-200 px-3.5 py-2.5 text-[12.5px] font-medium">
                <b className="font-extrabold uppercase">Pista:</b> {ex.hint}
              </p>
            ) : (
              <button
                onClick={() => setShowHint(true)}
                className="flex items-center gap-1.5 text-[12px] font-extrabold uppercase"
              >
                <Lightbulb className="h-3.5 w-3.5" strokeWidth={3} /> Ver pista
              </button>
            )}
          </div>
        )}
      </div>

      {!checked ? (
        <button onClick={check} disabled={!answer} className="btn btn-primary mt-4 w-full py-4 text-[14px]">
          Comprobar
        </button>
      ) : (
        <button onClick={next} disabled={submitting} className="btn btn-primary mt-4 w-full py-4 text-[14px]">
          {submitting ? "Guardando…" : isLast ? "Terminar lección" : "Siguiente"}{" "}
          <ArrowRight className="h-4 w-4" strokeWidth={3} />
        </button>
      )}

      {error && <p className="mt-2 text-center text-[12px] font-bold">{error}</p>}
    </div>
  );
}

function LessonHeader({
  lesson,
  progress,
  onExit,
}: {
  lesson: LessonWithCourse;
  progress: number;
  onExit: () => void;
}) {
  const { profile, mode } = useAuth();
  return (
    <div>
      <div className="flex items-center gap-2.5">
        <button
          onClick={onExit}
          className="grid h-9 w-9 shrink-0 place-items-center border-2 border-ink bg-white shadow-hard-sm"
          aria-label="Salir de la lección"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={3} />
        </button>
        <div className="progress flex-1">
          <span style={{ width: `${Math.max(3, progress)}%` }} />
        </div>
        <span className="flex items-center gap-1 border-2 border-ink bg-pink-brand px-1.5 py-1 text-[12px] font-extrabold tabular-nums">
          <Heart className="h-4 w-4" strokeWidth={2.8} />
          {profile.isPro ? "∞" : profile.hearts}
        </span>
      </div>
      <p className="mt-2 pl-11 text-[10px] font-extrabold uppercase tracking-wide text-ink/50">
        {lesson.courseTitle}
        {mode === "demo" && <span className="ml-2">· demo</span>}
      </p>
    </div>
  );
}

function Stat({
  icon,
  value,
  label,
  bg,
}: {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
  bg: string;
}) {
  return (
    <div className="border-2 border-ink px-2 py-2.5 shadow-hard-sm" style={{ background: bg }}>
      <p className="flex items-center justify-center gap-1 text-[16px] font-extrabold tabular-nums">
        {icon}
        {value}
      </p>
      <p className="mt-0.5 text-[9px] font-extrabold uppercase tracking-wide">{label}</p>
    </div>
  );
}
