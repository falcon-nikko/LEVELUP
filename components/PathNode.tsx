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

export function PathNode({ id, title, index, state, xp, courseColor, isNext }: Props) {
  const offset = [0, 34, 58, 34, 0, -34, -58, -34][index % 8];

  const locked = state === "locked";

  const inner = (
    <div className="group relative flex flex-col items-center" style={{ transform: `translateX(${offset}px)` }}>
      <span
        className={`relative grid h-[68px] w-[68px] place-items-center rounded-full border-2 transition ${
          state === "done"
            ? "border-brand-300/60 bg-gradient-to-b from-brand-400 to-brand-600 shadow-[0_10px_26px_-10px_rgba(34,197,94,0.8)]"
            : isNext
              ? "border-brand-300 bg-ink-850 shadow-[0_0_0_6px_rgba(34,197,94,0.14)]"
              : locked
                ? "border-white/10 bg-ink-850/80"
                : "border-white/20 bg-ink-850"
        }`}
        style={
          isNext
            ? { boxShadow: `0 0 0 6px ${courseColor}22, 0 10px 30px -12px ${courseColor}` }
            : undefined
        }
      >
        {state === "done" ? (
          <Check className="h-7 w-7 text-ink-950" strokeWidth={3.2} />
        ) : state === "legendary" ? (
          <Star className="h-6 w-6 text-ink-950" strokeWidth={2.6} />
        ) : locked ? (
          <Lock className="h-5 w-5 text-white/25" />
        ) : (
          <Play className="h-6 w-6 fill-brand-300 text-brand-300" />
        )}
        {isNext && (
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-400 px-2 py-0.5 text-[9.5px] font-black uppercase tracking-wide text-ink-950">
            Empezar
          </span>
        )}
      </span>
      <span
        className={`mt-2 max-w-[150px] text-center text-[11.5px] font-bold leading-tight ${
          locked ? "text-white/30" : "text-white/80"
        }`}
      >
        {title}
      </span>
      {!locked && <span className="mt-0.5 text-[10px] font-bold text-brand-400/70">+{xp} XP</span>}
    </div>
  );

  if (locked) return <div className="cursor-not-allowed opacity-90">{inner}</div>;
  return (
    <Link href={`/learn/${id}`} className="block transition hover:scale-[1.03]" aria-label={`Lección: ${title}`}>
      {inner}
    </Link>
  );
}
