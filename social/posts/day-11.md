# Día 11 · Error · Salida JSON de un LLM

**Canales:** LinkedIn 08:20 CET · X 13:00 CET · **Vertical 19:30 CET**
**Pilar:** El error real (3/6)
**Objetivo:** que el lector deje de depender del prompt para el formato
**Activo visual:** captura de código con la respuesta real `"¡Claro! Aquí tienes el JSON:\n\n{...}"` y el `JSON.parse` fallando en rojo
**CTA:** no

---

## LinkedIn · ES

Le pides JSON al modelo y responde "¡Claro! Aquí tienes el JSON:".

Y tu `JSON.parse` revienta en producción, un martes, con un usuario de verdad delante.

No es el modelo siendo tonto. Es que le has pedido dos cosas por el mismo canal: decidir el formato y producir el contenido.

Tres niveles, de peor a mejor:

1. **Prompt:** "responde sólo en JSON". Funciona casi siempre. El resto llega con texto antes, comas finales, comillas sin escapar o un `null` donde esperabas un número.
2. **Esquema en el prompt + ejemplo de salida:** mejora, sigue sin garantía. El modelo puede cumplir el ejemplo y violar el esquema.
3. **Salida estructurada del proveedor** (`response_format` / JSON schema): el modelo no puede salirse del esquema. Si falla, falla la red o el timeout, no el formato.

Y en los tres casos, la parte que casi nadie hace:

- **valida contra el esquema al recibir.** Un JSON válido con campos vacíos es peor que un error, porque entra en tu base de datos y aparece tres semanas después.
- **define qué pasa con el fallo:** reintento, degradación a respuesta humana, o cola de revisión.
- **registra el prompt y la respuesta cruda.** Cuando algo llega mal necesitas saber si el esquema cambió o si el modelo se salió.

La diferencia entre una demo y un pipeline es exactamente esta: la demo no recibe nunca un "¡Claro!".

## LinkedIn · EN

You ask the model for JSON and it answers "Sure! Here is the JSON:".

And your `JSON.parse` blows up in production, on a Tuesday, with a real user watching.

It is not the model being dumb. You asked two things through the same channel: decide the format and produce the content.

Three levels, worst to best:
1. **Prompt:** "reply in JSON only". Works most of the time. The rest arrives with prose before it, trailing commas, unescaped quotes, or a `null` where you expected a number.
2. **Schema in the prompt plus an output example:** better, still no guarantee.
3. **Provider structured output** (`response_format` / JSON schema): the model cannot leave the schema. If it fails, the network failed, not the format.

And in all three, the part almost nobody does: **validate against the schema on receipt**. Valid JSON with empty fields is worse than an error, because it enters your database and shows up three weeks later.

The difference between a demo and a pipeline is exactly this: the demo never receives "Sure!".

## X · 13:00

"Responde sólo en JSON" → "¡Claro! Aquí tienes el JSON:"

Nivel 1: prompt. Falla un 20 % de las veces.
Nivel 2: esquema + ejemplo. Falla menos.
Nivel 3: salida estructurada del proveedor. No puede salirse del esquema.

Y en los tres: valida al recibir. Un JSON válido con campos vacíos es peor que un error.

## Corte vertical (19:30) — 26 s

**Texto en pantalla:** `"¡Claro! Aquí tienes el JSON:"` · `JSON.parse ✗`

- **[0-3 s]** "Esto es lo que revienta tu integración con IA en producción."
- **[3-10 s]** "Le pides JSON y el modelo te contesta ¡claro! aquí tienes el JSON. Tu parse falla. Y no es el modelo: le pediste dos cosas por el mismo canal."
- **[10-19 s]** "Tres niveles. Prompt: falla un veinte por ciento. Esquema con ejemplo: falla menos. Salida estructurada del proveedor: no puede salirse del esquema."
- **[19-26 s]** "Y valida siempre al recibir. Un JSON válido con campos vacíos es peor que un error, porque entra en tu base de datos."

## Hashtags

#ia #llm #backend

