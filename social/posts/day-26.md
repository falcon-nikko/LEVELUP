# Día 26 · Herramienta · Make contra n8n

**Canales:** LinkedIn 08:20 CET · X 13:00 CET
**Pilar:** Herramienta honesta (2/2)
**Objetivo:** dar la cifra que decide entre las dos plataformas y los casos en que ninguna gana
**Activo visual:** diagrama `compare` de dos columnas (Make / n8n) con coste, límite, mantenimiento y caso de uso dentro de cada celda
**CTA:** no (día con enlace de afiliado)

---

## LinkedIn · ES

Make o n8n. La respuesta cambia según una cifra: operaciones al mes.

**Make**, por operaciones:
- entras gratis y el primer plan de pago ronda los 9-16 €/mes
- **cada módulo de cada escenario cuenta como una operación.** Un flujo de 8 pasos ejecutado 100 veces son 800 operaciones, no 100.
- es imbatible para montar rápido algo visual con 3-4 pasos
- se vuelve caro cuando el escenario tiene muchos pasos, muchas ramas o bucles

**n8n autoalojado**, por servidor:
- cuesta lo que cueste tu VPS: 5-20 €/mes, y **no hay límite por ejecución**
- pagas en otro sitio: actualizaciones, backups, y el soporte eres tú
- merece la pena por encima de unas 10 000 ejecuciones al mes, o cuando los datos no pueden salir de tu infraestructura
- también cuando necesitas lógica compleja en código dentro del flujo

La cuenta que decide, dos minutos:

**pasos del flujo × ejecuciones al mes = operaciones**

Después: operaciones × precio por operación en tu plan, contra 5-20 € del VPS más tus horas de mantenimiento valoradas.

Un flujo de 8 pasos × 2 000 ejecuciones = 16 000 operaciones. En Make eso es un plan medio-alto; en n8n son 10 € de servidor y una tarde al mes. El mismo flujo con 200 ejecuciones es 1 600 operaciones: Make gratis o casi, y n8n es montar un servidor para nada.

Y la tercera opción que nadie considera: **ninguna.** Si el flujo se ejecuta 20 veces al mes y tiene 3 pasos, un script con cron es más barato, más rápido y más fácil de auditar que cualquier plataforma.

Ambas están catalogadas en LEVELUP → Stack, con la lección que te obliga a hacer esta cuenta antes de contratar. **Enlace de afiliado:** si contratas desde ahí, LEVELUP recibe una comisión y a ti no te cuesta más.

## LinkedIn · EN

Make or n8n. The answer turns on one number: operations per month.

**Make**, priced per operation:
- free entry, first paid plan around €9-16/month
- **every module of every scenario counts as one operation.** An 8-step flow run 100 times is 800 operations, not 100.
- unbeatable for assembling a visual 3-4 step flow fast
- gets expensive with many steps, branches or loops

**Self-hosted n8n**, priced per server:
- costs what your VPS costs: €5-20/month, with **no per-execution limit**
- you pay elsewhere: updates, backups, and you are the support desk
- worth it above roughly 10 000 executions a month, or when data cannot leave your infrastructure

The two-minute calculation:
**flow steps × monthly executions = operations**
Then compare operations × plan price against €5-20 of VPS plus your maintenance hours priced.

An 8-step flow × 2 000 executions = 16 000 operations. On Make that is a mid-high plan; on n8n it is a €10 server and one afternoon a month. The same flow at 200 executions is 1 600 operations: Make is free or nearly, and n8n means standing up a server for nothing.

The third option nobody considers: **neither.** If the flow runs 20 times a month with 3 steps, a cron script is cheaper, faster and easier to audit than any platform.

**Affiliate link:** both are catalogued inside LEVELUP under Stack. If you sign up through them, LEVELUP earns a commission at no extra cost to you.

## X · 13:00

Make cobra por operación: 8 pasos × 100 ejecuciones = 800 operaciones.
n8n autoalojado cobra por servidor: 5-20 €/mes, sin límite por ejecución.

La cuenta: pasos × ejecuciones/mes = operaciones.

16 000 operaciones → n8n. 1 600 → Make. 40 ejecuciones al mes → un script con cron y ninguna plataforma.

## Hashtags

#automatizacion #n8n #make

---

*Aviso obligatorio en este post: contiene enlace de afiliado.*

