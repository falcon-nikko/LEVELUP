import type { QuestWithProgress } from "./types";

export const questDefs = [
  {
    slug: "daily_lessons_2",
    name: "Estudiante constante",
    description: "Completa 2 lecciones",
    icon: "BookOpen",
    type: "lessons",
    target: 2,
    xpReward: 20,
  },
  {
    slug: "daily_xp_50",
    name: "Cazador de XP",
    description: "Gana 50 XP",
    icon: "Zap",
    type: "xp",
    target: 50,
    xpReward: 25,
  },
  {
    slug: "daily_exercise_10",
    name: "Practicante",
    description: "Acierta 10 ejercicios",
    icon: "Target",
    type: "exercise",
    target: 10,
    xpReward: 20,
  },
  {
    slug: "daily_streak",
    name: "Racha viva",
    description: "Mantén la racha hoy",
    icon: "Flame",
    type: "streak",
    target: 1,
    xpReward: 10,
  },
];

export type DailyLog = { date: string; lessons: number; xp: number; exercises: number };

export function computeQuests(log: DailyLog, streakToday: boolean): QuestWithProgress[] {
  return questDefs.map((q) => {
    let progress = 0;
    if (q.type === "lessons") progress = log.lessons;
    if (q.type === "xp") progress = log.xp;
    if (q.type === "exercise") progress = log.exercises;
    if (q.type === "streak") progress = streakToday ? 1 : 0;
    return {
      ...q,
      progress,
      completed: progress >= q.target,
      xpReward: q.xpReward,
    };
  });
}
