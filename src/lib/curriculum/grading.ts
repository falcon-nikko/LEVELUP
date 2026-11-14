import { Exercise } from '@/lib/curriculum/types';

/* ==========================================================================
   GRADING — pure functions, no React.
   The Lesson Player owns one `AnswerState` per exercise; these helpers decide
   when the Check button is enabled and whether the answer is right.
   ========================================================================== */

export type AnswerState =
  | { kind: 'option'; selectedId: string | null }
  | { kind: 'order'; placed: (string | null)[] }
  | { kind: 'numeric'; value: string }
  | { kind: 'pairing'; matches: Record<string, string>; pendingLeft: string | null }
  | { kind: 'line'; selectedId: string | null };

const OPTION_FORMATS = ['concept', 'worked_why', 'output', 'discrimination', 'scenario'] as const;

export function isOptionFormat(ex: Exercise): boolean {
  return (OPTION_FORMATS as readonly string[]).includes(ex.format);
}

/** Number of interaction slots the exercise exposes (used for 1-9 shortcuts). */
export function slotCount(ex: Exercise): number {
  switch (ex.format) {
    case 'ordering':
    case 'faded':
      return ex.pieces?.length ?? 0;
    case 'pairing':
      return ex.pairs?.length ?? 0;
    case 'bug_hunt':
      return ex.lines?.length ?? 0;
    case 'numeric':
      return 0;
    default:
      return ex.options?.length ?? 0;
  }
}

export function initialAnswer(ex: Exercise): AnswerState {
  switch (ex.format) {
    case 'ordering':
    case 'faded': {
      const correct = ex.correctOrderIds ?? [];
      const locked = new Set(ex.lockedPieceIds ?? []);
      return {
        kind: 'order',
        placed: correct.map((id) => (locked.has(id) ? id : null)),
      };
    }
    case 'numeric':
      return { kind: 'numeric', value: '' };
    case 'pairing':
      return { kind: 'pairing', matches: {}, pendingLeft: null };
    case 'bug_hunt':
      return { kind: 'line', selectedId: null };
    default:
      return { kind: 'option', selectedId: null };
  }
}

export function isAnswerReady(ex: Exercise, answer: AnswerState): boolean {
  switch (answer.kind) {
    case 'option':
    case 'line':
      return answer.selectedId !== null;
    case 'order':
      return answer.placed.length > 0 && answer.placed.every((id) => id !== null);
    case 'numeric': {
      const parsed = parseNumber(answer.value);
      return parsed !== null && answer.value.trim().length > 0;
    }
    case 'pairing': {
      const total = ex.pairs?.length ?? 0;
      return total > 0 && Object.keys(answer.matches).length === total;
    }
    default:
      return false;
  }
}

export function parseNumber(raw: string): number | null {
  if (!raw) return null;
  const cleaned = raw
    .replace(/\s|€/g, '')
    .replace(/\.(?=\d{3}\b)/g, '')
    .replace(',', '.');
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : null;
}

export function isAnswerCorrect(ex: Exercise, answer: AnswerState): boolean {
  switch (answer.kind) {
    case 'option':
      return answer.selectedId !== null && answer.selectedId === ex.correctOptionId;
    case 'line':
      return answer.selectedId !== null && answer.selectedId === ex.correctLineId;
    case 'order': {
      const correct = ex.correctOrderIds ?? [];
      return (
        answer.placed.length === correct.length &&
        answer.placed.every((id, i) => id === correct[i])
      );
    }
    case 'numeric': {
      const value = parseNumber(answer.value);
      if (value === null) return false;
      const tolerance = ex.tolerance ?? 0;
      return Math.abs(value - (ex.answer ?? 0)) <= tolerance;
    }
    case 'pairing': {
      const pairs = ex.pairs ?? [];
      return pairs.every((pair) => answer.matches[pair.leftId] === pair.rightId);
    }
    default:
      return false;
  }
}

/* ==========================================================================
   MUTATIONS — each returns a NEW state so the player can stay declarative
   ========================================================================== */

export function pickOption(answer: AnswerState, id: string): AnswerState {
  if (answer.kind === 'option') return { ...answer, selectedId: id };
  if (answer.kind === 'line') return { ...answer, selectedId: id };
  return answer;
}

export function placePiece(
  ex: Exercise,
  answer: AnswerState,
  pieceId: string,
  localeOrder?: (string | null)[]
): AnswerState {
  if (answer.kind !== 'order') return answer;
  const locked = new Set(ex.lockedPieceIds ?? []);
  if (locked.has(pieceId)) return answer;
  if (answer.placed.includes(pieceId)) return answer;

  const next = localeOrder ? [...localeOrder] : [...answer.placed];
  const slot = next.findIndex((id) => id === null);
  if (slot === -1) return answer;
  next[slot] = pieceId;
  return { kind: 'order', placed: next };
}

/** Tap a filled slot to send the piece back to the bank. */
export function unplacePiece(ex: Exercise, answer: AnswerState, slot: number): AnswerState {
  if (answer.kind !== 'order') return answer;
  const locked = new Set(ex.lockedPieceIds ?? []);
  const current = answer.placed[slot];
  if (!current || locked.has(current)) return answer;
  const next = [...answer.placed];
  next[slot] = null;
  return { kind: 'order', placed: next };
}

export function setNumeric(answer: AnswerState, value: string): AnswerState {
  if (answer.kind !== 'numeric') return answer;
  return { ...answer, value };
}

/** Pairing is a two-tap interaction: left column first, then right column. */
export function tapPairing(answer: AnswerState, side: 'left' | 'right', id: string): AnswerState {
  if (answer.kind !== 'pairing') return answer;

  if (side === 'left') {
    // Tapping an already-matched left unmatches it so the user can redo it.
    if (answer.matches[id]) {
      const next = { ...answer.matches };
      delete next[id];
      return { kind: 'pairing', matches: next, pendingLeft: id };
    }
    return { ...answer, pendingLeft: id };
  }

  if (!answer.pendingLeft) return answer;
  const next = { ...answer.matches };
  // One right item can only belong to one left item.
  for (const [left, right] of Object.entries(next)) {
    if (right === id) delete next[left];
  }
  next[answer.pendingLeft] = id;
  return { kind: 'pairing', matches: next, pendingLeft: null };
}

/* ==========================================================================
   WRONG-ANSWER PAYLOAD — what the gentle banner shows
   ========================================================================== */

export function correctAnswerSummary(ex: Exercise, locale: 'es' | 'en'): string {
  const pick = (t: { es: string; en: string }) => t[locale] || t.es;

  if (ex.format === 'numeric') {
    const unit = ex.unit ? ` ${ex.unit}` : '';
    return `${ex.answer}${unit}`;
  }

  if (ex.format === 'bug_hunt') {
    const line = ex.lines?.find((l) => l.id === ex.correctLineId);
    return line ? line.text : '';
  }

  if (ex.format === 'pairing') {
    return (ex.pairs ?? [])
      .map((p) => `${pick(p.left)} → ${pick(p.right)}`)
      .join(' · ');
  }

  if (ex.format === 'ordering' || ex.format === 'faded') {
    const byId = new Map((ex.pieces ?? []).map((p) => [p.id, pick(p.text)]));
    return (ex.correctOrderIds ?? []).map((id) => byId.get(id) ?? id).join(' → ');
  }

  const option = ex.options?.find((o) => o.id === ex.correctOptionId);
  return option ? pick(option.label) : '';
}
