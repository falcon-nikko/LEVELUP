"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Flame, Gem, Lightbulb, Sparkles, Zap, Heart } from "lucide-react";
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
  const progress = phase === "theory" ? 0 : ((index + (checked ? 1 : 0)) / lesson.exercises.length) * 100;

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
    return (
      <div className="mx-auto max-w-xl py-6">
        <div className="card animate-pop overflow-hidden p-7 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-b from-brand-400 to-brand-600 shadow-[0_16px_40px_-14px_rgba(34,197,94,0.9)]">
            {result.perfect ? <Sparkles className="h-9 w-9 text-ink-950" /> : result.score / result.total >= 0.6 ? <Check className="h-10 w-10 text-ink-950" strokeWidth={3} /> : <Heart className="h-9 w-9 text-ink-950" />}
          </div>
          <h1 className="mt-4 text-2xl font-black tracking-tight">
            {result.perfect ? "¡Lección legendaria!" : result.score / result.total >= 0.6 ? "Lección completada" : "Lección terminada"}
          </h1>
          <p className="mt-1 text-sm text-white/55">
            {result.score}/{result.total} correctas · {Math.round((result.score / result.total) * 100)}%
          </p>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <Stat icon={<Zap className="h-4 w-4 text-brand-400" />} value={`+${result.xp}`} label="XP" />
            <Stat icon={<Flame className="h-4 w-4 text-orange-400" />} value={result.awarded?.streak ?? profile.streak} label="racha" />
            <Stat icon={<Gem className="h-4 w-4 text-sky-400" />} value={result.awarded?.gems ?? 0} label="gemas" />
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-left">
            <p className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-brand-300">
              <Lightbulb className="h-3.5 w-3.5" /> Acción para hoy
            </p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/80">{lesson.action}</p>
          </div>

          {!!mistakes.length && (
            <p className="mt-3 text-[11.5px] text-amber-200/70">
              {mistakes.length} ejercicio{mistakes.length > 1 ? "s" : ""} guardado{mistakes.length > 1 ? "s" : ""} para repaso.
            </p>
          )}

          {error && <p className="mt-3 text-[12px] text-rose-300">{error}</p>}

          <div className="mt-6 grid gap-2">
            <Link href="/learn" className="btn btn-primary py-3.5">
              Continuar la ruta <ArrowRight className="h-4 w-4" />
            </Link>
            <button onClick={() => router.push(`/learn/${lesson.id}`)} className="btn btn-ghost py-3">
              Repetir lección
            </button>
          </div>
          <p className="mt-3 text-[11px] text-white/30">XP total: {totalXp}</p>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- teoría */
  if (phase === "theory") {
    return (
      <div className="mx-auto max-w-2xl">
        <LessonHeader lesson={lesson} progress={0} onExit={() => router.push("/learn")} />

        <div className="card mt-4 p-5 sm:p-7">
          <p className="text-[10.5px] font-black uppercase tracking-[0.16em] text-brand-300/80">
            {lesson.courseTitle} · {lesson.minutes} min
          </p>
          <h1 className="mt-1.5 text-[26px] font-black leading-tight tracking-tight">{lesson.title}</h1>
          <p className="mt-1.5 text-sm text-white/55">{lesson.description}</p>

          <p className="mt-5 text-[15px] leading-[1.75] text-white/80">{lesson.theory}</p>

          <div className="mt-5 rounded-xl border border-brand-400/25 bg-brand-500/[0.08] p-4">
            <p className="flex items-center gap-1.5 text-[10.5px] font-black uppercase tracking-wider text-brand-300">
              <Sparkles className="h-3.5 w-3.5" /> Idea clave
            </p>
            <p className="mt-1.5 text-[14.5px] font-semibold leading-relaxed text-white/90">{lesson.keyIdea}</p>
          </div>

          <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-[10.5px] font-black uppercase tracking-wider text-white/45">Hazlo hoy</p>
            <p className="mt-1 text-[13.5px] leading-relaxed text-white/75">{lesson.action}</p>
          </div>
        </div>

        <button onClick={() => setPhase("quiz")} className="btn btn-primary mt-4 w-full py-4 text-[15px]">
          Empezar {lesson.exercises.length} ejercicios <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  /* ---------------------------------------------------------------- quiz */
  return (
    <div className="mx-auto max-w-2xl">
      <LessonHeader lesson={lesson} progress={progress} onExit={() => router.push("/learn")} />

      <div className="card mt-4 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-white/40">
            Ejercicio {index + 1} de {lesson.exercises.length}
          </p>
          {showXp && (
            <span className="xp-float text-[12px] font-black text-brand-400">+{Math.round(lesson.xp / lesson.exercises.length)} XP</span>
          )}
        </div>

        <h2 className="mt-2.5 text-[19px] font-bold leading-snug tracking-tight">{ex.prompt}</h2>

        {ex.code && (
          <pre className="mt-3 overflow-x-auto rounded-xl border border-white/10 bg-ink-950/80 p-3 text-[12.5px] leading-relaxed text-brand-200">
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
          <div className="mt-3 rounded-xl border border-brand-400/30 bg-brand-500/10 px-4 py-3 text-sm text-brand-100">
            <b className="text-brand-300">¡Correcto!</b> {ex.explanation}
          </div>
        )}

        {!checked && ex.hint && (
          <div className="mt-3">
            {showHint ? (
              <p className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[13px] text-white/65">
                <b className="text-white/80">Pista:</b> {ex.hint}
              </p>
            ) : (
              <button onClick={() => setShowHint(true)} className="flex items-center gap-1.5 text-[12.5px] font-bold text-amber-300/80 hover:text-amber-200">
                <Lightbulb className="h-3.5 w-3.5" /> Ver pista
              </button>
            )}
          </div>
        )}
      </div>

      {!checked ? (
        <button onClick={check} disabled={!answer} className="btn btn-primary mt-4 w-full py-4 text-[15px]">
          Comprobar
        </button>
      ) : (
        <button onClick={next} disabled={submitting} className="btn btn-primary mt-4 w-full py-4 text-[15px]">
          {submitting ? "Guardando…" : isLast ? "Terminar lección" : "Siguiente"} <ArrowRight className="h-4 w-4" />
        </button>
      )}

      {error && <p className="mt-2 text-center text-[12px] text-rose-300">{error}</p>}
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
      <div className="flex items-center gap-3">
        <button onClick={onExit} className="rounded-lg p-2 text-white/50 hover:bg-white/5 hover:text-white" aria-label="Salir de la lección">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-300 transition-all duration-300"
            style={{ width: `${Math.max(3, progress)}%` }}
          />
        </div>
        <span className="flex items-center gap-1 text-[13px] font-extrabold text-rose-400 tabular-nums">
          <Heart className="h-4 w-4" />
          {profile.isPro ? "∞" : profile.hearts}
        </span>
      </div>
      <p className="mt-2 pl-11 text-[11px] font-bold uppercase tracking-wider text-white/30">
        {lesson.courseTitle}
        {mode === "demo" && <span className="ml-2 text-amber-400/60">· demo</span>}
      </p>
    </div>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: React.ReactNode; label: string }) {
  return (
    <div className="card-tight px-2 py-3">
      <p className="flex items-center justify-center gap-1 text-[17px] font-black tabular-nums">
        {icon}
        {value}
      </p>
      <p className="mt-0.5 text-[9.5px] font-bold uppercase tracking-wider text-white/40">{label}</p>
    </div>
  );
}
