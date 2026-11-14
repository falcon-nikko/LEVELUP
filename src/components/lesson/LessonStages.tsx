'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  ExternalLink,
  Gem,
  GraduationCap,
  Lightbulb,
  Swords,
  Timer,
  Zap,
} from 'lucide-react';
import { Diagram } from '@/components/diagrams/Diagram';
import { Lesson, TheoryBlock, WorkedExample } from '@/lib/curriculum/types';
import { AffiliateTool } from '@/lib/curriculum/affiliates';
import { LocalizedText, l } from '@/lib/i18n/dictionaries';
import { Mascot } from '@/components/Mascot';

export interface Accent {
  accent: string;
  accentLip: string;
  accentWash: string;
  accentInk: string;
  accentSoft: string;
  badgeCode: string;
  unitTitle: LocalizedText;
  trackName: LocalizedText;
}

export interface StageLabels {
  startLesson: string;
  skipToPractice: string;
  outcomeLabel: string;
  whyLabel: string;
  exampleBadge: string;
  situationLabel: string;
  resultLabel: string;
  selfCheckLabel: string;
  recapTitle: string;
  missionObjective: string;
  missionProof: string;
  missionSteps: string;
  actionMissionBadge: string;
  recommendedTool: string;
  openToolBtn: string;
  markMissionDone: string;
  missionCompleted: string;
  theoryCount: string;
  exerciseCount: string;
  nextBlock: string;
}

/* --------------------------------------------------------------- intro --- */

export function LessonIntro({
  lesson,
  accent,
  labels,
  locale,
  onStart,
  onSkipToPractice,
  boost,
}: {
  lesson: Lesson;
  accent: Accent;
  labels: StageLabels;
  locale: 'es' | 'en';
  onStart: () => void;
  onSkipToPractice: () => void;
  /** Optional double-XP boost control, hidden when unavailable. */
  boost?: { active: boolean; affordable: boolean; gems: number; onActivate: () => void };
}) {
  const chips = [
    { Icon: Timer, value: `${lesson.durationMin} min` },
    { Icon: Zap, value: `${lesson.xpReward} XP` },
    { Icon: BookOpen, value: `${lesson.theory.length} · ${labels.theoryCount}` },
    { Icon: GraduationCap, value: `${lesson.exercises.length} · ${labels.exerciseCount}` },
  ];

  return (
    <div className="mx-auto w-full max-w-xl px-5 pb-32 pt-8">
      <div className="flex items-center gap-2">
        <span
          className="rounded-lg px-2 py-1 font-mono text-[10px] font-extrabold tracking-[0.12em]"
          style={{ backgroundColor: accent.accent, color: accent.accentInk }}
        >
          {accent.badgeCode}
        </span>
        <span className="text-[11.5px] font-extrabold uppercase tracking-[0.1em] text-wolf">
          {l(accent.unitTitle, locale)}
        </span>
      </div>

      <h1 className="mt-4 text-[30px] font-extrabold leading-[1.1] tracking-tight text-navy sm:text-[36px]">
        {l(lesson.title, locale)}
      </h1>

      <div className="mt-4 flex items-end gap-3">
        <Mascot mood="idle" size={58} withStep animateKey={lesson.slug} className="mb-1" />
        <div
          className="min-w-0 flex-1 rounded-2xl border-2 px-4 py-3.5"
          style={{ borderColor: accent.accent, backgroundColor: accent.accentWash }}
        >
          <div
            className="text-[10px] font-extrabold uppercase tracking-[0.12em]"
            style={{ color: accent.accentLip }}
          >
            {labels.outcomeLabel}
          </div>
          <p className="mt-1 text-[14px] font-bold leading-snug text-navy">
            {l(lesson.outcome, locale)}
          </p>
        </div>
      </div>

      {boost && (
        <div
          className="mt-4 flex items-center gap-3 rounded-2xl border-2 px-3.5 py-2.5"
          style={{
            borderColor: boost.active ? '#58CC02' : '#FFC800',
            backgroundColor: boost.active ? '#D7FFB8' : '#FFF4CC',
          }}
        >
          <Zap
            className="h-4 w-4 shrink-0"
            strokeWidth={3}
            style={{ color: boost.active ? '#58A700' : '#E5A800' }}
          />
          <p className="min-w-0 flex-1 text-[12px] font-bold leading-snug text-navy">
            {boost.active
              ? locale === 'es'
                ? 'Doble XP activo durante esta sesión.'
                : 'Double XP is active for this session.'
              : locale === 'es'
                ? `Duplica el XP de esta lección por 30 gemas (tienes ${boost.gems}).`
                : `Double the XP of this lesson for 30 gems (you have ${boost.gems}).`}
          </p>
          {!boost.active && (
            <button
              type="button"
              disabled={!boost.affordable}
              onClick={boost.onActivate}
              className={cnChip(boost.affordable)}
              style={
                boost.affordable
                  ? ({ backgroundColor: '#FFC800', color: '#042C60', '--lip': '#E5A800' } as React.CSSProperties)
                  : undefined
              }
            >
              <Gem className="h-3.5 w-3.5" strokeWidth={3} />
              30
            </button>
          )}
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {chips.map(({ Icon, value }) => (
          <span
            key={value}
            className="flex items-center gap-1.5 rounded-xl border-2 border-swan bg-paper px-3 py-1.5 text-[11.5px] font-extrabold text-graphite"
          >
            <Icon className="h-3.5 w-3.5 text-wolf" strokeWidth={2.8} />
            {value}
          </span>
        ))}
      </div>

      <ol className="mt-6 space-y-2">
        {lesson.theory.map((block, i) => (
          <li key={block.id} className="flex items-start gap-2.5 text-[13px] font-semibold text-graphite">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-polar font-mono text-[10px] font-extrabold text-wolf">
              {i + 1}
            </span>
            {l(block.heading, locale)}
          </li>
        ))}
      </ol>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t-2 border-swan bg-paper px-5 py-4">
        <div className="mx-auto flex w-full max-w-xl flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={onStart}
            className="btn-arcade flex-1"
            style={{ backgroundColor: accent.accent, color: accent.accentInk, '--lip': accent.accentLip } as React.CSSProperties}
          >
            {labels.startLesson}
            <ArrowRight className="h-4 w-4" strokeWidth={3} />
          </button>
          <button type="button" onClick={onSkipToPractice} className="btn-ghost sm:w-auto">
            {labels.skipToPractice}
          </button>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- theory --- */

export function TheoryScreen({
  block,
  index,
  total,
  accent,
  labels,
  locale,
  onNext,
}: {
  block: TheoryBlock;
  index: number;
  total: number;
  accent: Accent;
  labels: StageLabels;
  locale: 'es' | 'en';
  onNext: () => void;
}) {
  return (
    <div className="mx-auto w-full max-w-xl px-5 pb-32 pt-6">
      <div className="flex items-center gap-2 text-[10.5px] font-extrabold uppercase tracking-[0.12em] text-wolf">
        <BookOpen className="h-3.5 w-3.5" strokeWidth={3} />
        {labels.theoryCount} · {index + 1}/{total}
      </div>

      <h2 className="mt-2.5 text-[23px] font-extrabold leading-tight tracking-tight text-navy">
        {l(block.heading, locale)}
      </h2>

      <p className="mt-3 text-[14.5px] font-semibold leading-relaxed text-graphite">
        {l(block.body, locale)}
      </p>

      {block.diagram && (
        <div className="mt-5">
          <Diagram spec={block.diagram} />
        </div>
      )}

      {block.bullets && block.bullets.length > 0 && (
        <ul className="mt-5 space-y-2">
          {block.bullets.map((bullet, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 rounded-xl border-2 border-swan bg-paper px-3.5 py-2.5 text-[13px] font-semibold leading-snug text-graphite"
            >
              <span
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: accent.accent }}
              />
              {l(bullet, locale)}
            </li>
          ))}
        </ul>
      )}

      {block.why && (
        <div
          className="mt-5 flex items-start gap-2.5 rounded-2xl border-2 px-3.5 py-3"
          style={{ borderColor: '#FFC800', backgroundColor: '#FFF4CC' }}
        >
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-fox-dark" strokeWidth={2.8} />
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-fox-dark">
              {labels.whyLabel}
            </div>
            <p className="mt-0.5 text-[13px] font-bold leading-snug text-navy">
              {l(block.why, locale)}
            </p>
          </div>
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-20 border-t-2 border-swan bg-paper px-5 py-4">
        <div className="mx-auto w-full max-w-xl">
          <button
            type="button"
            onClick={onNext}
            className="btn-arcade w-full"
            style={{ backgroundColor: accent.accent, color: accent.accentInk, '--lip': accent.accentLip } as React.CSSProperties}
          >
            {labels.nextBlock}
            <ArrowRight className="h-4 w-4" strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- example --- */

export type ExamplePhase =
  | { kind: 'situation' }
  | { kind: 'step'; index: number }
  | { kind: 'result' };

export function ExampleScreen({
  example,
  phase,
  accent,
  labels,
  locale,
  onNext,
}: {
  example: WorkedExample;
  phase: ExamplePhase;
  accent: Accent;
  labels: StageLabels;
  locale: 'es' | 'en';
  onNext: () => void;
}) {
  const total = example.steps.length;
  const stepIndex = phase.kind === 'step' ? phase.index : -1;

  return (
    <div className="mx-auto w-full max-w-xl px-5 pb-32 pt-6">
      <div className="flex items-center gap-2 text-[10.5px] font-extrabold uppercase tracking-[0.12em] text-wolf">
        <GraduationCap className="h-3.5 w-3.5" strokeWidth={3} />
        {labels.exampleBadge}
        {phase.kind === 'step' && <span>· {stepIndex + 1}/{total}</span>}
      </div>

      <h2 className="mt-2.5 text-[21px] font-extrabold leading-tight tracking-tight text-navy">
        {l(example.title, locale)}
      </h2>

      {phase.kind === 'situation' && (
        <div className="mt-4 rounded-2xl border-2 border-swan bg-polar px-4 py-3.5">
          <div className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-wolf">
            {labels.situationLabel}
          </div>
          <p className="mt-1 text-[14px] font-semibold leading-relaxed text-graphite">
            {l(example.situation, locale)}
          </p>
        </div>
      )}

      {phase.kind === 'step' && (
        <>
          <h3
            className="mt-4 text-[16px] font-extrabold leading-snug"
            style={{ color: accent.accentLip }}
          >
            {l(example.steps[stepIndex].label, locale)}
          </h3>
          <p className="mt-2 text-[14.5px] font-semibold leading-relaxed text-graphite">
            {l(example.steps[stepIndex].detail, locale)}
          </p>
          {example.steps[stepIndex].diagram && (
            <div className="mt-5">
              <Diagram spec={example.steps[stepIndex].diagram!} />
            </div>
          )}
        </>
      )}

      {phase.kind === 'result' && (
        <div
          className="mt-4 rounded-2xl border-2 px-4 py-3.5"
          style={{ borderColor: '#58CC02', backgroundColor: '#D7FFB8' }}
        >
          <div className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-ecto-dark">
            {labels.resultLabel}
          </div>
          <p className="mt-1 text-[14.5px] font-bold leading-relaxed text-navy">
            {l(example.result, locale)}
          </p>
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-20 border-t-2 border-swan bg-paper px-5 py-4">
        <div className="mx-auto w-full max-w-xl">
          <button
            type="button"
            onClick={onNext}
            className="btn-arcade w-full"
            style={{ backgroundColor: accent.accent, color: accent.accentInk, '--lip': accent.accentLip } as React.CSSProperties}
          >
            {labels.nextBlock}
            <ArrowRight className="h-4 w-4" strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- recap --- */

export function RecapScreen({
  lesson,
  accent,
  labels,
  locale,
  onNext,
}: {
  lesson: Lesson;
  accent: Accent;
  labels: StageLabels;
  locale: 'es' | 'en';
  onNext: () => void;
}) {
  return (
    <div className="mx-auto w-full max-w-xl px-5 pb-32 pt-6">
      <h2 className="text-[23px] font-extrabold leading-tight tracking-tight text-navy">
        {labels.recapTitle}
      </h2>

      <ul className="mt-5 space-y-3">
        {lesson.recap.map((line, i) => (
          <li
            key={i}
            className="flex items-start gap-3 rounded-2xl border-2 bg-paper px-4 py-3.5"
            style={{ borderColor: accent.accent }}
          >
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-paper"
              style={{ backgroundColor: accent.accent }}
            >
              <Check className="h-3.5 w-3.5" strokeWidth={3.4} />
            </span>
            <span className="text-[14px] font-bold leading-snug text-navy">{l(line, locale)}</span>
          </li>
        ))}
      </ul>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t-2 border-swan bg-paper px-5 py-4">
        <div className="mx-auto w-full max-w-xl">
          <button
            type="button"
            onClick={onNext}
            className="btn-arcade w-full"
            style={{ backgroundColor: accent.accent, color: accent.accentInk, '--lip': accent.accentLip } as React.CSSProperties}
          >
            {labels.nextBlock}
            <ArrowRight className="h-4 w-4" strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- mission --- */

export function MissionScreen({
  lesson,
  accent,
  labels,
  locale,
  tool,
  alreadyDone,
  onOpenTool,
  onConfirm,
  onNext,
  confirmLabel,
}: {
  lesson: Lesson;
  accent: Accent;
  labels: StageLabels;
  locale: 'es' | 'en';
  tool: AffiliateTool | null;
  alreadyDone: boolean;
  onOpenTool: () => void;
  onConfirm: () => void;
  onNext: () => void;
  confirmLabel: string;
}) {
  const mission = lesson.actionMission;
  const [checked, setChecked] = useState<boolean[]>(() => mission.steps.map(() => false));
  const done = alreadyDone || checked.every(Boolean);

  return (
    <div className="mx-auto w-full max-w-xl px-5 pb-40 pt-6">
      <div className="flex items-center gap-2 text-[10.5px] font-extrabold uppercase tracking-[0.12em] text-fox-dark">
        <Swords className="h-4 w-4" strokeWidth={3} />
        {labels.actionMissionBadge} · +{mission.xpBonus} XP
      </div>

      <h2 className="mt-2.5 text-[22px] font-extrabold leading-tight tracking-tight text-navy">
        {l(mission.title, locale)}
      </h2>

      <div className="mt-4 rounded-2xl border-2 border-swan bg-polar px-4 py-3.5">
        <div className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-wolf">
          {labels.missionObjective}
        </div>
        <p className="mt-1 text-[14px] font-semibold leading-relaxed text-graphite">
          {l(mission.objective, locale)}
        </p>
      </div>

      <div className="mt-5">
        <div className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-wolf">
          {labels.missionSteps}
        </div>
        <ul className="mt-2 space-y-2">
          {mission.steps.map((step, i) => {
            const on = alreadyDone || checked[i];
            return (
              <li key={i}>
                <button
                  type="button"
                  disabled={alreadyDone}
                  onClick={() =>
                    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)))
                  }
                  className="flex w-full items-start gap-3 rounded-2xl border-2 bg-paper px-3.5 py-3 text-left"
                  style={{ borderColor: on ? '#58CC02' : '#E5E5E5' }}
                >
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2"
                    style={{
                      borderColor: on ? '#58CC02' : '#AFAFAF',
                      backgroundColor: on ? '#58CC02' : 'transparent',
                    }}
                  >
                    {on && <Check className="h-3 w-3 text-paper" strokeWidth={4} />}
                  </span>
                  <span className="text-[13px] font-semibold leading-snug text-graphite">
                    {l(step, locale)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className="mt-5 rounded-2xl border-2 px-4 py-3.5"
        style={{ borderColor: '#1CB0F6', backgroundColor: '#DDF4FF' }}
      >
        <div className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-macaw-dark">
          {labels.missionProof}
        </div>
        <p className="mt-1 text-[13.5px] font-bold leading-snug text-navy">
          {l(mission.proof, locale)}
        </p>
      </div>

      {tool && (
        <div className="mt-5 flex flex-col gap-3 rounded-2xl border-2 border-swan bg-polar p-4 sm:flex-row sm:items-center">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[14px] font-extrabold text-navy">{tool.name}</span>
              <span className="rounded-md bg-bee-wash px-1.5 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wide text-fox-dark">
                {l(tool.perkBadge, locale)}
              </span>
            </div>
            <p className="mt-1 text-[12px] font-semibold leading-snug text-wolf">
              {l(tool.tagline, locale)}
            </p>
          </div>
          <a
            href={tool.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={onOpenTool}
            className="btn-arcade btn-macaw shrink-0 !px-4 !py-2.5 !text-[11.5px]"
          >
            {labels.openToolBtn}
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={3} />
          </a>
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-20 border-t-2 border-swan bg-paper px-5 py-4">
        <div className="mx-auto flex w-full max-w-xl flex-col gap-2.5 sm:flex-row">
          {!alreadyDone && (
            <button
              type="button"
              disabled={!done}
              onClick={onConfirm}
              className={cnBtn(done)}
              style={
                done
                  ? ({ backgroundColor: '#58CC02', color: '#FFFFFF', '--lip': '#58A700' } as React.CSSProperties)
                  : undefined
              }
            >
              <Check className="h-4 w-4" strokeWidth={3} />
              {confirmLabel}
            </button>
          )}
          <button
            type="button"
            onClick={onNext}
            className="btn-arcade flex-1"
            style={{ backgroundColor: accent.accent, color: accent.accentInk, '--lip': accent.accentLip } as React.CSSProperties}
          >
            {labels.nextBlock}
            <ArrowRight className="h-4 w-4" strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}

function cnBtn(enabled: boolean): string {
  return enabled
    ? 'btn-arcade flex-1'
    : 'btn-arcade flex-1 opacity-45 pointer-events-none';
}

function cnChip(enabled: boolean): string {
  return enabled
    ? 'btn-arcade shrink-0 !px-3 !py-2 !text-[11px]'
    : 'btn-arcade shrink-0 !px-3 !py-2 !text-[11px] pointer-events-none opacity-45';
}
