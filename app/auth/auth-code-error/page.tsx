import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#030308] px-6 text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.12),_transparent_55%)]" />
      <div className="relative z-10 max-w-md text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight">
          Sign-in interrupted
        </h1>
        <p className="mt-3 text-sm text-zinc-400">
          The authentication link was invalid or expired. Request a fresh link
          from the login page.
        </p>
        <Link
          href="/login"
          className="mt-8 inline-flex rounded-full bg-white px-6 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
        >
          Back to login
        </Link>
      </div>
    </main>
  );
}
