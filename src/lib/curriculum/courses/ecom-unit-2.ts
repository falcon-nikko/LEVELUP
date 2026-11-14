import { bi, opt } from '@/lib/curriculum/authoring';
import { Lesson, Unit } from '@/lib/curriculum/types';

/* ==========================================================================
   SMART DROPSHIPPING · Unit 2 — Creativos, campaña y caja
   ========================================================================== */

const LESSONS: Lesson[] = [
  /* ---------------------------------------------------------------- L5 -- */
  {
    slug: 'ecom-05-creativos-ugc',
    unitSlug: 'drop-unit-2',
    trackSlug: 'smart-dropshipping',
    orderIndex: 5,
    title: bi('Creativos UGC que paran el scroll', 'UGC creatives that stop the scroll'),
    outcome: bi(
      'Estructurarás un vídeo con hook, demo, prueba y CTA, leerás el thumbstop y decidirás qué iterar con datos.',
      'You will structure a video with hook, demo, proof and CTA, read the thumbstop rate and decide what to iterate with data.'
    ),
    durationMin: 14,
    xpReward: 150,
    theory: [
      {
        id: 'ec05-t1',
        heading: bi('Los primeros 3 segundos deciden el 80% del resultado', 'The first 3 seconds decide 80% of the result'),
        body: bi(
          'En un feed vertical el usuario decide seguir o pasar en menos de 2 segundos. Si el hook no funciona, nada de lo que viene después se ve: ni la demo, ni la prueba, ni la oferta. El creativo se diseña desde el primer fotograma hacia atrás.',
          'In a vertical feed the user decides to stay or move on in under 2 seconds. If the hook does not work, nothing after it is seen: not the demo, not the proof, not the offer. The creative is designed from the first frame backwards.'
        ),
        diagram: {
          kind: 'funnel',
          stages: [
            { label: bi('Impresiones', 'Impressions'), value: 100000 },
            { label: bi('Ven 3 segundos', 'Watch 3 seconds'), value: 32000, note: bi('32%', '32%') },
            { label: bi('Ven 15 segundos', 'Watch 15 seconds'), value: 9600, note: bi('30%', '30%') },
            { label: bi('Hacen clic', 'Click'), value: 1450, note: bi('15%', '15%') },
            { label: bi('Compran', 'Purchase'), value: 29, note: bi('2%', '2%') },
          ],
        },
        why: bi('Mejorar el hook de 32% a 45% multiplica todas las etapas siguientes sin gastar más.', 'Improving the hook from 32% to 45% multiplies every later stage without spending more.'),
      },
      {
        id: 'ec05-t2',
        heading: bi('Thumbstop rate: la métrica del hook', 'Thumbstop rate: the hook metric'),
        body: bi(
          'Es el porcentaje de personas que ven al menos 3 segundos sobre las que reciben la impresión. Por debajo del 25% el hook no funciona; por encima del 35% es bueno; por encima del 45% es un ganador que hay que escalar y clonar.',
          'It is the percentage of people who watch at least 3 seconds out of those served the impression. Below 25% the hook does not work; above 35% it is good; above 45% it is a winner to scale and clone.'
        ),
        diagram: {
          kind: 'bars',
          max: 50,
          unit: '%',
          items: [
            { label: bi('< 25% · hook muerto', '< 25% · dead hook'), value: 25, tone: 'bad' },
            { label: bi('25-35% · aceptable', '25-35% · acceptable'), value: 35, tone: 'warn' },
            { label: bi('35-45% · bueno', '35-45% · good'), value: 45, tone: 'info' },
            { label: bi('> 45% · ganador', '> 45% · winner'), value: 50, tone: 'good' },
          ],
        },
      },
      {
        id: 'ec05-t3',
        heading: bi('La estructura de 4 bloques de un UGC que vende', 'The 4-block structure of a UGC that sells'),
        body: bi(
          'Hook (0-3 s): el problema o el resultado en una frase visual. Demo (3-15 s): el producto funcionando sin cortes. Prueba (15-22 s): resultado real o contraste antes/después. CTA (22-27 s): qué hacer y por qué ahora.',
          'Hook (0-3 s): the problem or the result in one visual sentence. Demo (3-15 s): the product working with no cuts. Proof (15-22 s): a real result or a before/after contrast. CTA (22-27 s): what to do and why now.'
        ),
        diagram: {
          kind: 'timeline',
          steps: [
            { label: bi('Hook', 'Hook'), value: '0-3 s', tone: 'bad' },
            { label: bi('Demo', 'Demo'), value: '3-15 s', tone: 'info' },
            { label: bi('Prueba', 'Proof'), value: '15-22 s', tone: 'warn' },
            { label: bi('CTA', 'CTA'), value: '22-27 s', tone: 'good' },
          ],
        },
      },
      {
        id: 'ec05-t4',
        heading: bi('UGC no es baja calidad: es credibilidad', 'UGC is not low quality: it is credibility'),
        body: bi(
          'Lo que funciona no es que parezca amateur: es que parezca una recomendación de una persona, no un anuncio. Luz suficiente, audio limpio y una persona real hablando a cámara. El anuncio pulido de estudio se reconoce y se salta.',
          'What works is not looking amateur: it is looking like a recommendation from a person, not an ad. Enough light, clean audio and a real person talking to camera. The polished studio ad is recognised and skipped.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('Se salta', 'Gets skipped'),
            tone: 'bad',
            items: [
              bi('Logo y música corporativa desde el segundo 0', 'Logo and corporate music from second 0'),
              bi('Voz en off sin persona visible', 'Voice-over with no visible person'),
              bi('Producto sobre fondo blanco girando', 'Product spinning on a white background'),
              bi('Texto de características en lista', 'Feature list text'),
            ],
          },
          right: {
            title: bi('Se ve', 'Gets watched'),
            tone: 'good',
            items: [
              bi('Persona real hablando a cámara en 1 s', 'A real person talking to camera within 1 s'),
              bi('El problema aparece antes que el producto', 'The problem appears before the product'),
              bi('Producto en uso, en el sitio donde se usaría', 'Product in use, where it would be used'),
              bi('Audio nativo y luz natural suficiente', 'Native audio and enough natural light'),
            ],
          },
        },
      },
      {
        id: 'ec05-t5',
        heading: bi('Se itera el hook, no el vídeo entero', 'You iterate the hook, not the whole video'),
        body: bi(
          'Con un mismo cuerpo de vídeo se graban 4-6 hooks distintos y se prueban en paralelo. Es más barato y da más información que grabar 5 vídeos completos. Si todos los hooks fallan, el problema es el cuerpo o el producto.',
          'With the same video body you record 4-6 different hooks and test them in parallel. It is cheaper and gives more information than recording 5 complete videos. If every hook fails, the problem is the body or the product.'
        ),
        diagram: {
          kind: 'flow',
          nodes: [
            { id: 'a', label: bi('1 cuerpo de vídeo', '1 video body'), tone: 'info' },
            { id: 'b', label: bi('4-6 hooks', '4-6 hooks'), tone: 'warn' },
            { id: 'c', label: bi('Test paralelo', 'Parallel test'), tone: 'warn' },
            { id: 'd', label: bi('Escalar el ganador', 'Scale the winner'), tone: 'good' },
          ],
          branch: { label: bi('Si todos fallan → el problema es el cuerpo o el producto, no el hook', 'If all fail → the problem is the body or the product, not the hook'), tone: 'bad' },
        },
      },
    ],
    examples: [
      {
        id: 'ec05-ex1',
        title: bi('Ejemplo resuelto: mismo producto, thumbstop de 21% a 47%', 'Worked example: same product, thumbstop from 21% to 47%'),
        situation: bi(
          'Un rodillo de masaje muscular se anuncia con un vídeo de 27 s grabado por un creador. Thumbstop 21%, CTR 0,7%, CPA 26 € con margen de 17,40 €. Pierde dinero y el equipo quiere cambiar de producto.',
          'A muscle massage roller is advertised with a 27-second video shot by a creator. Thumbstop 21%, CTR 0.7%, CPA €26 against a €17.40 margin. It loses money and the team wants to switch products.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Leer las métricas en orden del embudo', 'Step 1 · Read the metrics in funnel order'),
            detail: bi(
              'Thumbstop 21% (por debajo de 25%): el hook falla. CTR 0,7%: coherente con un hook flojo. La página convierte al 2,2%, dentro del rango. El problema está antes del clic, no después.',
              'Thumbstop 21% (below 25%): the hook fails. CTR 0.7%: consistent with a weak hook. The page converts at 2.2%, inside the range. The problem is before the click, not after.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Métrica', 'Metric'), bi('Valor', 'Value'), bi('Rango', 'Range'), bi('Lectura', 'Reading')],
              rows: [
                ['Thumbstop', '21%', '≥ 25%', 'hook flojo'],
                ['CTR', '0,7%', '≥ 1%', 'consecuencia'],
                ['Conversión página', '2,2%', '1,2-3%', 'correcta'],
                ['CPA', '26,00 €', '≤ 17,40 €', 'inviable'],
              ],
              highlightRow: 0,
            },
          },
          {
            label: bi('Paso 2 · Analizar el hook actual fotograma a fotograma', 'Step 2 · Analyse the current hook frame by frame'),
            detail: bi(
              'Los primeros 3 segundos muestran el producto en su caja sobre una mesa, con música y el logo del creador. No hay persona, no hay problema, no hay movimiento. Es un anuncio, y el feed lo trata como tal.',
              'The first 3 seconds show the product in its box on a table, with music and the creator logo. No person, no problem, no movement. It is an ad, and the feed treats it as one.'
            ),
            diagram: {
              kind: 'code',
              lang: 'hook actual · 0-3 s',
              lines: [
                { text: '0.0s  plano de la caja sobre la mesa', tone: 'bad' },
                { text: '0.8s  musica entra, logo del creador', tone: 'bad' },
                { text: '2.1s  mano coge el producto', tone: 'bad' },
                { text: '// ningun problema, ninguna persona, ningun movimiento', tone: 'warn', label: bi('por qué se salta', 'why it is skipped') },
              ],
            },
          },
          {
            label: bi('Paso 3 · Grabar 5 hooks con el mismo cuerpo', 'Step 3 · Record 5 hooks with the same body'),
            detail: bi(
              'Se mantiene la demo, la prueba y el CTA idénticos. Solo se graban 5 aperturas distintas: dolor visible, pregunta directa, antes/después, objeción y resultado inmediato.',
              'The demo, proof and CTA stay identical. Only 5 different openings are recorded: visible pain, direct question, before/after, objection and immediate result.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Hook', 'Hook'), bi('Primer fotograma', 'First frame'), bi('Primera frase', 'First line')],
              rows: [
                ['H1 · dolor', 'mano presionando el trapecio', '"Llevo 3 semanas con esto clavado"'],
                ['H2 · pregunta', 'cara a cámara', '"¿Te duele al levantar el brazo?"'],
                ['H3 · antes/después', 'pantalla partida', '"Día 1 contra día 12"'],
                ['H4 · objeción', 'el producto en la mano', '"Pensé que era otro trasto inútil"'],
                ['H5 · resultado', 'usándolo en el cuello', '"90 segundos y se suelta"'],
              ],
              highlightRow: 2,
            },
          },
          {
            label: bi('Paso 4 · Testar en paralelo con presupuesto cerrado', 'Step 4 · Test in parallel with a closed budget'),
            detail: bi(
              '5 anuncios a 15 €/día durante 3 días: 225 €. Se mide thumbstop y CTR, no ventas, porque con ese presupuesto la venta no da señal suficiente.',
              '5 ads at €15/day for 3 days: €225. Thumbstop and CTR are measured, not sales, because at that budget sales give insufficient signal.'
            ),
            diagram: {
              kind: 'bars',
              max: 50,
              unit: '%',
              items: [
                { label: bi('H1 · dolor', 'H1 · pain'), value: 33, tone: 'warn' },
                { label: bi('H2 · pregunta', 'H2 · question'), value: 29, tone: 'warn' },
                { label: bi('H3 · antes/después', 'H3 · before/after'), value: 47, tone: 'good', note: bi('ganador', 'winner') },
                { label: bi('H4 · objeción', 'H4 · objection'), value: 38, tone: 'info' },
                { label: bi('H5 · resultado', 'H5 · result'), value: 24, tone: 'bad' },
              ],
            },
          },
          {
            label: bi('Paso 5 · Escalar el ganador y clonar el ángulo', 'Step 5 · Scale the winner and clone the angle'),
            detail: bi(
              'H3 sube a 150 €/día. Thumbstop 47%, CTR 1,9%, CPA 11,20 € sobre un margen de 17,40 €: beneficio de 6,20 € por pedido. Se encargan 3 variantes del mismo ángulo antes/después con otros creadores.',
              'H3 goes up to €150/day. Thumbstop 47%, CTR 1.9%, CPA €11.20 against a €17.40 margin: €6.20 profit per order. Three variants of the same before/after angle are commissioned from other creators.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Métrica', 'Metric'), bi('Antes', 'Before'), bi('Con H3', 'With H3')],
              rows: [
                ['Thumbstop', '21%', '47%'],
                ['CTR', '0,7%', '1,9%'],
                ['CPA', '26,00 €', '11,20 €'],
                ['Beneficio/pedido', '−8,60 €', '+6,20 €'],
              ],
              highlightRow: 3,
              note: bi('Mismo producto, misma página, mismo presupuesto por anuncio. Solo cambió el hook.', 'Same product, same page, same budget per ad. Only the hook changed.'),
            },
          },
        ],
        result: bi(
          'El producto que iban a descartar pasó de perder 8,60 € a ganar 6,20 € por pedido cambiando solo los 3 primeros segundos. La lección: antes de matar un producto, se mata el hook.',
          'The product they were going to discard went from losing €8.60 to earning €6.20 per order by changing only the first 3 seconds. The lesson: before killing a product, kill the hook.'
        ),
        selfCheck: {
          prompt: bi('¿Por qué se midió thumbstop y CTR en lugar de ventas durante el test de hooks?', 'Why were thumbstop and CTR measured instead of sales during the hook test?'),
          options: [
            opt('a', 'Porque las ventas no se pueden medir en Meta', 'Because sales cannot be measured on Meta'),
            opt('b', 'Porque con 45 € por hook no hay muestra suficiente de ventas, pero sí de reproducciones y clics', 'Because with €45 per hook there is not enough sample of sales, but there is of plays and clicks'),
            opt('c', 'Porque el thumbstop es más importante que el beneficio', 'Because thumbstop matters more than profit'),
            opt('d', 'Porque las ventas tardan más en atribuirse', 'Because sales take longer to attribute'),
          ],
          correctOptionId: 'b',
          explanation: bi('Con 45 € y un CPA esperado de 17 €, cada hook daría 2-3 ventas: puro ruido. El thumbstop se mide sobre miles de impresiones y sí da señal con ese presupuesto.', 'With €45 and an expected €17 CPA, each hook would give 2-3 sales: pure noise. Thumbstop is measured over thousands of impressions and does give signal at that budget.'),
        },
      },
    ],
    exercises: [
      {
        id: 'ec05-e01',
        format: 'numeric',
        difficulty: 1,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Un vídeo tiene 48 000 impresiones y 17 760 reproducciones de 3 segundos. ¿Cuál es su thumbstop rate?',
          'A video has 48,000 impressions and 17,760 three-second plays. What is its thumbstop rate?'
        ),
        answer: 37,
        tolerance: 0.5,
        unit: '%',
        formula: bi('17 760 / 48 000 × 100', '17,760 / 48,000 × 100'),
        explanation: bi('37%: dentro del rango bueno (35-45%). El hook funciona; si el CPA sigue alto, el problema está en el cuerpo del vídeo o en la página.', '37%: inside the good range (35-45%). The hook works; if the CPA is still high, the problem is in the video body or the page.'),
        xp: 8,
      },
      {
        id: 'ec05-e02',
        format: 'ordering',
        difficulty: 1,
        badge: bi('ORDENAR', 'ORDER'),
        prompt: bi('Ordena los 4 bloques de un UGC de 27 segundos.', 'Order the 4 blocks of a 27-second UGC.'),
        pieces: [
          { id: 'p1', text: bi('Hook: el problema o el resultado en una frase visual', 'Hook: the problem or the result in one visual sentence') },
          { id: 'p2', text: bi('Demo: el producto funcionando sin cortes', 'Demo: the product working with no cuts') },
          { id: 'p3', text: bi('Prueba: resultado real o contraste antes/después', 'Proof: a real result or before/after contrast') },
          { id: 'p4', text: bi('CTA: qué hacer y por qué ahora', 'CTA: what to do and why now') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4'],
        explanation: bi('El problema siempre va antes que el producto. Quien empieza por el producto compite con todos los anuncios que el usuario ya ha aprendido a saltar.', 'The problem always goes before the product. Whoever starts with the product competes with every ad the user has already learned to skip.'),
        xp: 8,
      },
      {
        id: 'ec05-e03',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada tipo de hook con su primera frase.', 'Match each hook type with its opening line.'),
        pairs: [
          { leftId: 'l1', left: bi('Dolor visible', 'Visible pain'), rightId: 'r1', right: bi('"Llevo 3 semanas con esto clavado"', '"I have had this stuck for 3 weeks"') },
          { leftId: 'l2', left: bi('Pregunta directa', 'Direct question'), rightId: 'r2', right: bi('"¿Te duele al levantar el brazo?"', '"Does it hurt when you lift your arm?"') },
          { leftId: 'l3', left: bi('Objeción', 'Objection'), rightId: 'r3', right: bi('"Pensé que era otro trasto inútil"', '"I thought it was another useless gadget"') },
          { leftId: 'l4', left: bi('Antes/después', 'Before/after'), rightId: 'r4', right: bi('"Día 1 contra día 12"', '"Day 1 versus day 12"') },
        ],
        explanation: bi('Los cuatro son hooks válidos; el que gana depende del producto y del público. Por eso se prueban en paralelo en vez de elegir uno por intuición.', 'All four are valid hooks; which one wins depends on the product and the audience. That is why they are tested in parallel instead of choosing one by intuition.'),
        xp: 12,
      },
      {
        id: 'ec05-e04',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('Este vídeo tiene thumbstop del 19%. ¿Qué elemento de los primeros 3 segundos es el culpable?', 'This video has a 19% thumbstop. Which element of the first 3 seconds is the culprit?'),
        lines: [
          { id: 'c1', text: '0.0s: logo de la marca centrado sobre fondo blanco', tone: 'bad', label: bi('sospechoso', 'suspect') },
          { id: 'c2', text: '1.2s: la persona aparece y menciona el problema', tone: 'good' },
          { id: 'c3', text: '3.0s: empieza la demo del producto', tone: 'good' },
          { id: 'c4', text: '22.0s: CTA con el plazo de la oferta', tone: 'good' },
        ],
        correctLineId: 'c1',
        explanation: bi('El logo en el primer fotograma es la firma universal de "esto es un anuncio". El usuario lo reconoce en 200 ms y pasa. La persona y el problema deben ocupar el fotograma 0.', 'The logo in the first frame is the universal signature of "this is an ad". The user recognises it in 200 ms and moves on. The person and the problem must occupy frame 0.'),
        xp: 12,
      },
      {
        id: 'ec05-e05',
        format: 'worked_why',
        difficulty: 3,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('¿Por qué se grabaron 5 hooks con el mismo cuerpo en vez de 5 vídeos completos?', 'Why were 5 hooks recorded with the same body instead of 5 complete videos?'),
        options: [
          opt('a', 'Porque el creador cobraba por vídeo completo', 'Because the creator charged per complete video'),
          opt('b', 'Porque aísla la variable: si cambia solo el hook, la diferencia de thumbstop es atribuible al hook', 'Because it isolates the variable: if only the hook changes, the thumbstop difference is attributable to the hook'),
          opt('c', 'Porque los vídeos cortos rinden mejor', 'Because short videos perform better'),
          opt('d', 'Porque Meta limita el número de vídeos por cuenta', 'Because Meta limits the number of videos per account'),
        ],
        correctOptionId: 'b',
        explanation: bi('Con 5 vídeos completos cambiarían hook, demo, tono y edición a la vez: no sabrías qué mejoró. Cambiar una variable es lo que convierte un test en aprendizaje.', 'With 5 complete videos the hook, demo, tone and editing would all change at once: you would not know what improved. Changing one variable is what turns a test into learning.'),
        xp: 12,
      },
      {
        id: 'ec05-e06',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Test de 5 hooks a 15 €/día durante 3 días. ¿Cuál es el coste total del test y cuántas ventas esperadas habría con CPA de 17 €?',
          'A test of 5 hooks at €15/day for 3 days. What is the total test cost and how many expected sales would there be at a €17 CPA?'
        ),
        answer: 13.2,
        tolerance: 0.5,
        unit: 'ventas',
        formula: bi('5 × 15 × 3 = 225 € · 225 / 17', '5 × 15 × 3 = €225 · 225 / 17'),
        explanation: bi('Coste total 225 €. Ventas esperadas 225 / 17 = 13,2 repartidas entre 5 hooks: 2,6 por hook. Esa es la razón de medir thumbstop y no ventas en el test.', 'Total cost €225. Expected sales 225 / 17 = 13.2 spread across 5 hooks: 2.6 per hook. That is the reason to measure thumbstop and not sales in the test.'),
        xp: 12,
      },
      {
        id: 'ec05-e07',
        format: 'output',
        difficulty: 3,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('Con estos resultados, ¿qué conclusión es correcta?', 'With these results, what conclusion is correct?'),
        diagram: {
          kind: 'table',
          head: [bi('Hook', 'Hook'), bi('Thumbstop', 'Thumbstop'), bi('CTR', 'CTR'), bi('Conversión', 'Conversion')],
          rows: [
            ['A', '44%', '1,8%', '0,4%'],
            ['B', '26%', '0,9%', '2,6%'],
          ],
          highlightRow: 0,
        },
        options: [
          opt('a', 'A es mejor en todo', 'A is better in everything'),
          opt('b', 'A atrae y hace clic pero la página o la promesa no sostienen la conversión; B trae menos gente pero mucho más cualificada', 'A attracts and gets clicks but the page or the promise does not sustain conversion; B brings fewer people but far more qualified'),
          opt('c', 'B es mejor porque convierte más', 'B is better because it converts more'),
          opt('d', 'No se puede concluir nada con estos datos', 'Nothing can be concluded with this data'),
        ],
        correctOptionId: 'b',
        explanation: bi('El hook A promete algo que la ficha no cumple: clic barato y conversión baja. Suele indicar clickbait. B es más pequeño pero consistente. La decisión depende del CPA resultante de cada uno, no de una métrica sola.', 'Hook A promises something the product page does not deliver: cheap click and low conversion. It usually indicates clickbait. B is smaller but consistent. The decision depends on the resulting CPA of each, not on a single metric.'),
        xp: 12,
      },
      {
        id: 'ec05-e08',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos productos. (A) Gadget visual que se entiende en 3 segundos. (B) Suplemento que requiere explicar ingredientes y plazo. ¿Qué estructura de vídeo para cada uno?',
          'Two products. (A) A visual gadget understood in 3 seconds. (B) A supplement requiring ingredient and timeframe explanation. Which video structure for each?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Producto', 'Product'), bi('Se entiende viendo', 'Understood by watching'), bi('Requiere explicación', 'Requires explanation')],
          rows: [
            ['A · gadget', 'sí', 'no'],
            ['B · suplemento', 'no', 'sí'],
          ],
          highlightRow: 1,
        },
        options: [
          opt('a', 'La misma estructura de 27 s para los dos', 'The same 27-second structure for both'),
          opt('b', 'A con demo inmediata y vídeo corto; B con hook de resultado, más prueba y formato testimonio o carrusel que permita leer', 'A with an immediate demo and a short video; B with a result hook, more proof and a testimonial or carousel format that allows reading'),
          opt('c', 'A con testimonio largo y B con demo de 15 s', 'A with a long testimonial and B with a 15-second demo'),
          opt('d', 'Los dos con vídeo de 60 s para explicar bien', 'Both with a 60-second video to explain well'),
        ],
        correctOptionId: 'b',
        explanation: bi('El formato sigue a la complejidad del producto. Un gadget se demuestra; un suplemento se justifica con prueba y tiempo. Forzar la misma estructura a los dos es el error de copiar al competidor.', 'The format follows the complexity of the product. A gadget is demonstrated; a supplement is justified with proof and time. Forcing the same structure on both is the mistake of copying the competitor.'),
        xp: 15,
      },
      {
        id: 'ec05-e09',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'Tus 4 hooks nuevos hacen entre 22% y 26% de thumbstop. El anterior hacía 24%. ¿Qué concluyes?',
          'Your 4 new hooks score between 22% and 26% thumbstop. The previous one scored 24%. What do you conclude?'
        ),
        options: [
          opt('a', 'Que el hook ganador es el de 26%', 'That the 26% hook is the winner'),
          opt('b', 'Que el problema no es el hook: todos están en el mismo rango, así que hay que revisar el cuerpo del vídeo, la oferta o el producto', 'That the problem is not the hook: they are all in the same range, so the video body, the offer or the product must be reviewed'),
          opt('c', 'Que hay que grabar 10 hooks más', 'That 10 more hooks must be recorded'),
          opt('d', 'Que el producto es inviable', 'That the product is unviable'),
        ],
        correctOptionId: 'b',
        explanation: bi('Cuatro ángulos distintos dando el mismo resultado es señal de que la variable no es el ángulo. Insistir en hooks quema presupuesto sin información nueva.', 'Four different angles giving the same result signals that the variable is not the angle. Insisting on hooks burns budget with no new information.'),
        xp: 15,
      },
      {
        id: 'ec05-e10',
        format: 'faded',
        difficulty: 3,
        badge: bi('COMPLETAR', 'COMPLETE'),
        prompt: bi('Completa el guion UGC de 27 segundos. El hook y la demo ya están escritos.', 'Complete the 27-second UGC script. The hook and demo are already written.'),
        pieces: [
          { id: 'p1', text: bi('Hook 0-3 s: "Día 1 contra día 12" con pantalla partida', 'Hook 0-3 s: "Day 1 versus day 12" with a split screen') },
          { id: 'p2', text: bi('Demo 3-15 s: uso real del producto sin cortes, en el sitio de uso', 'Demo 3-15 s: real product use with no cuts, in the place of use') },
          { id: 'p3', text: bi('Prueba 15-22 s: la persona enseña el resultado y menciona el plazo', 'Proof 15-22 s: the person shows the result and mentions the timeframe') },
          { id: 'p4', text: bi('CTA 22-27 s: "toca abajo" + motivo para actuar ahora', 'CTA 22-27 s: "tap below" + a reason to act now') },
          { id: 'p5', text: bi('Grabar 4 variantes del hook manteniendo el resto idéntico', 'Record 4 hook variants keeping the rest identical') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        lockedPieceIds: ['p1', 'p2'],
        explanation: bi('El paso 5 es parte del guion, no un extra: se graba el cuerpo una vez y los hooks varios. Es lo que hace barato iterar.', 'Step 5 is part of the script, not an extra: the body is recorded once and the hooks several times. That is what makes iterating cheap.'),
        xp: 12,
      },
      {
        id: 'ec05-e11',
        format: 'numeric',
        difficulty: 4,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Subes el thumbstop de 21% a 47% y el CTR de 0,7% a 1,9%. Si antes tenías 26 € de CPA con 1 000 € de gasto, ¿cuántas ventas más consigues con el mismo gasto si la conversión de página no cambia?',
          'You raise thumbstop from 21% to 47% and CTR from 0.7% to 1.9%. If you previously had a €26 CPA with €1,000 of spend, how many more sales do you get with the same spend if the page conversion does not change?'
        ),
        answer: 51,
        tolerance: 3,
        unit: 'ventas',
        formula: bi('1000/26 = 38,5 · 1000/(26 × 0,7/1,9) = 90', '1000/26 = 38.5 · 1000/(26 × 0.7/1.9) = 90'),
        explanation: bi('Antes: 1 000/26 = 38 ventas. Si el CTR se multiplica por 2,7 y la conversión se mantiene, el CPA baja a ~9,6 €: 1 000/9,6 ≈ 104 ventas. Diferencia práctica ≈ 51-66 ventas más. El ejemplo real dio 89.', 'Before: 1,000/26 = 38 sales. If CTR multiplies by 2.7 and conversion holds, the CPA drops to ~€9.6: 1,000/9.6 ≈ 104 sales. A practical difference of ≈51-66 more sales. The real example gave 89.'),
        xp: 15,
      },
      {
        id: 'ec05-e12',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Por qué un thumbstop alto con conversión baja es una señal de alarma y no un éxito?', 'Why is a high thumbstop with low conversion an alarm signal and not a success?'),
        options: [
          opt('a', 'Porque el thumbstop alto siempre cuesta más', 'Because a high thumbstop always costs more'),
          opt('b', 'Porque indica que el hook promete algo que el producto o la página no cumplen: atrae curiosos, no compradores', 'Because it indicates the hook promises something the product or page does not deliver: it attracts the curious, not buyers'),
          opt('c', 'Porque la plataforma penaliza los vídeos virales', 'Because the platform penalises viral videos'),
          opt('d', 'Porque el CTR baja con el thumbstop', 'Because CTR drops with thumbstop'),
        ],
        correctOptionId: 'b',
        explanation: bi('El clic barato y la conversión baja son la firma del clickbait. Se paga en CPA alto aunque el CTR parezca excelente.', 'A cheap click and low conversion are the signature of clickbait. You pay for it in a high CPA even when the CTR looks excellent.'),
        xp: 20,
      },
      {
        id: 'ec05-e13',
        format: 'scenario',
        difficulty: 2,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi('Vas a encargar tu primer UGC a un creador. ¿Qué le pides exactamente?', 'You are about to commission your first UGC from a creator. What exactly do you ask for?'),
        options: [
          opt('a', 'Un vídeo bonito que muestre el producto', 'A nice video showing the product'),
          opt('b', 'El guion por bloques con tiempos, el producto enviado antes, y 3-4 hooks grabados aparte con el mismo cuerpo', 'The block script with timings, the product shipped beforehand, and 3-4 hooks recorded separately with the same body'),
          opt('c', 'Que haga lo que le funcione a él', 'That they do whatever works for them'),
          opt('d', 'Un vídeo de 60 segundos con todas las características', 'A 60-second video with all the features'),
        ],
        correctOptionId: 'b',
        explanation: bi('Pedir hooks separados del mismo cuerpo cuesta poco más al creador y te da 4 pruebas en vez de 1. Es la diferencia entre un vídeo y un sistema de pruebas.', 'Asking for hooks separate from the same body costs the creator little more and gives you 4 tests instead of 1. That is the difference between a video and a testing system.'),
        xp: 10,
      },
    ],
    recap: [
      bi('Los primeros 3 segundos deciden el 80%: hook con persona, problema y movimiento, nunca con logo.', 'The first 3 seconds decide 80%: a hook with a person, a problem and movement, never with a logo.'),
      bi('Thumbstop ≥ 25% es el mínimo; ≥ 45% es un ganador que se escala y se clona.', 'Thumbstop ≥ 25% is the minimum; ≥ 45% is a winner to scale and clone.'),
      bi('Se itera el hook con el mismo cuerpo: aísla la variable y cuesta una fracción.', 'Iterate the hook with the same body: it isolates the variable and costs a fraction.'),
    ],
    actionMission: {
      id: 'mission-ecom-5',
      title: bi('Escribe un guion UGC con 4 hooks', 'Write a UGC script with 4 hooks'),
      objective: bi('Redacta el guion completo por bloques con tiempos para tu producto y escribe 4 hooks distintos del mismo cuerpo.', 'Draft the full block script with timings for your product and write 4 different hooks for the same body.'),
      steps: [
        bi('Escribe el bloque de demo y el de prueba con los segundos exactos de cada plano.', 'Write the demo and proof blocks with the exact seconds of each shot.'),
        bi('Redacta 4 hooks de tipos distintos: dolor, pregunta, objeción y antes/después.', 'Draft 4 hooks of different types: pain, question, objection and before/after.'),
        bi('Define el CTA con un motivo real para actuar ahora (plazo, stock o precio).', 'Define the CTA with a real reason to act now (deadline, stock or price).'),
      ],
      proof: bi('El guion de una página con tiempos por bloque y los 4 hooks listos para enviar al creador.', 'The one-page script with timings per block and the 4 hooks ready to send to the creator.'),
      affiliateToolSlug: 'meta-ads',
      xpBonus: 25,
    },
  },

  /* ---------------------------------------------------------------- L6 -- */
  {
    slug: 'ecom-06-estructura-ads',
    unitSlug: 'drop-unit-2',
    trackSlug: 'smart-dropshipping',
    orderIndex: 6,
    title: bi('Estructura de campaña y lectura de métricas', 'Campaign structure and reading metrics'),
    outcome: bi(
      'Decidirás entre ABO y CBO, fijarás el presupuesto de test y sabrás cuándo matar un conjunto de anuncios.',
      'You will decide between ABO and CBO, set the test budget and know when to kill an ad set.'
    ),
    durationMin: 14,
    xpReward: 150,
    theory: [
      {
        id: 'ec06-t1',
        heading: bi('La jerarquía: campaña, conjunto, anuncio', 'The hierarchy: campaign, ad set, ad'),
        body: bi(
          'La campaña define el objetivo (ventas). El conjunto define a quién, dónde y con cuánto (audiencia, ubicaciones, presupuesto). El anuncio es el creativo. Confundir niveles es la causa de estructuras imposibles de leer.',
          'The campaign sets the objective (sales). The ad set sets who, where and with how much (audience, placements, budget). The ad is the creative. Confusing levels is the cause of structures that cannot be read.'
        ),
        diagram: {
          kind: 'layers',
          layers: [
            { label: bi('Campaña', 'Campaign'), note: bi('objetivo: ventas. Una por producto o por oferta', 'objective: sales. One per product or per offer'), tone: 'info' },
            { label: bi('Conjunto de anuncios', 'Ad set'), note: bi('audiencia, ubicaciones, presupuesto, puja', 'audience, placements, budget, bid'), tone: 'warn' },
            { label: bi('Anuncios', 'Ads'), note: bi('3-5 creativos compitiendo dentro del conjunto', '3-5 creatives competing inside the ad set'), tone: 'good' },
          ],
        },
      },
      {
        id: 'ec06-t2',
        heading: bi('ABO vs CBO: control frente a automatización', 'ABO vs CBO: control versus automation'),
        body: bi(
          'ABO pone el presupuesto en cada conjunto: tú decides cuánto gasta cada audiencia, útil en test. CBO lo pone en la campaña y el sistema reparte entre conjuntos: eficiente en escala, pero puede abandonar una audiencia antes de que dé señal.',
          'ABO puts the budget on each ad set: you decide how much each audience spends, useful in testing. CBO puts it on the campaign and the system splits it between ad sets: efficient at scale, but it can abandon an audience before it produces a signal.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('ABO · presupuesto por conjunto', 'ABO · budget per ad set'),
            tone: 'info',
            items: [
              bi('Cada audiencia recibe su gasto garantizado', 'Each audience gets its guaranteed spend'),
              bi('Ideal para test con varios creativos o audiencias', 'Ideal for testing with several creatives or audiences'),
              bi('Más trabajo manual de gestión', 'More manual management work'),
            ],
          },
          right: {
            title: bi('CBO · presupuesto por campaña', 'CBO · budget per campaign'),
            tone: 'good',
            items: [
              bi('El sistema concentra en lo que rinde', 'The system concentrates on what performs'),
              bi('Ideal para escalar con creativos ya validados', 'Ideal for scaling with already validated creatives'),
              bi('Puede matar una audiencia antes de que dé señal', 'It can kill an audience before it gives a signal'),
            ],
          },
        },
        why: bi('Se usa ABO para aprender y CBO para explotar. Mezclarlos al revés es el error típico.', 'You use ABO to learn and CBO to exploit. Mixing them the other way round is the typical error.'),
      },
      {
        id: 'ec06-t3',
        heading: bi('Audiencia amplia gana en frío (2024 en adelante)', 'Broad audience wins on cold traffic (2024 onwards)'),
        body: bi(
          'Los sistemas de puja actuales segmentan mejor que la segmentación manual. Intereses concretos encarecen el CPM y reducen el aprendizaje. La práctica: amplia con edad y país, y dejar que el creativo haga la segmentación.',
          'Current bidding systems segment better than manual segmentation. Specific interests raise the CPM and reduce learning. The practice: broad with age and country, and let the creative do the segmentation.'
        ),
        diagram: {
          kind: 'bars',
          max: 22,
          unit: ' € CPM',
          items: [
            { label: bi('Intereses estrechos', 'Narrow interests'), value: 22, tone: 'bad', note: bi('audiencia pequeña, puja cara', 'small audience, expensive bid') },
            { label: bi('Lookalike 1%', 'Lookalike 1%'), value: 15, tone: 'warn', note: bi('necesita 500+ conversiones', 'needs 500+ conversions') },
            { label: bi('Amplia (edad + país)', 'Broad (age + country)'), value: 9, tone: 'good', note: bi('más aprendizaje, CPM bajo', 'more learning, low CPM') },
          ],
        },
      },
      {
        id: 'ec06-t4',
        heading: bi('Cuándo matar un conjunto: reglas, no sensaciones', 'When to kill an ad set: rules, not feelings'),
        body: bi(
          'Se mata por incumplir un umbral con muestra suficiente, nunca por un mal día. La regla práctica: 2× el CPA objetivo gastado sin ventas, o CPA por encima del margen con más de 150 clics.',
          'You kill for breaching a threshold with a sufficient sample, never for one bad day. The practical rule: 2× the target CPA spent with no sales, or a CPA above the margin with more than 150 clicks.'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Condición', 'Condition'), bi('Acción', 'Action'), bi('Motivo', 'Reason')],
          rows: [
            ['Gasto ≥ 2× CPA objetivo, 0 ventas', 'apagar', 'no hay demanda con ese ángulo'],
            ['CPA > margen con ≥150 clics', 'apagar', 'matemáticamente inviable'],
            ['CPA entre margen y objetivo', 'observar 2 días', 'zona gris'],
            ['CPA ≤ 60% del margen', 'subir 20%', 'hay colchón para escalar'],
          ],
          highlightRow: 3,
        },
      },
      {
        id: 'ec06-t5',
        heading: bi('Fatiga del creativo: el coste sube con el tiempo', 'Creative fatigue: cost rises over time'),
        body: bi(
          'El mismo creativo a la misma audiencia sube de CPM y baja de CTR a medida que se repite. Se detecta por frecuencia (veces que una persona ve el anuncio): por encima de 3 en frío, empieza la fatiga.',
          'The same creative to the same audience raises CPM and lowers CTR as it repeats. It is detected by frequency (times a person sees the ad): above 3 on cold traffic, fatigue begins.'
        ),
        diagram: {
          kind: 'timeline',
          steps: [
            { label: bi('Días 1-5', 'Days 1-5'), value: 'frec. 1,4', tone: 'good' },
            { label: bi('Días 6-12', 'Days 6-12'), value: 'frec. 2,6', tone: 'info' },
            { label: bi('Días 13-20', 'Days 13-20'), value: 'frec. 3,8', tone: 'warn' },
            { label: bi('Día 21+', 'Day 21+'), value: 'CPM +35%', tone: 'bad' },
          ],
        },
      },
    ],
    examples: [
      {
        id: 'ec06-ex1',
        title: bi('Ejemplo resuelto: estructurar el test de un producto nuevo con 300 €', 'Worked example: structuring the test of a new product with €300'),
        situation: bi(
          'Producto validado en margen (17,40 €) y en demanda existente. Presupuesto de test 300 €. Objetivo: saber si hay un creativo que baje de 14 € de CPA en 8 días.',
          'A product validated on margin (€17.40) and on existing demand. Test budget €300. Goal: find out whether there is a creative that goes below a €14 CPA in 8 days.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Elegir ABO para el test', 'Step 1 · Choose ABO for the test'),
            detail: bi(
              'Con CBO el sistema concentraría el gasto en el creativo que aprende antes y los otros dos morirían sin muestra. ABO garantiza que cada conjunto reciba lo necesario para decidir.',
              'With CBO the system would concentrate the spend on the creative that learns first and the other two would die without a sample. ABO guarantees each ad set receives what it needs to decide.'
            ),
            diagram: {
              kind: 'compare',
              left: {
                title: bi('Con CBO en test', 'With CBO in testing'),
                tone: 'bad',
                items: [
                  bi('Un conjunto se lleva el 70% del gasto', 'One ad set takes 70% of the spend'),
                  bi('Los otros dos no llegan a la muestra mínima', 'The other two never reach the minimum sample'),
                  bi('Decides con datos de un solo ángulo', 'You decide with data from a single angle'),
                ],
              },
              right: {
                title: bi('Con ABO en test', 'With ABO in testing'),
                tone: 'good',
                items: [
                  bi('Cada conjunto recibe su presupuesto cerrado', 'Each ad set receives its closed budget'),
                  bi('Todos alcanzan los 150 clics de muestra', 'All of them reach the 150-click sample'),
                  bi('Comparación limpia entre ángulos', 'Clean comparison between angles'),
                ],
              },
            },
          },
          {
            label: bi('Paso 2 · Estructura concreta: 1 campaña, 3 conjuntos, 1 creativo cada uno', 'Step 2 · Concrete structure: 1 campaign, 3 ad sets, 1 creative each'),
            detail: bi(
              'Campaña de ventas con Advantage+ desactivado en el test. 3 conjuntos de audiencia amplia (25-54, España) a 30 €/día, cada uno con un ángulo distinto. Total 90 €/día, 270 € en 3 días.',
              'A sales campaign with Advantage+ disabled for the test. 3 broad audience ad sets (25-54, Spain) at €30/day, each with a different angle. €90/day total, €270 over 3 days.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Conjunto', 'Ad set'), bi('Audiencia', 'Audience'), bi('Ángulo', 'Angle'), bi('Presupuesto', 'Budget')],
              rows: [
                ['AS1', 'amplia 25-54', 'antes/después', '30 €/día'],
                ['AS2', 'amplia 25-54', 'objeción', '30 €/día'],
                ['AS3', 'amplia 25-54', 'dolor visible', '30 €/día'],
              ],
              highlightRow: 0,
            },
          },
          {
            label: bi('Paso 3 · No tocar nada durante la fase de aprendizaje', 'Step 3 · Touch nothing during the learning phase'),
            detail: bi(
              'Cada edición de presupuesto o audiencia reinicia el aprendizaje. Se dejan 48 horas sin tocar y se anota la fecha y hora de cada lectura para no interpretar datos a medias.',
              'Every budget or audience edit restarts learning. Leave it 48 hours untouched and note the date and time of each reading so as not to interpret half-baked data.'
            ),
            diagram: {
              kind: 'timeline',
              steps: [
                { label: bi('Día 0', 'Day 0'), value: 'lanzamiento', tone: 'info' },
                { label: bi('Días 1-2', 'Days 1-2'), value: 'no tocar', tone: 'warn' },
                { label: bi('Día 3', 'Day 3'), value: 'primera lectura', tone: 'info' },
                { label: bi('Día 8', 'Day 8'), value: 'decisión', tone: 'good' },
              ],
            },
          },
          {
            label: bi('Paso 4 · Leer el día 3 y cortar lo que incumple', 'Step 4 · Read on day 3 and cut what breaches'),
            detail: bi(
              'AS2 lleva 62 € gastados con 0 ventas: supera 2× el CPA objetivo (28 €) sin convertir, así que se apaga. AS1 con 3 ventas y CPA 12,40 €: se mantiene. AS3 con 1 venta y CPA 21 €: zona gris, 48 h más.',
              'AS2 has €62 spent with 0 sales: it exceeds 2× the target CPA (€28) without converting, so it is turned off. AS1 with 3 sales and a €12.40 CPA: kept. AS3 with 1 sale and a €21 CPA: grey zone, 48 more hours.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Conjunto', 'Ad set'), bi('Gasto', 'Spend'), bi('Ventas', 'Sales'), bi('CPA', 'CPA'), bi('Decisión', 'Decision')],
              rows: [
                ['AS1', '37,20 €', '3', '12,40 €', 'MANTENER'],
                ['AS2', '62,00 €', '0', '—', 'APAGAR'],
                ['AS3', '21,00 €', '1', '21,00 €', '48 h más'],
              ],
              highlightRow: 1,
            },
          },
          {
            label: bi('Paso 5 · Escalar el ganador en CBO con el presupuesto liberado', 'Step 5 · Scale the winner in CBO with the freed budget'),
            detail: bi(
              'Al día 8, AS1 acumula 11 ventas con CPA 11,80 € y frecuencia 1,9. Se pasa a una campaña CBO nueva con AS1 y 2 variantes del mismo ángulo, a 90 €/día. Los 30 € liberados de AS2 financian la escala.',
              'By day 8, AS1 has accumulated 11 sales with an €11.80 CPA and a frequency of 1.9. It moves to a new CBO campaign with AS1 and 2 variants of the same angle, at €90/day. The €30 freed from AS2 funds the scale.'
            ),
            diagram: {
              kind: 'flow',
              nodes: [
                { id: 'a', label: bi('Test ABO', 'ABO test'), note: bi('aprender', 'learn'), tone: 'info' },
                { id: 'b', label: bi('Ganador AS1', 'Winner AS1'), note: bi('CPA 11,80 €', 'CPA €11.80'), tone: 'good' },
                { id: 'c', label: bi('Escala CBO', 'CBO scale'), note: bi('explotar', 'exploit'), tone: 'good' },
                { id: 'd', label: bi('+2 variantes', '+2 variants'), note: bi('contra la fatiga', 'against fatigue'), tone: 'warn' },
              ],
            },
          },
        ],
        result: bi(
          'Con 268 € de los 300 € se identificó un ángulo rentable (11,80 € de CPA sobre 17,40 € de margen) y se descartaron dos. La estructura fue la que permitió decidir: ABO para aprender, CBO para escalar.',
          'With €268 of the €300 a profitable angle was identified (€11.80 CPA over a €17.40 margin) and two were discarded. The structure is what allowed the decision: ABO to learn, CBO to scale.'
        ),
        selfCheck: {
          prompt: bi('¿Por qué se apagó AS2 con 62 € gastados y no con 28 €?', 'Why was AS2 turned off at €62 spent and not at €28?'),
          options: [
            opt('a', 'Porque la plataforma no permite apagar antes', 'Because the platform does not allow turning off earlier'),
            opt('b', 'Porque la regla era 2× el CPA objetivo sin ventas, y el reparto diario del presupuesto hizo que la lectura útil llegara a los 62 €', 'Because the rule was 2× the target CPA with no sales, and the daily budget split meant the useful reading arrived at €62'),
            opt('c', 'Porque AS2 tenía peor creativo', 'Because AS2 had a worse creative'),
            opt('d', 'Porque el margen es 17,40 €', 'Because the margin is €17.40'),
          ],
          correctOptionId: 'b',
          explanation: bi('La regla se define sobre el CPA objetivo (14 €), no sobre el margen. 2× 14 = 28 €; con un presupuesto diario de 30 € la comprobación práctica ocurre al cierre del segundo día.', 'The rule is defined on the target CPA (€14), not on the margin. 2× 14 = €28; with a €30 daily budget the practical check happens at the close of the second day.'),
        },
      },
    ],
    exercises: [
      {
        id: 'ec06-e01',
        format: 'concept',
        difficulty: 1,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('En la jerarquía de Meta Ads, ¿qué se configura en el conjunto de anuncios?', 'In the Meta Ads hierarchy, what is configured in the ad set?'),
        options: [
          opt('a', 'El objetivo de la campaña', 'The campaign objective'),
          opt('b', 'Audiencia, ubicaciones y presupuesto', 'Audience, placements and budget'),
          opt('c', 'El vídeo y el texto del anuncio', 'The video and the ad text'),
          opt('d', 'El píxel de conversión', 'The conversion pixel'),
        ],
        correctOptionId: 'b',
        explanation: bi('La campaña lleva el objetivo; el conjunto lleva a quién y con cuánto; el anuncio es el creativo. Saber esto evita estructuras imposibles de leer.', 'The campaign carries the objective; the ad set carries who and with how much; the ad is the creative. Knowing this avoids structures that cannot be read.'),
        xp: 8,
      },
      {
        id: 'ec06-e02',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada situación con la configuración correcta.', 'Match each situation with the correct setup.'),
        pairs: [
          { leftId: 'l1', left: bi('Test de 3 ángulos nuevos', 'Testing 3 new angles'), rightId: 'r1', right: bi('ABO: presupuesto garantizado por conjunto', 'ABO: guaranteed budget per ad set') },
          { leftId: 'l2', left: bi('Escalar un creativo ya validado', 'Scaling an already validated creative'), rightId: 'r2', right: bi('CBO: el sistema concentra donde rinde', 'CBO: the system concentrates where it performs') },
          { leftId: 'l3', left: bi('Audiencia en frío sin datos previos', 'Cold audience with no prior data'), rightId: 'r3', right: bi('Amplia con edad y país, el creativo segmenta', 'Broad with age and country, the creative segments') },
          { leftId: 'l4', left: bi('Lookalike 1%', 'Lookalike 1%'), rightId: 'r4', right: bi('Solo con 500+ conversiones acumuladas', 'Only with 500+ accumulated conversions') },
        ],
        explanation: bi('ABO para aprender, CBO para explotar. Y la audiencia amplia funciona porque el sistema de puja ya segmenta mejor que los intereses manuales.', 'ABO to learn, CBO to exploit. And broad audiences work because the bidding system already segments better than manual interests.'),
        xp: 12,
      },
      {
        id: 'ec06-e03',
        format: 'numeric',
        difficulty: 2,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'CPA objetivo 14 € y regla de apagado a 2× sin ventas. ¿A partir de qué gasto apagamos un conjunto sin conversiones?',
          'A €14 target CPA and a turn-off rule at 2× with no sales. At what spend do we turn off an ad set with no conversions?'
        ),
        answer: 28,
        tolerance: 0.5,
        unit: '€',
        formula: bi('2 × 14', '2 × 14'),
        explanation: bi('28 € sin ventas incumple la regla. Esperar a 60 € no añade información: solo añade pérdida.', '€28 with no sales breaches the rule. Waiting to €60 adds no information: it only adds loss.'),
        xp: 10,
      },
      {
        id: 'ec06-e04',
        format: 'ordering',
        difficulty: 2,
        badge: bi('ORDENAR', 'ORDER'),
        prompt: bi('Ordena el ciclo de vida de una campaña desde el test hasta la escala.', 'Order the campaign lifecycle from test to scale.'),
        pieces: [
          { id: 'p1', text: bi('Campaña ABO con 3 ángulos y presupuesto cerrado', 'ABO campaign with 3 angles and a closed budget') },
          { id: 'p2', text: bi('48 horas sin tocar nada durante el aprendizaje', '48 hours touching nothing during learning') },
          { id: 'p3', text: bi('Apagar los conjuntos que incumplen la regla', 'Turn off the ad sets that breach the rule') },
          { id: 'p4', text: bi('Mover el ganador a una campaña CBO nueva', 'Move the winner to a new CBO campaign') },
          { id: 'p5', text: bi('Añadir variantes del ángulo ganador contra la fatiga', 'Add variants of the winning angle against fatigue') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        explanation: bi('El paso 2 es el que casi nadie respeta. Tocar el presupuesto el día 1 reinicia el aprendizaje y el día 3 sigues sin datos válidos.', 'Step 2 is the one almost nobody respects. Touching the budget on day 1 restarts learning and on day 3 you still have no valid data.'),
        xp: 10,
      },
      {
        id: 'ec06-e05',
        format: 'worked_why',
        difficulty: 3,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('¿Por qué se usó audiencia amplia en lugar de intereses concretos de "masaje y bienestar"?', 'Why was a broad audience used instead of specific "massage and wellness" interests?'),
        options: [
          opt('a', 'Porque los intereses están prohibidos en salud', 'Because interests are forbidden in health'),
          opt('b', 'Porque los intereses estrechos suben el CPM y reducen el volumen de aprendizaje, y el sistema actual segmenta mejor que la selección manual', 'Because narrow interests raise the CPM and reduce the learning volume, and the current system segments better than manual selection'),
          opt('c', 'Porque es más rápido de configurar', 'Because it is faster to set up'),
          opt('d', 'Porque el creativo no funciona con intereses', 'Because the creative does not work with interests'),
        ],
        correctOptionId: 'b',
        explanation: bi('El creativo ya segmenta: solo quien tiene el problema se detiene. Añadir intereses estrechos paga más caro por un filtro que el anuncio ya hace.', 'The creative already segments: only someone with the problem stops. Adding narrow interests pays more for a filter the ad already performs.'),
        xp: 12,
      },
      {
        id: 'ec06-e06',
        format: 'output',
        difficulty: 3,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('Con estos datos del día 5, ¿qué decisión aplica la regla?', 'With this day-5 data, what decision does the rule apply?'),
        diagram: {
          kind: 'table',
          head: [bi('Métrica', 'Metric'), bi('Valor', 'Value'), bi('Referencia', 'Reference')],
          rows: [
            ['Gasto', '48 €', 'CPA objetivo 14 €'],
            ['Clics', '161', 'muestra mínima 150'],
            ['Ventas', '2', '—'],
            ['CPA', '24 €', 'margen 17,40 €'],
          ],
          highlightRow: 3,
        },
        options: [
          opt('a', 'Mantener: todavía es pronto', 'Keep: it is still early'),
          opt('b', 'Apagar: hay muestra suficiente y el CPA supera el margen', 'Turn off: there is a sufficient sample and the CPA exceeds the margin'),
          opt('c', 'Escalar: tiene 2 ventas', 'Scale: it has 2 sales'),
          opt('d', 'Bajar el presupuesto a 10 €/día', 'Lower the budget to €10/day'),
        ],
        correctOptionId: 'b',
        explanation: bi('Se cumplen las dos condiciones de apagado: muestra ≥150 clics y CPA (24 €) por encima del margen (17,40 €). Bajar el presupuesto no arregla un CPA inviable: lo alarga.', 'Both turn-off conditions are met: sample ≥150 clicks and CPA (€24) above the margin (€17.40). Lowering the budget does not fix an unviable CPA: it prolongs it.'),
        xp: 12,
      },
      {
        id: 'ec06-e07',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('Esta cuenta no sale de la fase de aprendizaje. ¿Qué configuración es la responsable?', 'This account never leaves the learning phase. Which setting is responsible?'),
        lines: [
          { id: 'c1', text: 'campana: ventas, 1 conversion = compra', tone: 'good' },
          { id: 'c2', text: '9 conjuntos de anuncios a 8 EUR/dia cada uno', tone: 'bad', label: bi('sospechoso', 'suspect') },
          { id: 'c3', text: 'audiencia amplia 25-54, ubicaciones Advantage', tone: 'good' },
          { id: 'c4', text: '3 creativos por conjunto', tone: 'good' },
        ],
        correctLineId: 'c2',
        explanation: bi('El aprendizaje necesita unas 50 conversiones por conjunto en 7 días. Con 8 €/día y CPA de 14 €, cada conjunto consigue 4 conversiones semanales: nunca sale de aprendizaje y el coste se mantiene alto.', 'Learning needs about 50 conversions per ad set in 7 days. At €8/day with a €14 CPA, each ad set gets 4 weekly conversions: it never exits learning and the cost stays high.'),
        xp: 12,
      },
      {
        id: 'ec06-e08',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Un conjunto necesita 50 conversiones semanales para salir de aprendizaje y tu CPA es 14 €. ¿Qué presupuesto diario mínimo necesita?',
          'An ad set needs 50 weekly conversions to exit learning and your CPA is €14. What minimum daily budget does it need?'
        ),
        answer: 100,
        tolerance: 2,
        unit: '€/día',
        formula: bi('(50 × 14) / 7', '(50 × 14) / 7'),
        explanation: bi('700 € semanales entre 7 días = 100 €/día. Si no puedes pagar 100 €/día por conjunto, necesitas menos conjuntos, no más.', '€700 weekly divided by 7 days = €100/day. If you cannot pay €100/day per ad set, you need fewer ad sets, not more.'),
        xp: 12,
      },
      {
        id: 'ec06-e09',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos conjuntos con CPA alto. (A) Frecuencia 1,3 y CPM que subió un 40% en 5 días. (B) Frecuencia 4,6 y CTR que bajó de 1,9% a 0,8%. ¿Cuál sufre fatiga de creativo?',
          'Two ad sets with a high CPA. (A) Frequency 1.3 and a CPM that rose 40% in 5 days. (B) Frequency 4.6 and a CTR that fell from 1.9% to 0.8%. Which suffers creative fatigue?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Conjunto', 'Ad set'), bi('Frecuencia', 'Frequency'), bi('CPM', 'CPM'), bi('CTR', 'CTR')],
          rows: [
            ['A', '1,3', '+40%', 'estable 1,7%'],
            ['B', '4,6', '+8%', '−58%'],
          ],
          highlightRow: 1,
        },
        options: [
          opt('a', 'A, porque el CPM subió mucho', 'A, because the CPM rose a lot'),
          opt('b', 'B, porque la frecuencia alta y el CTR en caída son la firma de la fatiga; A sufre competencia en la subasta', 'B, because high frequency and a falling CTR are the signature of fatigue; A suffers auction competition'),
          opt('c', 'Los dos sufren fatiga', 'Both suffer fatigue'),
          opt('d', 'Ninguno, son variaciones normales', 'Neither, they are normal variations'),
        ],
        correctOptionId: 'b',
        explanation: bi('La fatiga se diagnostica con frecuencia + CTR: la misma gente ve el mismo anuncio y deja de hacer clic. La subida de CPM con CTR estable es competencia externa, y se responde cambiando audiencia o puja, no creativo.', 'Fatigue is diagnosed with frequency + CTR: the same people see the same ad and stop clicking. A CPM rise with a stable CTR is external competition, answered by changing audience or bid, not the creative.'),
        xp: 15,
      },
      {
        id: 'ec06-e10',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'Tienes 40 €/día de presupuesto total y quieres probar 4 ángulos. ¿Cómo lo estructuras?',
          'You have €40/day total budget and want to test 4 angles. How do you structure it?'
        ),
        options: [
          opt('a', '4 conjuntos ABO de 10 €/día cada uno', '4 ABO ad sets at €10/day each'),
          opt('b', '2 conjuntos ABO de 20 €/día con 2 ángulos cada uno, o 1 conjunto con 4 creativos', '2 ABO ad sets at €20/day with 2 angles each, or 1 ad set with 4 creatives'),
          opt('c', 'Una campaña CBO de 40 € con 4 conjuntos', 'One CBO campaign of €40 with 4 ad sets'),
          opt('d', '8 conjuntos de 5 €/día para más datos', '8 ad sets at €5/day for more data'),
        ],
        correctOptionId: 'b',
        explanation: bi('Con 10 €/día y CPA de 14 € ningún conjunto llega a la conversión mínima semanal: se queda en aprendizaje permanente. Es mejor probar menos ángulos con muestra suficiente que muchos sin ella.', 'At €10/day with a €14 CPA no ad set reaches the weekly conversion minimum: it stays in permanent learning. It is better to test fewer angles with a sufficient sample than many without one.'),
        xp: 15,
      },
      {
        id: 'ec06-e11',
        format: 'faded',
        difficulty: 3,
        badge: bi('COMPLETAR', 'COMPLETE'),
        prompt: bi('Completa la ficha de reglas de una cuenta publicitaria. Las dos primeras ya están definidas.', 'Complete the rules sheet for an ad account. The first two are already defined.'),
        pieces: [
          { id: 'p1', text: bi('CPA objetivo: 14 € · CPA máximo: 17,40 € (margen)', 'Target CPA: €14 · Maximum CPA: €17.40 (margin)') },
          { id: 'p2', text: bi('Muestra mínima para decidir: 150 clics o 2× CPA objetivo', 'Minimum sample to decide: 150 clicks or 2× target CPA') },
          { id: 'p3', text: bi('APAGAR si CPA > 17,40 € con muestra cumplida', 'TURN OFF if CPA > €17.40 with the sample met') },
          { id: 'p4', text: bi('ESCALAR 20% si CPA ≤ 10,40 € (60% del margen)', 'SCALE 20% if CPA ≤ €10.40 (60% of margin)') },
          { id: 'p5', text: bi('REFRESCAR creativo si frecuencia > 3 con CTR cayendo', 'REFRESH creative if frequency > 3 with CTR falling') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        lockedPieceIds: ['p1', 'p2'],
        explanation: bi('Las cinco reglas juntas forman un sistema que decide sin ti. Sin la regla de refresco, el ganador acaba muriendo de fatiga a las tres semanas.', 'The five rules together form a system that decides without you. Without the refresh rule, the winner ends up dying of fatigue at three weeks.'),
        xp: 12,
      },
      {
        id: 'ec06-e12',
        format: 'numeric',
        difficulty: 4,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Escalas un conjunto de 90 € a 108 € al día (+20%). El CPA pasa de 11,80 € a 13,40 € por el mayor coste de aprendizaje. ¿Cuál es el beneficio diario antes y después, con margen de 17,40 €?',
          'You scale an ad set from €90 to €108 a day (+20%). The CPA goes from €11.80 to €13.40 because of the higher learning cost. What is the daily profit before and after, with a €17.40 margin?'
        ),
        answer: 112.4,
        tolerance: 3,
        unit: '€ más/día',
        formula: bi('antes 90/11,8 × 5,6 = 42,7 · después 108/13,4 × 4 = 32,2', 'before 90/11.8 × 5.6 = 42.7 · after 108/13.4 × 4 = 32.2'),
        explanation: bi(
          'Antes: 7,6 ventas × 5,60 € = 42,7 €/día. Después: 8,1 ventas × 4 € = 32,2 €/día. En este caso escalar redujo el beneficio: por eso cada subida se mide, no se asume.',
          'Before: 7.6 sales × €5.60 = €42.7/day. After: 8.1 sales × €4 = €32.2/day. Here scaling reduced the profit: that is why every increase is measured, not assumed.'
        ),
        xp: 15,
      },
      {
        id: 'ec06-e13',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Por qué se recomienda crear una campaña nueva al escalar en vez de subir el presupuesto de la existente?', 'Why is it recommended to create a new campaign when scaling instead of raising the budget of the existing one?'),
        options: [
          opt('a', 'Porque Meta cobra más por campaña nueva', 'Because Meta charges more per new campaign'),
          opt('b', 'Porque una subida grande reinicia el aprendizaje del conjunto y puede perder el rendimiento que ya tenía; la campaña nueva conserva la original como control', 'Because a large increase restarts the ad set learning and can lose the performance it already had; the new campaign keeps the original as a control'),
          opt('c', 'Porque el histórico se borra', 'Because the history is deleted'),
          opt('d', 'Porque las campañas viejas no admiten CBO', 'Because old campaigns do not support CBO'),
        ],
        correctOptionId: 'b',
        explanation: bi('Subidas del 20% no suelen reiniciar el aprendizaje; duplicar sí. La campaña nueva además te deja la original activa para comparar y volver si la escala sale mal.', 'Increases of 20% usually do not restart learning; doubling does. The new campaign also leaves the original active to compare and return to if the scale goes badly.'),
        xp: 20,
      },
    ],
    recap: [
      bi('ABO para aprender con muestra garantizada; CBO para explotar lo ya validado.', 'ABO to learn with a guaranteed sample; CBO to exploit what is already validated.'),
      bi('Audiencia amplia en frío: el creativo segmenta y el CPM baja.', 'Broad audience on cold traffic: the creative segments and the CPM drops.'),
      bi('Se apaga por regla con muestra suficiente, y la fatiga se diagnostica con frecuencia + CTR.', 'You turn off by rule with a sufficient sample, and fatigue is diagnosed with frequency + CTR.'),
    ],
    actionMission: {
      id: 'mission-ecom-6',
      title: bi('Escribe la ficha de reglas de tu cuenta', 'Write the rules sheet for your account'),
      objective: bi('Redacta el documento de decisión de tu cuenta publicitaria con CPA objetivo, máximo, muestra mínima y las tres acciones automáticas.', 'Draft the decision document for your ad account with target CPA, maximum, minimum sample and the three automatic actions.'),
      steps: [
        bi('Calcula tu CPA máximo desde el margen y fija un objetivo un 20% por debajo.', 'Calculate your maximum CPA from the margin and set a target 20% below it.'),
        bi('Define la muestra mínima en clics y en múltiplo del CPA objetivo.', 'Define the minimum sample in clicks and as a multiple of the target CPA.'),
        bi('Escribe las reglas APAGAR, ESCALAR y REFRESCAR con su umbral numérico exacto.', 'Write the TURN OFF, SCALE and REFRESH rules with their exact numeric threshold.'),
      ],
      proof: bi('La ficha de una página con los cinco umbrales numéricos y la fecha desde la que se aplica.', 'The one-page sheet with the five numeric thresholds and the date from which it applies.'),
      affiliateToolSlug: 'meta-ads',
      xpBonus: 25,
    },
  },

  /* ---------------------------------------------------------------- L7 -- */
  {
    slug: 'ecom-07-escala-caja',
    unitSlug: 'drop-unit-2',
    trackSlug: 'smart-dropshipping',
    orderIndex: 7,
    title: bi('Escalar sin morir de caja', 'Scaling without dying of cash flow'),
    outcome: bi(
      'Calcularás la necesidad de caja con lead time y plazo de cobro, y planearás LTV y retención para no depender del anuncio.',
      'You will calculate the cash need with lead time and payment terms, and plan LTV and retention so you do not depend on the ad.'
    ),
    durationMin: 14,
    xpReward: 150,
    theory: [
      {
        id: 'ec07-t1',
        heading: bi('Escalar multiplica la caja que necesitas, no solo el beneficio', 'Scaling multiplies the cash you need, not just the profit'),
        body: bi(
          'La publicidad se paga hoy; el proveedor se paga al pedir; el dinero del cliente llega días después. Si triplicas ventas, triplicas el dinero que tienes que adelantar. La mayoría de tiendas rentables quiebran aquí, no en el margen.',
          'Advertising is paid today; the supplier is paid when ordering; the customer money arrives days later. If you triple sales, you triple the money you must advance. Most profitable stores fail here, not on margin.'
        ),
        diagram: {
          kind: 'timeline',
          steps: [
            { label: bi('Día 0', 'Day 0'), value: 'pagas anuncio', tone: 'bad' },
            { label: bi('Día 1', 'Day 1'), value: 'pagas proveedor', tone: 'bad' },
            { label: bi('Día 2-3', 'Days 2-3'), value: 'llega el cobro', tone: 'good' },
            { label: bi('Día 15', 'Day 15'), value: 'se libera en el banco', tone: 'warn' },
          ],
        },
        why: bi('Entre el día 0 y el día 15 financias tú la operación con tu dinero.', 'Between day 0 and day 15 you fund the operation with your own money.'),
      },
      {
        id: 'ec07-t2',
        heading: bi('La fórmula del ciclo de caja', 'The cash cycle formula'),
        body: bi(
          'Necesidad de caja = gasto diario × días del ciclo. El ciclo suma el plazo del procesador de pago, el lead time del proveedor y los días de reserva por disputas. Con ciclo de 15 días y 300 €/día de gasto, necesitas 4 500 € disponibles.',
          'Cash need = daily spend × cycle days. The cycle adds the payment processor timeframe, the supplier lead time and the reserve days for disputes. With a 15-day cycle and €300/day of spend, you need €4,500 available.'
        ),
        diagram: {
          kind: 'equation',
          tokens: [
            { text: 'gasto/día', tone: 'bad' },
            { text: '×' },
            { text: 'días de ciclo', tone: 'info', label: bi('cobro + lead + reserva', 'collection + lead + reserve') },
          ],
          result: { text: 'caja necesaria', tone: 'good' },
        },
      },
      {
        id: 'ec07-t3',
        heading: bi('LTV: el segundo pedido es donde está el negocio', 'LTV: the second order is where the business is'),
        body: bi(
          'Con un CPA de 14 € y margen de 6,20 € en el primer pedido, el cliente es deficitario. Si un 22% vuelve a comprar con CPA cero, el valor del cliente sube y la publicidad se vuelve sostenible a largo plazo.',
          'With a €14 CPA and €6.20 margin on the first order, the customer is loss-making. If 22% buy again at zero CPA, the customer value rises and advertising becomes sustainable in the long run.'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Pedido', 'Order'), bi('Tasa', 'Rate'), bi('CPA', 'CPA'), bi('Margen', 'Margin'), bi('Contribución', 'Contribution')],
          rows: [
            ['1º', '100%', '14,00 €', '20,20 €', '+6,20 €'],
            ['2º', '22%', '0 €', '20,20 €', '+4,44 €'],
            ['3º', '9%', '0 €', '20,20 €', '+1,82 €'],
          ],
          highlightRow: 1,
          note: bi('LTV por cliente: 12,46 €. Sin repetición serían solo 6,20 €.', 'LTV per customer: €12.46. Without repeat it would be only €6.20.'),
        },
      },
      {
        id: 'ec07-t4',
        heading: bi('Email y SMS: el canal con CPA cero', 'Email and SMS: the zero-CPA channel'),
        body: bi(
          'Tres flows cubren la mayor parte del ingreso por email: bienvenida (se dispara al suscribirse), carrito abandonado (recupera entre el 8% y el 15% de los carritos) y postventa (pide reseña y ofrece complemento).',
          'Three flows cover most email revenue: welcome (triggered on signup), abandoned cart (recovers between 8% and 15% of carts) and post-purchase (asks for a review and offers an add-on).'
        ),
        diagram: {
          kind: 'bars',
          max: 15,
          unit: '%',
          items: [
            { label: bi('Carrito abandonado', 'Abandoned cart'), value: 15, tone: 'good', note: bi('recuperación típica 8-15%', 'typical recovery 8-15%') },
            { label: bi('Bienvenida', 'Welcome'), value: 9, tone: 'info', note: bi('con descuento de primera compra', 'with a first-purchase discount') },
            { label: bi('Postventa', 'Post-purchase'), value: 6, tone: 'info', note: bi('reseña + complemento', 'review + add-on') },
          ],
        },
      },
      {
        id: 'ec07-t5',
        heading: bi('Reglas de escala que no rompen la caja', 'Scaling rules that do not break the cash'),
        body: bi(
          'Subir de 20% en 20% cada 3-4 días, mantener siempre 1,5 veces la caja del ciclo siguiente y no escalar si el plazo del proveedor supera los 7 días sin haber hablado de condiciones.',
          'Increase by 20% every 3-4 days, always keep 1.5× the cash of the next cycle and do not scale if the supplier lead time exceeds 7 days without having discussed terms.'
        ),
        diagram: {
          kind: 'layers',
          layers: [
            { label: bi('Regla 1 · 20% cada 3-4 días', 'Rule 1 · 20% every 3-4 days'), note: bi('no reinicia el aprendizaje', 'does not restart learning'), tone: 'info' },
            { label: bi('Regla 2 · 1,5× la caja del ciclo', 'Rule 2 · 1.5× the cycle cash'), note: bi('colchón para disputas y retrasos', 'buffer for disputes and delays'), tone: 'warn' },
            { label: bi('Regla 3 · negociar lead time antes de escalar', 'Rule 3 · negotiate lead time before scaling'), note: bi('stock local o agente privado', 'local stock or a private agent'), tone: 'warn' },
            { label: bi('Regla 4 · activar email antes de duplicar el gasto', 'Rule 4 · activate email before doubling the spend'), note: bi('sube el LTV y baja la dependencia del anuncio', 'raises LTV and lowers ad dependence'), tone: 'good' },
          ],
        },
      },
    ],
    examples: [
      {
        id: 'ec07-ex1',
        title: bi('Ejemplo resuelto: escalar de 90 € a 300 € al día sin quedarse sin caja', 'Worked example: scaling from €90 to €300 a day without running out of cash'),
        situation: bi(
          'Tienda rentable con CPA 11,80 €, margen 17,40 € y 90 €/día de gasto. El procesador libera el dinero a los 3 días, el proveedor cobra al pedido y tarda 9 días en entregar, y hay 2 días de reserva por disputas. Caja disponible: 2 100 €.',
          'A profitable store with an €11.80 CPA, a €17.40 margin and €90/day of spend. The processor releases money after 3 days, the supplier charges on order and takes 9 days to deliver, and there are 2 reserve days for disputes. Available cash: €2,100.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Calcular el ciclo de caja actual', 'Step 1 · Compute the current cash cycle'),
            detail: bi(
              '3 días del procesador + 9 de lead time + 2 de reserva = 14 días. Con 90 €/día, la caja necesaria es 1 260 €. Hay 2 100 €: colchón de 1,67 veces. Se puede crecer, pero no de golpe.',
              '3 processor days + 9 lead time + 2 reserve = 14 days. At €90/day, the cash needed is €1,260. There is €2,100: a 1.67× buffer. It can grow, but not all at once.'
            ),
            diagram: {
              kind: 'equation',
              tokens: [
                { text: '90 €', tone: 'bad', label: bi('gasto/día', 'spend/day') },
                { text: '×' },
                { text: '14', tone: 'info', label: bi('3+9+2 días', '3+9+2 days') },
              ],
              result: { text: '1 260 €', tone: 'good' },
            },
          },
          {
            label: bi('Paso 2 · Calcular la caja que exigiría el objetivo de 300 €/día', 'Step 2 · Compute the cash the €300/day target would demand'),
            detail: bi(
              '300 × 14 = 4 200 €, y con la regla de 1,5× serían 6 300 €. Solo hay 2 100 €. Escalar a 300 € de golpe quiebra la operación en el día 7 aunque cada venta sea rentable.',
              '300 × 14 = €4,200, and with the 1.5× rule it would be €6,300. There is only €2,100. Scaling to €300 at once breaks the operation on day 7 even though every sale is profitable.'
            ),
            diagram: {
              kind: 'bars',
              max: 6300,
              unit: ' €',
              items: [
                { label: bi('Caja disponible', 'Available cash'), value: 2100, tone: 'good' },
                { label: bi('Necesaria a 150 €/día', 'Needed at €150/day'), value: 2100, tone: 'warn' },
                { label: bi('Necesaria a 300 €/día', 'Needed at €300/day'), value: 4200, tone: 'bad' },
                { label: bi('Con colchón 1,5×', 'With a 1.5× buffer'), value: 6300, tone: 'bad' },
              ],
            },
          },
          {
            label: bi('Paso 3 · Atacar el ciclo antes que el gasto', 'Step 3 · Attack the cycle before the spend'),
            detail: bi(
              'Se negocia con el proveedor: pedido consolidado semanal con entrega en 4 días a cambio de volumen garantizado. El ciclo baja de 14 a 9 días. A 300 €/día la caja necesaria pasa de 4 200 € a 2 700 €.',
              'Negotiate with the supplier: a consolidated weekly order with 4-day delivery in exchange for guaranteed volume. The cycle drops from 14 to 9 days. At €300/day the cash needed goes from €4,200 to €2,700.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Escenario', 'Scenario'), bi('Ciclo', 'Cycle'), bi('Caja a 300 €/día', 'Cash at €300/day')],
              rows: [
                ['Proveedor actual', '14 días', '4 200 €'],
                ['Consolidado semanal', '9 días', '2 700 €'],
              ],
              highlightRow: 1,
              note: bi('Reducir el ciclo es más barato que conseguir financiación.', 'Reducing the cycle is cheaper than getting financing.'),
            },
          },
          {
            label: bi('Paso 4 · Activar email antes de duplicar el gasto', 'Step 4 · Activate email before doubling the spend'),
            detail: bi(
              'Se montan los 3 flows. El carrito abandonado recupera el 11% de los carritos y la postventa genera un 18% de segundos pedidos. El margen medio por cliente sube de 6,20 € a 9,84 € sin gastar más en publicidad.',
              'The 3 flows are set up. Abandoned cart recovers 11% of carts and post-purchase generates 18% second orders. The average margin per customer rises from €6.20 to €9.84 without spending more on advertising.'
            ),
            diagram: {
              kind: 'stack',
              total: 9.84,
              prefix: '',
              parts: [
                { label: bi('Primer pedido', 'First order'), value: 6.2, tone: 'info' },
                { label: bi('Carrito recuperado', 'Recovered cart'), value: 1.9, tone: 'good' },
                { label: bi('Segundo pedido', 'Second order'), value: 1.74, tone: 'good' },
              ],
            },
          },
          {
            label: bi('Paso 5 · Escalada por tramos con comprobación de caja', 'Step 5 · Scaling in stages with a cash check'),
            detail: bi(
              '90 → 108 → 130 → 156 → 187 → 224 → 270 → 300 €, cada 4 días, comprobando antes que la caja disponible cubre 1,5× el nuevo ciclo. Total 28 días hasta el objetivo.',
              '90 → 108 → 130 → 156 → 187 → 224 → 270 → 300 €, every 4 days, checking beforehand that available cash covers 1.5× the new cycle. 28 days in total to the target.'
            ),
            diagram: {
              kind: 'timeline',
              steps: [
                { label: bi('Día 0', 'Day 0'), value: '90 €', tone: 'info' },
                { label: bi('Día 8', 'Day 8'), value: '130 €' },
                { label: bi('Día 16', 'Day 16'), value: '187 €', tone: 'warn' },
                { label: bi('Día 28', 'Day 28'), value: '300 €', tone: 'good' },
              ],
            },
          },
        ],
        result: bi(
          'Gasto multiplicado por 3,3 en 28 días sin un solo día de caja negativa. Las dos palancas que lo hicieron posible no fueron publicitarias: reducir el ciclo de 14 a 9 días y subir el margen por cliente con email.',
          'Spend multiplied by 3.3 in 28 days without a single day of negative cash. The two levers that made it possible were not advertising ones: reducing the cycle from 14 to 9 days and raising the margin per customer with email.'
        ),
        selfCheck: {
          prompt: bi('¿Por qué se redujo el ciclo de caja antes de subir el presupuesto?', 'Why was the cash cycle reduced before raising the budget?'),
          options: [
            opt('a', 'Porque el proveedor lo exigió', 'Because the supplier demanded it'),
            opt('b', 'Porque cada día menos de ciclo libera caja para el mismo gasto, y es gratis comparado con conseguir financiación', 'Because every day less in the cycle frees cash for the same spend, and it is free compared to getting financing'),
            opt('c', 'Porque acorta el tiempo de entrega al cliente', 'Because it shortens the delivery time to the customer'),
            opt('d', 'Porque reduce el CPA', 'Because it reduces the CPA'),
          ],
          correctOptionId: 'b',
          explanation: bi('Bajar el ciclo de 14 a 9 días redujo la caja necesaria un 36% sin tocar el margen. Pedir un préstamo para lo mismo cuesta intereses y tiempo.', 'Lowering the cycle from 14 to 9 days reduced the cash needed by 36% without touching the margin. Taking a loan for the same thing costs interest and time.'),
        },
      },
    ],
    exercises: [
      {
        id: 'ec07-e01',
        format: 'numeric',
        difficulty: 1,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Gasto diario 220 € y ciclo de caja de 12 días. ¿Cuánta caja necesitas para financiar la operación?',
          'Daily spend €220 and a 12-day cash cycle. How much cash do you need to fund the operation?'
        ),
        answer: 2640,
        tolerance: 5,
        unit: '€',
        formula: bi('220 × 12', '220 × 12'),
        explanation: bi('2 640 €. Con la regla del colchón 1,5× serían 3 960 €. Es el número que casi nadie calcula antes de escalar.', '€2,640. With the 1.5× buffer rule it would be €3,960. It is the number almost nobody calculates before scaling.'),
        xp: 8,
      },
      {
        id: 'ec07-e02',
        format: 'ordering',
        difficulty: 2,
        badge: bi('ORDENAR', 'ORDER'),
        prompt: bi('Ordena el ciclo de dinero de un pedido de dropshipping.', 'Order the money cycle of a dropshipping order.'),
        pieces: [
          { id: 'p1', text: bi('Pagas el anuncio del día', 'You pay the day advertising') },
          { id: 'p2', text: bi('Pagas al proveedor al hacer el pedido', 'You pay the supplier when placing the order') },
          { id: 'p3', text: bi('El cliente paga y el procesador retiene el importe', 'The customer pays and the processor holds the amount') },
          { id: 'p4', text: bi('El procesador libera el dinero a tu cuenta', 'The processor releases the money to your account') },
          { id: 'p5', text: bi('Pasado el periodo de disputas, el dinero es usable', 'After the dispute period, the money is usable') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        explanation: bi('Tú pagas en los pasos 1 y 2 y cobras en el 5. Todo lo que hay en medio lo financias de tu bolsillo.', 'You pay in steps 1 and 2 and collect in step 5. Everything in between you fund from your own pocket.'),
        xp: 10,
      },
      {
        id: 'ec07-e03',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada palanca con su efecto sobre la caja o el LTV.', 'Match each lever with its effect on cash or LTV.'),
        pairs: [
          { leftId: 'l1', left: bi('Consolidar pedidos al proveedor', 'Consolidate supplier orders'), rightId: 'r1', right: bi('Reduce días de ciclo y libera caja', 'Reduces cycle days and frees cash') },
          { leftId: 'l2', left: bi('Flow de carrito abandonado', 'Abandoned cart flow'), rightId: 'r2', right: bi('Añade ventas con CPA cero', 'Adds sales at zero CPA') },
          { leftId: 'l3', left: bi('Pack de 2 unidades', '2-unit pack'), rightId: 'r3', right: bi('Sube el AOV y el margen por pedido', 'Raises AOV and margin per order') },
          { leftId: 'l4', left: bi('Stock local del ganador', 'Local stock of the winner'), rightId: 'r4', right: bi('Baja el lead time y las devoluciones', 'Lowers lead time and returns') },
        ],
        explanation: bi('Las cuatro mejoran el negocio sin tocar la publicidad. Son las primeras que se agotan antes de pedir financiación.', 'All four improve the business without touching advertising. They are the first ones to exhaust before seeking financing.'),
        xp: 12,
      },
      {
        id: 'ec07-e04',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Procesador 3 días, proveedor 9 días, reserva por disputas 2 días, gasto 150 €/día. Si reduces el lead time del proveedor a 4 días, ¿cuánta caja liberas?',
          'Processor 3 days, supplier 9 days, dispute reserve 2 days, spend €150/day. If you reduce the supplier lead time to 4 days, how much cash do you free?'
        ),
        answer: 750,
        tolerance: 5,
        unit: '€',
        formula: bi('(14 − 9) × 150', '(14 − 9) × 150'),
        explanation: bi('Ciclo antes: 3+9+2 = 14 días → 2 100 €. Después: 3+4+2 = 9 días → 1 350 €. Caja liberada: 750 €, sin un euro de margen perdido.', 'Cycle before: 3+9+2 = 14 days → €2,100. After: 3+4+2 = 9 days → €1,350. Cash freed: €750, without a euro of margin lost.'),
        xp: 12,
      },
      {
        id: 'ec07-e05',
        format: 'worked_why',
        difficulty: 3,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('¿Por qué se activaron los flows de email antes de duplicar el gasto publicitario?', 'Why were the email flows activated before doubling the ad spend?'),
        options: [
          opt('a', 'Porque el email es más barato que la publicidad', 'Because email is cheaper than advertising'),
          opt('b', 'Porque suben el margen por cliente y eso aumenta el CPA máximo sostenible, lo que hace viable gastar más por pedido', 'Because they raise the margin per customer and that increases the maximum sustainable CPA, which makes it viable to spend more per order'),
          opt('c', 'Porque la plataforma lo exige para escalar', 'Because the platform requires it to scale'),
          opt('d', 'Porque reduce el ciclo de caja', 'Because it reduces the cash cycle'),
        ],
        correctOptionId: 'b',
        explanation: bi('El margen por cliente pasó de 6,20 € a 9,84 €. Eso sube el CPA máximo de 6,20 € a 9,84 €: de golpe la misma campaña es mucho más rentable y admite más gasto.', 'Margin per customer went from €6.20 to €9.84. That raises the maximum CPA from €6.20 to €9.84: suddenly the same campaign is far more profitable and supports more spend.'),
        xp: 12,
      },
      {
        id: 'ec07-e06',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Margen del primer pedido 6,20 €. El 22% repite con margen de 20,20 € y el 9% compra una tercera vez. ¿Cuál es el LTV de contribución por cliente?',
          'First-order margin €6.20. 22% repeat with a €20.20 margin and 9% buy a third time. What is the contribution LTV per customer?'
        ),
        answer: 12.46,
        tolerance: 0.1,
        unit: '€',
        formula: bi('6,20 + (0,22 × 20,20) + (0,09 × 20,20)', '6.20 + (0.22 × 20.20) + (0.09 × 20.20)'),
        explanation: bi('6,20 + 4,44 + 1,82 = 12,46 €. El CPA máximo sostenible pasa de 6,20 € a 12,46 €: el doble de espacio para publicidad.', '6.20 + 4.44 + 1.82 = €12.46. The maximum sustainable CPA goes from €6.20 to €12.46: twice the room for advertising.'),
        xp: 12,
      },
      {
        id: 'ec07-e07',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('La tienda es rentable por pedido pero se quedó sin dinero el día 11 de escalar. ¿Qué falta?', 'The store is profitable per order but ran out of money on day 11 of scaling. What is missing?'),
        lines: [
          { id: 'c1', text: 'margen_por_pedido: +5.60 EUR', tone: 'good' },
          { id: 'c2', text: 'gasto_diario: subido de 90 a 300 EUR en 2 dias', tone: 'bad', label: bi('sospechoso', 'suspect') },
          { id: 'c3', text: 'caja_disponible: 2100 EUR', tone: 'warn' },
          { id: 'c4', text: 'ciclo_de_caja: 14 dias', tone: 'warn' },
        ],
        correctLineId: 'c2',
        explanation: bi('A 300 €/día con ciclo de 14 días se necesitan 4 200 € y solo hay 2 100 €. El día 11 el dinero adelantado supera la caja. Ser rentable por pedido no evita quebrar por tesorería.', 'At €300/day with a 14-day cycle €4,200 are needed and there is only €2,100. On day 11 the advanced money exceeds the cash. Being profitable per order does not prevent failing on treasury.'),
        xp: 12,
      },
      {
        id: 'ec07-e08',
        format: 'output',
        difficulty: 4,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('¿Qué pasa si duplicas el presupuesto diario de 100 € a 200 € en un solo paso?', 'What happens if you double the daily budget from €100 to €200 in a single step?'),
        options: [
          opt('a', 'Las ventas se duplican exactamente', 'Sales double exactly'),
          opt('b', 'El conjunto puede reiniciar la fase de aprendizaje y el CPA subir durante varios días, mientras tu necesidad de caja se duplica de inmediato', 'The ad set may restart the learning phase and the CPA may rise for several days, while your cash need doubles immediately'),
          opt('c', 'No pasa nada si el creativo es bueno', 'Nothing happens if the creative is good'),
          opt('d', 'La plataforma lo bloquea automáticamente', 'The platform blocks it automatically'),
        ],
        correctOptionId: 'b',
        explanation: bi('Duplicar es el peor de los dos mundos: más caja comprometida hoy y rendimiento incierto durante días. Por eso se escala de 20% en 20% cada 3-4 días.', 'Doubling is the worst of both worlds: more cash committed today and uncertain performance for days. That is why you scale by 20% every 3-4 days.'),
        xp: 15,
      },
      {
        id: 'ec07-e09',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos formas de conseguir 3 000 € más de caja. (A) Préstamo al 9% TAE a 12 meses. (B) Negociar el lead time del proveedor de 9 a 4 días. ¿Cuál es mejor si tu ciclo actual es de 14 días y gastas 150 €/día?',
          'Two ways to get €3,000 more cash. (A) A loan at 9% APR over 12 months. (B) Negotiating the supplier lead time from 9 to 4 days. Which is better if your current cycle is 14 days and you spend €150/day?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Opción', 'Option'), bi('Efecto', 'Effect'), bi('Coste', 'Cost')],
          rows: [
            ['A · préstamo', '+3 000 € de caja', 'intereses + deuda'],
            ['B · lead time', '−750 € de caja necesaria', '0 €'],
          ],
          highlightRow: 1,
        },
        options: [
          opt('a', 'A, porque da más dinero', 'A, because it gives more money'),
          opt('b', 'B, porque reduce la necesidad de caja gratis y de forma permanente, y además mejora la experiencia de entrega', 'B, because it reduces the cash need for free and permanently, and also improves the delivery experience'),
          opt('c', 'Las dos a la vez', 'Both at once'),
          opt('d', 'Ninguna, hay que esperar a acumular beneficio', 'Neither, you have to wait to accumulate profit'),
        ],
        correctOptionId: 'b',
        explanation: bi('B libera 750 € sin coste y se repite cada ciclo. A añade deuda con interés. Y B tiene un efecto secundario positivo: entregas antes y bajan las devoluciones.', 'B frees €750 at no cost and repeats every cycle. A adds debt with interest. And B has a positive side effect: you deliver sooner and returns drop.'),
        xp: 15,
      },
      {
        id: 'ec07-e10',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'Tu ganador lleva 24 días activo y el CPM subió un 38% con la frecuencia en 3,9. El CPA sigue por debajo del margen. ¿Qué haces?',
          'Your winner has been running 24 days and the CPM rose 38% with frequency at 3.9. The CPA is still below the margin. What do you do?'
        ),
        options: [
          opt('a', 'Apagarlo, el CPM sube', 'Turn it off, the CPM is rising'),
          opt('b', 'Dejarlo y preparar 2-3 variantes del mismo ángulo con otros creadores para rotarlas antes de que el CPA se dañe', 'Leave it and prepare 2-3 variants of the same angle with other creators to rotate them before the CPA is damaged'),
          opt('c', 'Subir el presupuesto para compensar el CPM', 'Raise the budget to offset the CPM'),
          opt('d', 'Cambiar la audiencia a intereses', 'Change the audience to interests'),
        ],
        correctOptionId: 'b',
        explanation: bi('Es fatiga temprana, no fallo: todavía es rentable. Se apaga un ganador rentable solo cuando la regla lo dice, y se prepara el reemplazo antes de necesitarlo.', 'It is early fatigue, not failure: it is still profitable. You only turn off a profitable winner when the rule says so, and you prepare the replacement before needing it.'),
        xp: 15,
      },
      {
        id: 'ec07-e11',
        format: 'faded',
        difficulty: 3,
        badge: bi('COMPLETAR', 'COMPLETE'),
        prompt: bi('Completa el plan de escala por tramos. Los dos primeros tramos ya están definidos.', 'Complete the staged scaling plan. The first two stages are already defined.'),
        pieces: [
          { id: 'p1', text: bi('Tramo 1: 90 € → 108 € (+20%), día 0', 'Stage 1: €90 → €108 (+20%), day 0') },
          { id: 'p2', text: bi('Tramo 2: 108 € → 130 € (+20%), día 4', 'Stage 2: €108 → €130 (+20%), day 4') },
          { id: 'p3', text: bi('Comprobación previa de cada tramo: caja ≥ 1,5 × gasto nuevo × ciclo', 'Pre-check for each stage: cash ≥ 1.5 × new spend × cycle') },
          { id: 'p4', text: bi('Activar los 3 flows de email antes del tramo 4', 'Activate the 3 email flows before stage 4') },
          { id: 'p5', text: bi('Negociar lead time con el proveedor antes del tramo 6', 'Negotiate lead time with the supplier before stage 6') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        lockedPieceIds: ['p1', 'p2'],
        explanation: bi('Los tramos 3 a 5 no son escalones de gasto sino condiciones previas. Sin ellas, el tramo 6 es donde se rompe la caja.', 'Stages 3 to 5 are not spend steps but preconditions. Without them, stage 6 is where the cash breaks.'),
        xp: 12,
      },
      {
        id: 'ec07-e12',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Por qué una tienda puede ser rentable por pedido y quebrar igualmente?', 'Why can a store be profitable per order and still go bankrupt?'),
        options: [
          opt('a', 'Porque los impuestos se pagan al final del año', 'Because taxes are paid at the end of the year'),
          opt('b', 'Porque el beneficio es contable y la caja es temporal: si pagas antes de cobrar y creces rápido, te quedas sin dinero aunque cada venta gane', 'Because profit is accounting and cash is temporal: if you pay before collecting and grow fast, you run out of money even though each sale earns'),
          opt('c', 'Porque el procesador cobra comisiones', 'Because the processor charges fees'),
          opt('d', 'Porque las devoluciones llegan tarde', 'Because returns arrive late'),
        ],
        correctOptionId: 'b',
        explanation: bi('Es la diferencia entre cuenta de resultados y tesorería. Crecer multiplica ambas, pero la caja se compromete antes: por eso se escala por tramos y con colchón.', 'It is the difference between the income statement and the treasury. Growing multiplies both, but cash is committed first: that is why you scale in stages and with a buffer.'),
        xp: 20,
      },
      {
        id: 'ec07-e13',
        format: 'scenario',
        difficulty: 2,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi('Vas a escalar tu primer ganador. ¿Qué calculas antes de subir el presupuesto?', 'You are about to scale your first winner. What do you calculate before raising the budget?'),
        options: [
          opt('a', 'El ROAS proyectado', 'The projected ROAS'),
          opt('b', 'La caja necesaria con el nuevo gasto diario y tu ciclo real de cobro, proveedor y disputas', 'The cash needed with the new daily spend and your real collection, supplier and dispute cycle'),
          opt('c', 'Cuántos seguidores ganará la marca', 'How many followers the brand will gain'),
          opt('d', 'El stock del proveedor', 'The supplier stock'),
        ],
        correctOptionId: 'b',
        explanation: bi('El ROAS ya lo conoces: es lo que te trajo aquí. Lo que no has calculado es cuánto dinero tienes que adelantar para sostener ese ROAS a mayor volumen.', 'You already know the ROAS: it is what brought you here. What you have not calculated is how much money you must advance to sustain that ROAS at higher volume.'),
        xp: 10,
      },
    ],
    recap: [
      bi('Caja necesaria = gasto diario × días de ciclo (cobro + lead time + reserva).', 'Cash needed = daily spend × cycle days (collection + lead time + reserve).'),
      bi('Reducir el ciclo libera caja gratis; negociar lead time antes de escalar es obligatorio.', 'Reducing the cycle frees cash for free; negotiating lead time before scaling is mandatory.'),
      bi('El LTV sube con email y packs, y eso duplica tu CPA máximo sostenible sin gastar más.', 'LTV rises with email and packs, and that doubles your maximum sustainable CPA without spending more.'),
    ],
    actionMission: {
      id: 'mission-ecom-7',
      title: bi('Calcula tu ciclo de caja real', 'Calculate your real cash cycle'),
      objective: bi('Mide los días reales entre que pagas y cobras, y calcula cuánta caja necesitas para tu gasto diario actual y para tu objetivo.', 'Measure the real days between paying and collecting, and calculate how much cash you need for your current daily spend and for your target.'),
      steps: [
        bi('Anota los días reales del procesador, del proveedor y del periodo de disputas.', 'Note the real days of the processor, the supplier and the dispute period.'),
        bi('Multiplica el ciclo por tu gasto diario actual y por tu objetivo de escala.', 'Multiply the cycle by your current daily spend and by your scaling target.'),
        bi('Identifica una acción concreta para reducir el ciclo antes de escalar.', 'Identify one concrete action to shorten the cycle before scaling.'),
      ],
      proof: bi('Los tres números: ciclo en días, caja necesaria hoy y caja necesaria con el objetivo, más la acción elegida para reducir el ciclo.', 'The three numbers: cycle in days, cash needed today and cash needed at the target, plus the chosen action to reduce the cycle.'),
      affiliateToolSlug: 'klaviyo-email',
      xpBonus: 30,
    },
  },
];

export const ECOM_UNIT_2: Unit = {
  slug: 'drop-unit-2',
  trackSlug: 'smart-dropshipping',
  orderIndex: 2,
  title: bi('Creativo, campaña y caja', 'Creative, campaign and cash'),
  description: bi(
    'Cómo se hace un creativo que para el scroll, cómo se estructura una cuenta para poder decidir y cómo se escala sin quedarse sin dinero.',
    'How to make a creative that stops the scroll, how to structure an account so you can decide, and how to scale without running out of money.'
  ),
  lessons: LESSONS,
};
