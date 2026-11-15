import Link from "next/link";
import { ArrowRight, Flame, Bot, TrendingUp, Briefcase, Code2, Check } from "lucide-react";
import { curriculumStats, worlds } from "@/content/curriculum";
import { Logo } from "@/components/Logo";

const iconFor = {
  programming: Code2,
  business: Briefcase,
  ai: Bot,
  finance: TrendingUp,
} as const;

export default function Landing() {
  return (
    <div className="min-h-dvh">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Logo />
        <div className="flex items-center gap-2">
          <Link href="/signin" className="btn btn-ghost px-4 py-2 text-sm">
            Entrar
          </Link>
          <Link href="/learn" className="btn btn-primary px-4 py-2 text-sm">
            Empezar gratis
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4">
        <section className="grid items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div>
            <span className="chip mb-5 border-brand-400/30 bg-brand-500/10 text-brand-300">
              <Flame className="h-3.5 w-3.5" /> 5 minutos al día · sin humo
            </span>
            <h1 className="text-[2.5rem] font-black leading-[1.05] tracking-tight sm:text-6xl">
              Aprende lo que
              <br />
              <span className="grad-text">se paga.</span>
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/65">
              Programación, IA, dropshipping, agencia y finanzas en lecciones de 5 minutos con retos
              reales. La misma mecánica que te engancha a Duolingo, aplicada a habilidades que
              aparecen en una factura.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/learn" className="btn btn-primary px-6 py-3.5 text-[15px]">
                Empezar la primera lección <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/signin" className="btn btn-ghost px-5 py-3.5 text-[15px]">
                Ya tengo cuenta
              </Link>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              {[
                { k: curriculumStats.lessons, l: "lecciones" },
                { k: curriculumStats.exercises, l: "ejercicios" },
                { k: `${Math.round(curriculumStats.minutes / 60)}h`, l: "de contenido" },
              ].map((s) => (
                <div key={s.l} className="card-tight px-3 py-3 text-center">
                  <dt className="text-2xl font-black tabular-nums">{s.k}</dt>
                  <dd className="text-[11px] font-bold uppercase tracking-wider text-white/45">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="card p-4 shadow-2xl">
              <div className="mb-3 flex items-center justify-between text-[11px] font-bold text-white/45">
                <span>RUTA RECOMENDADA</span>
                <span className="chip border-brand-400/30 bg-brand-500/10 text-brand-300">Nivel 1</span>
              </div>
              <div className="grid gap-2.5">
                {[
                  { t: "Misión 1: elige un nicho en 20 minutos", x: "+30 XP", done: true },
                  { t: "Misión 2: tu oferta en una frase", x: "+30 XP", done: true },
                  { t: "Misión 3: define tu número", x: "+25 XP", done: false, now: true },
                  { t: "Margen real: la regla 3x", x: "+20 XP", done: false },
                ].map((l) => (
                  <div
                    key={l.t}
                    className={`flex items-center gap-3 rounded-xl border px-3 py-3 ${
                      l.now
                        ? "border-brand-400/50 bg-brand-500/10"
                        : l.done
                          ? "border-white/8 bg-white/[0.03]"
                          : "border-white/8 bg-white/[0.02] opacity-70"
                    }`}
                  >
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-black ${
                        l.done ? "bg-brand-500 text-ink-950" : l.now ? "bg-brand-500/25 text-brand-300" : "bg-white/8 text-white/40"
                      }`}
                    >
                      {l.done ? <Check className="h-4 w-4" strokeWidth={3} /> : "•"}
                    </span>
                    <span className="flex-1 text-[13.5px] font-semibold leading-snug">{l.t}</span>
                    <span className="text-[11px] font-bold text-brand-400/80">{l.x}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2.5 text-[12px]">
                <span className="flex items-center gap-1.5 font-bold text-orange-300">
                  <Flame className="h-4 w-4" /> 6 días de racha
                </span>
                <span className="font-bold text-white/50">Meta diaria 1/3</span>
              </div>
            </div>
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-brand-500/10 blur-3xl" />
          </div>
        </section>

        <section className="py-10">
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Cuatro mundos, una ruta</h2>
          <p className="mt-2 max-w-2xl text-white/60">
            Empiezas por Negocios (vender algo esta semana) y avanzas hacia la habilidad que más
            margen te dé después.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {worlds.map((w) => {
              const Icon = iconFor[w.slug];
              return (
                <div key={w.slug} className="card p-4">
                  <span
                    className="mb-3 grid h-10 w-10 place-items-center rounded-xl"
                    style={{ background: `${w.color}22`, border: `1px solid ${w.color}44` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: w.color }} />
                  </span>
                  <h3 className="text-[15px] font-extrabold">{w.name}</h3>
                  <p className="mt-1 text-[13px] leading-snug text-white/55">{w.tagline}</p>
                  <p className="mt-2 text-[12px] leading-snug text-white/35">{w.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-10">
          <div className="card p-6 sm:p-8">
            <h2 className="text-2xl font-black tracking-tight">Lo que LEVELUP no hace</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["No promete ingresos", "Enseñamos el mecanismo y el número, no el milagro."],
                ["No vende cursos de 2.000 €", "Microlecciones y una suscripción honesta de 12,99 €."],
                ["No rellena con teoría", "Cada lección termina en una acción ejecutable hoy."],
              ].map(([t, d]) => (
                <div key={t} className="card-tight p-4">
                  <h3 className="text-sm font-extrabold text-brand-300">{t}</h3>
                  <p className="mt-1.5 text-[13px] leading-snug text-white/60">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 text-center">
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Tu primer paso son 5 minutos</h2>
          <Link href="/learn" className="btn btn-primary mx-auto mt-5 px-7 py-3.5 text-[15px]">
            Empezar ahora <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-3 text-[12px] text-white/35">Sin tarjeta. Sin registro para probar.</p>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl border-t border-white/5 px-4 py-8 text-[12px] text-white/35">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} LEVELUP · Educación práctica en español</span>
          <span>Contenido educativo. Nada de esto es asesoramiento financiero.</span>
        </div>
      </footer>
    </div>
  );
}
