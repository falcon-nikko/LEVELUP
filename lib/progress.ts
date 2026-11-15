import { allLessons, unlockOrder, lessonMap } from "@/content/curriculum";

/**
 * Motor de progreso local.
 *
 * Se usa en el modo DEMO y también como caché optimista en el modo Supabase,
 * de forma que la UI responde al instante aunque la red tarde.
 */

export const emptyProfile = (): import("./types").Profile => ({
  id: null,
  displayName: "Invitado",
  email: null,
  avatarHue: 145,
  totalXp: 0,
  weeklyXp: 0,
  gems: 0,
  hearts: 5,
  maxHearts: 5,
  heartsRefillAt: null,
  streak: 0,
  longestStreak: 0,
  streakFreezes: 0,
  completedLessonSlugs: [],
  legendarySlugs: [],
  mistakeKeys: [],
  activityDates: [],
  dailyGoalMinutes: 10,
  minutesPracticed: 0,
  isPro: false,
  activeTrackSlug: null,
  xpBoostUntil: null,
  onboardingCompleted: false,
  weekKeyStored: weekKey(),
});

export function todayKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

function diffDays(a: string, b: string): number {
  const ms = new Date(`${a}T00:00:00Z`).getTime() - new Date(`${b}T00:00:00Z`).getTime();
  return Math.round(ms / 86400000);
}

export function weekKey(d = new Date()): string {
  const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${date.getUTCFullYear()}-${String(week).padStart(2, "0")}`;
}

/** Réplica en cliente de public.award_xp() para el modo demo. */
export function awardXpLocal(profile: import("./types").Profile, amount: number, minutes = 0) {
  const now = new Date();
  const today = todayKey(now);
  const wk = weekKey(now);

  const boosted = profile.xpBoostUntil ? new Date(profile.xpBoostUntil) > now : false;
  const applied = boosted ? amount * 2 : amount;
  const wonGems = Math.floor(applied / 10);

  const next: import("./types").Profile = {
    ...profile,
    totalXp: profile.totalXp + applied,
    weeklyXp: profile.weekKeyStored === wk ? profile.weeklyXp + applied : applied,
    gems: profile.gems + wonGems,
    minutesPracticed: profile.minutesPracticed + minutes,
    activityDates: profile.activityDates.includes(today) ? profile.activityDates : [...profile.activityDates, today],
  };
  next.weekKeyStored = wk;

  let streak = profile.streak;
  let longest = profile.longestStreak;
  let freezes = profile.streakFreezes;
  let freezeEarned = false;

  const last = profile.activityDates[profile.activityDates.length - 1];
  if (!last) {
    streak = 1;
    longest = Math.max(longest, 1);
  } else {
    const gap = diffDays(today, last);
    if (gap === 1) streak += 1;
    else if (gap === 2 && freezes > 0) {
      streak += 1;
      freezes -= 1;
    } else if (gap !== 0) streak = 1;

    longest = Math.max(longest, streak);
    if (streak > 0 && streak % 7 === 0 && freezes < 2) {
      freezes += 1;
      freezeEarned = true;
    }
  }

  next.streak = streak;
  next.longestStreak = longest;
  next.streakFreezes = freezes;

  return {
    profile: next,
    awarded: {
      totalXp: next.totalXp,
      weeklyXp: next.weeklyXp,
      gems: wonGems,
      streak,
      longestStreak: longest,
      streakFreezes: freezes,
      freezeEarned,
      boosted,
      appliedAmount: applied,
      rank: 1,
    },
  };
}

export function completeLessonLocal(
  profile: import("./types").Profile,
  lessonId: string,
  perfect: boolean,
) {
  const already = profile.completedLessonSlugs.includes(lessonId);
  const completed = already ? profile.completedLessonSlugs : [...profile.completedLessonSlugs, lessonId];
  const legendary =
    perfect && !profile.legendarySlugs.includes(lessonId)
      ? [...profile.legendarySlugs, lessonId]
      : profile.legendarySlugs;

  return {
    profile: {
      ...profile,
      completedLessonSlugs: completed,
      legendarySlugs: legendary,
      gems: profile.gems + (perfect && !profile.legendarySlugs.includes(lessonId) ? 20 : 0),
    },
    firstCompletion: !already,
  };
}

/** Estado de desbloqueo: una lección se abre si es la primera o si la anterior está completada. */
export function isUnlocked(lessonId: string, completed: string[]): boolean {
  const idx = unlockOrder.indexOf(lessonId);
  if (idx <= 0) return true;
  return completed.includes(unlockOrder[idx - 1]);
}

export function nextLessonId(completed: string[]): string {
  const pending = unlockOrder.find((id) => !completed.includes(id));
  return pending ?? unlockOrder[unlockOrder.length - 1];
}

export function courseProgress(courseSlug: string, completed: string[]) {
  const lessons = allLessons.filter((l) => l.courseSlug === courseSlug);
  const done = lessons.filter((l) => completed.includes(l.id)).length;
  return { done, total: lessons.length, pct: lessons.length ? Math.round((done / lessons.length) * 100) : 0 };
}

export function dailyMinutes(profile: import("./types").Profile, date = todayKey()) {
  // Aproximación: reparte los minutos practicados entre los días con actividad.
  const days = profile.activityDates.length || 1;
  if (!profile.activityDates.includes(date)) return 0;
  return Math.round(profile.minutesPracticed / days);
}

export function daysToNextFreeze(streak: number): number {
  const rem = streak % 7;
  return rem === 0 ? 7 : 7 - rem;
}

export function pickNext(completed: string[]): { id: string; title: string; courseTitle: string } {
  const id = nextLessonId(completed);
  const lesson = lessonMap.get(id);
  return { id, title: lesson?.title ?? "", courseTitle: lesson?.courseTitle ?? "" };
}

export function buildDemoLeaderboard(profile: import("./types").Profile) {
  const seed = [
    { displayName: "Lucía M.", weeklyXp: 420, totalXp: 5120, streak: 21, hue: 12 },
    { displayName: "Diego R.", weeklyXp: 365, totalXp: 4310, streak: 14, hue: 210 },
    { displayName: "Aitana P.", weeklyXp: 300, totalXp: 2980, streak: 9, hue: 280 },
    { displayName: "Marcos L.", weeklyXp: 245, totalXp: 2210, streak: 12, hue: 40 },
    { displayName: "Sara V.", weeklyXp: 180, totalXp: 1640, streak: 6, hue: 330 },
    { displayName: "Hugo T.", weeklyXp: 120, totalXp: 980, streak: 4, hue: 95 },
  ];
  const rows = [
    ...seed.map((s, i) => ({
      userId: `demo-${i}`,
      displayName: s.displayName,
      avatarHue: s.hue,
      weeklyXp: s.weeklyXp,
      totalXp: s.totalXp,
      streak: s.streak,
      isSelf: false,
    })),
    {
      userId: "self",
      displayName: profile.displayName || "Tú",
      avatarHue: profile.avatarHue,
      weeklyXp: profile.weeklyXp,
      totalXp: profile.totalXp,
      streak: profile.streak,
      isSelf: true,
    },
  ]
    .sort((a, b) => b.weeklyXp - a.weeklyXp || b.totalXp - a.totalXp)
    .map((r, i) => ({ ...r, rank: i + 1 }));
  return rows;
}

export function leagueWindow(): import("./types").LeagueWindow {
  const now = new Date();
  const day = now.getUTCDay() || 7;
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - day + 1));
  const end = new Date(start.getTime() + 6 * 86400000);
  const reset = new Date(start.getTime() + 7 * 86400000);
  return {
    weekKey: weekKey(now),
    weekStart: start.toISOString().slice(0, 10),
    weekEnd: end.toISOString().slice(0, 10),
    secondsLeft: Math.max(0, Math.floor((reset.getTime() - now.getTime()) / 1000)),
    memberCount: 7,
  };
}
