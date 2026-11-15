export const FORCE_DEMO = process.env.NEXT_PUBLIC_FORCE_DEMO === "1";
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const HAS_SUPABASE_ENV = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
export const DEMO_MODE = FORCE_DEMO || !HAS_SUPABASE_ENV;
