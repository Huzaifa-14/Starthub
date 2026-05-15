import { SignupForm } from "@/components/auth/SignupForm";
import { SupabaseSetupBanner } from "@/components/auth/SupabaseSetupBanner";
import { Spotlight } from "@/components/ui/glass";

export default function SignupPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#030308] px-4 py-24">
      <Spotlight className="opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(34,211,238,0.15),transparent_50%),radial-gradient(ellipse_at_10%_100%,rgba(129,140,248,0.18),transparent_45%)]" />
      <SupabaseSetupBanner />
      <SignupForm />
    </div>
  );
}
