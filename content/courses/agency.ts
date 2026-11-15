import type { Course } from "./types";
import { mc, tf, blank, multi, order, sim } from "./helpers";

export const splitAgency: Course = {
  slug: "digital-agency-aaa",
  world: "business",
  title: "Agencia Digital B2B",
  shortDescription: "Cierra tu primer cliente de 1.000 €/mes sin equipo",
  description:
    "Una agencia de una persona puede facturar más que una tienda de e-commerce, con menos riesgo. El curso se centra en lo único que importa al principio: una oferta de nicho y un proceso de venta que no dependa de la suerte.",
  level: "beginner",
  outcome: "Una oferta de nicho definida, una lista de 50 prospectos y un guion de llamada de 20 minutos.",
  units: [
    {
      id: "ag-u1",
      title: "Cierra tu primer cliente B2B",
      description: "De la habilidad suelta a un contrato mensual.",
      objectives: [
        "Construir una oferta de nicho en una frase",
        "Generar una lista de prospectos con criterio",
        "Dirigir una llamada de diagnóstico de 20 minutos",
      ],
      lessons: [
        {
          id: "ag-1-1",
          title: "La oferta de nicho en una frase",
          description: "Cómo dejar de ser «el que hace webs» y empezar a ser la solución de alguien.",
          theory:
            "Una agencia generalista compite con todo el mundo y no puede cobrar caro. Una agencia de nicho compite con casi nadie y puede cobrar por resultado. La fórmula de la oferta es: resultado medible para un tipo de cliente concreto, en un plazo, sin el miedo principal de ese cliente. Ejemplo: «Consigo 15 citas cualificadas al mes para clínicas dentales de Madrid, sin que tengan que hacer prospección en frío». Fíjate en lo que hace: no menciona tecnología, dice resultado; no dice «empresas», dice un tipo concreto; y desactiva la objeción antes de que aparezca. Cuanto más estrecha la oferta, más fácil es que alguien diga «eso es exactamente lo que necesito».",
          keyIdea: "Si tu oferta sirve para todos, no es una oferta: es un catálogo.",
          action: "Escribe tu oferta con la fórmula resultado + cliente + plazo + objeción desactivada.",
          xp: 25,
          minutes: 5,
          exercises: [
            mc("e1", "¿Cuál de estas es una oferta de nicho?", [{ id: "a", text: "Hacemos webs y marketing digital para empresas" }, { id: "b", text: "Llenamos la agenda de fisioterapeutas con 20 pacientes nuevos al mes, sin que hagan publicidad" }, { id: "c", text: "Automatizamos procesos con IA" }], "b", "Cliente concreto, resultado medible, plazo implícito y objeción desactivada."),
            multi("e2", "¿Qué debilita tu oferta de nicho?", [{ id: "a", text: "Incluye cinco servicios distintos" }, { id: "b", text: "Promete un resultado medible" }, { id: "c", text: "No especifica el tipo de cliente" }, { id: "d", text: "Se apoya en una garantía de resultados" }], ["a", "c"], "Dispersión y ambigüedad. Los resultados y las garantías refuerzan la oferta; el catálogo la diluye."),
            blank("e3", "Cobrar por resultado en lugar de por horas se llama precio basado en ______.", ["valor", "resultado", "resultados"], "Pricing basado en valor: el precio se ancla al beneficio del cliente, no al tiempo que tardas."),
            sim("e4", "Un dentista te dice: «todos los meses me llaman agencias como tú». ¿Qué respondes?", [{ id: "a", text: "Bajo el precio para diferenciarme" }, { id: "b", text: "«Precisamente por eso: ¿cuántas de esas llamadas te han traído 15 citas nuevas? Te enseño cómo lo medimos.»" }, { id: "c", text: "Le envío un PDF de 30 páginas con mi portfolio" }], "b", "Rediriges la conversación de «otro proveedor» a «resultado medible». Es la única diferencia que el cliente compra."),
          ],
        },
        {
          id: "ag-1-2",
          title: "50 prospectos con criterio",
          description: "La lista que hace que la prospección no sea spam.",
          theory:
            "La prospección en frío falla cuando el mensaje podría enviarse a cualquiera. Funciona cuando demuestra que has mirado. Construye una lista de 50 empresas con cuatro filtros: encajan en el nicho, tienen señal de que ya invierten (web actualizada, anuncios activos, contratando), hay una persona identificable con poder de decisión, y puedes encontrar un detalle específico que personalizar. Después, un mensaje de 90 palabras: contexto específico, problema observado, prueba de que lo has resuelto, y una pregunta de bajo compromiso. No vendas en el primer mensaje: pide una conversación de 15 minutos. La tasa de respuesta de un mensaje bien personalizado es un orden de magnitud mayor que la del envío masivo.",
          keyIdea: "La personalización no es cortesía: es la única prueba de que no eres spam.",
          action: "Construye 50 filas con empresa, persona, señal de inversión y detalle específico.",
          xp: 25,
          minutes: 5,
          exercises: [
            order("e1", "Ordena los filtros de la lista antes de escribir a nadie:", [{ id: "a", text: "Encaja en el nicho" }, { id: "b", text: "Señal de que ya invierte o crece" }, { id: "c", text: "Decisor identificable" }, { id: "d", text: "Detalle específico personalizable" }], ["a", "b", "c", "d"], "Filtrar en ese orden descarta rápido: si no encaja en el nicho, el resto da igual."),
            mc("e2", "¿Cuál es el objetivo del primer mensaje en frío?", [{ id: "a", text: "Cerrar el contrato" }, { id: "b", text: "Enviar la propuesta" }, { id: "c", text: "Conseguir una conversación corta" }, { id: "d", text: "Presentar la empresa" }], "c", "El primer mensaje vende una conversación, no un servicio."),
            blank("e3", "Un mensaje en frío debería ocupar alrededor de ___ palabras.", ["90", "noventa", "100", "80"], "Corto: el decisor lo lee en el móvil entre reuniones."),
            tf("e4", "Enviar 1.000 mensajes genéricos suele dar mejor resultado que 50 personalizados.", false, "Además de convertir peor, daña tu dominio y tu marca. La personalización escala mucho mejor cuando se hace bien."),
          ],
        },
        {
          id: "ag-1-3",
          title: "La llamada de 20 minutos",
          description: "Diagnóstico antes de propuesta. Nunca al revés.",
          theory:
            "El error clásico es enviar una propuesta antes de entender el problema. En una llamada de diagnóstico de 20 minutos solo hay cuatro bloques: situación actual («¿cómo consigues clientes hoy?»), problema medible («¿cuántas citas al mes necesitas para que salga rentable?»), coste del problema («¿qué te cuesta un mes sin agenda llena?») y criterios de decisión («si esto funcionara, ¿cómo sabríamos medirlo?»). Hablas tú un tercio del tiempo. Si al final no puedes repetir el problema con sus palabras, no ha habido reunión: ha habido presentación. Y no propongas precio en esa llamada: lo que dices sin preparación se convierte en un ancla de la que luego no puedes subir.",
          keyIdea: "Quien hace las preguntas controla la venta.",
          action: "Escribe las 6 preguntas de tu llamada de diagnóstico y practícalas con alguien.",
          xp: 30,
          minutes: 5,
          exercises: [
            mc("e1", "El cliente pregunta el precio en el minuto 3. ¿Qué haces?", [{ id: "a", text: "Le doy una cifra para no perderlo" }, { id: "b", text: "«Depende del alcance; para darte el número correcto necesito entender X. ¿Me cuentas...?»" }, { id: "c", text: "Le envío la tarifa por email" }], "b", "Ancla el precio al alcance y recuperas el diagnóstico sin decir que no."),
            multi("e2", "¿Qué pertenece a una llamada de diagnóstico?", [{ id: "a", text: "Situación actual del cliente" }, { id: "b", text: "Coste económico del problema" }, { id: "c", text: "Demostración de todas tus herramientas" }, { id: "d", text: "Criterios de decisión y de éxito" }], ["a", "b", "d"], "Presentar herramientas es una demo: convierte cuando ya hay problema reconocido, no antes."),
            blank("e3", "Si no puedes repetir el problema con las palabras del cliente, no tienes diagnóstico: tienes una ______.", ["presentación", "presentacion", "demo"], "El diagnóstico se demuestra parafraseando, no asintiendo."),
            sim("e4", "El cliente dice «parece caro». Tu proyecto cuesta 1.200 €/mes y su ticket medio es 400 €. ¿Qué dices?", [{ id: "a", text: "«Te hago un 20% de descuento»" }, { id: "b", text: "«Caro comparado con qué. Con 3 clientes nuevos al mes, esto se paga solo. ¿Cuántos necesitas para cubrirlo?»" }, { id: "c", text: "«Es lo que cobra el mercado»" }], "b", "Traducir el precio a unidades del negocio del cliente desactiva la objeción sin destruir margen."),
          ],
        },
        {
          id: "ag-1-4",
          title: "Propuesta, precio y primer contrato",
          description: "Cómo cerrar sin regalar el trabajo.",
          theory:
            "Una propuesta buena tiene una página: el problema con sus palabras, el resultado comprometido con una métrica, el plazo, el precio con dos opciones y qué necesitas de ellos para empezar. Las dos opciones desplazan la decisión de «sí o no» a «cuál». Elige el formato de cobro pensando en el riesgo: proyecto cerrado para lo desconocido, retainer mensual para lo recurrente. Y protege el alcance con una frase explícita: «incluye X; cualquier cosa fuera de X se cotiza aparte». Sin eso, el primer cliente pequeño se convierte en consultoría infinita y pierdes margen y energía.",
          keyIdea: "La propuesta vende un resultado con límites, no una disponibilidad ilimitada.",
          action: "Monta tu plantilla de propuesta de una página con dos opciones de precio.",
          xp: 30,
          minutes: 5,
          exercises: [
            mc("e1", "¿Por qué presentar dos opciones de precio?", [{ id: "a", text: "Para parecer más barato" }, { id: "b", text: "Porque desplaza la decisión de comprar o no a elegir cuál" }, { id: "c", text: "Para confundir al cliente" }], "b", "Efecto de elección: comparar dos opciones es más fácil que aceptar o rechazar una."),
            blank("e2", "El cobro recurrente mensual por un servicio continuado se llama ______.", ["retainer", "igualatorio", "suscripción", "suscripcion", "abono"], "Retainer: previsibilidad de ingresos, que es lo que permite escalar con tranquilidad."),
            multi("e3", "¿Qué debe incluir la propuesta de una página?", [{ id: "a", text: "El problema con las palabras del cliente" }, { id: "b", text: "El resultado con una métrica y un plazo" }, { id: "c", text: "Tu biografía completa" }, { id: "d", text: "Los límites del alcance" }], ["a", "b", "d"], "La propuesta se centra en el cliente. La biografía va en el pie, si acaso."),
            tf("e4", "Aceptar un primer cliente muy por debajo de precio para «hacer portfolio» es una buena estrategia.", false, "Fija un ancla de precio bajo que arrastra a los siguientes clientes y atrae al perfil más exigente. Mejor precio justo con alcance reducido."),
          ],
        },
      ],
    },
  ],
};
