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
  if (
    exercise.type === "multiple_choice" ||
    exercise.type === "true_false" ||
    exercise.type === "simulation"
  ) {
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
            className={`flex items-center gap-3 border-2 border-ink px-3.5 py-3 text-left text-[14.5px] font-semibold transition ${
              showRight
                ? "bg-mint-brand shadow-hard-sm"
                : showWrong
                  ? "bg-pink-brand shadow-hard-sm"
                  : selected
                    ? "bg-purple-brand shadow-hard-sm"
                    : "bg-white hover:-translate-y-0.5 hover:shadow-hard-sm"
            } ${locked ? "cursor-default" : "cursor-pointer"}`}
          >
            <span
              className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-ink text-xs font-extrabold ${
                showRight ? "bg-mint-brand" : showWrong ? "bg-pink-brand" : selected ? "bg-purple-brand" : "bg-cream-200"
              }`}
            >
              {showRight ? (
                <Check className="h-4 w-4" strokeWidth={4} />
              ) : showWrong ? (
                <X className="h-4 w-4" strokeWidth={4} />
              ) : (
                opt.id.toUpperCase()
              )}
            </span>
            <span className="leading-snug">{opt.text}</span>
          </button>
        );
      })}
      {correct === false && (
        <div className="col-span-full mt-1 border-2 border-ink bg-yellow-brand px-3.5 py-3 text-[13px] font-medium shadow-hard-sm">
          <b className="font-extrabold uppercase">Ojo:</b> {exercise.explanation}
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
      <p className="text-[10px] font-extrabold uppercase tracking-wider text-ink/55">
        Selecciona todas las correctas
      </p>
      {(exercise.options ?? []).map((opt) => {
        const selected = values.includes(opt.id);
        const isRight = expected.includes(opt.id);
        return (
          <button
            key={opt.id}
            type="button"
            disabled={locked}
            onClick={() => onChange(selected ? values.filter((v) => v !== opt.id) : [...values, opt.id])}
            className={`flex items-center gap-3 border-2 border-ink px-3.5 py-3 text-left text-[14.5px] font-semibold transition ${
              locked && isRight
                ? "bg-mint-brand"
                : locked && selected && !isRight
                  ? "bg-pink-brand"
                  : selected
                    ? "bg-purple-brand shadow-hard-sm"
                    : "bg-white hover:-translate-y-0.5 hover:shadow-hard-sm"
            }`}
          >
            <span
              className={`grid h-5 w-5 shrink-0 place-items-center border-2 border-ink ${
                selected ? "bg-ink text-cream" : "bg-white"
              }`}
            >
              {selected && <Check className="h-3.5 w-3.5" strokeWidth={4} />}
            </span>
            {opt.text}
          </button>
        );
      })}
      {correct === false && (
        <div className="border-2 border-ink bg-yellow-brand px-3.5 py-3 text-[13px] font-medium shadow-hard-sm">
          <b className="font-extrabold uppercase">Ojo:</b> {exercise.explanation}
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
  const [pool, setPool] = useState<string[]>(() =>
    options.map((o) => o.id).filter((id) => !order.includes(id)),
  );

  useEffect(() => {
    setPool(options.map((o) => o.id).filter((id) => !order.includes(id)));
  }, [options, order]);

  const label = (id: string) => options.find((o) => o.id === id)?.text ?? "";
  const expected = (exercise.correct.order as string[]) ?? [];

  return (
    <div className="grid gap-3">
      <p className="text-[10px] font-extrabold uppercase tracking-wider text-ink/55">
        Toca en el orden correcto · {order.length}/{options.length}
      </p>
      <div className="min-h-[68px] border-2 border-dashed border-ink bg-cream-200 p-2">
        {order.length === 0 && (
          <p className="px-2 py-4 text-center text-[13px] font-semibold text-ink/45">
            Aún no has elegido nada
          </p>
        )}
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
                className={`flex items-center gap-3 border-2 border-ink px-3 py-2.5 text-left text-[13px] font-semibold ${
                  ok ? "bg-mint-brand" : bad ? "bg-pink-brand" : "bg-white"
                }`}
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center border-2 border-ink bg-yellow-brand text-[11px] font-extrabold">
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
              className="border-2 border-ink bg-white px-3 py-2.5 text-left text-[13px] font-semibold transition hover:-translate-y-0.5 hover:shadow-hard-sm"
            >
              {label(id)}
            </button>
          ))}
        </div>
      )}
      {correct === false && (
        <div className="border-2 border-ink bg-yellow-brand px-3.5 py-3 text-[13px] font-medium shadow-hard-sm">
          <b className="font-extrabold uppercase">Secuencia correcta:</b> {expected.map(label).join(" → ")}
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
        className={`w-full border-2 border-ink px-3.5 py-3.5 text-[15px] font-semibold outline-none transition placeholder:text-ink/30 ${
          correct === true
            ? "bg-mint-brand"
            : correct === false
              ? "bg-pink-brand"
              : "bg-white focus:shadow-hard-sm"
        }`}
      />
      {correct === false && (
        <div className="border-2 border-ink bg-yellow-brand px-3.5 py-3 text-[13px] font-medium shadow-hard-sm">
          <b className="font-extrabold uppercase">Respuesta esperada:</b> {hint}
          <br />
          <span className="text-ink/75">{exercise.explanation}</span>
        </div>
      )}
    </div>
  );
}
