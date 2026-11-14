'use client';

import React from 'react';
import { Check, Lock, X } from 'lucide-react';
import { Diagram } from '@/components/diagrams/Diagram';
import {
  AnswerState,
  isAnswerCorrect,
  parseNumber,
  pickOption,
  placePiece,
  tapPairing,
  unplacePiece,
} from '@/lib/curriculum/grading';
import { Exercise } from '@/lib/curriculum/types';
import { LocalizedText, l } from '@/lib/i18n/dictionaries';
import { cn } from '@/lib/utils';

export type Verdict = 'idle' | 'correct' | 'wrong';

interface Props {
  exercise: Exercise;
  answer: AnswerState;
  verdict: Verdict;
  locale: 'es' | 'en';
  disabled: boolean;
  labels: {
    yourAnswer: string;
    correctLine: string;
    formula: string;
    tolerance: string;
    lockedHint: string;
    pairingHint: string;
    bugHuntHint: string;
    typeNumber: string;
  };
  onAnswer: (next: AnswerState) => void;
  onPick: (sound: 'click') => void;
}

/* --------------------------------------------------------------- shell --- */

const TONE = {
  good: { border: '#58CC02', wash: '#D7FFB8', lip: '#58A700' },
  bad: { border: '#FF4B4B', wash: '#FFDFE0', lip: '#EA2B2B' },
  warn: { border: '#FF9600', wash: '#FFE8CC', lip: '#D97B00' },
  info: { border: '#1CB0F6', wash: '#DDF4FF', lip: '#1899D6' },
  mute: { border: '#AFAFAF', wash: '#F2F2F2', lip: '#9A9A9A' },
} as const;

/**
 * Deterministic shuffle seeded by a string. The order must be stable across
 * re-renders (React re-runs the component on every keystroke) but must NOT be
 * the authored order, otherwise pairing and ordering exercises are solvable by
 * position alone.
 */
function seededShuffle<T>(items: T[], seed: string): T[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    h = (Math.imul(h, 1103515245) + 12345) & 0x7fffffff;
    const j = h % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function ContextCard({ exercise, locale }: { exercise: Exercise; locale: 'es' | 'en' }) {  const ctx = exercise.context;
  if (!ctx) return null;
  const content = typeof ctx.content === 'string' ? ctx.content : l(ctx.content, locale);
  return (
    <div className="mb-4 overflow-hidden rounded-2xl border-2 border-swan bg-polar">
      {ctx.label && (
        <div className="border-b-2 border-swan px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-wolf">
          {l(ctx.label, locale)}
        </div>
      )}
      <pre
        className={cn(
          'overflow-x-auto px-3.5 py-3 text-[12.5px] leading-relaxed text-graphite',
          ctx.mono !== false && 'font-mono'
        )}
      >
        {content}
      </pre>
    </div>
  );
}

function OptionState(
  verdict: Verdict,
  selected: boolean,
  correct: boolean
): { border: string; bg: string; text: string } {
  if (verdict === 'idle') {
    return selected
      ? { border: '#1CB0F6', bg: '#DDF4FF', text: '#042C60' }
      : { border: '#E5E5E5', bg: '#FFFFFF', text: '#3C3C3C' };
  }
  if (correct) return { border: '#58CC02', bg: '#D7FFB8', text: '#58A700' };
  if (selected) return { border: '#FF4B4B', bg: '#FFDFE0', text: '#EA2B2B' };
  return { border: '#E5E5E5', bg: '#FFFFFF', text: '#AFAFAF' };
}

/* ---------------------------------------------------------- choice-like --- */

function OptionList({ exercise, answer, verdict, locale, disabled, onAnswer, onPick }: Props) {
  const selectedId = answer.kind === 'option' ? answer.selectedId : null;
  const options = exercise.options ?? [];

  return (
    <div className="space-y-2.5">
      {options.map((option, i) => {
        const selected = selectedId === option.id;
        const correct = option.id === exercise.correctOptionId;
        const s = OptionState(verdict, selected, correct);
        return (
          <button
            key={option.id}
            type="button"
            disabled={disabled}
            onClick={() => {
              if (disabled) return;
              onPick('click');
              onAnswer(pickOption(answer, option.id));
            }}
            className="flex w-full items-start gap-3 rounded-2xl border-2 px-3.5 py-3 text-left transition-colors duration-150"
            style={{ borderColor: s.border, backgroundColor: s.bg, color: s.text }}
          >
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 font-mono text-[11px] font-extrabold"
              style={{ borderColor: s.border, color: s.text }}
            >
              {i + 1}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13.5px] font-bold leading-snug">
                {l(option.label as LocalizedText, locale)}
              </span>
              {option.sublabel && (
                <span className="mt-0.5 block text-[11.5px] font-semibold leading-snug opacity-80">
                  {l(option.sublabel, locale)}
                </span>
              )}
            </span>
            {verdict !== 'idle' && correct && (
              <Check className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={3.2} />
            )}
            {verdict === 'wrong' && selected && !correct && (
              <X className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={3.2} />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------- ordering --- */

function OrderingBoard({ exercise, answer, verdict, locale, disabled, onAnswer, onPick, labels }: Props) {
  if (answer.kind !== 'order') return null;
  const pieces = exercise.pieces ?? [];
  const locked = new Set(exercise.lockedPieceIds ?? []);
  const placedIds = new Set(answer.placed.filter(Boolean) as string[]);
  const bank = seededShuffle(
    pieces.filter((p) => !placedIds.has(p.id)),
    exercise.id
  );
  const byId = new Map(pieces.map((p) => [p.id, p]));
  const correctIds = exercise.correctOrderIds ?? [];

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {answer.placed.map((id, slot) => {
          const piece = id ? byId.get(id) : undefined;
          const isLocked = id ? locked.has(id) : false;
          const slotCorrect = id === correctIds[slot];
          const border =
            verdict === 'idle'
              ? id
                ? isLocked
                  ? '#AFAFAF'
                  : '#1CB0F6'
                : '#E5E5E5'
              : slotCorrect
                ? '#58CC02'
                : '#FF4B4B';
          const bg =
            verdict === 'idle'
              ? id
                ? isLocked
                  ? '#F2F2F2'
                  : '#DDF4FF'
                : '#F7F7F7'
              : slotCorrect
                ? '#D7FFB8'
                : '#FFDFE0';

          return (
            <button
              key={slot}
              type="button"
              disabled={disabled || !id || isLocked}
              onClick={() => {
                if (disabled || !id || isLocked) return;
                onPick('click');
                onAnswer(unplacePiece(exercise, answer, slot));
              }}
              className="flex w-full items-start gap-2.5 rounded-2xl border-2 px-3.5 py-2.5 text-left"
              style={{
                borderColor: border,
                backgroundColor: bg,
                borderStyle: id ? 'solid' : 'dashed',
              }}
            >
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md font-mono text-[10px] font-extrabold text-wolf"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                {slot + 1}
              </span>
              <span className="min-w-0 flex-1 text-[13px] font-bold leading-snug text-graphite">
                {piece ? l(piece.text, locale) : ''}
              </span>
              {isLocked && <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-hare" strokeWidth={3} />}
              {verdict !== 'idle' && (slotCorrect ? (
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-ecto-dark" strokeWidth={3.2} />
              ) : (
                <X className="mt-0.5 h-4 w-4 shrink-0 text-cardinal-dark" strokeWidth={3.2} />
              ))}
            </button>
          );
        })}
      </div>

      {bank.length > 0 && (
        <div className="rounded-2xl border-2 border-swan bg-polar p-3">
          <div className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-wolf">
            {labels.yourAnswer}
          </div>
          <div className="flex flex-wrap gap-2">
            {bank.map((piece, i) => (
              <button
                key={piece.id}
                type="button"
                disabled={disabled}
                onClick={() => {
                  if (disabled) return;
                  onPick('click');
                  onAnswer(placePiece(exercise, answer, piece.id));
                }}
                className="rounded-xl border-2 border-swan bg-paper px-3 py-2 text-[12.5px] font-bold leading-snug text-graphite transition-colors hover:border-macaw"
              >
                <span className="mr-1.5 font-mono text-[10.5px] font-extrabold text-hare">{i + 1}</span>
                {l(piece.text, locale)}
              </button>
            ))}
          </div>
          {locked.size > 0 && (
            <p className="mt-2 text-[11px] font-semibold text-wolf">{labels.lockedHint}</p>
          )}
        </div>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- numeric --- */

function NumericInput({ exercise, answer, verdict, disabled, onAnswer, labels }: Props) {
  if (answer.kind !== 'numeric') return null;
  const parsed = parseNumber(answer.value);
  const correct = verdict === 'correct';
  const wrong = verdict === 'wrong';
  const border = correct ? '#58CC02' : wrong ? '#FF4B4B' : parsed !== null ? '#1CB0F6' : '#E5E5E5';

  return (
    <div className="space-y-3">
      <div
        className="flex items-center gap-2 rounded-2xl border-2 bg-paper px-4 py-3"
        style={{ borderColor: border, boxShadow: `0 3px 0 0 ${border}` }}
      >
        <input
          type="text"
          inputMode="decimal"
          autoFocus
          disabled={disabled}
          value={answer.value}
          placeholder={labels.typeNumber}
          onChange={(e) => onAnswer({ kind: 'numeric', value: e.target.value })}
          className="w-full bg-transparent font-mono text-[20px] font-extrabold tabular-nums text-navy outline-none placeholder:font-sans placeholder:text-[13px] placeholder:font-semibold placeholder:text-hare"
        />
        {exercise.unit && (
          <span className="shrink-0 font-mono text-[13px] font-extrabold text-wolf">
            {exercise.unit}
          </span>
        )}
      </div>

      {verdict !== 'idle' && (
        <div className="space-y-1.5 rounded-2xl border-2 border-swan bg-polar px-3.5 py-3">
          {exercise.formula && (
            <p className="font-mono text-[12.5px] font-bold text-graphite">
              <span className="mr-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-wolf">
                {labels.formula}
              </span>
              {l(exercise.formula, 'es')}
            </p>
          )}
          <p className="text-[12.5px] font-bold text-graphite">
            <span className="mr-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-wolf">
              {labels.correctLine}
            </span>
            {exercise.answer}
            {exercise.unit ? ` ${exercise.unit}` : ''}
            {exercise.tolerance ? (
              <span className="ml-2 font-semibold text-wolf">
                {labels.tolerance} ± {exercise.tolerance}
              </span>
            ) : null}
          </p>
        </div>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- pairing --- */

function PairingBoard({ exercise, answer, verdict, locale, disabled, onAnswer, onPick, labels }: Props) {
  if (answer.kind !== 'pairing') return null;
  const pairs = exercise.pairs ?? [];
  const lefts = pairs.map((p) => ({ id: p.leftId, text: p.left }));
  // The right column is shuffled with a seed derived from the exercise id, so
  // the order is stable across renders but never positional (left 1 ↔ right 1).
  const rights = seededShuffle(
    pairs.map((p) => ({ id: p.rightId, text: p.right })),
    exercise.id
  );
  const matchOfRight = (rightId: string) =>
    Object.entries(answer.matches).find(([, r]) => r === rightId)?.[0] ?? null;

  const pairCorrect = (leftId: string, rightId: string) =>
    pairs.some((p) => p.leftId === leftId && p.rightId === rightId);

  const cellStyle = (state: 'idle' | 'pending' | 'matched' | 'right' | 'wrong') => {
    switch (state) {
      case 'pending':
        return { borderColor: '#1CB0F6', bg: '#DDF4FF' };
      case 'matched':
        return { borderColor: '#1CB0F6', bg: '#DDF4FF' };
      case 'right':
        return { borderColor: '#58CC02', bg: '#D7FFB8' };
      case 'wrong':
        return { borderColor: '#FF4B4B', bg: '#FFDFE0' };
      default:
        return { borderColor: '#E5E5E5', bg: '#FFFFFF' };
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2.5">
        {lefts.map((left) => {
          const matchedRight = answer.matches[left.id] ?? null;
          const state =
            verdict === 'idle'
              ? answer.pendingLeft === left.id
                ? 'pending'
                : matchedRight
                  ? 'matched'
                  : 'idle'
              : matchedRight && pairCorrect(left.id, matchedRight)
                ? 'right'
                : 'wrong';
          const s = cellStyle(state as 'idle' | 'pending' | 'matched' | 'right' | 'wrong');
          return (
            <button
              key={left.id}
              type="button"
              disabled={disabled}
              onClick={() => {
                if (disabled) return;
                onPick('click');
                onAnswer(tapPairing(answer, 'left', left.id));
              }}
              className="rounded-2xl border-2 px-3 py-2.5 text-left text-[12.5px] font-bold leading-snug text-graphite"
              style={{ borderColor: s.borderColor, backgroundColor: s.bg }}
            >
              {l(left.text, locale)}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {rights.map((right) => {
          const matchedLeft = matchOfRight(right.id);
          const state =
            verdict === 'idle'
              ? matchedLeft
                ? 'matched'
                : 'idle'
              : matchedLeft && pairCorrect(matchedLeft, right.id)
                ? 'right'
                : 'wrong';
          const s = cellStyle(state as 'idle' | 'pending' | 'matched' | 'right' | 'wrong');
          return (
            <button
              key={right.id}
              type="button"
              disabled={disabled || !answer.pendingLeft}
              onClick={() => {
                if (disabled || !answer.pendingLeft) return;
                onPick('click');
                onAnswer(tapPairing(answer, 'right', right.id));
              }}
              className={cn(
                'rounded-2xl border-2 px-3 py-2.5 text-left text-[12.5px] font-bold leading-snug text-graphite',
                !answer.pendingLeft && verdict === 'idle' && !matchedLeft && 'opacity-60'
              )}
              style={{ borderColor: s.borderColor, backgroundColor: s.bg }}
            >
              {l(right.text, locale)}
            </button>
          );
        })}
      </div>

      <p className="text-[11px] font-semibold text-wolf">
        {verdict === 'idle' ? labels.pairingHint : labels.correctLine}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------- bug hunt --- */

function BugHuntBoard({ exercise, answer, verdict, locale, disabled, onAnswer, onPick, labels }: Props) {
  const selectedId = answer.kind === 'line' ? answer.selectedId : null;
  const lines = exercise.lines ?? [];

  return (
    <div className="space-y-2.5">
      <div className="overflow-hidden rounded-2xl border-2 border-graphite bg-[#042C60]">
        {lines.map((line, i) => {
          const selected = selectedId === line.id;
          const correct = line.id === exercise.correctLineId;
          const tone = verdict !== 'idle' ? (correct ? TONE.good : selected ? TONE.bad : TONE.mute) : null;
          const bg =
            verdict === 'idle'
              ? selected
                ? 'rgba(28,176,246,0.22)'
                : 'transparent'
              : correct
                ? tone!.wash
                : selected
                  ? tone!.wash
                  : 'rgba(255,255,255,0.06)';
          return (
            <button
              key={line.id}
              type="button"
              disabled={disabled}
              onClick={() => {
                if (disabled) return;
                onPick('click');
                onAnswer(pickOption(answer, line.id));
              }}
              className="flex w-full items-start gap-3 border-b border-white/10 px-3.5 py-2.5 text-left last:border-b-0"
              style={{ backgroundColor: bg }}
            >
              <span
                className="mt-0.5 w-5 shrink-0 font-mono text-[10.5px] font-extrabold"
                style={{ color: verdict === 'idle' ? '#8FA9C9' : tone?.lip ?? '#8FA9C9' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className="block font-mono text-[12.5px] font-semibold leading-snug"
                  style={{ color: verdict === 'idle' ? '#FFFFFF' : tone?.lip ?? '#FFFFFF' }}
                >
                  {line.text}
                </span>
                {line.label && verdict !== 'idle' && (correct || selected) && (
                  <span
                    className="mt-1 inline-block rounded-md px-1.5 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wide"
                    style={{ backgroundColor: tone!.wash, color: tone!.lip }}
                  >
                    {l(line.label, locale)}
                  </span>
                )}
              </span>
              {verdict !== 'idle' && correct && (
                <Check className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={3.2} style={{ color: TONE.good.lip }} />
              )}
              {verdict === 'wrong' && selected && !correct && (
                <X className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={3.2} style={{ color: TONE.bad.lip }} />
              )}
            </button>
          );
        })}
      </div>
      {verdict === 'idle' && (
        <p className="text-[11px] font-semibold text-wolf">{labels.bugHuntHint}</p>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------- main --- */

export function ExerciseBody(props: Props) {
  const { exercise, answer, verdict, locale, disabled } = props;
  const settled = verdict !== 'idle';
  const correct = settled && isAnswerCorrect(exercise, answer);

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className="rounded-lg px-2 py-1 text-[9.5px] font-extrabold uppercase tracking-[0.12em] text-paper"
          style={{ backgroundColor: '#042C60' }}
        >
          {l(exercise.badge, locale)}
        </span>
        <span className="flex items-center gap-0.5" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              className="h-1.5 w-3.5 rounded-full"
              style={{ backgroundColor: n <= exercise.difficulty ? '#FF9600' : '#E5E5E5' }}
            />
          ))}
        </span>
        <span className="ml-auto font-mono text-[11px] font-extrabold text-bee-dark">
          +{exercise.xp} XP
        </span>
      </div>

      <ContextCard exercise={exercise} locale={locale} />

      {exercise.diagram && (
        <div className="mb-4">
          <Diagram spec={exercise.diagram} />
        </div>
      )}

      <h2 className="mb-4 text-[17px] font-extrabold leading-snug tracking-tight text-navy sm:text-[19px]">
        {l(exercise.prompt, locale)}
      </h2>

      {exercise.format === 'ordering' || exercise.format === 'faded' ? (
        <OrderingBoard {...props} />
      ) : exercise.format === 'numeric' ? (
        <NumericInput {...props} />
      ) : exercise.format === 'pairing' ? (
        <PairingBoard {...props} />
      ) : exercise.format === 'bug_hunt' ? (
        <BugHuntBoard {...props} />
      ) : (
        <OptionList {...props} />
      )}

      {settled && (
        <div className="mt-4 space-y-2">
          {!correct && exercise.format !== 'numeric' && (
            <div className="rounded-xl border-2 border-swan bg-polar px-3.5 py-2.5">
              <div className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-wolf">
                {props.labels.correctLine}
              </div>
              <p className="mt-0.5 text-[12.5px] font-bold leading-snug text-graphite">
                {correctAnswerText(exercise, locale)}
              </p>
            </div>
          )}
          {exercise.hint && !correct && (
            <p className="text-[12px] font-semibold leading-relaxed text-wolf">
              {l(exercise.hint, locale)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function correctAnswerText(exercise: Exercise, locale: 'es' | 'en'): string {
  const pick = (t: LocalizedText) => l(t, locale);
  if (exercise.format === 'bug_hunt') {
    return exercise.lines?.find((ln) => ln.id === exercise.correctLineId)?.text ?? '';
  }
  if (exercise.format === 'pairing') {
    return (exercise.pairs ?? []).map((p) => `${pick(p.left)} → ${pick(p.right)}`).join(' · ');
  }
  if (exercise.format === 'ordering' || exercise.format === 'faded') {
    const byId = new Map((exercise.pieces ?? []).map((p) => [p.id, pick(p.text)]));
    return (exercise.correctOrderIds ?? []).map((id) => byId.get(id) ?? id).join(' → ');
  }
  return pick(exercise.options?.find((o) => o.id === exercise.correctOptionId)?.label ?? { es: '', en: '' });
}
