import { LocalizedText } from '@/lib/i18n/dictionaries';
import { ExerciseOption } from '@/lib/curriculum/types';

/** Bilingual literal without the 4-line object boilerplate. */
export const bi = (es: string, en: string): LocalizedText => ({ es, en });

/** Option with bilingual label in one line. */
export const opt = (id: string, es: string, en: string, subEs?: string, subEn?: string): ExerciseOption => ({
  id,
  label: bi(es, en),
  sublabel: subEs && subEn ? bi(subEs, subEn) : undefined,
});

/**
 * Difficulty → XP ladder. Harder items must pay more, otherwise the incentive
 * is to rush through the easy ones.
 */
export const XP_BY_DIFFICULTY = { 1: 8, 2: 10, 3: 12, 4: 15, 5: 20 } as const;

/**
 * Sorts a lesson's exercises into the evidence-based ladder:
 * ascending difficulty, but always landing on an easy item so the session
 * ends on success.
 */
export function orderExercises<T extends { difficulty: number }>(exercises: T[]): T[] {
  const sorted = [...exercises].sort((a, b) => a.difficulty - b.difficulty);
  if (sorted.length < 3) return sorted;
  const last = sorted[sorted.length - 1];
  const softLanding = sorted.find((e) => e.difficulty <= 2 && e !== last);
  if (!softLanding) return sorted;
  const rest = sorted.filter((e) => e !== softLanding && e !== last);
  return [...rest, last, softLanding];
}
