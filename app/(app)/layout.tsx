import { TopBar } from "@/components/TopBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh">
      <TopBar />
      <main className="mx-auto w-full max-w-5xl px-3 pb-28 pt-4 sm:px-4 sm:pb-16 sm:pt-6">{children}</main>
    </div>
  );
}
