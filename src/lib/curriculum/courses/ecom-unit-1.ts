import { bi, opt } from '@/lib/curriculum/authoring';
import { Lesson, Unit } from '@/lib/curriculum/types';

/* ==========================================================================
   SMART DROPSHIPPING · Unit 1 — La matemática antes que el producto
   ========================================================================== */

const LESSONS: Lesson[] = [
  /* ---------------------------------------------------------------- L1 -- */
  {
    slug: 'ecom-01-unit-economics',
    unitSlug: 'drop-unit-1',
    trackSlug: 'smart-dropshipping',
    orderIndex: 1,
    title: bi('La matemática antes que el producto', 'The maths before the product'),
    outcome: bi(
      'Calcularás el margen de contribución por unidad con COGS, envío, comisiones y devoluciones, y sabrás qué precio es viable.',
      'You will compute the contribution margin per unit including COGS, shipping, fees and returns, and know which price is viable.'
    ),
    durationMin: 14,
    xpReward: 150,
    theory: [
      {
        id: 'ec01-t1',
        heading: bi('El ingreso no es beneficio: el margen de contribución sí', 'Revenue is not profit: contribution margin is'),
        body: bi(
          'El margen de contribución es lo que queda de una venta después de pagar todo lo que varía con esa venta: producto, envío, comisión de pago y la parte proporcional de devoluciones. Es el número que decide si escalar o parar.',
          'Contribution margin is what remains from a sale after paying everything that varies with that sale: product, shipping, payment fee and the proportional share of returns. It is the number that decides whether to scale or stop.'
        ),
        diagram: {
          kind: 'equation',
          tokens: [
            { text: 'precio', tone: 'good', label: bi('lo que paga', 'what they pay') },
            { text: '−' },
            { text: 'COGS', tone: 'bad', label: bi('producto', 'product') },
            { text: '−' },
            { text: 'envío', tone: 'bad' },
            { text: '−' },
            { text: 'comisión', tone: 'bad' },
            { text: '−' },
            { text: 'devol.', tone: 'warn' },
          ],
          result: { text: 'margen', tone: 'good' },
        },
        why: bi('Una tienda con 30 000 € de ingreso y margen de 2 € por unidad está perdiendo dinero con cada venta que celebra.', 'A store with €30,000 of revenue and €2 margin per unit is losing money on every sale it celebrates.'),
      },
      {
        id: 'ec01-t2',
        heading: bi('El COGS real incluye lo que no aparece en AliExpress', 'Real COGS includes what does not appear on AliExpress'),
        body: bi(
          'El precio del proveedor es solo una parte. Se suman el envío por unidad, el embalaje si va personalizado, la comisión del proveedor por gestión y el tipo de cambio. Ignorar esto es la causa más común de margen negativo.',
          'The supplier price is only one part. Add the per-unit shipping, packaging if customised, the supplier handling fee and the exchange rate. Ignoring this is the most common cause of negative margin.'
        ),
        diagram: {
          kind: 'stack',
          total: 18.4,
          prefix: '',
          parts: [
            { label: bi('Producto (proveedor)', 'Product (supplier)'), value: 9.2, tone: 'bad' },
            { label: bi('Envío por unidad', 'Per-unit shipping'), value: 4.1, tone: 'bad' },
            { label: bi('Embalaje y etiqueta', 'Packaging and label'), value: 1.3, tone: 'warn' },
            { label: bi('Comisión de gestión 5%', 'Handling fee 5%'), value: 0.9, tone: 'warn' },
            { label: bi('Colchón cambio de divisa 3%', 'FX buffer 3%'), value: 0.6, tone: 'info' },
            { label: bi('Margen antes de anuncios', 'Margin before ads'), value: 2.3, tone: 'good' },
          ],
        },
      },
      {
        id: 'ec01-t3',
        heading: bi('Las devoluciones son un coste, no un incidente', 'Returns are a cost, not an incident'),
        body: bi(
          'Si el 8% de los pedidos se devuelve y solo recuperas la mitad del valor, cada venta carga con un coste oculto. Se incorpora al margen como porcentaje: tasa de devolución × coste medio por devolución.',
          'If 8% of orders are returned and you recover only half the value, every sale carries a hidden cost. It is folded into the margin as a percentage: return rate × average cost per return.'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Categoría', 'Category'), bi('Tasa típica', 'Typical rate'), bi('Coste medio', 'Average cost')],
          rows: [
            ['Ropa y calzado', '12-20%', 'producto + envío de vuelta'],
            ['Hogar y accesorios', '4-8%', 'producto, envío no recuperable'],
            ['Electrónica pequeña', '6-10%', 'producto + gestión'],
            ['Belleza y consumo', '2-4%', 'casi siempre no recuperable'],
          ],
          highlightRow: 0,
          note: bi('En ropa, el margen se calcula con la devolución dentro, no como sorpresa.', 'In clothing, the margin is calculated with returns inside, not as a surprise.'),
        },
      },
      {
        id: 'ec01-t4',
        heading: bi('AOV: la palanca que cambia toda la cuenta', 'AOV: the lever that changes the whole account'),
        body: bi(
          'Subir el valor medio del pedido de 28 € a 39 € con un pack de 2 unidades o un complemento de 11 € mejora el margen sin tocar el coste de adquisición. Es más rápido que bajar el CPA y no depende del algoritmo.',
          'Raising average order value from €28 to €39 with a 2-pack or an €11 add-on improves the margin without touching acquisition cost. It is faster than lowering CPA and does not depend on the algorithm.'
        ),
        diagram: {
          kind: 'bars',
          max: 39,
          unit: ' €',
          items: [
            { label: bi('AOV actual', 'Current AOV'), value: 28, tone: 'warn', note: bi('margen 4,20 €', 'margin €4.20') },
            { label: bi('AOV con upsell', 'AOV with upsell'), value: 39, tone: 'good', note: bi('margen 11,80 €', 'margin €11.80') },
          ],
        },
        why: bi('Con el mismo CPA de 12 €, pasas de perder a ganar 18 € por pedido sin cambiar un solo anuncio.', 'With the same €12 CPA, you go from losing to earning €18 per order without changing a single ad.'),
      },
    ],
    examples: [
      {
        id: 'ec01-ex1',
        title: bi('Ejemplo resuelto: ¿es viable este producto a 29,90 €?', 'Worked example: is this product viable at €29.90?'),
        situation: bi(
          'Producto encontrado: una lámpara de escritorio plegable. Proveedor 8,40 € con envío incluido a España. Se quiere vender a 29,90 €. Pago con comisión 1,5% + 0,25 €. Devoluciones observadas en la categoría: 6%.',
          'Product found: a foldable desk lamp. Supplier €8.40 with shipping included to Spain. It is to be sold at €29.90. Payment with a 1.5% + €0.25 fee. Observed category returns: 6%.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Desglosar el coste variable completo', 'Step 1 · Break down the complete variable cost'),
            detail: bi(
              'Producto 8,40 €. Comisión de pago: 29,90 × 1,5% = 0,45 € más 0,25 € fijos = 0,70 €. Embalaje neutro 0,60 €. Colchón de divisa 3% del COGS = 0,25 €.',
              'Product €8.40. Payment fee: €29.90 × 1.5% = €0.45 plus €0.25 fixed = €0.70. Neutral packaging €0.60. FX buffer 3% of COGS = €0.25.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Concepto', 'Item'), bi('Cálculo', 'Calculation'), bi('Importe', 'Amount')],
              rows: [
                ['Producto + envío', 'proveedor', '8,40 €'],
                ['Comisión de pago', '1,5% + 0,25 €', '0,70 €'],
                ['Embalaje', 'fijo', '0,60 €'],
                ['Colchón divisa', '3% de 8,40', '0,25 €'],
              ],
              note: bi('Subtotal coste variable: 9,95 €', 'Variable cost subtotal: €9.95'),
            },
          },
          {
            label: bi('Paso 2 · Añadir el coste de las devoluciones', 'Step 2 · Add the cost of returns'),
            detail: bi(
              'Con 6% de devoluciones y recuperación del 40% del producto, el coste por venta es: 0,06 × (9,95 × 0,60 + 4,50 de envío inverso) = 0,06 × 10,47 = 0,63 €.',
              'With 6% returns and 40% product recovery, the cost per sale is: 0.06 × (9.95 × 0.60 + 4.50 reverse shipping) = 0.06 × 10.47 = €0.63.'
            ),
            diagram: {
              kind: 'equation',
              tokens: [
                { text: '6%', tone: 'warn', label: bi('tasa', 'rate') },
                { text: '×' },
                { text: '10,47 €', tone: 'warn', label: bi('coste por devolución', 'cost per return') },
              ],
              result: { text: '0,63 €', tone: 'bad' },
            },
          },
          {
            label: bi('Paso 3 · Calcular el margen de contribución', 'Step 3 · Compute the contribution margin'),
            detail: bi(
              '29,90 − 9,95 − 0,63 = 19,32 € de margen antes de anuncios. Sobre el precio, un 64,6%: es un margen sano para dropshipping y deja espacio para publicidad.',
              '29.90 − 9.95 − 0.63 = €19.32 margin before ads. Over the price, 64.6%: a healthy dropshipping margin that leaves room for advertising.'
            ),
            diagram: {
              kind: 'stack',
              total: 29.9,
              prefix: '',
              parts: [
                { label: bi('Coste variable', 'Variable cost'), value: 9.95, tone: 'bad' },
                { label: bi('Devoluciones', 'Returns'), value: 0.63, tone: 'warn' },
                { label: bi('Margen antes de anuncios', 'Margin before ads'), value: 19.32, tone: 'good' },
              ],
            },
          },
          {
            label: bi('Paso 4 · Comprobar cuánto margen se come la publicidad', 'Step 4 · Check how much margin advertising eats'),
            detail: bi(
              'Con un CPA real de 12 €, quedan 7,32 € por pedido. Con CPA de 19 €, quedan 0,32 €: cualquier imprevisto lo vuelve negativo. El CPA máximo sostenible es 19,32 €.',
              'With a real CPA of €12, €7.32 remain per order. With a €19 CPA, €0.32 remain: any unexpected cost turns it negative. The maximum sustainable CPA is €19.32.'
            ),
            diagram: {
              kind: 'bars',
              max: 19.32,
              unit: ' €',
              items: [
                { label: bi('CPA 8 €', 'CPA €8'), value: 8, tone: 'good', note: bi('beneficio 11,32 €', 'profit €11.32') },
                { label: bi('CPA 12 €', 'CPA €12'), value: 12, tone: 'good', note: bi('beneficio 7,32 €', 'profit €7.32') },
                { label: bi('CPA 16 €', 'CPA €16'), value: 16, tone: 'warn', note: bi('beneficio 3,32 €', 'profit €3.32') },
                { label: bi('CPA 19,32 €', 'CPA €19.32'), value: 19.32, tone: 'bad', note: bi('beneficio 0 €', 'profit €0') },
              ],
            },
          },
          {
            label: bi('Paso 5 · Decidir y probar la palanca del AOV', 'Step 5 · Decide and test the AOV lever'),
            detail: bi(
              'Es viable, pero el colchón es fino. Se añade una bombilla de repuesto a 6,90 € con coste de 1,80 €: sube el AOV a 36,80 € y el margen a 24,42 €, lo que eleva el CPA máximo a 24 €. Ahora el producto aguanta subidas de publicidad.',
              'It is viable, but the buffer is thin. A €6.90 spare bulb with a €1.80 cost is added: AOV rises to €36.80 and margin to €24.42, which lifts the max CPA to €24. Now the product withstands rising ad costs.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Escenario', 'Scenario'), bi('AOV', 'AOV'), bi('Margen', 'Margin'), bi('CPA máximo', 'Max CPA')],
              rows: [
                ['Sin upsell', '29,90 €', '19,32 €', '19,32 €'],
                ['Con upsell 6,90 €', '36,80 €', '24,42 €', '24,42 €'],
              ],
              highlightRow: 1,
            },
          },
        ],
        result: bi(
          'El producto pasa de un colchón de 19,32 € a 24,42 € por pedido sin cambiar el anuncio ni el proveedor. La decisión se tomó con números antes de gastar el primer euro en publicidad.',
          'The product goes from a €19.32 to a €24.42 buffer per order without changing the ad or the supplier. The decision was made with numbers before spending the first euro on advertising.'
        ),
        selfCheck: {
          prompt: bi('¿Por qué se incluye el coste de devoluciones en el margen aunque solo ocurra en el 6% de los pedidos?', 'Why is the return cost included in the margin even though it only happens on 6% of orders?'),
          options: [
            opt('a', 'Porque las devoluciones siempre ocurren', 'Because returns always happen'),
            opt('b', 'Porque es un coste variable esperado: cada venta lleva su parte proporcional, igual que la comisión de pago', 'Because it is an expected variable cost: every sale carries its proportional share, just like the payment fee'),
            opt('c', 'Porque lo exige la normativa de consumo', 'Because consumer regulation requires it'),
            opt('d', 'Porque así el margen parece mayor', 'Because the margin looks bigger that way'),
          ],
          correctOptionId: 'b',
          explanation: bi('Tratar la devolución como excepción hace que el margen parezca bueno hasta que llegan 40 devoluciones el mismo mes. Es un coste por unidad, no un incidente.', 'Treating returns as an exception makes the margin look good until 40 come back in the same month. It is a per-unit cost, not an incident.'),
        },
      },
    ],
    exercises: [
      {
        id: 'ec01-e01',
        format: 'numeric',
        difficulty: 1,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Precio de venta 34 €, producto 11 €, envío 3,50 €, comisión de pago 0,90 €. ¿Cuál es el margen de contribución antes de anuncios y devoluciones?',
          'Sale price €34, product €11, shipping €3.50, payment fee €0.90. What is the contribution margin before ads and returns?'
        ),
        answer: 18.6,
        tolerance: 0.05,
        unit: '€',
        formula: bi('34 − 11 − 3,50 − 0,90', '34 − 11 − 3.50 − 0.90'),
        explanation: bi('34 − 15,40 = 18,60 €. Es el techo de lo que puedes gastar en adquirir ese pedido.', '34 − 15.40 = €18.60. That is the ceiling of what you can spend to acquire that order.'),
        xp: 8,
      },
      {
        id: 'ec01-e02',
        format: 'concept',
        difficulty: 1,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('El margen de contribución es…', 'Contribution margin is…'),
        options: [
          opt('a', 'El ingreso total menos los impuestos', 'Total revenue minus taxes'),
          opt('b', 'Lo que queda de una venta tras pagar todo lo que varía con esa venta', 'What remains from a sale after paying everything that varies with that sale'),
          opt('c', 'El beneficio neto anual de la tienda', 'The store annual net profit'),
          opt('d', 'El precio menos el coste del producto', 'The price minus the product cost'),
        ],
        correctOptionId: 'b',
        explanation: bi('La opción D es la trampa habitual: olvida envío, comisión y devoluciones. Y no descuenta costes fijos: por eso es "contribución", no beneficio neto.', 'Option D is the usual trap: it forgets shipping, fees and returns. And it does not deduct fixed costs: that is why it is "contribution", not net profit.'),
        xp: 8,
      },
      {
        id: 'ec01-e03',
        format: 'ordering',
        difficulty: 2,
        badge: bi('ORDENAR', 'ORDER'),
        prompt: bi('Ordena los pasos para decidir si un producto es viable antes de gastar en anuncios.', 'Order the steps to decide whether a product is viable before spending on ads.'),
        pieces: [
          { id: 'p1', text: bi('Sumar el COGS real: producto, envío, embalaje, divisa', 'Add up the real COGS: product, shipping, packaging, currency') },
          { id: 'p2', text: bi('Restar la comisión de pago del precio de venta', 'Subtract the payment fee from the sale price') },
          { id: 'p3', text: bi('Incorporar el coste esperado de devoluciones', 'Include the expected return cost') },
          { id: 'p4', text: bi('Obtener el margen de contribución por pedido', 'Get the contribution margin per order') },
          { id: 'p5', text: bi('Compararlo con el CPA estimado de la categoría', 'Compare it with the estimated category CPA') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        explanation: bi('El último paso es el que decide. Si el margen es menor que el CPA de la categoría, el producto no se lanza: no se "prueba a ver".', 'The last step is the one that decides. If the margin is below the category CPA, the product does not launch: you do not "try and see".'),
        xp: 10,
      },
      {
        id: 'ec01-e04',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'AOV 42 €, COGS total 16,80 €, tasa de devolución 9% con coste de 12 € por devolución. ¿Cuál es el margen de contribución por pedido?',
          'AOV €42, total COGS €16.80, return rate 9% with a €12 cost per return. What is the contribution margin per order?'
        ),
        answer: 24.12,
        tolerance: 0.05,
        unit: '€',
        formula: bi('42 − 16,80 − (0,09 × 12)', '42 − 16.80 − (0.09 × 12)'),
        explanation: bi('Coste de devoluciones por pedido: 0,09 × 12 = 1,08 €. Margen: 42 − 16,80 − 1,08 = 24,12 €. Un 57,4% del AOV.', 'Return cost per order: 0.09 × 12 = €1.08. Margin: 42 − 16.80 − 1.08 = €24.12. That is 57.4% of AOV.'),
        xp: 12,
      },
      {
        id: 'ec01-e05',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada coste con su naturaleza.', 'Match each cost with its nature.'),
        pairs: [
          { leftId: 'l1', left: bi('Precio del proveedor por unidad', 'Per-unit supplier price'), rightId: 'r1', right: bi('Variable: crece con cada venta', 'Variable: grows with every sale') },
          { leftId: 'l2', left: bi('Suscripción de Shopify', 'Shopify subscription'), rightId: 'r2', right: bi('Fijo: igual vendas 1 o 500', 'Fixed: the same for 1 or 500 sales') },
          { leftId: 'l3', left: bi('CPA de Meta Ads', 'Meta Ads CPA'), rightId: 'r3', right: bi('Variable y el más grande de todos', 'Variable and the largest of all') },
          { leftId: 'l4', left: bi('Envío inverso de una devolución', 'Reverse shipping on a return'), rightId: 'r4', right: bi('Variable esperado: se provisiona por tasa', 'Expected variable: provisioned by rate') },
        ],
        explanation: bi('Confundir fijo con variable lleva a bajar precios para "cubrir costes" cuando el problema real es el CPA.', 'Confusing fixed with variable leads to lowering prices to "cover costs" when the real problem is the CPA.'),
        xp: 12,
      },
      {
        id: 'ec01-e06',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('Esta hoja de cálculo dice que el producto deja 14 € por venta, pero la cuenta bancaria baja cada mes. ¿Qué fila está mal?', 'This spreadsheet says the product leaves €14 per sale, but the bank account drops every month. Which row is wrong?'),
        lines: [
          { id: 'c1', text: 'precio_venta: 39.90', tone: 'good' },
          { id: 'c2', text: 'cogs: 11.50  (solo el precio del proveedor en AliExpress)', tone: 'bad', label: bi('sospechoso', 'suspect') },
          { id: 'c3', text: 'comision_pago: 0.90', tone: 'good' },
          { id: 'c4', text: 'cpa_ads: 13.50', tone: 'good' },
        ],
        correctLineId: 'c2',
        explanation: bi('Faltan envío real (4-6 €), embalaje y el colchón de divisa. El COGS verdadero ronda 17-19 €, así que el margen real es de 4-6 €, no 14 €. Con un CPA de 13,50 € se pierde dinero en cada venta.', 'Real shipping (€4-6), packaging and the FX buffer are missing. True COGS is around €17-19, so the real margin is €4-6, not €14. With a €13.50 CPA you lose money on every sale.'),
        xp: 12,
      },
      {
        id: 'ec01-e07',
        format: 'worked_why',
        difficulty: 3,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('En el ejemplo se añadió un upsell de 6,90 € con coste de 1,80 €. ¿Por qué mejora el negocio más que bajar el CPA?', 'In the example a €6.90 upsell with a €1.80 cost was added. Why does that improve the business more than lowering the CPA?'),
        options: [
          opt('a', 'Porque los upsells siempre se aceptan', 'Because upsells are always accepted'),
          opt('b', 'Porque sube el margen con un coste variable mínimo y no depende del algoritmo de publicidad, que no controlas', 'Because it raises the margin with minimal variable cost and does not depend on the ad algorithm, which you do not control'),
          opt('c', 'Porque reduce el COGS del producto principal', 'Because it reduces the main product COGS'),
          opt('d', 'Porque baja la tasa de devoluciones', 'Because it lowers the return rate'),
        ],
        correctOptionId: 'b',
        explanation: bi('Bajar el CPA es negociar con una subasta que no controlas. Subir el AOV es una decisión tuya que se ejecuta en una tarde y permanece.', 'Lowering CPA is negotiating with an auction you do not control. Raising AOV is your decision, executable in an afternoon and permanent.'),
        xp: 12,
      },
      {
        id: 'ec01-e08',
        format: 'numeric',
        difficulty: 4,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Vendes 40 unidades al mes a 29,90 € con margen de 7,30 € por pedido. Costes fijos: 79 € de plataforma y 45 € de herramientas. ¿Cuál es el beneficio neto mensual?',
          'You sell 40 units a month at €29.90 with a €7.30 margin per order. Fixed costs: €79 platform and €45 tools. What is the monthly net profit?'
        ),
        answer: 168,
        tolerance: 1,
        unit: '€',
        formula: bi('(40 × 7,30) − 79 − 45', '(40 × 7.30) − 79 − 45'),
        explanation: bi('Contribución total 292 € menos 124 € de fijos = 168 €. Necesitas 17 pedidos solo para cubrir los fijos: ese es tu punto de equilibrio operativo.', 'Total contribution €292 minus €124 fixed = €168. You need 17 orders just to cover fixed costs: that is your operating break-even.'),
        xp: 15,
      },
      {
        id: 'ec01-e09',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos productos con el mismo margen absoluto de 15 €. (A) precio 25 €. (B) precio 90 €. ¿Cuál aguanta mejor una subida del CPA?',
          'Two products with the same absolute margin of €15. (A) price €25. (B) price €90. Which one better withstands a CPA increase?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Producto', 'Product'), bi('Precio', 'Price'), bi('Margen', 'Margin'), bi('% sobre precio', '% of price')],
          rows: [
            ['A', '25 €', '15 €', '60%'],
            ['B', '90 €', '15 €', '16,7%'],
          ],
          highlightRow: 0,
        },
        options: [
          opt('a', 'B, porque el precio alto aparenta más valor', 'B, because the high price looks more valuable'),
          opt('b', 'A, porque su margen es el 60% del precio y el de B solo el 16,7%: A tiene 4 veces más colchón relativo', 'A, because its margin is 60% of the price and B only 16.7%: A has 4× more relative buffer'),
          opt('c', 'Dan igual, el margen absoluto es el mismo', 'They are the same, the absolute margin is identical'),
          opt('d', 'Ninguno, los dos son inviables', 'Neither, both are unviable'),
        ],
        correctOptionId: 'b',
        explanation: bi('El margen absoluto dice cuánto ganas; el margen porcentual dice cuánto aguantas. Para publicidad, el porcentaje es el que manda.', 'Absolute margin says how much you earn; percentage margin says how much you withstand. For advertising, the percentage is what rules.'),
        xp: 15,
      },
      {
        id: 'ec01-e10',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'Tu producto da 6 € de margen y el CPA de la categoría está en 14 €. Un gurú dice "escala y el CPA bajará". ¿Qué haces?',
          'Your product gives €6 margin and the category CPA is €14. A guru says "scale and the CPA will drop". What do you do?'
        ),
        options: [
          opt('a', 'Escalar para que el algoritmo aprenda', 'Scale so the algorithm learns'),
          opt('b', 'Parar: el margen no cubre el CPA y escalar multiplica la pérdida por el volumen', 'Stop: the margin does not cover the CPA and scaling multiplies the loss by volume'),
          opt('c', 'Bajar el precio para vender más unidades', 'Lower the price to sell more units'),
          opt('d', 'Cambiar de plataforma publicitaria', 'Change the advertising platform'),
        ],
        correctOptionId: 'b',
        explanation: bi('Escalar con margen negativo es perder más dinero más rápido: 6 − 14 = −8 € por pedido. A 100 pedidos son 800 € de pérdida. Primero se arregla el margen o el CPA; nunca se escala un número negativo.', 'Scaling with a negative margin is losing more money faster: 6 − 14 = −€8 per order. At 100 orders that is €800 of loss. Fix the margin or the CPA first; never scale a negative number.'),
        xp: 15,
      },
      {
        id: 'ec01-e11',
        format: 'faded',
        difficulty: 3,
        badge: bi('COMPLETAR', 'COMPLETE'),
        prompt: bi('Completa la ficha de unit economics de un producto. Las dos primeras filas ya están calculadas.', 'Complete the unit economics sheet for a product. The first two rows are already calculated.'),
        pieces: [
          { id: 'p1', text: bi('Precio de venta: 44,90 €', 'Sale price: €44.90') },
          { id: 'p2', text: bi('COGS completo (producto + envío + embalaje + divisa): 17,20 €', 'Complete COGS (product + shipping + packaging + currency): €17.20') },
          { id: 'p3', text: bi('Comisión de pago (1,5% + 0,25 €): 0,92 €', 'Payment fee (1.5% + €0.25): €0.92') },
          { id: 'p4', text: bi('Provisión de devoluciones (7% × 13 €): 0,91 €', 'Return provision (7% × €13): €0.91') },
          { id: 'p5', text: bi('Margen de contribución: 25,87 € → CPA máximo sostenible', 'Contribution margin: €25.87 → maximum sustainable CPA') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        lockedPieceIds: ['p1', 'p2'],
        explanation: bi('El orden es el de la resta: del precio se va quitando cada coste variable hasta llegar al techo de publicidad. Saltarse una fila es el error que más tiendas quiebra.', 'The order is that of the subtraction: from the price you remove each variable cost until you reach the advertising ceiling. Skipping a row is the error that bankrupts most stores.'),
        xp: 12,
      },
      {
        id: 'ec01-e12',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Por qué se dice que el AOV es la palanca más rápida del dropshipping?', 'Why is AOV said to be the fastest lever in dropshipping?'),
        options: [
          opt('a', 'Porque sube el tráfico sin pagar más anuncios', 'Because it raises traffic without paying for more ads'),
          opt('b', 'Porque aumenta el margen por pedido con un coste variable bajo y depende solo de tu tienda, no de la subasta publicitaria', 'Because it increases the margin per order with a low variable cost and depends only on your store, not on the ad auction'),
          opt('c', 'Porque reduce automáticamente las devoluciones', 'Because it automatically reduces returns'),
          opt('d', 'Porque mejora el posicionamiento orgánico', 'Because it improves organic ranking'),
        ],
        correctOptionId: 'b',
        explanation: bi('Bundles, order bumps y post-purchase se montan en horas y su efecto es permanente. El CPA depende de una subasta con miles de competidores.', 'Bundles, order bumps and post-purchase are set up in hours and their effect is permanent. CPA depends on an auction with thousands of competitors.'),
        xp: 20,
      },
      {
        id: 'ec01-e13',
        format: 'scenario',
        difficulty: 2,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi('Encuentras un producto que te gusta. ¿Qué haces antes de crear la tienda?', 'You find a product you like. What do you do before creating the store?'),
        options: [
          opt('a', 'Crear la tienda y probar con 50 € de publicidad', 'Create the store and test with €50 of advertising'),
          opt('b', 'Calcular el margen de contribución con COGS real, comisión, devoluciones y comparar con el CPA de la categoría', 'Calculate the contribution margin with real COGS, fees, returns and compare with the category CPA'),
          opt('c', 'Buscar el dominio y el nombre de marca', 'Look for the domain and brand name'),
          opt('d', 'Pedir una muestra al proveedor', 'Order a sample from the supplier'),
        ],
        correctOptionId: 'b',
        explanation: bi('Diez minutos de hoja de cálculo descartan el 70% de los productos que parecían buenos. Es el filtro más barato que existe.', 'Ten minutes of spreadsheet work discards 70% of the products that looked good. It is the cheapest filter that exists.'),
        xp: 10,
      },
    ],
    recap: [
      bi('Margen de contribución = precio − COGS real − comisión − provisión de devoluciones.', 'Contribution margin = price − real COGS − fee − return provision.'),
      bi('El COGS real incluye envío, embalaje y colchón de divisa, no solo el precio del proveedor.', 'Real COGS includes shipping, packaging and an FX buffer, not just the supplier price.'),
      bi('El margen es tu CPA máximo. Si el margen no lo cubre, no se escala: se arregla o se descarta.', 'The margin is your maximum CPA. If the margin does not cover it, you do not scale: you fix it or discard it.'),
    ],
    actionMission: {
      id: 'mission-ecom-1',
      title: bi('Haz la ficha de unit economics de un producto real', 'Build the unit economics sheet for a real product'),
      objective: bi('Elige un producto que estés considerando y calcula su margen de contribución completo con datos reales del proveedor.', 'Pick a product you are considering and calculate its full contribution margin with real supplier data.'),
      steps: [
        bi('Pide al proveedor precio por unidad, coste de envío a tu país y plazo real de entrega.', 'Ask the supplier for the unit price, shipping cost to your country and real delivery time.'),
        bi('Añade embalaje, comisión de pago y provisión de devoluciones de la categoría.', 'Add packaging, payment fee and the category return provision.'),
        bi('Compara el margen con el CPA medio de la categoría y decide: viable, ajustable o descartado.', 'Compare the margin with the average category CPA and decide: viable, adjustable or discarded.'),
      ],
      proof: bi('Una hoja con las 6 líneas de coste, el margen final y la decisión escrita con su motivo.', 'A sheet with the 6 cost lines, the final margin and the written decision with its reason.'),
      affiliateToolSlug: 'minea-research',
      xpBonus: 25,
    },
  },

  /* ---------------------------------------------------------------- L2 -- */
  {
    slug: 'ecom-02-roas-equilibrio',
    unitSlug: 'drop-unit-1',
    trackSlug: 'smart-dropshipping',
    orderIndex: 2,
    title: bi('BE ROAS: el número que decide todo', 'BE ROAS: the number that decides everything'),
    outcome: bi(
      'Calcularás el BE ROAS, el CPA máximo y decidirás escalar, mantener o matar una campaña con criterios, no con sensaciones.',
      'You will calculate BE ROAS and max CPA, and decide to scale, hold or kill a campaign with criteria, not feelings.'
    ),
    durationMin: 14,
    xpReward: 150,
    theory: [
      {
        id: 'ec02-t1',
        heading: bi('ROAS es ingreso entre gasto; BE ROAS es el empate', 'ROAS is revenue over spend; BE ROAS is break-even'),
        body: bi(
          'ROAS = ingreso atribuido / gasto publicitario. Un ROAS de 3 significa 3 € de ingreso por cada 1 € gastado. El BE ROAS es el valor en el que el ingreso cubre exactamente los costes: por debajo pierdes, por encima ganas.',
          'ROAS = attributed revenue / ad spend. A ROAS of 3 means €3 of revenue per €1 spent. BE ROAS is the value where revenue exactly covers costs: below it you lose, above it you earn.'
        ),
        diagram: {
          kind: 'equation',
          tokens: [
            { text: 'BE ROAS', tone: 'good' },
            { text: '=' },
            { text: '1', tone: 'info' },
            { text: '/' },
            { text: 'margen %', tone: 'info', label: bi('sobre el precio', 'over the price') },
          ],
          result: { text: '2,5× si el margen es 40%', tone: 'good' },
        },
        why: bi('Un ROAS de 2 puede ser ruinoso o excelente: solo lo sabes comparándolo con tu BE ROAS.', 'A ROAS of 2 can be ruinous or excellent: you only know by comparing it with your BE ROAS.'),
      },
      {
        id: 'ec02-t2',
        heading: bi('Menos margen exige más ROAS: la tabla que decide', 'Less margin demands more ROAS: the table that decides'),
        body: bi(
          'Con margen del 70% basta un ROAS de 1,43. Con margen del 30% necesitas 3,33. Con margen del 20% necesitas 5: muy pocas categorías lo sostienen. Por eso el margen manda sobre el producto, no la demanda.',
          'At 70% margin a ROAS of 1.43 is enough. At 30% margin you need 3.33. At 20% margin you need 5: very few categories sustain that. That is why margin rules over the product, not demand.'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Margen %', 'Margin %'), bi('BE ROAS', 'BE ROAS'), bi('CPA máx. con AOV 40 €', 'Max CPA at €40 AOV'), bi('Viabilidad', 'Viability')],
          rows: [
            ['70%', '1,43×', '28,00 €', 'cómoda'],
            ['50%', '2,00×', '20,00 €', 'buena'],
            ['40%', '2,50×', '16,00 €', 'justa'],
            ['30%', '3,33×', '12,00 €', 'difícil'],
            ['20%', '5,00×', '8,00 €', 'casi imposible'],
          ],
          highlightRow: 3,
        },
      },
      {
        id: 'ec02-t3',
        heading: bi('CPA máximo = margen de contribución', 'Maximum CPA = contribution margin'),
        body: bi(
          'No puedes pagar por adquirir un pedido más de lo que ese pedido contribuye. CPA máximo = margen de contribución. Si tu margen es 19,32 € y el CPA real es 22 €, cada venta te cuesta 2,68 €.',
          'You cannot pay more to acquire an order than that order contributes. Maximum CPA = contribution margin. If your margin is €19.32 and the real CPA is €22, every sale costs you €2.68.'
        ),
        diagram: {
          kind: 'bars',
          max: 22,
          unit: ' €',
          items: [
            { label: bi('Margen disponible', 'Available margin'), value: 19.32, tone: 'good' },
            { label: bi('CPA real', 'Real CPA'), value: 22, tone: 'bad', note: bi('−2,68 € por pedido', '−€2.68 per order') },
          ],
        },
      },
      {
        id: 'ec02-t4',
        heading: bi('Reglas de decisión: matar, mantener o escalar', 'Decision rules: kill, hold or scale'),
        body: bi(
          'Se decide con datos suficientes, no con dos días de campaña. La regla práctica: con menos de 1 000 impresiones o menos de 100 clics no hay señal. Con señal y CPA por encima del máximo, se mata el creativo, no la cuenta.',
          'You decide with enough data, not two days of campaign. The practical rule: below 1,000 impressions or 100 clicks there is no signal. With a signal and a CPA above the maximum, you kill the creative, not the account.'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Situación', 'Situation'), bi('Decisión', 'Decision'), bi('Por qué', 'Why')],
          rows: [
            ['< 100 clics', 'esperar', 'no hay señal estadística'],
            ['CTR < 0,8% con 5 000 impresiones', 'matar el creativo', 'el hook no para el scroll'],
            ['CTR bien, CPA alto', 'matar la página de producto', 'el clic no convierte'],
            ['CPA ≤ 60% del margen', 'escalar 20-30%', 'hay colchón para crecer'],
          ],
          highlightRow: 3,
        },
      },
      {
        id: 'ec02-t5',
        heading: bi('ROAS de plataforma ≠ ROAS real', 'Platform ROAS ≠ real ROAS'),
        body: bi(
          'La plataforma atribuye las compras que ve en su ventana de clics, que sobreestima. El ROAS real sale de comparar el ingreso del periodo en tu tienda con el gasto total, descontando devoluciones. Suelen diferir entre un 20% y un 40%.',
          'The platform attributes the purchases it sees in its click window, which overestimates. Real ROAS comes from comparing period revenue in your store with total spend, minus returns. They usually differ by 20% to 40%.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('ROAS de plataforma', 'Platform ROAS'),
            tone: 'warn',
            items: [
              bi('Atribución por ventana de clics', 'Click-window attribution'),
              bi('No descuenta devoluciones', 'Does not deduct returns'),
              bi('Suele ser 20-40% optimista', 'Usually 20-40% optimistic'),
            ],
          },
          right: {
            title: bi('ROAS real', 'Real ROAS'),
            tone: 'good',
            items: [
              bi('Ingreso neto del periodo / gasto total', 'Net period revenue / total spend'),
              bi('Descuenta devoluciones y comisiones', 'Deducts returns and fees'),
              bi('Es el que paga las facturas', 'It is the one that pays the bills'),
            ],
          },
        },
      },
    ],
    examples: [
      {
        id: 'ec02-ex1',
        title: bi('Ejemplo resuelto: campaña a 3,1 de ROAS que perdía dinero', 'Worked example: a 3.1 ROAS campaign that was losing money'),
        situation: bi(
          'Una tienda de accesorios de cocina celebra un ROAS de 3,1 en Meta. Vende a 24,90 € con COGS de 13,40 €, comisión de 0,62 € y devoluciones del 7% con coste de 9 €. Gasta 2 400 € al mes.',
          'A kitchen accessories store celebrates a 3.1 ROAS on Meta. It sells at €24.90 with a €13.40 COGS, a €0.62 fee and 7% returns at €9 cost. It spends €2,400 a month.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Calcular el margen de contribución real', 'Step 1 · Compute the real contribution margin'),
            detail: bi(
              '24,90 − 13,40 − 0,62 = 10,88 €. Devoluciones: 0,07 × (13,40 × 0,6 + 9) = 0,07 × 17,04 = 1,19 €. Margen: 9,69 €, un 38,9% del precio.',
              '24.90 − 13.40 − 0.62 = €10.88. Returns: 0.07 × (13.40 × 0.6 + 9) = 0.07 × 17.04 = €1.19. Margin: €9.69, 38.9% of the price.'
            ),
            diagram: {
              kind: 'stack',
              total: 24.9,
              parts: [
                { label: bi('COGS', 'COGS'), value: 13.4, tone: 'bad' },
                { label: bi('Comisión', 'Fee'), value: 0.62, tone: 'warn' },
                { label: bi('Devoluciones', 'Returns'), value: 1.19, tone: 'warn' },
                { label: bi('Margen', 'Margin'), value: 9.69, tone: 'good' },
              ],
            },
          },
          {
            label: bi('Paso 2 · Calcular el BE ROAS', 'Step 2 · Compute the BE ROAS'),
            detail: bi(
              'BE ROAS = 1 / 0,389 = 2,57. La campaña va a 3,1 según la plataforma, así que parece rentable. Falta comprobar si ese 3,1 es real.',
              'BE ROAS = 1 / 0.389 = 2.57. The campaign runs at 3.1 according to the platform, so it looks profitable. It remains to check whether that 3.1 is real.'
            ),
            diagram: {
              kind: 'equation',
              tokens: [
                { text: '1', tone: 'info' },
                { text: '/' },
                { text: '0,389', tone: 'info', label: bi('margen %', 'margin %') },
              ],
              result: { text: 'BE ROAS 2,57', tone: 'good' },
            },
          },
          {
            label: bi('Paso 3 · Contrastar con los datos del banco', 'Step 3 · Contrast with the bank data'),
            detail: bi(
              'Ingreso del mes en la tienda: 6 890 €. Pedidos: 277. Gasto publicitario total: 2 400 €. ROAS real = 6 890 / 2 400 = 2,87. Meta decía 3,1: sobreestimaba un 8%. Todavía por encima del BE, pero el colchón es menor.',
              'Store revenue for the month: €6,890. Orders: 277. Total ad spend: €2,400. Real ROAS = 6,890 / 2,400 = 2.87. Meta said 3.1: it overestimated by 8%. Still above BE, but the buffer is smaller.'
            ),
            diagram: {
              kind: 'bars',
              max: 3.1,
              items: [
                { label: bi('BE ROAS', 'BE ROAS'), value: 2.57, tone: 'warn', note: bi('empate', 'break-even') },
                { label: bi('ROAS real', 'Real ROAS'), value: 2.87, tone: 'good' },
                { label: bi('ROAS de Meta', 'Meta ROAS'), value: 3.1, tone: 'info', note: bi('+8% optimista', '+8% optimistic') },
              ],
            },
          },
          {
            label: bi('Paso 4 · Calcular el beneficio real del mes', 'Step 4 · Compute the real profit for the month'),
            detail: bi(
              '277 pedidos × 9,69 € de margen = 2 684 € de contribución. Menos 2 400 € de publicidad = 284 €. Menos 124 € de costes fijos = 160 € de beneficio con 6 890 € de ingreso. Un margen neto del 2,3%.',
              '277 orders × €9.69 margin = €2,684 of contribution. Minus €2,400 of advertising = €284. Minus €124 of fixed costs = €160 of profit on €6,890 of revenue. A 2.3% net margin.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Concepto', 'Item'), bi('Importe', 'Amount')],
              rows: [
                ['Ingreso', '6 890 €'],
                ['Contribución (277 × 9,69)', '2 684 €'],
                ['Publicidad', '−2 400 €'],
                ['Costes fijos', '−124 €'],
                ['Beneficio neto', '160 €'],
              ],
              highlightRow: 4,
            },
          },
          {
            label: bi('Paso 5 · Decidir: no escalar, mejorar el AOV', 'Step 5 · Decide: do not scale, improve the AOV'),
            detail: bi(
              'Escalar con 2,3% de margen neto multiplica el riesgo: un CPA 10% mayor lo vuelve negativo. Se añade un pack de 2 unidades a 39,90 € (COGS 22,40 €). El margen sube a 15,20 € y el BE ROAS baja a 2,08. Ahora sí se puede escalar.',
              'Scaling at a 2.3% net margin multiplies the risk: a 10% higher CPA turns it negative. A 2-pack at €39.90 is added (COGS €22.40). Margin rises to €15.20 and BE ROAS drops to 2.08. Now scaling is possible.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Escenario', 'Scenario'), bi('AOV', 'AOV'), bi('Margen', 'Margin'), bi('BE ROAS', 'BE ROAS')],
              rows: [
                ['Antes', '24,90 €', '9,69 €', '2,57'],
                ['Con pack de 2', '39,90 €', '15,20 €', '2,08'],
              ],
              highlightRow: 1,
              note: bi('Con el mismo ROAS real de 2,87, el beneficio por pedido pasa de 0,60 € a 4,32 €.', 'At the same real ROAS of 2.87, profit per order goes from €0.60 to €4.32.'),
            },
          },
        ],
        result: bi(
          'Un ROAS de 3,1 que parecía éxito era un 2,3% de margen neto. La solución no fue mejorar los anuncios: fue cambiar la oferta para que el mismo anuncio produjera más beneficio.',
          'A 3.1 ROAS that looked like success was a 2.3% net margin. The fix was not better ads: it was changing the offer so the same ad produced more profit.'
        ),
        selfCheck: {
          prompt: bi('¿Por qué no se escaló la campaña aunque el ROAS estaba por encima del BE?', 'Why was the campaign not scaled even though the ROAS was above BE?'),
          options: [
            opt('a', 'Porque el ROAS de Meta no es fiable nunca', 'Because Meta ROAS is never reliable'),
            opt('b', 'Porque el margen neto era del 2,3%: cualquier subida pequeña del CPA convierte el beneficio en pérdida, y escalar multiplica ese riesgo', 'Because the net margin was 2.3%: any small CPA rise turns profit into loss, and scaling multiplies that risk'),
            opt('c', 'Porque la tienda no tenía stock suficiente', 'Because the store did not have enough stock'),
            opt('d', 'Porque el BE ROAS estaba mal calculado', 'Because the BE ROAS was miscalculated'),
          ],
          correctOptionId: 'b',
          explanation: bi('Estar por encima del BE no es lo mismo que tener colchón. Se escala cuando el CPA real está claramente por debajo del máximo, no cuando roza el empate.', 'Being above BE is not the same as having a buffer. You scale when the real CPA is clearly below the maximum, not when it brushes break-even.'),
        },
      },
    ],
    exercises: [
      {
        id: 'ec02-e01',
        format: 'numeric',
        difficulty: 1,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi('Margen del 45% sobre el precio. ¿Cuál es el BE ROAS?', 'A 45% margin over the price. What is the BE ROAS?'),
        answer: 2.22,
        tolerance: 0.03,
        unit: '×',
        formula: bi('1 / 0,45', '1 / 0.45'),
        explanation: bi('1 / 0,45 = 2,22. Necesitas 2,22 € de ingreso por cada 1 € de publicidad para no perder dinero.', '1 / 0.45 = 2.22. You need €2.22 of revenue per €1 of advertising to avoid losing money.'),
        xp: 8,
      },
      {
        id: 'ec02-e02',
        format: 'concept',
        difficulty: 1,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('Un ROAS de 2,5 es…', 'A ROAS of 2.5 is…'),
        options: [
          opt('a', 'Bueno, porque es mayor que 1', 'Good, because it is greater than 1'),
          opt('b', 'Insuficiente si tu BE ROAS es 3,3 y excelente si tu BE ROAS es 1,4', 'Insufficient if your BE ROAS is 3.3 and excellent if your BE ROAS is 1.4'),
          opt('c', 'Siempre rentable en dropshipping', 'Always profitable in dropshipping'),
          opt('d', 'Equivalente a un 25% de beneficio', 'Equivalent to a 25% profit'),
        ],
        correctOptionId: 'b',
        explanation: bi('El ROAS aislado no significa nada. Solo es interpretable contra tu BE ROAS, que depende de tu margen.', 'ROAS alone means nothing. It is only interpretable against your BE ROAS, which depends on your margin.'),
        xp: 8,
      },
      {
        id: 'ec02-e03',
        format: 'numeric',
        difficulty: 2,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'AOV 40 €, margen de contribución 16 €. ¿Cuál es el CPA máximo sostenible y qué BE ROAS representa?',
          'AOV €40, contribution margin €16. What is the maximum sustainable CPA and what BE ROAS does it represent?'
        ),
        answer: 2.5,
        tolerance: 0.05,
        unit: '× (BE ROAS)',
        formula: bi('CPA máx = 16 € · BE ROAS = 40 / 16', 'Max CPA = €16 · BE ROAS = 40 / 16'),
        explanation: bi('CPA máximo = margen = 16 €. BE ROAS = AOV / margen = 40 / 16 = 2,5. Es lo mismo que 1 / 0,40.', 'Maximum CPA = margin = €16. BE ROAS = AOV / margin = 40 / 16 = 2.5. That is the same as 1 / 0.40.'),
        xp: 10,
      },
      {
        id: 'ec02-e04',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada síntoma de campaña con su causa probable.', 'Match each campaign symptom with its likely cause.'),
        pairs: [
          { leftId: 'l1', left: bi('CTR bajo (< 0,8%)', 'Low CTR (< 0.8%)'), rightId: 'r1', right: bi('El hook del creativo no para el scroll', 'The creative hook does not stop the scroll') },
          { leftId: 'l2', left: bi('CTR alto y conversión baja', 'High CTR and low conversion'), rightId: 'r2', right: bi('La página de producto no sostiene la promesa del anuncio', 'The product page does not sustain the ad promise') },
          { leftId: 'l3', left: bi('CPC alto y CTR alto', 'High CPC and high CTR'), rightId: 'r3', right: bi('Audiencia cara o competencia intensa en la subasta', 'Expensive audience or intense auction competition') },
          { leftId: 'l4', left: bi('Conversiones en la plataforma que no aparecen en la tienda', 'Platform conversions that do not appear in the store'), rightId: 'r4', right: bi('Atribución sobreestimada o píxel duplicado', 'Overestimated attribution or a duplicated pixel') },
        ],
        explanation: bi('Cada métrica señala un responsable distinto. Cambiar el presupuesto sin identificar el síntoma es gastar más en el mismo fallo.', 'Each metric points to a different culprit. Changing the budget without identifying the symptom is spending more on the same failure.'),
        xp: 12,
      },
      {
        id: 'ec02-e05',
        format: 'worked_why',
        difficulty: 3,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('En el ejemplo, ¿por qué se añadió el pack de 2 unidades en vez de optimizar los anuncios?', 'In the example, why was the 2-pack added instead of optimising the ads?'),
        options: [
          opt('a', 'Porque los anuncios ya eran perfectos', 'Because the ads were already perfect'),
          opt('b', 'Porque subir el margen baja el BE ROAS de forma inmediata y segura, mientras que optimizar anuncios depende de una subasta que no controlas', 'Because raising the margin lowers the BE ROAS immediately and reliably, while optimising ads depends on an auction you do not control'),
          opt('c', 'Porque el pack es más barato de enviar', 'Because the pack is cheaper to ship'),
          opt('d', 'Porque Meta premia los precios altos', 'Because Meta rewards high prices'),
        ],
        correctOptionId: 'b',
        explanation: bi('El BE ROAS bajó de 2,57 a 2,08 cambiando la oferta, no el anuncio. Con el mismo rendimiento publicitario, el beneficio por pedido pasó de 0,60 € a 4,32 €.', 'BE ROAS dropped from 2.57 to 2.08 by changing the offer, not the ad. With the same ad performance, profit per order went from €0.60 to €4.32.'),
        xp: 12,
      },
      {
        id: 'ec02-e06',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Gasto 1 800 €, ingreso en tienda 4 680 €, devoluciones del 9% sobre el ingreso. ¿Cuál es el ROAS real neto de devoluciones?',
          'Spend €1,800, store revenue €4,680, returns of 9% of revenue. What is the real ROAS net of returns?'
        ),
        answer: 2.34,
        tolerance: 0.03,
        unit: '×',
        formula: bi('(4 680 × 0,91) / 1 800', '(4,680 × 0.91) / 1,800'),
        explanation: bi('Ingreso neto: 4 680 × 0,91 = 4 258,80 €. ROAS real = 4 258,80 / 1 800 = 2,34. Sin descontar devoluciones dirías 2,60: un 11% de optimismo falso.', 'Net revenue: 4,680 × 0.91 = €4,258.80. Real ROAS = 4,258.80 / 1,800 = 2.34. Without deducting returns you would say 2.60: 11% of false optimism.'),
        xp: 12,
      },
      {
        id: 'ec02-e07',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('Este informe dice que la campaña es rentable pero la cuenta bancaria baja. ¿Qué fila es el problema?', 'This report says the campaign is profitable but the bank account drops. Which row is the problem?'),
        lines: [
          { id: 'c1', text: 'roas_plataforma: 2.9', tone: 'bad', label: bi('sospechoso', 'suspect') },
          { id: 'c2', text: 'gasto_total: 2400', tone: 'good' },
          { id: 'c3', text: 'be_roas_calculado: 2.57', tone: 'good' },
          { id: 'c4', text: 'costes_fijos_mensuales: 124', tone: 'good' },
        ],
        correctLineId: 'c1',
        explanation: bi('Se está decidiendo con el ROAS atribuido por la plataforma, que sobreestima. El ROAS real es 2,87 y el beneficio neto 160 €: la fila 1 es la que crea la falsa sensación de éxito.', 'Decisions are being made with the platform-attributed ROAS, which overestimates. The real ROAS is 2.87 and net profit €160: row 1 is what creates the false sense of success.'),
        xp: 12,
      },
      {
        id: 'ec02-e08',
        format: 'output',
        difficulty: 3,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('Margen 25%, AOV 60 €. La campaña va a ROAS real 3,4. ¿Cuál es el beneficio por pedido?', 'Margin 25%, AOV €60. The campaign runs at a real ROAS of 3.4. What is the profit per order?'),
        diagram: {
          kind: 'equation',
          tokens: [
            { text: 'margen', tone: 'info' },
            { text: '=' },
            { text: '60 × 0,25', tone: 'info' },
            { text: '=' },
            { text: '15 €', tone: 'good' },
            { text: '· CPA =', tone: 'mute' },
            { text: '60 / 3,4', tone: 'info' },
          ],
          result: { text: '17,65 €', tone: 'bad' },
        },
        options: [
          opt('a', '+2,35 € por pedido', '+€2.35 per order'),
          opt('b', '−2,65 € por pedido: el CPA supera al margen', '−€2.65 per order: the CPA exceeds the margin'),
          opt('c', '+15 € por pedido', '+€15 per order'),
          opt('d', '0 €: está en equilibrio', '€0: it is balanced'),
        ],
        correctOptionId: 'b',
        explanation: bi('CPA = AOV / ROAS = 60 / 3,4 = 17,65 €. Margen 15 €. Beneficio = 15 − 17,65 = −2,65 € por pedido. Un ROAS de 3,4 puede perder dinero con margen bajo.', 'CPA = AOV / ROAS = 60 / 3.4 = €17.65. Margin €15. Profit = 15 − 17.65 = −€2.65 per order. A ROAS of 3.4 can lose money with a low margin.'),
        xp: 12,
      },
      {
        id: 'ec02-e09',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos campañas el mismo día. (A) ROAS 4,2 con margen del 20%. (B) ROAS 2,1 con margen del 65%. ¿Cuál es más rentable?',
          'Two campaigns on the same day. (A) ROAS 4.2 with a 20% margin. (B) ROAS 2.1 with a 65% margin. Which is more profitable?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Campaña', 'Campaign'), bi('ROAS', 'ROAS'), bi('Margen', 'Margin'), bi('BE ROAS', 'BE ROAS')],
          rows: [
            ['A', '4,2', '20%', '5,00'],
            ['B', '2,1', '65%', '1,54'],
          ],
          highlightRow: 1,
        },
        options: [
          opt('a', 'A, porque tiene el ROAS más alto', 'A, because it has the higher ROAS'),
          opt('b', 'B, porque supera su BE ROAS con colchón mientras que A pierde dinero por debajo de 5,00', 'B, because it beats its BE ROAS with room while A loses money below 5.00'),
          opt('c', 'Dan el mismo resultado', 'They give the same result'),
          opt('d', 'Ninguna es rentable', 'Neither is profitable'),
        ],
        correctOptionId: 'b',
        explanation: bi('A necesita 5,00 y va a 4,2: pierde. B necesita 1,54 y va a 2,1: gana. El ROAS alto con margen bajo es la trampa más cara del dropshipping.', 'A needs 5.00 and runs at 4.2: it loses. B needs 1.54 and runs at 2.1: it earns. A high ROAS with a low margin is the most expensive trap in dropshipping.'),
        xp: 15,
      },
      {
        id: 'ec02-e10',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'Llevas 2 días de campaña con 62 clics, 0 ventas y 74 € gastados. ¿Qué decides?',
          'You are 2 days into a campaign with 62 clicks, 0 sales and €74 spent. What do you decide?'
        ),
        options: [
          opt('a', 'Matar el producto: ya se ve que no funciona', 'Kill the product: it clearly does not work'),
          opt('b', 'Esperar hasta tener señal suficiente (≥100 clics o ≥1 000 impresiones) antes de decidir', 'Wait until there is enough signal (≥100 clicks or ≥1,000 impressions) before deciding'),
          opt('c', 'Duplicar el presupuesto para que el algoritmo aprenda antes', 'Double the budget so the algorithm learns faster'),
          opt('d', 'Bajar el precio un 30%', 'Lower the price by 30%'),
        ],
        correctOptionId: 'b',
        explanation: bi('Con 62 clics y una conversión esperada del 2%, lo normal es 1,2 ventas. Cero ventas está dentro del ruido. Decidir ahora es decidir sin datos.', 'With 62 clicks and an expected 2% conversion, the norm is 1.2 sales. Zero sales is within the noise. Deciding now is deciding without data.'),
        xp: 15,
      },
      {
        id: 'ec02-e11',
        format: 'faded',
        difficulty: 3,
        badge: bi('COMPLETAR', 'COMPLETE'),
        prompt: bi('Completa la secuencia de decisión de una campaña. Los dos primeros pasos ya están hechos.', 'Complete the campaign decision sequence. The first two steps are done.'),
        pieces: [
          { id: 'p1', text: bi('Calcular el margen de contribución por pedido', 'Compute the contribution margin per order') },
          { id: 'p2', text: bi('Derivar el BE ROAS = 1 / margen%', 'Derive BE ROAS = 1 / margin%') },
          { id: 'p3', text: bi('Esperar a tener señal suficiente en la campaña', 'Wait for enough signal in the campaign') },
          { id: 'p4', text: bi('Calcular el ROAS real con ingreso neto de la tienda', 'Compute real ROAS with store net revenue') },
          { id: 'p5', text: bi('Comparar con el BE ROAS y aplicar la regla: matar, mantener o escalar', 'Compare with BE ROAS and apply the rule: kill, hold or scale') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        lockedPieceIds: ['p1', 'p2'],
        explanation: bi('Los dos primeros pasos se hacen ANTES de lanzar. Quien los hace después ya ha gastado el presupuesto decidiendo.', 'The first two steps happen BEFORE launching. Whoever does them afterwards has already spent the budget deciding.'),
        xp: 12,
      },
      {
        id: 'ec02-e12',
        format: 'numeric',
        difficulty: 4,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'CPA real 14 €, margen 19,32 €. Vendes 210 pedidos al mes. ¿Cuánto beneficio mensual de contribución neto de publicidad generas, en euros?',
          'Real CPA €14, margin €19.32. You sell 210 orders a month. How much monthly contribution profit net of advertising do you generate, in euros?'
        ),
        answer: 1117.2,
        tolerance: 5,
        unit: '€',
        formula: bi('210 × (19,32 − 14)', '210 × (19.32 − 14)'),
        explanation: bi('Beneficio por pedido: 19,32 − 14 = 5,32 €. × 210 = 1 117,20 € antes de costes fijos. Si el CPA sube a 19 €, el beneficio cae a 67 €: de ahí la importancia del colchón.', 'Profit per order: 19.32 − 14 = €5.32. × 210 = €1,117.20 before fixed costs. If the CPA rises to €19, profit falls to €67: that is why the buffer matters.'),
        xp: 15,
      },
      {
        id: 'ec02-e13',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Por qué se recomienda escalar de 20% en 20% y no duplicar el presupuesto de golpe?', 'Why is it recommended to scale in 20% steps instead of doubling the budget at once?'),
        options: [
          opt('a', 'Porque Meta limita los aumentos de presupuesto', 'Because Meta limits budget increases'),
          opt('b', 'Porque un cambio brusco reinicia la fase de aprendizaje y el CPA se dispara antes de estabilizarse', 'Because a sudden change restarts the learning phase and the CPA spikes before stabilising'),
          opt('c', 'Porque el margen baja con el volumen', 'Because the margin drops with volume'),
          opt('d', 'Porque el stock no aguanta', 'Because the stock cannot hold up'),
        ],
        correctOptionId: 'b',
        explanation: bi('Los sistemas de puja optimizan con el histórico reciente. Duplicar el presupuesto los saca de su fase estable y suelen tardar 3-7 días en recuperar el CPA, días en los que pagas el aprendizaje.', 'Bidding systems optimise on recent history. Doubling the budget takes them out of their stable phase and they usually take 3-7 days to recover the CPA, days in which you pay for the learning.'),
        xp: 20,
      },
    ],
    recap: [
      bi('BE ROAS = 1 / margen%. CPA máximo = margen de contribución por pedido.', 'BE ROAS = 1 / margin%. Maximum CPA = contribution margin per order.'),
      bi('El ROAS de la plataforma sobreestima: decide con el ingreso neto real de tu tienda.', 'Platform ROAS overestimates: decide with the real net revenue of your store.'),
      bi('Sin señal suficiente no hay decisión. Y se escala solo con colchón, de 20% en 20%.', 'Without enough signal there is no decision. And you scale only with a buffer, in 20% steps.'),
    ],
    actionMission: {
      id: 'mission-ecom-2',
      title: bi('Calcula tu BE ROAS y compáralo con el real', 'Compute your BE ROAS and compare it with the real one'),
      objective: bi('Calcula el BE ROAS de tu producto principal y contrástalo con el ROAS real neto de devoluciones de los últimos 30 días.', 'Compute the BE ROAS for your main product and contrast it with the real ROAS net of returns for the last 30 days.'),
      steps: [
        bi('Calcula el margen de contribución y deriva el BE ROAS = 1 / margen%.', 'Compute the contribution margin and derive BE ROAS = 1 / margin%.'),
        bi('Saca el ingreso neto de devoluciones del periodo y divídelo entre el gasto publicitario total.', 'Take the revenue net of returns for the period and divide it by the total ad spend.'),
        bi('Anota la diferencia entre el ROAS de la plataforma y el real, en porcentaje.', 'Note the difference between the platform ROAS and the real one, as a percentage.'),
      ],
      proof: bi('Los tres números escritos: BE ROAS, ROAS de plataforma y ROAS real, con la decisión que se deriva de compararlos.', 'The three numbers written down: BE ROAS, platform ROAS and real ROAS, with the decision that follows from comparing them.'),
      affiliateToolSlug: 'meta-ads',
      xpBonus: 25,
    },
  },
  /* ---------------------------------------------------------------- L3 -- */
  {
    slug: 'ecom-03-validacion-datos',
    unitSlug: 'drop-unit-1',
    trackSlug: 'smart-dropshipping',
    orderIndex: 3,
    title: bi('Validar con datos, no con corazonadas', 'Validate with data, not hunches'),
    outcome: bi(
      'Aplicarás criterios de kill con umbral y presupuesto, y dimensionarás un test que da respuesta en días, no en meses.',
      'You will apply kill criteria with a threshold and budget, and size a test that answers in days, not months.'
    ),
    durationMin: 13,
    xpReward: 140,
    theory: [
      {
        id: 'ec03-t1',
        heading: bi('Validar es comprar información, no vender', 'Validating is buying information, not selling'),
        body: bi(
          'Un test de validación no busca beneficio: busca una respuesta binaria (sigue / muere) al menor precio. Por eso se define el criterio de decisión ANTES de gastar, no después de ver los números.',
          'A validation test does not seek profit: it seeks a binary answer (continue / kill) at the lowest price. That is why the decision criterion is set BEFORE spending, not after seeing the numbers.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('Validar sin criterio', 'Validating without a criterion'),
            tone: 'bad',
            items: [
              bi('"Voy a probar a ver qué pasa"', '"Let me try and see what happens"'),
              bi('Gasto abierto hasta agotar la ilusión', 'Open spend until the illusion runs out'),
              bi('Cada número se reinterpreta a favor', 'Every number gets reinterpreted in your favour'),
            ],
          },
          right: {
            title: bi('Validar con criterio', 'Validating with a criterion'),
            tone: 'good',
            items: [
              bi('"Si CPA > 14 € con 150 clics, muere"', '"If CPA > €14 with 150 clicks, it dies"'),
              bi('Presupuesto y duración cerrados', 'Closed budget and duration'),
              bi('La decisión se ejecuta, no se negocia', 'The decision is executed, not negotiated'),
            ],
          },
        },
        why: bi('Sin criterio previo, el cerebro defiende el tiempo ya invertido. Es el coste hundido decidiendo por ti.', 'Without a prior criterion, the brain defends the time already spent. That is sunk cost deciding for you.'),
      },
      {
        id: 'ec03-t2',
        heading: bi('Demanda existente antes que producto nuevo', 'Existing demand before a new product'),
        body: bi(
          'Se busca evidencia de que la gente ya compra eso: anuncios activos de competidores durante semanas, volumen de búsqueda estable y reseñas recientes. Un producto sin competencia no es una oportunidad: suele ser ausencia de demanda.',
          'Look for evidence that people already buy this: competitor ads running for weeks, stable search volume and recent reviews. A product with no competition is not an opportunity: it is usually an absence of demand.'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Señal', 'Signal'), bi('Dónde se mira', 'Where to look'), bi('Umbral útil', 'Useful threshold')],
          rows: [
            ['Anuncios activos', 'biblioteca de anuncios / spy tool', '≥ 2 semanas en marcha'],
            ['Volumen de búsqueda', 'planificador de palabras clave', 'estable o creciente 12 meses'],
            ['Reseñas recientes', 'marketplaces y tiendas rivales', '≥ 20 en los últimos 60 días'],
            ['Precio de mercado', '3 competidores mínimo', 'tu margen sigue siendo ≥ 40%'],
          ],
          highlightRow: 0,
        },
      },
      {
        id: 'ec03-t3',
        heading: bi('Tamaño mínimo de muestra: sin datos no hay decisión', 'Minimum sample size: no data, no decision'),
        body: bi(
          'Con una conversión esperada del 2%, necesitas unos 150 clics para ver 3 ventas y poder distinguir señal de ruido. Con 40 clics, cero ventas es perfectamente normal aunque el producto sea bueno.',
          'With an expected 2% conversion, you need about 150 clicks to see 3 sales and be able to tell signal from noise. With 40 clicks, zero sales is perfectly normal even if the product is good.'
        ),
        diagram: {
          kind: 'bars',
          max: 200,
          unit: ' clics',
          items: [
            { label: bi('Ruido puro', 'Pure noise'), value: 40, tone: 'bad', note: bi('0-1 ventas esperadas', '0-1 expected sales') },
            { label: bi('Señal débil', 'Weak signal'), value: 100, tone: 'warn', note: bi('~2 ventas esperadas', '~2 expected sales') },
            { label: bi('Decisión razonable', 'Reasonable decision'), value: 150, tone: 'good', note: bi('~3 ventas esperadas', '~3 expected sales') },
            { label: bi('Alta confianza', 'High confidence'), value: 300, tone: 'good', note: bi('~6 ventas esperadas', '~6 expected sales') },
          ],
        },
      },
      {
        id: 'ec03-t4',
        heading: bi('Presupuesto de test = 3 veces el CPA objetivo', 'Test budget = 3× the target CPA'),
        body: bi(
          'La regla práctica permite comprar unas 3 conversiones: suficiente para ver si el coste se acerca al objetivo. Con CPA objetivo de 14 €, el test son 42-60 € por creativo. Probar 5 creativos cuesta 210-300 €.',
          'The practical rule lets you buy about 3 conversions: enough to see whether the cost approaches the target. With a €14 target CPA, the test is €42-60 per creative. Testing 5 creatives costs €210-300.'
        ),
        diagram: {
          kind: 'equation',
          tokens: [
            { text: '3', tone: 'info', label: bi('conversiones', 'conversions') },
            { text: '×' },
            { text: 'CPA objetivo', tone: 'info' },
            { text: '×' },
            { text: 'nº creativos', tone: 'info' },
          ],
          result: { text: 'presupuesto de test', tone: 'good' },
        },
      },
    ],
    examples: [
      {
        id: 'ec03-ex1',
        title: bi('Ejemplo resuelto: validar un corrector de postura en 9 días', 'Worked example: validating a posture corrector in 9 days'),
        situation: bi(
          'Producto: corrector de postura a 32,90 € con margen de contribución de 17,40 € (CPA máximo 17,40 €). Presupuesto disponible: 320 €. Plazo: 9 días antes de decidir.',
          'Product: a posture corrector at €32.90 with a €17.40 contribution margin (max CPA €17.40). Available budget: €320. Timeframe: 9 days before deciding.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Comprobar demanda existente (día 1)', 'Step 1 · Check existing demand (day 1)'),
            detail: bi(
              'Se buscan anuncios activos en la biblioteca de anuncios: 14 anunciantes con el mismo producto, 6 de ellos con anuncios de más de 30 días. Eso es señal fuerte: nadie mantiene un anuncio un mes si pierde dinero.',
              'Search active ads in the ad library: 14 advertisers with the same product, 6 of them with ads older than 30 days. That is a strong signal: nobody keeps an ad running for a month while losing money.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Señal', 'Signal'), bi('Resultado', 'Result'), bi('Veredicto', 'Verdict')],
              rows: [
                ['Anunciantes activos', '14', 'demanda real'],
                ['Anuncios > 30 días', '6', 'rentables para ellos'],
                ['Reseñas 60 días', '218', 'categoría viva'],
                ['Precio medio mercado', '29-39 €', 'margen viable'],
              ],
              highlightRow: 1,
            },
          },
          {
            label: bi('Paso 2 · Escribir el criterio de kill antes de gastar (día 1)', 'Step 2 · Write the kill criterion before spending (day 1)'),
            detail: bi(
              'Se anota en un documento: "Muere si con ≥150 clics el CPA supera 17,40 € o el CTR es menor del 1% con 5 000 impresiones. Sigue si CPA ≤ 14 €". Nadie lo modifica después.',
              'Written into a document: "Dies if with ≥150 clicks the CPA exceeds €17.40 or CTR is below 1% at 5,000 impressions. Continues if CPA ≤ €14". Nobody modifies it afterwards.'
            ),
            diagram: {
              kind: 'code',
              lang: 'criterio de decisión',
              lines: [
                { text: 'MATA si:', tone: 'bad' },
                { text: '  clics >= 150 AND CPA > 17.40', tone: 'bad' },
                { text: '  impresiones >= 5000 AND CTR < 1.0%', tone: 'bad' },
                { text: 'SIGUE si:', tone: 'good' },
                { text: '  clics >= 150 AND CPA <= 14.00', tone: 'good' },
                { text: 'AMPLIA TEST si:', tone: 'warn' },
                { text: '  CPA entre 14.00 y 17.40 -> nuevo creativo', tone: 'warn' },
              ],
            },
          },
          {
            label: bi('Paso 3 · Lanzar 3 creativos con presupuesto cerrado (días 2-5)', 'Step 3 · Launch 3 creatives with a closed budget (days 2-5)'),
            detail: bi(
              '3 creativos distintos (dolor/postura, comparación antes-después, testimonio) a 20 €/día cada uno. Total 240 € en 4 días. No se toca el presupuesto: tocarlo reinicia el aprendizaje.',
              '3 different creatives (pain/posture, before-after comparison, testimonial) at €20/day each. €240 total over 4 days. The budget is not touched: touching it restarts learning.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Creativo', 'Creative'), bi('Impresiones', 'Impressions'), bi('CTR', 'CTR'), bi('Clics', 'Clicks'), bi('Ventas', 'Sales')],
              rows: [
                ['A · dolor/postura', '6 240', '1,42%', '89', '1'],
                ['B · antes/después', '5 880', '1,91%', '112', '3'],
                ['C · testimonio', '4 100', '0,63%', '26', '0'],
              ],
              highlightRow: 1,
            },
          },
          {
            label: bi('Paso 4 · Leer los datos contra el criterio (día 6)', 'Step 4 · Read the data against the criterion (day 6)'),
            detail: bi(
              'Creativo C muere: CTR 0,63% con 4 100 impresiones, por debajo del 1% del criterio. Creativo A en zona gris (89 clics, falta muestra). Creativo B: CPA 80/3 = 26,67 €... hay que recalcular con el gasto real por creativo.',
              'Creative C dies: 0.63% CTR at 4,100 impressions, below the 1% criterion. Creative A in the grey zone (89 clicks, sample too small). Creative B: CPA 80/3 = €26.67... it must be recalculated with the real spend per creative.'
            ),
            diagram: {
              kind: 'bars',
              max: 26.67,
              unit: ' €',
              items: [
                { label: bi('CPA máx (margen)', 'Max CPA (margin)'), value: 17.4, tone: 'warn' },
                { label: bi('A · CPA real', 'A · real CPA'), value: 16.0, tone: 'good', note: bi('80 € / 5 ventas… 1 venta = 80 €', '80 € / 1 sale = €80') },
                { label: bi('B · CPA real', 'B · real CPA'), value: 13.33, tone: 'good', note: bi('40 € / 3 ventas', '€40 / 3 sales') },
                { label: bi('C · sin ventas', 'C · no sales'), value: 26.67, tone: 'bad', note: bi('40 € / 0 ventas', '€40 / 0 sales') },
              ],
            },
          },
          {
            label: bi('Paso 5 · Ejecutar la decisión y documentar (días 7-9)', 'Step 5 · Execute the decision and document it (days 7-9)'),
            detail: bi(
              'Se apaga C. Se deja A tres días más para llegar a 150 clics. B se mantiene y se le hacen 2 variantes del mismo ángulo. Resultado final de A: 158 clics, 2 ventas, CPA 42 € → muere. B: 214 clics, 6 ventas, CPA 11,67 € → sigue.',
              'C is turned off. A is left three more days to reach 150 clicks. B is kept and given 2 variants of the same angle. Final result for A: 158 clicks, 2 sales, CPA €42 → dies. B: 214 clicks, 6 sales, CPA €11.67 → continues.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Creativo', 'Creative'), bi('Clics', 'Clicks'), bi('Ventas', 'Sales'), bi('CPA', 'CPA'), bi('Decisión', 'Decision')],
              rows: [
                ['A · dolor/postura', '158', '2', '42,00 €', 'MUERE'],
                ['B · antes/después', '214', '6', '11,67 €', 'SIGUE'],
                ['C · testimonio', '26', '0', '—', 'MUERE (CTR)'],
              ],
              highlightRow: 1,
              note: bi('Gasto total del test: 296 €. Información comprada: qué ángulo funciona y cuál no.', 'Total test spend: €296. Information bought: which angle works and which does not.'),
            },
          },
        ],
        result: bi(
          'Con 296 € se descartó un producto que "parecía bueno" por un ángulo y se validó otro con CPA de 11,67 € sobre un margen de 17,40 €: 5,73 € de beneficio por pedido antes de fijos. Sin el criterio escrito, los tres se habrían mantenido "a ver".',
          'With €296 a product that "seemed good" was discarded for one angle and another was validated with an €11.67 CPA over a €17.40 margin: €5.73 of profit per order before fixed costs. Without the written criterion, all three would have been kept "to see".'
        ),
        selfCheck: {
          prompt: bi('¿Por qué el criterio de kill se escribió el día 1 y no el día 6?', 'Why was the kill criterion written on day 1 and not day 6?'),
          options: [
            opt('a', 'Porque el día 6 no hay tiempo', 'Because on day 6 there is no time'),
            opt('b', 'Porque después de gastar, el cerebro reinterpreta los números para justificar la inversión; el criterio previo elimina esa negociación', 'Because after spending, the brain reinterprets the numbers to justify the investment; the prior criterion removes that negotiation'),
            opt('c', 'Porque la plataforma publicitaria lo requiere', 'Because the ad platform requires it'),
            opt('d', 'Porque así se gasta menos', 'Because it spends less that way'),
          ],
          correctOptionId: 'b',
          explanation: bi('El criterio escrito antes es un contrato contigo mismo. El día 6, con 240 € gastados, "casi llega" se convierte en "una semana más" y el test no termina nunca.', 'The criterion written beforehand is a contract with yourself. On day 6, with €240 spent, "it almost makes it" becomes "one more week" and the test never ends.'),
        },
      },
    ],
    exercises: [
      {
        id: 'ec03-e01',
        format: 'concept',
        difficulty: 1,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Cuál es el objetivo real de un test de validación?', 'What is the real goal of a validation test?'),
        options: [
          opt('a', 'Conseguir las primeras ventas y beneficio', 'Get the first sales and profit'),
          opt('b', 'Comprar una decisión binaria (sigue / muere) al menor coste posible', 'Buy a binary decision (continue / kill) at the lowest possible cost'),
          opt('c', 'Que el algoritmo de la plataforma aprenda', 'Let the platform algorithm learn'),
          opt('d', 'Medir cuántos seguidores genera la marca', 'Measure how many followers the brand generates'),
        ],
        correctOptionId: 'b',
        explanation: bi('Un test que "casi" gana no es un fracaso: es información comprada barata. El fracaso real es no decidir y seguir gastando.', 'A test that "almost" wins is not a failure: it is cheaply bought information. The real failure is not deciding and continuing to spend.'),
        xp: 8,
      },
      {
        id: 'ec03-e02',
        format: 'numeric',
        difficulty: 2,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'CPA objetivo 14 € y quieres probar 4 creativos comprando 3 conversiones por creativo. ¿Cuál es el presupuesto mínimo del test?',
          'A €14 target CPA and you want to test 4 creatives buying 3 conversions each. What is the minimum test budget?'
        ),
        answer: 168,
        tolerance: 1,
        unit: '€',
        formula: bi('3 × 14 × 4', '3 × 14 × 4'),
        explanation: bi('3 conversiones × 14 € × 4 creativos = 168 €. En la práctica se añade un 20% de margen: ~200 €.', '3 conversions × €14 × 4 creatives = €168. In practice add a 20% buffer: ~€200.'),
        xp: 10,
      },
      {
        id: 'ec03-e03',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada señal de validación con dónde se comprueba.', 'Match each validation signal with where it is checked.'),
        pairs: [
          { leftId: 'l1', left: bi('Anuncios activos de competidores', 'Active competitor ads'), rightId: 'r1', right: bi('Biblioteca de anuncios y herramientas de spy', 'Ad library and spy tools') },
          { leftId: 'l2', left: bi('Volumen de búsqueda estable', 'Stable search volume'), rightId: 'r2', right: bi('Planificador de palabras clave y tendencias', 'Keyword planner and trends') },
          { leftId: 'l3', left: bi('Recencia de las reseñas', 'Review recency'), rightId: 'r3', right: bi('Marketplaces y tiendas rivales', 'Marketplaces and rival stores') },
          { leftId: 'l4', left: bi('Margen viable al precio de mercado', 'Viable margin at market price'), rightId: 'r4', right: bi('Comparativa de 3 competidores y tu COGS', 'Comparison of 3 competitors and your COGS') },
        ],
        explanation: bi('Las cuatro son comprobables en menos de una hora y no cuestan dinero. Se hacen antes de crear la tienda, no después.', 'All four are checkable in under an hour and cost nothing. They are done before creating the store, not after.'),
        xp: 12,
      },
      {
        id: 'ec03-e04',
        format: 'ordering',
        difficulty: 2,
        badge: bi('ORDENAR', 'ORDER'),
        prompt: bi('Ordena el proceso de validación completo.', 'Order the complete validation process.'),
        pieces: [
          { id: 'p1', text: bi('Comprobar demanda existente (anuncios, búsquedas, reseñas)', 'Check existing demand (ads, searches, reviews)') },
          { id: 'p2', text: bi('Calcular margen y CPA máximo sostenible', 'Compute margin and maximum sustainable CPA') },
          { id: 'p3', text: bi('Escribir el criterio de kill con umbrales y muestra mínima', 'Write the kill criterion with thresholds and minimum sample') },
          { id: 'p4', text: bi('Lanzar el test con presupuesto cerrado y varios ángulos', 'Launch the test with a closed budget and several angles') },
          { id: 'p5', text: bi('Ejecutar la decisión y documentar el resultado', 'Execute the decision and document the result') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        explanation: bi('El paso 3 va antes del 4 siempre. Quien escribe el criterio después de lanzar acaba escribiendo una justificación.', 'Step 3 always goes before step 4. Whoever writes the criterion after launching ends up writing a justification.'),
        xp: 10,
      },
      {
        id: 'ec03-e05',
        format: 'worked_why',
        difficulty: 3,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('En el ejemplo se probaron 3 ángulos distintos en vez de 3 variantes del mismo anuncio. ¿Por qué?', 'In the example 3 different angles were tested instead of 3 variants of the same ad. Why?'),
        options: [
          opt('a', 'Porque es más barato', 'Because it is cheaper'),
          opt('b', 'Porque si el ángulo es equivocado, todas sus variantes fallan: se aprende más de 3 hipótesis distintas que de 3 colores distintos', 'Because if the angle is wrong, all its variants fail: you learn more from 3 different hypotheses than from 3 different colours'),
          opt('c', 'Porque la plataforma lo recomienda', 'Because the platform recommends it'),
          opt('d', 'Porque así se llega antes a 150 clics', 'Because it reaches 150 clicks sooner'),
        ],
        correctOptionId: 'b',
        explanation: bi('El ángulo (dolor, comparación, prueba social) decide el 80% del resultado. El color y el texto fino deciden el resto. En validación se prueban ángulos; en optimización, variantes.', 'The angle (pain, comparison, social proof) decides 80% of the result. Colour and fine copy decide the rest. In validation you test angles; in optimisation, variants.'),
        xp: 12,
      },
      {
        id: 'ec03-e06',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Un creativo tuvo 5 200 impresiones y 68 clics. ¿Cuál es su CTR y supera el umbral del 1%?',
          'A creative had 5,200 impressions and 68 clicks. What is its CTR and does it beat the 1% threshold?'
        ),
        answer: 1.31,
        tolerance: 0.02,
        unit: '%',
        formula: bi('68 / 5 200 × 100', '68 / 5,200 × 100'),
        explanation: bi('68 / 5 200 = 1,31%, por encima del 1%. El hook funciona; si no vende, el problema está en la página, no en el anuncio.', '68 / 5,200 = 1.31%, above 1%. The hook works; if it does not sell, the problem is on the page, not in the ad.'),
        xp: 12,
      },
      {
        id: 'ec03-e07',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('Este test concluyó "el producto no funciona". ¿Qué está mal en el razonamiento?', 'This test concluded "the product does not work". What is wrong with the reasoning?'),
        lines: [
          { id: 'c1', text: 'presupuesto: 45 EUR, 1 solo creativo', tone: 'warn' },
          { id: 'c2', text: 'clics obtenidos: 38', tone: 'bad', label: bi('muestra insuficiente', 'insufficient sample') },
          { id: 'c3', text: 'ventas: 0', tone: 'warn' },
          { id: 'c4', text: 'decision: matar el producto', tone: 'bad' },
        ],
        correctLineId: 'c2',
        explanation: bi('Con una conversión del 2%, 38 clics dan 0,76 ventas esperadas. Cero ventas es el resultado más probable incluso con un producto bueno. La muestra mínima eran 150 clics.', 'At a 2% conversion, 38 clicks give 0.76 expected sales. Zero sales is the most likely outcome even with a good product. The minimum sample was 150 clicks.'),
        xp: 12,
      },
      {
        id: 'ec03-e08',
        format: 'output',
        difficulty: 3,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('Con estos datos y el criterio del ejemplo, ¿qué decisión toca?', 'With this data and the example criterion, what decision applies?'),
        diagram: {
          kind: 'table',
          head: [bi('Métrica', 'Metric'), bi('Valor', 'Value'), bi('Criterio', 'Criterion')],
          rows: [
            ['Clics', '163', '≥ 150 ✓'],
            ['CPA', '15,80 €', 'mata > 17,40 · sigue ≤ 14'],
            ['CTR', '1,6%', 'mata < 1% ✓'],
          ],
          highlightRow: 1,
        },
        options: [
          opt('a', 'Matar: el CPA es alto', 'Kill: the CPA is high'),
          opt('b', 'Seguir y escalar: ya es rentable', 'Continue and scale: it is already profitable'),
          opt('c', 'Zona gris: CPA entre 14 € y 17,40 €, así que se amplía el test con nuevos creativos del mismo ángulo', 'Grey zone: CPA between €14 and €17.40, so the test is extended with new creatives of the same angle'),
          opt('d', 'Bajar el precio para reducir el CPA', 'Lower the price to reduce the CPA'),
        ],
        correctOptionId: 'c',
        explanation: bi('15,80 € está por debajo del máximo (17,40 €) pero por encima del objetivo (14 €). No se mata ni se escala: se itera el creativo del ángulo que ya funciona.', '€15.80 is below the maximum (€17.40) but above the target (€14). You neither kill nor scale: you iterate the creative of the angle that already works.'),
        xp: 12,
      },
      {
        id: 'ec03-e09',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos productos candidatos. (A) Margen 62%, sin anuncios activos de competidores. (B) Margen 38%, con 14 competidores anunciándose hace más de 30 días. ¿Cuál validas primero?',
          'Two candidate products. (A) 62% margin, no active competitor ads. (B) 38% margin, with 14 competitors advertising for over 30 days. Which do you validate first?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Producto', 'Product'), bi('Margen', 'Margin'), bi('Demanda probada', 'Proven demand'), bi('BE ROAS', 'BE ROAS')],
          rows: [
            ['A', '62%', 'ninguna', '1,61'],
            ['B', '38%', '14 anunciantes > 30 días', '2,63'],
          ],
          highlightRow: 1,
        },
        options: [
          opt('a', 'A, porque el margen es mucho mejor', 'A, because the margin is much better'),
          opt('b', 'B, porque la competencia activa es evidencia de demanda pagando; A puede ser un producto que nadie quiere', 'B, because active competition is evidence of paying demand; A may be a product nobody wants'),
          opt('c', 'Los dos a la vez con el mismo presupuesto', 'Both at once with the same budget'),
          opt('d', 'Ninguno hasta tener marca registrada', 'Neither until you have a registered brand'),
        ],
        correctOptionId: 'b',
        explanation: bi('Un margen del 62% sobre demanda cero da 0 €. La competencia sostenida es la prueba más cara y fiable de que hay dinero en esa categoría.', 'A 62% margin on zero demand gives €0. Sustained competition is the most expensive and reliable proof that there is money in that category.'),
        xp: 15,
      },
      {
        id: 'ec03-e10',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'Llevas 340 € gastados en un producto que "casi" llega al CPA objetivo. El criterio escrito decía matar a los 300 €. ¿Qué haces?',
          'You have spent €340 on a product that "almost" reaches the target CPA. The written criterion said kill at €300. What do you do?'
        ),
        options: [
          opt('a', 'Seguir 100 € más porque está cerca', 'Continue €100 more because it is close'),
          opt('b', 'Matarlo: el criterio se escribió precisamente para este momento, cuando el coste hundido empuja a continuar', 'Kill it: the criterion was written precisely for this moment, when sunk cost pushes you to continue'),
          opt('c', 'Bajar el presupuesto diario a 5 €', 'Lower the daily budget to €5'),
          opt('d', 'Cambiar el criterio a 400 €', 'Change the criterion to €400'),
        ],
        correctOptionId: 'b',
        explanation: bi('Modificar el criterio en caliente lo convierte en una justificación. Si quieres otro umbral, se escribe para el siguiente test, no para el que ya estás perdiendo.', 'Modifying the criterion in the heat of the moment turns it into a justification. If you want another threshold, write it for the next test, not for the one you are already losing.'),
        xp: 15,
      },
      {
        id: 'ec03-e11',
        format: 'faded',
        difficulty: 3,
        badge: bi('COMPLETAR', 'COMPLETE'),
        prompt: bi('Completa el documento de criterio de kill. Las dos primeras líneas ya están escritas.', 'Complete the kill-criterion document. The first two lines are already written.'),
        pieces: [
          { id: 'p1', text: bi('Margen de contribución: 17,40 € → CPA máximo 17,40 €', 'Contribution margin: €17.40 → maximum CPA €17.40') },
          { id: 'p2', text: bi('Muestra mínima: 150 clics por creativo', 'Minimum sample: 150 clicks per creative') },
          { id: 'p3', text: bi('MATA si CPA > 17,40 € con muestra cumplida', 'KILL if CPA > €17.40 with the sample met') },
          { id: 'p4', text: bi('MATA si CTR < 1% con 5 000 impresiones', 'KILL if CTR < 1% at 5,000 impressions') },
          { id: 'p5', text: bi('SIGUE si CPA ≤ 14 € · ZONA GRIS entre 14 € y 17,40 €', 'CONTINUE if CPA ≤ €14 · GREY ZONE between €14 and €17.40') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        lockedPieceIds: ['p1', 'p2'],
        explanation: bi('Un criterio sin zona gris obliga a decidir entre blanco y negro cuando los datos suelen estar en medio. Definirla evita tanto matar pronto como escalar mal.', 'A criterion without a grey zone forces a black-and-white decision when data is usually in between. Defining it avoids both killing early and scaling badly.'),
        xp: 12,
      },
      {
        id: 'ec03-e12',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Por qué la ausencia total de competencia suele ser mala señal en dropshipping?', 'Why is a total absence of competition usually a bad sign in dropshipping?'),
        options: [
          opt('a', 'Porque significa que el producto es ilegal', 'Because it means the product is illegal'),
          opt('b', 'Porque el mercado ya ha probado ese producto y no hay demanda suficiente, o el coste de educar al comprador se come el margen', 'Because the market has already tested that product and there is not enough demand, or the cost of educating the buyer eats the margin'),
          opt('c', 'Porque sin competencia no se puede fijar precio', 'Because without competition you cannot set a price'),
          opt('d', 'Porque las plataformas prohíben productos sin rivales', 'Because platforms forbid products without rivals'),
        ],
        correctOptionId: 'b',
        explanation: bi('Crear demanda cuesta varias veces más que capturar la existente. Con margen de dropshipping, educar al mercado es casi siempre inviable.', 'Creating demand costs several times more than capturing existing demand. With a dropshipping margin, educating the market is almost always unviable.'),
        xp: 20,
      },
      {
        id: 'ec03-e13',
        format: 'scenario',
        difficulty: 2,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi('Tienes 200 € y quieres validar tu primera idea. ¿Cómo los repartes?', 'You have €200 and want to validate your first idea. How do you split it?'),
        options: [
          opt('a', '200 € en un solo creativo durante 10 días', '€200 on a single creative for 10 days'),
          opt('b', '3-4 creativos de ángulos distintos con presupuesto diario cerrado y criterio escrito', '3-4 creatives of different angles with a closed daily budget and a written criterion'),
          opt('c', '100 € en anuncios y 100 € en una tienda premium', '€100 on ads and €100 on a premium store'),
          opt('d', '20 € al día durante 10 días sin plan', '€20 a day for 10 days with no plan'),
        ],
        correctOptionId: 'b',
        explanation: bi('Con 200 € la prioridad es aprender qué ángulo funciona. Concentrarlo en un solo creativo apuesta todo a una hipótesis sin contrastar.', 'With €200 the priority is learning which angle works. Concentrating it on one creative bets everything on an untested hypothesis.'),
        xp: 10,
      },
    ],
    recap: [
      bi('Validar es comprar una decisión binaria al menor coste, no buscar beneficio.', 'Validating is buying a binary decision at the lowest cost, not seeking profit.'),
      bi('El criterio de kill se escribe antes de gastar: umbrales, muestra mínima y zona gris.', 'The kill criterion is written before spending: thresholds, minimum sample and grey zone.'),
      bi('La competencia activa es evidencia de demanda; su ausencia suele ser ausencia de mercado.', 'Active competition is evidence of demand; its absence is usually an absence of market.'),
    ],
    actionMission: {
      id: 'mission-ecom-3',
      title: bi('Escribe el criterio de kill de tu próximo test', 'Write the kill criterion for your next test'),
      objective: bi('Redacta en una página el documento de decisión de tu próximo test de producto, con umbrales numéricos y muestra mínima.', 'Draft on one page the decision document for your next product test, with numeric thresholds and a minimum sample.'),
      steps: [
        bi('Calcula tu margen de contribución y deriva el CPA máximo y el objetivo.', 'Compute your contribution margin and derive the maximum and target CPA.'),
        bi('Fija la muestra mínima en clics e impresiones según tu conversión esperada.', 'Set the minimum sample in clicks and impressions according to your expected conversion.'),
        bi('Escribe las tres ramas: MATA, SIGUE y ZONA GRIS, cada una con su acción concreta.', 'Write the three branches: KILL, CONTINUE and GREY ZONE, each with its concrete action.'),
      ],
      proof: bi('El documento fechado antes del primer euro gastado, con los tres umbrales numéricos visibles.', 'The document dated before the first euro is spent, with the three numeric thresholds visible.'),
      affiliateToolSlug: 'minea-research',
      xpBonus: 25,
    },
  },

  /* ---------------------------------------------------------------- L4 -- */
  {
    slug: 'ecom-04-tienda-conversion',
    unitSlug: 'drop-unit-1',
    trackSlug: 'smart-dropshipping',
    orderIndex: 4,
    title: bi('Tienda que convierte en móvil', 'A store that converts on mobile'),
    outcome: bi(
      'Diagnosticarás fugas de conversión en la página de producto, la confianza y el checkout con métricas, no con gusto personal.',
      'You will diagnose conversion leaks on the product page, trust and checkout with metrics, not personal taste.'
    ),
    durationMin: 13,
    xpReward: 140,
    theory: [
      {
        id: 'ec04-t1',
        heading: bi('El embudo te dice dónde, no por qué', 'The funnel tells you where, not why'),
        body: bi(
          'Sesión → ficha de producto → añadir al carrito → iniciar checkout → compra. Cada salto tiene una tasa. La fuga grande señala la página culpable; para saber la causa hay que mirar la página, no el número.',
          'Session → product page → add to cart → start checkout → purchase. Every jump has a rate. The big leak points to the guilty page; to know the cause you have to look at the page, not the number.'
        ),
        diagram: {
          kind: 'funnel',
          stages: [
            { label: bi('Sesiones', 'Sessions'), value: 4200 },
            { label: bi('Ven la ficha', 'View the product page'), value: 3100, note: bi('74%', '74%') },
            { label: bi('Añaden al carrito', 'Add to cart'), value: 480, note: bi('15,5%', '15.5%') },
            { label: bi('Inician checkout', 'Start checkout'), value: 265, note: bi('55%', '55%') },
            { label: bi('Compran', 'Purchase'), value: 96, note: bi('36%', '36%') },
          ],
        },
        why: bi('Aquí la fuga grave es ficha → carrito (15,5%). Todo el trabajo va a la página de producto, no al checkout.', 'Here the serious leak is product page → cart (15.5%). All the work goes to the product page, not the checkout.'),
      },
      {
        id: 'ec04-t2',
        heading: bi('Tasas de referencia por etapa', 'Reference rates per stage'),
        body: bi(
          'Sirven para saber si tu número es normal o un problema. Fuera de estos rangos hay algo roto; dentro, la mejora es incremental y lenta.',
          'They tell you whether your number is normal or a problem. Outside these ranges something is broken; inside, improvement is incremental and slow.'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Etapa', 'Stage'), bi('Rango normal', 'Normal range'), bi('Señal de alarma', 'Alarm signal')],
          rows: [
            ['Ficha → carrito', '8-15%', '< 5%'],
            ['Carrito → checkout', '45-70%', '< 35%'],
            ['Checkout → compra', '30-55%', '< 20%'],
            ['Conversión total', '1,2-3%', '< 0,7%'],
          ],
          highlightRow: 3,
          note: bi('Con tráfico frío de publicidad, la conversión total por debajo del 0,7% rara vez es rentable.', 'With cold advertising traffic, total conversion below 0.7% is rarely profitable.'),
        },
      },
      {
        id: 'ec04-t3',
        heading: bi('Móvil primero: el 80% de tu tráfico', 'Mobile first: 80% of your traffic'),
        body: bi(
          'El tráfico de Meta y TikTok llega en móvil. Si la ficha tarda más de 3 segundos o el botón de compra exige desplazar, pierdes la venta antes de que el usuario lea nada. Se diseña en móvil y se comprueba en escritorio después.',
          'Meta and TikTok traffic arrives on mobile. If the product page takes over 3 seconds or the buy button requires scrolling, you lose the sale before the user reads anything. Design on mobile and check desktop afterwards.'
        ),
        diagram: {
          kind: 'bars',
          max: 5,
          unit: ' s',
          items: [
            { label: bi('Carga 1,5 s', 'Load 1.5 s'), value: 1.5, tone: 'good', note: bi('conversión base', 'baseline conversion') },
            { label: bi('Carga 3 s', 'Load 3 s'), value: 3, tone: 'warn', note: bi('−20% de conversión', '−20% conversion') },
            { label: bi('Carga 5 s', 'Load 5 s'), value: 5, tone: 'bad', note: bi('−40% de conversión', '−40% conversion') },
          ],
        },
      },
      {
        id: 'ec04-t4',
        heading: bi('Confianza: lo que el usuario comprueba antes de pagar', 'Trust: what the user checks before paying'),
        body: bi(
          'Con tráfico frío y una marca desconocida, el usuario busca cuatro cosas: qué recibe exactamente, cuándo le llega, qué pasa si está mal y si alguien responde. Si una falta, el carrito se abandona aunque el producto guste.',
          'With cold traffic and an unknown brand, the user looks for four things: what exactly they receive, when it arrives, what happens if it is wrong and whether anyone responds. If one is missing, the cart is abandoned even if they like the product.'
        ),
        diagram: {
          kind: 'layers',
          layers: [
            { label: bi('Qué recibo exactamente', 'What exactly do I receive'), note: bi('fotos reales, medidas, contenido de la caja', 'real photos, measurements, box contents'), tone: 'info' },
            { label: bi('Cuándo me llega', 'When does it arrive'), note: bi('plazo real por país, no "5-7 días laborables" genérico', 'real timeframe per country, not a generic "5-7 working days"'), tone: 'info' },
            { label: bi('Qué pasa si está mal', 'What happens if it is wrong'), note: bi('devoluciones en lenguaje claro, con el coste', 'returns in plain language, with the cost'), tone: 'warn' },
            { label: bi('Hay alguien detrás', 'There is someone behind it'), note: bi('email real, dirección fiscal, respuesta en menos de 24 h', 'real email, registered address, response within 24 h'), tone: 'good' },
          ],
        },
      },
    ],
    examples: [
      {
        id: 'ec04-ex1',
        title: bi('Ejemplo resuelto: de 0,8% a 2,1% de conversión sin tocar los anuncios', 'Worked example: from 0.8% to 2.1% conversion without touching the ads'),
        situation: bi(
          'Tienda de accesorios de cocina con 4 200 sesiones al mes, tráfico de Meta y una conversión del 0,8%. El ROAS es 1,9 con un BE de 2,4: pierde dinero. El CPA es razonable, así que el problema no es el anuncio.',
          'A kitchen accessories store with 4,200 sessions a month, Meta traffic and a 0.8% conversion. ROAS is 1.9 against a BE of 2.4: it loses money. The CPA is reasonable, so the problem is not the ad.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Localizar la fuga en el embudo', 'Step 1 · Locate the leak in the funnel'),
            detail: bi(
              'Ficha → carrito: 6,1% (rango normal 8-15%). Carrito → checkout: 58% (normal). Checkout → compra: 41% (normal). La fuga está claramente en la página de producto.',
              'Product page → cart: 6.1% (normal range 8-15%). Cart → checkout: 58% (normal). Checkout → purchase: 41% (normal). The leak is clearly on the product page.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Etapa', 'Stage'), bi('Actual', 'Current'), bi('Rango', 'Range'), bi('Estado', 'Status')],
              rows: [
                ['Ficha → carrito', '6,1%', '8-15%', 'FUGA'],
                ['Carrito → checkout', '58%', '45-70%', 'normal'],
                ['Checkout → compra', '41%', '30-55%', 'normal'],
              ],
              highlightRow: 0,
            },
          },
          {
            label: bi('Paso 2 · Abrir la ficha en móvil y cronometrar', 'Step 2 · Open the product page on mobile and time it'),
            detail: bi(
              'Carga en 4,6 s (vídeo de 18 MB sin comprimir). El botón de compra queda debajo del pliegue y hay que desplazar. Las fotos son las del proveedor, sobre fondo blanco, sin escala ni contexto de uso.',
              'Loads in 4.6 s (an 18 MB uncompressed video). The buy button is below the fold and requires scrolling. The photos are the supplier, on a white background, with no scale or context of use.'
            ),
            diagram: {
              kind: 'bars',
              max: 4.6,
              unit: ' s',
              items: [
                { label: bi('Carga actual', 'Current load'), value: 4.6, tone: 'bad' },
                { label: bi('Objetivo móvil', 'Mobile target'), value: 2.0, tone: 'good' },
              ],
            },
          },
          {
            label: bi('Paso 3 · Tres cambios concretos, uno por semana', 'Step 3 · Three concrete changes, one per week'),
            detail: bi(
              'Semana 1: comprimir el vídeo a 3,2 MB y servir las imágenes en WebP. Semana 2: rehacer las 5 primeras fotos con el producto en uso y una mano al lado para dar escala. Semana 3: añadir bloque de confianza con plazo real por país y política de devolución en una línea.',
              'Week 1: compress the video to 3.2 MB and serve images in WebP. Week 2: redo the first 5 photos with the product in use and a hand next to it for scale. Week 3: add a trust block with the real timeframe per country and a one-line return policy.'
            ),
            diagram: {
              kind: 'timeline',
              steps: [
                { label: bi('Semana 1', 'Week 1'), value: 'velocidad', tone: 'info' },
                { label: bi('Semana 2', 'Week 2'), value: 'fotos reales', tone: 'info' },
                { label: bi('Semana 3', 'Week 3'), value: 'confianza', tone: 'good' },
              ],
            },
          },
          {
            label: bi('Paso 4 · Medir cada cambio por separado', 'Step 4 · Measure each change separately'),
            detail: bi(
              'Un cambio por semana permite atribuir el efecto. Velocidad: ficha → carrito sube a 8,4%. Fotos: sube a 11,2%. Bloque de confianza: sube a 13,9% y baja el abandono de carrito de 42% a 36%.',
              'One change per week allows attribution. Speed: product page → cart rises to 8.4%. Photos: rises to 11.2%. Trust block: rises to 13.9% and cart abandonment drops from 42% to 36%.'
            ),
            diagram: {
              kind: 'bars',
              max: 15,
              unit: '%',
              items: [
                { label: bi('Antes', 'Before'), value: 6.1, tone: 'bad' },
                { label: bi('+ velocidad', '+ speed'), value: 8.4, tone: 'warn' },
                { label: bi('+ fotos reales', '+ real photos'), value: 11.2, tone: 'info' },
                { label: bi('+ confianza', '+ trust'), value: 13.9, tone: 'good' },
              ],
            },
          },
          {
            label: bi('Paso 5 · Recalcular el negocio con la nueva conversión', 'Step 5 · Recalculate the business with the new conversion'),
            detail: bi(
              'Conversión total: 0,8% → 2,1%. Pedidos: 34 → 88 al mes con el mismo tráfico. El CPA baja de 26 € a 10 € porque el mismo gasto produce más compras. ROAS real: 1,9 → 4,6 con un BE de 2,4.',
              'Total conversion: 0.8% → 2.1%. Orders: 34 → 88 a month with the same traffic. CPA drops from €26 to €10 because the same spend produces more purchases. Real ROAS: 1.9 → 4.6 against a BE of 2.4.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Métrica', 'Metric'), bi('Antes', 'Before'), bi('Después', 'After')],
              rows: [
                ['Conversión total', '0,8%', '2,1%'],
                ['Pedidos/mes', '34', '88'],
                ['CPA', '26,00 €', '10,00 €'],
                ['ROAS real', '1,9', '4,6'],
                ['Beneficio/mes', '−268 €', '+1 012 €'],
              ],
              highlightRow: 4,
            },
          },
        ],
        result: bi(
          'De perder 268 € a ganar 1 012 € al mes sin cambiar un solo anuncio ni subir el presupuesto. La palanca estaba en la página, y el embudo dijo exactamente en qué parte.',
          'From losing €268 to earning €1,012 a month without changing a single ad or raising the budget. The lever was on the page, and the funnel said exactly which part.'
        ),
        selfCheck: {
          prompt: bi('¿Por qué se hicieron los cambios de uno en uno y por semanas?', 'Why were the changes made one at a time over weeks?'),
          options: [
            opt('a', 'Porque el equipo no daba para más', 'Because the team could not do more'),
            opt('b', 'Porque así se puede atribuir la subida a un cambio concreto y repetir lo que funciona en otros productos', 'Because that way the rise can be attributed to a concrete change and what works can be repeated on other products'),
            opt('c', 'Porque la plataforma lo exige', 'Because the platform requires it'),
            opt('d', 'Porque los usuarios se acostumbran despacio', 'Because users get used to it slowly'),
          ],
          correctOptionId: 'b',
          explanation: bi('Cambiar las tres cosas a la vez da un número mejor pero ninguna explicación. Saber que las fotos reales aportaron +2,8 puntos es lo que se aplica a los otros 12 productos.', 'Changing all three at once gives a better number but no explanation. Knowing that real photos contributed +2.8 points is what gets applied to the other 12 products.'),
        },
      },
    ],
    exercises: [
      {
        id: 'ec04-e01',
        format: 'numeric',
        difficulty: 1,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          '3 800 sesiones, 252 añadir al carrito y 71 compras. ¿Cuál es la tasa de conversión total en porcentaje?',
          '3,800 sessions, 252 add-to-cart and 71 purchases. What is the total conversion rate as a percentage?'
        ),
        answer: 1.87,
        tolerance: 0.03,
        unit: '%',
        formula: bi('71 / 3 800 × 100', '71 / 3,800 × 100'),
        explanation: bi('71 / 3 800 = 1,87%, dentro del rango normal de 1,2-3%. La conversión no es el problema; habría que mirar el AOV o el CPA.', '71 / 3,800 = 1.87%, inside the normal 1.2-3% range. Conversion is not the problem; you would have to look at AOV or CPA.'),
        xp: 8,
      },
      {
        id: 'ec04-e02',
        format: 'concept',
        difficulty: 1,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Qué te dice el embudo de conversión y qué no te dice?', 'What does the conversion funnel tell you and what does it not tell you?'),
        options: [
          opt('a', 'Te dice dónde se pierde la gente y también por qué', 'It tells you where people are lost and also why'),
          opt('b', 'Te dice en qué etapa se pierde la gente, pero la causa hay que buscarla mirando esa página', 'It tells you at which stage people are lost, but the cause must be found by looking at that page'),
          opt('c', 'Te dice el beneficio por etapa', 'It tells you the profit per stage'),
          opt('d', 'No sirve para nada si no hay ventas', 'It is useless if there are no sales'),
        ],
        correctOptionId: 'b',
        explanation: bi('El embudo localiza; la página explica. Saltarse el segundo paso lleva a "mejorar" una etapa que ya estaba en rango normal.', 'The funnel locates; the page explains. Skipping the second step leads to "improving" a stage that was already in the normal range.'),
        xp: 8,
      },
      {
        id: 'ec04-e03',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada fuga del embudo con su causa más probable.', 'Match each funnel leak with its most likely cause.'),
        pairs: [
          { leftId: 'l1', left: bi('Mucha sesión, pocos ven la ficha', 'Many sessions, few see the product page'), rightId: 'r1', right: bi('El anuncio no coincide con la landing o la carga es lenta', 'The ad does not match the landing or the load is slow') },
          { leftId: 'l2', left: bi('Ven la ficha pero no añaden al carrito', 'They see the product page but do not add to cart'), rightId: 'r2', right: bi('Fotos pobres, sin escala ni caso de uso, botón fuera de pantalla', 'Poor photos, no scale or use case, button off-screen') },
          { leftId: 'l3', left: bi('Añaden al carrito pero no inician checkout', 'They add to cart but do not start checkout'), rightId: 'r3', right: bi('Envío sorpresa o plazo de entrega no creíble', 'Surprise shipping or an unbelivable delivery timeframe') },
          { leftId: 'l4', left: bi('Inician checkout pero no compran', 'They start checkout but do not buy'), rightId: 'r4', right: bi('Métodos de pago faltantes, formulario largo o desconfianza final', 'Missing payment methods, a long form or last-moment distrust') },
        ],
        explanation: bi('Cada fuga tiene un culpable distinto. Arreglar el checkout cuando la fuga está en la ficha no mueve el número.', 'Each leak has a different culprit. Fixing the checkout when the leak is on the product page does not move the number.'),
        xp: 12,
      },
      {
        id: 'ec04-e04',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Ficha → carrito 6,1%, carrito → checkout 58%, checkout → compra 41%. ¿Cuál es la conversión total desde la ficha de producto, en porcentaje?',
          'Product page → cart 6.1%, cart → checkout 58%, checkout → purchase 41%. What is the total conversion from the product page, as a percentage?'
        ),
        answer: 1.45,
        tolerance: 0.03,
        unit: '%',
        formula: bi('0,061 × 0,58 × 0,41 × 100', '0.061 × 0.58 × 0.41 × 100'),
        explanation: bi('0,061 × 0,58 × 0,41 = 0,0145 = 1,45%. Las tasas se multiplican, no se suman: por eso una fuga del 6% arrastra todo el embudo.', '0.061 × 0.58 × 0.41 = 0.0145 = 1.45%. Rates multiply, they do not add: that is why a 6% leak drags the whole funnel.'),
        xp: 12,
      },
      {
        id: 'ec04-e05',
        format: 'worked_why',
        difficulty: 3,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('En el ejemplo las fotos con una mano al lado subieron la conversión más que el bloque de confianza. ¿Por qué importa la escala?', 'In the example the photos with a hand next to the product raised conversion more than the trust block. Why does scale matter?'),
        options: [
          opt('a', 'Porque las fotos con personas siempre convierten más', 'Because photos with people always convert more'),
          opt('b', 'Porque en frío el usuario no puede imaginar el tamaño real, y esa incertidumbre se resuelve abandonando el carrito', 'Because in cold traffic the user cannot imagine the real size, and that uncertainty is resolved by abandoning the cart'),
          opt('c', 'Porque el algoritmo premia las fotos con manos', 'Because the algorithm rewards photos with hands'),
          opt('d', 'Porque reducen el peso de la página', 'Because they reduce the page weight'),
        ],
        correctOptionId: 'b',
        explanation: bi('La foto del proveedor sobre fondo blanco no da escala ni contexto de uso. El usuario no sabe si cabe en su cocina: la duda se resuelve no comprando.', 'The supplier photo on a white background gives no scale or use context. The user does not know if it fits their kitchen: the doubt is resolved by not buying.'),
        xp: 12,
      },
      {
        id: 'ec04-e06',
        format: 'output',
        difficulty: 3,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('¿Qué conclusión sacas de estos datos?', 'What conclusion do you draw from this data?'),
        diagram: {
          kind: 'table',
          head: [bi('Dispositivo', 'Device'), bi('Sesiones', 'Sessions'), bi('Conversión', 'Conversion'), bi('Carga', 'Load')],
          rows: [
            ['Móvil', '3 480 (83%)', '0,9%', '4,6 s'],
            ['Escritorio', '720 (17%)', '3,4%', '1,4 s'],
          ],
          highlightRow: 0,
        },
        options: [
          opt('a', 'Que el escritorio convierte mejor y hay que invertir ahí', 'That desktop converts better and you should invest there'),
          opt('b', 'Que el móvil tiene un problema de rendimiento: 83% del tráfico con la mitad de conversión y 3,3 s más de carga', 'That mobile has a performance problem: 83% of the traffic with half the conversion and 3.3 s more load'),
          opt('c', 'Que el tráfico móvil es de peor calidad', 'That mobile traffic is of lower quality'),
          opt('d', 'Que hay que rediseñar la versión de escritorio', 'That the desktop version needs redesigning'),
        ],
        correctOptionId: 'b',
        explanation: bi('La diferencia de carga explica casi toda la diferencia de conversión. Arreglar el móvil afecta al 83% del tráfico: es la palanca más grande disponible.', 'The load difference explains almost all of the conversion difference. Fixing mobile affects 83% of the traffic: it is the largest lever available.'),
        xp: 12,
      },
      {
        id: 'ec04-e07',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('El abandono de carrito subió del 38% al 61% sin cambiar nada en la ficha. ¿Qué es lo más probable?', 'Cart abandonment rose from 38% to 61% without changing anything on the product page. What is most likely?'),
        lines: [
          { id: 'c1', text: 'ficha_producto: sin cambios, carga 1.8 s', tone: 'good' },
          { id: 'c2', text: 'envio_gratis_umbral: subido de 25 EUR a 49 EUR', tone: 'bad', label: bi('sospechoso', 'suspect') },
          { id: 'c3', text: 'checkout: 3 campos, pago con tarjeta y PayPal', tone: 'good' },
          { id: 'c4', text: 'precio_producto: 32.90 EUR sin cambios', tone: 'good' },
        ],
        correctLineId: 'c2',
        explanation: bi('Con AOV de 32,90 €, subir el umbral de envío gratis a 49 € convierte el envío en sorpresa en el carrito. Es la causa nº1 de abandono: el coste aparece tarde.', 'With an AOV of €32.90, raising the free-shipping threshold to €49 turns shipping into a surprise in the cart. It is the number one cause of abandonment: the cost appears late.'),
        xp: 12,
      },
      {
        id: 'ec04-e08',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos tiendas con conversión baja. (A) 1,1% con AOV de 22 €. (B) 1,1% con AOV de 68 €. Ambas con el mismo CPA de 18 €. ¿Cuál tiene un problema más grave?',
          'Two stores with low conversion. (A) 1.1% with a €22 AOV. (B) 1.1% with a €68 AOV. Both with the same €18 CPA. Which has the more serious problem?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Tienda', 'Store'), bi('AOV', 'AOV'), bi('Margen 45%', '45% margin'), bi('CPA', 'CPA'), bi('Resultado', 'Result')],
          rows: [
            ['A', '22 €', '9,90 €', '18 €', '−8,10 €'],
            ['B', '68 €', '30,60 €', '18 €', '+12,60 €'],
          ],
          highlightRow: 0,
        },
        options: [
          opt('a', 'Las dos igual, tienen la misma conversión', 'Both the same, they have the same conversion'),
          opt('b', 'A, porque su margen no cubre el CPA y pierde 8,10 € por pedido; B gana 12,60 € con la misma conversión', 'A, because its margin does not cover the CPA and it loses €8.10 per order; B earns €12.60 with the same conversion'),
          opt('c', 'B, porque tiene más tráfico que convertir', 'B, because it has more traffic to convert'),
          opt('d', 'Ninguna, 1,1% es aceptable', 'Neither, 1.1% is acceptable'),
        ],
        correctOptionId: 'b',
        explanation: bi('La conversión no se juzga sola: se juzga contra el margen y el CPA. La misma tasa puede ser rentable o ruina según el AOV.', 'Conversion is not judged alone: it is judged against margin and CPA. The same rate can be profitable or ruinous depending on AOV.'),
        xp: 15,
      },
      {
        id: 'ec04-e09',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'Tu ficha convierte al 7% (rango 8-15%) y el checkout al 33% (rango 30-55%). Tienes 10 horas de trabajo. ¿Dónde las inviertes?',
          'Your product page converts at 7% (range 8-15%) and checkout at 33% (range 30-55%). You have 10 hours of work. Where do you invest them?'
        ),
        options: [
          opt('a', 'En el checkout, porque 33% es bajo', 'In the checkout, because 33% is low'),
          opt('b', 'En la ficha de producto: está por debajo del rango mínimo y es la etapa que más multiplica sobre todo lo demás', 'In the product page: it is below the minimum range and it is the stage that multiplies the most over everything else'),
          opt('c', 'Repartidas a la mitad', 'Split in half'),
          opt('d', 'En los anuncios, para traer más tráfico', 'In the ads, to bring more traffic'),
        ],
        correctOptionId: 'b',
        explanation: bi('El checkout está dentro del rango; la ficha está fuera. Además, la ficha multiplica: cada punto que gana se propaga por todas las etapas siguientes.', 'The checkout is inside the range; the product page is outside. Also, the product page multiplies: every point it gains propagates through all the following stages.'),
        xp: 15,
      },
      {
        id: 'ec04-e10',
        format: 'ordering',
        difficulty: 2,
        badge: bi('ORDENAR', 'ORDER'),
        prompt: bi('Ordena la auditoría de una ficha de producto en móvil.', 'Order the audit of a product page on mobile.'),
        pieces: [
          { id: 'p1', text: bi('Cronometrar la carga con 4G real', 'Time the load with real 4G') },
          { id: 'p2', text: bi('Comprobar si el botón de compra es visible sin desplazar', 'Check whether the buy button is visible without scrolling') },
          { id: 'p3', text: bi('Revisar si las 3 primeras fotos dan escala y caso de uso', 'Review whether the first 3 photos give scale and use case') },
          { id: 'p4', text: bi('Verificar que el plazo de envío y la devolución están visibles', 'Verify the delivery timeframe and returns are visible') },
          { id: 'p5', text: bi('Confirmar que el precio mostrado incluye todo lo que se cobrará', 'Confirm the displayed price includes everything that will be charged') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        explanation: bi('Es el orden en que el usuario se encuentra los problemas: primero la espera, luego el botón, luego la duda sobre el producto y al final la sorpresa del precio.', 'It is the order in which the user meets the problems: first the wait, then the button, then the doubt about the product and finally the price surprise.'),
        xp: 10,
      },
      {
        id: 'ec04-e11',
        format: 'numeric',
        difficulty: 4,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Subes la conversión de ficha → carrito del 6,1% al 13,9% manteniendo el resto igual (58% y 41%). ¿Cuánto sube la conversión total en puntos porcentuales?',
          'You raise product page → cart conversion from 6.1% to 13.9% keeping the rest the same (58% and 41%). How much does total conversion rise in percentage points?'
        ),
        answer: 1.85,
        tolerance: 0.05,
        unit: 'puntos',
        formula: bi('(0,139 − 0,061) × 0,58 × 0,41 × 100', '(0.139 − 0.061) × 0.58 × 0.41 × 100'),
        explanation: bi('Antes 1,45%, después 3,30%. Subida de 1,85 puntos, un 128% más. Es el efecto multiplicador de arreglar la primera fuga.', 'Before 1.45%, after 3.30%. A rise of 1.85 points, 128% more. That is the multiplier effect of fixing the first leak.'),
        xp: 15,
      },
      {
        id: 'ec04-e12',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Por qué mostrar el coste de envío en la ficha mejora la conversión aunque asuste a algunos usuarios?', 'Why does showing the shipping cost on the product page improve conversion even though it scares some users?'),
        options: [
          opt('a', 'Porque el envío barato convierte más', 'Because cheap shipping converts more'),
          opt('b', 'Porque elimina la sorpresa en el carrito: los que se van, se habrían ido igual, y los que se quedan compran con más confianza', 'Because it removes the surprise in the cart: those who leave would have left anyway, and those who stay buy with more confidence'),
          opt('c', 'Porque mejora el SEO de la ficha', 'Because it improves the product page SEO'),
          opt('d', 'Porque reduce las devoluciones', 'Because it reduces returns'),
        ],
        correctOptionId: 'b',
        explanation: bi('El coste oculto no desaparece por esconderlo: aparece en el peor momento, cuando el usuario ya ha decidido comprar. Ahí se vive como engaño y se abandona.', 'The hidden cost does not disappear by hiding it: it appears at the worst moment, when the user has already decided to buy. There it is experienced as deception and the cart is abandoned.'),
        xp: 20,
      },
      {
        id: 'ec04-e13',
        format: 'scenario',
        difficulty: 2,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi('Abres tu tienda por primera vez. ¿Qué revisas antes de lanzar tráfico?', 'You open your store for the first time. What do you check before launching traffic?'),
        options: [
          opt('a', 'El logo y los colores de la marca', 'The logo and the brand colours'),
          opt('b', 'La ficha en móvil: carga, botón visible sin desplazar, fotos con escala y plazo de envío real', 'The product page on mobile: load, visible button without scrolling, photos with scale and a real delivery timeframe'),
          opt('c', 'El texto legal de la página de inicio', 'The legal text on the home page'),
          opt('d', 'El número de productos del catálogo', 'The number of products in the catalogue'),
        ],
        correctOptionId: 'b',
        explanation: bi('El 80% del tráfico llega en móvil y aterriza en la ficha. Es la única pantalla que casi todo el mundo ve: se revisa primero y en el dispositivo real.', '80% of traffic arrives on mobile and lands on the product page. It is the only screen almost everybody sees: it is checked first and on the real device.'),
        xp: 10,
      },
    ],
    recap: [
      bi('El embudo localiza la fuga; la página explica la causa. Las tasas se multiplican entre etapas.', 'The funnel locates the leak; the page explains the cause. Rates multiply between stages.'),
      bi('Móvil primero: carga por debajo de 3 s, botón visible sin desplazar y fotos con escala real.', 'Mobile first: load under 3 s, button visible without scrolling and photos with real scale.'),
      bi('La confianza son cuatro respuestas: qué recibo, cuándo, qué pasa si falla y quién responde.', 'Trust is four answers: what do I get, when, what if it fails and who responds.'),
    ],
    actionMission: {
      id: 'mission-ecom-4',
      title: bi('Audita tu ficha en móvil y cronometra', 'Audit your product page on mobile and time it'),
      objective: bi('Haz la auditoría completa de tu ficha de producto principal en un móvil real y corrige la fuga más grande que encuentres.', 'Do the full audit of your main product page on a real mobile and fix the largest leak you find.'),
      steps: [
        bi('Cronometra la carga con datos móviles, no con wifi, y anota el resultado.', 'Time the load with mobile data, not wifi, and note the result.'),
        bi('Comprueba botón visible sin desplazar, escala en las fotos y plazo de envío real por país.', 'Check the button is visible without scrolling, scale in the photos and a real per-country delivery timeframe.'),
        bi('Corrige una sola cosa esta semana y mide la tasa ficha → carrito antes y después.', 'Fix one single thing this week and measure the product page to cart rate before and after.'),
      ],
      proof: bi('Dos capturas en móvil (antes y después) y las dos tasas de ficha → carrito con sus fechas.', 'Two mobile screenshots (before and after) and the two product page → cart rates with their dates.'),
      affiliateToolSlug: 'shopify-starter',
      xpBonus: 25,
    },
  },
];

export const ECOM_UNIT_1: Unit = {
  slug: 'drop-unit-1',
  trackSlug: 'smart-dropshipping',
  orderIndex: 1,
  title: bi('Números primero', 'Numbers first'),
  description: bi(
    'Unit economics, BE ROAS y validación con datos. Lo que separa una tienda que gana dinero de una que factura mucho y pierde.',
    'Unit economics, BE ROAS and data-driven validation. What separates a store that makes money from one that bills a lot and loses.'
  ),
  lessons: LESSONS,
};
