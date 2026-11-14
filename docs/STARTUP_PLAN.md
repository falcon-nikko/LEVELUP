# LEVELUP — Startup & Product Master Plan

> **"Domina las habilidades de la nueva economía digital en 10 minutos al día, pasando de la teoría a la ejecución real."**  
> **"Master the skills of the new digital economy in 10 minutes a day — from theory to real execution."**

---

## 1. Visión y Posicionamiento ("El Anti-Gurú")

- **Problema del mercado**: Los cursos en vídeo tradicionales (Udemy, YouTube) sufren tasas de finalización menores al 10% por ser pasivos y extensos, mientras que el mercado de emprendimiento digital está saturado de promesas vacías de alto ticket ($1,000+).
- **Solución LEVELUP**: Una plataforma **Bilingüe (ES + EN)** de micro-aprendizaje interactivo y ejecución guiada con estética **Minimalista Tech (inspirada en Linear / Mimo)**.
- **Público Objetivo**: Jóvenes profesionales, estudiantes ambiciosos, freelancers y futuros founders en mercados hispanohablantes (España + LatAm, bajo CAC) y mercado anglosajón (EE.UU./UK/Global, alto LTV).

---

## 2. Las 4 Rutas Principales ("Career Tracks")

Cada ruta combina micro-lecciones interactivas (3–5 min) con **Action Missions** de fin de unidad que conectan con herramientas reales del mercado:

1. **AI & Automation (`ai-automation`)** — *Acento Violeta (`#8B5CF6`)*
   - Ingeniería de prompts estructurada, flujos automatizados (Make / n8n), agentes de IA aplicados a productividad y servicios B2B.
2. **Modern Coding (`modern-coding`)** — *Acento Cian (`#06B6D4`)*
   - Fundamentos de JavaScript y Python, consumo de APIs, bases de datos SQL/Supabase y *Vibe Coding* para construir y lanzar Micro-SaaS.
3. **Smart Dropshipping (`smart-dropshipping`)** — *Acento Esmeralda (`#10B981`)*
   - Validación de productos con datos reales, unit economics (CPA, AOV, ROAS Breakeven), arquitectura de tiendas de alta conversión y creativos UGC orgánicos/pagados.
4. **Digital Agency — AAA / SMMA (`digital-agency`)** — *Acento Ámbar (`#F59E0B`)*
   - Diseño de ofertas B2B irresistibles (*Grand Slam Offer*), prospección en frío (Cold Email / DM), manejo de objeciones en llamadas de venta y entrega apalancada con IA.

---

## 3. Sistema de Gamificación de Alto Estatus ("Operator Progression")

- **Energía de Enfoque (`5 ⚡`)**: Cada fallo resta `1 ⚡`. Se regenera automáticamente (+1 cada 20 min) o es **infinita en LEVELUP PRO**.
- **Racha Diaria (`Streak 🔥`) + Heatmap**: Seguimiento diario de hábitos estilo contribuciones de GitHub + protectores de racha (*Streak Freeze*).
- **XP y Rangos de Operador**:
  - `Lv.1 Rookie` (0 – 199 XP)
  - `Lv.2 Builder` (200 – 599 XP)
  - `Lv.3 Operator` (600 – 1,499 XP)
  - `Lv.4 Specialist` (1,500 – 3,499 XP)
  - `Lv.5 Founder` (3,500+ XP)
- **5 Formatos Interactivos de Ejercicios**:
  1. `multiple_choice` — Decisión estratégica / concepto flash.
  2. `ordering` — Constructor táctil de Prompts, Código o Embudos paso a paso.
  3. `simulation` — Duelo A/B y simulador de casos reales (ROAS, Cold Email, Arquitectura).
  4. `error_identification` — Auditoría de fallos en código, prompts o tiendas online.
  5. `action_mission` — Misión ejecutable en el mundo real con checklist + herramienta recomendada.

---

## 4. Modelo Financiero: Doble Motor de Monetización

### Motor A — Suscripción Recurrente (`LEVELUP PRO`)
- **Plan Mensual**: `$12.99 / mes`
- **Plan Anual**: `$79.00 / año` (~49% de ahorro, 7 días de prueba)
- **Beneficios PRO**: Energía `⚡` ilimitada, acceso al **Operator Vault** (calculadora interactiva de ROAS/márgenes, generador de scripts B2B, biblioteca de prompts verificados), protectores de racha y acceso anticipado a laboratorios avanzados.

### Motor B — Afiliados Contextuales en Misiones (`Affiliate Engine`)
Incluso los usuarios del plan gratuito monetizan al ejecutar sus **Action Missions** mediante enlaces de afiliado integrados y medidos en `affiliate_clicks`:
- **Shopify** (Ruta Smart Dropshipping)
- **Make / n8n Cloud / OpenAI** (Ruta AI & Automation)
- **Vercel / Supabase / Cursor** (Ruta Modern Coding)
- **Apollo.io / Instantly / Cal.com** (Ruta Digital Agency)

---

## 5. Arquitectura Técnica

- **Frontend & API**: Next.js (App Router) + TypeScript + Tailwind CSS.
- **Internacionalización**: Motor bilingüe `ES / EN` en cliente y contenido curricular completo en ambos idiomas.
- **Backend, Auth & DB**: **Supabase (`LEVELUP-indev`)** con PostgreSQL, Row Level Security (RLS), Auth real y sincronización progresiva con modo invitado sin fricción.
- **Despliegue**: Preparado para **Vercel**.
