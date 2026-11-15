"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Gem, Heart, Zap, Trophy, Compass, User } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Logo } from "./Logo";

const tabs = [
  { href: "/learn", label: "Aprender", icon: Compass },
  { href: "/leagues", label: "Ligas", icon: Trophy },
  { href: "/profile", label: "Perfil", icon: User },
];

export function TopBar() {
  const { profile, mode } = useAuth();
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center gap-2 px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3">
          <Logo />

          <nav className="ml-2 hidden items-center gap-1 sm:flex">
            {tabs.map((t) => {
              const active = pathname === t.href || pathname.startsWith(`${t.href}/`);
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold transition ${
                    active ? "bg-white/10 text-white" : "text-white/55 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <t.icon className="h-4 w-4" />
                  {t.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2.5 sm:gap-3.5">
            <Stat icon={<Flame className="h-4 w-4 text-orange-400" />} value={profile.streak} />
            <Stat icon={<Gem className="h-4 w-4 text-sky-400" />} value={profile.gems} />
            <Stat icon={<Zap className="h-4 w-4 text-brand-400" />} value={profile.totalXp} />
            <Stat icon={<Heart className="h-4 w-4 text-rose-400" />} value={profile.isPro ? "∞" : profile.hearts} />
          </div>
        </div>

        {mode === "demo" && (
          <div className="border-t border-amber-400/20 bg-amber-400/[0.08]">
            <div className="mx-auto max-w-5xl px-4 py-1 text-center text-[10.5px] font-semibold tracking-wide text-amber-200/80">
              MODO DEMO · progreso guardado en este navegador
            </div>
          </div>
        )}
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl sm:hidden">
        <div className="mx-auto flex max-w-md items-stretch justify-around">
          {tabs.map((t) => {
            const active = pathname === t.href || pathname.startsWith(`${t.href}/`);
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-bold ${
                  active ? "text-brand-400" : "text-white/45"
                }`}
              >
                <t.icon className="h-5 w-5" />
                {t.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

function Stat({ icon, value }: { icon: React.ReactNode; value: number | string }) {
  return (
    <span className="flex items-center gap-1 text-[13px] font-extrabold tabular-nums text-white/90">
      {icon}
      <span>{value}</span>
    </span>
  );
}
