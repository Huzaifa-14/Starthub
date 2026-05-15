"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

import { cn } from "@/utils/cn";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  glow?: boolean;
};

export function GlassCard({ children, className, glow }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-xl",
        glow &&
          "shadow-[0_0_80px_-20px_rgba(99,102,241,0.35),0_0_0_1px_rgba(255,255,255,0.06)_inset]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-indigo-500/5" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function MagneticButton({
  children,
  className,
  type = "button",
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function handleMove(e: React.MouseEvent<HTMLButtonElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * 0.18);
    y.set(dy * 0.18);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      style={{ x: springX, y: springY }}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3 text-sm font-semibold text-zinc-950",
        "bg-gradient-to-r from-white via-zinc-100 to-zinc-200 shadow-[0_0_40px_-10px_rgba(255,255,255,0.45)] transition-shadow hover:shadow-[0_0_60px_-8px_rgba(129,140,248,0.55)]",
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-indigo-400/20 via-transparent to-cyan-300/20 opacity-0 transition-opacity hover:opacity-100" />
    </motion.button>
  );
}

type GlowInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function GlowInput({ label, className, id, ...props }: GlowInputProps) {
  const inputId = id ?? props.name;
  return (
    <label className="block space-y-2 text-left">
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </span>
      <input
        id={inputId}
        className={cn(
          "w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-zinc-100 outline-none ring-0 transition",
          "placeholder:text-zinc-600 focus:border-indigo-400/50 focus:bg-black/60 focus:shadow-[0_0_0_1px_rgba(129,140,248,0.35)]",
          className,
        )}
        {...props}
      />
    </label>
  );
}

type SpotlightProps = { className?: string };

export function Spotlight({ className }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgba(129,140,248,0.16), transparent 55%)`;

  useEffect(() => {
    function onMove(e: PointerEvent) {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      mx.set(e.clientX - r.left);
      my.set(e.clientY - r.top);
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <motion.div
      ref={ref}
      className={cn("pointer-events-none absolute inset-0 opacity-90", className)}
      style={{ background }}
    />
  );
}
