import { redirect } from "next/navigation";

import { normalizeRole, roleLabel } from "@/lib/auth/roles";
import type { Profile } from "@/lib/database.types";
import { createClient } from "@/supabase/server";
import { PlatformShell } from "@/components/platform/PlatformShell";

export const dynamic = "force-dynamic";

type ClaimsShape = {
  sub?: string;
  email?: string;
  user_metadata?: { role?: string; full_name?: string };
};

export default async function PlatformPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims?.sub) {
    redirect("/login");
  }

  const claims = data.claims as ClaimsShape;
  const userId = claims.sub as string;
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  const email =
    (typeof claims.email === "string" ? claims.email : null) ??
    profile?.email ??
    null;

  const roleForLabel: Profile["role"] =
    profile?.role ?? normalizeRole(claims.user_metadata?.role);

  return (
    <PlatformShell
      profile={profile}
      roleLabel={roleLabel(roleForLabel)}
      email={email}
    />
  );
}
