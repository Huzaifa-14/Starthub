import { Suspense } from "react";

import { LoginForm } from "@/components/auth/LoginForm";
import { SupabaseSetupBanner } from "@/components/auth/SupabaseSetupBanner";
import { Spotlight } from "@/components/ui/glass";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#030308] px-4 py-24">
      <Spotlight className="opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(99,102,241,0.2),transparent_50%),radial-gradient(ellipse_at_80%_100%,rgba(34,211,238,0.12),transparent_45%)]" />
      <SupabaseSetupBanner />
      <Suspense
        fallback={
          <div className="h-96 w-full max-w-md animate-pulse rounded-3xl border border-white/10 bg-white/[0.03]" />
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
