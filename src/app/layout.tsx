import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { LevelUpProvider } from '@/context/LevelUpContext';
import { GlobalShortcuts } from '@/components/GlobalShortcuts';

export const metadata: Metadata = {
  title: 'LEVELUP — Práctica diaria de habilidades digitales',
  description:
    'Rutas gamificadas de IA y Automatización, Código Moderno, Dropshipping y Agencia B2B en bloques de 10 minutos.',
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen bg-paper font-sans text-eel antialiased">
        <LevelUpProvider>
          <GlobalShortcuts>{children}</GlobalShortcuts>
        </LevelUpProvider>
      </body>
    </html>
  );
}
