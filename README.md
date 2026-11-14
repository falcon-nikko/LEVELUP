# LEVELUP

**Entrenamiento diario de habilidades digitales que se pagan.** 10-15 minutos al día,
con números reales y una tarea que se ejecuta fuera de la app.

*Daily training in the digital skills that get paid. Bilingual ES / EN.*

No es un catálogo de cursos. Es una práctica diaria con vidas, racha, liga semanal
y un ledger de fallos que vuelve: 4 rutas, **28 lecciones**, **364 ejercicios**,
**10 formatos** de pregunta distintos.

---

## Las cuatro rutas

| Ruta | Unidades | Lecciones | De qué va |
|---|---|---|---|
| **IA & Automatización** | 2 | 7 | Cómo piensa un LLM, prompts deterministas, salida JSON, RAG desde cero, pipelines en Make/n8n, agentes con herramientas, vender automatización |
| **Código Moderno** | 2 | 7 | JavaScript real, TypeScript útil, funciones limpias, modelo mental de React, Next App Router, SQL para apps, Supabase y RLS |
| **E-commerce** | 2 | 7 | Unit economics, ROAS de equilibrio, validación con datos, tienda que convierte, creativos UGC, estructura de ads, escala y caja |
| **Agencia Digital** | 2 | 7 | Nicho e ICP, oferta de valor, infraestructura de entregabilidad, copy y secuencia, señales y listas, llamada de cierre, entrega y retención |

Cada lección termina con una **tarea práctica** en una herramienta real, con prueba
de haberla hecho. Las 28 la tienen.

---

## Cómo enseña (y por qué)

Las reglas están escritas en [`docs/PLAN_V5_MASTER.md`](docs/PLAN_V5_MASTER.md) §2 y
se aplican a **todas** las lecciones, no son sugerencias:

1. **Definiciones → recuperación activa.** Si el material es de baja interactividad,
   se obliga a generar la respuesta. El efecto del ejemplo resuelto se invierte aquí.
2. **Procedimientos → ejemplo resuelto primero.** Calcular un BE ROAS, montar un
   pipeline o escribir una política RLS se enseña con el procedimiento completo,
   con números, antes de pedir nada.
3. **Etiquetas integradas.** Todo dato va **dentro** del diagrama. Nada de "ver
   leyenda abajo" (split-attention effect).
4. **Prompt de autoexplicación** después de cada ejemplo: "¿por qué funciona el
   paso 3?". Es lo que más transferencia produce y lo que casi nadie pone.
5. **Andamiaio desvanecido.** El segundo ejercicio del mismo procedimiento llega
   con pasos ya colocados, no en blanco.
6. **Interleaving** en cofres y retos finales: ejercicios de lecciones distintas que
   se parecen y no se resuelven igual.
7. **Escalera de dificultad con aterrizaje suave.** Se termina siempre en éxito.
8. **Error seguro.** Fallar cuesta una vida, la barra de progreso **no retrocede**,
   el ítem vuelve a la cola y la explicación dice por qué, no que estés mal.
9. **Una idea por tarjeta.** Bloques de 40-70 palabras.

Anatomía obligatoria de una lección: apertura → teoría desde cero → ejemplo
resuelto → autoexplicación → práctica guiada → práctica libre → discriminación →
transferencia → aterrizaje → tarea.

---

## Progresión 100 % server-side

Ningún número de progreso se decide en el navegador. Todo pasa por funciones
`SECURITY DEFINER` de Supabase (migraciones `001`-`004`):

| Función | Qué decide |
|---|---|
| `award_xp` | XP, racha, gemas. Duplica mientras hay boost activo, absorbe un día perdido con un congelador y regala uno cada 7 días de racha (máximo 2 guardados) |
| `log_exercise_attempt` | Ledger de fallos: guarda `lección#ejercicio` al fallar, lo borra al acertar, tope de 60 |
| `activate_xp_boost` | Gasta 30 gemas por 15 minutos de XP doble; se acumula extendiendo |
| `record_lesson_completion` | Registro de lecciones, contador y rango **legendario** por ronda perfecta (20 gemas, una sola vez) |
| `refresh_hearts` / `consume_heart` | Vidas |
| `get_weekly_league` / `get_league_window` | Liga semanal real, con ventana y privacidad |

---

## Rutas de la app

| Ruta | Qué es |
|---|---|
| `/` | Landing; redirige a `/learn` si hay sesión |
| `/auth` | Registro y acceso (pública) |
| `/onboarding` | Elección de ruta, nivel y meta diaria |
| `/learn` | Camino serpenteante con popup de nodo: Jugar, Repaso (×0,4) y Legendario |
| `/lesson/[slug]` | Player: teoría → ejemplos → práctica, además de `chest-<unidad>`, `boss-<unidad>`, `?mode=review` y `mistakes` |
| `/practice` | Hub: progreso de ruta, fallos vivos por lección, boost de XP doble, cofres y retos, estantería de legendarias y calendario de racha |
| `/quests` | Misiones diarias y semanales |
| `/leaderboard` | Liga semanal con podio y promoción |
| `/stack` | Las 16 herramientas del catálogo, con su lección asociada |
| `/vault` | Recursos y plantillas |
| `/profile` | Perfil, estadísticas e historial |
| `/pro` | Suscripción (12,99 $/mes · 79 $/año) |
| `/api/affiliate/click` | Registro de clics de afiliado |

Sin sesión, todas las rutas privadas devuelven `307 → /auth?next=<ruta>`.

---

## Diseño: Bright Arcade

Paleta derivada del sistema de Duolingo, sin una sola superficie negra:
verde `#58CC02` (correcto/primario), azul `#1CB0F6` (información), rojo `#FF4B4B`
(vidas/error), amarillo `#FFC800` (gemas/XP), naranja `#FF9600` (racha), y una única
rampa neutra. **Color = significado, nunca decoración.**

- Sombras tipo "lip" duro `0 4px 0` **sólo** en lo que se puede pulsar. Es la firma
  táctil del producto.
- Grid de 4 px, filas de navegación de 44-52 px, tres roles de texto (no diez grises).
- **Movimiento que explica:** hover, press y una entrada. Ningún bucle infinito.
- **SUBE**, la mascota: un bicho-escalón amarillo con la flecha de la marca
  saliéndole de la cabeza, dibujado como SVG inline en
  [`src/components/Mascot.tsx`](src/components/Mascot.tsx). Seis estados de ánimo
  que cambian ojos, boca, brazos y una gota de sudor; aparece donde pasa algo.

La lista prohibida completa y auditable con grep está en `PLAN_V5_MASTER.md` §1.1.

---

## Desarrollo local

```bash
cp .env.example .env.local   # y pon tu anon key real
npm install
npm run dev                  # http://localhost:3000
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en `0.0.0.0:3000` |
| `npm run build` | Build de producción (14 rutas) |
| `npm run start` | Sirve el build en `0.0.0.0:3000` |
| `npm run lint` | `tsc --noEmit` en modo estricto |

Auditoría del currículo contra los criterios de aceptación:

```bash
npx tsx scripts/curriculum-audit.ts
```

Imprime lecciones, ejercicios, reparto por formato, rango de preguntas por lección,
bloques de teoría, ejemplos resueltos, diagramas integrados, tareas y cobertura de
tolerancia en los numéricos.

---

## Mapa del repositorio

```
src/
  app/                    12 páginas + /api/affiliate/click
  components/
    Mascot.tsx            SUBE, la mascota (SVG inline, 6 estados)
    StreakCalendar.tsx    calendario de racha de 12 semanas, lunes primero
    AppShell.tsx          navegación, HUD y atajos globales
    diagrams/Diagram.tsx  12 tipos de gráfico data-driven, etiquetas dentro
    lesson/               ExerciseBody (10 formatos) y LessonStages (fases)
  context/LevelUpContext  estado del operador + llamadas RPC
  lib/
    curriculum/           types, authoring, grading, tracks, path, vault, affiliates
      courses/            las 28 lecciones: {ai,code,ecom,agency}-unit-{1,2}.ts
    i18n/dictionaries.ts  ES y EN, clave a clave
    supabase/             cliente, servidor, sesión por cookie, liga

docs/
  PLAN_V5_MASTER.md       dirección de diseño, pedagogía, mapa curricular, plan y aceptación
  GTM_SOCIAL_PLAN.md      estrategia social de 30 días
  STARTUP_PLAN.md         negocio y monetización
  ROADMAP_8_FASES.md      hoja de ruta original

social/                   contenido listo para publicar
  calendar.csv            30 días: canal, pilar, tema, CTA, activo, hora
  hooks.md                40 primeras líneas reutilizables
  posts/day-01..30.md     copy completo ES, EN, X y 5 guiones verticales
  metrics.csv             cabecera para anotar resultados

scripts/curriculum-audit.ts
supabase/migrations/001..004
```

---

## Monetización

Doble motor, sin dark patterns:

1. **LEVELUP PRO** — 12,99 $/mes o 79 $/año: vidas infinitas, catálogo completo,
   boost de XP y estadísticas extendidas. La suscripción se actualiza desde el
   propio cliente (migración `003`).
2. **Afiliados contextuales** — 16 herramientas reales, cada una atada a la lección
   donde se usa. El clic se registra por API con un tope de 4 segundos para que
   nunca bloquee la interfaz, y los posts que llevan enlace incluyen el aviso
   **dentro** del texto.

---

## Documentación

- [`docs/PLAN_V5_MASTER.md`](docs/PLAN_V5_MASTER.md) — el documento que gobierna el
  producto: diseño, pedagogía basada en evidencia, mapa de las 28 lecciones,
  esquema de base de datos, plan de 10 fases y criterios de aceptación verificados.
- [`docs/GTM_SOCIAL_PLAN.md`](docs/GTM_SOCIAL_PLAN.md) — posicionamiento, ICP,
  canales, pilares, reglas de copy y métricas con umbral de decisión.
- [`docs/STARTUP_PLAN.md`](docs/STARTUP_PLAN.md) — plan de negocio.
- [`docs/ROADMAP_8_FASES.md`](docs/ROADMAP_8_FASES.md) — hoja de ruta inicial.
