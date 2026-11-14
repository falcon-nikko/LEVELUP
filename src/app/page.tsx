import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { hasUsableSession, readCookieSession } from '@/lib/supabase/session';

/**
 * Root route is a gate, not a brochure.
 * Signed in → the path. Signed out → the account screen.
 *
 * The session is decoded from the request cookies instead of calling
 * `supabase.auth.getUser()`: that verification request needs outbound HTTPS to
 * the Supabase host, which is unavailable in sandboxed preview environments.
 * Real authorization still happens in Postgres RLS on every client call.
 */
export default async function RootPage() {
  const cookieStore = await cookies();
  const session = readCookieSession(cookieStore.getAll());

  redirect(hasUsableSession(session) ? '/learn' : '/auth');
}
