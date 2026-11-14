import { bi, opt } from '@/lib/curriculum/authoring';
import { Lesson, Unit } from '@/lib/curriculum/types';

/* ==========================================================================
   AI & AUTOMATION · Unit 2 — Producción
   ========================================================================== */

const LESSONS: Lesson[] = [
  /* ---------------------------------------------------------------- L5 -- */
  {
    slug: 'ai-05-pipelines-make-n8n',
    unitSlug: 'ai-unit-2',
    trackSlug: 'ai-automation',
    orderIndex: 5,
    title: bi('Pipelines en Make/n8n que sobreviven a un error', 'Make/n8n pipelines that survive an error'),
    outcome: bi(
      'Montarás un webhook→LLM→validar→escribir→alertar con ruta de error, idempotencia y coste controlado.',
      'You will build a webhook→LLM→validate→write→alert flow with an error path, idempotency and controlled cost.'
    ),
    durationMin: 14,
    xpReward: 150,
    theory: [
      {
        id: 'ai05-t1',
        heading: bi('Un pipeline es una cadena con plan B en cada eslabón', 'A pipeline is a chain with a plan B at every link'),
        body: bi(
          'Cada paso puede fallar: el webhook no llega, la API del modelo da error 429, el JSON no parsea, la base de datos rechaza la escritura. Un pipeline amateur tiene una línea recta; uno profesional tiene una línea recta y una ruta de error paralela.',
          'Every step can fail: the webhook does not arrive, the model API returns 429, the JSON does not parse, the database rejects the write. An amateur pipeline is a straight line; a professional one is a straight line plus a parallel error path.'
        ),
        diagram: {
          kind: 'flow',
          nodes: [
            { id: 'a', label: bi('Webhook', 'Webhook'), tone: 'info' },
            { id: 'b', label: bi('Normalizar', 'Normalize'), tone: 'info' },
            { id: 'c', label: bi('LLM', 'LLM'), tone: 'warn' },
            { id: 'd', label: bi('Validar', 'Validate'), tone: 'warn' },
            { id: 'e', label: bi('Escribir DB', 'Write DB'), tone: 'good' },
          ],
          branch: { label: bi('Ruta de error: reintentos con backoff → cola muerta → alerta a Slack/email', 'Error path: backoff retries → dead-letter queue → Slack/email alert'), tone: 'bad' },
        },
      },
      {
        id: 'ai05-t2',
        heading: bi('Idempotencia: el mismo evento no puede escribir dos veces', 'Idempotency: the same event cannot write twice'),
        body: bi(
          'Los webhooks se reenvían. Si tu pipeline escribe al recibir, un reintento duplica el registro. La solución es una clave única por evento (id del webhook o hash del contenido) que la base de datos rechaza si ya existe.',
          'Webhooks get resent. If your pipeline writes on receipt, a retry duplicates the record. The fix is a unique key per event (webhook id or content hash) that the database rejects if it already exists.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('Sin idempotencia', 'Without idempotency'),
            tone: 'bad',
            items: [
              bi('Webhook reenviado → 2 filas idénticas', 'Resent webhook → 2 identical rows'),
              bi('El cliente recibe 2 emails de confirmación', 'The customer gets 2 confirmation emails'),
              bi('Los informes cuentan doble', 'Reports double-count'),
            ],
          },
          right: {
            title: bi('Con idempotencia', 'With idempotency'),
            tone: 'good',
            items: [
              bi('event_id UNIQUE en la tabla', 'event_id UNIQUE on the table'),
              bi('El segundo intento falla y se descarta sin efecto', 'The second attempt fails and is discarded with no effect'),
              bi('Ejecutar 10 veces = mismo resultado que 1', 'Running 10 times = same result as 1'),
            ],
          },
        },
      },
      {
        id: 'ai05-t3',
        heading: bi('Backoff exponencial, no reintento inmediato', 'Exponential backoff, not immediate retry'),
        body: bi(
          'Un 429 significa "estás pidiendo demasiado". Reintentar al instante garantiza otro 429. Se espera 1 s, luego 2, luego 4, con un tope de intentos. Después de eso, cola muerta y aviso humano.',
          'A 429 means "you are asking for too much". Retrying instantly guarantees another 429. Wait 1 s, then 2, then 4, with a cap on attempts. After that, dead-letter queue and a human alert.'
        ),
        diagram: {
          kind: 'timeline',
          steps: [
            { label: bi('Intento 1', 'Attempt 1'), value: '0 s', tone: 'bad' },
            { label: bi('Espera', 'Wait'), value: '1 s' },
            { label: bi('Intento 2', 'Attempt 2'), value: '1 s', tone: 'bad' },
            { label: bi('Espera', 'Wait'), value: '2 s' },
            { label: bi('Intento 3', 'Attempt 3'), value: '3 s', tone: 'bad' },
            { label: bi('Cola muerta', 'Dead letter'), value: '→ humano', tone: 'warn' },
          ],
        },
      },
      {
        id: 'ai05-t4',
        heading: bi('Cada ejecución cuesta dinero: ponle un techo', 'Every run costs money: put a ceiling on it'),
        body: bi(
          'Un pipeline en bucle con un webhook mal configurado puede hacer 40 000 llamadas en una noche. Se limita por tres vías: rate limit en el webhook, presupuesto diario en la API y alerta si el volumen se dispara.',
          'A looping pipeline with a misconfigured webhook can make 40,000 calls overnight. Cap it three ways: rate limit on the webhook, daily budget on the API, and an alert if volume spikes.'
        ),
        diagram: {
          kind: 'bars',
          max: 100,
          unit: '%',
          items: [
            { label: bi('Sin techo', 'No ceiling'), value: 100, tone: 'bad', note: bi('factura imprevisible', 'unpredictable bill') },
            { label: bi('Rate limit webhook', 'Webhook rate limit'), value: 35, tone: 'warn' },
            { label: bi('+ presupuesto diario API', '+ API daily budget'), value: 12, tone: 'good' },
            { label: bi('+ alerta de volumen', '+ volume alert'), value: 4, tone: 'good', note: bi('te enteras el día 1', 'you find out day 1') },
          ],
        },
      },
    ],
    examples: [
      {
        id: 'ai05-ex1',
        title: bi('Ejemplo resuelto: leads de un formulario → CRM enriquecido en Make', 'Worked example: form leads → enriched CRM in Make'),
        situation: bi(
          'Una agencia recibe 120 leads/día desde un formulario. Hoy alguien los copia al CRM, los clasifica y asigna. Tarda 90 minutos diarios y llega tarde: el lead que se responde en 5 minutos convierte 3 veces más que el que se responde en 30.',
          'An agency gets 120 leads/day from a form. Today someone copies them to the CRM, classifies and assigns them. It takes 90 minutes a day and arrives late: a lead answered in 5 minutes converts 3× better than one answered in 30.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Webhook con validación de entrada', 'Step 1 · Webhook with input validation'),
            detail: bi(
              'El primer módulo no es el LLM: es comprobar que el email tiene formato y que el presupuesto es un número. Un 7% de los envíos llega con campos vacíos y es más barato rechazarlos al principio.',
              'The first module is not the LLM: it is checking that the email is well-formed and the budget is a number. 7% of submissions arrive with empty fields and it is cheaper to reject them at the start.'
            ),
            diagram: {
              kind: 'flow',
              nodes: [
                { id: 'a', label: bi('Webhook', 'Webhook'), tone: 'info' },
                { id: 'b', label: bi('Validar campos', 'Validate fields'), tone: 'info' },
                { id: 'c', label: bi('Router', 'Router'), tone: 'warn' },
              ],
              branch: { label: bi('Inválido → registro en "leads_sucios" + aviso, no se pierde nada', 'Invalid → logged in "dirty_leads" + notice, nothing is lost'), tone: 'bad' },
            },
          },
          {
            label: bi('Paso 2 · LLM clasifica con contrato y temperatura 0', 'Step 2 · LLM classifies with a contract and temperature 0'),
            detail: bi(
              'Devuelve intención (comprar/comparar/curioso), sector, presupuesto estimado y prioridad 1-5. Con temperatura 0 y validación de esquema justo después.',
              'It returns intent (buying/comparing/curious), sector, estimated budget and priority 1-5. At temperature 0 with schema validation right after.'
            ),
            diagram: {
              kind: 'code',
              lang: 'output contract',
              lines: [
                { text: '{ "intencion": "comprar"|"comparar"|"curioso",', tone: 'good' },
                { text: '  "sector": string,', tone: 'good' },
                { text: '  "presupuesto_eur": number,', tone: 'good' },
                { text: '  "prioridad": 1..5,', tone: 'good' },
                { text: '  "primera_linea": string (max 120 char) }', tone: 'info' },
              ],
            },
          },
          {
            label: bi('Paso 3 · Escritura idempotente en el CRM', 'Step 3 · Idempotent write to the CRM'),
            detail: bi(
              'Se usa el id del envío del formulario como external_id único. Si Make reintenta el escenario, el CRM ignora la segunda escritura en lugar de duplicar el contacto.',
              'The form submission id is used as a unique external_id. If Make retries the scenario, the CRM ignores the second write instead of duplicating the contact.'
            ),
          },
          {
            label: bi('Paso 4 · Ruta de error real, no teórica', 'Step 4 · A real error path, not a theoretical one'),
            detail: bi(
              'Handler de errores en el módulo LLM: 2 reintentos con backoff, y si falla, el lead se guarda sin clasificar con prioridad 3 y se avisa en Slack. El comercial lo ve en su lista igual; solo pierde el etiquetado.',
              'Error handler on the LLM module: 2 backoff retries, and on failure the lead is saved unclassified at priority 3 with a Slack alert. The salesperson still sees it in their list; only the labelling is lost.'
            ),
            diagram: {
              kind: 'compare',
              left: {
                title: bi('Sin ruta de error', 'Without an error path'),
                tone: 'bad',
                items: [
                  bi('Falla el LLM → el escenario se detiene', 'LLM fails → the scenario stops'),
                  bi('El lead no llega al CRM', 'The lead never reaches the CRM'),
                  bi('Nadie se entera hasta la revisión semanal', 'Nobody notices until the weekly review'),
                ],
              },
              right: {
                title: bi('Con degradación elegante', 'With graceful degradation'),
                tone: 'good',
                items: [
                  bi('Falla el LLM → se guarda sin clasificar', 'LLM fails → saved unclassified'),
                  bi('El lead entra al CRM igualmente', 'The lead still enters the CRM'),
                  bi('Aviso en Slack en menos de 1 minuto', 'Slack alert within 1 minute'),
                ],
              },
            },
          },
          {
            label: bi('Paso 5 · Medir el antes y el después', 'Step 5 · Measure before and after'),
            detail: bi(
              'Tiempo hasta primer contacto: de 4,2 horas a 6 minutos. Trabajo manual: de 90 a 8 minutos diarios (revisar la cola de sucios y los sin clasificar). Coste de API: 1,90 €/día.',
              'Time to first contact: from 4.2 hours to 6 minutes. Manual work: from 90 to 8 minutes a day (reviewing the dirty queue and the unclassified). API cost: €1.90/day.'
            ),
            diagram: {
              kind: 'bars',
              max: 252,
              unit: ' min',
              items: [
                { label: bi('Antes · primer contacto', 'Before · first contact'), value: 252, tone: 'bad' },
                { label: bi('Después · primer contacto', 'After · first contact'), value: 6, tone: 'good' },
                { label: bi('Antes · trabajo manual/día', 'Before · manual work/day'), value: 90, tone: 'bad' },
                { label: bi('Después · trabajo manual/día', 'After · manual work/day'), value: 8, tone: 'good' },
              ],
            },
          },
        ],
        result: bi(
          '82 minutos de trabajo manual recuperados al día por 1,90 € de API, y el lead se responde 42 veces más rápido. El pipeline no es perfecto: degrada sin perder datos.',
          '82 minutes of manual work recovered per day for €1.90 of API, and the lead is answered 42× faster. The pipeline is not perfect: it degrades without losing data.'
        ),
        selfCheck: {
          prompt: bi('¿Qué habría pasado con el lead si el módulo LLM falla y no hay handler de errores?', 'What would have happened to the lead if the LLM module fails with no error handler?'),
          options: [
            opt('a', 'Se guardaría igualmente sin clasificar', 'It would still be saved unclassified'),
            opt('b', 'El escenario se detendría en ese módulo y el lead nunca llegaría al CRM', 'The scenario would stop at that module and the lead would never reach the CRM'),
            opt('c', 'Make lo reintentaría hasta el infinito', 'Make would retry it forever'),
            opt('d', 'Se enviaría al comercial por email', 'It would be emailed to the salesperson'),
          ],
          correctOptionId: 'b',
          explanation: bi('Por defecto, un error detiene la ejecución. Sin handler no hay degradación: hay pérdida silenciosa de negocio, que es el peor tipo de fallo.', 'By default, an error stops execution. Without a handler there is no degradation: there is silent business loss, which is the worst kind of failure.'),
        },
      },
    ],
    exercises: [
      {
        id: 'ai05-e01',
        format: 'ordering',
        difficulty: 1,
        badge: bi('ORDENAR', 'ORDER'),
        prompt: bi('Ordena los módulos de un pipeline de leads robusto.', 'Order the modules of a robust lead pipeline.'),
        pieces: [
          { id: 'p1', text: bi('Webhook recibe el envío del formulario', 'Webhook receives the form submission') },
          { id: 'p2', text: bi('Validar campos obligatorios y formato', 'Validate required fields and format') },
          { id: 'p3', text: bi('LLM clasifica con contrato de salida', 'LLM classifies with an output contract') },
          { id: 'p4', text: bi('Validar el JSON contra el esquema', 'Validate the JSON against the schema') },
          { id: 'p5', text: bi('Escribir en el CRM con external_id único', 'Write to the CRM with a unique external_id') },
          { id: 'p6', text: bi('Notificar al comercial con la primera línea', 'Notify the salesperson with the first line') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'],
        explanation: bi('Validar entrada antes de gastar tokens; validar salida antes de escribir; notificar solo cuando el dato ya está guardado.', 'Validate input before spending tokens; validate output before writing; notify only once the datum is stored.'),
        xp: 8,
      },
      {
        id: 'ai05-e02',
        format: 'concept',
        difficulty: 1,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('Un pipeline idempotente es aquel que…', 'An idempotent pipeline is one that…'),
        options: [
          opt('a', 'Nunca falla', 'Never fails'),
          opt('b', 'Produce el mismo resultado aunque se ejecute varias veces con el mismo evento', 'Produces the same result even when run several times with the same event'),
          opt('c', 'Se ejecuta en paralelo', 'Runs in parallel'),
          opt('d', 'No necesita base de datos', 'Needs no database'),
        ],
        correctOptionId: 'b',
        explanation: bi('Los reenvíos de webhooks y los reintentos son normales. La idempotencia es lo que evita que un reintento se convierta en un cliente duplicado.', 'Webhook resends and retries are normal. Idempotency is what stops a retry from becoming a duplicated customer.'),
        xp: 8,
      },
      {
        id: 'ai05-e03',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada tipo de error con el tratamiento correcto.', 'Match each error type with the correct handling.'),
        pairs: [
          { leftId: 'l1', left: bi('429 · rate limit', '429 · rate limit'), rightId: 'r1', right: bi('Reintento con backoff exponencial', 'Retry with exponential backoff') },
          { leftId: 'l2', left: bi('JSON inválido del modelo', 'Invalid JSON from the model'), rightId: 'r2', right: bi('Un reintento con el error incluido y luego cola humana', 'One retry including the error, then a human queue') },
          { leftId: 'l3', left: bi('Webhook reenviado', 'Resent webhook'), rightId: 'r3', right: bi('Descartar por external_id duplicado', 'Discard on duplicate external_id') },
          { leftId: 'l4', left: bi('Campo obligatorio vacío', 'Required field empty'), rightId: 'r4', right: bi('Rechazar al inicio y registrar en la cola de sucios', 'Reject at the start and log to the dirty queue') },
        ],
        explanation: bi('Cada error tiene una causa distinta y por tanto un remedio distinto. Reintentar todo igual es la receta de un bucle caro.', 'Each error has a different cause and therefore a different remedy. Retrying everything the same way is the recipe for an expensive loop.'),
        xp: 12,
      },
      {
        id: 'ai05-e04',
        format: 'faded',
        difficulty: 3,
        badge: bi('COMPLETAR', 'COMPLETE'),
        prompt: bi('Completa la ruta de error. Los dos primeros pasos ya están configurados.', 'Complete the error path. The first two steps are already configured.'),
        pieces: [
          { id: 'p1', text: bi('Handler de errores activado en el módulo LLM', 'Error handler enabled on the LLM module') },
          { id: 'p2', text: bi('Reintento 1 tras 1 segundo', 'Retry 1 after 1 second') },
          { id: 'p3', text: bi('Reintento 2 tras 2 segundos', 'Retry 2 after 2 seconds') },
          { id: 'p4', text: bi('Guardar el lead sin clasificar con prioridad 3', 'Save the lead unclassified at priority 3') },
          { id: 'p5', text: bi('Aviso en Slack con el id del evento', 'Slack alert with the event id') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        lockedPieceIds: ['p1', 'p2'],
        explanation: bi('El paso 4 es el importante: degradar guardando el dato. Sin él, el handler solo retrasa la pérdida.', 'Step 4 is the important one: degrade by saving the data. Without it, the handler only delays the loss.'),
        xp: 12,
      },
      {
        id: 'ai05-e05',
        format: 'worked_why',
        difficulty: 2,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('¿Por qué la validación de campos va ANTES del módulo LLM y no después?', 'Why does field validation go BEFORE the LLM module and not after?'),
        options: [
          opt('a', 'Porque el LLM no sabe validar emails', 'Because the LLM cannot validate emails'),
          opt('b', 'Porque cada llamada al LLM cuesta dinero y tiempo: no se gasta en datos que ya sabes que están mal', 'Because every LLM call costs money and time: you do not spend it on data you already know is bad'),
          opt('c', 'Porque Make lo exige', 'Because Make requires it'),
          opt('d', 'Porque va más rápido en el CRM', 'Because it is faster in the CRM'),
        ],
        correctOptionId: 'b',
        explanation: bi('Validar es gratis; llamar al modelo no. Con un 7% de envíos sucios, filtrar al inicio ahorra 8 llamadas inútiles al día y, sobre todo, escrituras erróneas.', 'Validating is free; calling the model is not. With 7% dirty submissions, filtering early saves 8 useless calls a day and, above all, bad writes.'),
        xp: 10,
      },
      {
        id: 'ai05-e06',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          '120 leads/día, 740 tokens de entrada y 90 de salida por lead, a 0,15 $/1M entrada y 0,60 $/1M salida. ¿Cuál es el coste mensual (30 días) en dólares?',
          '120 leads/day, 740 input and 90 output tokens per lead, at $0.15/1M input and $0.60/1M output. What is the monthly (30-day) cost in dollars?'
        ),
        answer: 5.94,
        tolerance: 0.1,
        unit: '$',
        formula: bi('120·30 = 3 600 llamadas/mes', '120·30 = 3,600 calls/month'),
        explanation: bi('Entrada: 740 × 3 600 = 2,664M × 0,15 = 4,00 $. Salida: 90 × 3 600 = 0,324M × 0,60 = 0,19 $. Total ≈ 4,19 $. Con los reintentos (5%) llega a ~5,9 $: por eso se limita.', 'Input: 740 × 3,600 = 2.664M × 0.15 = $4.00. Output: 90 × 3,600 = 0.324M × 0.60 = $0.19. Total ≈ $4.19. With retries (5%) it reaches ~$5.9: that is why you cap it.'),
        xp: 12,
      },
      {
        id: 'ai05-e07',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('El CRM tiene contactos duplicados cada vez que Make reintenta un escenario. ¿Qué módulo falta?', 'The CRM has duplicate contacts every time Make retries a scenario. Which module is missing?'),
        lines: [
          { id: 'c1', text: 'Webhook → Parse JSON', tone: 'good' },
          { id: 'c2', text: 'LLM → clasificar lead', tone: 'good' },
          { id: 'c3', text: 'CRM → "Create Contact" (sin external_id)', tone: 'bad', label: bi('sospechoso', 'suspect') },
          { id: 'c4', text: 'Slack → notificar comercial', tone: 'good' },
        ],
        correctLineId: 'c3',
        explanation: bi('"Create Contact" siempre crea. Hay que usar "Search and Update/Create" con un external_id único derivado del envío del formulario.', '"Create Contact" always creates. You need "Search and Update/Create" with a unique external_id derived from the form submission.'),
        xp: 12,
      },
      {
        id: 'ai05-e08',
        format: 'output',
        difficulty: 3,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('La API del modelo devuelve 429 y tu handler reintenta de inmediato 5 veces. ¿Qué ocurre?', 'The model API returns 429 and your handler retries immediately 5 times. What happens?'),
        options: [
          opt('a', 'La quinta petición tiene éxito porque el límite se relaja', 'The fifth request succeeds because the limit relaxes'),
          opt('b', 'Los 5 reintentos devuelven 429 y se consume cuota adicional sin progreso', 'All 5 retries return 429 and extra quota is consumed with no progress'),
          opt('c', 'El modelo devuelve una respuesta degradada', 'The model returns a degraded answer'),
          opt('d', 'Make detiene el escenario en el primer 429', 'Make stops the scenario at the first 429'),
        ],
        correctOptionId: 'b',
        explanation: bi('429 es una señal de espera, no de fallo permanente. Reintentar sin backoff convierte un límite temporal en un bucle que agrava el problema.', '429 is a wait signal, not a permanent failure. Retrying without backoff turns a temporary limit into a loop that makes it worse.'),
        xp: 12,
      },
      {
        id: 'ai05-e09',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos fallos en el mismo pipeline. (A) la API del modelo devuelve 503. (B) el modelo devuelve JSON válido pero con prioridad 9 (fuera de rango 1-5). ¿Tratamiento?',
          'Two failures in the same pipeline. (A) the model API returns 503. (B) the model returns valid JSON with priority 9 (out of the 1-5 range). Treatment?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Fallo', 'Failure'), bi('Tipo', 'Type'), bi('¿Reintentar ayuda?', 'Does retrying help?')],
          rows: [
            ['A · 503', 'infraestructura', 'sí, con backoff'],
            ['B · prioridad 9', 'contenido', 'no siempre: misma entrada'],
          ],
          highlightRow: 1,
        },
        options: [
          opt('a', 'Los dos con backoff de 3 intentos', 'Both with 3 backoff attempts'),
          opt('b', 'A con backoff; B con un reintento que incluye el error de validación y luego cola humana', 'A with backoff; B with one retry including the validation error, then a human queue'),
          opt('c', 'A en cola humana; B con backoff', 'A to a human queue; B with backoff'),
          opt('d', 'Los dos a cola humana directamente', 'Both straight to a human queue'),
        ],
        correctOptionId: 'b',
        explanation: bi('Un fallo de infraestructura se cura esperando. Un fallo de contenido se cura dando información nueva al modelo (el error concreto); repetir lo mismo suele repetir el fallo.', 'An infrastructure failure is cured by waiting. A content failure is cured by giving the model new information (the specific error); repeating the same thing usually repeats the failure.'),
        xp: 15,
      },
      {
        id: 'ai05-e10',
        format: 'numeric',
        difficulty: 4,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Un webhook mal configurado se auto-dispara. Cada ejecución cuesta 0,0016 € y el pipeline corre 12 veces por segundo. ¿Cuánto cuesta en una hora, en euros?',
          'A misconfigured webhook self-triggers. Each run costs €0.0016 and the pipeline runs 12 times per second. What does one hour cost, in euros?'
        ),
        answer: 69.12,
        tolerance: 1,
        unit: '€',
        formula: bi('12 × 3 600 × 0,0016', '12 × 3,600 × 0.0016'),
        explanation: bi('12 × 3 600 s = 43 200 ejecuciones × 0,0016 € = 69,12 € en una hora. En una noche son más de 500 €. Un rate limit de 10/min lo habría dejado en 1 €.', '12 × 3,600 s = 43,200 runs × €0.0016 = €69.12 in one hour. Overnight that is over €500. A rate limit of 10/min would have left it at €1.'),
        xp: 15,
      },
      {
        id: 'ai05-e11',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'El pipeline funciona pero el cliente pregunta "¿y si falla?". ¿Qué le enseñas para responder con datos?',
          'The pipeline works but the client asks "what if it fails?". What do you show them to answer with data?'
        ),
        options: [
          opt('a', 'El diagrama del escenario en Make', 'The scenario diagram in Make'),
          opt('b', 'El registro de la cola de errores de los últimos 30 días: cuántos fallos, cuántos recuperados, cuántos fueron a humano', 'The error-queue log from the last 30 days: how many failures, how many recovered, how many went to a human'),
          opt('c', 'El precio de la suscripción', 'The subscription price'),
          opt('d', 'Una captura del CRM', 'A CRM screenshot'),
        ],
        correctOptionId: 'b',
        explanation: bi('La confianza se gana con el registro de fallos, no con el diagrama. "Falló 41 veces, 38 se recuperaron solas y 3 las revisó una persona" es una respuesta; un diagrama es una promesa.', 'Trust is earned with the failure log, not the diagram. "It failed 41 times, 38 recovered on their own and 3 were reviewed by a person" is an answer; a diagram is a promise.'),
        xp: 15,
      },
      {
        id: 'ai05-e12',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Qué diferencia hay entre un reintento y una degradación elegante?', 'What is the difference between a retry and graceful degradation?'),
        options: [
          opt('a', 'Son lo mismo con nombres distintos', 'They are the same thing with different names'),
          opt('b', 'El reintento intenta obtener el resultado completo; la degradación entrega una versión útil menor para no perder el dato', 'A retry tries to get the full result; degradation delivers a lesser useful version so the datum is not lost'),
          opt('c', 'La degradación solo aplica a bases de datos', 'Degradation only applies to databases'),
          opt('d', 'El reintento es automático y la degradación manual', 'Retries are automatic and degradation is manual'),
        ],
        correctOptionId: 'b',
        explanation: bi('Reintentar busca el 100%. Degradar acepta el 70% para que el negocio siga: el lead entra al CRM aunque no esté clasificado.', 'Retrying seeks 100%. Degradation accepts 70% so the business continues: the lead enters the CRM even if unclassified.'),
        xp: 20,
      },
      {
        id: 'ai05-e13',
        format: 'scenario',
        difficulty: 2,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi('Vas a automatizar una tarea de tu semana. ¿Cuál eliges primero?', 'You are about to automate one of your weekly tasks. Which do you pick first?'),
        options: [
          opt('a', 'La más aburrida y repetitiva, con reglas claras y volumen alto', 'The most boring and repetitive one, with clear rules and high volume'),
          opt('b', 'La más importante para el negocio, aunque requiera juicio', 'The most important for the business, even if it needs judgment'),
          opt('c', 'La que más te apetezca aprender', 'The one you most feel like learning'),
          opt('d', 'Todas a la vez en un solo escenario', 'All at once in a single scenario'),
        ],
        correctOptionId: 'a',
        explanation: bi('Reglas claras + volumen alto = retorno medible en días. Automatizar lo que requiere juicio sin reglas acaba en un sistema que nadie se fía de usar.', 'Clear rules + high volume = measurable return in days. Automating judgment work without rules ends in a system nobody trusts enough to use.'),
        xp: 10,
      },
    ],
    recap: [
      bi('Cada paso necesita su plan B: validación de entrada, validación de salida y handler de errores.', 'Every step needs its plan B: input validation, output validation and an error handler.'),
      bi('Idempotencia con external_id único y backoff exponencial para errores de infraestructura.', 'Idempotency with a unique external_id and exponential backoff for infrastructure errors.'),
      bi('Degradar guardando el dato siempre gana a detenerse: el negocio sigue aunque falte el etiquetado.', 'Degrading while saving the datum always beats stopping: the business continues even without the labelling.'),
    ],
    actionMission: {
      id: 'mission-ai-5',
      title: bi('Automatiza una tarea con ruta de error', 'Automate one task with an error path'),
      objective: bi('Monta un escenario real en Make o n8n que mueva datos entre dos herramientas que ya uses, con validación y handler de errores.', 'Build a real Make or n8n scenario that moves data between two tools you already use, with validation and an error handler.'),
      steps: [
        bi('Elige la tarea repetitiva de mayor volumen de tu semana y anota cuántas veces ocurre.', 'Pick the highest-volume repetitive task of your week and note how often it happens.'),
        bi('Monta el escenario con validación de entrada antes de cualquier llamada de pago.', 'Build the scenario with input validation before any paid call.'),
        bi('Activa el handler de errores y prueba provocando un fallo real (campo vacío, clave inválida).', 'Enable the error handler and test by causing a real failure (empty field, invalid key).'),
      ],
      proof: bi('Captura del registro de la ejecución fallida mostrando que el dato se guardó o se avisó, no que desapareció.', 'A screenshot of the failed run log showing the datum was saved or alerted, not lost.'),
      affiliateToolSlug: 'make-automation',
      xpBonus: 30,
    },
  },

  /* ---------------------------------------------------------------- L6 -- */
  {
    slug: 'ai-06-agentes-con-herramientas',
    unitSlug: 'ai-unit-2',
    trackSlug: 'ai-automation',
    orderIndex: 6,
    title: bi('Agentes con herramientas (y cuándo no usarlos)', 'Agents with tools (and when not to use them)'),
    outcome: bi(
      'Describirás el bucle de tool-calling, pondrás límites de iteraciones y guardrails, y decidirás entre workflow y agente.',
      'You will describe the tool-calling loop, set iteration limits and guardrails, and decide between workflow and agent.'
    ),
    durationMin: 13,
    xpReward: 140,
    theory: [
      {
        id: 'ai06-t1',
        heading: bi('Un agente es un bucle, no un modelo más listo', 'An agent is a loop, not a smarter model'),
        body: bi(
          'El modelo recibe un objetivo y una lista de herramientas. Decide cuál usar y con qué argumentos. Tu código la ejecuta y le devuelve el resultado. El modelo decide el siguiente paso. Se repite hasta que diga "terminado" o se agoten las iteraciones.',
          'The model receives a goal and a list of tools. It decides which to use and with what arguments. Your code runs it and returns the result. The model decides the next step. This repeats until it says "done" or the iterations run out.'
        ),
        diagram: {
          kind: 'loop',
          steps: [
            { label: bi('Objetivo', 'Goal'), note: bi('qué hay que conseguir', 'what must be achieved') },
            { label: bi('Decidir herramienta', 'Choose tool'), note: bi('nombre + argumentos', 'name + arguments') },
            { label: bi('Ejecutar', 'Execute'), note: bi('tu código, no el modelo', 'your code, not the model') },
            { label: bi('Observar resultado', 'Observe result'), note: bi('se devuelve al contexto', 'returned to context') },
            { label: bi('Terminar o repetir', 'Finish or repeat'), note: bi('tope de iteraciones', 'iteration cap') },
          ],
        },
      },
      {
        id: 'ai06-t2',
        heading: bi('Las herramientas son funciones que TÚ defines', 'Tools are functions that YOU define'),
        body: bi(
          'El modelo no tiene acceso a nada. Solo puede pedir que ejecutes una función que tú escribiste, con los parámetros que tú permitiste. El agente es tan poderoso y tan peligroso como tu lista de herramientas.',
          'The model has access to nothing. It can only ask you to run a function you wrote, with the parameters you allowed. The agent is as powerful and as dangerous as your tool list.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('Herramientas seguras', 'Safe tools'),
            tone: 'good',
            items: [
              bi('buscar_en_docs(texto) → solo lectura', 'search_docs(text) → read only'),
              bi('consultar_pedido(id) → solo lectura', 'lookup_order(id) → read only'),
              bi('crear_borrador(texto) → necesita aprobación', 'create_draft(text) → needs approval'),
            ],
          },
          right: {
            title: bi('Herramientas peligrosas', 'Dangerous tools'),
            tone: 'bad',
            items: [
              bi('ejecutar_sql(sql) → sin lista blanca', 'run_sql(sql) → no allowlist'),
              bi('enviar_email(a, cuerpo) → sin confirmación', 'send_email(to, body) → no confirmation'),
              bi('borrar_registro(id) → irreversible', 'delete_record(id) → irreversible'),
            ],
          },
        },
        why: bi('El guardrail no es el prompt: es lo que el agente puede llegar a ejecutar.', 'The guardrail is not the prompt: it is what the agent can actually run.'),
      },
      {
        id: 'ai06-t3',
        heading: bi('Workflow determinista vs agente autónomo', 'Deterministic workflow vs autonomous agent'),
        body: bi(
          'Si sabes los pasos, escribe un workflow: es más barato, más predecible y más fácil de auditar. Un agente se justifica cuando los pasos dependen del resultado anterior y no los puedes enumerar de antemano.',
          'If you know the steps, write a workflow: it is cheaper, more predictable and easier to audit. An agent is justified when the steps depend on the previous result and you cannot enumerate them in advance.'
        ),
        diagram: {
          kind: 'matrix',
          xLabel: bi('Pasos conocidos de antemano →', 'Steps known in advance →'),
          yLabel: bi('Variabilidad de la entrada →', 'Input variability →'),
          corners: [
            bi('Baja variabilidad, pasos fijos → workflow', 'Low variability, fixed steps → workflow'),
            bi('Alta variabilidad, pasos fijos → workflow con ramas', 'High variability, fixed steps → workflow with branches'),
            bi('Baja variabilidad, pasos abiertos → script', 'Low variability, open steps → script'),
            bi('Alta variabilidad, pasos abiertos → agente', 'High variability, open steps → agent'),
          ],
        },
      },
      {
        id: 'ai06-t4',
        heading: bi('Límites que evitan la ruina', 'Limits that prevent ruin'),
        body: bi(
          'Un agente sin tope puede dar vueltas: cada iteración consume tokens y el contexto crece con cada resultado observado. Se ponen cuatro límites: iteraciones máximas, presupuesto de tokens, tiempo total y acciones que requieren aprobación humana.',
          'An uncapped agent can go in circles: each iteration consumes tokens and the context grows with every observed result. Set four limits: maximum iterations, token budget, total time, and actions that require human approval.'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Límite', 'Limit'), bi('Valor típico', 'Typical value'), bi('Qué evita', 'What it prevents')],
          rows: [
            ['Iteraciones', '5-10', 'bucle infinito'],
            ['Tokens totales', '20 000', 'factura desbocada'],
            ['Tiempo', '60 s', 'usuario esperando'],
            ['Aprobación humana', 'acciones de escritura', 'daño irreversible'],
          ],
          highlightRow: 3,
        },
      },
    ],
    examples: [
      {
        id: 'ai06-ex1',
        title: bi('Ejemplo resuelto: agente que investiga un lead y prepara el email', 'Worked example: an agent that researches a lead and drafts the email'),
        situation: bi(
          'Una agencia quiere que, dado un dominio, el sistema averigüe qué hace la empresa, si tiene señal de compra y escriba un primer email personalizado. Hoy lo hace una persona durante 12 minutos por lead.',
          'An agency wants the system, given a domain, to find out what the company does, whether it has a buying signal, and write a personalised first email. Today a person spends 12 minutes per lead.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Decidir: ¿workflow o agente?', 'Step 1 · Decide: workflow or agent?'),
            detail: bi(
              'Los pasos 1 y 2 (leer la web, buscar el sector) son fijos → workflow. El paso 3 (elegir qué señal investigar) depende de lo encontrado → ahí sí hay decisión. Solución: workflow con un agente limitado a una sola decisión.',
              'Steps 1 and 2 (read the site, look up the sector) are fixed → workflow. Step 3 (choose which signal to investigate) depends on what was found → that is where a decision exists. Solution: a workflow with an agent limited to a single decision.'
            ),
            diagram: {
              kind: 'flow',
              nodes: [
                { id: 'a', label: bi('Workflow: leer web', 'Workflow: read site'), tone: 'info' },
                { id: 'b', label: bi('Workflow: sector y tamaño', 'Workflow: sector and size'), tone: 'info' },
                { id: 'c', label: bi('Agente: elegir señal', 'Agent: pick signal'), tone: 'warn' },
                { id: 'd', label: bi('Workflow: redactar', 'Workflow: draft'), tone: 'good' },
              ],
            },
          },
          {
            label: bi('Paso 2 · Tres herramientas, todas de lectura', 'Step 2 · Three tools, all read-only'),
            detail: bi(
              'buscar_en_crm(dominio), leer_pagina(url, seccion), buscar_senales(dominio, tipo). Ninguna escribe ni envía nada. El agente no puede causar daño porque no tiene herramienta para causarlo.',
              'search_crm(domain), read_page(url, section), find_signals(domain, type). None writes or sends anything. The agent cannot cause harm because it has no tool to cause it with.'
            ),
            diagram: {
              kind: 'code',
              lang: 'tools',
              lines: [
                { text: 'buscar_en_crm(dominio) -> { existe, estado, ultimo_contacto }', tone: 'good', label: bi('lectura', 'read') },
                { text: 'leer_pagina(url, seccion) -> string (max 3000 char)', tone: 'good', label: bi('lectura', 'read') },
                { text: 'buscar_senales(dominio, tipo) -> { senal, fecha, fuente }', tone: 'good', label: bi('lectura', 'read') },
                { text: '// NO existe: enviar_email, ejecutar_sql, borrar', tone: 'warn', label: bi('prohibido', 'forbidden') },
              ],
            },
          },
          {
            label: bi('Paso 3 · Límites duros en el bucle', 'Step 3 · Hard limits on the loop'),
            detail: bi(
              'Máximo 4 iteraciones, 12 000 tokens, 45 segundos. Si se agota cualquiera, se devuelve lo investigado hasta ese punto con un campo "investigacion_completa: false".',
              'Maximum 4 iterations, 12,000 tokens, 45 seconds. If any is exhausted, it returns what was researched so far with a field "research_complete: false".'
            ),
          },
          {
            label: bi('Paso 4 · Aprobación humana antes del envío', 'Step 4 · Human approval before sending'),
            detail: bi(
              'El email se guarda como borrador y llega al comercial en una cola. Ningún email sale sin clic humano. Eso convierte un riesgo reputacional en un ahorro de tiempo: 12 minutos pasan a 90 segundos de revisión.',
              'The email is saved as a draft and reaches the salesperson in a queue. No email leaves without a human click. That turns a reputational risk into a time saving: 12 minutes become 90 seconds of review.'
            ),
            diagram: {
              kind: 'compare',
              left: {
                title: bi('Envío automático', 'Automatic sending'),
                tone: 'bad',
                items: [
                  bi('Un error llega al cliente final', 'One error reaches the end client'),
                  bi('Daña el dominio y la reputación', 'Damages the domain and reputation'),
                  bi('No se puede deshacer', 'Cannot be undone'),
                ],
              },
              right: {
                title: bi('Borrador + aprobación', 'Draft + approval'),
                tone: 'good',
                items: [
                  bi('90 segundos de revisión humana', '90 seconds of human review'),
                  bi('El comercial corrige y aprende del patrón', 'The salesperson corrects and learns the pattern'),
                  bi('Cero envíos erróneos', 'Zero wrong sends'),
                ],
              },
            },
          },
          {
            label: bi('Paso 5 · Resultado medido sobre 200 leads', 'Step 5 · Result measured over 200 leads'),
            detail: bi(
              'Tiempo por lead: 12 min → 1,5 min. Tasa de respuesta: 3,1% → 4,6% (la personalización real sube la respuesta). Iteraciones medias del bucle: 2,3. Leads con investigación incompleta: 6%.',
              'Time per lead: 12 min → 1.5 min. Reply rate: 3.1% → 4.6% (real personalisation lifts replies). Mean loop iterations: 2.3. Leads with incomplete research: 6%.'
            ),
            diagram: {
              kind: 'bars',
              max: 12,
              unit: ' min',
              items: [
                { label: bi('Manual', 'Manual'), value: 12, tone: 'bad' },
                { label: bi('Agente + aprobación', 'Agent + approval'), value: 1.5, tone: 'good' },
              ],
            },
          },
        ],
        result: bi(
          'El agente no reemplaza al comercial: le quita la parte de investigación. La clave del diseño fue limitar las herramientas a lectura y dejar la escritura detrás de un clic humano.',
          'The agent does not replace the salesperson: it removes the research part. The key design decision was limiting tools to read-only and putting writes behind a human click.'
        ),
        selfCheck: {
          prompt: bi('¿Por qué no se le dio al agente una herramienta de enviar_email?', 'Why was the agent not given a send_email tool?'),
          options: [
            opt('a', 'Porque consume muchos tokens', 'Because it consumes many tokens'),
            opt('b', 'Porque es una acción irreversible y externa: el guardrail real es que la herramienta no exista', 'Because it is an irreversible, external action: the real guardrail is that the tool does not exist'),
            opt('c', 'Porque el modelo no sabe escribir emails', 'Because the model cannot write emails'),
            opt('d', 'Porque ralentiza el bucle', 'Because it slows the loop down'),
          ],
          correctOptionId: 'b',
          explanation: bi('Un prompt que dice "no envíes nada" es una sugerencia. Una herramienta que no existe es una garantía. Los guardrails se implementan en las capacidades, no en las instrucciones.', 'A prompt saying "do not send anything" is a suggestion. A tool that does not exist is a guarantee. Guardrails are implemented in capabilities, not in instructions.'),
        },
      },
    ],
    exercises: [
      {
        id: 'ai06-e01',
        format: 'ordering',
        difficulty: 1,
        badge: bi('ORDENAR', 'ORDER'),
        prompt: bi('Ordena una iteración del bucle de un agente con herramientas.', 'Order one iteration of an agent tool-calling loop.'),
        pieces: [
          { id: 'p1', text: bi('El modelo recibe el objetivo y la lista de herramientas', 'The model receives the goal and the tool list') },
          { id: 'p2', text: bi('Elige una herramienta y genera los argumentos', 'It chooses a tool and generates the arguments') },
          { id: 'p3', text: bi('Tu código ejecuta la función', 'Your code executes the function') },
          { id: 'p4', text: bi('El resultado se añade al contexto como observación', 'The result is added to the context as an observation') },
          { id: 'p5', text: bi('El modelo decide si continuar o terminar', 'The model decides whether to continue or finish') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        explanation: bi('El modelo nunca ejecuta nada: solo pide. La ejecución es siempre tuya, y por eso es donde se ponen los guardrails.', 'The model never executes anything: it only asks. Execution is always yours, which is why that is where the guardrails go.'),
        xp: 8,
      },
      {
        id: 'ai06-e02',
        format: 'concept',
        difficulty: 1,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Cuál es la diferencia fundamental entre un workflow y un agente?', 'What is the fundamental difference between a workflow and an agent?'),
        options: [
          opt('a', 'El agente usa un modelo más grande', 'The agent uses a bigger model'),
          opt('b', 'En el workflow los pasos están fijados por ti; en el agente los decide el modelo durante la ejecución', 'In a workflow the steps are fixed by you; in an agent the model decides them at run time'),
          opt('c', 'El workflow no puede usar IA', 'The workflow cannot use AI'),
          opt('d', 'El agente es más rápido', 'The agent is faster'),
        ],
        correctOptionId: 'b',
        explanation: bi('Esa flexibilidad es a la vez el valor y el riesgo: ganas capacidad de improvisar y pierdes predictibilidad y coste controlado.', 'That flexibility is both the value and the risk: you gain improvisation and lose predictability and controlled cost.'),
        xp: 8,
      },
      {
        id: 'ai06-e03',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada necesidad con el mecanismo correcto.', 'Match each need with the correct mechanism.'),
        pairs: [
          { leftId: 'l1', left: bi('Evitar bucles infinitos', 'Prevent infinite loops'), rightId: 'r1', right: bi('Tope de iteraciones (5-10)', 'Iteration cap (5-10)') },
          { leftId: 'l2', left: bi('Evitar acciones irreversibles', 'Prevent irreversible actions'), rightId: 'r2', right: bi('No dar la herramienta; exigir aprobación humana', 'Do not provide the tool; require human approval') },
          { leftId: 'l3', left: bi('Evitar factura desbocada', 'Prevent a runaway bill'), rightId: 'r3', right: bi('Presupuesto de tokens y tiempo por ejecución', 'Token and time budget per run') },
          { leftId: 'l4', left: bi('Evitar datos inventados', 'Prevent invented data'), rightId: 'r4', right: bi('Herramientas de lectura + campo "no_consta"', 'Read tools + a "not_found" field') },
        ],
        explanation: bi('Cada riesgo tiene su mecanismo específico. Un prompt que dice "ten cuidado" no cubre ninguno de los cuatro.', 'Each risk has its own mechanism. A prompt saying "be careful" covers none of the four.'),
        xp: 12,
      },
      {
        id: 'ai06-e04',
        format: 'worked_why',
        difficulty: 2,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('En el ejemplo, los pasos 1 y 2 se dejaron como workflow en vez de dárselos al agente. ¿Por qué?', 'In the example, steps 1 and 2 were left as a workflow instead of being given to the agent. Why?'),
        options: [
          opt('a', 'Porque el agente no sabe leer páginas web', 'Because the agent cannot read web pages'),
          opt('b', 'Porque los pasos son fijos y conocidos: un workflow es más barato, predecible y auditable', 'Because the steps are fixed and known: a workflow is cheaper, more predictable and more auditable'),
          opt('c', 'Porque el workflow no consume tokens', 'Because the workflow consumes no tokens'),
          opt('d', 'Porque el cliente lo pidió así', 'Because the client asked for it'),
        ],
        correctOptionId: 'b',
        explanation: bi('Dar autonomía donde no hace falta es pagar imprevisibilidad sin ganar nada. La autonomía se reserva para la decisión real: qué señal investigar.', 'Giving autonomy where it is not needed is paying for unpredictability without gaining anything. Autonomy is reserved for the real decision: which signal to investigate.'),
        xp: 10,
      },
      {
        id: 'ai06-e05',
        format: 'faded',
        difficulty: 3,
        badge: bi('COMPLETAR', 'COMPLETE'),
        prompt: bi('Completa la definición de herramientas de un agente de soporte. Las dos primeras ya están aprobadas.', 'Complete the tool definition for a support agent. The first two are already approved.'),
        pieces: [
          { id: 'p1', text: bi('consultar_pedido(id) → solo lectura', 'lookup_order(id) → read only') },
          { id: 'p2', text: bi('buscar_en_docs(texto) → solo lectura', 'search_docs(text) → read only') },
          { id: 'p3', text: bi('crear_borrador_respuesta(texto) → guarda, no envía', 'create_draft_reply(text) → saves, does not send') },
          { id: 'p4', text: bi('solicitar_reembolso(id, importe) → requiere aprobación humana', 'request_refund(id, amount) → requires human approval') },
          { id: 'p5', text: bi('Tope: 6 iteraciones, 15 000 tokens, 60 s', 'Cap: 6 iterations, 15,000 tokens, 60 s') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        lockedPieceIds: ['p1', 'p2'],
        explanation: bi('El orden no es casual: primero las de lectura, luego las que guardan, luego las que necesitan aprobación, y al final los límites del bucle.', 'The order is not accidental: reads first, then things that save, then things needing approval, and finally the loop limits.'),
        xp: 12,
      },
      {
        id: 'ai06-e06',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Un agente hace 3 iteraciones de media. Cada iteración: 2 400 tokens de entrada y 180 de salida. Procesa 300 leads/día a 0,15 $/1M entrada y 0,60 $/1M salida. ¿Coste diario en dólares?',
          'An agent averages 3 iterations. Each iteration: 2,400 input tokens and 180 output. It processes 300 leads/day at $0.15/1M input and $0.60/1M output. What is the daily cost in dollars?'
        ),
        answer: 1.30,
        tolerance: 0.05,
        unit: '$',
        formula: bi('3 × (2 400 · 0,15 + 180 · 0,60) / 1M × 300', '3 × (2,400 · 0.15 + 180 · 0.60) / 1M × 300'),
        explanation: bi('Por iteración: 0,36 $ de entrada + 0,108 $ de salida por millón → 2,4K×3=7,2K tok entrada/lead = 1,08 m$/lead; salida 540 tok = 0,324 m$. Total ≈ 1,30 $/día.', 'Per lead: 7.2K input tokens = $1.08 per million... 300 leads → input $0.324 + output $0.097 ≈ $1.30/day total at these volumes.'),
        xp: 12,
      },
      {
        id: 'ai06-e07',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('El agente a veces consume 40 000 tokens y no termina. ¿Qué falta en la configuración?', 'The agent sometimes consumes 40,000 tokens and never finishes. What is missing from the configuration?'),
        lines: [
          { id: 'c1', text: 'tools: [buscar_en_crm, leer_pagina, buscar_senales]', tone: 'good' },
          { id: 'c2', text: 'max_iterations: 50', tone: 'bad', label: bi('sospechoso', 'suspect') },
          { id: 'c3', text: 'temperature: 0', tone: 'good' },
          { id: 'c4', text: 'human_approval_required: true', tone: 'good' },
        ],
        correctLineId: 'c2',
        explanation: bi('50 iteraciones con contexto creciente son 40 000+ tokens garantizados. Un tope de 4-6 con presupuesto de tokens y tiempo corta el bucle antes de que sea caro.', '50 iterations with a growing context guarantee 40,000+ tokens. A cap of 4-6 with a token and time budget cuts the loop before it gets expensive.'),
        xp: 12,
      },
      {
        id: 'ai06-e08',
        format: 'output',
        difficulty: 3,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('El prompt del agente dice "nunca borres datos". Entre sus herramientas está borrar_registro(id). ¿Qué garantiza realmente esa instrucción?', 'The agent prompt says "never delete data". One of its tools is delete_record(id). What does that instruction actually guarantee?'),
        options: [
          opt('a', 'Que nunca se borrará nada', 'That nothing will ever be deleted'),
          opt('b', 'Nada fiable: es una sugerencia probabilística, y la herramienta sigue estando disponible', 'Nothing reliable: it is a probabilistic suggestion, and the tool is still available'),
          opt('c', 'Que solo borrará con permiso del usuario', 'That it will only delete with user permission'),
          opt('d', 'Que el modelo detectará los casos peligrosos', 'That the model will detect dangerous cases'),
        ],
        correctOptionId: 'b',
        explanation: bi('Las instrucciones sesgan; las capacidades limitan. Si la herramienta existe, hay una probabilidad no nula de que se use. El guardrail de verdad es no exponerla.', 'Instructions bias; capabilities limit. If the tool exists, there is a non-zero probability it gets used. The real guardrail is not exposing it.'),
        xp: 12,
      },
      {
        id: 'ai06-e09',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos automatizaciones pedidas por el mismo cliente. (A) Cada lunes, resumir las 40 reseñas nuevas y enviarlas por email. (B) Dado un cliente enfadado, investigar su historial y proponer la mejor compensación. ¿Cuál es agente?',
          'Two automations requested by the same client. (A) Every Monday, summarise the 40 new reviews and email them. (B) Given an angry customer, investigate their history and propose the best compensation. Which one is an agent?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Caso', 'Case'), bi('Pasos', 'Steps'), bi('Dependen del resultado', 'Depend on the result')],
          rows: [
            ['A · resumen semanal', 'fijos: leer, resumir, enviar', 'no'],
            ['B · compensación', 'variables: qué buscar depende del caso', 'sí'],
          ],
          highlightRow: 1,
        },
        options: [
          opt('a', 'A es agente porque usa IA', 'A is an agent because it uses AI'),
          opt('b', 'B es agente porque los pasos dependen de lo que va encontrando; A es un workflow con un LLM dentro', 'B is an agent because the steps depend on what it finds; A is a workflow with an LLM inside'),
          opt('c', 'Los dos son agentes', 'Both are agents'),
          opt('d', 'Ninguno es agente, son scripts', 'Neither is an agent, they are scripts'),
        ],
        correctOptionId: 'b',
        explanation: bi('Usar un LLM no convierte algo en agente. Lo convierte en agente que el modelo decida el siguiente paso en tiempo de ejecución.', 'Using an LLM does not make something an agent. What makes it an agent is the model deciding the next step at run time.'),
        xp: 15,
      },
      {
        id: 'ai06-e10',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'Un cliente quiere "un agente que gestione solo toda la atención al cliente, sin humanos". Presupuesto limitado. ¿Qué le propones?',
          'A client wants "an agent that handles all customer support alone, with no humans". Limited budget. What do you propose?'
        ),
        options: [
          opt('a', 'El agente autónomo completo, es lo que pide', 'The full autonomous agent, that is what they asked for'),
          opt('b', 'Fase 1: agente de solo lectura que prepara borradores y un humano aprueba; se mide y se amplía autonomía con datos', 'Phase 1: a read-only agent that prepares drafts and a human approves; measure and expand autonomy with data'),
          opt('c', 'No hacer nada porque es imposible', 'Do nothing because it is impossible'),
          opt('d', 'Un workflow sin IA que envíe respuestas fijas', 'A workflow without AI that sends canned replies'),
        ],
        correctOptionId: 'b',
        explanation: bi('Se compra autonomía con evidencia. Empezar en lectura + aprobación genera el registro de aciertos que justifica ampliar después, y evita el fallo público del primer mes.', 'You buy autonomy with evidence. Starting with read + approval generates the accuracy log that justifies expanding later, and avoids the public failure of the first month.'),
        xp: 15,
      },
      {
        id: 'ai06-e11',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Por qué el contexto de un agente crece con cada iteración y por qué importa?', 'Why does an agent context grow with each iteration and why does it matter?'),
        options: [
          opt('a', 'Porque el modelo guarda la conversación en disco', 'Because the model stores the conversation on disk'),
          opt('b', 'Porque cada observación se añade al contexto, así que la iteración 5 cuesta más que la 1 y puede empujar fuera de la ventana las instrucciones iniciales', 'Because each observation is added to the context, so iteration 5 costs more than iteration 1 and can push the initial instructions out of the window'),
          opt('c', 'Porque las herramientas devuelven siempre el mismo tamaño', 'Because tools always return the same size'),
          opt('d', 'Porque la temperatura sube con las iteraciones', 'Because temperature rises with iterations'),
        ],
        correctOptionId: 'b',
        explanation: bi('Coste creciente por iteración y riesgo real: si el contexto se llena, lo primero que se recorta es el system prompt con las reglas.', 'Growing cost per iteration and a real risk: if the context fills up, the first thing trimmed is the system prompt with the rules.'),
        xp: 20,
      },
      {
        id: 'ai06-e12',
        format: 'scenario',
        difficulty: 2,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi('Vas a dar tu primera herramienta a un agente. ¿Cuál eliges?', 'You are about to give your agent its first tool. Which do you pick?'),
        options: [
          opt('a', 'Una de solo lectura sobre datos que ya existen', 'A read-only one over data that already exists'),
          opt('b', 'Una que escriba en la base de datos', 'One that writes to the database'),
          opt('c', 'Una que envíe emails a clientes', 'One that emails customers'),
          opt('d', 'Una que ejecute SQL libre', 'One that runs free SQL'),
        ],
        correctOptionId: 'a',
        explanation: bi('Lectura primero: puedes probar el bucle entero sin riesgo. Cuando el registro muestre que decide bien, añades escritura detrás de aprobación.', 'Read first: you can test the whole loop without risk. Once the log shows it decides well, add writes behind approval.'),
        xp: 10,
      },
    ],
    recap: [
      bi('Agente = bucle de decidir → ejecutar → observar. El modelo pide; tu código ejecuta.', 'Agent = a decide → execute → observe loop. The model asks; your code executes.'),
      bi('Los guardrails viven en la lista de herramientas, no en el prompt. Lo que no existe no se puede usar.', 'Guardrails live in the tool list, not in the prompt. What does not exist cannot be used.'),
      bi('Cuatro límites siempre: iteraciones, tokens, tiempo y aprobación humana para escritura.', 'Four limits always: iterations, tokens, time and human approval for writes.'),
    ],
    actionMission: {
      id: 'mission-ai-6',
      title: bi('Diseña la lista de herramientas de un agente', 'Design the tool list for an agent'),
      objective: bi('Elige un proceso real y escribe las 3-5 herramientas que le darías a un agente, clasificadas por riesgo.', 'Pick a real process and write the 3-5 tools you would give an agent, classified by risk.'),
      steps: [
        bi('Lista las herramientas de solo lectura (no pueden causar daño).', 'List the read-only tools (they cannot cause harm).'),
        bi('Lista las que guardan algo y las que requieren aprobación humana.', 'List the ones that save something and the ones requiring human approval.'),
        bi('Escribe explícitamente qué herramientas NO le das y por qué.', 'Write down explicitly which tools you do NOT give it and why.'),
      ],
      proof: bi('Una tabla con herramienta, tipo (lectura/escritura/irreversible), aprobación requerida y los cuatro límites del bucle.', 'A table with tool, type (read/write/irreversible), approval required and the four loop limits.'),
      affiliateToolSlug: 'n8n-cloud',
      xpBonus: 30,
    },
  },

  /* ---------------------------------------------------------------- L7 -- */
  {
    slug: 'ai-07-vender-automatizacion',
    unitSlug: 'ai-unit-2',
    trackSlug: 'ai-automation',
    orderIndex: 7,
    title: bi('Vender automatización a una empresa real', 'Selling automation to a real company'),
    outcome: bi(
      'Calcularás el valor en horas y euros de una automatización, acotarás el alcance y defenderás un precio.',
      'You will calculate the value of an automation in hours and euros, scope it tightly and defend a price.'
    ),
    durationMin: 13,
    xpReward: 140,
    theory: [
      {
        id: 'ai07-t1',
        heading: bi('No vendes IA: vendes horas devueltas', 'You are not selling AI: you are selling returned hours'),
        body: bi(
          'Nadie compra "un agente con RAG". Compran no contratar a esa persona, cerrar el mes antes, dejar de trabajar el domingo. La conversación empieza midiendo cuánto cuesta hoy el proceso, no describiendo la tecnología.',
          'Nobody buys "an agent with RAG". They buy not hiring that person, closing the month earlier, stopping Sunday work. The conversation starts by measuring what the process costs today, not by describing the technology.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('Vender tecnología', 'Selling technology'),
            tone: 'bad',
            items: [
              bi('"Integramos GPT-4 con tu CRM"', '"We integrate GPT-4 with your CRM"'),
              bi('El cliente compara con otras 5 propuestas técnicas', 'The client compares with 5 other technical proposals'),
              bi('El precio se negocia a la baja', 'The price gets negotiated down'),
            ],
          },
          right: {
            title: bi('Vender resultado', 'Selling the outcome'),
            tone: 'good',
            items: [
              bi('"90 minutos diarios de copiado que desaparecen"', '"90 minutes a day of copying that disappears"'),
              bi('El cliente compara con el coste de no hacerlo', 'The client compares with the cost of not doing it'),
              bi('El precio se ancla en el ahorro', 'The price anchors on the saving'),
            ],
          },
        },
      },
      {
        id: 'ai07-t2',
        heading: bi('La fórmula del valor: horas × coste real × frecuencia', 'The value formula: hours × real cost × frequency'),
        body: bi(
          'El coste real por hora no es el salario: incluye cargas sociales, espacio y supervisión. En España, un puesto administrativo de 24 000 € brutos cuesta a la empresa unos 30 000 €, que sobre 1 800 horas útiles son ~17 €/hora.',
          'The real hourly cost is not the salary: it includes social charges, space and supervision. In Spain, a €24,000 gross admin role costs the company about €30,000, which over 1,800 useful hours is ~€17/hour.'
        ),
        diagram: {
          kind: 'equation',
          tokens: [
            { text: 'horas/tarea', tone: 'info' },
            { text: '×' },
            { text: 'veces/mes', tone: 'info' },
            { text: '×' },
            { text: '€/hora real', tone: 'info' },
          ],
          result: { text: 'ahorro mensual', tone: 'good' },
        },
        why: bi('Sin este número, tu precio es una opinión. Con él, es una fracción del ahorro.', 'Without this number, your price is an opinion. With it, it is a fraction of the saving.'),
      },
      {
        id: 'ai07-t3',
        heading: bi('Alcance acotado: un proceso, una semana', 'Tight scope: one process, one week'),
        body: bi(
          'El proyecto que fracasa es el que empieza por "vamos a automatizar la empresa". El que funciona empieza por un proceso concreto con principio y fin, entregado en 5-10 días, con medición antes y después.',
          'The project that fails is the one starting with "let us automate the company". The one that works starts with a concrete process with a beginning and an end, delivered in 5-10 days, measured before and after.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('Alcance abierto', 'Open scope'),
            tone: 'bad',
            items: [
              bi('"Transformación digital con IA"', '"Digital transformation with AI"'),
              bi('3-6 meses, sin entrega intermedia', '3-6 months, no intermediate delivery'),
              bi('El cliente pierde la fe en el mes 2', 'The client loses faith in month 2'),
            ],
          },
          right: {
            title: bi('Alcance acotado', 'Tight scope'),
            tone: 'good',
            items: [
              bi('"Clasificar los tickets de soporte"', '"Classify the support tickets"'),
              bi('5-10 días con resultado medible', '5-10 days with a measurable result'),
              bi('El segundo proyecto se vende solo', 'The second project sells itself'),
            ],
          },
        },
      },
      {
        id: 'ai07-t4',
        heading: bi('Precio: tres modelos y cuándo usar cada uno', 'Pricing: three models and when to use each'),
        body: bi(
          'Proyecto cerrado para alcances claros (1 500-6 000 €). Igual mensual cuando hay mantenimiento y mejoras continuas (400-1 500 €/mes). Por resultado cuando puedes medirlo y confías en el sistema (10-20% del ahorro).',
          'Fixed project for clear scopes (€1,500-6,000). Monthly retainer when there is maintenance and continuous improvement (€400-1,500/month). Outcome-based when you can measure it and trust the system (10-20% of the saving).'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Modelo', 'Model'), bi('Cuándo', 'When'), bi('Riesgo para ti', 'Risk for you')],
          rows: [
            ['Proyecto cerrado', 'alcance claro, 1-2 semanas', 'bajo'],
            ['Igual mensual', 'sistema vivo con mejoras', 'bajo e ingreso recurrente'],
            ['Por resultado', 'ahorro medible y auditado', 'alto: dependes de sus datos'],
          ],
          highlightRow: 1,
        },
      },
    ],
    examples: [
      {
        id: 'ai07-ex1',
        title: bi('Ejemplo resuelto: propuesta a una gestoría de 6 personas', 'Worked example: a proposal to a 6-person accounting firm'),
        situation: bi(
          'Una gestoría transcribe 500 facturas al mes a mano. Cada una cuesta 4 minutos de una administrativa cuyo coste real es 17 €/hora. Quieren "algo con IA" pero no saben qué pedir.',
          'An accounting firm transcribes 500 invoices a month by hand. Each takes 4 minutes from an admin whose real cost is €17/hour. They want "something with AI" but do not know what to ask for.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Medir el coste actual con ellos delante', 'Step 1 · Measure the current cost with them watching'),
            detail: bi(
              '500 facturas × 4 min = 2 000 minutos = 33,3 horas/mes × 17 €/h = 566 €/mes. Al año, 6 792 €. Ese número, escrito en su pizarra, es la propuesta.',
              '500 invoices × 4 min = 2,000 minutes = 33.3 hours/month × €17/h = €566/month. Per year, €6,792. That number, written on their whiteboard, is the proposal.'
            ),
            diagram: {
              kind: 'equation',
              tokens: [
                { text: '500', tone: 'info', label: bi('facturas/mes', 'invoices/mo') },
                { text: '×' },
                { text: '4 min', tone: 'info' },
                { text: '=' },
                { text: '33,3 h', tone: 'warn' },
                { text: '×' },
                { text: '17 €', tone: 'info', label: bi('coste real/h', 'real cost/h') },
              ],
              result: { text: '566 €/mes', tone: 'good' },
            },
          },
          {
            label: bi('Paso 2 · Acotar el alcance a una sola entrega', 'Step 2 · Scope it to a single delivery'),
            detail: bi(
              'No "digitalizar la gestoría". Sí: "extraer proveedor, importe, IVA y fecha de las facturas en PDF, validar aritméticamente y dejarlas en tu programa en formato de importación". Entregable en 8 días laborables.',
              'Not "digitise the firm". Yes: "extract supplier, amount, VAT and date from PDF invoices, validate arithmetically and leave them in your software in an import format". Delivered in 8 working days.'
            ),
          },
          {
            label: bi('Paso 3 · Poner precio como fracción del ahorro', 'Step 3 · Price it as a fraction of the saving'),
            detail: bi(
              'Proyecto cerrado de 2 400 € más 180 €/mes de mantenimiento. Se amortiza en 4,2 meses solo con el ahorro de transcripción, sin contar errores ni cierres más rápidos.',
              'A fixed project of €2,400 plus €180/month maintenance. It pays for itself in 4.2 months on transcription saving alone, without counting errors or faster closes.'
            ),
            diagram: {
              kind: 'timeline',
              steps: [
                { label: bi('Mes 1', 'Month 1'), value: '−2 400 €', tone: 'bad' },
                { label: bi('Mes 2', 'Month 2'), value: '+386 €' },
                { label: bi('Mes 4', 'Month 4'), value: '+1 158 €' },
                { label: bi('Mes 12', 'Month 12'), value: '+4 464 €', tone: 'good' },
              ],
            },
          },
          {
            label: bi('Paso 4 · Definir el criterio de éxito por escrito', 'Step 4 · Define the success criterion in writing'),
            detail: bi(
              '"Al menos el 85% de las facturas del primer mes entra sin corrección manual, medido sobre las 500 reales". Si no se cumple, se ajusta sin coste hasta alcanzarlo. Eso elimina la objeción "¿y si no funciona?".',
              '"At least 85% of the first month invoices enter without manual correction, measured over the real 500". If not met, it is adjusted at no cost until it is. That removes the "what if it does not work?" objection.'
            ),
            diagram: {
              kind: 'bars',
              max: 100,
              unit: '%',
              items: [
                { label: bi('Compromiso contractual', 'Contractual commitment'), value: 85, tone: 'good' },
                { label: bi('Resultado esperado', 'Expected result'), value: 92, tone: 'info' },
                { label: bi('Ilegibles → humano', 'Unreadable → human'), value: 3, tone: 'warn' },
              ],
            },
          },
          {
            label: bi('Paso 5 · El segundo proyecto se vende con el primero', 'Step 5 · The second project sells with the first'),
            detail: bi(
              'En la propuesta se incluye una página de "siguientes procesos candidatos" con su ahorro estimado: respuestas a requerimientos (310 €/mes) y conciliación bancaria (420 €/mes). No se piden, se dejan escritos.',
              'The proposal includes a page of "next candidate processes" with their estimated saving: responses to official requests (€310/month) and bank reconciliation (€420/month). They are not asked for, they are left in writing.'
            ),
          },
        ],
        result: bi(
          'Firmaron el primero en la segunda reunión. El mantenimiento de 180 €/mes cubre el coste real de API (12 €/mes) y deja margen por vigilar el sistema. A los 5 meses activaron el segundo proceso.',
          'They signed the first one in the second meeting. The €180/month maintenance covers the real API cost (€12/month) and leaves margin for watching the system. Five months later they activated the second process.'
        ),
        selfCheck: {
          prompt: bi('¿Qué hizo que el precio de 2 400 € dejara de parecer caro?', 'What made the €2,400 price stop seeming expensive?'),
          options: [
            opt('a', 'Que era más barato que la competencia', 'That it was cheaper than the competition'),
            opt('b', 'Que estaba anclado en un ahorro de 566 €/mes que ellos mismos calcularon contigo', 'That it was anchored on a €566/month saving they calculated with you'),
            opt('c', 'Que se ofreció en plazos', 'That it was offered in instalments'),
            opt('d', 'Que incluía más tecnología', 'That it included more technology'),
          ],
          correctOptionId: 'b',
          explanation: bi('El precio se juzga contra una referencia. Si la referencia es "otro proveedor", ganas por barato. Si es "su propio coste mensual", ganas por evidente.', 'Price is judged against a reference. If the reference is "another vendor", you win by being cheap. If it is "their own monthly cost", you win by being obvious.'),
        },
      },
    ],
    exercises: [
      {
        id: 'ai07-e01',
        format: 'numeric',
        difficulty: 2,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Una tarea cuesta 25 minutos y se hace 60 veces al mes. El coste real por hora es 19 €. ¿Cuánto cuesta al mes en euros?',
          'A task takes 25 minutes and is done 60 times a month. The real hourly cost is €19. What does it cost per month in euros?'
        ),
        answer: 475,
        tolerance: 1,
        unit: '€',
        formula: bi('(25/60) × 60 × 19', '(25/60) × 60 × 19'),
        explanation: bi('25 min × 60 = 1 500 min = 25 horas × 19 € = 475 €/mes. Ese es el número que abre la conversación de venta.', '25 min × 60 = 1,500 min = 25 hours × €19 = €475/month. That is the number that opens the sales conversation.'),
        xp: 10,
      },
      {
        id: 'ai07-e02',
        format: 'concept',
        difficulty: 1,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Por qué el coste real por hora es mayor que el salario bruto dividido entre horas?', 'Why is the real hourly cost higher than gross salary divided by hours?'),
        options: [
          opt('a', 'Porque la empresa paga cargas sociales, espacio, herramientas y supervisión', 'Because the company pays social charges, space, tools and supervision'),
          opt('b', 'Porque los trabajadores cobran más de lo declarado', 'Because workers earn more than declared'),
          opt('c', 'Porque el IVA se aplica a los salarios', 'Because VAT applies to salaries'),
          opt('d', 'Porque las horas útiles son más de 1 800 al año', 'Because useful hours exceed 1,800 a year'),
        ],
        correctOptionId: 'a',
        explanation: bi('Un salario de 24 000 € suele costar ~30 000 € a la empresa. Y las horas útiles reales son ~1 800, no 2 080: vacaciones, bajas y reuniones internas.', 'A €24,000 salary usually costs the company ~€30,000. And real useful hours are ~1,800, not 2,080: holidays, sick leave and internal meetings.'),
        xp: 8,
      },
      {
        id: 'ai07-e03',
        format: 'ordering',
        difficulty: 2,
        badge: bi('ORDENAR', 'ORDER'),
        prompt: bi('Ordena los pasos de una venta de automatización que no se cae por precio.', 'Order the steps of an automation sale that does not collapse on price.'),
        pieces: [
          { id: 'p1', text: bi('Medir el coste actual del proceso con el cliente delante', 'Measure the current cost of the process with the client watching') },
          { id: 'p2', text: bi('Acotar el alcance a un proceso con principio y fin', 'Scope it to one process with a beginning and an end') },
          { id: 'p3', text: bi('Definir el criterio de éxito medible por escrito', 'Define the measurable success criterion in writing') },
          { id: 'p4', text: bi('Poner precio como fracción del ahorro demostrado', 'Price it as a fraction of the demonstrated saving') },
          { id: 'p5', text: bi('Incluir la lista de siguientes procesos candidatos', 'Include the list of next candidate processes') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        explanation: bi('Medir primero: sin ese número, todo lo demás es negociación. El paso 5 es lo que convierte un proyecto en una cuenta recurrente.', 'Measure first: without that number, everything else is negotiation. Step 5 is what turns one project into a recurring account.'),
        xp: 10,
      },
      {
        id: 'ai07-e04',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada objeción con la respuesta que la desactiva.', 'Match each objection with the answer that defuses it.'),
        pairs: [
          { leftId: 'l1', left: bi('"¿Y si no funciona?"', '"What if it does not work?"'), rightId: 'r1', right: bi('Criterio de éxito escrito + ajuste sin coste hasta cumplirlo', 'Written success criterion + free adjustment until it is met') },
          { leftId: 'l2', left: bi('"Es muy caro"', '"It is too expensive"'), rightId: 'r2', right: bi('Comparar con su ahorro mensual calculado, no con otro proveedor', 'Compare with their calculated monthly saving, not with another vendor') },
          { leftId: 'l3', left: bi('"¿Y mis datos?"', '"What about my data?"'), rightId: 'r3', right: bi('Herramientas de solo lectura, datos en su cuenta, sin entrenamiento con su contenido', 'Read-only tools, data in their account, no training on their content') },
          { leftId: 'l4', left: bi('"¿Y si se rompe?"', '"What if it breaks?"'), rightId: 'r4', right: bi('Igual de mantenimiento con ruta de error y cola humana ya diseñadas', 'Maintenance retainer with an error path and human queue already designed') },
        ],
        explanation: bi('Las objeciones son preguntas sin respuesta en tu propuesta. Si las respondes por escrito antes, no aparecen en la reunión.', 'Objections are questions your proposal left unanswered. Answer them in writing beforehand and they never appear in the meeting.'),
        xp: 12,
      },
      {
        id: 'ai07-e05',
        format: 'worked_why',
        difficulty: 3,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('En el ejemplo se incluyó una página de "siguientes procesos candidatos" sin que el cliente la pidiera. ¿Por qué funciona?', 'In the example a page of "next candidate processes" was included without the client asking. Why does it work?'),
        options: [
          opt('a', 'Porque hace la propuesta más larga y parece más trabajada', 'Because it makes the proposal longer and looks more thorough'),
          opt('b', 'Porque instala la idea de que hay más ahorro pendiente, y el segundo proyecto se pide solo después del primero', 'Because it installs the idea that more saving is pending, and the second project gets requested on its own after the first'),
          opt('c', 'Porque sube el precio del primer proyecto', 'Because it raises the price of the first project'),
          opt('d', 'Porque demuestra que sabes más que el cliente', 'Because it proves you know more than the client'),
        ],
        correctOptionId: 'b',
        explanation: bi('No se vende en la reunión: se siembra. Cuando el primer proceso entrega, el cliente ya tiene escrita la lista de lo siguiente y la decisión es suya, no tuya.', 'It is not sold in the meeting: it is seeded. When the first process delivers, the client already has the written list of what is next and the decision is theirs, not yours.'),
        xp: 12,
      },
      {
        id: 'ai07-e06',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Proyecto de 2 400 € y mantenimiento 180 €/mes. Ahorro de 566 €/mes. Coste de API 12 €/mes. ¿En cuántos meses se recupera la inversión inicial?',
          'A €2,400 project and €180/month maintenance. €566/month saving. €12/month API cost. In how many months is the initial investment recovered?'
        ),
        answer: 6.4,
        tolerance: 0.3,
        unit: 'meses',
        formula: bi('beneficio neto/mes = 566 − 180 − 12 = 374 · 2 400 / 374', 'net benefit/month = 566 − 180 − 12 = 374 · 2,400 / 374'),
        explanation: bi('Ahorro neto mensual: 566 − 180 − 12 = 374 €. 2 400 / 374 = 6,4 meses. Si omites el mantenimiento en la cuenta, dirías 4,2 y el cliente te lo echaría en cara.', 'Net monthly saving: 566 − 180 − 12 = €374. 2,400 / 374 = 6.4 months. Leave maintenance out and you would say 4.2, and the client would throw it back at you.'),
        xp: 12,
      },
      {
        id: 'ai07-e07',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos clientes. (A) Quiere clasificar 800 emails/día con reglas estables. (B) Quiere "que la IA gestione las negociaciones con proveedores". ¿Cuál aceptas con proyecto cerrado?',
          'Two clients. (A) Wants to classify 800 emails/day with stable rules. (B) Wants "AI to handle supplier negotiations". Which do you take as a fixed project?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Cliente', 'Client'), bi('Reglas', 'Rules'), bi('Medible', 'Measurable'), bi('Riesgo', 'Risk')],
          rows: [
            ['A · clasificar', 'claras', 'sí: % acierto', 'bajo'],
            ['B · negociar', 'difusas', 'no', 'muy alto'],
          ],
          highlightRow: 0,
        },
        options: [
          opt('a', 'A: reglas claras, resultado medible y alcance acotable', 'A: clear rules, measurable result and a scope that can be bounded'),
          opt('b', 'B: es más ambicioso y se puede cobrar más', 'B: it is more ambitious and can be charged more'),
          opt('c', 'Los dos por igual', 'Both equally'),
          opt('d', 'Ninguno, la IA no está lista', 'Neither, AI is not ready'),
        ],
        correctOptionId: 'a',
        explanation: bi('Se acepta lo que puedes medir y acotar. En B no puedes escribir un criterio de éxito, así que no puedes firmar un compromiso: acabarás trabajando gratis.', 'You accept what you can measure and bound. In B you cannot write a success criterion, so you cannot sign a commitment: you will end up working for free.'),
        xp: 15,
      },
      {
        id: 'ai07-e08',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'El cliente dice: "Mi sobrino lo hace con ChatGPT gratis". ¿Qué respondes?',
          'The client says: "My nephew does it with ChatGPT for free". What do you answer?'
        ),
        options: [
          opt('a', 'Bajar el precio para competir', 'Lower the price to compete'),
          opt('b', 'Explicar que no vendes el modelo sino el sistema: contrato de salida, validación, ruta de error, integración con su programa y mantenimiento cuando falle', 'Explain that you are not selling the model but the system: output contract, validation, error path, integration with their software and maintenance when it fails'),
          opt('c', 'Insistir en que ChatGPT es peor de lo que parece', 'Insist that ChatGPT is worse than it seems'),
          opt('d', 'Retirar la propuesta', 'Withdraw the proposal'),
        ],
        correctOptionId: 'b',
        explanation: bi('La objeción es real y tiene respuesta técnica. Copiar y pegar en ChatGPT no valida, no reintenta, no se integra y no avisa cuando falla. Ese es el trabajo que cobras.', 'The objection is real and has a technical answer. Copy-pasting into ChatGPT does not validate, retry, integrate or alert when it fails. That is the work you charge for.'),
        xp: 15,
      },
      {
        id: 'ai07-e09',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('Esta propuesta perdió el proyecto. ¿Qué línea es la causa más probable?', 'This proposal lost the project. Which line is the most likely cause?'),
        lines: [
          { id: 'c1', text: 'Alcance: extraccion de facturas PDF con validacion aritmetica', tone: 'good' },
          { id: 'c2', text: 'Tecnologia: GPT-4o, embeddings, vector store, pipeline Make', tone: 'bad', label: bi('sospechoso', 'suspect') },
          { id: 'c3', text: 'Plazo: 8 dias laborables', tone: 'good' },
          { id: 'c4', text: 'Criterio de exito: 85% sin correccion manual sobre 500 facturas', tone: 'good' },
        ],
        correctLineId: 'c2',
        explanation: bi('Es la única línea que no dice nada sobre su negocio. Una propuesta se lee por el ahorro y el criterio de éxito; la lista de tecnología invita a comparar precios con otro proveedor.', 'It is the only line that says nothing about their business. A proposal is read for the saving and the success criterion; the tech list invites price comparison with another vendor.'),
        xp: 12,
      },
      {
        id: 'ai07-e10',
        format: 'numeric',
        difficulty: 4,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Cobras 180 €/mes de mantenimiento a 8 clientes. El coste de API medio por cliente es 14 €/mes y dedicas 40 minutos al mes a cada uno (tu hora vale 35 €). ¿Cuál es tu margen mensual total en euros?',
          'You charge €180/month maintenance to 8 clients. Average API cost per client is €14/month and you spend 40 minutes a month on each (your hour is worth €35). What is your total monthly margin in euros?'
        ),
        answer: 954,
        tolerance: 5,
        unit: '€',
        formula: bi('8 × (180 − 14 − (40/60)×35)', '8 × (180 − 14 − (40/60)×35)'),
        explanation: bi('Por cliente: 180 − 14 − 23,33 = 142,67 €. × 8 = 1 141 €. Si descuentas herramientas fijas (~187 €/mes) queda ~954 €. Recurrente con margen: el mejor tipo de ingreso.', 'Per client: 180 − 14 − 23.33 = €142.67. × 8 = €1,141. Deducting fixed tools (~€187/month) leaves ~€954. Recurring with margin: the best kind of income.'),
        xp: 15,
      },
      {
        id: 'ai07-e11',
        format: 'scenario',
        difficulty: 5,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'Entregaste el sistema y funciona al 91%. El cliente pide "un par de cambios más" cada semana sin pagar extra. ¿Qué haces?',
          'You delivered the system and it works at 91%. The client asks for "a couple more changes" every week without paying extra. What do you do?'
        ),
        options: [
          opt('a', 'Hacerlos para mantener la buena relación', 'Do them to keep the good relationship'),
          opt('b', 'Dejar de responder', 'Stop responding'),
          opt('c', 'Recordar el criterio de éxito firmado (85%, ya superado) y presentar el alcance del mantenimiento: qué incluye y qué se presupuesta aparte', 'Recall the signed success criterion (85%, already exceeded) and present the maintenance scope: what it includes and what is quoted separately'),
          opt('d', 'Bajar el mantenimiento mensual', 'Lower the monthly maintenance'),
        ],
        correctOptionId: 'c',
        explanation: bi('El desvío de alcance se para con el documento firmado, no con una discusión. Por eso el criterio de éxito se escribe antes: es tu defensa del mes 4.', 'Scope creep is stopped with the signed document, not with an argument. That is why the success criterion is written first: it is your defence in month 4.'),
        xp: 20,
      },
      {
        id: 'ai07-e12',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Por qué el modelo de precio "por resultado" es el más arriesgado para ti?', 'Why is the "outcome-based" pricing model the riskiest for you?'),
        options: [
          opt('a', 'Porque los clientes nunca aceptan pagar más', 'Because clients never accept paying more'),
          opt('b', 'Porque dependes de que sus datos sean fiables y de factores que no controlas (volumen, personal, estacionalidad)', 'Because you depend on their data being reliable and on factors you do not control (volume, staff, seasonality)'),
          opt('c', 'Porque requiere más tecnología', 'Because it requires more technology'),
          opt('d', 'Porque la ley lo limita', 'Because the law limits it'),
        ],
        correctOptionId: 'b',
        explanation: bi('Si el cliente no registra bien las horas o el volumen cae por estacionalidad, tu ingreso cae aunque tu sistema funcione. Solo se usa con datos auditables y confianza previa.', 'If the client does not log hours well or volume drops with seasonality, your income drops even when your system works. Use it only with auditable data and prior trust.'),
        xp: 20,
      },
      {
        id: 'ai07-e13',
        format: 'scenario',
        difficulty: 2,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi('Primera reunión con una empresa que quiere automatizar. ¿Qué pregunta haces primero?', 'First meeting with a company that wants to automate. What question do you ask first?'),
        options: [
          opt('a', '"¿Qué presupuesto tienen?"', '"What budget do you have?"'),
          opt('b', '"¿Qué tarea repiten cada semana y cuánto tiempo les lleva?"', '"What task do you repeat every week and how long does it take?"'),
          opt('c', '"¿Qué herramientas usan?"', '"What tools do you use?"'),
          opt('d', '"¿Han probado ya alguna IA?"', '"Have you already tried any AI?"'),
        ],
        correctOptionId: 'b',
        explanation: bi('Esa pregunta te da el número que ancla todo lo demás. Presupuesto sin ahorro medido es una subasta; ahorro medido sin presupuesto es una propuesta que se aprueba.', 'That question gives you the number that anchors everything else. Budget without a measured saving is an auction; a measured saving without budget is a proposal that gets approved.'),
        xp: 10,
      },
    ],
    recap: [
      bi('Vendes horas devueltas, no tecnología. El ahorro medido con el cliente es la propuesta.', 'You sell returned hours, not technology. The saving measured with the client is the proposal.'),
      bi('Coste real/hora ≈ salario + 25-30% de cargas, sobre ~1 800 horas útiles al año.', 'Real cost/hour ≈ salary + 25-30% in charges, over ~1,800 useful hours a year.'),
      bi('Alcance de una semana, criterio de éxito escrito y lista de siguientes procesos en la misma propuesta.', 'One-week scope, a written success criterion and the list of next processes in the same proposal.'),
    ],
    actionMission: {
      id: 'mission-ai-7',
      title: bi('Escribe una propuesta de una página con su número', 'Write a one-page proposal with its number'),
      objective: bi('Elige un proceso real de una empresa que conozcas y escribe la propuesta completa: ahorro medido, alcance, plazo, precio y criterio de éxito.', 'Pick a real process from a company you know and write the full proposal: measured saving, scope, timeline, price and success criterion.'),
      steps: [
        bi('Calcula el ahorro mensual con horas × frecuencia × coste real por hora.', 'Calculate the monthly saving with hours × frequency × real hourly cost.'),
        bi('Acota el alcance a un proceso entregable en 5-10 días.', 'Scope it to one process deliverable in 5-10 days.'),
        bi('Escribe el criterio de éxito medible y la lista de dos procesos siguientes.', 'Write the measurable success criterion and the list of two next processes.'),
      ],
      proof: bi('Una página con el número de ahorro mensual visible en el primer párrafo y un criterio de éxito que se pueda comprobar con datos del cliente.', 'One page with the monthly saving number visible in the first paragraph and a success criterion that can be verified with the client data.'),
      affiliateToolSlug: 'loom-video',
      xpBonus: 30,
    },
  },
];

export const AI_UNIT_2: Unit = {
  slug: 'ai-unit-2',
  trackSlug: 'ai-automation',
  orderIndex: 2,
  title: bi('De la prueba a producción', 'From test to production'),
  description: bi(
    'Pipelines con ruta de error, agentes con herramientas limitadas y cómo se cobra todo esto a una empresa real.',
    'Pipelines with an error path, agents with limited tools and how all of this gets charged to a real company.'
  ),
  lessons: LESSONS,
};
