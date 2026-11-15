"use client";

import { useEffect, useState } from "react";
import { Crown, Timer, TrendingUp, Trophy, Users } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { getSupabase } from "@/lib/supabase/client";
import { buildDemoLeaderboard, leagueWindow } from "@/lib/progress";
import type { LeaderboardEntry, LeagueWindow } from "@/lib/types";

export default function LeaguesPage() {
  const { profile, mode } = useAuth();
  const [rows, setRows] = useState<LeaderboardEntry[]>([]);
  const [win, setWin] = useState<LeagueWindow>(() => leagueWindow());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    async function load() {
      setLoading(true);
      if (mode === "demo") {
        if (alive) {
          setRows(buildDemoLeaderboard(profile));
          setWin(leagueWindow());
          setLoading(false);
        }
        return;
      }
      const supabase = getSupabase();
      if (!supabase) return;
      const [{ data: board }, { data: windowRow }] = await Promise.all([
        supabase.rpc("get_weekly_league", { p_limit: 30 }),
        supabase.rpc("get_league_window"),
      ]);
      if (!alive) return;
      const mapped: LeaderboardEntry[] = ((board ?? []) as Record<string, unknown>[]).map((r) => ({
        userId: String(r.user_id),
        displayName: String(r.display_name ?? "Operador"),
        avatarHue: Number(r.avatar_hue ?? 145),
        weeklyXp: Number(r.weekly_xp ?? 0),
        totalXp: Number(r.total_xp ?? 0),
        streak: Number(r.current_streak ?? 0),
        isSelf: Boolean(r.is_self),
        rank: Number(r.league_rank ?? 0),
      }));
      setRows(mapped);
      const w = (Array.isArray(windowRow) ? windowRow[0] : windowRow) as Record<string, unknown> | undefined;
      if (w) {
        setWin({
          weekKey: String(w.week_key ?? ""),
          weekStart: String(w.week_start ?? ""),
          weekEnd: String(w.week_end ?? ""),
          secondsLeft: Number(w.seconds_left ?? 0),
          memberCount: Number(w.member_count ?? 0),
        });
      }
      setLoading(false);
    }
    void load();
    return () => {
      alive = false;
    };
  }, [mode, profile]);

  const self = rows.find((r) => r.isSelf);

  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 font-display text-[26px] uppercase leading-none tracking-tight">
            <Trophy className="h-6 w-6" strokeWidth={2.6} /> Liga semanal
          </h1>
          <p className="mt-2 text-[12.5px] font-semibold text-ink/60">
            Suben los 10 primeros. El lunes se reinicia.
          </p>
        </div>
        <div className="shrink-0 border-2 border-ink bg-yellow-brand px-2.5 py-1.5 text-center shadow-hard-sm">
          <p className="flex items-center gap-1 text-[13px] font-extrabold tabular-nums">
            <Timer className="h-3.5 w-3.5" strokeWidth={2.8} />
            {formatCountdown(win.secondsLeft)}
          </p>
          <p className="text-[9px] font-extrabold uppercase tracking-wide">restante</p>
        </div>
      </header>

      {self && (
        <div className="mb-4 flex items-center gap-3 border-2 border-ink bg-mint-brand p-3.5 shadow-hard">
          <RankBadge rank={self.rank} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-extrabold">{self.displayName} (tú)</p>
            <p className="text-[11.5px] font-semibold">
              {self.weeklyXp} XP esta semana · total {self.totalXp} XP
            </p>
          </div>
          {self.rank <= 10 ? (
            <span className="chip chip-yellow">Zona de ascenso</span>
          ) : (
            <span className="chip">A {(self.weeklyXp - (rows[9]?.weeklyXp ?? 0)) > 0 ? "asegurar" : "por subir"}</span>
          )}
        </div>
      )}

      <div className="overflow-hidden border-2 border-ink bg-white shadow-hard">
        {loading && (
          <div className="space-y-2 p-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton h-12 border-2 border-ink" />
            ))}
          </div>
        )}

        {!loading &&
          rows.map((r) => (
            <div
              key={r.userId}
              className={`flex items-center gap-3 border-b-2 border-ink px-3 py-2.5 last:border-b-0 ${
                r.isSelf ? "bg-yellow-brand" : ""
              }`}
            >
              <RankBadge rank={r.rank} />
              <span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-ink text-[12px] font-black"
                style={{
                  background: `hsl(${r.avatarHue} 78% 78%)`,
                }}
              >
                {initials(r.displayName)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] font-bold">
                  {r.displayName}
                  {r.isSelf && <span className="ml-1 font-extrabold uppercase">· tú</span>}
                </p>
                <p className="flex items-center gap-2 text-[11px] font-semibold text-ink/55">
                  <span className="flex items-center gap-0.5">
                    <TrendingUp className="h-3 w-3" />
                    {r.weeklyXp} XP
                  </span>
                  {r.streak > 0 && <span>🔥 {r.streak}</span>}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[13px] font-black tabular-nums">{r.totalXp}</p>
                <p className="text-[9px] font-extrabold uppercase tracking-wide text-ink/45">total</p>
              </div>
              {r.rank === 1 && <Crown className="h-4 w-4 shrink-0" strokeWidth={2.8} />}
            </div>
          ))}

        {!loading && rows.length === 0 && (
          <p className="p-8 text-center text-[13px] font-semibold text-ink/55">
            Aún no hay nadie en la liga esta semana.
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center gap-3 border-2 border-ink bg-cream-200 p-3.5 shadow-hard-sm">
        <Users className="h-5 w-5 shrink-0" strokeWidth={2.6} />
        <p className="text-[12px] font-semibold leading-snug">
          {win.memberCount} participantes esta semana · Semana {win.weekKey}. Los 10 primeros ascienden de liga el
          lunes a las 00:00 UTC.
        </p>
      </div>
    </div>
  );
}

function RankBadge({ rank }: { rank: number }) {
  const medal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : null;
  return (
    <span className="grid w-7 shrink-0 place-items-center text-[13px] font-extrabold tabular-nums">
      {medal ?? rank}
    </span>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatCountdown(seconds: number) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}
