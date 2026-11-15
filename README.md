# LEVELUP

App de microaprendizaje tipo Duolingo para aprender **programación, IA y negocios digitales** en
lecciones de 5 minutos. En español, sin promesas de ingresos y con una acción ejecutable al final de
cada lección.

- **Plan de negocio completo:** [`docs/PLAN-LEVELUP.md`](docs/PLAN-LEVELUP.md)
- **Traspaso a otro agente / Claude Code:** [`BRIEF_CLAUDE_CODE.md`](BRIEF_CLAUDE_CODE.md)
- **App en vivo:** `npm run dev` → http://localhost:3000

## Estado

| | |
|---|---|
| Cursos | 7 |
| Unidades | 8 |
| Lecciones | 31 |
| Ejercicios | 124 |
| Mundos | 4 (Negocios, Programación, IA, Finanzas) |

Funciona **sin configurar nada**: arranca en modo demo con el progreso guardado en el navegador.
Con credenciales de Supabase se activan cuentas reales, XP atómico en servidor y ligas.

## Diseño

Estética **neo-brutalista**: fondo crema (`#fdf9f0`), bordes negros de 2px, sombras duras sin blur y
tres acentos —amarillo `#e2fa32`, lila `#c9a8f5` y menta `#a7e8c4`—. Tipografía display *Archivo
Black* para titulares, *Inter* para texto. Los tokens viven en `app/globals.css` (`@theme`):
`bg-cream`, `bg-yellow-brand`, `bg-purple-brand`, `bg-mint-brand`, `border-ink`, `shadow-hard`.

Clases base: `.card` / `.card-tight` (superficie con borde y sombra), `.btn` + `.btn-primary` /
`.btn-purple` / `.btn-mint` / `.btn-ghost` (los botones se hunden al pulsar), `.chip`, `.progress`.

## Arrancar

```bash
npm install
npm run dev          # http://localhost:3000
```

### Con Supabase (cuentas reales)

1. Copia `.env.example` a `.env.local` y rellena las dos variables.
2. Carga el contenido:

```bash
npm run seed:build   # regenera supabase/seed.sql desde content/
# pega supabase/seed.sql en el SQL Editor de Supabase y ejecútalo
```

3. Añade tu dominio en Supabase → Authentication → URL Configuration.

Sin esas dos variables la app detecta el modo demo automáticamente. Para forzarlo:
`NEXT_PUBLIC_FORCE_DEMO=1`.

## Estructura

```
app/
  page.tsx              Landing pública
  (app)/learn           Ruta tipo Duolingo + misiones diarias
  (app)/learn/[id]      Reproductor de lección (teoría → ejercicios → resultado)
  (app)/courses         Catálogo filtrable
  (app)/leagues         Liga semanal
  (app)/profile         Progreso, logros, plan
  (app)/pro             Gratis vs PRO
  (auth)/signin|signup  Autenticación Supabase
components/             LessonPlayer, ExerciseView, PathNode, TopBar, QuestPanel…
lib/
  auth.tsx              Sesión + perfil, con fallback demo
  progress.ts           Motor de XP/racha/gemas (réplica cliente de las RPC)
  lesson-engine.ts      Evaluación de los 6 tipos de ejercicio
  submit.ts             Persistencia (Supabase o local)
  quests.ts             Misiones diarias
content/
  curriculum.ts         Fuente de verdad del currículo
  courses/*.ts          Un archivo por curso
supabase/seed.sql       Generado: mundos, cursos, unidades, lecciones, ejercicios
scripts/                build-seed.ts · smoke.ts
docs/PLAN-LEVELUP.md    Plan de negocio
```

## Tipos de ejercicio

`multiple_choice` · `true_false` · `multi_select` · `ordering` · `fill_blank` · `simulation`

Todas las respuestas se guardan como JSON estructurado (`correct`), lo que permite evaluarlas en
cliente y validar el seed automáticamente.

## Comandos

```bash
npm run dev          # servidor de desarrollo
npm run build        # build de producción
npm run typecheck    # TypeScript
npm run seed:build   # regenera supabase/seed.sql desde content/
npm run smoke        # verificaciones del dominio (evaluación, XP, desbloqueo)
```

## Diseño editorial

1. Máximo 120 palabras de teoría por lección.
2. Una idea clave en una frase y una acción ejecutable.
3. 4 ejercicios por lección: 60% reconocimiento, 40% decisión.
4. Cero promesas de ingresos; toda cifra financiera lleva su riesgo al lado.

> Contenido educativo. Nada de lo publicado constituye asesoramiento financiero.
