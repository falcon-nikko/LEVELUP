import type { Course } from "./types";
import { mc, tf, blank, multi, order, sim } from "./helpers";

export const splitProgramming: Course = {
  slug: "fundamentos",
  world: "programming",
  title: "Fundamentos de Programación",
  shortDescription: "Piensa como un programa, desde cero y sin jerga",
  description:
    "Programar es descomponer un problema en pasos que no admiten ambigüedad. Este primer bloque usa ejemplos de negocio reales para que cada concepto tenga un uso inmediato.",
  level: "beginner",
  outcome: "Puedes escribir un programa corto que toma datos, decide y calcula un resultado útil.",
  units: [
    {
      id: "pr-u1",
      title: "Tu primer programa",
      description: "Algoritmos, variables, condiciones y bucles con un objetivo final: una calculadora de margen.",
      objectives: [
        "Describir un problema como una secuencia de pasos",
        "Guardar y transformar datos con variables",
        "Tomar decisiones con condiciones y repetir con bucles",
      ],
      lessons: [
        {
          id: "pr-1-1",
          title: "Qué es programar de verdad",
          description: "Un algoritmo es una receta que no admite «más o menos».",
          theory:
            "Programar es escribir instrucciones tan precisas que una máquina sin criterio pueda ejecutarlas. Ahí está la dificultad y la ventaja: la máquina no interpreta, no perdona ambigüedades y no se cansa. Un algoritmo tiene tres partes: entrada (los datos), proceso (los pasos) y salida (el resultado). Cuando algo «no funciona», casi siempre es porque uno de los pasos admitía dos interpretaciones. El hábito más rentable que puedes desarrollar es escribir los pasos en lenguaje natural antes de escribir código: si no puedes explicarlo en cinco frases, no puedes programarlo.",
          keyIdea: "Entrada, proceso y salida. Si un paso es ambiguo, el programa falla.",
          action: "Escribe en 5 pasos cómo decides si un producto tiene margen suficiente.",
          xp: 20,
          minutes: 4,
          exercises: [
            mc("e1", "¿Qué tres partes tiene cualquier algoritmo?", [{ id: "a", text: "Lenguaje, compilador y ejecutable" }, { id: "b", text: "Entrada, proceso y salida" }, { id: "c", text: "Frontend, backend y base de datos" }], "b", "Todo programa transforma una entrada en una salida mediante un proceso."),
            tf("e2", "Un ordenador interpreta el contexto igual que una persona.", false, "Ejecuta exactamente lo que escribes. Por eso la precisión importa más que la intención."),
            order("e3", "Ordena los pasos para calcular el margen de un producto:", [{ id: "a", text: "Leer precio de venta y coste" }, { id: "b", text: "Restar coste al precio" }, { id: "c", text: "Dividir el margen entre el precio" }, { id: "d", text: "Mostrar el porcentaje" }], ["a", "b", "c", "d"], "Entrada, operación, normalización y salida. Ese patrón se repite en todo programa."),
            blank("e4", "Al conjunto ordenado de pasos que resuelve un problema se le llama ______.", ["algoritmo"], "Algoritmo: la receta. El lenguaje de programación es solo cómo se escribe."),
          ],
        },
        {
          id: "pr-1-2",
          title: "Variables: dar nombre a los datos",
          description: "Números, texto y booleanos. Y por qué el nombre importa.",
          theory:
            "Una variable es un nombre que apunta a un valor. En la práctica, un programa es un conjunto de nombres bien elegidos: si tienes que releer tu propio código dos veces para entenderlo, el problema son los nombres. Los tipos básicos son número, texto (string) y booleano (verdadero/falso). Elegir bien el tipo evita errores silenciosos: si guardas un precio como texto, «10» + «5» da «105» en lugar de 15. Y hay una regla de oro: el nombre debe decir qué contiene y en qué unidad, por ejemplo precio_venta_eur. Las unidades en el nombre son el detalle que evita el bug más caro de todos: confundir céntimos con euros.",
          keyIdea: "El nombre de una variable es documentación gratuita. Incluye la unidad.",
          action: "Renombra tres variables de tu código o de tu hoja para que incluyan la unidad.",
          xp: 20,
          minutes: 4,
          exercises: [
            mc("e1", "precio = «10» y precio + «5». ¿Resultado en la mayoría de lenguajes con texto?", [{ id: "a", text: "15" }, { id: "b", text: "«105»" }, { id: "c", text: "Error siempre" }], "b", "Concatena. Mezclar tipos produce resultados correctos sintácticamente y falsos semánticamente: el peor tipo de bug."),
            mc("e2", "¿Cuál es el mejor nombre para el precio final de un producto en euros?", [{ id: "a", text: "p" }, { id: "b", text: "precio" }, { id: "c", text: "precio_venta_eur" }, { id: "d", text: "dato1" }], "c", "Incluye qué es y en qué unidad. «precio» obliga a adivinar si son euros o céntimos."),
            blank("e3", "El tipo de dato que solo puede ser verdadero o falso se llama ______.", ["booleano", "boolean", "lógico", "logico"], "Booleano: la base de toda decisión en un programa."),
            tf("e4", "En un programa, el mismo dato puede guardarse en dos variables con nombres distintos.", true, "Sí, y es una fuente habitual de inconsistencias: una se actualiza y la otra no. Mejor una sola fuente de verdad."),
          ],
        },
        {
          id: "pr-1-3",
          title: "Condiciones: decidir sin ambigüedad",
          description: "if, else y los operadores que convierten datos en decisiones.",
          theory:
            "Una condición evalúa una expresión y elige un camino. Los operadores fundamentales son igualdad (==), mayor y menor (> <), y los lógicos Y (&&), O (||) y NO (!). La regla 3x del dropshipping se convierte en una línea: if (precio_venta_eur >= coste_aterrizado_eur * 3). Ahora bien, el error más común es olvidar los casos límite: ¿qué pasa si el coste es 0? ¿Y si el precio es negativo por un error de entrada? Un programa robusto valida la entrada antes de decidir. Y en cuanto hay tres o más ramas, es mejor una estructura ordenada que una cadena de ifs anidados: se lee mejor y se prueba mejor.",
          keyIdea: "Valida la entrada antes de decidir. Los casos límite son donde vive el dinero.",
          action: "Escribe la condición de la regla 3x con el caso «coste = 0» resuelto.",
          xp: 25,
          minutes: 5,
          exercises: [
            mc("e1", "¿Qué devuelve 10 >= 3 * 3?", [{ id: "a", text: "true" }, { id: "b", text: "false" }, { id: "c", text: "10" }], "a", "3 × 3 = 9 y 10 ≥ 9, así que verdadero. La regla 3x se cumple."),
            mc("e2", "Coste aterrizado 0 €, precio 30 €. Con la condición precio >= coste * 3, ¿qué ocurre?", [{ id: "a", text: "Falla y se descarta el producto" }, { id: "b", text: "Se cumple trivialmente porque 0 × 3 = 0" }, { id: "c", text: "Da error de división" }], "b", "Caso límite: cualquier precio ≥ 0 pasa. Si el coste puede ser 0 por un dato ausente, hay que validarlo antes."),
            blank("e3", "Para exigir que se cumplan dos condiciones a la vez se usa el operador lógico ___ (en inglés).", ["and", "y", "&&"], "AND: ambas verdaderas. OR basta con una."),
            order("e4", "Ordena esta validación de entrada lógicamente:", [{ id: "a", text: "Comprobar que el coste es mayor que 0" }, { id: "b", text: "Comprobar que el precio es mayor que 0" }, { id: "c", text: "Calcular el ratio precio/coste" }, { id: "d", text: "Decidir si el ratio es al menos 3" }], ["a", "b", "c", "d"], "Valida antes de calcular: dividir entre cero rompe el programa."),
          ],
        },
        {
          id: "pr-1-4",
          title: "Bucles y tu calculadora de margen",
          description: "Repetir sin copiar y pegar. Proyecto final del bloque.",
          theory:
            "Un bucle ejecuta lo mismo sobre muchos datos. En vez de calcular el margen de 40 productos a mano, recorres la lista. Dos formas: repetir un número fijo de veces (for) o repetir mientras se cumpla una condición (while). El peligro del while es el bucle infinito: si la condición nunca deja de ser verdadera, el programa se cuelga. La regla es que dentro del bucle algo debe acercarte a la salida. Con lo aprendido ya puedes construir la herramienta del bloque: leer una lista de productos con su coste y su precio, calcular el margen de cada uno, filtrar los que no cumplen la regla 3x y mostrar solo los rentables. Eso no es un ejercicio académico: es lo que hace un analista de e-commerce en su primer día.",
          keyIdea: "Un bucle sustituye la copia por el criterio: mismo código, todos los datos.",
          action: "Escribe el pseudocódigo de tu calculadora de margen para 10 productos.",
          xp: 30,
          minutes: 5,
          exercises: [
            mc("e1", "¿Cuándo es más apropiado un while que un for?", [{ id: "a", text: "Cuando sabes exactamente cuántas veces repetir" }, { id: "b", text: "Cuando repites hasta que se cumpla una condición" }, { id: "c", text: "Cuando quieres ejecutar una sola vez" }], "b", "for: número conocido de iteraciones. while: condición de salida."),
            mc("e2", "¿Qué provoca un bucle infinito?", [{ id: "a", text: "Que la condición de salida nunca se vuelva falsa" }, { id: "b", text: "Usar for en lugar de while" }, { id: "c", text: "Tener muchos datos" }], "a", "Si nada dentro del bucle modifica la condición, se ejecuta para siempre."),
            order("e3", "Ordena la calculadora de margen completa:", [{ id: "a", text: "Leer la lista de productos" }, { id: "b", text: "Recorrer cada producto" }, { id: "c", text: "Calcular el ratio precio/coste" }, { id: "d", text: "Descartar los que no llegan a 3x" }, { id: "e", text: "Mostrar los rentables ordenados por margen" }], ["a", "b", "c", "d", "e"], "Lectura, recorrido, cálculo, filtro y presentación: el esqueleto de casi cualquier herramienta de datos."),
            blank("e4", "Un producto cuesta 8 € puesto en casa y se vende a 31 €. El ratio es ____ (un decimal).", ["3.9", "3,9", "3.8", "3,8"], "31 / 8 = 3,9x. Cumple la regla 3x y deja unos 8 € para adquirir cada cliente."),
          ],
        },
      ],
    },
  ],
};
