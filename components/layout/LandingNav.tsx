"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/utils/cn";

export function LandingNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-white/10 bg-[#030308]/75 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 text-xs font-black text-white shadow-[0_0_32px_-6px_rgba(99,102,241,0.9)]">
            S
          </span>
          <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-white">
            Starthub
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a href="#showcase" className="transition hover:text-white">
            Showcase
          </a>
          <a href="#investors" className="transition hover:text-white">
            Investors
          </a>
          <a href="#matching" className="transition hover:text-white">
            Matching
          </a>
          <a href="#stats" className="transition hover:text-white">
            Signals
          </a>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition hover:text-white"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-zinc-950 shadow-[0_0_40px_-12px_rgba(255,255,255,0.6)] transition hover:bg-zinc-100"
          >
            Get started
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex rounded-xl border border-white/10 bg-white/5 p-2 text-zinc-200 md:hidden"
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-white/10 bg-[#030308]/95 p-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm text-zinc-300">
            <a href="#showcase" onClick={() => setOpen(false)}>
              Showcase
            </a>
            <a href="#investors" onClick={() => setOpen(false)}>
              Investors
            </a>
            <a href="#matching" onClick={() => setOpen(false)}>
              Matching
            </a>
            <Link href="/login" onClick={() => setOpen(false)}>
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-white py-2 text-center font-semibold text-zinc-950"
              onClick={() => setOpen(false)}
            >
              Get started
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
