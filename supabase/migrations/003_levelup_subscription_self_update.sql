-- ============================================================================
-- LEVELUP 003 · Super activation writes to the real subscription row
-- ----------------------------------------------------------------------------
-- Activating Super updates public.profiles.is_pro (own row, already allowed)
-- and stamps the real subscription record. Without an UPDATE policy the
-- subscription write was silently dropped by Row Level Security.
-- ============================================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'subscriptions'
      AND policyname = 'Users can update own subscription'
  ) THEN
    CREATE POLICY "Users can update own subscription"
      ON public.subscriptions FOR UPDATE TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;
