'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Calculator,
  Flame,
  Gem,
  Heart,
  Home,
  ShieldCheck,
  Target,
  Trophy,
  UserRound,
  Wrench,
} from 'lucide-react';
import { useLevelUp } from '@/context/LevelUpContext';
import { BrandMark } from '@/components/BrandMark';
import { avatarStyle, cn, initialsOf } from '@/lib/utils';

interface NavItem {
  href: string;
  labelKey: 'learn' | 'quests' | 'leaderboard' | 'stack' | 'vault' | 'profile' | 'pro';
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

const NAV_ITEMS: NavItem[] = [
  { href: '/learn', labelKey: 'learn', icon: Home },
  { href: '/quests', labelKey: 'quests', icon: Target },
  { href: '/leaderboard', labelKey: 'leaderboard', icon: Trophy },
  { href: '/vault', labelKey: 'vault', icon: Calculator },
  { href: '/stack', labelKey: 'stack', icon: Wrench },
  { href: '/profile', labelKey: 'profile', icon: UserRound },
];

const MOBILE_ITEMS: NavItem[] = [
  { href: '/learn', labelKey: 'learn', icon: Home },
  { href: '/quests', labelKey: 'quests', icon: Target },
  { href: '/leaderboard', labelKey: 'leaderboard', icon: Trophy },
  { href: '/profile', labelKey: 'profile', icon: UserRound },
];

function StatChip({
  icon: Icon,
  value,
  color,
  label,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  value: number;
  color: 'fox' | 'macaw' | 'cardinal';
  label: string;
}) {
  const tone =
    color === 'fox'
      ? 'text-fox'
      : color === 'macaw'
      ? 'text-macaw'
      : 'text-cardinal';
  return (
    <div className="flex items-center gap-1.5" title={label}>
      <Icon
        className={cn('h-[22px] w-[22px]', tone, color === 'fox' && 'animate-flicker')}
        strokeWidth={2.6}
      />
      <span className={cn('text-[15px] font-extrabold tabular-nums', tone)}>{value}</span>
    </div>
  );
}

export function AppShell({
  children,
  aside,
}: {
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  const pathname = usePathname();
  const { t, state } = useLevelUp();

  const isActive = (href: string) =>
    href === '/learn' ? pathname === '/learn' : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-polar pb-24 lg:pb-0">
      {/* ------------------------------- Top HUD -------------------------- */}
      <header className="sticky top-0 z-40 border-b-2 border-swan bg-paper">
        <div className="mx-auto flex h-[68px] w-full max-w-[1240px] items-center justify-between gap-4 px-4 lg:px-6">
          <Link href="/learn" className="shrink-0" aria-label="LEVELUP">
            <BrandMark size="sm" withLabel={false} className="lg:hidden" />
            <span className="hidden lg:block">
              <BrandMark size="md" withLabel />
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-5">
            <StatChip icon={Flame} value={state.streakDays} color="fox" label={t.hud.streak} />
            <StatChip icon={Gem} value={state.gems} color="macaw" label={t.hud.gems} />
            <StatChip icon={Heart} value={state.hearts} color="cardinal" label={t.hud.hearts} />

            <Link
              href="/profile"
              className="ml-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-[13px] font-extrabold transition-transform hover:-translate-y-0.5"
              style={avatarStyle(state.avatarHue)}
              aria-label={t.nav.profile}
            >
              {initialsOf(state.displayName)}
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1240px] gap-8 px-4 lg:px-6">
        {/* ------------------------------ Left rail ------------------------ */}
        <nav className="sticky top-[88px] hidden h-fit w-[228px] shrink-0 flex-col gap-1 py-6 lg:flex">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative flex items-center gap-3 rounded-2xl border-2 px-4 py-3 text-[13px] font-extrabold uppercase tracking-[0.06em] transition-colors',
                  active
                    ? 'border-ecto bg-ecto-wash text-ecto-dark'
                    : 'border-transparent text-wolf hover:border-swan hover:bg-paper hover:text-graphite'
                )}
              >
                {active && (
                  <motion.span
                    layoutId="railActive"
                    transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                    className="absolute inset-0 -z-10 rounded-2xl border-2 border-ecto bg-ecto-wash"
                  />
                )}
                <Icon className="h-[22px] w-[22px]" strokeWidth={2.6} />
                {t.nav[item.labelKey]}
              </Link>
            );
          })}

          <Link
            href="/pro"
            className={cn(
              'mt-3 flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-[13px] font-extrabold uppercase tracking-[0.06em] transition-transform hover:-translate-y-0.5',
              state.isPro
                ? 'border-2 border-bee bg-bee-wash text-fox-dark'
                : 'lip lip-fox bg-fox text-paper'
            )}
          >
            <ShieldCheck className="h-[20px] w-[20px]" strokeWidth={2.8} />
            {state.isPro ? t.nav.proActive : t.nav.pro}
          </Link>
        </nav>

        {/* ------------------------------- Content ------------------------- */}
        <main className="min-w-0 flex-1 py-6 lg:py-8">{children}</main>

        {aside && (
          <aside className="sticky top-[88px] hidden h-fit w-[330px] shrink-0 py-6 lg:block xl:py-8">
            {aside}
          </aside>
        )}
      </div>

      {/* --------------------------- Mobile bottom bar --------------------- */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t-2 border-swan bg-paper lg:hidden">
        <div className="mx-auto flex max-w-lg items-stretch justify-between px-2 py-2">
          {MOBILE_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative flex flex-1 flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-extrabold uppercase tracking-wide transition-colors',
                  active ? 'text-ecto' : 'text-hare'
                )}
              >
                {active && (
                  <motion.span
                    layoutId="mobileNavActive"
                    transition={{ type: 'spring', stiffness: 500, damping: 36 }}
                    className="absolute inset-0 rounded-xl bg-ecto-wash"
                  />
                )}
                <Icon className="relative h-[24px] w-[24px]" strokeWidth={2.6} />
                <span className="relative">{t.nav[item.labelKey]}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
