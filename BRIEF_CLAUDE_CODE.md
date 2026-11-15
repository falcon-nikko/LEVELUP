# BRIEF_CLAUDE_CODE.md

Documento de traspaso para continuar el proyecto en Claude Code (o cualquier agente con acceso al
repo). Está escrito para pegarse tal cual como primer mensaje.

---

## 0. Cómo usarlo

```bash
git clone https://github.com/falcon-nikko/LEVELUP.git
cd LEVELUP
git checkout arena/f288d848-levelup
npm install
npm run dev            # http://localhost:3000
```

Primer mensaje sugerido para Claude Code:

> Lee `BRIEF_CLAUDE_CODE.md` completo y luego ejecuta `npm run typecheck` y `npm run build` para
> confirmar el estado base. No cambies nada todavía: dime si algo falla y qué entiendes del brief.

---

## 1. Qué es LEVELUP

App de microaprendizaje tipo Duolingo para **programación, IA, negocios digitales (dropshipping,
agencia), validación de startups y finanzas personales**. Mercado **hispanohablante**, precios en
**EUR**. Propuesta: «todo en uno (tech + dinero + IA)» con la IA como tutor personal.

Fundador **solo**, presupuesto **~0 €**: Supabase free + Vercel hobby. Nada de servicios de pago.

- Plan de negocio (fuente de verdad estratégica): `docs/PLAN-LEVELUP.md`
- Filosofía editorial: cada lección acaba en una **acción ejecutable hoy**, sin promesas de ingresos.

---

## 2. Estado actual (verificado)

| Dato | Valor |
|---|---|
| Rama | `arena/f288d848-levelup` |
| HEAD | `5e09dd4` — `feat(ui): rediseño neo-brutalista…` |
| Base | `3d605fa` (Initial commit de `main`) |
| Typecheck | `npx tsc --noEmit` → **0 errores** |
| Build | `npx next build` → **OK**, 41 rutas, 31 lecciones SSG |
| Contenido | 4 mundos · 7 cursos · 8 unidades · **31 lecciones** · 124 ejercicios · 855 XP · 149 min |
| Supabase | mundo/curso/unidad/lecciones **ya cargados** (4 / 7 / 8 / 31) |
| Despliegue | **no hay proyecto en Vercel todavía** |
| Usuarios reales | 0. Modo demo por defecto |

Stack: Next.js 16.4.6 (App Router, Turbopack) · React 19 · TypeScript estricto · Tailwind 4 (`@theme`
en CSS, sin `tailwind.config`) · lucide-react · `@supabase/ssr`. **Sin librería de UI ni de
componentes**: todo es CSS propio.

---

## 3. Mapa de archivos (lo que importa)

```
app/
  globals.css                 ← SISTEMA DE DISEÑO: tokens + .card/.btn/.chip/.progress. 350 líneas.
  layout.tsx                  Metadatos + fuentes Archivo Black / Inter (vía <link>)
  page.tsx                    Landing pública (la pieza más "de diseño" del repo)
  (app)/layout.tsx            Shell con TopBar
  (app)/learn/page.tsx        Ruta tipo Duolingo: cabecera + nodos por curso + panel de misiones
  (app)/learn/[lessonId]/page.tsx   Server component + generateStaticParams
  (app)/courses/page.tsx      Catálogo filtrable por mundo
  (app)/leagues/page.tsx      Liga semanal (RPC o leaderboard demo)
  (app)/profile/page.tsx      Nivel, métricas, donut SVG, 18 logros, plan
  (app)/pro/page.tsx          Gratis vs PRO 12,99 €/mes · 79 €/año (botón Stripe desactivado)
  (auth)/signin|signup        Envoltorios finos de <AuthForm>
components/
  TopBar.tsx                  Nav + stats + aviso de modo demo + tab bar móvil
  Logo.tsx                    Logo caja amarilla con flecha (prop `compact`, `href`)
  PathNode.tsx                Nodo circular de lección (done/current/locked)
  QuestPanel.tsx              Misiones diarias con barra de progreso
  LessonPlayer.tsx            Máquina de estados teoría → quiz → resultado
  ExerciseView.tsx            Render + corrección de los 6 tipos de ejercicio
  AuthForm.tsx                Tabs entrar/crear cuenta + rama de modo demo
  Providers.tsx               AuthProvider
lib/
  runtime.ts                  DEMO_MODE = FORCE_DEMO || !env Supabase
  auth.tsx                    Sesión + perfil (Supabase o localStorage)
  progress.ts                 XP, racha, gemas, corazones, desbloqueo, leaderboard demo
  lesson-engine.ts            Evaluación de respuestas + scoring
  submit.ts                   Persistencia del resultado de lección
  quests.ts / daily-log.ts    Misiones y log diario local
  achievements.ts             18 definiciones + tierColor
  types.ts                    Tipos de dominio
  supabase/{client,server}.ts Clientes SSR
  courses-shim.ts             Re-export de tipos (evita colisión app/courses)
content/
  curriculum.ts               FUENTE DE VERDAD del currículo: agrega los 7 cursos
  courses/*.ts                Un archivo por curso (missions, dropshipping, agency, prompt-engineering,
                              startup, programming, finance) + types.ts + helpers.ts
supabase/
  seed.sql                    Generado (~120 KB, 60 sentencias) — no editar a mano
  batches/00.sql … 31.sql     Mismo seed troceado, para subir por conectores
scripts/
  build-seed.ts               content/ → supabase/seed.sql  (`npm run seed:build`)
  smoke.ts                    Comprobaciones de integridad (`npm run smoke`)
docs/PLAN-LEVELUP.md          Plan de negocio (~11 secciones + anexo)
```

---

## 4. Modelo de datos (Supabase, proyecto `LEVELUP-indev` ref `kgdhltwbxbzgvsjdmyts`)

Schema ya existente y **con RLS activa en las 30 tablas**. No hay migraciones propias: se reutilizó
el schema que ya estaba en el proyecto.

Tablas clave:

- `worlds` (4 filas), `courses` UNIQUE(world_id, slug), `units` UNIQUE(course_id, slug),
  `lessons` UNIQUE(unit_id, slug) + `content jsonb`, `exercises`
- `profiles`: `total_xp`, `hearts`, `max_hearts`, `gems`, `avatar_hue`, `weekly_xp`, `week_key`,
  `minutes_practiced`, `streak_freezes`, `text[]` `completed_lesson_slugs` / `legendary_slugs` /
  `mistake_keys` / `activity_dates`, `is_pro`
- `streaks`, ligas, `products`, `subscriptions`, `daily_quests` (6), `achievements` (31),
  `affiliate_tools` (8)

RPCs que usa el cliente: `award_xp`, `record_lesson_completion`, `log_exercise_attempt`,
`consume_heart`, `refresh_hearts`, `get_weekly_league`, `get_league_window`, `activate_xp_boost`,
`record_affiliate_click`.

⚠️ **Deuda pendiente**: las firmas exactas de esas RPCs no se verificaron contra la BD (el intento de
leerlas desde `pg_proc` devolvió solo filas de índices). El código está escrito según las firmas
documentadas. Si al conectar Supabase algo falla, **lo primero es leer las firmas reales**:

```sql
select p.proname, pg_get_function_arguments(p.oid) as args, pg_get_function_result(p.oid) as ret
from pg_proc p join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public' and p.prokind = 'f'
order by p.proname;
```

**Aviso sobre `courses`**: en esa misma BD hay 27 cursos de catálogo preexistentes **sin unidades**
(python, javascript, css, marketing…). No los consume la app, pero `select count(*) from courses`
devuelve 34, no 7. Los cursos reales son los 7 con `units` asociadas.

Credenciales: `NEXT_PUBLIC_SUPABASE_URL=https://kgdhltwbxbzgvsjdmyts.supabase.co` y la anon key
`sb_publishable_…` están en el panel de Supabase. **Nunca las commitees**: van en `.env.local`
(ignorado por git; hay plantilla en `.env.example`).

---

## 5. Sistema de diseño neo-brutalista (leer antes de tocar UI)

Todo vive en `app/globals.css`. **No hay `tailwind.config.js`**: los tokens se declaran con `@theme`
de Tailwind 4.

```
Fondo     bg-cream        #fdf9f0        bg-cream-200   #f7f0e0
Tinta     border-ink / text-ink  #0b0b0b
Acentos   bg-yellow-brand #e2fa32        bg-purple-brand #c9a8f5
          bg-mint-brand   #a7e8c4        bg-pink-brand   #ffb3c7
Sombras   shadow-hard-sm 3px · shadow-hard 4px · shadow-hard-lg 7px   (sólidas, sin blur)
Fuentes   font-display → Archivo Black (titulares, SIEMPRE uppercase)
          body → Inter
```

Clases utilitarias propias: `.card`, `.card-tight`, `.card-flat`, `.btn` + `.btn-primary` /
`.btn-purple` / `.btn-mint` / `.btn-ghost` / `.btn-ink` / `.btn-sm`, `.chip` (+ `-yellow`,
`-purple`, `-mint`), `.tag`, `.progress > span`, `.display`, `.animate-pop`, `.xp-float`,
`.marquee-track`.

Reglas implícitas del estilo:

1. **Borde negro de 2px en todo** lo que sea superficie, botón o etiqueta.
2. Sombras **duras y desplazadas**, nunca difuminadas.
3. Botones: se levantan 1px en hover y **se hunden 3px en active** (perdiendo la sombra).
4. Titulares en `font-display` + `uppercase` + `tracking-tight`.
5. Color plano, sin degradados ni glassmorphism. (Quedan restos menores de `grad-text` en el CSS:
   es un no-op, se puede borrar.)

Si añades un componente nuevo, **reutiliza esas clases**; no introduzcas styled-components, shadcn ni
otra paleta.

---

## 6. Qué está hecho y qué no (honesto)

### Hecho
- Landing, ruta de aprendizaje, catálogo, ligas, perfil, PRO, login/registro. 9 rutas en 200.
- Motor de lección completo: teoría → ejercicios → corrección → XP → resultado → acción del día.
- 6 tipos de ejercicio soportados y renderizados.
- 31 lecciones de contenido real escrito (no relleno), cargadas en Supabase.
- Modo demo funcional sin configuración (progreso en `localStorage`).
- Rediseño visual neo-brutalista aplicado a las 9 pantallas.
- Plan de negocio completo en `docs/PLAN-LEVELUP.md`.

### No hecho (por orden de importancia)
1. **No hay ejecución de código.** El curso de programación valida comprensión, no sintaxis. Es la
   carencia más grande frente a freeCodeCamp. Requiere sandbox (Judge0, Piston o WebContainer).
2. **No hay cobro.** El botón de PRO está desactivado, sin Stripe. Ingresos = 0 por diseño.
3. **No está desplegado.** No existe proyecto en Vercel.
4. **RPCs sin verificar** contra la BD real (ver §4).
5. **Sin tests.** Solo `npm run smoke` (integridad del currículo) y typecheck/build.
6. **Sin PWA / sin app móvil.** Sin `manifest.json` ni service worker.
7. **i18n a medias.** Todo el texto está en español hardcodeado. La decisión estratégica fue
   «español primero, i18n desde el día 1», pero **no hay capa de traducción todavía**.
8. **Sin analítica.** Ninguna instrumentación de eventos.
9. **Sin imágenes ni ilustraciones propias.** El diseño tira de tipografía y bloques de color.
10. **Sin página de privacidad/términos** (necesaria antes de cobrar en España).
11. **Sin onboarding**: no hay pantalla de objetivo/edad/nivel al registrarse.

---

## 7. Qué hacer a continuación (orden recomendado)

**Prioridad 0 — cerrar el circuito real**
1. Crear `.env.local` con las credenciales y probar registro + XP contra Supabase de verdad.
2. Verificar las firmas de las RPCs (§4) y ajustar `lib/submit.ts` / `lib/auth.tsx` si no coinciden.
3. Desplegar en Vercel (`vercel` CLI o import del repo). Añadir el dominio de Vercel a
   *Authentication → URL Configuration* en Supabase.

**Prioridad 1 — lo que desbloquea ingresos**
4. Stripe Checkout + webhook → tabla `subscriptions` → flag `profiles.is_pro`.
5. Páginas legales (privacidad, términos, cookies) — obligatorias para cobrar en la UE.
6. Landing de pre-venta separada del producto, para el test de 10 pre-ventas a 39 €/año que describe
   el plan de negocio.

**Prioridad 2 — producto**
7. Onboarding de 3 pantallas (objetivo, minutos/día, nivel).
8. Capa i18n real (probablemente `next-intl`) con `es` como locale por defecto y `en` preparado.
9. Ejecución de código para el curso de programación.
10. PWA (`manifest.json` + service worker + iconos) — es lo que permite el «instala la app».

**Prioridad 3 — escala de contenido**
11. Completar los 27 cursos de catálogo vacíos, o borrarlos si no se van a usar (decisión pendiente).
12. Analítica de producto (eventos: lección iniciada, completada, abandono, conversión a PRO).

---

## 8. Convenciones y trampas conocidas

**Haz**
- Español en todo: copy, nombres de variables de dominio, comentarios. Se acepta inglés en nombres
  técnicos estándar (`useState`, `onClick`).
- Contenido nuevo de lecciones → **siempre** en `content/courses/*.ts`, nunca en la BD a mano; después
  `npm run seed:build` y cargar `supabase/seed.sql`.
- Ejecuta `npm run typecheck && npm run build` antes de dar algo por terminado.
- Commits en español, con prefijo (`feat:`, `fix:`, `chore(ui):`).

**No hagas (ya falló antes)**
- **No crees un directorio `courses/` en la raíz**: colisiona con `app/(app)/courses` en el build.
  Por eso existe `content/courses/`.
- **No uses `localStorage` durante el render**: rompe el SSR. Va siempre dentro de `useEffect`.
- **No añadas la clave `eslint` a `next.config.ts`**: en Next 16 ese campo ya no es válido y rompe
  el build.
- **No intentes llamar a `*.supabase.co` por REST** desde el sandbox del agente: no hay salida de red
  a ese dominio. Hay que usar el conector de Supabase o hacerlo desde la app desplegada.
- `scripts/build-seed.ts` es sensible a llaves/paréntesis: si al editarlo aparece «Unexpected end of
  file», revisa el bloque `if (!process.env.SEED_NO_MIRROR) { … }` antes que nada.
- No edites `supabase/seed.sql` a mano: se regenera.

**Credenciales**
- Nunca en el repo. `.env.local` está en `.gitignore`; `.env.example` documenta las variables.
- `NEXT_PUBLIC_FORCE_DEMO=1` fuerza el modo demo aunque haya credenciales (útil para demos).

---

## 9. Comandos

```bash
npm run dev          # servidor en 0.0.0.0:3000 (Turbopack)
npm run build        # build de producción
npm start            # sirve el build en 0.0.0.0:3000
npm run typecheck    # tsc --noEmit
npm run seed:build   # content/ → supabase/seed.sql
npm run smoke        # integridad del currículo (4/7/8/31/124, XP, minutos)
```

No hay script `lint` ni `test`: se quitaron porque no había linter ni suite configurados. Si quieres
linting, añade ESLint + config de Next y crea el script.

---

## 10. Contexto de negocio para no tomar decisiones incoherentes

- **Precio**: 12,99 €/mes o 79 €/año (≈38 % de ahorro). No cambiar a USD ni a $4.99: el mercado es
  hispanohablante y ese es el ancla del plan.
- **Economía**: LTV bruto ≈79 €, CAC máximo ≈25 €. 3 suscriptores cubren la infraestructura.
- **Kill criteria**: si D30 < 15 % o no hay 100 PRO en 6 meses, se replantea. Escríbelo, no lo
  escondas.
- **Restricción de honestidad**: nada de testimonios inventados, ni cifras de usuarios falsas, ni
  promesas de ingresos. Ya se ha respetado en el copy actual (la landing dice explícitamente «sin
  testimonios inventados»). **Mantén esa línea.**
- **Dependencia de afiliados**: hay `affiliate_tools` y `record_affiliate_click`. Se puede monetizar
  con enlaces, pero con disclosure visible («si aparece en una lección, es porque lo usamos»).

---

## 11. Checklist de arranque para Claude Code

- [ ] `npm install && npm run typecheck && npm run build` sin errores
- [ ] `npm run dev` y abrir las 9 rutas
- [ ] Leer `docs/PLAN-LEVELUP.md` (al menos titulares y economía)
- [ ] Comprobar §4 y decidir si se verifican las RPCs ahora o más tarde
- [ ] Elegir **una** tarea de §7 y no abrir tres frentes a la vez
