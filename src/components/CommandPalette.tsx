'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Globe,
  Home,
  Search,
  ShieldCheck,
  Swords,
  Target,
  Trophy,
  UserRound,
  Volume2,
  VolumeX,
  Wrench,
} from 'lucide-react';
import { useLevelUp } from '@/context/LevelUpContext';
import { CAREER_TRACKS, getAllLessons } from '@/lib/curriculum/tracks';
import { l } from '@/lib/i18n/dictionaries';
import { cn } from '@/lib/utils';

interface PaletteAction {
  id: string;
  group: string;
  title: string;
  subtitle?: string;
  accent: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  run: () => void;
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const { locale, setLocale, soundEnabled, setSoundEnabled, setActiveTrack } = useLevelUp();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const actions = useMemo<PaletteAction[]>(() => {
    const navGroup = locale === 'es' ? 'Navegación' : 'Navigate';
    const trackGroup = locale === 'es' ? 'Rutas' : 'Tracks';
    const lessonGroup = locale === 'es' ? 'Lecciones' : 'Lessons';
    const prefGroup = locale === 'es' ? 'Ajustes' : 'Settings';

    const base: PaletteAction[] = [
      {
        id: 'go-learn',
        group: navGroup,
        title: locale === 'es' ? 'Ir a la ruta' : 'Go to the path',
        subtitle: '/learn',
        accent: '#58CC02',
        icon: Home,
        run: () => router.push('/learn'),
      },
      {
        id: 'go-quests',
        group: navGroup,
        title: locale === 'es' ? 'Misiones diarias' : 'Daily quests',
        subtitle: '/quests',
        accent: '#1CB0F6',
        icon: Target,
        run: () => router.push('/quests'),
      },
      {
        id: 'go-league',
        group: navGroup,
        title: locale === 'es' ? 'Liga semanal' : 'Weekly league',
        subtitle: '/leaderboard',
        accent: '#FFC800',
        icon: Trophy,
        run: () => router.push('/leaderboard'),
      },
      {
        id: 'go-vault',
        group: navGroup,
        title: locale === 'es' ? 'Taller (P&L y cold email)' : 'Workbench (P&L and cold email)',
        subtitle: '/vault',
        accent: '#FF9600',
        icon: Calculator,
        run: () => router.push('/vault'),
      },
      {
        id: 'go-stack',
        group: navGroup,
        title: locale === 'es' ? 'Herramientas' : 'Tool directory',
        subtitle: '/stack',
        accent: '#FF9600',
        icon: Wrench,
        run: () => router.push('/stack'),
      },
      {
        id: 'go-pro',
        group: navGroup,
        title: 'LEVELUP Super',
        subtitle: '/pro',
        accent: '#FF9600',
        icon: ShieldCheck,
        run: () => router.push('/pro'),
      },
      {
        id: 'go-profile',
        group: navGroup,
        title: locale === 'es' ? 'Perfil y ajustes' : 'Profile and settings',
        subtitle: '/profile',
        accent: '#1CB0F6',
        icon: UserRound,
        run: () => router.push('/profile'),
      },
      {
        id: 'toggle-lang',
        group: prefGroup,
        title: locale === 'es' ? 'Cambiar a English (EN)' : 'Cambiar a Español (ES)',
        accent: '#1CB0F6',
        icon: Globe,
        run: () => setLocale(locale === 'es' ? 'en' : 'es'),
      },
      {
        id: 'toggle-sound',
        group: prefGroup,
        title: soundEnabled
          ? locale === 'es'
            ? 'Silenciar sonidos'
            : 'Mute interface sounds'
          : locale === 'es'
          ? 'Activar sonidos'
          : 'Enable interface sounds',
        accent: '#58CC02',
        icon: soundEnabled ? Volume2 : VolumeX,
        run: () => setSoundEnabled(!soundEnabled),
      },
    ];

    for (const tr of CAREER_TRACKS) {
      base.push({
        id: `track-${tr.slug}`,
        group: trackGroup,
        title: l(tr.name, locale),
        subtitle: l(tr.shortTag, locale),
        accent: tr.accent,
        icon: Swords,
        run: () => {
          setActiveTrack(tr.slug);
          router.push('/learn');
        },
      });
    }

    for (const les of getAllLessons()) {
      base.push({
        id: `lesson-${les.slug}`,
        group: lessonGroup,
        title: l(les.title, locale),
        subtitle: `${les.durationMin} min · +${les.xpReward} XP`,
        accent: '#58CC02',
        icon: BookOpen,
        run: () => router.push(`/lesson/${les.slug}`),
      });
    }

    return base;
  }, [locale, router, setActiveTrack, setLocale, setSoundEnabled, soundEnabled]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions.slice(0, 9);
    return actions.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        (a.subtitle && a.subtitle.toLowerCase().includes(q)) ||
        a.group.toLowerCase().includes(q)
    );
  }, [actions, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (filtered.length ? (prev + 1) % filtered.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) =>
          filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0
        );
      } else if (e.key === 'Enter' && filtered[activeIndex]) {
        e.preventDefault();
        filtered[activeIndex].run();
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, filtered, onClose, open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.14 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-navy/35 px-4 pt-[12vh]"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ type: 'spring', stiffness: 460, damping: 32 }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border-2 border-swan bg-paper"
            style={{ boxShadow: '0 8px 0 0 #E5E5E5' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-14 items-center gap-3 border-b-2 border-swan px-4">
              <Search className="h-4 w-4 shrink-0 text-hare" strokeWidth={2.8} />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  locale === 'es'
                    ? 'Buscar lección, ruta, liga o acción…'
                    : 'Search lessons, tracks, league or actions…'
                }
                className="flex-1 bg-transparent text-[14px] font-semibold text-graphite placeholder:font-medium placeholder:text-hare focus:outline-none"
              />
              <span className="kbd-key">ESC</span>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center text-[12.5px] font-bold text-hare">
                  {locale === 'es' ? 'Sin resultados.' : 'No matching commands.'}
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const Icon = item.icon;
                  const selected = idx === activeIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => {
                        item.run();
                        onClose();
                      }}
                      className={cn(
                        'relative z-10 flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left',
                        selected ? 'text-graphite' : 'text-wolf'
                      )}
                    >
                      {selected && (
                        <motion.span
                          layoutId="paletteActiveItem"
                          transition={{ type: 'spring', stiffness: 520, damping: 36 }}
                          className="absolute inset-0 -z-10 rounded-xl bg-ecto-wash"
                        />
                      )}
                      <span className="flex min-w-0 items-center gap-3">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-paper"
                          style={{ backgroundColor: item.accent }}
                        >
                          <Icon className="h-4 w-4" strokeWidth={2.8} />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-[13px] font-extrabold">
                            {item.title}
                          </span>
                          {item.subtitle && (
                            <span className="block truncate font-mono text-[11px] font-semibold text-hare">
                              {item.subtitle}
                            </span>
                          )}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-hare">
                          {item.group}
                        </span>
                        {selected && (
                          <ArrowRight className="h-3.5 w-3.5 text-ecto-dark" strokeWidth={3} />
                        )}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            <div className="flex items-center justify-between border-t-2 border-swan bg-polar px-4 py-2 text-[11px] font-bold text-hare">
              <span className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="kbd-key">↑</span>
                  <span className="kbd-key">↓</span>
                  {locale === 'es' ? 'navegar' : 'navigate'}
                </span>
                <span className="flex items-center gap-1">
                  <span className="kbd-key">↵</span>
                  {locale === 'es' ? 'abrir' : 'open'}
                </span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider">⌘K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
