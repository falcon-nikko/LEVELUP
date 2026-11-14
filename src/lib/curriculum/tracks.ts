import { bi } from '@/lib/curriculum/authoring';
import { TrackSlug } from '@/lib/curriculum/affiliates';
import { Lesson, Track, Unit } from '@/lib/curriculum/types';

import { AI_UNIT_1 } from '@/lib/curriculum/courses/ai-unit-1';
import { AI_UNIT_2 } from '@/lib/curriculum/courses/ai-unit-2';
import { CODE_UNIT_1 } from '@/lib/curriculum/courses/code-unit-1';
import { CODE_UNIT_2 } from '@/lib/curriculum/courses/code-unit-2';
import { ECOM_UNIT_1 } from '@/lib/curriculum/courses/ecom-unit-1';
import { ECOM_UNIT_2 } from '@/lib/curriculum/courses/ecom-unit-2';
import { AGENCY_UNIT_1 } from '@/lib/curriculum/courses/agency-unit-1';
import { AGENCY_UNIT_2 } from '@/lib/curriculum/courses/agency-unit-2';

/* Re-exported so every existing import site keeps working unchanged. */
export type {
  ActionMission,
  CareerTrack,
  CurriculumLesson,
  CurriculumUnit,
  DiagramSpec,
  DiagramTone,
  Exercise,
  ExerciseFormat,
  ExerciseOption,
  Lesson,
  LessonExercise,
  TheoryBlock,
  Track,
  Unit,
  WorkedExample,
} from '@/lib/curriculum/types';

/* ==========================================================================
   TRACK CATALOGUE
   Thin composer: the lessons live in `courses/*.ts`, this file only wires
   units into tracks and exposes the lookups the app uses.
   ========================================================================== */

export const CAREER_TRACKS: Track[] = [
  {
    slug: 'ai-automation',
    supabaseWorldSlug: 'ai',
    accent: '#1CB0F6',
    accentLip: '#1899D6',
    accentWash: '#DDF4FF',
    accentInk: '#FFFFFF',
    accentSoft: 'rgba(28, 176, 246, 0.12)',
    badgeCode: '01 · AI',
    name: bi('AI & Automation', 'AI & Automation'),
    shortTag: bi('Modelos, prompts, pipelines y agentes', 'Models, prompts, pipelines and agents'),
    description: bi(
      'Cómo funciona un modelo por dentro, prompts que producen la misma salida siempre, pipelines con ruta de error y agentes con herramientas limitadas que se cobran a una empresa.',
      'How a model works inside, prompts that produce the same output every time, pipelines with an error path, and agents with limited tools that get charged to a real company.'
    ),
    outcomes: [
      bi('Escribir prompts deterministas con salida JSON validada', 'Write deterministic prompts with validated JSON output'),
      bi('Montar pipelines en Make y n8n con manejo de error y reintento', 'Build Make and n8n pipelines with error handling and retry'),
      bi('Vender una automatización con alcance, precio y mantenimiento', 'Sell an automation with scope, price and maintenance'),
    ],
    units: [AI_UNIT_1, AI_UNIT_2],
  },
  {
    slug: 'modern-coding',
    supabaseWorldSlug: 'programming',
    accent: '#58CC02',
    accentLip: '#58A700',
    accentWash: '#D7FFB8',
    accentInk: '#FFFFFF',
    accentSoft: 'rgba(88, 204, 2, 0.12)',
    badgeCode: '02 · CODE',
    name: bi('Modern Coding', 'Modern Coding'),
    shortTag: bi('JS, TS, React, Next y SQL', 'JS, TS, React, Next and SQL'),
    description: bi(
      'JavaScript sin trampas, TypeScript que aporta, el modelo mental de React, App Router con la frontera bien puesta y Supabase sin fugas de datos.',
      'JavaScript without traps, TypeScript that contributes, the React mental model, App Router with the boundary in the right place and Supabase with no data leaks.'
    ),
    outcomes: [
      bi('Leer y depurar JavaScript y TypeScript de producción', 'Read and debug production JavaScript and TypeScript'),
      bi('Construir una app Next.js completa con datos en Supabase', 'Build a complete Next.js app with data in Supabase'),
      bi('Escribir SQL y políticas RLS que responden preguntas de negocio', 'Write SQL and RLS policies that answer business questions'),
    ],
    units: [CODE_UNIT_1, CODE_UNIT_2],
  },
  {
    slug: 'smart-dropshipping',
    supabaseWorldSlug: 'business',
    accent: '#FF9600',
    accentLip: '#D97B00',
    accentWash: '#FFE8CC',
    accentInk: '#FFFFFF',
    accentSoft: 'rgba(255, 150, 0, 0.14)',
    badgeCode: '03 · ECOM',
    name: bi('Smart Dropshipping', 'Smart Dropshipping'),
    shortTag: bi('Unit economics, ROAS, creativo y caja', 'Unit economics, ROAS, creative and cash'),
    description: bi(
      'Los números antes que la tienda: margen de contribución, BE ROAS, validación con criterio de kill escrito, creativos UGC, estructura de campaña y escala sin quedarse sin caja.',
      'The numbers before the store: contribution margin, BE ROAS, validation with a written kill criterion, UGC creatives, campaign structure and scaling without running out of cash.'
    ),
    outcomes: [
      bi('Calcular margen, BE ROAS y CPA máximo antes de gastar un euro', 'Calculate margin, BE ROAS and max CPA before spending a euro'),
      bi('Validar demanda con datos y un criterio de kill escrito antes', 'Validate demand with data and a kill criterion written beforehand'),
      bi('Escalar el gasto en pasos del 20% cubriendo el ciclo de caja', 'Scale spend in 20% steps while covering the cash cycle'),
    ],
    units: [ECOM_UNIT_1, ECOM_UNIT_2],
  },
  {
    slug: 'digital-agency',
    supabaseWorldSlug: 'business',
    accent: '#FFC800',
    accentLip: '#E5A800',
    accentWash: '#FFF4CC',
    accentInk: '#042C60',
    accentSoft: 'rgba(255, 200, 0, 0.18)',
    badgeCode: '04 · B2B',
    name: bi('Digital Agency B2B', 'Digital Agency B2B'),
    shortTag: bi('Nicho, oferta, outreach y retención', 'Niche, offer, outreach and retention'),
    description: bi(
      'Nicho con atributos verificables, oferta con resultado medible, infraestructura de envío que no quema tu dominio, secuencias que responden y una entrega que retiene.',
      'A niche with verifiable attributes, an offer with a measurable outcome, sending infrastructure that does not burn your domain, sequences that get replies and a delivery that retains.'
    ),
    outcomes: [
      bi('Definir un ICP verificable y una oferta con resultado y garantía', 'Define a verifiable ICP and an offer with outcome and guarantee'),
      bi('Dimensionar dominios y buzones con SPF, DKIM y DMARC', 'Size domains and mailboxes with SPF, DKIM and DMARC'),
      bi('Conducir la llamada de diagnóstico y subir precio en renovación', 'Run the diagnostic call and raise the price at renewal'),
    ],
    units: [AGENCY_UNIT_1, AGENCY_UNIT_2],
  },
];

/* ==========================================================================
   LOOKUPS
   ========================================================================== */

const TRACK_BY_SLUG = new Map<string, Track>(CAREER_TRACKS.map((t) => [t.slug, t]));

export function getTrackBySlug(slug: string | null | undefined): Track {
  return TRACK_BY_SLUG.get(slug ?? '') ?? CAREER_TRACKS[0];
}

export function getTrackMeta(slug: TrackSlug): Track {
  return getTrackBySlug(slug);
}

export function getAllUnits(): Unit[] {
  return CAREER_TRACKS.flatMap((track) => track.units);
}

export function getUnitBySlug(slug: string | null | undefined): Unit | undefined {
  return getAllUnits().find((unit) => unit.slug === slug);
}

export function getTrackUnits(trackSlug: TrackSlug): Unit[] {
  return getTrackBySlug(trackSlug).units;
}

export function getAllLessons(): Lesson[] {
  return CAREER_TRACKS.flatMap((track) => track.units.flatMap((unit) => unit.lessons));
}

export function getTrackLessons(trackSlug: TrackSlug): Lesson[] {
  return getTrackBySlug(trackSlug).units.flatMap((unit) => unit.lessons);
}

export function getUnitLessons(unitSlug: string): Lesson[] {
  return getUnitBySlug(unitSlug)?.lessons ?? [];
}

export function getLessonBySlug(slug: string | null | undefined): Lesson | undefined {
  return getAllLessons().find((lesson) => lesson.slug === slug);
}

/** The lesson that follows `slug` inside its own track, or undefined at the end. */
export function getNextLesson(slug: string): Lesson | undefined {
  const lesson = getLessonBySlug(slug);
  if (!lesson) return undefined;
  const lessons = getTrackLessons(lesson.trackSlug);
  const index = lessons.findIndex((l) => l.slug === slug);
  return index >= 0 ? lessons[index + 1] : undefined;
}

/** The lesson before `slug` inside its own track, or undefined at the start. */
export function getPreviousLesson(slug: string): Lesson | undefined {
  const lesson = getLessonBySlug(slug);
  if (!lesson) return undefined;
  const lessons = getTrackLessons(lesson.trackSlug);
  const index = lessons.findIndex((l) => l.slug === slug);
  return index > 0 ? lessons[index - 1] : undefined;
}

/* ==========================================================================
   AGGREGATES — used by the path, the profile and the practice hub
   ========================================================================== */

export function countExercises(lessons: Lesson[]): number {
  return lessons.reduce((sum, lesson) => sum + lesson.exercises.length, 0);
}

export function lessonXp(lesson: Lesson): number {
  return lesson.xpReward + lesson.actionMission.xpBonus;
}

export function trackXp(trackSlug: TrackSlug): number {
  return getTrackLessons(trackSlug).reduce((sum, lesson) => sum + lessonXp(lesson), 0);
}

export function trackMinutes(trackSlug: TrackSlug): number {
  return getTrackLessons(trackSlug).reduce((sum, lesson) => sum + lesson.durationMin, 0);
}

export const CURRICULUM_STATS = {
  tracks: CAREER_TRACKS.length,
  units: getAllUnits().length,
  lessons: getAllLessons().length,
  exercises: countExercises(getAllLessons()),
  minutes: getAllLessons().reduce((sum, lesson) => sum + lesson.durationMin, 0),
};
