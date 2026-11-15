import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "LEVELUP · Aprende lo que se paga",
  description:
    "Microaprendizaje de 5 minutos al día para aprender a programar, usar la IA, montar un negocio y entender el dinero. Rachas, XP y ligas semanales.",
  applicationName: "LEVELUP",
  openGraph: {
    title: "LEVELUP · Aprende lo que se paga",
    description: "Lecciones de 5 minutos con retos reales. Rachas, XP y ligas semanales.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#070b16",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
