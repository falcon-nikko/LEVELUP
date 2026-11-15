"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Award, Flame, Gem, Heart, LogOut, Target, Zap, BookOpen, CreditCard, Sparkles } from "lucide-react";
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
      <header className="card relative overflow-hidden p-5">
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-violet-brand/20 blur-3xl" />
        <div className="relative flex items-center gap-4">
          <span
            className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-xl font-black text-white shadow-lg"
            style={{
              background: `linear-gradient(140deg, hsl(${profile.avatarHue} 70% 55%), hsl(${(profile.avatarHue + 50) % 360} 70% 38%))`,
            }}
          >
            {profile.displayName.slice(0, 1).toUpperCase()}
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-black tracking-tight">{profile.displayName}</h1>
            <p className="text-[12.5px] text-white/45">
              {profile.email ?? "Sesión local"} · {mode === "demo" ? "modo demo" : "cuenta LEVELUP"}
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <span className="chip border-brand-400/30 bg-brand-500/10 text-brand-300">Nivel {level}</span>
              <span className="chip border-orange-400/30 bg-orange-400/10 text-orange-300">
                <Flame className="h-3 w-3" /> {profile.streak} días
              </span>
              {profile.isPro && <span className="chip border-amber-300/40 bg-amber-300/15 text-amber-200">PRO</span>}
            </div>
          </div>
        </div>

        <div className="relative mt-4">
          <div className="flex items-center justify-between text-[11px] font-bold text-white/40">
            <span>Nivel {level}</span>
            <span>
              {intoLevel}/250 XP para nivel {level + 1}
            </span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/8">
            <div className="h-full rounded-full bg-gradient-to-r from-violet-brand to-brand-400" style={{ width: `${(intoLevel / 250) * 100}%` }} />
          </div>
        </div>
      </header>

      <section className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        <Metric icon={<Zap className="h-4 w-4 text-brand-400" />} value={profile.totalXp} label="XP total" />
        <Metric icon={<Flame className="h-4 w-4 text-orange-400" />} value={profile.longestStreak} label="mejor racha" />
        <Metric icon={<Gem className="h-4 w-4 text-sky-400" />} value={profile.gems} label="gemas" />
        <Metric icon={<Heart className="h-4 w-4 text-rose-400" />} value={profile.streakFreezes} label="congeladores" />
      </section>

      <section className="card mt-4 p-4">
        <h2 className="flex items-center gap-1.5 text-sm font-extrabold">
          <Target className="h-4 w-4 text-brand-400" /> Progreso del currículo
        </h2>
        <div className="mt-3 flex items-center gap-4">
          <div className="relative grid h-20 w-20 shrink-0 place-items-center">
            <svg viewBox="0 0 36 36" className="h-20 w-20 -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="3.5" />
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                stroke="url(#g)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={`${(pct / 100) * 97.4} 97.4`}
              />
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#a5f3c6" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute text-[15px] font-black">{pct}%</span>
          </div>
          <div className="min-w-0 flex-1 text-[12.5px] leading-relaxed text-white/55">
            <p>
              <b className="text-white/85">{done}</b> de {curriculumStats.lessons} lecciones completadas.
            </p>
            <p>
              <b className="text-amber-200">{legendary}</b> legendarias (100% de acierto).
            </p>
            <p>
              <b className="text-white/85">{profile.minutesPracticed}</b> minutos practicados.
            </p>
            <p className="mt-1 text-white/35">
              Próximo congelador de racha en {daysToNextFreeze(profile.streak)} días.
            </p>
          </div>
        </div>
      </section>

      <section className="card mt-4 p-4">
        <h2 className="flex items-center gap-1.5 text-sm font-extrabold">
          <Award className="h-4 w-4 text-amber-300" /> Logros
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
                className={`flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border px-1 text-center ${
                  unlocked ? "border-white/15 bg-white/[0.07]" : "border-white/8 bg-white/[0.02] opacity-40"
                }`}
              >
                <span className="text-lg leading-none">{a.emoji}</span>
                <span className="line-clamp-2 text-[8.5px] font-bold uppercase leading-tight text-white/60">{a.name}</span>
              </div>
            );
          })}
        </div>
        <p className="mt-2.5 text-[11px] text-white/30">
          {achievements.filter((a) => tierColor(a.tier)).length} logros definidos en el catálogo · los bloqueados se
          desbloquean con progreso real.
        </p>
      </section>

      <section className="card mt-4 p-4">
        <h2 className="flex items-center gap-1.5 text-sm font-extrabold">
          <CreditCard className="h-4 w-4 text-brand-400" /> Plan
        </h2>
        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
          <div>
            <p className="text-[13.5px] font-extrabold">{profile.isPro ? "LEVELUP PRO" : "Plan gratuito"}</p>
            <p className="text-[11.5px] text-white/45">
              {profile.isPro ? "Corazones ilimitados y cursos premium." : "12,99 €/mes o 79 €/año · cancela cuando quieras"}
            </p>
          </div>
          {!profile.isPro && (
            <Link href="/pro" className="btn btn-primary px-4 py-2.5 text-[13px]">
              <Sparkles className="h-4 w-4" /> Ver PRO
            </Link>
          )}
        </div>
      </section>

      <section className="mt-4 grid gap-2">
        <Link href="/courses" className="btn btn-ghost justify-start px-4 py-3 text-[13.5px]">
          <BookOpen className="h-4 w-4" /> Explorar los {curriculumStats.courses} cursos
        </Link>
        {mode !== "demo" && (
          <button
            onClick={async () => {
              await signOut();
              router.push("/signin");
            }}
            className="btn btn-ghost justify-start px-4 py-3 text-[13.5px] text-rose-300"
          >
            <LogOut className="h-4 w-4" /> Cerrar sesión
          </button>
        )}
      </section>

      <p className="mt-4 text-center text-[10.5px] text-white/25">
        Semana {win.weekKey} · reinicio en {Math.floor(win.secondsLeft / 86400)}d
      </p>
    </div>
  );
}

function Metric({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="card-tight px-2.5 py-2.5 text-center">
      <p className="flex items-center justify-center gap-1 text-[15px] font-black tabular-nums">
        {icon}
        {value}
      </p>
      <p className="text-[9.5px] font-bold uppercase tracking-wider text-white/40">{label}</p>
    </div>
  );
}
