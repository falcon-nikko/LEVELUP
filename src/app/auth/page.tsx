'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Calculator,
  Check,
  Flame,
  Heart,
  Loader2,
  Mail,
  Lock,
  Trophy,
  UserRound,
} from 'lucide-react';
import { BrandMark } from '@/components/BrandMark';
import { useLevelUp } from '@/context/LevelUpContext';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

type Mode = 'signin' | 'signup';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function AuthPanel() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const { locale, t, setLocale } = useLevelUp();

  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shakeKey, setShakeKey] = useState(0);

  // Query params are read client-side so the screen prerenders complete markup.
  const [nextPath, setNextPath] = useState<string | null>(null);

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    if (search.get('mode') === 'signup') setMode('signup');
    setNextPath(search.get('next'));
  }, []);

  const benefits = [
    { icon: Flame, text: t.auth.benefit1 },
    { icon: Heart, text: t.auth.benefit2 },
    { icon: Trophy, text: t.auth.benefit3 },
    { icon: Calculator, text: t.auth.benefit4 },
  ];

  const canSubmit = useMemo(() => {
    if (!EMAIL_RE.test(email.trim()) || password.length < 6) return false;
    if (mode === 'signup' && name.trim().length < 2) return false;
    return true;
  }, [email, mode, name, password]);

  const fail = (message: string) => {
    setError(message);
    setShakeKey((k) => k + 1);
  };

  const mapAuthError = (raw: string): string => {
    const msg = raw.toLowerCase();
    if (msg.includes('invalid login credentials')) return t.auth.errorInvalid;
    if (msg.includes('already registered') || msg.includes('already been registered'))
      return t.auth.errorExists;
    if (msg.includes('password should be at least')) return t.auth.errorWeakPassword;
    if (msg.includes('email')) return t.auth.errorEmail;
    return t.auth.errorGeneric;
  };

  const routeAfterAuth = async (isNewAccount: boolean) => {
    const next = nextPath;
    if (isNewAccount) {
      router.push('/onboarding');
      router.refresh();
      return;
    }
    const { data } = await supabase
      .from('profiles')
      .select('onboarding_completed')
      .maybeSingle();
    const target =
      data?.onboarding_completed === false
        ? '/onboarding'
        : next && next.startsWith('/') && next !== '/auth'
        ? next
        : '/learn';
    router.push(target);
    router.refresh();
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (busy) return;

    if (!EMAIL_RE.test(email.trim())) {
      fail(t.auth.errorEmail);
      return;
    }
    if (password.length < 6) {
      fail(t.auth.errorWeakPassword);
      return;
    }
    if (mode === 'signup' && name.trim().length < 2) {
      fail(t.auth.errorGeneric);
      return;
    }

    setBusy(true);
    setError(null);

    if (mode === 'signup') {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { full_name: name.trim(), language: locale },
        },
      });

      if (signUpError) {
        fail(mapAuthError(signUpError.message));
        setBusy(false);
        return;
      }

      if (!data.session) {
        // Email confirmation is enabled on this project: tell the truth.
        fail(t.auth.errorGeneric);
        setBusy(false);
        return;
      }

      const { error: profileError } = await supabase.from('profiles').update({
        full_name: name.trim(),
        avatar_hue: Math.floor(Math.random() * 360),
        language: locale,
      });
      if (profileError) {
        /* the trigger already created the row; keep going */
      }

      await routeAfterAuth(true);
      setBusy(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      fail(mapAuthError(signInError.message));
      setBusy(false);
      return;
    }

    await routeAfterAuth(false);
    setBusy(false);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-paper lg:flex-row">
      {/* ------------------------------ Vibrant panel --------------------- */}
      <aside className="relative overflow-hidden bg-ecto px-6 py-8 text-paper lg:w-[46%] lg:px-14 lg:py-12">
        <div className="bg-confetti-dots pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

        <div className="relative flex h-full flex-col">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="lip lip-ecto flex h-11 w-11 items-center justify-center rounded-2xl bg-paper text-ecto">
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                  <path
                    d="M4 19.2h5.2v-4.4h4.4v-4.4h4.4V6"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M15.4 4.2 20 6l-4.6 1.8z" fill="currentColor" />
                </svg>
              </span>
              <span className="text-[19px] font-extrabold uppercase tracking-[0.16em] text-paper">
                Levelup
              </span>
            </div>

            <div className="flex items-center gap-1 rounded-2xl border-2 border-paper/60 bg-paper/15 p-1">
              {(['es', 'en'] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLocale(code)}
                  className={cn(
                    'relative rounded-xl px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider transition-colors',
                    locale === code ? 'text-ecto' : 'text-paper/85 hover:text-paper'
                  )}
                >
                  {locale === code && (
                    <motion.span
                      layoutId="localePill"
                      transition={{ type: 'spring', stiffness: 520, damping: 34 }}
                      className="absolute inset-0 rounded-xl bg-paper"
                    />
                  )}
                  <span className="relative">{code}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Real product illustration: a mini learning path, drawn as geometry */}
          <div className="relative mt-10 hidden lg:block">
            <svg viewBox="0 0 420 150" className="w-full max-w-md" role="img" aria-hidden="true">
              <path
                d="M28 118C92 118 84 40 148 40s56 78 120 78 56-78 120-78"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="9"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="1 22"
              />
              {[
                { x: 28, y: 118, done: true },
                { x: 148, y: 40, done: true },
                { x: 268, y: 118, done: false },
                { x: 388, y: 40, done: false },
              ].map((node, i) => (
                <g key={node.x}>
                  <circle
                    cx={node.x}
                    cy={node.y + 5}
                    r="21"
                    fill={node.done ? '#58A700' : 'rgba(4,44,96,0.35)'}
                  />
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="21"
                    fill={node.done ? '#FFFFFF' : '#042C60'}
                    stroke="rgba(255,255,255,0.7)"
                    strokeWidth="2"
                  />
                  {node.done ? (
                    <path
                      d={`M${node.x - 8} ${node.y} l6 6 l11 -12`}
                      stroke="#58CC02"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : (
                    <text
                      x={node.x}
                      y={node.y + 6}
                      textAnchor="middle"
                      fontSize="16"
                      fontWeight="800"
                      fill="#FFFFFF"
                    >
                      {i + 1}
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </div>

          <div className="mt-8 lg:mt-6">
            <h1 className="max-w-md text-[30px] font-extrabold leading-[1.12] tracking-tight text-paper lg:text-[42px]">
              {locale === 'es'
                ? 'Aprende haciendo, no mirando vídeos.'
                : 'Learn by doing, not by watching videos.'}
            </h1>
            <p className="mt-3 max-w-md text-[15px] font-semibold leading-relaxed text-paper/90">
              {t.auth.brandLine}
            </p>
          </div>

          <ul className="mt-8 grid gap-3 lg:mt-10">
            {benefits.map(({ icon: Icon, text }, i) => (
              <motion.li
                key={text}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.07, type: 'spring', stiffness: 320, damping: 26 }}
                className="flex items-center gap-3.5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-2 border-paper/70 bg-paper/20">
                  <Icon className="h-[18px] w-[18px] text-paper" strokeWidth={2.6} />
                </span>
                <span className="text-[13.5px] font-bold leading-snug text-paper">{text}</span>
              </motion.li>
            ))}
          </ul>

          <p className="mt-auto hidden pt-10 text-[12px] font-semibold text-paper/80 lg:block">
            {t.auth.realNote}
          </p>
        </div>
      </aside>

      {/* --------------------------------- Form --------------------------- */}
      <main className="flex flex-1 flex-col px-5 py-8 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between lg:hidden">
          <BrandMark size="sm" withLabel />
          <div className="flex items-center gap-1 rounded-2xl border-2 border-swan bg-polar p-1">
            {(['es', 'en'] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                className={cn(
                  'relative rounded-xl px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider transition-colors',
                  locale === code ? 'text-ecto' : 'text-wolf hover:text-graphite'
                )}
              >
                {locale === code && (
                  <motion.span
                    layoutId="localePillMobile"
                    transition={{ type: 'spring', stiffness: 520, damping: 34 }}
                    className="absolute inset-0 rounded-xl border-2 border-swan bg-paper"
                  />
                )}
                <span className="relative">{code}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          >
            <h2 className="text-[26px] font-extrabold tracking-tight text-navy">
              {mode === 'signin' ? t.auth.titleIn : t.auth.titleUp}
            </h2>
            <p className="mt-2 text-[13.5px] font-semibold leading-relaxed text-wolf">
              {t.auth.subtitle}
            </p>

            {/* Mode switch */}
            <div className="mt-6 flex gap-1 rounded-2xl border-2 border-swan bg-polar p-1">
              {(
                [
                  { id: 'signin' as const, label: t.auth.signInBtn },
                  { id: 'signup' as const, label: t.auth.signUpBtn.split(' ')[0] },
                ]
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setMode(tab.id);
                    setError(null);
                  }}
                  className={cn(
                    'relative flex-1 rounded-xl px-3 py-2.5 text-[12px] font-extrabold uppercase tracking-[0.06em] transition-colors',
                    mode === tab.id ? 'text-ecto' : 'text-wolf hover:text-graphite'
                  )}
                >
                  {mode === tab.id && (
                    <motion.span
                      layoutId="authModePill"
                      transition={{ type: 'spring', stiffness: 520, damping: 34 }}
                      className="absolute inset-0 rounded-xl border-2 border-swan bg-paper"
                      style={{ boxShadow: '0 2px 0 0 #E5E5E5' }}
                    />
                  )}
                  <span className="relative">
                    {tab.id === 'signup' && locale === 'es' ? 'Crear cuenta' : tab.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.form
            key={mode}
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="mt-6 space-y-4"
            noValidate
          >
            {mode === 'signup' && (
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-wolf">
                  {t.auth.nameLabel}
                </span>
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-hare" strokeWidth={2.4} />
                  <input
                    type="text"
                    value={name}
                    autoComplete="nickname"
                    onChange={(e) => setName(e.target.value)}
                    placeholder={locale === 'es' ? 'Ana García' : 'Ana Garcia'}
                    className="field-arcade pl-11"
                  />
                </div>
                <span className="mt-1.5 block text-[11px] font-semibold text-hare">
                  {t.auth.nameHint}
                </span>
              </label>
            )}

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-wolf">
                {t.auth.emailLabel}
              </span>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-hare" strokeWidth={2.4} />
                <input
                  type="email"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="field-arcade pl-11"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-wolf">
                {t.auth.passwordLabel}
              </span>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-hare" strokeWidth={2.4} />
                <input
                  type="password"
                  value={password}
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  className="field-arcade pl-11"
                />
              </div>
              <span className="mt-1.5 block text-[11px] font-semibold text-hare">
                {t.auth.passwordHint}
              </span>
            </label>

            {error && (
              <motion.div
                key={shakeKey}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="animate-shake flex items-start gap-2.5 rounded-2xl border-2 border-cardinal bg-cardinal-wash px-4 py-3"
                role="alert"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cardinal text-[11px] font-extrabold text-paper">
                  !
                </span>
                <span className="text-[13px] font-bold leading-snug text-cardinal-dark">
                  {error}
                </span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={busy || !canSubmit}
              className={cn(
                'btn-arcade w-full',
                mode === 'signup' && 'btn-macaw',
                busy && 'opacity-80'
              )}
            >
              {busy ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={3} />
                  {mode === 'signup' ? t.auth.creatingAccount : t.auth.signingIn}
                </>
              ) : (
                <>
                  {mode === 'signup' ? t.auth.signUpBtn : t.auth.signInBtn}
                  <ArrowRight className="h-4 w-4" strokeWidth={3} />
                </>
              )}
            </button>
          </motion.form>

          <button
            type="button"
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin');
              setError(null);
            }}
            className="mt-5 text-center text-[13px] font-extrabold uppercase tracking-[0.04em] text-macaw transition-colors hover:text-macaw-dark"
          >
            {mode === 'signin' ? t.auth.switchToSignUp : t.auth.switchToSignIn}
          </button>

          <div className="mt-8 flex items-center gap-2 rounded-2xl border-2 border-swan bg-polar px-4 py-3 lg:hidden">
            <Check className="h-4 w-4 shrink-0 text-ecto" strokeWidth={3} />
            <p className="text-[11.5px] font-semibold leading-snug text-wolf">{t.auth.realNote}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AuthPage() {
  return <AuthPanel />;
}
