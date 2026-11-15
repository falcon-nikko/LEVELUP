export type AchievementDef = {
  slug: string;
  name: string;
  description: string;
  emoji: string;
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond";
  xpReward: number;
};

/** Reflejo de las filas de public.achievements, con un emoji para la UI. */
export const achievements: AchievementDef[] = [
  { slug: "first_lesson", name: "Primer paso", description: "Completa tu primera lección", emoji: "🚀", tier: "bronze", xpReward: 25 },
  { slug: "lessons_10", name: "Estudiante dedicado", description: "10 lecciones completadas", emoji: "📚", tier: "bronze", xpReward: 50 },
  { slug: "lessons_50", name: "Devorador", description: "50 lecciones completadas", emoji: "🧠", tier: "silver", xpReward: 100 },
  { slug: "lessons_100", name: "Centurión", description: "100 lecciones completadas", emoji: "🏛️", tier: "gold", xpReward: 250 },
  { slug: "first_unit", name: "Unidad completada", description: "Termina una unidad entera", emoji: "✅", tier: "bronze", xpReward: 50 },
  { slug: "first_course", name: "Graduado", description: "Termina un curso entero", emoji: "🎓", tier: "silver", xpReward: 200 },
  { slug: "xp_100", name: "Primeros 100 XP", description: "Acumula 100 XP", emoji: "⚡", tier: "bronze", xpReward: 25 },
  { slug: "xp_1000", name: "Mil XP", description: "Acumula 1.000 XP", emoji: "🌟", tier: "silver", xpReward: 100 },
  { slug: "xp_10000", name: "Diez mil", description: "Acumula 10.000 XP", emoji: "💫", tier: "gold", xpReward: 500 },
  { slug: "streak_3", name: "Constancia", description: "3 días seguidos", emoji: "🔥", tier: "bronze", xpReward: 50 },
  { slug: "streak_7", name: "Semana perfecta", description: "7 días seguidos", emoji: "📅", tier: "silver", xpReward: 100 },
  { slug: "streak_30", name: "Mes imparable", description: "30 días seguidos", emoji: "🏆", tier: "gold", xpReward: 500 },
  { slug: "perfect_5", name: "Perfeccionista", description: "5 lecciones legendarias", emoji: "💎", tier: "silver", xpReward: 100 },
  { slug: "explorer_2", name: "Explorador", description: "Estudia en 2 mundos", emoji: "🧭", tier: "bronze", xpReward: 50 },
  { slug: "explorer_4", name: "Ciudadano del mundo", description: "Estudia en los 4 mundos", emoji: "🌍", tier: "gold", xpReward: 200 },
  { slug: "night_owl", name: "Búho nocturno", description: "Estudia después de medianoche", emoji: "🦉", tier: "bronze", xpReward: 50 },
  { slug: "early_bird", name: "Madrugador", description: "Estudia antes de las 7", emoji: "🌅", tier: "bronze", xpReward: 50 },
  { slug: "first_boss", name: "Jefe derrotado", description: "Supera un examen de unidad", emoji: "⚔️", tier: "gold", xpReward: 200 },
];

export function tierColor(tier: string) {
  return (
    {
      bronze: "text-amber-600",
      silver: "text-slate-300",
      gold: "text-amber-300",
      platinum: "text-cyan-200",
      diamond: "text-sky-300",
    }[tier] ?? "text-white/40"
  );
}
