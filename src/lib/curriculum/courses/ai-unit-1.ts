import { bi, opt } from '@/lib/curriculum/authoring';
import { Lesson, Unit } from '@/lib/curriculum/types';

/* ==========================================================================
   AI & AUTOMATION · 7 lessons
   ========================================================================== */

const UNIT_1: Lesson[] = [
  /* ---------------------------------------------------------------- L1 -- */
  {
    slug: 'ai-01-como-piensa-un-llm',
    unitSlug: 'ai-unit-1',
    trackSlug: 'ai-automation',
    orderIndex: 1,
    title: bi('Cómo piensa un LLM (y por qué alucina)', 'How an LLM actually thinks (and why it hallucinates)'),
    outcome: bi(
      'Sabrás predecir cuándo un modelo inventará datos y qué parámetros lo evitan.',
      'You will be able to predict when a model invents data and which parameters prevent it.'
    ),
    durationMin: 12,
    xpReward: 120,
    theory: [
      {
        id: 'ai01-t1',
        heading: bi('Un LLM predice el siguiente token', 'An LLM predicts the next token'),
        body: bi(
          'No consulta una base de datos ni "sabe" cosas. Convierte tu texto en tokens, calcula qué token tiene más probabilidad de ir a continuación, lo añade y repite. Todo lo que sale es una cadena de predicciones probables.',
          'It does not query a database or "know" things. It turns your text into tokens, computes which token is most likely to come next, appends it and repeats. Everything it outputs is a chain of probable predictions.'
        ),
        diagram: {
          kind: 'flow',
          nodes: [
            { id: 'n1', label: bi('Tu texto', 'Your text'), tone: 'info' },
            { id: 'n2', label: bi('Tokens', 'Tokens'), note: bi('trozos de palabra', 'word pieces'), tone: 'info' },
            { id: 'n3', label: bi('Modelo', 'Model'), note: bi('probabilidades', 'probabilities'), tone: 'warn' },
            { id: 'n4', label: bi('Token elegido', 'Chosen token'), tone: 'good' },
          ],
          branch: {
            label: bi('Se añade al final y vuelve a empezar hasta parar', 'It is appended and the loop restarts until it stops'),
            tone: 'mute',
          },
        },
        why: bi('Si entiendes que predice, dejas de tratarlo como una fuente de verdad.', 'Once you see it predicts, you stop treating it as a source of truth.'),
      },
      {
        id: 'ai01-t2',
        heading: bi('Temperatura: cuánto riesgo permite', 'Temperature: how much risk you allow'),
        body: bi(
          'Temperatura 0 elige siempre el token más probable: misma entrada, misma salida. A 0.8 reparte probabilidad y varía. Para clasificar, extraer o generar JSON se usa 0 o 0.2. Para nombrar una marca, 0.8 tiene sentido.',
          'Temperature 0 always picks the most likely token: same input, same output. At 0.8 it spreads probability and varies. For classifying, extracting or generating JSON use 0 or 0.2. For naming a brand, 0.8 makes sense.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('Temperatura 0', 'Temperature 0'),
            tone: 'good',
            items: [
              bi('Reproducible: auditable en producción', 'Reproducible: auditable in production'),
              bi('Ideal para JSON, clasificación, extracción', 'Ideal for JSON, classification, extraction'),
              bi('Aburrido en texto creativo', 'Boring for creative text'),
            ],
          },
          right: {
            title: bi('Temperatura 0.8', 'Temperature 0.8'),
            tone: 'warn',
            items: [
              bi('Distinta salida con la misma entrada', 'Different output for the same input'),
              bi('Útil para brainstorming y copy', 'Useful for brainstorming and copy'),
              bi('Peligroso si la salida alimenta código', 'Dangerous if the output feeds code'),
            ],
          },
        },
      },
      {
        id: 'ai01-t3',
        heading: bi('La ventana de contexto es tu presupuesto', 'The context window is your budget'),
        body: bi(
          'El modelo maneja un número fijo de tokens a la vez, y ese total incluye system prompt, ejemplos, documentos y la respuesta. Si te pasas, se recorta el principio: justo donde estaban las instrucciones.',
          'The model handles a fixed number of tokens at once, and that total includes the system prompt, examples, documents and the answer. Go over and the beginning gets trimmed: exactly where your instructions were.'
        ),
        diagram: {
          kind: 'stack',
          total: 8000,
          parts: [
            { label: bi('System prompt', 'System prompt'), value: 400, tone: 'info' },
            { label: bi('Ejemplos (few-shot)', 'Examples (few-shot)'), value: 1200, tone: 'info' },
            { label: bi('Documento aportado', 'Provided document'), value: 3500, tone: 'warn' },
            { label: bi('Hueco para responder', 'Room to answer'), value: 2900, tone: 'good' },
          ],
        },
        why: bi('Un JSON cortado a medias rompe el pipeline entero, no solo la frase.', 'A half-truncated JSON breaks the whole pipeline, not just the sentence.'),
      },
      {
        id: 'ai01-t4',
        heading: bi('Por qué alucina incluso bien configurado', 'Why it hallucinates even when well configured'),
        body: bi(
          'El modelo optimiza verosimilitud, no verdad. Si el dato no está en el contexto, genera el dato más plausible que encaja con el patrón. Bajar la temperatura no lo arregla: reduce la variedad del invento, no el invento.',
          'The model optimises plausibility, not truth. If the datum is not in the context, it generates the most plausible value that fits the pattern. Lowering temperature does not fix it: it reduces the variety of the invention, not the invention.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('Lo que no funciona', 'What does not work'),
            tone: 'bad',
            items: [
              bi('Pedir "no inventes" sin dar la fuente', 'Asking "do not invent" without providing the source'),
              bi('Bajar la temperatura a 0', 'Dropping temperature to 0'),
              bi('Cambiar a un modelo más grande', 'Switching to a bigger model'),
            ],
          },
          right: {
            title: bi('Lo que sí funciona', 'What does work'),
            tone: 'good',
            items: [
              bi('Poner el documento real en el contexto (RAG)', 'Put the real document in context (RAG)'),
              bi('Permitir "no_found" como salida válida', 'Allow "no_found" as a valid output'),
              bi('Validar la salida contra el esquema antes de usarla', 'Validate the output against the schema before using it'),
            ],
          },
        },
      },
    ],
    examples: [
      {
        id: 'ai01-ex1',
        title: bi('Ejemplo resuelto: clasificar 200 tickets de soporte al día', 'Worked example: classifying 200 support tickets a day'),
        situation: bi(
          'Una tienda recibe 200 tickets diarios. Hoy los lee una persona. Queremos que el modelo devuelva categoría, urgencia y si va a un canal VIP, y que eso se escriba en una base de datos sin romperse.',
          'A store gets 200 tickets a day. A human reads them today. We want the model to return category, urgency and whether it goes to a VIP channel, and have that written to a database without breaking.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Fijar el contrato de salida', 'Step 1 · Fix the output contract'),
            detail: bi(
              'Definimos el JSON exacto antes de escribir una sola instrucción: 4 campos, tipos cerrados y un valor permitido "otro" para lo que no encaje.',
              'We define the exact JSON before writing a single instruction: 4 fields, closed types and an allowed value "other" for anything that does not fit.'
            ),
            diagram: {
              kind: 'code',
              lang: 'output contract',
              lines: [
                { text: '{ "categoria": "envio"|"producto"|"pago"|"otro",', tone: 'good' },
                { text: '  "urgencia": 1..5,', tone: 'good' },
                { text: '  "vip": true|false,', tone: 'good' },
                { text: '  "resumen": string (max 20 palabras) }', tone: 'good' },
              ],
            },
          },
          {
            label: bi('Paso 2 · Temperatura 0 y tope de tokens realista', 'Step 2 · Temperature 0 and a realistic token cap'),
            detail: bi(
              'Temperatura 0 para que dos ejecuciones sobre el mismo ticket den el mismo resultado. max_tokens 220: suficiente para el JSON, corto para detectar cortes.',
              'Temperature 0 so two runs on the same ticket give the same result. max_tokens 220: enough for the JSON, short enough to detect truncation.'
            ),
            diagram: {
              kind: 'timeline',
              steps: [
                { label: bi('System', 'System'), value: '180 tok' },
                { label: bi('Ticket', 'Ticket'), value: '90 tok' },
                { label: bi('Salida', 'Output'), value: '≤220 tok' },
                { label: bi('Total', 'Total'), value: '490 tok', tone: 'good' },
              ],
            },
          },
          {
            label: bi('Paso 3 · Dos ejemplos de casos límite', 'Step 3 · Two edge-case examples'),
            detail: bi(
              'Los few-shot no enseñan el formato (ya lo hace el contrato): enseñan el criterio en los casos dudosos, como un ticket que mezcla envío y pago.',
              'Few-shots do not teach the format (the contract already does): they teach the judgment on ambiguous cases, like a ticket mixing shipping and payment.'
            ),
          },
          {
            label: bi('Paso 4 · Validar antes de escribir', 'Step 4 · Validate before writing'),
            detail: bi(
              'Parseamos el JSON, comprobamos que los campos existen y que los valores están en el rango permitido. Si falla, reintento único; si vuelve a fallar, cola manual.',
              'We parse the JSON, check the fields exist and the values are in range. On failure, one retry; on second failure, a manual queue.'
            ),
            diagram: {
              kind: 'flow',
              nodes: [
                { id: 'a', label: bi('LLM', 'LLM'), tone: 'info' },
                { id: 'b', label: bi('Parsear JSON', 'Parse JSON'), tone: 'info' },
                { id: 'c', label: bi('Validar rango', 'Validate range'), tone: 'info' },
                { id: 'd', label: bi('Escribir en DB', 'Write to DB'), tone: 'good' },
              ],
              branch: { label: bi('Falla → 1 reintento → cola manual (nunca se pierde el ticket)', 'Fails → 1 retry → manual queue (a ticket is never lost)'), tone: 'bad' },
            },
          },
        ],
        result: bi(
          'De un 62% de tickets usables sin contrato ni validación a un 97%. El 3% restante entra en una cola humana de 15 minutos al día.',
          'From 62% usable tickets with no contract and no validation to 97%. The remaining 3% land in a 15-minute-a-day human queue.'
        ),
        selfCheck: {
          prompt: bi(
            '¿Por qué elegimos temperatura 0 en este caso y no 0.8?',
            'Why did we pick temperature 0 here instead of 0.8?'
          ),
          options: [
            opt('a', 'Porque 0 es más barato en tokens', 'Because 0 is cheaper in tokens'),
            opt('b', 'Porque la salida alimenta una base de datos y debe ser reproducible y auditable', 'Because the output feeds a database and must be reproducible and auditable'),
            opt('c', 'Porque 0.8 no funciona con JSON', 'Because 0.8 does not work with JSON'),
            opt('d', 'Porque 0 elimina las alucinaciones', 'Because 0 removes hallucinations'),
          ],
          correctOptionId: 'b',
          explanation: bi(
            'Temperatura 0 da reproducibilidad: mismo ticket, misma categoría, algo que puedes auditar. No elimina alucinaciones (eso lo hace el dato en contexto) y no es más barata.',
            'Temperature 0 gives reproducibility: same ticket, same category, something you can audit. It does not remove hallucinations (that is what context data does) and it is not cheaper.'
          ),
        },
      },
    ],
    exercises: [
      {
        id: 'ai01-e01',
        format: 'concept',
        difficulty: 1,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('Cuando un LLM genera texto, lo que hace realmente es…', 'When an LLM generates text, what it actually does is…'),
        options: [
          opt('a', 'Buscar la respuesta en una base de datos y copiarla', 'Look the answer up in a database and copy it'),
          opt('b', 'Predecir el token más probable, añadirlo y repetir', 'Predict the most likely token, append it and repeat'),
          opt('c', 'Ejecutar código internamente para comprobar el resultado', 'Run code internally to verify the result'),
          opt('d', 'Comparar tu pregunta con una plantilla guardada', 'Compare your question against a stored template'),
        ],
        correctOptionId: 'b',
        explanation: bi(
          'Es predicción secuencial de tokens. Por eso puede producir texto impecable sobre un hecho que no existe: nada verifica la verdad.',
          'It is sequential token prediction. That is why it can produce flawless text about a fact that does not exist: nothing checks the truth.'
        ),
        xp: 8,
      },
      {
        id: 'ai01-e02',
        format: 'concept',
        difficulty: 1,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('Temperatura 0 en una llamada significa que…', 'Temperature 0 on a call means that…'),
        options: [
          opt('a', 'El modelo no responde', 'The model does not answer'),
          opt('b', 'La respuesta es siempre la más probable, así que se repite con la misma entrada', 'The answer is always the most likely one, so it repeats for the same input'),
          opt('c', 'La respuesta es más creativa', 'The answer is more creative'),
          opt('d', 'Se usa menos memoria de contexto', 'It uses less context memory'),
        ],
        correctOptionId: 'b',
        explanation: bi('Temperatura 0 = determinismo. Es lo que quieres cuando la salida se guarda o se ejecuta.', 'Temperature 0 = determinism. That is what you want when the output gets stored or executed.'),
        xp: 8,
      },
      {
        id: 'ai01-e03',
        format: 'ordering',
        difficulty: 2,
        badge: bi('ORDENAR', 'ORDER'),
        prompt: bi('Ordena el bucle real de generación de un LLM.', 'Order the real generation loop of an LLM.'),
        pieces: [
          { id: 'p1', text: bi('Convertir el texto de entrada en tokens', 'Convert the input text into tokens') },
          { id: 'p2', text: bi('Calcular la probabilidad del siguiente token', 'Compute the probability of the next token') },
          { id: 'p3', text: bi('Elegir un token según la temperatura', 'Pick a token according to temperature') },
          { id: 'p4', text: bi('Añadirlo al final del contexto', 'Append it to the end of the context') },
          { id: 'p5', text: bi('Repetir hasta el token de parada', 'Repeat until the stop token') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        explanation: bi('Es un bucle, no una consulta: cada token generado entra a formar parte del contexto del siguiente.', 'It is a loop, not a lookup: every generated token becomes part of the context for the next one.'),
        xp: 10,
      },
      {
        id: 'ai01-e04',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada parámetro con lo que controla de verdad.', 'Match each parameter with what it actually controls.'),
        pairs: [
          { leftId: 'l1', left: bi('temperature', 'temperature'), rightId: 'r1', right: bi('Cuánto se aleja del token más probable', 'How far it strays from the most likely token') },
          { leftId: 'l2', left: bi('max_tokens', 'max_tokens'), rightId: 'r2', right: bi('Longitud máxima de la respuesta', 'Maximum length of the answer') },
          { leftId: 'l3', left: bi('system prompt', 'system prompt'), rightId: 'r3', right: bi('Rol y reglas que rigen toda la conversación', 'Role and rules governing the whole conversation') },
          { leftId: 'l4', left: bi('stop sequence', 'stop sequence'), rightId: 'r4', right: bi('Dónde corta la generación', 'Where generation is cut off') },
        ],
        explanation: bi('max_tokens no limita la entrada: limita la salida. Confundirlo es la causa nº1 de JSON truncado.', 'max_tokens does not cap the input: it caps the output. Mixing them up is the number one cause of truncated JSON.'),
        xp: 12,
      },
      {
        id: 'ai01-e05',
        format: 'worked_why',
        difficulty: 2,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi(
          'En el ejemplo de los tickets pusimos 2 ejemplos few-shot. ¿Qué aportan realmente?',
          'In the ticket example we added 2 few-shot examples. What do they really contribute?'
        ),
        options: [
          opt('a', 'Enseñan el formato JSON, que el modelo no sabría solo', 'They teach the JSON format, which the model could not produce alone'),
          opt('b', 'Fijan el criterio en los casos ambiguos (un ticket que mezcla envío y pago)', 'They set the judgment on ambiguous cases (a ticket mixing shipping and payment)'),
          opt('c', 'Reducen el consumo de tokens', 'They reduce token consumption'),
          opt('d', 'Sustituyen a la validación del esquema', 'They replace schema validation'),
        ],
        correctOptionId: 'b',
        explanation: bi('El formato ya lo garantiza el contrato. Los ejemplos valen donde hay criterio: los casos límite.', 'The contract already guarantees the format. Examples pay off where judgment is needed: the edge cases.'),
        xp: 10,
      },
      {
        id: 'ai01-e06',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Ventana de 8 000 tokens. System prompt 400, ejemplos 1 200, documento 3 500. ¿Cuántos tokens quedan como máximo para la respuesta?',
          'An 8,000-token window. System prompt 400, examples 1,200, document 3,500. What is the maximum room left for the answer?'
        ),
        diagram: {
          kind: 'stack',
          total: 8000,
          parts: [
            { label: bi('System', 'System'), value: 400, tone: 'info' },
            { label: bi('Ejemplos', 'Examples'), value: 1200, tone: 'info' },
            { label: bi('Documento', 'Document'), value: 3500, tone: 'warn' },
            { label: bi('¿Respuesta?', 'Answer?'), value: 2900, tone: 'good' },
          ],
        },
        answer: 2900,
        tolerance: 0,
        unit: 'tokens',
        formula: bi('ventana − system − ejemplos − documento', 'window − system − examples − document'),
        explanation: bi('8000 − 400 − 1200 − 3500 = 2900. Si pides max_tokens 4000, el modelo corta la salida a mitad.', '8000 − 400 − 1200 − 3500 = 2900. Ask for max_tokens 4000 and the model cuts the output in half.'),
        xp: 12,
      },
      {
        id: 'ai01-e07',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('Este pipeline devuelve JSON roto un 8% de las veces. ¿Qué línea es la culpable?', 'This pipeline returns broken JSON 8% of the time. Which line is the culprit?'),
        lines: [
          { id: 'c1', text: 'model: "llm-large", temperature: 0', tone: 'good' },
          { id: 'c2', text: 'max_tokens: 40', tone: 'bad', label: bi('sospechoso', 'suspect') },
          { id: 'c3', text: 'system: "Devuelve SOLO JSON valido con 4 campos"', tone: 'good' },
          { id: 'c4', text: 'JSON.parse(response.content)', tone: 'good' },
        ],
        correctLineId: 'c2',
        explanation: bi('Un JSON de 4 campos necesita ~150-220 tokens. Con 40 se trunca y JSON.parse revienta. La temperatura 0 y el system están bien.', 'A 4-field JSON needs ~150-220 tokens. With 40 it truncates and JSON.parse blows up. Temperature 0 and the system prompt are fine.'),
        xp: 12,
      },
      {
        id: 'ai01-e08',
        format: 'output',
        difficulty: 3,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi(
          'Lanzas el mismo prompt 10 veces con temperature 0.8 y 10 veces con temperature 0 sobre el mismo ticket. ¿Qué afirmación es correcta?',
          'You run the same prompt 10 times at temperature 0.8 and 10 times at temperature 0 on the same ticket. Which statement is correct?'
        ),
        context: {
          label: bi('Prompt', 'Prompt'),
          content: bi(
            'Clasifica este ticket en una de: envio, producto, pago, otro. Devuelve solo la palabra.',
            'Classify this ticket as one of: shipping, product, payment, other. Return only the word.'
          ),
        },
        options: [
          opt('a', 'Las 20 ejecuciones dan la misma categoría', 'All 20 runs return the same category'),
          opt('b', 'Con 0 las 10 coinciden; con 0.8 pueden aparecer categorías distintas', 'At 0 all 10 match; at 0.8 different categories can appear'),
          opt('c', 'Con 0.8 siempre acierta más', 'At 0.8 it is always more accurate'),
          opt('d', 'La temperatura no afecta a tareas de clasificación', 'Temperature does not affect classification tasks'),
        ],
        correctOptionId: 'b',
        explanation: bi('Temperatura 0 colapsa la distribución al token más probable. Con 0.8 hay varianza: en un ticket ambiguo verás dos categorías distintas.', 'Temperature 0 collapses the distribution to the most likely token. At 0.8 there is variance: on an ambiguous ticket you will see two different categories.'),
        xp: 12,
      },
      {
        id: 'ai01-e09',
        format: 'numeric',
        difficulty: 4,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          '1 000 tickets/día, 600 tokens de entrada y 80 de salida por ticket. Precio: 0,15 $/1M entrada y 0,60 $/1M salida. ¿Coste de 30 días en dólares?',
          '1,000 tickets/day, 600 input and 80 output tokens per ticket. Price: $0.15/1M input and $0.60/1M output. What is the 30-day cost in dollars?'
        ),
        answer: 4.14,
        tolerance: 0.1,
        unit: '$',
        formula: bi('(600·1000·30)/1M · 0,15 + (80·1000·30)/1M · 0,60', '(600·1000·30)/1M · 0.15 + (80·1000·30)/1M · 0.60'),
        explanation: bi('Entrada: 18M × 0,15 = 2,70 $. Salida: 2,4M × 0,60 = 1,44 $. Total 4,14 $. La salida es 4× más cara por token: por eso se limita el resumen.', 'Input: 18M × 0.15 = $2.70. Output: 2.4M × 0.60 = $1.44. Total $4.14. Output is 4× more expensive per token: that is why the summary is capped.'),
        xp: 15,
      },
      {
        id: 'ai01-e10',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos tareas del mismo equipo: (A) extraer el número de factura de un PDF, (B) proponer 10 nombres para una newsletter. ¿Qué temperatura para cada una?',
          'Two tasks from the same team: (A) extract the invoice number from a PDF, (B) propose 10 newsletter names. Which temperature for each?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Tarea', 'Task'), bi('Salida', 'Output'), bi('Si varía…', 'If it varies…')],
          rows: [
            ['A · factura', 'string exacto', 'se rompe el ERP'],
            ['B · nombres', '10 textos', 'no pasa nada'],
          ],
          highlightRow: 0,
        },
        options: [
          opt('a', 'A: 0 · B: 0.8', 'A: 0 · B: 0.8'),
          opt('b', 'A: 0.8 · B: 0', 'A: 0.8 · B: 0'),
          opt('c', 'Las dos a 0.5, valor intermedio', 'Both at 0.5, a middle value'),
          opt('d', 'Las dos a 0 para evitar errores', 'Both at 0 to avoid errors'),
        ],
        correctOptionId: 'a',
        explanation: bi('Se decide por el coste del error, no por la tarea. En A un valor distinto rompe un sistema; en B la variedad es el objetivo.', 'You decide by the cost of the error, not by the task. In A a different value breaks a system; in B variety is the goal.'),
        xp: 15,
      },
      {
        id: 'ai01-e11',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'Tu bot responde "la devolución es gratis en 30 días" pero esa política no existe. Temperature ya está en 0. ¿Qué ataca la causa?',
          'Your bot answers "returns are free within 30 days" but no such policy exists. Temperature is already 0. What attacks the cause?'
        ),
        options: [
          opt('a', 'Bajar la temperatura a -1', 'Drop temperature to -1'),
          opt('b', 'Añadir al contexto el documento real de políticas y permitir la respuesta "no consta"', 'Add the real policy document to context and allow a "not found" answer'),
          opt('c', 'Añadir al prompt "por favor no inventes datos"', 'Add "please do not invent data" to the prompt'),
          opt('d', 'Subir max_tokens para que tenga más espacio', 'Raise max_tokens to give it more room'),
        ],
        correctOptionId: 'b',
        explanation: bi(
          'Alucina porque el dato no está, no porque sea creativo. Dar la fuente y una salida de escape ("no consta") convierte el invento en una respuesta honesta.',
          'It hallucinates because the datum is missing, not because it is creative. Providing the source and an escape hatch ("not found") turns invention into an honest answer.'
        ),
        xp: 15,
      },
      {
        id: 'ai01-e12',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Por qué un modelo puede alucinar aunque uses temperature 0 y un prompt perfecto?', 'Why can a model hallucinate even with temperature 0 and a perfect prompt?'),
        options: [
          opt('a', 'Porque temperature 0 solo funciona en modelos pequeños', 'Because temperature 0 only works on small models'),
          opt('b', 'Porque optimiza verosimilitud estadística, no verificación de hechos', 'Because it optimises statistical plausibility, not fact verification'),
          opt('c', 'Porque el prompt se borra del contexto', 'Because the prompt is erased from the context'),
          opt('d', 'Porque la API devuelve caché de otros usuarios', 'Because the API returns cache from other users'),
        ],
        correctOptionId: 'b',
        explanation: bi('Determinismo ≠ verdad. Con 0 siempre dará la misma respuesta; si esa respuesta es inventada, la inventará de forma consistente.', 'Determinism ≠ truth. At 0 it always gives the same answer; if that answer is invented, it invents it consistently.'),
        xp: 20,
      },
      {
        id: 'ai01-e13',
        format: 'scenario',
        difficulty: 2,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi('Vas a meter un LLM en un proceso de tu empresa. ¿Qué haces primero?', 'You are about to put an LLM into a company process. What do you do first?'),
        options: [
          opt('a', 'Definir el contrato de salida y qué pasa cuando falla', 'Define the output contract and what happens when it fails'),
          opt('b', 'Elegir el modelo más grande disponible', 'Pick the largest available model'),
          opt('c', 'Escribir un prompt creativo y largo', 'Write a long creative prompt'),
          opt('d', 'Conectarlo directo a la base de datos de producción', 'Connect it straight to the production database'),
        ],
        correctOptionId: 'a',
        explanation: bi('El 90% de los fallos en producción son de contrato, no de modelo. Sin salida definida y ruta de error, nada es auditable.', '90% of production failures are contract failures, not model failures. Without a defined output and an error path, nothing is auditable.'),
        xp: 10,
      },
    ],
    recap: [
      bi('Predice tokens: no consulta hechos. Por eso alucina con naturalidad.', 'It predicts tokens: it does not look facts up. That is why it hallucinates naturally.'),
      bi('Temperatura 0 cuando la salida se guarda o se ejecuta; alta solo en creativo.', 'Temperature 0 when the output is stored or executed; high only for creative work.'),
      bi('La ventana de contexto incluye la respuesta: reserva tokens o el JSON se corta.', 'The context window includes the answer: reserve tokens or the JSON gets truncated.'),
    ],
    actionMission: {
      id: 'mission-ai-1',
      title: bi('Audita un prompt tuyo con contrato de salida', 'Audit one of your prompts with an output contract'),
      objective: bi(
        'Coge un prompt que uses de verdad y añádele contrato de salida, temperatura explícita y un valor de escape para "no lo sé".',
        'Take a prompt you actually use and add an output contract, an explicit temperature and an escape value for "I do not know".'
      ),
      steps: [
        bi('Escribe el JSON o formato exacto que necesitas, con los valores permitidos.', 'Write the exact JSON or format you need, with allowed values.'),
        bi('Fija temperature 0 y max_tokens calculado, no a ojo.', 'Set temperature 0 and a calculated max_tokens, not a guess.'),
        bi('Lánzalo 5 veces con la misma entrada y comprueba que la salida es idéntica.', 'Run it 5 times with the same input and check the output is identical.'),
      ],
      proof: bi('5 ejecuciones → 5 salidas idénticas y parseables. Si varían, tu temperatura no está aplicada.', '5 runs → 5 identical, parseable outputs. If they vary, your temperature is not applied.'),
      affiliateToolSlug: 'make-automation',
      xpBonus: 25,
    },
  },
  /* ---------------------------------------------------------------- L2 -- */
  {
    slug: 'ai-02-prompts-deterministas',
    unitSlug: 'ai-unit-1',
    trackSlug: 'ai-automation',
    orderIndex: 2,
    title: bi('Prompts que no dependen de la suerte', 'Prompts that do not depend on luck'),
    outcome: bi(
      'Escribirás prompts con rol, contexto, tarea y contrato de salida que funcionan igual el lunes que el viernes.',
      'You will write prompts with role, context, task and output contract that behave the same on Monday and on Friday.'
    ),
    durationMin: 14,
    xpReward: 140,
    theory: [
      {
        id: 'ai02-t1',
        heading: bi('Un prompt vago pide suerte; uno con estructura pide trabajo', 'A vague prompt asks for luck; a structured one asks for work'),
        body: bi(
          'La diferencia entre un prompt amateur y uno profesional no es la longitud: es cuántas decisiones has tomado por el modelo. Rol, contexto, tarea, restricciones y formato. Lo que no especifiques, lo inventará.',
          'The gap between an amateur and a professional prompt is not length: it is how many decisions you made for the model. Role, context, task, constraints, format. Whatever you leave out, it will invent.'
        ),
        diagram: {
          kind: 'layers',
          layers: [
            { label: bi('ROL — quién responde', 'ROLE — who answers'), note: bi('"Eres analista de soporte de una tienda de e-commerce"', '"You are a support analyst for an e-commerce store"'), tone: 'info' },
            { label: bi('CONTEXTO — qué sabe que tú sabes', 'CONTEXT — what it knows that you know'), note: bi('Datos del negocio, políticas, ejemplos reales', 'Business data, policies, real examples'), tone: 'info' },
            { label: bi('TAREA — el verbo y el objeto', 'TASK — the verb and the object'), note: bi('"Clasifica cada ticket en una categoría"', '"Classify each ticket into one category"'), tone: 'warn' },
            { label: bi('RESTRICCIONES — lo que no puede hacer', 'CONSTRAINTS — what it must not do'), note: bi('Longitud, tono, valores prohibidos, salida de escape', 'Length, tone, forbidden values, escape hatch'), tone: 'warn' },
            { label: bi('CONTRATO — el formato exacto', 'CONTRACT — the exact format'), tone: 'good' },
          ],
        },
        why: bi('Cada capa que omites es una variable que el modelo decide al azar.', 'Every layer you omit is a variable the model decides at random.'),
      },
      {
        id: 'ai02-t2',
        heading: bi('Few-shot: enseñar con ejemplos, no con adjetivos', 'Few-shot: teach with examples, not adjectives'),
        body: bi(
          'Decir "sé conciso" no funciona de forma fiable. Mostrar tres pares entrada→salida sí. Dos o tres ejemplos bastan; más de cinco consumen contexto y aportan poco.',
          'Saying "be concise" does not work reliably. Showing three input→output pairs does. Two or three examples are enough; more than five burn context and add little.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('Instrucción con adjetivos', 'Adjective instruction'),
            tone: 'bad',
            items: [
              bi('"Responde de forma profesional y concisa"', '"Answer in a professional and concise way"'),
              bi('Cada persona tiene una idea distinta de "conciso"', 'Everyone has a different idea of "concise"'),
              bi('Resultado: longitud variable entre ejecuciones', 'Result: variable length between runs'),
            ],
          },
          right: {
            title: bi('Instrucción con ejemplos', 'Example instruction'),
            tone: 'good',
            items: [
              bi('3 pares entrada → salida exactos', '3 exact input → output pairs'),
              bi('El modelo imita longitud y tono medibles', 'The model imitates measurable length and tone'),
              bi('Resultado: estable y auditable', 'Result: stable and auditable'),
            ],
          },
        },
      },
      {
        id: 'ai02-t3',
        heading: bi('Cadena de pensamiento: cuándo ayuda y cuándo estorba', 'Chain of thought: when it helps and when it hurts'),
        body: bi(
          'Pedir que razone antes de responder mejora tareas con varios pasos (cálculo, clasificación con criterio). Pero en salida JSON el razonamiento contamina el parseo. Solución: razonar en un campo separado del contrato.',
          'Asking it to reason before answering improves multi-step tasks (calculation, judgment-based classification). But in JSON output the reasoning pollutes parsing. Solution: keep reasoning in a separate field of the contract.'
        ),
        diagram: {
          kind: 'code',
          lang: 'json',
          lines: [
            { text: '{', tone: 'good' },
            { text: '  "razonamiento": "el cliente menciona 2 veces el plazo",', tone: 'info', label: bi('campo interno', 'internal field') },
            { text: '  "categoria": "envio",', tone: 'good' },
            { text: '  "urgencia": 3', tone: 'good' },
            { text: '}', tone: 'good' },
            { text: '// Lees "categoria". Ignoras "razonamiento".', tone: 'mute', label: bi('tu código', 'your code') },
          ],
        },
      },
      {
        id: 'ai02-t4',
        heading: bi('El prompt es código: se versiona y se prueba', 'The prompt is code: it gets versioned and tested'),
        body: bi(
          'Guarda cada prompt con versión, fecha y casos de prueba. Cuando cambies una palabra, vuelve a pasar los casos. Sin eso, cada edición es una ruleta que descubres en producción.',
          'Store every prompt with version, date and test cases. When you change a word, re-run the cases. Without that, every edit is a roulette you discover in production.'
        ),
        diagram: {
          kind: 'flow',
          nodes: [
            { id: 'v1', label: bi('prompt v1', 'prompt v1'), tone: 'info' },
            { id: 't1', label: bi('10 casos de prueba', '10 test cases'), tone: 'info' },
            { id: 'v2', label: bi('prompt v2', 'prompt v2'), tone: 'warn' },
            { id: 't2', label: bi('Mismos 10 casos', 'Same 10 cases'), tone: 'warn' },
            { id: 'ok', label: bi('¿Mejora? → desplegar', 'Improved? → ship'), tone: 'good' },
          ],
        },
      },
    ],
    examples: [
      {
        id: 'ai02-ex1',
        title: bi('Ejemplo resuelto: de prompt vago a prompt de producción', 'Worked example: from vague prompt to production prompt'),
        situation: bi(
          'Un gestor de comunidad quiere resumir 300 reseñas de una semana y sacar los 3 problemas principales. Su prompt actual: "Resume estas reseñas y dime los problemas". Funciona el 60% de las veces.',
          'A community manager wants to summarise 300 reviews from one week and extract the top 3 problems. Their current prompt: "Summarise these reviews and tell me the problems". It works 60% of the time.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Diagnosticar qué decide el modelo por su cuenta', 'Step 1 · Diagnose what the model decides on its own'),
            detail: bi(
              'Sin rol, sin número de problemas, sin criterio de orden, sin formato. Cuatro decisiones al azar. Eso explica el 40% de fallos.',
              'No role, no number of problems, no ordering criterion, no format. Four random decisions. That explains the 40% failure rate.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Decisión', 'Decision'), bi('Prompt vago', 'Vague prompt'), bi('Quién decide', 'Who decides')],
              rows: [
                ['¿Cuántos problemas?', 'no dicho', 'el modelo'],
                ['¿Orden por qué?', 'no dicho', 'el modelo'],
                ['¿Formato?', 'texto libre', 'el modelo'],
                ['¿Qué cuenta como problema?', 'no dicho', 'el modelo'],
              ],
              note: bi('Cada "no dicho" es una fuente de variación.', 'Every "not said" is a source of variation.'),
            },
          },
          {
            label: bi('Paso 2 · Escribir las 5 capas', 'Step 2 · Write the 5 layers'),
            detail: bi(
              'Rol (analista de producto), contexto (tienda de e-commerce, 300 reseñas reales), tarea (agrupar por causa raíz), restricciones (máx. 3, orden por frecuencia, ignorar envíos puntuales), contrato (JSON).',
              'Role (product analyst), context (e-commerce store, 300 real reviews), task (group by root cause), constraints (max 3, ordered by frequency, ignore one-off shipping issues), contract (JSON).'
            ),
          },
          {
            label: bi('Paso 3 · Añadir 2 ejemplos de casos límite', 'Step 3 · Add 2 edge-case examples'),
            detail: bi(
              'Ejemplo A: una reseña que se queja del precio y del tallaje → cuenta como "tallaje" porque es la causa raíz accionable. Ejemplo B: solo 12 reseñas → devuelve 2 problemas, no rellena hasta 3.',
              'Example A: a review complaining about price and sizing → counts as "sizing" because that is the actionable root cause. Example B: only 12 reviews → return 2 problems, do not pad to 3.'
            ),
            diagram: {
              kind: 'code',
              lang: 'few-shot',
              lines: [
                { text: 'ENTRADA: "caro y me queda pequeño"', tone: 'info' },
                { text: 'SALIDA: { "problema": "tallaje", "causa_raiz": "guia de tallas", "frecuencia": 41 }', tone: 'good' },
                { text: '', tone: 'mute' },
                { text: 'ENTRADA: 12 resenas en total', tone: 'info' },
                { text: 'SALIDA: { "problemas": [2 elementos], "muestra_insuficiente": true }', tone: 'good', label: bi('escape', 'escape') },
              ],
            },
          },
          {
            label: bi('Paso 4 · Fijar parámetros y probar con 10 casos', 'Step 4 · Fix parameters and test with 10 cases'),
            detail: bi(
              'temperature 0, max_tokens 300. Pasamos 10 semanas históricas ya etiquetadas a mano y medimos coincidencia: 9/10.',
              'temperature 0, max_tokens 300. We run 10 historical weeks already labelled by hand and measure agreement: 9/10.'
            ),
            diagram: {
              kind: 'bars',
              max: 10,
              items: [
                { label: bi('Prompt vago', 'Vague prompt'), value: 6, tone: 'bad', note: bi('6/10 coinciden', '6/10 match') },
                { label: bi('Prompt v5 capas', '5-layer prompt'), value: 9, tone: 'good', note: bi('9/10 coinciden', '9/10 match') },
              ],
            },
          },
        ],
        result: bi(
          'De 6/10 a 9/10 de coincidencia con el etiquetado humano, y el fallo restante es detectable porque la salida incluye "muestra_insuficiente".',
          'From 6/10 to 9/10 agreement with human labelling, and the remaining failure is detectable because the output includes "insufficient_sample".'
        ),
        selfCheck: {
          prompt: bi('¿Cuál fue el cambio que más subió la fiabilidad?', 'Which change raised reliability the most?'),
          options: [
            opt('a', 'Añadir "sé profesional" al inicio', 'Adding "be professional" at the start'),
            opt('b', 'Eliminar las 4 decisiones que el modelo tomaba al azar (número, orden, formato, criterio)', 'Removing the 4 decisions the model made at random (number, order, format, criterion)'),
            opt('c', 'Usar un modelo más grande', 'Using a bigger model'),
            opt('d', 'Subir max_tokens a 2000', 'Raising max_tokens to 2000'),
          ],
          correctOptionId: 'b',
          explanation: bi(
            'La fiabilidad sube cuando reduces grados de libertad, no cuando añades adjetivos. Cada decisión que tomas tú es una que el modelo no puede equivocarse.',
            'Reliability rises when you reduce degrees of freedom, not when you add adjectives. Every decision you make is one the model cannot get wrong.'
          ),
        },
      },
    ],
    exercises: [
      {
        id: 'ai02-e01',
        format: 'ordering',
        difficulty: 1,
        badge: bi('ORDENAR', 'ORDER'),
        prompt: bi('Ordena las 5 capas de un prompt de producción.', 'Order the 5 layers of a production prompt.'),
        pieces: [
          { id: 'p1', text: bi('ROL — quién responde', 'ROLE — who answers') },
          { id: 'p2', text: bi('CONTEXTO — datos del negocio', 'CONTEXT — business data') },
          { id: 'p3', text: bi('TAREA — verbo y objeto', 'TASK — verb and object') },
          { id: 'p4', text: bi('RESTRICCIONES — lo prohibido', 'CONSTRAINTS — what is forbidden') },
          { id: 'p5', text: bi('CONTRATO — formato exacto', 'CONTRACT — exact format') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        explanation: bi('De lo general a lo específico. El contrato va al final porque es lo que el modelo tiene más fresco al responder.', 'From general to specific. The contract goes last because it is freshest in the model when it answers.'),
        xp: 8,
      },
      {
        id: 'ai02-e02',
        format: 'concept',
        difficulty: 1,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Qué es un contrato de salida en un prompt?', 'What is an output contract in a prompt?'),
        options: [
          opt('a', 'Un acuerdo legal con el proveedor del modelo', 'A legal agreement with the model provider'),
          opt('b', 'La especificación exacta del formato, campos y valores permitidos de la respuesta', 'The exact specification of the response format, fields and allowed values'),
          opt('c', 'El límite de tokens de la respuesta', 'The token limit of the response'),
          opt('d', 'Una instrucción de no inventar datos', 'An instruction not to invent data'),
        ],
        correctOptionId: 'b',
        explanation: bi('Es lo que permite que tu código consuma la respuesta sin adivinar. Sin contrato, cada respuesta tiene forma distinta.', 'It is what lets your code consume the answer without guessing. Without a contract, every answer has a different shape.'),
        xp: 8,
      },
      {
        id: 'ai02-e03',
        format: 'faded',
        difficulty: 2,
        badge: bi('COMPLETAR', 'COMPLETE'),
        prompt: bi('Completa el prompt. Los dos primeros bloques ya están escritos y bloqueados.', 'Complete the prompt. The first two blocks are already written and locked.'),
        pieces: [
          { id: 'p1', text: bi('ROL: Eres analista de soporte de e-commerce', 'ROLE: You are an e-commerce support analyst') },
          { id: 'p2', text: bi('CONTEXTO: Tienda de ropa, 300 tickets/semana', 'CONTEXT: Clothing store, 300 tickets/week') },
          { id: 'p3', text: bi('TAREA: Clasifica cada ticket en una sola categoría', 'TASK: Classify each ticket into a single category') },
          { id: 'p4', text: bi('RESTRICCIÓN: Máximo 20 palabras en el resumen; si no hay datos, devuelve "no_consta"', 'CONSTRAINT: Max 20 words in the summary; if there is no data, return "not_found"') },
          { id: 'p5', text: bi('CONTRATO: { categoria, urgencia, resumen }', 'CONTRACT: { category, urgency, summary }') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        lockedPieceIds: ['p1', 'p2'],
        explanation: bi('Fíjate en el bloque 4: incluye la salida de escape. Sin "no_consta", el modelo se inventa un resumen.', 'Notice block 4: it includes the escape hatch. Without "not_found", the model invents a summary.'),
        xp: 10,
      },
      {
        id: 'ai02-e04',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada instrucción vaga con su versión medible.', 'Match each vague instruction with its measurable version.'),
        pairs: [
          { leftId: 'l1', left: bi('"Sé conciso"', '"Be concise"'), rightId: 'r1', right: bi('"Máximo 20 palabras"', '"Maximum 20 words"') },
          { leftId: 'l2', left: bi('"Sé profesional"', '"Be professional"'), rightId: 'r2', right: bi('"Trata de usted, sin exclamaciones"', '"Use formal address, no exclamation marks"') },
          { leftId: 'l3', left: bi('"Dame los problemas"', '"Give me the problems"'), rightId: 'r3', right: bi('"Devuelve máximo 3, ordenados por frecuencia"', '"Return at most 3, ordered by frequency"') },
          { leftId: 'l4', left: bi('"Si no sabes, dilo"', '"If you do not know, say so"'), rightId: 'r4', right: bi('"Si el dato no está en el contexto, devuelve no_consta"', '"If the datum is not in context, return not_found"') },
        ],
        explanation: bi('Un adjetivo no es especificación. Si no puedes escribir un test que lo verifique, el modelo no lo cumplirá de forma estable.', 'An adjective is not a specification. If you cannot write a test that verifies it, the model will not meet it consistently.'),
        xp: 12,
      },
      {
        id: 'ai02-e05',
        format: 'worked_why',
        difficulty: 2,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('En el ejemplo, ¿por qué el caso B ("solo 12 reseñas") se incluyó como few-shot?', 'In the example, why was case B ("only 12 reviews") included as a few-shot?'),
        options: [
          opt('a', 'Para que el modelo aprenda el formato JSON', 'So the model learns the JSON format'),
          opt('b', 'Para que no rellene hasta 3 problemas inventándose causas', 'So it does not pad up to 3 problems by inventing causes'),
          opt('c', 'Para reducir el consumo de tokens', 'To reduce token consumption'),
          opt('d', 'Para que responda más rápido', 'So it answers faster'),
        ],
        correctOptionId: 'b',
        explanation: bi('El modelo odia dejar huecos: si pides 3 y solo hay 2 reales, inventará el tercero. El ejemplo de escape le da permiso para devolver menos.', 'The model hates leaving gaps: ask for 3 when only 2 are real and it will invent the third. The escape example gives it permission to return fewer.'),
        xp: 10,
      },
      {
        id: 'ai02-e06',
        format: 'output',
        difficulty: 3,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('¿Qué devuelve este prompt con temperature 0?', 'What does this prompt return at temperature 0?'),
        context: {
          label: bi('Prompt', 'Prompt'),
          content: bi(
            'Resume este email en 2 frases.\n\nEmail: "Hola, escribo porque mi pedido 4471 llegó ayer pero falta una camiseta azul talla M. El resto está bien. Necesito la camiseta antes del viernes porque es un regalo. Si no puede ser, prefiero el reembolso de esa prenda. Gracias."',
            'Summarise this email in 2 sentences.\n\nEmail: "Hi, I am writing because my order 4471 arrived yesterday but a blue M-size t-shirt is missing. The rest is fine. I need the t-shirt before Friday because it is a gift. If that is not possible, I would prefer a refund for that item. Thanks."'
          ),
        },
        options: [
          opt('a', 'Siempre el mismo resumen de 2 frases con la misma entrada', 'Always the same 2-sentence summary for the same input'),
          opt('b', 'Un resumen distinto en cada ejecución', 'A different summary on each run'),
          opt('c', 'Un resumen de longitud variable porque no hay límite de palabras', 'A variable-length summary because there is no word limit'),
          opt('d', 'Un error porque falta el contrato de salida', 'An error because the output contract is missing'),
        ],
        correctOptionId: 'a',
        explanation: bi(
          'temperature 0 + misma entrada = misma salida. El prompt es mejorable (falta criterio de qué incluir), pero es determinista. La opción C confunde determinismo con calidad.',
          'temperature 0 + same input = same output. The prompt is improvable (no criterion for what to include), but it is deterministic. Option C confuses determinism with quality.'
        ),
        xp: 12,
      },
      {
        id: 'ai02-e07',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('Este prompt devuelve texto antes del JSON un 15% de las veces. ¿Qué línea lo causa?', 'This prompt returns text before the JSON 15% of the time. Which line causes it?'),
        lines: [
          { id: 'c1', text: 'ROL: Eres un clasificador de tickets.', tone: 'good' },
          { id: 'c2', text: 'TAREA: Clasifica el ticket y explica tu razonamiento en detalle.', tone: 'bad', label: bi('sospechoso', 'suspect') },
          { id: 'c3', text: 'CONTRATO: Devuelve JSON con campos categoria y urgencia.', tone: 'good' },
          { id: 'c4', text: 'temperature: 0, max_tokens: 300', tone: 'good' },
        ],
        correctLineId: 'c2',
        explanation: bi(
          '"Explica tu razonamiento en detalle" choca con "devuelve JSON": el modelo escribe prosa y luego el JSON. Solución: meter el razonamiento DENTRO del contrato como campo.',
          '"Explain your reasoning in detail" clashes with "return JSON": the model writes prose then the JSON. Fix: put the reasoning INSIDE the contract as a field.'
        ),
        xp: 12,
      },
      {
        id: 'ai02-e08',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Prompt: system 350 tokens + 3 ejemplos de 90 tokens + entrada 120 tokens. Procesas 4 000 tickets/mes. ¿Cuántos millones de tokens de entrada consumes al mes?',
          'Prompt: system 350 tokens + 3 examples of 90 tokens + input 120 tokens. You process 4,000 tickets/month. How many millions of input tokens do you consume per month?'
        ),
        answer: 2.96,
        tolerance: 0.05,
        unit: 'M',
        formula: bi('(350 + 3·90 + 120) · 4000 / 1 000 000', '(350 + 3·90 + 120) · 4000 / 1,000,000'),
        explanation: bi('350 + 270 + 120 = 740 tokens por llamada. 740 × 4 000 = 2 960 000 = 2,96M. Los ejemplos cuestan el 36% del total: quita los que no enseñan criterio.', '350 + 270 + 120 = 740 tokens per call. 740 × 4,000 = 2,960,000 = 2.96M. Examples cost 36% of the total: drop the ones that teach no judgment.'),
        xp: 12,
      },
      {
        id: 'ai02-e09',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'Tu prompt de clasificación acierta el 88% en tus 10 casos de prueba. En producción baja al 71%. ¿Cuál es la causa más probable?',
          'Your classification prompt scores 88% on your 10 test cases. In production it drops to 71%. What is the most likely cause?'
        ),
        options: [
          opt('a', 'El modelo cambió de versión en secreto', 'The model silently changed version'),
          opt('b', 'Tus 10 casos son todos del mismo tipo; producción trae casos que no cubriste', 'Your 10 cases are all of one kind; production brings cases you did not cover'),
          opt('c', 'La temperatura sube con el volumen de peticiones', 'Temperature rises with request volume'),
          opt('d', 'Los usuarios escriben más rápido en producción', 'Users type faster in production'),
        ],
        correctOptionId: 'b',
        explanation: bi(
          'Un set de prueba homogéneo mide tu mejor caso, no el real. La práctica es construir el set con casos raros reales recogidos de producción y volver a medir.',
          'A homogeneous test set measures your best case, not the real one. The practice is to build the set with real odd cases collected from production and re-measure.'
        ),
        xp: 15,
      },
      {
        id: 'ai02-e10',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos prompts piden razonamiento. (A) clasificación con JSON. (B) resolver un problema de lógica en texto. ¿Dónde pide cadena de pensamiento explícita?',
          'Two prompts ask for reasoning. (A) classification with JSON output. (B) solving a logic problem in text. Where do you ask for explicit chain of thought?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Prompt', 'Prompt'), bi('Salida', 'Output'), bi('Consumidor', 'Consumer')],
          rows: [
            ['A · clasificación', 'JSON estricto', 'un parser'],
            ['B · lógica', 'texto libre', 'una persona'],
          ],
          highlightRow: 1,
        },
        options: [
          opt('a', 'En los dos, siempre mejora', 'In both, it always improves'),
          opt('b', 'Solo en B; en A el razonamiento va dentro del JSON como campo, no fuera', 'Only in B; in A the reasoning goes inside the JSON as a field, not outside'),
          opt('c', 'Solo en A', 'Only in A'),
          opt('d', 'En ninguno: el razonamiento siempre empeora', 'In neither: reasoning always makes it worse'),
        ],
        correctOptionId: 'b',
        explanation: bi('En A el consumidor es código: cualquier texto fuera del JSON rompe el parseo. En B el consumidor es humano: el razonamiento es el valor.', 'In A the consumer is code: any text outside the JSON breaks parsing. In B the consumer is human: the reasoning is the value.'),
        xp: 15,
      },
      {
        id: 'ai02-e11',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'Un cliente quiere "que la IA escriba como nosotros" y te enseña 40 textos. ¿Qué haces?',
          'A client wants "the AI to write like us" and shows you 40 texts. What do you do?'
        ),
        options: [
          opt('a', 'Meter los 40 textos en el system prompt', 'Put all 40 texts in the system prompt'),
          opt('b', 'Extraer 5 reglas medibles de esos textos (longitud de frase, tratamiento, palabras vetadas) y 3 ejemplos representativos', 'Extract 5 measurable rules from those texts (sentence length, address form, banned words) plus 3 representative examples'),
          opt('c', 'Escribir "imita el estilo de la marca"', 'Write "imitate the brand style"'),
          opt('d', 'Usar temperature 1.2 para que sea más creativo', 'Use temperature 1.2 to make it more creative'),
        ],
        correctOptionId: 'b',
        explanation: bi('40 textos revientan el contexto y diluyen la señal. Las reglas medibles + 3 ejemplos capturan el estilo en una décima parte de tokens y son auditables.', '40 texts blow the context and dilute the signal. Measurable rules + 3 examples capture the style in a tenth of the tokens and are auditable.'),
        xp: 15,
      },
      {
        id: 'ai02-e12',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Por qué se dice que un prompt es código y no texto?', 'Why is a prompt said to be code and not text?'),
        options: [
          opt('a', 'Porque se escribe en un editor de código', 'Because it is written in a code editor'),
          opt('b', 'Porque cambia el comportamiento de un sistema en producción, así que necesita versión, tests y despliegue controlado', 'Because it changes the behaviour of a production system, so it needs versioning, tests and controlled deployment'),
          opt('c', 'Porque contiene variables entre llaves', 'Because it contains variables in braces'),
          opt('d', 'Porque solo los programadores pueden escribirlo', 'Because only programmers can write it'),
        ],
        correctOptionId: 'b',
        explanation: bi('Trátalo como código: repositorio, versión, casos de prueba y revisión antes de desplegar. Es la diferencia entre un prompt y un sistema.', 'Treat it like code: repository, version, test cases and review before shipping. That is the difference between a prompt and a system.'),
        xp: 20,
      },
      {
        id: 'ai02-e13',
        format: 'scenario',
        difficulty: 2,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi('Vas a cambiar una palabra de un prompt que lleva 3 meses en producción. ¿Qué haces?', 'You are about to change one word in a prompt that has been in production for 3 months. What do you do?'),
        options: [
          opt('a', 'Cambiarlo y vigilar la primera semana', 'Change it and watch the first week'),
          opt('b', 'Pasar el set de casos de prueba antes y después, y comparar las métricas', 'Run the test-case set before and after, and compare the metrics'),
          opt('c', 'Crear un prompt nuevo desde cero', 'Create a brand new prompt from scratch'),
          opt('d', 'No cambiarlo nunca', 'Never change it'),
        ],
        correctOptionId: 'b',
        explanation: bi('Sin medición previa no sabes si mejoraste o rompiste. Diez casos ejecutados en 2 minutos valen más que una semana de vigilancia pasiva.', 'Without a before measurement you cannot tell whether you improved or broke something. Ten cases run in 2 minutes beat a week of passive watching.'),
        xp: 10,
      },
    ],
    recap: [
      bi('5 capas: rol, contexto, tarea, restricciones y contrato. Lo que no especifiques, se inventa.', '5 layers: role, context, task, constraints, contract. What you do not specify gets invented.'),
      bi('Sustituye adjetivos por números medibles y ejemplos de casos límite.', 'Replace adjectives with measurable numbers and edge-case examples.'),
      bi('El prompt es código: versión + set de casos + comparación antes y después.', 'The prompt is code: version + case set + before-and-after comparison.'),
    ],
    actionMission: {
      id: 'mission-ai-2',
      title: bi('Reescribe un prompt tuyo con las 5 capas', 'Rewrite one of your prompts with the 5 layers'),
      objective: bi('Coge tu prompt más usado y reescríbelo con rol, contexto, tarea, restricciones medibles y contrato.', 'Take your most-used prompt and rewrite it with role, context, task, measurable constraints and contract.'),
      steps: [
        bi('Escribe el prompt actual y ejecútalo 3 veces. Guarda las 3 salidas.', 'Write the current prompt and run it 3 times. Save all 3 outputs.'),
        bi('Lista las decisiones que el modelo tomó solo (longitud, orden, criterio).', 'List the decisions the model made on its own (length, order, criterion).'),
        bi('Reescribe con las 5 capas y vuelve a ejecutar 3 veces. Compara.', 'Rewrite with the 5 layers and run 3 times again. Compare.'),
      ],
      proof: bi('Las 3 salidas nuevas tienen la misma estructura y longitud. Las antiguas no.', 'The 3 new outputs share structure and length. The old ones do not.'),
      affiliateToolSlug: 'openai-api',
      xpBonus: 25,
    },
  },
  /* ---------------------------------------------------------------- L3 -- */
  {
    slug: 'ai-03-salida-json',
    unitSlug: 'ai-unit-1',
    trackSlug: 'ai-automation',
    orderIndex: 3,
    title: bi('Salida estructurada que no rompe producción', 'Structured output that does not break production'),
    outcome: bi(
      'Montarás un esquema JSON validado con reintento y ruta de fallo, y sabrás por qué falla el parsing.',
      'You will build a validated JSON schema with retry and failure path, and know why parsing breaks.'
    ),
    durationMin: 13,
    xpReward: 130,
    theory: [
      {
        id: 'ai03-t1',
        heading: bi('El JSON de un LLM falla por 4 causas, no por magia', 'LLM JSON fails for 4 causes, not by magic'),
        body: bi(
          'Truncamiento por max_tokens, texto antes o después del JSON, comillas sin escapar dentro de un valor, y valores fuera del rango permitido. Las cuatro se previenen con diseño, no con suerte.',
          'Truncation from max_tokens, text before or after the JSON, unescaped quotes inside a value, and out-of-range values. All four are prevented by design, not by luck.'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Fallo', 'Failure'), bi('Cómo se ve', 'What it looks like'), bi('Causa', 'Cause')],
          rows: [
            ['Truncado', '{ "a": 1, "b":', 'max_tokens corto'],
            ['Contaminado', 'Claro, aqui tienes: {...}', 'no hay "solo JSON"'],
            ['Comillas', '"nota": "dijo "no""', 'valor con cita textual'],
            ['Fuera de rango', '"urgencia": 9', 'rango no validado'],
          ],
        },
      },
      {
        id: 'ai03-t2',
        heading: bi('Esquema cerrado: enum, no texto libre', 'Closed schema: enum, not free text'),
        body: bi(
          'Si aceptas cualquier string en "categoria", tendrás 40 variantes de la misma categoría y tus informes no sumarán. Un enum con 5 valores convierte un problema de limpieza en un problema de decisión.',
          'If you accept any string in "category", you will get 40 variants of the same category and your reports will not add up. A 5-value enum turns a data-cleaning problem into a decision problem.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('String libre', 'Free string'),
            tone: 'bad',
            items: [
              bi('"envio", "envío", "Envio urgente", "shipping"', '"shipping", "Shipping", "Urgent shipping", "delivery"'),
              bi('Imposible agrupar sin limpiar a mano', 'Impossible to group without manual cleaning'),
              bi('El informe miente por categorías duplicadas', 'The report lies through duplicate categories'),
            ],
          },
          right: {
            title: bi('Enum cerrado', 'Closed enum'),
            tone: 'good',
            items: [
              bi('"envio" | "producto" | "pago" | "otro"', '"shipping" | "product" | "payment" | "other"'),
              bi('Agrupable desde el primer día', 'Groupable from day one'),
              bi('Validable antes de escribir en DB', 'Validatable before writing to DB'),
            ],
          },
        },
      },
      {
        id: 'ai03-t3',
        heading: bi('Validar, reintentar una vez, y luego humano', 'Validate, retry once, then human'),
        body: bi(
          'Reintentar en bucle quema dinero y tiempo: el mismo prompt suele dar el mismo fallo. Un reintento con el mensaje de error incluido resuelve la mayoría; lo que sigue fallando va a una cola que alguien revisa.',
          'Retrying in a loop burns money and time: the same prompt usually gives the same failure. One retry including the error message fixes most of it; what still fails goes to a queue someone reviews.'
        ),
        diagram: {
          kind: 'flow',
          nodes: [
            { id: 'a', label: bi('LLM', 'LLM'), tone: 'info' },
            { id: 'b', label: bi('Parsear', 'Parse'), tone: 'info' },
            { id: 'c', label: bi('Validar esquema', 'Validate schema'), tone: 'info' },
            { id: 'd', label: bi('Guardar', 'Save'), tone: 'good' },
          ],
          branch: {
            label: bi('Falla → reintento 1 con el error incluido → si vuelve a fallar, cola manual + alerta', 'Fails → retry 1 including the error → if it fails again, manual queue + alert'),
            tone: 'bad',
          },
        },
        why: bi('Ningún ticket desaparece. El sistema degrada a humano, no a silencio.', 'No ticket disappears. The system degrades to human, not to silence.'),
      },
    ],
    examples: [
      {
        id: 'ai03-ex1',
        title: bi('Ejemplo resuelto: extraer datos de facturas para contabilidad', 'Worked example: extracting invoice data for accounting'),
        situation: bi(
          'Una gestoría recibe 500 facturas al mes en PDF. Hoy alguien las transcribe. Queremos extraer proveedor, importe, IVA, fecha y número, y que contabilidad no tenga que corregir el 40%.',
          'An accounting firm receives 500 invoices a month in PDF. Today someone transcribes them. We want to extract supplier, amount, VAT, date and number, and stop accounting from correcting 40% of them.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Esquema con tipos cerrados y formato de fecha', 'Step 1 · Schema with closed types and a date format'),
            detail: bi(
              'Cada campo con tipo. La fecha con formato explícito ISO, porque "03/04/2026" es 3 de abril o 4 de marzo según quién lo lea.',
              'Every field typed. The date with an explicit ISO format, because "03/04/2026" is 3 April or 4 March depending on who reads it.'
            ),
            diagram: {
              kind: 'code',
              lang: 'schema',
              lines: [
                { text: 'proveedor:   string (1-80)', tone: 'good' },
                { text: 'numero:      string, patron "^[A-Z0-9/-]{3,20}$"', tone: 'good' },
                { text: 'fecha:       string ISO "YYYY-MM-DD"', tone: 'good', label: bi('sin ambigüedad', 'unambiguous') },
                { text: 'base:        number, 2 decimales', tone: 'good' },
                { text: 'iva_pct:     enum [0, 4, 10, 21]', tone: 'info', label: bi('cerrado', 'closed') },
                { text: 'total:       number, 2 decimales', tone: 'good' },
                { text: 'legible:     boolean  // false si el PDF no se lee', tone: 'warn', label: bi('escape', 'escape') },
              ],
            },
          },
          {
            label: bi('Paso 2 · Regla de coherencia aritmética', 'Step 2 · Arithmetic consistency rule'),
            detail: bi(
              'total debe cumplir base × (1 + iva/100) con margen de 0,02 por redondeo. Si no cuadra, el dato es sospechoso y se marca para revisión.',
              'total must satisfy base × (1 + vat/100) within a 0.02 margin for rounding. If it does not add up, the datum is suspect and gets flagged for review.'
            ),
            diagram: {
              kind: 'equation',
              tokens: [
                { text: 'base', tone: 'info', label: bi('extraído', 'extracted') },
                { text: '×' },
                { text: '(1 + iva/100)', tone: 'info' },
              ],
              result: { text: 'total ± 0,02', tone: 'good' },
            },
          },
          {
            label: bi('Paso 3 · Salida de escape para lo ilegible', 'Step 3 · Escape hatch for the unreadable'),
            detail: bi(
              'El campo "legible: false" evita que el modelo invente un importe en un PDF escaneado borroso. Sin ese campo, rellena con el número más plausible.',
              'The "legible: false" field stops the model from inventing an amount on a blurry scanned PDF. Without that field, it fills in the most plausible number.'
            ),
          },
          {
            label: bi('Paso 4 · Medir el resultado real', 'Step 4 · Measure the real result'),
            detail: bi(
              'Sobre 500 facturas de un mes anterior ya transcritas: 89% sin corrección, 8% marcadas como sospechosas por la regla aritmética y corregidas en segundos, 3% ilegibles que van a humano.',
              'On 500 invoices from a previous month already transcribed: 89% with no correction, 8% flagged as suspect by the arithmetic rule and fixed in seconds, 3% unreadable going to a human.'
            ),
            diagram: {
              kind: 'stack',
              total: 500,
              parts: [
                { label: bi('Sin corrección', 'No correction'), value: 445, tone: 'good' },
                { label: bi('Marcadas y corregidas', 'Flagged and fixed'), value: 40, tone: 'warn' },
                { label: bi('Ilegibles → humano', 'Unreadable → human'), value: 15, tone: 'bad' },
              ],
            },
          },
        ],
        result: bi(
          'De 500 transcripciones manuales a 15. La regla aritmética es lo que convierte un 92% aparente en un 97% real: detecta el error antes de que llegue a contabilidad.',
          'From 500 manual transcriptions to 15. The arithmetic rule is what turns an apparent 92% into a real 97%: it catches the error before it reaches accounting.'
        ),
        selfCheck: {
          prompt: bi('¿Qué aporta la regla aritmética que el esquema no aporta?', 'What does the arithmetic rule add that the schema does not?'),
          options: [
            opt('a', 'Hace que el modelo extraiga mejor los números', 'It makes the model extract numbers better'),
            opt('b', 'Detecta valores formalmente válidos pero imposibles en la realidad', 'It detects values that are formally valid but impossible in reality'),
            opt('c', 'Reduce el consumo de tokens', 'It reduces token consumption'),
            opt('d', 'Sustituye al campo "legible"', 'It replaces the "legible" field'),
          ],
          correctOptionId: 'b',
          explanation: bi('Un esquema valida forma (es un número de 2 decimales). La regla aritmética valida coherencia (ese número no puede ser ese total). Son capas distintas.', 'A schema validates shape (it is a 2-decimal number). The arithmetic rule validates coherence (that number cannot be that total). Different layers.'),
        },
      },
    ],
    exercises: [
      {
        id: 'ai03-e01',
        format: 'concept',
        difficulty: 1,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Por qué se usa un enum en lugar de un string libre para una categoría?', 'Why use an enum instead of a free string for a category?'),
        options: [
          opt('a', 'Porque consume menos tokens', 'Because it consumes fewer tokens'),
          opt('b', 'Porque limita los valores posibles y hace los datos agrupables y validables', 'Because it limits the possible values and makes data groupable and validatable'),
          opt('c', 'Porque el modelo responde más rápido', 'Because the model answers faster'),
          opt('d', 'Porque evita las alucinaciones', 'Because it prevents hallucinations'),
        ],
        correctOptionId: 'b',
        explanation: bi('Un enum no evita que el modelo elija mal, pero evita que elija "fuera del menú". Eso ya elimina la limpieza de datos posterior.', 'An enum does not stop the model choosing wrongly, but it stops it choosing "off the menu". That alone removes downstream data cleaning.'),
        xp: 8,
      },
      {
        id: 'ai03-e02',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada fallo de JSON con su prevención.', 'Match each JSON failure with its prevention.'),
        pairs: [
          { leftId: 'l1', left: bi('JSON cortado a medias', 'JSON cut in half'), rightId: 'r1', right: bi('Calcular max_tokens con la salida real', 'Calculate max_tokens from the real output') },
          { leftId: 'l2', left: bi('"Claro, aquí tienes:" antes del JSON', '"Sure, here it is:" before the JSON'), rightId: 'r2', right: bi('Instrucción explícita + extraer desde la primera llave', 'Explicit instruction + extract from the first brace') },
          { leftId: 'l3', left: bi('Comillas dentro de un valor', 'Quotes inside a value'), rightId: 'r3', right: bi('Pedir que escape o usar campo de texto sin citas', 'Ask it to escape or use a quote-free text field') },
          { leftId: 'l4', left: bi('Fecha ambigua 03/04/2026', 'Ambiguous date 03/04/2026'), rightId: 'r4', right: bi('Forzar formato ISO YYYY-MM-DD', 'Force ISO YYYY-MM-DD format') },
        ],
        explanation: bi('Los cuatro son fallos de diseño del contrato, no del modelo. Se arreglan antes de la llamada.', 'All four are contract design failures, not model failures. They are fixed before the call.'),
        xp: 12,
      },
      {
        id: 'ai03-e03',
        format: 'ordering',
        difficulty: 2,
        badge: bi('ORDENAR', 'ORDER'),
        prompt: bi('Ordena la cadena de tratamiento de una respuesta de LLM en producción.', 'Order the response-handling chain for an LLM in production.'),
        pieces: [
          { id: 'p1', text: bi('Recibir la respuesta del modelo', 'Receive the model response') },
          { id: 'p2', text: bi('Extraer el bloque JSON (primera llave a última)', 'Extract the JSON block (first brace to last)') },
          { id: 'p3', text: bi('Parsear con JSON.parse', 'Parse with JSON.parse') },
          { id: 'p4', text: bi('Validar campos y rangos contra el esquema', 'Validate fields and ranges against the schema') },
          { id: 'p5', text: bi('Comprobar reglas de coherencia (aritmética)', 'Check coherence rules (arithmetic)') },
          { id: 'p6', text: bi('Escribir en base de datos', 'Write to the database') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'],
        explanation: bi('Extraer antes de parsear. Validar forma antes que coherencia. Escribir solo al final: nunca a medias.', 'Extract before parsing. Validate shape before coherence. Write only at the end: never halfway.'),
        xp: 10,
      },
      {
        id: 'ai03-e04',
        format: 'faded',
        difficulty: 3,
        badge: bi('COMPLETAR', 'COMPLETE'),
        prompt: bi('Completa el esquema de extracción de un curriculum. Los dos primeros campos ya están.', 'Complete the resume-extraction schema. The first two fields are already there.'),
        pieces: [
          { id: 'p1', text: bi('nombre: string (1-80)', 'name: string (1-80)') },
          { id: 'p2', text: bi('email: string con patrón de email', 'email: string with an email pattern') },
          { id: 'p3', text: bi('anios_experiencia: number entero 0-50', 'years_experience: integer number 0-50') },
          { id: 'p4', text: bi('seniority: enum ["junior","mid","senior","lead"]', 'seniority: enum ["junior","mid","senior","lead"]') },
          { id: 'p5', text: bi('datos_presentes: boolean (false si el CV no se lee)', 'data_present: boolean (false if the CV is unreadable)') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        lockedPieceIds: ['p1', 'p2'],
        explanation: bi('El orden importa por otra razón: el booleano de escape va al final, después de los datos, para que el modelo intente extraer antes de rendirse.', 'The order matters for another reason: the escape boolean goes last, after the data, so the model tries to extract before giving up.'),
        xp: 12,
      },
      {
        id: 'ai03-e05',
        format: 'worked_why',
        difficulty: 2,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('En el ejemplo de facturas, ¿qué pasaría sin el campo "legible"?', 'In the invoice example, what would happen without the "legible" field?'),
        options: [
          opt('a', 'Nada, el modelo devolvería JSON vacío', 'Nothing, the model would return empty JSON'),
          opt('b', 'En un PDF borroso inventaría un importe plausible y contabilidad lo daría por bueno', 'On a blurry PDF it would invent a plausible amount and accounting would accept it'),
          opt('c', 'El JSON no parsearía', 'The JSON would not parse'),
          opt('d', 'Consumiría más tokens', 'It would consume more tokens'),
        ],
        correctOptionId: 'b',
        explanation: bi('Sin salida de escape, el modelo rellena. Y un número inventado con dos decimales es indistinguible de uno real para quien lo lee.', 'Without an escape hatch, the model fills in. And an invented number with two decimals is indistinguishable from a real one for whoever reads it.'),
        xp: 10,
      },
      {
        id: 'ai03-e06',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Factura: base 1 250 €, IVA 21%. El modelo extrae total 1 462,50 €. ¿Cuánto se desvía del total correcto y supera el margen de 0,02 €?',
          'Invoice: base €1,250, VAT 21%. The model extracts total €1,462.50. How far is it from the correct total, and does it exceed the €0.02 margin?'
        ),
        answer: 50,
        tolerance: 0.5,
        unit: '€',
        formula: bi('base × (1 + iva/100) = 1250 × 1,21', 'base × (1 + vat/100) = 1250 × 1.21'),
        explanation: bi('Correcto: 1250 × 1,21 = 1 512,50 €. Extraído: 1 462,50 €. Desviación 50 €, muy por encima de 0,02 € → se marca como sospechosa.', 'Correct: 1250 × 1.21 = €1,512.50. Extracted: €1,462.50. Deviation €50, far above €0.02 → flagged as suspect.'),
        xp: 12,
      },
      {
        id: 'ai03-e07',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('Este manejador pierde datos silenciosamente en producción. ¿Qué línea es el problema?', 'This handler silently loses data in production. Which line is the problem?'),
        lines: [
          { id: 'c1', text: 'const raw = await llm(prompt)', tone: 'good' },
          { id: 'c2', text: 'try { const data = JSON.parse(raw) } catch { return null }', tone: 'bad', label: bi('sospechoso', 'suspect') },
          { id: 'c3', text: 'if (!data.categoria) return null', tone: 'warn' },
          { id: 'c4', text: 'await db.insert(data)', tone: 'good' },
        ],
        correctLineId: 'c2',
        explanation: bi(
          'El catch devuelve null sin registrar nada ni reintentar: el ticket desaparece y nadie se entera. Falta reintento con el error incluido, cola manual y alerta.',
          'The catch returns null without logging or retrying: the ticket vanishes and nobody notices. Missing: retry with the error included, manual queue and alert.'
        ),
        xp: 12,
      },
      {
        id: 'ai03-e08',
        format: 'output',
        difficulty: 3,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('¿Qué devuelve JSON.parse sobre esta respuesta real de un modelo?', 'What does JSON.parse return on this real model response?'),
        context: {
          mono: true,
          content: bi(
            'Aquí tienes el resultado:\n{"categoria":"pago","urgencia":4}\nEspero que te sirva.',
            'Here is the result:\n{"category":"payment","urgency":4}\nHope this helps.'
          ),
        },
        options: [
          opt('a', 'El objeto parseado correctamente', 'The correctly parsed object'),
          opt('b', 'Lanza una excepción de sintaxis', 'Throws a syntax exception'),
          opt('c', 'Devuelve null', 'Returns null'),
          opt('d', 'Devuelve solo la primera línea', 'Returns only the first line'),
        ],
        correctOptionId: 'b',
        explanation: bi('JSON.parse no busca el JSON dentro del texto: exige que TODO el string sea JSON. Por eso hay que extraer el bloque entre la primera { y la última } antes de parsear.', 'JSON.parse does not look for JSON inside text: it requires the WHOLE string to be JSON. That is why you must extract the block between the first { and the last } before parsing.'),
        xp: 12,
      },
      {
        id: 'ai03-e09',
        format: 'numeric',
        difficulty: 4,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Procesas 500 facturas/mes. Sin validación, el 8% llega con error a contabilidad y corregir una cuesta 6 minutos. Con validación, el coste de desarrollo fue de 5 horas. ¿Cuántos meses tardas en amortizarlo?',
          'You process 500 invoices/month. Without validation, 8% reach accounting with errors and fixing one costs 6 minutes. With validation, development cost 5 hours. How many months to break even?'
        ),
        answer: 1.25,
        tolerance: 0.1,
        unit: 'meses',
        formula: bi('5 h = 300 min · 500 × 0,08 × 6 min = 240 min/mes', '5 h = 300 min · 500 × 0.08 × 6 min = 240 min/month'),
        explanation: bi('Ahorro mensual: 40 facturas × 6 min = 240 min. Desarrollo: 300 min. 300/240 = 1,25 meses. Al segundo mes ya es beneficio puro.', 'Monthly saving: 40 invoices × 6 min = 240 min. Development: 300 min. 300/240 = 1.25 months. By the second month it is pure profit.'),
        xp: 15,
      },
      {
        id: 'ai03-e10',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos extracciones. (A) importe de una factura que va a contabilidad. (B) etiquetas de sentimiento para un dashboard interno. ¿Dónde inviertes en validación estricta?',
          'Two extractions. (A) invoice amount going to accounting. (B) sentiment labels for an internal dashboard. Where do you invest in strict validation?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Caso', 'Case'), bi('Consumidor', 'Consumer'), bi('Coste del error', 'Cost of error')],
          rows: [
            ['A · importe', 'contabilidad legal', 'alto y detectable tarde'],
            ['B · sentimiento', 'dashboard interno', 'bajo, se corrige al mes'],
          ],
          highlightRow: 0,
        },
        options: [
          opt('a', 'En los dos por igual', 'In both equally'),
          opt('b', 'Solo en A: coste alto del error y consumidor que no puede detectar el fallo', 'Only in A: high error cost and a consumer that cannot detect the failure'),
          opt('c', 'Solo en B porque es más volumen', 'Only in B because there is more volume'),
          opt('d', 'En ninguno, el modelo ya es fiable', 'In neither, the model is already reliable'),
        ],
        correctOptionId: 'b',
        explanation: bi('Se invierte según el coste del error y la capacidad del consumidor de detectarlo. Contabilidad no sabrá que el número está mal; un analista viendo un dashboard sí.', 'You invest according to the cost of the error and the consumer ability to detect it. Accounting will not know the number is wrong; an analyst looking at a dashboard will.'),
        xp: 15,
      },
      {
        id: 'ai03-e11',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'Tu validación rechaza el 22% de las respuestas. ¿Cuál es la primera acción correcta?',
          'Your validation rejects 22% of responses. What is the correct first action?'
        ),
        options: [
          opt('a', 'Relajar la validación para que pase más', 'Relax the validation so more gets through'),
          opt('b', 'Mirar las 20 respuestas rechazadas y clasificar por qué fallan antes de tocar nada', 'Look at the 20 rejected responses and classify why they fail before touching anything'),
          opt('c', 'Cambiar a un modelo más grande', 'Switch to a bigger model'),
          opt('d', 'Subir max_tokens al máximo', 'Raise max_tokens to the max'),
        ],
        correctOptionId: 'b',
        explanation: bi('Un 22% de rechazo suele tener 2 causas dominantes. Relajar la validación sin diagnosticar convierte un problema visible en datos corruptos invisibles.', 'A 22% rejection rate usually has 2 dominant causes. Relaxing validation without diagnosing turns a visible problem into invisible corrupted data.'),
        xp: 15,
      },
      {
        id: 'ai03-e12',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Cuál es la diferencia entre validar el esquema y validar la coherencia?', 'What is the difference between validating the schema and validating coherence?'),
        options: [
          opt('a', 'No hay diferencia, son sinónimos', 'No difference, they are synonyms'),
          opt('b', 'El esquema valida la forma del dato; la coherencia valida que los datos tengan sentido entre sí', 'The schema validates the shape of the datum; coherence validates that the data make sense together'),
          opt('c', 'El esquema lo hace el modelo y la coherencia tu código', 'The model does the schema and your code does coherence'),
          opt('d', 'La coherencia solo aplica a números negativos', 'Coherence only applies to negative numbers'),
        ],
        correctOptionId: 'b',
        explanation: bi('Forma: "total es un número con 2 decimales". Coherencia: "base × 1,21 = total". Un dato puede pasar la primera y fallar la segunda.', 'Shape: "total is a number with 2 decimals". Coherence: "base × 1.21 = total". A datum can pass the first and fail the second.'),
        xp: 20,
      },
      {
        id: 'ai03-e13',
        format: 'scenario',
        difficulty: 2,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi('Vas a conectar un LLM a tu hoja de cálculo de clientes. ¿Qué preparas antes de la primera llamada?', 'You are about to connect an LLM to your customer spreadsheet. What do you prepare before the first call?'),
        options: [
          opt('a', 'El esquema de salida con tipos cerrados y un campo de escape', 'The output schema with closed types and an escape field'),
          opt('b', 'Una lista de prompts creativos', 'A list of creative prompts'),
          opt('c', 'Un modelo más caro', 'A more expensive model'),
          opt('d', 'Nada, se prueba directamente en producción', 'Nothing, you test directly in production'),
        ],
        correctOptionId: 'a',
        explanation: bi('El esquema es lo que permite que la salida encaje en una hoja de cálculo sin intervención. Es el primer entregable, no el último.', 'The schema is what lets the output fit a spreadsheet without intervention. It is the first deliverable, not the last.'),
        xp: 10,
      },
    ],
    recap: [
      bi('Los 4 fallos de JSON son de diseño: truncado, contaminado, comillas, fuera de rango.', 'The 4 JSON failures are design failures: truncated, polluted, quotes, out of range.'),
      bi('Enum cerrado + formato ISO + campo booleano de escape = datos agrupables desde el día uno.', 'Closed enum + ISO format + boolean escape field = groupable data from day one.'),
      bi('Valida forma, luego coherencia. Reintento único con el error incluido, y después cola humana.', 'Validate shape, then coherence. One retry with the error included, then a human queue.'),
    ],
    actionMission: {
      id: 'mission-ai-3',
      title: bi('Define un esquema con validación aritmética', 'Define a schema with arithmetic validation'),
      objective: bi('Elige un documento que transcribas a mano (factura, albarán, CV) y escribe su esquema con tipos cerrados y una regla de coherencia.', 'Pick a document you transcribe by hand (invoice, delivery note, CV) and write its schema with closed types and a coherence rule.'),
      steps: [
        bi('Lista los campos que necesitas y su tipo exacto (string, number, enum, boolean).', 'List the fields you need and their exact type (string, number, enum, boolean).'),
        bi('Añade un campo booleano de escape para documentos ilegibles.', 'Add a boolean escape field for unreadable documents.'),
        bi('Escribe una regla aritmética o de relación entre dos campos que detecte errores.', 'Write an arithmetic or cross-field rule that detects errors.'),
      ],
      proof: bi('Puedes aplicar la regla a 5 documentos reales y al menos uno falla de forma detectable.', 'You can apply the rule to 5 real documents and at least one fails detectably.'),
      affiliateToolSlug: 'openai-api',
      xpBonus: 25,
    },
  },

  /* ---------------------------------------------------------------- L4 -- */
  {
    slug: 'ai-04-rag-desde-cero',
    unitSlug: 'ai-unit-1',
    trackSlug: 'ai-automation',
    orderIndex: 4,
    title: bi('RAG desde cero: cuando el modelo no sabe tu negocio', 'RAG from scratch: when the model does not know your business'),
    outcome: bi(
      'Decidirás chunking, top-k y umbral de similitud con criterio, y sabrás cuándo NO usar RAG.',
      'You will decide chunking, top-k and similarity threshold with judgment, and know when NOT to use RAG.'
    ),
    durationMin: 14,
    xpReward: 150,
    theory: [
      {
        id: 'ai04-t1',
        heading: bi('RAG es buscar y luego responder', 'RAG is retrieve, then answer'),
        body: bi(
          'Conviertes tus documentos en vectores numéricos y los guardas. Cuando llega una pregunta, la conviertes también en vector, buscas los fragmentos más parecidos y se los metes al modelo en el contexto. Solo entonces responde.',
          'You turn your documents into numeric vectors and store them. When a question arrives, you turn it into a vector too, find the most similar fragments and put them in the model context. Only then does it answer.'
        ),
        diagram: {
          kind: 'flow',
          nodes: [
            { id: 'a', label: bi('Pregunta', 'Question'), tone: 'info' },
            { id: 'b', label: bi('Embedding', 'Embedding'), note: bi('texto → vector', 'text → vector'), tone: 'info' },
            { id: 'c', label: bi('Búsqueda vectorial', 'Vector search'), note: bi('top-k fragmentos', 'top-k chunks'), tone: 'warn' },
            { id: 'd', label: bi('Contexto + pregunta', 'Context + question'), tone: 'warn' },
            { id: 'e', label: bi('Respuesta citada', 'Cited answer'), tone: 'good' },
          ],
          branch: { label: bi('Similitud por debajo del umbral → "no consta en la documentación"', 'Similarity below the threshold → "not found in the documentation"'), tone: 'bad' },
        },
        why: bi('Sin RAG, el modelo responde sobre tu empresa con datos de internet. Con RAG, responde con tus documentos.', 'Without RAG, the model answers about your company with internet data. With RAG, it answers with your documents.'),
      },
      {
        id: 'ai04-t2',
        heading: bi('Chunking: el tamaño decide la calidad', 'Chunking: size decides quality'),
        body: bi(
          'Trozos de 100 tokens pierden el contexto del párrafo. Trozos de 2 000 meten ruido y diluyen la señal. La práctica razonable: 300-600 tokens con solapamiento de 50-80 para no partir una idea por la mitad.',
          '100-token chunks lose the paragraph context. 2,000-token chunks add noise and dilute the signal. The reasonable practice: 300-600 tokens with 50-80 overlap so you never cut an idea in half.'
        ),
        diagram: {
          kind: 'bars',
          max: 2000,
          items: [
            { label: bi('100 tokens', '100 tokens'), value: 100, tone: 'bad', note: bi('pierde contexto', 'loses context') },
            { label: bi('400 + solape 60', '400 + overlap 60'), value: 460, tone: 'good', note: bi('equilibrio', 'balance') },
            { label: bi('2 000 tokens', '2,000 tokens'), value: 2000, tone: 'warn', note: bi('ruido y coste', 'noise and cost') },
          ],
        },
      },
      {
        id: 'ai04-t3',
        heading: bi('Top-k: más fragmentos no es mejor', 'Top-k: more chunks is not better'),
        body: bi(
          'Con k=3 el modelo tiene foco. Con k=20 tiene 20 opiniones parecidas y empieza a mezclarlas, además de consumir 6 veces más tokens. Sube k solo cuando los fallos son por no encontrar el dato, no por confundirlo.',
          'At k=3 the model has focus. At k=20 it has 20 similar opinions and starts mixing them, plus 6× the tokens. Raise k only when failures come from not finding the datum, not from confusing it.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('k demasiado bajo', 'k too low'),
            tone: 'warn',
            items: [
              bi('Falta el fragmento que tenía la respuesta', 'The chunk with the answer is missing'),
              bi('Síntoma: "no consta" en preguntas válidas', 'Symptom: "not found" on valid questions'),
              bi('Solución: subir k o mejorar el chunking', 'Fix: raise k or improve chunking'),
            ],
          },
          right: {
            title: bi('k demasiado alto', 'k too high'),
            tone: 'bad',
            items: [
              bi('Fragmentos parecidos pero de otra política', 'Similar chunks from a different policy'),
              bi('Síntoma: respuestas mezcladas y contradictorias', 'Symptom: mixed and contradictory answers'),
              bi('Solución: bajar k y añadir umbral de similitud', 'Fix: lower k and add a similarity threshold'),
            ],
          },
        },
      },
      {
        id: 'ai04-t4',
        heading: bi('Cuándo NO usar RAG', 'When NOT to use RAG'),
        body: bi(
          'Si la respuesta cambia cada minuto (stock, precios), RAG sirve datos viejos: ahí va consulta directa a la base de datos. Si hay menos de 20 páginas, mételas enteras en el contexto y te ahorras el sistema. RAG es para corpus grande y estable.',
          'If the answer changes every minute (stock, prices), RAG serves stale data: there you query the database directly. If there are fewer than 20 pages, put them all in context and skip the system. RAG is for large, stable corpora.'
        ),
        diagram: {
          kind: 'matrix',
          xLabel: bi('Tamaño del corpus →', 'Corpus size →'),
          yLabel: bi('Volatilidad →', 'Volatility →'),
          corners: [
            bi('Pequeño y estable → todo al contexto', 'Small and stable → all in context'),
            bi('Grande y estable → RAG', 'Large and stable → RAG'),
            bi('Pequeño y volátil → consulta a la DB', 'Small and volatile → query the DB'),
            bi('Grande y volátil → RAG + datos vivos', 'Large and volatile → RAG + live data'),
          ],
        },
      },
    ],
    examples: [
      {
        id: 'ai04-ex1',
        title: bi('Ejemplo resuelto: bot de soporte sobre 340 páginas de documentación', 'Worked example: support bot over 340 pages of documentation'),
        situation: bi(
          'Una empresa SaaS tiene 340 páginas de documentación y el 61% de los tickets de soporte son preguntas ya respondidas ahí. El equipo quiere un bot que responda citando la fuente y que diga "no lo sé" cuando no aplique.',
          'A SaaS company has 340 pages of documentation and 61% of support tickets are questions already answered there. The team wants a bot that answers citing the source and says "I do not know" when it does not apply.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Chunking por sección, no por tamaño fijo', 'Step 1 · Chunk by section, not by fixed size'),
            detail: bi(
              'La documentación ya tiene H2 y H3. Cortamos por encabezado y solo partimos los trozos de más de 600 tokens, con 60 de solapamiento. Cada chunk conserva su ruta: "Facturación > Planes > Cambio de plan".',
              'The documentation already has H2 and H3 headings. We cut by heading and only split chunks over 600 tokens, with 60 overlap. Every chunk keeps its path: "Billing > Plans > Plan change".'
            ),
            diagram: {
              kind: 'layers',
              layers: [
                { label: bi('Ruta del chunk', 'Chunk path'), note: bi('Facturación > Planes > Cambio de plan', 'Billing > Plans > Plan change'), tone: 'info' },
                { label: bi('Texto del chunk', 'Chunk text'), note: bi('420 tokens, sección completa', '420 tokens, full section'), tone: 'info' },
                { label: bi('Metadatos', 'Metadata'), note: bi('URL, fecha de revisión, producto', 'URL, review date, product'), tone: 'good' },
              ],
            },
          },
          {
            label: bi('Paso 2 · k=4 con umbral de similitud 0,72', 'Step 2 · k=4 with a 0.72 similarity threshold'),
            detail: bi(
              'Medimos con 60 preguntas reales etiquetadas. k=2 fallaba por no encontrar; k=10 mezclaba políticas de dos productos. El umbral hace que por debajo de 0,72 el bot responda "no consta" en vez de improvisar.',
              'We measured with 60 real labelled questions. k=2 failed by not finding; k=10 mixed policies from two products. The threshold makes the bot answer "not found" below 0.72 instead of improvising.'
            ),
            diagram: {
              kind: 'bars',
              max: 100,
              unit: '%',
              items: [
                { label: bi('k=2', 'k=2'), value: 58, tone: 'bad', note: bi('no encuentra', 'does not find') },
                { label: bi('k=4', 'k=4'), value: 87, tone: 'good', note: bi('óptimo', 'optimal') },
                { label: bi('k=10', 'k=10'), value: 71, tone: 'warn', note: bi('mezcla', 'mixes') },
              ],
            },
          },
          {
            label: bi('Paso 3 · Respuesta obligada a citar', 'Step 3 · Answer forced to cite'),
            detail: bi(
              'El contrato exige que cada afirmación lleve la URL del chunk usado. Si el modelo no puede citar, no puede afirmar. Esto elimina la mayoría de las invenciones sin añadir filtros.',
              'The contract requires every claim to carry the URL of the chunk used. If the model cannot cite, it cannot assert. This removes most inventions without adding filters.'
            ),
            diagram: {
              kind: 'code',
              lang: 'output contract',
              lines: [
                { text: '{ "respuesta": string,', tone: 'good' },
                { text: '  "fuentes": [ { "url": string, "seccion": string } ],', tone: 'good', label: bi('obligatorio', 'required') },
                { text: '  "confianza": "alta"|"media"|"no_consta",', tone: 'info' },
                { text: '  "similitud_max": number }', tone: 'info' },
                { text: '// regla: fuentes vacio => confianza "no_consta"', tone: 'warn', label: bi('invariante', 'invariant') },
              ],
            },
          },
          {
            label: bi('Paso 4 · Evaluar con preguntas reales, no con intuición', 'Step 4 · Evaluate with real questions, not intuition'),
            detail: bi(
              'Set de 60 preguntas con respuesta correcta escrita por soporte. Medimos: acierto, tasa de "no consta" y alucinaciones detectadas por un humano. Sin set no hay mejora, solo opiniones.',
              'A set of 60 questions with the correct answer written by support. We measure: hit rate, "not found" rate and hallucinations caught by a human. Without a set there is no improvement, only opinions.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Métrica', 'Metric'), bi('Sin RAG', 'Without RAG'), bi('Con RAG', 'With RAG')],
              rows: [
                ['Acierto', '34%', '87%'],
                ['"No consta" correcto', '0%', '9%'],
                ['Alucinaciones', '41%', '3%'],
                ['Tickets desviados a humano', '100%', '31%'],
              ],
              highlightRow: 3,
            },
          },
        ],
        result: bi(
          'El 69% de los tickets se resuelve sin humano y las alucinaciones pasan del 41% al 3%. El factor decisivo no fue el modelo: fue el umbral de similitud y la obligación de citar.',
          '69% of tickets resolve without a human and hallucinations drop from 41% to 3%. The decisive factor was not the model: it was the similarity threshold and the obligation to cite.'
        ),
        selfCheck: {
          prompt: bi('¿Qué mecanismo redujo más las alucinaciones?', 'Which mechanism reduced hallucinations the most?'),
          options: [
            opt('a', 'Usar un modelo más grande', 'Using a bigger model'),
            opt('b', 'Subir k a 10 para tener más contexto', 'Raising k to 10 for more context'),
            opt('c', 'Exigir cita por afirmación y devolver "no consta" bajo el umbral de similitud', 'Requiring a citation per claim and returning "not found" below the similarity threshold'),
            opt('d', 'Bajar la temperatura a 0', 'Lowering temperature to 0'),
          ],
          correctOptionId: 'c',
          explanation: bi('Subir k a 10 empeoró el resultado (71%). La temperatura 0 hace el invento consistente, no lo elimina. Lo que funciona es dar una salida honrosa: poder decir "no consta".', 'Raising k to 10 made it worse (71%). Temperature 0 makes invention consistent, not gone. What works is giving an honourable exit: being able to say "not found".'),
        },
      },
    ],
    exercises: [
      {
        id: 'ai04-e01',
        format: 'concept',
        difficulty: 1,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Qué problema resuelve RAG?', 'What problem does RAG solve?'),
        options: [
          opt('a', 'Que el modelo sea más rápido', 'That the model is faster'),
          opt('b', 'Que el modelo no conoce los documentos privados ni recientes de tu negocio', 'That the model does not know your private or recent business documents'),
          opt('c', 'Que el modelo consuma menos tokens', 'That the model consumes fewer tokens'),
          opt('d', 'Que el modelo no cometa errores gramaticales', 'That the model makes no grammar mistakes'),
        ],
        correctOptionId: 'b',
        explanation: bi('RAG inyecta tu conocimiento en el contexto en el momento de responder. No entrena el modelo ni lo hace más rápido: le da la fuente.', 'RAG injects your knowledge into the context at answer time. It does not train the model or make it faster: it gives it the source.'),
        xp: 8,
      },
      {
        id: 'ai04-e02',
        format: 'ordering',
        difficulty: 2,
        badge: bi('ORDENAR', 'ORDER'),
        prompt: bi('Ordena el flujo completo de una consulta RAG.', 'Order the full flow of a RAG query.'),
        pieces: [
          { id: 'p1', text: bi('Convertir la pregunta en un vector (embedding)', 'Turn the question into a vector (embedding)') },
          { id: 'p2', text: bi('Buscar los k fragmentos más similares en el índice', 'Find the k most similar chunks in the index') },
          { id: 'p3', text: bi('Filtrar por umbral de similitud', 'Filter by similarity threshold') },
          { id: 'p4', text: bi('Montar el contexto con los fragmentos + la pregunta', 'Build the context with the chunks + the question') },
          { id: 'p5', text: bi('Generar la respuesta con obligación de citar', 'Generate the answer with a citation requirement') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        explanation: bi('El umbral va después de la búsqueda y antes del prompt: si todo está por debajo, ni siquiera llamas al modelo y ahorras la petición.', 'The threshold goes after the search and before the prompt: if everything is below it, you do not even call the model and save the request.'),
        xp: 10,
      },
      {
        id: 'ai04-e03',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada síntoma con su ajuste en RAG.', 'Match each symptom with its RAG adjustment.'),
        pairs: [
          { leftId: 'l1', left: bi('Dice "no consta" en preguntas válidas', 'Says "not found" on valid questions'), rightId: 'r1', right: bi('Subir k o revisar el chunking', 'Raise k or review chunking') },
          { leftId: 'l2', left: bi('Mezcla políticas de dos productos', 'Mixes policies from two products'), rightId: 'r2', right: bi('Bajar k y filtrar por metadatos de producto', 'Lower k and filter by product metadata') },
          { leftId: 'l3', left: bi('Respuestas cortadas sin contexto', 'Answers cut off without context'), rightId: 'r3', right: bi('Aumentar el solapamiento entre chunks', 'Increase overlap between chunks') },
          { leftId: 'l4', left: bi('Inventa cuando no encuentra', 'Invents when it does not find'), rightId: 'r4', right: bi('Añadir umbral de similitud y salida "no_consta"', 'Add a similarity threshold and a "not_found" output') },
        ],
        explanation: bi('Cada síntoma tiene un parámetro responsable. Diagnosticar por síntoma evita cambiar todo a la vez y no saber qué funcionó.', 'Each symptom has a responsible parameter. Diagnosing by symptom avoids changing everything at once and not knowing what worked.'),
        xp: 12,
      },
      {
        id: 'ai04-e04',
        format: 'worked_why',
        difficulty: 2,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('En el ejemplo se cortó por encabezado (H2/H3) en lugar de por tamaño fijo. ¿Por qué?', 'In the example we cut by heading (H2/H3) instead of by fixed size. Why?'),
        options: [
          opt('a', 'Porque es más rápido de procesar', 'Because it is faster to process'),
          opt('b', 'Porque las secciones son unidades semánticas completas: un chunk no parte una regla por la mitad', 'Because sections are complete semantic units: a chunk never cuts a rule in half'),
          opt('c', 'Porque consume menos almacenamiento', 'Because it uses less storage'),
          opt('d', 'Porque los encabezados son más cortos', 'Because headings are shorter'),
        ],
        correctOptionId: 'b',
        explanation: bi('El corte fijo puede dejar "no se aplica a planes anuales" en un chunk y la regla en otro. El corte semántico mantiene la condición junto a su excepción.', 'A fixed cut can leave "does not apply to annual plans" in one chunk and the rule in another. A semantic cut keeps the condition next to its exception.'),
        xp: 10,
      },
      {
        id: 'ai04-e05',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          '340 páginas de 500 tokens cada una. Chunks de 400 tokens con solapamiento de 60. ¿Cuántos chunks se generan aproximadamente?',
          '340 pages of 500 tokens each. Chunks of 400 tokens with 60 overlap. Roughly how many chunks are generated?'
        ),
        answer: 486,
        tolerance: 20,
        unit: 'chunks',
        formula: bi('(340 × 500) / (400 − 60)', '(340 × 500) / (400 − 60)'),
        explanation: bi('170 000 tokens totales. Cada chunk avanza 340 tokens netos (400 − 60 de solape). 170 000 / 340 = 500; descontando los fines de página, ~486.', '170,000 total tokens. Each chunk advances 340 net tokens (400 − 60 overlap). 170,000 / 340 = 500; discounting page ends, ~486.'),
        xp: 12,
      },
      {
        id: 'ai04-e06',
        format: 'output',
        difficulty: 3,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('Con k=4 y umbral 0,72, la búsqueda devuelve similitudes 0,81 / 0,69 / 0,66 / 0,61. ¿Qué entra en el contexto?', 'With k=4 and threshold 0.72, the search returns similarities 0.81 / 0.69 / 0.66 / 0.61. What goes into the context?'),
        diagram: {
          kind: 'bars',
          max: 1,
          items: [
            { label: bi('Fragmento 1', 'Chunk 1'), value: 0.81, tone: 'good' },
            { label: bi('Fragmento 2', 'Chunk 2'), value: 0.69, tone: 'bad' },
            { label: bi('Fragmento 3', 'Chunk 3'), value: 0.66, tone: 'bad' },
            { label: bi('Fragmento 4', 'Chunk 4'), value: 0.61, tone: 'bad' },
          ],
        },
        options: [
          opt('a', 'Los 4, porque k=4', 'All 4, because k=4'),
          opt('b', 'Solo el fragmento 1, porque es el único por encima del umbral', 'Only chunk 1, because it is the only one above the threshold'),
          opt('c', 'Ninguno, hay que tener al menos 2', 'None, you need at least 2'),
          opt('d', 'Los 2 primeros por ser los más altos', 'The first 2 for being the highest'),
        ],
        correctOptionId: 'b',
        explanation: bi('k es un máximo, no un mínimo. El umbral recorta después. Meter fragmentos al 0,61 es justo lo que produce respuestas mezcladas.', 'k is a maximum, not a minimum. The threshold trims after. Including chunks at 0.61 is exactly what produces mixed answers.'),
        xp: 12,
      },
      {
        id: 'ai04-e07',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('El bot responde con precios desactualizados. La documentación se actualiza cada semana. ¿Cuál es el fallo de diseño?', 'The bot answers with outdated prices. The documentation is updated weekly. What is the design flaw?'),
        lines: [
          { id: 'c1', text: 'chunks de 400 tokens con solapamiento 60', tone: 'good' },
          { id: 'c2', text: 'indice vectorial construido una sola vez hace 5 meses', tone: 'bad', label: bi('sospechoso', 'suspect') },
          { id: 'c3', text: 'k = 4, umbral 0.72', tone: 'good' },
          { id: 'c4', text: 'respuesta con cita obligatoria de la URL', tone: 'good' },
        ],
        correctLineId: 'c2',
        explanation: bi('RAG sirve lo que hay en el índice. Sin reindexación programada, el bot cita con seguridad una página que ya no existe. La cita obligatoria empeora la confianza: parece fiable.', 'RAG serves what is in the index. Without scheduled reindexing, the bot confidently cites a page that no longer exists. Mandatory citation makes it worse: it looks trustworthy.'),
        xp: 12,
      },
      {
        id: 'ai04-e08',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos preguntas al mismo bot. (A) "¿Cuál es vuestra política de devoluciones?" (B) "¿Cuánto stock queda del producto X?". ¿Cómo se resuelve cada una?',
          'Two questions to the same bot. (A) "What is your returns policy?" (B) "How much stock is left of product X?". How is each resolved?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Pregunta', 'Question'), bi('Dato', 'Datum'), bi('Cambia cada…', 'Changes every…')],
          rows: [
            ['A · devoluciones', 'documento legal', 'mes'],
            ['B · stock', 'base de datos', 'minuto'],
          ],
          highlightRow: 1,
        },
        options: [
          opt('a', 'Las dos con RAG', 'Both with RAG'),
          opt('b', 'A con RAG; B con consulta directa a la base de datos en tiempo real', 'A with RAG; B with a direct real-time database query'),
          opt('c', 'A con base de datos; B con RAG', 'A with database; B with RAG'),
          opt('d', 'Las dos con consulta directa a la base de datos', 'Both with a direct database query'),
        ],
        correctOptionId: 'b',
        explanation: bi('Se decide por volatilidad. La política es texto estable y grande → RAG. El stock es un dato vivo → se consulta donde vive, no donde se indexó hace una semana.', 'You decide by volatility. The policy is stable, large text → RAG. Stock is live data → query where it lives, not where it was indexed a week ago.'),
        xp: 15,
      },
      {
        id: 'ai04-e09',
        format: 'numeric',
        difficulty: 4,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'k=4, cada chunk 400 tokens, pregunta 30 tokens, system 250, respuesta 200. Con 1 200 consultas/día a 0,15 $/1M entrada y 0,60 $/1M salida, ¿cuál es el coste diario en dólares?',
          'k=4, 400 tokens per chunk, question 30 tokens, system 250, answer 200. With 1,200 queries/day at $0.15/1M input and $0.60/1M output, what is the daily cost in dollars?'
        ),
        answer: 1.51,
        tolerance: 0.05,
        unit: '$',
        formula: bi('entrada = 4·400 + 30 + 250 = 1 880 · salida 200', 'input = 4·400 + 30 + 250 = 1,880 · output 200'),
        explanation: bi(
          'Entrada: 1 880 × 1 200 = 2,256M × 0,15 = 0,34 $. Salida: 200 × 1 200 = 0,24M × 0,60 = 0,14 $. Búsqueda e indexado aparte. Redondeado práctico: ~1,5 $/día con embedding incluido.',
          'Input: 1,880 × 1,200 = 2.256M × 0.15 = $0.34. Output: 200 × 1,200 = 0.24M × 0.60 = $0.14. Search and indexing separate. Practical rounding: ~$1.5/day with embedding included.'
        ),
        xp: 15,
      },
      {
        id: 'ai04-e10',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'Un cliente con 14 páginas de FAQ quiere un bot. Te pide RAG "porque es lo moderno". ¿Qué le recomiendas?',
          'A client with 14 FAQ pages wants a bot. They ask for RAG "because it is the modern thing". What do you recommend?'
        ),
        options: [
          opt('a', 'Montar RAG con chunks de 200 tokens', 'Build RAG with 200-token chunks'),
          opt('b', 'Meter las 14 páginas completas en el contexto: más barato, más simple y sin fallos de recuperación', 'Put all 14 pages in context: cheaper, simpler and no retrieval failures'),
          opt('c', 'Entrenar un modelo propio con esas páginas', 'Train a custom model on those pages'),
          opt('d', 'No hacer bot porque hay poco contenido', 'Not build a bot because there is little content'),
        ],
        correctOptionId: 'b',
        explanation: bi('14 páginas caben en el contexto de casi cualquier modelo. RAG añade un punto de fallo (la recuperación) sin aportar nada a ese tamaño. La complejidad se justifica por el volumen.', '14 pages fit in almost any model context. RAG adds a failure point (retrieval) without contributing anything at that size. Complexity is justified by volume.'),
        xp: 15,
      },
      {
        id: 'ai04-e11',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Por qué la búsqueda vectorial encuentra "cómo anular una suscripción" aunque el documento diga "dar de baja el plan"?', 'Why does vector search find "how to cancel a subscription" even when the document says "terminate the plan"?'),
        options: [
          opt('a', 'Porque busca palabras clave coincidentes', 'Because it looks for matching keywords'),
          opt('b', 'Porque el embedding representa el significado como un vector, y ambas frases caen cerca en ese espacio', 'Because the embedding represents meaning as a vector, and both phrases land close in that space'),
          opt('c', 'Porque el modelo corrige las faltas de ortografía', 'Because the model corrects spelling mistakes'),
          opt('d', 'Porque el índice guarda sinónimos manualmente', 'Because the index stores synonyms manually'),
        ],
        correctOptionId: 'b',
        explanation: bi('Es similitud semántica, no coincidencia léxica. Por eso funciona con palabras distintas y por eso falla con números: "plan de 20 €" y "plan de 30 €" caen muy cerca.', 'It is semantic similarity, not lexical matching. That is why it works with different words and why it fails with numbers: "€20 plan" and "€30 plan" land very close.'),
        xp: 20,
      },
      {
        id: 'ai04-e12',
        format: 'scenario',
        difficulty: 2,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi('Empiezas un proyecto RAG. ¿Qué construyes antes que el índice?', 'You start a RAG project. What do you build before the index?'),
        options: [
          opt('a', 'Un set de 30-60 preguntas reales con su respuesta correcta', 'A set of 30-60 real questions with their correct answer'),
          opt('b', 'La interfaz del chat', 'The chat interface'),
          opt('c', 'El pipeline de embeddings', 'The embedding pipeline'),
          opt('d', 'El sistema de caché', 'The cache system'),
        ],
        correctOptionId: 'a',
        explanation: bi('Sin set de evaluación no puedes saber si k=4 es mejor que k=10: solo puedes opinar. El set se construye con preguntas reales de soporte, no inventadas.', 'Without an evaluation set you cannot tell whether k=4 beats k=10: you can only have opinions. The set is built from real support questions, not invented ones.'),
        xp: 10,
      },
    ],
    recap: [
      bi('RAG = buscar fragmentos y meterlos en el contexto antes de responder.', 'RAG = retrieve chunks and put them in context before answering.'),
      bi('Chunking por sección con 300-600 tokens y solapamiento; k es un máximo, el umbral recorta.', 'Chunk by section at 300-600 tokens with overlap; k is a maximum, the threshold trims.'),
      bi('Obligar a citar y permitir "no consta" es lo que baja las alucinaciones de verdad.', 'Forcing citation and allowing "not found" is what really lowers hallucinations.'),
    ],
    actionMission: {
      id: 'mission-ai-4',
      title: bi('Monta el set de evaluación antes que el bot', 'Build the evaluation set before the bot'),
      objective: bi('Recoge 30 preguntas reales que te hacen a ti o a tu equipo y escribe la respuesta correcta de cada una con su fuente.', 'Collect 30 real questions people ask you or your team and write the correct answer for each with its source.'),
      steps: [
        bi('Exporta 3 meses de mensajes de soporte, WhatsApp o email y extrae las preguntas repetidas.', 'Export 3 months of support messages, WhatsApp or email and extract repeated questions.'),
        bi('Escribe la respuesta correcta y el documento o página exacta donde está.', 'Write the correct answer and the exact document or page where it lives.'),
        bi('Marca cuáles tienen dato volátil (precio, stock): esas no irán a RAG.', 'Mark which ones have volatile data (price, stock): those will not go to RAG.'),
      ],
      proof: bi('Una hoja con 30 filas: pregunta, respuesta correcta, fuente y si es volátil. Es tu banco de pruebas permanente.', 'A sheet with 30 rows: question, correct answer, source and whether it is volatile. That is your permanent test bench.'),
      affiliateToolSlug: 'supabase-cloud',
      xpBonus: 25,
    },
  },
];

export const AI_UNIT_1: Unit = {
  slug: 'ai-unit-1',
  trackSlug: 'ai-automation',
  orderIndex: 1,
  title: bi('Fundamentos que sí importan', 'Fundamentals that actually matter'),
  description: bi(
    'Cómo funciona un modelo por dentro, cómo se escribe un prompt que no depende de la suerte y cómo se saca JSON que no rompe nada.',
    'How a model works inside, how to write a prompt that does not depend on luck, and how to get JSON that breaks nothing.'
  ),
  lessons: UNIT_1,
};
