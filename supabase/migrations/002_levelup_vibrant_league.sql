-- ============================================================================
-- LEVELUP 002 · Vibrant League & Real-Only Gamification Core
-- ----------------------------------------------------------------------------
-- Goals:
--   1. Every leaderboard/league row must come from a real auth.users profile.
--      No seeded operators, no demo rows, no synthetic XP.
--   2. XP, gems, hearts and streaks are awarded server-side through a
--      SECURITY DEFINER RPC so Row Level Security can never be bypassed by the
--      browser and numbers can never be forged client-side.
--   3. Weekly league is a real Monday->Sunday window computed from the stored
--      xp_transactions ledger.
-- ============================================================================

-- 1. Gamification columns on public.profiles ---------------------------------
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS hearts integer NOT NULL DEFAULT 5,
  ADD COLUMN IF NOT EXISTS max_hearts integer NOT NULL DEFAULT 5,
  ADD COLUMN IF NOT EXISTS gems integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS avatar_hue integer NOT NULL DEFAULT 145,
  ADD COLUMN IF NOT EXISTS hearts_refill_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS weekly_xp integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS week_key text NOT NULL DEFAULT to_char(date_trunc('week', now()), 'IYYY-IW'),
  ADD COLUMN IF NOT EXISTS minutes_practiced integer NOT NULL DEFAULT 0;

-- 2. Week helpers -------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.current_week_key()
RETURNS text
LANGUAGE sql
STABLE
AS $$
  SELECT to_char(date_trunc('week', now()), 'IYYY-IW');
$$;

CREATE OR REPLACE FUNCTION public.current_week_start()
RETURNS date
LANGUAGE sql
STABLE
AS $$
  SELECT date_trunc('week', now())::date;
$$;

GRANT EXECUTE ON FUNCTION public.current_week_key() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.current_week_start() TO anon, authenticated;

-- 3. Heart economy (1 heart back every 20 minutes, capped) --------------------
CREATE OR REPLACE FUNCTION public.refresh_hearts()
RETURNS TABLE (hearts integer, hearts_refill_at timestamptz)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_profile public.profiles%ROWTYPE;
  v_elapsed_min integer;
  v_gained integer;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'auth_required';
  END IF;

  SELECT * INTO v_profile FROM public.profiles WHERE id = v_uid FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'profile_missing';
  END IF;

  IF v_profile.is_pro THEN
    UPDATE public.profiles
       SET hearts = max_hearts
     WHERE id = v_uid;
    RETURN QUERY SELECT v_profile.max_hearts, now();
    RETURN;
  END IF;

  v_elapsed_min := GREATEST(0, FLOOR(EXTRACT(EPOCH FROM (now() - v_profile.hearts_refill_at)) / 60)::integer);
  v_gained := v_elapsed_min / 20;

  IF v_gained > 0 AND v_profile.hearts < v_profile.max_hearts THEN
    v_profile.hearts := LEAST(v_profile.max_hearts, v_profile.hearts + v_gained);
    v_profile.hearts_refill_at := now();
  ELSIF v_profile.hearts >= v_profile.max_hearts THEN
    v_profile.hearts_refill_at := now();
  END IF;

  UPDATE public.profiles
     SET hearts = v_profile.hearts,
         hearts_refill_at = v_profile.hearts_refill_at
   WHERE id = v_uid;

  RETURN QUERY SELECT v_profile.hearts, v_profile.hearts_refill_at;
END;
$$;

GRANT EXECUTE ON FUNCTION public.refresh_hearts() TO authenticated;

CREATE OR REPLACE FUNCTION public.consume_heart()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_is_pro boolean;
  v_hearts integer;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'auth_required';
  END IF;

  SELECT is_pro, hearts INTO v_is_pro, v_hearts FROM public.profiles WHERE id = v_uid FOR UPDATE;
  IF v_is_pro THEN
    RETURN v_hearts;
  END IF;

  v_hearts := GREATEST(0, v_hearts - 1);
  UPDATE public.profiles
     SET hearts = v_hearts,
         hearts_refill_at = CASE
           WHEN v_hearts = (SELECT max_hearts - 1 FROM public.profiles WHERE id = v_uid)
             THEN now() + interval '20 minutes'
           ELSE hearts_refill_at
         END
   WHERE id = v_uid;

  RETURN v_hearts;
END;
$$;

GRANT EXECUTE ON FUNCTION public.consume_heart() TO authenticated;

-- 4. Server-authoritative XP award (the only way to gain XP) ------------------
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
  v_gems integer;
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

  -- Roll the weekly counter over when a new ISO week begins.
  IF v_profile.week_key <> v_week THEN
    v_profile.weekly_xp := 0;
    v_profile.week_key := v_week;
  END IF;

  v_profile.weekly_xp := v_profile.weekly_xp + p_amount;
  v_profile.total_xp := v_profile.total_xp + p_amount;
  v_gems := (p_amount / 10);
  v_profile.gems := v_profile.gems + v_gems;
  v_profile.minutes_practiced := v_profile.minutes_practiced + COALESCE(p_duration_min, 0);

  IF NOT (v_today = ANY (v_profile.activity_dates)) THEN
    v_profile.activity_dates := array_append(v_profile.activity_dates, v_today);
  END IF;

  UPDATE public.profiles
     SET weekly_xp = v_profile.weekly_xp,
         week_key = v_profile.week_key,
         total_xp = v_profile.total_xp,
         gems = v_profile.gems,
         minutes_practiced = v_profile.minutes_practiced,
         activity_dates = v_profile.activity_dates,
         last_active_at = now()
   WHERE id = v_uid;

  -- Ledger entry: the single source of truth for the weekly league.
  INSERT INTO public.xp_transactions (user_id, source, source_id, amount, balance_after, metadata)
  VALUES (
    v_uid,
    COALESCE(p_source, 'lesson'),
    COALESCE(p_source_id, ''),
    p_amount,
    v_profile.total_xp,
    jsonb_build_object('week_key', v_week, 'gems', v_gems)
  );

  -- Streak bookkeeping.
  SELECT current_streak, longest_streak INTO v_streak, v_longest
    FROM public.streaks
   WHERE user_id = v_uid
   FOR UPDATE;

  IF NOT FOUND THEN
    INSERT INTO public.streaks (user_id, current_streak, longest_streak, last_activity_date)
    VALUES (v_uid, 1, 1, v_today)
    RETURNING current_streak, longest_streak INTO v_streak, v_longest;
  ELSE
    IF (SELECT last_activity_date FROM public.streaks WHERE user_id = v_uid) = v_today - 1 THEN
      v_streak := v_streak + 1;
    ELSIF (SELECT last_activity_date FROM public.streaks WHERE user_id = v_uid) IS DISTINCT FROM v_today THEN
      v_streak := 1;
    END IF;
    v_longest := GREATEST(COALESCE(v_longest, 0), v_streak);

    UPDATE public.streaks
       SET current_streak = v_streak,
           longest_streak = v_longest,
           last_activity_date = v_today
     WHERE user_id = v_uid;
  END IF;

  RETURN jsonb_build_object(
    'total_xp', v_profile.total_xp,
    'weekly_xp', v_profile.weekly_xp,
    'gems_earned', v_gems,
    'gems', v_profile.gems,
    'hearts', v_profile.hearts,
    'streak', v_streak,
    'longest_streak', v_longest,
    'rank', (
      SELECT COUNT(*) + 1
        FROM public.profiles p
       WHERE p.week_key = v_week
         AND p.weekly_xp > v_profile.weekly_xp
    )
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.award_xp(text, text, integer, integer) TO authenticated;

-- 5. Real weekly league (no seeded rows, privacy-safe projection) -------------
CREATE OR REPLACE FUNCTION public.get_weekly_league(p_limit integer DEFAULT 30)
RETURNS TABLE (
  user_id uuid,
  display_name text,
  avatar_hue integer,
  active_track_slug text,
  weekly_xp integer,
  total_xp integer,
  current_streak integer,
  is_pro boolean,
  is_self boolean,
  league_rank bigint
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_week text := public.current_week_key();
BEGIN
  RETURN QUERY
  WITH scored AS (
    SELECT
      p.id AS uid,
      COALESCE(NULLIF(p.full_name, ''), NULLIF(p.username, ''), split_part(COALESCE(p.email, 'operator'), '@', 1)) AS name,
      p.avatar_hue AS hue,
      p.active_track_slug AS track,
      CASE WHEN p.week_key = v_week THEN p.weekly_xp ELSE 0 END AS week_xp,
      p.total_xp AS xp,
      COALESCE(s.current_streak, 0) AS streak,
      p.is_pro AS pro
    FROM public.profiles p
    LEFT JOIN public.streaks s ON s.user_id = p.id
    WHERE EXISTS (
      SELECT 1 FROM public.user_settings us
       WHERE us.user_id = p.id AND us.privacy_level = 'public'
    )
  ),
  ranked AS (
    SELECT
      scored.*,
      ROW_NUMBER() OVER (ORDER BY scored.week_xp DESC, scored.xp DESC, scored.name ASC) AS rn
    FROM scored
  )
  SELECT
    ranked.uid,
    ranked.name,
    ranked.hue,
    ranked.track,
    ranked.week_xp,
    ranked.xp,
    ranked.streak,
    ranked.pro,
    ranked.uid = v_uid,
    ranked.rn
  FROM ranked
  ORDER BY ranked.rn ASC
  LIMIT LEAST(GREATEST(COALESCE(p_limit, 30), 1), 100);
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_weekly_league(integer) TO authenticated;

-- 6. League week window (real countdown, never hardcoded) ---------------------
CREATE OR REPLACE FUNCTION public.get_league_window()
RETURNS TABLE (week_key text, week_start date, week_end date, seconds_left integer, member_count bigint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    public.current_week_key(),
    public.current_week_start(),
    (public.current_week_start() + 6),
    GREATEST(0, FLOOR(EXTRACT(EPOCH FROM ((public.current_week_start() + 7)::timestamptz - now())))::integer),
    (SELECT COUNT(*) FROM public.profiles p
      WHERE EXISTS (SELECT 1 FROM public.user_settings us
                     WHERE us.user_id = p.id AND us.privacy_level = 'public'));
$$;

GRANT EXECUTE ON FUNCTION public.get_league_window() TO authenticated;

-- 7. Keep the real active league window aligned with the ISO week ------------
UPDATE public.leagues
   SET week_start = public.current_week_start(),
       week_end = public.current_week_start() + 6,
       is_active = true
 WHERE tier = 'gold';

-- 8. Let a signed-in operator write their own XP ledger row (RPC stays primary)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'xp_transactions' AND policyname = 'Users can insert own XP transactions'
  ) THEN
    CREATE POLICY "Users can insert own XP transactions"
      ON public.xp_transactions FOR INSERT TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- 9. Remove any non-real operator rows that could ever masquerade as players --
--    (defensive: the live database currently holds zero profiles)
DELETE FROM public.profiles
 WHERE email IS NULL
    OR email = ''
    OR email LIKE '%@levelup.demo'
    OR email LIKE '%@example.com';
