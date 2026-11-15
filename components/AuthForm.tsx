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
      <div className="card mt-6 p-5">
        <h1 className="text-[22px] font-black tracking-tight">Estás en modo demo</h1>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/55">
          Esta instancia no tiene credenciales de Supabase conectadas, así que no hace falta cuenta: tu progreso se
          guarda en este navegador. Puedes probar todo el producto sin registro.
        </p>
        <Link href="/learn" className="btn btn-primary mt-4 w-full py-3.5 text-[15px]">
          Entrar a la demo <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="mt-3 text-[11.5px] leading-relaxed text-white/35">
          Para activar cuentas reales: añade <code className="rounded bg-white/10 px-1">NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
          <code className="rounded bg-white/10 px-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> y vuelve a desplegar.
        </p>
      </div>
    );
  }

  return (
    <div className="card mt-6 p-5">
      <div className="mb-4 grid grid-cols-2 gap-1 rounded-xl bg-white/[0.05] p-1">
        {(["signin", "signup"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-lg py-2 text-[13px] font-extrabold transition ${
              tab === t ? "bg-white/12 text-white" : "text-white/45"
            }`}
          >
            {t === "signin" ? "Entrar" : "Crear cuenta"}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="grid gap-3">
        {tab === "signup" && (
          <Field icon={<User className="h-4 w-4" />} label="Nombre">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nicolás"
              className="w-full bg-transparent text-[14px] font-semibold outline-none placeholder:text-white/25"
            />
          </Field>
        )}

        <Field icon={<Mail className="h-4 w-4" />} label="Email">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            autoComplete="email"
            className="w-full bg-transparent text-[14px] font-semibold outline-none placeholder:text-white/25"
          />
        </Field>

        <Field icon={<Lock className="h-4 w-4" />} label="Contraseña">
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            autoComplete={tab === "signup" ? "new-password" : "current-password"}
            className="w-full bg-transparent text-[14px] font-semibold outline-none placeholder:text-white/25"
          />
        </Field>

        {error && <p className="rounded-lg bg-rose-500/10 px-3 py-2 text-[12.5px] text-rose-200">{error}</p>}
        {notice && <p className="rounded-lg bg-brand-500/10 px-3 py-2 text-[12.5px] text-brand-200">{notice}</p>}

        <button type="submit" disabled={busy} className="btn btn-primary mt-1 w-full py-3.5 text-[15px]">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {tab === "signin" ? "Entrar" : "Crear mi cuenta"}
        </button>
      </form>

      <p className="mt-4 text-center text-[11.5px] leading-relaxed text-white/35">
        Al continuar aceptas el uso educativo del contenido. Nada de lo que enseñamos es asesoramiento financiero.
      </p>
    </div>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <label className="flex items-center gap-2.5 rounded-xl border border-white/12 bg-white/[0.04] px-3.5 py-3 focus-within:border-brand-400/60">
      <span className="text-white/35">{icon}</span>
      <span className="sr-only">{label}</span>
      {children}
    </label>
  );
}
