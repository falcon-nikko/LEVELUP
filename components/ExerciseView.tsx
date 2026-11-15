"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, X } from "lucide-react";
import type { Exercise } from "@/lib/courses-shim";
import type { Answer } from "@/lib/lesson-engine";

type Props = {
  exercise: Exercise;
  answer: Answer | null;
  onChange: (a: Answer | null) => void;
  locked: boolean;
  correct: boolean | null;
};

export function ExerciseView({ exercise, answer, onChange, locked, correct }: Props) {
  if (exercise.type === "multiple_choice" || exercise.type === "true_false" || exercise.type === "simulation") {
    return (
      <Choices
        exercise={exercise}
        value={answer?.kind === "choice" ? answer.value : null}
        onPick={(v) => !locked && onChange(v ? { kind: "choice", value: v } : null)}
        locked={locked}
        correct={correct}
        twoCols={exercise.type === "true_false"}
      />
    );
  }
  if (exercise.type === "multi_select") {
    return (
      <MultiChoices
        exercise={exercise}
        values={answer?.kind === "multi" ? answer.values : []}
        onChange={(values) => onChange(values.length ? { kind: "multi", values } : null)}
        locked={locked}
        correct={correct}
      />
    );
  }
  if (exercise.type === "ordering") {
    return (
      <Ordering
        exercise={exercise}
        order={answer?.kind === "order" ? answer.order : []}
        onChange={(order) => onChange(order.length ? { kind: "order", order } : null)}
        locked={locked}
        correct={correct}
      />
    );
  }
  return (
    <TextAnswer
      exercise={exercise}
      value={answer?.kind === "text" ? answer.value : ""}
      onChange={(value) => onChange(value.trim() ? { kind: "text", value } : null)}
      locked={locked}
      correct={correct}
    />
  );
}

function Choices({
  exercise,
  value,
  onPick,
  locked,
  correct,
  twoCols,
}: {
  exercise: Exercise;
  value: string | null;
  onPick: (v: string | null) => void;
  locked: boolean;
  correct: boolean | null;
  twoCols?: boolean;
}) {
  return (
    <div className={`grid gap-2.5 ${twoCols ? "grid-cols-2" : "grid-cols-1"}`}>
      {(exercise.options ?? []).map((opt) => {
        const selected = value === opt.id;
        const isRight = exercise.correct.value === opt.id;
        const showRight = locked && isRight;
        const showWrong = locked && selected && !isRight;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onPick(selected ? null : opt.id)}
            disabled={locked}
            className={`group flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-[15px] font-semibold transition ${
              showRight
                ? "border-brand-400/60 bg-brand-500/15 text-brand-300"
                : showWrong
                  ? "border-rose-400/50 bg-rose-500/10 text-rose-200"
                  : selected
                    ? "border-brand-400/50 bg-brand-500/10 text-white"
                    : "border-white/10 bg-white/[0.04] text-white/85 hover:border-white/25 hover:bg-white/[0.07]"
            } ${locked ? "cursor-default" : "cursor-pointer"}`}
          >
            <span
              className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border text-xs font-black ${
                showRight
                  ? "border-brand-400/60 bg-brand-500 text-ink-950"
                  : showWrong
                    ? "border-rose-400/60 bg-rose-500 text-white"
                    : selected
                      ? "border-brand-400/60 bg-brand-500/25 text-brand-200"
                      : "border-white/15 text-white/50"
              }`}
            >
              {showRight ? <Check className="h-4 w-4" /> : showWrong ? <X className="h-4 w-4" /> : opt.id.toUpperCase()}
            </span>
            <span className="leading-snug">{opt.text}</span>
          </button>
        );
      })}
      {correct === false && (
        <div className="col-span-full mt-1 rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
          <b>Ojo:</b> {exercise.explanation}
        </div>
      )}
    </div>
  );
}

function MultiChoices({
  exercise,
  values,
  onChange,
  locked,
  correct,
}: {
  exercise: Exercise;
  values: string[];
  onChange: (v: string[]) => void;
  locked: boolean;
  correct: boolean | null;
}) {
  const expected = (exercise.correct.values as string[]) ?? [];
  return (
    <div className="grid gap-2.5">
      <p className="text-xs font-bold uppercase tracking-wider text-white/40">Selecciona todas las correctas</p>
      {(exercise.options ?? []).map((opt) => {
        const selected = values.includes(opt.id);
        const isRight = expected.includes(opt.id);
        return (
          <button
            key={opt.id}
            type="button"
            disabled={locked}
            onClick={() => onChange(selected ? values.filter((v) => v !== opt.id) : [...values, opt.id])}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-[15px] font-semibold transition ${
              locked && isRight
                ? "border-brand-400/60 bg-brand-500/15"
                : locked && selected && !isRight
                  ? "border-rose-400/50 bg-rose-500/10"
                  : selected
                    ? "border-brand-400/50 bg-brand-500/10"
                    : "border-white/10 bg-white/[0.04] hover:border-white/25"
            }`}
          >
            <span
              className={`grid h-5 w-5 shrink-0 place-items-center rounded border ${
                selected ? "border-brand-400 bg-brand-500 text-ink-950" : "border-white/25"
              }`}
            >
              {selected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
            </span>
            {opt.text}
          </button>
        );
      })}
      {correct === false && (
        <div className="rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
          <b>Ojo:</b> {exercise.explanation}
        </div>
      )}
    </div>
  );
}

function Ordering({
  exercise,
  order,
  onChange,
  locked,
  correct,
}: {
  exercise: Exercise;
  order: string[];
  onChange: (o: string[]) => void;
  locked: boolean;
  correct: boolean | null;
}) {
  const options = exercise.options ?? [];
  const [pool, setPool] = useState<string[]>(() => options.map((o) => o.id).filter((id) => !order.includes(id)));

  useEffect(() => {
    setPool(options.map((o) => o.id).filter((id) => !order.includes(id)));
  }, [options, order]);

  const label = (id: string) => options.find((o) => o.id === id)?.text ?? "";
  const expected = (exercise.correct.order as string[]) ?? [];

  return (
    <div className="grid gap-3">
      <p className="text-xs font-bold uppercase tracking-wider text-white/40">
        Toca en el orden correcto · {order.length}/{options.length}
      </p>
      <div className="min-h-[68px] rounded-xl border border-dashed border-white/15 bg-white/[0.03] p-2">
        {order.length === 0 && <p className="px-2 py-4 text-center text-sm text-white/35">Aún no has elegido nada</p>}
        <div className="grid gap-2">
          {order.map((id, i) => {
            const ok = locked && expected[i] === id;
            const bad = locked && expected[i] !== id;
            return (
              <button
                key={id}
                type="button"
                disabled={locked}
                onClick={() => onChange(order.filter((x) => x !== id))}
                className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm font-semibold ${
                  ok ? "border-brand-400/60 bg-brand-500/15" : bad ? "border-rose-400/50 bg-rose-500/10" : "border-white/12 bg-white/[0.06]"
                }`}
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-white/10 text-[11px] font-black">
                  {i + 1}
                </span>
                {label(id)}
              </button>
            );
          })}
        </div>
      </div>
      {pool.length > 0 && (
        <div className="grid gap-2">
          {pool.map((id) => (
            <button
              key={id}
              type="button"
              disabled={locked}
              onClick={() => onChange([...order, id])}
              className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-left text-sm font-semibold text-white/85 hover:border-white/25 hover:bg-white/[0.08]"
            >
              {label(id)}
            </button>
          ))}
        </div>
      )}
      {correct === false && (
        <div className="rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
          <b>Secuencia correcta:</b> {expected.map(label).join(" → ")}
        </div>
      )}
    </div>
  );
}

function TextAnswer({
  exercise,
  value,
  onChange,
  locked,
  correct,
}: {
  exercise: Exercise;
  value: string;
  onChange: (v: string) => void;
  locked: boolean;
  correct: boolean | null;
}) {
  const hint = useMemo(() => ((exercise.correct.acceptable as string[]) ?? [])[0], [exercise]);
  return (
    <div className="grid gap-2">
      <input
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={locked}
        placeholder="Escribe tu respuesta…"
        className={`w-full rounded-xl border bg-white/[0.04] px-4 py-3.5 text-[15px] font-semibold outline-none transition placeholder:text-white/30 ${
          correct === true
            ? "border-brand-400/60 text-brand-200"
            : correct === false
              ? "border-rose-400/50 text-rose-200"
              : "border-white/12 focus:border-brand-400/60"
        }`}
      />
      {correct === false && (
        <div className="rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
          <b>Respuesta esperada:</b> {hint}
          <br />
          <span className="text-amber-100/80">{exercise.explanation}</span>
        </div>
      )}
    </div>
  );
}
