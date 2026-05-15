"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { USER_ROLES } from "@/lib/auth/roles";
import type { UserRole } from "@/lib/database.types";
import { createClient } from "@/supabase/client";
import { GlassCard, GlowInput, MagneticButton } from "@/components/ui/glass";
import { cn } from "@/utils/cn";

export function SignupForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("explorer");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const origin = window.location.origin;
      const { data, error: signError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role,
          },
        },
      });
      if (signError) {
        setError(signError.message);
        return;
      }
      if (data.session) {
        router.push("/platform");
        router.refresh();
        return;
      }
      setInfo(
        "Account created. If you do not receive a session immediately, check your Supabase auth settings and disable email confirmations.",
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start sign-up.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <GlassCard className="mx-auto w-full max-w-lg" glow>
      <div className="mb-8 space-y-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/90">
          Join Starthub
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white">
          Create account
        </h1>
        <p className="text-sm text-zinc-400">
          Pick your lane — you can refine this later inside the product.
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-5">
        <GlowInput
          label="Full name"
          name="fullName"
          autoComplete="name"
          required
          value={fullName}
          onChange={(ev) => setFullName(ev.target.value)}
          placeholder="Jordan Lee"
        />
        <GlowInput
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder="you@company.com"
        />
        <GlowInput
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          placeholder="Minimum 8 characters"
        />
        <div className="space-y-3 text-left">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
            Role
          </span>
          <div className="grid gap-2 sm:grid-cols-2">
            {USER_ROLES.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                className={cn(
                  "rounded-2xl border px-3 py-3 text-left text-xs transition",
                  role === r.value
                    ? "border-indigo-400/60 bg-indigo-500/15 text-white shadow-[0_0_24px_-8px_rgba(99,102,241,0.55)]"
                    : "border-white/10 bg-black/30 text-zinc-400 hover:border-white/20 hover:text-zinc-200",
                )}
              >
                <span className="block text-sm font-semibold text-zinc-100">
                  {r.label}
                </span>
                <span className="mt-1 block text-[11px] leading-snug text-zinc-500">
                  {r.hint}
                </span>
              </button>
            ))}
          </div>
        </div>
        {error ? (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
            {error}
          </p>
        ) : null}
        {info ? (
          <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-100">
            {info}
          </p>
        ) : null}
        <div className="flex justify-center pt-2">
          <MagneticButton type="submit" className="w-full sm:w-auto">
            {loading ? "Creating…" : "Launch account"}
          </MagneticButton>
        </div>
      </form>
      <p className="mt-8 text-center text-xs text-zinc-500">
        Already inside?{" "}
        <Link href="/login" className="text-indigo-300 hover:text-indigo-200">
          Log in
        </Link>
      </p>
    </GlassCard>
  );
}
