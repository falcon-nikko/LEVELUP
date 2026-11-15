import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/learn" className="flex items-center gap-2.5" aria-label="LEVELUP, ir al inicio">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-b from-brand-400 to-brand-600 shadow-[0_8px_24px_-10px_rgba(34,197,94,0.9)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#05130a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 17l5-6 3.5 3.5L19 6" />
          <path d="M14 6h5v5" />
        </svg>
      </span>
      {!compact && (
        <span className="text-[17px] font-black tracking-tight">
          LEVEL<span className="grad-text">UP</span>
        </span>
      )}
    </Link>
  );
}
