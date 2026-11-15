"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Mail, Lock, User } from "lucide-react";
import { useAuth } from "@/lib/auth";

export function AuthForm({ initialMode }: { initialMode: "signin" | "signup" }) {
  const { signIn, signUp, mode } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const demo = mode === "demo";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setBusy(true);
    try {
      if (tab === "signup") {
        await signUp(email, password, name || email.split("@")[0]);
        setNotice("Cuenta creada. Revisa tu correo si hace falta confirmar.");
        router.push("/learn");
      } else {
        await signIn(email, password);
        router.push("/learn");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Algo ha ido mal.");
    } finally {
      setBusy(false);
    }
  }

  if (demo) {
    return (
      <div className="mt-6 border-2 border-ink bg-white p-4 shadow-hard sm:p-5">
        <h1 className="font-display text-[21px] uppercase leading-tight tracking-tight">
          Estás en modo demo
        </h1>
        <p className="mt-2 text-[13px] font-medium leading-relaxed text-ink/70">
          Esta instancia no tiene credenciales de Supabase conectadas, así que no hace falta
          cuenta: tu progreso se guarda en este navegador. Puedes probar todo el producto sin
          registro.
        </p>
        <Link href="/learn" className="btn btn-primary mt-4 w-full py-3.5 text-[14px]">
          Entrar a la demo <ArrowRight className="h-4 w-4" strokeWidth={3} />
        </Link>
        <p className="mt-3 text-[11px] font-semibold leading-relaxed text-ink/50">
          Para activar cuentas reales: añade{" "}
          <code className="border-2 border-ink bg-cream-200 px-1">NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
          <code className="border-2 border-ink bg-cream-200 px-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> y
          vuelve a desplegar.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 border-2 border-ink bg-white p-4 shadow-hard sm:p-5">
      <div className="mb-4 grid grid-cols-2 gap-1.5">
        {(["signin", "signup"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`border-2 border-ink py-2 text-[12px] font-extrabold uppercase transition ${
              tab === t ? "bg-yellow-brand shadow-hard-sm" : "bg-white"
            }`}
          >
            {t === "signin" ? "Entrar" : "Crear cuenta"}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="grid gap-2.5">
        {tab === "signup" && (
          <Field icon={<User className="h-4 w-4" strokeWidth={2.8} />} label="Nombre">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nicolás"
              className="w-full bg-transparent text-[14px] font-semibold outline-none placeholder:text-ink/30"
            />
          </Field>
        )}

        <Field icon={<Mail className="h-4 w-4" strokeWidth={2.8} />} label="Email">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            autoComplete="email"
            className="w-full bg-transparent text-[14px] font-semibold outline-none placeholder:text-ink/30"
          />
        </Field>

        <Field icon={<Lock className="h-4 w-4" strokeWidth={2.8} />} label="Contraseña">
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            autoComplete={tab === "signup" ? "new-password" : "current-password"}
            className="w-full bg-transparent text-[14px] font-semibold outline-none placeholder:text-ink/30"
          />
        </Field>

        {error && (
          <p className="border-2 border-ink bg-pink-brand px-3 py-2 text-[12px] font-bold">{error}</p>
        )}
        {notice && (
          <p className="border-2 border-ink bg-mint-brand px-3 py-2 text-[12px] font-bold">{notice}</p>
        )}

        <button type="submit" disabled={busy} className="btn btn-primary mt-1 w-full py-3.5 text-[14px]">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {tab === "signin" ? "Entrar" : "Crear mi cuenta"}
        </button>
      </form>

      <p className="mt-4 text-center text-[10.5px] font-semibold leading-relaxed text-ink/50">
        Al continuar aceptas el uso educativo del contenido. Nada de lo que enseñamos es
        asesoramiento financiero.
      </p>
    </div>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-center gap-2.5 border-2 border-ink bg-white px-3 py-3 focus-within:shadow-hard-sm">
      <span className="shrink-0">{icon}</span>
      <span className="sr-only">{label}</span>
      {children}
    </label>
  );
}
