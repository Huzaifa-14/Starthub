"use client";

import Link from "next/link";

export function FooterSection() {
  return (
    <footer className="border-t border-white/10 bg-[#020208] py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 text-xs font-black text-white">
              S
            </span>
            <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
              Starthub
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
            Starthub is a startup network where founders showcase their ideas,
            investors discover opportunities, and builders find the right people to
            work with.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
          <div className="space-y-3 text-zinc-400">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Product
            </p>
            <a href="#showcase" className="block hover:text-white">
              Showcase
            </a>
            <a href="#investors" className="block hover:text-white">
              Investors
            </a>
            <a href="#matching" className="block hover:text-white">
              Matching
            </a>
          </div>
          <div className="space-y-3 text-zinc-400">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Access
            </p>
            <Link href="/login" className="block hover:text-white">
              Log in
            </Link>
            <Link href="/signup" className="block hover:text-white">
              Sign up
            </Link>
            <Link href="/platform" className="block hover:text-white">
              Platform
            </Link>
          </div>
          <div className="space-y-3 text-zinc-400">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Legal
            </p>
            <span className="block text-zinc-600">Privacy (soon)</span>
            <span className="block text-zinc-600">Terms (soon)</span>
          </div>
        </div>
      </div>
      <p className="mt-12 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} Starthub. Crafted for the next generation of
        category-defining teams.
      </p>
    </footer>
  );
}
