import type { Course } from "./types";
import { mc, tf, blank, multi, order, sim } from "./helpers";

export const splitFinance: Course = {
  slug: "inversion-primeriza",
  world: "finance",
  title: "Inversión sin humo",
  shortDescription: "Interés compuesto, riesgo y tu primer índice",
  description:
    "Antes de elegir un producto financiero hay que entender tres cosas: el coste real de las comisiones, la relación entre riesgo y tiempo, y por qué la diversificación no es una opinión. Sin promesas de rentabilidad.",
  level: "beginner",
  outcome: "Un plan de inversión propio con horizonte, aportación periódica y coste anual estimado.",
  units: [
    {
      id: "fi-u1",
      title: "El interés compuesto y sus enemigos",
      description: "Cómo el tiempo y las comisiones deciden el resultado final.",
      objectives: [
        "Calcular el efecto del interés compuesto",
        "Medir cuánto cuesta una comisión anual",
        "Distinguir riesgo de volatilidad",
      ],
      lessons: [
        {
          id: "fi-1-1",
          title: "Ocho cosa que el tiempo hace y tú no",
          description: "La regla del 72 y por qué empezar diez años antes lo cambia todo.",
          theory:
            "El interés compuesto es crecimiento sobre crecimiento: los rendimientos se suman al capital y generan rendimientos propios. La regla del 72 lo resume: divide 72 entre el rendimiento anual esperado y obtienes los años que tarda el capital en duplicarse. Al 6% son 12 años; al 8%, 9. Pero el detalle que casi nadie interioriza es el efecto del tiempo en el dinero aportado: 100 € al mes durante 10 años al 6% terminan en unos 16.400 €, de los que 12.000 salen de tu bolsillo. Los 4.400 € restantes no los ha generado tu esfuerzo: los ha generado el tiempo. Por eso la primera inversión no es un producto: es empezar antes y no interrumpir.",
          keyIdea: "El tiempo hace el trabajo. Tú solo aportas constancia.",
          action: "Calcula con la regla del 72 en cuántos años se duplicaría tu ahorro actual.",
          xp: 25,
          minutes: 5,
          exercises: [
            mc("e1", "Con una rentabilidad anual del 9%, según la regla del 72, ¿en cuántos años se duplica el capital?", [{ id: "a", text: "6 años" }, { id: "b", text: "8 años" }, { id: "c", text: "12 años" }, { id: "d", text: "18 años" }], "b", "72 / 9 = 8 años. Es una aproximación, no una promesa."),
            tf("e2", "Una rentabilidad del 7% anual garantiza que tendrás exactamente un 7% cada año.", false, "La rentabilidad media no es la rentabilidad de cada año: la volatilidad hace que el orden de los años importe."),
            blank("e3", "Aportar 100 € al mes durante 10 años al 6% aproximadamente: ¿cuánto acaba en el capital final? Escribe solo el número de miles (ej.: 16).", ["16", "16.4", "16400", "16,4"], "≈16.400 €, de los que 12.000 son aportaciones y 4.400 son interés compuesto."),
            sim("e4", "Tienes 200 € hoy y puedes aportar 100 €/mes. ¿Qué importa más para el resultado a 20 años?", [{ id: "a", text: "Elegir el producto con más rentabilidad histórica" }, { id: "b", text: "Empezar ya y no interrumpir las aportaciones" }, { id: "c", text: "Esperar a tener 10.000 € ahorrados" }], "b", "La constancia y el plazo dominan en horizontes largos; esperar es el error más caro."),
          ],
        },
        {
          id: "fi-1-2",
          title: "Las comisiones: el enemigo silencioso",
          description: "Un 2% anual puede comerse un tercio de tu resultado.",
          theory:
            "Una comisión del 2% anual parece pequeña. Pero se cobra sobre el patrimonio cada año, incluido lo que ya habías ganado: es un interés compuesto en contra. En un horizonte de 30 años, la diferencia entre un 0,2% y un 2% de coste total puede reducir el capital final en más de un tercio. Por eso, antes de mirar la rentabilidad esperada de nada, mira el coste total: comisión de gestión, comisión de custodia, coste de compraventa y, si el producto lo tiene, la comisión de éxito. Un producto que rinde un 7% con un 2,5% de costes entrega menos que uno que rinde un 5,5% con un 0,3%.",
          keyIdea: "La rentabilidad es una promesa; el coste es un hecho.",
          action: "Busca el coste total anual del producto financiero que estés mirando hoy.",
          xp: 25,
          minutes: 5,
          exercises: [
            mc("e1", "Producto A: 5,5% bruto y 0,3% de coste. Producto B: 7% bruto y 2,5% de coste. ¿Cuál entrega más dinero?", [{ id: "a", text: "A: 5,2% neto frente a 4,5%" }, { id: "b", text: "B: 7% es más que 5,5%" }, { id: "c", text: "Son iguales" }], "a", "Se compara siempre el neto después de costes, no el bruto del folleto."),
            tf("e2", "Una comisión anual del 2% se cobra una sola vez al invertir.", false, "Se cobra cada año sobre el patrimonio, incluidas las ganancias acumuladas."),
            blank("e3", "La comisión que cobra un fondo además de la gestión cuando obtiene beneficios se llama comisión de ______.", ["éxito", "exito", "performance", "resultado"], "Comisión de éxito: hay que sumarla al coste total antes de comparar."),
            multi("e4", "¿Qué costes deben entrar en el cálculo total?", [{ id: "a", text: "Gestión" }, { id: "b", text: "Custodia" }, { id: "c", text: "Compraventa" }, { id: "d", text: "El color de la app" }], ["a", "b", "c"], "Todos los que aparecen en el documento de datos fundamentales del producto."),
          ],
        },
        {
          id: "fi-1-3",
          title: "Riesgo no es lo mismo que volatilidad",
          description: "Y por qué tu horizonte temporal decide qué riesgo puedes permitirte.",
          theory:
            "Volatilidad es cuánto sube y baja el precio a corto plazo. Riesgo es la posibilidad de no alcanzar tu objetivo o de verte obligado a vender en el peor momento. Son cosas distintas: un depósito apenas tiene volatilidad pero puede ser arriesgado si no bate la inflación en un horizonte de 20 años. La regla práctica es que el plazo manda: el dinero que necesites en menos de 3 años no debería estar en un activo que pueda caer un 30% en un semestre, porque es posible que tengas que vendas en caída. Para horizontes largos, en cambio, el riesgo real es no estar invertido: la inflación erosiona el ahorro de forma silenciosa y constante.",
          keyIdea: "Primero decide cuándo necesitas el dinero. Después decide dónde lo pones.",
          action: "Clasifica tu dinero en tres cubos: menos de 3 años, 3-10 años y más de 10 años.",
          xp: 25,
          minutes: 5,
          exercises: [
            mc("e1", "Vas a comprar vivienda en 18 meses. ¿Qué haces con ese ahorro?", [{ id: "a", text: "Invertirlo en un índice de renta variable global" }, { id: "b", text: "Mantenerlo en un instrumento de bajo riesgo y liquidez alta" }, { id: "c", text: "Criptomonedas a corto plazo" }], "b", "Con un plazo de 18 meses, una caída del 30% te obligaría a vender en el peor momento. El plazo manda."),
            tf("e2", "Un producto con poca volatilidad nunca es arriesgado.", false, "Puede ser arriesgado si no supera la inflación o si no es líquido cuando necesitas el dinero."),
            blank("e3", "La pérdida de poder de compra del dinero con el tiempo se llama ______.", ["inflación", "inflacion"], "La inflación es el coste de no hacer nada: es un riesgo real aunque no aparezca en ningún gráfico."),
            order("e4", "Ordena el proceso de decisión de una inversión:", [{ id: "a", text: "Definir el objetivo y el plazo" }, { id: "b", text: "Calcular cuánto puedes permitirte perder" }, { id: "c", text: "Elegir el tipo de activo adecuado" }, { id: "d", text: "Comparar productos por coste total" }], ["a", "b", "c", "d"], "De la vida al producto, nunca al revés."),
          ],
        },
        {
          id: "fi-1-4",
          title: "Tu primer plan, en una hoja",
          description: "Diversificación, aportación periódica y un plan escrito.",
          theory:
            "Un plan de inversión cabe en una hoja: objetivo, plazo, cuánto aportas y cada cuánto, qué activos, qué coste total asumible, y las dos reglas de conducta que evitan el desastre: no vender por miedo y no cambiar de estrategia por una noticia. La diversificación —repartir entre muchos activos, sectores y geografías— no maximiza la rentabilidad esperada, pero reduce la probabilidad de que un solo error destruya tu plan. La aportación periódica automática resuelve además el problema de intentar adivinar el mejor momento: compras más caro unas veces y más barato otras, y eliminas la decisión emocional. Lo importante no es el plan perfecto: es un plan que puedas seguir durante una caída del 30% sin tocar nada.",
          keyIdea: "El mejor plan es el que puedes mantener cuando todo baja.",
          action: "Escribe tu plan en una hoja con las 6 casillas y fija una aportación automática.",
          xp: 30,
          minutes: 5,
          exercises: [
            mc("e1", "¿Para qué sirve diversificar?", [{ id: "a", text: "Para garantizar rentabilidad" }, { id: "b", text: "Para reducir el impacto de que una sola inversión salga mal" }, { id: "c", text: "Para pagar menos comisiones siempre" }], "b", "Diversificar no promete más rentabilidad: reduce el riesgo específico de concentrarte en un activo."),
            multi("e2", "¿Qué debe contener tu plan escrito?", [{ id: "a", text: "Objetivo y plazo" }, { id: "b", text: "Importe y frecuencia de aportación" }, { id: "c", text: "Reglas de conducta en caídas" }, { id: "d", text: "Predicción del precio para el próximo mes" }], ["a", "b", "c"], "Las predicciones no forman parte de un plan: la conducta sí."),
            blank("e3", "Invertir la misma cantidad cada mes se llama aportación ______.", ["periódica", "periodica", "sistemática", "sistematica", "dca"], "Aportación periódica (DCA): elimina la decisión emocional del momento de entrada."),
            sim("e4", "Tu cartera cae un 25% en un mes. Tu plan es a 15 años. ¿Qué haces?", [{ id: "a", text: "Vender para evitar más pérdidas" }, { id: "b", text: "Seguir el plan y mantener la aportación automática" }, { id: "c", text: "Duplicar la apuesta en un solo activo para recuperar rápido" }], "b", "A 15 años, una caída es una compra más barata. La regla escrita existe precisamente para este momento."),
          ],
        },
      ],
    },
  ],
};
