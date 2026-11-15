import type { Course } from "./courses/types";
import { splitDropshipping } from "./courses/dropshipping";
import { splitAgency } from "./courses/agency";
import { splitPrompt } from "./courses/prompt-engineering";
import { splitStartup } from "./courses/startup";
import { splitFinance } from "./courses/finance";
import { splitProgramming } from "./courses/programming";
import { splitMissions } from "./courses/missions";

export type World = {
  slug: "programming" | "finance" | "business" | "ai";
  name: string;
  tagline: string;
  description: string;
  color: string;
  icon: string;
};

export const worlds: World[] = [
  {
    slug: "programming",
    name: "Programación",
    tagline: "Construye cosas que la gente usa",
    description:
      "Del primer algoritmo a tu primera herramienta. Sin jerga y con ejercicios que producen resultados concretos.",
    color: "#2563EB",
    icon: "Code2",
  },
  {
    slug: "business",
    name: "Negocios",
    tagline: "Vende algo hoy, no en seis meses",
    description:
      "Dropshipping con criterio de márgenes, agencia B2B de una persona, startup validada con pagos reales y misiones semanales.",
    color: "#8B5CF6",
    icon: "Briefcase",
  },
  {
    slug: "ai",
    name: "Inteligencia Artificial",
    tagline: "Usa la IA como un operador, no como un juguete",
    description:
      "Prompts que se pueden automatizar, salidas estructuradas y servicios que un negocio paga cada mes.",
    color: "#F97316",
    icon: "Bot",
  },
  {
    slug: "finance",
    name: "Finanzas",
    tagline: "Entiende el dinero antes de invertirlo",
    description:
      "Interés compuesto, comisiones y riesgo real. Cero promesas de rentabilidad y cero atajos.",
    color: "#059669",
    icon: "TrendingUp",
  },
];

export const courses: Course[] = [
  splitMissions,
  splitDropshipping,
  splitAgency,
  splitPrompt,
  splitStartup,
  splitProgramming,
  splitFinance,
];

export type LessonWithCourse = Course["units"][number]["lessons"][number] & {
  courseSlug: string;
  courseTitle: string;
  world: Course["world"];
  unitId: string;
  unitTitle: string;
  courseOrder: number;
  unitOrder: number;
  lessonOrder: number;
};

/** Orden de desbloqueo sugerido: la primera ruta recomendada. */
export const unlockOrder: string[] = [
  "ms-1-1",
  "ms-1-2",
  "ms-1-3",
  "ms-2-1",
  "ms-2-2",
  "ms-2-3",
  "ms-2-4",
  "sd-1-1",
  "sd-1-2",
  "sd-1-3",
  "sd-1-4",
  "ag-1-1",
  "ag-1-2",
  "ag-1-3",
  "ag-1-4",
  "pe-1-1",
  "pe-1-2",
  "pe-1-3",
  "pe-1-4",
  "st-1-1",
  "st-1-2",
  "st-1-3",
  "st-1-4",
  "pr-1-1",
  "pr-1-2",
  "pr-1-3",
  "pr-1-4",
  "fi-1-1",
  "fi-1-2",
  "fi-1-3",
  "fi-1-4",
];

export const allLessons: LessonWithCourse[] = courses.flatMap((course, ci) =>
  course.units.flatMap((unit, ui) =>
    unit.lessons.map((lesson, li) => ({
      ...lesson,
      courseSlug: course.slug,
      courseTitle: course.title,
      world: course.world,
      unitId: unit.id,
      unitTitle: unit.title,
      courseOrder: ci,
      unitOrder: ui,
      lessonOrder: li,
    })),
  ),
);

export const lessonMap = new Map(allLessons.map((l) => [l.id, l]));
export const courseMap = new Map(courses.map((c) => [c.slug, c]));

export const curriculumStats = {
  worlds: worlds.length,
  courses: courses.length,
  units: courses.reduce((n, c) => n + c.units.length, 0),
  lessons: allLessons.length,
  exercises: allLessons.reduce((n, l) => n + l.exercises.length, 0),
  minutes: allLessons.reduce((n, l) => n + l.minutes, 0),
  xp: allLessons.reduce((n, l) => n + l.xp, 0),
};
