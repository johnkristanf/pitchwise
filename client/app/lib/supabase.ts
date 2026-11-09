import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Modern Supabase Client Configuration
 *
 * PitchWise strictly uses modern publishable API keys (VITE_SUPABASE_PUBLISHABLE_KEY)
 * rather than deprecated static JWT anon keys.
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
      supabasePublishableKey &&
      !supabaseUrl.includes("your-project-id") &&
      !supabasePublishableKey.includes("your_publishable_api_key_here")
  );
};

if (!isSupabaseConfigured() && typeof window !== "undefined") {
  console.warn(
    "[PitchWise Auth] Supabase environment variables are missing or unconfigured.\n" +
      "Please copy `client/.env.example` to `client/.env` and supply your modern Supabase credentials:\n" +
      "  - VITE_SUPABASE_URL\n" +
      "  - VITE_SUPABASE_PUBLISHABLE_KEY (modern publishable key starting with sb_pub_)"
  );
}

// Fallback to placeholder to prevent module crash if .env is missing during initial run
const effectiveUrl = isSupabaseConfigured()
  ? (supabaseUrl as string)
  : "https://placeholder-pitchwise.supabase.co";

const effectiveKey = isSupabaseConfigured()
  ? (supabasePublishableKey as string)
  : "sb_pub_placeholder_key_unconfigured";

export const supabase: SupabaseClient = createClient(effectiveUrl, effectiveKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

