import type { Exercise } from "./courses-shim";

export type { Exercise };

export type Answer =
  | { kind: "choice"; value: string }
  | { kind: "multi"; values: string[] }
  | { kind: "order"; order: string[] }
  | { kind: "text"; value: string };

const norm = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.,;:!¡?¿"'()]/g, "")
    .replace(/\s+/g, " ");

/** Evalúa una respuesta del alumno contra la definición del ejercicio. */
export function isCorrect(ex: Exercise, answer: Answer | null): boolean {
  if (!answer) return false;
  switch (ex.type) {
    case "multiple_choice":
    case "true_false":
    case "simulation":
      return answer.kind === "choice" && answer.value === (ex.correct.value as string);
    case "multi_select": {
      if (answer.kind !== "multi") return false;
      const expected = [...((ex.correct.values as string[]) ?? [])].sort();
      const got = [...answer.values].sort();
      return expected.length === got.length && expected.every((v, i) => v === got[i]);
    }
    case "ordering": {
      if (answer.kind !== "order") return false;
      const expected = (ex.correct.order as string[]) ?? [];
      return expected.length === answer.order.length && expected.every((v, i) => v === answer.order[i]);
    }
    case "fill_blank":
    case "short_answer": {
      if (answer.kind !== "text") return false;
      const acceptable = ((ex.correct.acceptable as string[]) ?? [String(ex.correct.value ?? "")]).map(norm);
      return acceptable.includes(norm(answer.value));
    }
    default:
      return false;
  }
}
export function scoreLesson(exercises: Exercise[], answers: (Answer | null)[]) {
  // Un ejercicio cuenta como acertado solo si está completamente correcto: así
  // el "x/y" que ve el alumno coincide con los ejercicios superados.
  let score = 0;
  exercises.forEach((ex, i) => {
    if (isCorrect(ex, answers[i] ?? null)) score += 1;
  });
  const total = exercises.length;
  return {
    score,
    total,
    perfect: score === total,
    passed: total > 0 && score / total >= 0.6,
    pct: total ? Math.round((score / total) * 100) : 0,
  };
}

export function xpForLesson(baseXp: number, perfect: boolean) {
  return perfect ? baseXp + 10 : baseXp;
}
