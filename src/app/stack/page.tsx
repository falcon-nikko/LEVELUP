'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, MousePointerClick, Wrench } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { useLevelUp } from '@/context/LevelUpContext';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { AFFILIATE_TOOLS } from '@/lib/curriculum/affiliates';
import { CAREER_TRACKS } from '@/lib/curriculum/tracks';
import { l } from '@/lib/i18n/dictionaries';
import { cn } from '@/lib/utils';

export default function StackPage() {
  const { t, locale, state, trackAffiliateClick } = useLevelUp();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [clicks, setClicks] = useState<Record<string, number>>({});
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from('affiliate_tools')
        .select('slug, clicks_count')
        .eq('is_active', true);
      if (!error && Array.isArray(data)) {
        setClicks(
          data.reduce<Record<string, number>>((acc, row) => {
            acc[row.slug as string] = Number(row.clicks_count) || 0;
            return acc;
          }, {})
        );
      }
    };
    load();
  }, [supabase, state.totalXp]);

  const tools = AFFILIATE_TOOLS.filter((tool) => filter === 'all' || tool.trackSlug === filter);

  return (
    <AppShell>
      <header className="mb-6">
        <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.1em] text-wolf">
          <Wrench className="h-4 w-4 text-fox" strokeWidth={2.8} />
          {t.nav.stack}
        </div>
        <h1 className="mt-1 text-[26px] font-extrabold tracking-tight text-navy sm:text-[30px]">
          {t.stack.title}
        </h1>
        <p className="mt-1 max-w-xl text-[13px] font-semibold leading-relaxed text-wolf">
          {t.stack.subtitle}
        </p>
      </header>

      {/* Filters */}
      <div className="-mx-1 mb-6 flex gap-2 overflow-x-auto px-1 pb-2 lg:mx-0 lg:px-0">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={cn(
            'shrink-0 rounded-2xl border-2 px-4 py-2 text-[12px] font-extrabold uppercase tracking-wide transition-transform',
            filter === 'all'
              ? 'border-navy bg-navy text-paper'
              : 'border-swan bg-paper text-wolf hover:-translate-y-0.5'
          )}
          style={{ boxShadow: `0 3px 0 0 ${filter === 'all' ? '#032048' : '#E5E5E5'}` }}
        >
          {t.stack.allFilter}
        </button>
        {CAREER_TRACKS.map((tr) => {
          const active = filter === tr.slug;
          return (
            <button
              key={tr.slug}
              type="button"
              onClick={() => setFilter(tr.slug)}
              className={cn(
                'shrink-0 rounded-2xl border-2 px-4 py-2 text-[12px] font-extrabold uppercase tracking-wide transition-transform',
                active ? 'border-transparent' : 'border-swan bg-paper text-wolf hover:-translate-y-0.5'
              )}
              style={
                active
                  ? { backgroundColor: tr.accent, color: tr.accentInk, boxShadow: `0 3px 0 0 ${tr.accentLip}` }
                  : { boxShadow: '0 3px 0 0 #E5E5E5' }
              }
            >
              {l(tr.name, locale)}
            </button>
          );
        })}
      </div>

      {/* Tools */}
      <div className="grid gap-4 md:grid-cols-2">
        {tools.map((tool, index) => {
          const tr = CAREER_TRACKS.find((x) => x.slug === tool.trackSlug)!;
          return (
            <motion.div
              key={tool.slug}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, type: 'spring', stiffness: 280, damping: 26 }}
              className="panel flex flex-col p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-[15px] font-extrabold text-paper"
                    style={{ backgroundColor: tr.accent, color: tr.accentInk, boxShadow: `0 4px 0 0 ${tr.accentLip}` }}
                  >
                    {tool.name.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <h2 className="truncate text-[16px] font-extrabold leading-tight text-navy">
                      {tool.name}
                    </h2>
                    <div className="mt-0.5 truncate text-[11px] font-extrabold uppercase tracking-[0.08em]" style={{ color: tr.accentLip }}>
                      {l(tool.category, locale)}
                    </div>
                  </div>
                </div>
                {tool.featured && (
                  <span className="shrink-0 rounded-lg bg-bee-wash px-2 py-1 text-[9.5px] font-extrabold uppercase tracking-wide text-fox-dark">
                    {locale === 'es' ? 'Destacada' : 'Featured'}
                  </span>
                )}
              </div>

              <p className="mt-3 flex-1 text-[12.5px] font-semibold leading-relaxed text-wolf">
                {l(tool.tagline, locale)}
              </p>

              <div className="mt-3 flex items-center gap-2 rounded-xl border-2 border-swan bg-polar px-3 py-2">
                <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-hare">
                  {t.stack.perksLabel}
                </span>
                <span className="truncate text-[12px] font-extrabold text-ecto-dark">
                  {l(tool.perkBadge, locale)}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-hare">
                  <MousePointerClick className="h-3.5 w-3.5" strokeWidth={2.8} />
                  <span className="tabular-nums">{clicks[tool.slug] ?? 0}</span>
                  {t.stack.clicksTracked}
                </span>
                <a
                  href={tool.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  onClick={async () => {
                    const count = await trackAffiliateClick(tool.slug, 'stack');
                    if (typeof count === 'number') {
                      setClicks((prev) => ({ ...prev, [tool.slug]: count }));
                    }
                  }}
                  className="btn-arcade !px-4 !py-2.5 !text-[11.5px]"
                  style={{ backgroundColor: tr.accent, color: tr.accentInk, '--lip': tr.accentLip } as React.CSSProperties}
                >
                  {t.stack.launchBtn}
                  <ExternalLink className="h-3.5 w-3.5" strokeWidth={3} />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-6 mb-10 text-center text-[11.5px] font-semibold leading-relaxed text-hare">
        {t.stack.affiliateNote}
      </p>
    </AppShell>
  );
}
