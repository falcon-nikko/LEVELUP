import { createBrowserClient } from "@supabase/ssr";
import { HAS_SUPABASE_ENV, SUPABASE_ANON_KEY, SUPABASE_URL } from "../runtime";

let client: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabase() {
  if (!HAS_SUPABASE_ENV) return null;
  if (!client) client = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return client;
}
