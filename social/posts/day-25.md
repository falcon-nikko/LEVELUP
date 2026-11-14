# Día 25 · Error · El RAG que cita mal

**Canales:** LinkedIn 08:20 CET · X 13:00 CET · **Vertical 19:30 CET**
**Pilar:** El error real (6/6)
**Objetivo:** dar el orden de diagnóstico real cuando un RAG responde bien y cita mal
**Activo visual:** captura del diagrama `layers` de la lección de RAG (documentos → chunking → índice → retrieval → rerank → prompt → respuesta) con las capas 2 y 4 marcadas en ámbar
**CTA:** no

---

## LinkedIn · ES

El RAG responde bien y cita mal. No es el modelo.

Tres causas, y se revisan en este orden, no en el que apetece:

**1 · Chunking.** Si cortas a 1 000 tokens fijos, partidos por la mitad de una tabla o de un procedimiento, el trozo recuperado no contiene la respuesta completa. Corta por estructura —título, sección, párrafo— y solapa entre un 10 % y un 15 %.

**2 · Retrieval.** La similitud de embedding sola devuelve lo que se **parece**, no lo que **responde**. Con 5 resultados, mezcla búsqueda por palabras clave y vectorial, y reordena. Un documento con el término exacto gana a uno con el concepto difuso.

**3 · El prompt no obliga a citar.** Si no exiges que cada afirmación lleve el id del chunk, el modelo compone una respuesta plausible con trozos que no ha usado. Y suena perfecta.

La prueba rápida que lo resuelve en una tarde:

- coge **20 preguntas reales** de usuarios
- mira qué chunk se recupera en el top-5
- apunta si la respuesta estaba ahí

Si en 6 de 20 la respuesta no estaba en el top-5, tu problema es 1 o 2. Si estaba y el modelo no la usó, tu problema es 3. Son arreglos distintos y la gente los confunde cada semana.

Y antes de todo eso, la pregunta que nadie hace: **¿necesitas RAG?** Con menos de 50 documentos, meterlos en el contexto es más barato, más rápido y falla menos. El RAG se justifica por volumen o por permisos, no por estética de arquitectura.

## LinkedIn · EN

Your RAG answers well and cites badly. It is not the model.

Three causes, reviewed in this order — not the order that feels right:

**1 · Chunking.** Fixed 1 000-token cuts split tables and procedures in half, so the retrieved chunk does not contain the full answer. Cut by structure — heading, section, paragraph — and overlap 10-15 %.

**2 · Retrieval.** Embedding similarity alone returns what **looks like** the answer, not what **answers**. With 5 results, blend keyword and vector search, then rerank.

**3 · The prompt does not force citations.** If you do not require an id per claim, the model composes a plausible answer from chunks it never used. And it sounds perfect.

The test that settles it in an afternoon:
- take **20 real user questions**
- look at what lands in the top-5
- note whether the answer was there

If in 6 of 20 the answer was not in the top-5, your problem is 1 or 2. If it was there and the model ignored it, your problem is 3. Different fixes, confused every week.

And before all of that, the question nobody asks: **do you need RAG?** Under 50 documents, stuffing the context is cheaper, faster and fails less. RAG is justified by volume or permissions, not by architectural aesthetics.

## X · 13:00

Tu RAG cita mal. Orden de diagnóstico:

1. chunking fijo de 1 000 tokens → corta por estructura y solapa 10-15 %
2. sólo similitud vectorial → mezcla palabras clave + vectorial y reordena
3. el prompt no obliga a citar → id de chunk por afirmación

Prueba: 20 preguntas reales, mira el top-5. Si en 6 la respuesta no estaba, es 1 o 2.

## Corte vertical (19:30) — 28 s

**Texto en pantalla:** "no es el modelo" · "chunking" · "retrieval" · "citas"

- **[0-3 s]** "Tu RAG responde bien y cita mal. Y no es el modelo."
- **[3-11 s]** "Uno: chunking. Si cortas a mil tokens fijos, partes la tabla por la mitad y el trozo recuperado no tiene la respuesta completa. Corta por estructura y solapa un diez o quince por ciento."
- **[11-19 s]** "Dos: retrieval. La similitud de embedding devuelve lo que se parece, no lo que responde. Mezcla palabras clave con vectorial y reordena."
- **[19-28 s]** "Tres: el prompt no obliga a citar. Y la prueba rápida: veinte preguntas reales, mira el top cinco. Si en seis la respuesta no estaba, tu problema es uno o dos. Si estaba y no la usó, es tres."

## Hashtags

#ia #rag #llm

