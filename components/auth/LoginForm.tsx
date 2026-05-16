"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { createClient } from "@/supabase/client";
import { GlassCard, GlowInput, MagneticButton } from "@/components/ui/glass";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";
  const missingEnv = searchParams.get("missing_env");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error: signError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signError) {
        setError(signError.message);
        return;
      }
      if (data?.session) {
        window.location.href = next;
        return;
      }
      router.push(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start sign-in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <GlassCard className="mx-auto w-full max-w-md" glow>
      <div className="mb-8 space-y-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-300/90">
          Starthub Access
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white">
          Log in
        </h1>
        <p className="text-sm text-zinc-400">
          Welcome back to the founder–investor network.
        </p>
      </div>
      {missingEnv ? (
        <p className="mb-5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
          Add Supabase keys to <code className="font-mono">.env.local</code> to access
          the platform area you opened. Restart the dev server after saving.
        </p>
      ) : null}
      <form onSubmit={onSubmit} className="space-y-5">
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
          autoComplete="current-password"
          required
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          placeholder="••••••••"
        />
        {error ? (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
            {error}
          </p>
        ) : null}
        <div className="flex justify-center pt-2">
          <MagneticButton type="submit" className="w-full sm:w-auto">
            {loading ? "Signing in…" : "Continue"}
          </MagneticButton>
        </div>
      </form>
      <p className="mt-8 text-center text-xs text-zinc-500">
        New here?{" "}
        <Link href="/signup" className="text-indigo-300 hover:text-indigo-200">
          Create an account
        </Link>
      </p>
    </GlassCard>
  );
}
