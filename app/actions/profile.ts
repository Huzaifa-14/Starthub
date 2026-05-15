"use server";

import { upsertProfileForAuthUser } from "@/lib/supabase/profile-sync";
import { createClient } from "@/supabase/server";

/** Call after client `signUp` / `signIn` when a session exists — persists profile row. */
export async function syncProfileFromSession() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    return { error: error?.message ?? "Not authenticated" };
  }
  return upsertProfileForAuthUser(supabase, user);
}
