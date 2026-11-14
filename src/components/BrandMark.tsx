import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Custom LEVELUP brand mark: an ascending staircase inside a pressable green tile.
 * Drawn as inline SVG geometry — no letters-in-a-div, no generic monogram.
 */
export function BrandMark({
  className,
  size = 'md',
  withLabel = false,
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  withLabel?: boolean;
}) {
  const dims = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  const radius = size === 'sm' ? 'rounded-xl' : 'rounded-2xl';

  return (
    <span className={cn('inline-flex items-center gap-2.5 select-none', className)}>
      <span
        aria-hidden="true"
        className={cn(
          dims,
          radius,
          'lip lip-ecto flex items-center justify-center bg-ecto text-paper'
        )}
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-[62%] w-[62%]">
          <path
            d="M4 19.2h5.2v-4.4h4.4v-4.4h4.4V6"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.4 4.2 20 6l-4.6 1.8z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {withLabel && (
        <span className="text-[17px] font-extrabold uppercase tracking-[0.14em] text-navy">
          Level<span className="text-ecto">up</span>
        </span>
      )}
    </span>
  );
}
