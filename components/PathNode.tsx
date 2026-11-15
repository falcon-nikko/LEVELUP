"use client";

import Link from "next/link";
import { Check, Lock, Star, Play } from "lucide-react";

type Props = {
  id: string;
  title: string;
  index: number;
  state: "done" | "current" | "locked" | "legendary";
  xp: number;
  courseColor: string;
  isNext: boolean;
};

const offsets = [0, 34, 58, 34, 0, -34, -58, -34];

export function PathNode({ id, title, index, state, xp, courseColor, isNext }: Props) {
  const offset = offsets[index % 8];
  const locked = state === "locked";

  const inner = (
    <div
      className="group relative flex flex-col items-center"
      style={{ transform: `translateX(${offset}px)` }}
    >
      <span
        className={`relative grid h-[66px] w-[66px] place-items-center rounded-full border-2 border-ink transition ${
          state === "done"
            ? "bg-mint-brand shadow-hard-sm"
            : isNext
              ? "bg-yellow-brand shadow-hard"
              : locked
                ? "bg-cream-200 text-ink/30"
                : "bg-white shadow-hard-sm"
        }`}
        style={isNext ? { boxShadow: `5px 5px 0 0 #0b0b0b, 0 0 0 5px ${courseColor}55` } : undefined}
      >
        {state === "done" ? (
          <Check className="h-7 w-7" strokeWidth={4} />
        ) : state === "legendary" ? (
          <Star className="h-6 w-6 fill-ink" strokeWidth={2.6} />
        ) : locked ? (
          <Lock className="h-5 w-5" strokeWidth={2.8} />
        ) : (
          <Play className="h-6 w-6 fill-ink" strokeWidth={0} />
        )}
        {isNext && (
          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap border-2 border-ink bg-ink px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-cream">
            Empezar
          </span>
        )}
      </span>
      <span
        className={`mt-2 max-w-[140px] rounded px-1 text-center text-[11.5px] font-bold leading-tight ${
          locked ? "text-ink/35" : "text-ink"
        }`}
      >
        {title}
      </span>
      {!locked && (
        <span className="mt-0.5 text-[10px] font-extrabold uppercase text-ink/50">+{xp} XP</span>
      )}
    </div>
  );

  if (locked) return <div className="cursor-not-allowed">{inner}</div>;
  return (
    <Link
      href={`/learn/${id}`}
      className="block transition-transform hover:-translate-y-0.5"
      aria-label={`Lección: ${title}`}
    >
      {inner}
    </Link>
  );
}
