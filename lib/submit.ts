import { getSupabase } from "./supabase/client";
import { awardXpLocal, completeLessonLocal } from "./progress";
import { addToDailyLog } from "./daily-log";
import type { Profile, LessonResult } from "./types";

type Args = {
  profile: Profile;
  mode: "supabase" | "demo";
  lessonId: string;
  courseSlug: string;
  unitId: string;
  xp: number;
  minutes: number;
  score: number;
  total: number;
  perfect: boolean;
  mistakes: string[]; // claves "lessonId#exerciseId" falladas
};

/** Persiste el resultado de una lección y devuelve el perfil actualizado. */
export async function submitLesson(args: Args): Promise<{ result: LessonResult; profile: Profile }> {
  const { profile, mode, lessonId, xp, minutes, score, total, perfect, mistakes } = args;

  if (mode === "demo" || !getSupabase()) {
    const completed = completeLessonLocal(profile, lessonId, perfect);
    const earned = xp + (perfect ? 10 : 0);
    const { profile: afterXp, awarded } = awardXpLocal(completed.profile, earned, minutes);

    const mistakeSet = new Set(afterXp.mistakeKeys);
    for (const m of mistakes) mistakeSet.add(m);
    for (const ex of profile.completedLessonSlugs) void ex;
    const nextProfile: Profile = { ...afterXp, mistakeKeys: [...mistakeSet].slice(-60) };

    addToDailyLog({ lessons: 1, xp: awarded.appliedAmount, exercises: score });

    return {
      profile: nextProfile,
      result: {
        lessonId,
        score,
        total,
        perfect,
        xp: awarded.appliedAmount,
        mode: "demo",
        awarded,
      },
    };
  }

  const supabase = getSupabase()!;

  // 1) XP (RPC atómica en servidor: racha, gemas, boost y ranking)
  const { data: xpData, error: xpError } = await supabase.rpc("award_xp", {
    p_source: "lesson",
    p_source_id: lessonId,
    p_amount: xp + (perfect ? 10 : 0),
    p_duration_min: minutes,
  });
  if (xpError) throw new Error(`award_xp: ${xpError.message}`);

  // 2) Progreso de la lección (array de slugs + legendaria si fue perfecta)
  const { data: doneData, error: doneError } = await supabase.rpc("record_lesson_completion", {
    p_lesson_slug: lessonId,
    p_perfect: perfect,
  });
  if (doneError) throw new Error(`record_lesson_completion: ${doneError.message}`);

  // 3) Registro de errores para repaso espaciado
  await Promise.all(
    mistakes.map((key) => {
      const [slug, exerciseId] = key.split("#");
      return supabase.rpc("log_exercise_attempt", {
        p_lesson_slug: slug,
        p_exercise_id: exerciseId,
        p_correct: false,
      });
    }),
  );

  const awarded = (xpData ?? {}) as Record<string, unknown>;
  const done = (doneData ?? {}) as Record<string, unknown>;

  const nextProfile: Profile = {
    ...profile,
    totalXp: Number(awarded.total_xp ?? profile.totalXp),
    weeklyXp: Number(awarded.weekly_xp ?? profile.weeklyXp),
    gems: Number(done.gems ?? awarded.gems ?? profile.gems),
    hearts: Number(awarded.hearts ?? profile.hearts),
    streak: Number(awarded.streak ?? profile.streak),
    longestStreak: Number(awarded.longest_streak ?? profile.longestStreak),
    streakFreezes: Number(awarded.streak_freezes ?? profile.streakFreezes),
    completedLessonSlugs: (done.completed_lesson_slugs as string[]) ?? profile.completedLessonSlugs,
    legendarySlugs: (done.legendary_slugs as string[]) ?? profile.legendarySlugs,
  };

  addToDailyLog({ lessons: 1, xp: Number(awarded.applied_amount ?? xp), exercises: score });

  return {
    profile: nextProfile,
    result: {
      lessonId,
      score,
      total,
      perfect,
      xp: Number(awarded.applied_amount ?? xp),
      mode: "supabase",
      awarded: {
        totalXp: Number(awarded.total_xp ?? 0),
        weeklyXp: Number(awarded.weekly_xp ?? 0),
        gems: Number(awarded.gems_earned ?? 0),
        streak: Number(awarded.streak ?? 0),
        longestStreak: Number(awarded.longest_streak ?? 0),
        streakFreezes: Number(awarded.streak_freezes ?? 0),
        freezeEarned: Boolean(awarded.freeze_earned),
        boosted: Boolean(awarded.boosted),
        appliedAmount: Number(awarded.applied_amount ?? 0),
        rank: Number(awarded.rank ?? 0),
      },
    },
  };
}

export async function consumeHeartRemote(): Promise<number | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase.rpc("consume_heart");
  if (error) return null;
  return typeof data === "number" ? data : null;
}

export async function refillHeartsRemote(): Promise<{ hearts: number } | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase.rpc("refresh_hearts");
  if (error) return null;
  const row = Array.isArray(data) ? data[0] : data;
  return row ? { hearts: Number(row.hearts) } : null;
}
