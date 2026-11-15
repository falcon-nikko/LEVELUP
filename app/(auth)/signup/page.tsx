import { AuthForm } from "@/components/AuthForm";
import { Logo } from "@/components/Logo";

export default function SignUpPage() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-4 py-10">
      <Logo />
      <AuthForm initialMode="signup" />
    </div>
  );
}
