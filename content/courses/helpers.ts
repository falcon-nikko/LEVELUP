import type { Exercise, Option } from "./types";

export const mc = (
  id: string,
  prompt: string,
  options: Option[],
  correctId: string,
  explanation: string,
  hint?: string,
): Exercise => ({ id, type: "multiple_choice", prompt, options, correct: { value: correctId }, explanation, hint });

export const tf = (id: string, prompt: string, value: boolean, explanation: string): Exercise => ({
  id,
  type: "true_false",
  prompt,
  options: [
    { id: "true", text: "Verdadero" },
    { id: "false", text: "Falso" },
  ],
  correct: { value: value ? "true" : "false" },
  explanation,
});

export const blank = (
  id: string,
  prompt: string,
  acceptable: string[],
  explanation: string,
  hint?: string,
): Exercise => ({ id, type: "fill_blank", prompt, correct: { acceptable, value: acceptable[0] }, explanation, hint });

export const multi = (
  id: string,
  prompt: string,
  options: Option[],
  values: string[],
  explanation: string,
): Exercise => ({ id, type: "multi_select", prompt, options, correct: { values }, explanation });

export const order = (
  id: string,
  prompt: string,
  options: Option[],
  sequence: string[],
  explanation: string,
): Exercise => ({ id, type: "ordering", prompt, options, correct: { order: sequence }, explanation });

export const sim = (
  id: string,
  prompt: string,
  options: Option[],
  correctId: string,
  explanation: string,
): Exercise => ({ id, type: "simulation", prompt, options, correct: { value: correctId }, explanation });
