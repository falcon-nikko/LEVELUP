import type { Config } from 'tailwindcss';

/**
 * LEVELUP "Bright Arcade" design tokens.
 * Palette is derived from the Duolingo design system research (Feather Green,
 * Macaw Blue, Cardinal Red, Bee Yellow, Fox Orange, Swan/Hare/Wolf/Eel neutrals).
 * No black surfaces, no purple premium glow, no rainbow gradient text.
 */
const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FFFFFF',
        polar: '#F7F7F7',
        swan: '#E5E5E5',
        hare: '#AFAFAF',
        wolf: '#777777',
        eel: '#4B4B4B',
        graphite: '#3C3C3C',
        navy: '#042C60',
        midnight: '#000437',
        ecto: {
          DEFAULT: '#58CC02',
          dark: '#58A700',
          mask: '#89E219',
          wash: '#D7FFB8',
        },
        macaw: {
          DEFAULT: '#1CB0F6',
          dark: '#1899D6',
          wash: '#DDF4FF',
        },
        cardinal: {
          DEFAULT: '#FF4B4B',
          dark: '#EA2B2B',
          wash: '#FFDFE0',
        },
        bee: {
          DEFAULT: '#FFC800',
          dark: '#E5A800',
          wash: '#FFF4CC',
        },
        fox: {
          DEFAULT: '#FF9600',
          dark: '#D97B00',
          wash: '#FFE8CC',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        duolingo: '16px',
      },
      keyframes: {
        'node-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-7px)' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.82)' },
          '70%': { transform: 'scale(1.04)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-7px)' },
          '40%': { transform: 'translateX(6px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(3px)' },
        },
        flicker: {
          '0%, 100%': { transform: 'scale(1) rotate(-2deg)' },
          '50%': { transform: 'scale(1.12) rotate(3deg)' },
        },
        'ring-pulse': {
          '0%': { transform: 'scale(0.9)', opacity: '0.85' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'xp-rise': {
          '0%': { opacity: '0', transform: 'translateY(8px) scale(0.9)' },
          '25%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(-26px) scale(1.05)' },
        },
      },
      animation: {
        'node-bounce': 'node-bounce 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) infinite',
        'pop-in': 'pop-in 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'slide-up': 'slide-up 0.22s cubic-bezier(0.16, 1, 0.3, 1) both',
        shake: 'shake 0.36s ease-in-out both',
        flicker: 'flicker 1.1s ease-in-out infinite',
        'ring-pulse': 'ring-pulse 1.8s ease-out infinite',
        float: 'float 3.4s ease-in-out infinite',
        'xp-rise': 'xp-rise 1.1s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
