import type { DailyLog } from "./quests";
import { todayKey } from "./progress";

const key = (date: string) => `levelup.log.${date}`;

export function readDailyLog(date = todayKey()): DailyLog {
  if (typeof window === "undefined") return { date, lessons: 0, xp: 0, exercises: 0 };
  try {
    const raw = window.localStorage.getItem(key(date));
    if (!raw) return { date, lessons: 0, xp: 0, exercises: 0 };
    return { date, lessons: 0, xp: 0, exercises: 0, ...(JSON.parse(raw) as Partial<DailyLog>) };
  } catch {
    return { date, lessons: 0, xp: 0, exercises: 0 };
  }
}

export function addToDailyLog(patch: Partial<Omit<DailyLog, "date">>, date = todayKey()): DailyLog {
  const current = readDailyLog(date);
  const next: DailyLog = {
    date,
    lessons: current.lessons + (patch.lessons ?? 0),
    xp: current.xp + (patch.xp ?? 0),
    exercises: current.exercises + (patch.exercises ?? 0),
  };
  if (typeof window !== "undefined") window.localStorage.setItem(key(date), JSON.stringify(next));
  return next;
}
