"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Gem, Heart, Zap, Trophy, Compass, User, BookOpen } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Logo } from "./Logo";

const tabs = [
  { href: "/learn", label: "Aprender", icon: Compass },
  { href: "/courses", label: "Cursos", icon: BookOpen },
  { href: "/leagues", label: "Ligas", icon: Trophy },
  { href: "/profile", label: "Perfil", icon: User },
];

export function TopBar() {
  const { profile, mode } = useAuth();
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-40 border-b-2 border-ink bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-2 px-3 py-2.5 sm:gap-4 sm:px-4">
          <Logo compact />

          <nav className="ml-2 hidden items-center gap-1 sm:flex">
            {tabs.map((t) => {
              const active = pathname === t.href || pathname.startsWith(`${t.href}/`);
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className={`flex items-center gap-1.5 border-2 px-2.5 py-1.5 text-[12px] font-extrabold uppercase tracking-wide transition ${
                    active
                      ? "border-ink bg-purple-brand shadow-hard-sm"
                      : "border-transparent hover:border-ink hover:bg-white"
                  }`}
                >
                  <t.icon className="h-4 w-4" strokeWidth={2.6} />
                  {t.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1.5">
            <Stat icon={<Flame className="h-4 w-4" />} value={profile.streak} bg="var(--color-pink-brand)" />
            <Stat icon={<Gem className="h-4 w-4" />} value={profile.gems} bg="var(--color-purple-soft)" />
            <Stat icon={<Zap className="h-4 w-4" />} value={profile.totalXp} bg="var(--color-yellow-brand)" />
            <Stat
              icon={<Heart className="h-4 w-4" />}
              value={profile.isPro ? "∞" : profile.hearts}
              bg="var(--color-mint-brand)"
            />
          </div>
        </div>

        {mode === "demo" && (
          <div className="border-t-2 border-ink bg-yellow-brand">
            <div className="mx-auto max-w-5xl px-3 py-0.5 text-center text-[10px] font-extrabold uppercase tracking-wide">
              Modo demo · progreso guardado en este navegador
            </div>
          </div>
        )}
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-ink bg-cream pb-[env(safe-area-inset-bottom)] sm:hidden">
        <div className="mx-auto flex max-w-md items-stretch justify-around">
          {tabs.map((t) => {
            const active = pathname === t.href || pathname.startsWith(`${t.href}/`);
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`flex flex-1 flex-col items-center gap-0.5 border-r-2 border-ink py-2 text-[10px] font-extrabold uppercase last:border-r-0 ${
                  active ? "bg-yellow-brand" : "bg-cream"
                }`}
              >
                <t.icon className="h-5 w-5" strokeWidth={2.6} />
                {t.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

function Stat({
  icon,
  value,
  bg,
}: {
  icon: React.ReactNode;
  value: number | string;
  bg: string;
}) {
  return (
    <span
      className="flex items-center gap-1 border-2 border-ink px-1.5 py-1 text-[12px] font-extrabold tabular-nums"
      style={{ background: bg }}
    >
      {icon}
      <span>{value}</span>
    </span>
  );
}
