import { bi, opt } from '@/lib/curriculum/authoring';
import { Lesson, Unit } from '@/lib/curriculum/types';

/* ==========================================================================
   DIGITAL AGENCY B2B · Unit 2 — Del contacto al cliente recurrente
   ========================================================================== */

const LESSONS: Lesson[] = [
  /* ---------------------------------------------------------------- L5 -- */
  {
    slug: 'agency-05-senales-listas',
    unitSlug: 'agency-unit-2',
    trackSlug: 'digital-agency',
    orderIndex: 1,
    title: bi('Listas y señales: de 1% a 8% de respuesta', 'Lists and signals: from 1% to 8% reply rate'),
    outcome: bi(
      'Elegirás la fuente de lista por coste por reunión y calcularás cuántos contactos caben en tu capacidad real de envío.',
      'You will choose the list source by cost per meeting and calculate how many contacts fit in your real sending capacity.'
    ),
    durationMin: 14,
    xpReward: 150,
    theory: [
      {
        id: 'ag05-t1',
        heading: bi('Tu capacidad de envío fija el tamaño de la lista, no al revés', 'Your sending capacity sets the list size, not the other way round'),
        body: bi(
          'Comprar 20 000 contactos sin mirar la capacidad es el error más caro. Los envíos se calculan hacia atrás: buzones por 25 al día, por días laborables, dividido entre los toques de la secuencia. Ese número es tu lista mensual máxima.',
          'Buying 20,000 contacts without looking at capacity is the most expensive mistake. Sends are calculated backwards: mailboxes times 25 a day, times working days, divided by the touches in the sequence. That number is your maximum monthly list.'
        ),
        diagram: {
          kind: 'equation',
          tokens: [
            { text: 'buzones × 25', tone: 'good' },
            { text: '×' },
            { text: '21 días', tone: 'info' },
            { text: '÷' },
            { text: 'toques', tone: 'warn' },
          ],
          result: { text: '= contactos/mes', tone: 'info' },
        },
        why: bi('4 buzones y 5 toques dan 420 contactos al mes. Todo lo que compres por encima se queda sin enviar.', '4 mailboxes and 5 touches give 420 contacts a month. Everything you buy above that sits unsent.'),
      },
      {
        id: 'ag05-t2',
        heading: bi('La señal multiplica la respuesta por cinco', 'The signal multiplies the reply rate by five'),
        body: bi(
          'Las campañas disparadas por una señal concreta responden un 73% más que las frías. La diferencia entre una lista sin contexto y una lista de cambio de puesto reciente es de 1-2% frente a 6-10% de respuesta: el mismo texto, el mismo buzón, cinco veces más resultado.',
          'Signal-triggered campaigns reply 73% more than cold ones. The difference between a list with no context and a recent job-change list is 1-2% versus 6-10% reply rate: same text, same mailbox, five times the result.'
        ),
        diagram: {
          kind: 'bars',
          max: 10,
          unit: '%',
          items: [
            { label: bi('Lista fría sin señal', 'Cold list, no signal'), value: 2, tone: 'bad', note: bi('1-2%', '1-2%') },
            { label: bi('Contratación abierta', 'Open hiring'), value: 3, tone: 'warn', note: bi('2-4%', '2-4%') },
            { label: bi('Financiación hace <4 semanas', 'Funded <4 weeks ago'), value: 4, tone: 'warn', note: bi('3-5%', '3-5%') },
            { label: bi('Reseña o baja de competidor', 'Competitor review or churn'), value: 6, tone: 'info', note: bi('4-7%', '4-7%') },
            { label: bi('Visitó tu página de precios', 'Visited your pricing page'), value: 7, tone: 'good', note: bi('5-8%', '5-8%') },
            { label: bi('Cambió de puesto hace 30 días', 'Changed job 30 days ago'), value: 8, tone: 'good', note: bi('6-10%', '6-10%') },
          ],
        },
      },
      {
        id: 'ag05-t3',
        heading: bi('Se compara por coste por reunión, no por coste por contacto', 'You compare by cost per meeting, not cost per contact'),
        body: bi(
          'Un contacto a 0,30 € parece cinco veces más barato que uno a 1,50 €. Pero si el primero responde al 1,5% y el segundo al 8%, la reunión del barato cuesta más. El denominador correcto es la reunión agendada, que es lo que produce ingreso.',
          'A contact at €0.30 looks five times cheaper than one at €1.50. But if the first replies at 1.5% and the second at 8%, the cheap one meeting costs more. The right denominator is the booked meeting, which is what produces revenue.'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Fuente', 'Source'), bi('€/contacto', '€/contact'), bi('Respuesta', 'Reply'), bi('€/reunión', '€/meeting')],
          rows: [
            ['Lista fría', '0,30 €', '1,5%', '80 €'],
            ['Visita a precios', '1,90 €', '6,5%', '117 €'],
            ['Cambio de puesto', '1,20 €', '8,0%', '60 €'],
          ],
          highlightRow: 2,
          note: bi('A 25% de conversión de respuesta a reunión. La fuente más cara por contacto no es la más cara por reunión, y la más barata tampoco.', 'At 25% reply-to-meeting conversion. The most expensive source per contact is not the most expensive per meeting, and the cheapest is not either.'),
        },
      },
      {
        id: 'ag05-t4',
        heading: bi('Lista sin verificar = rebote alto = dominio quemado', 'Unverified list = high bounce = burnt domain'),
        body: bi(
          'Las listas compradas sin verificar rebotan entre el 5% y el 12%. Un rebote duro repetido le dice al proveedor que envías a direcciones que no existen, y eso baja la reputación del dominio entero. Se verifica siempre antes de cargar la lista, y el objetivo es un rebote por debajo del 2%.',
          'Purchased unverified lists bounce between 5% and 12%. A repeated hard bounce tells the provider you are sending to addresses that do not exist, and that lowers the reputation of the whole domain. Always verify before loading the list, and aim for a bounce below 2%.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('Sin verificar', 'Unverified'),
            tone: 'bad',
            items: [
              bi('Rebote 5-12%', 'Bounce 5-12%'),
              bi('5 000 contactos → 400 rebotes duros', '5,000 contacts → 400 hard bounces'),
              bi('El dominio cae en la segunda semana', 'The domain falls in the second week'),
            ],
          },
          right: {
            title: bi('Verificada', 'Verified'),
            tone: 'good',
            items: [
              bi('Rebote <2%', 'Bounce <2%'),
              bi('5 000 contactos → menos de 100 rebotes', '5,000 contacts → fewer than 100 bounces'),
              bi('El dominio se mantiene por encima del 90% de bandeja', 'The domain stays above 90% inbox'),
            ],
          },
        },
      },
      {
        id: 'ag05-t5',
        heading: bi('Multicanal suma un 37%, pero solo con la misma señal', 'Multi-channel adds 37%, but only with the same signal'),
        body: bi(
          'Tocar por email y por LinkedIn con el mismo motivo aumenta la respuesta un 37%. Lo que no funciona es el doble impacto sin conexión: un email genérico más una solicitud de conexión genérica se leen como dos molestias, no como un seguimiento.',
          'Touching by email and LinkedIn with the same reason raises replies by 37%. What does not work is a double impact with no connection: a generic email plus a generic connection request reads as two annoyances, not as a follow-up.'
        ),
        diagram: {
          kind: 'timeline',
          steps: [
            { label: bi('Email 1 con la señal', 'Email 1 with the signal'), value: 'D+0', tone: 'good' },
            { label: bi('Visita al perfil de LinkedIn', 'LinkedIn profile visit'), value: 'D+1', tone: 'info' },
            { label: bi('Solicitud que cita el email', 'Request that cites the email'), value: 'D+2', tone: 'info' },
            { label: bi('Email 2 si no hay respuesta', 'Email 2 if there is no reply'), value: 'D+3', tone: 'warn' },
          ],
        },
      },
    ],
    examples: [
      {
        id: 'ag05-ex1',
        title: bi('Ejemplo resuelto: la misma capacidad de envío, tres fuentes de lista', 'Worked example: the same sending capacity, three list sources'),
        situation: bi(
          'Agencia con 4 buzones calentados, secuencia de 5 toques y 21 días laborables al mes. Conversión de respuesta a reunión del 25%. Hay que decidir qué lista comprar con un presupuesto de 900 €.',
          'An agency with 4 warmed mailboxes, a 5-touch sequence and 21 working days a month. Reply-to-meeting conversion of 25%. They must decide which list to buy with a budget of €900.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Calcular la capacidad real en contactos, no en envíos', 'Step 1 · Calculate the real capacity in contacts, not in sends'),
            detail: bi(
              '4 buzones × 25 envíos = 100 al día. × 21 días = 2 100 envíos al mes. Dividido entre los 5 toques de la secuencia = 420 contactos al mes. Ese es el techo, y es fijo: no se puede comprar más lista sin comprar más buzones.',
              '4 mailboxes × 25 sends = 100 a day. × 21 days = 2,100 sends a month. Divided by the 5 touches in the sequence = 420 contacts a month. That is the ceiling, and it is fixed: you cannot buy more list without buying more mailboxes.'
            ),
            diagram: {
              kind: 'equation',
              tokens: [
                { text: '4 × 25 = 100/día', tone: 'good' },
                { text: '× 21 = 2 100', tone: 'info' },
                { text: '÷ 5 toques', tone: 'warn' },
              ],
              result: { text: '420 contactos/mes', tone: 'good' },
            },
          },
          {
            label: bi('Paso 2 · Costear las tres fuentes para esos mismos 420 contactos', 'Step 2 · Cost the three sources for those same 420 contacts'),
            detail: bi(
              'Lista fría a 0,30 €: 126 €. Visita a tu página de precios a 1,90 €: 798 €. Cambio de puesto en los últimos 30 días a 1,20 €: 504 €. Las tres caben en el presupuesto de 900 €.',
              'Cold list at €0.30: €126. Visit to your pricing page at €1.90: €798. Job change in the last 30 days at €1.20: €504. All three fit in the €900 budget.'
            ),
            diagram: {
              kind: 'bars',
              max: 900,
              unit: ' €',
              items: [
                { label: bi('A · lista fría', 'A · cold list'), value: 126, tone: 'good', note: bi('0,30 €/contacto', '€0.30/contact') },
                { label: bi('B · visita a precios', 'B · pricing-page visit'), value: 798, tone: 'warn', note: bi('1,90 €/contacto', '€1.90/contact') },
                { label: bi('C · cambio de puesto', 'C · job change'), value: 504, tone: 'info', note: bi('1,20 €/contacto', '€1.20/contact') },
                { label: bi('Presupuesto', 'Budget'), value: 900, tone: 'mute' },
              ],
            },
          },
          {
            label: bi('Paso 3 · Aplicar la tasa de respuesta de cada señal', 'Step 3 · Apply the reply rate of each signal'),
            detail: bi(
              'A responde al 1,5%: 6,3 respuestas. B al 6,5%: 27,3 respuestas. C al 8%: 33,6 respuestas. La misma infraestructura, el mismo texto adaptado a la señal, y una diferencia de cinco veces entre A y C.',
              'A replies at 1.5%: 6.3 replies. B at 6.5%: 27.3 replies. C at 8%: 33.6 replies. The same infrastructure, the same text adapted to the signal, and a fivefold difference between A and C.'
            ),
            diagram: {
              kind: 'bars',
              max: 34,
              unit: ' respuestas',
              items: [
                { label: bi('A · lista fría (1,5%)', 'A · cold list (1.5%)'), value: 6, tone: 'bad' },
                { label: bi('B · visita a precios (6,5%)', 'B · pricing visit (6.5%)'), value: 27, tone: 'info' },
                { label: bi('C · cambio de puesto (8%)', 'C · job change (8%)'), value: 34, tone: 'good' },
              ],
            },
          },
          {
            label: bi('Paso 4 · Convertir respuestas en reuniones y en coste por reunión', 'Step 4 · Turn replies into meetings and into cost per meeting'),
            detail: bi(
              'Al 25% de conversión: A da 1,6 reuniones con 126 € gastados, 80 € por reunión. B da 6,8 reuniones con 798 €, 117 € por reunión. C da 8,4 reuniones con 504 €, 60 € por reunión. C es a la vez la que más reuniones produce y la más barata por reunión.',
              'At 25% conversion: A gives 1.6 meetings with €126 spent, €80 per meeting. B gives 6.8 meetings with €798, €117 per meeting. C gives 8.4 meetings with €504, €60 per meeting. C is both the one producing the most meetings and the cheapest per meeting.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Fuente', 'Source'), bi('Gasto', 'Spend'), bi('Respuestas', 'Replies'), bi('Reuniones', 'Meetings'), bi('€/reunión', '€/meeting')],
              rows: [
                ['A · lista fría', '126 €', '6,3', '1,6', '80 €'],
                ['B · visita a precios', '798 €', '27,3', '6,8', '117 €'],
                ['C · cambio de puesto', '504 €', '33,6', '8,4', '60 €'],
              ],
              highlightRow: 2,
            },
          },
          {
            label: bi('Paso 5 · Comprobar el riesgo oculto de la opción barata', 'Step 5 · Check the hidden risk of the cheap option'),
            detail: bi(
              'La lista fría de A viene sin verificar: rebote esperado del 8%, es decir 34 rebotes duros sobre 420 contactos. Con un objetivo de menos del 2%, A obliga o a gastar 2 € en verificación o a aceptar que el dominio se degrade. Y su tasa del 1,5% asume entrega correcta; con la reputación cayendo, la tasa real baja de 1%.',
              'The cold list from A comes unverified: expected bounce of 8%, meaning 34 hard bounces over 420 contacts. Against a target below 2%, A forces you either to spend €2 on verification or to accept that the domain degrades. And its 1.5% rate assumes correct delivery; with reputation falling, the real rate drops below 1%.'
            ),
            diagram: {
              kind: 'compare',
              left: {
                title: bi('A · riesgo real', 'A · real risk'),
                tone: 'bad',
                items: [
                  bi('Rebote 8% → 34 duros sobre 420', 'Bounce 8% → 34 hard over 420'),
                  bi('1,6 reuniones al mes', '1.6 meetings a month'),
                  bi('No genera caso de éxito: 1,6 reuniones no cierran', 'Produces no success case: 1.6 meetings do not close'),
                ],
              },
              right: {
                title: bi('C · riesgo real', 'C · real risk'),
                tone: 'good',
                items: [
                  bi('Datos de LinkedIn, rebote ~1,4%', 'LinkedIn data, bounce ~1.4%'),
                  bi('8,4 reuniones al mes', '8.4 meetings a month'),
                  bi('2 clientes cerrados al mes con 33% de cierre', '2 clients closed a month at a 33% close rate'),
                ],
              },
            },
          },
        ],
        result: bi(
          'Con la misma capacidad de envío y menos gasto que B, la fuente C produce 5,25 veces más reuniones que A y cuesta 60 € por reunión frente a 117 €. La decisión no fue "cuánta lista compro", fue "qué señal encaja en los 420 contactos que ya puedo enviar".',
          'With the same sending capacity and less spend than B, source C produces 5.25 times more meetings than A and costs €60 per meeting versus €117. The decision was not "how much list do I buy", it was "which signal fits the 420 contacts I can already send to".'
        ),
        selfCheck: {
          prompt: bi('¿Por qué B sale peor que C aunque su señal también sea buena?', 'Why does B come out worse than C even though its signal is also good?'),
          options: [
            opt('a', 'Porque la visita a la página de precios no es una señal real', 'Because a pricing-page visit is not a real signal'),
            opt('b', 'Porque su precio por contacto es 1,6 veces el de C y su tasa de respuesta solo es 1,2 veces menor: el ratio no compensa', 'Because its price per contact is 1.6× that of C and its reply rate is only 1.2× lower: the ratio does not compensate'),
            opt('c', 'Porque B tiene menos contactos disponibles', 'Because B has fewer contacts available'),
            opt('d', 'Porque el intent data está prohibido en Europa', 'Because intent data is forbidden in Europe'),
          ],
          correctOptionId: 'b',
          explanation: bi('Se compara el ratio precio/respuesta: C cuesta 1,20 € y responde al 8% (0,15 € por punto de respuesta); B cuesta 1,90 € y responde al 6,5% (0,29 € por punto). C es el doble de eficiente.', 'You compare the price/reply ratio: C costs €1.20 and replies at 8% (€0.15 per reply point); B costs €1.90 and replies at 6.5% (€0.29 per point). C is twice as efficient.'),
        },
      },
    ],
    exercises: [
      {
        id: 'ag05-e01',
        format: 'concept',
        difficulty: 1,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Qué fija el tamaño máximo de la lista que puedes comprar cada mes?', 'What sets the maximum size of the list you can buy each month?'),
        options: [
          opt('a', 'El presupuesto disponible', 'The available budget'),
          opt('b', 'Tu capacidad de envío: buzones × 25 al día × días laborables, dividido entre los toques de la secuencia', 'Your sending capacity: mailboxes × 25 a day × working days, divided by the touches in the sequence'),
          opt('c', 'El tamaño del mercado objetivo', 'The size of the target market'),
          opt('d', 'Lo que permita la herramienta de envío', 'Whatever the sending tool allows'),
        ],
        correctOptionId: 'b',
        explanation: bi('La lista por encima de tu capacidad no se envía: se paga y se queda muerta. El cálculo va hacia atrás desde los buzones, no hacia delante desde el mercado.', 'List above your capacity does not get sent: it gets paid for and sits dead. The calculation runs backwards from the mailboxes, not forwards from the market.'),
        xp: 8,
      },
      {
        id: 'ag05-e02',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada señal con su tasa de respuesta de referencia.', 'Match each signal with its benchmark reply rate.'),
        pairs: [
          { leftId: 'l1', left: bi('Lista fría sin contexto', 'Cold list with no context'), rightId: 'r1', right: bi('1-2%', '1-2%') },
          { leftId: 'l2', left: bi('Oferta de empleo publicada', 'Published job offer'), rightId: 'r2', right: bi('2-4%', '2-4%') },
          { leftId: 'l3', left: bi('Visitó tu página de precios', 'Visited your pricing page'), rightId: 'r3', right: bi('5-8%', '5-8%') },
          { leftId: 'l4', left: bi('Cambió de puesto hace 30 días', 'Changed job 30 days ago'), rightId: 'r4', right: bi('6-10%', '6-10%') },
        ],
        explanation: bi('Las señales de comportamiento reciente están arriba; las de estructura de empresa, abajo. Lo que alguien hizo esta semana predice mejor que lo que su empresa es.', 'Recent behavioural signals sit at the top; company-structure signals at the bottom. What someone did this week predicts better than what their company is.'),
        xp: 12,
      },
      {
        id: 'ag05-e03',
        format: 'numeric',
        difficulty: 2,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Tienes 6 buzones, secuencia de 4 toques y 21 días laborables. ¿Cuántos contactos puedes trabajar al mes?',
          'You have 6 mailboxes, a 4-touch sequence and 21 working days. How many contacts can you work a month?'
        ),
        answer: 787,
        tolerance: 3,
        unit: 'contactos',
        formula: bi('6 × 25 × 21 = 3 150 · 3 150 ÷ 4', '6 × 25 × 21 = 3,150 · 3,150 ÷ 4'),
        explanation: bi('3 150 envíos al mes entre 4 toques = 787,5 contactos. Si compras 2 000, 1 213 se quedan sin enviar y pagados.', '3,150 monthly sends divided by 4 touches = 787.5 contacts. If you buy 2,000, 1,213 sit unsent and already paid for.'),
        xp: 10,
      },
      {
        id: 'ag05-e04',
        format: 'ordering',
        difficulty: 2,
        badge: bi('ORDENAR', 'ORDER'),
        prompt: bi('Ordena el proceso para elegir y preparar una lista.', 'Order the process for choosing and preparing a list.'),
        pieces: [
          { id: 'p1', text: bi('Calcular tu capacidad mensual en contactos desde los buzones', 'Calculate your monthly capacity in contacts from the mailboxes') },
          { id: 'p2', text: bi('Listar las señales disponibles para tu ICP con su tasa de respuesta', 'List the signals available for your ICP with their reply rate') },
          { id: 'p3', text: bi('Calcular el coste por reunión de cada fuente, no el coste por contacto', 'Calculate the cost per meeting of each source, not the cost per contact') },
          { id: 'p4', text: bi('Verificar las direcciones y descartar las que rebotan', 'Verify the addresses and discard those that bounce') },
          { id: 'p5', text: bi('Cargar solo los contactos que caben en tu capacidad del mes', 'Load only the contacts that fit in your capacity for the month') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        explanation: bi('La capacidad va primero porque es la restricción dura. Verificar va antes de cargar: una lista sin verificar entra en el buzón con un 8% de rebote duro.', 'Capacity comes first because it is the hard constraint. Verification comes before loading: an unverified list enters the mailbox with an 8% hard bounce.'),
        xp: 10,
      },
      {
        id: 'ag05-e05',
        format: 'worked_why',
        difficulty: 3,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('¿Por qué la lista fría a 0,30 € acabó costando 80 € por reunión y la de cambio de puesto a 1,20 € solo 60 €?', 'Why did the cold list at €0.30 end up costing €80 per meeting while the job-change list at €1.20 cost only €60?'),
        options: [
          opt('a', 'Porque la lista fría tenía menos contactos', 'Because the cold list had fewer contacts'),
          opt('b', 'Porque el coste por reunión divide el gasto entre las reuniones, y la tasa de respuesta pesa más que el precio del contacto: 1,5% contra 8% es una diferencia de 5,3 veces', 'Because cost per meeting divides spend by meetings, and the reply rate weighs more than the contact price: 1.5% against 8% is a 5.3× difference'),
          opt('c', 'Porque la verificación de la lista fría costó más', 'Because verifying the cold list cost more'),
          opt('d', 'Porque el texto enviado era distinto', 'Because the text sent was different'),
        ],
        correctOptionId: 'b',
        explanation: bi('El precio del contacto sube 4 veces (0,30 a 1,20) pero la respuesta sube 5,3 veces (1,5% a 8%). Cuando el multiplicador de respuesta supera al de precio, la fuente cara es la barata.', 'The contact price rises 4× (0.30 to 1.20) but the reply rate rises 5.3× (1.5% to 8%). When the reply multiplier beats the price multiplier, the expensive source is the cheap one.'),
        xp: 12,
      },
      {
        id: 'ag05-e06',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Compras 420 contactos con señal de cambio de puesto a 1,20 € cada uno. Responden el 8% y el 25% de las respuestas se convierte en reunión. ¿Cuál es tu coste por reunión?',
          'You buy 420 contacts with a job-change signal at €1.20 each. 8% reply and 25% of replies convert into a meeting. What is your cost per meeting?'
        ),
        answer: 60,
        tolerance: 1,
        unit: '€',
        formula: bi('504 € ÷ (420 × 0,08 × 0,25)', '€504 ÷ (420 × 0.08 × 0.25)'),
        explanation: bi('420 × 0,08 = 33,6 respuestas; × 0,25 = 8,4 reuniones. 504 € ÷ 8,4 = 60 € por reunión. Con un igual de 1 900 € y cierre del 33%, salen 2,8 clientes de esos 8,4.', '420 × 0.08 = 33.6 replies; × 0.25 = 8.4 meetings. €504 ÷ 8.4 = €60 per meeting. With a €1,900 retainer and a 33% close rate, 2.8 clients come out of those 8.4.'),
        xp: 12,
      },
      {
        id: 'ag05-e07',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('Este plan de prospección falla en la segunda semana. ¿Cuál es la línea causante?', 'This prospecting plan fails in the second week. Which line is the cause?'),
        context: {
          mono: true,
          label: bi('Plan mensual', 'Monthly plan'),
          content: 'buzones activos           2\nsecuencia                 5 toques\nlista comprada            5 000 contactos (sin verificar)\ndias laborables           21\nherramienta de verificacion  no contratada',
        },
        lines: [
          { id: 'c1', text: '2 buzones para 5 toques', tone: 'warn' },
          { id: 'c2', text: 'Lista de 5 000 sin verificar cargada directamente al envio', tone: 'bad', label: bi('rebote duro esperado 5-12%', 'expected hard bounce 5-12%') },
          { id: 'c3', text: 'Secuencia de 5 toques', tone: 'good' },
          { id: 'c4', text: '21 dias laborables asumidos', tone: 'good' },
        ],
        correctLineId: 'c2',
        explanation: bi('5 000 contactos sin verificar producen entre 250 y 600 rebotes duros. Eso supera con mucho el 2% de rebote sano y degrada los dos buzones a la vez, que además comparten dominio. La capacidad insuficiente de la línea 1 solo retrasa; la línea 2 destruye la infraestructura.', '5,000 unverified contacts produce between 250 and 600 hard bounces. That far exceeds the healthy 2% bounce and degrades both mailboxes at once, which also share a domain. The insufficient capacity on line 1 only delays; line 2 destroys the infrastructure.'),
        xp: 12,
      },
      {
        id: 'ag05-e08',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Tu capacidad es de 420 contactos al mes y tienes dos fuentes disponibles. (A) 420 contactos con señal de financiación reciente, 3-5% de respuesta, a 2,40 €. (B) 420 contactos con señal de baja de un competidor, 4-7% de respuesta, a 2,10 €. ¿Cuál eliges?',
          'Your capacity is 420 contacts a month and you have two available sources. (A) 420 contacts with a recent-funding signal, 3-5% reply, at €2.40. (B) 420 contacts with a competitor-churn signal, 4-7% reply, at €2.10. Which do you choose?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Fuente', 'Source'), bi('€/contacto', '€/contact'), bi('Respuesta', 'Reply'), bi('Reuniones', 'Meetings'), bi('€/reunión', '€/meeting')],
          rows: [
            ['A · financiación', '2,40 €', '4% (media)', '4,2', '229 €'],
            ['B · baja de competidor', '2,10 €', '5,5% (media)', '5,8', '152 €'],
          ],
          highlightRow: 1,
        },
        options: [
          opt('a', 'A, porque una empresa financiada tiene más presupuesto', 'A, because a funded company has more budget'),
          opt('b', 'B, porque es más barata por contacto y responde más: gana en las dos variables a la vez', 'B, because it is cheaper per contact and replies more: it wins on both variables at once'),
          opt('c', 'Repartir 210 contactos a cada una', 'Split 210 contacts to each'),
          opt('d', 'Ninguna: las dos superan los 2 € por contacto', 'Neither: both exceed €2 per contact'),
        ],
        correctOptionId: 'b',
        explanation: bi('Cuando una fuente domina en precio y en tasa a la vez, no hay cálculo que hacer. Repartir a medias solo sirve cuando no sabes cuál funciona y quieres medir: aquí los rangos ya no se solapan.', 'When one source dominates on both price and rate at once, there is no calculation to make. Splitting in half only makes sense when you do not know which works and want to measure: here the ranges no longer overlap.'),
        xp: 15,
      },
      {
        id: 'ag05-e09',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'Tu mejor señal es "visitó la página de precios", pero solo consigues 60 contactos al mes con ella. ¿Qué haces con los otros 360 de tu capacidad?',
          'Your best signal is "visited the pricing page", but you only get 60 contacts a month with it. What do you do with the other 360 of your capacity?'
        ),
        options: [
          opt('a', 'Dejar la capacidad sin usar para no mezclar señales', 'Leave the capacity unused so as not to mix signals'),
          opt('b', 'Enviar primero los 60 de mejor señal y llenar el resto con la siguiente señal por eficiencia de coste por reunión, en una campaña separada con su propio texto', 'Send the 60 best-signal contacts first and fill the rest with the next signal by cost-per-meeting efficiency, in a separate campaign with its own text'),
          opt('c', 'Comprar 360 contactos fríos porque son baratos', 'Buy 360 cold contacts because they are cheap'),
          opt('d', 'Enviar los 60 cinco veces más para ocupar la capacidad', 'Send the 60 five times more to fill the capacity'),
        ],
        correctOptionId: 'b',
        explanation: bi('La capacidad ociosa no produce nada, pero mezclar señales en una sola campaña impide medir. Se hacen campañas separadas por señal, cada una con su texto, y se ordenan por coste por reunión. Reenviar a los mismos 60 dispara las quejas.', 'Idle capacity produces nothing, but mixing signals in one campaign prevents measurement. You run separate campaigns per signal, each with its own text, ordered by cost per meeting. Resending to the same 60 spikes complaints.'),
        xp: 15,
      },
      {
        id: 'ag05-e10',
        format: 'numeric',
        difficulty: 4,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Necesitas 10 reuniones al mes. La conversión de respuesta a reunión es del 25%, la tasa de respuesta de tu señal del 6% y la secuencia tiene 5 toques. ¿Cuántos buzones necesitas a 25 envíos al día con 21 días laborables?',
          'You need 10 meetings a month. Reply-to-meeting conversion is 25%, your signal reply rate is 6% and the sequence has 5 touches. How many mailboxes do you need at 25 sends a day over 21 working days?'
        ),
        answer: 7,
        tolerance: 0,
        unit: 'buzones',
        formula: bi('40 respuestas ÷ 0,06 = 667 contactos · × 5 = 3 333 envíos · ÷ 21 ÷ 25', '40 replies ÷ 0.06 = 667 contacts · × 5 = 3,333 sends · ÷ 21 ÷ 25'),
        explanation: bi('10 reuniones ÷ 25% = 40 respuestas. ÷ 6% = 667 contactos. × 5 toques = 3 333 envíos al mes = 159 al día ÷ 25 = 6,35 → 7 buzones.', '10 meetings ÷ 25% = 40 replies. ÷ 6% = 667 contacts. × 5 touches = 3,333 sends a month = 159 a day ÷ 25 = 6.35 → 7 mailboxes.'),
        xp: 15,
      },
      {
        id: 'ag05-e11',
        format: 'faded',
        difficulty: 3,
        badge: bi('COMPLETAR', 'COMPLETE'),
        prompt: bi('Completa la comparación de fuentes. Las dos primeras columnas ya están calculadas.', 'Complete the source comparison. The first two columns are already calculated.'),
        pieces: [
          { id: 'p1', text: bi('Gasto total: 420 contactos × precio por contacto', 'Total spend: 420 contacts × price per contact') },
          { id: 'p2', text: bi('Respuestas: 420 × tasa de respuesta de la señal', 'Replies: 420 × the signal reply rate') },
          { id: 'p3', text: bi('Reuniones: respuestas × 25% de conversión', 'Meetings: replies × 25% conversion') },
          { id: 'p4', text: bi('Coste por reunión: gasto ÷ reuniones', 'Cost per meeting: spend ÷ meetings') },
          { id: 'p5', text: bi('Verificación y rebote esperado de cada fuente', 'Verification and expected bounce of each source') },
          { id: 'p6', text: bi('Decisión por menor coste por reunión con rebote aceptable', 'Decision by lowest cost per meeting with acceptable bounce') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'],
        lockedPieceIds: ['p1', 'p2'],
        explanation: bi('Sin el paso 5 la comparación está incompleta: una fuente con rebote del 8% degrada los buzones y arruina la tasa de las campañas siguientes.', 'Without step 5 the comparison is incomplete: a source with an 8% bounce degrades the mailboxes and ruins the rate of the following campaigns.'),
        xp: 12,
      },
      {
        id: 'ag05-e12',
        format: 'output',
        difficulty: 5,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('Informe de dos campañas del mismo mes. ¿Qué decisión es correcta?', 'Report of two campaigns from the same month. Which decision is correct?'),
        context: {
          mono: true,
          label: bi('Mes 3 · capacidad 420 contactos', 'Month 3 · capacity 420 contacts'),
          content: '                      CAMPANA X          CAMPANA Y\nsenal                 cambio de puesto   lista fria comprada\ncontactos             210                210\nenvios totales        1 050              1 050\nentregados            1 035 (98,6%)        924 (88,0%)\nrebotes                  15 (1,4%)        126 (12,0%)\nrespuestas               17 (8,1%)         4 (1,9%)\nreuniones                 5                  1\nquejas de spam            0                  2 (0,19%)\nclientes cerrados         2                  0',
        },
        options: [
          opt('a', 'Mantener las dos: Y aporta volumen de envíos', 'Keep both: Y adds sending volume'),
          opt('b', 'Cerrar Y: su rebote del 12% y sus 2 quejas por encima del 0,1% sano están degradando un dominio que comparte reputación con X, y produce un tercio de las reuniones', 'Close Y: its 12% bounce and 2 complaints above the healthy 0.1% are degrading a domain that shares reputation with X, and it produces a third of the meetings'),
          opt('c', 'Subir el volumen de Y para compensar su rebote', 'Raise Y volume to compensate for its bounce'),
          opt('d', 'Mezclar las dos listas en una sola campaña', 'Mix the two lists into a single campaign'),
        ],
        correctOptionId: 'b',
        explanation: bi('Y no es solo menos rentable: con un 12% de rebote y 0,19% de quejas está dañando la reputación del dominio, lo que a su vez baja la entrega de X. En prospección, una campaña mala no es neutra: contagia.', 'Y is not just less profitable: with a 12% bounce and 0.19% complaints it is damaging the domain reputation, which in turn lowers X delivery. In prospecting, a bad campaign is not neutral: it spreads.'),
        xp: 20,
      },
      {
        id: 'ag05-e13',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Por qué añadir LinkedIn al email suma un 37% solo si se usa la misma señal?', 'Why does adding LinkedIn to email add 37% only if the same signal is used?'),
        options: [
          opt('a', 'Porque LinkedIn exige citar el email anterior', 'Because LinkedIn requires citing the previous email'),
          opt('b', 'Porque el receptor reconoce el motivo del contacto: dos impactos sobre el mismo hecho se leen como seguimiento, y dos impactos sin conexión se leen como dos molestias independientes', 'Because the recipient recognises the reason for the contact: two touches about the same fact read as a follow-up, and two touches with no connection read as two independent annoyances'),
          opt('c', 'Porque los algoritmos de LinkedIn priorizan a quien envía emails', 'Because LinkedIn algorithms prioritise people who send emails'),
          opt('d', 'Porque reduce el número de envíos necesarios', 'Because it reduces the number of sends required'),
        ],
        correctOptionId: 'b',
        explanation: bi('El multicanal funciona por reconocimiento, no por repetición. Si la solicitud de conexión no menciona el motivo del email, el receptor no une los dos impactos y el segundo resta en vez de sumar.', 'Multi-channel works through recognition, not repetition. If the connection request does not mention the reason for the email, the recipient does not link the two touches and the second subtracts instead of adding.'),
        xp: 20,
      },
    ],
    recap: [
      bi('La capacidad de envío fija el tamaño de la lista: buzones × 25 × días laborables ÷ toques.', 'Sending capacity sets the list size: mailboxes × 25 × working days ÷ touches.'),
      bi('Se compara por coste por reunión, y la señal de comportamiento reciente gana a la estructura de empresa.', 'You compare by cost per meeting, and recent behavioural signals beat company structure.'),
      bi('Lista siempre verificada: rebote por debajo del 2% y quejas por debajo del 0,1%.', 'Always a verified list: bounce below 2% and complaints below 0.1%.'),
    ],
    actionMission: {
      id: 'mission-agency-5',
      title: bi('Monta tu primera lista con señal verificada', 'Build your first list with a verified signal'),
      objective: bi('Calcular tu capacidad mensual en contactos y construir una lista real con una señal concreta y rebote por debajo del 2%.', 'Calculate your monthly capacity in contacts and build a real list with a concrete signal and a bounce below 2%.'),
      steps: [
        bi('Calcula tu capacidad: buzones × 25 × días laborables ÷ toques de tu secuencia.', 'Calculate your capacity: mailboxes × 25 × working days ÷ touches in your sequence.'),
        bi('Elige una señal de comportamiento reciente para tu ICP y construye la lista hasta ese tope exacto.', 'Choose a recent behavioural signal for your ICP and build the list up to that exact cap.'),
        bi('Verifica las direcciones y apunta el porcentaje de rebote antes de cargar nada.', 'Verify the addresses and note the bounce percentage before loading anything.'),
      ],
      proof: bi('El cálculo de capacidad escrito, la lista exportada con el número de contactos y el informe de verificación con el rebote por debajo del 2%.', 'The written capacity calculation, the exported list with the contact count and the verification report showing a bounce below 2%.'),
      affiliateToolSlug: 'apollo-b2b',
      xpBonus: 30,
    },
  },
  /* ---------------------------------------------------------------- L6 -- */
  {
    slug: 'agency-06-llamada-cierre',
    unitSlug: 'agency-unit-2',
    trackSlug: 'digital-agency',
    orderIndex: 2,
    title: bi('La llamada: diagnóstico y cierre', 'The call: diagnosis and close'),
    outcome: bi(
      'Conducirás una llamada de diagnóstico que convierte el problema en euros y aislarás la causa real de cada objeción.',
      'You will run a diagnostic call that turns the problem into euros and isolate the real cause of every objection.'
    ),
    durationMin: 14,
    xpReward: 150,
    theory: [
      {
        id: 'ag06-t1',
        heading: bi('La llamada es un diagnóstico, no una presentación', 'The call is a diagnosis, not a presentation'),
        body: bi(
          'Quien habla más del 40% del tiempo está vendiendo un servicio. Quien pregunta está construyendo el caso del cliente con sus propios datos. La estructura es fija: dos minutos de contexto, quince de preguntas, cinco de coste del problema, cinco de oferta y tres de siguiente paso.',
          'Whoever talks more than 40% of the time is selling a service. Whoever asks questions is building the client case with their own data. The structure is fixed: two minutes of context, fifteen of questions, five on the cost of the problem, five on the offer and three on the next step.'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Bloque', 'Block'), bi('Minutos', 'Minutes'), bi('Quién habla', 'Who talks'), bi('Salida', 'Output')],
          rows: [
            ['Contexto', '2', 'tú', 'agenda acordada'],
            ['Preguntas de situación', '15', 'el cliente (80%)', 'datos concretos'],
            ['Coste del problema', '5', 'los dos', 'una cifra en euros'],
            ['Oferta', '5', 'tú', 'resultado + plazo + garantía'],
            ['Siguiente paso', '3', 'tú', 'fecha en el calendario'],
          ],
          highlightRow: 1,
        },
      },
      {
        id: 'ag06-t2',
        heading: bi('Toda la llamada busca una cifra en euros', 'The whole call is looking for one figure in euros'),
        body: bi(
          'Si al final no hay un número que el cliente ha dicho con su propia boca, la llamada no ha servido. El número se construye con tres preguntas: cuántas unidades pierdes, con qué frecuencia y cuánto vale cada una.',
          'If at the end there is no number the client has said out loud, the call was useless. The number is built with three questions: how many units you lose, how often, and what each one is worth.'
        ),
        diagram: {
          kind: 'equation',
          tokens: [
            { text: 'unidades perdidas', tone: 'warn' },
            { text: '×' },
            { text: 'frecuencia', tone: 'warn' },
            { text: '×' },
            { text: 'valor unidad', tone: 'warn' },
          ],
          result: { text: '= coste del problema al mes', tone: 'bad' },
        },
        why: bi('El precio se juzga contra esa cifra. Sin ella, se juzga contra el presupuesto de otras agencias.', 'The price is judged against that figure. Without it, it is judged against other agencies budgets.'),
      },
      {
        id: 'ag06-t3',
        heading: bi('Aislar la objeción antes de responderla', 'Isolate the objection before answering it'),
        body: bi(
          'Una objeción casi nunca es la causa real. Se aísla con una pregunta: "si eso estuviera resuelto, ¿empezaríamos el día 1?". Si la respuesta es sí, la objeción es verdadera y se trabaja. Si es no o duda, la causa es otra y contestar a la objeción declarada no sirve de nada.',
          'An objection is almost never the real cause. You isolate it with one question: "if that were solved, would we start on day 1?". If the answer is yes, the objection is real and you work it. If it is no or hesitation, the cause is something else and answering the stated objection is useless.'
        ),
        diagram: {
          kind: 'flow',
          nodes: [
            { id: 'n1', label: bi('Objeción declarada', 'Stated objection') },
            { id: 'n2', label: bi('"Si eso estuviera resuelto, ¿empezamos?"', '"If that were solved, would we start?"'), tone: 'info' },
            { id: 'n3', label: bi('Causa real identificada', 'Real cause identified'), tone: 'good' },
          ],
          branch: {
            afterNodeId: 'n2',
            label: bi('si dice "no" o duda → la causa es otra', 'if they say "no" or hesitate → the cause is something else'),
            tone: 'warn',
          },
        },
      },
      {
        id: 'ag06-t4',
        heading: bi('Cuatro causas y su tratamiento distinto', 'Four causes and their different treatment'),
        body: bi(
          'Precio: se responde con la cifra del problema y con el plazo. Confianza: con un caso del mismo nicho y con la garantía. Momento: con el coste de esperar un trimestre. Autoridad: no se responde, se agenda la llamada con quien decide.',
          'Price: answer with the problem figure and the timeframe. Trust: with a case from the same niche and with the guarantee. Timing: with the cost of waiting one quarter. Authority: you do not answer it, you schedule the call with the decision maker.'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Causa', 'Cause'), bi('Se declara como', 'Declared as'), bi('Tratamiento', 'Treatment'), bi('Bajar precio', 'Lowering price')],
          rows: [
            ['Precio', '"es caro"', 'cifra del problema + plazo', 'a veces útil'],
            ['Confianza', '"no os conozco"', 'caso del nicho + garantía', 'inútil'],
            ['Momento', '"ahora no"', 'coste de esperar 3 meses', 'inútil'],
            ['Autoridad', '"tengo que consultarlo"', 'llamada con el decisor', 'inútil'],
          ],
          highlightRow: 3,
          note: bi('Bajar el precio solo resuelve una de las cuatro causas. Aplicarlo a las otras tres regala margen.', 'Lowering the price only solves one of the four causes. Applying it to the other three gives margin away.'),
        },
      },
      {
        id: 'ag06-t5',
        heading: bi('La propuesta: una opción y una fecha', 'The proposal: one option and one date'),
        body: bi(
          'Se envía en menos de 24 horas, con una sola opción de servicio y una fecha de arranque concreta. Tres opciones trasladan la decisión al cliente y la mayoría elige no decidir. Una opción con fecha convierte la propuesta en un sí o un no.',
          'It is sent within 24 hours, with a single service option and a concrete start date. Three options hand the decision to the client and most choose not to decide. One option with a date turns the proposal into a yes or a no.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('Propuesta de 3 opciones', '3-option proposal'),
            tone: 'bad',
            items: [
              bi('El cliente compara en vez de decidir', 'The client compares instead of deciding'),
              bi('Sin fecha de arranque', 'No start date'),
              bi('Se reabre la negociación por email', 'Negotiation reopens by email'),
            ],
          },
          right: {
            title: bi('Propuesta de 1 opción', '1-option proposal'),
            tone: 'good',
            items: [
              bi('Resultado, plazo, garantía y precio', 'Outcome, timeframe, guarantee and price'),
              bi('Arranque el día 3, medición el día 90', 'Kickoff on day 3, measurement on day 90'),
              bi('Caduca en 7 días con motivo real', 'Expires in 7 days with a real reason'),
            ],
          },
        },
      },
    ],
    examples: [
      {
        id: 'ag06-ex1',
        title: bi('Ejemplo resuelto: llamada de 30 minutos con objeción de precio', 'Worked example: a 30-minute call with a price objection'),
        situation: bi(
          'Clínica de fisioterapia de 3 salas. La dueña, Marta, responde al primer email y acepta una llamada. Ofrece "12 pacientes privados nuevos al mes en 90 días" a 1 900 €/mes.',
          'A physiotherapy clinic with 3 rooms. The owner, Marta, replies to the first email and accepts a call. The offer is "12 new private patients a month in 90 days" at €1,900/month.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Contexto y agenda en dos minutos', 'Step 1 · Context and agenda in two minutes'),
            detail: bi(
              'Se dice qué se va a hacer y cuánto dura: "te hago preguntas sobre cómo entra hoy un paciente nuevo, calculamos juntos lo que cuesta lo que estáis dejando de atender, y si tiene sentido te cuento cómo lo haríamos. Si no, te lo digo y lo dejamos aquí. ¿Te va bien 30 minutos?".',
              'You state what will happen and how long: "I will ask you questions about how a new patient comes in today, we will calculate together what it costs to leave appointments unfilled, and if it makes sense I will tell you how we would do it. If not, I will tell you and we stop here. Does 30 minutes work?"'
            ),
          },
          {
            label: bi('Paso 2 · Quince minutos de preguntas con las tres cifras', 'Step 2 · Fifteen minutes of questions with the three figures'),
            detail: bi(
              'Las tres preguntas que construyen el número: cuántos huecos quedan sin reservar a la semana, con qué frecuencia se repite, y cuánto vale un paciente privado nuevo. Marta contesta 7 huecos los martes y jueves por la tarde, todas las semanas, y 380 € de valor medio por paciente nuevo.',
              'The three questions that build the number: how many slots stay unbooked a week, how often it repeats, and what a new private patient is worth. Marta answers 7 slots on Tuesday and Thursday afternoons, every week, and €380 of average value per new patient.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Pregunta', 'Question'), bi('Respuesta de Marta', 'Marta answer'), bi('Dato', 'Data')],
              rows: [
                ['¿Cuántos huecos sin reservar a la semana?', '7, martes y jueves tarde', '7/semana'],
                ['¿Todas las semanas o solo algunas?', 'todas, desde hace meses', '4,3 semanas/mes'],
                ['¿Cuánto vale un paciente privado nuevo?', 'unos 380 € entre primera y revisiones', '380 €'],
                ['¿Cuántos pacientes nuevos cabrían en esos huecos?', 'creo que unos 12 al mes', '12/mes'],
              ],
              highlightRow: 3,
            },
          },
          {
            label: bi('Paso 3 · Que el cliente diga la cifra en voz alta', 'Step 3 · Have the client say the figure out loud'),
            detail: bi(
              'No la dices tú: se calcula con ella. "7 huecos por semana son 30 sesiones al mes. Si la mitad se llena con pacientes privados nuevos, son 12. Por 380 € cada uno, ¿cuánto son?". Marta responde "4 560 €". Esa cifra, dicha por ella, es la que sostendrá el precio después.',
              'You do not say it: you calculate it with her. "7 slots a week is 30 sessions a month. If half of them fill with new private patients, that is 12. At €380 each, how much is that?". Marta answers "€4,560". That figure, said by her, is what will hold up the price afterwards.'
            ),
            diagram: {
              kind: 'stack',
              total: 4560,
              prefix: '',
              parts: [
                { label: bi('Tu igual mensual', 'Your monthly retainer'), value: 1900, tone: 'good' },
                { label: bi('Se queda en la clínica', 'Stays with the clinic'), value: 2660, tone: 'info' },
              ],
            },
          },
          {
            label: bi('Paso 4 · Presentar la oferta contra esa cifra', 'Step 4 · Present the offer against that figure'),
            detail: bi(
              'Resultado, plazo, garantía y esfuerzo, en ese orden y en cuatro frases. Se cierra con la comparación que ella misma acaba de hacer: 1 900 € contra 4 560 €. No se añade nada más y se calla.',
              'Outcome, timeframe, guarantee and effort, in that order and in four sentences. It ends with the comparison she just made herself: €1,900 against €4,560. Nothing more is added and you go quiet.'
            ),
            diagram: {
              kind: 'layers',
              layers: [
                { label: bi('"12 pacientes privados nuevos al mes"', '"12 new private patients a month"'), tone: 'good' },
                { label: bi('"medido el día 90"', '"measured on day 90"'), tone: 'info' },
                { label: bi('"si no llegamos, seguimos gratis hasta lograrlo"', '"if we do not reach it, we keep working free until we do"'), tone: 'good' },
                { label: bi('"una reunión quincenal de 30 minutos y acceso a la agenda"', '"one 30-minute fortnightly meeting and access to the booking system"'), tone: 'info' },
              ],
            },
          },
          {
            label: bi('Paso 5 · Aislar la objeción y descubrir la causa real', 'Step 5 · Isolate the objection and discover the real cause'),
            detail: bi(
              'Marta dice: "me parece caro, otra agencia me pide 800 €". Se aísla: "si el precio no fuera un problema, ¿empezaríamos el día 3?". Ella duda y dice "tendría que hablarlo con Sergio, que es mi socio". La causa real es autoridad, no precio. Bajar a 1 400 € no habría cerrado nada.',
              'Marta says: "it seems expensive to me, another agency asks for €800". Isolate it: "if price were not an issue, would we start on day 3?". She hesitates and says "I would have to talk to Sergio, my partner". The real cause is authority, not price. Dropping to €1,400 would not have closed anything.'
            ),
            diagram: {
              kind: 'flow',
              nodes: [
                { id: 'n1', label: bi('"Es caro, otra pide 800 €"', '"It is expensive, another asks €800"'), tone: 'bad' },
                { id: 'n2', label: bi('"Si el precio no fuera problema, ¿empezamos el día 3?"', '"If price were not an issue, do we start day 3?"'), tone: 'info' },
                { id: 'n3', label: bi('"Tendría que hablarlo con Sergio"', '"I would have to talk to Sergio"'), tone: 'warn' },
                { id: 'n4', label: bi('Llamada de 15 min con los dos, jueves 16:00', '15-min call with both, Thursday 16:00'), tone: 'good' },
              ],
            },
          },
          {
            label: bi('Paso 6 · Siguiente paso concreto y propuesta en 24 horas', 'Step 6 · Concrete next step and proposal within 24 hours'),
            detail: bi(
              'Se agenda en la misma llamada, con los dos socios, 15 minutos y hora fija. La propuesta se envía esa noche: una opción, 1 900 €/mes, arranque el día 3, medición el día 90, garantía escrita. Se firma en la llamada del jueves.',
              'It is scheduled in the same call, with both partners, 15 minutes and a fixed time. The proposal is sent that night: one option, €1,900/month, kickoff on day 3, measurement on day 90, written guarantee. It is signed on the Thursday call.'
            ),
            diagram: {
              kind: 'timeline',
              steps: [
                { label: bi('Llamada de diagnóstico', 'Diagnostic call'), value: 'D+0', tone: 'info' },
                { label: bi('Propuesta de 1 opción', '1-option proposal'), value: 'D+0 · 21 h', tone: 'good' },
                { label: bi('Llamada con el socio', 'Call with the partner'), value: 'D+2', tone: 'good' },
                { label: bi('Firma y arranque', 'Signature and kickoff'), value: 'D+3', tone: 'good' },
              ],
            },
          },
        ],
        result: bi(
          'Cierre en 3 días sin bajar el precio. Lo que resolvió la llamada no fue el argumento de venta, fue que Marta dijo en voz alta "4 560 €" antes de oír "1 900 €", y que la objeción se aisló en vez de responderse.',
          'Closed in 3 days without lowering the price. What resolved the call was not the sales argument, it was that Marta said "€4,560" out loud before hearing "€1,900", and that the objection was isolated instead of answered.'
        ),
        selfCheck: {
          prompt: bi('¿Qué habría pasado si hubieras bajado el precio a 1 400 € en el momento de la objeción?', 'What would have happened if you had dropped the price to €1,400 at the moment of the objection?'),
          options: [
            opt('a', 'Habrías cerrado, porque el precio era la causa', 'You would have closed, because price was the cause'),
            opt('b', 'No habrías cerrado, porque la causa real era la autoridad del socio: habrías regalado 500 € al mes y la propuesta habría seguido parada', 'You would not have closed, because the real cause was the partner authority: you would have given away €500 a month and the proposal would still have been stuck'),
            opt('c', 'Habría pedido más descuento', 'They would have asked for a bigger discount'),
            opt('d', 'Habrías perdido credibilidad pero cerrado igual', 'You would have lost credibility but still closed'),
          ],
          correctOptionId: 'b',
          explanation: bi('Por eso se aísla antes de responder. Una concesión sobre una causa equivocada no avanza la venta y fija un precio nuevo para siempre.', 'That is why you isolate before answering. A concession on the wrong cause does not advance the sale and sets a new price forever.'),
        },
      },
    ],
    exercises: [
      {
        id: 'ag06-e01',
        format: 'concept',
        difficulty: 1,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Cuál es la salida imprescindible de una llamada de diagnóstico?', 'What is the essential output of a diagnostic call?'),
        options: [
          opt('a', 'Que el cliente escuche toda la presentación del servicio', 'That the client hears the whole service presentation'),
          opt('b', 'Una cifra en euros, dicha por el cliente, de lo que le cuesta el problema cada mes', 'A figure in euros, said by the client, of what the problem costs them each month'),
          opt('c', 'Enviar la propuesta durante la llamada', 'Sending the proposal during the call'),
          opt('d', 'Que acepte una reunión más larga', 'That they accept a longer meeting'),
        ],
        correctOptionId: 'b',
        explanation: bi('Sin esa cifra el precio se compara con otras agencias. Con ella, se compara con el coste del problema, que es lo que el cliente ya está pagando.', 'Without that figure the price is compared with other agencies. With it, it is compared with the cost of the problem, which the client is already paying.'),
        xp: 8,
      },
      {
        id: 'ag06-e02',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja la objeción declarada con su causa más probable.', 'Match the declared objection with its most likely cause.'),
        pairs: [
          { leftId: 'l1', left: bi('"Es caro, otra agencia pide la mitad"', '"It is expensive, another agency asks half"'), rightId: 'r1', right: bi('Precio · se responde con la cifra del problema', 'Price · answered with the problem figure') },
          { leftId: 'l2', left: bi('"No os conozco, ¿quiénes son vuestros clientes?"', '"I do not know you, who are your clients?"'), rightId: 'r2', right: bi('Confianza · caso del nicho y garantía', 'Trust · niche case and guarantee') },
          { leftId: 'l3', left: bi('"Ahora estamos con el cierre del trimestre"', '"We are in the quarter close right now"'), rightId: 'r3', right: bi('Momento · coste de esperar 3 meses', 'Timing · cost of waiting 3 months') },
          { leftId: 'l4', left: bi('"Tengo que consultarlo con mi socio"', '"I have to check with my partner"'), rightId: 'r4', right: bi('Autoridad · llamada con el decisor', 'Authority · call with the decision maker') },
        ],
        explanation: bi('Las cuatro se declaran a veces como "es caro". Solo aislando se sabe cuál es, y cada una tiene un tratamiento distinto.', 'All four are sometimes declared as "it is expensive". Only by isolating do you know which one it is, and each has a different treatment.'),
        xp: 12,
      },
      {
        id: 'ag06-e03',
        format: 'numeric',
        difficulty: 2,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Un cliente deja 7 huecos sin reservar a la semana. Se llenarían con 12 pacientes privados nuevos al mes y cada uno vale 380 €. ¿Cuál es el coste mensual del problema?',
          'A client leaves 7 slots unbooked a week. They would be filled by 12 new private patients a month and each is worth €380. What is the monthly cost of the problem?'
        ),
        answer: 4560,
        tolerance: 5,
        unit: '€/mes',
        formula: bi('12 × 380', '12 × 380'),
        explanation: bi('4 560 € al mes. Contra un igual de 1 900 €, la clínica se queda 2 660 €: un retorno de 2,4 veces. Esa es toda la argumentación de precio que hace falta.', '€4,560 a month. Against a €1,900 retainer, the clinic keeps €2,660: a return of 2.4×. That is the entire price argument needed.'),
        xp: 10,
      },
      {
        id: 'ag06-e04',
        format: 'ordering',
        difficulty: 2,
        badge: bi('ORDENAR', 'ORDER'),
        prompt: bi('Ordena la estructura de una llamada de diagnóstico de 30 minutos.', 'Order the structure of a 30-minute diagnostic call.'),
        pieces: [
          { id: 'p1', text: bi('Contexto y agenda acordada en 2 minutos', 'Context and agreed agenda in 2 minutes') },
          { id: 'p2', text: bi('Preguntas de situación durante 15 minutos: el cliente habla el 80%', 'Situation questions for 15 minutes: the client talks 80%') },
          { id: 'p3', text: bi('Calcular juntos el coste del problema en euros al mes', 'Calculate together the cost of the problem in euros a month') },
          { id: 'p4', text: bi('Presentar la oferta en cuatro frases contra esa cifra', 'Present the offer in four sentences against that figure') },
          { id: 'p5', text: bi('Fijar el siguiente paso con fecha y hora en el calendario', 'Set the next step with date and time in the calendar') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        explanation: bi('La oferta nunca va antes del coste del problema: si va antes, el cliente no tiene contra qué compararla y responde con el precio de otro.', 'The offer never goes before the cost of the problem: if it does, the client has nothing to compare it with and answers with someone else price.'),
        xp: 10,
      },
      {
        id: 'ag06-e05',
        format: 'worked_why',
        difficulty: 3,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('¿Por qué la cifra del problema la dice el cliente y no tú?', 'Why does the client say the problem figure and not you?'),
        options: [
          opt('a', 'Porque ahorra tiempo de llamada', 'Because it saves call time'),
          opt('b', 'Porque una cifra calculada por el cliente con sus propios datos se sostiene cuando aparece una alternativa más barata; una cifra que tú declaras se discute', 'Because a figure calculated by the client with their own data holds up when a cheaper alternative appears; a figure you declare gets argued with'),
          opt('c', 'Porque tú no conoces sus márgenes', 'Because you do not know their margins'),
          opt('d', 'Porque suena menos agresivo', 'Because it sounds less aggressive'),
        ],
        correctOptionId: 'b',
        explanation: bi('Cuando Marta dice "4 560 €", ese número es suyo. Cuando después aparece la agencia de 800 €, la comparación que tiene en la cabeza es 1 900 contra 4 560, no 1 900 contra 800.', 'When Marta says "€4,560", that number is hers. When the €800 agency appears afterwards, the comparison in her head is €1,900 against €4,560, not €1,900 against €800.'),
        xp: 12,
      },
      {
        id: 'ag06-e06',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Cierras el 33% de las llamadas y haces 8,4 llamadas al mes. Tu igual es 1 900 €/mes y el churn del 11% anual. ¿Cuántos clientes nuevos cierras al mes y qué ingreso recurrente añaden?',
          'You close 33% of calls and run 8.4 calls a month. Your retainer is €1,900/month and annual churn is 11%. How many new clients do you close a month and what recurring revenue do they add?'
        ),
        answer: 5267,
        tolerance: 30,
        unit: '€/mes',
        formula: bi('8,4 × 0,33 = 2,77 clientes · × 1 900', '8.4 × 0.33 = 2.77 clients · × 1,900'),
        explanation: bi('2,77 clientes nuevos al mes × 1 900 € = 5 267 €/mes de nuevo ingreso recurrente. En seis meses la cartera supera los 31 000 € mensuales si el churn se mantiene en el 11% anual.', '2.77 new clients a month × €1,900 = €5,267/month of new recurring revenue (€5,320 with the rounding in the prompt). In six months the portfolio exceeds €30,000 a month if churn holds.'),
        xp: 12,
      },
      {
        id: 'ag06-e07',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('Esta llamada duró 45 minutos y no cerró. ¿Qué bloque está mal?', 'This call lasted 45 minutes and did not close. Which block is wrong?'),
        context: {
          mono: true,
          label: bi('Registro de la llamada', 'Call log'),
          content: '00:00-00:02  contexto y agenda\n00:02-00:09  presentacion de la agencia: equipo, metodo, anos de experiencia\n00:09-00:31  casos de exito de otros sectores, con diapositivas\n00:31-00:38  preguntas al cliente sobre sus huecos libres\n00:38-00:43  oferta con 3 opciones de precio\n00:43-00:45  "te mando informacion y ya me dices"',
        },
        lines: [
          { id: 'c1', text: '22 minutos de presentacion propia antes de preguntar nada', tone: 'bad', label: bi('invierte la estructura', 'inverts the structure') },
          { id: 'c2', text: '7 minutos de preguntas al cliente', tone: 'warn' },
          { id: 'c3', text: '3 opciones de precio en la oferta', tone: 'warn' },
          { id: 'c4', text: 'Cierre sin fecha: "ya me dices"', tone: 'bad' },
        ],
        correctLineId: 'c1',
        explanation: bi('Los 22 minutos de presentación consumieron el tiempo que hacía falta para que el cliente construyera su cifra. Sin esa cifra, las tres opciones de la línea 3 se compararon por precio y el cierre sin fecha de la línea 4 fue la consecuencia. Se arregla invirtiendo: 15 minutos de preguntas primero.', 'The 22 minutes of presentation consumed the time needed for the client to build their figure. Without that figure, the three options on line 3 were compared on price and the dateless close on line 4 was the consequence. Fix it by inverting: 15 minutes of questions first.'),
        xp: 12,
      },
      {
        id: 'ag06-e08',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos respuestas a "es caro". (A) "Si el precio no fuera problema, ¿empezaríamos el día 3?" → "Sí, pero tendríamos que ver si llega a los 12". (B) La misma pregunta → "Bueno... tendría que hablarlo con mi socio". ¿Qué causa tiene cada una?',
          'Two responses to "it is expensive". (A) "If price were not an issue, would we start on day 3?" → "Yes, but we would have to see if it reaches 12". (B) The same question → "Well... I would have to talk to my partner". What cause does each one have?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Respuesta', 'Response'), bi('¿Acepta arrancar?', 'Would they start?'), bi('Causa real', 'Real cause'), bi('Siguiente paso', 'Next step')],
          rows: [
            ['A · "sí, pero ¿llega a 12?"', 'sí', 'confianza en el resultado', 'caso del nicho + garantía escrita'],
            ['B · "tendría que hablarlo"', 'no', 'autoridad', 'llamada con el socio, fecha fija'],
          ],
        },
        options: [
          opt('a', 'Las dos son precio: se responde igual', 'Both are price: answer the same way'),
          opt('b', 'A es confianza en el resultado y B es autoridad; ninguna de las dos se resuelve bajando el precio', 'A is confidence in the outcome and B is authority; neither is solved by lowering the price'),
          opt('c', 'A es autoridad y B es confianza', 'A is authority and B is trust'),
          opt('d', 'Las dos son momento: se posponen', 'Both are timing: postpone them'),
        ],
        correctOptionId: 'b',
        explanation: bi('A acepta arrancar si el resultado es creíble: se trabaja con un caso del mismo nicho y garantía. B no puede decidir sola: bajar el precio solo reduce tu margen y la propuesta seguirá parada hasta que hable con el socio.', 'A accepts starting if the outcome is credible: work it with a case from the same niche and a guarantee. B cannot decide alone: lowering the price only reduces your margin and the proposal stays stuck until they talk to the partner.'),
        xp: 15,
      },
      {
        id: 'ag06-e09',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'El cliente dice: "ahora no es buen momento, estamos cerrando el trimestre". ¿Qué respuesta ataca la causa?',
          'The client says: "now is not a good time, we are closing the quarter". What answer attacks the cause?'
        ),
        options: [
          opt('a', 'Ofrecer empezar el mes que viene y volver a llamar', 'Offer to start next month and call again'),
          opt('b', 'Cuantificar el coste de esperar: "los 7 huecos de los martes siguen vacíos 13 semanas más, son 12 pacientes por mes, 4 560 € cada mes. Si arrancamos el día 3, el trimestre cierra con tres semanas ya funcionando"', 'Quantify the cost of waiting: "the 7 Tuesday slots stay empty for 13 more weeks, that is 12 patients a month, €4,560 every month. If we start on day 3, the quarter closes with three weeks already running"'),
          opt('c', 'Bajar el precio del primer mes', 'Lower the price of the first month'),
          opt('d', 'Enviar la propuesta y esperar', 'Send the proposal and wait'),
        ],
        correctOptionId: 'b',
        explanation: bi('El "momento" se responde con el coste de la espera, no con paciencia. Posponer sin cifra convierte el "ahora no" en un "nunca" educado: la mayoría de las propuestas pospuestas no se retoman.', '"Timing" is answered with the cost of waiting, not with patience. Postponing without a figure turns "not now" into a polite "never": most postponed proposals are never picked up.'),
        xp: 15,
      },
      {
        id: 'ag06-e10',
        format: 'numeric',
        difficulty: 4,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Tienes 8,4 llamadas al mes con cierre del 33% a 1 900 €/mes. Si bajaras el precio a 1 400 € y el cierre subiera al 40%, ¿cuál es la diferencia de ingreso recurrente nuevo al mes, en euros?',
          'You have 8.4 calls a month closing at 33% for €1,900/month. If you dropped the price to €1,400 and the close rate rose to 40%, what is the difference in new monthly recurring revenue, in euros?'
        ),
        answer: -563,
        tolerance: 40,
        unit: '€/mes',
        formula: bi('(8,4 × 0,40 × 1 400) − (8,4 × 0,33 × 1 900)', '(8.4 × 0.40 × 1,400) − (8.4 × 0.33 × 1,900)'),
        explanation: bi('Con descuento: 3,36 clientes × 1 400 € = 4 704 €. Sin descuento: 2,77 clientes × 1 900 € = 5 267 €. Bajar el precio resta 563 € al mes aunque el cierre suba 7 puntos. Solo compensa si la subida de cierre supera el 44%.', 'With the discount: 3.36 clients × €1,400 = €4,704. Without: 2.77 clients × €1,900 = €5,267. Lowering the price subtracts €563 a month even though the close rate rises 7 points. It only pays off if the close rate rises above 44%.'),
        xp: 15,
      },
      {
        id: 'ag06-e11',
        format: 'faded',
        difficulty: 3,
        badge: bi('COMPLETAR', 'COMPLETE'),
        prompt: bi('Completa la propuesta de una página. Las dos primeras líneas ya están escritas.', 'Complete the one-page proposal. The first two lines are already written.'),
        pieces: [
          { id: 'p1', text: bi('Coste del problema que calculó el cliente: 4 560 €/mes', 'Cost of the problem the client calculated: €4,560/month') },
          { id: 'p2', text: bi('Resultado comprometido: 12 pacientes privados nuevos al mes', 'Committed outcome: 12 new private patients a month') },
          { id: 'p3', text: bi('Plazo de medición: día 90 desde el arranque', 'Measurement timeframe: day 90 from kickoff') },
          { id: 'p4', text: bi('Garantía escrita y esfuerzo exigido al cliente', 'Written guarantee and effort demanded of the client') },
          { id: 'p5', text: bi('Precio único con fecha de arranque el día 3', 'Single price with a start date on day 3') },
          { id: 'p6', text: bi('Validez de 7 días con motivo real (capacidad de agenda)', 'Valid for 7 days with a real reason (calendar capacity)') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'],
        lockedPieceIds: ['p1', 'p2'],
        explanation: bi('La primera línea es la cifra del cliente, no tu servicio. Por eso la propuesta se lee como un resumen de la llamada y no como un catálogo.', 'The first line is the client figure, not your service. That is why the proposal reads like a summary of the call and not like a catalogue.'),
        xp: 12,
      },
      {
        id: 'ag06-e12',
        format: 'output',
        difficulty: 5,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('Registro de 6 llamadas del mes. ¿Qué conclusión es correcta?', 'Log of 6 calls from the month. Which conclusion is correct?'),
        context: {
          mono: true,
          label: bi('Llamadas del mes · 30 min de media', 'Calls of the month · 30 min average'),
          content: 'llamada  min cliente  min preguntas  cifra en EUR dicha  siguiente paso con fecha  cerro\n   1          9            16             si                    si                si\n   2         14            11             si                    si                si\n   3         21             6             no                    no                no\n   4         11            14             si                    si                si\n   5         19             8             no                    si                no\n   6         23             5             no                    no                no',
        },
        options: [
          opt('a', 'El cierre depende de la experiencia del equipo', 'Closing depends on the team experience'),
          opt('b', 'Las tres llamadas con menos de 10 minutos de preguntas no produjeron cifra y ninguna cerró; las tres con 11 o más minutos produjeron cifra y las tres cerraron', 'The three calls with under 10 minutes of questions produced no figure and none closed; the three with 11 or more minutes produced a figure and all three closed'),
          opt('c', 'La duración total de la llamada es lo que predice el cierre', 'Total call length is what predicts closing'),
          opt('d', 'Fijar siguiente paso con fecha garantiza el cierre', 'Setting a dated next step guarantees closing'),
        ],
        correctOptionId: 'b',
        explanation: bi('La llamada 5 tenía siguiente paso con fecha y no cerró: faltó la cifra. La variable que separa los dos grupos es el tiempo de preguntas, no la duración total ni el siguiente paso. La regla operativa: al menos 12 minutos de preguntas y una cifra dicha por el cliente.', 'Call 5 had a dated next step and did not close: the figure was missing. The variable separating the two groups is question time, not total length or the next step. The operational rule: at least 12 minutes of questions and a figure said by the client.'),
        xp: 20,
      },
      {
        id: 'ag06-e13',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Por qué la propuesta lleva una sola opción y una fecha de arranque?', 'Why does the proposal carry a single option and a start date?'),
        options: [
          opt('a', 'Porque es más corta y se lee antes', 'Because it is shorter and gets read sooner'),
          opt('b', 'Porque varias opciones convierten la decisión en una comparación entre paquetes y la fecha abierta deja la propuesta sin caducidad: el resultado es que el cliente no decide', 'Because several options turn the decision into a comparison between packages and an open date leaves the proposal without an expiry: the result is that the client does not decide'),
          opt('c', 'Porque las opciones múltiples se perciben como poco profesionales', 'Because multiple options are perceived as unprofessional'),
          opt('d', 'Porque reduce el trabajo de preparar la propuesta', 'Because it reduces the work of preparing the proposal'),
        ],
        correctOptionId: 'b',
        explanation: bi('Una opción con fecha fuerza un sí o un no en 7 días. Tres opciones sin fecha producen una cuarta respuesta: "lo miramos y te decimos", que en la práctica es un no sin cierre.', 'One option with a date forces a yes or a no in 7 days. Three options without a date produce a fourth answer: "we will look at it and get back to you", which in practice is a no without closure.'),
        xp: 20,
      },
    ],
    recap: [
      bi('La llamada es un diagnóstico: 15 minutos de preguntas y una cifra en euros dicha por el cliente.', 'The call is a diagnosis: 15 minutes of questions and a figure in euros said by the client.'),
      bi('Toda objeción se aísla con "si eso estuviera resuelto, ¿empezamos?" antes de responderla.', 'Every objection is isolated with "if that were solved, would we start?" before answering it.'),
      bi('Propuesta en 24 horas, una sola opción, fecha de arranque y validez de 7 días con motivo real.', 'Proposal in 24 hours, a single option, a start date and 7-day validity with a real reason.'),
    ],
    actionMission: {
      id: 'mission-agency-6',
      title: bi('Guion de llamada y plantilla de propuesta', 'Call script and proposal template'),
      objective: bi('Escribir el guion de diagnóstico con sus preguntas y la plantilla de propuesta de una sola opción.', 'Write the diagnostic script with its questions and the single-option proposal template.'),
      steps: [
        bi('Escribe las tres preguntas que producen la cifra: unidades perdidas, frecuencia y valor por unidad.', 'Write the three questions that produce the figure: units lost, frequency and value per unit.'),
        bi('Redacta la pregunta de aislamiento y las cuatro respuestas según la causa detectada.', 'Draft the isolation question and the four responses according to the cause detected.'),
        bi('Monta la plantilla de propuesta con las seis líneas: cifra del cliente, resultado, plazo, garantía, precio único y fecha de arranque.', 'Build the proposal template with the six lines: client figure, outcome, timeframe, guarantee, single price and start date.'),
      ],
      proof: bi('El guion de llamada de una página y una propuesta de ejemplo rellena con datos de un prospecto real.', 'The one-page call script and an example proposal filled in with data from a real prospect.'),
      affiliateToolSlug: 'cal-com',
      xpBonus: 30,
    },
  },
  /* ---------------------------------------------------------------- L7 -- */
  {
    slug: 'agency-07-entrega-retencion',
    unitSlug: 'agency-unit-2',
    trackSlug: 'digital-agency',
    orderIndex: 3,
    title: bi('Entrega, informes y retención', 'Delivery, reporting and retention'),
    outcome: bi(
      'Montarás un onboarding de 14 días con línea base, un informe mensual de tres números y un plan de subida de precio en renovación.',
      'You will build a 14-day onboarding with a baseline, a three-number monthly report and a renewal price-rise plan.'
    ),
    durationMin: 14,
    xpReward: 150,
    theory: [
      {
        id: 'ag07-t1',
        heading: bi('Los primeros 14 días deciden los siguientes 12 meses', 'The first 14 days decide the next 12 months'),
        body: bi(
          'El cliente evalúa la decisión de comprarte durante las dos primeras semanas, no en el día 90. En ese periodo necesita tres cosas: acceso a los datos, una línea base escrita y una victoria visible. Si faltan, el día 90 tendrás que demostrar el resultado desde cero.',
          'The client evaluates the decision to buy from you during the first two weeks, not on day 90. In that period they need three things: access to the data, a written baseline and a visible win. If they are missing, on day 90 you will have to prove the result from scratch.'
        ),
        diagram: {
          kind: 'timeline',
          steps: [
            { label: bi('Accesos y datos', 'Access and data'), value: 'D+1', tone: 'info' },
            { label: bi('Línea base escrita y firmada', 'Written, signed baseline'), value: 'D+3', tone: 'good' },
            { label: bi('Primera acción ejecutada', 'First action executed'), value: 'D+7', tone: 'info' },
            { label: bi('Primera victoria visible', 'First visible win'), value: 'D+12', tone: 'good' },
            { label: bi('Informe de arranque', 'Kickoff report'), value: 'D+14', tone: 'good' },
          ],
        },
        why: bi('Un cliente que no ve nada en 14 días ya está buscando alternativa, aunque el resultado llegue en el día 90.', 'A client who sees nothing in 14 days is already looking for an alternative, even if the result arrives on day 90.'),
      },
      {
        id: 'ag07-t2',
        heading: bi('La línea base se mide el día 1', 'The baseline is measured on day 1'),
        body: bi(
          'Sin línea base no hay resultado demostrable: "hemos pasado de 4 a 13" es un argumento; "tenemos 13" es un dato suelto que el cliente compara con lo que recuerda. Se escribe, se envía y se pide confirmación en los tres primeros días.',
          'Without a baseline there is no provable outcome: "we went from 4 to 13" is an argument; "we have 13" is a loose figure the client compares with what they remember. It is written down, sent and confirmation is requested in the first three days.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('Sin línea base', 'No baseline'),
            tone: 'bad',
            items: [
              bi('"Este mes: 13 pacientes nuevos"', '"This month: 13 new patients"'),
              bi('El cliente recuerda 10 y discute', 'The client remembers 10 and argues'),
              bi('En la renovación no hay argumento', 'At renewal there is no argument'),
            ],
          },
          right: {
            title: bi('Con línea base firmada', 'With a signed baseline'),
            tone: 'good',
            items: [
              bi('"Base: 4 · hoy: 13 · objetivo: 12"', '"Baseline: 4 · today: 13 · target: 12"'),
              bi('La comparación es objetiva y escrita', 'The comparison is objective and written'),
              bi('La renovación se apoya en un número aceptado', 'Renewal rests on an accepted number'),
            ],
          },
        },
      },
      {
        id: 'ag07-t3',
        heading: bi('Informe mensual: tres números, no cuarenta', 'Monthly report: three numbers, not forty'),
        body: bi(
          'Un panel con 40 métricas obliga al cliente a interpretar, y esa interpretación es esfuerzo, que es la palanca que baja el valor. El informe que retiene tiene tres líneas: resultado contra la base, valor en euros contra tu igual, y el único cambio del mes siguiente.',
          'A dashboard with 40 metrics forces the client to interpret, and that interpretation is effort, which is the lever that lowers value. The report that retains has three lines: outcome against the baseline, value in euros against your retainer, and the single change for next month.'
        ),
        diagram: {
          kind: 'layers',
          layers: [
            { label: bi('1 · RESULTADO VS BASE', '1 · OUTCOME VS BASELINE'), note: bi('13 pacientes nuevos contra una base de 4', '13 new patients against a baseline of 4'), tone: 'good' },
            { label: bi('2 · VALOR VS IGUAL', '2 · VALUE VS RETAINER'), note: bi('4 940 € creados contra 1 900 € cobrados = 2,6×', '€4,940 created against €1,900 charged = 2.6×'), tone: 'good' },
            { label: bi('3 · ÚNICO CAMBIO DEL MES', '3 · THE ONE CHANGE NEXT MONTH'), note: bi('ampliar la campaña al jueves por la mañana', 'extend the campaign to Thursday morning'), tone: 'info' },
          ],
        },
      },
      {
        id: 'ag07-t4',
        heading: bi('Churn de logos y churn de ingreso no son lo mismo', 'Logo churn and revenue churn are not the same'),
        body: bi(
          'Perder un cliente de 900 € y ganar uno de 2 400 € es churn de logos positivo y churn de ingreso negativo. Se calculan los dos. Un churn anual del 11% es un 0,92% mensual: con 10 clientes, se va uno al año.',
          'Losing a €900 client and gaining a €2,400 one is positive logo churn and negative revenue churn. Calculate both. An 11% annual churn is 0.92% monthly: with 10 clients, one leaves a year.'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Métrica', 'Metric'), bi('Fórmula', 'Formula'), bi('Ejemplo del mes', 'Example for the month'), bi('Sano', 'Healthy')],
          rows: [
            ['Churn de logos', 'bajas ÷ clientes iniciales', '1 ÷ 10 = 10% anual', '< 15% anual'],
            ['Churn de ingreso', 'ingreso perdido ÷ ingreso inicial', '900 ÷ 19 000 = 4,7%', '< 8% anual'],
            ['Expansión', 'ingreso nuevo en cartera existente', '+500 € en 2 clientes', '> 0'],
            ['Churn neto de ingreso', 'perdido − expansión', '900 − 500 = +400 €', 'negativo'],
          ],
          highlightRow: 3,
          note: bi('Si la expansión supera la pérdida, la cartera crece sin vender nada nuevo.', 'If expansion beats loss, the portfolio grows without selling anything new.'),
        },
      },
      {
        id: 'ag07-t5',
        heading: bi('La subida de precio va en la renovación y con dato', 'The price rise goes at renewal and with data'),
        body: bi(
          'Subir a mitad de contrato rompe la promesa. Se sube en la fecha de renovación, con el retorno medido en el informe por delante, y se aplica primero a los clientes nuevos para comprobar la tasa de aceptación antes de tocar la cartera.',
          'Raising mid-contract breaks the promise. You raise it at the renewal date, with the measured return from the report up front, and apply it to new clients first to test the acceptance rate before touching the portfolio.'
        ),
        diagram: {
          kind: 'flow',
          nodes: [
            { id: 'n1', label: bi('Precio nuevo solo a clientes nuevos', 'New price for new clients only') },
            { id: 'n2', label: bi('Medir aceptación 60 días', 'Measure acceptance for 60 days'), tone: 'info' },
            { id: 'n3', label: bi('Aplicar en renovaciones con el retorno medido', 'Apply at renewals with the measured return'), tone: 'good' },
          ],
          branch: {
            afterNodeId: 'n2',
            label: bi('si la aceptación baja del 60% → revisar la oferta, no el precio', 'if acceptance drops below 60% → review the offer, not the price'),
            tone: 'warn',
          },
        },
      },
    ],
    examples: [
      {
        id: 'ag07-ex1',
        title: bi('Ejemplo resuelto: onboarding de 14 días y subida de precio a los 10 clientes', 'Worked example: a 14-day onboarding and a price rise across 10 clients'),
        situation: bi(
          'La clínica de Marta firma el día 3. La agencia tiene 10 clientes a 1 900 €/mes, capacidad de entrega de 14 y churn del 11% anual. Quiere subir a 2 400 € sin perder cartera.',
          'Marta clinic signs on day 3. The agency has 10 clients at €1,900/month, delivery capacity for 14 and 11% annual churn. It wants to rise to €2,400 without losing the portfolio.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Días 1-3: accesos y línea base firmada', 'Step 1 · Days 1-3: access and signed baseline'),
            detail: bi(
              'Se pide acceso de lectura a la agenda y al panel de anuncios, y se escribe la línea base con los datos de los 90 días anteriores: 4 pacientes privados nuevos al mes de media, 7 huecos semanales sin reservar, valor medio por paciente 380 €. Se envía el día 3 y se pide un "confirmo" por escrito.',
              'Read access to the booking system and the ads panel is requested, and the baseline is written with data from the previous 90 days: an average of 4 new private patients a month, 7 unbooked slots a week, an average value per patient of €380. It is sent on day 3 and a written "I confirm" is requested.'
            ),
            diagram: {
              kind: 'code',
              lang: 'línea base · día 3',
              lines: [
                { text: 'pacientes_privados_nuevos_mes   4  (media de los ultimos 90 dias)', tone: 'info' },
                { text: 'huecos_semanales_sin_reserva    7  (martes y jueves tarde)', tone: 'info' },
                { text: 'valor_medio_paciente            380 EUR (primera + revisiones)', tone: 'info' },
                { text: 'coste_del_problema_mes          4 560 EUR', tone: 'warn', label: bi('cifra que dijo Marta', 'the figure Marta said') },
                { text: 'objetivo_dia_90                 12 pacientes/mes', tone: 'good' },
                { text: 'igual_mensual                   1 900 EUR', tone: 'good' },
              ],
            },
          },
          {
            label: bi('Paso 2 · Días 4-7: primera acción ejecutada, no planificada', 'Step 2 · Days 4-7: first action executed, not planned'),
            detail: bi(
              'El error habitual es presentar un plan de 90 días en la primera semana. Lo que el cliente necesita es una acción ya en marcha: la campaña activada el día 6 con el creativo que ya funcionó en otra clínica del nicho. Un plan es una promesa; una acción en marcha es evidencia.',
              'The usual mistake is presenting a 90-day plan in the first week. What the client needs is an action already running: the campaign activated on day 6 with the creative that already worked in another clinic in the niche. A plan is a promise; a running action is evidence.'
            ),
            diagram: {
              kind: 'compare',
              left: {
                title: bi('Semana 1 con plan', 'Week 1 with a plan'),
                tone: 'bad',
                items: [
                  bi('Documento de 18 páginas', 'An 18-page document'),
                  bi('Nada en marcha todavía', 'Nothing running yet'),
                  bi('El cliente no tiene nada que contar a su socio', 'The client has nothing to tell their partner'),
                ],
              },
              right: {
                title: bi('Semana 1 con acción', 'Week 1 with an action'),
                tone: 'good',
                items: [
                  bi('Campaña activada el día 6', 'Campaign activated on day 6'),
                  bi('Primeros 3 pacientes reservados', 'First 3 patients booked'),
                  bi('El cliente ve movimiento en su propia agenda', 'The client sees movement in their own booking system'),
                ],
              },
            },
          },
          {
            label: bi('Paso 3 · Día 12: la primera victoria visible en su agenda', 'Step 3 · Day 12: the first visible win in their booking system'),
            detail: bi(
              'Tres pacientes privados nuevos reservados en los huecos del martes, visibles en la agenda que ella abre cada mañana. Es la victoria que ancla la decisión de compra antes de que llegue el día 90. Se manda una captura con los tres huecos ocupados, sin informe.',
              'Three new private patients booked in the Tuesday slots, visible in the booking system she opens every morning. It is the win that anchors the buying decision before day 90 arrives. A screenshot is sent with the three slots filled, no report.'
            ),
          },
          {
            label: bi('Paso 4 · Día 90: el informe de tres números', 'Step 4 · Day 90: the three-number report'),
            detail: bi(
              'Resultado contra base: 13 pacientes frente a 4 y frente al objetivo de 12. Valor contra igual: 13 × 380 € = 4 940 € creados contra 1 900 € cobrados, un retorno de 2,6 veces. Único cambio del mes siguiente: ampliar la campaña al jueves por la mañana, donde quedan 4 huecos.',
              'Outcome against baseline: 13 patients versus 4 and versus the target of 12. Value against retainer: 13 × €380 = €4,940 created against €1,900 charged, a return of 2.6 times. The one change for next month: extend the campaign to Thursday morning, where 4 slots remain.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Línea del informe', 'Report line'), bi('Dato', 'Data'), bi('Referencia', 'Reference')],
              rows: [
                ['1 · Resultado vs base', '13 pacientes nuevos', 'base 4 · objetivo 12'],
                ['2 · Valor vs igual', '4 940 € creados', '1 900 € cobrados · 2,6×'],
                ['3 · Único cambio del mes', 'añadir jueves mañana', '4 huecos libres restantes'],
              ],
              highlightRow: 1,
            },
          },
          {
            label: bi('Paso 5 · Mes 8: probar el precio nuevo con clientes nuevos', 'Step 5 · Month 8: test the new price with new clients'),
            detail: bi(
              'Se empieza a vender a 2 400 € solo a prospectos nuevos. En 60 días: 5 propuestas, 4 aceptan el precio nuevo (80% de aceptación), una se cae. Con aceptación por encima del 60%, la oferta sostiene el precio y se puede llevar a las renovaciones.',
              'You start selling at €2,400 only to new prospects. In 60 days: 5 proposals, 4 accept the new price (80% acceptance), one falls through. With acceptance above 60%, the offer holds the price and it can be taken to renewals.'
            ),
            diagram: {
              kind: 'bars',
              max: 100,
              unit: '%',
              items: [
                { label: bi('Aceptación medida', 'Measured acceptance'), value: 80, tone: 'good', note: bi('4 de 5 propuestas', '4 of 5 proposals') },
                { label: bi('Umbral para renovar cartera', 'Threshold to renew the portfolio'), value: 60, tone: 'warn' },
                { label: bi('Bajo el umbral → revisar oferta', 'Below the threshold → review the offer'), value: 59, tone: 'bad', note: bi('no se toca el precio', 'the price is not touched') },
              ],
            },
          },
          {
            label: bi('Paso 6 · Renovaciones: el efecto neto sobre la cartera', 'Step 6 · Renewals: the net effect on the portfolio'),
            detail: bi(
              '10 clientes a 1 900 € = 19 000 €/mes. En la renovación, con el informe de 2,6× por delante: 8 aceptan 2 400 €, 1 negocia 2 150 € y 1 cancela. La cartera pasa a 21 350 €/mes con 9 clientes. Se pierde un cliente y se ganan 2 350 € al mes.',
              '10 clients at €1,900 = €19,000/month. At renewal, with the 2.6× report up front: 8 accept €2,400, 1 negotiates €2,150 and 1 cancels. The portfolio goes to €21,350/month with 9 clients. You lose one client and gain €2,350 a month.'
            ),
            diagram: {
              kind: 'stack',
              total: 21350,
              prefix: '',
              parts: [
                { label: bi('8 clientes a 2 400 €', '8 clients at €2,400'), value: 19200, tone: 'good' },
                { label: bi('1 cliente a 2 150 €', '1 client at €2,150'), value: 2150, tone: 'info' },
              ],
            },
          },
          {
            label: bi('Paso 7 · Recuperar el cliente perdido dentro de la capacidad', 'Step 7 · Recover the lost client within capacity'),
            detail: bi(
              'La capacidad de entrega es 14 clientes y hay 9. Con 8,4 llamadas al mes y cierre del 33%, llegan 2,77 altas mensuales: en 20 días la cartera vuelve a 10 y en cuatro meses se acerca al techo de 14. A partir de ahí la palanca deja de ser vender más y pasa a ser subir precio otra vez.',
              'Delivery capacity is 14 clients and there are 9. With 8.4 calls a month and a 33% close rate, 2.77 new clients arrive a month: in 20 days the portfolio is back to 10 and in four months it approaches the ceiling of 14. From there the lever stops being selling more and becomes raising the price again.'
            ),
            diagram: {
              kind: 'flow',
              nodes: [
                { id: 'n1', label: bi('9 clientes · 21 350 €/mes', '9 clients · €21,350/month'), tone: 'info' },
                { id: 'n2', label: bi('+2,77 altas al mes', '+2.77 new clients a month'), tone: 'good' },
                { id: 'n3', label: bi('14 clientes · techo de entrega', '14 clients · delivery ceiling'), tone: 'warn' },
                { id: 'n4', label: bi('Subir precio otra vez o contratar entrega', 'Raise the price again or hire delivery'), tone: 'good' },
              ],
            },
          },
        ],
        result: bi(
          'Sin contratar a nadie y sin añadir servicios: la cartera pasa de 19 000 € a 21 350 €/mes con un cliente menos. La subida se apoyó en un informe de tres números que el cliente ya llevaba nueve meses recibiendo, no en un argumento de venta nuevo.',
          'Without hiring anyone and without adding services: the portfolio goes from €19,000 to €21,350/month with one client fewer. The rise rested on a three-number report the client had already been receiving for nine months, not on a new sales argument.'
        ),
        selfCheck: {
          prompt: bi('¿Por qué se probó el precio nuevo con clientes nuevos antes de tocar la cartera?', 'Why was the new price tested with new clients before touching the portfolio?'),
          options: [
            opt('a', 'Porque los clientes nuevos negocian menos', 'Because new clients negotiate less'),
            opt('b', 'Porque mide la tasa de aceptación sin arriesgar ingreso existente: si la aceptación es baja, se revisa la oferta y la cartera queda intacta', 'Because it measures the acceptance rate without risking existing revenue: if acceptance is low, the offer is reviewed and the portfolio stays intact'),
            opt('c', 'Porque es ilegal subir el precio a clientes actuales', 'Because raising the price for existing clients is illegal'),
            opt('d', 'Porque los clientes actuales no reciben informe', 'Because existing clients do not receive a report'),
          ],
          correctOptionId: 'b',
          explanation: bi('Probar en la cartera cuesta cancelaciones reales. Probar con prospectos cuesta propuestas perdidas, que se recuperan en 20 días con el volumen de llamadas existente.', 'Testing on the portfolio costs real cancellations. Testing with prospects costs lost proposals, which are recovered in 20 days with the existing call volume.'),
        },
      },
    ],
    exercises: [
      {
        id: 'ag07-e01',
        format: 'concept',
        difficulty: 1,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Cuándo se mide y se confirma por escrito la línea base?', 'When is the baseline measured and confirmed in writing?'),
        options: [
          opt('a', 'El día 30, con el primer informe', 'On day 30, with the first report'),
          opt('b', 'En los tres primeros días del onboarding, antes de ejecutar nada', 'In the first three days of onboarding, before executing anything'),
          opt('c', 'En la llamada de venta, y no hace falta repetirla', 'In the sales call, and it does not need repeating'),
          opt('d', 'El día 90, para comparar con el resultado', 'On day 90, to compare with the result'),
        ],
        correctOptionId: 'b',
        explanation: bi('Después de ejecutar cualquier acción ya no puedes separar lo que había de lo que conseguiste. Y sin confirmación escrita, el cliente compara contra lo que recuerda, que siempre es más favorable para él.', 'After executing any action you can no longer separate what was there from what you achieved. And without written confirmation, the client compares against what they remember, which is always more favourable to them.'),
        xp: 8,
      },
      {
        id: 'ag07-e02',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada día del onboarding con lo que se entrega.', 'Match each onboarding day with what is delivered.'),
        pairs: [
          { leftId: 'l1', left: bi('Día 1', 'Day 1'), rightId: 'r1', right: bi('Accesos de lectura a agenda y panel de anuncios', 'Read access to the booking system and ads panel') },
          { leftId: 'l2', left: bi('Día 3', 'Day 3'), rightId: 'r2', right: bi('Línea base escrita y confirmada por el cliente', 'Baseline written and confirmed by the client') },
          { leftId: 'l3', left: bi('Día 6', 'Day 6'), rightId: 'r3', right: bi('Primera acción ya en marcha, no un plan', 'First action already running, not a plan') },
          { leftId: 'l4', left: bi('Día 12', 'Day 12'), rightId: 'r4', right: bi('Primera victoria visible en la agenda del cliente', 'First visible win in the client booking system') },
        ],
        explanation: bi('Los 14 días se juzgan por lo que el cliente puede ver, no por lo que tú has planificado. Un plan de 18 páginas en la semana 1 no es una entrega.', 'The 14 days are judged by what the client can see, not by what you have planned. An 18-page plan in week 1 is not a delivery.'),
        xp: 12,
      },
      {
        id: 'ag07-e03',
        format: 'numeric',
        difficulty: 2,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Un cliente pasa de 4 a 13 pacientes privados nuevos al mes, con valor medio de 380 € cada uno. Tu igual es 1 900 €/mes. ¿Qué retorno en veces obtiene la clínica?',
          'A client goes from 4 to 13 new private patients a month, with an average value of €380 each. Your retainer is €1,900/month. What return in multiples does the clinic get?'
        ),
        answer: 2.6,
        tolerance: 0.1,
        unit: '×',
        formula: bi('(13 × 380) ÷ 1 900', '(13 × 380) ÷ 1,900'),
        explanation: bi('4 940 € creados entre 1 900 € cobrados = 2,6 veces. Es el número que encabeza el informe y el que sostiene la subida de precio en la renovación.', '€4,940 created divided by €1,900 charged = 2.6 times. It is the number that heads the report and holds up the price rise at renewal.'),
        xp: 10,
      },
      {
        id: 'ag07-e04',
        format: 'ordering',
        difficulty: 2,
        badge: bi('ORDENAR', 'ORDER'),
        prompt: bi('Ordena el proceso para subir el precio sin romper la cartera.', 'Order the process for raising the price without breaking the portfolio.'),
        pieces: [
          { id: 'p1', text: bi('Aplicar el precio nuevo solo a prospectos nuevos', 'Apply the new price only to new prospects') },
          { id: 'p2', text: bi('Medir la tasa de aceptación durante 60 días', 'Measure the acceptance rate for 60 days') },
          { id: 'p3', text: bi('Comprobar que la aceptación supera el 60%', 'Check that acceptance is above 60%') },
          { id: 'p4', text: bi('Llevar el precio a las renovaciones con el informe de retorno por delante', 'Take the price to renewals with the return report up front') },
          { id: 'p5', text: bi('Cubrir las cancelaciones con el volumen de llamadas existente', 'Cover the cancellations with the existing call volume') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        explanation: bi('Probar primero en prospectos convierte un riesgo de cartera en riesgo de propuesta. Y el paso 5 se planea antes de subir, no después de la cancelación.', 'Testing on prospects first turns a portfolio risk into a proposal risk. And step 5 is planned before the rise, not after the cancellation.'),
        xp: 10,
      },
      {
        id: 'ag07-e05',
        format: 'worked_why',
        difficulty: 3,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('¿Por qué el informe mensual tiene tres líneas y no un panel completo?', 'Why does the monthly report have three lines and not a complete dashboard?'),
        options: [
          opt('a', 'Porque es más rápido de preparar', 'Because it is quicker to prepare'),
          opt('b', 'Porque interpretar 40 métricas es esfuerzo para el cliente, y el esfuerzo está en el denominador de la ecuación de valor: el informe completo baja el valor percibido aunque los datos sean mejores', 'Because interpreting 40 metrics is effort for the client, and effort sits in the denominator of the value equation: the complete report lowers perceived value even if the data is better'),
          opt('c', 'Porque los clientes no entienden los paneles', 'Because clients do not understand dashboards'),
          opt('d', 'Porque oculta las métricas que van mal', 'Because it hides the metrics that are going badly'),
        ],
        correctOptionId: 'b',
        explanation: bi('Tres líneas que se leen en 30 segundos y que el cliente puede repetir a su socio valen más que un panel que solo tú interpretas. El acceso completo a los datos se da aparte, a quien lo pida.', 'Three lines read in 30 seconds that the client can repeat to their partner are worth more than a dashboard only you interpret. Full data access is given separately, to whoever asks.'),
        xp: 12,
      },
      {
        id: 'ag07-e06',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Cartera de 10 clientes a 1 900 €/mes. En la renovación, 8 aceptan 2 400 €, 1 negocia 2 150 € y 1 cancela. ¿Cuál es el ingreso mensual resultante?',
          'A portfolio of 10 clients at €1,900/month. At renewal, 8 accept €2,400, 1 negotiates €2,150 and 1 cancels. What is the resulting monthly revenue?'
        ),
        answer: 21350,
        tolerance: 5,
        unit: '€/mes',
        formula: bi('(8 × 2 400) + 2 150', '(8 × 2,400) + 2,150'),
        explanation: bi('19 200 € + 2 150 € = 21 350 €/mes con 9 clientes, frente a 19 000 € con 10. Se pierde un cliente y se ganan 2 350 € al mes, un 12,4% más.', '€19,200 + €2,150 = €21,350/month with 9 clients, versus €19,000 with 10. You lose one client and gain €2,350 a month, 12.4% more.'),
        xp: 12,
      },
      {
        id: 'ag07-e07',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('Este onboarding produce un cliente que cancela en el mes 4. ¿Cuál es la línea que lo causa?', 'This onboarding produces a client who cancels in month 4. Which line causes it?'),
        context: {
          mono: true,
          label: bi('Plan de onboarding enviado al cliente', 'Onboarding plan sent to the client'),
          content: 'dia 1   bienvenida y envio del documento de metodologia (22 paginas)\ndia 4   reunion de kickoff de 90 minutos con todo el equipo\ndia 8   solicitud de accesos a la agenda y al panel de anuncios\ndia 15  entrega del plan de 90 dias con cronograma\ndia 30  primer informe con panel de 40 metricas\ndia 90  revision de resultados',
        },
        lines: [
          { id: 'c1', text: 'Documento de metodologia de 22 paginas el dia 1', tone: 'warn' },
          { id: 'c2', text: 'Kickoff de 90 minutos el dia 4', tone: 'warn' },
          { id: 'c3', text: 'Accesos pedidos el dia 8 y primera accion ejecutada despues del dia 15', tone: 'bad', label: bi('nada visible en 14 dias', 'nothing visible in 14 days') },
          { id: 'c4', text: 'Informe de 40 metricas el dia 30', tone: 'warn' },
        ],
        correctLineId: 'c3',
        explanation: bi('Hasta el día 15 el cliente no tiene nada en marcha y hasta el día 30 no ve un dato. En esas dos semanas ya evaluó la compra y la evaluó mal. Los accesos van el día 1 y la primera acción, antes del día 7.', 'Until day 15 the client has nothing running and until day 30 sees no data. In those two weeks they already assessed the purchase, and assessed it badly. Access goes on day 1 and the first action before day 7.'),
        xp: 12,
      },
      {
        id: 'ag07-e08',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos meses de cartera. (A) Se van 2 clientes de 900 € y entran 2 de 2 400 €. (B) Se va 1 cliente de 2 400 € y entra 1 de 900 €. ¿Cuál va mejor?',
          'Two months of portfolio. (A) 2 clients at €900 leave and 2 at €2,400 come in. (B) 1 client at €2,400 leaves and 1 at €900 comes in. Which is doing better?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Mes', 'Month'), bi('Churn de logos', 'Logo churn'), bi('Churn de ingreso', 'Revenue churn'), bi('Ingreso neto', 'Net revenue')],
          rows: [
            ['A · salen 2 de 900 €, entran 2 de 2 400 €', '0%', '+3 000 €', 'mejora'],
            ['B · sale 1 de 2 400 €, entra 1 de 900 €', '0%', '−1 500 €', 'empeora'],
          ],
          highlightRow: 0,
        },
        options: [
          opt('a', 'Los dos igual: en ningún mes cambia el número de clientes', 'Both the same: in neither month does the client count change'),
          opt('b', 'A, porque mantiene el número de clientes y añade 3 000 € de ingreso; B mantiene el número pero pierde 1 500 €', 'A, because it keeps the client count and adds €3,000 of revenue; B keeps the count but loses €1,500'),
          opt('c', 'B, porque pierde menos logos', 'B, because it loses fewer logos'),
          opt('d', 'No se puede saber sin el churn anual', 'Cannot be known without the annual churn'),
        ],
        correctOptionId: 'b',
        explanation: bi('Contar logos engaña cuando el ticket medio cambia. En A el churn de logos es neutro y el de ingreso es negativo (crece). En B el de logos también es neutro pero el ingreso cae 1 500 €.', 'Counting logos misleads when the average ticket changes. In A logo churn is neutral and revenue churn is negative (it grows). In B logo churn is also neutral but revenue falls €1,500.'),
        xp: 15,
      },
      {
        id: 'ag07-e09',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'Día 85: el cliente lleva 9 pacientes nuevos al mes y el objetivo era 12. ¿Qué haces antes del día 90?',
          'Day 85: the client has 9 new patients a month and the target was 12. What do you do before day 90?'
        ),
        options: [
          opt('a', 'Esperar al día 90 y presentar el dato con el resto del informe', 'Wait until day 90 and present the data with the rest of the report'),
          opt('b', 'Avisar tú el día 85 con la causa identificada, el cambio que vas a ejecutar y la fecha en que se mide; la garantía se aplica sin que el cliente la pida', 'Raise it yourself on day 85 with the cause identified, the change you will execute and the date it will be measured; apply the guarantee without the client asking'),
          opt('c', 'Reformular el objetivo a 9 pacientes', 'Reframe the target to 9 patients'),
          opt('d', 'Enviar el informe del día 60 otra vez para ganar tiempo', 'Send the day-60 report again to buy time'),
        ],
        correctOptionId: 'b',
        explanation: bi('Que el cliente descubra el desvío en el informe destruye la confianza que sostiene la renovación. Avisar primero con causa, cambio y fecha convierte un mal dato en evidencia de control, y activar la garantía sin que la pidan es lo que la hace creíble.', 'Letting the client discover the shortfall in the report destroys the trust that supports renewal. Raising it first with cause, change and date turns bad data into evidence of control, and triggering the guarantee without being asked is what makes it credible.'),
        xp: 15,
      },
      {
        id: 'ag07-e10',
        format: 'numeric',
        difficulty: 4,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Capacidad de entrega: 14 clientes. Tienes 9 tras la subida de precio y entran 2,77 altas al mes. ¿En cuántos meses alcanzas el techo de entrega?',
          'Delivery capacity: 14 clients. You have 9 after the price rise and 2.77 new clients a month come in. In how many months do you reach the delivery ceiling?'
        ),
        answer: 2,
        tolerance: 0.4,
        unit: 'meses',
        formula: bi('(14 − 9) ÷ 2,77', '(14 − 9) ÷ 2.77'),
        explanation: bi('5 huecos entre 2,77 altas al mes = 1,8 meses, es decir durante el segundo mes. A partir de ahí la palanca cambia: o subes precio otra vez o contratas entrega. Seguir vendiendo por encima del techo degrada el informe y sube el churn.', '5 slots divided by 2.77 new clients a month = 1.8 months, meaning during the second month. From there the lever changes: either raise the price again or hire delivery. Keep selling above the ceiling degrades the report and raises churn.'),
        xp: 15,
      },
      {
        id: 'ag07-e11',
        format: 'faded',
        difficulty: 3,
        badge: bi('COMPLETAR', 'COMPLETE'),
        prompt: bi('Completa el informe mensual de tres líneas. Las dos primeras ya están escritas.', 'Complete the three-line monthly report. The first two are already written.'),
        pieces: [
          { id: 'p1', text: bi('Resultado contra la línea base: 13 pacientes frente a 4', 'Outcome against the baseline: 13 patients versus 4') },
          { id: 'p2', text: bi('Valor creado contra el igual: 4 940 € frente a 1 900 €, 2,6 veces', 'Value created against the retainer: €4,940 versus €1,900, 2.6 times') },
          { id: 'p3', text: bi('Único cambio del mes siguiente, con la razón en una línea', 'The single change for next month, with the reason in one line') },
          { id: 'p4', text: bi('Fecha del próximo informe y de la revisión del día 90', 'Date of the next report and of the day-90 review') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4'],
        lockedPieceIds: ['p1', 'p2'],
        explanation: bi('La tercera línea es la que demuestra control: el cliente ve que sabes qué tocar y por qué. Sin ella el informe es un parte del pasado.', 'The third line is what demonstrates control: the client sees you know what to change and why. Without it the report is a statement about the past.'),
        xp: 12,
      },
      {
        id: 'ag07-e12',
        format: 'output',
        difficulty: 5,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('Datos de cartera de los últimos 12 meses. ¿Qué decisión es correcta?', 'Portfolio data for the last 12 months. Which decision is correct?'),
        context: {
          mono: true,
          label: bi('Cartera · 12 meses', 'Portfolio · 12 months'),
          content: '                        mes 1    mes 6    mes 12\nclientes                   6        11       14\nticket medio            1 900    1 900    2 240\ningreso mensual        11 400   20 900   31 360\ncapacidad de entrega      14       14       14\nhoras de entrega/cliente  11       13       17\nchurn anual de logos      --       9%      11%\nexpansion en cartera       0        0      500 EUR/mes\nnuevas altas/mes         2,7      2,7      2,7',
        },
        options: [
          opt('a', 'Seguir vendiendo: hay 2,7 altas al mes y el ingreso crece', 'Keep selling: there are 2.7 new clients a month and revenue is growing'),
          opt('b', 'Parar la venta nueva: la cartera ya está en el techo de 14 y las horas por cliente subieron de 11 a 17, que es lo que está empujando el churn del 9% al 11%; la palanca ahora es precio o contratación de entrega', 'Stop new sales: the portfolio is already at the ceiling of 14 and hours per client rose from 11 to 17, which is what is pushing churn from 9% to 11%; the lever now is price or hiring delivery'),
          opt('c', 'Bajar el ticket medio para reducir las horas de entrega', 'Lower the average ticket to reduce delivery hours'),
          opt('d', 'Ampliar la capacidad a 20 clientes', 'Expand capacity to 20 clients'),
        ],
        correctOptionId: 'b',
        explanation: bi('El ingreso sube 175% en 12 meses, pero las horas por cliente suben 55% y el churn con ellas. Con 14 de 14 ocupados, cada alta nueva degrada la entrega de todos. La expansión de 500 € al mes es la única palanca de ingreso que no consume capacidad.', 'Revenue rises 175% in 12 months, but hours per client rise 55% and churn with them. At 14 of 14 occupied, every new client degrades everyone delivery. The €500/month expansion is the only revenue lever that does not consume capacity.'),
        xp: 20,
      },
      {
        id: 'ag07-e13',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Por qué una victoria visible en el día 12 protege la renovación del día 365?', 'Why does a visible win on day 12 protect the renewal on day 365?'),
        options: [
          opt('a', 'Porque adelanta el resultado real al día 12', 'Because it brings the real result forward to day 12'),
          opt('b', 'Porque la decisión de compra se reevalúa en las primeras dos semanas: un cliente que ya vio un hueco llenarse en su agenda tiene un ancla concreta que recordar cuando aparezca la duda en el mes 11', 'Because the buying decision is re-evaluated in the first two weeks: a client who already saw a slot fill in their booking system has a concrete anchor to remember when doubt appears in month 11'),
          opt('c', 'Porque evita tener que hacer el informe del día 90', 'Because it avoids having to do the day-90 report'),
          opt('d', 'Porque reduce el esfuerzo de entrega de la agencia', 'Because it reduces the agency delivery effort'),
        ],
        correctOptionId: 'b',
        explanation: bi('La retención no se decide con los datos del último mes, se decide con la confianza construida al principio. La victoria temprana es el recuerdo que compite contra la alternativa más barata cuando llega la renovación.', 'Retention is not decided with last month data, it is decided with the trust built at the start. The early win is the memory that competes against the cheaper alternative when renewal arrives.'),
        xp: 20,
      },
    ],
    recap: [
      bi('Onboarding de 14 días: accesos el día 1, línea base firmada el día 3, acción en marcha antes del 7 y victoria visible antes del 14.', 'A 14-day onboarding: access on day 1, a signed baseline on day 3, an action running before day 7 and a visible win before day 14.'),
      bi('Informe mensual de tres líneas: resultado contra base, valor contra igual y el único cambio del mes siguiente.', 'A three-line monthly report: outcome against baseline, value against retainer and the single change for next month.'),
      bi('El precio se sube en renovación, probado antes en prospectos con una aceptación superior al 60%.', 'The price is raised at renewal, tested beforehand on prospects with an acceptance above 60%.'),
    ],
    actionMission: {
      id: 'mission-agency-7',
      title: bi('Kit de entrega: onboarding, informe y subida de precio', 'Delivery kit: onboarding, report and price rise'),
      objective: bi('Dejar escritos los tres documentos que sostienen la retención: plan de onboarding de 14 días, plantilla de informe mensual y protocolo de subida de precio.', 'Leave written the three documents that sustain retention: the 14-day onboarding plan, the monthly report template and the price-rise protocol.'),
      steps: [
        bi('Escribe el onboarding día por día hasta el 14, con la línea base el día 3 y la primera acción antes del 7.', 'Write the onboarding day by day up to day 14, with the baseline on day 3 and the first action before day 7.'),
        bi('Monta la plantilla del informe de tres líneas y rellénala con datos de un cliente real o de un caso de prueba.', 'Build the three-line report template and fill it in with data from a real client or a test case.'),
        bi('Define el protocolo de subida: precio nuevo a prospectos, 60 días de medición, umbral del 60% y aplicación en renovaciones.', 'Define the price-rise protocol: new price to prospects, 60 days of measurement, a 60% threshold and application at renewals.'),
      ],
      proof: bi('Los tres documentos en un solo archivo y un informe mensual de ejemplo con las tres líneas rellenas y su retorno en veces.', 'The three documents in a single file and an example monthly report with the three lines filled in and its return in multiples.'),
      affiliateToolSlug: 'loom-video',
      xpBonus: 30,
    },
  },
];

export const AGENCY_UNIT_2: Unit = {
  slug: 'agency-unit-2',
  trackSlug: 'digital-agency',
  orderIndex: 2,
  title: bi('Del contacto al cliente recurrente', 'From contact to recurring client'),
  description: bi(
    'Elegir lista por coste por reunión, conducir la llamada de diagnóstico y montar una entrega con informes que retiene. La parte que convierte prospectos en igual mensual.',
    'Choosing lists by cost per meeting, running the diagnostic call and building a reporting-led delivery that retains. The part that turns prospects into a monthly retainer.'
  ),
  lessons: LESSONS,
};
