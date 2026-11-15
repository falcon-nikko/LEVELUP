"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Award,
  Flame,
  Gem,
  Heart,
  LogOut,
  Target,
  Zap,
  BookOpen,
  CreditCard,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { curriculumStats } from "@/content/curriculum";
import { daysToNextFreeze, leagueWindow } from "@/lib/progress";
import { achievements, tierColor } from "@/lib/achievements";

export default function ProfilePage() {
  const { profile, mode, signOut } = useAuth();
  const router = useRouter();

  const done = profile.completedLessonSlugs.length;
  const pct = Math.round((done / curriculumStats.lessons) * 100);
  const legendary = profile.legendarySlugs.length;
  const win = leagueWindow();

  const level = Math.floor(profile.totalXp / 250) + 1;
  const intoLevel = profile.totalXp % 250;

  return (
    <div className="mx-auto max-w-2xl">
      <header className="border-2 border-ink bg-white p-4 shadow-hard sm:p-5">
        <div className="flex items-center gap-3.5">
          <span
            className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-ink font-display text-xl"
            style={{ background: `hsl(${profile.avatarHue} 80% 76%)` }}
          >
            {profile.displayName.slice(0, 1).toUpperCase()}
          </span>
          <div className="min-w-0">
            <h1 className="truncate font-display text-[20px] uppercase leading-none tracking-tight">
              {profile.displayName}
            </h1>
            <p className="mt-1 truncate text-[11.5px] font-semibold text-ink/55">
              {profile.email ?? "Sesión local"} · {mode === "demo" ? "modo demo" : "cuenta LEVELUP"}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="chip chip-mint">Nivel {level}</span>
              <span className="chip chip-yellow">
                <Flame className="h-3 w-3" strokeWidth={3} /> {profile.streak} días
              </span>
              {profile.isPro && <span className="chip chip-purple">PRO</span>}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-[10px] font-extrabold uppercase">
            <span>Nivel {level}</span>
            <span className="tabular-nums">{intoLevel}/250 XP para nivel {level + 1}</span>
          </div>
          <div className="progress mt-1.5">
            <span style={{ width: `${(intoLevel / 250) * 100}%` }} />
          </div>
        </div>
      </header>

      <section className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        <Metric icon={<Zap className="h-4 w-4" strokeWidth={2.8} />} value={profile.totalXp} label="XP total" bg="var(--color-yellow-brand)" />
        <Metric icon={<Flame className="h-4 w-4" strokeWidth={2.8} />} value={profile.longestStreak} label="mejor racha" bg="var(--color-pink-brand)" />
        <Metric icon={<Gem className="h-4 w-4" strokeWidth={2.8} />} value={profile.gems} label="gemas" bg="var(--color-purple-brand)" />
        <Metric icon={<Heart className="h-4 w-4" strokeWidth={2.8} />} value={profile.streakFreezes} label="congeladores" bg="var(--color-mint-brand)" />
      </section>

      <section className="mt-4 border-2 border-ink bg-white p-4 shadow-hard-sm">
        <h2 className="flex items-center gap-1.5 font-display text-[13px] uppercase tracking-tight">
          <Target className="h-4 w-4" strokeWidth={2.8} /> Progreso del currículo
        </h2>
        <div className="mt-3 flex items-center gap-4">
          <div className="relative grid h-20 w-20 shrink-0 place-items-center">
            <svg viewBox="0 0 36 36" className="h-20 w-20 -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e5dcc6" strokeWidth="4" />
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                stroke="#0b0b0b"
                strokeWidth="4"
                strokeLinecap="butt"
                strokeDasharray={`${(pct / 100) * 97.4} 97.4`}
              />
            </svg>
            <span className="absolute font-display text-[14px]">{pct}%</span>
          </div>
          <div className="min-w-0 flex-1 text-[12.5px] font-medium leading-relaxed">
            <p>
              <b className="font-extrabold">{done}</b> de {curriculumStats.lessons} lecciones completadas.
            </p>
            <p>
              <b className="font-extrabold">{legendary}</b> legendarias (100% de acierto).
            </p>
            <p>
              <b className="font-extrabold">{profile.minutesPracticed}</b> minutos practicados.
            </p>
            <p className="mt-1 text-ink/50">
              Próximo congelador de racha en {daysToNextFreeze(profile.streak)} días.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-4 border-2 border-ink bg-white p-4 shadow-hard-sm">
        <h2 className="flex items-center gap-1.5 font-display text-[13px] uppercase tracking-tight">
          <Award className="h-4 w-4" strokeWidth={2.8} /> Logros
        </h2>
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
          {achievements.slice(0, 18).map((a) => {
            const unlocked =
              (a.slug === "first_lesson" && done >= 1) ||
              (a.slug === "lessons_10" && done >= 10) ||
              (a.slug === "xp_100" && profile.totalXp >= 100) ||
              (a.slug === "xp_1000" && profile.totalXp >= 1000) ||
              (a.slug === "streak_3" && profile.longestStreak >= 3) ||
              (a.slug === "streak_7" && profile.longestStreak >= 7);
            return (
              <div
                key={a.slug}
                title={`${a.name}: ${a.description}`}
                className={`flex aspect-square flex-col items-center justify-center gap-1 border-2 border-ink px-1 text-center ${
                  unlocked ? "bg-yellow-brand" : "bg-cream-200 opacity-55"
                }`}
              >
                <span className="text-lg leading-none">{a.emoji}</span>
                <span className="line-clamp-2 text-[8px] font-extrabold uppercase leading-tight">
                  {a.name}
                </span>
              </div>
            );
          })}
        </div>
        <p className="mt-2.5 text-[10.5px] font-semibold text-ink/50">
          {achievements.filter((a) => tierColor(a.tier)).length} logros definidos en el catálogo · los
          bloqueados se desbloquean con progreso real.
        </p>
      </section>

      <section className="mt-4 border-2 border-ink bg-white p-4 shadow-hard-sm">
        <h2 className="flex items-center gap-1.5 font-display text-[13px] uppercase tracking-tight">
          <CreditCard className="h-4 w-4" strokeWidth={2.8} /> Plan
        </h2>
        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-3 border-2 border-ink bg-cream-200 p-3">
          <div>
            <p className="text-[13px] font-extrabold uppercase">
              {profile.isPro ? "LEVELUP PRO" : "Plan gratuito"}
            </p>
            <p className="text-[11.5px] font-semibold text-ink/60">
              {profile.isPro
                ? "Corazones ilimitados y cursos premium."
                : "12,99 €/mes o 79 €/año · cancela cuando quieras"}
            </p>
          </div>
          {!profile.isPro && (
            <Link href="/pro" className="btn btn-primary px-4 py-2.5 text-[12px]">
              <Sparkles className="h-4 w-4" strokeWidth={2.8} /> Ver PRO
            </Link>
          )}
        </div>
      </section>

      <section className="mt-4 grid gap-2">
        <Link href="/courses" className="btn btn-ghost justify-start px-4 py-3 text-[13px]">
          <BookOpen className="h-4 w-4" strokeWidth={2.8} /> Explorar los {curriculumStats.courses} cursos
        </Link>
        {mode !== "demo" && (
          <button
            onClick={async () => {
              await signOut();
              router.push("/signin");
            }}
            className="btn btn-ghost justify-start px-4 py-3 text-[13px]"
          >
            <LogOut className="h-4 w-4" strokeWidth={2.8} /> Cerrar sesión
          </button>
        )}
      </section>

      <p className="mt-4 text-center text-[10px] font-extrabold uppercase text-ink/40">
        Semana {win.weekKey} · reinicio en {Math.floor(win.secondsLeft / 86400)}d
      </p>
    </div>
  );
}

function Metric({
  icon,
  value,
  label,
  bg,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  bg: string;
}) {
  return (
    <div className="border-2 border-ink px-2 py-2 text-center shadow-hard-sm" style={{ background: bg }}>
      <p className="flex items-center justify-center gap-1 text-[15px] font-extrabold tabular-nums">
        {icon}
        {value}
      </p>
      <p className="text-[9px] font-extrabold uppercase tracking-wide">{label}</p>
    </div>
  );
}
