import type { Course } from "./types";
import { mc, tf, blank, multi, order, sim } from "./helpers";

export const splitStartup: Course = {
  slug: "validar-startup",
  world: "business",
  title: "De idea a primeros clientes",
  shortDescription: "Valida tu idea con dinero real, no con opiniones",
  description:
    "El 80% del trabajo de una startup en su primer año es descubrir qué está dispuesto a pagar alguien. Este curso enseña el método: hipótesis, entrevistas, pre-venta y lanzamiento mínimo.",
  level: "beginner",
  outcome: "Una idea validada con 3 pagos reales y un MVP de una semana.",
  units: [
    {
      id: "st-u1",
      title: "Validar antes de construir",
      description: "Cómo sustituir la intuición por evidencia en 14 días.",
      objectives: [
        "Formular una hipótesis falsable",
        "Entrevistar sin dirigir las respuestas",
        "Conseguir un pago antes de construir",
      ],
      lessons: [
        {
          id: "st-1-1",
          title: "Tu idea no es una hipótesis",
          description: "Cómo convertir una intuición en algo que se puede demostrar falso.",
          theory:
            "«A la gente le cuesta organizar sus finanzas» no es una hipótesis: es una observación que nadie va a negar. Una hipótesis falsable tiene siempre la misma forma: creo que [un segmento concreto] hará [una acción observable] porque [un motivo], y lo sabré si [una métrica con umbral y plazo]. Ejemplo: «creo que 10 de cada 100 estudiantes de programación pagarían 9 €/mes por prácticas corregidas semanalmente, y lo sabré si consigo 10 pagos en 21 días». Fíjate en la diferencia: hay segmento, acción, motivo, umbral y plazo. Si al terminar el plazo no se cumple, no es un fracaso: es información. El objetivo no es tener razón, es aprender rápido y barato.",
          keyIdea: "Sin umbral ni plazo no hay hipótesis: hay una opinión con fecha de caducidad indefinida.",
          action: "Reescribe tu idea como hipótesis con segmento, acción, umbral y plazo.",
          xp: 25,
          minutes: 5,
          exercises: [
            mc("e1", "¿Cuál es una hipótesis falsable?", [{ id: "a", text: "A la gente le gusta ahorrar" }, { id: "b", text: "10 de cada 100 profesores pagarían 15 €/mes por corrección con IA y lo sabré si logro 10 pagos en 21 días" }, { id: "c", text: "El mercado de la educación crece cada año" }], "b", "Tiene segmento, umbral, plazo y una acción medible. Se puede fallar."),
            multi("e2", "¿Qué debe incluir una hipótesis?", [{ id: "a", text: "Segmento concreto" }, { id: "b", text: "Acción observable" }, { id: "c", text: "Umbral de éxito" }, { id: "d", text: "Un logo bonito" }], ["a", "b", "c"], "Segmento, acción y umbral. El logo es cosmética."),
            blank("e3", "Una hipótesis que puede demostrarse falsa se llama hipótesis ______.", ["falsable", "refutable", "contrastable"], "Si ninguna evidencia posible podría contradecirla, no sirve para aprender."),
            tf("e4", "Que tu hipótesis falle es un fracaso del proyecto.", false, "Es el sistema funcionando: descartas una vía por poco dinero en lugar de descubrirlo con meses y 10.000 €."),
          ],
        },
        {
          id: "st-1-2",
          title: "Entrevistas que no mienten",
          description: "El problema de hablar del futuro con desconocidos educados.",
          theory:
            "El error más común en entrevistas de validación es preguntar «¿usarías esto?». La gente miente por amabilidad y, peor, miente sin saberlo: la intención declarada predice mal la conducta. La solución es preguntar por el pasado y por hechos concretos: la última vez que tuviste este problema, ¿qué hiciste?, ¿cuánto te costó?, ¿qué probaste antes?, ¿lo pagaste tú o tu empresa? Ocho a doce entrevistas de 20 minutos con quienes sufren el problema bastan para ver patrones. Y hay una regla de oro: si el entrevistado no ha intentado resolver el problema con sus propios medios, probablemente no era un problema suficientemente doloroso como para pagar por resolverlo.",
          keyIdea: "Habla de lo que la gente hizo, no de lo que dice que haría.",
          action: "Escribe 6 preguntas sobre el pasado para tus próximas entrevistas.",
          xp: 25,
          minutes: 5,
          exercises: [
            mc("e1", "¿Qué pregunta es más útil en una entrevista de validación?", [{ id: "a", text: "¿Comprarías una app que te ayudase a estudiar?" }, { id: "b", text: "¿Cuándo fue la última vez que dejaste un curso a medias y por qué?" }, { id: "c", text: "¿Te gusta aprender?" }], "b", "Pregunta por un hecho pasado y concreto; la opinión hipotética no es evidencia."),
            order("e2", "Ordena una entrevista de problema:", [{ id: "a", text: "Contexto: cuéntame tu rutina de estudio" }, { id: "b", text: "Incidente: cuándo fue la última vez que falló" }, { id: "c", text: "Coste: qué hiciste y cuánto te costó" }, { id: "d", text: "Intentos previos: qué probaste antes" }], ["a", "b", "c", "d"], "De lo general al hecho concreto: cada capa desciende del relato a la evidencia."),
            blank("e3", "Una señal fuerte de que el problema es real es que la persona ya haya ______ por resolverlo.", ["pagado", "intentado", "gastado", "invertido"], "El intento previo demuestra que el problema pasó el filtro de la pereza."),
            tf("e4", "Preguntar «¿pagarías 9 € al mes?» y recibir un sí es una validación suficiente.", false, "Es intención declarada. Solo el pago real (o una pre-venta) valida disposición a pagar."),
          ],
        },
        {
          id: "st-1-3",
          title: "Pre-venta: la única validación honesta",
          description: "Cómo pedir dinero por algo que aún no existe.",
          theory:
            "La pre-venta es incómoda precisamente porque funciona: si alguien saca la tarjeta por algo que todavía no está construido, tienes la prueba más fuerte de que existe demanda. Se hace con una landing con una promesa concreta, un precio real y una fecha de entrega creíble, y una sola llamada a la acción: reservar plaza. Para que sea honesta, hay que devolver el dinero sin preguntas si no cumples la fecha. Un umbral razonable para seguir es el 2-5% de conversión sobre visitantes cualificados, o un número absoluto que cubra costes del piloto. Lo que no vale como validación: pedir emails, deseos guardados, encuestas o «me interesa». Todo eso mide curiosidad; el pago mide prioridad.",
          keyIdea: "La gente miente gratis. Con su dinero, no.",
          action: "Define tu precio y tu promesa en una frase que puedas poner online hoy.",
          xp: 30,
          minutes: 5,
          exercises: [
            mc("e1", "¿Cuál es la señal de validación más fuerte?", [{ id: "a", text: "200 personas apuntadas a la lista de espera" }, { id: "b", text: "3 personas que pagan 9 € por algo que entregarás en 4 semanas" }, { id: "c", text: "50 respuestas a una encuesta diciendo «me interesa»" }], "b", "El dinero es la única señal de prioridad. La lista de espera es una señal débil y fácil de inflar."),
            multi("e2", "¿Qué debe incluir una pre-venta honesta?", [{ id: "a", text: "Una promesa concreta y medible" }, { id: "b", text: "Un precio real" }, { id: "c", text: "Una fecha de entrega creíble" }, { id: "d", text: "Una política de devolución sin preguntas" }], ["a", "b", "c", "d"], "Si falta la devolución, la pre-venta se convierte en una trampa y destruye la marca."),
            blank("e3", "Una conversión razonable en una landing de pre-venta con tráfico cualificado está entre el 2% y el __%.", ["5", "cinco", "6", "4"], "Por encima del 5% con tráfico frío desconfía: mide la muestra antes de celebrar."),
            sim("e4", "Llevas 14 días, 400 visitas y 2 pagos. ¿Qué haces?", [{ id: "a", text: "Construir la app completa" }, { id: "b", text: "Hablar con los 2 que pagaron y con 20 visitantes que no compraron, y ajustar la promesa" }, { id: "c", text: "Meter 1.000 € en anuncios" }], "b", "Con pocos pagos hay que entender el «no» antes de invertir más. Los 2 pagos son tu activo más valioso."),
          ],
        },
        {
          id: "st-1-4",
          title: "MVP de una semana y primeros 3 clientes",
          description: "Lo mínimo que entrega el resultado prometido. Ni una pantalla más.",
          theory:
            "Un MVP no es una versión pequeña de tu producto soñado: es el experimento más barato que entrega la promesa de la pre-venta. Para LEVELUP, ese MVP no era la app completa de Duolingo: era un currículo de 3 cursos, un test de 5 minutos y un grupo con un mentor. Si el valor está en el resultado (que aprendan algo concreto y lo apliquen), el software es infraestructura, no el producto. La pregunta que decide el alcance es: ¿puedo entregar la promesa esta semana usando herramientas que ya existen, hojas de cálculo, un chat y mi propio trabajo manual? Si la respuesta es sí, no construyas nada más todavía.",
          keyIdea: "Si puedes entregarlo a mano, hazlo a mano. El software llega después de la demanda.",
          action: "Escribe el MVP en una lista de máximo 5 pasos ejecutables en 7 días.",
          xp: 30,
          minutes: 5,
          exercises: [
            mc("e1", "¿Qué es un MVP?", [{ id: "a", text: "La versión 1.0 completa pero con menos colores" }, { id: "b", text: "El experimento más barato que entrega la promesa hecha al cliente" }, { id: "c", text: "Una app con solo login y pantalla de inicio" }], "b", "Se define por la promesa, no por el número de pantallas."),
            order("e2", "Ordena un MVP de 7 días:", [{ id: "a", text: "Definir la promesa exacta que se entrega" }, { id: "b", text: "Elegir herramientas que ya existan" }, { id: "c", text: "Entregar a 3 clientes a mano" }, { id: "d", text: "Recoger su resultado y su testimonio" }], ["a", "b", "c", "d"], "Promesa, herramientas, entrega manual y evidencia. Sin el último paso solo tienes trabajo, no aprendizaje."),
            blank("e3", "Entregar el servicio manualmente antes de automatizarlo se llama operar como ______.", ["servicio", "concierge", "artesano", "manual"], "Modelo concierge: valida la demanda antes de invertir en producto."),
            tf("e4", "Para lanzar un MVP de educación necesitas tener la app móvil publicada.", false, "No. Un currículo en una hoja de cálculo y una llamada semanal pueden entregar más valor que una app sin contenido."),
          ],
        },
      ],
    },
  ],
};
