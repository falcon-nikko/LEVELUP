# LEVELUP v5 · PLAN MAESTRO

> Documento de decisión. Se escribe **antes** de tocar código.
> Fecha: 2026-11-14 · Rama: `arena/7873e08d-levelup`

---

## 0. Diagnóstico honesto de la v4

| Problema | Evidencia | Consecuencia |
|---|---|---|
| Las lecciones no enseñan | El player arranca directo en el ejercicio; no hay fase teórica | El usuario adivina en vez de aprender. "Empiezan desde 0" es imposible hoy |
| Preguntas triviales | 3-5 ejercicios por lección, casi todos MC de reconocimiento | No hay carga cognitiva real ni transferencia |
| Sin gráficos | `contextCodeOrCard` es un `<pre>` de texto | Split-attention: el texto y el concepto van separados |
| Contenido fino | 12 lecciones en total (3 por ruta) | No hay currículo, hay un demo |
| UI con tells de AI slop | Eyebrows `UNIDAD 1` en mayúsculas + tracking ancho, badges decorativos `01 · AI`, `animate-ring-pulse` / `animate-flicker` en bucle infinito, copy con `¡!` | Se ve generada, no diseñada |
| Sin repaso espaciado real | Los fallos viven solo en memoria de la sesión | Se pierde el mecanismo de aprendizaje más potente |

---

## 1. Dirección de diseño (5 líneas, obligatorio antes de editar)

- **Producto:** entrenamiento diario de habilidades digitales que se pagan, para gente que quiere ejecutar (no coleccionar cursos).
- **Carácter:** directo, táctil, un poco juguetón; cero postureo.
- **Una decisión visual fuerte por pantalla:** en la ruta es el camino serpenteante; en la lección es el panel de feedback; en la liga es el podio. Todo lo demás retrocede.
- **Color = significado, nunca decoración:** verde = correcto/primario, azul = información, rojo = vidas/error, amarillo = gemas/XP, naranja = racha. Las superficies son una única rampa neutra.
- **Prueba del template:** si cambio "LEVELUP" por el nombre de otra app y la pantalla sigue encajando, la pantalla está mal.

### 1.1 Lista prohibida (auditable con grep)

```
Prohibido:
- Gradientes morados/azules, glows, sombras de color, halos radiales, blobs
- Emoji como iconos (solo Lucide, 16-20px, stroke 1.5-2.8, color de texto)
- Eyebrows en MAYÚSCULAS con tracking ancho como decoración
- Numeración decorativa (01 / 02 / 03) cuando el contenido NO es una secuencia
- Saludos tipo "¡Bienvenido de vuelta, Ana! 👋"
- Exclamaciones en copy de sistema (una como máximo en celebraciones)
- Animaciones en bucle infinito (pulse, shimmer, flicker)
- Diez tonos del mismo color donde bastan 3 roles de texto
- Sombras en todos los elementos (solo en lo que se puede pulsar)
```

### 1.2 Sistema espacial y tipográfico

- Grid de **4px**. Dentro de un grupo < entre grupos. Cosas iguales, tamaños iguales.
- Filas de navegación 44-52px (táctil). Radio: 12px elementos, 16px tarjetas, 9999px solo en barras/progreso.
- **3 roles de texto** (no 10 grises): `ink #4B4B4B`, `muted #777777`, `faint #AFAFAF`. Títulos en `navy #042C60`.
- Escala: 11 / 12.5 / 14 / 17 / 22 / 30 / 40. Peso: 600 cuerpo, 800 títulos. Nada de 300.
- Sombras = "lip" duro `0 4px 0 <dark>` **solo** en elementos pulsables. Es la firma táctil del producto.
- Movimiento que explica: hover, press, una entrada. Nunca decorativo en bucle.

---

## 2. Arquitectura pedagógica (basada en evidencia)

Reglas que gobiernan **cada** lección. No son sugerencias.

1. **Definitions → retrieval.** Contenido de baja interactividad (qué es X) se enseña obligando a generar la respuesta, no mostrando la solución. *(El worked-example effect se invierte aquí.)*
2. **Procedures → worked example.** Contenido de alta interactividad (calcular BE ROAS, montar un pipeline, escribir RLS) se enseña con un ejemplo **completamente resuelto** antes de pedir nada.
3. **Etiquetas integradas.** Todo dato de un diagrama va **dentro** del diagrama. Nada de "ver leyenda abajo". *(Split-attention effect.)*
4. **Self-explanation prompt.** Después de cada ejemplo resuelto, una pregunta de "¿por qué funciona el paso N?". Mejora transferencia.
5. **Faded scaffolding.** El segundo ejercicio del mismo procedimiento se entrega con pasos incompletos (completion problem), no en blanco.
6. **Expertise reversal.** `experienceLevel` controla el andamiaje:
   - `beginner` → teoría completa + ejemplos resueltos + pistas activas
   - `intermediate` → teoría colapsable + ejemplos + pistas bajo demanda
   - `advanced` → botón "Ir directo a los problemas", teoría disponible pero no obligatoria
7. **Interleaving para discriminar.** Cofres y retos finales mezclan ejercicios de lecciones distintas **con apariencia similar y solución distinta** (p. ej. dos emails fríos que parecen iguales pero uno quema el dominio).
8. **Escalera de dificultad + aterrizaje suave.** Dentro de la lección: reconocimiento → producción restringida → producción libre → escenario → **último ítem fácil**. Se termina en éxito.
9. **Error seguro.** Fallar cuesta una vida pero la barra de progreso **no retrocede**; el ítem vuelve a la cola de repaso; el feedback explica, no regaña.
10. **Una idea por tarjeta.** Nada de párrafos de 200 palabras: bloques atómicos de 40-70 palabras.

### 2.1 Anatomía obligatoria de una lección

```
1. APERTURA (1 tarjeta)      Qué vas a saber hacer al terminar, en una frase concreta
2. TEORÍA DESDE CERO (3-4)   Concepto atómico + diagrama integrado + "por qué importa"
3. EJEMPLO RESUELTO (1-2)    Procedimiento completo paso a paso con números reales
4. PROMPT DE AUTOEXPLICACIÓN ¿Por qué funciona el paso crítico?
5. PRÁCTICA GUIADA (4-5)     Reconocimiento → producción restringida (ordering/pairing)
6. PRÁCTICA LIBRE (4-5)      Producción libre: numeric, bug hunt, output prediction
7. DISCRIMINACIÓN (2)        Dos casos parecidos, tratamiento distinto
8. TRANSFERENCIA (1-2)       Decisión real con restricciones en conflicto
9. ATERRIZAJE (1)            Ítem fácil + recap de 3 puntos
10. TAREA PRÁCTICA           Algo que se ejecuta fuera de la app, con herramienta real
```

Total: **12-15 preguntas** por lección. 28 lecciones → **~370 preguntas**.

### 2.2 Taxonomía de formatos (10)

| Formato | Qué evalúa | UI |
|---|---|---|
| `concept` | Retrieval de definición | 4 opciones, una correcta |
| `worked_why` | Comprensión del ejemplo resuelto | MC sobre el paso crítico |
| `output` | Predicción de salida exacta (código/prompt/config) | Tarjeta de código + 4 salidas |
| `bug_hunt` | Detectar el error real | 4 líneas numeradas, señalar la culpable |
| `ordering` | Producción restringida (prompt, SQL, pipeline, email) | Banco de bloques + zona de montaje |
| `faded` | Completion problem | Orden con 2 pasos ya colocados y bloqueados |
| `numeric` | Cálculo real con tolerancia | Input numérico + unidad + margen ± |
| `pairing` | Discriminación concepto↔caso | 2 columnas, emparejar por clic |
| `discrimination` | Elegir tratamiento para casos similares | 2 escenarios lado a lado |
| `scenario` | Decisión con tradeoffs | MC con opciones que cuestan algo distinto |

Cada ejercicio lleva `difficulty: 1..5` y la lección se ordena por dificultad ascendente con cierre suave.

---

## 3. Mapa curricular · 28 lecciones

Estructura por ruta: **Unidad 1 = 4 lecciones** (fundamentos) + cofre + reto final · **Unidad 2 = 3 lecciones** (producción) + cofre + reto final. 11 nodos jugables por ruta, 44 en total.

### 3.1 AI & Automation (`ai`) — acento Macaw `#1CB0F6`

| # | Slug | Título | Objetivo medible |
|---|---|---|---|
| 1 | `ai-01-como-piensa-un-llm` | Cómo piensa un LLM (y por qué alucina) | Explicar token, temperatura y ventana de contexto, y predecir cuándo un modelo inventará datos |
| 2 | `ai-02-prompts-deterministas` | Prompts que no dependen de la suerte | Escribir un prompt R-C-T-F con contrato de salida y 2 few-shots |
| 3 | `ai-03-salida-json` | Salida estructurada que no rompe producción | Diseñar schema JSON, validar, y montar el reintento ante parser error |
| 4 | `ai-04-rag-desde-cero` | RAG desde cero: cuando el modelo no sabe tu negocio | Decidir chunking, top-k y umbral de similitud, y saber cuándo NO usar RAG |
| 5 | `ai-05-pipelines-make-n8n` | Pipelines en Make/n8n que sobreviven a un error | Montar webhook→LLM→validar→escribir→alertar con ruta de error e idempotencia |
| 6 | `ai-06-agentes-con-herramientas` | Agentes con herramientas (y cuándo no usarlos) | Describir el bucle tool-calling, límites de iteraciones y guardrails |
| 7 | `ai-07-vender-automatizacion` | Vender automatización a una empresa real | Calcular el valor de horas ahorradas, acotar el alcance y precio un proyecto |

### 3.2 Modern Coding (`code`) — acento Feather `#58CC02`

| # | Slug | Título | Objetivo medible |
|---|---|---|---|
| 1 | `code-01-javascript-real` | JavaScript que se rompe solo (y cómo evitarlo) | Predecir salida de `==` vs `===`, `map` vs `forEach`, async/await y closures |
| 2 | `code-02-typescript-utiles` | TypeScript útil, no ceremonioso | Tipar props, uniones, genéricos básicos y leer un error de tipos |
| 3 | `code-03-funciones-limpias` | Funciones que se leen una vez | Refactorizar a early return, pureza y un solo nivel de abstracción |
| 4 | `code-04-react-modelo-mental` | El modelo mental de React | Predecir re-renders, dependencias de `useEffect`, keys y estado derivado |
| 5 | `code-05-next-app-router` | Next.js App Router sin humo | Decidir Server vs Client Component y dónde va cada fetch |
| 6 | `code-06-sql-para-apps` | SQL para apps reales | Escribir JOIN + GROUP BY + WHERE correcto y saber qué índice falta |
| 7 | `code-07-supabase-rls` | Supabase y RLS: seguridad de verdad | Escribir políticas que no filtran datos y detectar el bug de RLS clásico |

### 3.3 Smart Dropshipping (`ecom`) — acento Fox `#FF9600`

| # | Slug | Título | Objetivo medible |
|---|---|---|---|
| 1 | `ecom-01-unit-economics` | La matemática antes que el producto | Calcular margen de contribución por unidad con COGS, envío, fees y devoluciones |
| 2 | `ecom-02-roas-equilibrio` | BE ROAS: el número que decide todo | Calcular BE ROAS = 1/margen, CPA máximo y decidir si escalar o matar |
| 3 | `ecom-03-validacion-datos` | Validar con datos, no con corazonadas | Aplicar criterios de kill y dimensionar un test con presupuesto real |
| 4 | `ecom-04-tienda-conversion` | Tienda que convierte en móvil | Diagnosticar fugas de conversión en PDP, confianza y checkout |
| 5 | `ecom-05-creativos-ugc` | Creativos UGC que paran el scroll | Estructurar hook 0-3s, demo, prueba y CTA; leer thumbstop y decidir iteración |
| 6 | `ecom-06-estructura-ads` | Estructura de campaña y lectura de métricas | Decidir ABO/CBO, presupuesto de test y cuándo matar un conjunto |
| 7 | `ecom-07-escala-caja` | Escalar sin morir de caja | Calcular necesidad de caja con lead time y planear LTV/retención |

### 3.4 Digital Agency B2B (`agency`) — acento Bee `#FFC800`

| # | Slug | Título | Objetivo medible |
|---|---|---|---|
| 1 | `agency-01-nicho-icp` | Nicho e ICP: por qué estrechar gana | Definir ICP con atributos verificables y disqualifiers |
| 2 | `agency-02-oferta-valor` | La oferta y la ecuación de valor | Construir oferta con resultado, probabilidad, plazo y esfuerzo; elegir modelo de precio |
| 3 | `agency-03-infra-entregabilidad` | Infraestructura que no quema tu dominio | Calcular dominios/mailboxes para X envíos/día con SPF+DKIM+DMARC y warmup |
| 4 | `agency-04-copy-secuencia` | Copy y secuencia de 4-7 toques | Escribir primer email <80 palabras y ordenar una secuencia real |
| 5 | `agency-05-senales-listas` | Listas y señales: de 1% a 8% de respuesta | Elegir señal por tasa de respuesta y calcular costes de lista |
| 6 | `agency-06-llamada-cierre` | La llamada: diagnóstico y cierre | Ordenar la estructura de llamada y responder objeciones aislando la causa |
| 7 | `agency-07-entrega-retencion` | Entrega, informes y retención | Montar onboarding de 14 días, calcular churn y planear subida de precio |

### 3.5 Nodos especiales por unidad

- **Cofre de repaso** (4 ítems entrelazados de la unidad, +10 gemas). Sin vidas: es repaso, no examen.
- **Reto final / boss** (6 ítems + tarea práctica, +25 XP +15 gemas). Con barra de vida del boss: cada acierto hace daño, cada fallo te cuesta una vida y el boss "contraataca".

---

## 4. Sistemas de juego (nuevos)

1. **Boss battle real.** El boss tiene HP = número de ítems. Acierto → animación de daño. Fallo → shake + vida perdida. Victoria → botín (XP + gemas) con desglose.
2. **Practice Hub (`/practice`).** Tres modos sobre datos reales del usuario:
   - *Repaso inteligente*: extrae del ledger de fallos (`mistake_keys`) con espaciado (fallado hoy → vuelve en 1 día; 2 aciertos → 3 días).
   - *Reto relámpago*: 60 s, combo ×2 a partir de 3 aciertos seguidos.
   - *Legendario*: repite una lección completada sin fallos → insignia + 1.5× XP.
3. **Ledger de fallos persistente.** Nueva columna `mistake_keys text[]` en `profiles`; se alimenta al fallar y se limpia al acertar dos veces.
4. **Calendario de racha.** Modal con mes real, días activos, racha actual/máxima y congeladores.
5. **Boost de XP.** Al completar una unidad: 15 min de ×2 XP (columna `xp_boost_until`). Afecta a `award_xp` server-side.
6. **Tarjeta compartible.** Genera una tarjeta SVG con racha/nivel/XP y botón de descarga → bucle de crecimiento real.

---

## 5. Base de datos (migración 004)

```sql
ALTER TABLE public.profiles
  ADD COLUMN mistake_keys text[] DEFAULT '{}',       -- ledger de repaso espaciado
  ADD COLUMN xp_boost_until timestamptz,             -- ×2 temporal
  ADD COLUMN streak_freezes integer DEFAULT 0,
  ADD COLUMN legendary_slugs text[] DEFAULT '{}',    -- lecciones perfectas
  ADD COLUMN lessons_completed_count integer DEFAULT 0;
```
`award_xp` se actualiza para aplicar el boost y para registrar intentos por ejercicio. Todo server-side: el navegador no puede inflar nada.

---

## 6. Plan de ejecución (orden de commits)

| Fase | Entregable | Verificación |
|---|---|---|
| 1 | Este plan + `CURRICULUM_MAP.md` + `DESIGN_SYSTEM.md` | docs leíbles |
| 2 | `types.ts` + `authoring.ts` (esquema y DSL compacto bilingüe) | `tsc` |
| 3 | `Diagram.tsx` — 11 tipos de gráfico data-driven, etiquetas integradas | render en lección |
| 4 | 28 lecciones en `courses/{ai,code,ecom,agency}.ts` | 370+ ejercicios, `tsc` |
| 5 | Lesson Player v2: fase teoría → ejemplos → práctica, 10 formatos, boss, numeric, pairing | jugar una lección entera |
| 6 | Migración 004 + contexto (ledger, boost, legendary) | RPC probado |
| 7 | Ruta v2 (popup Review/Legendary, decoración temática) + Practice Hub + calendario de racha | rutas 200 |
| 8 | Pase anti-slop global + mascota + micro-interacciones | grep de tells = 0 |
| 9 | GTM: `docs/GTM_SOCIAL_PLAN.md` + `social/` con 30 días de contenido listo para publicar | archivos listos |
| 10 | Build, arranque, verificación de las 12 rutas, commit y push | preview vivo |

---

## 7. Criterios de aceptación (lo que se comprueba al final)

- [ ] ≥ 25 lecciones (objetivo 28), cada una con 12-15 preguntas reales.
- [ ] Toda lección arranca con teoría desde cero + ejemplo gráfico integrado.
- [ ] Los 10 formatos de ejercicio funcionan en el player.
- [ ] Preguntas semi-complejas: cálculos con tolerancia, predicción de salida, caza de bugs, discriminación, escenarios con tradeoffs.
- [ ] Cero tells de AI slop (grep limpio) y cero superficies negras.
- [ ] Liga y XP siguen siendo 100% reales y server-side.
- [ ] `tsc --noEmit` y `next build` en verde; las 12 rutas responden.
- [ ] Contenido de redes sociales entregado y publicable tal cual.
