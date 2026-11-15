import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "LEVELUP · Sube de nivel. Siempre.",
  description:
    "Aprende a programar, usar la IA, montar un negocio y entender el dinero en misiones de 5 minutos. Rachas, XP, ligas y retos reales.",
  applicationName: "LEVELUP",
  openGraph: {
    title: "LEVELUP · Sube de nivel. Siempre.",
    description:
      "Retos de 5 minutos sobre programación, IA, negocios y dinero. Rachas, XP y ligas semanales.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#e2fa32",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
