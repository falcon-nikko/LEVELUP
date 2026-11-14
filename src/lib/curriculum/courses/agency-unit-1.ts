import { bi, opt } from '@/lib/curriculum/authoring';
import { Lesson, Unit } from '@/lib/curriculum/types';

/* ==========================================================================
   DIGITAL AGENCY B2B · Unit 1 — Nicho, oferta e infraestructura
   Datos de referencia: benchmarks de cold email 2026 (Instantly, ModernInbound,
   Dupple, Formanorden, Virtuwise).
   ========================================================================== */

const LESSONS: Lesson[] = [
  /* ---------------------------------------------------------------- L1 -- */
  {
    slug: 'agency-01-nicho-icp',
    unitSlug: 'agency-unit-1',
    trackSlug: 'digital-agency',
    orderIndex: 1,
    title: bi('Nicho e ICP: por qué estrechar gana', 'Niche and ICP: why narrowing wins'),
    outcome: bi(
      'Definirás un ICP con atributos verificables y disqualifiers, y sabrás por qué el nicho sube el precio.',
      'You will define an ICP with verifiable attributes and disqualifiers, and know why the niche raises the price.'
    ),
    durationMin: 13,
    xpReward: 140,
    theory: [
      {
        id: 'ag01-t1',
        heading: bi('"Para todos" significa para nadie con urgencia', '"For everyone" means for nobody in a hurry'),
        body: bi(
          'Cuando sirves a cualquier empresa, tu mensaje no puede nombrar un dolor concreto. Y un mensaje genérico compite por precio. El nicho te permite decir la frase que el cliente lleva meses pensando.',
          'When you serve any company, your message cannot name a concrete pain. And a generic message competes on price. The niche lets you say the sentence the client has been thinking for months.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('Sin nicho', 'No niche'),
            tone: 'bad',
            items: [
              bi('"Ayudamos a empresas a crecer con marketing digital"', '"We help companies grow with digital marketing"'),
              bi('El cliente piensa: eso dice todo el mundo', 'The client thinks: everyone says that'),
              bi('Compite por precio y plazo', 'Competes on price and timeframe'),
            ],
          },
          right: {
            title: bi('Con nicho', 'With a niche'),
            tone: 'good',
            items: [
              bi('"Clínicas dentales de 2-5 sillas que dependen de las reseñas de Google"', '"Dental clinics with 2-5 chairs that depend on Google reviews"'),
              bi('El cliente piensa: habla de mí', 'The client thinks: they are talking about me'),
              bi('Compite por especificidad y resultado', 'Competes on specificity and outcome'),
            ],
          },
        },
      },
      {
        id: 'ag01-t2',
        heading: bi('Un ICP son atributos verificables, no un retrato', 'An ICP is verifiable attributes, not a portrait'),
        body: bi(
          '"Empresa joven con mentalidad digital" no se puede buscar en una base de datos. "Clínica dental, 2-5 empleados en LinkedIn, web propia, entre 10 y 500 reseñas en Google" sí. Si no puedes construir la lista, no tienes un ICP.',
          '"A young company with a digital mindset" cannot be searched in a database. "Dental clinic, 2-5 employees on LinkedIn, own website, between 10 and 500 Google reviews" can. If you cannot build the list, you do not have an ICP.'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Atributo', 'Attribute'), bi('No verificable', 'Not verifiable'), bi('Verificable', 'Verifiable')],
          rows: [
            ['Tamaño', 'empresa pequeña', '2-5 empleados en LinkedIn'],
            ['Madurez digital', 'les interesa el marketing', 'tiene web propia y ficha de Google'],
            ['Momento', 'quiere crecer', 'publicó 3 ofertas de empleo este mes'],
            ['Capacidad de pago', 'tiene presupuesto', 'factura estimada por nº de reseñas y sede'],
          ],
          highlightRow: 1,
        },
        why: bi('Verificable = se puede filtrar en Apollo o similar y sale una lista hoy.', 'Verifiable = it can be filtered in Apollo or similar and a list comes out today.'),
      },
      {
        id: 'ag01-t3',
        heading: bi('Los disqualifiers valen más que los qualifiers', 'Disqualifiers are worth more than qualifiers'),
        body: bi(
          'Definir quién NO es tu cliente ahorra semanas. Sin disqualifiers, aceptas proyectos que consumen el triple, pagan tarde y no dan caso de estudio. Se escriben antes del primer cliente, no después del tercero.',
          'Defining who is NOT your client saves weeks. Without disqualifiers, you take projects that consume triple, pay late and produce no case study. They are written before the first client, not after the third.'
        ),
        diagram: {
          kind: 'layers',
          layers: [
            { label: bi('Sin presupuesto mínimo', 'No minimum budget'), note: bi('no puede pagar ni el 40% de tu precio', 'cannot pay even 40% of your price'), tone: 'bad' },
            { label: bi('Sin decisor accesible', 'No accessible decision maker'), note: bi('5 personas tienen que aprobar', '5 people must approve'), tone: 'bad' },
            { label: bi('Sin datos propios', 'No own data'), note: bi('no hay historial que medir ni comparar', 'no history to measure or compare'), tone: 'warn' },
            { label: bi('Espera resultado en 2 semanas', 'Expects a result in 2 weeks'), note: bi('plazo incompatible con el servicio', 'timeframe incompatible with the service'), tone: 'bad' },
          ],
        },
      },
      {
        id: 'ag01-t4',
        heading: bi('El tamaño del nicho debe dar lista suficiente', 'The niche size must give a sufficient list'),
        body: bi(
          'Un nicho tan estrecho que solo tiene 80 empresas no sostiene una agencia. La regla práctica: al menos 1 000-2 000 empresas que cumplan los atributos en tu mercado geográfico, y capacidad de llegar a ellas por un canal común.',
          'A niche so narrow that it only has 80 companies cannot sustain an agency. The practical rule: at least 1,000-2,000 companies meeting the attributes in your geographic market, and the ability to reach them through a common channel.'
        ),
        diagram: {
          kind: 'funnel',
          stages: [
            { label: bi('Mercado total', 'Total market'), value: 22000 },
            { label: bi('Cumplen sector', 'Meet the sector'), value: 8400 },
            { label: bi('Cumplen tamaño y web', 'Meet size and website'), value: 2100 },
            { label: bi('Con señal reciente', 'With a recent signal'), value: 340 },
            { label: bi('Lista del primer mes', 'First month list'), value: 150 },
          ],
        },
      },
    ],
    examples: [
      {
        id: 'ag01-ex1',
        title: bi('Ejemplo resuelto: de "agencia de marketing" a nicho que cobra 2 400 €/mes', 'Worked example: from "marketing agency" to a niche charging €2,400/month'),
        situation: bi(
          'Una agencia de dos personas llevaba 14 meses con clientes de 5 sectores distintos, precio medio 700 €/mes y 3 cancelaciones cada 4 altas. Deciden estrechar.',
          'A two-person agency had spent 14 months with clients from 5 different sectors, an average price of €700/month and 3 cancellations for every 4 signups. They decide to narrow down.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Buscar el patrón en los clientes que sí funcionaron', 'Step 1 · Look for the pattern in the clients that did work'),
            detail: bi(
              'De los 11 clientes históricos, los 3 que más pagaron, menos dieron trabajo y mejores resultados tuvieron eran clínicas de fisioterapia con 2-4 salas. Los otros 8 eran ecommerce y restauración: baratos, exigentes y con resultados lentos.',
              'Of the 11 historical clients, the 3 who paid most, gave least work and had the best results were physiotherapy clinics with 2-4 rooms. The other 8 were e-commerce and restaurants: cheap, demanding and slow to show results.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Sector', 'Sector'), bi('Clientes', 'Clients'), bi('Precio medio', 'Average price'), bi('Churn', 'Churn'), bi('Resultado medible', 'Measurable result')],
              rows: [
                ['Fisioterapia', '3', '1 150 €', '0%', 'sí: reservas'],
                ['Ecommerce', '5', '620 €', '60%', 'parcial'],
                ['Restauración', '3', '480 €', '67%', 'no'],
              ],
              highlightRow: 0,
            },
          },
          {
            label: bi('Paso 2 · Escribir los atributos verificables', 'Step 2 · Write the verifiable attributes'),
            detail: bi(
              'Clínica de fisioterapia privada, 2-8 empleados, con web propia, ficha de Google con 20-400 reseñas, en ciudades de más de 80 000 habitantes. Cada atributo se puede filtrar en una base de datos.',
              'Private physiotherapy clinic, 2-8 employees, with its own website, a Google listing with 20-400 reviews, in cities over 80,000 inhabitants. Every attribute can be filtered in a database.'
            ),
            diagram: {
              kind: 'code',
              lang: 'filtros de lista',
              lines: [
                { text: 'sector: "fisioterapia" OR "clinica de rehabilitacion"', tone: 'good' },
                { text: 'empleados_linkedin: 2..8', tone: 'good' },
                { text: 'tiene_web: true', tone: 'good' },
                { text: 'resenas_google: 20..400', tone: 'good', label: bi('ni nueva ni saturada', 'neither new nor saturated') },
                { text: 'ciudad_poblacion: > 80000', tone: 'good' },
                { text: '=> 1 840 empresas en el mercado objetivo', tone: 'info', label: bi('lista suficiente', 'sufficient list') },
              ],
            },
          },
          {
            label: bi('Paso 3 · Escribir los disqualifiers explícitos', 'Step 3 · Write the explicit disqualifiers'),
            detail: bi(
              'Se descartan: clínicas sin recepción propia (no pueden atender más citas), las que facturan solo por aseguradora (margen fijo y precio no negociable), y las que piden resultado en menos de 30 días.',
              'Discarded: clinics without their own reception (they cannot handle more appointments), those billing only through insurance (fixed margin and non-negotiable price), and those demanding a result in under 30 days.'
            ),
            diagram: {
              kind: 'compare',
              left: {
                title: bi('Descartar siempre', 'Always discard'),
                tone: 'bad',
                items: [
                  bi('Sin recepción o sin agenda propia', 'No reception or no own booking system'),
                  bi('100% aseguradora: precio cerrado', '100% insurance: closed price'),
                  bi('"Quiero resultados en 2 semanas"', '"I want results in 2 weeks"'),
                ],
              },
              right: {
                title: bi('Priorizar', 'Prioritise'),
                tone: 'good',
                items: [
                  bi('Agenda con huecos vacíos visibles', 'Booking system with visible empty slots'),
                  bi('Tratamiento privado de ticket alto', 'High-ticket private treatment'),
                  bi('Dueño accesible por email o teléfono', 'Owner reachable by email or phone'),
                ],
              },
            },
          },
          {
            label: bi('Paso 4 · Reescribir la oferta con el lenguaje del nicho', 'Step 4 · Rewrite the offer in the language of the niche'),
            detail: bi(
              'De "gestión de marketing digital" a "llenar los huecos de la agenda de tu clínica con pacientes privados nuevos en 90 días". Mismo servicio, distinto marco: ahora se puede medir y tiene un plazo.',
              'From "digital marketing management" to "fill the empty slots in your clinic booking system with new private patients in 90 days". Same service, different frame: now it is measurable and has a timeframe.'
            ),
          },
          {
            label: bi('Paso 5 · Medir el efecto a los 4 meses', 'Step 5 · Measure the effect after 4 months'),
            detail: bi(
              'Precio medio sube de 700 € a 2 400 €/mes. Tasa de respuesta en frío de 1,8% a 5,4% (el mensaje nombra el dolor exacto). Churn de 45% a 11%. El tiempo de entrega por cliente baja un 38% porque el trabajo se repite.',
              'Average price rises from €700 to €2,400/month. Cold reply rate from 1.8% to 5.4% (the message names the exact pain). Churn from 45% to 11%. Delivery time per client drops 38% because the work repeats.'
            ),
            diagram: {
              kind: 'bars',
              max: 2400,
              unit: ' €',
              items: [
                { label: bi('Precio medio antes', 'Average price before'), value: 700, tone: 'bad' },
                { label: bi('Precio medio con nicho', 'Average price with niche'), value: 2400, tone: 'good' },
                { label: bi('Respuesta en frío antes', 'Cold reply before'), value: 432, tone: 'bad', note: bi('1,8% · escala ilustrativa', '1.8% · illustrative scale') },
                { label: bi('Respuesta en frío ahora', 'Cold reply now'), value: 1296, tone: 'good', note: bi('5,4%', '5.4%') },
              ],
            },
          },
        ],
        result: bi(
          'Mismo equipo de dos personas, mismo servicio de fondo: 3,4 veces más precio y la mitad de cancelaciones. El cambio no fue la habilidad, fue la especificidad del mensaje y de la lista.',
          'Same two-person team, same underlying service: 3.4× the price and half the cancellations. The change was not skill, it was the specificity of the message and of the list.'
        ),
        selfCheck: {
          prompt: bi('¿Qué hizo que la tasa de respuesta en frío triplicara?', 'What made the cold reply rate triple?'),
          options: [
            opt('a', 'Enviar más emails al día', 'Sending more emails a day'),
            opt('b', 'Que el mensaje pudo nombrar un dolor específico del nicho (huecos en la agenda) y el lector se reconoció', 'That the message could name a niche-specific pain (empty slots in the booking system) and the reader recognised themselves'),
            opt('c', 'Usar una herramienta de envío mejor', 'Using a better sending tool'),
            opt('d', 'Bajar el precio', 'Lowering the price'),
          ],
          correctOptionId: 'b',
          explanation: bi('La respuesta en frío sube por relevancia, no por volumen. Un mensaje que describe la situación exacta del lector se lee; uno genérico se archiva.', 'Cold replies rise through relevance, not volume. A message describing the reader exact situation gets read; a generic one gets filed.'),
        },
      },
    ],
    exercises: [
      {
        id: 'ag01-e01',
        format: 'concept',
        difficulty: 1,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Cuál es la prueba de que tu ICP está bien definido?', 'What is the proof that your ICP is well defined?'),
        options: [
          opt('a', 'Que suene profesional al leerlo', 'That it sounds professional when read'),
          opt('b', 'Que puedas construir hoy una lista de empresas que lo cumplan filtrando atributos en una base de datos', 'That you can build a list of companies meeting it today by filtering attributes in a database'),
          opt('c', 'Que tenga más de 10 características', 'That it has more than 10 characteristics'),
          opt('d', 'Que incluya el sector y el tamaño', 'That it includes sector and size'),
        ],
        correctOptionId: 'b',
        explanation: bi('Si no sale una lista, es un retrato literario, no un ICP. La prueba es operativa: filtros concretos y resultado contable.', 'If no list comes out, it is a literary portrait, not an ICP. The test is operational: concrete filters and a countable result.'),
        xp: 8,
      },
      {
        id: 'ag01-e02',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada atributo vago con su versión verificable.', 'Match each vague attribute with its verifiable version.'),
        pairs: [
          { leftId: 'l1', left: bi('Empresa pequeña', 'Small company'), rightId: 'r1', right: bi('2-8 empleados en LinkedIn', '2-8 employees on LinkedIn') },
          { leftId: 'l2', left: bi('Les importa su imagen online', 'They care about their online image'), rightId: 'r2', right: bi('Ficha de Google con 20-400 reseñas', 'Google listing with 20-400 reviews') },
          { leftId: 'l3', left: bi('Están en crecimiento', 'They are growing'), rightId: 'r3', right: bi('3 ofertas de empleo publicadas en 60 días', '3 job posts published in 60 days') },
          { leftId: 'l4', left: bi('Tienen presencia digital', 'They have a digital presence'), rightId: 'r4', right: bi('Dominio propio activo y web con más de 3 páginas', 'Own active domain and a website with more than 3 pages') },
        ],
        explanation: bi('La columna derecha se puede filtrar en Apollo, LinkedIn Sales Navigator o un scraper. La izquierda solo se puede imaginar.', 'The right column can be filtered in Apollo, LinkedIn Sales Navigator or a scraper. The left one can only be imagined.'),
        xp: 12,
      },
      {
        id: 'ag01-e03',
        format: 'ordering',
        difficulty: 2,
        badge: bi('ORDENAR', 'ORDER'),
        prompt: bi('Ordena el proceso para elegir un nicho con evidencia.', 'Order the process for choosing a niche with evidence.'),
        pieces: [
          { id: 'p1', text: bi('Listar todos los clientes o proyectos que ya tuviste', 'List all the clients or projects you already had') },
          { id: 'p2', text: bi('Puntuar cada uno por precio, esfuerzo, resultado y permanencia', 'Score each one on price, effort, result and retention') },
          { id: 'p3', text: bi('Buscar el patrón común entre los mejores', 'Look for the common pattern among the best') },
          { id: 'p4', text: bi('Comprobar que el mercado tiene al menos 1 000-2 000 empresas', 'Check the market has at least 1,000-2,000 companies') },
          { id: 'p5', text: bi('Escribir atributos verificables y disqualifiers', 'Write verifiable attributes and disqualifiers') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        explanation: bi('Se parte de tu evidencia, no de lo que parece rentable desde fuera. Y se comprueba el tamaño antes de enamorarse del nicho.', 'You start from your evidence, not from what looks profitable from outside. And you check the size before falling in love with the niche.'),
        xp: 10,
      },
      {
        id: 'ag01-e04',
        format: 'worked_why',
        difficulty: 2,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('¿Por qué el nicho permitió subir el precio de 700 € a 2 400 € sin cambiar el servicio?', 'Why did the niche allow the price to rise from €700 to €2,400 without changing the service?'),
        options: [
          opt('a', 'Porque los clientes nuevos eran más ricos', 'Because the new clients were richer'),
          opt('b', 'Porque la oferta se pudo expresar como un resultado medible con plazo, y eso se compara con el coste del problema, no con otras agencias', 'Because the offer could be expressed as a measurable result with a timeframe, and that is compared with the cost of the problem, not with other agencies'),
          opt('c', 'Porque había menos competencia', 'Because there was less competition'),
          opt('d', 'Porque el servicio llevaba más trabajo', 'Because the service involved more work'),
        ],
        correctOptionId: 'b',
        explanation: bi('"Llenar los huecos de tu agenda en 90 días" se compara con lo que cuesta tener la agenda vacía. "Gestión de marketing" se compara con otras tres propuestas más baratas.', '"Fill the empty slots in your booking system in 90 days" is compared with the cost of having an empty booking system. "Marketing management" is compared with three other cheaper proposals.'),
        xp: 10,
      },
      {
        id: 'ag01-e05',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Un mercado tiene 22 000 empresas. El 38% cumple el sector, el 25% de esas cumple tamaño y web, y el 16% de las anteriores tiene señal reciente. ¿Cuántas empresas hay en tu lista prioritaria?',
          'A market has 22,000 companies. 38% meet the sector, 25% of those meet size and website, and 16% of the previous ones have a recent signal. How many companies are in your priority list?'
        ),
        answer: 335,
        tolerance: 5,
        unit: 'empresas',
        formula: bi('22 000 × 0,38 × 0,25 × 0,16', '22,000 × 0.38 × 0.25 × 0.16'),
        explanation: bi('22 000 × 0,38 = 8 360; × 0,25 = 2 090; × 0,16 = 334,4 ≈ 335 empresas. Suficiente para 6-8 meses de prospección a 150 contactos/mes.', '22,000 × 0.38 = 8,360; × 0.25 = 2,090; × 0.16 = 334.4 ≈ 335 companies. Enough for 6-8 months of prospecting at 150 contacts/month.'),
        xp: 12,
      },
      {
        id: 'ag01-e06',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('Esta definición de ICP no permite construir una lista. ¿Qué línea es el problema?', 'This ICP definition does not allow building a list. Which line is the problem?'),
        lines: [
          { id: 'c1', text: 'sector: clinicas dentales privadas', tone: 'good' },
          { id: 'c2', text: 'tamano: 3-10 empleados con web propia', tone: 'good' },
          { id: 'c3', text: 'mentalidad: abiertos a innovar y con ganas de crecer', tone: 'bad', label: bi('no filtrable', 'not filterable') },
          { id: 'c4', text: 'geografia: ciudades de mas de 100 000 habitantes', tone: 'good' },
        ],
        correctLineId: 'c3',
        explanation: bi('"Abiertos a innovar" no existe en ninguna base de datos. Se sustituye por una señal observable: tienen reserva online, han publicado empleo este trimestre o invierten ya en anuncios.', '"Open to innovation" does not exist in any database. Replace it with an observable signal: they have online booking, published a job this quarter or already invest in ads.'),
        xp: 12,
      },
      {
        id: 'ag01-e07',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos nichos posibles para tu agencia. (A) Clínicas de fisioterapia: 1 840 empresas, ticket 2 400 €/mes, ciclo de venta 3 semanas. (B) Despachos de abogados: 610 empresas, ticket 3 800 €/mes, ciclo de venta 4 meses. ¿Cuál eliges para empezar?',
          'Two possible niches for your agency. (A) Physiotherapy clinics: 1,840 companies, €2,400/month ticket, 3-week sales cycle. (B) Law firms: 610 companies, €3,800/month ticket, 4-month sales cycle. Which do you pick to start?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Nicho', 'Niche'), bi('Empresas', 'Companies'), bi('Ticket', 'Ticket'), bi('Ciclo', 'Cycle'), bi('Caja en 90 días', 'Cash in 90 days')],
          rows: [
            ['A · fisioterapia', '1 840', '2 400 €', '3 semanas', 'sí'],
            ['B · abogados', '610', '3 800 €', '4 meses', 'no'],
          ],
          highlightRow: 0,
        },
        options: [
          opt('a', 'B, porque el ticket es mayor', 'B, because the ticket is higher'),
          opt('b', 'A, porque tiene 3 veces más mercado y un ciclo que genera caja dentro de los primeros 90 días', 'A, because it has 3× the market and a cycle that generates cash within the first 90 days'),
          opt('c', 'Los dos a la vez para comparar', 'Both at once to compare'),
          opt('d', 'Ninguno hasta tener caso de éxito', 'Neither until you have a success case'),
        ],
        correctOptionId: 'b',
        explanation: bi('Al empezar, la restricción es la caja y el aprendizaje, no el ticket. Un ciclo de 4 meses sin ingresos previos mata la agencia antes de cerrar el primer cliente.', 'When starting, the constraint is cash and learning, not the ticket. A 4-month cycle with no prior income kills the agency before closing the first client.'),
        xp: 15,
      },
      {
        id: 'ag01-e08',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'Un cliente potencial encaja en tu ICP pero solo trabaja con aseguradora y tiene precio cerrado por sesión. ¿Qué haces?',
          'A potential client fits your ICP but works only with insurance and has a closed price per session. What do you do?'
        ),
        options: [
          opt('a', 'Aceptarle: encaja en el sector y el tamaño', 'Accept them: they fit the sector and size'),
          opt('b', 'Descartarle: su modelo de precio cerrado impide que más pacientes se traduzcan en más ingreso, así que tu resultado no le vale dinero', 'Discard them: their closed-price model means more patients do not translate into more revenue, so your result is not worth money to them'),
          opt('c', 'Aceptarle con descuento', 'Accept them with a discount'),
          opt('d', 'Proponerle un proyecto piloto gratuito', 'Propose a free pilot project'),
        ],
        correctOptionId: 'b',
        explanation: bi('Es un disqualifier estructural, no coyuntural. Si llenar la agenda no le aumenta el ingreso, no pagará por ello por muy bueno que sea tu trabajo.', 'It is a structural disqualifier, not a circumstantial one. If filling the booking system does not increase their revenue, they will not pay for it however good your work is.'),
        xp: 15,
      },
      {
        id: 'ag01-e09',
        format: 'numeric',
        difficulty: 4,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'La opción A son 7 clientes a 700 €/mes con churn del 45% anual. La opción B son 4 clientes a 2 400 €/mes con churn del 11% anual. Con el churn repartido en el año, ¿cuánto ingreso efectivo en miles de euros produce la opción B en 12 meses?',
          'Option A is 7 clients at €700/month with 45% annual churn. Option B is 4 clients at €2,400/month with 11% annual churn. With churn spread over the year, how much effective revenue in thousands of euros does option B produce over 12 months?'
        ),
        answer: 109,
        tolerance: 3,
        unit: 'k€',
        formula: bi('A: 7 × 700 × 12 × (1 − 0,45/2) · B: 4 × 2 400 × 12 × (1 − 0,11/2)', 'A: 7 × 700 × 12 × (1 − 0.45/2) · B: 4 × 2,400 × 12 × (1 − 0.11/2)'),
        explanation: bi('B: 4 × 2 400 × 12 = 115 200 € nominales; con churn del 11% repartido en el año, 115 200 × (1 − 0,11/2) = 108 864 € ≈ 109 k€ efectivos. A: 58 800 € nominales y solo 45 570 € ≈ 46 k€ efectivos con un churn del 45%. B más que duplica a A con menos clientes.', 'B: 4 × 2,400 × 12 = €115,200 nominal; with 11% churn spread over the year, 115,200 × (1 − 0.11/2) = €108,864 ≈ €109k effective. A: €58,800 nominal and only €45,570 ≈ €46k effective with 45% churn. B more than doubles A with fewer clients.'),
        xp: 15,
      },
      {
        id: 'ag01-e10',
        format: 'faded',
        difficulty: 3,
        badge: bi('COMPLETAR', 'COMPLETE'),
        prompt: bi('Completa la ficha de ICP. Los dos primeros atributos ya están definidos.', 'Complete the ICP sheet. The first two attributes are already defined.'),
        pieces: [
          { id: 'p1', text: bi('Sector: clínicas dentales privadas', 'Sector: private dental clinics') },
          { id: 'p2', text: bi('Tamaño: 2-8 empleados en LinkedIn', 'Size: 2-8 employees on LinkedIn') },
          { id: 'p3', text: bi('Digital: dominio propio + ficha de Google con 20-400 reseñas', 'Digital: own domain + Google listing with 20-400 reviews') },
          { id: 'p4', text: bi('Señal: oferta de empleo o anuncio activo en los últimos 60 días', 'Signal: a job post or active ad in the last 60 days') },
          { id: 'p5', text: bi('Disqualifiers: 100% aseguradora, sin recepción, exige resultado en 2 semanas', 'Disqualifiers: 100% insurance, no reception, demands a result in 2 weeks') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        lockedPieceIds: ['p1', 'p2'],
        explanation: bi('El atributo de señal es el que sube la tasa de respuesta: convierte una lista fría en una lista con motivo para escribir hoy.', 'The signal attribute is the one that raises the reply rate: it turns a cold list into a list with a reason to write today.'),
        xp: 12,
      },
      {
        id: 'ag01-e11',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Por qué un nicho con 40 empresas en total es inviable aunque cada una pagara mucho?', 'Why is a niche with 40 companies in total unviable even if each paid a lot?'),
        options: [
          opt('a', 'Porque las empresas pequeñas no pagan', 'Because small companies do not pay'),
          opt('b', 'Porque necesitas volumen para absorber los no, el churn y el aprendizaje; con 40 empresas un solo "no" permanente reduce el mercado un 2,5%', 'Because you need volume to absorb the nos, churn and learning; with 40 companies a single permanent "no" reduces the market by 2.5%'),
          opt('c', 'Porque las herramientas de envío no lo permiten', 'Because sending tools do not allow it'),
          opt('d', 'Porque el coste de adquisición sería ilegal', 'Because the acquisition cost would be illegal'),
        ],
        correctOptionId: 'b',
        explanation: bi('Con 40 empresas, tu CAC se dispara: cada rechazo es una fracción enorme del mercado y no hay rotación. Se necesita entre 1 000 y 2 000 para que el sistema funcione.', 'With 40 companies, your CAC skyrockets: every rejection is a huge fraction of the market and there is no rotation. You need between 1,000 and 2,000 for the system to work.'),
        xp: 20,
      },
      {
        id: 'ag01-e12',
        format: 'output',
        difficulty: 3,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('¿Qué lista sale de estos filtros aplicados a una base de 9 400 empresas?', 'What list comes out of these filters applied to a database of 9,400 companies?'),
        context: {
          mono: true,
          content: 'empleados: 2..8        -> 41% cumplen\ntiene_web: true          -> 63% de los anteriores\nresenas_google: 20..400  -> 38% de los anteriores',
        },
        options: [
          opt('a', '923 empresas', '923 companies'),
          opt('b', '3 854 empresas', '3,854 companies'),
          opt('c', '245 empresas', '245 companies'),
          opt('d', '1 480 empresas', '1,480 companies'),
        ],
        correctOptionId: 'a',
        explanation: bi('9 400 × 0,41 = 3 854; × 0,63 = 2 428; × 0,38 = 922,6 ≈ 923. Los filtros se multiplican en cascada: cada uno reduce sobre el resultado del anterior.', '9,400 × 0.41 = 3,854; × 0.63 = 2,428; × 0.38 = 922.6 ≈ 923. Filters multiply in a cascade: each one reduces on the result of the previous.'),
        xp: 12,
      },
      {
        id: 'ag01-e13',
        format: 'scenario',
        difficulty: 2,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi('Empiezas tu agencia sin clientes previos. ¿Cómo eliges nicho?', 'You start your agency with no previous clients. How do you choose a niche?'),
        options: [
          opt('a', 'El que tenga menos competencia', 'The one with the least competition'),
          opt('b', 'Uno donde tengas acceso a información real (un familiar, un empleo anterior, un sector que conoces) y puedas conseguir 2-3 primeros clientes con los que generar caso de éxito', 'One where you have access to real information (a relative, a previous job, a sector you know) and can get 2-3 first clients with whom to generate a success case'),
          opt('c', 'El que pague el ticket más alto', 'The one paying the highest ticket'),
          opt('d', 'Servir a todos los sectores el primer año', 'Serving all sectors in the first year'),
        ],
        correctOptionId: 'b',
        explanation: bi('Sin historial propio, el acceso a información real sustituye a la evidencia. Dos o tres clientes iniciales de un sector que entiendes generan el caso de éxito que vende los siguientes.', 'Without your own history, access to real information replaces evidence. Two or three initial clients from a sector you understand generate the success case that sells the next ones.'),
        xp: 10,
      },
    ],
    recap: [
      bi('Un ICP es verificable o no existe: atributos filtrables en una base de datos, hoy.', 'An ICP is verifiable or it does not exist: filterable attributes in a database, today.'),
      bi('Los disqualifiers ahorran más dinero que los qualifiers: se escriben antes del primer cliente.', 'Disqualifiers save more money than qualifiers: they are written before the first client.'),
      bi('El nicho sube el precio porque permite prometer un resultado medible con plazo.', 'The niche raises the price because it allows promising a measurable result with a timeframe.'),
    ],
    actionMission: {
      id: 'mission-agency-1',
      title: bi('Construye la ficha de tu ICP con 1 000 empresas', 'Build your ICP sheet with 1,000 companies'),
      objective: bi('Escribe tu ICP con atributos verificables y saca la primera lista real de al menos 200 empresas que los cumplan.', 'Write your ICP with verifiable attributes and pull the first real list of at least 200 companies that meet them.'),
      steps: [
        bi('Lista tus 5 mejores clientes o proyectos pasados y puntúa precio, esfuerzo y resultado.', 'List your 5 best past clients or projects and score price, effort and result.'),
        bi('Escribe 4 atributos filtrables y 3 disqualifiers explícitos.', 'Write 4 filterable attributes and 3 explicit disqualifiers.'),
        bi('Construye la lista en una herramienta de datos y cuenta cuántas empresas salen.', 'Build the list in a data tool and count how many companies come out.'),
      ],
      proof: bi('La ficha de ICP de una página y la lista exportada con el número real de empresas que cumplen los filtros.', 'The one-page ICP sheet and the exported list with the real number of companies meeting the filters.'),
      affiliateToolSlug: 'apollo-b2b',
      xpBonus: 25,
    },
  },

  /* ---------------------------------------------------------------- L2 -- */
  {
    slug: 'agency-02-oferta-valor',
    unitSlug: 'agency-unit-1',
    trackSlug: 'digital-agency',
    orderIndex: 2,
    title: bi('La oferta y la ecuación de valor', 'The offer and the value equation'),
    outcome: bi(
      'Construirás una oferta con resultado, probabilidad, plazo y esfuerzo, y elegirás el modelo de precio que le corresponde.',
      'You will build an offer with outcome, probability, timeframe and effort, and choose the pricing model that matches it.'
    ),
    durationMin: 13,
    xpReward: 140,
    theory: [
      {
        id: 'ag02-t1',
        heading: bi('La ecuación de valor: cuatro palancas, no una', 'The value equation: four levers, not one'),
        body: bi(
          'El valor percibido sube con el resultado prometido y la probabilidad de conseguirlo, y baja con el tiempo hasta lograrlo y el esfuerzo que exige al cliente. Casi todas las agencias solo tocan la primera palanca.',
          'Perceived value rises with the promised outcome and the probability of achieving it, and falls with the time to achieve it and the effort it demands from the client. Almost every agency only touches the first lever.'
        ),
        diagram: {
          kind: 'equation',
          tokens: [
            { text: 'resultado', tone: 'good' },
            { text: '×' },
            { text: 'probabilidad', tone: 'good' },
          ],
          result: { text: '÷ (tiempo × esfuerzo)', tone: 'info' },
        },
        why: bi('Subir la probabilidad con garantía vale más que prometer un resultado mayor.', 'Raising the probability with a guarantee is worth more than promising a bigger outcome.'),
      },
      {
        id: 'ag02-t2',
        heading: bi('Resultado medible o no es una oferta', 'A measurable outcome or it is not an offer'),
        body: bi(
          '"Mejoramos tu presencia online" no se puede verificar, así que el cliente la compara con otras por precio. "12 pacientes privados nuevos al mes en 90 días" se verifica el día 90 y se paga por lo que vale el problema.',
          '"We improve your online presence" cannot be verified, so the client compares it with others on price. "12 new private patients a month in 90 days" is verified on day 90 and is paid for what the problem is worth.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('Servicio', 'Service'),
            tone: 'bad',
            items: [
              bi('"Gestión de campañas y redes"', '"Campaign and social management"'),
              bi('Se compra por horas o por comparación', 'Bought by hours or by comparison'),
              bi('El cliente asume todo el riesgo', 'The client takes all the risk'),
            ],
          },
          right: {
            title: bi('Oferta', 'Offer'),
            tone: 'good',
            items: [
              bi('"12 pacientes privados nuevos/mes en 90 días"', '"12 new private patients/month in 90 days"'),
              bi('Se compra por el valor del resultado', 'Bought for the value of the outcome'),
              bi('Parte del riesgo lo asumes tú', 'You take part of the risk'),
            ],
          },
        },
      },
      {
        id: 'ag02-t3',
        heading: bi('Tres modelos de precio y su riesgo real', 'Three pricing models and their real risk'),
        body: bi(
          'Igual mensual: ingreso previsible y riesgo bajo, pero el cliente pregunta "qué hago por mi dinero". Por proyecto: claro y cerrado, pero ingreso irregular. Por resultado: el más atractivo para el cliente y el más peligroso para ti si los datos no son auditables.',
          'Monthly retainer: predictable income and low risk, but the client asks "what am I getting for my money". Per project: clear and closed, but irregular income. Performance: the most attractive for the client and the most dangerous for you if the data is not auditable.'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Modelo', 'Model'), bi('Riesgo cliente', 'Client risk'), bi('Riesgo agencia', 'Agency risk'), bi('Cuándo usarlo', 'When to use it')],
          rows: [
            ['Igual mensual', 'medio', 'bajo', 'servicio continuo con entregables'],
            ['Proyecto cerrado', 'bajo', 'medio', 'alcance y plazo definibles'],
            ['Por resultado', 'muy bajo', 'alto', 'datos auditables y confianza previa'],
            ['Híbrido: fijo + bonus', 'bajo', 'medio', 'la mejor opción al empezar'],
          ],
          highlightRow: 3,
        },
      },
      {
        id: 'ag02-t4',
        heading: bi('La garantía es un precio, no un regalo', 'The guarantee is a price, not a gift'),
        body: bi(
          '"Si no llegamos a X, trabajamos gratis hasta conseguirlo" sube la probabilidad percibida y permite cobrar más. Solo se ofrece cuando tu tasa de éxito histórica es alta: con un 60% de éxito, la garantía te arruina.',
          '"If we do not reach X, we work free until we do" raises perceived probability and lets you charge more. It is only offered when your historical success rate is high: at a 60% success rate, the guarantee ruins you.'
        ),
        diagram: {
          kind: 'bars',
          max: 100,
          unit: '%',
          items: [
            { label: bi('Éxito histórico 60%', 'Historical success 60%'), value: 60, tone: 'bad', note: bi('garantía ruinosa', 'ruinous guarantee') },
            { label: bi('Éxito histórico 80%', 'Historical success 80%'), value: 80, tone: 'warn', note: bi('garantía de trabajo extra', 'guarantee means extra work') },
            { label: bi('Éxito histórico 92%', 'Historical success 92%'), value: 92, tone: 'good', note: bi('garantía que vende y casi no se activa', 'guarantee that sells and rarely triggers') },
          ],
        },
      },
      {
        id: 'ag02-t5',
        heading: bi('Reducción del esfuerzo del cliente: la palanca olvidada', 'Reducing client effort: the forgotten lever'),
        body: bi(
          'Si el cliente tiene que redactar textos, aprobar 5 piezas y perseguirte, el esfuerzo baja el valor aunque el resultado sea bueno. Se reduce con una sola reunión quincenal, un canal único y entregables que no requieren decisión.',
          'If the client has to write copy, approve 5 pieces and chase you, effort lowers the value even when the outcome is good. Reduce it with a single fortnightly meeting, one channel and deliverables that require no decision.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('Alto esfuerzo cliente', 'High client effort'),
            tone: 'bad',
            items: [
              bi('4 reuniones al mes', '4 meetings a month'),
              bi('Debe redactar y aprobar todo', 'Must write and approve everything'),
              bi('Cambia de interlocutor cada semana', 'Changes contact person every week'),
            ],
          },
          right: {
            title: bi('Bajo esfuerzo cliente', 'Low client effort'),
            tone: 'good',
            items: [
              bi('1 reunión quincenal de 30 minutos', 'One 30-minute fortnightly meeting'),
              bi('Recibe entregables cerrados', 'Receives finished deliverables'),
              bi('Un canal y una persona de contacto', 'One channel and one contact person'),
            ],
          },
        },
      },
    ],
    examples: [
      {
        id: 'ag02-ex1',
        title: bi('Ejemplo resuelto: de 900 € por "gestión" a 2 800 € por oferta', 'Worked example: from €900 for "management" to €2,800 for an offer'),
        situation: bi(
          'Agencia de captación para clínicas de fisioterapia. Cobran 900 €/mes por "gestión de campañas". Cierran 1 de cada 9 propuestas y el cliente medio pregunta por el precio en la primera llamada.',
          'A lead-generation agency for physiotherapy clinics. They charge €900/month for "campaign management". They close 1 in 9 proposals and the average client asks about price on the first call.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Traducir el servicio a resultado con datos propios', 'Step 1 · Translate the service into an outcome with their own data'),
            detail: bi(
              'Mirando los 3 clientes activos: generan de media 14 pacientes privados nuevos al mes en el día 90, con un valor medio de primera visita de 65 € y un LTV de 380 €. El resultado existe; solo no estaba en la oferta.',
              'Looking at the 3 active clients: they generate an average of 14 new private patients a month by day 90, with an average first-visit value of €65 and an LTV of €380. The outcome exists; it was just not in the offer.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Cliente', 'Client'), bi('Mes 1', 'Month 1'), bi('Mes 2', 'Month 2'), bi('Mes 3', 'Month 3'), bi('Valor/mes', 'Value/month')],
              rows: [
                ['Clínica A', '4', '9', '15', '5 700 €'],
                ['Clínica B', '6', '11', '13', '4 940 €'],
                ['Clínica C', '3', '8', '14', '5 320 €'],
              ],
              note: bi('Media mes 3: 14 pacientes × 380 € de LTV = 5 320 €/mes para la clínica.', 'Month 3 average: 14 patients × €380 LTV = €5,320/month for the clinic.'),
            },
          },
          {
            label: bi('Paso 2 · Escribir la oferta con las cuatro palancas', 'Step 2 · Write the offer with the four levers'),
            detail: bi(
              'Resultado: 12 pacientes privados nuevos al mes. Plazo: día 90. Probabilidad: garantía de trabajo gratuito hasta alcanzarlo. Esfuerzo: una reunión quincenal de 30 minutos y acceso a la agenda.',
              'Outcome: 12 new private patients a month. Timeframe: day 90. Probability: a free-work guarantee until it is reached. Effort: one 30-minute fortnightly meeting and access to the booking system.'
            ),
            diagram: {
              kind: 'layers',
              layers: [
                { label: bi('RESULTADO', 'OUTCOME'), note: bi('12 pacientes privados nuevos al mes', '12 new private patients a month'), tone: 'good' },
                { label: bi('PLAZO', 'TIMEFRAME'), note: bi('medido el día 90, no antes', 'measured on day 90, not before'), tone: 'info' },
                { label: bi('PROBABILIDAD', 'PROBABILITY'), note: bi('trabajamos gratis hasta llegar a 12', 'we work free until reaching 12'), tone: 'good' },
                { label: bi('ESFUERZO', 'EFFORT'), note: bi('1 reunión quincenal de 30 min + acceso a agenda', '1 fortnightly 30-min meeting + booking access'), tone: 'info' },
              ],
            },
          },
          {
            label: bi('Paso 3 · Fijar el precio como fracción del valor creado', 'Step 3 · Set the price as a fraction of the value created'),
            detail: bi(
              '12 pacientes × 380 € de LTV = 4 560 €/mes de valor recurrente para la clínica. Cobrar 2 800 € el primer trimestre y 1 900 € después deja un retorno claro desde el mes 3 y sigue siendo 3 veces el precio anterior.',
              '12 patients × €380 LTV = €4,560/month of recurring value for the clinic. Charging €2,800 for the first quarter and €1,900 afterwards leaves a clear return from month 3 and is still 3× the previous price.'
            ),
            diagram: {
              kind: 'stack',
              total: 4560,
              prefix: '',
              parts: [
                { label: bi('Tu igual mensual', 'Your monthly retainer'), value: 1900, tone: 'good' },
                { label: bi('Beneficio de la clínica', 'Clinic profit'), value: 2660, tone: 'info' },
              ],
            },
          },
          {
            label: bi('Paso 4 · Calcular el riesgo real de la garantía', 'Step 4 · Calculate the real risk of the guarantee'),
            detail: bi(
              'Con 92% de éxito histórico en 12 proyectos, la garantía se activa en ~1 de cada 12. El coste esperado es 1 900 € / 12 = 158 € por cliente. Se cobra 900 € más que antes: la garantía se paga 5,7 veces.',
              'With a 92% historical success rate across 12 projects, the guarantee triggers in ~1 of every 12. The expected cost is €1,900 / 12 = €158 per client. They charge €900 more than before: the guarantee is paid for 5.7 times over.'
            ),
            diagram: {
              kind: 'equation',
              tokens: [
                { text: '1 900 €', tone: 'warn', label: bi('coste si falla', 'cost if it fails') },
                { text: '×' },
                { text: '8%', tone: 'warn', label: bi('tasa de fallo', 'failure rate') },
              ],
              result: { text: '152 € esperados', tone: 'good' },
            },
          },
          {
            label: bi('Paso 5 · Medir el efecto en la venta', 'Step 5 · Measure the effect on the sale'),
            detail: bi(
              'Cierre de propuestas: de 11% a 34%. La pregunta por el precio en la primera llamada desaparece en el 80% de los casos porque la oferta ya dice lo que se consigue. El ciclo de venta baja de 26 a 11 días.',
              'Proposal close rate: from 11% to 34%. The price question on the first call disappears in 80% of cases because the offer already states what is achieved. The sales cycle drops from 26 to 11 days.'
            ),
            diagram: {
              kind: 'bars',
              max: 34,
              unit: '%',
              items: [
                { label: bi('Cierre antes', 'Close rate before'), value: 11, tone: 'bad' },
                { label: bi('Cierre con oferta', 'Close rate with the offer'), value: 34, tone: 'good' },
                { label: bi('Precio medio antes', 'Average price before'), value: 9, tone: 'bad', note: bi('900 € · escala relativa', '€900 · relative scale') },
                { label: bi('Precio medio ahora', 'Average price now'), value: 19, tone: 'good', note: bi('1 900 €', '€1,900') },
              ],
            },
          },
        ],
        result: bi(
          'Mismo servicio ejecutado, 2,1 veces el precio y 3 veces la tasa de cierre. Las cuatro palancas se tocaron: resultado medible, plazo concreto, garantía y reducción del esfuerzo del cliente.',
          'Same service executed, 2.1× the price and 3× the close rate. All four levers were touched: a measurable outcome, a concrete timeframe, a guarantee and reduced client effort.'
        ),
        selfCheck: {
          prompt: bi('¿Por qué se calculó la tasa de fallo histórica antes de ofrecer la garantía?', 'Why was the historical failure rate calculated before offering the guarantee?'),
          options: [
            opt('a', 'Porque la garantía es obligatoria en servicios B2B', 'Because a guarantee is mandatory in B2B services'),
            opt('b', 'Porque una garantía con tasa de éxito baja es un coste esperado ruinosa; solo se ofrece cuando el coste esperado es una fracción pequeña del sobreprecio', 'Because a guarantee with a low success rate is a ruinous expected cost; it is only offered when the expected cost is a small fraction of the surcharge'),
            opt('c', 'Porque el cliente lo pide siempre', 'Because the client always asks for it'),
            opt('d', 'Porque reduce los impuestos', 'Because it reduces taxes'),
          ],
          correctOptionId: 'b',
          explanation: bi('152 € de coste esperado contra 900 € de sobreprecio es un negocio claro. Con un 40% de fallo serían 760 € esperados: la garantía se comería la subida.', '€152 of expected cost against a €900 surcharge is a clear business. At a 40% failure rate it would be €760 expected: the guarantee would eat the increase.'),
        },
      },
    ],
    exercises: [
      {
        id: 'ag02-e01',
        format: 'concept',
        difficulty: 1,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Cuáles son las cuatro palancas de la ecuación de valor?', 'What are the four levers of the value equation?'),
        options: [
          opt('a', 'Precio, coste, margen y volumen', 'Price, cost, margin and volume'),
          opt('b', 'Resultado prometido, probabilidad de lograrlo, tiempo hasta lograrlo y esfuerzo exigido al cliente', 'Promised outcome, probability of achieving it, time to achieve it and effort demanded of the client'),
          opt('c', 'Marca, reputación, cartera y equipo', 'Brand, reputation, portfolio and team'),
          opt('d', 'Tráfico, conversión, AOV y retención', 'Traffic, conversion, AOV and retention'),
        ],
        correctOptionId: 'b',
        explanation: bi('Las dos primeras suben el valor; las dos últimas lo bajan. Casi todas las agencias solo prometen más resultado y olvidan el plazo, la probabilidad y el esfuerzo.', 'The first two raise value; the last two lower it. Almost every agency only promises more outcome and forgets the timeframe, the probability and the effort.'),
        xp: 8,
      },
      {
        id: 'ag02-e02',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada frase de venta con la palanca que toca.', 'Match each sales phrase with the lever it touches.'),
        pairs: [
          { leftId: 'l1', left: bi('"12 pacientes nuevos al mes"', '"12 new patients a month"'), rightId: 'r1', right: bi('Resultado', 'Outcome') },
          { leftId: 'l2', left: bi('"Medido el día 90"', '"Measured on day 90"'), rightId: 'r2', right: bi('Tiempo', 'Time') },
          { leftId: 'l3', left: bi('"Trabajamos gratis hasta lograrlo"', '"We work free until it is achieved"'), rightId: 'r3', right: bi('Probabilidad', 'Probability') },
          { leftId: 'l4', left: bi('"Solo necesitas una reunión quincenal"', '"You only need one fortnightly meeting"'), rightId: 'r4', right: bi('Esfuerzo', 'Effort') },
        ],
        explanation: bi('Una oferta completa toca las cuatro. Si solo tocas el resultado, compites con cualquiera que prometa más.', 'A complete offer touches all four. If you only touch the outcome, you compete with anyone who promises more.'),
        xp: 12,
      },
      {
        id: 'ag02-e03',
        format: 'numeric',
        difficulty: 2,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Tu servicio genera 14 pacientes/mes con LTV de 380 € cada uno. Cobras 1 900 €/mes. ¿Qué retorno mensual obtiene la clínica, en euros?',
          'Your service generates 14 patients/month with an LTV of €380 each. You charge €1,900/month. What monthly return does the clinic get, in euros?'
        ),
        answer: 3420,
        tolerance: 5,
        unit: '€',
        formula: bi('(14 × 380) − 1 900', '(14 × 380) − 1,900'),
        explanation: bi('Valor creado 5 320 € menos 1 900 € = 3 420 € de retorno. Es un 2,8× sobre lo que pagan: es el argumento de venta completo.', 'Value created €5,320 minus €1,900 = €3,420 of return. That is 2.8× what they pay: it is the entire sales argument.'),
        xp: 10,
      },
      {
        id: 'ag02-e04',
        format: 'ordering',
        difficulty: 2,
        badge: bi('ORDENAR', 'ORDER'),
        prompt: bi('Ordena la construcción de una oferta desde cero.', 'Order the construction of an offer from scratch.'),
        pieces: [
          { id: 'p1', text: bi('Medir el resultado real que ya consigues en clientes actuales', 'Measure the real outcome you already achieve for current clients') },
          { id: 'p2', text: bi('Traducirlo a valor económico para el cliente (unidades × LTV)', 'Translate it into economic value for the client (units × LTV)') },
          { id: 'p3', text: bi('Añadir plazo concreto y reducción del esfuerzo del cliente', 'Add a concrete timeframe and reduced client effort') },
          { id: 'p4', text: bi('Calcular tu tasa de éxito histórica antes de ofrecer garantía', 'Calculate your historical success rate before offering a guarantee') },
          { id: 'p5', text: bi('Fijar el precio como fracción del valor creado', 'Set the price as a fraction of the value created') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        explanation: bi('El paso 1 es el que casi nadie hace: se inventa la promesa antes de medir lo que ya se cumple. Una oferta sin datos propios es publicidad.', 'Step 1 is the one almost nobody does: the promise is invented before measuring what is already delivered. An offer without your own data is advertising.'),
        xp: 10,
      },
      {
        id: 'ag02-e05',
        format: 'worked_why',
        difficulty: 3,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('¿Por qué desapareció la pregunta "¿cuánto cuesta?" en la primera llamada?', 'Why did the question "how much does it cost?" disappear on the first call?'),
        options: [
          opt('a', 'Porque el precio bajó', 'Because the price dropped'),
          opt('b', 'Porque la oferta ya incluye el resultado y el plazo: el precio se juzga contra el valor creado, no contra otras agencias', 'Because the offer already includes the outcome and the timeframe: the price is judged against the value created, not against other agencies'),
          opt('c', 'Porque los clientes del nicho tienen más dinero', 'Because clients in the niche have more money'),
          opt('d', 'Porque se ocultó el precio hasta la propuesta', 'Because the price was hidden until the proposal'),
        ],
        correctOptionId: 'b',
        explanation: bi('Cuando la oferta dice "12 pacientes en 90 días", el cliente compara 1 900 € con 4 560 € de valor. Cuando dice "gestión de campañas", compara 900 € con los 700 € de otro.', 'When the offer says "12 patients in 90 days", the client compares €1,900 with €4,560 of value. When it says "campaign management", they compare €900 with someone else €700.'),
        xp: 12,
      },
      {
        id: 'ag02-e06',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Ofreces garantía de trabajo gratis hasta el resultado. Tu igual es 1 900 €/mes y tu tasa de fallo histórica es del 8%. ¿Cuál es el coste esperado de la garantía por cliente?',
          'You offer a free-work guarantee until the outcome. Your retainer is €1,900/month and your historical failure rate is 8%. What is the expected cost of the guarantee per client?'
        ),
        answer: 152,
        tolerance: 2,
        unit: '€',
        formula: bi('1 900 × 0,08', '1,900 × 0.08'),
        explanation: bi('152 € de coste esperado. Si la garantía te permite cobrar 900 € más, el retorno es de 5,9×. Con una tasa de fallo del 40% serían 760 €: la garantía se comería casi toda la subida.', '€152 of expected cost. If the guarantee lets you charge €900 more, the return is 5.9×. At a 40% failure rate it would be €760: the guarantee would eat almost the whole increase.'),
        xp: 12,
      },
      {
        id: 'ag02-e07',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('Esta oferta no cierra. ¿Qué línea es la causa?', 'This offer does not close. Which line is the cause?'),
        lines: [
          { id: 'c1', text: 'resultado: "aumentamos tus reservas online"', tone: 'bad', label: bi('no medible', 'not measurable') },
          { id: 'c2', text: 'plazo: 90 dias', tone: 'good' },
          { id: 'c3', text: 'garantia: trabajamos gratis hasta lograrlo', tone: 'warn' },
          { id: 'c4', text: 'esfuerzo: 1 reunion quincenal de 30 min', tone: 'good' },
        ],
        correctLineId: 'c1',
        explanation: bi('"Aumentamos" no tiene número, así que la garantía de la línea 3 es imposible de aplicar: no se sabe cuándo se cumple. Sin resultado medible, la garantía es decorativa y el precio vuelve a compararse.', '"We increase" has no number, so the guarantee on line 3 is impossible to apply: nobody knows when it is met. Without a measurable outcome, the guarantee is decorative and the price gets compared again.'),
        xp: 12,
      },
      {
        id: 'ag02-e08',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos clientes potenciales. (A) Quiere pagar solo por paciente conseguido, y mide las reservas en un papel. (B) Quiere igual mensual con informe de reservas desde su sistema. ¿Con cuál aceptas precio por resultado?',
          'Two potential clients. (A) Wants to pay only per patient acquired, and tracks bookings on paper. (B) Wants a monthly retainer with a booking report from their system. With which one do you accept performance pricing?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Cliente', 'Client'), bi('Datos', 'Data'), bi('Auditables', 'Auditable'), bi('Riesgo para ti', 'Risk for you')],
          rows: [
            ['A · pago por paciente', 'papel, manual', 'no', 'muy alto'],
            ['B · igual + informe', 'sistema de agenda', 'sí', 'bajo'],
          ],
          highlightRow: 0,
        },
        options: [
          opt('a', 'Con A, porque está más motivado', 'With A, because they are more motivated'),
          opt('b', 'Con ninguno: el precio por resultado exige datos auditables y A no los tiene; a A le ofreces igual mensual con bonus', 'With neither: performance pricing requires auditable data and A does not have it; offer A a monthly retainer with a bonus'),
          opt('c', 'Con los dos por igual', 'With both equally'),
          opt('d', 'Con B, porque paga más', 'With B, because they pay more'),
        ],
        correctOptionId: 'b',
        explanation: bi('Con datos en papel no puedes demostrar tu resultado y el cliente puede negarlo. El modelo por resultado exige una fuente compartida y verificable; si no la hay, se usa fijo más bonus.', 'With data on paper you cannot prove your outcome and the client can deny it. The performance model requires a shared, verifiable source; without one, use fixed plus bonus.'),
        xp: 15,
      },
      {
        id: 'ag02-e09',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'Un cliente dice: "Tu oferta suena bien pero el otro cobra 800 €". ¿Qué respuesta ataca la causa?',
          'A client says: "Your offer sounds good but the other one charges €800". What answer attacks the cause?'
        ),
        options: [
          opt('a', 'Bajar a 1 200 € para quedar en medio', 'Drop to €1,200 to land in the middle'),
          opt('b', 'Preguntar qué resultado concreto promete el otro, con qué plazo y qué garantía, y comparar sobre esas tres variables', 'Ask what concrete outcome the other one promises, with what timeframe and what guarantee, and compare on those three variables'),
          opt('c', 'Explicar que tu equipo tiene más experiencia', 'Explain that your team has more experience'),
          opt('d', 'Ofrecer el primer mes gratis', 'Offer the first month free'),
        ],
        correctOptionId: 'b',
        explanation: bi('Casi siempre el competidor vende un servicio sin resultado, plazo ni garantía. Al hacer las tres preguntas, el cliente descubre solo que no está comparando lo mismo.', 'Almost always the competitor sells a service without an outcome, a timeframe or a guarantee. By asking the three questions, the client discovers on their own that they are not comparing the same thing.'),
        xp: 15,
      },
      {
        id: 'ag02-e10',
        format: 'numeric',
        difficulty: 4,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Cierras el 34% de las propuestas a 1 900 €/mes. Recibes 22 propuestas al mes y el churn es del 11% anual. ¿Cuántos clientes nuevos cierras al mes y qué ingreso recurrente añaden?',
          'You close 34% of proposals at €1,900/month. You receive 22 proposals a month and churn is 11% annual. How many new clients do you close a month and what recurring revenue do they add?'
        ),
        answer: 14212,
        tolerance: 100,
        unit: '€/mes',
        formula: bi('22 × 0,34 = 7,5 clientes · 7,5 × 1 900', '22 × 0.34 = 7.5 clients · 7.5 × 1,900'),
        explanation: bi('7,48 clientes nuevos al mes × 1 900 € = 14 212 € de nuevo ingreso recurrente mensual. Con churn del 11% anual (~0,9% mensual), la cartera crece de forma sostenida.', '7.48 new clients a month × €1,900 = €14,212 of new monthly recurring revenue. With 11% annual churn (~0.9% monthly), the portfolio grows steadily.'),
        xp: 15,
      },
      {
        id: 'ag02-e11',
        format: 'faded',
        difficulty: 3,
        badge: bi('COMPLETAR', 'COMPLETE'),
        prompt: bi('Completa la oferta de una página. Las dos primeras líneas ya están escritas.', 'Complete the one-page offer. The first two lines are already written.'),
        pieces: [
          { id: 'p1', text: bi('Resultado: 12 pacientes privados nuevos al mes', 'Outcome: 12 new private patients a month') },
          { id: 'p2', text: bi('Plazo: se mide el día 90 desde el arranque', 'Timeframe: measured on day 90 from kickoff') },
          { id: 'p3', text: bi('Probabilidad: garantía de trabajo gratuito hasta alcanzarlo', 'Probability: free-work guarantee until it is reached') },
          { id: 'p4', text: bi('Esfuerzo: 1 reunión quincenal de 30 min y acceso a la agenda', 'Effort: one 30-min fortnightly meeting and booking access') },
          { id: 'p5', text: bi('Precio: 2 800 €/mes el primer trimestre, 1 900 € después', 'Price: €2,800/month for the first quarter, €1,900 afterwards') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        lockedPieceIds: ['p1', 'p2'],
        explanation: bi('El precio va al final: cuando las cuatro palancas ya están escritas, el número se juzga contra el valor y no contra la competencia.', 'The price goes last: once all four levers are written, the number is judged against the value and not against the competition.'),
        xp: 12,
      },
      {
        id: 'ag02-e12',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Por qué reducir el esfuerzo del cliente sube el precio que puedes cobrar?', 'Why does reducing client effort raise the price you can charge?'),
        options: [
          opt('a', 'Porque el cliente tiene menos trabajo y por tanto más tiempo', 'Because the client has less work and therefore more time'),
          opt('b', 'Porque el esfuerzo es un coste real para el dueño (horas, decisiones, coordinación) y está en el denominador de la ecuación de valor', 'Because effort is a real cost for the owner (hours, decisions, coordination) and sits in the denominator of the value equation'),
          opt('c', 'Porque las agencias caras siempre hacen más reuniones', 'Because expensive agencies always hold more meetings'),
          opt('d', 'Porque reduce tu propio coste de entrega', 'Because it reduces your own delivery cost'),
        ],
        correctOptionId: 'b',
        explanation: bi('Un dueño de clínica valora su hora muy por encima de tu igual. Quitarle 4 reuniones y 10 aprobaciones al mes vale dinero, y se paga.', 'A clinic owner values their hour far above your retainer. Removing 4 meetings and 10 approvals a month is worth money, and it gets paid.'),
        xp: 20,
      },
      {
        id: 'ag02-e13',
        format: 'scenario',
        difficulty: 2,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi('Todavía no tienes datos propios de resultados. ¿Cómo construyes la oferta?', 'You do not have your own outcome data yet. How do you build the offer?'),
        options: [
          opt('a', 'Prometer un resultado alto para destacar', 'Promise a high outcome to stand out'),
          opt('b', 'Hacer 2 proyectos a precio reducido con medición rigurosa, y construir la oferta con esos datos reales', 'Do 2 projects at a reduced price with rigorous measurement, and build the offer with that real data'),
          opt('c', 'Usar los datos públicos del sector', 'Use public sector data'),
          opt('d', 'Vender el servicio sin resultado hasta tener cartera', 'Sell the service without an outcome until you have a portfolio'),
        ],
        correctOptionId: 'b',
        explanation: bi('Dos proyectos medidos en 60 días te dan la tasa de éxito real, que es lo que necesitas para decidir si puedes ofrecer garantía y a qué precio.', 'Two measured projects in 60 days give you the real success rate, which is what you need to decide whether you can offer a guarantee and at what price.'),
        xp: 10,
      },
    ],
    recap: [
      bi('Valor = (resultado × probabilidad) / (tiempo × esfuerzo). Se tocan las cuatro palancas, no solo la primera.', 'Value = (outcome × probability) / (time × effort). Touch all four levers, not just the first.'),
      bi('Sin número no hay oferta: se compara por precio. Con número, se compara con el coste del problema.', 'Without a number there is no offer: it is compared on price. With a number, it is compared with the cost of the problem.'),
      bi('La garantía se calcula: tasa de fallo × coste del mes gratis debe ser una fracción pequeña del sobreprecio.', 'The guarantee is calculated: failure rate × cost of the free month must be a small fraction of the surcharge.'),
    ],
    actionMission: {
      id: 'mission-agency-2',
      title: bi('Escribe tu oferta de una página con las cuatro palancas', 'Write your one-page offer with the four levers'),
      objective: bi('Redacta la oferta completa de tu servicio con resultado medible, plazo, probabilidad y esfuerzo, y fija el precio como fracción del valor.', 'Draft the complete offer for your service with a measurable outcome, timeframe, probability and effort, and set the price as a fraction of the value.'),
      steps: [
        bi('Mide el resultado real de tus clientes actuales y tradúcelo a euros con su LTV o ticket medio.', 'Measure the real outcome for your current clients and translate it into euros with their LTV or average ticket.'),
        bi('Escribe las cuatro palancas en una página, cada una con su número.', 'Write the four levers on one page, each with its number.'),
        bi('Calcula tu tasa de éxito histórica y decide si puedes ofrecer garantía, con su coste esperado.', 'Calculate your historical success rate and decide whether you can offer a guarantee, with its expected cost.'),
      ],
      proof: bi('La oferta de una página y el cálculo del coste esperado de la garantía en la misma hoja.', 'The one-page offer and the expected guarantee cost calculation on the same sheet.'),
      affiliateToolSlug: 'loom-video',
      xpBonus: 25,
    },
  },
  /* ---------------------------------------------------------------- L3 -- */
  {
    slug: 'agency-03-infra-entregabilidad',
    unitSlug: 'agency-unit-1',
    trackSlug: 'digital-agency',
    orderIndex: 3,
    title: bi('Infraestructura que no quema tu dominio', 'Infrastructure that does not burn your domain'),
    outcome: bi(
      'Dimensionarás dominios y buzones para un volumen de envío dado, con SPF, DKIM, DMARC y calentamiento previo.',
      'You will size domains and mailboxes for a given sending volume, with SPF, DKIM, DMARC and prior warm-up.'
    ),
    durationMin: 14,
    xpReward: 150,
    theory: [
      {
        id: 'ag03-t1',
        heading: bi('El dominio principal no se toca. Nunca.', 'You never touch the main domain. Ever.'),
        body: bi(
          'Si envías prospección desde tu dominio real y alguien marca spam, la penalización cae sobre el dominio que también usan tus facturas, tu web y tu correo de clientes. Se envía desde un dominio secundario o, como mínimo, un subdominio dedicado.',
          'If you send prospecting from your real domain and someone marks it as spam, the penalty lands on the domain that also carries your invoices, your website and your client email. You send from a secondary domain or, at minimum, a dedicated subdomain.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('Dominio compartido', 'Shared domain'),
            tone: 'bad',
            items: [
              bi('agencia.com envía prospección + facturas', 'agencia.com sends prospecting + invoices'),
              bi('Una queja de spam afecta a todo', 'One spam complaint affects everything'),
              bi('Sin forma de aislar el daño', 'No way to isolate the damage'),
            ],
          },
          right: {
            title: bi('Dominio aislado', 'Isolated domain'),
            tone: 'good',
            items: [
              bi('agencia-mail.com o mail.agencia.com solo para prospección', 'agencia-mail.com or mail.agencia.com for prospecting only'),
              bi('Si se quema, se sustituye por 12 €', 'If it burns, you replace it for €12'),
              bi('El dominio principal queda intacto', 'The main domain stays intact'),
            ],
          },
        },
        why: bi('Un dominio cuesta 12 € al año. Recuperar la reputación de tu dominio principal cuesta meses.', 'A domain costs €12 a year. Recovering your main domain reputation costs months.'),
      },
      {
        id: 'ag03-t2',
        heading: bi('El límite es por buzón, no por herramienta', 'The limit is per mailbox, not per tool'),
        body: bi(
          'Las herramientas de envío prometen miles al día; los proveedores de correo no. La referencia de 2026 es un máximo de 25 envíos por buzón y día al empezar, subiendo hasta 50-65 con buzones maduros y reputación limpia. Todo lo que quieras enviar por encima se consigue añadiendo buzones, no subiendo el ritmo.',
          'Sending tools promise thousands a day; email providers do not. The 2026 reference is a maximum of 25 sends per mailbox per day at the start, rising to 50-65 with mature mailboxes and a clean reputation. Anything above that is achieved by adding mailboxes, not by raising the pace.'
        ),
        diagram: {
          kind: 'equation',
          tokens: [
            { text: 'envíos/día', tone: 'info' },
            { text: '÷' },
            { text: '25 por buzón', tone: 'good' },
          ],
          result: { text: '= buzones necesarios', tone: 'info' },
        },
        why: bi('Si necesitas 100 al día, son 4 buzones. Si envías 100 desde uno, caes en spam en dos semanas.', 'If you need 100 a day, that is 4 mailboxes. If you send 100 from one, you land in spam within two weeks.'),
      },
      {
        id: 'ag03-t3',
        heading: bi('SPF, DKIM y DMARC alineados: los tres, no dos', 'SPF, DKIM and DMARC aligned: all three, not two'),
        body: bi(
          'SPF autoriza qué servidores pueden enviar por ti. DKIM firma cada mensaje. DMARC dice qué hacer con lo que falla y exige que el dominio visible esté alineado con los dos anteriores. Google aplica reglas más duras desde 5 000 envíos diarios: los tres protocolos y baja de un clic obligatoria, con tasa de queja por debajo del 0,10%.',
          'SPF authorises which servers may send for you. DKIM signs every message. DMARC states what to do with failures and requires the visible domain to be aligned with the other two. Google has applied stricter rules since 5,000 daily sends: all three protocols and mandatory one-click unsubscribe, with a complaint rate below 0.10%.'
        ),
        diagram: {
          kind: 'layers',
          layers: [
            { label: bi('SPF', 'SPF'), note: bi('qué servidores pueden enviar · máximo 10 lookups DNS', 'which servers may send · max 10 DNS lookups'), tone: 'info' },
            { label: bi('DKIM', 'DKIM'), note: bi('firma criptográfica del mensaje · selector del proveedor de envío', 'cryptographic message signature · sending provider selector'), tone: 'info' },
            { label: bi('DMARC', 'DMARC'), note: bi('p=quarantine o p=reject, alineado con SPF y DKIM', 'p=quarantine or p=reject, aligned with SPF and DKIM'), tone: 'good' },
            { label: bi('Unsubscribe en un clic', 'One-click unsubscribe'), note: bi('List-Unsubscribe + botón visible, obligatorio en volumen', 'List-Unsubscribe + visible button, mandatory at volume'), tone: 'warn' },
          ],
        },
      },
      {
        id: 'ag03-t4',
        heading: bi('Dominio nuevo sin calentar llega al 12% de la bandeja', 'A new unwarmed domain reaches 12% of the inbox'),
        body: bi(
          'La diferencia medida en 2026 entre un dominio calentado y autenticado y uno recién comprado es de 7 veces: 87% de entrega en bandeja frente a 12%. El calentamiento son 2-4 semanas de tráfico creciente que enseña a los filtros que existes y que la gente te responde.',
          'The measured 2026 difference between a warmed and authenticated domain and a freshly bought one is 7 times: 87% inbox placement versus 12%. Warm-up is 2-4 weeks of increasing traffic that teaches the filters you exist and that people reply to you.'
        ),
        diagram: {
          kind: 'bars',
          max: 100,
          unit: '%',
          items: [
            { label: bi('Dominio nuevo, sin calentar', 'New domain, unwarmed'), value: 12, tone: 'bad', note: bi('88% a spam o rechazado', '88% to spam or rejected') },
            { label: bi('Calentado + autenticado', 'Warmed + authenticated'), value: 87, tone: 'good', note: bi('referencia 2026', '2026 benchmark') },
            { label: bi('B2B SaaS mediano', 'Median B2B SaaS'), value: 92, tone: 'info' },
            { label: bi('Buzones Outlook (peor caso)', 'Outlook mailboxes (worst case)'), value: 76, tone: 'warn', note: bi('Gmail: 87%', 'Gmail: 87%') },
          ],
        },
      },
      {
        id: 'ag03-t5',
        heading: bi('Se mide la respuesta, no la apertura', 'You measure the reply, not the open'),
        body: bi(
          'Desde la protección de privacidad de Apple, la tasa de apertura está inflada por aperturas automáticas y ya no significa nada. Lo que se vigila son cuatro números: rebote por debajo del 2%, quejas por debajo del 0,1%, entrega en bandeja por encima del 90% y bajas por debajo del 0,5%.',
          'Since Apple privacy protection, the open rate is inflated by automatic opens and no longer means anything. What you watch is four numbers: bounce below 2%, complaints below 0.1%, inbox placement above 90% and unsubscribes below 0.5%.'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Métrica', 'Metric'), bi('Sano', 'Healthy'), bi('Alerta', 'Warning'), bi('Parar envío', 'Stop sending')],
          rows: [
            ['Rebote', '< 2%', '2-4%', '> 4%'],
            ['Quejas de spam', '< 0,1%', '0,1-0,25%', '> 0,3%'],
            ['Entrega en bandeja', '> 90%', '75-90%', '< 75%'],
            ['Bajas', '< 0,5%', '0,5-1,5%', '> 1,5%'],
            ['Aperturas', 'no se mira', 'no se mira', 'no se mira'],
          ],
          highlightRow: 4,
        },
      },
    ],
    examples: [
      {
        id: 'ag03-ex1',
        title: bi('Ejemplo resuelto: dimensionar la infraestructura para 2 clientes', 'Worked example: sizing the infrastructure for 2 clients'),
        situation: bi(
          'Agencia nueva con 2 clientes de captación B2B. Objetivo: 12 reuniones al mes por cliente. Tasa de respuesta objetivo 5% y conversión de respuesta a reunión 25%. Hay 21 días laborables al mes.',
          'A new agency with 2 B2B lead-gen clients. Goal: 12 meetings a month per client. Target reply rate 5% and reply-to-meeting conversion 25%. There are 21 working days a month.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Calcular los envíos necesarios por cliente', 'Step 1 · Calculate the sends needed per client'),
            detail: bi(
              '12 reuniones ÷ 25% = 48 respuestas necesarias. 48 respuestas ÷ 5% = 960 envíos al mes por cliente. Con 2 clientes: 1 920 envíos al mes.',
              '12 meetings ÷ 25% = 48 replies needed. 48 replies ÷ 5% = 960 sends a month per client. With 2 clients: 1,920 sends a month.'
            ),
            diagram: {
              kind: 'funnel',
              stages: [
                { label: bi('Envíos por cliente/mes', 'Sends per client/month'), value: 960 },
                { label: bi('Entregados (87%)', 'Delivered (87%)'), value: 835 },
                { label: bi('Respuestas (5%)', 'Replies (5%)'), value: 48 },
                { label: bi('Reuniones (25%)', 'Meetings (25%)'), value: 12 },
              ],
            },
          },
          {
            label: bi('Paso 2 · Convertir envíos mensuales en envíos diarios', 'Step 2 · Convert monthly sends into daily sends'),
            detail: bi(
              '1 920 envíos ÷ 21 días laborables = 91,4 envíos al día. Se redondea a 92 para no quedarse corto.',
              '1,920 sends ÷ 21 working days = 91.4 sends a day. Round up to 92 so you do not fall short.'
            ),
          },
          {
            label: bi('Paso 3 · Calcular buzones con el límite real por buzón', 'Step 3 · Calculate mailboxes with the real per-mailbox limit'),
            detail: bi(
              '92 envíos diarios ÷ 25 por buzón = 3,7 buzones. Se redondea hacia arriba: 4 buzones. Con 4 buzones tienes capacidad de 100 al día, un 9% de margen.',
              '92 daily sends ÷ 25 per mailbox = 3.7 mailboxes. Round up: 4 mailboxes. With 4 mailboxes you have capacity for 100 a day, a 9% margin.'
            ),
            diagram: {
              kind: 'bars',
              max: 100,
              unit: ' envíos/día',
              items: [
                { label: bi('Necesario', 'Needed'), value: 92, tone: 'info' },
                { label: bi('3 buzones (insuficiente)', '3 mailboxes (not enough)'), value: 75, tone: 'bad' },
                { label: bi('4 buzones (elegido)', '4 mailboxes (chosen)'), value: 100, tone: 'good', note: bi('9% de margen', '9% margin') },
                { label: bi('6 buzones (exceso)', '6 mailboxes (excess)'), value: 100, tone: 'mute', note: bi('mismo techo, más coste', 'same ceiling, more cost') },
              ],
            },
          },
          {
            label: bi('Paso 4 · Calcular dominios (máximo 2-3 buzones por dominio)', 'Step 4 · Calculate domains (max 2-3 mailboxes per domain)'),
            detail: bi(
              '4 buzones ÷ 2 buzones por dominio = 2 dominios secundarios. Nunca más de 3 buzones enviando desde el mismo dominio: comparten reputación y si uno cae, caen los tres.',
              '4 mailboxes ÷ 2 mailboxes per domain = 2 secondary domains. Never more than 3 mailboxes sending from the same domain: they share reputation and if one falls, all three fall.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Dominio', 'Domain'), bi('Buzones', 'Mailboxes'), bi('Envíos/día', 'Sends/day'), bi('Uso', 'Use')],
              rows: [
                ['fisio-reach.com', 'ana@ + luis@', '50', 'cliente A'],
                ['fisio-outreach.com', 'ana.r@ + luis.m@', '50', 'cliente B'],
                ['agencia.com (principal)', 'solo equipo', '0', 'facturas, clientes, web'],
              ],
              highlightRow: 2,
            },
          },
          {
            label: bi('Paso 5 · Autenticar y planificar el calendario real', 'Step 5 · Authenticate and plan the real calendar'),
            detail: bi(
              'Día 0 se compran los dominios. Día 0-1 se configuran SPF, DKIM y DMARC con p=quarantine alineado. Días 1-21 calentamiento automático. Día 22 empiezas con 5 envíos por buzón, día 29 con 15, día 36 llegas a 25. La campaña real arranca en el día 43, no el día 1. Coste total de infraestructura: 2 dominios a 12 € al año más 4 buzones a 7 €/mes = 28 € al mes.',
              'On day 0 you buy the domains. Days 0-1 you configure SPF, DKIM and DMARC with aligned p=quarantine. Days 1-21 automatic warm-up. Day 22 you start with 5 sends per mailbox, day 29 with 15, day 36 you reach 25. The real campaign starts on day 43, not day 1. Total infrastructure cost: 2 domains at €12 a year plus 4 mailboxes at €7/month = €28 a month.'
            ),
            diagram: {
              kind: 'timeline',
              steps: [
                { label: bi('Día 0 · comprar los dominios', 'Day 0 · buy the domains'), value: 'D+0', tone: 'info' },
                { label: bi('Día 1 · SPF + DKIM + DMARC', 'Day 1 · SPF + DKIM + DMARC'), value: 'D+1', tone: 'info' },
                { label: bi('Día 21 · fin del calentamiento', 'Day 21 · warm-up ends'), value: 'D+21', tone: 'good' },
                { label: bi('Día 36 · 25 envíos por buzón', 'Day 36 · 25 sends per mailbox'), value: 'D+36', tone: 'good' },
                { label: bi('Día 43 · campaña a pleno ritmo', 'Day 43 · campaign at full pace'), value: 'D+43', tone: 'good' },
              ],
            },
          },
        ],
        result: bi(
          '2 dominios, 4 buzones, 28 € al mes de infraestructura y 43 días hasta el primer envío real. Ese coste es el 1,5% de lo que cobra un solo cliente. Lo que no se puede recuperar es el mes que se pierde por enviar el día 1 desde un dominio frío.',
          '2 domains, 4 mailboxes, €28 a month of infrastructure and 43 days until the first real send. That cost is 1.5% of what a single client pays. What cannot be recovered is the month lost by sending on day 1 from a cold domain.'
        ),
        selfCheck: {
          prompt: bi('¿Por qué se usan 2 dominios y no 1 con los 4 buzones?', 'Why use 2 domains instead of 1 with all 4 mailboxes?'),
          options: [
            opt('a', 'Porque cada dominio solo admite 2 cuentas de correo', 'Because each domain only supports 2 email accounts'),
            opt('b', 'Porque los buzones del mismo dominio comparten reputación: si uno genera quejas, el proveedor penaliza a los cuatro a la vez', 'Because mailboxes on the same domain share reputation: if one generates complaints, the provider penalises all four at once'),
            opt('c', 'Porque los clientes distintos exigen dominios distintos', 'Because different clients require different domains'),
            opt('d', 'Porque el SPF no permite más de 2 buzones', 'Because SPF does not allow more than 2 mailboxes'),
          ],
          correctOptionId: 'b',
          explanation: bi('La reputación se hereda por dominio. Separar clientes y limitar a 2-3 buzones por dominio convierte un problema potencial en un buzón que se apaga, no en toda la operación.', 'Reputation is inherited per domain. Separating clients and limiting to 2-3 mailboxes per domain turns a potential problem into one mailbox you switch off, not the whole operation.'),
        },
      },
    ],
    exercises: [
      {
        id: 'ag03-e01',
        format: 'concept',
        difficulty: 1,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Cuál es el volumen máximo razonable por buzón al empezar a enviar prospección?', 'What is the reasonable maximum volume per mailbox when you start sending prospecting?'),
        options: [
          opt('a', '25 envíos al día por buzón', '25 sends a day per mailbox'),
          opt('b', '200 envíos al día por buzón', '200 sends a day per mailbox'),
          opt('c', 'No hay límite si el contenido es bueno', 'There is no limit if the content is good'),
          opt('d', '1 000 al día por dominio', '1,000 a day per domain'),
        ],
        correctOptionId: 'a',
        explanation: bi('La referencia de 2026 es 25 por buzón al día al empezar, subiendo a 50-65 con buzones maduros. Más volumen se consigue con más buzones, no con más envíos por buzón.', 'The 2026 reference is 25 per mailbox a day at the start, rising to 50-65 with mature mailboxes. More volume comes from more mailboxes, not more sends per mailbox.'),
        xp: 8,
      },
      {
        id: 'ag03-e02',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada protocolo con lo que hace realmente.', 'Match each protocol with what it actually does.'),
        pairs: [
          { leftId: 'l1', left: bi('SPF', 'SPF'), rightId: 'r1', right: bi('Autoriza qué servidores pueden enviar por tu dominio', 'Authorises which servers may send for your domain') },
          { leftId: 'l2', left: bi('DKIM', 'DKIM'), rightId: 'r2', right: bi('Firma criptográficamente cada mensaje', 'Cryptographically signs each message') },
          { leftId: 'l3', left: bi('DMARC', 'DMARC'), rightId: 'r3', right: bi('Dice qué hacer con lo que falla y exige alineación', 'States what to do with failures and requires alignment') },
          { leftId: 'l4', left: bi('List-Unsubscribe', 'List-Unsubscribe'), rightId: 'r4', right: bi('Permite la baja en un clic y reduce las quejas', 'Allows one-click unsubscribe and reduces complaints') },
        ],
        explanation: bi('Los tres primeros son de autenticación; el cuarto es de higiene. Google los exige juntos por encima de 5 000 envíos diarios.', 'The first three are authentication; the fourth is hygiene. Google requires them together above 5,000 daily sends.'),
        xp: 12,
      },
      {
        id: 'ag03-e03',
        format: 'numeric',
        difficulty: 2,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Necesitas 150 envíos al día. Con el límite de 25 por buzón, ¿cuántos buzones hacen falta?',
          'You need 150 sends a day. With the limit of 25 per mailbox, how many mailboxes are needed?'
        ),
        answer: 6,
        tolerance: 0,
        unit: 'buzones',
        formula: bi('150 ÷ 25 = 6', '150 ÷ 25 = 6'),
        explanation: bi('6 buzones exactos. Con un máximo de 2-3 buzones por dominio, eso son 2 o 3 dominios secundarios.', 'Exactly 6 mailboxes. With a maximum of 2-3 mailboxes per domain, that is 2 or 3 secondary domains.'),
        xp: 10,
      },
      {
        id: 'ag03-e04',
        format: 'ordering',
        difficulty: 2,
        badge: bi('ORDENAR', 'ORDER'),
        prompt: bi('Ordena la puesta en marcha de la infraestructura de envío.', 'Order the setup of the sending infrastructure.'),
        pieces: [
          { id: 'p1', text: bi('Comprar el dominio secundario (nunca usar el principal)', 'Buy the secondary domain (never use the main one)') },
          { id: 'p2', text: bi('Crear los buzones y configurar SPF, DKIM y DMARC alineado', 'Create the mailboxes and configure aligned SPF, DKIM and DMARC') },
          { id: 'p3', text: bi('Verificar la configuración con una herramienta de test antes de enviar', 'Verify the configuration with a test tool before sending') },
          { id: 'p4', text: bi('Calentar los buzones durante 2-4 semanas', 'Warm up the mailboxes for 2-4 weeks') },
          { id: 'p5', text: bi('Empezar con 5 envíos por buzón y subir hasta 25 en 2 semanas', 'Start with 5 sends per mailbox and rise to 25 over 2 weeks') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        explanation: bi('El paso que más se salta es el 3: se configura el DMARC y se asume que funciona. Un test de 30 segundos evita semanas de envíos a spam.', 'The most skipped step is 3: you configure DMARC and assume it works. A 30-second test avoids weeks of sending to spam.'),
        xp: 10,
      },
      {
        id: 'ag03-e05',
        format: 'worked_why',
        difficulty: 3,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('¿Por qué la campaña real arranca en el día 43 y no en el día 1?', 'Why does the real campaign start on day 43 and not day 1?'),
        options: [
          opt('a', 'Porque hay que escribir 43 emails de prueba', 'Because you have to write 43 test emails'),
          opt('b', 'Porque el calentamiento (21 días) más la rampa de volumen (14 días) es lo que lleva la entrega en bandeja del 12% al 87%', 'Because warm-up (21 days) plus the volume ramp (14 days) is what takes inbox placement from 12% to 87%'),
          opt('c', 'Porque los dominios tardan 43 días en activarse', 'Because domains take 43 days to activate'),
          opt('d', 'Porque el proveedor de correo lo exige por contrato', 'Because the email provider requires it by contract'),
        ],
        correctOptionId: 'b',
        explanation: bi('Sin calentamiento, 960 envíos producen unas 115 entregas en bandeja. Con la infraestructura madura, las mismas 960 producen 835. El trabajo de los 43 días multiplica por 7 el resultado.', 'Without warm-up, 960 sends produce about 115 inbox deliveries. With mature infrastructure, the same 960 produce 835. The work of those 43 days multiplies the result by 7.'),
        xp: 12,
      },
      {
        id: 'ag03-e06',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Envías 960 emails al mes. Con dominio frío llegas al 12% de bandeja; con dominio calentado, al 87%. ¿Cuántas entregas en bandeja adicionales consigues al mes?',
          'You send 960 emails a month. With a cold domain you reach 12% inbox; with a warmed domain, 87%. How many additional inbox deliveries do you get a month?'
        ),
        answer: 720,
        tolerance: 2,
        unit: 'emails',
        formula: bi('960 × (0,87 − 0,12)', '960 × (0.87 − 0.12)'),
        explanation: bi('960 × 0,12 = 115 frente a 960 × 0,87 = 835. Diferencia: 720 entregas en bandeja. A 5% de respuesta son 36 respuestas más, es decir 9 reuniones más al mes.', '960 × 0.12 = 115 versus 960 × 0.87 = 835. Difference: 720 inbox deliveries. At a 5% reply rate that is 36 more replies, meaning 9 more meetings a month.'),
        xp: 12,
      },
      {
        id: 'ag03-e07',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('Esta configuración hace que los emails lleguen a spam. ¿Qué línea es el fallo?', 'This configuration makes the emails land in spam. Which line is the fault?'),
        context: {
          mono: true,
          label: bi('Registros DNS del dominio de envío', 'DNS records of the sending domain'),
          content: 'SPF   v=spf1 include:_spf.google.com include:mail.zendesk.net ... (14 includes) ~all\nDKIM  selector del proveedor de envio, clave de 2048 bits\nDMARC v=DMARC1; p=none; rua=mailto:dmarc@dominio.com',
        },
        lines: [
          { id: 'c1', text: 'SPF con 14 includes (supera el limite de 10 lookups DNS)', tone: 'bad', label: bi('SPF inválido → PermError', 'invalid SPF → PermError') },
          { id: 'c2', text: 'DKIM con clave de 2048 bits', tone: 'good' },
          { id: 'c3', text: 'DMARC con p=none', tone: 'warn', label: bi('aceptable en fase de prueba', 'acceptable in testing') },
          { id: 'c4', text: 'rua apunta a un buzón real', tone: 'good' },
        ],
        correctLineId: 'c1',
        explanation: bi('SPF permite un máximo de 10 lookups DNS. Con 14, el registro devuelve PermError y se trata como si no existiera: falla la autenticación y cae la entrega. Se resuelve aplanando los includes o con un servicio que los aplana automáticamente.', 'SPF allows a maximum of 10 DNS lookups. With 14, the record returns PermError and is treated as if it did not exist: authentication fails and delivery drops. Fix it by flattening includes or using an auto-flattening service.'),
        xp: 12,
      },
      {
        id: 'ag03-e08',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos formas de pasar de 50 a 200 envíos al día. (A) Subir cada buzón existente de 25 a 100 envíos. (B) Añadir 6 buzones nuevos y calentarlos 3 semanas manteniendo 25 por buzón. ¿Cuál es correcta?',
          'Two ways to go from 50 to 200 sends a day. (A) Raise each existing mailbox from 25 to 100 sends. (B) Add 6 new mailboxes and warm them for 3 weeks keeping 25 per mailbox. Which is correct?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Opción', 'Option'), bi('Envío/buzón', 'Sends/mailbox'), bi('Riesgo de spam', 'Spam risk'), bi('Tiempo hasta activo', 'Time to active')],
          rows: [
            ['A · subir ritmo', '100/día', 'muy alto', 'inmediato'],
            ['B · añadir buzones', '25/día', 'bajo', '3 semanas'],
          ],
          highlightRow: 1,
        },
        options: [
          opt('a', 'A, porque es inmediata y no cuesta dinero', 'A, because it is immediate and costs no money'),
          opt('b', 'B, porque mantiene cada buzón bajo el límite real y la escalada es horizontal', 'B, because it keeps each mailbox under the real limit and the scaling is horizontal'),
          opt('c', 'A los 25 primeros y luego B', 'A for the first 25 and then B'),
          opt('d', 'Ninguna: 200 al día no es alcanzable', 'Neither: 200 a day is not achievable'),
        ],
        correctOptionId: 'b',
        explanation: bi('La escala en frío es horizontal, nunca vertical. Subir el ritmo por buzón es exactamente el patrón que los filtros detectan como envío masivo no solicitado.', 'Cold scaling is horizontal, never vertical. Raising the pace per mailbox is exactly the pattern filters detect as unsolicited bulk sending.'),
        xp: 15,
      },
      {
        id: 'ag03-e09',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'Día 12 de campaña: rebote 1,1%, quejas 0,06%, bajas 0,3%, pero la entrega en bandeja ha caído del 88% al 71%. ¿Qué haces primero?',
          'Day 12 of the campaign: bounce 1.1%, complaints 0.06%, unsubscribes 0.3%, but inbox placement has fallen from 88% to 71%. What do you do first?'
        ),
        options: [
          opt('a', 'Seguir igual: el resto de métricas está sano', 'Keep going: the other metrics are healthy'),
          opt('b', 'Reducir el volumen diario a la mitad, revisar la lista contra rebotes duros y comprobar la alineación DMARC por proveedor (Outlook penaliza antes que Gmail)', 'Halve the daily volume, check the list against hard bounces and verify DMARC alignment per provider (Outlook penalises before Gmail)'),
          opt('c', 'Cambiar de herramienta de envío', 'Switch sending tools'),
          opt('d', 'Reescribir el asunto de los emails', 'Rewrite the email subject lines'),
        ],
        correctOptionId: 'b',
        explanation: bi('Una caída de bandeja con quejas y rebotes sanos suele venir de la lista (direcciones viejas que rebotan en diferido) o de un proveedor concreto. Bajar volumen da tiempo a recuperar reputación mientras se diagnostica.', 'An inbox drop with healthy complaints and bounces usually comes from the list (old addresses bouncing in delay) or from one specific provider. Lowering volume buys time to recover reputation while you diagnose.'),
        xp: 15,
      },
      {
        id: 'ag03-e10',
        format: 'numeric',
        difficulty: 4,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Tienes 3 clientes. Cada uno necesita 1 100 envíos al mes. Con 21 días laborables y 25 envíos por buzón al día, ¿cuántos buzones necesitas?',
          'You have 3 clients. Each needs 1,100 sends a month. With 21 working days and 25 sends per mailbox a day, how many mailboxes do you need?'
        ),
        answer: 7,
        tolerance: 0,
        unit: 'buzones',
        formula: bi('3 300 ÷ 21 = 157 al día · 157 ÷ 25 = 6,3 → 7', '3,300 ÷ 21 = 157 a day · 157 ÷ 25 = 6.3 → 7'),
        explanation: bi('3 300 envíos al mes son 157 al día, que entre 25 dan 6,3 buzones. Se redondea a 7: nunca se redondea hacia abajo en capacidad de envío. Son 3 dominios con 2-3 buzones cada uno.', '3,300 monthly sends are 157 a day, which divided by 25 gives 6.3 mailboxes. Round up to 7: you never round down on sending capacity. That is 3 domains with 2-3 mailboxes each.'),
        xp: 15,
      },
      {
        id: 'ag03-e11',
        format: 'faded',
        difficulty: 3,
        badge: bi('COMPLETAR', 'COMPLETE'),
        prompt: bi('Completa el checklist de lanzamiento de infraestructura. Las dos primeras casillas ya están verificadas.', 'Complete the infrastructure launch checklist. The first two boxes are already verified.'),
        pieces: [
          { id: 'p1', text: bi('Dominio secundario comprado y separado del principal', 'Secondary domain bought and separate from the main one') },
          { id: 'p2', text: bi('SPF válido con menos de 10 lookups DNS', 'Valid SPF with fewer than 10 DNS lookups') },
          { id: 'p3', text: bi('DKIM de 2048 bits del proveedor de envío activado', 'DKIM at 2048 bits from the sending provider activated') },
          { id: 'p4', text: bi('DMARC con p=quarantine y dominio alineado', 'DMARC with p=quarantine and an aligned domain') },
          { id: 'p5', text: bi('List-Unsubscribe de un clic en la plantilla', 'One-click List-Unsubscribe in the template') },
          { id: 'p6', text: bi('21 días de calentamiento completados antes del primer envío', '21 days of warm-up completed before the first send') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'],
        lockedPieceIds: ['p1', 'p2'],
        explanation: bi('Sin las seis casillas el envío es una apuesta. Con las seis, la diferencia contra un dominio frío es de 7 veces la entrega en bandeja.', 'Without all six boxes sending is a gamble. With all six, the difference against a cold domain is 7× the inbox placement.'),
        xp: 12,
      },
      {
        id: 'ag03-e12',
        format: 'output',
        difficulty: 5,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('Informe semanal de un buzón. ¿Qué conclusión es correcta?', 'A mailbox weekly report. Which conclusion is correct?'),
        context: {
          mono: true,
          label: bi('Buzón ana@fisio-reach.com · semana 3', 'Mailbox ana@fisio-reach.com · week 3'),
          content: 'enviados            128\nentregados          124   (96,9%)\nen bandeja           79   (63,7% de los enviados)\naperturas            118  (95,2% de los entregados)\nrespuestas              3   (2,4%)\nrebotes                 4   (3,1%)\nquejas de spam          0   (0,0%)\nbajas                   1   (0,8%)',
        },
        options: [
          opt('a', 'Todo sano: las aperturas al 95% indican que el contenido funciona', 'All healthy: 95% opens show the content works'),
          opt('b', 'Hay dos problemas reales: entrega en bandeja del 64% (por debajo del 90% sano) y rebote del 3,1% (por encima del 2%); las aperturas al 95% son un dato inflado que no se debe usar', 'There are two real problems: 64% inbox placement (below the healthy 90%) and 3.1% bounce (above 2%); the 95% opens are an inflated figure that must not be used'),
          opt('c', 'Solo hay que mejorar la respuesta del 2,4%', 'Only the 2.4% reply rate needs improving'),
          opt('d', 'Se debe subir el volumen para compensar el rebote', 'Volume should be raised to compensate for the bounce'),
        ],
        correctOptionId: 'b',
        explanation: bi('Las aperturas al 95% con 2,4% de respuesta son la firma de aperturas automáticas: no significan nada. Lo que importa es que 36 de cada 100 emails no llegan a la bandeja y 3 rebotan, y eso se arregla con lista y autenticación, no con copy.', '95% opens with a 2.4% reply rate is the signature of automatic opens: they mean nothing. What matters is that 36 of every 100 emails do not reach the inbox and 3 bounce, and that is fixed with the list and authentication, not with copy.'),
        xp: 20,
      },
      {
        id: 'ag03-e13',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Por qué se ignora la tasa de apertura desde 2021?', 'Why has the open rate been ignored since 2021?'),
        options: [
          opt('a', 'Porque los proveedores dejaron de registrar aperturas', 'Because providers stopped logging opens'),
          opt('b', 'Porque la protección de privacidad de los clientes de correo abre automáticamente cada mensaje, inflando el dato sin que nadie lo lea', 'Because mail client privacy protection automatically opens every message, inflating the figure without anyone reading it'),
          opt('c', 'Porque las aperturas no se pueden medir en texto plano', 'Because opens cannot be measured in plain text'),
          opt('d', 'Porque solo se aplican a campañas con imágenes', 'Because they only apply to campaigns with images'),
        ],
        correctOptionId: 'b',
        explanation: bi('Un 95% de aperturas con un 2,4% de respuesta es imposible si la gente leyera de verdad. La métrica útil es la respuesta, que no se puede falsificar.', 'A 95% open rate with a 2.4% reply rate is impossible if people were really reading. The useful metric is the reply, which cannot be faked.'),
        xp: 20,
      },
    ],
    recap: [
      bi('Dominio secundario dedicado, máximo 25 envíos por buzón al día y nunca más de 3 buzones por dominio.', 'A dedicated secondary domain, a maximum of 25 sends per mailbox a day and never more than 3 mailboxes per domain.'),
      bi('SPF por debajo de 10 lookups, DKIM de 2048 bits y DMARC alineado; sin eso, el resto no importa.', 'SPF below 10 lookups, 2048-bit DKIM and aligned DMARC; without those, nothing else matters.'),
      bi('Se mide respuesta, rebote, quejas y bandeja. La tasa de apertura es un dato inflado y no se usa.', 'You measure reply, bounce, complaints and inbox placement. The open rate is an inflated figure and is not used.'),
    ],
    actionMission: {
      id: 'mission-agency-3',
      title: bi('Monta y verifica tu infraestructura de envío', 'Set up and verify your sending infrastructure'),
      objective: bi('Comprar un dominio secundario, configurar y validar SPF, DKIM y DMARC, y dejar el calentamiento en marcha.', 'Buy a secondary domain, configure and validate SPF, DKIM and DMARC, and get the warm-up running.'),
      steps: [
        bi('Compra un dominio secundario de envío y crea los buzones que necesites para tu volumen objetivo a 25 por buzón.', 'Buy a secondary sending domain and create the mailboxes you need for your target volume at 25 per mailbox.'),
        bi('Configura SPF (menos de 10 lookups), DKIM de 2048 bits y DMARC con p=quarantine alineado.', 'Configure SPF (fewer than 10 lookups), 2048-bit DKIM and aligned DMARC with p=quarantine.'),
        bi('Pasa un test de autenticación y una captura del resultado con los tres protocolos en verde.', 'Run an authentication test and capture the result with all three protocols in green.'),
      ],
      proof: bi('Captura del test de entregabilidad con SPF, DKIM y DMARC validados, más el número de buzones y su límite diario.', 'A screenshot of the deliverability test with SPF, DKIM and DMARC validated, plus the number of mailboxes and their daily limit.'),
      affiliateToolSlug: 'instantly-outreach',
      xpBonus: 30,
    },
  },
  /* ---------------------------------------------------------------- L4 -- */
  {
    slug: 'agency-04-copy-secuencia',
    unitSlug: 'agency-unit-1',
    trackSlug: 'digital-agency',
    orderIndex: 4,
    title: bi('Copy y secuencia: menos de 80 palabras', 'Copy and sequence: fewer than 80 words'),
    outcome: bi(
      'Escribirás un primer email de menos de 80 palabras en texto plano y ordenarás una secuencia de 4 a 7 toques.',
      'You will write a first email of fewer than 80 words in plain text and order a sequence of 4 to 7 touches.'
    ),
    durationMin: 14,
    xpReward: 150,
    theory: [
      {
        id: 'ag04-t1',
        heading: bi('El primer email tiene un techo de 80 palabras', 'The first email has an 80-word ceiling'),
        body: bi(
          'La media del sector en 2026 es una respuesta por cada 29 envíos. El primer toque debe caber en una pantalla de móvil sin desplazar: por debajo de 80 palabras. Todo lo que sobra es una razón más para no responder.',
          'The 2026 industry average is one reply per 29 sends. The first touch must fit on a phone screen without scrolling: under 80 words. Everything above that is one more reason not to reply.'
        ),
        diagram: {
          kind: 'bars',
          max: 12,
          unit: '%',
          items: [
            { label: bi('Media del sector', 'Industry average'), value: 3, tone: 'warn', note: bi('3,43%', '3.43%') },
            { label: bi('Percentil 75', '75th percentile'), value: 6, tone: 'info', note: bi('≥5,5%', '≥5.5%') },
            { label: bi('Percentil 90', '90th percentile'), value: 11, tone: 'good', note: bi('≥10,7%', '≥10.7%') },
          ],
        },
        why: bi('Pasar de 3,4% a 5,5% no es escribir mejor: es escribir más corto y con una señal concreta.', 'Going from 3.4% to 5.5% is not about writing better: it is about writing shorter and with a concrete signal.'),
      },
      {
        id: 'ag04-t2',
        heading: bi('Texto plano. El HTML con formato entrega peor', 'Plain text. Formatted HTML delivers worse'),
        body: bi(
          'Un email con cabeceras de color, botones, logotipo y tres columnas se parece a un boletín comercial, y los filtros lo tratan como tal. El texto plano sin imágenes se parece a un email de una persona y llega más. Un enlace como máximo, o ninguno en el primer toque.',
          'An email with coloured headers, buttons, a logo and three columns looks like a commercial newsletter, and filters treat it as such. Plain text without images looks like an email from a person and lands more. One link at most, or none in the first touch.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('Parece campaña', 'Looks like a campaign'),
            tone: 'bad',
            items: [
              bi('Logotipo, colores, botones, columnas', 'Logo, colours, buttons, columns'),
              bi('3 enlaces y píxel de seguimiento', '3 links and a tracking pixel'),
              bi('Firma con redes sociales y aviso legal', 'Signature with social links and legal notice'),
            ],
          },
          right: {
            title: bi('Parece una persona', 'Looks like a person'),
            tone: 'good',
            items: [
              bi('Texto plano, sin imágenes', 'Plain text, no images'),
              bi('0 o 1 enlace', '0 or 1 link'),
              bi('Firma de dos líneas: nombre y cargo', 'Two-line signature: name and role'),
            ],
          },
        },
      },
      {
        id: 'ag04-t3',
        heading: bi('El 58% de las respuestas sale del primer email', '58% of the replies come from the first email'),
        body: bi(
          'Eso cambia cómo se reparte el esfuerzo: el primer toque se trabaja como una pieza propia y los siguientes son recordatorios cortos que añaden un dato nuevo. Una secuencia de 4 a 7 emails es el rango que funciona; más de 7 satura al receptor y sube las quejas.',
          'That changes how effort is distributed: the first touch is worked on as its own piece and the following ones are short reminders that add a new fact. A sequence of 4 to 7 emails is the range that works; more than 7 saturates the recipient and raises complaints.'
        ),
        diagram: {
          kind: 'bars',
          max: 58,
          unit: '% de respuestas',
          items: [
            { label: bi('Email 1', 'Email 1'), value: 58, tone: 'good' },
            { label: bi('Email 2', 'Email 2'), value: 14, tone: 'info' },
            { label: bi('Email 3', 'Email 3'), value: 11, tone: 'info' },
            { label: bi('Email 4', 'Email 4'), value: 9, tone: 'warn' },
            { label: bi('Email 5+', 'Email 5+'), value: 8, tone: 'warn' },
          ],
        },
      },
      {
        id: 'ag04-t4',
        heading: bi('Anatomía de un primer toque de 68 palabras', 'Anatomy of a 68-word first touch'),
        body: bi(
          'Cuatro piezas en este orden: la señal concreta que has visto en su negocio, la consecuencia económica de esa señal, una prueba con número y un CTA de baja fricción que no pide una reunión. Pedir 30 minutos en el primer email es el error más caro.',
          'Four pieces in this order: the concrete signal you saw in their business, the economic consequence of that signal, proof with a number, and a low-friction CTA that does not ask for a meeting. Asking for 30 minutes in the first email is the most expensive mistake.'
        ),
        diagram: {
          kind: 'layers',
          layers: [
            { label: bi('1 · SEÑAL', '1 · SIGNAL'), note: bi('algo verificable que has visto en su negocio', 'something verifiable you saw in their business'), tone: 'info' },
            { label: bi('2 · CONSECUENCIA', '2 · CONSEQUENCE'), note: bi('qué cuesta ese problema en euros al mes', 'what that problem costs in euros a month'), tone: 'warn' },
            { label: bi('3 · PRUEBA', '3 · PROOF'), note: bi('un número de un caso del mismo nicho', 'one number from a case in the same niche'), tone: 'good' },
            { label: bi('4 · CTA BAJO', '4 · LOW-CTA'), note: bi('"¿te lo mando en 2 líneas?", nunca "¿hablamos 30 min?"', '"shall I send it in 2 lines?", never "shall we talk for 30 min?"'), tone: 'good' },
          ],
        },
      },
      {
        id: 'ag04-t5',
        heading: bi('Personalización de señal, no de cumplido', 'Signal personalisation, not compliment personalisation'),
        body: bi(
          'La personalización automatizada sube la respuesta un 57%, pero solo cuando se basa en un dato comprobable: una oferta de empleo publicada, los huecos de su agenda online, una reseña reciente. "Me encanta vuestro proyecto" es un cumplido y se reconoce en dos segundos.',
          'Automated personalisation raises replies by 57%, but only when it is based on a verifiable fact: a published job post, the empty slots in their online booking system, a recent review. "I love your project" is a compliment and is recognised in two seconds.'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Señal', 'Signal'), bi('Tasa de respuesta', 'Reply rate'), bi('Tipo', 'Type')],
          rows: [
            ['Cambió de puesto hace 30 días', '6-10%', 'verificable'],
            ['Visitó tu página de precios', '5-8%', 'verificable'],
            ['Reseña o baja de un competidor', '4-7%', 'verificable'],
            ['Ronda de financiación < 4 semanas', '3-5%', 'verificable'],
            ['Lista fría sin señal', '1-2%', 'sin contexto'],
          ],
          highlightRow: 0,
        },
      },
    ],
    examples: [
      {
        id: 'ag04-ex1',
        title: bi('Ejemplo resuelto: secuencia de 5 toques para clínicas de fisioterapia', 'Worked example: a 5-touch sequence for physiotherapy clinics'),
        situation: bi(
          'Agencia con oferta de "12 pacientes privados nuevos al mes en 90 días". Lista de 340 clínicas con huecos visibles en su agenda online. Objetivo: superar el 3,43% de respuesta media del sector.',
          'An agency with a "12 new private patients a month in 90 days" offer. A list of 340 clinics with visible empty slots in their online booking system. Goal: beat the 3.43% industry average reply rate.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Escribir el primer toque contando palabras', 'Step 1 · Write the first touch while counting words'),
            detail: bi(
              '68 palabras, texto plano, cero enlaces. La señal es el hueco real visto en su agenda; la consecuencia se calcula con su ticket medio; la prueba es un número de otro cliente del mismo nicho.',
              '68 words, plain text, zero links. The signal is the real empty slot seen in their booking system; the consequence is calculated with their average ticket; the proof is a number from another client in the same niche.'
            ),
            diagram: {
              kind: 'code',
              lang: 'email 1 · día 0 · 68 palabras',
              lines: [
                { text: 'Asunto: martes por la tarde', tone: 'info', label: bi('4 palabras, sin mayúsculas de venta', '4 words, no sales capitals') },
                { text: '' },
                { text: 'Hola Marta, he mirado tu agenda online y el martes', tone: 'good', label: bi('señal verificable', 'verifiable signal') },
                { text: 'por la tarde tienes 3 huecos libres sin reserva.', tone: 'good' },
                { text: '' },
                { text: 'Si cada paciente privado vale unos 380 EUR al ano,', tone: 'warn', label: bi('consecuencia en euros', 'consequence in euros') },
                { text: 'son unos 1 140 EUR al mes que no entran.', tone: 'warn' },
                { text: '' },
                { text: 'En otra clinica de 3 salas pasamos de 4 a 14', tone: 'info', label: bi('prueba con número', 'proof with a number') },
                { text: 'pacientes privados al mes en 90 dias.', tone: 'info' },
                { text: '' },
                { text: 'Te mando el desglose en dos lineas?', tone: 'good', label: bi('CTA de baja fricción', 'low-friction CTA') },
              ],
            },
          },
          {
            label: bi('Paso 2 · Comprobar que no pide reunión ni incluye enlace', 'Step 2 · Check that it asks for no meeting and includes no link'),
            detail: bi(
              'El CTA pide permiso para enviar información, no 30 minutos de calendario. Es una decisión de coste cero para el receptor, y por eso se contesta. Añadir un enlace en el primer toque reduce la entrega y sube la tasa de spam.',
              'The CTA asks permission to send information, not 30 minutes of calendar time. It is a zero-cost decision for the recipient, and that is why it gets answered. Adding a link in the first touch reduces delivery and raises the spam rate.'
            ),
            diagram: {
              kind: 'compare',
              left: {
                title: bi('CTA que no se contesta', 'CTA that does not get answered'),
                tone: 'bad',
                items: [
                  bi('"¿Te va bien el jueves a las 10?"', '"Does Thursday at 10 work for you?"'),
                  bi('"Agenda aquí una llamada de 30 minutos"', '"Book a 30-minute call here"'),
                  bi('"Te dejo el enlace a nuestro caso de éxito"', '"Here is the link to our success case"'),
                ],
              },
              right: {
                title: bi('CTA que sí se contesta', 'CTA that does get answered'),
                tone: 'good',
                items: [
                  bi('"¿Te mando el desglose en dos líneas?"', '"Shall I send you the breakdown in two lines?"'),
                  bi('"¿Tiene sentido para vosotros?"', '"Does this make sense for you?"'),
                  bi('"¿Te lo envío por aquí o prefieres WhatsApp?"', '"Shall I send it here or do you prefer WhatsApp?"'),
                ],
              },
            },
          },
          {
            label: bi('Paso 3 · Diseñar los toques 2 a 5 con un dato nuevo cada vez', 'Step 3 · Design touches 2 to 5 with a new fact each time'),
            detail: bi(
              'Ningún toque repite al anterior. El 2 aporta el coste anual. El 3 cambia el ángulo a la capacidad de la recepción. El 4 es una pregunta cerrada. El 5 cierra la secuencia sin presión y deja la puerta abierta.',
              'No touch repeats the previous one. Touch 2 adds the annual cost. Touch 3 shifts the angle to reception capacity. Touch 4 is a closed question. Touch 5 closes the sequence without pressure and leaves the door open.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Toque', 'Touch'), bi('Día', 'Day'), bi('Palabras', 'Words'), bi('Aporta', 'Adds')],
              rows: [
                ['1', '0', '68', 'señal + coste mensual + prueba'],
                ['2', '3', '34', 'coste anual del mismo hueco'],
                ['3', '7', '41', 'ángulo nuevo: ¿puede la recepción atender más?'],
                ['4', '12', '29', 'pregunta cerrada sí/no'],
                ['5', '18', '26', 'cierre sin presión'],
              ],
              note: bi('Total de la secuencia: 198 palabras. El primer toque concentra el 34% del texto y el 58% de las respuestas.', 'Total for the sequence: 198 words. The first touch holds 34% of the text and 58% of the replies.'),
            },
          },
          {
            label: bi('Paso 4 · Validar el volumen contra la capacidad de los buzones', 'Step 4 · Validate the volume against mailbox capacity'),
            detail: bi(
              '340 clínicas × 5 toques = 1 700 envíos. A 21 días laborables son 81 al día, que con 25 por buzón requieren 4 buzones. Si solo tuvieras 2, la secuencia tardaría el doble o tendrías que recortarla a 3 toques.',
              '340 clinics × 5 touches = 1,700 sends. Over 21 working days that is 81 a day, which at 25 per mailbox requires 4 mailboxes. With only 2, the sequence would take twice as long or you would have to cut it to 3 touches.'
            ),
            diagram: {
              kind: 'equation',
              tokens: [
                { text: '340 listas', tone: 'info' },
                { text: '×' },
                { text: '5 toques', tone: 'info' },
                { text: '= 1 700 envíos', tone: 'warn' },
              ],
              result: { text: '÷ 21 días ÷ 25 = 4 buzones', tone: 'good' },
            },
          },
          {
            label: bi('Paso 5 · Medir contra el benchmark y decidir qué iterar', 'Step 5 · Measure against the benchmark and decide what to iterate'),
            detail: bi(
              'Resultado tras 340 contactos: 19 respuestas, 5,6%. Por encima del percentil 75 del sector. De esas 19, 11 llegaron con el primer email. La decisión de iteración es clara: se mejora el primer toque y el asunto, no se añaden más toques a la secuencia.',
              'Result after 340 contacts: 19 replies, 5.6%. Above the industry 75th percentile. Of those 19, 11 came with the first email. The iteration decision is clear: improve the first touch and the subject line, do not add more touches to the sequence.'
            ),
            diagram: {
              kind: 'bars',
              max: 6,
              unit: '%',
              items: [
                { label: bi('Media sector 2026', '2026 industry average'), value: 3, tone: 'warn', note: bi('3,43%', '3.43%') },
                { label: bi('Esta secuencia', 'This sequence'), value: 6, tone: 'good', note: bi('5,6%', '5.6%') },
                { label: bi('Percentil 90', '90th percentile'), value: 11, tone: 'info', note: bi('10,7% · siguiente objetivo', '10.7% · next target') },
              ],
            },
          },
        ],
        result: bi(
          '19 respuestas de 340 envíos con 198 palabras totales de texto. El 58% de las respuestas llegó en el primer toque, que es donde estaba el 34% del texto: la distribución del esfuerzo coincidía con la distribución del resultado.',
          '19 replies from 340 sends with 198 words of text in total. 58% of the replies arrived in the first touch, which held 34% of the text: the distribution of effort matched the distribution of the result.'
        ),
        selfCheck: {
          prompt: bi('¿Qué se debe iterar primero si quieres subir del 5,6% al 10%?', 'What should you iterate first if you want to go from 5.6% to 10%?'),
          options: [
            opt('a', 'Añadir dos toques más a la secuencia', 'Add two more touches to the sequence'),
            opt('b', 'El primer toque: su señal de apertura y su asunto, porque concentra el 58% de las respuestas', 'The first touch: its opening signal and its subject line, because it holds 58% of the replies'),
            opt('c', 'El diseño del email con mejores colores', 'The email design with better colours'),
            opt('d', 'Aumentar el volumen de envíos diarios', 'Increase the daily sending volume'),
          ],
          correctOptionId: 'b',
          explanation: bi('Añadir toques mueve el 42% restante y arriesga quejas. Subir el volumen no cambia la tasa. El apalancamiento está donde ya está la respuesta.', 'Adding touches moves the remaining 42% and risks complaints. Raising volume does not change the rate. The leverage is where the replies already are.'),
        },
      },
    ],
    exercises: [
      {
        id: 'ag04-e01',
        format: 'concept',
        difficulty: 1,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Cuántas respuestas llegan con el primer email de la secuencia?', 'How many replies arrive with the first email of the sequence?'),
        options: [
          opt('a', 'El 58%', '58%'),
          opt('b', 'El 20%, repartidas de forma uniforme', '20%, evenly spread'),
          opt('c', 'El 90%, el resto no aporta nada', '90%, the rest adds nothing'),
          opt('d', 'Depende del día de la semana', 'It depends on the day of the week'),
        ],
        correctOptionId: 'a',
        explanation: bi('El 58% de las respuestas sale del primer toque. Por eso se escribe como una pieza propia y los demás son recordatorios cortos con un dato nuevo.', '58% of replies come from the first touch. That is why it is written as its own piece and the others are short reminders with a new fact.'),
        xp: 8,
      },
      {
        id: 'ag04-e02',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada pieza del primer toque con su función.', 'Match each piece of the first touch with its function.'),
        pairs: [
          { leftId: 'l1', left: bi('"El martes por la tarde tienes 3 huecos libres"', '"On Tuesday afternoon you have 3 empty slots"'), rightId: 'r1', right: bi('Señal verificable', 'Verifiable signal') },
          { leftId: 'l2', left: bi('"Son 1 140 € al mes que no entran"', '"That is €1,140 a month that does not come in"'), rightId: 'r2', right: bi('Consecuencia económica', 'Economic consequence') },
          { leftId: 'l3', left: bi('"Pasamos de 4 a 14 pacientes en 90 días"', '"We went from 4 to 14 patients in 90 days"'), rightId: 'r3', right: bi('Prueba con número', 'Proof with a number') },
          { leftId: 'l4', left: bi('"¿Te mando el desglose en dos líneas?"', '"Shall I send you the breakdown in two lines?"'), rightId: 'r4', right: bi('CTA de baja fricción', 'Low-friction CTA') },
        ],
        explanation: bi('El orden importa: sin la señal inicial, la consecuencia suena a plantilla y la prueba a publicidad.', 'The order matters: without the initial signal, the consequence sounds like a template and the proof like advertising.'),
        xp: 12,
      },
      {
        id: 'ag04-e03',
        format: 'numeric',
        difficulty: 2,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Envías 340 primeros emails y obtienes 19 respuestas. ¿Qué tasa de respuesta tienes y en qué percentil estás?',
          'You send 340 first emails and get 19 replies. What is your reply rate and which percentile are you in?'
        ),
        answer: 5.6,
        tolerance: 0.2,
        unit: '%',
        formula: bi('19 ÷ 340 × 100', '19 ÷ 340 × 100'),
        explanation: bi('5,6%. La media del sector es 3,43%, el percentil 75 está en 5,5% y el 90 en 10,7%. Estás justo por encima del percentil 75.', '5.6%. The industry average is 3.43%, the 75th percentile is 5.5% and the 90th is 10.7%. You are just above the 75th percentile.'),
        xp: 10,
      },
      {
        id: 'ag04-e04',
        format: 'ordering',
        difficulty: 2,
        badge: bi('ORDENAR', 'ORDER'),
        prompt: bi('Ordena los toques de una secuencia real de 5 emails.', 'Order the touches of a real 5-email sequence.'),
        pieces: [
          { id: 'p1', text: bi('Día 0 · señal + consecuencia + prueba + CTA bajo (68 palabras)', 'Day 0 · signal + consequence + proof + low CTA (68 words)') },
          { id: 'p2', text: bi('Día 3 · el mismo hueco traducido a coste anual (34 palabras)', 'Day 3 · the same slot translated into an annual cost (34 words)') },
          { id: 'p3', text: bi('Día 7 · ángulo nuevo: capacidad de la recepción (41 palabras)', 'Day 7 · new angle: reception capacity (41 words)') },
          { id: 'p4', text: bi('Día 12 · pregunta cerrada de sí o no (29 palabras)', 'Day 12 · closed yes-or-no question (29 words)') },
          { id: 'p5', text: bi('Día 18 · cierre sin presión y puerta abierta (26 palabras)', 'Day 18 · close without pressure and an open door (26 words)') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        explanation: bi('Los intervalos se alargan y el texto se acorta. Cada toque aporta un dato distinto: repetir el anterior es la razón principal de baja.', 'The intervals lengthen and the text shortens. Each touch adds a different fact: repeating the previous one is the main reason for unsubscribes.'),
        xp: 10,
      },
      {
        id: 'ag04-e05',
        format: 'worked_why',
        difficulty: 3,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('¿Por qué el CTA pide permiso para enviar información en vez de una reunión?', 'Why does the CTA ask permission to send information instead of a meeting?'),
        options: [
          opt('a', 'Porque las reuniones no se pueden agendar por email', 'Because meetings cannot be scheduled by email'),
          opt('b', 'Porque responder "sí, mándamelo" cuesta cero, mientras que bloquear 30 minutos de calendario exige decidir y consultar la agenda', 'Because answering "yes, send it" costs nothing, while blocking 30 minutes of calendar requires deciding and checking the diary'),
          opt('c', 'Porque el objetivo es no reunirse nunca', 'Because the goal is never to meet'),
          opt('d', 'Porque las herramientas de calendario se consideran spam', 'Because calendar tools are considered spam'),
        ],
        correctOptionId: 'b',
        explanation: bi('La fricción del CTA determina la tasa de respuesta. Un "sí" gratuito genera conversación; desde ahí la reunión se pide en el segundo o tercer mensaje, cuando ya hay interés declarado.', 'CTA friction determines the reply rate. A free "yes" generates conversation; from there the meeting is requested in the second or third message, once interest has been declared.'),
        xp: 12,
      },
      {
        id: 'ag04-e06',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Tu secuencia tiene 5 toques y tu lista es de 340 contactos. Con 21 días laborables al mes, ¿cuántos envíos diarios necesitas?',
          'Your sequence has 5 touches and your list is 340 contacts. With 21 working days a month, how many daily sends do you need?'
        ),
        answer: 81,
        tolerance: 1,
        unit: 'envíos/día',
        formula: bi('340 × 5 = 1 700 · 1 700 ÷ 21', '340 × 5 = 1,700 · 1,700 ÷ 21'),
        explanation: bi('1 700 envíos repartidos en 21 días son 81 al día. Con el límite de 25 por buzón, hacen falta 4 buzones para sostener la secuencia.', '1,700 sends spread over 21 days are 81 a day. With the limit of 25 per mailbox, 4 mailboxes are needed to sustain the sequence.'),
        xp: 12,
      },
      {
        id: 'ag04-e07',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('Este primer email no responde nadie. ¿Cuál es la línea que más daño hace?', 'Nobody replies to this first email. Which line does the most damage?'),
        context: {
          mono: true,
          label: bi('Email 1 · 143 palabras', 'Email 1 · 143 words'),
          content: 'Asunto: Impulsa tu clinica con nuestras soluciones digitales integrales\n\nHola, he visto vuestra web y me ha encantado el proyecto que teneis\nentre manos, se nota la pasion que poneis en cada tratamiento.\n\nSomos una agencia especializada en captacion de pacientes para clinicas\nde fisioterapia con mas de 8 anos de experiencia y un equipo de 12\nprofesionales certificados en Google Ads, Meta Ads y SEO local.\n\nNuestro metodo exclusivo combina auditoria inicial, estrategia\nmulticanal, optimizacion continua y reporting semanal con dashboards\npersonalizados en tiempo real.\n\nTe dejo aqui nuestro caso de exito, nuestra web y el calendario para\nque reserves una llamada de 30 minutos esta semana.\n\nUn saludo,\nEquipo comercial',
        },
        lines: [
          { id: 'c1', text: 'Cumplido generico que podria ir dirigido a cualquier clinica', tone: 'warn' },
          { id: 'c2', text: '143 palabras: casi el doble del techo de 80', tone: 'bad', label: bi('no cabe en una pantalla', 'does not fit one screen') },
          { id: 'c3', text: '3 enlaces en el primer toque', tone: 'bad', label: bi('reduce entrega', 'reduces delivery') },
          { id: 'c4', text: 'Pide 30 minutos de calendario sin haber generado interes', tone: 'bad' },
        ],
        correctLineId: 'c2',
        explanation: bi('Todo el email es consecuencia de no respetar el techo: para meter cumplido, credenciales, método y tres enlaces hacen falta 143 palabras. Cortar a 68 obliga a quedarte solo con señal, coste, prueba y CTA.', 'The whole email is a consequence of not respecting the ceiling: fitting a compliment, credentials, method and three links requires 143 words. Cutting to 68 forces you to keep only signal, cost, proof and CTA.'),
        xp: 12,
      },
      {
        id: 'ag04-e08',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos primeras líneas para el mismo contacto. (A) "He visto que el martes por la tarde tienes 3 huecos libres en tu agenda online". (B) "Felicidades por el crecimiento que estáis teniendo, se nota en las reseñas". ¿Cuál usas?',
          'Two opening lines for the same contact. (A) "I saw that on Tuesday afternoon you have 3 empty slots in your online booking system". (B) "Congratulations on the growth you are having, it shows in the reviews". Which do you use?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Apertura', 'Opening'), bi('Verificable', 'Verifiable'), bi('Coste para el lector', 'Cost to the reader'), bi('Respuesta esperada', 'Expected reply')],
          rows: [
            ['A · huecos de la agenda', 'sí, dato concreto', 'bajo: lo reconoce al instante', '5-8%'],
            ['B · cumplido genérico', 'no', 'alto: huele a plantilla', '1-2%'],
          ],
          highlightRow: 0,
        },
        options: [
          opt('a', 'B, porque empezar con un cumplido genera simpatía', 'B, because starting with a compliment builds rapport'),
          opt('b', 'A, porque menciona un dato que solo puede venir de haber mirado su negocio y se verifica en dos segundos', 'A, because it mentions a fact that can only come from having looked at their business and is verified in two seconds'),
          opt('c', 'Las dos combinadas en el mismo párrafo', 'Both combined in the same paragraph'),
          opt('d', 'Ninguna: se debe empezar presentando la agencia', 'Neither: you should start by introducing the agency'),
        ],
        correctOptionId: 'b',
        explanation: bi('La personalización que sube la respuesta un 57% es la de señal verificable, no la de cumplido. "Felicidades por el crecimiento" se puede enviar a 10 000 clínicas sin cambiar una coma, y el receptor lo sabe.', 'The personalisation that raises replies by 57% is verifiable-signal personalisation, not compliments. "Congratulations on the growth" can be sent to 10,000 clinics without changing a comma, and the recipient knows it.'),
        xp: 15,
      },
      {
        id: 'ag04-e09',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'Toca el 4 y obtienes 1,2% de respuesta con lista fría sin señal. Un compañero sugiere cambiar el copy. ¿Qué se revisa primero?',
          'Touch 4 gets a 1.2% reply rate with a cold list with no signal. A colleague suggests changing the copy. What do you review first?'
        ),
        options: [
          opt('a', 'El asunto del primer email', 'The subject line of the first email'),
          opt('b', 'La lista: 1,2% es exactamente el rango de una lista fría sin señal, así que el problema es el destinatario y no el texto', 'The list: 1.2% is exactly the range for a cold list with no signal, so the problem is the recipient and not the text'),
          opt('c', 'El número de toques de la secuencia', 'The number of touches in the sequence'),
          opt('d', 'La firma del email', 'The email signature'),
        ],
        correctOptionId: 'b',
        explanation: bi('Los benchmarks dan 1-2% para lista fría sin señal y 5-10% cuando hay señal verificable. Si estás en el rango inferior, el texto ya funciona como puede: falta la señal. Reescribir el copy sobre una lista sin contexto no mueve la tasa.', 'The benchmarks give 1-2% for a cold list with no signal and 5-10% when there is a verifiable signal. If you are in the lower range, the text is already working as well as it can: the signal is missing. Rewriting copy on a list with no context does not move the rate.'),
        xp: 15,
      },
      {
        id: 'ag04-e10',
        format: 'numeric',
        difficulty: 4,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Pasas de lista fría (1,5% de respuesta) a lista con señal de cambio de puesto (7,5%) sobre 800 contactos. ¿Cuántas respuestas adicionales consigues?',
          'You move from a cold list (1.5% reply) to a list with a job-change signal (7.5%) over 800 contacts. How many additional replies do you get?'
        ),
        answer: 48,
        tolerance: 0,
        unit: 'respuestas',
        formula: bi('800 × (0,075 − 0,015)', '800 × (0.075 − 0.015)'),
        explanation: bi('12 respuestas con lista fría frente a 60 con señal: 48 adicionales. Con 25% de conversión a reunión son 12 reuniones más al mes sin enviar un solo email extra.', '12 replies with a cold list versus 60 with a signal: 48 additional. At 25% meeting conversion that is 12 more meetings a month without sending a single extra email.'),
        xp: 15,
      },
      {
        id: 'ag04-e11',
        format: 'faded',
        difficulty: 3,
        badge: bi('COMPLETAR', 'COMPLETE'),
        prompt: bi('Completa la lista de control del primer toque. Las dos primeras ya están verificadas.', 'Complete the first-touch checklist. The first two are already verified.'),
        pieces: [
          { id: 'p1', text: bi('Menos de 80 palabras y texto plano', 'Fewer than 80 words and plain text') },
          { id: 'p2', text: bi('Primera línea con señal verificable de su negocio', 'First line with a verifiable signal from their business') },
          { id: 'p3', text: bi('Consecuencia traducida a euros por mes', 'Consequence translated into euros per month') },
          { id: 'p4', text: bi('Una prueba con número de un caso del mismo nicho', 'One proof with a number from a case in the same niche') },
          { id: 'p5', text: bi('CTA de baja fricción que no pide reunión', 'Low-friction CTA that does not ask for a meeting') },
          { id: 'p6', text: bi('Cero o un enlace, y firma de dos líneas', 'Zero or one link, and a two-line signature') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'],
        lockedPieceIds: ['p1', 'p2'],
        explanation: bi('Las seis casillas caben en 68 palabras. Si necesitas más, es que estás metiendo credenciales o método, que van en la llamada y no en el primer toque.', 'All six boxes fit in 68 words. If you need more, you are adding credentials or method, which belong in the call and not in the first touch.'),
        xp: 12,
      },
      {
        id: 'ag04-e12',
        format: 'output',
        difficulty: 5,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('Resultado de dos variantes A/B sobre 600 contactos cada una. ¿Qué se concluye?', 'Result of two A/B variants over 600 contacts each. What do you conclude?'),
        context: {
          mono: true,
          label: bi('Test A/B · 1 200 contactos · 2 semanas', 'A/B test · 1,200 contacts · 2 weeks'),
          content: 'variante A  asunto: "martes por la tarde"        62 palabras  0 enlaces\nvariante B  asunto: "Propuesta de colaboracion"  118 palabras  2 enlaces\n\n                    A          B\nentregados          583 (97%)  431 (72%)\nen bandeja          512 (85%)  246 (41%)\nrespuestas           31 (5,4%)  9 (2,1%)\nquejas de spam        0          4 (0,67%)\nbajas                 3 (0,5%)   11 (1,8%)',
        },
        options: [
          opt('a', 'B responde menos pero tiene mejor tasa sobre los entregados, así que se optimiza B', 'B replies less but has a better rate over the delivered, so optimise B'),
          opt('b', 'A gana en las cuatro variables que importan y B dispara la queja de spam al 0,67%, muy por encima del 0,1% sano: B debe descartarse, no optimizarse', 'A wins on all four variables that matter and B pushes the spam complaint to 0.67%, far above the healthy 0.1%: B must be discarded, not optimised'),
          opt('c', 'Se envían las dos alternadas para repartir el riesgo', 'Send both alternately to spread the risk'),
          opt('d', 'La diferencia es de muestra y no es significativa', 'The difference is sampling noise and not significant'),
        ],
        correctOptionId: 'b',
        explanation: bi('Con 600 contactos por variante y 31 contra 9 respuestas, la diferencia es grande. Lo decisivo es la queja de spam al 0,67%: por encima del 0,3% los proveedores penalizan el dominio, así que B pone en riesgo la infraestructura entera.', 'With 600 contacts per variant and 31 against 9 replies, the difference is large. The decisive point is the 0.67% spam complaint: above 0.3% providers penalise the domain, so B puts the entire infrastructure at risk.'),
        xp: 20,
      },
      {
        id: 'ag04-e13',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Por qué una secuencia de 9 emails es peor que una de 5 aunque cada toque tenga su dato nuevo?', 'Why is a 9-email sequence worse than a 5-email one even if every touch has its own new fact?'),
        options: [
          opt('a', 'Porque las herramientas no permiten más de 7 toques', 'Because tools do not allow more than 7 touches'),
          opt('b', 'Porque cada toque adicional multiplica los envíos y la exposición a quejas y bajas, y el rango que funciona en 2026 es de 4 a 7', 'Because each additional touch multiplies the sends and the exposure to complaints and unsubscribes, and the range that works in 2026 is 4 to 7'),
          opt('c', 'Porque el receptor deja de leer a partir del sexto', 'Because the recipient stops reading after the sixth'),
          opt('d', 'Porque sube el coste por buzón', 'Because it raises the cost per mailbox'),
        ],
        correctOptionId: 'b',
        explanation: bi('Pasar de 5 a 9 toques sube los envíos un 80% para capturar menos del 8% de las respuestas restantes. Más volumen es más superficie para quejas, y las quejas por encima del 0,3% dañan el dominio.', 'Going from 5 to 9 touches raises sends by 80% to capture less than 8% of the remaining replies. More volume is more surface for complaints, and complaints above 0.3% damage the domain.'),
        xp: 20,
      },
    ],
    recap: [
      bi('Primer toque por debajo de 80 palabras, texto plano, cero o un enlace, y CTA que no pide reunión.', 'First touch under 80 words, plain text, zero or one link, and a CTA that does not ask for a meeting.'),
      bi('El 58% de las respuestas viene del email 1: ahí se concentra el trabajo de iteración.', '58% of the replies come from email 1: that is where iteration effort concentrates.'),
      bi('Secuencia de 4 a 7 toques con un dato nuevo en cada uno, y personalización de señal verificable, nunca de cumplido.', 'A sequence of 4 to 7 touches with a new fact in each, and verifiable-signal personalisation, never compliments.'),
    ],
    actionMission: {
      id: 'mission-agency-4',
      title: bi('Escribe tu secuencia de 5 toques', 'Write your 5-touch sequence'),
      objective: bi('Redactar una secuencia completa de 5 emails para tu ICP con el primer toque por debajo de 80 palabras.', 'Draft a complete 5-email sequence for your ICP with the first touch under 80 words.'),
      steps: [
        bi('Elige una señal verificable que puedas ver en el negocio de cada contacto antes de escribirle.', 'Choose a verifiable signal you can see in each contact business before writing to them.'),
        bi('Escribe el primer toque con señal, consecuencia en euros, una prueba con número y CTA de baja fricción.', 'Write the first touch with signal, consequence in euros, one proof with a number and a low-friction CTA.'),
        bi('Escribe los toques 2 a 5 con un dato nuevo cada uno y cuenta las palabras de los cinco.', 'Write touches 2 to 5 with a new fact in each and count the words of all five.'),
      ],
      proof: bi('Los 5 emails con el conteo de palabras de cada uno visible y el primer toque por debajo de 80.', 'The 5 emails with the word count of each one visible and the first touch under 80.'),
      affiliateToolSlug: 'smartlead-outreach',
      xpBonus: 30,
    },
  },
];

export const AGENCY_UNIT_1: Unit = {
  slug: 'agency-unit-1',
  trackSlug: 'digital-agency',
  orderIndex: 1,
  title: bi('Antes del primer email', 'Before the first email'),
  description: bi(
    'Nicho con atributos verificables, oferta con resultado medible e infraestructura que no quema tu dominio. La base de una agencia que cobra lo que vale.',
    'A niche with verifiable attributes, an offer with a measurable outcome and infrastructure that does not burn your domain. The base of an agency that charges what it is worth.'
  ),
  lessons: LESSONS,
};
