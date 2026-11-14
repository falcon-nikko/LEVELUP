import { bi, opt } from '@/lib/curriculum/authoring';
import { Lesson, Unit } from '@/lib/curriculum/types';

/* ==========================================================================
   MODERN CODING · Unit 2 — Producción
   ========================================================================== */

const LESSONS: Lesson[] = [
  /* ---------------------------------------------------------------- L5 -- */
  {
    slug: 'code-05-next-app-router',
    unitSlug: 'code-unit-2',
    trackSlug: 'modern-coding',
    orderIndex: 5,
    title: bi('Next.js App Router sin humo', 'Next.js App Router without the hype'),
    outcome: bi(
      'Decidirás Server vs Client Component, sabrás dónde va cada fetch y cuándo necesitas revalidar.',
      'You will decide Server vs Client Component, know where each fetch belongs and when you need revalidation.'
    ),
    durationMin: 14,
    xpReward: 150,
    theory: [
      {
        id: 'cd05-t1',
        heading: bi('Por defecto todo es Server Component', 'Everything is a Server Component by default'),
        body: bi(
          'En la carpeta app, un componente se ejecuta en el servidor y envía HTML ya renderizado. Solo se convierte en Client Component cuando el fichero empieza por "use client". Ese marcado baja a todos los hijos importados.',
          'Inside the app folder, a component runs on the server and sends already-rendered HTML. It only becomes a Client Component when the file starts with "use client". That marking cascades to every imported child.'
        ),
        diagram: {
          kind: 'layers',
          layers: [
            { label: bi('page.tsx — servidor', 'page.tsx — server'), note: bi('lee la BD, hace fetch, compone', 'reads the DB, fetches, composes'), tone: 'good' },
            { label: bi('<ProductList /> — servidor', '<ProductList /> — server'), note: bi('recibe datos ya resueltos', 'receives already-resolved data'), tone: 'good' },
            { label: bi('<AddToCartButton /> — "use client"', '<AddToCartButton /> — "use client"'), note: bi('necesita onClick y estado', 'needs onClick and state'), tone: 'warn' },
          ],
        },
        why: bi('La frontera se dibuja en la hoja, no en la raíz: el componente más pequeño que necesite interactividad.', 'The boundary is drawn at the leaf, not the root: the smallest component that needs interactivity.'),
      },
      {
        id: 'cd05-t2',
        heading: bi('Necesitas "use client" solo para 4 cosas', 'You need "use client" for only 4 things'),
        body: bi(
          'Estado (useState/useReducer), efectos (useEffect), eventos del navegador (onClick, onChange) y APIs del navegador (localStorage, window, matchMedia). Todo lo demás funciona en el servidor, incluidas las props y los hijos.',
          'State (useState/useReducer), effects (useEffect), browser events (onClick, onChange) and browser APIs (localStorage, window, matchMedia). Everything else works on the server, including props and children.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('Servidor', 'Server'),
            tone: 'good',
            items: [
              bi('Consultar la base de datos', 'Query the database'),
              bi('Recibir props y children', 'Receive props and children'),
              bi('Formatear fechas e importes', 'Format dates and amounts'),
              bi('Leer cookies y headers', 'Read cookies and headers'),
            ],
          },
          right: {
            title: bi('Cliente obligatorio', 'Client required'),
            tone: 'warn',
            items: [
              bi('useState, useEffect, useRef', 'useState, useEffect, useRef'),
              bi('onClick, onChange, onSubmit', 'onClick, onChange, onSubmit'),
              bi('window, localStorage, navigator', 'window, localStorage, navigator'),
              bi('framer-motion y librerías de UI interactiva', 'framer-motion and interactive UI libraries'),
            ],
          },
        },
      },
      {
        id: 'cd05-t3',
        heading: bi('No se pasan funciones de servidor a componentes cliente', 'You cannot pass server functions to client components'),
        body: bi(
          'Las props de un Client Component se serializan: viajan del servidor al navegador como datos. Una función, una clase o un Date sin serializar no pasan. Las acciones de servidor se marcan con "use server" y sí son pasables.',
          'The props of a Client Component are serialised: they travel from server to browser as data. A function, a class or an unserialised Date does not pass. Server actions are marked with "use server" and can be passed.'
        ),
        diagram: {
          kind: 'code',
          lang: 'tsx',
          lines: [
            { text: '// page.tsx (servidor)', tone: 'mute' },
            { text: '<Panel onRefresh={() => db.query()} />', tone: 'bad', label: bi('no serializable', 'not serialisable') },
            { text: '', tone: 'mute' },
            { text: '// correcto: accion de servidor', tone: 'mute' },
            { text: 'async function refrescar() { "use server"; revalidatePath("/"); }', tone: 'good' },
            { text: '<Panel onRefresh={refrescar} />', tone: 'good', label: bi('sí pasa', 'does pass') },
          ],
        },
      },
      {
        id: 'cd05-t4',
        heading: bi('Datos en el servidor: cacheado y revalidación', 'Data on the server: caching and revalidation'),
        body: bi(
          'Un fetch en un Server Component se cachea. Si el contenido cambia, tienes que decirlo: revalidatePath tras una mutación, o un intervalo de revalidación. Sin eso, el usuario ve datos de hace diez minutos.',
          'A fetch in a Server Component is cached. If the content changes you have to say so: revalidatePath after a mutation, or a revalidation interval. Without that, the user sees data from ten minutes ago.'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Situación', 'Situation'), bi('Mecanismo', 'Mechanism'), bi('Efecto', 'Effect')],
          rows: [
            ['Contenido estático', 'generateStaticParams', 'HTML en el build'],
            ['Cambia tras una acción', 'revalidatePath / revalidateTag', 'se regenera al mutar'],
            ['Cambia solo', 'export const revalidate = 60', 'máximo 60 s viejo'],
            ['Siempre vivo', 'export const dynamic = "force-dynamic"', 'sin cache'],
          ],
          highlightRow: 1,
        },
      },
    ],
    examples: [
      {
        id: 'cd05-ex1',
        title: bi('Ejemplo resuelto: página de producto con carrito interactivo', 'Worked example: product page with an interactive cart'),
        situation: bi(
          'Una ficha de producto que muestra datos de la base de datos, galería de fotos, precio y un botón de añadir al carrito que abre un panel lateral animado. El primer intento puso "use client" en page.tsx y la página pasó de 380 ms a 1,4 s.',
          'A product page showing database data, a photo gallery, price and an add-to-cart button that opens an animated side panel. The first attempt put "use client" in page.tsx and the page went from 380 ms to 1.4 s.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Diagnosticar por qué se volvió lenta', 'Step 1 · Diagnose why it got slow'),
            detail: bi(
              'Con "use client" en la raíz, la consulta a la base de datos pasó a ejecutarse en el navegador vía API, se envió todo el JS del árbol al cliente y el HTML llegó vacío hasta que hidrataron 14 componentes.',
              'With "use client" at the root, the database query moved to the browser via an API, the whole tree JS was sent to the client, and the HTML arrived empty until 14 components hydrated.'
            ),
            diagram: {
              kind: 'bars',
              max: 1400,
              unit: ' ms',
              items: [
                { label: bi('"use client" en la raíz', '"use client" at the root'), value: 1400, tone: 'bad' },
                { label: bi('Frontera en la hoja', 'Boundary at the leaf'), value: 380, tone: 'good' },
              ],
            },
          },
          {
            label: bi('Paso 2 · Dejar page.tsx en el servidor', 'Step 2 · Keep page.tsx on the server'),
            detail: bi(
              'page.tsx lee el producto directamente con el cliente de base de datos del servidor, sin API intermedia ni token expuesto en el navegador. Devuelve JSX con los datos ya resueltos.',
              'page.tsx reads the product directly with the server database client, with no intermediate API and no token exposed in the browser. It returns JSX with the data already resolved.'
            ),
            diagram: {
              kind: 'code',
              lang: 'tsx',
              lines: [
                { text: 'export default async function Page({ params }) {', tone: 'good' },
                { text: '  const supabase = await createClient();      // servidor', tone: 'good' },
                { text: '  const { data: producto } = await supabase', tone: 'good' },
                { text: '    .from("productos").select("*").eq("slug", params.slug).single();', tone: 'good' },
                { text: '  if (!producto) notFound();', tone: 'warn' },
                { text: '  return <Ficha producto={producto} />;', tone: 'good' },
                { text: '}', tone: 'good' },
              ],
            },
          },
          {
            label: bi('Paso 3 · Bajar la frontera al componente más pequeño', 'Step 3 · Push the boundary to the smallest component'),
            detail: bi(
              'Solo AddToCartButton y CartPanel llevan "use client". Reciben datos serializables (id, precioCents, stock) y gestionan el estado del panel. Ficha, Galeria y Precio siguen en el servidor.',
              'Only AddToCartButton and CartPanel carry "use client". They receive serialisable data (id, priceCents, stock) and manage the panel state. Ficha, Galeria and Precio stay on the server.'
            ),
            diagram: {
              kind: 'layers',
              layers: [
                { label: bi('Ficha (servidor)', 'ProductPage (server)'), note: bi('compone todo', 'composes everything'), tone: 'good' },
                { label: bi('Galeria (servidor)', 'Gallery (server)'), note: bi('solo imágenes', 'images only'), tone: 'good' },
                { label: bi('Precio (servidor)', 'Price (server)'), note: bi('formatea céntimos', 'formats cents'), tone: 'good' },
                { label: bi('AddToCartButton ("use client")', 'AddToCartButton ("use client")'), note: bi('onClick + estado del panel', 'onClick + panel state'), tone: 'warn' },
              ],
            },
          },
          {
            label: bi('Paso 4 · Mutar con una acción de servidor y revalidar', 'Step 4 · Mutate with a server action and revalidate'),
            detail: bi(
              'Añadir al carrito llama a una acción "use server" que escribe en la tabla y ejecuta revalidatePath("/carrito"). El contador del carrito se actualiza sin recargar la página ni montar un estado global.',
              'Add to cart calls a "use server" action that writes to the table and runs revalidatePath("/cart"). The cart counter updates without reloading the page or setting up a global state.'
            ),
            diagram: {
              kind: 'flow',
              nodes: [
                { id: 'a', label: bi('onClick', 'onClick'), tone: 'warn' },
                { id: 'b', label: bi('acción "use server"', 'server action'), tone: 'info' },
                { id: 'c', label: bi('insert en BD', 'DB insert'), tone: 'info' },
                { id: 'd', label: bi('revalidatePath', 'revalidatePath'), tone: 'info' },
                { id: 'e', label: bi('Contador nuevo', 'New counter'), tone: 'good' },
              ],
            },
          },
        ],
        result: bi(
          'De 1,4 s a 380 ms, el JavaScript enviado al navegador baja un 71% y la consulta a la base de datos nunca sale del servidor. La interactividad sigue intacta porque solo se movió la frontera, no se eliminó.',
          'From 1.4 s to 380 ms, the JavaScript sent to the browser drops 71% and the database query never leaves the server. Interactivity stays intact because the boundary moved, it was not removed.'
        ),
        selfCheck: {
          prompt: bi('¿Cuál fue el cambio que devolvió la velocidad?', 'Which change brought the speed back?'),
          options: [
            opt('a', 'Quitar la animación del panel lateral', 'Removing the side panel animation'),
            opt('b', 'Mover "use client" de la raíz de la página a los dos componentes que de verdad necesitan estado y eventos', 'Moving "use client" from the page root to the two components that really need state and events'),
            opt('c', 'Añadir un CDN delante', 'Adding a CDN in front'),
            opt('d', 'Usar un modelo de datos más pequeño', 'Using a smaller data model'),
          ],
          correctOptionId: 'b',
          explanation: bi('La regla es dibujar la frontera en la hoja. Todo lo que hay encima de un "use client" se vuelve cliente: por eso marcar la raíz es lo más caro que puedes hacer.', 'The rule is to draw the boundary at the leaf. Everything above a "use client" becomes client: that is why marking the root is the most expensive thing you can do.'),
        },
      },
    ],
    exercises: [
      {
        id: 'cd05-e01',
        format: 'concept',
        difficulty: 1,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('En el App Router de Next.js, un componente dentro de app/ es por defecto…', 'In the Next.js App Router, a component inside app/ is by default…'),
        options: [
          opt('a', 'Client Component', 'a Client Component'),
          opt('b', 'Server Component: se ejecuta en el servidor y envía HTML renderizado', 'a Server Component: it runs on the server and sends rendered HTML'),
          opt('c', 'Estático siempre, sin acceso a datos', 'Always static, with no data access'),
          opt('d', 'Un API route', 'an API route'),
        ],
        correctOptionId: 'b',
        explanation: bi('Por eso puedes hacer await y consultar la base de datos directamente en page.tsx sin exponer credenciales al navegador.', 'That is why you can await and query the database directly in page.tsx without exposing credentials to the browser.'),
        xp: 8,
      },
      {
        id: 'cd05-e02',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada necesidad con dónde se resuelve.', 'Match each need with where it is solved.'),
        pairs: [
          { leftId: 'l1', left: bi('Leer la base de datos con la service key', 'Read the database with the service key'), rightId: 'r1', right: bi('Server Component', 'Server Component') },
          { leftId: 'l2', left: bi('onClick que abre un panel', 'onClick that opens a panel'), rightId: 'r2', right: bi('Client Component', 'Client Component') },
          { leftId: 'l3', left: bi('Escribir un registro tras un formulario', 'Write a record after a form'), rightId: 'r3', right: bi('Server Action ("use server")', 'Server Action ("use server")') },
          { leftId: 'l4', left: bi('Leer localStorage del usuario', 'Read the user localStorage'), rightId: 'r4', right: bi('Client Component, dentro de useEffect', 'Client Component, inside useEffect') },
        ],
        explanation: bi('localStorage no existe durante el render del servidor: leerlo fuera de un efecto rompe la hidratación con un error de mismatch.', 'localStorage does not exist during the server render: reading it outside an effect breaks hydration with a mismatch error.'),
        xp: 12,
      },
      {
        id: 'cd05-e03',
        format: 'ordering',
        difficulty: 2,
        badge: bi('ORDENAR', 'ORDER'),
        prompt: bi('Ordena el flujo de una mutación con acción de servidor.', 'Order the flow of a mutation with a server action.'),
        pieces: [
          { id: 'p1', text: bi('El usuario pulsa el botón en un Client Component', 'The user presses the button in a Client Component') },
          { id: 'p2', text: bi('Se invoca la acción marcada con "use server"', 'The action marked "use server" is invoked') },
          { id: 'p3', text: bi('La acción escribe en la base de datos desde el servidor', 'The action writes to the database from the server') },
          { id: 'p4', text: bi('revalidatePath invalida la caché de la ruta afectada', 'revalidatePath invalidates the cache of the affected route') },
          { id: 'p5', text: bi('Next vuelve a renderizar y el cliente recibe el HTML nuevo', 'Next re-renders and the client receives the new HTML') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        explanation: bi('El paso 4 es el que casi todo el mundo olvida: sin revalidación la escritura se hace pero la pantalla sigue mostrando la caché antigua.', 'Step 4 is the one almost everybody forgets: without revalidation the write happens but the screen still shows the old cache.'),
        xp: 10,
      },
      {
        id: 'cd05-e04',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('Este Server Component lanza un error al compilar. ¿Qué línea es la culpable?', 'This Server Component throws an error when compiling. Which line is the culprit?'),
        lines: [
          { id: 'c1', text: 'import Contador from "./Contador";  // Contador tiene "use client"', tone: 'good' },
          { id: 'c2', text: 'export default async function Page() {', tone: 'good' },
          { id: 'c3', text: '  const datos = await db.productos.findMany();', tone: 'good' },
          { id: 'c4', text: '  return <Contador onSumar={() => db.productos.update()} datos={datos} />;', tone: 'bad', label: bi('sospechoso', 'suspect') },
        ],
        correctLineId: 'c4',
        explanation: bi('Una función definida en el servidor no se puede serializar hacia un Client Component. Hay que convertirla en acción con "use server" o mover la lógica dentro del componente cliente.', 'A function defined on the server cannot be serialised to a Client Component. It must become a "use server" action or the logic must move inside the client component.'),
        xp: 12,
      },
      {
        id: 'cd05-e05',
        format: 'worked_why',
        difficulty: 3,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('¿Por qué poner "use client" en page.tsx hizo la página 3,7 veces más lenta?', 'Why did putting "use client" in page.tsx make the page 3.7× slower?'),
        options: [
          opt('a', 'Porque los Client Components no pueden hacer fetch', 'Because Client Components cannot fetch'),
          opt('b', 'Porque convirtió todo el árbol en cliente: la consulta salió del servidor, se envió todo el JS y el HTML llegó vacío hasta hidratar', 'Because it turned the whole tree into client: the query left the server, all the JS was shipped and the HTML arrived empty until hydration'),
          opt('c', 'Porque desactiva la caché del CDN', 'Because it disables the CDN cache'),
          opt('d', 'Porque obliga a usar useState en todos los hijos', 'Because it forces useState in all children'),
        ],
        correctOptionId: 'b',
        explanation: bi('"use client" marca el inicio del árbol cliente, no un componente aislado. Todo lo que importa pasa a ser cliente también.', '"use client" marks the start of the client tree, not an isolated component. Everything it imports becomes client too.'),
        xp: 12,
      },
      {
        id: 'cd05-e06',
        format: 'output',
        difficulty: 3,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('¿Qué pasa al ejecutar esto en un Server Component?', 'What happens when this runs in a Server Component?'),
        context: {
          mono: true,
          content: 'export default function Page() {\n  const [abierto, setAbierto] = useState(false);\n  return <div>{String(abierto)}</div>;\n}',
        },
        options: [
          opt('a', 'Renderiza "false" en el servidor', 'Renders "false" on the server'),
          opt('b', 'Error: no puedes usar hooks de React en un Server Component sin "use client"', 'Error: you cannot use React hooks in a Server Component without "use client"'),
          opt('c', 'Renderiza pero pierde el estado al navegar', 'Renders but loses state on navigation'),
          opt('d', 'Se convierte automáticamente en Client Component', 'Automatically becomes a Client Component'),
        ],
        correctOptionId: 'b',
        explanation: bi('Next lanza un error explícito en build. No hay conversión automática: la directiva es la única forma de cruzar la frontera.', 'Next throws an explicit error at build. There is no automatic conversion: the directive is the only way to cross the boundary.'),
        xp: 12,
      },
      {
        id: 'cd05-e07',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos páginas del mismo sitio. (A) Blog con 40 artículos que cambian una vez al mes. (B) Panel de pedidos que cambia con cada compra. ¿Qué estrategia de datos para cada una?',
          'Two pages on the same site. (A) A blog with 40 articles changing once a month. (B) An order panel changing with every purchase. What data strategy for each?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Página', 'Page'), bi('Frecuencia de cambio', 'Change frequency'), bi('Quién lo cambia', 'Who changes it')],
          rows: [
            ['A · blog', 'mensual', 'el editor, tras publicar'],
            ['B · pedidos', 'constante', 'los clientes, en cualquier momento'],
          ],
          highlightRow: 1,
        },
        options: [
          opt('a', 'Las dos con dynamic = "force-dynamic"', 'Both with dynamic = "force-dynamic"'),
          opt('b', 'A estática con revalidatePath al publicar; B con revalidateTag tras cada mutación o force-dynamic', 'A static with revalidatePath on publish; B with revalidateTag after each mutation or force-dynamic'),
          opt('c', 'Las dos estáticas en el build', 'Both static at build'),
          opt('d', 'A con force-dynamic y B estática', 'A with force-dynamic and B static'),
        ],
        correctOptionId: 'b',
        explanation: bi('Se decide por la frecuencia y el momento del cambio. Pagar render dinámico en el blog es tirar dinero; servir pedidos cacheados es servir datos falsos.', 'You decide by frequency and moment of change. Paying for a dynamic render on the blog wastes money; serving cached orders serves false data.'),
        xp: 15,
      },
      {
        id: 'cd05-e08',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Una página envía 480 kB de JS con la frontera en la raíz y 139 kB con la frontera en la hoja. ¿Qué porcentaje de JS se ahorra?',
          'A page ships 480 kB of JS with the boundary at the root and 139 kB with the boundary at the leaf. What percentage of JS is saved?'
        ),
        answer: 71,
        tolerance: 1,
        unit: '%',
        formula: bi('(480 − 139) / 480 × 100', '(480 − 139) / 480 × 100'),
        explanation: bi('341 kB menos sobre 480 = 71,04%. En una conexión 4G media eso son unos 1,1 s menos de descarga y parseo.', '341 kB less out of 480 = 71.04%. On an average 4G connection that is about 1.1 s less of download and parse.'),
        xp: 12,
      },
      {
        id: 'cd05-e09',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'Escribes el usuario tras registrarse y revalidas /perfil, pero el nombre sigue sin aparecer hasta recargar. ¿Cuál es la causa más probable?',
          'You write the user after signup and revalidate /profile, but the name still does not appear until a reload. What is the most likely cause?'
        ),
        options: [
          opt('a', 'El navegador cachea el HTML durante una hora', 'The browser caches the HTML for an hour'),
          opt('b', 'Revalidaste una ruta distinta de la que muestra el dato, o el dato lo lee un Client Component desde un estado que no se refresca', 'You revalidated a different route from the one showing the datum, or the datum is read by a Client Component from state that is not refreshed'),
          opt('c', 'Next no permite revalidar tras un insert', 'Next does not allow revalidating after an insert'),
          opt('d', 'Falta un useEffect en page.tsx', 'A useEffect is missing in page.tsx'),
        ],
        correctOptionId: 'b',
        explanation: bi('revalidatePath invalida la caché del servidor, no el estado local de un Client Component. Si el nombre vive en un useState, hay que actualizarlo explícitamente o derivarlo de props.', 'revalidatePath invalidates the server cache, not the local state of a Client Component. If the name lives in a useState, it must be updated explicitly or derived from props.'),
        xp: 15,
      },
      {
        id: 'cd05-e10',
        format: 'faded',
        difficulty: 3,
        badge: bi('COMPLETAR', 'COMPLETE'),
        prompt: bi('Completa la estructura de ficheros de una página de producto con carrito. Los dos primeros ya están colocados.', 'Complete the file structure for a product page with a cart. The first two are already placed.'),
        pieces: [
          { id: 'p1', text: bi('app/producto/[slug]/page.tsx — servidor, lee la BD', 'app/product/[slug]/page.tsx — server, reads the DB') },
          { id: 'p2', text: bi('components/Ficha.tsx — servidor, compone', 'components/ProductInfo.tsx — server, composes') },
          { id: 'p3', text: bi('components/Galeria.tsx — servidor, solo imágenes', 'components/Gallery.tsx — server, images only') },
          { id: 'p4', text: bi('components/AddToCart.tsx — "use client", onClick y estado', 'components/AddToCart.tsx — "use client", onClick and state') },
          { id: 'p5', text: bi('app/actions.ts — "use server", insert + revalidatePath', 'app/actions.ts — "use server", insert + revalidatePath') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        lockedPieceIds: ['p1', 'p2'],
        explanation: bi('La frontera se coloca lo más abajo posible: solo AddToCart es cliente. Las acciones viven en su propio fichero para poder importarse desde componentes cliente.', 'The boundary is placed as low as possible: only AddToCart is a client. Actions live in their own file so they can be imported from client components.'),
        xp: 12,
      },
      {
        id: 'cd05-e11',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Qué significa exactamente que las props de un Client Component se serializan?', 'What exactly does it mean that a Client Component props are serialised?'),
        options: [
          opt('a', 'Que se comprimen para viajar más rápido', 'That they are compressed to travel faster'),
          opt('b', 'Que se convierten en datos transferibles del servidor al navegador, así que solo pueden ser JSON-compatible: no funciones, clases ni instancias', 'That they become transferable data from server to browser, so they can only be JSON-compatible: no functions, classes or instances'),
          opt('c', 'Que se guardan en el estado global', 'That they are stored in global state'),
          opt('d', 'Que se cifran automáticamente', 'That they are encrypted automatically'),
        ],
        correctOptionId: 'b',
        explanation: bi('Date sí pasa (Next lo serializa), pero una función arbitraria no. Las acciones de servidor son la excepción: se serializan como una referencia, no como código.', 'Date does pass (Next serialises it), but an arbitrary function does not. Server actions are the exception: they serialise as a reference, not as code.'),
        xp: 20,
      },
      {
        id: 'cd05-e12',
        format: 'scenario',
        difficulty: 2,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi('Empiezas una página nueva en app/ que solo muestra una lista de la base de datos. ¿Qué escribes primero?', 'You start a new page in app/ that only shows a list from the database. What do you write first?'),
        options: [
          opt('a', '"use client" por si luego hace falta interactividad', '"use client" in case interactivity is needed later'),
          opt('b', 'El Server Component con el await a la base de datos, y añadir "use client" solo al componente que necesite un evento', 'The Server Component with the await to the database, adding "use client" only to the component that needs an event'),
          opt('c', 'Un API route en app/api y fetch desde el cliente', 'An API route in app/api and fetch from the client'),
          opt('d', 'Un useEffect que cargue los datos al montar', 'A useEffect loading the data on mount'),
        ],
        correctOptionId: 'b',
        explanation: bi('Empezar en cliente "por si acaso" es pagar el coste siempre. La frontera se añade cuando aparece la necesidad real, y suele ser un botón.', 'Starting on the client "just in case" means always paying the cost. The boundary is added when the real need appears, and it is usually a button.'),
        xp: 10,
      },
      {
        id: 'cd05-e13',
        format: 'output',
        difficulty: 4,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('¿Qué devuelve esta página en el navegador?', 'What does this page return in the browser?'),
        context: {
          mono: true,
          content: 'export const revalidate = 60;\nexport default async function Page() {\n  const n = await db.visitas.count();\n  return <p>{n}</p>;\n}',
        },
        options: [
          opt('a', 'El contador exacto en cada carga', 'The exact counter on every load'),
          opt('b', 'Un HTML cacheado que se regenera como máximo cada 60 segundos', 'A cached HTML that regenerates at most every 60 seconds'),
          opt('c', 'Un error porque count no es cacheable', 'An error because count is not cacheable'),
          opt('d', 'El valor del build, sin actualizarse nunca', 'The build-time value, never updating'),
        ],
        correctOptionId: 'b',
        explanation: bi('revalidate = 60 es revalidación por tiempo: el primer visitante tras el minuto dispara la regeneración y los demás reciben la caché hasta que esté lista.', 'revalidate = 60 is time-based revalidation: the first visitor after the minute triggers regeneration and the rest receive the cache until it is ready.'),
        xp: 15,
      },
    ],
    recap: [
      bi('Todo es Server Component hasta que escribes "use client", y esa marca baja a todos los hijos.', 'Everything is a Server Component until you write "use client", and that mark cascades to every child.'),
      bi('La frontera va en la hoja: el componente más pequeño que necesite estado, efectos o eventos.', 'The boundary goes at the leaf: the smallest component needing state, effects or events.'),
      bi('Las mutaciones van por acciones "use server" y necesitan revalidatePath para verse en pantalla.', 'Mutations go through "use server" actions and need revalidatePath to show on screen.'),
    ],
    actionMission: {
      id: 'mission-code-5',
      title: bi('Mueve la frontera de cliente a la hoja', 'Move the client boundary to the leaf'),
      objective: bi('Coge una página tuya con "use client" arriba del todo y bájalo al componente mínimo que necesita interactividad.', 'Take one of your pages with "use client" at the very top and push it down to the minimal component needing interactivity.'),
      steps: [
        bi('Anota el tamaño del JS enviado antes del cambio (pestaña Network, filtro JS).', 'Note the size of the JS shipped before the change (Network tab, JS filter).'),
        bi('Quita la directiva de la raíz y añádela solo donde hay useState, useEffect u onClick.', 'Remove the directive from the root and add it only where there is useState, useEffect or onClick.'),
        bi('Mueve las consultas de datos al Server Component y mide otra vez el JS y el tiempo de carga.', 'Move the data queries to the Server Component and measure the JS and load time again.'),
      ],
      proof: bi('Dos capturas de la pestaña Network con el total de JS antes y después, y el tiempo de primera carga.', 'Two Network tab screenshots with the JS total before and after, and the first-load time.'),
      affiliateToolSlug: 'vercel-platform',
      xpBonus: 30,
    },
  },

  /* ---------------------------------------------------------------- L6 -- */
  {
    slug: 'code-06-sql-para-apps',
    unitSlug: 'code-unit-2',
    trackSlug: 'modern-coding',
    orderIndex: 6,
    title: bi('SQL para apps reales', 'SQL for real apps'),
    outcome: bi(
      'Escribirás JOIN, GROUP BY y WHERE correctos, leerás un plan de ejecución y sabrás qué índice falta.',
      'You will write correct JOIN, GROUP BY and WHERE clauses, read an execution plan and know which index is missing.'
    ),
    durationMin: 14,
    xpReward: 150,
    theory: [
      {
        id: 'cd06-t1',
        heading: bi('El orden en que se escribe no es el orden en que se ejecuta', 'The order you write is not the order it runs'),
        body: bi(
          'Escribes SELECT … FROM … WHERE … GROUP BY … ORDER BY. Se ejecuta FROM/JOIN, luego WHERE, luego GROUP BY, luego HAVING, luego SELECT y al final ORDER BY. Por eso no puedes usar un alias del SELECT dentro del WHERE.',
          'You write SELECT … FROM … WHERE … GROUP BY … ORDER BY. It runs FROM/JOIN, then WHERE, then GROUP BY, then HAVING, then SELECT and finally ORDER BY. That is why you cannot use a SELECT alias inside WHERE.'
        ),
        diagram: {
          kind: 'flow',
          nodes: [
            { id: 'a', label: bi('FROM / JOIN', 'FROM / JOIN'), tone: 'info' },
            { id: 'b', label: bi('WHERE', 'WHERE'), tone: 'info' },
            { id: 'c', label: bi('GROUP BY', 'GROUP BY'), tone: 'warn' },
            { id: 'd', label: bi('HAVING', 'HAVING'), tone: 'warn' },
            { id: 'e', label: bi('SELECT', 'SELECT'), tone: 'good' },
            { id: 'f', label: bi('ORDER BY / LIMIT', 'ORDER BY / LIMIT'), tone: 'good' },
          ],
        },
        why: bi('Entender este orden explica el 90% de los errores "columna no existe" en consultas con alias.', 'Understanding this order explains 90% of "column does not exist" errors in queries with aliases.'),
      },
      {
        id: 'cd06-t2',
        heading: bi('INNER JOIN descarta; LEFT JOIN conserva', 'INNER JOIN discards; LEFT JOIN keeps'),
        body: bi(
          'INNER devuelve solo las filas con coincidencia en las dos tablas. LEFT devuelve todas las de la izquierda y NULL donde no hay coincidencia. Para contar "clientes sin pedidos" necesitas LEFT y filtrar por NULL.',
          'INNER returns only rows with a match in both tables. LEFT returns all rows from the left and NULL where there is no match. To count "customers without orders" you need LEFT and a NULL filter.'
        ),
        diagram: {
          kind: 'code',
          lang: 'sql',
          lines: [
            { text: '-- clientes CON al menos un pedido', tone: 'mute' },
            { text: 'SELECT COUNT(DISTINCT c.id) FROM clientes c', tone: 'info' },
            { text: '  JOIN pedidos p ON p.cliente_id = c.id;', tone: 'info' },
            { text: '', tone: 'mute' },
            { text: '-- clientes SIN ningun pedido', tone: 'mute' },
            { text: 'SELECT COUNT(*) FROM clientes c', tone: 'good' },
            { text: '  LEFT JOIN pedidos p ON p.cliente_id = c.id', tone: 'good' },
            { text: '  WHERE p.id IS NULL;', tone: 'good', label: bi('la clave', 'the key') },
          ],
        },
      },
      {
        id: 'cd06-t3',
        heading: bi('WHERE filtra filas; HAVING filtra grupos', 'WHERE filters rows; HAVING filters groups'),
        body: bi(
          'WHERE se aplica antes de agrupar y no puede usar agregados. HAVING se aplica después y sí. Poner COUNT(*) > 5 en el WHERE es un error de sintaxis; va en el HAVING.',
          'WHERE applies before grouping and cannot use aggregates. HAVING applies after and can. Putting COUNT(*) > 5 in WHERE is a syntax error; it belongs in HAVING.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('Mal', 'Wrong'),
            tone: 'bad',
            items: [
              bi('WHERE COUNT(*) > 5', 'WHERE COUNT(*) > 5'),
              bi('WHERE total_cents > 10000 (si total es agregado)', 'WHERE total_cents > 10000 (if total is an aggregate)'),
              bi('Error: aggregate functions are not allowed in WHERE', 'Error: aggregate functions are not allowed in WHERE'),
            ],
          },
          right: {
            title: bi('Bien', 'Right'),
            tone: 'good',
            items: [
              bi('HAVING COUNT(*) > 5', 'HAVING COUNT(*) > 5'),
              bi('WHERE estado = \'pagado\' HAVING SUM(total) > 10000', 'WHERE status = \'paid\' HAVING SUM(total) > 10000'),
              bi('Filtra filas baratas antes de agrupar', 'Filter cheap rows before grouping'),
            ],
          },
        },
      },
      {
        id: 'cd06-t4',
        heading: bi('Un índice es para el WHERE y el JOIN, no para el SELECT', 'An index is for WHERE and JOIN, not for SELECT'),
        body: bi(
          'Sin índice, la base recorre la tabla entera (seq scan). Con índice en la columna filtrada, salta directo a las filas. El índice se justifica cuando la columna aparece en WHERE, JOIN u ORDER BY sobre una tabla grande.',
          'Without an index, the database scans the whole table (seq scan). With an index on the filtered column, it jumps straight to the rows. An index is justified when the column appears in WHERE, JOIN or ORDER BY on a large table.'
        ),
        diagram: {
          kind: 'bars',
          max: 850,
          unit: ' ms',
          items: [
            { label: bi('Seq scan · 1M filas', 'Seq scan · 1M rows'), value: 850, tone: 'bad' },
            { label: bi('Índice en cliente_id', 'Index on customer_id'), value: 3, tone: 'good' },
            { label: bi('Índice compuesto (cliente_id, creado_en)', 'Composite index (customer_id, created_at)'), value: 2, tone: 'good' },
          ],
        },
      },
    ],
    examples: [
      {
        id: 'cd06-ex1',
        title: bi('Ejemplo resuelto: informe de ingresos por producto del último trimestre', 'Worked example: revenue-per-product report for the last quarter'),
        situation: bi(
          'Tablas: productos(id, nombre, categoria), lineas_pedido(id, pedido_id, producto_id, cantidad, precio_cents), pedidos(id, cliente_id, estado, creado_en). Se pide: los 10 productos con más ingreso en pedidos pagados del último trimestre, con su categoría.',
          'Tables: products(id, name, category), order_lines(id, order_id, product_id, quantity, price_cents), orders(id, customer_id, status, created_at). Requested: the top 10 products by revenue in paid orders from the last quarter, with their category.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Identificar la tabla que manda', 'Step 1 · Identify the driving table'),
            detail: bi(
              'El ingreso vive en lineas_pedido. Desde ahí hay que llegar a pedidos para filtrar estado y fecha, y a productos para el nombre y la categoría. Dos JOIN, los dos INNER porque solo interesan las filas con coincidencia.',
              'Revenue lives in order_lines. From there you must reach orders to filter status and date, and products for the name and category. Two JOINs, both INNER because only matching rows matter.'
            ),
            diagram: {
              kind: 'flow',
              nodes: [
                { id: 'a', label: bi('lineas_pedido', 'order_lines'), note: bi('cantidad × precio', 'quantity × price'), tone: 'good' },
                { id: 'b', label: bi('pedidos', 'orders'), note: bi('estado, creado_en', 'status, created_at'), tone: 'info' },
                { id: 'c', label: bi('productos', 'products'), note: bi('nombre, categoria', 'name, category'), tone: 'info' },
              ],
            },
          },
          {
            label: bi('Paso 2 · Filtrar con WHERE antes de agrupar', 'Step 2 · Filter with WHERE before grouping'),
            detail: bi(
              'estado = \'pagado\' y creado_en >= inicio del trimestre. Filtrar pronto reduce las filas que entran al GROUP BY: es la optimización más barata que existe.',
              'status = \'paid\' and created_at >= start of quarter. Filtering early reduces the rows entering GROUP BY: it is the cheapest optimisation there is.'
            ),
            diagram: {
              kind: 'code',
              lang: 'sql',
              lines: [
                { text: 'SELECT p.nombre, p.categoria,', tone: 'good' },
                { text: '       SUM(l.cantidad * l.precio_cents) / 100.0 AS ingreso_eur', tone: 'good' },
                { text: 'FROM lineas_pedido l', tone: 'good' },
                { text: '  JOIN pedidos  o ON o.id = l.pedido_id', tone: 'info' },
                { text: '  JOIN productos p ON p.id = l.producto_id', tone: 'info' },
                { text: "WHERE o.estado = 'pagado'", tone: 'warn', label: bi('antes de agrupar', 'before grouping') },
                { text: "  AND o.creado_en >= date_trunc('quarter', now())", tone: 'warn' },
                { text: 'GROUP BY p.id, p.nombre, p.categoria', tone: 'info' },
                { text: 'ORDER BY ingreso_eur DESC', tone: 'good' },
                { text: 'LIMIT 10;', tone: 'good' },
              ],
            },
          },
          {
            label: bi('Paso 3 · Agrupar por la clave, no solo por el nombre', 'Step 3 · Group by the key, not just the name'),
            detail: bi(
              'GROUP BY p.nombre agruparía dos productos distintos que se llaman igual. Se agrupa por p.id y se incluyen en el GROUP BY las columnas no agregadas del SELECT, que es lo que exige PostgreSQL.',
              'GROUP BY p.name would merge two different products with the same name. Group by p.id and include in the GROUP BY the non-aggregate columns of the SELECT, which is what PostgreSQL requires.'
            ),
          },
          {
            label: bi('Paso 4 · Leer el plan y añadir el índice que falta', 'Step 4 · Read the plan and add the missing index'),
            detail: bi(
              'EXPLAIN ANALYZE muestra Seq Scan on pedidos con 240 ms. Falta un índice compuesto que cubra el filtro completo.',
              'EXPLAIN ANALYZE shows Seq Scan on orders at 240 ms. A composite index covering the whole filter is missing.'
            ),
            diagram: {
              kind: 'code',
              lang: 'sql',
              lines: [
                { text: 'CREATE INDEX pedidos_estado_creado_idx', tone: 'good' },
                { text: "  ON pedidos (estado, creado_en DESC);", tone: 'good' },
                { text: '-- antes: Seq Scan, 240 ms', tone: 'bad' },
                { text: '-- despues: Index Scan, 4 ms', tone: 'good', label: bi('60× más rápido', '60× faster') },
              ],
            },
          },
          {
            label: bi('Paso 5 · Comprobar el resultado con una suma de control', 'Step 5 · Verify the result with a control total'),
            detail: bi(
              'Se compara el SUM total del informe con el SUM de la tabla de pagos del mismo periodo. Si no cuadran, el filtro está mal, no los datos.',
              'Compare the report total SUM with the SUM from the payments table for the same period. If they do not match, the filter is wrong, not the data.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Producto', 'Product'), bi('Categoría', 'Category'), bi('Ingreso', 'Revenue')],
              rows: [
                ['Camiseta básica', 'Ropa', '4 210,00 €'],
                ['Sudadera capucha', 'Ropa', '3 880,50 €'],
                ['Gorra negra', 'Accesorios', '1 240,00 €'],
              ],
              highlightRow: 0,
              note: bi('Suma de control del trimestre: 18 904,20 €. Coincide con la tabla de pagos.', 'Quarter control total: €18,904.20. Matches the payments table.'),
            },
          },
        ],
        result: bi(
          'La consulta pasa de 620 ms a 38 ms con el índice compuesto y el informe se valida contra una segunda fuente. La lección: filtra pronto, agrupa por clave y mide con EXPLAIN antes de optimizar.',
          'The query goes from 620 ms to 38 ms with the composite index and the report is validated against a second source. The lesson: filter early, group by key and measure with EXPLAIN before optimising.'
        ),
        selfCheck: {
          prompt: bi('¿Por qué el índice es (estado, creado_en) y no (creado_en, estado)?', 'Why is the index (status, created_at) and not (created_at, status)?'),
          options: [
            opt('a', 'Porque da igual en PostgreSQL', 'Because it makes no difference in PostgreSQL'),
            opt('b', 'Porque el índice compuesto se usa de izquierda a derecha: primero la igualdad y después el rango', 'Because a composite index is used left to right: equality first, then the range'),
            opt('c', 'Porque estado ocupa menos bytes', 'Because status takes fewer bytes'),
            opt('d', 'Porque creado_en no se puede indexar', 'Because created_at cannot be indexed'),
          ],
          correctOptionId: 'b',
          explanation: bi('La regla es igualdad antes que rango. Con (creado_en, estado) el motor no puede usar la segunda columna para saltar filas: el rango ya rompió el orden.', 'The rule is equality before range. With (created_at, status) the engine cannot use the second column to skip rows: the range already broke the order.'),
        },
      },
    ],
    exercises: [
      {
        id: 'cd06-e01',
        format: 'concept',
        difficulty: 1,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Cuál es el orden real de ejecución de una consulta SELECT?', 'What is the real execution order of a SELECT query?'),
        options: [
          opt('a', 'SELECT → FROM → WHERE → GROUP BY → ORDER BY', 'SELECT → FROM → WHERE → GROUP BY → ORDER BY'),
          opt('b', 'FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT', 'FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT'),
          opt('c', 'WHERE → FROM → SELECT → GROUP BY → LIMIT', 'WHERE → FROM → SELECT → GROUP BY → LIMIT'),
          opt('d', 'FROM → SELECT → WHERE → ORDER BY → GROUP BY', 'FROM → SELECT → WHERE → ORDER BY → GROUP BY'),
        ],
        correctOptionId: 'b',
        explanation: bi('Por eso un alias definido en el SELECT no existe todavía cuando se evalúa el WHERE, y sí existe en el ORDER BY.', 'That is why an alias defined in SELECT does not yet exist when WHERE is evaluated, and does exist in ORDER BY.'),
        xp: 8,
      },
      {
        id: 'cd06-e02',
        format: 'output',
        difficulty: 2,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('¿Qué devuelve esta consulta?', 'What does this query return?'),
        context: {
          mono: true,
          content: 'SELECT COUNT(*) AS total\nFROM clientes c\nLEFT JOIN pedidos p ON p.cliente_id = c.id\nWHERE p.id IS NULL;',
        },
        options: [
          opt('a', 'El número total de clientes', 'The total number of customers'),
          opt('b', 'El número de clientes que no tienen ningún pedido', 'The number of customers with no orders at all'),
          opt('c', 'El número de pedidos', 'The number of orders'),
          opt('d', 'Cero siempre', 'Always zero'),
        ],
        correctOptionId: 'b',
        explanation: bi('LEFT JOIN conserva todos los clientes y rellena con NULL donde no hay pedido. Filtrar por p.id IS NULL deja exactamente los que nunca compraron.', 'LEFT JOIN keeps all customers and fills NULL where there is no order. Filtering on p.id IS NULL leaves exactly those who never bought.'),
        xp: 10,
      },
      {
        id: 'cd06-e03',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('Esta consulta da error de sintaxis. ¿Qué línea está mal?', 'This query gives a syntax error. Which line is wrong?'),
        lines: [
          { id: 'c1', text: 'SELECT cliente_id, SUM(total_cents) AS gasto', tone: 'good' },
          { id: 'c2', text: 'FROM pedidos', tone: 'good' },
          { id: 'c3', text: 'WHERE SUM(total_cents) > 100000', tone: 'bad', label: bi('sospechoso', 'suspect') },
          { id: 'c4', text: 'GROUP BY cliente_id;', tone: 'good' },
        ],
        correctLineId: 'c3',
        explanation: bi('WHERE se ejecuta antes que GROUP BY, así que no hay agregados disponibles. La condición sobre el agregado va en HAVING, después de agrupar.', 'WHERE runs before GROUP BY, so no aggregates are available. The condition on the aggregate goes in HAVING, after grouping.'),
        xp: 12,
      },
      {
        id: 'cd06-e04',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada pregunta de negocio con la construcción SQL correcta.', 'Match each business question with the correct SQL construct.'),
        pairs: [
          { leftId: 'l1', left: bi('Clientes sin pedidos', 'Customers with no orders'), rightId: 'r1', right: bi('LEFT JOIN + WHERE clave IS NULL', 'LEFT JOIN + WHERE key IS NULL') },
          { leftId: 'l2', left: bi('Ingreso total por categoría', 'Total revenue per category'), rightId: 'r2', right: bi('GROUP BY + SUM()', 'GROUP BY + SUM()') },
          { leftId: 'l3', left: bi('Solo categorías con más de 20 pedidos', 'Only categories with more than 20 orders'), rightId: 'r3', right: bi('HAVING COUNT(*) > 20', 'HAVING COUNT(*) > 20') },
          { leftId: 'l4', left: bi('Los 10 productos más vendidos', 'The 10 best-selling products'), rightId: 'r4', right: bi('ORDER BY agregado DESC + LIMIT 10', 'ORDER BY aggregate DESC + LIMIT 10') },
        ],
        explanation: bi('Cada pregunta tiene una construcción canónica. Reconocerlas es lo que separa escribir SQL de traducir una idea a SQL.', 'Each question has a canonical construct. Recognising them is what separates writing SQL from translating an idea into SQL.'),
        xp: 12,
      },
      {
        id: 'cd06-e05',
        format: 'ordering',
        difficulty: 3,
        badge: bi('ORDENAR', 'ORDER'),
        prompt: bi('Ordena las cláusulas para: pedidos pagados de marzo, agrupados por cliente, solo los que superen 500 €.', 'Order the clauses for: paid orders in March, grouped by customer, only those over €500.'),
        pieces: [
          { id: 'p1', text: bi('FROM pedidos p JOIN clientes c ON c.id = p.cliente_id', 'FROM orders p JOIN customers c ON c.id = p.customer_id') },
          { id: 'p2', text: bi("WHERE p.estado = 'pagado' AND p.creado_en >= '2026-03-01'", "WHERE p.status = 'paid' AND p.created_at >= '2026-03-01'") },
          { id: 'p3', text: bi('GROUP BY c.id, c.nombre', 'GROUP BY c.id, c.name') },
          { id: 'p4', text: bi('HAVING SUM(p.total_cents) / 100.0 > 500', 'HAVING SUM(p.total_cents) / 100.0 > 500') },
          { id: 'p5', text: bi('ORDER BY 2 DESC LIMIT 20', 'ORDER BY 2 DESC LIMIT 20') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        explanation: bi('WHERE para las filas (barato, antes de agrupar) y HAVING para los grupos (caro, después). Intercambiarlos es el error más común en informes.', 'WHERE for rows (cheap, before grouping) and HAVING for groups (expensive, after). Swapping them is the most common reporting error.'),
        xp: 12,
      },
      {
        id: 'cd06-e06',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Una tabla tiene 480 000 pedidos. Sin índice, la consulta recorre la tabla entera en 850 ms. Con índice devuelve 340 filas en 4 ms. ¿Cuántas horas de tiempo de base de datos ahorras al mes si se ejecuta 90 000 veces?',
          'A table has 480,000 orders. Without an index the query scans the whole table in 850 ms. With an index it returns 340 rows in 4 ms. How many hours of database time do you save per month if it runs 90,000 times?'
        ),
        answer: 21.15,
        tolerance: 0.5,
        unit: 'h',
        formula: bi('(850 − 4) ms × 90 000 / 3 600 000', '(850 − 4) ms × 90,000 / 3,600,000'),
        explanation: bi('846 ms × 90 000 = 76 140 000 ms = 76 140 s = 21,15 horas al mes. Un índice de una línea devuelve 21 horas de capacidad.', '846 ms × 90,000 = 76,140,000 ms = 76,140 s = 21.15 hours per month. A one-line index returns 21 hours of capacity.'),
        xp: 12,
      },
      {
        id: 'cd06-e07',
        format: 'worked_why',
        difficulty: 3,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('¿Por qué el índice compuesto se creó como (estado, creado_en) y no (creado_en, estado)?', 'Why was the composite index created as (status, created_at) and not (created_at, status)?'),
        options: [
          opt('a', 'Por orden alfabético', 'For alphabetical order'),
          opt('b', 'Porque en un índice compuesto se usa de izquierda a derecha: la columna de igualdad primero y la de rango después', 'Because a composite index is used left to right: the equality column first and the range column after'),
          opt('c', 'Porque estado es más pequeño', 'Because status is smaller'),
          opt('d', 'Porque creado_en no admite índices', 'Because created_at does not support indexes'),
        ],
        correctOptionId: 'b',
        explanation: bi('Con (creado_en, estado) el rango sobre la primera columna impide usar la segunda para filtrar. Igualdad primero, rango después: es la regla de oro del índice compuesto.', 'With (created_at, status) the range on the first column prevents using the second to filter. Equality first, range after: the golden rule of the composite index.'),
        xp: 12,
      },
      {
        id: 'cd06-e08',
        format: 'output',
        difficulty: 4,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('¿Qué devuelve esta consulta con 3 clientes y 5 pedidos?', 'What does this query return with 3 customers and 5 orders?'),
        context: {
          mono: true,
          content: 'SELECT c.nombre, COUNT(p.id) AS pedidos\nFROM clientes c\nLEFT JOIN pedidos p ON p.cliente_id = c.id\nGROUP BY c.nombre;',
        },
        options: [
          opt('a', '3 filas; el cliente sin pedidos aparece con 0', '3 rows; the customer with no orders appears with 0'),
          opt('b', '2 filas; el cliente sin pedidos desaparece', '2 rows; the customer with no orders disappears'),
          opt('c', '5 filas, una por pedido', '5 rows, one per order'),
          opt('d', '1 fila con el total', '1 row with the total'),
        ],
        correctOptionId: 'a',
        explanation: bi('LEFT JOIN conserva los 3 clientes. COUNT(p.id) cuenta solo valores no NULL, así que el cliente sin pedidos da 0. Si fuera COUNT(*) daría 1: la fila existe aunque el pedido sea NULL.', 'LEFT JOIN keeps the 3 customers. COUNT(p.id) counts only non-NULL values, so the customer with no orders gives 0. With COUNT(*) it would give 1: the row exists even though the order is NULL.'),
        xp: 15,
      },
      {
        id: 'cd06-e09',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos consultas lentas sobre la misma tabla de 2M filas. (A) WHERE email = \'x@y.com\' sobre una columna sin índice. (B) WHERE descripcion LIKE \'%zapato%\'. ¿Cuál se arregla con un índice normal?',
          'Two slow queries on the same 2M-row table. (A) WHERE email = \'x@y.com\' on an unindexed column. (B) WHERE description LIKE \'%shoe%\'. Which is fixed with a normal index?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Consulta', 'Query'), bi('Operador', 'Operator'), bi('¿Usa índice B-tree?', 'Uses a B-tree index?')],
          rows: [
            ['A · email =', 'igualdad', 'sí'],
            ['B · LIKE %…%', 'patrón con % inicial', 'no'],
          ],
          highlightRow: 1,
        },
        options: [
          opt('a', 'Las dos', 'Both'),
          opt('b', 'Solo A; B necesita búsqueda de texto completo o un índice trigram (pg_trgm) porque el % inicial impide usar el B-tree', 'Only A; B needs full-text search or a trigram index (pg_trgm) because the leading % prevents B-tree use'),
          opt('c', 'Solo B', 'Only B'),
          opt('d', 'Ninguna, hay que cachear', 'Neither, you have to cache'),
        ],
        correctOptionId: 'b',
        explanation: bi('Un B-tree ordena por el principio del valor. LIKE \'%zapato%\' no puede aprovechar ese orden: necesita pg_trgm o un campo de búsqueda dedicado.', 'A B-tree orders by the start of the value. LIKE \'%shoe%\' cannot use that order: it needs pg_trgm or a dedicated search field.'),
        xp: 15,
      },
      {
        id: 'cd06-e10',
        format: 'bug_hunt',
        difficulty: 4,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('Este informe suma el doble del ingreso real. ¿Qué línea lo causa?', 'This report adds up double the real revenue. Which line causes it?'),
        lines: [
          { id: 'c1', text: 'SELECT o.id, SUM(l.cantidad * l.precio_cents) AS total', tone: 'good' },
          { id: 'c2', text: 'FROM pedidos o', tone: 'good' },
          { id: 'c3', text: '  JOIN lineas_pedido l ON l.pedido_id = o.id', tone: 'good' },
          { id: 'c4', text: '  JOIN pagos p ON p.pedido_id = o.id', tone: 'bad', label: bi('sospechoso', 'suspect') },
        ],
        correctLineId: 'c4',
        explanation: bi(
          'Si un pedido tiene 2 intentos de pago, cada línea se duplica al unirse con pagos: es el fan-out. Se arregla agregando los pagos en una subconsulta antes de unir, o usando EXISTS si solo compruebas que hay pago.',
          'If an order has 2 payment attempts, every line is duplicated when joining with payments: that is fan-out. Fix it by aggregating payments in a subquery before joining, or use EXISTS if you only check that a payment exists.'
        ),
        xp: 15,
      },
      {
        id: 'cd06-e11',
        format: 'faded',
        difficulty: 3,
        badge: bi('COMPLETAR', 'COMPLETE'),
        prompt: bi('Completa la consulta de clientes que compraron más de 3 veces. Las dos primeras partes ya están.', 'Complete the query for customers who bought more than 3 times. The first two parts are done.'),
        pieces: [
          { id: 'p1', text: bi('SELECT c.nombre, COUNT(p.id) AS compras', 'SELECT c.name, COUNT(p.id) AS purchases') },
          { id: 'p2', text: bi('FROM clientes c JOIN pedidos p ON p.cliente_id = c.id', 'FROM customers c JOIN orders p ON p.customer_id = c.id') },
          { id: 'p3', text: bi("WHERE p.estado = 'pagado'", "WHERE p.status = 'paid'") },
          { id: 'p4', text: bi('GROUP BY c.id, c.nombre', 'GROUP BY c.id, c.name') },
          { id: 'p5', text: bi('HAVING COUNT(p.id) > 3 ORDER BY compras DESC', 'HAVING COUNT(p.id) > 3 ORDER BY purchases DESC') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        lockedPieceIds: ['p1', 'p2'],
        explanation: bi('El WHERE filtra pedidos no pagados antes de contar; el HAVING filtra clientes después de contar. Sin el WHERE, contarías intentos fallidos.', 'The WHERE filters unpaid orders before counting; the HAVING filters customers after counting. Without the WHERE, you would count failed attempts.'),
        xp: 12,
      },
      {
        id: 'cd06-e12',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Qué es el fan-out en un JOIN y por qué rompe los agregados?', 'What is fan-out in a JOIN and why does it break aggregates?'),
        options: [
          opt('a', 'Cuando una consulta usa demasiadas tablas y se vuelve lenta', 'When a query uses too many tables and becomes slow'),
          opt('b', 'Cuando una fila de la tabla A coincide con varias de la B y se multiplica, inflando cualquier SUM o COUNT posterior', 'When one row of table A matches several of B and gets multiplied, inflating any subsequent SUM or COUNT'),
          opt('c', 'Cuando el índice no cubre la consulta', 'When the index does not cover the query'),
          opt('d', 'Cuando dos JOIN usan la misma columna', 'When two JOINs use the same column'),
        ],
        correctOptionId: 'b',
        explanation: bi('Es la causa nº1 de informes que suman el doble. Se detecta comparando el total con una segunda fuente y se arregla agregando antes de unir o con EXISTS.', 'It is the number one cause of reports that add up double. Detect it by comparing the total with a second source and fix it by aggregating before joining or with EXISTS.'),
        xp: 20,
      },
      {
        id: 'cd06-e13',
        format: 'scenario',
        difficulty: 2,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi('Tu consulta va lenta. ¿Qué haces antes de añadir un índice?', 'Your query is slow. What do you do before adding an index?'),
        options: [
          opt('a', 'Añadir un índice en todas las columnas del WHERE', 'Add an index on every column in the WHERE'),
          opt('b', 'Ejecutar EXPLAIN ANALYZE y ver qué nodo consume el tiempo', 'Run EXPLAIN ANALYZE and see which node consumes the time'),
          opt('c', 'Añadir caché en la aplicación', 'Add cache in the application'),
          opt('d', 'Subir el tamaño de la base de datos', 'Increase the database size'),
        ],
        correctOptionId: 'b',
        explanation: bi('EXPLAIN ANALYZE dice si hay Seq Scan, qué JOIN es caro y cuántas filas estima mal. Indexar sin medir añade coste de escritura sin arreglar nada.', 'EXPLAIN ANALYZE tells you whether there is a Seq Scan, which JOIN is expensive and how many rows it mis-estimates. Indexing without measuring adds write cost without fixing anything.'),
        xp: 10,
      },
    ],
    recap: [
      bi('Se ejecuta FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.', 'It runs FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.'),
      bi('WHERE filtra filas y no admite agregados; HAVING filtra grupos. LEFT JOIN + IS NULL encuentra lo que falta.', 'WHERE filters rows and takes no aggregates; HAVING filters groups. LEFT JOIN + IS NULL finds what is missing.'),
      bi('Índice compuesto: igualdad antes que rango. Y siempre EXPLAIN ANALYZE antes de indexar.', 'Composite index: equality before range. And always EXPLAIN ANALYZE before indexing.'),
    ],
    actionMission: {
      id: 'mission-code-6',
      title: bi('Escribe un informe real y valídalo', 'Write a real report and validate it'),
      objective: bi('Construye una consulta con dos JOIN, GROUP BY y HAVING sobre datos reales tuyos, y comprueba el resultado con una suma de control.', 'Build a query with two JOINs, GROUP BY and HAVING over your own real data, and verify the result with a control total.'),
      steps: [
        bi('Elige una pregunta de negocio que hoy respondes a mano (top productos, mejores clientes, meses flojos).', 'Pick a business question you answer by hand today (top products, best customers, weak months).'),
        bi('Escribe la consulta filtrando con WHERE antes de agrupar y usando HAVING para el umbral.', 'Write the query filtering with WHERE before grouping and using HAVING for the threshold.'),
        bi('Ejecuta EXPLAIN ANALYZE y anota si hay algún Seq Scan sobre una tabla grande.', 'Run EXPLAIN ANALYZE and note whether there is a Seq Scan on a large table.'),
      ],
      proof: bi('La consulta, su resultado y una segunda vía de comprobación (otra consulta o la hoja de cálculo) que dé el mismo total.', 'The query, its result and a second verification path (another query or the spreadsheet) giving the same total.'),
      affiliateToolSlug: 'supabase-cloud',
      xpBonus: 30,
    },
  },

  /* ---------------------------------------------------------------- L7 -- */
  {
    slug: 'code-07-supabase-rls',
    unitSlug: 'code-unit-2',
    trackSlug: 'modern-coding',
    orderIndex: 7,
    title: bi('Supabase y RLS: seguridad de verdad', 'Supabase and RLS: real security'),
    outcome: bi(
      'Escribirás políticas de Row Level Security que no filtran datos y detectarás el bug clásico de RLS.',
      'You will write Row Level Security policies that leak no data and spot the classic RLS bug.'
    ),
    durationMin: 14,
    xpReward: 150,
    theory: [
      {
        id: 'cd07-t1',
        heading: bi('La clave anon es pública: RLS es tu única defensa', 'The anon key is public: RLS is your only defence'),
        body: bi(
          'Cualquiera puede leer la clave anon del JavaScript de tu web. Con ella puede consultar Supabase directamente saltándose tu frontend. Lo que impide que vea datos ajenos no es tu código: son las políticas de la base de datos.',
          'Anyone can read the anon key from your website JavaScript. With it they can query Supabase directly, bypassing your frontend. What stops them seeing other people data is not your code: it is the database policies.'
        ),
        diagram: {
          kind: 'flow',
          nodes: [
            { id: 'a', label: bi('Atacante', 'Attacker'), note: bi('clave anon pública', 'public anon key'), tone: 'bad' },
            { id: 'b', label: bi('Tu frontend', 'Your frontend'), note: bi('se lo salta', 'bypassed'), tone: 'warn' },
            { id: 'c', label: bi('PostgREST', 'PostgREST'), tone: 'info' },
            { id: 'd', label: bi('Políticas RLS', 'RLS policies'), note: bi('la única barrera', 'the only barrier'), tone: 'good' },
          ],
        },
        why: bi('Si RLS está desactivado en una tabla, esa tabla es pública. No "casi": pública.', 'If RLS is disabled on a table, that table is public. Not "almost": public.'),
      },
      {
        id: 'cd07-t2',
        heading: bi('RLS activado sin políticas = nadie puede nada', 'RLS enabled with no policies = nobody can do anything'),
        body: bi(
          'Activar RLS sin crear políticas bloquea también a tus usuarios legítimos: la consulta devuelve un array vacío sin error. Es el bug más confundido de Supabase, porque parece que no hay datos cuando en realidad no hay permiso.',
          'Enabling RLS without creating policies also blocks your legitimate users: the query returns an empty array with no error. It is the most misdiagnosed Supabase bug, because it looks like missing data when it is actually missing permission.'
        ),
        diagram: {
          kind: 'table',
          head: [bi('RLS', 'RLS'), bi('Políticas', 'Policies'), bi('Resultado', 'Result')],
          rows: [
            ['desactivado', 'ninguna', 'TODO público: fuga de datos'],
            ['activado', 'ninguna', 'nadie lee nada: array vacío'],
            ['activado', 'correctas', 'cada usuario ve solo lo suyo'],
            ['activado', 'demasiado anchas', 'funciona pero filtra'],
          ],
          highlightRow: 2,
        },
      },
      {
        id: 'cd07-t3',
        heading: bi('auth.uid() es el usuario real de la petición', 'auth.uid() is the real user of the request'),
        body: bi(
          'Dentro de una política, auth.uid() devuelve el id del JWT de quien llama. No se puede falsificar desde el cliente. Comparar user_id = auth.uid() es la política de "solo mis filas" y cubre la mayoría de los casos.',
          'Inside a policy, auth.uid() returns the id from the JWT of whoever is calling. It cannot be forged from the client. Comparing user_id = auth.uid() is the "only my rows" policy and covers most cases.'
        ),
        diagram: {
          kind: 'code',
          lang: 'sql',
          lines: [
            { text: 'CREATE POLICY "solo mis perfiles" ON profiles', tone: 'good' },
            { text: '  FOR SELECT USING (id = auth.uid());', tone: 'good' },
            { text: '', tone: 'mute' },
            { text: 'CREATE POLICY "actualizo lo mio" ON profiles', tone: 'good' },
            { text: '  FOR UPDATE USING (id = auth.uid())', tone: 'good' },
            { text: '  WITH CHECK (id = auth.uid());', tone: 'good', label: bi('impide cambiar el id', 'blocks changing the id') },
          ],
        },
      },
      {
        id: 'cd07-t4',
        heading: bi('USING vs WITH CHECK: leer vs escribir', 'USING vs WITH CHECK: reading vs writing'),
        body: bi(
          'USING decide qué filas existentes puede ver o modificar. WITH CHECK decide qué filas nuevas o modificadas se aceptan. En UPDATE se aplican las dos: sin WITH CHECK, un usuario puede reasignar su fila a otro id.',
          'USING decides which existing rows can be seen or modified. WITH CHECK decides which new or modified rows are accepted. On UPDATE both apply: without WITH CHECK, a user can reassign their row to another id.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('Solo USING', 'USING only'),
            tone: 'warn',
            items: [
              bi('Controla qué filas se leen', 'Controls which rows are read'),
              bi('En INSERT no hay fila previa: no filtra', 'On INSERT there is no previous row: it does not filter'),
              bi('Se puede insertar una fila con otro user_id', 'You can insert a row with someone else user_id'),
            ],
          },
          right: {
            title: bi('USING + WITH CHECK', 'USING + WITH CHECK'),
            tone: 'good',
            items: [
              bi('Controla lectura y escritura', 'Controls reading and writing'),
              bi('WITH CHECK valida la fila resultante', 'WITH CHECK validates the resulting row'),
              bi('Imposible escribir datos ajenos', 'Impossible to write someone else data'),
            ],
          },
        },
      },
      {
        id: 'cd07-t5',
        heading: bi('SECURITY DEFINER: poder con correa', 'SECURITY DEFINER: power with a leash'),
        body: bi(
          'Una función SECURITY DEFINER se ejecuta con los permisos de su propietario (normalmente postgres), saltándose RLS. Es necesaria para operaciones privilegiadas como dar XP, pero exige validación interna y GRANT solo al rol correcto.',
          'A SECURITY DEFINER function runs with its owner permissions (usually postgres), bypassing RLS. It is necessary for privileged operations like awarding XP, but demands internal validation and GRANT only to the correct role.'
        ),
        diagram: {
          kind: 'layers',
          layers: [
            { label: bi('1 · auth.uid() obligatorio dentro', '1 · auth.uid() mandatory inside'), note: bi('nunca aceptar el user_id como parámetro', 'never accept user_id as a parameter'), tone: 'bad' },
            { label: bi('2 · Validar los importes', '2 · Validate the amounts'), note: bi('rango, signo y frecuencia', 'range, sign and frequency'), tone: 'warn' },
            { label: bi('3 · search_path fijado', '3 · Fixed search_path'), note: bi('evita resolución de esquemas ambigua', 'prevents ambiguous schema resolution'), tone: 'warn' },
            { label: bi('4 · GRANT solo a authenticated', '4 · GRANT to authenticated only'), tone: 'good' },
          ],
        },
      },
    ],
    examples: [
      {
        id: 'cd07-ex1',
        title: bi('Ejemplo resuelto: la tabla de pedidos que filtraba datos de otros clientes', 'Worked example: the orders table leaking other customers data'),
        situation: bi(
          'Una tienda tiene RLS activado en orders con una sola política SELECT. Un usuario descubre que cambiando el filtro en la URL ve los pedidos de otros clientes, con nombre, dirección y teléfono.',
          'A store has RLS enabled on orders with a single SELECT policy. A user discovers that by changing the filter in the URL they see other customers orders, with name, address and phone.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Leer la política tal como está', 'Step 1 · Read the policy as it stands'),
            detail: bi(
              'La política dice USING (cliente_id IS NOT NULL). Es técnicamente una política SELECT, así que el panel muestra "RLS activado" en verde. Pero no restringe nada: cualquier fila con cliente_id cumple.',
              'The policy says USING (customer_id IS NOT NULL). It is technically a SELECT policy, so the dashboard shows "RLS enabled" in green. But it restricts nothing: any row with a customer_id satisfies it.'
            ),
            diagram: {
              kind: 'code',
              lang: 'sql',
              lines: [
                { text: 'CREATE POLICY "leer pedidos" ON orders', tone: 'bad' },
                { text: '  FOR SELECT USING (cliente_id IS NOT NULL);', tone: 'bad', label: bi('no restringe', 'does not restrict') },
              ],
            },
          },
          {
            label: bi('Paso 2 · Verificar con una consulta real de otro usuario', 'Step 2 · Verify with a real query as another user'),
            detail: bi(
              'Se crea un segundo usuario de prueba y se consulta orders sin filtro. Devuelve 1 240 filas. Ese es el alcance real de la fuga, no una hipótesis.',
              'Create a second test user and query orders without a filter. It returns 1,240 rows. That is the real scope of the leak, not a hypothesis.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Prueba', 'Test'), bi('Esperado', 'Expected'), bi('Obtenido', 'Got')],
              rows: [
                ['usuario A · mis pedidos', '12 filas', '1 240 filas'],
                ['usuario B · mis pedidos', '4 filas', '1 240 filas'],
                ['anónimo', '0 filas', '0 filas'],
              ],
              highlightRow: 0,
            },
          },
          {
            label: bi('Paso 3 · Reescribir la política comparando con auth.uid()', 'Step 3 · Rewrite the policy comparing with auth.uid()'),
            detail: bi(
              'Se borra la política y se crea una que compara el dueño de la fila con el usuario de la petición. Se añade además la política de INSERT con WITH CHECK para que nadie cree pedidos a nombre de otro.',
              'Drop the policy and create one comparing the row owner with the request user. Also add an INSERT policy with WITH CHECK so nobody can create orders in someone else name.'
            ),
            diagram: {
              kind: 'code',
              lang: 'sql',
              lines: [
                { text: 'DROP POLICY "leer pedidos" ON orders;', tone: 'warn' },
                { text: '', tone: 'mute' },
                { text: 'CREATE POLICY "leo los mios" ON orders', tone: 'good' },
                { text: '  FOR SELECT USING (cliente_id = auth.uid());', tone: 'good' },
                { text: '', tone: 'mute' },
                { text: 'CREATE POLICY "creo los mios" ON orders', tone: 'good' },
                { text: '  FOR INSERT WITH CHECK (cliente_id = auth.uid());', tone: 'good', label: bi('WITH CHECK', 'WITH CHECK') },
              ],
            },
          },
          {
            label: bi('Paso 4 · Auditar todas las tablas, no solo la que falló', 'Step 4 · Audit every table, not just the one that failed'),
            detail: bi(
              'Se recorre el catálogo buscando tablas con RLS desactivado o con políticas que no mencionan auth.uid(). Aparecen 3 tablas más expuestas: order_lines, shipping_addresses y support_notes.',
              'Go through the catalogue looking for tables with RLS disabled or policies that do not mention auth.uid(). Three more exposed tables appear: order_lines, shipping_addresses and support_notes.'
            ),
            diagram: {
              kind: 'code',
              lang: 'sql',
              lines: [
                { text: 'SELECT schemaname, tablename, rowsecurity', tone: 'info' },
                { text: 'FROM pg_tables', tone: 'info' },
                { text: "WHERE schemaname = 'public';", tone: 'info' },
                { text: '-- despues: listar politicas por tabla y buscar', tone: 'warn' },
                { text: '-- las que no contienen auth.uid()', tone: 'warn', label: bi('auditoría', 'audit') },
              ],
            },
          },
          {
            label: bi('Paso 5 · Dejar un test que falla si vuelve a pasar', 'Step 5 · Leave a test that fails if it happens again'),
            detail: bi(
              'Un test de integración que, con el JWT del usuario A, intenta leer pedidos del usuario B y exige 0 filas. Se ejecuta en cada deploy. Sin ese test, la próxima política mal escrita vuelve a abrir la puerta.',
              'An integration test that, with user A JWT, tries to read user B orders and expects 0 rows. It runs on every deploy. Without that test, the next badly written policy opens the door again.'
            ),
          },
        ],
        result: bi(
          'La fuga se cierra en 40 minutos y aparecen 3 tablas más expuestas que nadie había revisado. El test de RLS queda en el pipeline: es lo que convierte un incidente en una garantía.',
          'The leak is closed in 40 minutes and 3 more exposed tables appear that nobody had reviewed. The RLS test stays in the pipeline: that is what turns an incident into a guarantee.'
        ),
        selfCheck: {
          prompt: bi('¿Por qué la política original daba una falsa sensación de seguridad?', 'Why did the original policy give a false sense of security?'),
          options: [
            opt('a', 'Porque estaba escrita en mayúsculas', 'Because it was written in uppercase'),
            opt('b', 'Porque RLS aparecía como activado en el panel, pero la condición se cumplía en todas las filas y no restringía nada', 'Because RLS showed as enabled in the dashboard, but the condition held for every row and restricted nothing'),
            opt('c', 'Porque faltaba la política de INSERT', 'Because the INSERT policy was missing'),
            opt('d', 'Porque el atacante usaba la service key', 'Because the attacker used the service key'),
          ],
          correctOptionId: 'b',
          explanation: bi('El indicador del panel dice "RLS activado", no "RLS correcto". La única comprobación válida es consultar como otro usuario y verificar que devuelve 0 filas.', 'The dashboard indicator says "RLS enabled", not "RLS correct". The only valid check is to query as another user and verify it returns 0 rows.'),
        },
      },
    ],
    exercises: [
      {
        id: 'cd07-e01',
        format: 'concept',
        difficulty: 1,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Por qué la clave anon de Supabase no es un secreto?', 'Why is the Supabase anon key not a secret?'),
        options: [
          opt('a', 'Porque caduca cada hora', 'Because it expires every hour'),
          opt('b', 'Porque va incluida en el JavaScript que se descarga el navegador y cualquiera puede leerla', 'Because it is included in the JavaScript the browser downloads and anyone can read it'),
          opt('c', 'Porque solo permite lectura', 'Because it only allows reading'),
          opt('d', 'Porque está documentada públicamente por Supabase', 'Because it is publicly documented by Supabase'),
        ],
        correctOptionId: 'b',
        explanation: bi('Por eso la seguridad no puede vivir en el frontend: vive en las políticas RLS de la base de datos. La service key sí es secreta y solo va en el servidor.', 'That is why security cannot live in the frontend: it lives in the database RLS policies. The service key is secret and only goes on the server.'),
        xp: 8,
      },
      {
        id: 'cd07-e02',
        format: 'output',
        difficulty: 2,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('Activas RLS en una tabla y no creas ninguna política. ¿Qué recibe tu usuario autenticado al hacer select?', 'You enable RLS on a table and create no policy. What does your authenticated user get on a select?'),
        options: [
          opt('a', 'Todas las filas, porque está autenticado', 'All rows, because it is authenticated'),
          opt('b', 'Un array vacío sin error', 'An empty array with no error'),
          opt('c', 'Un error 403 explícito', 'An explicit 403 error'),
          opt('d', 'Solo las filas que creó él', 'Only the rows they created'),
        ],
        correctOptionId: 'b',
        explanation: bi('RLS sin políticas niega todo por defecto y PostgREST lo traduce a cero filas, no a error. Por eso parece un problema de datos cuando es de permisos.', 'RLS without policies denies everything by default and PostgREST translates that into zero rows, not an error. That is why it looks like a data problem when it is a permission one.'),
        xp: 10,
      },
      {
        id: 'cd07-e03',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada clave o mecanismo con su uso correcto.', 'Match each key or mechanism with its correct use.'),
        pairs: [
          { leftId: 'l1', left: bi('anon key', 'anon key'), rightId: 'r1', right: bi('Navegador, siempre con RLS activado', 'Browser, always with RLS enabled') },
          { leftId: 'l2', left: bi('service_role key', 'service_role key'), rightId: 'r2', right: bi('Solo servidor: salta RLS por completo', 'Server only: bypasses RLS entirely') },
          { leftId: 'l3', left: bi('auth.uid()', 'auth.uid()'), rightId: 'r3', right: bi('Dentro de políticas, identifica al usuario real', 'Inside policies, identifies the real user') },
          { leftId: 'l4', left: bi('SECURITY DEFINER', 'SECURITY DEFINER'), rightId: 'r4', right: bi('Función privilegiada con validación interna obligatoria', 'Privileged function with mandatory internal validation') },
        ],
        explanation: bi('Poner la service_role key en el cliente es el error más grave posible: entrega la base de datos entera sin restricciones.', 'Putting the service_role key in the client is the most serious possible error: it hands over the entire database with no restrictions.'),
        xp: 12,
      },
      {
        id: 'cd07-e04',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('Con esta política, un usuario puede asignarse el perfil de otro. ¿Qué línea es el problema?', 'With this policy, a user can assign themselves another person profile. Which line is the problem?'),
        lines: [
          { id: 'c1', text: 'ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;', tone: 'good' },
          { id: 'c2', text: 'CREATE POLICY "edito mi perfil" ON profiles FOR UPDATE', tone: 'good' },
          { id: 'c3', text: '  USING (id = auth.uid());', tone: 'bad', label: bi('incompleto', 'incomplete') },
          { id: 'c4', text: 'GRANT UPDATE ON profiles TO authenticated;', tone: 'good' },
        ],
        correctLineId: 'c3',
        explanation: bi('USING autoriza tocar la fila propia, pero no restringe el valor nuevo. Falta WITH CHECK (id = auth.uid()) para impedir que cambie el id a otro usuario.', 'USING authorises touching your own row, but does not restrict the new value. WITH CHECK (id = auth.uid()) is missing to prevent changing the id to another user.'),
        xp: 12,
      },
      {
        id: 'cd07-e05',
        format: 'faded',
        difficulty: 3,
        badge: bi('COMPLETAR', 'COMPLETE'),
        prompt: bi('Completa la secuencia para securizar una tabla nueva. Los dos primeros pasos ya están.', 'Complete the sequence to secure a new table. The first two steps are done.'),
        pieces: [
          { id: 'p1', text: bi('ALTER TABLE … ENABLE ROW LEVEL SECURITY', 'ALTER TABLE … ENABLE ROW LEVEL SECURITY') },
          { id: 'p2', text: bi('Política SELECT con USING (user_id = auth.uid())', 'SELECT policy with USING (user_id = auth.uid())') },
          { id: 'p3', text: bi('Política INSERT con WITH CHECK (user_id = auth.uid())', 'INSERT policy with WITH CHECK (user_id = auth.uid())') },
          { id: 'p4', text: bi('Política UPDATE con USING y WITH CHECK', 'UPDATE policy with USING and WITH CHECK') },
          { id: 'p5', text: bi('Test con dos usuarios que verifica 0 filas cruzadas', 'Test with two users verifying 0 cross rows') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        lockedPieceIds: ['p1', 'p2'],
        explanation: bi('Activar RLS sin políticas rompe tu propia app. El orden correcto es activar y crear las tres políticas en la misma migración, nunca en dos despliegues.', 'Enabling RLS without policies breaks your own app. The correct order is to enable and create the three policies in the same migration, never across two deploys.'),
        xp: 12,
      },
      {
        id: 'cd07-e06',
        format: 'worked_why',
        difficulty: 3,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('En el ejemplo, ¿por qué se creó un segundo usuario de prueba en vez de revisar solo el código?', 'In the example, why was a second test user created instead of only reviewing the code?'),
        options: [
          opt('a', 'Porque el código no se puede auditar', 'Because the code cannot be audited'),
          opt('b', 'Porque la única prueba válida de una política es ejecutarla como otro usuario y comprobar cuántas filas devuelve', 'Because the only valid test of a policy is running it as another user and checking how many rows come back'),
          opt('c', 'Porque Supabase lo exige', 'Because Supabase requires it'),
          opt('d', 'Porque así la consulta va más rápida', 'Because the query runs faster that way'),
        ],
        correctOptionId: 'b',
        explanation: bi('Leer una política y creer que restringe es exactamente lo que falló aquí. La comprobación empírica con dos usuarios tarda 5 minutos y no admite interpretación.', 'Reading a policy and believing it restricts is exactly what failed here. The empirical check with two users takes 5 minutes and admits no interpretation.'),
        xp: 12,
      },
      {
        id: 'cd07-e07',
        format: 'output',
        difficulty: 4,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('¿Qué devuelve esta función SECURITY DEFINER si se le pasa un user_id ajeno?', 'What does this SECURITY DEFINER function return if passed someone else user_id?'),
        context: {
          mono: true,
          content: 'CREATE FUNCTION dar_xp(p_user uuid, p_amount int)\nRETURNS void SECURITY DEFINER AS $$\nBEGIN\n  UPDATE profiles SET total_xp = total_xp + p_amount\n  WHERE id = p_user;\nEND; $$ LANGUAGE plpgsql;',
        },
        options: [
          opt('a', 'Error de permiso porque RLS lo bloquea', 'A permission error because RLS blocks it'),
          opt('b', 'Suma XP al usuario indicado: SECURITY DEFINER salta RLS y la función confía en el parámetro', 'Adds XP to the given user: SECURITY DEFINER bypasses RLS and the function trusts the parameter'),
          opt('c', 'No hace nada', 'Does nothing'),
          opt('d', 'Solo funciona con la service key', 'Only works with the service key'),
        ],
        correctOptionId: 'b',
        explanation: bi('Ese es el agujero clásico: cualquier usuario autenticado puede llamarte con el id de otro. La función debe ignorar el parámetro y usar auth.uid() internamente.', 'That is the classic hole: any authenticated user can call you with someone else id. The function must ignore the parameter and use auth.uid() internally.'),
        xp: 15,
      },
      {
        id: 'cd07-e08',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos operaciones. (A) El usuario cambia su nombre visible. (B) El sistema suma XP al terminar una lección. ¿Cuál va con cliente directo + RLS y cuál con función SECURITY DEFINER?',
          'Two operations. (A) The user changes their display name. (B) The system adds XP when a lesson finishes. Which one goes with direct client + RLS and which with a SECURITY DEFINER function?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Operación', 'Operation'), bi('Quién decide el valor', 'Who decides the value'), bi('Riesgo si lo hace el cliente', 'Risk if the client does it')],
          rows: [
            ['A · nombre', 'el usuario', 'ninguno: es su dato'],
            ['B · XP', 'el sistema', 'se auto-asigna XP infinito'],
          ],
          highlightRow: 1,
        },
        options: [
          opt('a', 'Las dos con update directo del cliente', 'Both with a direct client update'),
          opt('b', 'A con update directo protegido por RLS; B con función SECURITY DEFINER que calcula el XP dentro y usa auth.uid()', 'A with a direct update protected by RLS; B with a SECURITY DEFINER function that computes the XP inside and uses auth.uid()'),
          opt('c', 'Las dos con SECURITY DEFINER', 'Both with SECURITY DEFINER'),
          opt('d', 'A con SECURITY DEFINER y B con cliente directo', 'A with SECURITY DEFINER and B with a direct client'),
        ],
        correctOptionId: 'b',
        explanation: bi('Se decide por quién controla el valor. Si el usuario puede elegir el número, no puede escribirlo él: el cálculo va dentro de la función privilegiada.', 'You decide by who controls the value. If the user can choose the number, they cannot write it: the calculation goes inside the privileged function.'),
        xp: 15,
      },
      {
        id: 'cd07-e09',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'Tu app deja de mostrar datos tras activar RLS en producción y no hay ningún error en consola. ¿Qué compruebas primero?',
          'Your app stops showing data after enabling RLS in production and there is no error in the console. What do you check first?'
        ),
        options: [
          opt('a', 'Que la base de datos tenga datos', 'That the database has data'),
          opt('b', 'Que existan políticas para la operación concreta (SELECT) y que su USING coincida con el auth.uid() de la sesión real', 'That policies exist for the specific operation (SELECT) and their USING matches the auth.uid() of the real session'),
          opt('c', 'Que el frontend haga bien la consulta', 'That the frontend makes the query correctly'),
          opt('d', 'Desactivar RLS para volver a tener datos', 'Disable RLS to have data again'),
        ],
        correctOptionId: 'b',
        explanation: bi('RLS activado sin política SELECT devuelve vacío sin error: es lo primero que se descarta. Desactivar RLS "para arreglarlo" abre los datos de todos los usuarios.', 'RLS enabled without a SELECT policy returns empty with no error: that is the first thing to rule out. Disabling RLS "to fix it" exposes every user data.'),
        xp: 15,
      },
      {
        id: 'cd07-e10',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Una auditoría revisa 34 tablas. Se tardan 6 minutos por tabla en escribir y probar sus políticas. Si cada semana sin auditar supone un 2% de probabilidad de fuga, ¿cuántas horas de trabajo cierran el riesgo?',
          'An audit reviews 34 tables. Each table takes 6 minutes to write and test its policies. If every unaudited week carries a 2% leak probability, how many hours of work close the risk?'
        ),
        answer: 3.4,
        tolerance: 0.2,
        unit: 'h',
        formula: bi('34 × 6 min = 204 min', '34 × 6 min = 204 min'),
        explanation: bi('204 minutos = 3,4 horas. Es el coste total de cerrar una fuga de datos de clientes: menos de media jornada de trabajo.', '204 minutes = 3.4 hours. That is the total cost of closing a customer data leak: less than half a workday.'),
        xp: 12,
      },
      {
        id: 'cd07-e11',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Qué riesgo específico tiene una función SECURITY DEFINER sin SET search_path?', 'What specific risk does a SECURITY DEFINER function have without SET search_path?'),
        options: [
          opt('a', 'Que vaya más lenta', 'That it runs slower'),
          opt('b', 'Que un esquema creado por otro rol pueda shadowear una tabla o función y ejecutar código con privilegios del propietario', 'That a schema created by another role can shadow a table or function and execute code with the owner privileges'),
          opt('c', 'Que no se pueda llamar desde el cliente', 'That it cannot be called from the client'),
          opt('d', 'Que RLS se desactive en toda la base', 'That RLS is disabled across the whole database'),
        ],
        correctOptionId: 'b',
        explanation: bi('Sin search_path fijado, la resolución de nombres depende del rol que llama. Es un vector de escalada de privilegios documentado por el propio PostgreSQL.', 'Without a fixed search_path, name resolution depends on the calling role. It is a privilege-escalation vector documented by PostgreSQL itself.'),
        xp: 20,
      },
      {
        id: 'cd07-e12',
        format: 'ordering',
        difficulty: 2,
        badge: bi('ORDENAR', 'ORDER'),
        prompt: bi('Ordena los pasos de una auditoría RLS de 30 minutos.', 'Order the steps of a 30-minute RLS audit.'),
        pieces: [
          { id: 'p1', text: bi('Listar todas las tablas del esquema public', 'List all tables in the public schema') },
          { id: 'p2', text: bi('Marcar las que tienen rowsecurity = false', 'Mark the ones with rowsecurity = false') },
          { id: 'p3', text: bi('Listar las políticas de cada tabla activada', 'List the policies of each enabled table') },
          { id: 'p4', text: bi('Descartar las que no contienen auth.uid() o un rol explícito', 'Discard the ones that do not contain auth.uid() or an explicit role') },
          { id: 'p5', text: bi('Probar con dos usuarios reales leyendo filas cruzadas', 'Test with two real users reading cross rows') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        explanation: bi('Es un embudo: de todas las tablas a las sospechosas, y de ahí a la prueba empírica. Sin el paso 5, el informe es una opinión.', 'It is a funnel: from all tables to the suspects, and from there to the empirical test. Without step 5, the report is an opinion.'),
        xp: 10,
      },
      {
        id: 'cd07-e13',
        format: 'scenario',
        difficulty: 2,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi('Vas a crear una tabla nueva en tu proyecto Supabase. ¿Qué haces en la misma migración?', 'You are about to create a new table in your Supabase project. What do you do in the same migration?'),
        options: [
          opt('a', 'Crear la tabla y activar RLS en un deploy posterior', 'Create the table and enable RLS in a later deploy'),
          opt('b', 'Crear la tabla, activar RLS y escribir las políticas SELECT/INSERT/UPDATE/DELETE en la misma migración', 'Create the table, enable RLS and write the SELECT/INSERT/UPDATE/DELETE policies in the same migration'),
          opt('c', 'Crear la tabla sin RLS porque el frontend ya filtra', 'Create the table without RLS because the frontend already filters'),
          opt('d', 'Crear la tabla con RLS y sin políticas para probar', 'Create the table with RLS and no policies to test'),
        ],
        correctOptionId: 'b',
        explanation: bi('Entre el deploy A y el deploy B la tabla está expuesta. Y sin políticas la app se rompe. Las dos cosas van juntas, siempre, en la misma migración.', 'Between deploy A and deploy B the table is exposed. And without policies the app breaks. Both go together, always, in the same migration.'),
        xp: 10,
      },
    ],
    recap: [
      bi('La anon key es pública: RLS es la única barrera real entre un atacante y tus datos.', 'The anon key is public: RLS is the only real barrier between an attacker and your data.'),
      bi('RLS sin políticas devuelve vacío sin error. USING lee, WITH CHECK escribe; en UPDATE hacen falta las dos.', 'RLS without policies returns empty with no error. USING reads, WITH CHECK writes; on UPDATE you need both.'),
      bi('SECURITY DEFINER salta RLS: usa auth.uid() dentro, valida importes, fija search_path y añade un test cruzado.', 'SECURITY DEFINER bypasses RLS: use auth.uid() inside, validate amounts, fix search_path and add a cross-user test.'),
    ],
    actionMission: {
      id: 'mission-code-7',
      title: bi('Audita el RLS de tu proyecto en 30 minutos', 'Audit your project RLS in 30 minutes'),
      objective: bi('Lista todas las tablas de tu proyecto Supabase, marca las que tienen RLS desactivado y las políticas que no usan auth.uid().', 'List all the tables in your Supabase project, mark the ones with RLS disabled and the policies that do not use auth.uid().'),
      steps: [
        bi('Consulta pg_tables y pg_policies y exporta el resultado a una hoja.', 'Query pg_tables and pg_policies and export the result to a sheet.'),
        bi('Marca en rojo cada tabla sin RLS y cada política sin auth.uid().', 'Mark in red every table without RLS and every policy without auth.uid().'),
        bi('Crea dos usuarios de prueba y comprueba que ninguno lee filas del otro.', 'Create two test users and check that neither reads the other rows.'),
      ],
      proof: bi('La hoja con el estado de cada tabla y el resultado del test cruzado entre los dos usuarios.', 'The sheet with the state of each table and the result of the cross test between the two users.'),
      affiliateToolSlug: 'supabase-cloud',
      xpBonus: 30,
    },
  },
];

export const CODE_UNIT_2: Unit = {
  slug: 'code-unit-2',
  trackSlug: 'modern-coding',
  orderIndex: 2,
  title: bi('App completa, de verdad', 'A complete app, for real'),
  description: bi(
    'Next.js App Router con la frontera bien puesta, SQL que responde preguntas de negocio y Supabase sin fugas de datos.',
    'Next.js App Router with the boundary in the right place, SQL that answers business questions and Supabase with no data leaks.'
  ),
  lessons: LESSONS,
};
