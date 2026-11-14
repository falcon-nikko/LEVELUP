# GTM · Plan social de LEVELUP (30 días)

Documento de trabajo. Todo el contenido publicable vive en `/social`; esto explica
**por qué** es así y cómo operarlo sin que se convierta en ruido.

Regla de origen: si un post funciona cambiando "LEVELUP" por el nombre de otro
producto, ese post no se publica.

---

## 1. Posicionamiento

**Una frase:** entrenamiento diario, con números reales, de las cuatro habilidades
digitales que se pagan: IA aplicada, código, e-commerce y agencia.

**Contra qué competimos:** no contra Coursera ni Udemy (catálogo) ni contra
YouTube (gratis y disperso). Competimos contra *empezar y no terminar*. LEVELUP es
una práctica diaria de 10-15 minutos con vidas, racha, liga semanal y una tarea
que se ejecuta fuera de la app.

**Prueba de producto (lo que se puede afirmar sin mentir):**

| Afirmación | De dónde sale |
|---|---|
| 28 lecciones, 364 ejercicios, 10 formatos | `src/lib/curriculum/courses/*.ts`, contable |
| Cada lección termina con una tarea real en una herramienta real | `actionMission` obligatorio en el esquema |
| El error vuelve: ledger de fallos server-side y sesión de repaso | `log_exercise_attempt()` + `/lesson/mistakes` |
| La racha no se pierde por un día malo | `streak_freezes` en `award_xp()` |
| El contenido se apoya en evidencia, no en opinión | `docs/PLAN_V5_MASTER.md` §2 |

**Lo que NO se afirma nunca:** número de usuarios, testimonios, ingresos de
alumnos, "garantía de empleo", comparativas inventadas con competidores.

---

## 2. Público (ICP)

Tres perfiles, en este orden de prioridad, porque el contenido se escribe para
uno concreto cada día:

1. **Operador en agencia / freelance (25-38).** Vende servicios digitales, cobra
   por retainer, quiere subir precio y reducir churn. Dolor: no sabe calcular su
   CAC ni su capacidad real de entrega. Canal: LinkedIn.
2. **Founder de e-commerce (22-35).** Ya gasta en ads, no sabe su BE ROAS ni su
   ciclo de caja. Dolor: escala y se queda sin caja. Canal: X + vertical.
3. **Dev junior/mid que quiere producto (20-32).** Sabe sintaxis, no sabe decidir.
   Dolor: construye features que nadie paga. Canal: X + GitHub-adjacente.

Idioma: **español primero** (mercado objetivo), inglés como republicación con
copy adaptado, no traducido literal.

---

## 3. Canales y papel de cada uno

| Canal | Papel | Frecuencia | Formato base |
|---|---|---|---|
| LinkedIn | Autoridad + captación del perfil 1 | 5/semana | Post de 900-1 400 caracteres, un número, un corte |
| X | Distribución + perfil 2 y 3 | diario | Hilo de 5-7 o post único con cifra |
| IG / TikTok / Shorts | Alcance frío | 1/semana (días 7, 14, 21, 28, 30) | Guion vertical 22-35 s, texto en pantalla |
| Newsletter (día 8, 15, 22, 29) | Retención propia | semanal | 1 idea + 1 ejercicio + 1 enlace |

Regla de republicación: cada idea se escribe una vez y se corta en tres. Nunca se
escribe tres veces la misma idea con otras palabras (eso es relleno y se nota).

---

## 4. Pilares de contenido

1. **Números que duelen** — una cifra del currículo y su consecuencia en euros o
   horas. Sin adjetivos. *(Ej.: "Bajar de 1 900 € a 1 400 € para cerrar más suena
   a volumen. Con tus números pierde 563 € al mes.")*
2. **El error real** — un fallo concreto con el antes y el después. Formato
   `bug_hunt` del producto llevado a post. *(Ej.: dinero en float, DKIM ausente,
   lista fría sin señal.)*
3. **Método** — por qué LEVELUP enseña así: ejemplo resuelto antes de pedir nada
   en procedimientos, recuperación activa en definiciones, práctica interleaved en
   los cofres, el fallo que vuelve. Es el pilar que más guarda la gente.
4. **Cuenta completa** — un funnel o un P&L entero, con las filas. *(Ej.:
   100 000 → 923 → 210 → 30 → 10 → 3, CAC 317 €, LTV 26 208 €.)*
5. **Herramienta honesta** — qué sustituye, qué cuesta, cuándo NO usarla. Los
   enlaces de afiliado van aquí y **siempre** con aviso explícito.

Reparto real del mes: **9 cifras · 6 errores · 6 método · 7 cuentas · 2 herramientas**.
Los días de CTA fuerte (10, 14, 17, 21, 24, 28, 30) usan pilares 1, 3 o 4, nunca el 5:
no se vende con un enlace de afiliado.

---

## 5. Reglas de copy (auditable antes de publicar)

- **Primera línea = la cifra o el corte.** Nada de "Hoy quiero hablaros de…".
- **Un número por post.** Dos cifras compiten y no se recuerda ninguna.
- **Frases de 8-14 palabras.** Párrafos de 1-2 líneas.
- **Cero emoji decorativo.** Como máximo uno, y sólo si sustituye a una viñeta.
- **Prohibido:** "desbloquea", "eleva tu", "en el mundo actual", "no es solo X, es
  Y", "game changer", "revolucionario", "secreto que nadie te cuenta",
  "hilo 🧵 que te va a volar la cabeza".
- **CTA único y pequeño.** "Está en LEVELUP, ruta Agencia, unidad 1" o "Empieza en
  levelup.app". Nunca dos CTAs.
- **Cierre sin pregunta retórica vacía.** Si preguntas, que sea respondible con un
  número ("¿cuál es tu BE ROAS?").
- **Aviso de afiliado obligatorio** cuando hay enlace: "Enlace de afiliado: si
  compras, LEVELUP recibe una comisión y a ti no te cuesta más."

---

## 6. Activos visuales

Nada de stock, nada de renders 3D genéricos, nada de capturas de ChatGPT.

| Tipo | Cuándo | Cómo se hace |
|---|---|---|
| **Tarjeta de cifra** | pilares 1 y 4 | Fondo `#F7F7F7`, número en 72 px `#042C60`, una línea de contexto en 16 px `#777777`, marca abajo a la izquierda. Paleta del producto, sin gradientes. |
| **Captura real del producto** | pilar 3 | Ruta serpenteante, panel de feedback verde/rojo, popup de nodo con Review y Legendario, calendario de racha, hub de práctica. Se captura del build vivo. |
| **Diagrama exportado** | pilares 2 y 4 | Los 11 tipos de `Diagram.tsx` ya son gráficos con las etiquetas dentro: funnel, barras, ecuación, tabla, código. Se renderizan en la lección y se recortan. |
| **Vertical** | 3/semana | Pantalla del producto grabada + voz en off leyendo el guion de `/social/posts/day-XX.md`. Texto en pantalla en 3 frases máximo. |

Regla: la imagen siempre contiene el dato. Nunca "ver descripción".

---

## 7. Calendario (resumen)

El detalle día a día, con copy completo ES/EN, hilo de X y guion vertical, está en
`/social/posts/day-01.md` … `day-30.md`. Índice máquina en `/social/calendar.csv`.

| Semana | Arco | Días de CTA |
|---|---|---|
| 1 (01-07) | Credibilidad por cifras + errores reales. El producto aparece una vez, de refilón. | — |
| 2 (08-14) | Método: por qué enseñamos así. Primera invitación explícita. | 10, 14 |
| 3 (15-21) | Agencia y cuentas completas: CAC, LTV, churn, capacidad. | 17, 21 |
| 4 (22-28) | E-commerce e IA aplicada: caja, ROAS, creativos, pipelines. | 24, 28 |
| 5 (29-30) | Cierre del mes: qué cambió, qué se publica el mes siguiente. | 30 |

Cadencia real (lunes a domingo): **L** newsletter o método · **M** cifra · **X** método
o error · **J** error real · **V** cuenta completa o herramienta · **S** error/cifra ·
**D** vertical de recap con CTA. El domingo es el día de mayor alcance frío: ahí va
el corte vertical.

---

## 8. Métricas

Se mira a los 7, 14 y 30 días. Umbral de decisión, no vanidad:

| Métrica | Objetivo día 30 | Qué hacemos si no |
|---|---|---|
| Guardados / compartidos por post (LinkedIn) | ≥ 15 guardados en el mejor post del pilar 3 | El pilar 3 no está resolviendo nada: reescribir con un caso más concreto |
| CTR al producto desde social | ≥ 1,5 % de las impresiones | El CTA está enterrado o el post no promete práctica |
| Registros atribuidos | línea base propia (no hay histórico que comparar) | — |
| Lecciones completadas por registro de social | ≥ 1 en las primeras 48 h | Onboarding demasiado largo: entrada directa a la ruta |
| Respuestas/comentarios con cifra propia | ≥ 3 por semana | El post no invita a calcular: cerrar con pregunta numérica |

Se registra en `social/metrics.csv` (crear al publicar; una fila por post: fecha,
canal, día, impresiones, guardados, clics, registros).

---

## 9. Flujo de trabajo

1. Abrir `social/calendar.csv`, mirar el día de hoy.
2. Copiar el texto de `social/posts/day-XX.md` (ya está escrito, no se reescribe).
3. Preparar el activo visual indicado (tarjeta de cifra, captura o diagrama).
4. Publicar a la hora indicada en el CSV (LinkedIn 08:20 CET, X 13:00 CET,
   vertical 19:30 CET).
5. Anotar la fila en `social/metrics.csv` a las 24 h y a los 7 días.
6. Los comentarios con una cifra propia se responden con otra cifra, nunca con un
   "¡gracias!".

**Tiempo estimado:** 20 min/día de publicación, 40 min los días de vertical.

---

## 10. Cumplimiento

- **Afiliación:** aviso en el mismo post, no en el primer comentario.
- **Propiedad de las cifras:** todas salen del currículo propio
  (`src/lib/curriculum/courses/*.ts`) y de las fuentes listadas en
  `docs/PLAN_V5_MASTER.md` (External Sources). Si una cifra viene de un estudio de
  terceros, se cita la fuente en el post.
- **Sin promesas de resultado:** se describe el cálculo, no el destino. "Así se
  calcula tu BE ROAS", nunca "conseguirás ROAS 3".
- **Datos de liga:** la clasificación semanal es anónima por nombre público; no se
  publican capturas donde aparezcan usuarios identificables sin permiso.

---

## 11. Checklist de lanzamiento (día 0)

- [ ] Perfiles con la misma frase de posicionamiento que §1.
- [ ] Enlace al producto con UTM por canal (`?utm_source=linkedin&utm_campaign=d01`).
- [ ] 6 tarjetas de cifra preparadas de antemano (días 1, 2, 4, 6, 9, 11).
- [ ] 4 capturas reales del producto: ruta, popup de nodo, feedback verde, hub de práctica.
- [ ] `social/metrics.csv` creado con cabecera.
- [ ] Borrador de la newsletter del día 8 a partir del pilar 3.
- [ ] Un segundo par de ojos ha leído los 30 posts buscando las palabras prohibidas de §5.
