/**
 * Shared Supabase project coordinates.
 * Real values come from the environment; the constants are the same project ref
 * so the app keeps working in preview builds where env injection is unavailable.
 */
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kgdhltwbxbzgvsjdmyts.supabase.co';

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnZGhsdHdieGJ6Z3ZzamRteXRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQwNjU3MjIsImV4cCI6MjEwOTY0MTcyMn0.UrwzR5_lo5aysSSwam3N9_JL56skXAuUi78rH7IDL3E';
