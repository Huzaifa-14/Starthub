import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "@/lib/database.types";
import { readSupabaseEnv } from "@/lib/env";

export function createClient() {
  const env = readSupabaseEnv();
  if (!env) {
    throw new Error(
      "Supabase is not configured. Create .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY), then restart npm run dev.",
    );
  }
  return createBrowserClient<Database>(env.url, env.key);
}
