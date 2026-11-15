import type { Course } from "./types";
import { mc, tf, blank, multi, order, sim } from "./helpers";

export const splitMissions: Course = {
  slug: "misiones-nivel-1",
  world: "business",
  title: "Misiones: tu primera semana",
  shortDescription: "12 retos para convertir lo aprendido en un entregable real",
  description:
    "Aprender sin ejecutar no genera ingresos. Estas 12 misiones están ordenadas como las haría un fundador solo: primero elegir el terreno, luego ofrecer, luego entregar, luego pedir dinero.",
  level: "beginner",
  outcome: "Un entregable publicado, una oferta enviada y una conversación de venta agendada.",
  units: [
    {
      id: "ms-u1",
      title: "Elige tu terreno",
      description: "Misiones 1-3: decidir dónde juegas y a quién sirves.",
      objectives: ["Elegir un nicho", "Escribir tu oferta en una frase", "Definir una métrica de éxito"],
      lessons: [
        {
          id: "ms-1-1",
          title: "Misión 1: elige un nicho en 20 minutos",
          description: "Tres preguntas que descartan el 90% de las ideas.",
          theory:
            "Elegir nicho no es una decisión para siempre: es la hipótesis de trabajo que te permite empezar. Tres filtros eliminan casi todo: (1) ¿Hay gente que ya paga por resolver esto? Si nadie paga, no hay mercado que validar, hay que educar. (2) ¿Puedo llegar a 50 de esas personas esta semana sin anuncios? Si no puedes construir la lista, no puedes vender. (3) ¿Puedo entregar el resultado yo solo en una semana? Si necesita un equipo, no es una primera misión. La intersección de esos tres filtros suele ser un nicho pequeño, con presupuesto y con una comunidad accesible: despachos profesionales, clínicas, tiendas locales, creadores con audiencia. El nicho correcto no es el más grande: es el que puedes alcanzar y servir.",
          keyIdea: "Nicho correcto = alguien que ya paga + accesible + entregable por ti.",
          action: "Escribe tu nicho y las 3 razones por las que pasas los tres filtros.",
          xp: 30,
          minutes: 5,
          exercises: [
            mc("e1", "¿Qué filtro descartaría antes un nicho?", [{ id: "a", text: "Que el mercado sea pequeño" }, { id: "b", text: "Que nadie pague aún por resolver el problema" }, { id: "c", text: "Que haya competencia" }], "b", "Competencia significa mercado validado. Que nadie pague significa que hay que crear la categoría: demasiado caro para empezar."),
            multi("e2", "¿Qué hace bueno a un nicho para empezar solo?", [{ id: "a", text: "Tiene presupuesto asignado" }, { id: "b", text: "Es accesible sin publicidad" }, { id: "c", text: "Puedes entregar el resultado tú mismo" }, { id: "d", text: "Es el mercado más grande posible" }], ["a", "b", "c"], "Alcance, presupuesto y capacidad de entrega. El tamaño es lo último que importa al principio."),
            blank("e3", "A la intersección entre lo que sabes hacer, lo que alguien paga y lo que puedes alcanzar se le suele llamar tu ______.", ["nicho", "ventaja", "enfoque", "círculo"], "Nicho: la intersección que te permite empezar esta semana."),
            tf("e4", "Elegir nicho es una decisión irreversible.", false, "Es una hipótesis. Si no hay tracción en 30 días, se cambia de nicho manteniendo la habilidad."),
          ],
        },
        {
          id: "ms-1-2",
          title: "Misión 2: tu oferta en una frase",
          description: "El test de «¿me lo compraría mi madre?».",
          theory:
            "Una oferta se entiende o no se entiende: no hay término medio. El test más rápido es leerla en voz alta a alguien ajeno a tu negocio y comprobar si puede repetirla. La fórmula completa es: ayudo a [cliente concreto] a conseguir [resultado medible] en [plazo] sin [objeción principal]. Si necesitas tres frases para explicarla, no está lista. Y hay una prueba final demoledoramente práctica: ¿tú mismo pagarías por eso lo que vas a cobrar? Si dudas, no es que el mercado sea difícil: es que la oferta no está resuelta. Ajusta el resultado o el alcance hasta que la respuesta sea un sí sin matices.",
          keyIdea: "Si no puedes decir tu oferta en una frase, el cliente tampoco puede comprarla.",
          action: "Escribe la oferta con la fórmula completa y léela a 3 personas ajenas.",
          xp: 30,
          minutes: 4,
          exercises: [
            order("e1", "Ordena la fórmula de la oferta:", [{ id: "a", text: "Ayudo a [cliente]" }, { id: "b", text: "a conseguir [resultado]" }, { id: "c", text: "en [plazo]" }, { id: "d", text: "sin [objeción]" }], ["a", "b", "c", "d"], "Cliente, resultado, plazo y objeción desactivada: cuatro piezas, ninguna opcional."),
            mc("e2", "Tu oferta ocupa tres frases y nadie sabe repetirla. ¿Qué haces?", [{ id: "a", text: "Añadir una cuarta frase explicativa" }, { id: "b", text: "Reducir el alcance hasta que quepa en una frase" }, { id: "c", text: "Cambiar el logo" }], "b", "La longitud es un síntoma de falta de foco, no de falta de explicación."),
            blank("e3", "El test definitivo de una oferta es que tú mismo ______ por ella el precio que vas a cobrar.", ["pagarías", "pagarias", "comprarías", "comprarias"], "Si no la comprarías, estás vendiendo algo que no has validado ni contigo mismo."),
            tf("e4", "Una oferta dirigida a todo el mundo suele convertir mejor porque abarca más mercado.", false, "Abarcar más diluye el mensaje: la conversión cae aunque el mercado sea mayor."),
          ],
        },
        {
          id: "ms-1-3",
          title: "Misión 3: define tu número",
          description: "Sin métrica, el progreso es una sensación.",
          theory:
            "Cada semana debe tener un número que responda «¿voy mejor?». No vale «trabajar mucho»: vale una cifra de actividad (mensajes enviados, entrevistas hechas, entregables publicados) y una de resultado (pagos, clientes, retención). Al principio manda la actividad, porque el embudo aún no tiene volumen para leer conversiones. La regla práctica es elegir una sola métrica principal por semana y revisarla el mismo día a la misma hora. Ese ritual evita dos enfermedades frecuentes: la ilusión de progreso por estar ocupado, y el abandono prematuro de algo que estaba empezando a funcionar.",
          keyIdea: "Una métrica por semana, revisada el mismo día a la misma hora.",
          action: "Elige tu métrica de la semana y pon una alarma para revisarla el viernes.",
          xp: 25,
          minutes: 4,
          exercises: [
            mc("e1", "Primera semana sin embudo con volumen. ¿Qué métrica sigues?", [{ id: "a", text: "Tasa de conversión de la landing" }, { id: "b", text: "Número de conversaciones cualificadas mantenidas" }, { id: "c", text: "Beneficio neto" }], "b", "Con poco tráfico las tasas son ruido. Mide actividad que puedas controlar."),
            multi("e2", "¿Qué evita tener una métrica semanal clara?", [{ id: "a", text: "Confundir estar ocupado con avanzar" }, { id: "b", text: "Abandonar algo que empezaba a funcionar" }, { id: "c", text: "Tener que hablar con clientes" }], ["a", "b"], "La métrica es un espejo: impide autoengañarse en las dos direcciones."),
            blank("e3", "Una métrica que puedes mover directamente con tu esfuerzo (mensajes, llamadas) se llama métrica de ______.", ["actividad", "entrada", "proceso"], "Actividad primero, resultado después: el embudo necesita volumen antes de dar tasas."),
            sim("e4", "Llevas 3 semanas con la misma métrica sin mejorar. ¿Qué haces?", [{ id: "a", text: "Cambiar de métrica para ver algo mejor" }, { id: "b", text: "Revisar qué estás haciendo exactamente y cambiar una sola palanca" }, { id: "c", text: "Esperar dos meses más" }], "b", "Cambiar la métrica es maquillaje. Cambiar una palanca es experimentación."),
          ],
        },
      ],
    },
    {
      id: "ms-u2",
      title: "Sal al mercado",
      description: "Misiones 4-7: lista, mensajes, conversaciones y propuesta.",
      objectives: ["Construir una lista de 50", "Enviar 20 mensajes personalizados", "Hacer 3 llamadas", "Enviar 1 propuesta"],
      lessons: [
        {
          id: "ms-2-1",
          title: "Misión 4: 50 nombres, no 5.000 seguidores",
          description: "La lista es el activo, no la audiencia.",
          theory:
            "Una lista de 50 personas concretas con nombre, contexto y motivo vale más que 5.000 seguidores que no te conocen. Elige una fuente donde tu nicho ya esté concentrado (directorios profesionales, grupos, licitaciones, directorios de clínicas, marketplaces) y construye la lista a mano. Para cada fila necesitas cuatro campos: nombre de la persona, empresa, señal de que el problema existe, y un detalle que solo alguien que ha mirado podría escribir. Ese cuarto campo es lo que separa un mensaje que se responde de uno que se borra. Y una advertencia legal y práctica: usa datos públicos, respeta la normativa de protección de datos y no compres listas.",
          keyIdea: "Cincuenta filas con detalle vencen a cinco mil contactos sin contexto.",
          action: "Construye 50 filas con los cuatro campos. Sin excepciones.",
          xp: 35,
          minutes: 5,
          exercises: [
            mc("e1", "¿Qué campo hace que un mensaje en frío no parezca spam?", [{ id: "a", text: "El cargo de la persona" }, { id: "b", text: "Un detalle específico que demuestra que has mirado" }, { id: "c", text: "El tamaño de la empresa" }], "b", "La especificidad es la prueba de que no eres un envío masivo."),
            multi("e2", "¿Qué es aceptable al construir una lista?", [{ id: "a", text: "Usar datos públicos y profesionales" }, { id: "b", text: "Comprar una base de datos" }, { id: "c", text: "Respetar la normativa de protección de datos" }, { id: "d", text: "Registrar el motivo por el que contactas" }], ["a", "c", "d"], "Comprar listas es ilegal en muchos casos y siempre contraproducente para la entregabilidad."),
            blank("e3", "Una lista de 50 contactos bien investigados vale más que una audiencia de 5.000 seguidores sin ______.", ["contexto", "relación", "relacion", "interés", "interes"], "El contexto es lo que convierte un contacto en una conversación."),
            order("e4", "Ordena la construcción de la lista:", [{ id: "a", text: "Elegir la fuente donde está concentrado el nicho" }, { id: "b", text: "Identificar al decisor de cada empresa" }, { id: "c", text: "Anotar la señal del problema" }, { id: "d", text: "Escribir el detalle específico" }], ["a", "b", "c", "d"], "Fuente, persona, señal, detalle: el orden de la investigación."),
          ],
        },
        {
          id: "ms-2-2",
          title: "Misión 5: 20 mensajes que no son spam",
          description: "Estructura de 90 palabras y qué NO poner.",
          theory:
            "Un mensaje en frío que funciona tiene cuatro partes y ninguna más: (1) una línea de contexto específico que demuestre que has mirado su negocio, (2) el problema que probablemente tienen, en una frase, (3) una prueba breve de que lo has resuelto antes, (4) una pregunta de bajo compromiso («¿tiene sentido que te cuente en 10 minutos cómo lo hice?»). Nada de adjuntos, nada de párrafos sobre tu trayectoria, nada de «espero que estés bien». Y una regla operativa: envía 20, espera 48 horas, y sigue con un mensaje de una línea que aporte algo nuevo. La mayoría de las respuestas no llegan en el primer mensaje: llegan en el seguimiento.",
          keyIdea: "90 palabras, cuatro partes y un seguimiento a las 48 horas.",
          action: "Escribe tu plantilla y envíala a 20 personas de tu lista.",
          xp: 35,
          minutes: 5,
          exercises: [
            order("e1", "Ordena el mensaje en frío:", [{ id: "a", text: "Contexto específico de su negocio" }, { id: "b", text: "Problema probable en una frase" }, { id: "c", text: "Prueba breve de que lo has resuelto" }, { id: "d", text: "Pregunta de bajo compromiso" }], ["a", "b", "c", "d"], "Contexto, problema, prueba y micro-compromiso. En ese orden, no en otro."),
            multi("e2", "¿Qué debes quitar de tu mensaje?", [{ id: "a", text: "Un párrafo sobre tu empresa" }, { id: "b", text: "El contexto específico" }, { id: "c", text: "Un PDF adjunto de 20 páginas" }, { id: "d", text: "La pregunta final" }], ["a", "c"], "El mensaje existe para conseguir una conversación, no para explicarte."),
            blank("e3", "El segundo mensaje, que llega días después del primero, se llama ______.", ["seguimiento", "follow-up", "recordatorio", "seguimiento (follow-up)"], "El seguimiento recupera a quien lo leyó y no respondió, que es la mayoría."),
            sim("e4", "Enviaste 20 mensajes ayer y nadie contesta. ¿Qué haces hoy?", [{ id: "a", text: "Reescribir la oferta completa" }, { id: "b", text: "Esperar 48 horas y enviar un seguimiento de una línea" }, { id: "c", text: "Enviar 100 más iguales" }], "b", "El primer mensaje rara vez responde. El seguimiento es donde vive la mayoría de la conversación."),
          ],
        },
        {
          id: "ms-2-3",
          title: "Misión 6: tres conversaciones de verdad",
          description: "Diagnóstico antes de soluciones.",
          theory:
            "Tres conversaciones reales enseñan más que tres meses leyendo. El objetivo de las tres primeras no es vender: es entender. Prepara seis preguntas y habla menos de la mitad del tiempo. Al final de cada llamada, pide una cosa concreta: permiso para enviar una propuesta, una introducción a otro contacto, o un «no» claro. El «no» también es un resultado: te dice que la oferta no encaja, y eso ahorra semanas. Toma notas literales de las palabras que usa el cliente: esas frases son el mejor material de marketing que vas a encontrar y no se pueden inventar desde una mesa.",
          keyIdea: "El objetivo de las primeras llamadas es entender, no cerrar.",
          action: "Agenda 3 llamadas de 20 minutos esta semana.",
          xp: 35,
          minutes: 5,
          exercises: [
            mc("e1", "Objetivo principal de tus 3 primeras llamadas:", [{ id: "a", text: "Cerrar el primer contrato" }, { id: "b", text: "Entender el problema con las palabras del cliente" }, { id: "c", text: "Presentar tu portfolio completo" }], "b", "El diagnóstico precede al contrato. Sin problema entendido no hay propuesta defendible."),
            blank("e2", "Las frases exactas que usa el cliente para describir su problema son tu mejor material de ______.", ["marketing", "copy", "venta", "mensaje"], "El copy que convierte suele ser una transcripción del cliente, no una creación tuya."),
            multi("e3", "¿Qué puedes pedir al final de una conversación?", [{ id: "a", text: "Permiso para enviar una propuesta" }, { id: "b", text: "Una introducción a otro contacto" }, { id: "c", text: "Un no claro" }, { id: "d", text: "Que te firmes un contrato en la llamada" }], ["a", "b", "c"], "Pedir compromisos pequeños mantiene el movimiento. Exigir contrato en la primera llamada lo rompe."),
            tf("e4", "Un «no» claro en una primera llamada es un fracaso de la misión.", false, "Es información: descarta una dirección y te ahorra semanas. El fracaso es la ambigüedad eterna."),
          ],
        },
        {
          id: "ms-2-4",
          title: "Misión 7: envía una propuesta esta semana",
          description: "Una página, dos opciones, alcance cerrado.",
          theory:
            "Enviar propuestas se aprende enviando propuestas. La estructura mínima: el problema con las palabras del cliente, el resultado con una métrica, el plazo, el precio con dos opciones y los límites del alcance. Envíala el mismo día de la llamada, mientras la conversación está caliente, y pide una fecha concreta para decidir. Después, no persigas: haz seguimiento dos veces y deja la puerta abierta. Lo que sí puedes hacer es mejorar el proceso cada vez: anota en qué punto la propuesta se queda parada (precio, plazo, alcance, decisor) y corrige ese punto en la siguiente.",
          keyIdea: "Propuesta el mismo día; precio con dos opciones; alcance con límites.",
          action: "Envía una propuesta de una página a un contacto real esta semana.",
          xp: 40,
          minutes: 5,
          exercises: [
            mc("e1", "¿Cuándo envías la propuesta?", [{ id: "a", text: "El mismo día de la llamada" }, { id: "b", text: "Cuando el cliente insista tres veces" }, { id: "c", text: "En dos semanas, para parecer ocupado" }], "a", "La temperatura de la conversación baja rápido. Enviar el mismo día multiplica la probabilidad de respuesta."),
            blank("e2", "La parte de la propuesta que evita que el proyecto se expanda sin límite se llama ______ del alcance.", ["límite", "limite", "definición", "definicion", "acotación", "acotacion"], "Alcance cerrado: lo que no está escrito, no está incluido."),
            order("e3", "Ordena la propuesta de una página:", [{ id: "a", text: "Problema con las palabras del cliente" }, { id: "b", text: "Resultado con métrica y plazo" }, { id: "c", text: "Precio con dos opciones" }, { id: "d", text: "Límites del alcance" }, { id: "e", text: "Fecha concreta para decidir" }], ["a", "b", "c", "d", "e"], "Empieza por el cliente, termina pidiendo una decisión con fecha."),
            sim("e4", "La propuesta lleva 10 días sin respuesta tras un seguimiento. ¿Qué haces?", [{ id: "a", text: "Bajar el precio un 30%" }, { id: "b", text: "Un segundo y último seguimiento breve, dejar la puerta abierta y seguir con la lista" }, { id: "c", text: "Llamar cada día" }], "b", "Dos seguimientos y a otra cosa. El tiempo del fundador solo vale si se invierte donde hay retorno."),
          ],
        },
      ],
    },
  ],
};
