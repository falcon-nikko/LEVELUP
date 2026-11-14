-- ==========================================================================
-- LEVELUP · Migration 004 — v5 progression systems
--
-- Adds the four systems the v5 lesson player needs, all enforced server-side
-- so the browser cannot inflate anything:
--
--   1. mistake_keys      spaced-repetition ledger fed by every graded answer
--   2. xp_boost_until    temporary x2 multiplier, bought with gems
--   3. streak_freezes    one missed day absorbed without losing the streak
--   4. legendary_slugs   lessons finished with 100% first-try accuracy
--
-- `award_xp` is replaced with a boost-aware, freeze-aware version. The public
-- return shape keeps every key the app already reads and adds new ones.
-- ==========================================================================

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS mistake_keys text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS xp_boost_until timestamptz,
  ADD COLUMN IF NOT EXISTS streak_freezes integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS legendary_slugs text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS lessons_completed_count integer NOT NULL DEFAULT 0;

-- Backfill the counter from the existing slug ledger.
UPDATE public.profiles
   SET lessons_completed_count = COALESCE(array_length(completed_lesson_slugs, 1), 0)
 WHERE lessons_completed_count = 0
   AND COALESCE(array_length(completed_lesson_slugs, 1), 0) > 0;

-- ==========================================================================
-- award_xp (v2) — boost aware, streak-freeze aware
-- ==========================================================================
CREATE OR REPLACE FUNCTION public.award_xp(
  p_source text,
  p_source_id text,
  p_amount integer,
  p_duration_min integer DEFAULT 0
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_profile public.profiles%ROWTYPE;
  v_week text := public.current_week_key();
  v_today date := CURRENT_DATE;
  v_streak integer := 0;
  v_longest integer := 0;
  v_last date;
  v_gems integer;
  v_applied integer;
  v_boosted boolean := false;
  v_freeze_used boolean := false;
  v_freeze_earned boolean := false;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'auth_required';
  END IF;

  IF COALESCE(p_amount, 0) < 0 THEN
    RAISE EXCEPTION 'invalid_amount';
  END IF;

  SELECT * INTO v_profile FROM public.profiles WHERE id = v_uid FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'profile_missing';
  END IF;

  -- A gem-bought boost doubles the XP that actually lands in the ledger.
  IF v_profile.xp_boost_until IS NOT NULL AND v_profile.xp_boost_until > now() THEN
    v_boosted := true;
    v_applied := p_amount * 2;
  ELSE
    v_applied := p_amount;
  END IF;

  -- Roll the weekly counter over when a new ISO week begins.
  IF v_profile.week_key <> v_week THEN
    v_profile.weekly_xp := 0;
    v_profile.week_key := v_week;
  END IF;

  v_profile.weekly_xp := v_profile.weekly_xp + v_applied;
  v_profile.total_xp := v_profile.total_xp + v_applied;
  v_gems := (v_applied / 10);
  v_profile.gems := v_profile.gems + v_gems;
  v_profile.minutes_practiced := v_profile.minutes_practiced + COALESCE(p_duration_min, 0);

  IF NOT (v_today = ANY (v_profile.activity_dates)) THEN
    v_profile.activity_dates := array_append(v_profile.activity_dates, v_today);
  END IF;

  -- ---------------------------------------------------------------- streak --
  SELECT current_streak, longest_streak, last_activity_date
    INTO v_streak, v_longest, v_last
    FROM public.streaks
   WHERE user_id = v_uid
   FOR UPDATE;

  IF NOT FOUND THEN
    INSERT INTO public.streaks (user_id, current_streak, longest_streak, last_activity_date)
    VALUES (v_uid, 1, 1, v_today)
    RETURNING current_streak, longest_streak INTO v_streak, v_longest;
  ELSE
    IF v_last = v_today - 1 THEN
      v_streak := v_streak + 1;
    ELSIF v_last = v_today - 2 AND COALESCE(v_profile.streak_freezes, 0) > 0 THEN
      -- One missed day absorbed by a freeze: the streak continues unbroken.
      v_streak := v_streak + 1;
      v_freeze_used := true;
      v_profile.streak_freezes := v_profile.streak_freezes - 1;
    ELSIF v_last IS DISTINCT FROM v_today THEN
      v_streak := 1;
    END IF;

    v_longest := GREATEST(COALESCE(v_longest, 0), v_streak);

    -- Every full week of streak earns one freeze, capped at 2 held.
    IF v_streak > 0 AND v_streak % 7 = 0 AND COALESCE(v_profile.streak_freezes, 0) < 2 THEN
      v_profile.streak_freezes := COALESCE(v_profile.streak_freezes, 0) + 1;
      v_freeze_earned := true;
    END IF;

    UPDATE public.streaks
       SET current_streak = v_streak,
           longest_streak = v_longest,
           last_activity_date = v_today
     WHERE user_id = v_uid;
  END IF;

  UPDATE public.profiles
     SET weekly_xp = v_profile.weekly_xp,
         week_key = v_profile.week_key,
         total_xp = v_profile.total_xp,
         gems = v_profile.gems,
         minutes_practiced = v_profile.minutes_practiced,
         activity_dates = v_profile.activity_dates,
         streak_freezes = v_profile.streak_freezes,
         last_active_at = now()
   WHERE id = v_uid;

  -- Ledger entry: the single source of truth for the weekly league.
  INSERT INTO public.xp_transactions (user_id, source, source_id, amount, balance_after, metadata)
  VALUES (
    v_uid,
    COALESCE(p_source, 'lesson'),
    COALESCE(p_source_id, ''),
    v_applied,
    v_profile.total_xp,
    jsonb_build_object(
      'week_key', v_week,
      'gems', v_gems,
      'base_amount', p_amount,
      'boosted', v_boosted
    )
  );

  RETURN jsonb_build_object(
    'total_xp', v_profile.total_xp,
    'weekly_xp', v_profile.weekly_xp,
    'gems_earned', v_gems,
    'gems', v_profile.gems,
    'hearts', v_profile.hearts,
    'streak', v_streak,
    'longest_streak', v_longest,
    'streak_freezes', v_profile.streak_freezes,
    'freeze_used', v_freeze_used,
    'freeze_earned', v_freeze_earned,
    'boosted', v_boosted,
    'applied_amount', v_applied,
    'xp_boost_until', v_profile.xp_boost_until,
    'rank', (
      SELECT COUNT(*) + 1
        FROM public.profiles p
       WHERE p.week_key = v_week
         AND p.weekly_xp > v_profile.weekly_xp
    )
  );
END;
$$;

-- ==========================================================================
-- log_exercise_attempt — feeds the spaced-repetition ledger
-- ==========================================================================
CREATE OR REPLACE FUNCTION public.log_exercise_attempt(
  p_lesson_slug text,
  p_exercise_id text,
  p_correct boolean
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_key text;
  v_keys text[];
  v_added boolean := false;
  v_removed boolean := false;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'auth_required';
  END IF;

  IF COALESCE(p_lesson_slug, '') = '' OR COALESCE(p_exercise_id, '') = '' THEN
    RAISE EXCEPTION 'invalid_key';
  END IF;

  v_key := p_lesson_slug || '#' || p_exercise_id;

  SELECT COALESCE(mistake_keys, '{}') INTO v_keys
    FROM public.profiles
   WHERE id = v_uid
   FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'profile_missing';
  END IF;

  IF COALESCE(p_correct, false) THEN
    IF v_key = ANY (v_keys) THEN
      v_keys := array_remove(v_keys, v_key);
      v_removed := true;
    END IF;
  ELSIF NOT (v_key = ANY (v_keys)) THEN
    v_keys := array_append(v_keys, v_key);
    v_added := true;
  END IF;

  -- Hard cap: the ledger holds the 60 most recent mistakes, never more.
  IF COALESCE(array_length(v_keys, 1), 0) > 60 THEN
    v_keys := v_keys[(array_length(v_keys, 1) - 59):array_length(v_keys, 1)];
  END IF;

  UPDATE public.profiles SET mistake_keys = v_keys WHERE id = v_uid;

  RETURN jsonb_build_object(
    'mistake_keys', v_keys,
    'count', COALESCE(array_length(v_keys, 1), 0),
    'added', v_added,
    'removed', v_removed
  );
END;
$$;

-- ==========================================================================
-- activate_xp_boost — 30 gems for 15 minutes of double XP
-- ==========================================================================
CREATE OR REPLACE FUNCTION public.activate_xp_boost(p_minutes integer DEFAULT 15)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_cost integer := 30;
  v_mins integer := COALESCE(p_minutes, 15);
  v_gems integer;
  v_until timestamptz;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'auth_required';
  END IF;

  IF v_mins < 5 OR v_mins > 60 THEN
    RAISE EXCEPTION 'invalid_duration';
  END IF;

  SELECT gems INTO v_gems FROM public.profiles WHERE id = v_uid FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'profile_missing';
  END IF;

  IF COALESCE(v_gems, 0) < v_cost THEN
    RAISE EXCEPTION 'insufficient_gems';
  END IF;

  UPDATE public.profiles
     SET gems = gems - v_cost,
         -- Stacking a boost extends the current one instead of wasting it.
         xp_boost_until = GREATEST(COALESCE(xp_boost_until, now()), now())
                          + make_interval(mins => v_mins)
   WHERE id = v_uid
   RETURNING gems, xp_boost_until INTO v_gems, v_until;

  RETURN jsonb_build_object(
    'gems', v_gems,
    'cost', v_cost,
    'minutes', v_mins,
    'xp_boost_until', v_until
  );
END;
$$;

-- ==========================================================================
-- record_lesson_completion — server-side completion ledger + counter
-- ==========================================================================
CREATE OR REPLACE FUNCTION public.record_lesson_completion(
  p_lesson_slug text,
  p_perfect boolean DEFAULT false
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_slugs text[];
  v_legendary text[];
  v_count integer;
  v_gems integer := 0;
  v_first boolean := false;
  v_new_legendary boolean := false;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'auth_required';
  END IF;

  IF COALESCE(p_lesson_slug, '') = '' THEN
    RAISE EXCEPTION 'invalid_slug';
  END IF;

  SELECT COALESCE(completed_lesson_slugs, '{}'),
         COALESCE(legendary_slugs, '{}'),
         gems
    INTO v_slugs, v_legendary, v_gems
    FROM public.profiles
   WHERE id = v_uid
   FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'profile_missing';
  END IF;

  IF NOT (p_lesson_slug = ANY (v_slugs)) THEN
    v_slugs := array_append(v_slugs, p_lesson_slug);
    v_first := true;
  END IF;

  -- A perfect run (no first-try misses) is recorded once and pays 20 gems once.
  IF COALESCE(p_perfect, false) AND NOT (p_lesson_slug = ANY (v_legendary)) THEN
    v_legendary := array_append(v_legendary, p_lesson_slug);
    v_gems := COALESCE(v_gems, 0) + 20;
    v_new_legendary := true;
  END IF;

  v_count := COALESCE(array_length(v_slugs, 1), 0);

  UPDATE public.profiles
     SET completed_lesson_slugs = v_slugs,
         legendary_slugs = v_legendary,
         lessons_completed_count = v_count,
         gems = v_gems
   WHERE id = v_uid;

  RETURN jsonb_build_object(
    'completed_lesson_slugs', v_slugs,
    'lessons_completed_count', v_count,
    'legendary_slugs', v_legendary,
    'gems', v_gems,
    'first_completion', v_first,
    'new_legendary', v_new_legendary
  );
END;
$$;

-- ==========================================================================
-- Grants
-- ==========================================================================
GRANT EXECUTE ON FUNCTION public.award_xp(text, text, integer, integer) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.log_exercise_attempt(text, text, boolean) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.activate_xp_boost(integer) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.record_lesson_completion(text, boolean) TO authenticated, anon;
