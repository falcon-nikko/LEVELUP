export type Profile = {
  id: string | null;
  displayName: string;
  email: string | null;
  avatarHue: number;
  totalXp: number;
  weeklyXp: number;
  gems: number;
  hearts: number;
  maxHearts: number;
  heartsRefillAt: string | null;
  streak: number;
  longestStreak: number;
  streakFreezes: number;
  completedLessonSlugs: string[];
  legendarySlugs: string[];
  mistakeKeys: string[];
  activityDates: string[];
  dailyGoalMinutes: number;
  minutesPracticed: number;
  isPro: boolean;
  activeTrackSlug: string | null;
  xpBoostUntil: string | null;
  onboardingCompleted: boolean;
  /** Semana ISO del weeklyXp (espejo de profiles.week_key). */
  weekKeyStored: string;
};

export type LessonResult = {
  lessonId: string;
  score: number;
  total: number;
  perfect: boolean;
  xp: number;
  mode: "supabase" | "demo";
  awarded: {
    totalXp: number;
    weeklyXp: number;
    gems: number;
    streak: number;
    longestStreak: number;
    streakFreezes: number;
    freezeEarned: boolean;
    boosted: boolean;
    appliedAmount: number;
    rank: number;
  } | null;
};

export type QuestWithProgress = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  type: string;
  target: number;
  xpReward: number;
  progress: number;
  completed: boolean;
};

export type LeaderboardEntry = {
  userId: string;
  displayName: string;
  avatarHue: number;
  weeklyXp: number;
  totalXp: number;
  streak: number;
  isSelf: boolean;
  rank: number;
};

export type LeagueWindow = {
  weekKey: string;
  weekStart: string;
  weekEnd: string;
  secondsLeft: number;
  memberCount: number;
};

export type AchievementRow = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  tier: string;
  xpReward: number;
};

export type AffiliateTool = {
  slug: string;
  name: string;
  trackSlug: string;
  url: string | null;
  commissionNote: string | null;
};
