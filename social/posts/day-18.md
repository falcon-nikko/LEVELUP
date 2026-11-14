# Día 18 · Error · DNS y el umbral de remitente masivo

**Canales:** LinkedIn 08:20 CET · X 13:00 CET
**Pilar:** El error real (5/6)
**Objetivo:** checklist técnica completa y verificable hoy
**Activo visual:** captura de un registro SPF real con los `include:` contados y el décimo primero tachado en rojo
**CTA:** no

---

## LinkedIn · ES

Tu SPF tiene 12 lookups. Google te está leyendo como spam.

El límite son **10**. Cada `include:` cuenta, y los includes anidados cuentan más de lo que crees, porque arrastran los suyos.

Configuración mínima para el umbral de remitente masivo de Google (5 000 correos al día o más):

- SPF por debajo de 10 lookups DNS
- **DKIM de 2048 bits** firmando, no de 1024
- **DMARC en `p=quarantine`**, con plan de subida a `reject`
- unsubscribe de **un clic** en la cabecera del mensaje, no un enlace al final del HTML
- tasa de reclamación **por debajo del 0,10 %**
- rebotes por debajo del 2 % · inbox por encima del 90 % · bajas por debajo del 0,5 %

Y el número que más gente descubre tarde: **nunca por encima del 0,30 % de reclamaciones.** No es un objetivo, es un techo. Por encima, el filtro deja de dudar y te bloquea; y un dominio bloqueado no se arregla con mejor copy.

Los cinco asesinos de entregabilidad más comunes, en orden:

1. saltarse el warmup
2. DKIM o DMARC ausentes
3. más de 50 envíos por buzón y día
4. listas sin verificar
5. HTML sobrecargado con imágenes y enlaces

Todo esto está en tu DNS y en tu cabecera. Se revisa en una tarde. Y es lo que decide si los otros 29 días de trabajo llegan a alguien.

## LinkedIn · EN

Your SPF has 12 lookups. Google is reading you as spam.

The limit is **10**. Every `include:` counts, and nested includes count more than you think because they drag their own.

Minimum setup for Google's bulk sender threshold (5 000+ emails a day):
- SPF under 10 DNS lookups
- **2048-bit DKIM** signing, not 1024
- **DMARC at `p=quarantine`**, with a plan to move to `reject`
- **one-click** unsubscribe in the message header, not a link at the bottom of the HTML
- complaint rate **under 0.10 %**
- bounces under 2 % · inbox over 90 % · unsubscribes under 0.5 %

The number people find out late: **never above 0.30 % complaints.** That is not a target, it is a ceiling. Above it the filter stops hesitating and blocks you, and a blocked domain is not fixed with better copy.

The five most common deliverability killers, in order: skipping warmup, missing DKIM or DMARC, over 50 sends per mailbox per day, unverified lists, image-and-link-heavy HTML.

All of it lives in your DNS and your headers. It takes one afternoon to review.

## X · 13:00

Umbral de remitente masivo de Google (5 000/día):

SPF < 10 lookups
DKIM 2048
DMARC p=quarantine
unsubscribe de un clic en cabecera
reclamaciones < 0,10 % — y nunca por encima de 0,30 %

El 0,30 % no es un objetivo. Es un techo. Por encima, el filtro deja de dudar.

## Hashtags

#deliverability #outreach #dns

