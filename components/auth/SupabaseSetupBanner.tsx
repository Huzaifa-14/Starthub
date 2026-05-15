"use client";

export function SupabaseSetupBanner() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && key) return null;

  return (
    <div className="relative z-20 mx-auto mb-6 max-w-md rounded-2xl border border-amber-500/35 bg-amber-500/10 px-4 py-3 text-left text-sm text-amber-100">
      <p className="font-medium text-amber-50">Supabase is not configured</p>
      <p className="mt-1 text-xs leading-relaxed text-amber-100/85">
        Create <code className="rounded bg-black/30 px-1 py-0.5">.env.local</code> in
        the project root with <code className="rounded bg-black/30 px-1">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
        and <code className="rounded bg-black/30 px-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> (or{" "}
        <code className="rounded bg-black/30 px-1">NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code>). Copy{" "}
        <code className="rounded bg-black/30 px-1">.env.example</code> as a template, then restart{" "}
        <code className="rounded bg-black/30 px-1">npm run dev</code>.
      </p>
    </div>
  );
}
