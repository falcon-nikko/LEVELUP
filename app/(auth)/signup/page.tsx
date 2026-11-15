import { AuthForm } from "@/components/AuthForm";
import { Logo } from "@/components/Logo";

export default function SignUpPage() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-4 py-10">
      <div className="mb-6">
        <Logo />
        <h1 className="mt-4 font-display text-[26px] uppercase leading-none tracking-tight">
          Sube de nivel.
        </h1>
        <p className="mt-1.5 text-[12.5px] font-semibold text-ink/60">
          5 minutos al día para aprender lo que se paga.
        </p>
      </div>
      <AuthForm initialMode="signup" />
    </div>
  );
}
