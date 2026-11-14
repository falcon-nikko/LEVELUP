'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * SUBE — the LEVELUP mascot.
 *
 * A yellow step-creature with the brand arrow growing out of its head: it is
 * literally one of the staircase blocks from the wordmark, alive. Drawn as
 * inline SVG geometry (no emoji, no illustration asset, no AI-photo stand-in)
 * so it inherits the palette and scales without a raster.
 *
 * Motion rule: every mood fires ONE bounded animation when it appears or when
 * `animateKey` changes. Nothing loops — an infinite idle wiggle is decoration,
 * and decoration is banned by the design system.
 */
export type MascotMood = 'idle' | 'cheer' | 'wrong' | 'think' | 'boost' | 'sleep';

const C = {
  body: '#FFC800',
  bodyDark: '#E5A800',
  belly: '#FFF4CC',
  cheek: '#FF9600',
  ink: '#042C60',
  arrow: '#58CC02',
  arrowDark: '#58A700',
  step: '#58CC02',
  stepDark: '#58A700',
  sweat: '#1CB0F6',
};

const MOOD_TRANSITION: Record<MascotMood, Record<string, unknown> | null> = {
  idle: null,
  cheer: { y: [0, -9, 0, -3, 0], rotate: [0, -4, 0, 3, 0], duration: 0.72, ease: 'easeOut' },
  wrong: { x: [0, -4, 4, -3, 3, 0], rotate: [0, -3, 3, -2, 0], duration: 0.5, ease: 'easeOut' },
  think: { rotate: [0, -6, -6, 0], duration: 0.85, ease: 'easeInOut' },
  boost: { scale: [1, 1.11, 0.98, 1], duration: 0.55, ease: 'easeOut' },
  sleep: null,
};

export function Mascot({
  mood = 'idle',
  size = 64,
  className,
  withStep = false,
  animateKey,
  label,
}: {
  mood?: MascotMood;
  /** Rendered width/height in px. */
  size?: number;
  className?: string;
  /** Draw the green step the creature stands on (use for standalone spots). */
  withStep?: boolean;
  /** Change this to replay the mood animation (exercise id, hearts count…). */
  animateKey?: string | number;
  label?: string;
}) {
  const transition = MOOD_TRANSITION[mood];
  const armsUp = mood === 'cheer' || mood === 'boost';
  const eyesClosed = mood === 'sleep' || mood === 'wrong';
  const starEyes = mood === 'boost';

  return (
    <motion.span
      key={animateKey}
      initial={transition ? { opacity: 0, scale: 0.86 } : { opacity: 0 }}
      animate={
        transition
          ? { opacity: 1, scale: 1, ...transition }
          : { opacity: 1, scale: 1 }
      }
      transition={
        transition
          ? { default: { duration: 0.24, ease: 'easeOut' }, ...transition }
          : { duration: 0.24, ease: 'easeOut' }
      }
      className={cn('inline-flex shrink-0 select-none', className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={label ?? undefined}
      aria-hidden={label ? undefined : true}
    >
      <svg viewBox="0 0 96 96" width={size} height={size} fill="none">
        {withStep && (
          <>
            <rect x="12" y="82" width="72" height="11" rx="5.5" fill={C.step} />
            <rect x="12" y="88" width="72" height="5" rx="2.5" fill={C.stepDark} />
          </>
        )}

        {/* feet */}
        <ellipse cx="37" cy="78" rx="9" ry="5.5" fill={C.bodyDark} />
        <ellipse cx="59" cy="78" rx="9" ry="5.5" fill={C.bodyDark} />

        {/* arms — one stroke each, round caps, behind the body */}
        {armsUp ? (
          <>
            <path
              d="M25 44C17 40 13 32 15 24"
              stroke={C.bodyDark}
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M71 44C79 40 83 32 81 24"
              stroke={C.bodyDark}
              strokeWidth="7"
              strokeLinecap="round"
            />
            <circle cx="15" cy="23" r="5" fill={C.body} />
            <circle cx="81" cy="23" r="5" fill={C.body} />
          </>
        ) : (
          <>
            <path
              d="M24 52C17 55 14 61 15 67"
              stroke={C.bodyDark}
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M72 52C79 55 82 61 81 67"
              stroke={C.bodyDark}
              strokeWidth="7"
              strokeLinecap="round"
            />
            <circle cx="15" cy="68" r="5" fill={C.body} />
            <circle cx="81" cy="68" r="5" fill={C.body} />
          </>
        )}

        {/* body */}
        <rect x="21" y="22" width="54" height="56" rx="24" fill={C.body} />
        <ellipse cx="48" cy="60" rx="18" ry="14.5" fill={C.belly} />

        {/* brand arrow tuft */}
        <path d="M48 4 59 19H37z" fill={C.arrow} />
        <path d="M48 4 59 19h-5.5L48 11.2z" fill={C.arrowDark} opacity="0.55" />

        {/* cheeks */}
        <ellipse cx="29" cy="50" rx="5" ry="3.4" fill={C.cheek} opacity="0.5" />
        <ellipse cx="67" cy="50" rx="5" ry="3.4" fill={C.cheek} opacity="0.5" />

        {/* eyes */}
        {starEyes ? (
          <>
            <path d="M38 33.5 40.4 39l5.6 2-5.6 2-2.4 5.5L35.6 43 30 41l5.6-2z" fill={C.ink} />
            <path d="M58 33.5 60.4 39l5.6 2-5.6 2-2.4 5.5L55.6 43 50 41l5.6-2z" fill={C.ink} />
          </>
        ) : eyesClosed ? (
          <>
            <rect x="33" y="41" width="11" height="3.2" rx="1.6" fill={C.ink} />
            <rect x="52" y="41" width="11" height="3.2" rx="1.6" fill={C.ink} />
            {mood === 'wrong' && (
              <>
                <path d="M33 36.5 42 39.5" stroke={C.ink} strokeWidth="2.6" strokeLinecap="round" />
                <path d="M63 36.5 54 39.5" stroke={C.ink} strokeWidth="2.6" strokeLinecap="round" />
              </>
            )}
            {mood === 'sleep' && (
              <path
                d="M69 22h7l-7 8h7"
                stroke={C.bodyDark}
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </>
        ) : mood === 'cheer' ? (
          <>
            <path
              d="M33.5 45.5C35.5 38.5 41.5 38.5 43.5 45.5"
              stroke={C.ink}
              strokeWidth="3.4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M52.5 45.5C54.5 38.5 60.5 38.5 62.5 45.5"
              stroke={C.ink}
              strokeWidth="3.4"
              strokeLinecap="round"
              fill="none"
            />
          </>
        ) : (
          <>
            <ellipse cx="38.5" cy="42" rx="5.4" ry="7" fill={C.ink} />
            <ellipse cx="57.5" cy="42" rx="5.4" ry="7" fill={C.ink} />
            <circle cx="36.6" cy="39.2" r="1.9" fill="#FFFFFF" />
            <circle cx="55.6" cy="39.2" r="1.9" fill="#FFFFFF" />
            {mood === 'think' && (
              <path
                d="M33 33.5 42 35.5"
                stroke={C.ink}
                strokeWidth="2.6"
                strokeLinecap="round"
              />
            )}
          </>
        )}

        {/* mouth */}
        {mood === 'cheer' || mood === 'boost' ? (
          <path d="M41.5 52.5C44 60 52 60 54.5 52.5z" fill={C.ink} />
        ) : mood === 'wrong' ? (
          <path
            d="M43.5 57.5C46 53.5 50 53.5 52.5 57.5"
            stroke={C.ink}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        ) : mood === 'think' ? (
          <ellipse cx="48" cy="55" rx="3.1" ry="3.6" fill={C.ink} />
        ) : mood === 'sleep' ? (
          <path d="M44 55.5h8" stroke={C.ink} strokeWidth="3" strokeLinecap="round" />
        ) : (
          <path
            d="M43.5 53C45.5 56.5 50.5 56.5 52.5 53"
            stroke={C.ink}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* sweat drop only on a miss — feedback, not decoration */}
        {mood === 'wrong' && (
          <path d="M74 30c2.6 3.4 4 5.6 4 7.4a4 4 0 1 1-8 0c0-1.8 1.4-4 4-7.4z" fill={C.sweat} />
        )}
      </svg>
    </motion.span>
  );
}
