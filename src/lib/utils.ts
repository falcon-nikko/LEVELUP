import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* -------------------------------------------------------------------------- */
/* Operator ranks — vibrant arcade palette                                     */
/* -------------------------------------------------------------------------- */

export type OperatorRank = {
  level: number;
  slug: 'rookie' | 'builder' | 'operator' | 'specialist' | 'founder';
  labelEs: string;
  labelEn: string;
  minXp: number;
  nextXp: number | null;
  accent: string;
  lip: string;
  wash: string;
};

export const OPERATOR_RANKS: OperatorRank[] = [
  {
    level: 1,
    slug: 'rookie',
    labelEs: 'Nv. 1 · Novato',
    labelEn: 'Lv. 1 · Rookie',
    minXp: 0,
    nextXp: 200,
    accent: '#AFAFAF',
    lip: '#9A9A9A',
    wash: '#F2F2F2',
  },
  {
    level: 2,
    slug: 'builder',
    labelEs: 'Nv. 2 · Builder',
    labelEn: 'Lv. 2 · Builder',
    minXp: 200,
    nextXp: 600,
    accent: '#1CB0F6',
    lip: '#1899D6',
    wash: '#DDF4FF',
  },
  {
    level: 3,
    slug: 'operator',
    labelEs: 'Nv. 3 · Operator',
    labelEn: 'Lv. 3 · Operator',
    minXp: 600,
    nextXp: 1500,
    accent: '#58CC02',
    lip: '#58A700',
    wash: '#D7FFB8',
  },
  {
    level: 4,
    slug: 'specialist',
    labelEs: 'Nv. 4 · Principal',
    labelEn: 'Lv. 4 · Principal',
    minXp: 1500,
    nextXp: 3500,
    accent: '#FF9600',
    lip: '#D97B00',
    wash: '#FFE8CC',
  },
  {
    level: 5,
    slug: 'founder',
    labelEs: 'Nv. 5 · Founder',
    labelEn: 'Lv. 5 · Founder',
    minXp: 3500,
    nextXp: null,
    accent: '#FFC800',
    lip: '#E5A800',
    wash: '#FFF4CC',
  },
];

export function getOperatorRank(xp: number): OperatorRank & { progressPct: number } {
  let current = OPERATOR_RANKS[0];
  for (const rank of OPERATOR_RANKS) {
    if (xp >= rank.minXp) current = rank;
  }
  if (!current.nextXp) {
    return { ...current, progressPct: 100 };
  }
  const span = current.nextXp - current.minXp;
  const pct = Math.min(100, Math.max(0, Math.round(((xp - current.minXp) / span) * 100)));
  return { ...current, progressPct: pct };
}

/* -------------------------------------------------------------------------- */
/* Avatars — deterministic colour from the real profile hue                    */
/* -------------------------------------------------------------------------- */

export function avatarStyle(hue: number) {
  const h = ((hue % 360) + 360) % 360;
  return {
    backgroundColor: `hsl(${h} 88% 92%)`,
    color: `hsl(${h} 72% 30%)`,
    borderColor: `hsl(${h} 70% 74%)`,
  } as const;
}

export function initialsOf(name: string): string {
  const clean = (name || '').replace(/[^\p{L}\p{N} ]/gu, ' ').trim();
  if (!clean) return '?';
  const parts = clean.split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

/* -------------------------------------------------------------------------- */
/* Real league countdown                                                       */
/* -------------------------------------------------------------------------- */

export function formatCountdown(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const days = Math.floor(safe / 86400);
  const hours = Math.floor((safe % 86400) / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${String(minutes).padStart(2, '0')}m`;
  return `${minutes}m ${String(safe % 60).padStart(2, '0')}s`;
}

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}
