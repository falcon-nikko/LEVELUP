import Link from "next/link";
import { Check, Sparkles, Heart, Zap, BookOpen, Crown } from "lucide-react";

const free = [
  "31 lecciones y 124 ejercicios",
  "Rachas, XP, gemas y ligas semanales",
  "5 corazones con recarga de 20 min",
  "1 mundo activo a la vez",
];

const pro = [
  "Corazones ilimitados",
  "Todos los cursos y cursos nuevos en primeras 48h",
  "Repaso adaptativo de tus errores",
  "Exportar plan de acción en PDF",
  "Boost de XP mensual incluido",
];

export default function ProPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <header className="text-center">
        <span className="chip chip-purple">
          <Crown className="h-3.5 w-3.5" strokeWidth={3} /> LEVELUP PRO
        </span>
        <h1 className="mt-3 font-display text-[clamp(1.9rem,6vw,2.9rem)] uppercase leading-[0.95] tracking-tight">
          Sin corazones,
          <br />
          sin <span className="bg-yellow-brand px-1.5">límites</span>
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-[13.5px] font-medium leading-relaxed text-ink/70">
          El plan gratuito es suficiente para aprender. PRO está pensado para quien va en serio y
          quiere cumplir todos los días.
        </p>
      </header>

      <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
        <div className="border-2 border-ink bg-white p-4 shadow-hard">
          <h2 className="font-display text-[15px] uppercase tracking-tight">Gratis</h2>
          <p className="mt-1 font-display text-[26px] leading-none">
            0 €<span className="text-[12px] font-extrabold uppercase"> / siempre</span>
          </p>
          <ul className="mt-4 grid gap-2">
            {free.map((f) => (
              <li key={f} className="flex items-start gap-2 text-[12.5px] font-medium">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={3.4} /> {f}
              </li>
            ))}
          </ul>
          <Link href="/learn" className="btn btn-ghost mt-5 w-full py-3 text-[13px]">
            Seguir gratis
          </Link>
        </div>

        <div className="border-2 border-ink bg-purple-brand p-4 shadow-hard">
          <h2 className="flex items-center gap-1.5 font-display text-[15px] uppercase tracking-tight">
            <Sparkles className="h-4 w-4" strokeWidth={2.8} /> PRO
          </h2>
          <p className="mt-1 font-display text-[26px] leading-none">
            12,99 €<span className="text-[12px] font-extrabold uppercase"> / mes</span>
          </p>
          <p className="text-[11px] font-bold">o 79 €/año · ahorras 38%</p>
          <ul className="mt-4 grid gap-2">
            {pro.map((f) => (
              <li key={f} className="flex items-start gap-2 text-[12.5px] font-medium">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={3.4} /> {f}
              </li>
            ))}
          </ul>
          <button disabled className="btn btn-primary mt-5 w-full py-3 text-[13px]">
            Próximamente · Stripe
          </button>
          <p className="mt-2 text-center text-[10px] font-extrabold uppercase">
            Cobro con Stripe. Cancela en un clic.
          </p>
        </div>
      </div>

      <section className="mt-4 border-2 border-ink bg-white p-4 shadow-hard-sm">
        <h2 className="font-display text-[13px] uppercase tracking-tight">
          Por qué el plan gratuito es de verdad gratis
        </h2>
        <p className="mt-2 text-[12.5px] font-medium leading-relaxed text-ink/70">
          Monetizamos con suscripción PRO y con enlaces de afiliado a herramientas que enseñamos a
          usar. Nunca recomendamos una herramienta solo porque pague comisión: si aparece en una
          lección, es porque la usamos en el método. Las comisiones financian el contenido gratuito.
        </p>
      </section>

      <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {[
          { icon: <Heart className="h-4 w-4" strokeWidth={2.8} />, t: "Corazones", bg: "var(--color-pink-brand)" },
          { icon: <Zap className="h-4 w-4" strokeWidth={2.8} />, t: "XP x2", bg: "var(--color-yellow-brand)" },
          { icon: <BookOpen className="h-4 w-4" strokeWidth={2.8} />, t: "Cursos nuevos", bg: "var(--color-mint-brand)" },
          { icon: <Crown className="h-4 w-4" strokeWidth={2.8} />, t: "Ligas altas", bg: "var(--color-purple-brand)" },
        ].map((i) => (
          <div
            key={i.t}
            className="flex items-center gap-2 border-2 border-ink px-3 py-2.5 text-[11px] font-extrabold uppercase"
            style={{ background: i.bg }}
          >
            {i.icon} {i.t}
          </div>
        ))}
      </div>
    </div>
  );
}
