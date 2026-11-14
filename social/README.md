# /social — 30 días de contenido listo para publicar

Nada de esto se reescribe el día de publicar. Se abre, se copia, se prepara el
activo y se publica. La estrategia y las reglas de copy viven en
[`docs/GTM_SOCIAL_PLAN.md`](../docs/GTM_SOCIAL_PLAN.md); aquí sólo hay material
ejecutable.

## Qué hay en esta carpeta

| Archivo | Para qué |
|---|---|
| `calendar.csv` | Índice máquina de los 30 días: canal, pilar, tema, CTA, activo, hora. Se puede importar a una hoja de cálculo o a un scheduler. |
| `hooks.md` | Banco de 40 primeras líneas reutilizables. Si un post propio no arranca con una de estas formas, no se publica. |
| `posts/day-01.md` … `posts/day-30.md` | Un día = un archivo con el copy completo: LinkedIn ES, LinkedIn EN, X (post o hilo), guion vertical cuando toca, CTA y hashtags. |
| `metrics.csv` | Se crea el día 1 con la cabecera del README de abajo. Una fila por post. |

## Cómo se usa un día

1. Abre `posts/day-XX.md`.
2. Copia el bloque **LinkedIn ES** tal cual. No lo adaptes: la longitud y el corte
   de la primera línea ya están pensados para el feed.
3. Prepara el activo indicado en la cabecera del archivo (tarjeta de cifra,
   captura del producto o diagrama exportado). El dato va **dentro** de la imagen.
4. Publica a la hora del `calendar.csv` (LinkedIn 08:20 CET, X 13:00 CET,
   vertical 19:30 CET).
5. Copia el bloque **X** a las 13:00. Si el día lleva vertical, grábalo sobre el
   guion y súbelo a las 19:30.
6. Añade la fila en `metrics.csv` a las 24 h y actualízala a los 7 días.
7. Añade UTM al enlace del producto:
   `?utm_source=<canal>&utm_medium=social&utm_campaign=d<XX>`.

## Cabecera de `metrics.csv`

```csv
date,day,channel,pillar,impressions,saves,comments,clicks,signups,notes
```

## Tres reglas que no se negocian

1. **Una cifra por post.** Dos números compiten y el lector no recuerda ninguno.
2. **Cero palabras prohibidas.** Lista completa en `docs/GTM_SOCIAL_PLAN.md` §5
   ("desbloquea", "eleva tu", "en el mundo actual", "game changer"…). Búscalas con
   `grep -rni "desbloquea\|eleva tu\|game changer" social/` antes de publicar.
3. **Aviso de afiliado dentro del post**, nunca en el primer comentario. Los días
   20 y 26 llevan enlace de afiliado y ya incluyen la frase exacta.

## De dónde salen las cifras

Todas están calculadas dentro del producto, en
`src/lib/curriculum/courses/*.ts`, y sus fuentes externas están listadas en
`docs/PLAN_V5_MASTER.md` (sección External Sources). Si alguien pregunta "¿de
dónde sale ese número?", la respuesta es una lección concreta de LEVELUP: se
responde con la ruta y la unidad, no con un "es lo que se ve en el mercado".
