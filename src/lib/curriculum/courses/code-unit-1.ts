import { bi, opt } from '@/lib/curriculum/authoring';
import { Lesson, Unit } from '@/lib/curriculum/types';

/* ==========================================================================
   MODERN CODING · Unit 1 — Fundamentos
   ========================================================================== */

const LESSONS: Lesson[] = [
  /* ---------------------------------------------------------------- L1 -- */
  {
    slug: 'code-01-javascript-real',
    unitSlug: 'code-unit-1',
    trackSlug: 'modern-coding',
    orderIndex: 1,
    title: bi('JavaScript que se rompe solo (y cómo evitarlo)', 'JavaScript that breaks on its own (and how to stop it)'),
    outcome: bi(
      'Predecirás la salida de comparaciones sueltas, coerción, async/await y closures, que es donde falla el 80% del código junior.',
      'You will predict the output of loose comparisons, coercion, async/await and closures, which is where 80% of junior code fails.'
    ),
    durationMin: 15,
    xpReward: 150,
    theory: [
      {
        id: 'cd01-t1',
        heading: bi('== convierte tipos; === no', '== converts types; === does not'),
        body: bi(
          'La igualdad abstracta intenta convertir los operandos a un tipo común antes de comparar. "5" == 5 es true porque la cadena se convierte a número. null == undefined también es true por una regla especial. === compara tipo y valor sin conversión.',
          'Abstract equality tries to convert operands to a common type before comparing. "5" == 5 is true because the string converts to a number. null == undefined is also true by a special rule. === compares type and value with no conversion.'
        ),
        diagram: {
          kind: 'code',
          lang: 'javascript',
          lines: [
            { text: '"5" == 5           // true', tone: 'warn', label: bi('convierte', 'converts') },
            { text: '"5" === 5          // false', tone: 'good', label: bi('no convierte', 'no conversion') },
            { text: 'null == undefined  // true', tone: 'warn' },
            { text: 'null === undefined // false', tone: 'good' },
            { text: '0 == ""            // true', tone: 'bad', label: bi('peligro real', 'real danger') },
            { text: '[] == false        // true', tone: 'bad' },
          ],
        },
        why: bi('Las dos últimas líneas son las que producen bugs que tardas una tarde en encontrar.', 'The last two lines are the ones that produce bugs costing you an afternoon.'),
      },
      {
        id: 'cd01-t2',
        heading: bi('Verdaderamente falso: solo 8 valores', 'Actually falsy: only 8 values'),
        body: bi(
          'En JavaScript solo son falsy: false, 0, -0, 0n, "", null, undefined y NaN. Todo lo demás es truthy, incluidos "0" (cadena no vacía), [] y {} (objetos) y "false" (cadena con contenido).',
          'In JavaScript only these are falsy: false, 0, -0, 0n, "", null, undefined and NaN. Everything else is truthy, including "0" (a non-empty string), [] and {} (objects) and "false" (a string with content).'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('Falsy (8)', 'Falsy (8)'),
            tone: 'bad',
            items: [
              bi('false, 0, -0, 0n', 'false, 0, -0, 0n'),
              bi('"" (cadena vacía)', '"" (empty string)'),
              bi('null, undefined, NaN', 'null, undefined, NaN'),
            ],
          },
          right: {
            title: bi('Truthy (sorpresas)', 'Truthy (surprises)'),
            tone: 'good',
            items: [
              bi('"0" → cadena no vacía', '"0" → non-empty string'),
              bi('[] y {} → son objetos', '[] and {} → they are objects'),
              bi('"false" → cadena con contenido', '"false" → string with content'),
            ],
          },
        },
      },
      {
        id: 'cd01-t3',
        heading: bi('let y const respetan el bloque; var no', 'let and const respect the block; var does not'),
        body: bi(
          'var tiene ámbito de función y se eleva con valor undefined. let y const tienen ámbito de bloque y existen en una zona muerta temporal hasta su declaración. Dentro de un bucle, var comparte una sola variable entre todas las iteraciones.',
          'var is function-scoped and hoisted with value undefined. let and const are block-scoped and live in a temporal dead zone until declared. Inside a loop, var shares a single variable across all iterations.'
        ),
        diagram: {
          kind: 'code',
          lang: 'javascript',
          lines: [
            { text: 'for (var i = 0; i < 3; i++) {', tone: 'warn' },
            { text: '  setTimeout(() => console.log(i), 0)', tone: 'warn' },
            { text: '}', tone: 'warn' },
            { text: '// imprime: 3, 3, 3', tone: 'bad', label: bi('una sola i', 'one shared i') },
            { text: '', tone: 'mute' },
            { text: 'for (let i = 0; i < 3; i++) {', tone: 'good' },
            { text: '  setTimeout(() => console.log(i), 0)', tone: 'good' },
            { text: '}', tone: 'good' },
            { text: '// imprime: 0, 1, 2', tone: 'good', label: bi('una i por vuelta', 'one i per iteration') },
          ],
        },
      },
      {
        id: 'cd01-t4',
        heading: bi('async/await es azúcar sobre promesas, no magia', 'async/await is sugar over promises, not magic'),
        body: bi(
          'Una función async devuelve siempre una promesa. await detiene esa función, no el programa. Dos awaits seguidos en serie tardan la suma; con Promise.all tardan el máximo. Es la diferencia entre 2 s y 6 s en una página.',
          'An async function always returns a promise. await pauses that function, not the program. Two sequential awaits take the sum; with Promise.all they take the maximum. That is the difference between 2 s and 6 s on a page.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('En serie · 6 s', 'Sequential · 6 s'),
            tone: 'bad',
            items: [
              bi('const a = await fetch1()  // 3 s', 'const a = await fetch1()  // 3 s'),
              bi('const b = await fetch2()  // 3 s', 'const b = await fetch2()  // 3 s'),
              bi('Total: 3 + 3 = 6 s', 'Total: 3 + 3 = 6 s'),
            ],
          },
          right: {
            title: bi('En paralelo · 3 s', 'Parallel · 3 s'),
            tone: 'good',
            items: [
              bi('const [a, b] = await Promise.all([', 'const [a, b] = await Promise.all(['),
              bi('  fetch1(), fetch2()', '  fetch1(), fetch2()'),
              bi(']) // Total: max(3, 3) = 3 s', ']) // Total: max(3, 3) = 3 s'),
            ],
          },
        },
        why: bi('Serie solo cuando el segundo depende del resultado del primero.', 'Sequential only when the second depends on the first result.'),
      },
    ],
    examples: [
      {
        id: 'cd01-ex1',
        title: bi('Ejemplo resuelto: el bug del carrito que suma mal', 'Worked example: the cart bug that adds up wrong'),
        situation: bi(
          'Un carrito muestra 102 € cuando los artículos suman 12 €. El código recorre un array de cantidades que viene de un input de texto y las acumula.',
          'A cart shows €102 when the items add up to €12. The code loops over an array of quantities that come from a text input and accumulates them.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Leer el código y predecir antes de tocarlo', 'Step 1 · Read the code and predict before touching it'),
            detail: bi(
              'Los valores llegan como cadena desde el input. total empieza en 100. Con +, si un operando es string, JavaScript concatena en vez de sumar.',
              'The values arrive as strings from the input. total starts at 100. With +, if either operand is a string, JavaScript concatenates instead of adding.'
            ),
            diagram: {
              kind: 'code',
              lang: 'javascript',
              lines: [
                { text: 'let total = 100;', tone: 'good' },
                { text: 'const cantidades = ["2"];', tone: 'info', label: bi('viene del input', 'comes from input') },
                { text: 'for (const c of cantidades) {', tone: 'info' },
                { text: '  total = total + c;', tone: 'bad', label: bi('concatena', 'concatenates') },
                { text: '}', tone: 'info' },
                { text: 'console.log(total); // ?', tone: 'warn' },
              ],
            },
          },
          {
            label: bi('Paso 2 · Confirmar la causa con la regla de coerción', 'Step 2 · Confirm the cause with the coercion rule'),
            detail: bi(
              '100 + "2" no es 102: es "1002", porque el número se convierte a cadena. El operador + es el único de JavaScript con doble comportamiento según el tipo.',
              '100 + "2" is not 102: it is "1002", because the number converts to a string. The + operator is the only one in JavaScript with dual behaviour depending on type.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Expresión', 'Expression'), bi('Resultado', 'Result'), bi('Tipo', 'Type')],
              rows: [
                ['100 + 2', '102', 'number'],
                ['100 + "2"', '"1002"', 'string'],
                ['"100" + 2', '"1002"', 'string'],
                ['100 - "2"', '98', 'number'],
              ],
              highlightRow: 1,
              note: bi('− siempre convierte a número. + decide según los operandos.', '− always converts to number. + decides based on the operands.'),
            },
          },
          {
            label: bi('Paso 3 · Corregir en el borde, no en el cálculo', 'Step 3 · Fix at the boundary, not in the calculation'),
            detail: bi(
              'Se convierte a número donde entra el dato (el input), no dentro del bucle. Number(c) con validación de NaN. Así el resto del programa trabaja siempre con números.',
              'Convert to number where the data enters (the input), not inside the loop. Number(c) with a NaN check. The rest of the program then always works with numbers.'
            ),
            diagram: {
              kind: 'code',
              lang: 'javascript',
              lines: [
                { text: 'const cantidades = rawInputs', tone: 'good' },
                { text: '  .map((c) => Number(c))', tone: 'good', label: bi('convierte aquí', 'convert here') },
                { text: '  .filter((n) => Number.isFinite(n));', tone: 'good' },
                { text: '', tone: 'mute' },
                { text: 'let total = 100;', tone: 'good' },
                { text: 'for (const c of cantidades) total += c;', tone: 'good' },
                { text: '// 100 + 2 = 102 (number)', tone: 'good' },
              ],
            },
          },
          {
            label: bi('Paso 4 · Dejar el tipo imposible de repetir', 'Step 4 · Make the type impossible to repeat'),
            detail: bi(
              'Se añade un test que falla si cantidades contiene strings y se tipa la función como number[]. Con eso, el bug no vuelve aunque alguien cambie el input.',
              'Add a test that fails if cantidades contains strings and type the function as number[]. With that, the bug does not return even if someone changes the input.'
            ),
          },
        ],
        result: bi(
          'El carrito pasa de 102 € a 12 €. La lección no es "usa Number": es convertir los datos en la frontera del sistema para que el interior trabaje con un solo tipo.',
          'The cart goes from €102 to €12. The lesson is not "use Number": it is converting data at the system boundary so the inside works with a single type.'
        ),
        selfCheck: {
          prompt: bi('¿Por qué 100 - "2" da 98 pero 100 + "2" da "1002"?', 'Why does 100 - "2" give 98 but 100 + "2" give "1002"?'),
          options: [
            opt('a', 'Porque la resta está mal implementada en JavaScript', 'Because subtraction is badly implemented in JavaScript'),
            opt('b', 'Porque − solo tiene significado numérico y convierte siempre; + tiene dos significados y elige concatenar si hay un string', 'Because − only has numeric meaning and always converts; + has two meanings and picks concatenation if a string is present'),
            opt('c', 'Porque el orden de los operandos cambia el resultado', 'Because operand order changes the result'),
            opt('d', 'Porque los strings no se pueden restar', 'Because strings cannot be subtracted'),
          ],
          correctOptionId: 'b',
          explanation: bi('−, *, / y % siempre convierten a número. + es ambiguo: si cualquiera de los operandos es string, concatena. Por eso el bug aparece solo con +.', '−, *, / and % always convert to number. + is ambiguous: if either operand is a string, it concatenates. That is why the bug appears only with +.'),
        },
      },
    ],
    exercises: [
      {
        id: 'cd01-e01',
        format: 'output',
        difficulty: 1,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('¿Qué imprime este código?', 'What does this code print?'),
        context: { mono: true, content: 'console.log(typeof ("5" + 3));' },
        options: [
          opt('a', '"number"', '"number"'),
          opt('b', '"string"', '"string"'),
          opt('c', '8', '8'),
          opt('d', 'NaN', 'NaN'),
        ],
        correctOptionId: 'b',
        explanation: bi('"5" + 3 concatena y produce "53", que es un string. typeof devuelve "string". Si el orden fuera 3 + "5" el resultado es el mismo: basta un string.', '"5" + 3 concatenates into "53", which is a string. typeof returns "string". Even in the order 3 + "5" the result is the same: one string is enough.'),
        xp: 8,
      },
      {
        id: 'cd01-e02',
        format: 'output',
        difficulty: 1,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('¿Qué imprime?', 'What does it print?'),
        context: { mono: true, content: 'console.log(0 == "", [] == false, null == undefined);' },
        options: [
          opt('a', 'true true true', 'true true true'),
          opt('b', 'false false true', 'false false true'),
          opt('c', 'true false false', 'true false false'),
          opt('d', 'false true true', 'false true true'),
        ],
        correctOptionId: 'a',
        explanation: bi('Las tres son true con ==. 0 == "" porque "" se convierte a 0. [] == false porque ambos se convierten a 0 y "". null == undefined por regla especial. Con === las tres serían false.', 'All three are true with ==. 0 == "" because "" converts to 0. [] == false because both convert through 0 and "". null == undefined by special rule. With === all three would be false.'),
        xp: 8,
      },
      {
        id: 'cd01-e03',
        format: 'concept',
        difficulty: 2,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Cuál de estos valores es truthy en JavaScript?', 'Which of these values is truthy in JavaScript?'),
        options: [
          opt('a', '0', '0'),
          opt('b', '"" (cadena vacía)', '"" (empty string)'),
          opt('c', '"0" (cadena con un cero)', '"0" (a string with a zero)'),
          opt('d', 'NaN', 'NaN'),
        ],
        correctOptionId: 'c',
        explanation: bi('"0" es una cadena no vacía, así que es truthy. Es la trampa clásica al comprobar un valor que viene de un input o de una URL.', '"0" is a non-empty string, so it is truthy. It is the classic trap when checking a value that comes from an input or a URL.'),
        xp: 10,
      },
      {
        id: 'cd01-e04',
        format: 'output',
        difficulty: 2,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('¿Qué imprime este bucle?', 'What does this loop print?'),
        context: {
          mono: true,
          content: 'for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}',
        },
        options: [
          opt('a', '0 1 2', '0 1 2'),
          opt('b', '3 3 3', '3 3 3'),
          opt('c', '0 0 0', '0 0 0'),
          opt('d', 'undefined undefined undefined', 'undefined undefined undefined'),
        ],
        correctOptionId: 'b',
        explanation: bi('var crea una sola i para todo el bucle. Los callbacks se ejecutan después, cuando i ya vale 3. Con let, cada iteración tiene su propia i e imprime 0 1 2.', 'var creates a single i for the whole loop. The callbacks run afterwards, when i is already 3. With let, each iteration has its own i and prints 0 1 2.'),
        xp: 10,
      },
      {
        id: 'cd01-e05',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada método de array con lo que devuelve.', 'Match each array method with what it returns.'),
        pairs: [
          { leftId: 'l1', left: bi('map()', 'map()'), rightId: 'r1', right: bi('Un array nuevo del mismo tamaño', 'A new array of the same size') },
          { leftId: 'l2', left: bi('filter()', 'filter()'), rightId: 'r2', right: bi('Un array nuevo, posiblemente menor', 'A new array, possibly smaller') },
          { leftId: 'l3', left: bi('forEach()', 'forEach()'), rightId: 'r3', right: bi('undefined (solo ejecuta el callback)', 'undefined (it only runs the callback)') },
          { leftId: 'l4', left: bi('find()', 'find()'), rightId: 'r4', right: bi('El primer elemento que cumple, o undefined', 'The first matching element, or undefined') },
        ],
        explanation: bi('Usar forEach esperando un array devuelto es un bug frecuente: devuelve undefined siempre. Si transformas, map; si filtras, filter.', 'Using forEach expecting a returned array is a common bug: it always returns undefined. To transform, map; to filter, filter.'),
        xp: 12,
      },
      {
        id: 'cd01-e06',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('Esta función devuelve siempre 0. ¿Qué línea está mal?', 'This function always returns 0. Which line is wrong?'),
        lines: [
          { id: 'c1', text: 'function sumar(precios) {', tone: 'good' },
          { id: 'c2', text: '  let total = 0;', tone: 'good' },
          { id: 'c3', text: '  precios.forEach((p) => { total = total + p; });', tone: 'warn' },
          { id: 'c4', text: '  return total;', tone: 'good' },
        ],
        correctLineId: 'c3',
        explanation: bi(
          'El código en sí funciona si precios son números. Falla cuando precios viene de inputs como ["12","9"]: 0 + "12" = "012" y el retorno deja de ser número. La línea 3 es donde se necesita Number(p).',
          'The code works if precios are numbers. It fails when precios comes from inputs as ["12","9"]: 0 + "12" = "012" and the return stops being a number. Line 3 is where Number(p) is needed.'
        ),
        xp: 12,
      },
      {
        id: 'cd01-e07',
        format: 'output',
        difficulty: 3,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('¿Qué devuelve esta función?', 'What does this function return?'),
        context: {
          mono: true,
          content: 'async function f() { return 1; }\nconsole.log(f());',
        },
        options: [
          opt('a', '1', '1'),
          opt('b', 'Promise { 1 }', 'Promise { 1 }'),
          opt('c', 'undefined', 'undefined'),
          opt('d', 'Lanza un error porque falta await', 'Throws an error because await is missing'),
        ],
        correctOptionId: 'b',
        explanation: bi('Toda función async devuelve una promesa, aunque retorne un valor simple. Para obtener el 1 necesitas await f() dentro de otra función async.', 'Every async function returns a promise, even when it returns a simple value. To get the 1 you need await f() inside another async function.'),
        xp: 12,
      },
      {
        id: 'cd01-e08',
        format: 'output',
        difficulty: 3,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('¿En qué orden se imprimen estas tres líneas?', 'In what order do these three lines print?'),
        context: {
          mono: true,
          content: 'console.log("A");\nsetTimeout(() => console.log("B"), 0);\nPromise.resolve().then(() => console.log("C"));',
        },
        options: [
          opt('a', 'A B C', 'A B C'),
          opt('b', 'A C B', 'A C B'),
          opt('c', 'C A B', 'C A B'),
          opt('d', 'A C B solo si el setTimeout es 1 ms', 'A C B only if the setTimeout is 1 ms'),
        ],
        correctOptionId: 'b',
        explanation: bi('El código síncrono va primero (A). Luego la cola de microtareas: las promesas (C). Al final la cola de macrotareas: setTimeout (B), aunque sea 0 ms.', 'Synchronous code goes first (A). Then the microtask queue: promises (C). Finally the macrotask queue: setTimeout (B), even at 0 ms.'),
        xp: 12,
      },
      {
        id: 'cd01-e09',
        format: 'worked_why',
        difficulty: 3,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('En el ejemplo del carrito, ¿por qué se corrigió en el input y no dentro del bucle?', 'In the cart example, why was it fixed at the input and not inside the loop?'),
        options: [
          opt('a', 'Porque dentro del bucle no se puede llamar a Number()', 'Because Number() cannot be called inside the loop'),
          opt('b', 'Porque convertir en la frontera garantiza que todo el programa trabaja con un solo tipo y el bug no reaparece en otro sitio', 'Because converting at the boundary guarantees the whole program works with a single type and the bug cannot reappear elsewhere'),
          opt('c', 'Porque es más rápido', 'Because it is faster'),
          opt('d', 'Porque el bucle no se ejecuta siempre', 'Because the loop does not always run'),
        ],
        correctOptionId: 'b',
        explanation: bi('Corregir en el uso tapa un síntoma: la misma cadena llegará a otra función y volverá a fallar. Corregir en la entrada elimina la clase entera de bug.', 'Fixing at the use site covers a symptom: the same string will reach another function and fail again. Fixing at the entry removes the whole bug class.'),
        xp: 12,
      },
      {
        id: 'cd01-e10',
        format: 'numeric',
        difficulty: 4,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Una página hace 4 peticiones de 300 ms cada una. Hoy van en serie con await. ¿Cuántos milisegundos ahorras al pasarlas a Promise.all?',
          'A page makes 4 requests of 300 ms each. Today they run sequentially with await. How many milliseconds do you save by moving them to Promise.all?'
        ),
        answer: 900,
        tolerance: 0,
        unit: 'ms',
        formula: bi('serie: 4 × 300 = 1 200 · paralelo: 300', 'sequential: 4 × 300 = 1,200 · parallel: 300'),
        explanation: bi('En serie suman 1 200 ms. En paralelo el total es el máximo, 300 ms. Ahorro: 900 ms, un 75% del tiempo de espera.', 'Sequentially they add to 1,200 ms. In parallel the total is the maximum, 300 ms. Saving: 900 ms, 75% of the wait.'),
        xp: 15,
      },
      {
        id: 'cd01-e11',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos pares de peticiones. (A) obtener el id de usuario y luego, con ese id, sus pedidos. (B) obtener el perfil y los ajustes, independientes entre sí. ¿Cuál va en Promise.all?',
          'Two pairs of requests. (A) get the user id and then, with that id, their orders. (B) get the profile and the settings, independent of each other. Which one goes in Promise.all?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Par', 'Pair'), bi('¿B depende de A?', 'Does B depend on A?'), bi('Estrategia', 'Strategy')],
          rows: [
            ['A · id → pedidos', 'sí', 'en serie'],
            ['B · perfil + ajustes', 'no', 'en paralelo'],
          ],
          highlightRow: 1,
        },
        options: [
          opt('a', 'Los dos en Promise.all', 'Both in Promise.all'),
          opt('b', 'Solo B; A necesita el id antes de poder pedir los pedidos', 'Only B; A needs the id before it can request the orders'),
          opt('c', 'Solo A', 'Only A'),
          opt('d', 'Ninguno, siempre en serie para evitar condiciones de carrera', 'Neither, always sequential to avoid race conditions'),
        ],
        correctOptionId: 'b',
        explanation: bi('El criterio es la dependencia de datos, no el número de peticiones. Paralelizar A es imposible: no sabes qué pedir hasta tener el id.', 'The criterion is data dependency, not the number of requests. Parallelising A is impossible: you do not know what to request until you have the id.'),
        xp: 15,
      },
      {
        id: 'cd01-e12',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Qué es la zona muerta temporal (TDZ) de let y const?', 'What is the temporal dead zone (TDZ) of let and const?'),
        options: [
          opt('a', 'El momento en que la variable se elimina de memoria', 'The moment the variable is removed from memory'),
          opt('b', 'El tramo entre el inicio del bloque y la declaración, donde acceder a la variable lanza ReferenceError', 'The stretch between the start of the block and the declaration, where accessing the variable throws ReferenceError'),
          opt('c', 'El tiempo que tarda en ejecutarse un bucle', 'The time a loop takes to run'),
          opt('d', 'La diferencia entre var y function', 'The difference between var and function'),
        ],
        correctOptionId: 'b',
        explanation: bi('let y const se elevan pero no se inicializan. var sí se inicializa a undefined, que es peor: no avisa, solo da undefined en silencio.', 'let and const are hoisted but not initialised. var is initialised to undefined, which is worse: it does not warn, it silently gives undefined.'),
        xp: 20,
      },
      {
        id: 'cd01-e13',
        format: 'faded',
        difficulty: 2,
        badge: bi('COMPLETAR', 'COMPLETE'),
        prompt: bi('Completa la función que suma precios llegados desde inputs de texto. Las dos primeras líneas ya están.', 'Complete the function that adds prices arriving from text inputs. The first two lines are done.'),
        pieces: [
          { id: 'p1', text: bi('Convertir cada valor con Number()', 'Convert each value with Number()') },
          { id: 'p2', text: bi('Descartar los que no son finito con Number.isFinite()', 'Discard the non-finite ones with Number.isFinite()') },
          { id: 'p3', text: bi('Acumular con reduce((a, b) => a + b, 0)', 'Accumulate with reduce((a, b) => a + b, 0)') },
          { id: 'p4', text: bi('Redondear a 2 decimales con Math.round(x * 100) / 100', 'Round to 2 decimals with Math.round(x * 100) / 100') },
          { id: 'p5', text: bi('Devolver el número', 'Return the number') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        lockedPieceIds: ['p1', 'p2'],
        explanation: bi('El paso 2 es el que casi todo el mundo olvida: Number("abc") es NaN y NaN envenena toda la suma (NaN + 5 = NaN).', 'Step 2 is the one almost everybody forgets: Number("abc") is NaN and NaN poisons the whole sum (NaN + 5 = NaN).'),
        xp: 10,
      },
      {
        id: 'cd01-e14',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'Revisas un PR de un compañero. Usa == en 14 sitios y var en 3. Funciona en los tests. ¿Qué pides?',
          'You review a teammate PR. It uses == in 14 places and var in 3. Tests pass. What do you ask for?'
        ),
        options: [
          opt('a', 'Aprobarlo, los tests pasan', 'Approve it, tests pass'),
          opt('b', 'Pedir === y let/const, y activar las reglas de ESLint eqeqeq y no-var para que no vuelva a pasar', 'Ask for === and let/const, and enable the ESLint eqeqeq and no-var rules so it does not happen again'),
          opt('c', 'Reescribirlo tú entero', 'Rewrite the whole thing yourself'),
          opt('d', 'Pedir más tests', 'Ask for more tests'),
        ],
        correctOptionId: 'b',
        explanation: bi('Los tests cubren los casos que pensaste, no la coerción rara del caso límite. La regla de lint convierte una corrección puntual en una garantía permanente.', 'Tests cover the cases you thought of, not the odd coercion of the edge case. The lint rule turns a one-off correction into a permanent guarantee.'),
        xp: 15,
      },
    ],
    recap: [
      bi('=== siempre. == convierte tipos y produce true en casos que nadie espera (0 == "", [] == false).', 'Always ===. == converts types and produces true in cases nobody expects (0 == "", [] == false).'),
      bi('Solo 8 valores son falsy. "0", [] y {} son truthy.', 'Only 8 values are falsy. "0", [] and {} are truthy.'),
      bi('Convierte los tipos en la frontera del sistema y usa Promise.all solo cuando no hay dependencia de datos.', 'Convert types at the system boundary and use Promise.all only when there is no data dependency.'),
    ],
    actionMission: {
      id: 'mission-code-1',
      title: bi('Activa las dos reglas de lint que matan esta clase de bug', 'Enable the two lint rules that kill this bug class'),
      objective: bi('Configura ESLint con eqeqeq, no-var y prefer-const en un proyecto tuyo y corrige lo que aparezca.', 'Configure ESLint with eqeqeq, no-var and prefer-const on one of your projects and fix whatever appears.'),
      steps: [
        bi('Añade las tres reglas al .eslintrc y ejecuta el linter sobre todo el proyecto.', 'Add the three rules to .eslintrc and run the linter over the whole project.'),
        bi('Cuenta cuántos == y var aparecen: ese es el tamaño real del riesgo.', 'Count how many == and var appear: that is the real size of the risk.'),
        bi('Corrige los avisos y añade el lint al comando de build para que no vuelvan.', 'Fix the warnings and add lint to the build command so they do not come back.'),
      ],
      proof: bi('Captura del linter en verde con las tres reglas activas y el número de avisos corregidos.', 'A screenshot of the linter in green with the three rules active and the number of warnings fixed.'),
      affiliateToolSlug: 'cursor-ide',
      xpBonus: 25,
    },
  },

  /* ---------------------------------------------------------------- L2 -- */
  {
    slug: 'code-02-typescript-utiles',
    unitSlug: 'code-unit-1',
    trackSlug: 'modern-coding',
    orderIndex: 2,
    title: bi('TypeScript útil, no ceremonioso', 'Useful TypeScript, not ceremonial'),
    outcome: bi(
      'Tiparás props, uniones y genéricos básicos, y leerás un error de tipos en vez de probar cosas al azar.',
      'You will type props, unions and basic generics, and read a type error instead of trying things at random.'
    ),
    durationMin: 14,
    xpReward: 140,
    theory: [
      {
        id: 'cd02-t1',
        heading: bi('TypeScript no comprueba nada en tiempo de ejecución', 'TypeScript checks nothing at run time'),
        body: bi(
          'Se compila a JavaScript y desaparece. Un any que viene de una API sin validar entrará en tu programa con la forma que tenga. Los tipos describen tu intención; la validación en la frontera es lo que la cumple.',
          'It compiles to JavaScript and disappears. An any coming from an unvalidated API will enter your program with whatever shape it has. Types describe your intention; validation at the boundary is what enforces it.'
        ),
        diagram: {
          kind: 'flow',
          nodes: [
            { id: 'a', label: bi('Datos externos', 'External data'), note: bi('API, input, URL', 'API, input, URL'), tone: 'warn' },
            { id: 'b', label: bi('Validar (runtime)', 'Validate (runtime)'), tone: 'info' },
            { id: 'c', label: bi('Tipos (compile)', 'Types (compile)'), tone: 'info' },
            { id: 'd', label: bi('Código seguro', 'Safe code'), tone: 'good' },
          ],
          branch: { label: bi('Sin validar: el tipo miente y el fallo aparece lejos del origen', 'Without validation: the type lies and the failure shows up far from the source'), tone: 'bad' },
        },
      },
      {
        id: 'cd02-t2',
        heading: bi('Uniones y literales: el tipo como documentación', 'Unions and literals: the type as documentation'),
        body: bi(
          'status: string acepta cualquier cosa. status: "pendiente" | "pagado" | "cancelado" acepta tres valores y el editor te los lista. Además, un switch sobre esa unión se puede comprobar exhaustivamente.',
          'status: string accepts anything. status: "pending" | "paid" | "cancelled" accepts three values and the editor lists them. Also, a switch over that union can be exhaustively checked.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('Tipos anchos', 'Loose types'),
            tone: 'bad',
            items: [
              bi('status: string', 'status: string'),
              bi('role: string', 'role: string'),
              bi('Un typo "pagdo" compila', 'A typo "paied" compiles'),
            ],
          },
          right: {
            title: bi('Tipos estrechos', 'Narrow types'),
            tone: 'good',
            items: [
              bi('status: "pendiente" | "pagado" | "cancelado"', 'status: "pending" | "paid" | "cancelled"'),
              bi('role: "admin" | "editor" | "lector"', 'role: "admin" | "editor" | "reader"'),
              bi('El typo no compila y el editor autocompleta', 'The typo does not compile and the editor autocompletes'),
            ],
          },
        },
      },
      {
        id: 'cd02-t3',
        heading: bi('any apaga el comprobador; unknown obliga a mirar', 'any switches the checker off; unknown forces you to look'),
        body: bi(
          'any permite cualquier operación sin comprobar nada y se propaga a todo lo que toca. unknown también acepta cualquier valor, pero no puedes usarlo hasta narrowing (typeof, in, o una guarda propia).',
          'any allows any operation without checking anything and spreads to everything it touches. unknown also accepts any value, but you cannot use it until narrowing (typeof, in, or your own guard).'
        ),
        diagram: {
          kind: 'code',
          lang: 'typescript',
          lines: [
            { text: 'function f(a: any) { return a.precio.toFixed(2); }', tone: 'bad', label: bi('explota en runtime', 'blows up at runtime') },
            { text: 'function g(a: unknown) { return a.precio; }', tone: 'warn', label: bi('no compila', 'does not compile') },
            { text: 'function h(a: unknown) {', tone: 'good' },
            { text: '  if (typeof a === "object" && a !== null', tone: 'good' },
            { text: '      && "precio" in a) return (a as {precio:number}).precio;', tone: 'good' },
            { text: '  return 0;', tone: 'good' },
            { text: '}', tone: 'good' },
          ],
        },
      },
      {
        id: 'cd02-t4',
        heading: bi('Leer un error de tipos es una habilidad, no un don', 'Reading a type error is a skill, not a gift'),
        body: bi(
          'Los errores largos se leen de abajo arriba y por la primera línea: ahí está el tipo esperado y el encontrado. La frase clave es "Type X is not assignable to type Y". Todo lo demás es la ruta de cómo llegó ahí.',
          'Long errors are read bottom-up and by the first line: that is where the expected and found types are. The key sentence is "Type X is not assignable to type Y". Everything else is the path of how it got there.'
        ),
        diagram: {
          kind: 'layers',
          layers: [
            { label: bi('1 · Primera línea', '1 · First line'), note: bi('"Type string is not assignable to type number"', '"Type string is not assignable to type number"'), tone: 'bad' },
            { label: bi('2 · Qué propiedad falla', '2 · Which property fails'), note: bi('Types of property "precio" are incompatible', 'Types of property "precio" are incompatible'), tone: 'warn' },
            { label: bi('3 · Dónde se originó', '3 · Where it originated'), note: bi('Argument of type X is not assignable to parameter of type Y', 'Argument of type X is not assignable to parameter of type Y'), tone: 'info' },
            { label: bi('4 · Arreglar el origen, no el síntoma', '4 · Fix the origin, not the symptom'), tone: 'good' },
          ],
        },
        why: bi('Poner as any en la línea 3 tapa el error pero deja el bug en producción.', 'Putting as any on line 3 hides the error but leaves the bug in production.'),
      },
    ],
    examples: [
      {
        id: 'cd02-ex1',
        title: bi('Ejemplo resuelto: tipar un componente de tarjeta de producto', 'Worked example: typing a product card component'),
        situation: bi(
          'Un componente ProductCard recibe datos de una API. Hoy usa any en las props y en producción aparece "undefined €" y un botón de comprar activo en productos agotados.',
          'A ProductCard component receives data from an API. Today it uses any in the props and in production "undefined €" appears along with an active buy button on sold-out products.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Escribir el tipo a partir del dato real', 'Step 1 · Write the type from the real datum'),
            detail: bi(
              'Se copia una respuesta real de la API y se traduce a tipo. No se inventa: se describe lo que llega. Los campos que a veces faltan se marcan opcionales con precisión.',
              'Copy a real API response and translate it to a type. Do not invent it: describe what arrives. Fields that are sometimes missing get marked optional precisely.'
            ),
            diagram: {
              kind: 'code',
              lang: 'typescript',
              lines: [
                { text: 'type Product = {', tone: 'good' },
                { text: '  id: string;', tone: 'good' },
                { text: '  nombre: string;', tone: 'good' },
                { text: '  precioCents: number;', tone: 'good', label: bi('enteros, no float', 'integers, not float') },
                { text: '  moneda: "EUR" | "USD";', tone: 'good' },
                { text: '  stock: number;', tone: 'good' },
                { text: '  descuentoPct?: number;', tone: 'warn', label: bi('opcional real', 'truly optional') },
                { text: '};', tone: 'good' },
              ],
            },
          },
          {
            label: bi('Paso 2 · Dinero en enteros, nunca en float', 'Step 2 · Money in integers, never in float'),
            detail: bi(
              '0.1 + 0.2 === 0.3 es false en punto flotante (0.30000000000000004). Guardar céntimos como entero y dividir al mostrar elimina la clase entera de errores de redondeo.',
              '0.1 + 0.2 === 0.3 is false in floating point (0.30000000000000004). Storing cents as an integer and dividing when displaying removes the entire class of rounding errors.'
            ),
            diagram: {
              kind: 'equation',
              tokens: [
                { text: '1999', tone: 'good', label: bi('céntimos', 'cents') },
                { text: '/' },
                { text: '100', tone: 'info' },
              ],
              result: { text: '19,99 €', tone: 'good' },
            },
          },
          {
            label: bi('Paso 3 · Hacer imposible el estado inválido', 'Step 3 · Make the invalid state impossible'),
            detail: bi(
              'El botón se deriva del tipo: si stock es 0, el componente no recibe onComprar. TypeScript obliga al padre a decidir, en vez de dejar que el hijo compruebe en runtime.',
              'The button derives from the type: if stock is 0, the component does not receive onBuy. TypeScript forces the parent to decide, instead of letting the child check at run time.'
            ),
            diagram: {
              kind: 'code',
              lang: 'typescript',
              lines: [
                { text: 'type Props =', tone: 'good' },
                { text: '  | { product: Product & { stock: 0 } }            // sin boton', tone: 'warn', label: bi('agotado', 'sold out') },
                { text: '  | { product: Product; onBuy: (id: string) => void }; // con boton', tone: 'good', label: bi('disponible', 'available') },
              ],
            },
          },
          {
            label: bi('Paso 4 · Validar en la frontera con un parser', 'Step 4 · Validate at the boundary with a parser'),
            detail: bi(
              'La respuesta de la API se pasa por un esquema (Zod o similar) que devuelve Product o lanza. A partir de ahí el resto del código confía en el tipo porque alguien lo comprobó.',
              'The API response goes through a schema (Zod or similar) that returns Product or throws. From there the rest of the code trusts the type because somebody checked it.'
            ),
            diagram: {
              kind: 'flow',
              nodes: [
                { id: 'a', label: bi('fetch()', 'fetch()'), tone: 'warn' },
                { id: 'b', label: bi('res.json() → unknown', 'res.json() → unknown'), tone: 'warn' },
                { id: 'c', label: bi('ProductSchema.parse()', 'ProductSchema.parse()'), tone: 'info' },
                { id: 'd', label: bi('Product', 'Product'), tone: 'good' },
              ],
              branch: { label: bi('Falla el parse → error visible en el punto exacto de entrada', 'Parse fails → a visible error at the exact entry point'), tone: 'bad' },
            },
          },
        ],
        result: bi(
          'Desaparecen los "undefined €" (precioCents es number obligatorio) y el botón en agotados (la unión lo hace imposible de compilar). Cero comprobaciones defensivas en el render.',
          'The "undefined €" disappears (precioCents is a required number) and so does the button on sold-out items (the union makes it impossible to compile). Zero defensive checks in the render.'
        ),
        selfCheck: {
          prompt: bi('¿Por qué se guardó el precio en céntimos enteros?', 'Why was the price stored in integer cents?'),
          options: [
            opt('a', 'Porque ocupa menos memoria', 'Because it uses less memory'),
            opt('b', 'Porque la aritmética de punto flotante no representa exactamente decimales como 0,1 y produce errores acumulados', 'Because floating-point arithmetic does not exactly represent decimals like 0.1 and produces accumulated errors'),
            opt('c', 'Porque las APIs lo exigen', 'Because APIs require it'),
            opt('d', 'Porque TypeScript no permite float', 'Because TypeScript does not allow float'),
          ],
          correctOptionId: 'b',
          explanation: bi('0.1 + 0.2 !== 0.3 en binario flotante. Sumando 500 precios en float el total se desvía unos céntimos. En enteros, la suma es exacta siempre.', '0.1 + 0.2 !== 0.3 in binary floating point. Adding 500 prices in float makes the total drift by a few cents. In integers, the sum is always exact.'),
        },
      },
    ],
    exercises: [
      {
        id: 'cd02-e01',
        format: 'concept',
        difficulty: 1,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Qué hace TypeScript cuando ejecutas el programa en el navegador?', 'What does TypeScript do when you run the program in the browser?'),
        options: [
          opt('a', 'Comprueba los tipos en cada llamada', 'It checks types on every call'),
          opt('b', 'Nada: se compiló a JavaScript y los tipos ya no existen', 'Nothing: it compiled to JavaScript and the types no longer exist'),
          opt('c', 'Lanza un error si un dato no coincide', 'It throws an error if a datum does not match'),
          opt('d', 'Convierte los datos automáticamente', 'It converts data automatically'),
        ],
        correctOptionId: 'b',
        explanation: bi('Los tipos son solo de compilación. Por eso necesitas validación en runtime para los datos que vienen de fuera.', 'Types are compile-time only. That is why you need runtime validation for data coming from outside.'),
        xp: 8,
      },
      {
        id: 'cd02-e02',
        format: 'output',
        difficulty: 1,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('¿Compila este código?', 'Does this code compile?'),
        context: {
          mono: true,
          content: 'type Estado = "pendiente" | "pagado";\nconst e: Estado = "pagdo";',
        },
        options: [
          opt('a', 'Sí, porque es un string', 'Yes, because it is a string'),
          opt('b', 'No: "pagdo" no pertenece a la unión de literales', 'No: "pagdo" does not belong to the literal union'),
          opt('c', 'Sí, pero con un warning', 'Yes, but with a warning'),
          opt('d', 'No, porque falta el punto y coma', 'No, because the semicolon is missing'),
        ],
        correctOptionId: 'b',
        explanation: bi('Ese es exactamente el valor de la unión de literales: el typo se detecta al escribir, no cuando el usuario ve un estado raro.', 'That is exactly the value of a literal union: the typo is caught while typing, not when the user sees a strange state.'),
        xp: 8,
      },
      {
        id: 'cd02-e03',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada tipo con su comportamiento real.', 'Match each type with its real behaviour.'),
        pairs: [
          { leftId: 'l1', left: bi('any', 'any'), rightId: 'r1', right: bi('Apaga la comprobación y se propaga', 'Switches checking off and spreads') },
          { leftId: 'l2', left: bi('unknown', 'unknown'), rightId: 'r2', right: bi('Acepta todo pero exige narrowing antes de usarse', 'Accepts anything but requires narrowing before use') },
          { leftId: 'l3', left: bi('never', 'never'), rightId: 'r3', right: bi('Ningún valor posible: ramas imposibles y funciones que lanzan', 'No possible value: impossible branches and throwing functions') },
          { leftId: 'l4', left: bi('void', 'void'), rightId: 'r4', right: bi('La función no devuelve nada útil', 'The function returns nothing useful') },
        ],
        explanation: bi('Sustituir any por unknown es la mejora de un minuto que más bugs evita: te obliga a comprobar antes de usar.', 'Replacing any with unknown is the one-minute change that prevents the most bugs: it forces you to check before using.'),
        xp: 12,
      },
      {
        id: 'cd02-e04',
        format: 'faded',
        difficulty: 3,
        badge: bi('COMPLETAR', 'COMPLETE'),
        prompt: bi('Completa el tipo de un pedido de e-commerce. Los dos primeros campos ya están escritos.', 'Complete the type for an e-commerce order. The first two fields are already written.'),
        pieces: [
          { id: 'p1', text: bi('id: string', 'id: string') },
          { id: 'p2', text: bi('clienteEmail: string', 'clienteEmail: string') },
          { id: 'p3', text: bi('totalCents: number  (entero, nunca float)', 'totalCents: number  (integer, never float)') },
          { id: 'p4', text: bi('estado: "borrador" | "pagado" | "enviado" | "devuelto"', 'status: "draft" | "paid" | "shipped" | "returned"') },
          { id: 'p5', text: bi('fechaEnvio?: string  (solo existe si está enviado)', 'shippedAt?: string  (exists only when shipped)') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        lockedPieceIds: ['p1', 'p2'],
        explanation: bi('El campo opcional del final es deliberado: si el estado es "borrador", fechaEnvio no debe existir. Un tipo bien escrito documenta las reglas del negocio.', 'The optional field at the end is deliberate: if status is "draft", shippedAt must not exist. A well-written type documents the business rules.'),
        xp: 12,
      },
      {
        id: 'cd02-e05',
        format: 'worked_why',
        difficulty: 2,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('En el ejemplo se hizo que el componente agotado NO reciba onComprar. ¿Qué consigue eso?', 'In the example the sold-out component does NOT receive onBuy. What does that achieve?'),
        options: [
          opt('a', 'Que el componente pese menos', 'That the component weighs less'),
          opt('b', 'Que sea imposible compilar un botón de compra en un producto sin stock', 'That it is impossible to compile a buy button on a product with no stock'),
          opt('c', 'Que la API devuelva menos datos', 'That the API returns less data'),
          opt('d', 'Que el render sea más rápido', 'That rendering is faster'),
        ],
        correctOptionId: 'b',
        explanation: bi('Es el principio de hacer imposible el estado inválido: en vez de comprobar en runtime, el tipo impide escribir el código incorrecto.', 'It is the principle of making invalid states impossible: instead of checking at run time, the type prevents writing the wrong code.'),
        xp: 10,
      },
      {
        id: 'cd02-e06',
        format: 'output',
        difficulty: 3,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('¿Qué vale esta expresión en JavaScript?', 'What is this expression worth in JavaScript?'),
        context: { mono: true, content: '0.1 + 0.2 === 0.3' },
        options: [
          opt('a', 'true', 'true'),
          opt('b', 'false, porque el resultado es 0.30000000000000004', 'false, because the result is 0.30000000000000004'),
          opt('c', 'Lanza un error de precisión', 'Throws a precision error'),
          opt('d', 'Depende del navegador', 'Depends on the browser'),
        ],
        correctOptionId: 'b',
        explanation: bi('Es aritmética IEEE 754 de doble precisión, igual en todos los navegadores. Por eso el dinero se guarda en enteros (céntimos) y se divide al mostrar.', 'It is IEEE 754 double-precision arithmetic, the same in every browser. That is why money is stored in integers (cents) and divided when displayed.'),
        xp: 12,
      },
      {
        id: 'cd02-e07',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('Este código compila pero falla en producción cuando la API devuelve un campo nuevo. ¿Qué línea es el problema?', 'This code compiles but fails in production when the API returns a new field. Which line is the problem?'),
        lines: [
          { id: 'c1', text: 'const res = await fetch(url);', tone: 'good' },
          { id: 'c2', text: 'const data: Product = await res.json();', tone: 'bad', label: bi('sospechoso', 'suspect') },
          { id: 'c3', text: 'return <ProductCard product={data} />;', tone: 'good' },
          { id: 'c4', text: 'type Product = { id: string; precioCents: number };', tone: 'good' },
        ],
        correctLineId: 'c2',
        explanation: bi(
          'Anotar el resultado de res.json() no lo valida: res.json() devuelve any y la anotación es una promesa, no una comprobación. Falta el parse con un esquema en runtime.',
          'Annotating the result of res.json() does not validate it: res.json() returns any and the annotation is a promise, not a check. A runtime schema parse is missing.'
        ),
        xp: 12,
      },
      {
        id: 'cd02-e08',
        format: 'output',
        difficulty: 3,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('¿Qué pasa al compilar esto?', 'What happens when this compiles?'),
        context: {
          mono: true,
          content: 'function f(a: unknown) {\n  return a.nombre.toUpperCase();\n}',
        },
        options: [
          opt('a', 'Compila y devuelve el nombre en mayúsculas', 'Compiles and returns the name in uppercase'),
          opt('b', 'Error de tipos: no se puede operar sobre unknown sin narrowing', 'Type error: you cannot operate on unknown without narrowing'),
          opt('c', 'Compila pero devuelve undefined', 'Compiles but returns undefined'),
          opt('d', 'Error solo en modo estricto', 'Error only in strict mode'),
        ],
        correctOptionId: 'b',
        explanation: bi('Ese error es una ventaja: te obliga a comprobar typeof/in antes de usar el dato. Con any habría compilado y fallado en el usuario.', 'That error is an advantage: it forces you to check typeof/in before using the datum. With any it would have compiled and failed on the user.'),
        xp: 12,
      },
      {
        id: 'cd02-e09',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Un pedido tiene líneas de 19,99 € × 3 y 5,50 € × 2. Trabajando en céntimos enteros, ¿cuál es el total en céntimos?',
          'An order has lines of €19.99 × 3 and €5.50 × 2. Working in integer cents, what is the total in cents?'
        ),
        answer: 7097,
        tolerance: 0,
        unit: 'cents',
        formula: bi('1999 × 3 + 550 × 2', '1999 × 3 + 550 × 2'),
        explanation: bi('1999 × 3 = 5 997 y 550 × 2 = 1 100. Total 7 097 céntimos = 70,97 €. En float, 19.99*3 + 5.5*2 da 70.97000000000001.', '1999 × 3 = 5,997 and 550 × 2 = 1,100. Total 7,097 cents = €70.97. In float, 19.99*3 + 5.5*2 gives 70.97000000000001.'),
        xp: 12,
      },
      {
        id: 'cd02-e10',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos fuentes de datos. (A) La respuesta de tu propia API interna tipada. (B) El contenido de un archivo CSV que sube el usuario. ¿Dónde basta con tipos y dónde hace falta validación runtime?',
          'Two data sources. (A) The response of your own typed internal API. (B) The content of a CSV file the user uploads. Where are types enough and where is runtime validation needed?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Fuente', 'Source'), bi('Controlas la forma', 'You control the shape'), bi('Puede cambiar sin avisar', 'Can change without notice')],
          rows: [
            ['A · API interna', 'sí', 'no'],
            ['B · CSV del usuario', 'no', 'siempre'],
          ],
          highlightRow: 1,
        },
        options: [
          opt('a', 'Validación runtime en las dos', 'Runtime validation in both'),
          opt('b', 'En A bastan tipos si el contrato está versionado; en B hace falta validación runtime obligatoria', 'In A types are enough if the contract is versioned; in B runtime validation is mandatory'),
          opt('c', 'Solo tipos en las dos', 'Only types in both'),
          opt('d', 'Solo validación en A', 'Validation only in A'),
        ],
        correctOptionId: 'b',
        explanation: bi('Se valida donde no controlas la forma. Un CSV de usuario puede tener columnas extra, encoding raro o filas vacías: nada de eso lo detecta un tipo.', 'You validate where you do not control the shape. A user CSV can have extra columns, odd encoding or empty rows: a type detects none of that.'),
        xp: 15,
      },
      {
        id: 'cd02-e11',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'Heredas un proyecto con 240 any y un error de tipos que bloquea el deploy a 3 horas de la entrega. ¿Qué haces?',
          'You inherit a project with 240 anys and a type error blocking the deploy 3 hours before delivery. What do you do?'
        ),
        options: [
          opt('a', 'Poner as any en la línea del error y desplegar', 'Put as any on the error line and deploy'),
          opt('b', 'Leer el error, arreglar el origen de ese caso concreto y abrir tarea para los any restantes sin tocarlos hoy', 'Read the error, fix the origin of that specific case and open a task for the remaining anys without touching them today'),
          opt('c', 'Refactorizar los 240 any antes de desplegar', 'Refactor all 240 anys before deploying'),
          opt('d', 'Desactivar strict en tsconfig', 'Disable strict in tsconfig'),
        ],
        correctOptionId: 'b',
        explanation: bi('as any y desactivar strict convierten un error visible en un bug silencioso. Refactorizar todo a 3 horas es riesgo puro. Se arregla el origen del error actual y se planifica el resto.', 'as any and disabling strict turn a visible error into a silent bug. Refactoring everything 3 hours out is pure risk. Fix the origin of the current error and plan the rest.'),
        xp: 15,
      },
      {
        id: 'cd02-e12',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Qué significa que un tipo discriminado (discriminated union) tenga una propiedad común literal?', 'What does it mean for a discriminated union to have a common literal property?'),
        options: [
          opt('a', 'Que todos los miembros comparten el mismo nombre de tipo', 'That all members share the same type name'),
          opt('b', 'Que comparten un campo con valor literal (kind, type, estado) que permite a TypeScript estrechar automáticamente dentro del switch', 'That they share a field with a literal value (kind, type, status) allowing TypeScript to narrow automatically inside the switch'),
          opt('c', 'Que solo se puede usar en interfaces', 'That it can only be used in interfaces'),
          opt('d', 'Que el campo es obligatorio en tiempo de ejecución', 'That the field is required at run time'),
        ],
        correctOptionId: 'b',
        explanation: bi('Con kind: "exito" | "error", dentro de case "error" TypeScript ya sabe qué campos existen. Sin el discriminador, tendrías que usar as en cada rama.', 'With kind: "success" | "error", inside case "error" TypeScript already knows which fields exist. Without the discriminator you would need as in every branch.'),
        xp: 20,
      },
      {
        id: 'cd02-e13',
        format: 'ordering',
        difficulty: 2,
        badge: bi('ORDENAR', 'ORDER'),
        prompt: bi('Ordena los pasos para añadir tipos a un módulo que hoy usa any.', 'Order the steps to add types to a module that uses any today.'),
        pieces: [
          { id: 'p1', text: bi('Copiar una respuesta real de la fuente de datos', 'Copy a real response from the data source') },
          { id: 'p2', text: bi('Traducirla a un type con campos opcionales solo donde falten de verdad', 'Translate it into a type with optional fields only where they are truly missing') },
          { id: 'p3', text: bi('Usar uniones literales en los campos de estado o categoría', 'Use literal unions on status or category fields') },
          { id: 'p4', text: bi('Validar la entrada con un esquema en la frontera', 'Validate the input with a schema at the boundary') },
          { id: 'p5', text: bi('Dejar que el compilador señale los usos rotos y arreglarlos', 'Let the compiler flag the broken uses and fix them') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        explanation: bi('Se parte del dato real, no de la idea del dato. Y el compilador hace el trabajo de encontrar los sitios rotos: por eso los tipos valen la pena.', 'You start from the real datum, not from the idea of the datum. And the compiler does the work of finding the broken spots: that is why types are worth it.'),
        xp: 10,
      },
      {
        id: 'cd02-e14',
        format: 'scenario',
        difficulty: 2,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi('Empiezas un proyecto nuevo en equipo. ¿Qué configuración de TypeScript eliges?', 'You start a new team project. Which TypeScript configuration do you pick?'),
        options: [
          opt('a', 'strict: true desde el primer commit', 'strict: true from the first commit'),
          opt('b', 'strict: false y activarlo cuando el proyecto esté avanzado', 'strict: false and enable it when the project is advanced'),
          opt('c', 'Sin TypeScript, solo JSDoc', 'No TypeScript, just JSDoc'),
          opt('d', 'strict: true pero con any permitido en las props', 'strict: true but with any allowed in props'),
        ],
        correctOptionId: 'a',
        explanation: bi('Activar strict en un proyecto con 20 000 líneas genera miles de errores de golpe y se acaba desactivando. Desde el primer commit cuesta cero.', 'Enabling strict on a 20,000-line project generates thousands of errors at once and ends up disabled. From the first commit it costs nothing.'),
        xp: 10,
      },
    ],
    recap: [
      bi('Los tipos no existen en runtime: valida en la frontera lo que viene de fuera.', 'Types do not exist at run time: validate at the boundary whatever comes from outside.'),
      bi('Uniones literales y dinero en enteros eliminan clases enteras de bug.', 'Literal unions and money in integers eliminate whole bug classes.'),
      bi('unknown en vez de any, y los errores se leen por la primera línea: esperado vs encontrado.', 'unknown instead of any, and errors are read by the first line: expected vs found.'),
    ],
    actionMission: {
      id: 'mission-code-2',
      title: bi('Sustituye 5 any por tipos reales', 'Replace 5 anys with real types'),
      objective: bi('Busca los any de un proyecto tuyo y sustituye al menos 5 por tipos derivados de datos reales, con validación en la frontera.', 'Find the anys in one of your projects and replace at least 5 with types derived from real data, with validation at the boundary.'),
      steps: [
        bi('Ejecuta una búsqueda de ": any" y "as any" y cuenta cuántos hay.', 'Run a search for ": any" and "as any" and count them.'),
        bi('Elige los 5 que están más cerca de datos externos (API, input, URL).', 'Pick the 5 closest to external data (API, input, URL).'),
        bi('Escribe el tipo a partir de una respuesta real y añade la validación.', 'Write the type from a real response and add validation.'),
      ],
      proof: bi('El compilador en verde y al menos un caso en el que el tipo nuevo detecta un fallo que antes pasaba desapercibido.', 'The compiler in green and at least one case where the new type catches a failure that previously went unnoticed.'),
      affiliateToolSlug: 'github-copilot',
      xpBonus: 25,
    },
  },
  /* ---------------------------------------------------------------- L3 -- */
  {
    slug: 'code-03-funciones-limpias',
    unitSlug: 'code-unit-1',
    trackSlug: 'modern-coding',
    orderIndex: 3,
    title: bi('Funciones que se leen una vez', 'Functions you read once'),
    outcome: bi(
      'Refactorizarás a early return, pureza y un solo nivel de abstracción, y sabrás cuándo partir una función.',
      'You will refactor to early return, purity and a single level of abstraction, and know when to split a function.'
    ),
    durationMin: 13,
    xpReward: 130,
    theory: [
      {
        id: 'cd03-t1',
        heading: bi('Early return: las condiciones primero, el caso feliz al final', 'Early return: conditions first, happy path last'),
        body: bi(
          'Cada if anidado añade un nivel de indentación que el lector tiene que mantener en la cabeza. Validar y salir al principio deja el resto de la función en el nivel 0: es el camino feliz sin ruido.',
          'Every nested if adds an indentation level the reader has to hold in their head. Validating and returning early leaves the rest of the function at level 0: the happy path with no noise.'
        ),
        diagram: {
          kind: 'code',
          lang: 'typescript',
          lines: [
            { text: '// antes: 3 niveles', tone: 'mute' },
            { text: 'function precio(u, p) {', tone: 'bad' },
            { text: '  if (u) {', tone: 'bad' },
            { text: '    if (u.activo) {', tone: 'bad' },
            { text: '      if (p.stock > 0) { return calc(u, p); }', tone: 'bad' },
            { text: '    }', tone: 'bad' },
            { text: '  }', tone: 'bad' },
            { text: '  return null;', tone: 'bad' },
            { text: '}', tone: 'bad' },
            { text: '', tone: 'mute' },
            { text: '// despues: 0 niveles', tone: 'mute' },
            { text: 'function precio(u, p) {', tone: 'good' },
            { text: '  if (!u || !u.activo) return null;', tone: 'good', label: bi('guarda', 'guard') },
            { text: '  if (p.stock <= 0) return null;', tone: 'good', label: bi('guarda', 'guard') },
            { text: '  return calc(u, p);', tone: 'good', label: bi('camino feliz', 'happy path') },
            { text: '}', tone: 'good' },
          ],
        },
      },
      {
        id: 'cd03-t2',
        heading: bi('Función pura: misma entrada, misma salida, sin efectos', 'Pure function: same input, same output, no side effects'),
        body: bi(
          'Una función pura no lee ni escribe nada de fuera: ni variables globales, ni fecha actual, ni base de datos, ni console.log. Se prueba con una sola línea y se puede mover sin romper nada.',
          'A pure function reads and writes nothing from outside: no globals, no current date, no database, no console.log. It is tested with a single line and can be moved without breaking anything.'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('Impura', 'Impure'),
            tone: 'bad',
            items: [
              bi('Lee new Date() dentro', 'Reads new Date() inside'),
              bi('Modifica el array que recibe', 'Mutates the array it receives'),
              bi('Escribe en el estado global', 'Writes to global state'),
              bi('El test depende del día', 'The test depends on the day'),
            ],
          },
          right: {
            title: bi('Pura', 'Pure'),
            tone: 'good',
            items: [
              bi('Recibe la fecha como parámetro', 'Receives the date as a parameter'),
              bi('Devuelve un array nuevo', 'Returns a new array'),
              bi('No toca nada de fuera', 'Touches nothing outside'),
              bi('El test es una línea y siempre pasa', 'The test is one line and always passes'),
            ],
          },
        },
        why: bi('La pureza no es estética: es lo que hace que una función sea testeable y reutilizable.', 'Purity is not aesthetic: it is what makes a function testable and reusable.'),
      },
      {
        id: 'cd03-t3',
        heading: bi('Un nivel de abstracción por función', 'One level of abstraction per function'),
        body: bi(
          'Mezclar "validar el pago con Stripe" con "recorrer un array" obliga al lector a cambiar de escala mental cada dos líneas. La regla: si tienes que explicar un trozo, ese trozo es una función con nombre.',
          'Mixing "validate the payment with Stripe" with "loop over an array" forces the reader to change mental scale every two lines. The rule: if you have to explain a piece, that piece is a named function.'
        ),
        diagram: {
          kind: 'layers',
          layers: [
            { label: bi('Nivel alto · qué se hace', 'High level · what is done'), note: bi('procesarPedido(pedido)', 'processOrder(order)'), tone: 'good' },
            { label: bi('Nivel medio · en qué pasos', 'Mid level · in which steps'), note: bi('validarStock(), calcularTotal(), cobrar()', 'checkStock(), computeTotal(), charge()'), tone: 'info' },
            { label: bi('Nivel bajo · cómo se hace cada paso', 'Low level · how each step is done'), note: bi('fetch a Stripe, map de líneas, redondeo', 'fetch to Stripe, map of lines, rounding'), tone: 'warn' },
          ],
        },
      },
      {
        id: 'cd03-t4',
        heading: bi('Nombres que sustituyen al comentario', 'Names that replace the comment'),
        body: bi(
          'data, temp, aux, info, handler no dicen nada. Un buen nombre responde qué es, de dónde viene y qué unidad tiene: precioCents, pedidosSinEnviar, diasDesdeAlta.',
          'data, temp, aux, info, handler say nothing. A good name answers what it is, where it comes from and what unit it has: priceCents, unshippedOrders, daysSinceSignup.'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Nombre pobre', 'Poor name'), bi('Nombre útil', 'Useful name'), bi('Qué añade', 'What it adds')],
          rows: [
            ['data', 'pedidosSinEnviar', 'el contenido y el filtro'],
            ['total', 'totalCents', 'la unidad'],
            ['flag', 'requiereRevisionHumana', 'la consecuencia'],
            ['tmp', 'presupuestoEstimadoEur', 'la moneda'],
          ],
          highlightRow: 1,
        },
      },
    ],
    examples: [
      {
        id: 'cd03-ex1',
        title: bi('Ejemplo resuelto: refactorizar una función de 60 líneas', 'Worked example: refactoring a 60-line function'),
        situation: bi(
          'calcularDescuento(usuario, carrito, cupon, fecha) tiene 60 líneas, 5 ifs anidados, lee new Date() dentro y modifica el carrito. Nadie se atreve a tocarla y hay un bug conocido desde hace meses.',
          'calcularDescuento(user, cart, coupon, date) has 60 lines, 5 nested ifs, reads new Date() inside and mutates the cart. Nobody dares touch it and there has been a known bug for months.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Escribir tests ANTES de tocar nada', 'Step 1 · Write tests BEFORE touching anything'),
            detail: bi(
              'Se capturan 8 casos reales con su resultado actual, incluido el comportamiento del bug. Sin esa red, refactorizar es reescribir y no sabes si rompiste algo.',
              'Capture 8 real cases with their current result, including the buggy behaviour. Without that net, refactoring is rewriting and you do not know if you broke something.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Caso', 'Case'), bi('Entrada', 'Input'), bi('Salida actual', 'Current output')],
              rows: [
                ['1', 'usuario VIP + cupón 10%', '18%'],
                ['2', 'usuario nuevo sin cupón', '0%'],
                ['3', 'cupón caducado', '0%'],
                ['4', 'carrito vacío', 'error'],
              ],
              highlightRow: 3,
              note: bi('El caso 4 es el bug conocido: se documenta antes de arreglarlo.', 'Case 4 is the known bug: it is documented before being fixed.'),
            },
          },
          {
            label: bi('Paso 2 · Sacar la fecha fuera (quitar la impureza)', 'Step 2 · Move the date out (remove the impurity)'),
            detail: bi(
              'La función ya recibe fecha como parámetro pero no lo usa: dentro llama a new Date(). Se elimina esa llamada. Ahora el resultado depende solo de las entradas y los tests son reproducibles.',
              'The function already receives date as a parameter but does not use it: inside it calls new Date(). That call is removed. Now the result depends only on the inputs and tests are reproducible.'
            ),
            diagram: {
              kind: 'code',
              lang: 'diff',
              lines: [
                { text: '- const hoy = new Date();', tone: 'bad', label: bi('impuro', 'impure') },
                { text: '+ const hoy = fecha;', tone: 'good', label: bi('puro', 'pure') },
              ],
            },
          },
          {
            label: bi('Paso 3 · Convertir los ifs anidados en guardas', 'Step 3 · Turn the nested ifs into guards'),
            detail: bi(
              'Cada condición de salida se convierte en un early return. Los 5 niveles de indentación pasan a 0 y la lógica principal queda visible de un vistazo.',
              'Every exit condition becomes an early return. The 5 indentation levels go to 0 and the main logic becomes visible at a glance.'
            ),
          },
          {
            label: bi('Paso 4 · Extraer 4 funciones con nombre', 'Step 4 · Extract 4 named functions'),
            detail: bi(
              'esCuponValido(cupon, fecha), descuentoPorRol(usuario), descuentoPorVolumen(carrito) y limitar(total, max). La función principal pasa a leerse como una receta de 6 líneas.',
              'isCouponValid(coupon, date), discountByRole(user), discountByVolume(cart) and clamp(total, max). The main function now reads like a 6-line recipe.'
            ),
            diagram: {
              kind: 'code',
              lang: 'typescript',
              lines: [
                { text: 'function calcularDescuento(usuario, carrito, cupon, fecha) {', tone: 'good' },
                { text: '  if (!usuario || carrito.lineas.length === 0) return 0;', tone: 'good', label: bi('guarda', 'guard') },
                { text: '  if (!esCuponValido(cupon, fecha)) return 0;', tone: 'good', label: bi('guarda', 'guard') },
                { text: '', tone: 'mute' },
                { text: '  const porRol = descuentoPorRol(usuario);', tone: 'info' },
                { text: '  const porVolumen = descuentoPorVolumen(carrito);', tone: 'info' },
                { text: '  const porCupon = cupon.pct;', tone: 'info' },
                { text: '  return limitar(porRol + porVolumen + porCupon, 40);', tone: 'good', label: bi('techo', 'ceiling') },
                { text: '}', tone: 'good' },
              ],
            },
          },
          {
            label: bi('Paso 5 · No mutar el carrito', 'Step 5 · Do not mutate the cart'),
            detail: bi(
              'La función original escribía carrito.descuentoAplicado. Ahora devuelve el descuento y el que llama decide dónde guardarlo. Eso elimina efectos sorprendentes a distancia.',
              'The original function wrote cart.appliedDiscount. Now it returns the discount and the caller decides where to store it. That removes surprising effects at a distance.'
            ),
          },
        ],
        result: bi(
          '60 líneas → 9 en la función principal más 4 funciones pequeñas de 3-8 líneas. Los 8 tests siguen en verde sin cambiar una sola expectativa. El bug del caso 4 se arregla después, con la red puesta.',
          '60 lines → 9 in the main function plus 4 small functions of 3-8 lines. The 8 tests stay green without changing a single expectation. The case 4 bug is fixed afterwards, with the net in place.'
        ),
        selfCheck: {
          prompt: bi('¿Por qué se escribieron los tests antes de refactorizar y no después?', 'Why were the tests written before refactoring and not after?'),
          options: [
            opt('a', 'Porque es más rápido escribirlos al principio', 'Because it is faster to write them at the start'),
            opt('b', 'Porque capturan el comportamiento actual y permiten saber si el refactor rompió algo, incluso si ese comportamiento tiene un bug', 'Because they capture the current behaviour and let you know whether the refactor broke something, even if that behaviour has a bug'),
            opt('c', 'Porque el código refactorizado no se puede testear', 'Because refactored code cannot be tested'),
            opt('d', 'Porque lo exige el control de versiones', 'Because version control requires it'),
          ],
          correctOptionId: 'b',
          explanation: bi('Refactorizar significa cambiar la estructura sin cambiar el comportamiento. Si no capturaste el comportamiento antes, no puedes verificar esa promesa.', 'Refactoring means changing the structure without changing the behaviour. If you did not capture the behaviour first, you cannot verify that promise.'),
        },
      },
    ],
    exercises: [
      {
        id: 'cd03-e01',
        format: 'concept',
        difficulty: 1,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('Una función pura es la que…', 'A pure function is one that…'),
        options: [
          opt('a', 'No tiene condicionales', 'Has no conditionals'),
          opt('b', 'Devuelve el mismo resultado para la misma entrada y no produce efectos externos', 'Returns the same result for the same input and produces no external effects'),
          opt('c', 'Está escrita en una sola línea', 'Is written in a single line'),
          opt('d', 'No recibe parámetros', 'Receives no parameters'),
        ],
        correctOptionId: 'b',
        explanation: bi('Pureza = determinismo + ausencia de efectos. Es lo que la hace testeable con una línea y segura de reutilizar.', 'Purity = determinism + absence of effects. That is what makes it testable in one line and safe to reuse.'),
        xp: 8,
      },
      {
        id: 'cd03-e02',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada problema del código con la técnica que lo resuelve.', 'Match each code problem with the technique that solves it.'),
        pairs: [
          { leftId: 'l1', left: bi('5 niveles de indentación', '5 indentation levels'), rightId: 'r1', right: bi('Early return / cláusulas de guarda', 'Early return / guard clauses') },
          { leftId: 'l2', left: bi('El test falla según el día', 'The test fails depending on the day'), rightId: 'r2', right: bi('Pasar la fecha como parámetro', 'Pass the date as a parameter') },
          { leftId: 'l3', left: bi('Mezcla llamadas a API con bucles', 'Mixes API calls with loops'), rightId: 'r3', right: bi('Un nivel de abstracción por función', 'One level of abstraction per function') },
          { leftId: 'l4', left: bi('Cambia el array que recibe', 'Changes the array it receives'), rightId: 'r4', right: bi('Devolver una copia nueva (map/filter/spread)', 'Return a new copy (map/filter/spread)') },
        ],
        explanation: bi('Cada síntoma tiene una técnica concreta. "Escribe código limpio" no es una instrucción accionable; estas cuatro sí.', 'Each symptom has a concrete technique. "Write clean code" is not an actionable instruction; these four are.'),
        xp: 12,
      },
      {
        id: 'cd03-e03',
        format: 'ordering',
        difficulty: 2,
        badge: bi('ORDENAR', 'ORDER'),
        prompt: bi('Ordena los pasos de un refactor seguro.', 'Order the steps of a safe refactor.'),
        pieces: [
          { id: 'p1', text: bi('Escribir tests que capturen el comportamiento actual', 'Write tests capturing the current behaviour') },
          { id: 'p2', text: bi('Quitar impurezas (fecha, globales, mutaciones)', 'Remove impurities (date, globals, mutations)') },
          { id: 'p3', text: bi('Convertir ifs anidados en guardas', 'Convert nested ifs into guards') },
          { id: 'p4', text: bi('Extraer funciones con nombre por nivel de abstracción', 'Extract named functions by level of abstraction') },
          { id: 'p5', text: bi('Verificar que los tests siguen en verde sin cambiar expectativas', 'Verify the tests stay green without changing expectations') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        explanation: bi('Los tests van primero siempre. Y en el paso 5 no se modifican las expectativas: si necesitas cambiarlas, no estabas refactorizando, estabas reescribiendo.', 'Tests always come first. And in step 5 you do not modify the expectations: if you need to, you were not refactoring, you were rewriting.'),
        xp: 10,
      },
      {
        id: 'cd03-e04',
        format: 'faded',
        difficulty: 3,
        badge: bi('COMPLETAR', 'COMPLETE'),
        prompt: bi('Completa la función con guardas. Las dos primeras ya están escritas.', 'Complete the function with guards. The first two are already written.'),
        pieces: [
          { id: 'p1', text: bi('if (!usuario) return null;', 'if (!usuario) return null;') },
          { id: 'p2', text: bi('if (pedido.lineas.length === 0) return null;', 'if (pedido.lineas.length === 0) return null;') },
          { id: 'p3', text: bi('if (!pedido.pagado) return null;', 'if (!pedido.pagado) return null;') },
          { id: 'p4', text: bi('const total = sumarLineas(pedido.lineas);', 'const total = sumarLineas(pedido.lineas);') },
          { id: 'p5', text: bi('return aplicarDescuento(total, usuario.rol);', 'return aplicarDescuento(total, usuario.rol);') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        lockedPieceIds: ['p1', 'p2'],
        explanation: bi('Todas las condiciones de salida van antes del trabajo. Cuando llegas a la línea 4, ya sabes que los datos son válidos: no hay que volver a comprobarlos.', 'All exit conditions go before the work. When you reach line 4, you already know the data is valid: no need to check again.'),
        xp: 12,
      },
      {
        id: 'cd03-e05',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('Esta función da resultados distintos en dos ejecuciones idénticas. ¿Qué línea lo causa?', 'This function gives different results on two identical runs. Which line causes it?'),
        lines: [
          { id: 'c1', text: 'function precioFinal(items) {', tone: 'good' },
          { id: 'c2', text: '  const factor = Math.random() > 0.5 ? 1 : 0.9;', tone: 'bad', label: bi('sospechoso', 'suspect') },
          { id: 'c3', text: '  const base = items.reduce((a, i) => a + i.cents, 0);', tone: 'good' },
          { id: 'c4', text: '  return Math.round(base * factor);', tone: 'good' },
        ],
        correctLineId: 'c2',
        explanation: bi('Cualquier fuente no determinista dentro (Math.random, Date.now, estado global) rompe la pureza. El factor debe entrar como parámetro para que la función sea predecible y testeable.', 'Any non-deterministic source inside (Math.random, Date.now, global state) breaks purity. The factor must come in as a parameter so the function is predictable and testable.'),
        xp: 12,
      },
      {
        id: 'cd03-e06',
        format: 'worked_why',
        difficulty: 3,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('¿Por qué extraer funciones con nombre mejora la legibilidad aunque el código total sea más largo?', 'Why does extracting named functions improve readability even when the total code is longer?'),
        options: [
          opt('a', 'Porque el compilador las optimiza mejor', 'Because the compiler optimises them better'),
          opt('b', 'Porque el nombre sustituye a un comentario y permite leer la función principal a un solo nivel de abstracción', 'Because the name replaces a comment and lets you read the main function at a single level of abstraction'),
          opt('c', 'Porque reduce el número de líneas ejecutadas', 'Because it reduces the number of executed lines'),
          opt('d', 'Porque evita los bugs por sí solo', 'Because it prevents bugs on its own'),
        ],
        correctOptionId: 'b',
        explanation: bi('Leer "aplicarDescuento(total, rol)" no requiere entender cómo se calcula. Leer 14 líneas de cálculo en mitad de otra lógica sí. El coste en líneas se paga en comprensión.', 'Reading "applyDiscount(total, role)" does not require understanding how it is computed. Reading 14 lines of calculation in the middle of other logic does. The cost in lines is paid in comprehension.'),
        xp: 12,
      },
      {
        id: 'cd03-e07',
        format: 'output',
        difficulty: 3,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('¿Qué vale original después de ejecutar esto?', 'What is original worth after running this?'),
        context: {
          mono: true,
          content: 'const original = [1, 2, 3];\nfunction duplicar(arr) { arr.push(99); return arr; }\nconst copia = duplicar(original);',
        },
        options: [
          opt('a', '[1, 2, 3] porque los arrays se pasan por valor', '[1, 2, 3] because arrays are passed by value'),
          opt('b', '[1, 2, 3, 99] porque push modifica el array original: es la misma referencia', '[1, 2, 3, 99] because push mutates the original array: it is the same reference'),
          opt('c', '[99] porque se sobrescribe', '[99] because it gets overwritten'),
          opt('d', 'Lanza un error porque es const', 'Throws an error because it is const'),
        ],
        correctOptionId: 'b',
        explanation: bi('const impide reasignar la variable, no mutar el contenido. Los objetos y arrays se pasan por referencia: push, sort, splice y reverse modifican el original.', 'const prevents reassigning the variable, not mutating the content. Objects and arrays are passed by reference: push, sort, splice and reverse modify the original.'),
        xp: 12,
      },
      {
        id: 'cd03-e08',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos funciones largas. (A) 80 líneas lineales sin ifs, que hace una sola cosa paso a paso. (B) 40 líneas con 4 ifs anidados y 3 responsabilidades. ¿Cuál parte primero?',
          'Two long functions. (A) 80 linear lines with no ifs, doing one thing step by step. (B) 40 lines with 4 nested ifs and 3 responsibilities. Which do you split first?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Función', 'Function'), bi('Líneas', 'Lines'), bi('Responsabilidades', 'Responsibilities'), bi('Anidación', 'Nesting')],
          rows: [
            ['A', '80', '1', '0'],
            ['B', '40', '3', '4'],
          ],
          highlightRow: 1,
        },
        options: [
          opt('a', 'A, porque es la más larga', 'A, because it is the longest'),
          opt('b', 'B, porque mezcla responsabilidades y anida: la longitud no es el criterio, la cohesión sí', 'B, because it mixes responsibilities and nests: length is not the criterion, cohesion is'),
          opt('c', 'Las dos por igual', 'Both equally'),
          opt('d', 'Ninguna, funcionan', 'Neither, they work'),
        ],
        correctOptionId: 'b',
        explanation: bi('Partir por longitud es arbitrario. Se parte cuando hay más de una razón para cambiar o más de un nivel de abstracción mezclado. A puede quedarse como está.', 'Splitting by length is arbitrary. You split when there is more than one reason to change or more than one mixed level of abstraction. A can stay as it is.'),
        xp: 15,
      },
      {
        id: 'cd03-e09',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'Encuentras una función de 120 líneas sin tests en un módulo crítico. Hay que añadirle una funcionalidad esta semana. ¿Qué haces?',
          'You find a 120-line function with no tests in a critical module. A feature must be added to it this week. What do you do?'
        ),
        options: [
          opt('a', 'Refactorizarla entera y luego añadir la funcionalidad', 'Refactor the whole thing and then add the feature'),
          opt('b', 'Escribir tests de los caminos que vas a tocar, añadir la funcionalidad y refactorizar solo esa zona', 'Write tests for the paths you will touch, add the feature and refactor only that area'),
          opt('c', 'Añadir la funcionalidad al final de la función sin tocar nada más', 'Add the feature at the end of the function without touching anything else'),
          opt('d', 'Duplicar la función y modificar la copia', 'Duplicate the function and modify the copy'),
        ],
        correctOptionId: 'b',
        explanation: bi('Refactorizar 120 líneas sin tests en una semana es riesgo sin retorno. La práctica es el "boy scout rule" acotado: mejorar solo lo que tocas, con red debajo.', 'Refactoring 120 untested lines in one week is risk with no return. The practice is a bounded boy-scout rule: improve only what you touch, with a net underneath.'),
        xp: 15,
      },
      {
        id: 'cd03-e10',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Una función tiene 5 ifs anidados. Cada nivel multiplica por 2 los caminos posibles de ejecución. ¿Cuántos caminos tiene que cubrir un test exhaustivo?',
          'A function has 5 nested ifs. Each level doubles the possible execution paths. How many paths must an exhaustive test cover?'
        ),
        answer: 32,
        tolerance: 0,
        unit: 'caminos',
        formula: bi('2^5', '2^5'),
        explanation: bi('2⁵ = 32 caminos. Con guardas early-return los mismos 5 ifs producen 6 caminos (5 salidas + 1 feliz): por eso es testeable de verdad.', '2⁵ = 32 paths. With early-return guards the same 5 ifs produce 6 paths (5 exits + 1 happy): that is why it becomes genuinely testable.'),
        xp: 12,
      },
      {
        id: 'cd03-e11',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Qué método de array NO muta el original?', 'Which array method does NOT mutate the original?'),
        options: [
          opt('a', 'sort()', 'sort()'),
          opt('b', 'splice()', 'splice()'),
          opt('c', 'toSorted() / slice() / map()', 'toSorted() / slice() / map()'),
          opt('d', 'reverse()', 'reverse()'),
        ],
        correctOptionId: 'c',
        explanation: bi('sort, splice, reverse, push y pop mutan. slice, map, filter, concat y toSorted devuelven uno nuevo. En React, mutar el estado es la causa nº1 de que no se re-renderice.', 'sort, splice, reverse, push and pop mutate. slice, map, filter, concat and toSorted return a new one. In React, mutating state is the number one cause of a missing re-render.'),
        xp: 20,
      },
      {
        id: 'cd03-e12',
        format: 'scenario',
        difficulty: 2,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi('Vas a nombrar una variable que guarda el número de días desde que el usuario se registró. ¿Qué nombre eliges?', 'You are about to name a variable holding the number of days since the user signed up. Which name do you pick?'),
        options: [
          opt('a', 'd', 'd'),
          opt('b', 'diasDesdeAlta', 'daysSinceSignup'),
          opt('c', 'data', 'data'),
          opt('d', 'valor', 'value'),
        ],
        correctOptionId: 'b',
        explanation: bi('El nombre debe decir qué es, de dónde viene y en qué unidad está. "d" obliga a leer la asignación; "diasDesdeAlta" la hace innecesaria.', 'The name must say what it is, where it comes from and what unit it is in. "d" forces you to read the assignment; "daysSinceSignup" makes that unnecessary.'),
        xp: 10,
      },
      {
        id: 'cd03-e13',
        format: 'output',
        difficulty: 4,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('¿Qué devuelve esta función con precio(0)?', 'What does this function return with price(0)?'),
        context: {
          mono: true,
          content: 'function precio(p) {\n  if (!p) return "sin precio";\n  return p * 1.21;\n}',
        },
        options: [
          opt('a', '0', '0'),
          opt('b', '"sin precio", porque 0 es falsy y !0 es true', '"no price", because 0 is falsy and !0 is true'),
          opt('c', 'NaN', 'NaN'),
          opt('d', 'Lanza un error', 'Throws an error'),
        ],
        correctOptionId: 'b',
        explanation: bi('El bug clásico de la guarda con !valor: descarta el 0 legítimo junto al null. La guarda correcta es p === undefined || p === null, o p == null si aceptas ese estilo.', 'The classic guard bug with !value: it discards a legitimate 0 along with null. The correct guard is p === undefined || p === null, or p == null if you accept that style.'),
        xp: 15,
      },
    ],
    recap: [
      bi('Guardas primero, camino feliz al final: cero niveles de indentación.', 'Guards first, happy path last: zero indentation levels.'),
      bi('Pureza = misma entrada, misma salida, sin efectos. La fecha y el azar entran por parámetro.', 'Purity = same input, same output, no effects. Date and randomness come in as parameters.'),
      bi('Un nivel de abstracción por función y nombres que dicen unidad y origen.', 'One level of abstraction per function and names that state unit and origin.'),
    ],
    actionMission: {
      id: 'mission-code-3',
      title: bi('Refactoriza una función real con red de tests', 'Refactor one real function with a test net'),
      objective: bi('Elige la función más larga de un proyecto tuyo, escríbele tests del comportamiento actual y refactorízala a guardas y funciones pequeñas.', 'Pick the longest function in one of your projects, write tests for its current behaviour and refactor it into guards and small functions.'),
      steps: [
        bi('Escribe 5-8 tests que capturen lo que hace hoy, incluidos los casos raros.', 'Write 5-8 tests capturing what it does today, including the odd cases.'),
        bi('Convierte los ifs anidados en early returns.', 'Convert the nested ifs into early returns.'),
        bi('Extrae al menos 3 funciones con nombre descriptivo y verifica que los tests siguen en verde.', 'Extract at least 3 descriptively named functions and verify the tests stay green.'),
      ],
      proof: bi('Tests en verde sin modificar ninguna expectativa, y la función principal por debajo de 15 líneas.', 'Tests in green without modifying any expectation, and the main function under 15 lines.'),
      affiliateToolSlug: 'vercel-platform',
      xpBonus: 30,
    },
  },
  /* ---------------------------------------------------------------- L4 -- */
  {
    slug: 'code-04-react-modelo-mental',
    unitSlug: 'code-unit-1',
    trackSlug: 'modern-coding',
    orderIndex: 4,
    title: bi('El modelo mental de React', 'The React mental model'),
    outcome: bi(
      'Predecirás cuándo re-renderiza un componente, qué va en las dependencias de useEffect y por qué mutar el estado no funciona.',
      'You will predict when a component re-renders, what goes into useEffect dependencies and why mutating state does not work.'
    ),
    durationMin: 14,
    xpReward: 140,
    theory: [
      {
        id: 'cd04-t1',
        heading: bi('Renderizar es ejecutar la función otra vez', 'Rendering is running the function again'),
        body: bi(
          'Un componente es una función. Cuando cambia su estado o sus props, React la vuelve a ejecutar de arriba abajo y compara el JSX resultante con el anterior. No "se actualiza una parte": se recalcula todo y se aplican las diferencias.',
          'A component is a function. When its state or props change, React runs it again top to bottom and compares the resulting JSX with the previous one. It does not "update a part": everything is recalculated and the differences are applied.'
        ),
        diagram: {
          kind: 'flow',
          nodes: [
            { id: 'a', label: bi('setState / props nuevas', 'setState / new props'), tone: 'warn' },
            { id: 'b', label: bi('Se ejecuta la función', 'The function runs'), tone: 'info' },
            { id: 'c', label: bi('JSX nuevo', 'New JSX'), tone: 'info' },
            { id: 'd', label: bi('Diff con el anterior', 'Diff with the previous'), tone: 'info' },
            { id: 'e', label: bi('Solo lo distinto al DOM', 'Only the difference to the DOM'), tone: 'good' },
          ],
        },
      },
      {
        id: 'cd04-t2',
        heading: bi('El estado es inmutable: setState compara referencias', 'State is immutable: setState compares references'),
        body: bi(
          'Si modificas el array con push y luego haces setState del mismo array, la referencia no cambia y React decide que no hay nada que renderizar. Hay que crear uno nuevo: [...lista, item] o lista.map(...).',
          'If you modify the array with push and then setState the same array, the reference does not change and React decides there is nothing to render. You must create a new one: [...list, item] or list.map(...).'
        ),
        diagram: {
          kind: 'compare',
          left: {
            title: bi('No re-renderiza', 'Does not re-render'),
            tone: 'bad',
            items: [
              bi('items.push(nuevo); setItems(items)', 'items.push(nuevo); setItems(items)'),
              bi('lista.sort(); setLista(lista)', 'list.sort(); setList(list)'),
              bi('user.nombre = "Ana"; setUser(user)', 'user.name = "Ana"; setUser(user)'),
            ],
          },
          right: {
            title: bi('Sí re-renderiza', 'Does re-render'),
            tone: 'good',
            items: [
              bi('setItems([...items, nuevo])', 'setItems([...items, new])'),
              bi('setLista([...lista].sort())', 'setList([...list].sort())'),
              bi('setUser({ ...user, nombre: "Ana" })', 'setUser({ ...user, name: "Ana" })'),
            ],
          },
        },
        why: bi('Es el bug nº1 de React: la pantalla no cambia y el console.log muestra el dato correcto.', 'It is the number one React bug: the screen does not change and console.log shows the right datum.'),
      },
      {
        id: 'cd04-t3',
        heading: bi('useEffect: las dependencias deciden cuándo se ejecuta', 'useEffect: dependencies decide when it runs'),
        body: bi(
          'Array vacío: una vez al montar. Sin array: en cada render. Con [a, b]: cuando cambia a o b, comparando con Object.is. Si usas una variable dentro y no la declaras, el efecto se queda con el valor viejo: es el stale closure.',
          'Empty array: once on mount. No array: on every render. With [a, b]: when a or b changes, compared with Object.is. If you use a variable inside without declaring it, the effect keeps the old value: that is the stale closure.'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Dependencias', 'Dependencies'), bi('Cuándo se ejecuta', 'When it runs'), bi('Uso típico', 'Typical use')],
          rows: [
            ['[]', 'una vez al montar', 'suscripciones, fetch inicial'],
            ['[userId]', 'cuando cambia userId', 'cargar datos de esa entidad'],
            ['sin array', 'en cada render', 'casi nunca: bucles y coste'],
          ],
          highlightRow: 1,
        },
      },
      {
        id: 'cd04-t4',
        heading: bi('La key no es decoración: es la identidad del elemento', 'The key is not decoration: it is the element identity'),
        body: bi(
          'React usa la key para saber qué elemento de la lista anterior corresponde a cuál de la nueva. Con index como key, al insertar o reordenar se reutilizan componentes equivocados y el estado interno se mueve de fila.',
          'React uses the key to know which element of the previous list corresponds to which of the new one. With index as key, inserting or reordering reuses the wrong components and internal state moves between rows.'
        ),
        diagram: {
          kind: 'code',
          lang: 'jsx',
          lines: [
            { text: '{items.map((it, i) => <Row key={i} ... />)}', tone: 'bad', label: bi('rompe al reordenar', 'breaks on reorder') },
            { text: '{items.map((it) => <Row key={it.id} ... />)}', tone: 'good', label: bi('identidad estable', 'stable identity') },
            { text: '', tone: 'mute' },
            { text: '// con key={i}: insertas arriba ->', tone: 'warn' },
            { text: '// la fila 0 hereda el input de la antigua fila 0', tone: 'bad' },
          ],
        },
      },
    ],
    examples: [
      {
        id: 'cd04-ex1',
        title: bi('Ejemplo resuelto: el contador que no se actualiza en el intervalo', 'Worked example: the counter that does not update in the interval'),
        situation: bi(
          'Un componente lanza un setInterval que debería imprimir el contador actual cada segundo. Imprime siempre 0. El contador en pantalla sí sube cuando pulsas el botón.',
          'A component starts a setInterval that should print the current counter every second. It always prints 0. The on-screen counter does rise when you press the button.'
        ),
        steps: [
          {
            label: bi('Paso 1 · Leer el código y localizar el cierre', 'Step 1 · Read the code and locate the closure'),
            detail: bi(
              'El efecto se ejecuta una vez al montar con []. Dentro captura el valor de contador en ese instante: 0. Esa captura no se renueva aunque el estado cambie.',
              'The effect runs once on mount with []. Inside it captures the value of counter at that instant: 0. That capture is never renewed even if the state changes.'
            ),
            diagram: {
              kind: 'code',
              lang: 'jsx',
              lines: [
                { text: 'const [contador, setContador] = useState(0);', tone: 'good' },
                { text: 'useEffect(() => {', tone: 'info' },
                { text: '  const id = setInterval(() => {', tone: 'info' },
                { text: '    console.log(contador);   // siempre 0', tone: 'bad', label: bi('stale closure', 'stale closure') },
                { text: '  }, 1000);', tone: 'info' },
                { text: '  return () => clearInterval(id);', tone: 'good' },
                { text: '}, []);                       // captura inicial', tone: 'warn', label: bi('una vez', 'once') },
              ],
            },
          },
          {
            label: bi('Paso 2 · Descartar las dos soluciones ingenuas', 'Step 2 · Rule out the two naive fixes'),
            detail: bi(
              'Añadir contador a las dependencias reinicia el intervalo cada segundo: funciona pero el temporizador nunca llega a tiempo completo. Quitar el array hace que se cree y se limpie un intervalo en cada render: peor.',
              'Adding counter to the dependencies restarts the interval every second: it works but the timer never completes. Removing the array creates and clears an interval on every render: worse.'
            ),
            diagram: {
              kind: 'table',
              head: [bi('Intento', 'Attempt'), bi('Efecto', 'Effect'), bi('Veredicto', 'Verdict')],
              rows: [
                ['[contador]', 'reinicia el intervalo cada cambio', 'parcial'],
                ['sin array', 'intervalo nuevo en cada render', 'malo'],
                ['useCallback + ref', 'lectura siempre actual', 'correcto'],
              ],
              highlightRow: 2,
            },
          },
          {
            label: bi('Paso 3 · Solución con actualización funcional', 'Step 3 · Fix with a functional update'),
            detail: bi(
              'setContador(c => c + 1) no necesita leer el valor capturado: recibe el estado más reciente como argumento. Es la forma correcta cuando el nuevo estado depende del anterior.',
              'setCounter(c => c + 1) does not need to read the captured value: it receives the latest state as an argument. That is the correct form when the new state depends on the previous one.'
            ),
            diagram: {
              kind: 'compare',
              left: {
                title: bi('Depende del cierre', 'Depends on the closure'),
                tone: 'bad',
                items: [
                  bi('setContador(contador + 1)', 'setCounter(counter + 1)'),
                  bi('Tres llamadas seguidas = +1 en total', 'Three calls in a row = +1 total'),
                  bi('Lee el valor del render actual', 'Reads the value of the current render'),
                ],
              },
              right: {
                title: bi('Actualización funcional', 'Functional update'),
                tone: 'good',
                items: [
                  bi('setContador(c => c + 1)', 'setCounter(c => c + 1)'),
                  bi('Tres llamadas seguidas = +3', 'Three calls in a row = +3'),
                  bi('Recibe el estado más reciente', 'Receives the latest state'),
                ],
              },
            },
          },
          {
            label: bi('Paso 4 · Limpiar siempre el efecto', 'Step 4 · Always clean up the effect'),
            detail: bi(
              'El return con clearInterval evita que los intervalos se acumulen al desmontar o al cambiar las dependencias. Sin limpieza, cada visita a la página deja temporizadores vivos consumiendo memoria.',
              'The return with clearInterval prevents intervals from piling up on unmount or dependency change. Without cleanup, every page visit leaves live timers consuming memory.'
            ),
          },
        ],
        result: bi(
          'El intervalo imprime el valor correcto y el botón suma de forma consistente aunque se pulse tres veces seguidas. La regla general: dentro de un efecto, no leas estado capturado; recíbelo por parámetro.',
          'The interval prints the correct value and the button adds consistently even when pressed three times in a row. The general rule: inside an effect, do not read captured state; receive it as a parameter.'
        ),
        selfCheck: {
          prompt: bi('¿Por qué setContador(contador + 1) tres veces seguidas suma solo 1?', 'Why does calling setContador(contador + 1) three times in a row add only 1?'),
          options: [
            opt('a', 'Porque React ignora las llamadas repetidas', 'Because React ignores repeated calls'),
            opt('b', 'Porque las tres leen el mismo valor de contador del render actual y piden el mismo estado nuevo', 'Because all three read the same counter value from the current render and request the same new state'),
            opt('c', 'Porque falta un await entre llamadas', 'Because an await is missing between calls'),
            opt('d', 'Porque el estado es asíncrono y se pierde', 'Because state is asynchronous and gets lost'),
          ],
          correctOptionId: 'b',
          explanation: bi('Dentro de un render, contador es una constante. Las tres llamadas calculan 0 + 1 = 1. Con c => c + 1 cada llamada recibe el resultado de la anterior.', 'Inside a render, counter is a constant. All three calls compute 0 + 1 = 1. With c => c + 1 each call receives the result of the previous one.'),
        },
      },
    ],
    exercises: [
      {
        id: 'cd04-e01',
        format: 'concept',
        difficulty: 1,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Qué ocurre cuando llamas a setState con un valor nuevo?', 'What happens when you call setState with a new value?'),
        options: [
          opt('a', 'Se modifica solo esa parte del DOM', 'Only that part of the DOM is modified'),
          opt('b', 'React vuelve a ejecutar la función del componente y aplica al DOM las diferencias del JSX', 'React runs the component function again and applies the JSX differences to the DOM'),
          opt('c', 'Se recarga la página', 'The page reloads'),
          opt('d', 'Nada si el valor es igual', 'Nothing if the value is equal'),
        ],
        correctOptionId: 'b',
        explanation: bi('Todo el componente se vuelve a ejecutar. React decide qué toca el DOM comparando. La opción D es cierta solo si el valor es idéntico por Object.is.', 'The whole component runs again. React decides what touches the DOM by comparing. Option D is true only if the value is identical under Object.is.'),
        xp: 8,
      },
      {
        id: 'cd04-e02',
        format: 'output',
        difficulty: 2,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('¿Se actualiza la pantalla con este handler?', 'Does the screen update with this handler?'),
        context: {
          mono: true,
          content: 'const [items, setItems] = useState([1, 2]);\nfunction add() {\n  items.push(3);\n  setItems(items);\n}',
        },
        options: [
          opt('a', 'Sí, muestra [1, 2, 3]', 'Yes, it shows [1, 2, 3]'),
          opt('b', 'No: la referencia del array no cambia, así que React no re-renderiza', 'No: the array reference does not change, so React does not re-render'),
          opt('c', 'Sí, pero solo tras un segundo render', 'Yes, but only after a second render'),
          opt('d', 'Lanza un error porque el estado es de solo lectura', 'Throws an error because state is read-only'),
        ],
        correctOptionId: 'b',
        explanation: bi('push muta el array existente y devuelve la misma referencia. Object.is(antes, después) es true y React sale sin renderizar. La forma correcta es setItems([...items, 3]).', 'push mutates the existing array and returns the same reference. Object.is(before, after) is true and React exits without rendering. The correct form is setItems([...items, 3]).'),
        xp: 10,
      },
      {
        id: 'cd04-e03',
        format: 'pairing',
        difficulty: 2,
        badge: bi('EMPAREJAR', 'MATCH'),
        prompt: bi('Empareja cada operación con su versión inmutable.', 'Match each operation with its immutable version.'),
        pairs: [
          { leftId: 'l1', left: bi('arr.push(x)', 'arr.push(x)'), rightId: 'r1', right: bi('[...arr, x]', '[...arr, x]') },
          { leftId: 'l2', left: bi('arr[i] = x', 'arr[i] = x'), rightId: 'r2', right: bi('arr.map((v, j) => (j === i ? x : v))', 'arr.map((v, j) => (j === i ? x : v))') },
          { leftId: 'l3', left: bi('obj.a = 1', 'obj.a = 1'), rightId: 'r3', right: bi('{ ...obj, a: 1 }', '{ ...obj, a: 1 }') },
          { leftId: 'l4', left: bi('arr.splice(i, 1)', 'arr.splice(i, 1)'), rightId: 'r4', right: bi('arr.filter((_, j) => j !== i)', 'arr.filter((_, j) => j !== i)') },
        ],
        explanation: bi('Las cuatro de la izquierda mutan y rompen el render de React. Las de la derecha devuelven una referencia nueva, que es lo que React necesita para detectar el cambio.', 'All four on the left mutate and break React rendering. The ones on the right return a new reference, which is what React needs to detect the change.'),
        xp: 12,
      },
      {
        id: 'cd04-e04',
        format: 'output',
        difficulty: 3,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('Pulsas el botón tres veces muy rápido. ¿Cuál es el valor final de n?', 'You press the button three times very fast. What is the final value of n?'),
        context: {
          mono: true,
          content: 'const [n, setN] = useState(0);\n<button onClick={() => {\n  setN(n + 1);\n  setN(n + 1);\n  setN(n + 1);\n}} />',
        },
        options: [
          opt('a', '3', '3'),
          opt('b', '1, porque las tres llamadas leen el mismo n del render actual', '1, because all three calls read the same n from the current render'),
          opt('c', '0', '0'),
          opt('d', '2', '2'),
        ],
        correctOptionId: 'b',
        explanation: bi('n es una constante del render. Las tres llamadas piden setN(1). Con setN(v => v + 1) sí daría 3, porque cada llamada recibe el resultado anterior.', 'n is a constant of the render. All three calls request setN(1). With setN(v => v + 1) it would give 3, because each call receives the previous result.'),
        xp: 12,
      },
      {
        id: 'cd04-e05',
        format: 'bug_hunt',
        difficulty: 3,
        badge: bi('CAZA EL BUG', 'BUG HUNT'),
        prompt: bi('Este useEffect se ejecuta en bucle infinito. ¿Qué línea lo causa?', 'This useEffect runs in an infinite loop. Which line causes it?'),
        lines: [
          { id: 'c1', text: 'const [data, setData] = useState([]);', tone: 'good' },
          { id: 'c2', text: 'const filtro = { activo: true };', tone: 'bad', label: bi('sospechoso', 'suspect') },
          { id: 'c3', text: 'useEffect(() => { cargar(filtro).then(setData); }, [filtro]);', tone: 'warn' },
          { id: 'c4', text: 'return <Lista items={data} />;', tone: 'good' },
        ],
        correctLineId: 'c2',
        explanation: bi(
          'filtro se crea nuevo en cada render, así que su referencia cambia siempre y el efecto se dispara otra vez, que llama a setData, que re-renderiza. Solución: sacarlo fuera del componente o usar useMemo / valores primitivos en las dependencias.',
          'filtro is created anew on each render, so its reference always changes and the effect fires again, calling setData, which re-renders. Fix: move it outside the component or use useMemo / primitive values in dependencies.'
        ),
        xp: 12,
      },
      {
        id: 'cd04-e06',
        format: 'worked_why',
        difficulty: 3,
        badge: bi('POR QUÉ', 'WHY'),
        prompt: bi('En el ejemplo, ¿por qué no bastaba con añadir contador a las dependencias del efecto?', 'In the example, why was adding counter to the effect dependencies not enough?'),
        options: [
          opt('a', 'Porque React no permite estado en las dependencias', 'Because React does not allow state in dependencies'),
          opt('b', 'Porque recrea y limpia el intervalo en cada cambio, así que el temporizador se reinicia constantemente', 'Because it recreates and clears the interval on every change, so the timer constantly restarts'),
          opt('c', 'Porque provocaría un error de tipo', 'Because it would cause a type error'),
          opt('d', 'Porque el intervalo dejaría de existir', 'Because the interval would stop existing'),
        ],
        correctOptionId: 'b',
        explanation: bi('Funciona para leer el valor, pero cambia la semántica del temporizador: cada segundo se destruye y se crea. Con muchos cambios de estado, el intervalo nunca llega a dispararse.', 'It works for reading the value, but it changes the timer semantics: every second it is destroyed and created. With many state changes, the interval never gets to fire.'),
        xp: 12,
      },
      {
        id: 'cd04-e07',
        format: 'faded',
        difficulty: 3,
        badge: bi('COMPLETAR', 'COMPLETE'),
        prompt: bi('Completa el efecto que carga los pedidos de un usuario. Las dos primeras líneas ya están.', 'Complete the effect that loads a user orders. The first two lines are done.'),
        pieces: [
          { id: 'p1', text: bi('useEffect(() => {', 'useEffect(() => {') },
          { id: 'p2', text: bi('let cancelado = false;', 'let cancelled = false;') },
          { id: 'p3', text: bi('cargarPedidos(userId).then(r => { if (!cancelado) setPedidos(r); })', 'loadOrders(userId).then(r => { if (!cancelled) setPedidos(r); })') },
          { id: 'p4', text: bi('return () => { cancelado = true; };', 'return () => { cancelled = true; };') },
          { id: 'p5', text: bi('}, [userId]);', '}, [userId]);') },
        ],
        correctOrderIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
        lockedPieceIds: ['p1', 'p2'],
        explanation: bi('La bandera de cancelación evita el aviso de setState sobre un componente desmontado y las condiciones de carrera cuando el usuario cambia rápido.', 'The cancellation flag avoids the setState-on-unmounted warning and race conditions when the user changes quickly.'),
        xp: 12,
      },
      {
        id: 'cd04-e08',
        format: 'discrimination',
        difficulty: 4,
        badge: bi('DISCRIMINAR', 'DISCRIMINATE'),
        prompt: bi(
          'Dos listas. (A) Lista de países que nunca se reordena ni se filtra. (B) Lista de tareas donde el usuario puede borrar, reordenar y cada fila tiene un input. ¿Dónde es grave usar key={index}?',
          'Two lists. (A) A country list that never reorders or filters. (B) A task list where the user can delete, reorder and each row has an input. Where is key={index} serious?'
        ),
        diagram: {
          kind: 'table',
          head: [bi('Lista', 'List'), bi('Se reordena', 'Reorders'), bi('Estado por fila', 'Per-row state')],
          rows: [
            ['A · países', 'no', 'no'],
            ['B · tareas', 'sí', 'sí (input)'],
          ],
          highlightRow: 1,
        },
        options: [
          opt('a', 'En las dos por igual', 'In both equally'),
          opt('b', 'En B: al reordenar o borrar, React reutiliza la fila equivocada y el texto del input aparece en otra tarea', 'In B: on reorder or delete, React reuses the wrong row and the input text appears on another task'),
          opt('c', 'En A, porque es más larga', 'In A, because it is longer'),
          opt('d', 'En ninguna, index es una key válida', 'In neither, index is a valid key'),
        ],
        correctOptionId: 'b',
        explanation: bi('La key importa cuando la lista cambia de orden o tamaño y las filas tienen estado propio. En A el daño es nulo; en B el usuario ve su texto en la tarea equivocada.', 'The key matters when the list changes order or size and rows have their own state. In A the damage is nil; in B the user sees their text on the wrong task.'),
        xp: 15,
      },
      {
        id: 'cd04-e09',
        format: 'numeric',
        difficulty: 3,
        badge: bi('CÁLCULO', 'CALCULATION'),
        prompt: bi(
          'Un componente renderiza 120 veces por minuto y cada render ejecuta una función de filtrado sobre 2 000 elementos que tarda 4 ms. ¿Cuántos milisegundos de trabajo inútil por minuto si memoizas y solo cambia 5 veces?',
          'A component renders 120 times a minute and each render runs a filter function over 2,000 items taking 4 ms. How many milliseconds of wasted work per minute if you memoise and it only changes 5 times?'
        ),
        answer: 460,
        tolerance: 5,
        unit: 'ms',
        formula: bi('(120 − 5) × 4', '(120 − 5) × 4'),
        explanation: bi('Sin memoizar: 120 × 4 = 480 ms. Con memoizar: 5 × 4 = 20 ms. Trabajo evitado: 460 ms por minuto, un 96%. Se memoiza lo caro y estable, no todo.', 'Without memoising: 120 × 4 = 480 ms. With memoising: 5 × 4 = 20 ms. Work avoided: 460 ms per minute, 96%. You memoise what is expensive and stable, not everything.'),
        xp: 12,
      },
      {
        id: 'cd04-e10',
        format: 'scenario',
        difficulty: 4,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi(
          'Tu app va lenta al teclear en un buscador que filtra 8 000 filas. ¿Cuál es la primera medida con mejor retorno?',
          'Your app is slow when typing in a search box that filters 8,000 rows. What is the first measure with the best return?'
        ),
        options: [
          opt('a', 'Envolver todo en React.memo', 'Wrap everything in React.memo'),
          opt('b', 'Limitar lo que se renderiza (paginación o virtualización) y derivar el filtro del estado en vez de recalcularlo en efectos', 'Limit what gets rendered (pagination or virtualisation) and derive the filter from state instead of recomputing it in effects'),
          opt('c', 'Mover el filtro a un useEffect con dependencias', 'Move the filter to a useEffect with dependencies'),
          opt('d', 'Usar useTransition en todo', 'Use useTransition everywhere'),
        ],
        correctOptionId: 'b',
        explanation: bi('8 000 nodos en el DOM es el coste real, no el cálculo. React.memo no ayuda si todo cambia. Virtualizar renderiza 30 filas y el problema desaparece.', '8,000 nodes in the DOM is the real cost, not the calculation. React.memo does not help if everything changes. Virtualising renders 30 rows and the problem disappears.'),
        xp: 15,
      },
      {
        id: 'cd04-e11',
        format: 'concept',
        difficulty: 5,
        badge: bi('CONCEPTO', 'CONCEPT'),
        prompt: bi('¿Qué es un stale closure?', 'What is a stale closure?'),
        options: [
          opt('a', 'Un componente que no se desmonta nunca', 'A component that never unmounts'),
          opt('b', 'Una función creada en un render que sigue leyendo los valores capturados en ese render aunque el estado haya cambiado', 'A function created in one render that keeps reading the values captured in that render even after the state changed'),
          opt('c', 'Un efecto sin función de limpieza', 'An effect without a cleanup function'),
          opt('d', 'Un estado que se pierde al recargar', 'A state lost on reload'),
        ],
        correctOptionId: 'b',
        explanation: bi('Es la causa del intervalo que imprime 0 y del handler que resta del valor viejo. Se combate con actualización funcional, dependencias correctas o una ref.', 'It is the cause of the interval printing 0 and the handler subtracting from an old value. It is fought with functional updates, correct dependencies or a ref.'),
        xp: 20,
      },
      {
        id: 'cd04-e12',
        format: 'scenario',
        difficulty: 2,
        badge: bi('CASO REAL', 'REAL CASE'),
        prompt: bi('Necesitas el total del carrito a partir de las líneas. ¿Dónde lo calculas?', 'You need the cart total from the lines. Where do you compute it?'),
        options: [
          opt('a', 'En otro useState que actualizas con useEffect cuando cambian las líneas', 'In another useState updated with useEffect when the lines change'),
          opt('b', 'Directamente durante el render: const total = lineas.reduce(...)', 'Directly during render: const total = lineas.reduce(...)'),
          opt('c', 'En un useEffect que llama a setTotal', 'In a useEffect calling setTotal'),
          opt('d', 'En el onClick de cada botón que modifica las líneas', 'In the onClick of every button that modifies the lines'),
        ],
        correctOptionId: 'b',
        explanation: bi('Es estado derivado: no necesita su propio estado. Guardarlo aparte crea dos fuentes de verdad que se pueden desincronizar y un render extra por cada cambio.', 'It is derived state: it does not need its own state. Storing it separately creates two sources of truth that can desynchronise and an extra render per change.'),
        xp: 10,
      },
      {
        id: 'cd04-e13',
        format: 'output',
        difficulty: 4,
        badge: bi('SALIDA', 'OUTPUT'),
        prompt: bi('¿Cuántas veces se ejecuta la función del componente en este flujo?', 'How many times does the component function run in this flow?'),
        context: {
          mono: true,
          content: 'onClick={() => {\n  setA(1);\n  setB(2);\n  setC(3);\n}}',
        },
        options: [
          opt('a', '3 veces, una por cada setState', '3 times, one per setState'),
          opt('b', '1 vez: React agrupa las actualizaciones dentro del mismo manejador de eventos', '1 time: React batches the updates within the same event handler'),
          opt('c', '2 veces', '2 times'),
          opt('d', 'Depende del orden de las llamadas', 'Depends on the call order'),
        ],
        correctOptionId: 'b',
        explanation: bi('Desde React 18 todas las actualizaciones se agrupan automáticamente, también en promesas y timeouts. Un handler con tres setState produce un solo render.', 'Since React 18 all updates are batched automatically, including in promises and timeouts. A handler with three setStates produces a single render.'),
        xp: 15,
      },
    ],
    recap: [
      bi('Renderizar es re-ejecutar la función entera; el estado es inmutable y se compara por referencia.', 'Rendering re-runs the whole function; state is immutable and compared by reference.'),
      bi('Las dependencias de useEffect deciden cuándo corre; lo que no declares se queda con el valor viejo.', 'useEffect dependencies decide when it runs; whatever you do not declare keeps the old value.'),
      bi('key estable para listas que cambian, y el estado derivado se calcula en el render, no en otro useState.', 'Stable key for lists that change, and derived state is computed in the render, not in another useState.'),
    ],
    actionMission: {
      id: 'mission-code-4',
      title: bi('Elimina una mutación de estado de tu app', 'Remove one state mutation from your app'),
      objective: bi('Busca en tu proyecto React un setState que pase el mismo objeto o array mutado y sustitúyelo por su versión inmutable.', 'Find in your React project a setState that passes the same mutated object or array and replace it with its immutable version.'),
      steps: [
        bi('Busca push, sort, splice, reverse y asignaciones directas cerca de un setState.', 'Search for push, sort, splice, reverse and direct assignments near a setState.'),
        bi('Sustituye por spread, map o filter según la operación.', 'Replace with spread, map or filter depending on the operation.'),
        bi('Comprueba que la pantalla se actualiza donde antes no lo hacía.', 'Check that the screen now updates where it did not before.'),
      ],
      proof: bi('Un caso documentado donde la UI no se actualizaba y ahora sí, con el diff de las dos versiones.', 'One documented case where the UI did not update and now does, with the diff of the two versions.'),
      affiliateToolSlug: 'vercel-platform',
      xpBonus: 25,
    },
  },
];

export const CODE_UNIT_1: Unit = {
  slug: 'code-unit-1',
  trackSlug: 'modern-coding',
  orderIndex: 1,
  title: bi('El lenguaje, de verdad', 'The language, for real'),
  description: bi(
    'JavaScript sin trampas, TypeScript que aporta y funciones que se leen una vez. La base sobre la que se construye todo lo demás.',
    'JavaScript without traps, TypeScript that contributes, and functions you read once. The base everything else is built on.'
  ),
  lessons: LESSONS,
};
