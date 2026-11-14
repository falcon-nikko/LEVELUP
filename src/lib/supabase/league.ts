'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { TrackSlug } from '@/lib/curriculum/affiliates';

export interface LeagueRow {
  userId: string;
  displayName: string;
  avatarHue: number;
  trackSlug: TrackSlug;
  weeklyXp: number;
  totalXp: number;
  streak: number;
  isPro: boolean;
  isSelf: boolean;
  rank: number;
}

export interface LeagueWindow {
  weekKey: string;
  weekStart: string;
  weekEnd: string;
  secondsLeft: number;
  memberCount: number;
}

type RawLeagueRow = {
  user_id: string;
  display_name: string | null;
  avatar_hue: number | null;
  active_track_slug: string | null;
  weekly_xp: number | null;
  total_xp: number | null;
  current_streak: number | null;
  is_pro: boolean | null;
  is_self: boolean | null;
  league_rank: number | string | null;
};

/**
 * The league is 100% real: rows come from `public.get_weekly_league()`,
 * which only projects registered profiles whose privacy setting is public.
 * There is no seeded/demo fallback anywhere in this module.
 */
export async function fetchLeagueRows(
  supabase: SupabaseClient,
  limit = 30
): Promise<LeagueRow[]> {
  const { data, error } = await supabase.rpc('get_weekly_league', { p_limit: limit });
  if (error || !Array.isArray(data)) return [];

  return (data as RawLeagueRow[]).map((row, index) => ({
    userId: row.user_id,
    displayName: row.display_name || 'Operator',
    avatarHue: row.avatar_hue ?? 145,
    trackSlug: (row.active_track_slug as TrackSlug) || 'ai-automation',
    weeklyXp: row.weekly_xp ?? 0,
    totalXp: row.total_xp ?? 0,
    streak: row.current_streak ?? 0,
    isPro: Boolean(row.is_pro),
    isSelf: Boolean(row.is_self),
    rank: Number(row.league_rank) || index + 1,
  }));
}

export async function fetchLeagueWindow(
  supabase: SupabaseClient
): Promise<LeagueWindow | null> {
  const { data, error } = await supabase.rpc('get_league_window');
  if (error || !data) return null;
  const row = Array.isArray(data) ? data[0] : data;
  if (!row) return null;
  return {
    weekKey: row.week_key,
    weekStart: row.week_start,
    weekEnd: row.week_end,
    secondsLeft: Number(row.seconds_left) || 0,
    memberCount: Number(row.member_count) || 0,
  };
}

/**
 * Live league hook: loads real rows + the real week window, then ticks the
 * countdown locally. `refresh()` re-reads Supabase after XP changes.
 */
export function useLeague(limit = 30, refreshKey: number | string = 0) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [rows, setRows] = useState<LeagueRow[]>([]);
  const [week, setWeek] = useState<LeagueWindow | null>(null);
  const [loading, setLoading] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [ticking, setTicking] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    const [leagueRows, leagueWeek] = await Promise.all([
      fetchLeagueRows(supabase, limit),
      fetchLeagueWindow(supabase),
    ]);
    setRows(leagueRows);
    setWeek(leagueWeek);
    setSecondsLeft(leagueWeek?.secondsLeft ?? 0);
    setLoading(false);
  }, [limit, supabase]);

  useEffect(() => {
    refresh();
  }, [refresh, refreshKey]);

  useEffect(() => {
    if (!ticking) return;
    const id = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [ticking]);

  useEffect(() => {
    if (secondsLeft > 0 && !ticking) setTicking(true);
  }, [secondsLeft, ticking]);

  return { rows, week, loading, secondsLeft, refresh };
}
