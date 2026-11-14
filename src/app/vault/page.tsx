'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Check,
  Copy,
  FileText,
  Lock,
  Mail,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { useLevelUp } from '@/context/LevelUpContext';
import { CAREER_TRACKS } from '@/lib/curriculum/tracks';
import { VAULT_PLAYBOOKS } from '@/lib/curriculum/vault';
import { l } from '@/lib/i18n/dictionaries';
import { playFeedbackSound } from '@/lib/sound';
import { cn } from '@/lib/utils';

const SPAM_TOKENS = [
  'free',
  'gratis',
  'guarantee',
  'garant',
  '100%',
  'risk-free',
  'sin riesgo',
  'act now',
  'urgent',
  'urgente',
  'limited time',
  'oferta',
  'discount',
  'descuento',
  '!!!',
  'buy now',
  'compra ya',
];

interface EmailCheck {
  score: number;
  wordCount: number;
  questions: number;
  hasPersonalization: boolean;
  hasSingleCta: boolean;
  linkCount: number;
  spamHits: string[];
}

function checkEmail(text: string, locale: 'es' | 'en'): EmailCheck {
  const clean = text.trim();
  const words = clean ? clean.split(/\s+/) : [];
  const lower = clean.toLowerCase();

  const questions = (clean.match(/\?/g) || []).length;
  const hasPersonalization = /\{\{|\[nombre\]|\{name\}|personaliz/i.test(clean);
  const ctaVerbs = locale === 'es'
    ? ['¿te interesa', 'te apetece', 'hablemos', 'llamada', 'responde', 'te envío']
    : ['worth a', 'open to', 'quick call', 'reply', 'send over', 'interested'];
  const ctaHits = ctaVerbs.filter((verb) => lower.includes(verb)).length;
  const hasSingleCta = ctaHits >= 1 && ctaHits <= 2;
  const linkCount = (clean.match(/https?:\/\//g) || []).length;
  const spamHits = SPAM_TOKENS.filter((token) => lower.includes(token));

  let score = 40;
  if (words.length >= 40 && words.length <= 120) score += 22;
  else if (words.length > 0) score += 8;
  if (questions >= 1 && questions <= 2) score += 14;
  if (hasPersonalization) score += 10;
  if (hasSingleCta) score += 12;
  score -= Math.min(30, spamHits.length * 10);
  score -= Math.min(15, linkCount * 7);

  return {
    score: Math.max(0, Math.min(100, Math.round(score))),
    wordCount: words.length,
    questions,
    hasPersonalization,
    hasSingleCta,
    linkCount,
    spamHits,
  };
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
  color = '#58CC02',
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (v: number) => void;
  color?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-wolf">
          {label}
        </span>
        <span className="font-mono text-[14px] font-extrabold tabular-nums" style={{ color }}>
          {value}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        className="precision-slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

export default function VaultPage() {
  const { t, locale, state, soundEnabled } = useLevelUp();

  /* ---------------------------- P&L / ROAS lab --------------------------- */
  const [aov, setAov] = useState(58);
  const [cpa, setCpa] = useState(21);
  const [orders, setOrders] = useState(240);
  const [cogs, setCogs] = useState(32);
  const [refund, setRefund] = useState(6);

  const econ = useMemo(() => {
    const gross = aov * orders;
    const refundLoss = gross * (refund / 100);
    const netRevenue = gross - refundLoss;
    const cogsCost = netRevenue * (cogs / 100);
    const adSpend = cpa * orders;
    const profit = netRevenue - cogsCost - adSpend;
    const roas = adSpend > 0 ? netRevenue / adSpend : 0;
    const beRoas = netRevenue > 0 ? netRevenue / Math.max(1, netRevenue - cogsCost) : 0;
    const margin = netRevenue > 0 ? (profit / netRevenue) * 100 : 0;
    return {
      gross,
      netRevenue,
      cogsCost,
      adSpend,
      profit,
      roas,
      beRoas,
      margin,
      profitable: profit >= 0,
    };
  }, [aov, cpa, cogs, orders, refund]);

  /* --------------------------- Cold email checker ------------------------ */
  const [draft, setDraft] = useState('');
  const check = useMemo(() => checkEmail(draft, locale), [draft, locale]);

  const presets = [
    {
      id: 'spammy',
      label: locale === 'es' ? 'Correo con spam' : 'Spammy email',
      color: '#FF4B4B',
      lip: '#EA2B2B',
      text:
        locale === 'es'
          ? '¡¡¡OFERTA URGENTE!!! Compra ya nuestro servicio con 100% de garantía y descuento del 50% por tiempo limitado. Somos los mejores del mercado y tenemos miles de clientes felices. Haz clic aquí: https://ejemplo.com/promo https://ejemplo.com/oferta'
          : '!!! URGENT OFFER !!! Buy now with a 100% guarantee and a 50% limited-time discount. We are the best in the market with thousands of happy customers. Click here: https://example.com/promo https://example.com/deal',
    },
    {
      id: 'generic',
      label: locale === 'es' ? 'Genérico' : 'Generic',
      color: '#FFC800',
      lip: '#E5A800',
      text:
        locale === 'es'
          ? 'Hola, somos una agencia de marketing digital y ayudamos a empresas a conseguir más clientes mediante campañas de publicidad online. Tenemos mucha experiencia y casos de éxito. Si quieres más información podemos agendar una llamada cuando te venga bien.'
          : 'Hi, we are a digital marketing agency and we help companies get more customers through online advertising. We have a lot of experience and success stories. If you want more information we can schedule a call whenever suits you.',
    },
    {
      id: 'sharp',
      label: locale === 'es' ? 'Alta respuesta' : 'High reply rate',
      color: '#58CC02',
      lip: '#58A700',
      text:
        locale === 'es'
          ? 'Hola {{nombre}}, vi que {{empresa}} publica dos ofertas de empleo en soporte este mes. Normalmente eso significa que el equipo ya va saturado de tickets. Montamos un agente de IA que resuelve el 40% de las consultas repetitivas en 9 días, sin tocar tu CRM. ¿Te interesa que te envíe un ejemplo con vuestros propios tickets?'
          : 'Hi {{name}}, I saw {{company}} posted two support roles this month. That usually means the team is already drowning in tickets. We ship an AI agent that resolves 40% of repetitive queries in 9 days, without touching your CRM. Want me to send an example built on your own tickets?',
    },
  ];

  /* ------------------------------- Playbooks ----------------------------- */
  const [activePlaybook, setActivePlaybook] = useState(VAULT_PLAYBOOKS[0].id);
  const [copied, setCopied] = useState<string | null>(null);
  const playbook = VAULT_PLAYBOOKS.find((p) => p.id === activePlaybook) ?? VAULT_PLAYBOOKS[0];

  const copyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(l(playbook.template, locale));
      setCopied(playbook.id);
      playFeedbackSound('complete', soundEnabled);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied(null);
    }
  };

  const scoreColor = check.score >= 75 ? '#58CC02' : check.score >= 50 ? '#FFC800' : '#FF4B4B';
  const R = 40;
  const CIRC = 2 * Math.PI * R;

  return (
    <AppShell>
      <header className="mb-6">
        <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.1em] text-wolf">
          <FileText className="h-4 w-4 text-macaw" strokeWidth={2.8} />
          {t.nav.vault}
        </div>
        <h1 className="mt-1 text-[26px] font-extrabold tracking-tight text-navy sm:text-[30px]">
          {t.vault.title}
        </h1>
        <p className="mt-1 max-w-xl text-[13px] font-semibold leading-relaxed text-wolf">
          {t.vault.subtitle}
        </p>
      </header>

      {!state.isPro && (
        <div
          className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border-2 border-bee bg-bee-wash px-5 py-4"
          style={{ boxShadow: '0 4px 0 0 #E5A800' }}
        >
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-fox-dark" strokeWidth={2.8} />
            <div>
              <div className="text-[14px] font-extrabold text-fox-dark">{t.vault.superOnly}</div>
              <p className="mt-0.5 max-w-md text-[12.5px] font-semibold leading-snug text-wolf">
                {t.vault.superOnlyDesc}
              </p>
            </div>
          </div>
          <Link href="/pro" className="btn-arcade !bg-fox !px-5 !py-2.5 !text-[12px]" style={{ '--lip': '#D97B00' } as React.CSSProperties}>
            {t.vault.unlockNow}
          </Link>
        </div>
      )}

      {/* ------------------------------- P&L lab ---------------------------- */}
      <section className="panel overflow-hidden">
        <div className="flex items-center gap-2 border-b-2 border-swan bg-polar px-5 py-3">
          <TrendingUp className="h-4 w-4 text-ecto" strokeWidth={2.8} />
          <h2 className="text-[14px] font-extrabold uppercase tracking-[0.06em] text-navy">
            {t.vault.roasTitle}
          </h2>
        </div>

        <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="space-y-5">
            <Slider label={locale === 'es' ? 'Ticket medio (AOV)' : 'Average order value'} value={aov} min={10} max={300} step={1} suffix=" $" onChange={setAov} color="#1CB0F6" />
            <Slider label={locale === 'es' ? 'CPA en anuncios' : 'Ad CPA'} value={cpa} min={3} max={120} step={1} suffix=" $" onChange={setCpa} color="#FF4B4B" />
            <Slider label={locale === 'es' ? 'Pedidos / mes' : 'Orders / month'} value={orders} min={20} max={1200} step={10} suffix="" onChange={setOrders} color="#58CC02" />
            <Slider label={locale === 'es' ? 'Coste de producto' : 'Product cost (COGS)'} value={cogs} min={5} max={70} step={1} suffix=" %" onChange={setCogs} color="#FF9600" />
            <Slider label={locale === 'es' ? 'Devoluciones' : 'Refund rate'} value={refund} min={0} max={25} step={1} suffix=" %" onChange={setRefund} color="#FFC800" />
          </div>

          <div className="space-y-3">
            <div
              className="rounded-2xl border-2 p-5 text-center"
              style={{
                borderColor: econ.profitable ? '#58CC02' : '#FF4B4B',
                backgroundColor: econ.profitable ? '#D7FFB8' : '#FFDFE0',
                boxShadow: `0 5px 0 0 ${econ.profitable ? '#58A700' : '#EA2B2B'}`,
              }}
            >
              <div className="text-[10.5px] font-extrabold uppercase tracking-[0.14em]" style={{ color: econ.profitable ? '#58A700' : '#EA2B2B' }}>
                {locale === 'es' ? 'Beneficio neto / mes' : 'Net profit / month'}
              </div>
              <motion.div
                key={Math.round(econ.profit)}
                initial={{ scale: 0.9, opacity: 0.4 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                className="mt-1 text-[40px] font-extrabold leading-none tabular-nums"
                style={{ color: econ.profitable ? '#3E8F02' : '#EA2B2B' }}
              >
                {econ.profit < 0 ? '−' : ''}${Math.abs(Math.round(econ.profit)).toLocaleString(locale === 'es' ? 'es-ES' : 'en-US')}
              </motion.div>
              <div className="mt-1.5 text-[12px] font-bold" style={{ color: econ.profitable ? '#58A700' : '#EA2B2B' }}>
                {econ.margin.toFixed(1)}% {locale === 'es' ? 'de margen neto' : 'net margin'}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: locale === 'es' ? 'Ingresos netos' : 'Net revenue', value: `$${Math.round(econ.netRevenue).toLocaleString()}`, color: '#1CB0F6', lip: '#1899D6' },
                { label: locale === 'es' ? 'Gasto en ads' : 'Ad spend', value: `$${Math.round(econ.adSpend).toLocaleString()}`, color: '#FF4B4B', lip: '#EA2B2B' },
                { label: 'ROAS real', value: econ.roas.toFixed(2), color: '#58CC02', lip: '#58A700' },
                { label: locale === 'es' ? 'ROAS de equilibrio' : 'Breakeven ROAS', value: econ.beRoas.toFixed(2), color: '#FF9600', lip: '#D97B00' },
              ].map((card) => (
                <div
                  key={card.label}
                  className="overflow-hidden rounded-2xl border-2"
                  style={{ borderColor: card.color, boxShadow: `0 4px 0 0 ${card.lip}` }}
                >
                  <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-paper" style={{ backgroundColor: card.color }}>
                    {card.label}
                  </div>
                  <div className="bg-paper px-3 py-2.5 text-[20px] font-extrabold tabular-nums" style={{ color: card.color }}>
                    {card.value}
                  </div>
                </div>
              ))}
            </div>

            <div
              className={cn(
                'flex items-start gap-2.5 rounded-2xl border-2 px-4 py-3',
                econ.roas < econ.beRoas ? 'border-cardinal bg-cardinal-wash' : 'border-ecto bg-ecto-wash'
              )}
            >
              {econ.roas < econ.beRoas ? (
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-cardinal" strokeWidth={2.8} />
              ) : (
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-ecto" strokeWidth={3} />
              )}
              <p className="text-[12.5px] font-bold leading-snug text-graphite">
                {econ.roas < econ.beRoas
                  ? locale === 'es'
                    ? `Estás por debajo del equilibrio (${econ.roas.toFixed(2)} vs ${econ.beRoas.toFixed(2)}). Baja el CPA a $${Math.max(
                        1,
                        Math.floor((econ.netRevenue - econ.cogsCost) / Math.max(1, orders))
                      )} o sube el ticket medio.`
                    : `You are below breakeven (${econ.roas.toFixed(2)} vs ${econ.beRoas.toFixed(2)}). Cut CPA to $${Math.max(
                        1,
                        Math.floor((econ.netRevenue - econ.cogsCost) / Math.max(1, orders))
                      )} or raise the AOV.`
                  : locale === 'es'
                    ? `Cuentas: tu ROAS (${econ.roas.toFixed(2)}) supera el equilibrio (${econ.beRoas.toFixed(2)}). Cada euro en ads devuelve margen.`
                    : `The math works: your ROAS (${econ.roas.toFixed(2)}) beats breakeven (${econ.beRoas.toFixed(2)}).`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------- Cold email checker --------------------- */}
      <section className="panel mt-7 overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 border-b-2 border-swan bg-polar px-5 py-3">
          <Mail className="h-4 w-4 text-macaw" strokeWidth={2.8} />
          <h2 className="text-[14px] font-extrabold uppercase tracking-[0.06em] text-navy">
            {t.vault.outreachTitle}
          </h2>
          <div className="ml-auto flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  setDraft(preset.text);
                  playFeedbackSound('click', soundEnabled);
                }}
                className="rounded-xl border-2 bg-paper px-2.5 py-1 text-[10.5px] font-extrabold uppercase tracking-wide transition-transform hover:-translate-y-0.5"
                style={{ borderColor: preset.color, color: preset.lip, boxShadow: `0 2px 0 0 ${preset.lip}` }}
              >
                {preset.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setDraft('')}
              className="flex items-center gap-1 rounded-xl border-2 border-swan bg-paper px-2.5 py-1 text-[10.5px] font-extrabold uppercase tracking-wide text-wolf transition-transform hover:-translate-y-0.5"
              style={{ boxShadow: '0 2px 0 0 #E5E5E5' }}
            >
              <RefreshCw className="h-3 w-3" strokeWidth={3} />
              {locale === 'es' ? 'Limpiar' : 'Clear'}
            </button>
          </div>
        </div>

        <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={11}
            placeholder={
              locale === 'es'
                ? 'Pega aquí tu correo en frío… (usa {{nombre}} y {{empresa}} para personalizar)'
                : 'Paste your cold email here… (use {{name}} and {{company}} to personalize)'
            }
            className="field-arcade resize-y font-mono !text-[12.5px] leading-relaxed"
          />

          <div className="space-y-3">
            <div className="panel-polar flex items-center gap-4 p-4">
              <div className="relative h-[96px] w-[96px] shrink-0">
                <svg viewBox="0 0 96 96" className="h-full w-full -rotate-90">
                  <circle cx="48" cy="48" r={R} fill="none" stroke="#E5E5E5" strokeWidth="11" />
                  <motion.circle
                    cx="48"
                    cy="48"
                    r={R}
                    fill="none"
                    stroke={scoreColor}
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeDasharray={CIRC}
                    animate={{ strokeDashoffset: CIRC - (CIRC * check.score) / 100 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[24px] font-extrabold leading-none tabular-nums" style={{ color: scoreColor }}>
                    {check.score}
                  </span>
                  <span className="text-[9.5px] font-extrabold uppercase text-hare">
                    {locale === 'es' ? 'entrega' : 'deliverability'}
                  </span>
                </div>
              </div>

              <ul className="min-w-0 flex-1 space-y-1.5 text-[12px] font-bold">
                {[
                  {
                    ok: check.wordCount >= 40 && check.wordCount <= 120,
                    text: `${check.wordCount} ${locale === 'es' ? 'palabras' : 'words'} · 40–120 ✓`,
                  },
                  {
                    ok: check.questions >= 1 && check.questions <= 2,
                    text: `${check.questions} ${locale === 'es' ? 'preguntas' : 'questions'}`,
                  },
                  {
                    ok: check.hasPersonalization,
                    text: locale === 'es' ? 'Variable de personalización' : 'Personalization token',
                  },
                  { ok: check.hasSingleCta, text: locale === 'es' ? 'Un único CTA claro' : 'One clear CTA' },
                  { ok: check.linkCount === 0, text: `${check.linkCount} ${locale === 'es' ? 'enlaces' : 'links'}` },
                ].map((row) => (
                  <li key={row.text} className="flex items-center gap-2">
                    <span
                      className={cn(
                        'flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-paper',
                        row.ok ? 'bg-ecto' : 'bg-cardinal'
                      )}
                    >
                      {row.ok ? <Check className="h-2.5 w-2.5" strokeWidth={4} /> : <AlertTriangle className="h-2.5 w-2.5" strokeWidth={4} />}
                    </span>
                    <span className={row.ok ? 'text-graphite' : 'text-cardinal-dark'}>{row.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {check.spamHits.length > 0 && (
              <div className="rounded-2xl border-2 border-cardinal bg-cardinal-wash px-4 py-3">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-cardinal-dark">
                  {locale === 'es' ? 'Disparadores de spam detectados' : 'Spam triggers detected'}
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {check.spamHits.map((hit) => (
                    <span key={hit} className="rounded-lg bg-paper px-2 py-0.5 font-mono text-[11px] font-bold text-cardinal">
                      {hit}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ------------------------------ Playbooks --------------------------- */}
      <section className="mt-7 mb-10">
        <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.1em] text-wolf">
          <FileText className="h-4 w-4 text-bee" strokeWidth={2.8} />
          {t.vault.playbooksTitle}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {VAULT_PLAYBOOKS.map((pb) => {
            const tr = CAREER_TRACKS.find((x) => x.slug === pb.trackSlug)!;
            const active = pb.id === activePlaybook;
            return (
              <button
                key={pb.id}
                type="button"
                onClick={() => setActivePlaybook(pb.id)}
                className={cn(
                  'rounded-2xl border-2 px-3.5 py-2 text-[11.5px] font-extrabold transition-transform',
                  active ? 'border-transparent text-paper' : 'border-swan bg-paper text-wolf hover:-translate-y-0.5'
                )}
                style={
                  active
                    ? { backgroundColor: tr.accent, color: tr.accentInk, boxShadow: `0 3px 0 0 ${tr.accentLip}` }
                    : { boxShadow: '0 3px 0 0 #E5E5E5' }
                }
              >
                {l(pb.category, locale)}
              </button>
            );
          })}
        </div>

        <div className="panel mt-4 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-swan bg-polar px-5 py-3">
            <h3 className="text-[14px] font-extrabold leading-snug text-navy">
              {l(playbook.title, locale)}
            </h3>
            <button
              type="button"
              onClick={copyTemplate}
              className={cn('btn-arcade !px-4 !py-2 !text-[11px]', copied === playbook.id && '!bg-ecto-wash !text-ecto-dark')}
              style={copied === playbook.id ? ({ '--lip': '#B6E88E' } as React.CSSProperties) : undefined}
            >
              {copied === playbook.id ? (
                <>
                  <Check className="h-3.5 w-3.5" strokeWidth={3.4} />
                  {t.vault.copiedBtn}
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" strokeWidth={2.8} />
                  {t.vault.copyBtn}
                </>
              )}
            </button>
          </div>

          {state.isPro ? (
            <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap bg-paper px-5 py-4 font-mono text-[12.5px] font-semibold leading-relaxed text-graphite">
              {l(playbook.template, locale)}
            </pre>
          ) : (
            <div className="relative bg-paper px-5 py-4">
              <pre className="max-h-[180px] overflow-hidden whitespace-pre-wrap font-mono text-[12.5px] font-semibold leading-relaxed text-hare">
                {l(playbook.template, locale).slice(0, 320)}…
              </pre>
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 bg-gradient-to-t from-paper via-paper/95 to-transparent px-5 pb-5 pt-10">
                <span className="flex items-center gap-2 rounded-xl border-2 border-bee bg-bee-wash px-3 py-1.5 text-[11.5px] font-extrabold uppercase tracking-wide text-fox-dark">
                  <Lock className="h-3.5 w-3.5" strokeWidth={3} />
                  {t.vault.superOnly}
                </span>
                <Link href="/pro" className="btn-arcade !bg-fox !px-5 !py-2.5 !text-[12px]" style={{ '--lip': '#D97B00' } as React.CSSProperties}>
                  {t.vault.unlockNow}
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </AppShell>
  );
}
