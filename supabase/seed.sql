-- LEVELUP · seed generado automáticamente desde content/curriculum.ts
-- No editar a mano. Regenerar con: npm run seed:build
begin;

insert into public.worlds (slug, name, description, icon, color, order_index, is_published)
values ('programming', 'Programación', 'Del primer algoritmo a tu primera herramienta. Sin jerga y con ejercicios que producen resultados concretos.', 'Code2', '#2563EB', 1, true)
on conflict do nothing;
insert into public.worlds (slug, name, description, icon, color, order_index, is_published)
values ('business', 'Negocios', 'Dropshipping con criterio de márgenes, agencia B2B de una persona, startup validada con pagos reales y misiones semanales.', 'Briefcase', '#8B5CF6', 2, true)
on conflict do nothing;
insert into public.worlds (slug, name, description, icon, color, order_index, is_published)
values ('ai', 'Inteligencia Artificial', 'Prompts que se pueden automatizar, salidas estructuradas y servicios que un negocio paga cada mes.', 'Bot', '#F97316', 3, true)
on conflict do nothing;
insert into public.worlds (slug, name, description, icon, color, order_index, is_published)
values ('finance', 'Finanzas', 'Interés compuesto, comisiones y riesgo real. Cero promesas de rentabilidad y cero atajos.', 'TrendingUp', '#059669', 4, true)
on conflict do nothing;

insert into public.courses (world_id, slug, title, description, short_description, level, estimated_duration, units_count, lessons_count, objectives, is_published, is_premium, order_index)
select w.id, 'misiones-nivel-1', 'Misiones: tu primera semana', 'Aprender sin ejecutar no genera ingresos. Estas 12 misiones están ordenadas como las haría un fundador solo: primero elegir el terreno, luego ofrecer, luego entregar, luego pedir dinero.', '12 retos para convertir lo aprendido en un entregable real', 'beginner', 33, 2, 7, ARRAY['Elegir un nicho','Escribir tu oferta en una frase','Definir una métrica de éxito','Construir una lista de 50','Enviar 20 mensajes personalizados','Hacer 3 llamadas','Enviar 1 propuesta']::text[], true, false, 1
from public.worlds w where w.slug = 'business'
on conflict (world_id, slug) do update set
  title = excluded.title,
  description = excluded.description,
  short_description = excluded.short_description,
  level = excluded.level,
  estimated_duration = excluded.estimated_duration,
  units_count = excluded.units_count,
  lessons_count = excluded.lessons_count,
  objectives = excluded.objectives,
  order_index = excluded.order_index;
insert into public.courses (world_id, slug, title, description, short_description, level, estimated_duration, units_count, lessons_count, objectives, is_published, is_premium, order_index)
select w.id, 'smart-dropshipping', 'Smart Dropshipping', 'El 90% de los que empiezan en dropshipping pierden dinero porque gastan en anuncios antes de validar la oferta. Este curso invierte el orden: primero margen, luego demanda, luego tráfico.', 'De cero a la primera venta sin quemar presupuesto', 'beginner', 19, 1, 4, ARRAY['Calcular el coste aterrizado real de un producto','Aplicar la regla de margen 3x antes de comprar tráfico','Construir una oferta que se pueda defender sin descuentos']::text[], true, false, 2
from public.worlds w where w.slug = 'business'
on conflict (world_id, slug) do update set
  title = excluded.title,
  description = excluded.description,
  short_description = excluded.short_description,
  level = excluded.level,
  estimated_duration = excluded.estimated_duration,
  units_count = excluded.units_count,
  lessons_count = excluded.lessons_count,
  objectives = excluded.objectives,
  order_index = excluded.order_index;
insert into public.courses (world_id, slug, title, description, short_description, level, estimated_duration, units_count, lessons_count, objectives, is_published, is_premium, order_index)
select w.id, 'digital-agency-aaa', 'Agencia Digital B2B', 'Una agencia de una persona puede facturar más que una tienda de e-commerce, con menos riesgo. El curso se centra en lo único que importa al principio: una oferta de nicho y un proceso de venta que no dependa de la suerte.', 'Cierra tu primer cliente de 1.000 €/mes sin equipo', 'beginner', 20, 1, 4, ARRAY['Construir una oferta de nicho en una frase','Generar una lista de prospectos con criterio','Dirigir una llamada de diagnóstico de 20 minutos']::text[], true, false, 3
from public.worlds w where w.slug = 'business'
on conflict (world_id, slug) do update set
  title = excluded.title,
  description = excluded.description,
  short_description = excluded.short_description,
  level = excluded.level,
  estimated_duration = excluded.estimated_duration,
  units_count = excluded.units_count,
  lessons_count = excluded.lessons_count,
  objectives = excluded.objectives,
  order_index = excluded.order_index;
insert into public.courses (world_id, slug, title, description, short_description, level, estimated_duration, units_count, lessons_count, objectives, is_published, is_premium, order_index)
select w.id, 'prompt-engineering', 'Prompt Engineering rentable', 'Escribir prompts bien no es magia: es especificación. Este curso enseña a estructurar instrucciones, iterar con criterio y convertir la habilidad en un servicio que alguien paga.', 'Prompts que producen trabajo entregable, no curiosidades', 'intermediate', 19, 1, 4, ARRAY['Estructurar un prompt con los cinco bloques esenciales','Iterar con ejemplos en lugar de con adjetivos','Diseñar salidas estructuradas que se puedan automatizar']::text[], true, false, 4
from public.worlds w where w.slug = 'ai'
on conflict (world_id, slug) do update set
  title = excluded.title,
  description = excluded.description,
  short_description = excluded.short_description,
  level = excluded.level,
  estimated_duration = excluded.estimated_duration,
  units_count = excluded.units_count,
  lessons_count = excluded.lessons_count,
  objectives = excluded.objectives,
  order_index = excluded.order_index;
insert into public.courses (world_id, slug, title, description, short_description, level, estimated_duration, units_count, lessons_count, objectives, is_published, is_premium, order_index)
select w.id, 'validar-startup', 'De idea a primeros clientes', 'El 80% del trabajo de una startup en su primer año es descubrir qué está dispuesto a pagar alguien. Este curso enseña el método: hipótesis, entrevistas, pre-venta y lanzamiento mínimo.', 'Valida tu idea con dinero real, no con opiniones', 'beginner', 20, 1, 4, ARRAY['Formular una hipótesis falsable','Entrevistar sin dirigir las respuestas','Conseguir un pago antes de construir']::text[], true, false, 5
from public.worlds w where w.slug = 'business'
on conflict (world_id, slug) do update set
  title = excluded.title,
  description = excluded.description,
  short_description = excluded.short_description,
  level = excluded.level,
  estimated_duration = excluded.estimated_duration,
  units_count = excluded.units_count,
  lessons_count = excluded.lessons_count,
  objectives = excluded.objectives,
  order_index = excluded.order_index;
insert into public.courses (world_id, slug, title, description, short_description, level, estimated_duration, units_count, lessons_count, objectives, is_published, is_premium, order_index)
select w.id, 'fundamentos', 'Fundamentos de Programación', 'Programar es descomponer un problema en pasos que no admiten ambigüedad. Este primer bloque usa ejemplos de negocio reales para que cada concepto tenga un uso inmediato.', 'Piensa como un programa, desde cero y sin jerga', 'beginner', 18, 1, 4, ARRAY['Describir un problema como una secuencia de pasos','Guardar y transformar datos con variables','Tomar decisiones con condiciones y repetir con bucles']::text[], true, false, 6
from public.worlds w where w.slug = 'programming'
on conflict (world_id, slug) do update set
  title = excluded.title,
  description = excluded.description,
  short_description = excluded.short_description,
  level = excluded.level,
  estimated_duration = excluded.estimated_duration,
  units_count = excluded.units_count,
  lessons_count = excluded.lessons_count,
  objectives = excluded.objectives,
  order_index = excluded.order_index;
insert into public.courses (world_id, slug, title, description, short_description, level, estimated_duration, units_count, lessons_count, objectives, is_published, is_premium, order_index)
select w.id, 'inversion-primeriza', 'Inversión sin humo', 'Antes de elegir un producto financiero hay que entender tres cosas: el coste real de las comisiones, la relación entre riesgo y tiempo, y por qué la diversificación no es una opinión. Sin promesas de rentabilidad.', 'Interés compuesto, riesgo y tu primer índice', 'beginner', 20, 1, 4, ARRAY['Calcular el efecto del interés compuesto','Medir cuánto cuesta una comisión anual','Distinguir riesgo de volatilidad']::text[], true, false, 7
from public.worlds w where w.slug = 'finance'
on conflict (world_id, slug) do update set
  title = excluded.title,
  description = excluded.description,
  short_description = excluded.short_description,
  level = excluded.level,
  estimated_duration = excluded.estimated_duration,
  units_count = excluded.units_count,
  lessons_count = excluded.lessons_count,
  objectives = excluded.objectives,
  order_index = excluded.order_index;

insert into public.units (course_id, slug, title, description, objectives, order_index, xp_reward, is_published)
select c.id, 'ms-u1', 'Elige tu terreno', 'Misiones 1-3: decidir dónde juegas y a quién sirves.', ARRAY['Elegir un nicho','Escribir tu oferta en una frase','Definir una métrica de éxito']::text[], 1, 85, true
from public.courses c join public.worlds w on w.id = c.world_id
where c.slug = 'misiones-nivel-1' and w.slug = 'business'
on conflict (course_id, slug) do update set
  title = excluded.title, description = excluded.description, objectives = excluded.objectives,
  order_index = excluded.order_index, xp_reward = excluded.xp_reward, is_published = true;
insert into public.units (course_id, slug, title, description, objectives, order_index, xp_reward, is_published)
select c.id, 'ms-u2', 'Sal al mercado', 'Misiones 4-7: lista, mensajes, conversaciones y propuesta.', ARRAY['Construir una lista de 50','Enviar 20 mensajes personalizados','Hacer 3 llamadas','Enviar 1 propuesta']::text[], 2, 145, true
from public.courses c join public.worlds w on w.id = c.world_id
where c.slug = 'misiones-nivel-1' and w.slug = 'business'
on conflict (course_id, slug) do update set
  title = excluded.title, description = excluded.description, objectives = excluded.objectives,
  order_index = excluded.order_index, xp_reward = excluded.xp_reward, is_published = true;
insert into public.units (course_id, slug, title, description, objectives, order_index, xp_reward, is_published)
select c.id, 'sd-u1', 'Validar antes de gastar', 'El orden correcto de las decisiones: producto, margen, oferta y solo después tráfico.', ARRAY['Calcular el coste aterrizado real de un producto','Aplicar la regla de margen 3x antes de comprar tráfico','Construir una oferta que se pueda defender sin descuentos']::text[], 1, 95, true
from public.courses c join public.worlds w on w.id = c.world_id
where c.slug = 'smart-dropshipping' and w.slug = 'business'
on conflict (course_id, slug) do update set
  title = excluded.title, description = excluded.description, objectives = excluded.objectives,
  order_index = excluded.order_index, xp_reward = excluded.xp_reward, is_published = true;
insert into public.units (course_id, slug, title, description, objectives, order_index, xp_reward, is_published)
select c.id, 'ag-u1', 'Cierra tu primer cliente B2B', 'De la habilidad suelta a un contrato mensual.', ARRAY['Construir una oferta de nicho en una frase','Generar una lista de prospectos con criterio','Dirigir una llamada de diagnóstico de 20 minutos']::text[], 1, 110, true
from public.courses c join public.worlds w on w.id = c.world_id
where c.slug = 'digital-agency-aaa' and w.slug = 'business'
on conflict (course_id, slug) do update set
  title = excluded.title, description = excluded.description, objectives = excluded.objectives,
  order_index = excluded.order_index, xp_reward = excluded.xp_reward, is_published = true;
insert into public.units (course_id, slug, title, description, objectives, order_index, xp_reward, is_published)
select c.id, 'pe-u1', 'Prompts que producen dinero', 'De la petición vaga al sistema de instrucciones reproducible.', ARRAY['Estructurar un prompt con los cinco bloques esenciales','Iterar con ejemplos en lugar de con adjetivos','Diseñar salidas estructuradas que se puedan automatizar']::text[], 1, 110, true
from public.courses c join public.worlds w on w.id = c.world_id
where c.slug = 'prompt-engineering' and w.slug = 'ai'
on conflict (course_id, slug) do update set
  title = excluded.title, description = excluded.description, objectives = excluded.objectives,
  order_index = excluded.order_index, xp_reward = excluded.xp_reward, is_published = true;
insert into public.units (course_id, slug, title, description, objectives, order_index, xp_reward, is_published)
select c.id, 'st-u1', 'Validar antes de construir', 'Cómo sustituir la intuición por evidencia en 14 días.', ARRAY['Formular una hipótesis falsable','Entrevistar sin dirigir las respuestas','Conseguir un pago antes de construir']::text[], 1, 110, true
from public.courses c join public.worlds w on w.id = c.world_id
where c.slug = 'validar-startup' and w.slug = 'business'
on conflict (course_id, slug) do update set
  title = excluded.title, description = excluded.description, objectives = excluded.objectives,
  order_index = excluded.order_index, xp_reward = excluded.xp_reward, is_published = true;
insert into public.units (course_id, slug, title, description, objectives, order_index, xp_reward, is_published)
select c.id, 'pr-u1', 'Tu primer programa', 'Algoritmos, variables, condiciones y bucles con un objetivo final: una calculadora de margen.', ARRAY['Describir un problema como una secuencia de pasos','Guardar y transformar datos con variables','Tomar decisiones con condiciones y repetir con bucles']::text[], 1, 95, true
from public.courses c join public.worlds w on w.id = c.world_id
where c.slug = 'fundamentos' and w.slug = 'programming'
on conflict (course_id, slug) do update set
  title = excluded.title, description = excluded.description, objectives = excluded.objectives,
  order_index = excluded.order_index, xp_reward = excluded.xp_reward, is_published = true;
insert into public.units (course_id, slug, title, description, objectives, order_index, xp_reward, is_published)
select c.id, 'fi-u1', 'El interés compuesto y sus enemigos', 'Cómo el tiempo y las comisiones deciden el resultado final.', ARRAY['Calcular el efecto del interés compuesto','Medir cuánto cuesta una comisión anual','Distinguir riesgo de volatilidad']::text[], 1, 105, true
from public.courses c join public.worlds w on w.id = c.world_id
where c.slug = 'inversion-primeriza' and w.slug = 'finance'
on conflict (course_id, slug) do update set
  title = excluded.title, description = excluded.description, objectives = excluded.objectives,
  order_index = excluded.order_index, xp_reward = excluded.xp_reward, is_published = true;

insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'ms-1-1', 'Misión 1: elige un nicho en 20 minutos', 'Tres preguntas que descartan el 90% de las ideas.', '{"schema":1,"keyIdea":"Nicho correcto = alguien que ya paga + accesible + entregable por ti.","theory":"Elegir nicho no es una decisión para siempre: es la hipótesis de trabajo que te permite empezar. Tres filtros eliminan casi todo: (1) ¿Hay gente que ya paga por resolver esto? Si nadie paga, no hay mercado que validar, hay que educar. (2) ¿Puedo llegar a 50 de esas personas esta semana sin anuncios? Si no puedes construir la lista, no puedes vender. (3) ¿Puedo entregar el resultado yo solo en una semana? Si necesita un equipo, no es una primera misión. La intersección de esos tres filtros suele ser un nicho pequeño, con presupuesto y con una comunidad accesible: despachos profesionales, clínicas, tiendas locales, creadores con audiencia. El nicho correcto no es el más grande: es el que puedes alcanzar y servir.","action":"Escribe tu nicho y las 3 razones por las que pasas los tres filtros.","outcome":"Un entregable publicado, una oferta enviada y una conversación de venta agendada.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"¿Qué filtro descartaría antes un nicho?","options":[{"id":"a","text":"Que el mercado sea pequeño"},{"id":"b","text":"Que nadie pague aún por resolver el problema"},{"id":"c","text":"Que haya competencia"}],"correct":{"value":"b"},"explanation":"Competencia significa mercado validado. Que nadie pague significa que hay que crear la categoría: demasiado caro para empezar.","hint":null},{"id":"e2","type":"multi_select","prompt":"¿Qué hace bueno a un nicho para empezar solo?","options":[{"id":"a","text":"Tiene presupuesto asignado"},{"id":"b","text":"Es accesible sin publicidad"},{"id":"c","text":"Puedes entregar el resultado tú mismo"},{"id":"d","text":"Es el mercado más grande posible"}],"correct":{"values":["a","b","c"]},"explanation":"Alcance, presupuesto y capacidad de entrega. El tamaño es lo último que importa al principio.","hint":null},{"id":"e3","type":"fill_blank","prompt":"A la intersección entre lo que sabes hacer, lo que alguien paga y lo que puedes alcanzar se le suele llamar tu ______.","options":null,"correct":{"acceptable":["nicho","ventaja","enfoque","círculo"],"value":"nicho"},"explanation":"Nicho: la intersección que te permite empezar esta semana.","hint":null},{"id":"e4","type":"true_false","prompt":"Elegir nicho es una decisión irreversible.","options":[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}],"correct":{"value":"false"},"explanation":"Es una hipótesis. Si no hay tracción en 30 días, se cambia de nicho manteniendo la habilidad.","hint":null}]}'::jsonb, 1, 5, 30, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'ms-u1' and c.slug = 'misiones-nivel-1' and w.slug = 'business'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'ms-1-2', 'Misión 2: tu oferta en una frase', 'El test de «¿me lo compraría mi madre?».', '{"schema":1,"keyIdea":"Si no puedes decir tu oferta en una frase, el cliente tampoco puede comprarla.","theory":"Una oferta se entiende o no se entiende: no hay término medio. El test más rápido es leerla en voz alta a alguien ajeno a tu negocio y comprobar si puede repetirla. La fórmula completa es: ayudo a [cliente concreto] a conseguir [resultado medible] en [plazo] sin [objeción principal]. Si necesitas tres frases para explicarla, no está lista. Y hay una prueba final demoledoramente práctica: ¿tú mismo pagarías por eso lo que vas a cobrar? Si dudas, no es que el mercado sea difícil: es que la oferta no está resuelta. Ajusta el resultado o el alcance hasta que la respuesta sea un sí sin matices.","action":"Escribe la oferta con la fórmula completa y léela a 3 personas ajenas.","outcome":"Un entregable publicado, una oferta enviada y una conversación de venta agendada.","exercises":[{"id":"e1","type":"ordering","prompt":"Ordena la fórmula de la oferta:","options":[{"id":"a","text":"Ayudo a [cliente]"},{"id":"b","text":"a conseguir [resultado]"},{"id":"c","text":"en [plazo]"},{"id":"d","text":"sin [objeción]"}],"correct":{"order":["a","b","c","d"]},"explanation":"Cliente, resultado, plazo y objeción desactivada: cuatro piezas, ninguna opcional.","hint":null},{"id":"e2","type":"multiple_choice","prompt":"Tu oferta ocupa tres frases y nadie sabe repetirla. ¿Qué haces?","options":[{"id":"a","text":"Añadir una cuarta frase explicativa"},{"id":"b","text":"Reducir el alcance hasta que quepa en una frase"},{"id":"c","text":"Cambiar el logo"}],"correct":{"value":"b"},"explanation":"La longitud es un síntoma de falta de foco, no de falta de explicación.","hint":null},{"id":"e3","type":"fill_blank","prompt":"El test definitivo de una oferta es que tú mismo ______ por ella el precio que vas a cobrar.","options":null,"correct":{"acceptable":["pagarías","pagarias","comprarías","comprarias"],"value":"pagarías"},"explanation":"Si no la comprarías, estás vendiendo algo que no has validado ni contigo mismo.","hint":null},{"id":"e4","type":"true_false","prompt":"Una oferta dirigida a todo el mundo suele convertir mejor porque abarca más mercado.","options":[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}],"correct":{"value":"false"},"explanation":"Abarcar más diluye el mensaje: la conversión cae aunque el mercado sea mayor.","hint":null}]}'::jsonb, 2, 4, 30, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'ms-u1' and c.slug = 'misiones-nivel-1' and w.slug = 'business'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'ms-1-3', 'Misión 3: define tu número', 'Sin métrica, el progreso es una sensación.', '{"schema":1,"keyIdea":"Una métrica por semana, revisada el mismo día a la misma hora.","theory":"Cada semana debe tener un número que responda «¿voy mejor?». No vale «trabajar mucho»: vale una cifra de actividad (mensajes enviados, entrevistas hechas, entregables publicados) y una de resultado (pagos, clientes, retención). Al principio manda la actividad, porque el embudo aún no tiene volumen para leer conversiones. La regla práctica es elegir una sola métrica principal por semana y revisarla el mismo día a la misma hora. Ese ritual evita dos enfermedades frecuentes: la ilusión de progreso por estar ocupado, y el abandono prematuro de algo que estaba empezando a funcionar.","action":"Elige tu métrica de la semana y pon una alarma para revisarla el viernes.","outcome":"Un entregable publicado, una oferta enviada y una conversación de venta agendada.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"Primera semana sin embudo con volumen. ¿Qué métrica sigues?","options":[{"id":"a","text":"Tasa de conversión de la landing"},{"id":"b","text":"Número de conversaciones cualificadas mantenidas"},{"id":"c","text":"Beneficio neto"}],"correct":{"value":"b"},"explanation":"Con poco tráfico las tasas son ruido. Mide actividad que puedas controlar.","hint":null},{"id":"e2","type":"multi_select","prompt":"¿Qué evita tener una métrica semanal clara?","options":[{"id":"a","text":"Confundir estar ocupado con avanzar"},{"id":"b","text":"Abandonar algo que empezaba a funcionar"},{"id":"c","text":"Tener que hablar con clientes"}],"correct":{"values":["a","b"]},"explanation":"La métrica es un espejo: impide autoengañarse en las dos direcciones.","hint":null},{"id":"e3","type":"fill_blank","prompt":"Una métrica que puedes mover directamente con tu esfuerzo (mensajes, llamadas) se llama métrica de ______.","options":null,"correct":{"acceptable":["actividad","entrada","proceso"],"value":"actividad"},"explanation":"Actividad primero, resultado después: el embudo necesita volumen antes de dar tasas.","hint":null},{"id":"e4","type":"simulation","prompt":"Llevas 3 semanas con la misma métrica sin mejorar. ¿Qué haces?","options":[{"id":"a","text":"Cambiar de métrica para ver algo mejor"},{"id":"b","text":"Revisar qué estás haciendo exactamente y cambiar una sola palanca"},{"id":"c","text":"Esperar dos meses más"}],"correct":{"value":"b"},"explanation":"Cambiar la métrica es maquillaje. Cambiar una palanca es experimentación.","hint":null}]}'::jsonb, 3, 4, 25, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'ms-u1' and c.slug = 'misiones-nivel-1' and w.slug = 'business'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'ms-2-1', 'Misión 4: 50 nombres, no 5.000 seguidores', 'La lista es el activo, no la audiencia.', '{"schema":1,"keyIdea":"Cincuenta filas con detalle vencen a cinco mil contactos sin contexto.","theory":"Una lista de 50 personas concretas con nombre, contexto y motivo vale más que 5.000 seguidores que no te conocen. Elige una fuente donde tu nicho ya esté concentrado (directorios profesionales, grupos, licitaciones, directorios de clínicas, marketplaces) y construye la lista a mano. Para cada fila necesitas cuatro campos: nombre de la persona, empresa, señal de que el problema existe, y un detalle que solo alguien que ha mirado podría escribir. Ese cuarto campo es lo que separa un mensaje que se responde de uno que se borra. Y una advertencia legal y práctica: usa datos públicos, respeta la normativa de protección de datos y no compres listas.","action":"Construye 50 filas con los cuatro campos. Sin excepciones.","outcome":"Un entregable publicado, una oferta enviada y una conversación de venta agendada.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"¿Qué campo hace que un mensaje en frío no parezca spam?","options":[{"id":"a","text":"El cargo de la persona"},{"id":"b","text":"Un detalle específico que demuestra que has mirado"},{"id":"c","text":"El tamaño de la empresa"}],"correct":{"value":"b"},"explanation":"La especificidad es la prueba de que no eres un envío masivo.","hint":null},{"id":"e2","type":"multi_select","prompt":"¿Qué es aceptable al construir una lista?","options":[{"id":"a","text":"Usar datos públicos y profesionales"},{"id":"b","text":"Comprar una base de datos"},{"id":"c","text":"Respetar la normativa de protección de datos"},{"id":"d","text":"Registrar el motivo por el que contactas"}],"correct":{"values":["a","c","d"]},"explanation":"Comprar listas es ilegal en muchos casos y siempre contraproducente para la entregabilidad.","hint":null},{"id":"e3","type":"fill_blank","prompt":"Una lista de 50 contactos bien investigados vale más que una audiencia de 5.000 seguidores sin ______.","options":null,"correct":{"acceptable":["contexto","relación","relacion","interés","interes"],"value":"contexto"},"explanation":"El contexto es lo que convierte un contacto en una conversación.","hint":null},{"id":"e4","type":"ordering","prompt":"Ordena la construcción de la lista:","options":[{"id":"a","text":"Elegir la fuente donde está concentrado el nicho"},{"id":"b","text":"Identificar al decisor de cada empresa"},{"id":"c","text":"Anotar la señal del problema"},{"id":"d","text":"Escribir el detalle específico"}],"correct":{"order":["a","b","c","d"]},"explanation":"Fuente, persona, señal, detalle: el orden de la investigación.","hint":null}]}'::jsonb, 1, 5, 35, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'ms-u2' and c.slug = 'misiones-nivel-1' and w.slug = 'business'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'ms-2-2', 'Misión 5: 20 mensajes que no son spam', 'Estructura de 90 palabras y qué NO poner.', '{"schema":1,"keyIdea":"90 palabras, cuatro partes y un seguimiento a las 48 horas.","theory":"Un mensaje en frío que funciona tiene cuatro partes y ninguna más: (1) una línea de contexto específico que demuestre que has mirado su negocio, (2) el problema que probablemente tienen, en una frase, (3) una prueba breve de que lo has resuelto antes, (4) una pregunta de bajo compromiso («¿tiene sentido que te cuente en 10 minutos cómo lo hice?»). Nada de adjuntos, nada de párrafos sobre tu trayectoria, nada de «espero que estés bien». Y una regla operativa: envía 20, espera 48 horas, y sigue con un mensaje de una línea que aporte algo nuevo. La mayoría de las respuestas no llegan en el primer mensaje: llegan en el seguimiento.","action":"Escribe tu plantilla y envíala a 20 personas de tu lista.","outcome":"Un entregable publicado, una oferta enviada y una conversación de venta agendada.","exercises":[{"id":"e1","type":"ordering","prompt":"Ordena el mensaje en frío:","options":[{"id":"a","text":"Contexto específico de su negocio"},{"id":"b","text":"Problema probable en una frase"},{"id":"c","text":"Prueba breve de que lo has resuelto"},{"id":"d","text":"Pregunta de bajo compromiso"}],"correct":{"order":["a","b","c","d"]},"explanation":"Contexto, problema, prueba y micro-compromiso. En ese orden, no en otro.","hint":null},{"id":"e2","type":"multi_select","prompt":"¿Qué debes quitar de tu mensaje?","options":[{"id":"a","text":"Un párrafo sobre tu empresa"},{"id":"b","text":"El contexto específico"},{"id":"c","text":"Un PDF adjunto de 20 páginas"},{"id":"d","text":"La pregunta final"}],"correct":{"values":["a","c"]},"explanation":"El mensaje existe para conseguir una conversación, no para explicarte.","hint":null},{"id":"e3","type":"fill_blank","prompt":"El segundo mensaje, que llega días después del primero, se llama ______.","options":null,"correct":{"acceptable":["seguimiento","follow-up","recordatorio","seguimiento (follow-up)"],"value":"seguimiento"},"explanation":"El seguimiento recupera a quien lo leyó y no respondió, que es la mayoría.","hint":null},{"id":"e4","type":"simulation","prompt":"Enviaste 20 mensajes ayer y nadie contesta. ¿Qué haces hoy?","options":[{"id":"a","text":"Reescribir la oferta completa"},{"id":"b","text":"Esperar 48 horas y enviar un seguimiento de una línea"},{"id":"c","text":"Enviar 100 más iguales"}],"correct":{"value":"b"},"explanation":"El primer mensaje rara vez responde. El seguimiento es donde vive la mayoría de la conversación.","hint":null}]}'::jsonb, 2, 5, 35, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'ms-u2' and c.slug = 'misiones-nivel-1' and w.slug = 'business'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'ms-2-3', 'Misión 6: tres conversaciones de verdad', 'Diagnóstico antes de soluciones.', '{"schema":1,"keyIdea":"El objetivo de las primeras llamadas es entender, no cerrar.","theory":"Tres conversaciones reales enseñan más que tres meses leyendo. El objetivo de las tres primeras no es vender: es entender. Prepara seis preguntas y habla menos de la mitad del tiempo. Al final de cada llamada, pide una cosa concreta: permiso para enviar una propuesta, una introducción a otro contacto, o un «no» claro. El «no» también es un resultado: te dice que la oferta no encaja, y eso ahorra semanas. Toma notas literales de las palabras que usa el cliente: esas frases son el mejor material de marketing que vas a encontrar y no se pueden inventar desde una mesa.","action":"Agenda 3 llamadas de 20 minutos esta semana.","outcome":"Un entregable publicado, una oferta enviada y una conversación de venta agendada.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"Objetivo principal de tus 3 primeras llamadas:","options":[{"id":"a","text":"Cerrar el primer contrato"},{"id":"b","text":"Entender el problema con las palabras del cliente"},{"id":"c","text":"Presentar tu portfolio completo"}],"correct":{"value":"b"},"explanation":"El diagnóstico precede al contrato. Sin problema entendido no hay propuesta defendible.","hint":null},{"id":"e2","type":"fill_blank","prompt":"Las frases exactas que usa el cliente para describir su problema son tu mejor material de ______.","options":null,"correct":{"acceptable":["marketing","copy","venta","mensaje"],"value":"marketing"},"explanation":"El copy que convierte suele ser una transcripción del cliente, no una creación tuya.","hint":null},{"id":"e3","type":"multi_select","prompt":"¿Qué puedes pedir al final de una conversación?","options":[{"id":"a","text":"Permiso para enviar una propuesta"},{"id":"b","text":"Una introducción a otro contacto"},{"id":"c","text":"Un no claro"},{"id":"d","text":"Que te firmes un contrato en la llamada"}],"correct":{"values":["a","b","c"]},"explanation":"Pedir compromisos pequeños mantiene el movimiento. Exigir contrato en la primera llamada lo rompe.","hint":null},{"id":"e4","type":"true_false","prompt":"Un «no» claro en una primera llamada es un fracaso de la misión.","options":[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}],"correct":{"value":"false"},"explanation":"Es información: descarta una dirección y te ahorra semanas. El fracaso es la ambigüedad eterna.","hint":null}]}'::jsonb, 3, 5, 35, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'ms-u2' and c.slug = 'misiones-nivel-1' and w.slug = 'business'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'ms-2-4', 'Misión 7: envía una propuesta esta semana', 'Una página, dos opciones, alcance cerrado.', '{"schema":1,"keyIdea":"Propuesta el mismo día; precio con dos opciones; alcance con límites.","theory":"Enviar propuestas se aprende enviando propuestas. La estructura mínima: el problema con las palabras del cliente, el resultado con una métrica, el plazo, el precio con dos opciones y los límites del alcance. Envíala el mismo día de la llamada, mientras la conversación está caliente, y pide una fecha concreta para decidir. Después, no persigas: haz seguimiento dos veces y deja la puerta abierta. Lo que sí puedes hacer es mejorar el proceso cada vez: anota en qué punto la propuesta se queda parada (precio, plazo, alcance, decisor) y corrige ese punto en la siguiente.","action":"Envía una propuesta de una página a un contacto real esta semana.","outcome":"Un entregable publicado, una oferta enviada y una conversación de venta agendada.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"¿Cuándo envías la propuesta?","options":[{"id":"a","text":"El mismo día de la llamada"},{"id":"b","text":"Cuando el cliente insista tres veces"},{"id":"c","text":"En dos semanas, para parecer ocupado"}],"correct":{"value":"a"},"explanation":"La temperatura de la conversación baja rápido. Enviar el mismo día multiplica la probabilidad de respuesta.","hint":null},{"id":"e2","type":"fill_blank","prompt":"La parte de la propuesta que evita que el proyecto se expanda sin límite se llama ______ del alcance.","options":null,"correct":{"acceptable":["límite","limite","definición","definicion","acotación","acotacion"],"value":"límite"},"explanation":"Alcance cerrado: lo que no está escrito, no está incluido.","hint":null},{"id":"e3","type":"ordering","prompt":"Ordena la propuesta de una página:","options":[{"id":"a","text":"Problema con las palabras del cliente"},{"id":"b","text":"Resultado con métrica y plazo"},{"id":"c","text":"Precio con dos opciones"},{"id":"d","text":"Límites del alcance"},{"id":"e","text":"Fecha concreta para decidir"}],"correct":{"order":["a","b","c","d","e"]},"explanation":"Empieza por el cliente, termina pidiendo una decisión con fecha.","hint":null},{"id":"e4","type":"simulation","prompt":"La propuesta lleva 10 días sin respuesta tras un seguimiento. ¿Qué haces?","options":[{"id":"a","text":"Bajar el precio un 30%"},{"id":"b","text":"Un segundo y último seguimiento breve, dejar la puerta abierta y seguir con la lista"},{"id":"c","text":"Llamar cada día"}],"correct":{"value":"b"},"explanation":"Dos seguimientos y a otra cosa. El tiempo del fundador solo vale si se invierte donde hay retorno.","hint":null}]}'::jsonb, 4, 5, 40, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'ms-u2' and c.slug = 'misiones-nivel-1' and w.slug = 'business'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'sd-1-1', 'El error de los 500 € en anuncios', 'Por qué el dropshipping no falla por el producto, sino por el orden.', '{"schema":1,"keyIdea":"El tráfico es el último paso, nunca el primero.","theory":"Casi todo el mundo que fracasa en dropshipping sigue el mismo guion: ve un producto que funciona a otro, monta la tienda en dos horas y mete 500 € en Meta Ads. Al cuarto día tiene 40 visitas y 0 ventas, y concluye que «el dropshipping ya no funciona». El problema no es el canal: es que nunca comprobó si la unidad económica cerraba. Antes de pagar por un clic necesitas saber tres cosas: cuánto te cuesta el producto puesto en casa del cliente, a qué precio puedes venderlo y cuánto puedes pagar por una visita. Si esos tres números no cierran en papel, no cierran en la realidad.","action":"Abre una hoja de cálculo con 3 columnas: coste aterrizado, precio de venta y margen bruto.","outcome":"Una tienda validada con criterio de márgenes y un plan de primeros 10 pedidos por menos de 100 €.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"Llevas 4 días con 500 € en anuncios y ninguna venta. ¿Cuál es el primer dato que deberías haber calculado?","options":[{"id":"a","text":"El número de seguidores del competidor"},{"id":"b","text":"El margen bruto por unidad y el coste máximo por visita"},{"id":"c","text":"El color del botón de compra"},{"id":"d","text":"La velocidad de carga del servidor"}],"correct":{"value":"b"},"explanation":"Sin margen unitario no existe umbral de rentabilidad publicitaria. Los demás datos son decoración.","hint":null},{"id":"e2","type":"true_false","prompt":"Si un producto se vende mucho en TikTok, está garantizado que funcionará en tu tienda.","options":[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}],"correct":{"value":"false"},"explanation":"La demanda ajena es una señal, no una garantía: el mismo producto compite ya contra quien lo popularizó, con más historial y mejores precios.","hint":null},{"id":"e3","type":"fill_blank","prompt":"El coste real del producto incluyendo envío, comisiones y devoluciones se llama coste ______.","options":null,"correct":{"acceptable":["aterrizado","landed"],"value":"aterrizado"},"explanation":"El coste aterrizado (landed cost) es el único número que sirve para fijar precio: incluye producto, envío, pasarela de pago y una provisión de devoluciones.","hint":null},{"id":"e4","type":"simulation","prompt":"Tienes 100 € de presupuesto total. Producto a 6 €, venta prevista a 29,90 €, envío 4 €. ¿Qué haces primero?","options":[{"id":"a","text":"Lanzar una campaña de conversión optimizada a compra con los 100 €"},{"id":"b","text":"Conseguir 20-30 clics gratuitos (orgánico o microcreadores) para medir intención de compra"},{"id":"c","text":"Comprar 500 unidades para negociar precio"}],"correct":{"value":"b"},"explanation":"Con 100 € no compras datos estadísticamente significativos en pago. Primero mides intención con coste cero.","hint":null}]}'::jsonb, 1, 4, 20, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'sd-u1' and c.slug = 'smart-dropshipping' and w.slug = 'business'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'sd-1-2', 'Cómo se calcula el margen de verdad', 'Coste aterrizado, comisiones, devoluciones y la regla 3x.', '{"schema":1,"keyIdea":"Precio ≥ 3 × coste aterrizado. Si no, el negocio no tiene espacio para adquirir clientes.","theory":"Producto 8 € + envío 4 € = 12 €. Ese no es tu coste: falta la comisión de la pasarela (≈3% + 0,25 €), el coste de las devoluciones (si devuelven un 5%, añade unos 0,60 € de media) y el tiempo de atención al cliente. Con un precio de 29,90 € tu margen bruto real es de unos 16 €, no de 22 €. La regla 3x dice que el precio de venta debería ser al menos tres veces el coste aterrizado: eso deja margen para pagar publicidad, devoluciones y seguir ganando. Si un producto solo permite 1,8x, no es un mal producto: es un producto que no admite tráfico de pago.","action":"Calcula el margen real de un producto que estés mirando ahora mismo y decide si pasa la regla 3x.","outcome":"Una tienda validada con criterio de márgenes y un plan de primeros 10 pedidos por menos de 100 €.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"Producto 9 €, envío 3 €, comisión de pasarela 1,20 € y provisión de devoluciones 0,80 €. ¿Coste aterrizado?","options":[{"id":"a","text":"9 €"},{"id":"b","text":"12 €"},{"id":"c","text":"14 €"},{"id":"d","text":"13 €"}],"correct":{"value":"c"},"explanation":"9 + 3 + 1,20 + 0,80 = 14 €. Cualquier precio por debajo de 42 € incumple la regla 3x.","hint":null},{"id":"e2","type":"multiple_choice","prompt":"Vendes a 39,90 € con coste aterrizado de 21 €. ¿Pasa la regla 3x?","options":[{"id":"a","text":"Sí, con margen de sobra"},{"id":"b","text":"No: 3 × 21 = 63 €, el precio se queda corto"},{"id":"c","text":"Es indiferente mientras haya ventas"}],"correct":{"value":"b"},"explanation":"Ratio de 1,9x. Puedes vender, pero no puedes pagar adquisición: cada cliente nuevo se come el margen.","hint":null},{"id":"e3","type":"fill_blank","prompt":"Si tu margen bruto por pedido es 18 € y quieres un beneficio de 6 € por pedido, tu coste máximo de adquisición (CAC) es ____ €.","options":null,"correct":{"acceptable":["12","12.0","12,0"],"value":"12"},"explanation":"18 − 6 = 12 € de CAC objetivo. Ese número decide qué campañas puedes permitirte.","hint":null},{"id":"e4","type":"true_false","prompt":"Subir el precio siempre reduce las ventas.","options":[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}],"correct":{"value":"false"},"explanation":"En muchos nichos un precio más alto aumenta la percepción de calidad y mejora la conversión. Y siempre mejora el margen: es la palanca más rápida que existe.","hint":null}]}'::jsonb, 2, 5, 20, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'sd-u1' and c.slug = 'smart-dropshipping' and w.slug = 'business'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'sd-1-3', 'La oferta que no se puede comparar', 'Cómo empaquetar producto y servicio para escapar de la guerra de precios.', '{"schema":1,"keyIdea":"No vendes un producto; vendes una transformación concreta y medible.","theory":"Si vendes «el mismo producto» que otros diez, el cliente solo puede comparar precio y plazo. La salida no es bajar el precio: es cambiar la unidad de comparación. Una oferta se diferencia cuando añade algo que el cliente valora y el competidor no puede copiar rápido: una guía de uso, una garantía de 60 días, un pack que resuelve el problema completo, una marca con una promesa clara. En términos prácticos, vende el resultado («cocina sano en 12 minutos») y usa el producto como vehículo. El precio deja de competir contra otro producto y empieza a competir contra el coste de no resolver el problema.","action":"Reescribe el titular de tu producto en formato resultado + plazo + para quién.","outcome":"Una tienda validada con criterio de márgenes y un plan de primeros 10 pedidos por menos de 100 €.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"¿Cuál de estos titulares reduce más la comparación por precio?","options":[{"id":"a","text":"Botella térmica de acero 500 ml"},{"id":"b","text":"Mantén el café caliente 12 horas en el trabajo, sin microondas"},{"id":"c","text":"¡Oferta! Botella 50% OFF"}],"correct":{"value":"b"},"explanation":"Describe el resultado y el contexto de uso. La botella pasa de commodity a solución.","hint":null},{"id":"e2","type":"multi_select","prompt":"¿Qué elementos puedes añadir a la oferta sin subir mucho el coste?","options":[{"id":"a","text":"Una guía PDF de uso con 3 recetas"},{"id":"b","text":"Garantía de devolución de 60 días"},{"id":"c","text":"Comprar 1.000 unidades extra de stock"},{"id":"d","text":"Un vídeo de 40 segundos mostrando el resultado real"}],"correct":{"values":["a","b","d"]},"explanation":"Contenido, garantía y prueba visual cuestan casi cero y suben conversión. El stock extra es riesgo, no oferta.","hint":null},{"id":"e3","type":"ordering","prompt":"Ordena la estructura de una página de producto que convierte:","options":[{"id":"a","text":"Titular con el resultado"},{"id":"b","text":"Prueba visual del antes y el después"},{"id":"c","text":"Qué incluye y precio con ancla"},{"id":"d","text":"Garantía y respuesta a la objeción principal"},{"id":"e","text":"Reseñas con nombre y foto"}],"correct":{"order":["a","b","c","d","e"]},"explanation":"Primero captas la atención, luego demuestras, después pones el precio con contexto, desmontas la objeción y cierras con prueba social.","hint":null},{"id":"e4","type":"fill_blank","prompt":"La objeción más frecuente en dropshipping suele ser «¿y si no me llega?». La respuesta operativa que la resuelve se llama política de ______.","options":null,"correct":{"acceptable":["devolución","devolucion","reembolso","garantía","garantia"],"value":"devolución"},"explanation":"Una política de devolución clara y visible convierte más que cualquier descuento.","hint":null}]}'::jsonb, 3, 5, 25, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'sd-u1' and c.slug = 'smart-dropshipping' and w.slug = 'business'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'sd-1-4', 'Tus primeros 10 pedidos sin anuncios', 'Un plan de validación de 14 días con menos de 100 €.', '{"schema":1,"keyIdea":"Con pocos datos se cambia la oferta; con muchos datos se cambia el canal.","theory":"Los primeros 10 pedidos tienen una función: demostrar que existe demanda dispuesta a pagar. No necesitas escala, necesitas señal. Tres vías de coste bajo: microcreadores de 1.000 a 20.000 seguidores que aceptan producto a cambio de contenido, contenido orgánico que demuestra el producto resolviendo un problema real, y comunidades donde ya se habla del problema (no del producto). Mide siempre lo mismo: visitas, añadir al carrito y compra. Si con 200 visitas cualificadas tienes 0 añadidos al carrito, el problema es la oferta, no el tráfico. Cambia la oferta antes de cambiar el canal.","action":"Haz una lista de 15 microcreadores de tu nicho y escribe el mensaje de 4 líneas que les enviarás.","outcome":"Una tienda validada con criterio de márgenes y un plan de primeros 10 pedidos por menos de 100 €.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"200 visitas cualificadas y 0 añadidos al carrito. ¿Qué concluyes?","options":[{"id":"a","text":"Necesito más tráfico"},{"id":"b","text":"La oferta o la página no convierten: hay que cambiarlas"},{"id":"c","text":"El producto no tiene mercado"}],"correct":{"value":"b"},"explanation":"Cero intención con tráfico relevante es un problema de oferta y de página. El mercado aún no está descartado.","hint":null},{"id":"e2","type":"ordering","prompt":"Ordena el plan de validación de 14 días:","options":[{"id":"a","text":"Definir oferta y precio con la regla 3x"},{"id":"b","text":"Montar la página con prueba visual y garantía"},{"id":"c","text":"Contactar a 15 microcreadores"},{"id":"d","text":"Publicar 3 vídeos de demostración propios"},{"id":"e","text":"Revisar métricas y decidir: doblar o cambiar"}],"correct":{"order":["a","b","c","d","e"]},"explanation":"La secuencia importa: sin oferta definida, todo lo demás mide ruido.","hint":null},{"id":"e3","type":"fill_blank","prompt":"La métrica que mejor indica intención real de compra antes de pagar es la tasa de ______ al carrito.","options":null,"correct":{"acceptable":["añadir","anadir","adición","adicion"],"value":"añadir"},"explanation":"Añadir al carrito expresa intención; el clic expresa curiosidad.","hint":null},{"id":"e4","type":"true_false","prompt":"Regalar producto a microcreadores es publicidad encubierta y hay que declararlo.","options":[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}],"correct":{"value":"true"},"explanation":"Sí: la relación comercial debe declararse. Además de ser legal, la transparencia protege la confianza, que es el activo que estás comprando.","hint":null}]}'::jsonb, 4, 5, 30, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'sd-u1' and c.slug = 'smart-dropshipping' and w.slug = 'business'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'ag-1-1', 'La oferta de nicho en una frase', 'Cómo dejar de ser «el que hace webs» y empezar a ser la solución de alguien.', '{"schema":1,"keyIdea":"Si tu oferta sirve para todos, no es una oferta: es un catálogo.","theory":"Una agencia generalista compite con todo el mundo y no puede cobrar caro. Una agencia de nicho compite con casi nadie y puede cobrar por resultado. La fórmula de la oferta es: resultado medible para un tipo de cliente concreto, en un plazo, sin el miedo principal de ese cliente. Ejemplo: «Consigo 15 citas cualificadas al mes para clínicas dentales de Madrid, sin que tengan que hacer prospección en frío». Fíjate en lo que hace: no menciona tecnología, dice resultado; no dice «empresas», dice un tipo concreto; y desactiva la objeción antes de que aparezca. Cuanto más estrecha la oferta, más fácil es que alguien diga «eso es exactamente lo que necesito».","action":"Escribe tu oferta con la fórmula resultado + cliente + plazo + objeción desactivada.","outcome":"Una oferta de nicho definida, una lista de 50 prospectos y un guion de llamada de 20 minutos.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"¿Cuál de estas es una oferta de nicho?","options":[{"id":"a","text":"Hacemos webs y marketing digital para empresas"},{"id":"b","text":"Llenamos la agenda de fisioterapeutas con 20 pacientes nuevos al mes, sin que hagan publicidad"},{"id":"c","text":"Automatizamos procesos con IA"}],"correct":{"value":"b"},"explanation":"Cliente concreto, resultado medible, plazo implícito y objeción desactivada.","hint":null},{"id":"e2","type":"multi_select","prompt":"¿Qué debilita tu oferta de nicho?","options":[{"id":"a","text":"Incluye cinco servicios distintos"},{"id":"b","text":"Promete un resultado medible"},{"id":"c","text":"No especifica el tipo de cliente"},{"id":"d","text":"Se apoya en una garantía de resultados"}],"correct":{"values":["a","c"]},"explanation":"Dispersión y ambigüedad. Los resultados y las garantías refuerzan la oferta; el catálogo la diluye.","hint":null},{"id":"e3","type":"fill_blank","prompt":"Cobrar por resultado en lugar de por horas se llama precio basado en ______.","options":null,"correct":{"acceptable":["valor","resultado","resultados"],"value":"valor"},"explanation":"Pricing basado en valor: el precio se ancla al beneficio del cliente, no al tiempo que tardas.","hint":null},{"id":"e4","type":"simulation","prompt":"Un dentista te dice: «todos los meses me llaman agencias como tú». ¿Qué respondes?","options":[{"id":"a","text":"Bajo el precio para diferenciarme"},{"id":"b","text":"«Precisamente por eso: ¿cuántas de esas llamadas te han traído 15 citas nuevas? Te enseño cómo lo medimos.»"},{"id":"c","text":"Le envío un PDF de 30 páginas con mi portfolio"}],"correct":{"value":"b"},"explanation":"Rediriges la conversación de «otro proveedor» a «resultado medible». Es la única diferencia que el cliente compra.","hint":null}]}'::jsonb, 1, 5, 25, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'ag-u1' and c.slug = 'digital-agency-aaa' and w.slug = 'business'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'ag-1-2', '50 prospectos con criterio', 'La lista que hace que la prospección no sea spam.', '{"schema":1,"keyIdea":"La personalización no es cortesía: es la única prueba de que no eres spam.","theory":"La prospección en frío falla cuando el mensaje podría enviarse a cualquiera. Funciona cuando demuestra que has mirado. Construye una lista de 50 empresas con cuatro filtros: encajan en el nicho, tienen señal de que ya invierten (web actualizada, anuncios activos, contratando), hay una persona identificable con poder de decisión, y puedes encontrar un detalle específico que personalizar. Después, un mensaje de 90 palabras: contexto específico, problema observado, prueba de que lo has resuelto, y una pregunta de bajo compromiso. No vendas en el primer mensaje: pide una conversación de 15 minutos. La tasa de respuesta de un mensaje bien personalizado es un orden de magnitud mayor que la del envío masivo.","action":"Construye 50 filas con empresa, persona, señal de inversión y detalle específico.","outcome":"Una oferta de nicho definida, una lista de 50 prospectos y un guion de llamada de 20 minutos.","exercises":[{"id":"e1","type":"ordering","prompt":"Ordena los filtros de la lista antes de escribir a nadie:","options":[{"id":"a","text":"Encaja en el nicho"},{"id":"b","text":"Señal de que ya invierte o crece"},{"id":"c","text":"Decisor identificable"},{"id":"d","text":"Detalle específico personalizable"}],"correct":{"order":["a","b","c","d"]},"explanation":"Filtrar en ese orden descarta rápido: si no encaja en el nicho, el resto da igual.","hint":null},{"id":"e2","type":"multiple_choice","prompt":"¿Cuál es el objetivo del primer mensaje en frío?","options":[{"id":"a","text":"Cerrar el contrato"},{"id":"b","text":"Enviar la propuesta"},{"id":"c","text":"Conseguir una conversación corta"},{"id":"d","text":"Presentar la empresa"}],"correct":{"value":"c"},"explanation":"El primer mensaje vende una conversación, no un servicio.","hint":null},{"id":"e3","type":"fill_blank","prompt":"Un mensaje en frío debería ocupar alrededor de ___ palabras.","options":null,"correct":{"acceptable":["90","noventa","100","80"],"value":"90"},"explanation":"Corto: el decisor lo lee en el móvil entre reuniones.","hint":null},{"id":"e4","type":"true_false","prompt":"Enviar 1.000 mensajes genéricos suele dar mejor resultado que 50 personalizados.","options":[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}],"correct":{"value":"false"},"explanation":"Además de convertir peor, daña tu dominio y tu marca. La personalización escala mucho mejor cuando se hace bien.","hint":null}]}'::jsonb, 2, 5, 25, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'ag-u1' and c.slug = 'digital-agency-aaa' and w.slug = 'business'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'ag-1-3', 'La llamada de 20 minutos', 'Diagnóstico antes de propuesta. Nunca al revés.', '{"schema":1,"keyIdea":"Quien hace las preguntas controla la venta.","theory":"El error clásico es enviar una propuesta antes de entender el problema. En una llamada de diagnóstico de 20 minutos solo hay cuatro bloques: situación actual («¿cómo consigues clientes hoy?»), problema medible («¿cuántas citas al mes necesitas para que salga rentable?»), coste del problema («¿qué te cuesta un mes sin agenda llena?») y criterios de decisión («si esto funcionara, ¿cómo sabríamos medirlo?»). Hablas tú un tercio del tiempo. Si al final no puedes repetir el problema con sus palabras, no ha habido reunión: ha habido presentación. Y no propongas precio en esa llamada: lo que dices sin preparación se convierte en un ancla de la que luego no puedes subir.","action":"Escribe las 6 preguntas de tu llamada de diagnóstico y practícalas con alguien.","outcome":"Una oferta de nicho definida, una lista de 50 prospectos y un guion de llamada de 20 minutos.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"El cliente pregunta el precio en el minuto 3. ¿Qué haces?","options":[{"id":"a","text":"Le doy una cifra para no perderlo"},{"id":"b","text":"«Depende del alcance; para darte el número correcto necesito entender X. ¿Me cuentas...?»"},{"id":"c","text":"Le envío la tarifa por email"}],"correct":{"value":"b"},"explanation":"Ancla el precio al alcance y recuperas el diagnóstico sin decir que no.","hint":null},{"id":"e2","type":"multi_select","prompt":"¿Qué pertenece a una llamada de diagnóstico?","options":[{"id":"a","text":"Situación actual del cliente"},{"id":"b","text":"Coste económico del problema"},{"id":"c","text":"Demostración de todas tus herramientas"},{"id":"d","text":"Criterios de decisión y de éxito"}],"correct":{"values":["a","b","d"]},"explanation":"Presentar herramientas es una demo: convierte cuando ya hay problema reconocido, no antes.","hint":null},{"id":"e3","type":"fill_blank","prompt":"Si no puedes repetir el problema con las palabras del cliente, no tienes diagnóstico: tienes una ______.","options":null,"correct":{"acceptable":["presentación","presentacion","demo"],"value":"presentación"},"explanation":"El diagnóstico se demuestra parafraseando, no asintiendo.","hint":null},{"id":"e4","type":"simulation","prompt":"El cliente dice «parece caro». Tu proyecto cuesta 1.200 €/mes y su ticket medio es 400 €. ¿Qué dices?","options":[{"id":"a","text":"«Te hago un 20% de descuento»"},{"id":"b","text":"«Caro comparado con qué. Con 3 clientes nuevos al mes, esto se paga solo. ¿Cuántos necesitas para cubrirlo?»"},{"id":"c","text":"«Es lo que cobra el mercado»"}],"correct":{"value":"b"},"explanation":"Traducir el precio a unidades del negocio del cliente desactiva la objeción sin destruir margen.","hint":null}]}'::jsonb, 3, 5, 30, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'ag-u1' and c.slug = 'digital-agency-aaa' and w.slug = 'business'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'ag-1-4', 'Propuesta, precio y primer contrato', 'Cómo cerrar sin regalar el trabajo.', '{"schema":1,"keyIdea":"La propuesta vende un resultado con límites, no una disponibilidad ilimitada.","theory":"Una propuesta buena tiene una página: el problema con sus palabras, el resultado comprometido con una métrica, el plazo, el precio con dos opciones y qué necesitas de ellos para empezar. Las dos opciones desplazan la decisión de «sí o no» a «cuál». Elige el formato de cobro pensando en el riesgo: proyecto cerrado para lo desconocido, retainer mensual para lo recurrente. Y protege el alcance con una frase explícita: «incluye X; cualquier cosa fuera de X se cotiza aparte». Sin eso, el primer cliente pequeño se convierte en consultoría infinita y pierdes margen y energía.","action":"Monta tu plantilla de propuesta de una página con dos opciones de precio.","outcome":"Una oferta de nicho definida, una lista de 50 prospectos y un guion de llamada de 20 minutos.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"¿Por qué presentar dos opciones de precio?","options":[{"id":"a","text":"Para parecer más barato"},{"id":"b","text":"Porque desplaza la decisión de comprar o no a elegir cuál"},{"id":"c","text":"Para confundir al cliente"}],"correct":{"value":"b"},"explanation":"Efecto de elección: comparar dos opciones es más fácil que aceptar o rechazar una.","hint":null},{"id":"e2","type":"fill_blank","prompt":"El cobro recurrente mensual por un servicio continuado se llama ______.","options":null,"correct":{"acceptable":["retainer","igualatorio","suscripción","suscripcion","abono"],"value":"retainer"},"explanation":"Retainer: previsibilidad de ingresos, que es lo que permite escalar con tranquilidad.","hint":null},{"id":"e3","type":"multi_select","prompt":"¿Qué debe incluir la propuesta de una página?","options":[{"id":"a","text":"El problema con las palabras del cliente"},{"id":"b","text":"El resultado con una métrica y un plazo"},{"id":"c","text":"Tu biografía completa"},{"id":"d","text":"Los límites del alcance"}],"correct":{"values":["a","b","d"]},"explanation":"La propuesta se centra en el cliente. La biografía va en el pie, si acaso.","hint":null},{"id":"e4","type":"true_false","prompt":"Aceptar un primer cliente muy por debajo de precio para «hacer portfolio» es una buena estrategia.","options":[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}],"correct":{"value":"false"},"explanation":"Fija un ancla de precio bajo que arrastra a los siguientes clientes y atrae al perfil más exigente. Mejor precio justo con alcance reducido.","hint":null}]}'::jsonb, 4, 5, 30, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'ag-u1' and c.slug = 'digital-agency-aaa' and w.slug = 'business'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'pe-1-1', 'Anatomía de un prompt', 'Cinco bloques que convierten una petición en una especificación.', '{"schema":1,"keyIdea":"Un prompt no es una pregunta: es un brief.","theory":"Un prompt vago produce una respuesta vaga: no porque el modelo sea tonto, sino porque no le has dado criterios. Los cinco bloques que separan un prompt de juguete de uno profesional son: (1) rol y contexto —quién eres y para quién es la salida—, (2) tarea concreta con un verbo de acción, (3) restricciones —longitud, tono, qué no hacer—, (4) formato de salida exacto, (5) criterios de calidad con los que el propio modelo pueda autoevaluarse antes de responder. La quinta parte es la que casi nadie usa y la que más mejora el resultado: pedir que revise la salida contra los criterios antes de entregarla cambia la calidad de forma visible.","action":"Reescribe el último prompt que usaste añadiendo los bloques 3, 4 y 5.","outcome":"Un sistema de prompts reutilizable y una oferta de servicio de IA de 300-800 €/mes.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"¿Qué bloque falta en este prompt: «Actúa como copywriter. Escribe un email de ventas para mi curso. Máximo 150 palabras. Devuelve solo el texto.»?","options":[{"id":"a","text":"El rol"},{"id":"b","text":"La restricción de longitud"},{"id":"c","text":"El contexto del público y los criterios de calidad"},{"id":"d","text":"El formato"}],"correct":{"value":"c"},"explanation":"Sin saber a quién habla ni qué hace bueno al email, el modelo improvisa.","hint":null},{"id":"e2","type":"multi_select","prompt":"¿Qué mejora más la calidad de una salida?","options":[{"id":"a","text":"Añadir «por favor, sé muy bueno»"},{"id":"b","text":"Dar un ejemplo de salida ideal"},{"id":"c","text":"Definir criterios de calidad explícitos"},{"id":"d","text":"Escribir en mayúsculas"}],"correct":{"values":["b","c"]},"explanation":"Ejemplos y criterios. Los adjetivos de ánimo y el énfasis tipográfico no aportan información.","hint":null},{"id":"e3","type":"ordering","prompt":"Ordena los bloques de un prompt profesional:","options":[{"id":"a","text":"Rol y contexto"},{"id":"b","text":"Tarea"},{"id":"c","text":"Restricciones"},{"id":"d","text":"Formato de salida"},{"id":"e","text":"Criterios de calidad"}],"correct":{"order":["a","b","c","d","e"]},"explanation":"Ese orden va de lo general a lo verificable, que es como el modelo construye la respuesta.","hint":null},{"id":"e4","type":"fill_blank","prompt":"Pedir al modelo que compruebe su respuesta contra los criterios antes de entregarla se llama autoevaluación o ______.","options":null,"correct":{"acceptable":["autocrítica","autocritica","self-check","verificación","verificacion","revisión","revision"],"value":"autocrítica"},"explanation":"La autoevaluación explícita reduce errores sin coste adicional de tu tiempo.","hint":null}]}'::jsonb, 1, 5, 25, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'pe-u1' and c.slug = 'prompt-engineering' and w.slug = 'ai'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'pe-1-2', 'Iterar con criterio, no con fe', 'Cómo mejorar una salida en tres pasos reproducibles.', '{"schema":1,"keyIdea":"Un cambio por iteración. Un prompt que funciona, se versiona.","theory":"Iterar no es reescribir el prompt al azar hasta que salga algo decente. Es un método: (1) diagnostica el fallo —¿falta información, falta formato o falta criterio?—, (2) cambia una sola cosa, (3) vuelve a probar con el mismo input. Si cambias tres cosas a la vez no sabes qué funcionó, y el prompt se convierte en superstición. Cuando el fallo es de estilo, casi siempre se arregla con un ejemplo; cuando es de formato, con un esquema explícito; cuando es de contenido, aportando datos en el propio prompt. Guarda las versiones: un prompt que funciona es un activo, y en seis meses no recordarás por qué estaba escrito así.","action":"Crea una carpeta con tus 3 mejores prompts y anota qué problema resuelve cada uno.","outcome":"Un sistema de prompts reutilizable y una oferta de servicio de IA de 300-800 €/mes.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"La salida es correcta en contenido pero demasiado larga y con tono formal. ¿Qué cambias primero?","options":[{"id":"a","text":"El modelo"},{"id":"b","text":"Las restricciones de longitud y tono"},{"id":"c","text":"La tarea"}],"correct":{"value":"b"},"explanation":"El fallo es de estilo y forma: se corrige con restricciones explícitas o un ejemplo de tono.","hint":null},{"id":"e2","type":"true_false","prompt":"Cambiar cinco cosas a la vez en el prompt es una forma eficiente de iterar.","options":[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}],"correct":{"value":"false"},"explanation":"No: no puedes atribuir la mejora. La iteración controlada cambia una variable por vuelta.","hint":null},{"id":"e3","type":"ordering","prompt":"Ordena el ciclo de iteración:","options":[{"id":"a","text":"Diagnosticar el tipo de fallo"},{"id":"b","text":"Cambiar una sola variable"},{"id":"c","text":"Repetir con el mismo input"},{"id":"d","text":"Guardar la versión que funciona"}],"correct":{"order":["a","b","c","d"]},"explanation":"Diagnóstico, cambio único, comparación y conservación: método científico aplicado a prompts.","hint":null},{"id":"e4","type":"fill_blank","prompt":"Cuando el problema es de estilo, la solución más fiable es incluir un ______ de la salida deseada.","options":null,"correct":{"acceptable":["ejemplo","muestra","few-shot"],"value":"ejemplo"},"explanation":"Los ejemplos comunican estilo mejor que cualquier adjetivo.","hint":null}]}'::jsonb, 2, 4, 25, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'pe-u1' and c.slug = 'prompt-engineering' and w.slug = 'ai'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'pe-1-3', 'Salidas estructuradas para automatizar', 'De texto bonito a JSON que un sistema puede usar.', '{"schema":1,"keyIdea":"Si la salida no se puede parsear, no se puede automatizar. Y si no se automatiza, no escala.","theory":"Un prompt solo genera valor operativo cuando su salida es consumible por un sistema. Eso significa: esquema fijo, campos obligatorios, valores cerrados y una instrucción de qué hacer si falta información. Pide siempre JSON con las claves exactas y sin texto adicional. Define enums para campos como categoría o prioridad. Y añade una regla explícita: «si el dato no aparece, devuelve null y explica en el campo motivo». Sin esa regla el modelo inventa, y un dato inventado en producción es peor que un hueco. Con esto puedes conectar la salida a una hoja de cálculo, a un CRM o a una automatización en Make o n8n sin intervención humana.","action":"Convierte tu prompt manual más repetitivo en un JSON con esquema fijo.","outcome":"Un sistema de prompts reutilizable y una oferta de servicio de IA de 300-800 €/mes.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"¿Qué instrucción evita que el modelo invente datos ausentes?","options":[{"id":"a","text":"«Sé preciso»"},{"id":"b","text":"«Si un dato no está en el texto, devuelve null en ese campo»"},{"id":"c","text":"«No te equivoques»"}],"correct":{"value":"b"},"explanation":"Una instrucción condicional explícita es la única que da un comportamiento definido ante el vacío.","hint":null},{"id":"e2","type":"multi_select","prompt":"¿Qué hace que una salida sea automatizable?","options":[{"id":"a","text":"Esquema fijo de claves"},{"id":"b","text":"Valores cerrados (enums)"},{"id":"c","text":"Texto libre inspirador"},{"id":"d","text":"Manejo explícito de datos faltantes"}],"correct":{"values":["a","b","d"]},"explanation":"El texto libre es para humanos; para sistemas hace falta estructura y valores predecibles.","hint":null},{"id":"e3","type":"fill_blank","prompt":"Un campo que solo admite un conjunto cerrado de valores se modela como ______ en el esquema.","options":null,"correct":{"acceptable":["enum","enumeración","enumeracion"],"value":"enum"},"explanation":"Los enums evitan variantes impredecibles y errores silenciosos en el sistema que consume la salida.","hint":null},{"id":"e4","type":"simulation","prompt":"Tu automatización recibe una respuesta con texto antes del JSON y falla al parsear. ¿Qué haces?","options":[{"id":"a","text":"Añadir un paso que corte el texto antes de la primera llave"},{"id":"b","text":"Pedir en el prompt «devuelve únicamente el objeto JSON, sin explicaciones ni markdown» y validar el esquema"},{"id":"c","text":"Cambiar de modelo y probar suerte"}],"correct":{"value":"b"},"explanation":"Se arregla en el origen y se protege con validación. El parche en el consumidor oculta el problema.","hint":null}]}'::jsonb, 3, 5, 30, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'pe-u1' and c.slug = 'prompt-engineering' and w.slug = 'ai'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'pe-1-4', 'Vender un servicio con IA', 'Cómo empaquetar la habilidad en algo que un negocio paga cada mes.', '{"schema":1,"keyIdea":"Se vende el resultado y la responsabilidad, no la herramienta.","theory":"Nadie paga por «saber prompts». Se paga por tiempo ahorrado o por ingresos generados, con una responsabilidad clara de quién responde si sale mal. La oferta típica funciona así: eliges un proceso caro y repetitivo de un nicho concreto (responder reseñas, clasificar leads, generar fichas de producto, redactar propuestas), construyes un flujo con revisión humana, y cobras una cuota mensual por ese proceso. Empieza con un piloto de dos semanas a precio cerrado, mide el ahorro en horas o la mejora en conversión y convierte a retainer presentando el número. El error más caro es vender «automatización total»: si el cliente no confía en el control, no firma. Vende supervisión incluida.","action":"Identifica un proceso repetitivo en un negocio que conozcas y calcula cuántas horas al mes consume.","outcome":"Un sistema de prompts reutilizable y una oferta de servicio de IA de 300-800 €/mes.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"¿Qué vende mejor un servicio de IA a un negocio?","options":[{"id":"a","text":"«Uso GPT-4 y automatizaciones con n8n»"},{"id":"b","text":"«Reduzco 12 horas al mes la gestión de reseñas, con revisión humana antes de publicar»"},{"id":"c","text":"«Soy experto en prompt engineering»"}],"correct":{"value":"b"},"explanation":"Horas ahorradas y control. La tecnología es el medio, no la promesa.","hint":null},{"id":"e2","type":"ordering","prompt":"Ordena el proceso comercial de un servicio de IA:","options":[{"id":"a","text":"Elegir un proceso caro y repetitivo de un nicho"},{"id":"b","text":"Piloto de 2 semanas a precio cerrado"},{"id":"c","text":"Medir ahorro o mejora con un número"},{"id":"d","text":"Convertir a cuota mensual con ese número"}],"correct":{"order":["a","b","c","d"]},"explanation":"El número es el puente entre el piloto y el contrato.","hint":null},{"id":"e3","type":"true_false","prompt":"Automatizar al 100% sin revisión humana es siempre lo que el cliente quiere.","options":[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}],"correct":{"value":"false"},"explanation":"La mayoría necesita control y trazabilidad. La revisión humana es parte del producto, no un defecto.","hint":null},{"id":"e4","type":"fill_blank","prompt":"Cobrar una cuota mensual recurrente por mantener un proceso funcionando se denomina modelo de ______.","options":null,"correct":{"acceptable":["suscripción","suscripcion","retainer","abono"],"value":"suscripción"},"explanation":"La recurrencia es lo que convierte un trabajo puntual en un negocio.","hint":null}]}'::jsonb, 4, 5, 30, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'pe-u1' and c.slug = 'prompt-engineering' and w.slug = 'ai'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'st-1-1', 'Tu idea no es una hipótesis', 'Cómo convertir una intuición en algo que se puede demostrar falso.', '{"schema":1,"keyIdea":"Sin umbral ni plazo no hay hipótesis: hay una opinión con fecha de caducidad indefinida.","theory":"«A la gente le cuesta organizar sus finanzas» no es una hipótesis: es una observación que nadie va a negar. Una hipótesis falsable tiene siempre la misma forma: creo que [un segmento concreto] hará [una acción observable] porque [un motivo], y lo sabré si [una métrica con umbral y plazo]. Ejemplo: «creo que 10 de cada 100 estudiantes de programación pagarían 9 €/mes por prácticas corregidas semanalmente, y lo sabré si consigo 10 pagos en 21 días». Fíjate en la diferencia: hay segmento, acción, motivo, umbral y plazo. Si al terminar el plazo no se cumple, no es un fracaso: es información. El objetivo no es tener razón, es aprender rápido y barato.","action":"Reescribe tu idea como hipótesis con segmento, acción, umbral y plazo.","outcome":"Una idea validada con 3 pagos reales y un MVP de una semana.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"¿Cuál es una hipótesis falsable?","options":[{"id":"a","text":"A la gente le gusta ahorrar"},{"id":"b","text":"10 de cada 100 profesores pagarían 15 €/mes por corrección con IA y lo sabré si logro 10 pagos en 21 días"},{"id":"c","text":"El mercado de la educación crece cada año"}],"correct":{"value":"b"},"explanation":"Tiene segmento, umbral, plazo y una acción medible. Se puede fallar.","hint":null},{"id":"e2","type":"multi_select","prompt":"¿Qué debe incluir una hipótesis?","options":[{"id":"a","text":"Segmento concreto"},{"id":"b","text":"Acción observable"},{"id":"c","text":"Umbral de éxito"},{"id":"d","text":"Un logo bonito"}],"correct":{"values":["a","b","c"]},"explanation":"Segmento, acción y umbral. El logo es cosmética.","hint":null},{"id":"e3","type":"fill_blank","prompt":"Una hipótesis que puede demostrarse falsa se llama hipótesis ______.","options":null,"correct":{"acceptable":["falsable","refutable","contrastable"],"value":"falsable"},"explanation":"Si ninguna evidencia posible podría contradecirla, no sirve para aprender.","hint":null},{"id":"e4","type":"true_false","prompt":"Que tu hipótesis falle es un fracaso del proyecto.","options":[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}],"correct":{"value":"false"},"explanation":"Es el sistema funcionando: descartas una vía por poco dinero en lugar de descubrirlo con meses y 10.000 €.","hint":null}]}'::jsonb, 1, 5, 25, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'st-u1' and c.slug = 'validar-startup' and w.slug = 'business'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'st-1-2', 'Entrevistas que no mienten', 'El problema de hablar del futuro con desconocidos educados.', '{"schema":1,"keyIdea":"Habla de lo que la gente hizo, no de lo que dice que haría.","theory":"El error más común en entrevistas de validación es preguntar «¿usarías esto?». La gente miente por amabilidad y, peor, miente sin saberlo: la intención declarada predice mal la conducta. La solución es preguntar por el pasado y por hechos concretos: la última vez que tuviste este problema, ¿qué hiciste?, ¿cuánto te costó?, ¿qué probaste antes?, ¿lo pagaste tú o tu empresa? Ocho a doce entrevistas de 20 minutos con quienes sufren el problema bastan para ver patrones. Y hay una regla de oro: si el entrevistado no ha intentado resolver el problema con sus propios medios, probablemente no era un problema suficientemente doloroso como para pagar por resolverlo.","action":"Escribe 6 preguntas sobre el pasado para tus próximas entrevistas.","outcome":"Una idea validada con 3 pagos reales y un MVP de una semana.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"¿Qué pregunta es más útil en una entrevista de validación?","options":[{"id":"a","text":"¿Comprarías una app que te ayudase a estudiar?"},{"id":"b","text":"¿Cuándo fue la última vez que dejaste un curso a medias y por qué?"},{"id":"c","text":"¿Te gusta aprender?"}],"correct":{"value":"b"},"explanation":"Pregunta por un hecho pasado y concreto; la opinión hipotética no es evidencia.","hint":null},{"id":"e2","type":"ordering","prompt":"Ordena una entrevista de problema:","options":[{"id":"a","text":"Contexto: cuéntame tu rutina de estudio"},{"id":"b","text":"Incidente: cuándo fue la última vez que falló"},{"id":"c","text":"Coste: qué hiciste y cuánto te costó"},{"id":"d","text":"Intentos previos: qué probaste antes"}],"correct":{"order":["a","b","c","d"]},"explanation":"De lo general al hecho concreto: cada capa desciende del relato a la evidencia.","hint":null},{"id":"e3","type":"fill_blank","prompt":"Una señal fuerte de que el problema es real es que la persona ya haya ______ por resolverlo.","options":null,"correct":{"acceptable":["pagado","intentado","gastado","invertido"],"value":"pagado"},"explanation":"El intento previo demuestra que el problema pasó el filtro de la pereza.","hint":null},{"id":"e4","type":"true_false","prompt":"Preguntar «¿pagarías 9 € al mes?» y recibir un sí es una validación suficiente.","options":[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}],"correct":{"value":"false"},"explanation":"Es intención declarada. Solo el pago real (o una pre-venta) valida disposición a pagar.","hint":null}]}'::jsonb, 2, 5, 25, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'st-u1' and c.slug = 'validar-startup' and w.slug = 'business'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'st-1-3', 'Pre-venta: la única validación honesta', 'Cómo pedir dinero por algo que aún no existe.', '{"schema":1,"keyIdea":"La gente miente gratis. Con su dinero, no.","theory":"La pre-venta es incómoda precisamente porque funciona: si alguien saca la tarjeta por algo que todavía no está construido, tienes la prueba más fuerte de que existe demanda. Se hace con una landing con una promesa concreta, un precio real y una fecha de entrega creíble, y una sola llamada a la acción: reservar plaza. Para que sea honesta, hay que devolver el dinero sin preguntas si no cumples la fecha. Un umbral razonable para seguir es el 2-5% de conversión sobre visitantes cualificados, o un número absoluto que cubra costes del piloto. Lo que no vale como validación: pedir emails, deseos guardados, encuestas o «me interesa». Todo eso mide curiosidad; el pago mide prioridad.","action":"Define tu precio y tu promesa en una frase que puedas poner online hoy.","outcome":"Una idea validada con 3 pagos reales y un MVP de una semana.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"¿Cuál es la señal de validación más fuerte?","options":[{"id":"a","text":"200 personas apuntadas a la lista de espera"},{"id":"b","text":"3 personas que pagan 9 € por algo que entregarás en 4 semanas"},{"id":"c","text":"50 respuestas a una encuesta diciendo «me interesa»"}],"correct":{"value":"b"},"explanation":"El dinero es la única señal de prioridad. La lista de espera es una señal débil y fácil de inflar.","hint":null},{"id":"e2","type":"multi_select","prompt":"¿Qué debe incluir una pre-venta honesta?","options":[{"id":"a","text":"Una promesa concreta y medible"},{"id":"b","text":"Un precio real"},{"id":"c","text":"Una fecha de entrega creíble"},{"id":"d","text":"Una política de devolución sin preguntas"}],"correct":{"values":["a","b","c","d"]},"explanation":"Si falta la devolución, la pre-venta se convierte en una trampa y destruye la marca.","hint":null},{"id":"e3","type":"fill_blank","prompt":"Una conversión razonable en una landing de pre-venta con tráfico cualificado está entre el 2% y el __%.","options":null,"correct":{"acceptable":["5","cinco","6","4"],"value":"5"},"explanation":"Por encima del 5% con tráfico frío desconfía: mide la muestra antes de celebrar.","hint":null},{"id":"e4","type":"simulation","prompt":"Llevas 14 días, 400 visitas y 2 pagos. ¿Qué haces?","options":[{"id":"a","text":"Construir la app completa"},{"id":"b","text":"Hablar con los 2 que pagaron y con 20 visitantes que no compraron, y ajustar la promesa"},{"id":"c","text":"Meter 1.000 € en anuncios"}],"correct":{"value":"b"},"explanation":"Con pocos pagos hay que entender el «no» antes de invertir más. Los 2 pagos son tu activo más valioso.","hint":null}]}'::jsonb, 3, 5, 30, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'st-u1' and c.slug = 'validar-startup' and w.slug = 'business'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'st-1-4', 'MVP de una semana y primeros 3 clientes', 'Lo mínimo que entrega el resultado prometido. Ni una pantalla más.', '{"schema":1,"keyIdea":"Si puedes entregarlo a mano, hazlo a mano. El software llega después de la demanda.","theory":"Un MVP no es una versión pequeña de tu producto soñado: es el experimento más barato que entrega la promesa de la pre-venta. Para LEVELUP, ese MVP no era la app completa de Duolingo: era un currículo de 3 cursos, un test de 5 minutos y un grupo con un mentor. Si el valor está en el resultado (que aprendan algo concreto y lo apliquen), el software es infraestructura, no el producto. La pregunta que decide el alcance es: ¿puedo entregar la promesa esta semana usando herramientas que ya existen, hojas de cálculo, un chat y mi propio trabajo manual? Si la respuesta es sí, no construyas nada más todavía.","action":"Escribe el MVP en una lista de máximo 5 pasos ejecutables en 7 días.","outcome":"Una idea validada con 3 pagos reales y un MVP de una semana.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"¿Qué es un MVP?","options":[{"id":"a","text":"La versión 1.0 completa pero con menos colores"},{"id":"b","text":"El experimento más barato que entrega la promesa hecha al cliente"},{"id":"c","text":"Una app con solo login y pantalla de inicio"}],"correct":{"value":"b"},"explanation":"Se define por la promesa, no por el número de pantallas.","hint":null},{"id":"e2","type":"ordering","prompt":"Ordena un MVP de 7 días:","options":[{"id":"a","text":"Definir la promesa exacta que se entrega"},{"id":"b","text":"Elegir herramientas que ya existan"},{"id":"c","text":"Entregar a 3 clientes a mano"},{"id":"d","text":"Recoger su resultado y su testimonio"}],"correct":{"order":["a","b","c","d"]},"explanation":"Promesa, herramientas, entrega manual y evidencia. Sin el último paso solo tienes trabajo, no aprendizaje.","hint":null},{"id":"e3","type":"fill_blank","prompt":"Entregar el servicio manualmente antes de automatizarlo se llama operar como ______.","options":null,"correct":{"acceptable":["servicio","concierge","artesano","manual"],"value":"servicio"},"explanation":"Modelo concierge: valida la demanda antes de invertir en producto.","hint":null},{"id":"e4","type":"true_false","prompt":"Para lanzar un MVP de educación necesitas tener la app móvil publicada.","options":[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}],"correct":{"value":"false"},"explanation":"No. Un currículo en una hoja de cálculo y una llamada semanal pueden entregar más valor que una app sin contenido.","hint":null}]}'::jsonb, 4, 5, 30, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'st-u1' and c.slug = 'validar-startup' and w.slug = 'business'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'pr-1-1', 'Qué es programar de verdad', 'Un algoritmo es una receta que no admite «más o menos».', '{"schema":1,"keyIdea":"Entrada, proceso y salida. Si un paso es ambiguo, el programa falla.","theory":"Programar es escribir instrucciones tan precisas que una máquina sin criterio pueda ejecutarlas. Ahí está la dificultad y la ventaja: la máquina no interpreta, no perdona ambigüedades y no se cansa. Un algoritmo tiene tres partes: entrada (los datos), proceso (los pasos) y salida (el resultado). Cuando algo «no funciona», casi siempre es porque uno de los pasos admitía dos interpretaciones. El hábito más rentable que puedes desarrollar es escribir los pasos en lenguaje natural antes de escribir código: si no puedes explicarlo en cinco frases, no puedes programarlo.","action":"Escribe en 5 pasos cómo decides si un producto tiene margen suficiente.","outcome":"Puedes escribir un programa corto que toma datos, decide y calcula un resultado útil.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"¿Qué tres partes tiene cualquier algoritmo?","options":[{"id":"a","text":"Lenguaje, compilador y ejecutable"},{"id":"b","text":"Entrada, proceso y salida"},{"id":"c","text":"Frontend, backend y base de datos"}],"correct":{"value":"b"},"explanation":"Todo programa transforma una entrada en una salida mediante un proceso.","hint":null},{"id":"e2","type":"true_false","prompt":"Un ordenador interpreta el contexto igual que una persona.","options":[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}],"correct":{"value":"false"},"explanation":"Ejecuta exactamente lo que escribes. Por eso la precisión importa más que la intención.","hint":null},{"id":"e3","type":"ordering","prompt":"Ordena los pasos para calcular el margen de un producto:","options":[{"id":"a","text":"Leer precio de venta y coste"},{"id":"b","text":"Restar coste al precio"},{"id":"c","text":"Dividir el margen entre el precio"},{"id":"d","text":"Mostrar el porcentaje"}],"correct":{"order":["a","b","c","d"]},"explanation":"Entrada, operación, normalización y salida. Ese patrón se repite en todo programa.","hint":null},{"id":"e4","type":"fill_blank","prompt":"Al conjunto ordenado de pasos que resuelve un problema se le llama ______.","options":null,"correct":{"acceptable":["algoritmo"],"value":"algoritmo"},"explanation":"Algoritmo: la receta. El lenguaje de programación es solo cómo se escribe.","hint":null}]}'::jsonb, 1, 4, 20, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'pr-u1' and c.slug = 'fundamentos' and w.slug = 'programming'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'pr-1-2', 'Variables: dar nombre a los datos', 'Números, texto y booleanos. Y por qué el nombre importa.', '{"schema":1,"keyIdea":"El nombre de una variable es documentación gratuita. Incluye la unidad.","theory":"Una variable es un nombre que apunta a un valor. En la práctica, un programa es un conjunto de nombres bien elegidos: si tienes que releer tu propio código dos veces para entenderlo, el problema son los nombres. Los tipos básicos son número, texto (string) y booleano (verdadero/falso). Elegir bien el tipo evita errores silenciosos: si guardas un precio como texto, «10» + «5» da «105» en lugar de 15. Y hay una regla de oro: el nombre debe decir qué contiene y en qué unidad, por ejemplo precio_venta_eur. Las unidades en el nombre son el detalle que evita el bug más caro de todos: confundir céntimos con euros.","action":"Renombra tres variables de tu código o de tu hoja para que incluyan la unidad.","outcome":"Puedes escribir un programa corto que toma datos, decide y calcula un resultado útil.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"precio = «10» y precio + «5». ¿Resultado en la mayoría de lenguajes con texto?","options":[{"id":"a","text":"15"},{"id":"b","text":"«105»"},{"id":"c","text":"Error siempre"}],"correct":{"value":"b"},"explanation":"Concatena. Mezclar tipos produce resultados correctos sintácticamente y falsos semánticamente: el peor tipo de bug.","hint":null},{"id":"e2","type":"multiple_choice","prompt":"¿Cuál es el mejor nombre para el precio final de un producto en euros?","options":[{"id":"a","text":"p"},{"id":"b","text":"precio"},{"id":"c","text":"precio_venta_eur"},{"id":"d","text":"dato1"}],"correct":{"value":"c"},"explanation":"Incluye qué es y en qué unidad. «precio» obliga a adivinar si son euros o céntimos.","hint":null},{"id":"e3","type":"fill_blank","prompt":"El tipo de dato que solo puede ser verdadero o falso se llama ______.","options":null,"correct":{"acceptable":["booleano","boolean","lógico","logico"],"value":"booleano"},"explanation":"Booleano: la base de toda decisión en un programa.","hint":null},{"id":"e4","type":"true_false","prompt":"En un programa, el mismo dato puede guardarse en dos variables con nombres distintos.","options":[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}],"correct":{"value":"true"},"explanation":"Sí, y es una fuente habitual de inconsistencias: una se actualiza y la otra no. Mejor una sola fuente de verdad.","hint":null}]}'::jsonb, 2, 4, 20, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'pr-u1' and c.slug = 'fundamentos' and w.slug = 'programming'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'pr-1-3', 'Condiciones: decidir sin ambigüedad', 'if, else y los operadores que convierten datos en decisiones.', '{"schema":1,"keyIdea":"Valida la entrada antes de decidir. Los casos límite son donde vive el dinero.","theory":"Una condición evalúa una expresión y elige un camino. Los operadores fundamentales son igualdad (==), mayor y menor (> <), y los lógicos Y (&&), O (||) y NO (!). La regla 3x del dropshipping se convierte en una línea: if (precio_venta_eur >= coste_aterrizado_eur * 3). Ahora bien, el error más común es olvidar los casos límite: ¿qué pasa si el coste es 0? ¿Y si el precio es negativo por un error de entrada? Un programa robusto valida la entrada antes de decidir. Y en cuanto hay tres o más ramas, es mejor una estructura ordenada que una cadena de ifs anidados: se lee mejor y se prueba mejor.","action":"Escribe la condición de la regla 3x con el caso «coste = 0» resuelto.","outcome":"Puedes escribir un programa corto que toma datos, decide y calcula un resultado útil.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"¿Qué devuelve 10 >= 3 * 3?","options":[{"id":"a","text":"true"},{"id":"b","text":"false"},{"id":"c","text":"10"}],"correct":{"value":"a"},"explanation":"3 × 3 = 9 y 10 ≥ 9, así que verdadero. La regla 3x se cumple.","hint":null},{"id":"e2","type":"multiple_choice","prompt":"Coste aterrizado 0 €, precio 30 €. Con la condición precio >= coste * 3, ¿qué ocurre?","options":[{"id":"a","text":"Falla y se descarta el producto"},{"id":"b","text":"Se cumple trivialmente porque 0 × 3 = 0"},{"id":"c","text":"Da error de división"}],"correct":{"value":"b"},"explanation":"Caso límite: cualquier precio ≥ 0 pasa. Si el coste puede ser 0 por un dato ausente, hay que validarlo antes.","hint":null},{"id":"e3","type":"fill_blank","prompt":"Para exigir que se cumplan dos condiciones a la vez se usa el operador lógico ___ (en inglés).","options":null,"correct":{"acceptable":["and","y","&&"],"value":"and"},"explanation":"AND: ambas verdaderas. OR basta con una.","hint":null},{"id":"e4","type":"ordering","prompt":"Ordena esta validación de entrada lógicamente:","options":[{"id":"a","text":"Comprobar que el coste es mayor que 0"},{"id":"b","text":"Comprobar que el precio es mayor que 0"},{"id":"c","text":"Calcular el ratio precio/coste"},{"id":"d","text":"Decidir si el ratio es al menos 3"}],"correct":{"order":["a","b","c","d"]},"explanation":"Valida antes de calcular: dividir entre cero rompe el programa.","hint":null}]}'::jsonb, 3, 5, 25, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'pr-u1' and c.slug = 'fundamentos' and w.slug = 'programming'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'pr-1-4', 'Bucles y tu calculadora de margen', 'Repetir sin copiar y pegar. Proyecto final del bloque.', '{"schema":1,"keyIdea":"Un bucle sustituye la copia por el criterio: mismo código, todos los datos.","theory":"Un bucle ejecuta lo mismo sobre muchos datos. En vez de calcular el margen de 40 productos a mano, recorres la lista. Dos formas: repetir un número fijo de veces (for) o repetir mientras se cumpla una condición (while). El peligro del while es el bucle infinito: si la condición nunca deja de ser verdadera, el programa se cuelga. La regla es que dentro del bucle algo debe acercarte a la salida. Con lo aprendido ya puedes construir la herramienta del bloque: leer una lista de productos con su coste y su precio, calcular el margen de cada uno, filtrar los que no cumplen la regla 3x y mostrar solo los rentables. Eso no es un ejercicio académico: es lo que hace un analista de e-commerce en su primer día.","action":"Escribe el pseudocódigo de tu calculadora de margen para 10 productos.","outcome":"Puedes escribir un programa corto que toma datos, decide y calcula un resultado útil.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"¿Cuándo es más apropiado un while que un for?","options":[{"id":"a","text":"Cuando sabes exactamente cuántas veces repetir"},{"id":"b","text":"Cuando repites hasta que se cumpla una condición"},{"id":"c","text":"Cuando quieres ejecutar una sola vez"}],"correct":{"value":"b"},"explanation":"for: número conocido de iteraciones. while: condición de salida.","hint":null},{"id":"e2","type":"multiple_choice","prompt":"¿Qué provoca un bucle infinito?","options":[{"id":"a","text":"Que la condición de salida nunca se vuelva falsa"},{"id":"b","text":"Usar for en lugar de while"},{"id":"c","text":"Tener muchos datos"}],"correct":{"value":"a"},"explanation":"Si nada dentro del bucle modifica la condición, se ejecuta para siempre.","hint":null},{"id":"e3","type":"ordering","prompt":"Ordena la calculadora de margen completa:","options":[{"id":"a","text":"Leer la lista de productos"},{"id":"b","text":"Recorrer cada producto"},{"id":"c","text":"Calcular el ratio precio/coste"},{"id":"d","text":"Descartar los que no llegan a 3x"},{"id":"e","text":"Mostrar los rentables ordenados por margen"}],"correct":{"order":["a","b","c","d","e"]},"explanation":"Lectura, recorrido, cálculo, filtro y presentación: el esqueleto de casi cualquier herramienta de datos.","hint":null},{"id":"e4","type":"fill_blank","prompt":"Un producto cuesta 8 € puesto en casa y se vende a 31 €. El ratio es ____ (un decimal).","options":null,"correct":{"acceptable":["3.9","3,9","3.8","3,8"],"value":"3.9"},"explanation":"31 / 8 = 3,9x. Cumple la regla 3x y deja unos 8 € para adquirir cada cliente.","hint":null}]}'::jsonb, 4, 5, 30, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'pr-u1' and c.slug = 'fundamentos' and w.slug = 'programming'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'fi-1-1', 'Ocho cosa que el tiempo hace y tú no', 'La regla del 72 y por qué empezar diez años antes lo cambia todo.', '{"schema":1,"keyIdea":"El tiempo hace el trabajo. Tú solo aportas constancia.","theory":"El interés compuesto es crecimiento sobre crecimiento: los rendimientos se suman al capital y generan rendimientos propios. La regla del 72 lo resume: divide 72 entre el rendimiento anual esperado y obtienes los años que tarda el capital en duplicarse. Al 6% son 12 años; al 8%, 9. Pero el detalle que casi nadie interioriza es el efecto del tiempo en el dinero aportado: 100 € al mes durante 10 años al 6% terminan en unos 16.400 €, de los que 12.000 salen de tu bolsillo. Los 4.400 € restantes no los ha generado tu esfuerzo: los ha generado el tiempo. Por eso la primera inversión no es un producto: es empezar antes y no interrumpir.","action":"Calcula con la regla del 72 en cuántos años se duplicaría tu ahorro actual.","outcome":"Un plan de inversión propio con horizonte, aportación periódica y coste anual estimado.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"Con una rentabilidad anual del 9%, según la regla del 72, ¿en cuántos años se duplica el capital?","options":[{"id":"a","text":"6 años"},{"id":"b","text":"8 años"},{"id":"c","text":"12 años"},{"id":"d","text":"18 años"}],"correct":{"value":"b"},"explanation":"72 / 9 = 8 años. Es una aproximación, no una promesa.","hint":null},{"id":"e2","type":"true_false","prompt":"Una rentabilidad del 7% anual garantiza que tendrás exactamente un 7% cada año.","options":[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}],"correct":{"value":"false"},"explanation":"La rentabilidad media no es la rentabilidad de cada año: la volatilidad hace que el orden de los años importe.","hint":null},{"id":"e3","type":"fill_blank","prompt":"Aportar 100 € al mes durante 10 años al 6% aproximadamente: ¿cuánto acaba en el capital final? Escribe solo el número de miles (ej.: 16).","options":null,"correct":{"acceptable":["16","16.4","16400","16,4"],"value":"16"},"explanation":"≈16.400 €, de los que 12.000 son aportaciones y 4.400 son interés compuesto.","hint":null},{"id":"e4","type":"simulation","prompt":"Tienes 200 € hoy y puedes aportar 100 €/mes. ¿Qué importa más para el resultado a 20 años?","options":[{"id":"a","text":"Elegir el producto con más rentabilidad histórica"},{"id":"b","text":"Empezar ya y no interrumpir las aportaciones"},{"id":"c","text":"Esperar a tener 10.000 € ahorrados"}],"correct":{"value":"b"},"explanation":"La constancia y el plazo dominan en horizontes largos; esperar es el error más caro.","hint":null}]}'::jsonb, 1, 5, 25, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'fi-u1' and c.slug = 'inversion-primeriza' and w.slug = 'finance'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'fi-1-2', 'Las comisiones: el enemigo silencioso', 'Un 2% anual puede comerse un tercio de tu resultado.', '{"schema":1,"keyIdea":"La rentabilidad es una promesa; el coste es un hecho.","theory":"Una comisión del 2% anual parece pequeña. Pero se cobra sobre el patrimonio cada año, incluido lo que ya habías ganado: es un interés compuesto en contra. En un horizonte de 30 años, la diferencia entre un 0,2% y un 2% de coste total puede reducir el capital final en más de un tercio. Por eso, antes de mirar la rentabilidad esperada de nada, mira el coste total: comisión de gestión, comisión de custodia, coste de compraventa y, si el producto lo tiene, la comisión de éxito. Un producto que rinde un 7% con un 2,5% de costes entrega menos que uno que rinde un 5,5% con un 0,3%.","action":"Busca el coste total anual del producto financiero que estés mirando hoy.","outcome":"Un plan de inversión propio con horizonte, aportación periódica y coste anual estimado.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"Producto A: 5,5% bruto y 0,3% de coste. Producto B: 7% bruto y 2,5% de coste. ¿Cuál entrega más dinero?","options":[{"id":"a","text":"A: 5,2% neto frente a 4,5%"},{"id":"b","text":"B: 7% es más que 5,5%"},{"id":"c","text":"Son iguales"}],"correct":{"value":"a"},"explanation":"Se compara siempre el neto después de costes, no el bruto del folleto.","hint":null},{"id":"e2","type":"true_false","prompt":"Una comisión anual del 2% se cobra una sola vez al invertir.","options":[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}],"correct":{"value":"false"},"explanation":"Se cobra cada año sobre el patrimonio, incluidas las ganancias acumuladas.","hint":null},{"id":"e3","type":"fill_blank","prompt":"La comisión que cobra un fondo además de la gestión cuando obtiene beneficios se llama comisión de ______.","options":null,"correct":{"acceptable":["éxito","exito","performance","resultado"],"value":"éxito"},"explanation":"Comisión de éxito: hay que sumarla al coste total antes de comparar.","hint":null},{"id":"e4","type":"multi_select","prompt":"¿Qué costes deben entrar en el cálculo total?","options":[{"id":"a","text":"Gestión"},{"id":"b","text":"Custodia"},{"id":"c","text":"Compraventa"},{"id":"d","text":"El color de la app"}],"correct":{"values":["a","b","c"]},"explanation":"Todos los que aparecen en el documento de datos fundamentales del producto.","hint":null}]}'::jsonb, 2, 5, 25, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'fi-u1' and c.slug = 'inversion-primeriza' and w.slug = 'finance'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'fi-1-3', 'Riesgo no es lo mismo que volatilidad', 'Y por qué tu horizonte temporal decide qué riesgo puedes permitirte.', '{"schema":1,"keyIdea":"Primero decide cuándo necesitas el dinero. Después decide dónde lo pones.","theory":"Volatilidad es cuánto sube y baja el precio a corto plazo. Riesgo es la posibilidad de no alcanzar tu objetivo o de verte obligado a vender en el peor momento. Son cosas distintas: un depósito apenas tiene volatilidad pero puede ser arriesgado si no bate la inflación en un horizonte de 20 años. La regla práctica es que el plazo manda: el dinero que necesites en menos de 3 años no debería estar en un activo que pueda caer un 30% en un semestre, porque es posible que tengas que vendas en caída. Para horizontes largos, en cambio, el riesgo real es no estar invertido: la inflación erosiona el ahorro de forma silenciosa y constante.","action":"Clasifica tu dinero en tres cubos: menos de 3 años, 3-10 años y más de 10 años.","outcome":"Un plan de inversión propio con horizonte, aportación periódica y coste anual estimado.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"Vas a comprar vivienda en 18 meses. ¿Qué haces con ese ahorro?","options":[{"id":"a","text":"Invertirlo en un índice de renta variable global"},{"id":"b","text":"Mantenerlo en un instrumento de bajo riesgo y liquidez alta"},{"id":"c","text":"Criptomonedas a corto plazo"}],"correct":{"value":"b"},"explanation":"Con un plazo de 18 meses, una caída del 30% te obligaría a vender en el peor momento. El plazo manda.","hint":null},{"id":"e2","type":"true_false","prompt":"Un producto con poca volatilidad nunca es arriesgado.","options":[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}],"correct":{"value":"false"},"explanation":"Puede ser arriesgado si no supera la inflación o si no es líquido cuando necesitas el dinero.","hint":null},{"id":"e3","type":"fill_blank","prompt":"La pérdida de poder de compra del dinero con el tiempo se llama ______.","options":null,"correct":{"acceptable":["inflación","inflacion"],"value":"inflación"},"explanation":"La inflación es el coste de no hacer nada: es un riesgo real aunque no aparezca en ningún gráfico.","hint":null},{"id":"e4","type":"ordering","prompt":"Ordena el proceso de decisión de una inversión:","options":[{"id":"a","text":"Definir el objetivo y el plazo"},{"id":"b","text":"Calcular cuánto puedes permitirte perder"},{"id":"c","text":"Elegir el tipo de activo adecuado"},{"id":"d","text":"Comparar productos por coste total"}],"correct":{"order":["a","b","c","d"]},"explanation":"De la vida al producto, nunca al revés.","hint":null}]}'::jsonb, 3, 5, 25, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'fi-u1' and c.slug = 'inversion-primeriza' and w.slug = 'finance'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;
insert into public.lessons (unit_id, slug, title, description, content, order_index, estimated_duration, xp_reward, is_published, is_premium)
select u.id, 'fi-1-4', 'Tu primer plan, en una hoja', 'Diversificación, aportación periódica y un plan escrito.', '{"schema":1,"keyIdea":"El mejor plan es el que puedes mantener cuando todo baja.","theory":"Un plan de inversión cabe en una hoja: objetivo, plazo, cuánto aportas y cada cuánto, qué activos, qué coste total asumible, y las dos reglas de conducta que evitan el desastre: no vender por miedo y no cambiar de estrategia por una noticia. La diversificación —repartir entre muchos activos, sectores y geografías— no maximiza la rentabilidad esperada, pero reduce la probabilidad de que un solo error destruya tu plan. La aportación periódica automática resuelve además el problema de intentar adivinar el mejor momento: compras más caro unas veces y más barato otras, y eliminas la decisión emocional. Lo importante no es el plan perfecto: es un plan que puedas seguir durante una caída del 30% sin tocar nada.","action":"Escribe tu plan en una hoja con las 6 casillas y fija una aportación automática.","outcome":"Un plan de inversión propio con horizonte, aportación periódica y coste anual estimado.","exercises":[{"id":"e1","type":"multiple_choice","prompt":"¿Para qué sirve diversificar?","options":[{"id":"a","text":"Para garantizar rentabilidad"},{"id":"b","text":"Para reducir el impacto de que una sola inversión salga mal"},{"id":"c","text":"Para pagar menos comisiones siempre"}],"correct":{"value":"b"},"explanation":"Diversificar no promete más rentabilidad: reduce el riesgo específico de concentrarte en un activo.","hint":null},{"id":"e2","type":"multi_select","prompt":"¿Qué debe contener tu plan escrito?","options":[{"id":"a","text":"Objetivo y plazo"},{"id":"b","text":"Importe y frecuencia de aportación"},{"id":"c","text":"Reglas de conducta en caídas"},{"id":"d","text":"Predicción del precio para el próximo mes"}],"correct":{"values":["a","b","c"]},"explanation":"Las predicciones no forman parte de un plan: la conducta sí.","hint":null},{"id":"e3","type":"fill_blank","prompt":"Invertir la misma cantidad cada mes se llama aportación ______.","options":null,"correct":{"acceptable":["periódica","periodica","sistemática","sistematica","dca"],"value":"periódica"},"explanation":"Aportación periódica (DCA): elimina la decisión emocional del momento de entrada.","hint":null},{"id":"e4","type":"simulation","prompt":"Tu cartera cae un 25% en un mes. Tu plan es a 15 años. ¿Qué haces?","options":[{"id":"a","text":"Vender para evitar más pérdidas"},{"id":"b","text":"Seguir el plan y mantener la aportación automática"},{"id":"c","text":"Duplicar la apuesta en un solo activo para recuperar rápido"}],"correct":{"value":"b"},"explanation":"A 15 años, una caída es una compra más barata. La regla escrita existe precisamente para este momento.","hint":null}]}'::jsonb, 4, 5, 30, true, false
from public.units u join public.courses c on c.id = u.course_id join public.worlds w on w.id = c.world_id
where u.slug = 'fi-u1' and c.slug = 'inversion-primeriza' and w.slug = 'finance'
on conflict (unit_id, slug) do update set
  title = excluded.title, description = excluded.description, content = excluded.content,
  order_index = excluded.order_index, estimated_duration = excluded.estimated_duration,
  xp_reward = excluded.xp_reward, is_published = true;

-- Espejo normalizado en public.exercises para analítica de aciertos.
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', '¿Qué filtro descartaría antes un nicho?', '[{"id":"a","text":"Que el mercado sea pequeño"},{"id":"b","text":"Que nadie pague aún por resolver el problema"},{"id":"c","text":"Que haya competencia"}]'::jsonb, '{"value":"b"}'::jsonb, 'Competencia significa mercado validado. Que nadie pague significa que hay que crear la categoría: demasiado caro para empezar.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-1-1' and u.slug = 'ms-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multi_select', '¿Qué hace bueno a un nicho para empezar solo?', '[{"id":"a","text":"Tiene presupuesto asignado"},{"id":"b","text":"Es accesible sin publicidad"},{"id":"c","text":"Puedes entregar el resultado tú mismo"},{"id":"d","text":"Es el mercado más grande posible"}]'::jsonb, '{"values":["a","b","c"]}'::jsonb, 'Alcance, presupuesto y capacidad de entrega. El tamaño es lo último que importa al principio.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-1-1' and u.slug = 'ms-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'A la intersección entre lo que sabes hacer, lo que alguien paga y lo que puedes alcanzar se le suele llamar tu ______.', null, '{"acceptable":["nicho","ventaja","enfoque","círculo"],"value":"nicho"}'::jsonb, 'Nicho: la intersección que te permite empezar esta semana.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-1-1' and u.slug = 'ms-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'true_false', 'Elegir nicho es una decisión irreversible.', '[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}]'::jsonb, '{"value":"false"}'::jsonb, 'Es una hipótesis. Si no hay tracción en 30 días, se cambia de nicho manteniendo la habilidad.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-1-1' and u.slug = 'ms-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'ordering', 'Ordena la fórmula de la oferta:', '[{"id":"a","text":"Ayudo a [cliente]"},{"id":"b","text":"a conseguir [resultado]"},{"id":"c","text":"en [plazo]"},{"id":"d","text":"sin [objeción]"}]'::jsonb, '{"order":["a","b","c","d"]}'::jsonb, 'Cliente, resultado, plazo y objeción desactivada: cuatro piezas, ninguna opcional.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-1-2' and u.slug = 'ms-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', 'Tu oferta ocupa tres frases y nadie sabe repetirla. ¿Qué haces?', '[{"id":"a","text":"Añadir una cuarta frase explicativa"},{"id":"b","text":"Reducir el alcance hasta que quepa en una frase"},{"id":"c","text":"Cambiar el logo"}]'::jsonb, '{"value":"b"}'::jsonb, 'La longitud es un síntoma de falta de foco, no de falta de explicación.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-1-2' and u.slug = 'ms-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'El test definitivo de una oferta es que tú mismo ______ por ella el precio que vas a cobrar.', null, '{"acceptable":["pagarías","pagarias","comprarías","comprarias"],"value":"pagarías"}'::jsonb, 'Si no la comprarías, estás vendiendo algo que no has validado ni contigo mismo.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-1-2' and u.slug = 'ms-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'true_false', 'Una oferta dirigida a todo el mundo suele convertir mejor porque abarca más mercado.', '[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}]'::jsonb, '{"value":"false"}'::jsonb, 'Abarcar más diluye el mensaje: la conversión cae aunque el mercado sea mayor.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-1-2' and u.slug = 'ms-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', 'Primera semana sin embudo con volumen. ¿Qué métrica sigues?', '[{"id":"a","text":"Tasa de conversión de la landing"},{"id":"b","text":"Número de conversaciones cualificadas mantenidas"},{"id":"c","text":"Beneficio neto"}]'::jsonb, '{"value":"b"}'::jsonb, 'Con poco tráfico las tasas son ruido. Mide actividad que puedas controlar.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-1-3' and u.slug = 'ms-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multi_select', '¿Qué evita tener una métrica semanal clara?', '[{"id":"a","text":"Confundir estar ocupado con avanzar"},{"id":"b","text":"Abandonar algo que empezaba a funcionar"},{"id":"c","text":"Tener que hablar con clientes"}]'::jsonb, '{"values":["a","b"]}'::jsonb, 'La métrica es un espejo: impide autoengañarse en las dos direcciones.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-1-3' and u.slug = 'ms-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'Una métrica que puedes mover directamente con tu esfuerzo (mensajes, llamadas) se llama métrica de ______.', null, '{"acceptable":["actividad","entrada","proceso"],"value":"actividad"}'::jsonb, 'Actividad primero, resultado después: el embudo necesita volumen antes de dar tasas.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-1-3' and u.slug = 'ms-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'simulation', 'Llevas 3 semanas con la misma métrica sin mejorar. ¿Qué haces?', '[{"id":"a","text":"Cambiar de métrica para ver algo mejor"},{"id":"b","text":"Revisar qué estás haciendo exactamente y cambiar una sola palanca"},{"id":"c","text":"Esperar dos meses más"}]'::jsonb, '{"value":"b"}'::jsonb, 'Cambiar la métrica es maquillaje. Cambiar una palanca es experimentación.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-1-3' and u.slug = 'ms-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', '¿Qué campo hace que un mensaje en frío no parezca spam?', '[{"id":"a","text":"El cargo de la persona"},{"id":"b","text":"Un detalle específico que demuestra que has mirado"},{"id":"c","text":"El tamaño de la empresa"}]'::jsonb, '{"value":"b"}'::jsonb, 'La especificidad es la prueba de que no eres un envío masivo.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-2-1' and u.slug = 'ms-u2'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multi_select', '¿Qué es aceptable al construir una lista?', '[{"id":"a","text":"Usar datos públicos y profesionales"},{"id":"b","text":"Comprar una base de datos"},{"id":"c","text":"Respetar la normativa de protección de datos"},{"id":"d","text":"Registrar el motivo por el que contactas"}]'::jsonb, '{"values":["a","c","d"]}'::jsonb, 'Comprar listas es ilegal en muchos casos y siempre contraproducente para la entregabilidad.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-2-1' and u.slug = 'ms-u2'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'Una lista de 50 contactos bien investigados vale más que una audiencia de 5.000 seguidores sin ______.', null, '{"acceptable":["contexto","relación","relacion","interés","interes"],"value":"contexto"}'::jsonb, 'El contexto es lo que convierte un contacto en una conversación.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-2-1' and u.slug = 'ms-u2'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'ordering', 'Ordena la construcción de la lista:', '[{"id":"a","text":"Elegir la fuente donde está concentrado el nicho"},{"id":"b","text":"Identificar al decisor de cada empresa"},{"id":"c","text":"Anotar la señal del problema"},{"id":"d","text":"Escribir el detalle específico"}]'::jsonb, '{"order":["a","b","c","d"]}'::jsonb, 'Fuente, persona, señal, detalle: el orden de la investigación.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-2-1' and u.slug = 'ms-u2'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'ordering', 'Ordena el mensaje en frío:', '[{"id":"a","text":"Contexto específico de su negocio"},{"id":"b","text":"Problema probable en una frase"},{"id":"c","text":"Prueba breve de que lo has resuelto"},{"id":"d","text":"Pregunta de bajo compromiso"}]'::jsonb, '{"order":["a","b","c","d"]}'::jsonb, 'Contexto, problema, prueba y micro-compromiso. En ese orden, no en otro.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-2-2' and u.slug = 'ms-u2'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multi_select', '¿Qué debes quitar de tu mensaje?', '[{"id":"a","text":"Un párrafo sobre tu empresa"},{"id":"b","text":"El contexto específico"},{"id":"c","text":"Un PDF adjunto de 20 páginas"},{"id":"d","text":"La pregunta final"}]'::jsonb, '{"values":["a","c"]}'::jsonb, 'El mensaje existe para conseguir una conversación, no para explicarte.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-2-2' and u.slug = 'ms-u2'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'El segundo mensaje, que llega días después del primero, se llama ______.', null, '{"acceptable":["seguimiento","follow-up","recordatorio","seguimiento (follow-up)"],"value":"seguimiento"}'::jsonb, 'El seguimiento recupera a quien lo leyó y no respondió, que es la mayoría.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-2-2' and u.slug = 'ms-u2'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'simulation', 'Enviaste 20 mensajes ayer y nadie contesta. ¿Qué haces hoy?', '[{"id":"a","text":"Reescribir la oferta completa"},{"id":"b","text":"Esperar 48 horas y enviar un seguimiento de una línea"},{"id":"c","text":"Enviar 100 más iguales"}]'::jsonb, '{"value":"b"}'::jsonb, 'El primer mensaje rara vez responde. El seguimiento es donde vive la mayoría de la conversación.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-2-2' and u.slug = 'ms-u2'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', 'Objetivo principal de tus 3 primeras llamadas:', '[{"id":"a","text":"Cerrar el primer contrato"},{"id":"b","text":"Entender el problema con las palabras del cliente"},{"id":"c","text":"Presentar tu portfolio completo"}]'::jsonb, '{"value":"b"}'::jsonb, 'El diagnóstico precede al contrato. Sin problema entendido no hay propuesta defendible.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-2-3' and u.slug = 'ms-u2'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'Las frases exactas que usa el cliente para describir su problema son tu mejor material de ______.', null, '{"acceptable":["marketing","copy","venta","mensaje"],"value":"marketing"}'::jsonb, 'El copy que convierte suele ser una transcripción del cliente, no una creación tuya.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-2-3' and u.slug = 'ms-u2'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multi_select', '¿Qué puedes pedir al final de una conversación?', '[{"id":"a","text":"Permiso para enviar una propuesta"},{"id":"b","text":"Una introducción a otro contacto"},{"id":"c","text":"Un no claro"},{"id":"d","text":"Que te firmes un contrato en la llamada"}]'::jsonb, '{"values":["a","b","c"]}'::jsonb, 'Pedir compromisos pequeños mantiene el movimiento. Exigir contrato en la primera llamada lo rompe.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-2-3' and u.slug = 'ms-u2'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'true_false', 'Un «no» claro en una primera llamada es un fracaso de la misión.', '[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}]'::jsonb, '{"value":"false"}'::jsonb, 'Es información: descarta una dirección y te ahorra semanas. El fracaso es la ambigüedad eterna.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-2-3' and u.slug = 'ms-u2'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', '¿Cuándo envías la propuesta?', '[{"id":"a","text":"El mismo día de la llamada"},{"id":"b","text":"Cuando el cliente insista tres veces"},{"id":"c","text":"En dos semanas, para parecer ocupado"}]'::jsonb, '{"value":"a"}'::jsonb, 'La temperatura de la conversación baja rápido. Enviar el mismo día multiplica la probabilidad de respuesta.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-2-4' and u.slug = 'ms-u2'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'La parte de la propuesta que evita que el proyecto se expanda sin límite se llama ______ del alcance.', null, '{"acceptable":["límite","limite","definición","definicion","acotación","acotacion"],"value":"límite"}'::jsonb, 'Alcance cerrado: lo que no está escrito, no está incluido.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-2-4' and u.slug = 'ms-u2'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'ordering', 'Ordena la propuesta de una página:', '[{"id":"a","text":"Problema con las palabras del cliente"},{"id":"b","text":"Resultado con métrica y plazo"},{"id":"c","text":"Precio con dos opciones"},{"id":"d","text":"Límites del alcance"},{"id":"e","text":"Fecha concreta para decidir"}]'::jsonb, '{"order":["a","b","c","d","e"]}'::jsonb, 'Empieza por el cliente, termina pidiendo una decisión con fecha.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-2-4' and u.slug = 'ms-u2'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'simulation', 'La propuesta lleva 10 días sin respuesta tras un seguimiento. ¿Qué haces?', '[{"id":"a","text":"Bajar el precio un 30%"},{"id":"b","text":"Un segundo y último seguimiento breve, dejar la puerta abierta y seguir con la lista"},{"id":"c","text":"Llamar cada día"}]'::jsonb, '{"value":"b"}'::jsonb, 'Dos seguimientos y a otra cosa. El tiempo del fundador solo vale si se invierte donde hay retorno.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ms-2-4' and u.slug = 'ms-u2'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', 'Llevas 4 días con 500 € en anuncios y ninguna venta. ¿Cuál es el primer dato que deberías haber calculado?', '[{"id":"a","text":"El número de seguidores del competidor"},{"id":"b","text":"El margen bruto por unidad y el coste máximo por visita"},{"id":"c","text":"El color del botón de compra"},{"id":"d","text":"La velocidad de carga del servidor"}]'::jsonb, '{"value":"b"}'::jsonb, 'Sin margen unitario no existe umbral de rentabilidad publicitaria. Los demás datos son decoración.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'sd-1-1' and u.slug = 'sd-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'true_false', 'Si un producto se vende mucho en TikTok, está garantizado que funcionará en tu tienda.', '[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}]'::jsonb, '{"value":"false"}'::jsonb, 'La demanda ajena es una señal, no una garantía: el mismo producto compite ya contra quien lo popularizó, con más historial y mejores precios.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'sd-1-1' and u.slug = 'sd-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'El coste real del producto incluyendo envío, comisiones y devoluciones se llama coste ______.', null, '{"acceptable":["aterrizado","landed"],"value":"aterrizado"}'::jsonb, 'El coste aterrizado (landed cost) es el único número que sirve para fijar precio: incluye producto, envío, pasarela de pago y una provisión de devoluciones.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'sd-1-1' and u.slug = 'sd-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'simulation', 'Tienes 100 € de presupuesto total. Producto a 6 €, venta prevista a 29,90 €, envío 4 €. ¿Qué haces primero?', '[{"id":"a","text":"Lanzar una campaña de conversión optimizada a compra con los 100 €"},{"id":"b","text":"Conseguir 20-30 clics gratuitos (orgánico o microcreadores) para medir intención de compra"},{"id":"c","text":"Comprar 500 unidades para negociar precio"}]'::jsonb, '{"value":"b"}'::jsonb, 'Con 100 € no compras datos estadísticamente significativos en pago. Primero mides intención con coste cero.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'sd-1-1' and u.slug = 'sd-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', 'Producto 9 €, envío 3 €, comisión de pasarela 1,20 € y provisión de devoluciones 0,80 €. ¿Coste aterrizado?', '[{"id":"a","text":"9 €"},{"id":"b","text":"12 €"},{"id":"c","text":"14 €"},{"id":"d","text":"13 €"}]'::jsonb, '{"value":"c"}'::jsonb, '9 + 3 + 1,20 + 0,80 = 14 €. Cualquier precio por debajo de 42 € incumple la regla 3x.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'sd-1-2' and u.slug = 'sd-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', 'Vendes a 39,90 € con coste aterrizado de 21 €. ¿Pasa la regla 3x?', '[{"id":"a","text":"Sí, con margen de sobra"},{"id":"b","text":"No: 3 × 21 = 63 €, el precio se queda corto"},{"id":"c","text":"Es indiferente mientras haya ventas"}]'::jsonb, '{"value":"b"}'::jsonb, 'Ratio de 1,9x. Puedes vender, pero no puedes pagar adquisición: cada cliente nuevo se come el margen.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'sd-1-2' and u.slug = 'sd-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'Si tu margen bruto por pedido es 18 € y quieres un beneficio de 6 € por pedido, tu coste máximo de adquisición (CAC) es ____ €.', null, '{"acceptable":["12","12.0","12,0"],"value":"12"}'::jsonb, '18 − 6 = 12 € de CAC objetivo. Ese número decide qué campañas puedes permitirte.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'sd-1-2' and u.slug = 'sd-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'true_false', 'Subir el precio siempre reduce las ventas.', '[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}]'::jsonb, '{"value":"false"}'::jsonb, 'En muchos nichos un precio más alto aumenta la percepción de calidad y mejora la conversión. Y siempre mejora el margen: es la palanca más rápida que existe.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'sd-1-2' and u.slug = 'sd-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', '¿Cuál de estos titulares reduce más la comparación por precio?', '[{"id":"a","text":"Botella térmica de acero 500 ml"},{"id":"b","text":"Mantén el café caliente 12 horas en el trabajo, sin microondas"},{"id":"c","text":"¡Oferta! Botella 50% OFF"}]'::jsonb, '{"value":"b"}'::jsonb, 'Describe el resultado y el contexto de uso. La botella pasa de commodity a solución.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'sd-1-3' and u.slug = 'sd-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multi_select', '¿Qué elementos puedes añadir a la oferta sin subir mucho el coste?', '[{"id":"a","text":"Una guía PDF de uso con 3 recetas"},{"id":"b","text":"Garantía de devolución de 60 días"},{"id":"c","text":"Comprar 1.000 unidades extra de stock"},{"id":"d","text":"Un vídeo de 40 segundos mostrando el resultado real"}]'::jsonb, '{"values":["a","b","d"]}'::jsonb, 'Contenido, garantía y prueba visual cuestan casi cero y suben conversión. El stock extra es riesgo, no oferta.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'sd-1-3' and u.slug = 'sd-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'ordering', 'Ordena la estructura de una página de producto que convierte:', '[{"id":"a","text":"Titular con el resultado"},{"id":"b","text":"Prueba visual del antes y el después"},{"id":"c","text":"Qué incluye y precio con ancla"},{"id":"d","text":"Garantía y respuesta a la objeción principal"},{"id":"e","text":"Reseñas con nombre y foto"}]'::jsonb, '{"order":["a","b","c","d","e"]}'::jsonb, 'Primero captas la atención, luego demuestras, después pones el precio con contexto, desmontas la objeción y cierras con prueba social.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'sd-1-3' and u.slug = 'sd-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'La objeción más frecuente en dropshipping suele ser «¿y si no me llega?». La respuesta operativa que la resuelve se llama política de ______.', null, '{"acceptable":["devolución","devolucion","reembolso","garantía","garantia"],"value":"devolución"}'::jsonb, 'Una política de devolución clara y visible convierte más que cualquier descuento.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'sd-1-3' and u.slug = 'sd-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', '200 visitas cualificadas y 0 añadidos al carrito. ¿Qué concluyes?', '[{"id":"a","text":"Necesito más tráfico"},{"id":"b","text":"La oferta o la página no convierten: hay que cambiarlas"},{"id":"c","text":"El producto no tiene mercado"}]'::jsonb, '{"value":"b"}'::jsonb, 'Cero intención con tráfico relevante es un problema de oferta y de página. El mercado aún no está descartado.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'sd-1-4' and u.slug = 'sd-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'ordering', 'Ordena el plan de validación de 14 días:', '[{"id":"a","text":"Definir oferta y precio con la regla 3x"},{"id":"b","text":"Montar la página con prueba visual y garantía"},{"id":"c","text":"Contactar a 15 microcreadores"},{"id":"d","text":"Publicar 3 vídeos de demostración propios"},{"id":"e","text":"Revisar métricas y decidir: doblar o cambiar"}]'::jsonb, '{"order":["a","b","c","d","e"]}'::jsonb, 'La secuencia importa: sin oferta definida, todo lo demás mide ruido.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'sd-1-4' and u.slug = 'sd-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'La métrica que mejor indica intención real de compra antes de pagar es la tasa de ______ al carrito.', null, '{"acceptable":["añadir","anadir","adición","adicion"],"value":"añadir"}'::jsonb, 'Añadir al carrito expresa intención; el clic expresa curiosidad.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'sd-1-4' and u.slug = 'sd-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'true_false', 'Regalar producto a microcreadores es publicidad encubierta y hay que declararlo.', '[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}]'::jsonb, '{"value":"true"}'::jsonb, 'Sí: la relación comercial debe declararse. Además de ser legal, la transparencia protege la confianza, que es el activo que estás comprando.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'sd-1-4' and u.slug = 'sd-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', '¿Cuál de estas es una oferta de nicho?', '[{"id":"a","text":"Hacemos webs y marketing digital para empresas"},{"id":"b","text":"Llenamos la agenda de fisioterapeutas con 20 pacientes nuevos al mes, sin que hagan publicidad"},{"id":"c","text":"Automatizamos procesos con IA"}]'::jsonb, '{"value":"b"}'::jsonb, 'Cliente concreto, resultado medible, plazo implícito y objeción desactivada.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ag-1-1' and u.slug = 'ag-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multi_select', '¿Qué debilita tu oferta de nicho?', '[{"id":"a","text":"Incluye cinco servicios distintos"},{"id":"b","text":"Promete un resultado medible"},{"id":"c","text":"No especifica el tipo de cliente"},{"id":"d","text":"Se apoya en una garantía de resultados"}]'::jsonb, '{"values":["a","c"]}'::jsonb, 'Dispersión y ambigüedad. Los resultados y las garantías refuerzan la oferta; el catálogo la diluye.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ag-1-1' and u.slug = 'ag-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'Cobrar por resultado en lugar de por horas se llama precio basado en ______.', null, '{"acceptable":["valor","resultado","resultados"],"value":"valor"}'::jsonb, 'Pricing basado en valor: el precio se ancla al beneficio del cliente, no al tiempo que tardas.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ag-1-1' and u.slug = 'ag-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'simulation', 'Un dentista te dice: «todos los meses me llaman agencias como tú». ¿Qué respondes?', '[{"id":"a","text":"Bajo el precio para diferenciarme"},{"id":"b","text":"«Precisamente por eso: ¿cuántas de esas llamadas te han traído 15 citas nuevas? Te enseño cómo lo medimos.»"},{"id":"c","text":"Le envío un PDF de 30 páginas con mi portfolio"}]'::jsonb, '{"value":"b"}'::jsonb, 'Rediriges la conversación de «otro proveedor» a «resultado medible». Es la única diferencia que el cliente compra.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ag-1-1' and u.slug = 'ag-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'ordering', 'Ordena los filtros de la lista antes de escribir a nadie:', '[{"id":"a","text":"Encaja en el nicho"},{"id":"b","text":"Señal de que ya invierte o crece"},{"id":"c","text":"Decisor identificable"},{"id":"d","text":"Detalle específico personalizable"}]'::jsonb, '{"order":["a","b","c","d"]}'::jsonb, 'Filtrar en ese orden descarta rápido: si no encaja en el nicho, el resto da igual.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ag-1-2' and u.slug = 'ag-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', '¿Cuál es el objetivo del primer mensaje en frío?', '[{"id":"a","text":"Cerrar el contrato"},{"id":"b","text":"Enviar la propuesta"},{"id":"c","text":"Conseguir una conversación corta"},{"id":"d","text":"Presentar la empresa"}]'::jsonb, '{"value":"c"}'::jsonb, 'El primer mensaje vende una conversación, no un servicio.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ag-1-2' and u.slug = 'ag-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'Un mensaje en frío debería ocupar alrededor de ___ palabras.', null, '{"acceptable":["90","noventa","100","80"],"value":"90"}'::jsonb, 'Corto: el decisor lo lee en el móvil entre reuniones.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ag-1-2' and u.slug = 'ag-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'true_false', 'Enviar 1.000 mensajes genéricos suele dar mejor resultado que 50 personalizados.', '[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}]'::jsonb, '{"value":"false"}'::jsonb, 'Además de convertir peor, daña tu dominio y tu marca. La personalización escala mucho mejor cuando se hace bien.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ag-1-2' and u.slug = 'ag-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', 'El cliente pregunta el precio en el minuto 3. ¿Qué haces?', '[{"id":"a","text":"Le doy una cifra para no perderlo"},{"id":"b","text":"«Depende del alcance; para darte el número correcto necesito entender X. ¿Me cuentas...?»"},{"id":"c","text":"Le envío la tarifa por email"}]'::jsonb, '{"value":"b"}'::jsonb, 'Ancla el precio al alcance y recuperas el diagnóstico sin decir que no.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ag-1-3' and u.slug = 'ag-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multi_select', '¿Qué pertenece a una llamada de diagnóstico?', '[{"id":"a","text":"Situación actual del cliente"},{"id":"b","text":"Coste económico del problema"},{"id":"c","text":"Demostración de todas tus herramientas"},{"id":"d","text":"Criterios de decisión y de éxito"}]'::jsonb, '{"values":["a","b","d"]}'::jsonb, 'Presentar herramientas es una demo: convierte cuando ya hay problema reconocido, no antes.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ag-1-3' and u.slug = 'ag-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'Si no puedes repetir el problema con las palabras del cliente, no tienes diagnóstico: tienes una ______.', null, '{"acceptable":["presentación","presentacion","demo"],"value":"presentación"}'::jsonb, 'El diagnóstico se demuestra parafraseando, no asintiendo.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ag-1-3' and u.slug = 'ag-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'simulation', 'El cliente dice «parece caro». Tu proyecto cuesta 1.200 €/mes y su ticket medio es 400 €. ¿Qué dices?', '[{"id":"a","text":"«Te hago un 20% de descuento»"},{"id":"b","text":"«Caro comparado con qué. Con 3 clientes nuevos al mes, esto se paga solo. ¿Cuántos necesitas para cubrirlo?»"},{"id":"c","text":"«Es lo que cobra el mercado»"}]'::jsonb, '{"value":"b"}'::jsonb, 'Traducir el precio a unidades del negocio del cliente desactiva la objeción sin destruir margen.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ag-1-3' and u.slug = 'ag-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', '¿Por qué presentar dos opciones de precio?', '[{"id":"a","text":"Para parecer más barato"},{"id":"b","text":"Porque desplaza la decisión de comprar o no a elegir cuál"},{"id":"c","text":"Para confundir al cliente"}]'::jsonb, '{"value":"b"}'::jsonb, 'Efecto de elección: comparar dos opciones es más fácil que aceptar o rechazar una.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ag-1-4' and u.slug = 'ag-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'El cobro recurrente mensual por un servicio continuado se llama ______.', null, '{"acceptable":["retainer","igualatorio","suscripción","suscripcion","abono"],"value":"retainer"}'::jsonb, 'Retainer: previsibilidad de ingresos, que es lo que permite escalar con tranquilidad.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ag-1-4' and u.slug = 'ag-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multi_select', '¿Qué debe incluir la propuesta de una página?', '[{"id":"a","text":"El problema con las palabras del cliente"},{"id":"b","text":"El resultado con una métrica y un plazo"},{"id":"c","text":"Tu biografía completa"},{"id":"d","text":"Los límites del alcance"}]'::jsonb, '{"values":["a","b","d"]}'::jsonb, 'La propuesta se centra en el cliente. La biografía va en el pie, si acaso.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ag-1-4' and u.slug = 'ag-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'true_false', 'Aceptar un primer cliente muy por debajo de precio para «hacer portfolio» es una buena estrategia.', '[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}]'::jsonb, '{"value":"false"}'::jsonb, 'Fija un ancla de precio bajo que arrastra a los siguientes clientes y atrae al perfil más exigente. Mejor precio justo con alcance reducido.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'ag-1-4' and u.slug = 'ag-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', '¿Qué bloque falta en este prompt: «Actúa como copywriter. Escribe un email de ventas para mi curso. Máximo 150 palabras. Devuelve solo el texto.»?', '[{"id":"a","text":"El rol"},{"id":"b","text":"La restricción de longitud"},{"id":"c","text":"El contexto del público y los criterios de calidad"},{"id":"d","text":"El formato"}]'::jsonb, '{"value":"c"}'::jsonb, 'Sin saber a quién habla ni qué hace bueno al email, el modelo improvisa.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pe-1-1' and u.slug = 'pe-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multi_select', '¿Qué mejora más la calidad de una salida?', '[{"id":"a","text":"Añadir «por favor, sé muy bueno»"},{"id":"b","text":"Dar un ejemplo de salida ideal"},{"id":"c","text":"Definir criterios de calidad explícitos"},{"id":"d","text":"Escribir en mayúsculas"}]'::jsonb, '{"values":["b","c"]}'::jsonb, 'Ejemplos y criterios. Los adjetivos de ánimo y el énfasis tipográfico no aportan información.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pe-1-1' and u.slug = 'pe-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'ordering', 'Ordena los bloques de un prompt profesional:', '[{"id":"a","text":"Rol y contexto"},{"id":"b","text":"Tarea"},{"id":"c","text":"Restricciones"},{"id":"d","text":"Formato de salida"},{"id":"e","text":"Criterios de calidad"}]'::jsonb, '{"order":["a","b","c","d","e"]}'::jsonb, 'Ese orden va de lo general a lo verificable, que es como el modelo construye la respuesta.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pe-1-1' and u.slug = 'pe-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'Pedir al modelo que compruebe su respuesta contra los criterios antes de entregarla se llama autoevaluación o ______.', null, '{"acceptable":["autocrítica","autocritica","self-check","verificación","verificacion","revisión","revision"],"value":"autocrítica"}'::jsonb, 'La autoevaluación explícita reduce errores sin coste adicional de tu tiempo.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pe-1-1' and u.slug = 'pe-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', 'La salida es correcta en contenido pero demasiado larga y con tono formal. ¿Qué cambias primero?', '[{"id":"a","text":"El modelo"},{"id":"b","text":"Las restricciones de longitud y tono"},{"id":"c","text":"La tarea"}]'::jsonb, '{"value":"b"}'::jsonb, 'El fallo es de estilo y forma: se corrige con restricciones explícitas o un ejemplo de tono.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pe-1-2' and u.slug = 'pe-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'true_false', 'Cambiar cinco cosas a la vez en el prompt es una forma eficiente de iterar.', '[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}]'::jsonb, '{"value":"false"}'::jsonb, 'No: no puedes atribuir la mejora. La iteración controlada cambia una variable por vuelta.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pe-1-2' and u.slug = 'pe-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'ordering', 'Ordena el ciclo de iteración:', '[{"id":"a","text":"Diagnosticar el tipo de fallo"},{"id":"b","text":"Cambiar una sola variable"},{"id":"c","text":"Repetir con el mismo input"},{"id":"d","text":"Guardar la versión que funciona"}]'::jsonb, '{"order":["a","b","c","d"]}'::jsonb, 'Diagnóstico, cambio único, comparación y conservación: método científico aplicado a prompts.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pe-1-2' and u.slug = 'pe-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'Cuando el problema es de estilo, la solución más fiable es incluir un ______ de la salida deseada.', null, '{"acceptable":["ejemplo","muestra","few-shot"],"value":"ejemplo"}'::jsonb, 'Los ejemplos comunican estilo mejor que cualquier adjetivo.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pe-1-2' and u.slug = 'pe-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', '¿Qué instrucción evita que el modelo invente datos ausentes?', '[{"id":"a","text":"«Sé preciso»"},{"id":"b","text":"«Si un dato no está en el texto, devuelve null en ese campo»"},{"id":"c","text":"«No te equivoques»"}]'::jsonb, '{"value":"b"}'::jsonb, 'Una instrucción condicional explícita es la única que da un comportamiento definido ante el vacío.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pe-1-3' and u.slug = 'pe-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multi_select', '¿Qué hace que una salida sea automatizable?', '[{"id":"a","text":"Esquema fijo de claves"},{"id":"b","text":"Valores cerrados (enums)"},{"id":"c","text":"Texto libre inspirador"},{"id":"d","text":"Manejo explícito de datos faltantes"}]'::jsonb, '{"values":["a","b","d"]}'::jsonb, 'El texto libre es para humanos; para sistemas hace falta estructura y valores predecibles.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pe-1-3' and u.slug = 'pe-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'Un campo que solo admite un conjunto cerrado de valores se modela como ______ en el esquema.', null, '{"acceptable":["enum","enumeración","enumeracion"],"value":"enum"}'::jsonb, 'Los enums evitan variantes impredecibles y errores silenciosos en el sistema que consume la salida.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pe-1-3' and u.slug = 'pe-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'simulation', 'Tu automatización recibe una respuesta con texto antes del JSON y falla al parsear. ¿Qué haces?', '[{"id":"a","text":"Añadir un paso que corte el texto antes de la primera llave"},{"id":"b","text":"Pedir en el prompt «devuelve únicamente el objeto JSON, sin explicaciones ni markdown» y validar el esquema"},{"id":"c","text":"Cambiar de modelo y probar suerte"}]'::jsonb, '{"value":"b"}'::jsonb, 'Se arregla en el origen y se protege con validación. El parche en el consumidor oculta el problema.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pe-1-3' and u.slug = 'pe-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', '¿Qué vende mejor un servicio de IA a un negocio?', '[{"id":"a","text":"«Uso GPT-4 y automatizaciones con n8n»"},{"id":"b","text":"«Reduzco 12 horas al mes la gestión de reseñas, con revisión humana antes de publicar»"},{"id":"c","text":"«Soy experto en prompt engineering»"}]'::jsonb, '{"value":"b"}'::jsonb, 'Horas ahorradas y control. La tecnología es el medio, no la promesa.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pe-1-4' and u.slug = 'pe-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'ordering', 'Ordena el proceso comercial de un servicio de IA:', '[{"id":"a","text":"Elegir un proceso caro y repetitivo de un nicho"},{"id":"b","text":"Piloto de 2 semanas a precio cerrado"},{"id":"c","text":"Medir ahorro o mejora con un número"},{"id":"d","text":"Convertir a cuota mensual con ese número"}]'::jsonb, '{"order":["a","b","c","d"]}'::jsonb, 'El número es el puente entre el piloto y el contrato.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pe-1-4' and u.slug = 'pe-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'true_false', 'Automatizar al 100% sin revisión humana es siempre lo que el cliente quiere.', '[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}]'::jsonb, '{"value":"false"}'::jsonb, 'La mayoría necesita control y trazabilidad. La revisión humana es parte del producto, no un defecto.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pe-1-4' and u.slug = 'pe-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'Cobrar una cuota mensual recurrente por mantener un proceso funcionando se denomina modelo de ______.', null, '{"acceptable":["suscripción","suscripcion","retainer","abono"],"value":"suscripción"}'::jsonb, 'La recurrencia es lo que convierte un trabajo puntual en un negocio.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pe-1-4' and u.slug = 'pe-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', '¿Cuál es una hipótesis falsable?', '[{"id":"a","text":"A la gente le gusta ahorrar"},{"id":"b","text":"10 de cada 100 profesores pagarían 15 €/mes por corrección con IA y lo sabré si logro 10 pagos en 21 días"},{"id":"c","text":"El mercado de la educación crece cada año"}]'::jsonb, '{"value":"b"}'::jsonb, 'Tiene segmento, umbral, plazo y una acción medible. Se puede fallar.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'st-1-1' and u.slug = 'st-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multi_select', '¿Qué debe incluir una hipótesis?', '[{"id":"a","text":"Segmento concreto"},{"id":"b","text":"Acción observable"},{"id":"c","text":"Umbral de éxito"},{"id":"d","text":"Un logo bonito"}]'::jsonb, '{"values":["a","b","c"]}'::jsonb, 'Segmento, acción y umbral. El logo es cosmética.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'st-1-1' and u.slug = 'st-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'Una hipótesis que puede demostrarse falsa se llama hipótesis ______.', null, '{"acceptable":["falsable","refutable","contrastable"],"value":"falsable"}'::jsonb, 'Si ninguna evidencia posible podría contradecirla, no sirve para aprender.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'st-1-1' and u.slug = 'st-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'true_false', 'Que tu hipótesis falle es un fracaso del proyecto.', '[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}]'::jsonb, '{"value":"false"}'::jsonb, 'Es el sistema funcionando: descartas una vía por poco dinero en lugar de descubrirlo con meses y 10.000 €.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'st-1-1' and u.slug = 'st-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', '¿Qué pregunta es más útil en una entrevista de validación?', '[{"id":"a","text":"¿Comprarías una app que te ayudase a estudiar?"},{"id":"b","text":"¿Cuándo fue la última vez que dejaste un curso a medias y por qué?"},{"id":"c","text":"¿Te gusta aprender?"}]'::jsonb, '{"value":"b"}'::jsonb, 'Pregunta por un hecho pasado y concreto; la opinión hipotética no es evidencia.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'st-1-2' and u.slug = 'st-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'ordering', 'Ordena una entrevista de problema:', '[{"id":"a","text":"Contexto: cuéntame tu rutina de estudio"},{"id":"b","text":"Incidente: cuándo fue la última vez que falló"},{"id":"c","text":"Coste: qué hiciste y cuánto te costó"},{"id":"d","text":"Intentos previos: qué probaste antes"}]'::jsonb, '{"order":["a","b","c","d"]}'::jsonb, 'De lo general al hecho concreto: cada capa desciende del relato a la evidencia.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'st-1-2' and u.slug = 'st-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'Una señal fuerte de que el problema es real es que la persona ya haya ______ por resolverlo.', null, '{"acceptable":["pagado","intentado","gastado","invertido"],"value":"pagado"}'::jsonb, 'El intento previo demuestra que el problema pasó el filtro de la pereza.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'st-1-2' and u.slug = 'st-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'true_false', 'Preguntar «¿pagarías 9 € al mes?» y recibir un sí es una validación suficiente.', '[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}]'::jsonb, '{"value":"false"}'::jsonb, 'Es intención declarada. Solo el pago real (o una pre-venta) valida disposición a pagar.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'st-1-2' and u.slug = 'st-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', '¿Cuál es la señal de validación más fuerte?', '[{"id":"a","text":"200 personas apuntadas a la lista de espera"},{"id":"b","text":"3 personas que pagan 9 € por algo que entregarás en 4 semanas"},{"id":"c","text":"50 respuestas a una encuesta diciendo «me interesa»"}]'::jsonb, '{"value":"b"}'::jsonb, 'El dinero es la única señal de prioridad. La lista de espera es una señal débil y fácil de inflar.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'st-1-3' and u.slug = 'st-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multi_select', '¿Qué debe incluir una pre-venta honesta?', '[{"id":"a","text":"Una promesa concreta y medible"},{"id":"b","text":"Un precio real"},{"id":"c","text":"Una fecha de entrega creíble"},{"id":"d","text":"Una política de devolución sin preguntas"}]'::jsonb, '{"values":["a","b","c","d"]}'::jsonb, 'Si falta la devolución, la pre-venta se convierte en una trampa y destruye la marca.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'st-1-3' and u.slug = 'st-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'Una conversión razonable en una landing de pre-venta con tráfico cualificado está entre el 2% y el __%.', null, '{"acceptable":["5","cinco","6","4"],"value":"5"}'::jsonb, 'Por encima del 5% con tráfico frío desconfía: mide la muestra antes de celebrar.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'st-1-3' and u.slug = 'st-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'simulation', 'Llevas 14 días, 400 visitas y 2 pagos. ¿Qué haces?', '[{"id":"a","text":"Construir la app completa"},{"id":"b","text":"Hablar con los 2 que pagaron y con 20 visitantes que no compraron, y ajustar la promesa"},{"id":"c","text":"Meter 1.000 € en anuncios"}]'::jsonb, '{"value":"b"}'::jsonb, 'Con pocos pagos hay que entender el «no» antes de invertir más. Los 2 pagos son tu activo más valioso.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'st-1-3' and u.slug = 'st-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', '¿Qué es un MVP?', '[{"id":"a","text":"La versión 1.0 completa pero con menos colores"},{"id":"b","text":"El experimento más barato que entrega la promesa hecha al cliente"},{"id":"c","text":"Una app con solo login y pantalla de inicio"}]'::jsonb, '{"value":"b"}'::jsonb, 'Se define por la promesa, no por el número de pantallas.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'st-1-4' and u.slug = 'st-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'ordering', 'Ordena un MVP de 7 días:', '[{"id":"a","text":"Definir la promesa exacta que se entrega"},{"id":"b","text":"Elegir herramientas que ya existan"},{"id":"c","text":"Entregar a 3 clientes a mano"},{"id":"d","text":"Recoger su resultado y su testimonio"}]'::jsonb, '{"order":["a","b","c","d"]}'::jsonb, 'Promesa, herramientas, entrega manual y evidencia. Sin el último paso solo tienes trabajo, no aprendizaje.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'st-1-4' and u.slug = 'st-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'Entregar el servicio manualmente antes de automatizarlo se llama operar como ______.', null, '{"acceptable":["servicio","concierge","artesano","manual"],"value":"servicio"}'::jsonb, 'Modelo concierge: valida la demanda antes de invertir en producto.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'st-1-4' and u.slug = 'st-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'true_false', 'Para lanzar un MVP de educación necesitas tener la app móvil publicada.', '[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}]'::jsonb, '{"value":"false"}'::jsonb, 'No. Un currículo en una hoja de cálculo y una llamada semanal pueden entregar más valor que una app sin contenido.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'st-1-4' and u.slug = 'st-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', '¿Qué tres partes tiene cualquier algoritmo?', '[{"id":"a","text":"Lenguaje, compilador y ejecutable"},{"id":"b","text":"Entrada, proceso y salida"},{"id":"c","text":"Frontend, backend y base de datos"}]'::jsonb, '{"value":"b"}'::jsonb, 'Todo programa transforma una entrada en una salida mediante un proceso.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pr-1-1' and u.slug = 'pr-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'true_false', 'Un ordenador interpreta el contexto igual que una persona.', '[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}]'::jsonb, '{"value":"false"}'::jsonb, 'Ejecuta exactamente lo que escribes. Por eso la precisión importa más que la intención.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pr-1-1' and u.slug = 'pr-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'ordering', 'Ordena los pasos para calcular el margen de un producto:', '[{"id":"a","text":"Leer precio de venta y coste"},{"id":"b","text":"Restar coste al precio"},{"id":"c","text":"Dividir el margen entre el precio"},{"id":"d","text":"Mostrar el porcentaje"}]'::jsonb, '{"order":["a","b","c","d"]}'::jsonb, 'Entrada, operación, normalización y salida. Ese patrón se repite en todo programa.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pr-1-1' and u.slug = 'pr-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'Al conjunto ordenado de pasos que resuelve un problema se le llama ______.', null, '{"acceptable":["algoritmo"],"value":"algoritmo"}'::jsonb, 'Algoritmo: la receta. El lenguaje de programación es solo cómo se escribe.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pr-1-1' and u.slug = 'pr-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', 'precio = «10» y precio + «5». ¿Resultado en la mayoría de lenguajes con texto?', '[{"id":"a","text":"15"},{"id":"b","text":"«105»"},{"id":"c","text":"Error siempre"}]'::jsonb, '{"value":"b"}'::jsonb, 'Concatena. Mezclar tipos produce resultados correctos sintácticamente y falsos semánticamente: el peor tipo de bug.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pr-1-2' and u.slug = 'pr-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', '¿Cuál es el mejor nombre para el precio final de un producto en euros?', '[{"id":"a","text":"p"},{"id":"b","text":"precio"},{"id":"c","text":"precio_venta_eur"},{"id":"d","text":"dato1"}]'::jsonb, '{"value":"c"}'::jsonb, 'Incluye qué es y en qué unidad. «precio» obliga a adivinar si son euros o céntimos.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pr-1-2' and u.slug = 'pr-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'El tipo de dato que solo puede ser verdadero o falso se llama ______.', null, '{"acceptable":["booleano","boolean","lógico","logico"],"value":"booleano"}'::jsonb, 'Booleano: la base de toda decisión en un programa.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pr-1-2' and u.slug = 'pr-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'true_false', 'En un programa, el mismo dato puede guardarse en dos variables con nombres distintos.', '[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}]'::jsonb, '{"value":"true"}'::jsonb, 'Sí, y es una fuente habitual de inconsistencias: una se actualiza y la otra no. Mejor una sola fuente de verdad.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pr-1-2' and u.slug = 'pr-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', '¿Qué devuelve 10 >= 3 * 3?', '[{"id":"a","text":"true"},{"id":"b","text":"false"},{"id":"c","text":"10"}]'::jsonb, '{"value":"a"}'::jsonb, '3 × 3 = 9 y 10 ≥ 9, así que verdadero. La regla 3x se cumple.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pr-1-3' and u.slug = 'pr-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', 'Coste aterrizado 0 €, precio 30 €. Con la condición precio >= coste * 3, ¿qué ocurre?', '[{"id":"a","text":"Falla y se descarta el producto"},{"id":"b","text":"Se cumple trivialmente porque 0 × 3 = 0"},{"id":"c","text":"Da error de división"}]'::jsonb, '{"value":"b"}'::jsonb, 'Caso límite: cualquier precio ≥ 0 pasa. Si el coste puede ser 0 por un dato ausente, hay que validarlo antes.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pr-1-3' and u.slug = 'pr-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'Para exigir que se cumplan dos condiciones a la vez se usa el operador lógico ___ (en inglés).', null, '{"acceptable":["and","y","&&"],"value":"and"}'::jsonb, 'AND: ambas verdaderas. OR basta con una.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pr-1-3' and u.slug = 'pr-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'ordering', 'Ordena esta validación de entrada lógicamente:', '[{"id":"a","text":"Comprobar que el coste es mayor que 0"},{"id":"b","text":"Comprobar que el precio es mayor que 0"},{"id":"c","text":"Calcular el ratio precio/coste"},{"id":"d","text":"Decidir si el ratio es al menos 3"}]'::jsonb, '{"order":["a","b","c","d"]}'::jsonb, 'Valida antes de calcular: dividir entre cero rompe el programa.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pr-1-3' and u.slug = 'pr-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', '¿Cuándo es más apropiado un while que un for?', '[{"id":"a","text":"Cuando sabes exactamente cuántas veces repetir"},{"id":"b","text":"Cuando repites hasta que se cumpla una condición"},{"id":"c","text":"Cuando quieres ejecutar una sola vez"}]'::jsonb, '{"value":"b"}'::jsonb, 'for: número conocido de iteraciones. while: condición de salida.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pr-1-4' and u.slug = 'pr-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', '¿Qué provoca un bucle infinito?', '[{"id":"a","text":"Que la condición de salida nunca se vuelva falsa"},{"id":"b","text":"Usar for en lugar de while"},{"id":"c","text":"Tener muchos datos"}]'::jsonb, '{"value":"a"}'::jsonb, 'Si nada dentro del bucle modifica la condición, se ejecuta para siempre.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pr-1-4' and u.slug = 'pr-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'ordering', 'Ordena la calculadora de margen completa:', '[{"id":"a","text":"Leer la lista de productos"},{"id":"b","text":"Recorrer cada producto"},{"id":"c","text":"Calcular el ratio precio/coste"},{"id":"d","text":"Descartar los que no llegan a 3x"},{"id":"e","text":"Mostrar los rentables ordenados por margen"}]'::jsonb, '{"order":["a","b","c","d","e"]}'::jsonb, 'Lectura, recorrido, cálculo, filtro y presentación: el esqueleto de casi cualquier herramienta de datos.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pr-1-4' and u.slug = 'pr-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'Un producto cuesta 8 € puesto en casa y se vende a 31 €. El ratio es ____ (un decimal).', null, '{"acceptable":["3.9","3,9","3.8","3,8"],"value":"3.9"}'::jsonb, '31 / 8 = 3,9x. Cumple la regla 3x y deja unos 8 € para adquirir cada cliente.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'pr-1-4' and u.slug = 'pr-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', 'Con una rentabilidad anual del 9%, según la regla del 72, ¿en cuántos años se duplica el capital?', '[{"id":"a","text":"6 años"},{"id":"b","text":"8 años"},{"id":"c","text":"12 años"},{"id":"d","text":"18 años"}]'::jsonb, '{"value":"b"}'::jsonb, '72 / 9 = 8 años. Es una aproximación, no una promesa.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'fi-1-1' and u.slug = 'fi-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'true_false', 'Una rentabilidad del 7% anual garantiza que tendrás exactamente un 7% cada año.', '[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}]'::jsonb, '{"value":"false"}'::jsonb, 'La rentabilidad media no es la rentabilidad de cada año: la volatilidad hace que el orden de los años importe.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'fi-1-1' and u.slug = 'fi-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'Aportar 100 € al mes durante 10 años al 6% aproximadamente: ¿cuánto acaba en el capital final? Escribe solo el número de miles (ej.: 16).', null, '{"acceptable":["16","16.4","16400","16,4"],"value":"16"}'::jsonb, '≈16.400 €, de los que 12.000 son aportaciones y 4.400 son interés compuesto.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'fi-1-1' and u.slug = 'fi-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'simulation', 'Tienes 200 € hoy y puedes aportar 100 €/mes. ¿Qué importa más para el resultado a 20 años?', '[{"id":"a","text":"Elegir el producto con más rentabilidad histórica"},{"id":"b","text":"Empezar ya y no interrumpir las aportaciones"},{"id":"c","text":"Esperar a tener 10.000 € ahorrados"}]'::jsonb, '{"value":"b"}'::jsonb, 'La constancia y el plazo dominan en horizontes largos; esperar es el error más caro.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'fi-1-1' and u.slug = 'fi-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', 'Producto A: 5,5% bruto y 0,3% de coste. Producto B: 7% bruto y 2,5% de coste. ¿Cuál entrega más dinero?', '[{"id":"a","text":"A: 5,2% neto frente a 4,5%"},{"id":"b","text":"B: 7% es más que 5,5%"},{"id":"c","text":"Son iguales"}]'::jsonb, '{"value":"a"}'::jsonb, 'Se compara siempre el neto después de costes, no el bruto del folleto.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'fi-1-2' and u.slug = 'fi-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'true_false', 'Una comisión anual del 2% se cobra una sola vez al invertir.', '[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}]'::jsonb, '{"value":"false"}'::jsonb, 'Se cobra cada año sobre el patrimonio, incluidas las ganancias acumuladas.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'fi-1-2' and u.slug = 'fi-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'La comisión que cobra un fondo además de la gestión cuando obtiene beneficios se llama comisión de ______.', null, '{"acceptable":["éxito","exito","performance","resultado"],"value":"éxito"}'::jsonb, 'Comisión de éxito: hay que sumarla al coste total antes de comparar.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'fi-1-2' and u.slug = 'fi-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multi_select', '¿Qué costes deben entrar en el cálculo total?', '[{"id":"a","text":"Gestión"},{"id":"b","text":"Custodia"},{"id":"c","text":"Compraventa"},{"id":"d","text":"El color de la app"}]'::jsonb, '{"values":["a","b","c"]}'::jsonb, 'Todos los que aparecen en el documento de datos fundamentales del producto.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'fi-1-2' and u.slug = 'fi-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', 'Vas a comprar vivienda en 18 meses. ¿Qué haces con ese ahorro?', '[{"id":"a","text":"Invertirlo en un índice de renta variable global"},{"id":"b","text":"Mantenerlo en un instrumento de bajo riesgo y liquidez alta"},{"id":"c","text":"Criptomonedas a corto plazo"}]'::jsonb, '{"value":"b"}'::jsonb, 'Con un plazo de 18 meses, una caída del 30% te obligaría a vender en el peor momento. El plazo manda.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'fi-1-3' and u.slug = 'fi-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'true_false', 'Un producto con poca volatilidad nunca es arriesgado.', '[{"id":"true","text":"Verdadero"},{"id":"false","text":"Falso"}]'::jsonb, '{"value":"false"}'::jsonb, 'Puede ser arriesgado si no supera la inflación o si no es líquido cuando necesitas el dinero.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'fi-1-3' and u.slug = 'fi-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'La pérdida de poder de compra del dinero con el tiempo se llama ______.', null, '{"acceptable":["inflación","inflacion"],"value":"inflación"}'::jsonb, 'La inflación es el coste de no hacer nada: es un riesgo real aunque no aparezca en ningún gráfico.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'fi-1-3' and u.slug = 'fi-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'ordering', 'Ordena el proceso de decisión de una inversión:', '[{"id":"a","text":"Definir el objetivo y el plazo"},{"id":"b","text":"Calcular cuánto puedes permitirte perder"},{"id":"c","text":"Elegir el tipo de activo adecuado"},{"id":"d","text":"Comparar productos por coste total"}]'::jsonb, '{"order":["a","b","c","d"]}'::jsonb, 'De la vida al producto, nunca al revés.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'fi-1-3' and u.slug = 'fi-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multiple_choice', '¿Para qué sirve diversificar?', '[{"id":"a","text":"Para garantizar rentabilidad"},{"id":"b","text":"Para reducir el impacto de que una sola inversión salga mal"},{"id":"c","text":"Para pagar menos comisiones siempre"}]'::jsonb, '{"value":"b"}'::jsonb, 'Diversificar no promete más rentabilidad: reduce el riesgo específico de concentrarte en un activo.', 'easy', 1, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'fi-1-4' and u.slug = 'fi-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 1
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'multi_select', '¿Qué debe contener tu plan escrito?', '[{"id":"a","text":"Objetivo y plazo"},{"id":"b","text":"Importe y frecuencia de aportación"},{"id":"c","text":"Reglas de conducta en caídas"},{"id":"d","text":"Predicción del precio para el próximo mes"}]'::jsonb, '{"values":["a","b","c"]}'::jsonb, 'Las predicciones no forman parte de un plan: la conducta sí.', 'easy', 2, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'fi-1-4' and u.slug = 'fi-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 2
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'fill_blank', 'Invertir la misma cantidad cada mes se llama aportación ______.', null, '{"acceptable":["periódica","periodica","sistemática","sistematica","dca"],"value":"periódica"}'::jsonb, 'Aportación periódica (DCA): elimina la decisión emocional del momento de entrada.', 'easy', 3, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'fi-1-4' and u.slug = 'fi-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 3
);
insert into public.exercises (lesson_id, type, prompt, options, correct_answer, explanation, difficulty, order_index, xp_reward)
select l.id, 'simulation', 'Tu cartera cae un 25% en un mes. Tu plan es a 15 años. ¿Qué haces?', '[{"id":"a","text":"Vender para evitar más pérdidas"},{"id":"b","text":"Seguir el plan y mantener la aportación automática"},{"id":"c","text":"Duplicar la apuesta en un solo activo para recuperar rápido"}]'::jsonb, '{"value":"b"}'::jsonb, 'A 15 años, una caída es una compra más barata. La regla escrita existe precisamente para este momento.', 'easy', 4, 5
from public.lessons l join public.units u on u.id = l.unit_id
where l.slug = 'fi-1-4' and u.slug = 'fi-u1'
and not exists (
  select 1 from public.exercises x where x.lesson_id = l.id and x.order_index = 4
);

-- Ruta recomendada (orden de lecciones).
insert into public.app_config (key, value)
values ('unlock_order', '["ms-1-1","ms-1-2","ms-1-3","ms-2-1","ms-2-2","ms-2-3","ms-2-4","sd-1-1","sd-1-2","sd-1-3","sd-1-4","ag-1-1","ag-1-2","ag-1-3","ag-1-4","pe-1-1","pe-1-2","pe-1-3","pe-1-4","st-1-1","st-1-2","st-1-3","st-1-4","pr-1-1","pr-1-2","pr-1-3","pr-1-4","fi-1-1","fi-1-2","fi-1-3","fi-1-4"]'::jsonb)
on conflict (key) do update set value = excluded.value;

commit;
