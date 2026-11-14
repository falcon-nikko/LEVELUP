'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, CornerDownRight, RotateCcw, X } from 'lucide-react';
import { useLevelUp } from '@/context/LevelUpContext';
import { DiagramSpec, DiagramTone } from '@/lib/curriculum/types';
import { l, LocalizedText } from '@/lib/i18n/dictionaries';
import { cn } from '@/lib/utils';

const TONE: Record<DiagramTone, { fg: string; lip: string; wash: string }> = {
  good: { fg: '#58CC02', lip: '#58A700', wash: '#D7FFB8' },
  bad: { fg: '#FF4B4B', lip: '#EA2B2B', wash: '#FFDFE0' },
  warn: { fg: '#FF9600', lip: '#D97B00', wash: '#FFE8CC' },
  info: { fg: '#1CB0F6', lip: '#1899D6', wash: '#DDF4FF' },
  mute: { fg: '#AFAFAF', lip: '#9A9A9A', wash: '#F2F2F2' },
};

const tone = (t?: DiagramTone) => TONE[t ?? 'info'];

/** Single, short entrance. No looping decoration. */
const enter = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1] as const },
};

function Tile({
  children,
  t = 'info',
  className,
  style,
}: {
  children: React.ReactNode;
  t?: DiagramTone;
  className?: string;
  style?: React.CSSProperties;
}) {
  const c = tone(t);
  return (
    <div
      className={cn('rounded-xl border-2 bg-paper px-3 py-2', className)}
      style={{ borderColor: c.fg, boxShadow: `0 3px 0 0 ${c.lip}`, ...style }}
    >
      {children}
    </div>
  );
}

function Label({ text, className }: { text: LocalizedText | string; className?: string }) {
  const { locale } = useLevelUp();
  return (
    <span className={cn('text-[12px] font-bold leading-snug text-graphite', className)}>
      {typeof text === 'string' ? text : l(text, locale)}
    </span>
  );
}

/* ------------------------------------------------------------------ flow -- */
function Flow({ spec }: { spec: Extract<DiagramSpec, { kind: 'flow' }> }) {
  const { locale } = useLevelUp();
  const vertical = spec.dir === 'v';

  return (
    <div className="space-y-2">
      <div className={cn('flex', vertical ? 'flex-col gap-2' : 'flex-wrap items-stretch gap-2')}>
        {spec.nodes.map((node, i) => (
          <React.Fragment key={node.id}>
            <Tile t={node.tone} className="min-w-[104px] flex-1">
              <div className="text-[12.5px] font-extrabold leading-tight text-navy">
                {l(node.label, locale)}
              </div>
              {node.note && (
                <div className="mt-0.5 text-[11px] font-semibold leading-snug text-wolf">
                  {l(node.note, locale)}
                </div>
              )}
            </Tile>
            {i < spec.nodes.length - 1 && (
              <div
                className={cn(
                  'flex shrink-0 items-center justify-center text-hare',
                  vertical ? 'h-4 rotate-90' : 'w-4'
                )}
              >
                <ArrowRight className="h-4 w-4" strokeWidth={3} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {spec.branch && (
        <div className="flex items-start gap-2 pl-2">
          <CornerDownRight className="mt-0.5 h-4 w-4 shrink-0 text-cardinal" strokeWidth={3} />
          <Tile t={spec.branch.tone ?? 'bad'} className="flex-1">
            <div className="text-[12px] font-extrabold leading-tight text-cardinal-dark">
              {l(spec.branch.label, locale)}
            </div>
          </Tile>
        </div>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- compare -- */
function Compare({ spec }: { spec: Extract<DiagramSpec, { kind: 'compare' }> }) {
  const { locale } = useLevelUp();
  const cols = [
    { ...spec.left, tone: spec.left.tone },
    { ...spec.right, tone: spec.right.tone },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {cols.map((col, ci) => {
        const c = tone(col.tone);
        const Icon = col.tone === 'bad' ? X : Check;
        return (
          <div
            key={ci}
            className="rounded-xl border-2 p-3"
            style={{ borderColor: c.fg, backgroundColor: c.wash }}
          >
            <div className="flex items-center gap-2">
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-paper"
                style={{ backgroundColor: c.fg }}
              >
                <Icon className="h-3 w-3" strokeWidth={3.6} />
              </span>
              <span className="text-[12.5px] font-extrabold leading-tight" style={{ color: c.lip }}>
                {l(col.title, locale)}
              </span>
            </div>
            <ul className="mt-2 space-y-1.5">
              {col.items.map((item, i) => (
                <li key={i} className="flex gap-2 text-[12px] font-semibold leading-snug text-graphite">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: c.fg }} />
                  {l(item, locale)}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ bars -- */
function Bars({ spec }: { spec: Extract<DiagramSpec, { kind: 'bars' }> }) {
  const { locale } = useLevelUp();
  const max = spec.max ?? Math.max(...spec.items.map((i) => i.value), 1);

  return (
    <div className="space-y-2">
      {spec.items.map((item, i) => {
        const c = tone(item.tone);
        const pct = Math.max(2, Math.round((item.value / max) * 100));
        return (
          <div key={i} className="flex items-center gap-3">
            <div className="w-[112px] shrink-0 text-right text-[11.5px] font-bold leading-tight text-wolf sm:w-[150px]">
              {l(item.label, locale)}
            </div>
            <div className="h-6 flex-1 overflow-hidden rounded-lg bg-polar">
              <motion.div
                className="flex h-full items-center justify-end rounded-lg pr-2"
                style={{ backgroundColor: c.fg }}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: 'easeOut' }}
              >
                <span className="text-[11px] font-extrabold tabular-nums text-paper">
                  {item.value}
                  {spec.unit ?? ''}
                </span>
              </motion.div>
            </div>
            {item.note && (
              <span className="hidden w-[120px] shrink-0 text-[11px] font-semibold text-hare sm:block">
                {l(item.note, locale)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------- funnel -- */
function Funnel({ spec }: { spec: Extract<DiagramSpec, { kind: 'funnel' }> }) {
  const { locale } = useLevelUp();
  const top = spec.stages[0]?.value || 1;

  return (
    <div className="space-y-1.5">
      {spec.stages.map((stage, i) => {
        const widthPct = Math.max(28, Math.round((stage.value / top) * 100));
        const conv = i > 0 ? Math.round((stage.value / (spec.stages[i - 1].value || 1)) * 100) : 100;
        const c = tone(i === spec.stages.length - 1 ? 'good' : 'info');
        return (
          <div key={i} className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scaleX: 0.9 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex items-center justify-between gap-2 rounded-lg border-2 px-3 py-2"
              style={{ width: `${widthPct}%`, borderColor: c.fg, backgroundColor: c.wash }}
            >
              <span className="truncate text-[11.5px] font-extrabold" style={{ color: c.lip }}>
                {l(stage.label, locale)}
              </span>
              <span className="shrink-0 font-mono text-[12px] font-extrabold tabular-nums text-navy">
                {stage.value.toLocaleString(locale === 'es' ? 'es-ES' : 'en-US')}
              </span>
              {i > 0 && (
                <span className="shrink-0 rounded-md bg-paper px-1.5 py-0.5 font-mono text-[10px] font-extrabold tabular-nums text-wolf">
                  {conv}%
                </span>
              )}
              {stage.note && (
                <span className="hidden shrink-0 text-[10.5px] font-semibold text-wolf md:block">
                  {l(stage.note, locale)}
                </span>
              )}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------- timeline -- */
function Timeline({ spec }: { spec: Extract<DiagramSpec, { kind: 'timeline' }> }) {
  const { locale } = useLevelUp();
  return (
    <div className="flex flex-wrap items-stretch gap-2">
      {spec.steps.map((step, i) => {
        const c = tone(step.tone ?? (i === spec.steps.length - 1 ? 'good' : 'info'));
        return (
          <React.Fragment key={i}>
            <div
              className="min-w-[96px] flex-1 rounded-xl border-2 px-3 py-2"
              style={{ borderColor: c.fg, backgroundColor: c.wash }}
            >
              <div className="font-mono text-[13px] font-extrabold tabular-nums" style={{ color: c.lip }}>
                {step.value}
              </div>
              <div className="mt-0.5 text-[11.5px] font-bold leading-tight text-graphite">
                {l(step.label, locale)}
              </div>
            </div>
            {i < spec.steps.length - 1 && (
              <div className="flex shrink-0 items-center text-hare">
                <ArrowRight className="h-4 w-4" strokeWidth={3} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ----------------------------------------------------------------- stack -- */
function Stack({ spec }: { spec: Extract<DiagramSpec, { kind: 'stack' }> }) {
  const { locale } = useLevelUp();
  const sum = spec.parts.reduce((acc, p) => acc + p.value, 0);
  const prefix = spec.prefix ?? '';
  const fmt = (n: number) => `${prefix}${n.toLocaleString(locale === 'es' ? 'es-ES' : 'en-US')}`;

  return (
    <div>
      <div className="flex h-9 w-full overflow-hidden rounded-lg border-2 border-swan">
        {spec.parts.map((part, i) => {
          const c = tone(part.tone ?? 'info');
          const pct = sum > 0 ? (part.value / sum) * 100 : 0;
          return (
            <motion.div
              key={i}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: 'easeOut' }}
              className="flex items-center justify-center"
              style={{ backgroundColor: c.fg }}
              title={`${l(part.label, locale)}: ${fmt(part.value)}`}
            >
              {pct > 11 && (
                <span className="text-[11px] font-extrabold tabular-nums text-paper">
                  {Math.round(pct)}%
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
        {spec.parts.map((part, i) => {
          const c = tone(part.tone ?? 'info');
          return (
            <div key={i} className="flex items-center gap-2">
              <span className="h-3 w-3 shrink-0 rounded-[3px]" style={{ backgroundColor: c.fg }} />
              <span className="flex-1 truncate text-[11.5px] font-semibold text-graphite">
                {l(part.label, locale)}
              </span>
              <span className="shrink-0 font-mono text-[11.5px] font-extrabold tabular-nums text-navy">
                {fmt(part.value)}
              </span>
            </div>
          );
        })}
        <div className="flex items-center gap-2 border-t-2 border-swan pt-1.5 sm:col-span-2">
          <span className="h-3 w-3 shrink-0" />
          <span className="flex-1 text-[11.5px] font-extrabold uppercase text-wolf">
            {locale === 'es' ? 'Total' : 'Total'}
          </span>
          <span className="font-mono text-[12.5px] font-extrabold tabular-nums text-navy">
            {fmt(spec.total)}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- table -- */
function Table({ spec }: { spec: Extract<DiagramSpec, { kind: 'table' }> }) {
  const { locale } = useLevelUp();
  return (
    <div>
      <div className="overflow-x-auto rounded-xl border-2 border-swan">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-polar">
              {spec.head.map((h, i) => (
                <th
                  key={i}
                  className="border-b-2 border-swan px-3 py-2 text-[11px] font-extrabold text-wolf"
                >
                  {l(h, locale)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {spec.rows.map((row, ri) => (
              <tr
                key={ri}
                className={cn(
                  ri === spec.highlightRow ? 'bg-ecto-wash' : ri % 2 === 1 && 'bg-polar/60'
                )}
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={cn(
                      'border-b border-polar px-3 py-1.5 text-[12px] font-semibold text-graphite',
                      typeof cell === 'number' && 'font-mono tabular-nums',
                      ri === spec.highlightRow && 'font-extrabold text-ecto-dark'
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {spec.note && (
        <p className="mt-1.5 text-[11px] font-semibold text-hare">{l(spec.note, locale)}</p>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- matrix -- */
function Matrix({ spec }: { spec: Extract<DiagramSpec, { kind: 'matrix' }> }) {
  const { locale } = useLevelUp();
  return (
    <div className="flex gap-2">
      <div className="flex w-5 shrink-0 items-center justify-center">
        <span className="rotate-180 text-[10.5px] font-extrabold uppercase text-hare [writing-mode:vertical-rl]">
          {l(spec.yLabel, locale)}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="grid grid-cols-2 gap-1.5">
          {[spec.corners[0], spec.corners[1], spec.corners[2], spec.corners[3]].map((corner, i) => (
            <div
              key={i}
              className={cn(
                'relative min-h-[68px] rounded-xl border-2 border-swan p-2.5',
                i === 1 ? 'bg-ecto-wash border-ecto' : 'bg-polar'
              )}
            >
              <div
                className={cn(
                  'text-[11.5px] font-extrabold leading-tight',
                  i === 1 ? 'text-ecto-dark' : 'text-wolf'
                )}
              >
                {l(corner, locale)}
              </div>
              {spec.points
                ?.filter((p) => Math.floor(p.x) === (i % 2) && Math.floor(p.y) === Math.floor(i / 2))
                .map((p, pi) => (
                  <span
                    key={pi}
                    className="mt-1 inline-block rounded-md px-1.5 py-0.5 text-[10.5px] font-extrabold text-paper"
                    style={{ backgroundColor: tone(p.tone).fg }}
                  >
                    {l(p.label, locale)}
                  </span>
                ))}
            </div>
          ))}
        </div>
        <div className="mt-1.5 text-center text-[10.5px] font-extrabold uppercase text-hare">
          {l(spec.xLabel, locale)}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ code -- */
function CodeBlock({ spec }: { spec: Extract<DiagramSpec, { kind: 'code' }> }) {
  const { locale } = useLevelUp();
  return (
    <div className="overflow-hidden rounded-xl border-2 border-swan bg-polar">
      {spec.lang && (
        <div className="border-b-2 border-swan bg-paper px-3 py-1 font-mono text-[10.5px] font-extrabold text-hare">
          {spec.lang}
        </div>
      )}
      <div className="overflow-x-auto py-2">
        {spec.lines.map((line, i) => {
          const c = tone(line.tone ?? 'mute');
          return (
            <div
              key={i}
              className={cn(
                'flex items-start gap-2 px-2 font-mono text-[12px] leading-[1.55]',
                line.tone === 'bad' && 'bg-cardinal-wash',
                line.tone === 'good' && 'bg-ecto-wash',
                line.tone === 'warn' && 'bg-bee-wash'
              )}
            >
              <span className="w-4 shrink-0 select-none text-right text-hare">{i + 1}</span>
              <span
                className="min-w-0 whitespace-pre"
                style={{ color: line.tone && line.tone !== 'mute' ? c.lip : '#3C3C3C' }}
              >
                {line.text}
              </span>
              {line.label && (
                <span
                  className="ml-auto shrink-0 rounded-md px-1.5 py-0.5 font-sans text-[10px] font-extrabold"
                  style={{ backgroundColor: c.fg, color: '#FFFFFF' }}
                >
                  {l(line.label, locale)}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ loop -- */
function Loop({ spec }: { spec: Extract<DiagramSpec, { kind: 'loop' }> }) {
  const { locale } = useLevelUp();
  return (
    <div>
      <div className="flex flex-wrap items-stretch gap-2">
        {spec.steps.map((step, i) => (
          <React.Fragment key={i}>
            <Tile t={i === spec.steps.length - 1 ? 'good' : 'info'} className="min-w-[104px] flex-1">
              <div className="font-mono text-[10px] font-extrabold text-hare">{i + 1}</div>
              <div className="text-[12.5px] font-extrabold leading-tight text-navy">
                {l(step.label, locale)}
              </div>
              {step.note && (
                <div className="mt-0.5 text-[11px] font-semibold leading-snug text-wolf">
                  {l(step.note, locale)}
                </div>
              )}
            </Tile>
            {i < spec.steps.length - 1 && (
              <div className="flex shrink-0 items-center text-hare">
                <ArrowRight className="h-4 w-4" strokeWidth={3} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-1.5 flex items-center justify-center gap-1.5 text-[11px] font-extrabold text-macaw">
        <RotateCcw className="h-3.5 w-3.5" strokeWidth={3} />
        {locale === 'es' ? 'Se repite hasta cumplir la condición de parada' : 'Repeats until the stop condition is met'}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- layers -- */
function Layers({ spec }: { spec: Extract<DiagramSpec, { kind: 'layers' }> }) {
  const { locale } = useLevelUp();
  return (
    <div className="space-y-1.5">
      {spec.layers.map((layer, i) => {
        const c = tone(layer.tone ?? 'info');
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
            className="flex items-center gap-3 rounded-xl border-2 px-3 py-2"
            style={{ borderColor: c.fg, backgroundColor: c.wash }}
          >
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg font-mono text-[11px] font-extrabold text-paper"
              style={{ backgroundColor: c.fg }}
            >
              {i + 1}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[12.5px] font-extrabold leading-tight text-navy">
                {l(layer.label, locale)}
              </span>
              {layer.note && (
                <span className="block text-[11px] font-semibold leading-snug text-wolf">
                  {l(layer.note, locale)}
                </span>
              )}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------- equation -- */
function Equation({ spec }: { spec: Extract<DiagramSpec, { kind: 'equation' }> }) {
  const { locale } = useLevelUp();
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 rounded-xl border-2 border-swan bg-polar px-3 py-3">
      {spec.tokens.map((tok, i) => {
        const c = tone(tok.tone ?? 'mute');
        return (
          <span key={i} className="flex flex-col items-center">
            <span
              className="font-mono text-[15px] font-extrabold tabular-nums"
              style={{ color: tok.tone ? c.lip : '#042C60' }}
            >
              {tok.text}
            </span>
            {tok.label && (
              <span className="mt-0.5 text-[9.5px] font-bold text-hare">{l(tok.label, locale)}</span>
            )}
          </span>
        );
      })}
      {spec.result && (
        <>
          <span className="font-mono text-[15px] font-extrabold text-hare">=</span>
          <span
            className="rounded-lg px-2.5 py-1 font-mono text-[15px] font-extrabold tabular-nums text-paper"
            style={{ backgroundColor: tone(spec.result.tone ?? 'good').fg }}
          >
            {spec.result.text}
          </span>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ root -- */
export function Diagram({ spec, className }: { spec: DiagramSpec; className?: string }) {
  return (
    <motion.div className={cn('not-prose', className)} {...enter}>
      {spec.kind === 'flow' && <Flow spec={spec} />}
      {spec.kind === 'compare' && <Compare spec={spec} />}
      {spec.kind === 'bars' && <Bars spec={spec} />}
      {spec.kind === 'funnel' && <Funnel spec={spec} />}
      {spec.kind === 'timeline' && <Timeline spec={spec} />}
      {spec.kind === 'stack' && <Stack spec={spec} />}
      {spec.kind === 'table' && <Table spec={spec} />}
      {spec.kind === 'matrix' && <Matrix spec={spec} />}
      {spec.kind === 'code' && <CodeBlock spec={spec} />}
      {spec.kind === 'loop' && <Loop spec={spec} />}
      {spec.kind === 'layers' && <Layers spec={spec} />}
      {spec.kind === 'equation' && <Equation spec={spec} />}
    </motion.div>
  );
}

export { Label };
