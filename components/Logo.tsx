import Link from "next/link";

export function Logo({ compact = false, href = "/learn" }: { compact?: boolean; href?: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-stretch border-2 border-ink bg-yellow-brand shadow-hard-sm transition-transform hover:-translate-y-0.5"
      aria-label="LEVELUP, ir al inicio"
    >
      <span className="px-3 py-1.5 font-display text-[19px] font-black uppercase leading-none tracking-tight text-ink">
        LEVELUP
      </span>
      {!compact && (
        <span className="grid w-8 place-items-center border-l-2 border-ink bg-cream">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#0b0b0b" strokeWidth="3" strokeLinecap="square">
            <path d="M7 17L17 7" />
            <path d="M9 7h8v8" />
          </svg>
        </span>
      )}
    </Link>
  );
}
