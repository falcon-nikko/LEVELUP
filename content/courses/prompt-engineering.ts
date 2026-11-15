import type { Course } from "./types";
import { mc, tf, blank, multi, order, sim } from "./helpers";

export const splitPrompt: Course = {
  slug: "prompt-engineering",
  world: "ai",
  title: "Prompt Engineering rentable",
  shortDescription: "Prompts que producen trabajo entregable, no curiosidades",
  description:
    "Escribir prompts bien no es magia: es especificación. Este curso enseña a estructurar instrucciones, iterar con criterio y convertir la habilidad en un servicio que alguien paga.",
  level: "intermediate",
  outcome: "Un sistema de prompts reutilizable y una oferta de servicio de IA de 300-800 €/mes.",
  units: [
    {
      id: "pe-u1",
      title: "Prompts que producen dinero",
      description: "De la petición vaga al sistema de instrucciones reproducible.",
      objectives: [
        "Estructurar un prompt con los cinco bloques esenciales",
        "Iterar con ejemplos en lugar de con adjetivos",
        "Diseñar salidas estructuradas que se puedan automatizar",
      ],
      lessons: [
        {
          id: "pe-1-1",
          title: "Anatomía de un prompt",
          description: "Cinco bloques que convierten una petición en una especificación.",
          theory:
            "Un prompt vago produce una respuesta vaga: no porque el modelo sea tonto, sino porque no le has dado criterios. Los cinco bloques que separan un prompt de juguete de uno profesional son: (1) rol y contexto —quién eres y para quién es la salida—, (2) tarea concreta con un verbo de acción, (3) restricciones —longitud, tono, qué no hacer—, (4) formato de salida exacto, (5) criterios de calidad con los que el propio modelo pueda autoevaluarse antes de responder. La quinta parte es la que casi nadie usa y la que más mejora el resultado: pedir que revise la salida contra los criterios antes de entregarla cambia la calidad de forma visible.",
          keyIdea: "Un prompt no es una pregunta: es un brief.",
          action: "Reescribe el último prompt que usaste añadiendo los bloques 3, 4 y 5.",
          xp: 25,
          minutes: 5,
          exercises: [
            mc("e1", "¿Qué bloque falta en este prompt: «Actúa como copywriter. Escribe un email de ventas para mi curso. Máximo 150 palabras. Devuelve solo el texto.»?", [{ id: "a", text: "El rol" }, { id: "b", text: "La restricción de longitud" }, { id: "c", text: "El contexto del público y los criterios de calidad" }, { id: "d", text: "El formato" }], "c", "Sin saber a quién habla ni qué hace bueno al email, el modelo improvisa."),
            multi("e2", "¿Qué mejora más la calidad de una salida?", [{ id: "a", text: "Añadir «por favor, sé muy bueno»" }, { id: "b", text: "Dar un ejemplo de salida ideal" }, { id: "c", text: "Definir criterios de calidad explícitos" }, { id: "d", text: "Escribir en mayúsculas" }], ["b", "c"], "Ejemplos y criterios. Los adjetivos de ánimo y el énfasis tipográfico no aportan información."),
            order("e3", "Ordena los bloques de un prompt profesional:", [{ id: "a", text: "Rol y contexto" }, { id: "b", text: "Tarea" }, { id: "c", text: "Restricciones" }, { id: "d", text: "Formato de salida" }, { id: "e", text: "Criterios de calidad" }], ["a", "b", "c", "d", "e"], "Ese orden va de lo general a lo verificable, que es como el modelo construye la respuesta."),
            blank("e4", "Pedir al modelo que compruebe su respuesta contra los criterios antes de entregarla se llama autoevaluación o ______.", ["autocrítica", "autocritica", "self-check", "verificación", "verificacion", "revisión", "revision"], "La autoevaluación explícita reduce errores sin coste adicional de tu tiempo."),
          ],
        },
        {
          id: "pe-1-2",
          title: "Iterar con criterio, no con fe",
          description: "Cómo mejorar una salida en tres pasos reproducibles.",
          theory:
            "Iterar no es reescribir el prompt al azar hasta que salga algo decente. Es un método: (1) diagnostica el fallo —¿falta información, falta formato o falta criterio?—, (2) cambia una sola cosa, (3) vuelve a probar con el mismo input. Si cambias tres cosas a la vez no sabes qué funcionó, y el prompt se convierte en superstición. Cuando el fallo es de estilo, casi siempre se arregla con un ejemplo; cuando es de formato, con un esquema explícito; cuando es de contenido, aportando datos en el propio prompt. Guarda las versiones: un prompt que funciona es un activo, y en seis meses no recordarás por qué estaba escrito así.",
          keyIdea: "Un cambio por iteración. Un prompt que funciona, se versiona.",
          action: "Crea una carpeta con tus 3 mejores prompts y anota qué problema resuelve cada uno.",
          xp: 25,
          minutes: 4,
          exercises: [
            mc("e1", "La salida es correcta en contenido pero demasiado larga y con tono formal. ¿Qué cambias primero?", [{ id: "a", text: "El modelo" }, { id: "b", text: "Las restricciones de longitud y tono" }, { id: "c", text: "La tarea" }], "b", "El fallo es de estilo y forma: se corrige con restricciones explícitas o un ejemplo de tono."),
            tf("e2", "Cambiar cinco cosas a la vez en el prompt es una forma eficiente de iterar.", false, "No: no puedes atribuir la mejora. La iteración controlada cambia una variable por vuelta."),
            order("e3", "Ordena el ciclo de iteración:", [{ id: "a", text: "Diagnosticar el tipo de fallo" }, { id: "b", text: "Cambiar una sola variable" }, { id: "c", text: "Repetir con el mismo input" }, { id: "d", text: "Guardar la versión que funciona" }], ["a", "b", "c", "d"], "Diagnóstico, cambio único, comparación y conservación: método científico aplicado a prompts."),
            blank("e4", "Cuando el problema es de estilo, la solución más fiable es incluir un ______ de la salida deseada.", ["ejemplo", "muestra", "few-shot"], "Los ejemplos comunican estilo mejor que cualquier adjetivo."),
          ],
        },
        {
          id: "pe-1-3",
          title: "Salidas estructuradas para automatizar",
          description: "De texto bonito a JSON que un sistema puede usar.",
          theory:
            "Un prompt solo genera valor operativo cuando su salida es consumible por un sistema. Eso significa: esquema fijo, campos obligatorios, valores cerrados y una instrucción de qué hacer si falta información. Pide siempre JSON con las claves exactas y sin texto adicional. Define enums para campos como categoría o prioridad. Y añade una regla explícita: «si el dato no aparece, devuelve null y explica en el campo motivo». Sin esa regla el modelo inventa, y un dato inventado en producción es peor que un hueco. Con esto puedes conectar la salida a una hoja de cálculo, a un CRM o a una automatización en Make o n8n sin intervención humana.",
          keyIdea: "Si la salida no se puede parsear, no se puede automatizar. Y si no se automatiza, no escala.",
          action: "Convierte tu prompt manual más repetitivo en un JSON con esquema fijo.",
          xp: 30,
          minutes: 5,
          exercises: [
            mc("e1", "¿Qué instrucción evita que el modelo invente datos ausentes?", [{ id: "a", text: "«Sé preciso»" }, { id: "b", text: "«Si un dato no está en el texto, devuelve null en ese campo»" }, { id: "c", text: "«No te equivoques»" }], "b", "Una instrucción condicional explícita es la única que da un comportamiento definido ante el vacío."),
            multi("e2", "¿Qué hace que una salida sea automatizable?", [{ id: "a", text: "Esquema fijo de claves" }, { id: "b", text: "Valores cerrados (enums)" }, { id: "c", text: "Texto libre inspirador" }, { id: "d", text: "Manejo explícito de datos faltantes" }], ["a", "b", "d"], "El texto libre es para humanos; para sistemas hace falta estructura y valores predecibles."),
            blank("e3", "Un campo que solo admite un conjunto cerrado de valores se modela como ______ en el esquema.", ["enum", "enumeración", "enumeracion"], "Los enums evitan variantes impredecibles y errores silenciosos en el sistema que consume la salida."),
            sim("e4", "Tu automatización recibe una respuesta con texto antes del JSON y falla al parsear. ¿Qué haces?", [{ id: "a", text: "Añadir un paso que corte el texto antes de la primera llave" }, { id: "b", text: "Pedir en el prompt «devuelve únicamente el objeto JSON, sin explicaciones ni markdown» y validar el esquema" }, { id: "c", text: "Cambiar de modelo y probar suerte" }], "b", "Se arregla en el origen y se protege con validación. El parche en el consumidor oculta el problema."),
          ],
        },
        {
          id: "pe-1-4",
          title: "Vender un servicio con IA",
          description: "Cómo empaquetar la habilidad en algo que un negocio paga cada mes.",
          theory:
            "Nadie paga por «saber prompts». Se paga por tiempo ahorrado o por ingresos generados, con una responsabilidad clara de quién responde si sale mal. La oferta típica funciona así: eliges un proceso caro y repetitivo de un nicho concreto (responder reseñas, clasificar leads, generar fichas de producto, redactar propuestas), construyes un flujo con revisión humana, y cobras una cuota mensual por ese proceso. Empieza con un piloto de dos semanas a precio cerrado, mide el ahorro en horas o la mejora en conversión y convierte a retainer presentando el número. El error más caro es vender «automatización total»: si el cliente no confía en el control, no firma. Vende supervisión incluida.",
          keyIdea: "Se vende el resultado y la responsabilidad, no la herramienta.",
          action: "Identifica un proceso repetitivo en un negocio que conozcas y calcula cuántas horas al mes consume.",
          xp: 30,
          minutes: 5,
          exercises: [
            mc("e1", "¿Qué vende mejor un servicio de IA a un negocio?", [{ id: "a", text: "«Uso GPT-4 y automatizaciones con n8n»" }, { id: "b", text: "«Reduzco 12 horas al mes la gestión de reseñas, con revisión humana antes de publicar»" }, { id: "c", text: "«Soy experto en prompt engineering»" }], "b", "Horas ahorradas y control. La tecnología es el medio, no la promesa."),
            order("e2", "Ordena el proceso comercial de un servicio de IA:", [{ id: "a", text: "Elegir un proceso caro y repetitivo de un nicho" }, { id: "b", text: "Piloto de 2 semanas a precio cerrado" }, { id: "c", text: "Medir ahorro o mejora con un número" }, { id: "d", text: "Convertir a cuota mensual con ese número" }], ["a", "b", "c", "d"], "El número es el puente entre el piloto y el contrato."),
            tf("e3", "Automatizar al 100% sin revisión humana es siempre lo que el cliente quiere.", false, "La mayoría necesita control y trazabilidad. La revisión humana es parte del producto, no un defecto."),
            blank("e4", "Cobrar una cuota mensual recurrente por mantener un proceso funcionando se denomina modelo de ______.", ["suscripción", "suscripcion", "retainer", "abono"], "La recurrencia es lo que convierte un trabajo puntual en un negocio."),
          ],
        },
      ],
    },
  ],
};
