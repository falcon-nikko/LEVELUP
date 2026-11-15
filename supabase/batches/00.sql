-- LEVELUP · seed generado automáticamente desde content/curriculum.ts
-- No editar a mano. Regenerar con: npm run seed:build

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
