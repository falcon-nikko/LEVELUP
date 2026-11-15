import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { HAS_SUPABASE_ENV, SUPABASE_ANON_KEY, SUPABASE_URL } from "../runtime";

export async function getServerSupabase() {
  if (!HAS_SUPABASE_ENV) return null;
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Los Server Components no pueden escribir cookies; el middleware las refresca.
        }
      },
    },
  });
}
