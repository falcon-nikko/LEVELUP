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
        <span className="chip mx-auto border-amber-300/40 bg-amber-300/10 text-amber-200">
          <Crown className="h-3.5 w-3.5" /> LEVELUP PRO
        </span>
        <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          Sin corazones, sin <span className="grad-text">límites</span>
        </h1>
        <p className="mx-auto mt-2 max-w-lg text-[14.5px] text-white/55">
          El plan gratuito es suficiente para aprender. PRO está pensado para quien va en serio y quiere cumplir todos
          los días.
        </p>
      </header>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="card p-5">
          <h2 className="text-[15px] font-extrabold">Gratis</h2>
          <p className="mt-1 text-2xl font-black">
            0 €<span className="text-[13px] font-bold text-white/40"> / siempre</span>
          </p>
          <ul className="mt-4 grid gap-2">
            {free.map((f) => (
              <li key={f} className="flex items-start gap-2 text-[13px] text-white/65">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/35" /> {f}
              </li>
            ))}
          </ul>
          <Link href="/learn" className="btn btn-ghost mt-5 w-full py-3 text-[14px]">
            Seguir gratis
          </Link>
        </div>

        <div className="card relative overflow-hidden border-amber-300/30 p-5">
          <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-amber-300/20 blur-3xl" />
          <div className="relative">
            <h2 className="flex items-center gap-1.5 text-[15px] font-extrabold text-amber-200">
              <Sparkles className="h-4 w-4" /> PRO
            </h2>
            <p className="mt-1 text-2xl font-black">
              12,99 €<span className="text-[13px] font-bold text-white/40"> / mes</span>
            </p>
            <p className="text-[11.5px] text-white/40">o 79 €/año · ahorras 38%</p>
            <ul className="mt-4 grid gap-2">
              {pro.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[13px] text-white/75">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-400" /> {f}
                </li>
              ))}
            </ul>
            <button disabled className="btn btn-primary mt-5 w-full py-3 text-[14px]">
              Próximamente · Stripe
            </button>
            <p className="mt-2 text-center text-[10.5px] text-white/30">
              Cobro con Stripe. Cancela en un clic.
            </p>
          </div>
        </div>
      </div>

      <section className="card mt-4 p-5">
        <h2 className="text-sm font-extrabold">Por qué el plan gratuito es de verdad gratis</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-white/55">
          Monetizamos con suscripción PRO y con enlaces de afiliado a herramientas que enseñamos a usar. Nunca
          recomendamos una herramienta solo porque pague comisión: si aparece en una lección, es porque la usamos en el
          método. Las comisiones financian el contenido gratuito.
        </p>
      </section>

      <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {[
          { icon: <Heart className="h-4 w-4 text-rose-400" />, t: "Corazones" },
          { icon: <Zap className="h-4 w-4 text-brand-400" />, t: "XP x2" },
          { icon: <BookOpen className="h-4 w-4 text-violet-brand" />, t: "Cursos nuevos" },
          { icon: <Crown className="h-4 w-4 text-amber-300" />, t: "Ligas altas" },
        ].map((i) => (
          <div key={i.t} className="card-tight flex items-center gap-2 px-3 py-2.5 text-[12px] font-bold text-white/65">
            {i.icon} {i.t}
          </div>
        ))}
      </div>
    </div>
  );
}
