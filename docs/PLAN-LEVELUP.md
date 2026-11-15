# LEVELUP — Plan de negocio y producto

> Versión 0.1 · Noviembre 2026 · Documento de trabajo para un fundador en solitario con presupuesto ~0 €.

---

## 1. Resumen ejecutivo

**Qué es.** LEVELUP es una app de microaprendizaje en formato Duolingo que enseña habilidades que se traducen en dinero: programar, usar IA de forma rentable y montar negocios digitales (dropshipping con criterio, agencia B2B, validación de startups). Cada lección dura 3-5 minutos, se juega con mecánicas de racha, XP y ligas, y termina en una **acción ejecutable hoy**.

**Lo que ya está construido** (en este repositorio):

| Pieza | Estado |
|---|---|
| Currículo | 7 cursos, 8 unidades, **31 lecciones**, **124 ejercicios**, 855 XP repartidos |
| App web | Next.js 16 + React 19 + Tailwind 4, responsive, PWA-ready |
| Gamificación | Rachas con congeladores, corazones con recarga, gemas, XP semanal, ligas, misiones diarias, 18 logros |
| Backend | Supabase Postgres con RLS, 14 funciones SQL (XP atómico, ligas, afiliados) |
| Modo demo | Funciona sin backend, progreso en localStorage |
| Despliegue | Vercel (Next.js) + Supabase (eu-west-1) |

**Lo que no está construido.** No hay usuarios, ni ingresos, ni validación de mercado. Este documento no asume que el producto funcione: define cómo averiguarlo barato.

**Tesis.** La educación online en español está partida en dos extremos: cursos de 500-2.000 € con 4% de finalización, y vídeos gratuitos de YouTube sin estructura. En medio no hay nada que combine **hábito** (la única variable que predice aprendizaje) con **resultado económico verificable**. Duolingo demostró que la gamificación sostiene el hábito; nadie lo ha aplicado en serio a habilidades monetizables en español.

---

## 2. Mercado y competencia

### 2.1 A quién sirve (segmento inicial, deliberadamente estrecho)

**Perfil A — "el que quiere salir"** (foco inicial): 22-32 años, España/LATAM, trabaja en algo que no le gusta o estudia algo que no le motiva, consume contenido de "ganar dinero online" pero no ejecuta. Dolor: no sabe por dónde empezar y abandona a la semana.
**Perfil B — "el que ya hace algo y quiere margen"**: freelancer o pequeño comerciante que ya vende pero con márgenes malos.

No empezamos con empresas ni con universidades: ciclos de venta largos y un solo fundador no puede atenderlos.

### 2.2 Competencia real (y por qué no estamos solos en la categoría)

| Competidor | Fuerte en | Débil en | Nuestra respuesta |
|---|---|---|---|
| **Duolingo** | Hábito, marca, 100M+ MAU | No enseña habilidades monetizables | Misma mecánica, contenido economic-specific |
| **Brilliant** | Interacción matemática de calidad | Inglés, precio alto (~25 €/mes), sin resultado económico | Español primero, precio local, foco en dinero |
| **Codecademy / freeCodeCamp** | Profundidad técnica real | 4-8% de finalización, sin hábito, sin monetización | Microlecciones de 3-5 min + racha |
| **Platzi / Domestika** | Producción, marca regional | Cursos largos, suscripción cara, baja finalización | Móvil-first, 5 min, gratis de verdad |
| **Hustler's University / gurús** | Marketing agresivo | Credibilidad cero, precios altos, promesas falsas | Anti-hype explícito, sin promesas de ingresos |
| **YouTube / TikTok** | Gratis, alcance | Sin estructura, sin progreso, sin accountability | Ruta con desbloqueo y ligas |

**El hueco:** nadie ocupa la intersección "hábito de Duolingo + contenido de dinero en español". Es un hueco real pero incómodo: el contenido de dinero atrae a la audiencia más escéptica y con más experiencia de ser estafada.

### 2.3 Tamaño de mercado (estimación de trabajo, no de inversor)

- Hispanohablantes con smartphone: ~450M.
- Personas que consumen contenido de emprendimiento/tech en español: estimación conservadora 8-15M.
- Dispuestas a pagar 10-15 €/mes por formación práctica: 1-3% → **80.000-450.000 clientes potenciales**.
- Con 0,5% de penetración del segmento pagador: **400-2.200 suscriptores** → 5.000-28.000 € MRR.

No es un mercado de 10.000M $. Es un mercado suficiente para un negocio de una persona de 30-150 k€/año, que es el objetivo realista del año 1. **Si el objetivo es venture capital, este plan no sirve: hace falta un mercado 100× mayor y un equipo.**

---

## 3. Posicionamiento

**Statement:** Para hispanohablantes que quieren ganar dinero con habilidades digitales pero abandonan todo lo que empiezan, LEVELUP es la app de 5 minutos al día que convierte el aprendizaje en un hábito con racha y en un resultado que se puede ejecutar hoy, sin promesas de ingresos y sin cursos de 2.000 €.

**Los tres pilares que no se negocian:**

1. **Hábito por encima de contenido.** Si una decisión mejora el currículo pero rompe la racha, pierde la decisión. Lección de 30 minutos = fracaso de producto.
2. **Anti-humo.** Nada de capturas de ingresos, nada de "crypto a 100k", nada de promesas de rentabilidad. Cada lección de finanzas incluye el riesgo; cada lección de negocio incluye el coste.
3. **Acción ejecutable.** Toda lección termina en una acción que se puede hacer en menos de una hora, con criterio de "hecho" claro.

**Por qué esto es defendible (a medias).** El contenido es copiable. Lo que no se copia rápido es (a) la densidad del currículo en español con criterio editorial, (b) la retención de una base de usuarios con racha, (c) la comunidad que se forma alrededor de la liga semanal. Es una defensa de ejecución y marca, no de tecnología. Un competidor con 2 M€ puede replicarlo en 6 meses; uno sin dinero, no.

---

## 4. Modelo de negocio

### 4.1 Tres fuentes de ingreso, en orden de activación

| Fuente | Cuándo | Precio | Papel |
|---|---|---|---|
| **1. Suscripción PRO** | Mes 3-4 | 12,99 €/mes · 79 €/año | Ingreso principal, predecible |
| **2. Afiliados de herramientas** | Mes 1 | 20-30% recurrente | Ingreso temprano sin fricción |
| **3. Packs verticales / B2B** | Mes 6+ | 149-499 € por pack | Ingreso puntual, valida demanda |

**Lo que NO hacemos:** publicidad display (destruye la marca y paga céntimos), venta de datos (ilegal y letal), cursos de 500 €+ (contradice el posicionamiento).

### 4.2 Por qué 12,99 € y no 9,99 € o 19,99 €

- Duolingo Super en España: ~9,99 €/mes. Brilliant: ~22 €/mes. Platzi: ~20 €/mes.
- 12,99 € queda por encima del "impulso sin pensar" pero por debajo del "necesito justificarlo". El anual a 79 € (5,4 €/equivalente mensual) es la oferta que hay que empujar: el 60-70% de los ingresos deben venir de anual para tener caja.
- **Nunca** descuentos por debajo de 60 €/año: el precio bajo atrae al usuario que más soporte consume.

### 4.3 Afiliados: la parte que hay que hacer bien

El esquema ya existe en la base de datos (`affiliate_tools`, `affiliate_clicks`) con 8 herramientas: Shopify, Make.com, n8n, Supabase, Vercel, Apollo.io, Instantly.ai, Minea.

**Reglas editoriales:**
- Una herramienta solo aparece si se usa en el método de la lección.
- Etiqueta visible de "enlace de afiliado" en todo clic.
- Nunca una recomendación pagada por posicionamiento.
- Si la herramienta empeora o cambia de precio, se actualiza la lección.

**Ingreso realista:** 1.000 visitas/mes a lecciones con herramientas × 8% de clic × 4% de conversión a pago × 25 € de comisión media = **~80 €/mes** en el escenario bueno. No es el negocio: es gasolina para el contenido gratis.

---

## 5. Economía unitaria

### 5.1 Costes reales por usuario (plan gratuito)

| Concepto | Coste/mes | Notas |
|---|---|---|
| Supabase Free | 0 € | 500 MB DB, 50k MAU. Se agota hacia los 2.000-3.000 usuarios activos |
| Vercel Hobby | 0 € | 100 GB banda. Se agota hacia los 5.000 usuarios/mes |
| Dominio | ~1 €/mes | 12 €/año |
| Herramientas (analítica, email) | 0-15 €/mes | Free tiers |
| **Total fijo año 1** | **~15-30 €/mes** | |

**Usuario activo gratuito:** ~0,00-0,01 €/mes en free tiers; ~0,02-0,05 €/mes cuando se pase a Supabase Pro (25 $) + Vercel Pro (20 $).

### 5.2 Coste de adquisición objetivo

| Canal | CAC estimado | Escalable |
|---|---|---|
| Contenido orgánico (TikTok/YouTube Shorts/IG) | 0 € + tiempo | Sí, lento |
| SEO (lecciones indexables) | ~0,5-2 € | Sí, muy lento |
| Comunidad (Reddit, Discord, Telegram) | 0 € | Limitado |
| Paid (Meta/TikTok) | 6-18 € | Solo con LTV > 25 € |
| Referidos (invita y gana gemas) | 1-3 € | Necesita masa crítica |

**Regla:** no se compra tráfico hasta que la retención D30 supere el 25%. Con D30 < 20%, el LTV no paga el CAC y cada euro invertido es una pérdida escalada.

### 5.3 LTV

Con retención mensual del 88% (churn 12%): vida media ≈ 8,3 meses.
- Mezcla de precios (60% anual / 40% mensual): ARPU efectivo ≈ 9,5 €/mes.
- **LTV bruto ≈ 79 €.** Neto de pasarela (3%) ≈ 76 €.
- **LTV/CAC objetivo:** > 3 → CAC máximo sano ≈ 25 €.

### 5.4 Punto de equilibrio

Costes fijos año 1: ~25 €/mes (infra) + 0 € (tiempo del fundador).
- **3 suscriptores mensuales** cubren los costes de infraestructura.
- **150 suscriptores** ≈ 1.400 €/mes brutos: un sueldo de subsistencia en España.
- **600 suscriptores** ≈ 5.700 €/mes: el negocio soporta a una persona y una herramienta pagada.

Esto no es una startup de venture capital. Es un negocio de software rentable desde muy abajo.

---

## 6. Producto: qué se construye y en qué orden

### 6.1 Lo construido (semana 1)

```
/                    Landing con propuesta de valor y prueba social del currículo
/learn               Ruta tipo Duolingo: nodos desbloqueables, progreso, misiones diarias
/learn/[id]          Lección: teoría 120 palabras → 4 ejercicios → resultado con acción
/courses             Catálogo filtrable por mundo y nivel
/leagues             Liga semanal con ranking en vivo y cuenta atrás
/profile             Progreso, logros, nivel, plan
/pro                  Monética: gratis vs PRO
/signin /signup      Autenticación Supabase (email + password)
```

**Detalles de producto que importan más de lo que parece:**
- El nodo siguiente vibra y dice "Empezar": la ruta siempre tiene un único siguiente paso obvio.
- La explicación aparece **después** de responder acertado, no después de fallar (refuerzo positivo inmediato).
- Toda lección desbloquea una "acción para hoy": es la diferencia entre saber y haber hecho.
- Los corazones son escasos pero la lección nunca se pierde: se puede repetir.

### 6.2 Roadmap de 12 meses

| Fase | Semanas | Objetivo | Entregable |
|---|---|---|---|
| **0. Validación** | 1-2 | 10 pre-ventas de 39 €/año | Landing de pre-venta + 30 entrevistas |
| **1. Retención** | 3-8 | D7 > 35%, D30 > 20% | Notificaciones push, repaso de errores, 3 cursos más |
| **2. Monetización** | 9-14 | Primeros 50 PRO | Stripe, paywall, prueba de 7 días |
| **3. Crecimiento** | 15-24 | 500 usuarios activos/semana | SEO de lecciones, contenido short-form, referidos |
| **4. Escala selectiva** | 25-52 | 300-600 PRO | Packs B2B, app móvil (PWA → stores), 2º idioma |

**Criterios de muerte (kill criteria).** Se abandona o se pivota si:
- Tras 30 entrevistas, menos de 3 personas pagan una pre-venta → el problema no es suficientemente caro.
- D30 < 15% con 200+ usuarios → el formato no retiene.
- 6 meses sin 100 suscriptores → el precio o el posicionamiento están mal.

Escribirlas antes de empezar es la única forma de que sean honestas.

---

## 7. Currículo: la decisión editorial

### 7.1 Orden de la ruta

La ruta arranca por **Negocios (Misiones)**, no por programación. Razón: el resultado de "enviar una oferta y conseguir una conversación" llega en 7 días; el de "aprender JavaScript" llega en 6 meses. En la primera semana el usuario necesita una victoria.

```
Misiones (7 lecciones)  →  Dropshipping (4)  →  Agencia B2B (4)
      ↓
Prompt Engineering (4)  →  Validar startup (4)
      ↓
Programación fundamentos (4)  →  Finanzas (4)
```

### 7.2 Reglas de escritura (aplicadas en el código)

1. Máximo 120 palabras de teoría por lección.
2. Una idea clave por lección, en una frase.
3. 4 ejercicios: 60% reconocimiento, 40% aplicación/decisión.
4. Cero promesas de ingresos. Cero cifras sin fuente o sin "estimación".
5. Toda cifra financiera lleva el riesgo asociado en la misma lección.

### 7.3 Qué falta en el currículo (honestidad editorial)

- **Programación real:** las 4 lecciones son fundamentos conceptuales. No hay editor de código ni ejecución. Es el hueco más grande y la prioridad del mes 2 (evaluador de código en el navegador).
- **Finanzas:** 4 lecciones cubren interés compuesto, costes y riesgo. Falta fiscalidad, que varía por país y exige revisión legal.
- **Contenido en vídeo:** cero. Añade coste de producción y peso; se evalúa solo si la retención lo pide.
- **Validación legal:** las lecciones de inversión y de negocio deben pasar revisión de un abogado antes de monetizar en la UE (información financiera). Presupuesto estimado: 300-800 € una vez.

---

## 8. Arquitectura técnica

```
┌─────────────────────┐      ┌──────────────────────────┐
│  Next.js 16 (Vercel)│─────▶│  Supabase (eu-west-1)    │
│  App Router · RSC   │      │  Postgres + RLS          │
│  Tailwind 4         │      │  Auth (email/password)   │
│  Modo demo local    │      │  14 funciones SQL        │
└─────────────────────┘      └──────────────────────────┘
          │                              │
          └──────── Stripe (fase 2) ─────┘
```

**Decisiones y su motivo:**

| Decisión | Motivo |
|---|---|
| Next.js + Vercel | Un despliegue, cero servidores que mantener, free tier generoso |
| Supabase en eu-west-1 | RGPD, latencia España/LATAM, free tier 500 MB |
| Contenido en TypeScript como fuente de verdad | Permite generar `seed.sql`, ejecutar el modo demo y versionar el currículo en git |
| **Lógica de XP en funciones SQL** | `award_xp` es atómica: racha, gemas, boost y ranking en una transacción. Imposible hacer trampa desde el cliente |
| RLS en todas las tablas | Un usuario solo lee y escribe sus filas; las lecciones solo se leen si están publicadas |
| Modo demo | El producto se puede probar, revisar y desplegar sin base de datos. Reduce la fricción a cero |
| Dual-write de ejercicios | `lessons.content` (JSONB, fuente de render) + `exercises` (tabla normalizada para analítica de aciertos) |

**Deuda técnica conocida:**
- `lessons.content` guarda los ejercicios en JSONB: cómodo ahora, molesto cuando haya 500 lecciones y haga falta buscar por texto.
- La liga usa `profiles.weekly_xp` sin job de reinicio programado: el reinicio ocurre en el primer XP de la semana nueva (correcto pero implícito).
- Sin tests E2E. Hay un smoke test de dominio (`scripts/smoke.ts`) y validación del seed.

---

## 9. Métricas

**Estrella del norte: racha de 7 días activa.** Correlaciona con retención mejor que DAU y se puede leer en una sola consulta.

| Métrica | Fórmula | Objetivo año 1 |
|---|---|---|
| Activación | % que completa la 1ª lección tras registrarse | > 65% |
| Retención D1 / D7 / D30 | Cohortes | 45% / 30% / 20% |
| Lecciones/semana por activo | media | > 4 |
| Racha media | días | > 6 |
| Conversión a PRO | PRO / activos mensuales | 3-5% |
| Churn mensual PRO | bajas / total | < 10% |
| LTV/CAC | ver 5.3 | > 3 |

**Qué haría matar el plan:** conversión a PRO por debajo del 1,5% con retención sana (el producto gusta pero no vale dinero) o D30 por debajo del 10% (el formato no funciona).

---

## 10. Riesgos

| Riesgo | Prob. | Impacto | Mitigación |
|---|---|---|---|
| El contenido de "dinero fácil" atrae audiencia no pagadora | Alta | Alto | Posicionamiento anti-humo; PRO por utilidad, no por acceso a secretos |
| Free tiers se agotan antes de monetizar | Media | Medio | Presupuesto de 45 €/mes reservado para Pro; optimizar imágenes |
| Replicación por competidor con más recursos | Media | Alto | Velocidad en retención + marca + comunidad; no competir en features |
| Responsabilidad legal en contenido financiero | Media | Alto | Disclaimer visible, revisión legal pre-monetización, cero recomendaciones concretas de productos |
| Burnout del fundador en solitario | **Alta** | **Muy alto** | Scope congelado 6 meses, 1 métrica por semana, contenido pre-escrito en bloques |
| Afiliados cambian condiciones | Media | Bajo | 3 fuentes de ingreso, ninguna > 60% del total |
| Retención insuficiente | Media | Muy alto | Kill criteria escritos antes de empezar |

El riesgo más infravalorado es el último de la lista de probabilidad alta: **un solo fundador construyendo contenido**. La regla es que el currículo solo crece si la retención ya está probada; si no, se escribe para nadie.

---

## 11. Próximos 14 días (plan concreto)

**Semana 1 — Validar**
- [ ] Poner la landing de pre-venta en producción con precio de 39 €/año (primeros 50).
- [ ] 15 entrevistas de 20 minutos con el Perfil A (preguntas sobre el pasado, no sobre intenciones).
- [ ] Publicar 3 vídeos cortos: "la regla 3x del dropshipping", "por qué abandonaste el curso", "un prompt que sí funciona".

**Semana 2 — Convertir**
- [ ] Si hay ≥3 pagos: activar Stripe y PRO real.
- [ ] Si hay <3 pagos: reescribir la promesa con las palabras de los entrevistados y repetir.
- [ ] Conectar Supabase real (env vars), cargar `supabase/seed.sql`, mover 10 usuarios de la demo a cuentas reales.

**Definición de éxito a 14 días:** 3 pagos reales o 30 entrevistas con un patrón claro. Cualquier otra cosa es actividad, no validación.

---

## Anexo: stack de herramientas (y su afiliado)

| Uso | Herramienta | Nota |
|---|---|---|
| Base de datos + auth | Supabase | En `affiliate_tools` |
| Despliegue | Vercel | En `affiliate_tools` |
| Automatizaciones | n8n / Make.com | En `affiliate_tools` |
| Pagos | Stripe | 1,5% + 0,25 € (UE) |
| Email transaccional | Resend (free 3k/mes) | — |
| Analítica | Vercel Analytics + PostHog free | — |
| Contenido corto | CapCut + guion propio | — |

*Documento vivo. Cada afirmación numérica es una estimación de trabajo y debe revisarse con datos reales de cohortes en cuanto existan.*
