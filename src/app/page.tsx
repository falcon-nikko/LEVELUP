import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';

/**
 * Root route is a gate, not a brochure.
 * Signed in → the path. Signed out → the account screen.
 * No demo content, no guest preview, no seeded numbers.
 */
export default async function RootPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  redirect(user ? '/learn' : '/auth');
}
