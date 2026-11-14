'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { User } from '@supabase/supabase-js';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { Locale, UI_DICT } from '@/lib/i18n/dictionaries';
import { TrackSlug } from '@/lib/curriculum/affiliates';
import { todayIso } from '@/lib/utils';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export interface OperatorState {
  displayName: string;
  email: string;
  avatarHue: number;
  activeTrackSlug: TrackSlug;
  experienceLevel: ExperienceLevel;
  dailyGoalMinutes: 5 | 10 | 15;
  onboardingCompleted: boolean;
  totalXp: number;
  weeklyXp: number;
  gems: number;
  hearts: number;
  maxHearts: number;
  heartsRefillAt: string | null;
  isPro: boolean;
  streakDays: number;
  longestStreak: number;
  completedLessonSlugs: string[];
  completedMissionIds: string[];
  claimedQuestKeys: string[];
  /** Spaced-repetition ledger: `lessonSlug#exerciseId` for every live mistake. */
  mistakeKeys: string[];
  /** Lessons finished with 100% first-try accuracy. */
  legendarySlugs: string[];
  lessonsCompletedCount: number;
  streakFreezes: number;
  /** ISO timestamp until XP is doubled, or null. */
  xpBoostUntil: string | null;
  activityDates: string[];
  minutesPracticed: number;
  minutesStudiedToday: number;
  leagueRank: number | null;
  showInLeague: boolean;
}

const LOCALE_KEY = 'levelup_locale_v2';
const SOUND_KEY = 'levelup_sound_v2';
const TODAY_KEY = 'levelup_today_v2';

const EMPTY_STATE: OperatorState = {
  displayName: '',
  email: '',
  avatarHue: 145,
  activeTrackSlug: 'ai-automation',
  experienceLevel: 'beginner',
  dailyGoalMinutes: 10,
  onboardingCompleted: false,
  totalXp: 0,
  weeklyXp: 0,
  gems: 0,
  hearts: 5,
  maxHearts: 5,
  heartsRefillAt: null,
  isPro: false,
  streakDays: 0,
  longestStreak: 0,
  completedLessonSlugs: [],
  completedMissionIds: [],
  claimedQuestKeys: [],
  mistakeKeys: [],
  legendarySlugs: [],
  lessonsCompletedCount: 0,
  streakFreezes: 0,
  xpBoostUntil: null,
  activityDates: [],
  minutesPracticed: 0,
  minutesStudiedToday: 0,
  leagueRank: null,
  showInLeague: true,
};

type ProfileRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  username: string | null;
  avatar_hue: number | null;
  active_track_slug: string | null;
  experience_level: string | null;
  daily_goal_minutes: number | null;
  onboarding_completed: boolean | null;
  total_xp: number | null;
  weekly_xp: number | null;
  gems: number | null;
  hearts: number | null;
  max_hearts: number | null;
  hearts_refill_at: string | null;
  is_pro: boolean | null;
  completed_lesson_slugs: string[] | null;
  completed_mission_ids: string[] | null;
  claimed_quest_slugs: string[] | null;
  activity_dates: string[] | null;
  minutes_practiced: number | null;
  mistake_keys: string[] | null;
  legendary_slugs: string[] | null;
  lessons_completed_count: number | null;
  streak_freezes: number | null;
  xp_boost_until: string | null;
};

function mapProfile(row: ProfileRow, streak: number, longest: number): OperatorState {
  const goalRaw = row.daily_goal_minutes;
  const goal: 5 | 10 | 15 = goalRaw === 5 || goalRaw === 15 ? goalRaw : 10;
  const level = row.experience_level;
  return {
    ...EMPTY_STATE,
    displayName:
      row.full_name || row.username || (row.email ? row.email.split('@')[0] : 'Operator'),
    email: row.email || '',
    avatarHue: row.avatar_hue ?? 145,
    activeTrackSlug: (row.active_track_slug as TrackSlug) || 'ai-automation',
    experienceLevel:
      level === 'intermediate' || level === 'advanced' ? level : 'beginner',
    dailyGoalMinutes: goal,
    onboardingCompleted: Boolean(row.onboarding_completed),
    totalXp: row.total_xp ?? 0,
    weeklyXp: row.weekly_xp ?? 0,
    gems: row.gems ?? 0,
    hearts: row.hearts ?? 5,
    maxHearts: row.max_hearts ?? 5,
    heartsRefillAt: row.hearts_refill_at ?? null,
    isPro: Boolean(row.is_pro),
    streakDays: streak,
    longestStreak: longest,
    completedLessonSlugs: row.completed_lesson_slugs ?? [],
    completedMissionIds: row.completed_mission_ids ?? [],
    claimedQuestKeys: row.claimed_quest_slugs ?? [],
    mistakeKeys: row.mistake_keys ?? [],
    legendarySlugs: row.legendary_slugs ?? [],
    lessonsCompletedCount:
      row.lessons_completed_count ?? (row.completed_lesson_slugs?.length ?? 0),
    streakFreezes: row.streak_freezes ?? 0,
    xpBoostUntil: row.xp_boost_until ?? null,
    activityDates: row.activity_dates ?? [],
    minutesPracticed: row.minutes_practiced ?? 0,
    showInLeague: true,
  };
}

interface LevelUpContextValue {
  status: AuthStatus;
  profileLoaded: boolean;
  locale: Locale;
  t: (typeof UI_DICT)[Locale];
  user: User | null;
  state: OperatorState;
  soundEnabled: boolean;
  setLocale: (locale: Locale) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setShowInLeague: (visible: boolean) => Promise<void>;
  setActiveTrack: (slug: TrackSlug) => Promise<void>;
  setDailyGoal: (mins: 5 | 10 | 15) => Promise<void>;
  completeOnboarding: (payload: {
    trackSlug: TrackSlug;
    experienceLevel: ExperienceLevel;
    dailyGoalMinutes: 5 | 10 | 15;
  }) => Promise<void>;
  refreshProfile: () => Promise<void>;
  awardXp: (payload: {
    source: string;
    sourceId: string;
    amount: number;
    durationMin?: number;
  }) => Promise<{
    total_xp: number;
    weekly_xp: number;
    gems_earned: number;
    gems: number;
    hearts: number;
    streak: number;
    streak_freezes: number;
    boosted: boolean;
    rank: number;
  } | null>;
  completeLesson: (payload: {
    lessonSlug: string;
    xpEarned: number;
    durationMin: number;
    /** True when no exercise was missed on the first try. */
    perfect?: boolean;
  }) => Promise<void>;
  /** Records one graded answer in the server-side mistake ledger. */
  logExerciseAttempt: (payload: {
    lessonSlug: string;
    exerciseId: string;
    correct: boolean;
  }) => Promise<void>;
  /** Spends 30 gems for `minutes` of double XP. */
  activateXpBoost: (minutes?: number) => Promise<boolean>;
  completeActionMission: (payload: { missionId: string; xpBonus: number }) => Promise<boolean>;
  claimDailyQuest: (payload: { questKey: string; xpReward: number }) => Promise<boolean>;
  consumeHeart: () => Promise<number>;
  refreshHearts: () => Promise<void>;
  refillHeartWithGems: () => Promise<boolean>;
  addMinutesToday: (mins: number) => void;
  activateSuper: (planInterval: 'month' | 'year') => Promise<void>;
  trackAffiliateClick: (toolSlug: string, source: string) => Promise<number | null>;
  signOut: () => Promise<void>;
}

const LevelUpContext = createContext<LevelUpContextValue | null>(null);

export function LevelUpProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [locale, setLocaleState] = useState<Locale>('es');
  const [soundEnabled, setSoundState] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [state, setState] = useState<OperatorState>(EMPTY_STATE);
  const minutesTodayRef = useRef(0);

  /* ---------------- device preferences (locale + sound) ---------------- */
  useEffect(() => {
    try {
      const rawLocale = localStorage.getItem(LOCALE_KEY);
      if (rawLocale === 'en' || rawLocale === 'es') setLocaleState(rawLocale);
      const rawSound = localStorage.getItem(SOUND_KEY);
      if (rawSound === '0') setSoundState(false);
      const rawToday = localStorage.getItem(TODAY_KEY);
      if (rawToday) {
        const parsed = JSON.parse(rawToday) as { date?: string; minutes?: number };
        if (parsed.date === todayIso()) {
          minutesTodayRef.current = Number(parsed.minutes) || 0;
          setState((prev) => ({
            ...prev,
            minutesStudiedToday: minutesTodayRef.current,
          }));
        }
      }
    } catch {
      /* preferences are best-effort */
    }
  }, []);

  const persistToday = useCallback((minutes: number) => {
    try {
      localStorage.setItem(TODAY_KEY, JSON.stringify({ date: todayIso(), minutes }));
    } catch {
      /* ignore */
    }
  }, []);

  /* ---------------- profile loading ---------------- */
  const loadProfile = useCallback(
    async (userId: string) => {
      const [{ data: profile }, { data: streakRow }, { data: settingsRow }] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).maybeSingle(),
        supabase.from('streaks').select('*').eq('user_id', userId).maybeSingle(),
        supabase.from('user_settings').select('privacy_level').eq('user_id', userId).maybeSingle(),
      ]);

      if (!profile) return;

      const mapped = mapProfile(
        profile as unknown as ProfileRow,
        streakRow?.current_streak ?? 0,
        streakRow?.longest_streak ?? 0
      );

      setState((prev) => ({
        ...mapped,
        minutesStudiedToday: prev.minutesStudiedToday,
        showInLeague: (settingsRow?.privacy_level ?? 'public') === 'public',
      }));
      setProfileLoaded(true);

      if (profile.language === 'en' || profile.language === 'es') {
        setLocaleState(profile.language);
        try {
          localStorage.setItem(LOCALE_KEY, profile.language);
        } catch {
          /* ignore */
        }
      }
    },
    [supabase]
  );

  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!mounted) return;
      const current = session?.user ?? null;
      setUser(current);
      if (!current) {
        setStatus('unauthenticated');
        setProfileLoaded(false);
        setState(EMPTY_STATE);
        return;
      }
      setStatus('authenticated');
      await loadProfile(current.id);
    };

    bootstrap();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      const nextUser = session?.user ?? null;
      setUser(nextUser);
      if (nextUser) {
        setStatus('authenticated');
        loadProfile(nextUser.id);
      } else {
        setStatus('unauthenticated');
        setProfileLoaded(false);
        setState(EMPTY_STATE);
      }
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [loadProfile, supabase]);

  /* ---------------- mutations ---------------- */

  const patchProfile = useCallback(
    async (patch: Record<string, unknown>) => {
      if (!user) return;
      await supabase.from('profiles').update(patch).eq('id', user.id);
    },
    [supabase, user]
  );

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      try {
        localStorage.setItem(LOCALE_KEY, next);
      } catch {
        /* ignore */
      }
      if (user) {
        supabase.from('profiles').update({ language: next }).eq('id', user.id).then(() => {});
      }
    },
    [supabase, user]
  );

  const setSoundEnabled = useCallback((enabled: boolean) => {
    setSoundState(enabled);
    try {
      localStorage.setItem(SOUND_KEY, enabled ? '1' : '0');
    } catch {
      /* ignore */
    }
  }, []);

  const setShowInLeague = useCallback(
    async (visible: boolean) => {
      if (!user) return;
      setState((prev) => ({ ...prev, showInLeague: visible }));
      await supabase
        .from('user_settings')
        .update({ privacy_level: visible ? 'public' : 'private' })
        .eq('user_id', user.id);
    },
    [supabase, user]
  );

  const setActiveTrack = useCallback(
    async (slug: TrackSlug) => {
      setState((prev) => ({ ...prev, activeTrackSlug: slug }));
      await patchProfile({ active_track_slug: slug });
    },
    [patchProfile]
  );

  const setDailyGoal = useCallback(
    async (mins: 5 | 10 | 15) => {
      setState((prev) => ({ ...prev, dailyGoalMinutes: mins }));
      await patchProfile({ daily_goal_minutes: mins });
    },
    [patchProfile]
  );

  const completeOnboarding = useCallback(
    async (payload: {
      trackSlug: TrackSlug;
      experienceLevel: ExperienceLevel;
      dailyGoalMinutes: 5 | 10 | 15;
    }) => {
      setState((prev) => ({
        ...prev,
        activeTrackSlug: payload.trackSlug,
        experienceLevel: payload.experienceLevel,
        dailyGoalMinutes: payload.dailyGoalMinutes,
        onboardingCompleted: true,
      }));
      await patchProfile({
        active_track_slug: payload.trackSlug,
        experience_level: payload.experienceLevel,
        daily_goal_minutes: payload.dailyGoalMinutes,
        onboarding_completed: true,
        onboarding_step: 3,
      });
    },
    [patchProfile]
  );

  const refreshProfile = useCallback(async () => {
    if (!user) return;
    await loadProfile(user.id);
  }, [loadProfile, user]);

  /** Single source of truth for XP: the server-side `award_xp` RPC. */
  const awardXp = useCallback<LevelUpContextValue['awardXp']>(
    async ({ source, sourceId, amount, durationMin = 0 }) => {
      if (!user) return null;
      const { data, error } = await supabase.rpc('award_xp', {
        p_source: source,
        p_source_id: sourceId,
        p_amount: amount,
        p_duration_min: durationMin,
      });
      if (error || !data) return null;

      const result = data as {
        total_xp: number;
        weekly_xp: number;
        gems_earned: number;
        gems: number;
        hearts: number;
        streak: number;
        longest_streak: number;
        streak_freezes: number;
        boosted: boolean;
        xp_boost_until: string | null;
        rank: number;
      };

      setState((prev) => ({
        ...prev,
        totalXp: result.total_xp,
        weeklyXp: result.weekly_xp,
        gems: result.gems,
        hearts: result.hearts,
        streakDays: result.streak,
        longestStreak: Math.max(prev.longestStreak, result.longest_streak ?? result.streak),
        streakFreezes: result.streak_freezes ?? prev.streakFreezes,
        xpBoostUntil: result.xp_boost_until ?? null,
        leagueRank: result.rank,
        activityDates: Array.from(new Set([...prev.activityDates, todayIso()])),
        minutesPracticed: prev.minutesPracticed + durationMin,
        minutesStudiedToday: prev.minutesStudiedToday + durationMin,
      }));
      if (durationMin > 0) {
        minutesTodayRef.current += durationMin;
        persistToday(minutesTodayRef.current);
      }
      return result;
    },
    [persistToday, supabase, user]
  );

  /**
   * Completion is written by `record_lesson_completion` (SECURITY DEFINER), not
   * by a client-side column update: the slug ledger, the counter and the
   * legendary bonus are all decided server-side.
   */
  const completeLesson = useCallback(
    async ({
      lessonSlug,
      xpEarned,
      durationMin,
      perfect = false,
    }: {
      lessonSlug: string;
      xpEarned: number;
      durationMin: number;
      perfect?: boolean;
    }) => {
      if (!user) return;
      const { data } = await supabase.rpc('record_lesson_completion', {
        p_lesson_slug: lessonSlug,
        p_perfect: perfect,
      });

      const recorded = data as {
        completed_lesson_slugs: string[];
        lessons_completed_count: number;
        legendary_slugs: string[];
        gems: number;
        new_legendary: boolean;
      } | null;

      setState((prev) => ({
        ...prev,
        completedLessonSlugs: Array.from(
          new Set([...prev.completedLessonSlugs, ...(recorded?.completed_lesson_slugs ?? [lessonSlug])])
        ),
        lessonsCompletedCount:
          recorded?.lessons_completed_count ?? prev.completedLessonSlugs.length + 1,
        legendarySlugs: recorded?.legendary_slugs ?? prev.legendarySlugs,
        gems: recorded?.gems ?? prev.gems,
      }));

      await awardXp({
        source: 'lesson',
        sourceId: lessonSlug,
        amount: xpEarned,
        durationMin,
      });
    },
    [awardXp, supabase, user]
  );

  const logExerciseAttempt = useCallback<LevelUpContextValue['logExerciseAttempt']>(
    async ({ lessonSlug, exerciseId, correct }) => {
      if (!user) return;
      const { data } = await supabase.rpc('log_exercise_attempt', {
        p_lesson_slug: lessonSlug,
        p_exercise_id: exerciseId,
        p_correct: correct,
      });
      const result = data as { mistake_keys: string[] } | null;
      if (!result) return;
      setState((prev) => ({ ...prev, mistakeKeys: result.mistake_keys ?? prev.mistakeKeys }));
    },
    [supabase, user]
  );

  const activateXpBoost = useCallback<LevelUpContextValue['activateXpBoost']>(
    async (minutes = 15) => {
      if (!user) return false;
      const { data, error } = await supabase.rpc('activate_xp_boost', { p_minutes: minutes });
      if (error || !data) return false;
      const result = data as { gems: number; xp_boost_until: string };
      setState((prev) => ({ ...prev, gems: result.gems, xpBoostUntil: result.xp_boost_until }));
      return true;
    },
    [supabase, user]
  );

  const completeActionMission = useCallback(
    async ({ missionId, xpBonus }: { missionId: string; xpBonus: number }) => {
      if (!user) return false;
      if (state.completedMissionIds.includes(missionId)) return false;
      const nextIds = [...state.completedMissionIds, missionId];
      setState((prev) => ({ ...prev, completedMissionIds: nextIds }));
      await patchProfile({ completed_mission_ids: nextIds });
      await awardXp({ source: 'mission', sourceId: missionId, amount: xpBonus });
      return true;
    },
    [awardXp, patchProfile, state.completedMissionIds, user]
  );

  const claimDailyQuest = useCallback(
    async ({ questKey, xpReward }: { questKey: string; xpReward: number }) => {
      if (!user) return false;
      const fullKey = `${todayIso()}:${questKey}`;
      if (state.claimedQuestKeys.includes(fullKey)) return false;
      const nextKeys = [...state.claimedQuestKeys, fullKey];
      setState((prev) => ({ ...prev, claimedQuestKeys: nextKeys }));
      await patchProfile({ claimed_quest_slugs: nextKeys });
      await awardXp({ source: 'quest', sourceId: questKey, amount: xpReward });
      return true;
    },
    [awardXp, patchProfile, state.claimedQuestKeys, user]
  );

  const consumeHeart = useCallback(async () => {
    if (!user) return 0;
    if (state.isPro) return state.hearts;
    const { data, error } = await supabase.rpc('consume_heart');
    if (error || typeof data !== 'number') {
      const fallback = Math.max(0, state.hearts - 1);
      setState((prev) => ({ ...prev, hearts: fallback }));
      return fallback;
    }
    setState((prev) => ({ ...prev, hearts: data }));
    return data;
  }, [state.hearts, state.isPro, supabase, user]);

  const refreshHearts = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase.rpc('refresh_hearts');
    if (error || !data) return;
    const rows = Array.isArray(data) ? data : [data];
    const first = rows[0] as { hearts: number; hearts_refill_at: string } | undefined;
    if (!first) return;
    setState((prev) => ({
      ...prev,
      hearts: first.hearts,
      heartsRefillAt: first.hearts_refill_at,
    }));
  }, [supabase, user]);

  const refillHeartWithGems = useCallback(async () => {
    if (!user) return false;
    if (state.gems < 20 || state.hearts >= state.maxHearts) return false;
    const nextGems = state.gems - 20;
    const nextHearts = Math.min(state.maxHearts, state.hearts + 1);
    setState((prev) => ({ ...prev, gems: nextGems, hearts: nextHearts }));
    await patchProfile({ gems: nextGems, hearts: nextHearts });
    return true;
  }, [patchProfile, state.gems, state.hearts, state.maxHearts, user]);

  const addMinutesToday = useCallback(
    (mins: number) => {
      minutesTodayRef.current += mins;
      persistToday(minutesTodayRef.current);
      setState((prev) => ({ ...prev, minutesStudiedToday: minutesTodayRef.current }));
    },
    [persistToday]
  );

  const activateSuper = useCallback(
    async (planInterval: 'month' | 'year') => {
      if (!user) return;
      setState((prev) => ({ ...prev, isPro: true, hearts: prev.maxHearts }));
      await patchProfile({ is_pro: true, hearts: state.maxHearts });
      await supabase
        .from('subscriptions')
        .update({
          status: 'trialing',
          plan: planInterval === 'year' ? 'premium_yearly' : 'premium_monthly',
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(Date.now() + 7 * 86400000).toISOString(),
        })
        .eq('user_id', user.id);
    },
    [patchProfile, state.maxHearts, supabase, user]
  );

  const trackAffiliateClick = useCallback(
    async (toolSlug: string, source: string): Promise<number | null> => {
      try {
        const { data, error } = await supabase.rpc('record_affiliate_click', {
          p_tool_slug: toolSlug,
          p_source: source,
          p_locale: locale,
        });
        if (!error && typeof data === 'number') return data;
        const res = await fetch('/api/affiliate/click', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ toolSlug, source, locale }),
        });
        if (!res.ok) return null;
        const json = (await res.json()) as { count?: number | null };
        return json.count ?? null;
      } catch {
        return null;
      }
    },
    [locale, supabase]
  );

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setStatus('unauthenticated');
    setState(EMPTY_STATE);
  }, [supabase]);

  /* Heart timer: refresh once the refill window has passed */
  useEffect(() => {
    if (status !== 'authenticated' || state.isPro) return;
    const id = window.setInterval(() => {
      refreshHearts();
    }, 60000);
    return () => window.clearInterval(id);
  }, [refreshHearts, state.isPro, status]);

  const value = useMemo<LevelUpContextValue>(
    () => ({
      status,
      profileLoaded,
      locale,
      t: UI_DICT[locale],
      user,
      state,
      soundEnabled,
      setLocale,
      setSoundEnabled,
      setShowInLeague,
      setActiveTrack,
      setDailyGoal,
      completeOnboarding,
      refreshProfile,
      awardXp,
      completeLesson,
      logExerciseAttempt,
      activateXpBoost,
      completeActionMission,
      claimDailyQuest,
      consumeHeart,
      refreshHearts,
      refillHeartWithGems,
      addMinutesToday,
      activateSuper,
      trackAffiliateClick,
      signOut,
    }),
    [
      status,
      profileLoaded,
      locale,
      user,
      state,
      soundEnabled,
      setLocale,
      setSoundEnabled,
      setShowInLeague,
      setActiveTrack,
      setDailyGoal,
      completeOnboarding,
      refreshProfile,
      awardXp,
      completeLesson,
      completeActionMission,
      claimDailyQuest,
      consumeHeart,
      refreshHearts,
      refillHeartWithGems,
      addMinutesToday,
      activateSuper,
      trackAffiliateClick,
      signOut,
    ]
  );

  return <LevelUpContext.Provider value={value}>{children}</LevelUpContext.Provider>;
}

export function useLevelUp() {
  const ctx = useContext(LevelUpContext);
  if (!ctx) throw new Error('useLevelUp must be used inside LevelUpProvider');
  return ctx;
}
