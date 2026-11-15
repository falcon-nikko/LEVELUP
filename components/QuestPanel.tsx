"use client";

import { Target, Flame, Clock, BookOpen, Trophy, Zap } from "lucide-react";
import type { QuestWithProgress } from "@/lib/types";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  lessons: BookOpen,
  xp: Zap,
  time: Clock,
  exercise: Target,
  streak: Flame,
  unit: Trophy,
};

export function QuestPanel({ quests }: { quests: QuestWithProgress[] }) {
  return (
    <div className="card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-extrabold tracking-tight">Misiones de hoy</h2>
        <span className="text-[11px] font-bold text-white/40">
          {quests.filter((q) => q.completed).length}/{quests.length}
        </span>
      </div>
      <div className="grid gap-2">
        {quests.map((q) => {
          const Icon = icons[q.type] ?? Target;
          const pct = Math.min(100, Math.round((q.progress / q.target) * 100));
          return (
            <div key={q.slug} className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${
                    q.completed ? "bg-brand-500/25 text-brand-300" : "bg-white/8 text-white/55"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-bold leading-tight">{q.name}</p>
                  <p className="truncate text-[11px] text-white/40">{q.description}</p>
                </div>
                <span className="shrink-0 text-[11px] font-extrabold text-brand-400/90">+{q.xpReward}</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/8">
                  <div
                    className={`h-full rounded-full transition-all ${q.completed ? "bg-brand-400" : "bg-brand-500/70"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-9 text-right text-[10.5px] font-bold tabular-nums text-white/40">
                  {Math.min(q.progress, q.target)}/{q.target}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
