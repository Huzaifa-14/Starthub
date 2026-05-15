import type { SupabaseClient, User } from "@supabase/supabase-js";

import { normalizeRole } from "@/lib/auth/roles";
import type { Database } from "@/lib/database.types";

/**
 * Keeps `public.profiles` in sync with `auth.users` + `user_metadata`
 * (full_name, role from signup). Safe to call after sign-up or OAuth/email callback.
 */
export async function upsertProfileForAuthUser(
  supabase: SupabaseClient<Database>,
  user: User,
) {
  const meta = (user.user_metadata ?? {}) as { full_name?: string; role?: string };
  const role = normalizeRole(typeof meta.role === "string" ? meta.role : undefined);
  const fullName =
    typeof meta.full_name === "string" ? meta.full_name.trim() : "";

  const { error } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      email: user.email ?? null,
      full_name: fullName || null,
      role,
    },
    { onConflict: "id" },
  );

  return { error: error?.message ?? null };
}
