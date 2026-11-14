# LEVELUP — Plan de Ingeniería en 8 Fases

Este documento detalla la ejecución técnica de **LEVELUP** estructurada en 8 fases modulares:

1. **Fase 1 — Documentación Maestro & Arquitectura Base**
   - Documentación de negocio y arquitectura en `/docs`.
   - Configuración de Next.js (App Router), TypeScript, Tailwind CSS y sistema de diseño **Clean Pro** (inspirado en Linear/Mimo) con Web Audio micro-feedback.
2. **Fase 2 — Motor Bilingüe (`ES`/`EN`) & Currículo Completo de las 4 Rutas**
   - Diccionarios tipados de UI en Español e Inglés.
   - Currículo jugable bilingüe para **AI & Automation**, **Modern Coding**, **Smart Dropshipping** y **Digital Agency**, incluyendo los 5 formatos de retos interactivos y Action Missions.
3. **Fase 3 — Base de Datos Real en Supabase (`LEVELUP-indev`)**
   - Extensión limpia del esquema existente en Supabase (`profiles`, `courses`, `units`, `lessons`, `exercises`, `leagues`, `products`, `affiliate_tools`, `affiliate_clicks`).
   - Trigger `on_auth_user_created` para creación automática de perfil, racha y preferencias.
   - Semilla de unidades, lecciones, ejercicios, ligas y herramientas de afiliado.
4. **Fase 4 — Estado Global Híbrido & Autenticación Supabase**
   - `LevelUpProvider` con soporte dual: sesión autenticada en Supabase + modo visitante instantáneo que migra el progreso al crear cuenta.
   - Pantallas de Login y Registro (`/auth`) minimalistas.
5. **Fase 5 — Landing Page de Alta Conversión (`/`)**
   - Hero con **Mini-Reto Jugable en Vivo** en los 4 verticales, selector `ES/EN`, comparativa del método, showcase de rutas y tabla de precios.
6. **Fase 6 — Onboarding Interactivo "Elige tu Camino" (`/onboarding`)**
   - Asistente en 3 pasos (Ruta Principal → Nivel de Experiencia → Meta Diaria de 5/10/15 min) conectado al perfil del usuario.
7. **Fase 7 — App Principal: Mapa (`/learn`), Reproductor (`/lesson/[slug]`), Misiones (`/quests`) y Ligas (`/leaderboard`)**
   - Navegación responsive (Sidebar Desktop + Bottom Bar Móvil) y HUD superior con XP, Racha `🔥`, Energía `⚡` y Rango.
   - Reproductor a pantalla completa con validación instantánea, explicaciones y Action Missions.
   - Misiones diarias reclamables y ranking semanal de ligas.
8. **Fase 8 — Monetización Dual (`/stack` Afiliados + `/pro` & `/vault` Operator Tools), Perfil (`/profile`) y Verificación**
   - Hub de herramientas recomendadas con tracking de clics en Supabase (`/api/affiliate/click`).
   - Flujo de upgrade a **LEVELUP PRO** + **Operator Vault** con Calculadora interactiva de ROAS/Margen, Generador de Cold Outreach y Playbooks copiables.
   - Página de Perfil con Heatmap de constancia y logros desbloqueables.
   - Compilación limpia (`npm run build`) y servidor de previsualización en vivo.
