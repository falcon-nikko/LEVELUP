-- ============================================================================
-- LEVELUP Core Extension Migration (Non-destructive over existing 28 tables)
-- ============================================================================

-- 1. Extend public.profiles with fast-access operator & gamification fields
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS active_track_slug text NOT NULL DEFAULT 'ai-automation',
  ADD COLUMN IF NOT EXISTS experience_level text NOT NULL DEFAULT 'beginner',
  ADD COLUMN IF NOT EXISTS daily_goal_minutes integer NOT NULL DEFAULT 10,
  ADD COLUMN IF NOT EXISTS energy integer NOT NULL DEFAULT 5,
  ADD COLUMN IF NOT EXISTS max_energy integer NOT NULL DEFAULT 5,
  ADD COLUMN IF NOT EXISTS total_xp integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_pro boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS completed_lesson_slugs text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS completed_mission_ids text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS claimed_quest_slugs text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS activity_dates text[] NOT NULL DEFAULT '{}';

-- 2. Affiliate Engine tables (Dual Monetization: PRO + Contextual Affiliates)
CREATE TABLE IF NOT EXISTS public.affiliate_tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  track_slug text NOT NULL,
  affiliate_url text NOT NULL,
  commission_note text,
  is_active boolean NOT NULL DEFAULT true,
  clicks_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.affiliate_tools ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'affiliate_tools' AND policyname = 'Affiliate tools viewable by all'
  ) THEN
    CREATE POLICY "Affiliate tools viewable by all"
      ON public.affiliate_tools FOR SELECT
      USING (is_active = true);
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.affiliate_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_slug text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  source_context text NOT NULL DEFAULT 'stack',
  locale text NOT NULL DEFAULT 'es',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'affiliate_clicks' AND policyname = 'Anyone can insert affiliate clicks'
  ) THEN
    CREATE POLICY "Anyone can insert affiliate clicks"
      ON public.affiliate_clicks FOR INSERT
      WITH CHECK (true);
  END IF;
END $$;

-- Atomic RPC to log affiliate clicks and return updated count
CREATE OR REPLACE FUNCTION public.record_affiliate_click(
  p_tool_slug text,
  p_source text DEFAULT 'stack',
  p_locale text DEFAULT 'es'
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count integer;
BEGIN
  INSERT INTO public.affiliate_clicks (tool_slug, user_id, source_context, locale)
  VALUES (p_tool_slug, auth.uid(), COALESCE(p_source, 'stack'), COALESCE(p_locale, 'es'));

  UPDATE public.affiliate_tools
  SET clicks_count = clicks_count + 1
  WHERE slug = p_tool_slug
  RETURNING clicks_count INTO v_count;

  RETURN COALESCE(v_count, 1);
END;
$$;

GRANT EXECUTE ON FUNCTION public.record_affiliate_click(text, text, text) TO anon, authenticated;

-- 3. Privacy-safe Weekly Leaderboard RPC (never exposes user emails)
CREATE OR REPLACE FUNCTION public.get_weekly_leaderboard()
RETURNS TABLE (
  user_id uuid,
  display_name text,
  active_track_slug text,
  total_xp integer,
  is_pro boolean
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    p.id AS user_id,
    COALESCE(NULLIF(p.full_name, ''), NULLIF(p.username, ''), split_part(p.email, '@', 1)) AS display_name,
    p.active_track_slug,
    p.total_xp,
    p.is_pro
  FROM public.profiles p
  ORDER BY p.total_xp DESC, p.created_at ASC
  LIMIT 25;
$$;

GRANT EXECUTE ON FUNCTION public.get_weekly_leaderboard() TO anon, authenticated;

-- 4. Automatic profile + streak + settings bootstrap trigger on auth.users
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    username,
    language
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(COALESCE(NEW.email, 'operator'), '@', 1)),
    LOWER(REGEXP_REPLACE(split_part(COALESCE(NEW.email, 'operator'), '@', 1), '[^a-zA-Z0-9_]', '', 'g')) || '_' || SUBSTR(NEW.id::text, 1, 4),
    COALESCE(NEW.raw_user_meta_data->>'language', 'es')
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.streaks (user_id, current_streak, longest_streak)
  VALUES (NEW.id, 0, 0)
  ON CONFLICT DO NOTHING;

  INSERT INTO public.user_preferences (user_id)
  VALUES (NEW.id)
  ON CONFLICT DO NOTHING;

  INSERT INTO public.user_settings (user_id, privacy_level)
  VALUES (NEW.id, 'public')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.subscriptions (user_id, status, plan)
  VALUES (NEW.id, 'inactive', 'free')
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_auth_user();

-- 5. Seed Affiliate Partner Tools
INSERT INTO public.affiliate_tools (slug, name, track_slug, affiliate_url, commission_note, clicks_count)
VALUES
  ('shopify-starter', 'Shopify', 'smart-dropshipping', 'https://www.shopify.com/?ref=levelup-academy', 'CPA Partner Tier', 142),
  ('make-automation', 'Make.com', 'ai-automation', 'https://www.make.com/en?pc=levelup', '20% Recurring RevShare', 118),
  ('n8n-cloud', 'n8n', 'ai-automation', 'https://n8n.io/?utm_source=levelup', 'Affiliate Partner', 89),
  ('supabase-cloud', 'Supabase', 'modern-coding', 'https://supabase.com/?utm_source=levelup', 'Ecosystem Tool', 164),
  ('vercel-platform', 'Vercel', 'modern-coding', 'https://vercel.com/?utm_source=levelup', 'Ecosystem Tool', 131),
  ('apollo-b2b', 'Apollo.io', 'digital-agency', 'https://www.apollo.io/?utm_source=levelup', '25% Partner Commission', 97),
  ('instantly-outreach', 'Instantly.ai', 'digital-agency', 'https://instantly.ai/?via=levelup', '30% Recurring Commission', 76),
  ('minea-research', 'Minea', 'smart-dropshipping', 'https://en.minea.com/?ref=levelup', '30% Recurring Partner', 64)
ON CONFLICT (slug) DO NOTHING;

-- 6. Seed Smart Dropshipping & Digital Agency flagship courses in Business world
INSERT INTO public.courses (world_id, slug, title, description, short_description, level, is_published, is_premium, order_index)
SELECT
  w.id,
  'smart-dropshipping',
  'Smart Dropshipping & Branded E-Com',
  'Validación con datos, cálculo de ROAS Breakeven, tiendas limpias en Shopify y creativos UGC.',
  'E-commerce rentable con datos',
  'beginner',
  true,
  false,
  9
FROM public.worlds w
WHERE w.slug = 'business'
  AND NOT EXISTS (SELECT 1 FROM public.courses c WHERE c.slug = 'smart-dropshipping');

INSERT INTO public.courses (world_id, slug, title, description, short_description, level, is_published, is_premium, order_index)
SELECT
  w.id,
  'digital-agency-aaa',
  'Agencia Digital B2B (AAA / SMMA)',
  'Ingeniería de ofertas B2B de alto ticket, sistemas de Cold Outreach y cierre consultivo.',
  'Cierra clientes B2B de alto margen',
  'beginner',
  true,
  false,
  10
FROM public.worlds w
WHERE w.slug = 'business'
  AND NOT EXISTS (SELECT 1 FROM public.courses c WHERE c.slug = 'digital-agency-aaa');

-- 7. Seed Subscription Products & Active Weekly Leagues
INSERT INTO public.products (name, description, price, currency, "interval", features, is_active)
SELECT
  'LEVELUP PRO Monthly',
  'Unlimited Focus Energy, Operator Vault, ROAS & B2B Generators',
  1299,
  'USD',
  'month',
  '["Unlimited Energy", "Operator Vault", "Streak Freezes"]'::jsonb,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE name = 'LEVELUP PRO Monthly');

INSERT INTO public.products (name, description, price, currency, "interval", features, is_active)
SELECT
  'LEVELUP PRO Yearly',
  'Annual Operator Membership (49% off) + 7-day trial',
  7900,
  'USD',
  'year',
  '["Unlimited Energy", "Operator Vault", "Streak Freezes", "49% Annual Savings"]'::jsonb,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE name = 'LEVELUP PRO Yearly');

INSERT INTO public.leagues (name, tier, min_xp, max_xp, capacity, week_start, week_end, is_active)
SELECT
  'Operator Gold League',
  'gold',
  200,
  1500,
  30,
  CURRENT_DATE - 2,
  CURRENT_DATE + 5,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.leagues WHERE tier = 'gold' AND is_active = true);
