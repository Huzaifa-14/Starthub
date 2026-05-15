"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Cpu, Orbit, Rocket } from "lucide-react";
import type { ReactNode } from "react";

import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/utils/cn";

const startups = [
  {
    name: "Nebula AI",
    tag: "Series A",
    desc: "Adaptive copilots for industrial maintenance.",
    icon: Rocket,
    hue: "from-violet-500/30 to-fuchsia-500/20",
  },
  {
    name: "Lattice Grid",
    tag: "Seed",
    desc: "Carbon-aware compute scheduling at the edge.",
    icon: Cpu,
    hue: "from-cyan-500/25 to-emerald-500/15",
  },
  {
    name: "Arcadia Labs",
    tag: "Pre-seed",
    desc: "Spatial interfaces for collaborative robotics.",
    icon: Orbit,
    hue: "from-amber-500/25 to-rose-500/15",
  },
];

function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const bg = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgba(255,255,255,0.12), transparent 55%)`;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    mx.set(px);
    my.set(py);
    rotateX.set((py - r.height / 2) / 18);
    rotateY.set(-(px - r.width / 2) / 18);
  }

  function onLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      whileHover={{ scale: 1.015 }}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.9)] backdrop-blur-xl",
        className,
      )}
    >
      <motion.div className="pointer-events-none absolute inset-0 opacity-80" style={{ background: bg }} />
      {children}
    </motion.div>
  );
}

export function StartupShowcaseSection() {
  return (
    <section id="showcase" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(99,102,241,0.06),transparent)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mb-14 max-w-2xl space-y-4"
        >
          <motion.p
            variants={fadeInUp}
            className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-300/90"
          >
            Startup showcase
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Floating decks that feel alive — not like a directory.
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-sm leading-relaxed text-zinc-400 sm:text-base">
            Motion-native cards, depth, and light that follow your cursor. Founders
            get a stage that matches the ambition of what they are building.
          </motion.p>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3">
          {startups.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard>
                <div
                  className={cn(
                    "mb-4 inline-flex rounded-2xl border border-white/10 bg-gradient-to-br p-3",
                    s.hue,
                  )}
                >
                  <s.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-white">{s.name}</h3>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-300">
                    {s.tag}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{s.desc}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
