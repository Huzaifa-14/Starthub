"use client";

import { useRouter } from "next/navigation";

import type { Profile } from "@/lib/database.types";
import { createClient } from "@/supabase/client";
import { MagneticButton } from "@/components/ui/glass";

type PlatformShellProps = {
  profile: Profile | null;
  roleLabel: string;
  email: string | null;
};

export function PlatformShell({ profile, roleLabel, email }: PlatformShellProps) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030308] text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(99,102,241,0.25),transparent_55%),radial-gradient(ellipse_at_80%_60%,rgba(34,211,238,0.12),transparent_45%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-300/90">
          Starthub · Phase 1
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          You are inside the perimeter.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          Dashboards, deal rooms, and matching fabric are intentionally not shipped
          in this phase — your session, profile row, and protected routing are live
          and production-grade.
        </p>
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Name
              </dt>
              <dd className="mt-1 font-medium text-white">
                {profile?.full_name?.trim() || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Email
              </dt>
              <dd className="mt-1 font-medium text-white">{email ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Role
              </dt>
              <dd className="mt-1 font-medium text-white">{roleLabel}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Member since
              </dt>
              <dd className="mt-1 font-medium text-white">
                {profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString()
                  : "—"}
              </dd>
            </div>
          </dl>
          {!profile ? (
            <p className="mt-4 text-xs text-amber-200/90">
              Profile row not found yet — confirm your Supabase SQL migration is
              applied and the handle_new_user trigger is active.
            </p>
          ) : null}
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <MagneticButton type="button" onClick={handleSignOut}>
            Sign out
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
