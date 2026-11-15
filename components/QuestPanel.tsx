"use client";

import { Target, Flame, Clock, BookOpen, Trophy, Zap } from "lucide-react";
import type { QuestWithProgress } from "@/lib/types";

const icons: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  lessons: BookOpen,
  xp: Zap,
  time: Clock,
  exercise: Target,
  streak: Flame,
  unit: Trophy,
};

export function QuestPanel({ quests }: { quests: QuestWithProgress[] }) {
  const done = quests.filter((q) => q.completed).length;

  return (
    <div className="border-2 border-ink bg-purple-brand p-3.5 shadow-hard">
      <div className="mb-2.5 flex items-center justify-between">
        <h2 className="font-display text-[13px] uppercase tracking-tight">Misiones de hoy</h2>
        <span className="border-2 border-ink bg-cream px-1.5 py-0.5 text-[10px] font-extrabold tabular-nums">
          {done}/{quests.length}
        </span>
      </div>
      <div className="grid gap-2">
        {quests.map((q) => {
          const Icon = icons[q.type] ?? Target;
          const pct = Math.min(100, Math.round((q.progress / q.target) * 100));
          return (
            <div key={q.slug} className="border-2 border-ink bg-white px-2.5 py-2">
              <div className="flex items-center gap-2">
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center border-2 border-ink ${
                    q.completed ? "bg-yellow-brand" : "bg-cream-200"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={2.8} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-extrabold leading-tight">{q.name}</p>
                  <p className="truncate text-[10px] font-semibold text-ink/55">{q.description}</p>
                </div>
                <span className="shrink-0 text-[10px] font-extrabold uppercase">+{q.xpReward}</span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <div className="progress h-2 flex-1">
                  <span style={{ width: `${pct}%` }} />
                </div>
                <span className="w-9 text-right text-[10px] font-extrabold tabular-nums">
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
