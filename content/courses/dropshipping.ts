import type { Course } from "./types";
import { mc, tf, blank, multi, order, sim } from "./helpers";

export const splitDropshipping: Course = {
  slug: "smart-dropshipping",
  world: "business",
  title: "Smart Dropshipping",
  shortDescription: "De cero a la primera venta sin quemar presupuesto",
  description:
    "El 90% de los que empiezan en dropshipping pierden dinero porque gastan en anuncios antes de validar la oferta. Este curso invierte el orden: primero margen, luego demanda, luego tráfico.",
  level: "beginner",
  outcome: "Una tienda validada con criterio de márgenes y un plan de primeros 10 pedidos por menos de 100 €.",
  units: [
    {
      id: "sd-u1",
      title: "Validar antes de gastar",
      description: "El orden correcto de las decisiones: producto, margen, oferta y solo después tráfico.",
      objectives: [
        "Calcular el coste aterrizado real de un producto",
        "Aplicar la regla de margen 3x antes de comprar tráfico",
        "Construir una oferta que se pueda defender sin descuentos",
      ],
      lessons: [
        {
          id: "sd-1-1",
          title: "El error de los 500 € en anuncios",
          description: "Por qué el dropshipping no falla por el producto, sino por el orden.",
          theory:
            "Casi todo el mundo que fracasa en dropshipping sigue el mismo guion: ve un producto que funciona a otro, monta la tienda en dos horas y mete 500 € en Meta Ads. Al cuarto día tiene 40 visitas y 0 ventas, y concluye que «el dropshipping ya no funciona». El problema no es el canal: es que nunca comprobó si la unidad económica cerraba. Antes de pagar por un clic necesitas saber tres cosas: cuánto te cuesta el producto puesto en casa del cliente, a qué precio puedes venderlo y cuánto puedes pagar por una visita. Si esos tres números no cierran en papel, no cierran en la realidad.",
          keyIdea: "El tráfico es el último paso, nunca el primero.",
          action: "Abre una hoja de cálculo con 3 columnas: coste aterrizado, precio de venta y margen bruto.",
          xp: 20,
          minutes: 4,
          exercises: [
            mc("e1", "Llevas 4 días con 500 € en anuncios y ninguna venta. ¿Cuál es el primer dato que deberías haber calculado?", [{ id: "a", text: "El número de seguidores del competidor" }, { id: "b", text: "El margen bruto por unidad y el coste máximo por visita" }, { id: "c", text: "El color del botón de compra" }, { id: "d", text: "La velocidad de carga del servidor" }], "b", "Sin margen unitario no existe umbral de rentabilidad publicitaria. Los demás datos son decoración."),
            tf("e2", "Si un producto se vende mucho en TikTok, está garantizado que funcionará en tu tienda.", false, "La demanda ajena es una señal, no una garantía: el mismo producto compite ya contra quien lo popularizó, con más historial y mejores precios."),
            blank("e3", "El coste real del producto incluyendo envío, comisiones y devoluciones se llama coste ______.", ["aterrizado", "landed"], "El coste aterrizado (landed cost) es el único número que sirve para fijar precio: incluye producto, envío, pasarela de pago y una provisión de devoluciones."),
            sim("e4", "Tienes 100 € de presupuesto total. Producto a 6 €, venta prevista a 29,90 €, envío 4 €. ¿Qué haces primero?", [{ id: "a", text: "Lanzar una campaña de conversión optimizada a compra con los 100 €" }, { id: "b", text: "Conseguir 20-30 clics gratuitos (orgánico o microcreadores) para medir intención de compra" }, { id: "c", text: "Comprar 500 unidades para negociar precio" }], "b", "Con 100 € no compras datos estadísticamente significativos en pago. Primero mides intención con coste cero."),
          ],
        },
        {
          id: "sd-1-2",
          title: "Cómo se calcula el margen de verdad",
          description: "Coste aterrizado, comisiones, devoluciones y la regla 3x.",
          theory:
            "Producto 8 € + envío 4 € = 12 €. Ese no es tu coste: falta la comisión de la pasarela (≈3% + 0,25 €), el coste de las devoluciones (si devuelven un 5%, añade unos 0,60 € de media) y el tiempo de atención al cliente. Con un precio de 29,90 € tu margen bruto real es de unos 16 €, no de 22 €. La regla 3x dice que el precio de venta debería ser al menos tres veces el coste aterrizado: eso deja margen para pagar publicidad, devoluciones y seguir ganando. Si un producto solo permite 1,8x, no es un mal producto: es un producto que no admite tráfico de pago.",
          keyIdea: "Precio ≥ 3 × coste aterrizado. Si no, el negocio no tiene espacio para adquirir clientes.",
          action: "Calcula el margen real de un producto que estés mirando ahora mismo y decide si pasa la regla 3x.",
          xp: 20,
          minutes: 5,
          exercises: [
            mc("e1", "Producto 9 €, envío 3 €, comisión de pasarela 1,20 € y provisión de devoluciones 0,80 €. ¿Coste aterrizado?", [{ id: "a", text: "9 €" }, { id: "b", text: "12 €" }, { id: "c", text: "14 €" }, { id: "d", text: "13 €" }], "c", "9 + 3 + 1,20 + 0,80 = 14 €. Cualquier precio por debajo de 42 € incumple la regla 3x."),
            mc("e2", "Vendes a 39,90 € con coste aterrizado de 21 €. ¿Pasa la regla 3x?", [{ id: "a", text: "Sí, con margen de sobra" }, { id: "b", text: "No: 3 × 21 = 63 €, el precio se queda corto" }, { id: "c", text: "Es indiferente mientras haya ventas" }], "b", "Ratio de 1,9x. Puedes vender, pero no puedes pagar adquisición: cada cliente nuevo se come el margen."),
            blank("e3", "Si tu margen bruto por pedido es 18 € y quieres un beneficio de 6 € por pedido, tu coste máximo de adquisición (CAC) es ____ €.", ["12", "12.0", "12,0"], "18 − 6 = 12 € de CAC objetivo. Ese número decide qué campañas puedes permitirte."),
            tf("e4", "Subir el precio siempre reduce las ventas.", false, "En muchos nichos un precio más alto aumenta la percepción de calidad y mejora la conversión. Y siempre mejora el margen: es la palanca más rápida que existe."),
          ],
        },
        {
          id: "sd-1-3",
          title: "La oferta que no se puede comparar",
          description: "Cómo empaquetar producto y servicio para escapar de la guerra de precios.",
          theory:
            "Si vendes «el mismo producto» que otros diez, el cliente solo puede comparar precio y plazo. La salida no es bajar el precio: es cambiar la unidad de comparación. Una oferta se diferencia cuando añade algo que el cliente valora y el competidor no puede copiar rápido: una guía de uso, una garantía de 60 días, un pack que resuelve el problema completo, una marca con una promesa clara. En términos prácticos, vende el resultado («cocina sano en 12 minutos») y usa el producto como vehículo. El precio deja de competir contra otro producto y empieza a competir contra el coste de no resolver el problema.",
          keyIdea: "No vendes un producto; vendes una transformación concreta y medible.",
          action: "Reescribe el titular de tu producto en formato resultado + plazo + para quién.",
          xp: 25,
          minutes: 5,
          exercises: [
            mc("e1", "¿Cuál de estos titulares reduce más la comparación por precio?", [{ id: "a", text: "Botella térmica de acero 500 ml" }, { id: "b", text: "Mantén el café caliente 12 horas en el trabajo, sin microondas" }, { id: "c", text: "¡Oferta! Botella 50% OFF" }], "b", "Describe el resultado y el contexto de uso. La botella pasa de commodity a solución."),
            multi("e2", "¿Qué elementos puedes añadir a la oferta sin subir mucho el coste?", [{ id: "a", text: "Una guía PDF de uso con 3 recetas" }, { id: "b", text: "Garantía de devolución de 60 días" }, { id: "c", text: "Comprar 1.000 unidades extra de stock" }, { id: "d", text: "Un vídeo de 40 segundos mostrando el resultado real" }], ["a", "b", "d"], "Contenido, garantía y prueba visual cuestan casi cero y suben conversión. El stock extra es riesgo, no oferta."),
            order("e3", "Ordena la estructura de una página de producto que convierte:", [{ id: "a", text: "Titular con el resultado" }, { id: "b", text: "Prueba visual del antes y el después" }, { id: "c", text: "Qué incluye y precio con ancla" }, { id: "d", text: "Garantía y respuesta a la objeción principal" }, { id: "e", text: "Reseñas con nombre y foto" }], ["a", "b", "c", "d", "e"], "Primero captas la atención, luego demuestras, después pones el precio con contexto, desmontas la objeción y cierras con prueba social."),
            blank("e4", "La objeción más frecuente en dropshipping suele ser «¿y si no me llega?». La respuesta operativa que la resuelve se llama política de ______.", ["devolución", "devolucion", "reembolso", "garantía", "garantia"], "Una política de devolución clara y visible convierte más que cualquier descuento."),
          ],
        },
        {
          id: "sd-1-4",
          title: "Tus primeros 10 pedidos sin anuncios",
          description: "Un plan de validación de 14 días con menos de 100 €.",
          theory:
            "Los primeros 10 pedidos tienen una función: demostrar que existe demanda dispuesta a pagar. No necesitas escala, necesitas señal. Tres vías de coste bajo: microcreadores de 1.000 a 20.000 seguidores que aceptan producto a cambio de contenido, contenido orgánico que demuestra el producto resolviendo un problema real, y comunidades donde ya se habla del problema (no del producto). Mide siempre lo mismo: visitas, añadir al carrito y compra. Si con 200 visitas cualificadas tienes 0 añadidos al carrito, el problema es la oferta, no el tráfico. Cambia la oferta antes de cambiar el canal.",
          keyIdea: "Con pocos datos se cambia la oferta; con muchos datos se cambia el canal.",
          action: "Haz una lista de 15 microcreadores de tu nicho y escribe el mensaje de 4 líneas que les enviarás.",
          xp: 30,
          minutes: 5,
          exercises: [
            mc("e1", "200 visitas cualificadas y 0 añadidos al carrito. ¿Qué concluyes?", [{ id: "a", text: "Necesito más tráfico" }, { id: "b", text: "La oferta o la página no convierten: hay que cambiarlas" }, { id: "c", text: "El producto no tiene mercado" }], "b", "Cero intención con tráfico relevante es un problema de oferta y de página. El mercado aún no está descartado."),
            order("e2", "Ordena el plan de validación de 14 días:", [{ id: "a", text: "Definir oferta y precio con la regla 3x" }, { id: "b", text: "Montar la página con prueba visual y garantía" }, { id: "c", text: "Contactar a 15 microcreadores" }, { id: "d", text: "Publicar 3 vídeos de demostración propios" }, { id: "e", text: "Revisar métricas y decidir: doblar o cambiar" }], ["a", "b", "c", "d", "e"], "La secuencia importa: sin oferta definida, todo lo demás mide ruido."),
            blank("e3", "La métrica que mejor indica intención real de compra antes de pagar es la tasa de ______ al carrito.", ["añadir", "anadir", "adición", "adicion"], "Añadir al carrito expresa intención; el clic expresa curiosidad."),
            tf("e4", "Regalar producto a microcreadores es publicidad encubierta y hay que declararlo.", true, "Sí: la relación comercial debe declararse. Además de ser legal, la transparencia protege la confianza, que es el activo que estás comprando."),
          ],
        },
      ],
    },
  ],
};
