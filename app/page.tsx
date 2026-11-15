import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Flame,
  Zap,
  Check,
  Sparkles,
  Target,
  Users,
  Star,
  TrendingUp,
  Code2,
  Pencil,
  Timer,
  Calendar,
  Home,
  Flag,
  Plus,
  User,
} from "lucide-react";
import { curriculumStats } from "@/content/curriculum";

const missions = [
  { icon: Zap, title: "Crea un proyecto con IA", xp: "+250 XP", done: true, tone: "purple" },
  { icon: Code2, title: "Publica tu portfolio", xp: "+200 XP", done: true, tone: "yellow" },
  { icon: Pencil, title: "Completa 3 retos semanales", xp: "+300 XP", done: false, tone: "purple" },
];

const features = [
  {
    icon: Target,
    title: "Aprende",
    text: "Cursos y retos diseñados para llevarte al siguiente nivel.",
  },
  {
    icon: Users,
    title: "Comunidad",
    text: "Conecta con otros creadores y comparte tu progreso.",
  },
  {
    icon: Star,
    title: "Gana XP",
    text: "Completa misiones, desbloquea logros y sube tu nivel.",
  },
  {
    icon: TrendingUp,
    title: "Crece",
    text: "Mejora tus habilidades y construye el futuro que quieres.",
  },
];

const avatars = [
  { initial: "A", bg: "var(--color-pink-brand)" },
  { initial: "M", bg: "var(--color-purple-brand)" },
  { initial: "S", bg: "var(--color-mint-brand)" },
  { initial: "D", bg: "var(--color-yellow-brand)" },
  { initial: "L", bg: "var(--color-purple-soft)" },
];

export default function Landing() {
  return (
    <div className="min-h-dvh bg-cream">
      {/* ---------- NAV ---------- */}
      <header className="sticky top-0 z-50 border-b-2 border-ink bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <Link
            href="/"
            className="inline-flex items-stretch border-2 border-ink bg-yellow-brand shadow-hard-sm"
          >
            <span className="px-3 py-1.5 font-display text-[19px] uppercase leading-none tracking-tight">
              LEVELUP
            </span>
            <span className="grid w-8 place-items-center border-l-2 border-ink bg-cream">
              <ArrowUpRight className="h-4 w-4" strokeWidth={3} />
            </span>
          </Link>

          <nav className="ml-2 hidden items-center gap-6 text-[13px] font-extrabold uppercase tracking-wide md:flex">
            <a href="#funciones" className="hover:underline hover:decoration-2 hover:underline-offset-4">
              Funciones
            </a>
            <a href="#precios" className="hover:underline hover:decoration-2 hover:underline-offset-4">
              Precios
            </a>
            <Link href="/leagues" className="hover:underline hover:decoration-2 hover:underline-offset-4">
              Comunidad
            </Link>
            <Link href="/courses" className="hover:underline hover:decoration-2 hover:underline-offset-4">
              Cursos
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Link href="/signin" className="hidden px-2 text-[13px] font-extrabold uppercase sm:block">
              Entrar
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 border-2 border-ink bg-purple-brand px-3 py-2 text-[12px] font-extrabold uppercase shadow-hard-sm transition-transform hover:-translate-y-0.5 sm:text-[13px]"
            >
              Abrir app
              <Download className="h-4 w-4" strokeWidth={2.6} />
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* ---------- HERO ---------- */}
        <section className="mx-auto max-w-6xl px-4 pb-4 pt-8 sm:pt-12">
          <div className="grid items-start gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-6">
            {/* columna izquierda */}
            <div>
              <h1 className="font-display text-[clamp(2.6rem,8.2vw,5.4rem)] uppercase leading-[0.85] tracking-[-0.045em]">
                <span className="block">Sube de</span>
                <span className="block">nivel.</span>
                <span className="mt-2 inline-block bg-purple-brand px-2 pb-1">Siempre.</span>
              </h1>

              <p className="mt-6 max-w-md text-[15.5px] leading-relaxed">
                LEVELUP es tu app para aprender, crear y crecer. Retos. Comunidad. Logros. Todo en
                un solo lugar.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link href="/learn" className="btn btn-primary px-6 py-3.5 text-[15px]">
                  Comenzar gratis <ArrowRight className="h-4 w-4" strokeWidth={3} />
                </Link>
                <span className="chip chip-mint">
                  <Sparkles className="h-3.5 w-3.5" /> 5 min al día
                </span>
              </div>
              <p className="mt-3 text-[12px] font-semibold">No necesitas tarjeta de crédito.</p>

              <div className="mt-8 flex items-center gap-4">
                <span className="grid h-24 w-24 shrink-0 -rotate-6 place-items-center rounded-full border-2 border-ink bg-purple-brand shadow-hard-sm">
                  <Flame className="h-8 w-8" strokeWidth={2.4} />
                  <span className="mt-0.5 text-center text-[10px] font-extrabold uppercase leading-tight">
                    Racha
                    <br />
                    activa
                  </span>
                </span>
                <dl className="grid flex-1 grid-cols-3 gap-2">
                  {[
                    { k: curriculumStats.lessons, l: "Lecciones" },
                    { k: curriculumStats.exercises, l: "Ejercicios" },
                    { k: `${Math.round(curriculumStats.minutes / 60)}h`, l: "Contenido" },
                  ].map((s) => (
                    <div key={s.l} className="border-2 border-ink bg-white px-2 py-2 text-center shadow-hard-sm">
                      <dt className="font-display text-xl leading-none tabular-nums">{s.k}</dt>
                      <dd className="mt-1 text-[9.5px] font-extrabold uppercase tracking-wide">{s.l}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* columna derecha: móvil + stickers */}
            <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
              {/* stickers flotantes */}
              <span className="absolute -top-2 left-0 z-20 hidden rotate-[-8deg] border-2 border-ink bg-yellow-brand px-3 py-1.5 font-display text-[15px] shadow-hard-sm sm:block">
                +500 XP
              </span>
              <span className="absolute right-0 top-24 z-20 hidden rotate-[7deg] border-2 border-ink bg-purple-brand px-3 py-2 font-display text-[13px] uppercase leading-tight shadow-hard-sm sm:block">
                Maestro
                <br />
                de IA ★
              </span>
              <span className="absolute -bottom-1 right-0 z-20 hidden rotate-[-5deg] border-2 border-ink bg-mint-brand px-3 py-2 font-display text-[12px] uppercase leading-tight shadow-hard-sm sm:block">
                Portafolio
                <br />
                +20% ↗
              </span>

              {/* teléfono */}
              <div className="relative mx-auto w-[290px] rounded-[2.4rem] border-[3px] border-ink bg-ink p-2 shadow-hard-lg sm:w-[305px]">
                <div className="overflow-hidden rounded-[1.9rem] bg-cream">
                  {/* estado */}
                  <div className="flex items-center justify-between px-4 pb-1 pt-2 text-[9px] font-extrabold">
                    <span>9:31</span>
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-ink" />
                      <span className="h-2 w-3.5 rounded-sm bg-ink" />
                      <span className="h-2 w-2 bg-ink" />
                    </span>
                  </div>
                  {/* app bar */}
                  <div className="flex items-center gap-2 border-b-2 border-ink px-3 py-2">
                    <span className="grid h-5 w-5 place-items-center border-2 border-ink bg-white">
                      <span className="block h-0.5 w-2.5 bg-ink shadow-[0_3px_0_#0b0b0b,0_-3px_0_#0b0b0b]" />
                    </span>
                    <span className="font-display text-[13px] uppercase tracking-tight">LEVELUP</span>
                    <span className="ml-auto grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-purple-brand text-[10px] font-black">
                      N
                    </span>
                  </div>

                  <div className="space-y-2.5 p-3">
                    {/* nivel */}
                    <div className="border-2 border-ink bg-white p-2.5">
                      <p className="text-[8.5px] font-extrabold uppercase tracking-wider">
                        Tu nivel actual
                      </p>
                      <p className="font-display text-[19px] uppercase leading-none">Nivel 24</p>
                      <div className="progress mt-2 h-2.5">
                        <span style={{ width: "65%" }} />
                      </div>
                      <p className="mt-1 text-[8px] font-bold tabular-nums">3.250 / 5.000 XP</p>
                    </div>

                    {/* misiones */}
                    <div>
                      <p className="mb-1.5 text-[8.5px] font-extrabold uppercase tracking-wider">
                        Misiones activas
                      </p>
                      <div className="space-y-1.5">
                        {missions.map((m) => (
                          <div key={m.title} className="flex items-center gap-2 border-2 border-ink bg-white p-1.5">
                            <span
                              className="grid h-6 w-6 shrink-0 place-items-center border-2 border-ink"
                              style={{
                                background:
                                  m.tone === "yellow" ? "var(--color-yellow-brand)" : "var(--color-purple-brand)",
                              }}
                            >
                              <m.icon className="h-3 w-3" strokeWidth={2.6} />
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[9px] font-bold leading-tight">{m.title}</p>
                              <p className="text-[8px] font-extrabold">{m.xp}</p>
                            </div>
                            <span
                              className="grid h-4.5 w-4.5 shrink-0 place-items-center border-2 border-ink"
                              style={{
                                background: m.done ? "var(--color-yellow-brand)" : "var(--color-purple-brand)",
                              }}
                            >
                              {m.done ? <Check className="h-3 w-3" strokeWidth={4} /> : <ArrowRight className="h-3 w-3" strokeWidth={4} />}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* racha */}
                    <div>
                      <p className="mb-1 text-[8.5px] font-extrabold uppercase tracking-wider">
                        Racha actual 🔥
                      </p>
                      <div className="flex items-center gap-1.5 border-2 border-ink bg-mint-brand px-2 py-1.5">
                        <span className="font-display text-[17px] leading-none">12 días</span>
                        <span className="ml-auto grid h-5 w-5 place-items-center border-2 border-ink bg-cream">
                          <Calendar className="h-3 w-3" strokeWidth={2.6} />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* tab bar */}
                  <div className="mt-1 flex items-stretch border-t-2 border-ink bg-white">
                    {[
                      { icon: Home, label: "Inicio", active: true },
                      { icon: Flag, label: "Retos" },
                      { icon: Plus, label: "", center: true },
                      { icon: Users, label: "Comunidad" },
                      { icon: User, label: "Perfil" },
                    ].map((t, i) => (
                      <div
                        key={i}
                        className={`flex flex-1 flex-col items-center gap-0.5 py-1.5 ${
                          t.center ? "bg-yellow-brand" : ""
                        } ${t.active ? "" : "text-ink/60"}`}
                      >
                        <t.icon className="h-3.5 w-3.5" strokeWidth={2.6} />
                        {t.label && (
                          <span className="text-[6.5px] font-extrabold uppercase">{t.label}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- BANDA DE FUNCIONES ---------- */}
        <section id="funciones" className="mt-10 border-y-2 border-ink bg-purple-brand">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-5 px-4 py-6 sm:grid-cols-4 sm:divide-x-2 sm:divide-ink">
            {features.map((f) => (
              <div key={f.title} className="px-2 sm:px-5">
                <span className="mb-2 grid h-9 w-9 place-items-center border-2 border-ink bg-yellow-brand shadow-hard-sm">
                  <f.icon className="h-4 w-4" strokeWidth={2.6} />
                </span>
                <h3 className="font-display text-[13px] uppercase tracking-tight">{f.title}</h3>
                <p className="mt-1 text-[12px] font-medium leading-snug">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- PRUEBA SOCIAL + PRECIO ---------- */}
        <section id="precios" className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            {/* testimonio */}
            <div className="border-2 border-ink bg-yellow-brand p-5 shadow-hard">
              <span className="chip chip-purple mb-3">Beta abierta</span>
              <p className="font-display text-[clamp(1.05rem,2.4vw,1.5rem)] uppercase leading-[1.05] tracking-tight">
                Sin testimonios inventados. Sin «+25K usuarios» de mentira.
              </p>
              <p className="mt-3 text-[12.5px] font-semibold leading-relaxed">
                Somos un producto nuevo: 31 lecciones escritas, 124 ejercicios y un método. Si te
                sirve, lo sabrás en cinco minutos — no porque lo diga un anuncio.
              </p>
              <div className="mt-4 flex items-center gap-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-purple-brand text-[13px] font-black">
                  N
                </span>
                <div>
                  <p className="text-[12.5px] font-extrabold uppercase">Equipo LEVELUP</p>
                  <p className="text-[11px] font-semibold">Fundador único · España</p>
                </div>
              </div>
            </div>

            {/* comunidad */}
            <div className="border-2 border-ink bg-cream p-5 shadow-hard">
              <h2 className="font-display text-[clamp(1.15rem,2.8vw,1.7rem)] uppercase leading-[1.02] tracking-tight">
                Únete a la beta y ayuda a{" "}
                <span className="bg-purple-brand px-1">construir el currículo.</span>
              </h2>
              <div className="mt-4 flex items-center gap-2">
                {avatars.map((a) => (
                  <span
                    key={a.initial}
                    className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink text-[12px] font-black"
                    style={{ background: a.bg }}
                  >
                    {a.initial}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="border-2 border-ink bg-yellow-brand px-3 py-1.5 text-[11px] font-extrabold uppercase shadow-hard-sm">
                  Comunidad en español
                </span>
                <span className="border-2 border-ink bg-mint-brand px-3 py-1.5 text-[11px] font-extrabold uppercase shadow-hard-sm">
                  {curriculumStats.lessons} lecciones live
                </span>
              </div>
            </div>
          </div>

          {/* tarjeta de precio */}
          <div className="mt-4 border-2 border-ink bg-white p-5 shadow-hard">
            <div className="grid items-center gap-5 sm:grid-cols-[1fr_auto]">
              <div>
                <h3 className="font-display text-[21px] uppercase tracking-tight">
                  ¿Listo para LEVELUP?
                </h3>
                <p className="mt-1 text-[13px] font-medium">
                  Prueba premium 7 días gratis. Luego, desde:
                </p>
                <div className="mt-3 inline-flex items-stretch border-2 border-ink bg-mint-brand shadow-hard-sm">
                  <span className="px-4 py-2 font-display text-[26px] leading-none">12,99 €</span>
                  <span className="flex items-center border-l-2 border-ink px-3 text-[11px] font-extrabold uppercase">
                    / mes
                  </span>
                </div>
                <p className="mt-2 text-[11.5px] font-semibold">
                  O 79 €/año · cancela cuando quieras · sin permanencia
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Link href="/learn" className="btn btn-primary px-6 py-3.5 text-[14px]">
                  Probar gratis <ArrowRight className="h-4 w-4" strokeWidth={3} />
                </Link>
                <Link href="/pro" className="btn btn-ghost px-6 py-2.5 text-[12px]">
                  Ver planes
                </Link>
              </div>
            </div>
          </div>

          {/* honestidad */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ["No promete ingresos", "Enseñamos el mecanismo y el número, no el milagro."],
              ["No vende cursos de 2.000 €", "Microlecciones y una suscripción honesta."],
              ["No rellena con teoría", "Cada lección termina en una acción ejecutable hoy."],
            ].map(([t, d]) => (
              <div key={t} className="border-2 border-ink bg-white p-3.5 shadow-hard-sm">
                <h3 className="text-[12px] font-extrabold uppercase">{t}</h3>
                <p className="mt-1 text-[12px] font-medium leading-snug">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- MARQUEE ---------- */}
        <section className="overflow-hidden border-y-2 border-ink bg-ink py-3">
          <div className="flex w-max marquee-track">
            {[0, 1].map((rep) => (
              <div key={rep} className="flex shrink-0 items-center">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center">
                    {["Aprende", "Crea", "Comparte", "Crece", "Repite"].map((w) => (
                      <span key={w} className="flex items-center">
                        <span className="px-5 font-display text-[16px] uppercase text-cream">{w}</span>
                        <Zap className="h-3.5 w-3.5 text-yellow-brand" strokeWidth={3} />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ---------- CTA FINAL ---------- */}
        <section className="mx-auto max-w-6xl px-4 py-12 text-center">
          <h2 className="font-display text-[clamp(1.6rem,5vw,2.8rem)] uppercase leading-[0.95] tracking-tight">
            Tu primer paso son <span className="bg-yellow-brand px-1.5">5 minutos</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[14px] font-medium">
            Sin tarjeta. Sin registro para probar. Elige una misión y empieza hoy.
          </p>
          <Link href="/learn" className="btn btn-primary mx-auto mt-6 px-7 py-3.5 text-[15px]">
            Empezar ahora <ArrowRight className="h-4 w-4" strokeWidth={3} />
          </Link>
        </section>
      </main>

      <footer className="border-t-2 border-ink bg-cream-200">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-[11.5px] font-semibold">
          <span>© {new Date().getFullYear()} LEVELUP · Educación práctica en español</span>
          <span className="flex items-center gap-2">
            <Timer className="h-3.5 w-3.5" /> Contenido educativo. Nada de esto es asesoramiento
            financiero.
          </span>
        </div>
      </footer>
    </div>
  );
}
