"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getSupabase } from "./supabase/client";
import { DEMO_MODE } from "./runtime";
import { emptyProfile, awardXpLocal, completeLessonLocal } from "./progress";
import type { Profile } from "./types";

type AuthState = {
  loading: boolean;
  userId: string | null;
  profile: Profile;
  mode: "supabase" | "demo";
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
  setProfile: (p: Profile) => void;
};

const Ctx = createContext<AuthState | null>(null);
const DEMO_KEY = "levelup.demo.profile.v1";

const demoEnabled = DEMO_MODE;

function loadDemo(): Profile {
  if (typeof window === "undefined") return emptyProfile();
  try {
    const raw = window.localStorage.getItem(DEMO_KEY);
    if (!raw) return emptyProfile();
    return { ...emptyProfile(), ...(JSON.parse(raw) as Profile) };
  } catch {
    return emptyProfile();
  }
}

function saveDemo(p: Profile) {
  if (typeof window !== "undefined") window.localStorage.setItem(DEMO_KEY, JSON.stringify(p));
}

/** Mapea la fila de public.profiles al tipo de la app. */
function mapProfile(row: Record<string, unknown>, streak = 0): Profile {
  const base = emptyProfile();
  return {
    ...base,
    id: (row.id as string) ?? null,
    displayName:
      (row.full_name as string) || (row.username as string) || (row.email as string)?.split("@")[0] || "Operador",
    email: (row.email as string) ?? null,
    avatarHue: (row.avatar_hue as number) ?? 145,
    totalXp: (row.total_xp as number) ?? 0,
    weeklyXp: (row.weekly_xp as number) ?? 0,
    gems: (row.gems as number) ?? 0,
    hearts: (row.hearts as number) ?? 5,
    maxHearts: (row.max_hearts as number) ?? 5,
    heartsRefillAt: (row.hearts_refill_at as string) ?? null,
    streak,
    longestStreak: streak,
    streakFreezes: (row.streak_freezes as number) ?? 0,
    completedLessonSlugs: (row.completed_lesson_slugs as string[]) ?? [],
    legendarySlugs: (row.legendary_slugs as string[]) ?? [],
    mistakeKeys: (row.mistake_keys as string[]) ?? [],
    activityDates: (row.activity_dates as string[]) ?? [],
    dailyGoalMinutes: (row.daily_goal_minutes as number) ?? 10,
    minutesPracticed: (row.minutes_practiced as number) ?? 0,
    isPro: (row.is_pro as boolean) ?? false,
    activeTrackSlug: (row.active_track_slug as string) ?? null,
    xpBoostUntil: (row.xp_boost_until as string) ?? null,
    onboardingCompleted: (row.onboarding_completed as boolean) ?? false,
    weekKeyStored: (row.week_key as string) ?? "",
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfileState] = useState<Profile>(() => (demoEnabled ? loadDemo() : emptyProfile()));

  const setProfile = useCallback((p: Profile) => {
    setProfileState(p);
    if (demoEnabled) saveDemo(p);
  }, []);

  const loadRemote = useCallback(async (uid: string) => {
    const supabase = getSupabase();
    if (!supabase) return;
    const [{ data: row }, { data: streakRow }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", uid).maybeSingle(),
      supabase.from("streaks").select("current_streak,longest_streak").eq("user_id", uid).maybeSingle(),
    ]);
    if (row) setProfile(mapProfile(row as Record<string, unknown>, streakRow?.current_streak ?? 0));
  }, [setProfile]);

  const refresh = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      setUserId(data.user.id);
      await loadRemote(data.user.id);
    }
  }, [loadRemote]);

  useEffect(() => {
    if (demoEnabled) {
      setLoading(false);
      return;
    }
    const supabase = getSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }
    let alive = true;
    supabase.auth.getUser().then(async ({ data }: { data: { user: { id: string } | null } }) => {
      if (!alive) return;
      if (data.user) {
        setUserId(data.user.id);
        await loadRemote(data.user.id);
      }
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event: string, session: { user: { id: string } | null } | null) => {
      if (!session?.user) {
        setUserId(null);
        setProfileState(emptyProfile());
        return;
      }
      setUserId(session.user.id);
      void loadRemote(session.user.id);
    });
    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, [loadRemote]);

  const signIn = useCallback(async (email: string, password: string) => {
    const supabase = getSupabase();
    if (!supabase) throw new Error("Supabase no está configurado.");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
  }, []);

  const signUp = useCallback(async (email: string, password: string, name: string) => {
    const supabase = getSupabase();
    if (!supabase) throw new Error("Supabase no está configurado.");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name, language: "es" } },
    });
    if (error) throw new Error(error.message);
  }, []);

  const signOut = useCallback(async () => {
    const supabase = getSupabase();
    if (supabase) await supabase.auth.signOut();
    setUserId(null);
    setProfileState(emptyProfile());
    if (demoEnabled && typeof window !== "undefined") window.localStorage.removeItem(DEMO_KEY);
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      loading,
      userId,
      profile,
      mode: demoEnabled ? "demo" : "supabase",
      signIn,
      signUp,
      signOut,
      refresh,
      setProfile,
    }),
    [loading, userId, profile, signIn, signUp, signOut, refresh, setProfile],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}

export { awardXpLocal, completeLessonLocal };
