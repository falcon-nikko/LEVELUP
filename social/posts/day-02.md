# Día 02 · Error · Dinero en float

**Canales:** LinkedIn 08:20 CET · X 13:00 CET
**Pilar:** El error real (1/6)
**Objetivo:** que el dev revise hoy mismo la columna de precio de su base de datos
**Activo visual:** captura de código en fondo polar con la línea `19.99 * 3 + 5.5 * 2 // 70.97000000000001` resaltada en rojo cardinal, y debajo `1999 * 3 + 550 * 2 // 7097` en verde
**CTA:** no

---

## LinkedIn · ES

19.99 * 3 + 5.5 * 2 no da 70.97.

Da 70.97000000000001.

No es una curiosidad de JavaScript. Es dinero. Suma 500 líneas de pedido y el descuadre ya aparece en el informe de cierre. Y si comparas dos importes con `===`, la igualdad falla sin que nadie haya cambiado nada.

La regla es aburrida y funciona siempre:

- el dinero se guarda en enteros: céntimos
- se divide entre 100 sólo al mostrarlo
- nunca se compara con `===`; se compara en enteros
- en la base de datos, entero o NUMERIC sin decimales binarios

El caso real: 500 artículos a 19,99 €. En enteros, 999 500 céntimos exactos, siempre. En float, el total se desvía unos céntimos y la desviación crece con el volumen. No es un bug que aparece un día: es un bug que se acumula desde el primero.

Si tu frontend multiplica en float y tu base de datos guarda NUMERIC(10,2), tienes dos fuentes de verdad. Una de ellas miente cada pocos miles de operaciones.

## LinkedIn · EN

19.99 * 3 + 5.5 * 2 does not return 70.97.

It returns 70.97000000000001.

That is not a JavaScript quirk. That is money. Add 500 order lines and the drift shows up in your month-end report. Compare two amounts with `===` and equality fails while nothing changed.

The rule is boring and always works:
- store money as integers (cents)
- divide by 100 only when rendering
- never compare floats; compare integers
- in the database, integer or exact NUMERIC

Real case: 500 items at €19.99. In integers, exactly 999 500 cents, every time. In floats, the total drifts a few cents and the drift grows with volume. It is not a bug that shows up one day. It is a bug that has been accumulating since day one.

## X · 13:00

19.99 * 3 + 5.5 * 2 = 70.97000000000001

En enteros: 1999 * 3 + 550 * 2 = 7097 céntimos. Exacto. Siempre.

El dinero se guarda en céntimos, se divide entre 100 al pintar y se compara en enteros. 500 líneas de pedido en float y tu cierre de mes ya no cuadra.

No es un bug que aparece un día. Es un bug que se acumula desde el primero.

## Hashtags

#javascript #typescript #backend

