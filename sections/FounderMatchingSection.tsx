"use client";

import { motion } from "framer-motion";
import { GitBranch, Users2, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

import { fadeInUp, staggerContainer } from "@/lib/animations";

const lanes = [
  {
    title: "Relevant introductions",
    body: "Meet people who understand your problem, industry, and stage.",
    icon: Users2,
  },
  {
    title: "Better co-founder matching",
    body: "Filter people by skills, availability, risk level, and startup goals.",
    icon: Zap,
  },
  {
    title: "Progress visibility",
    body: "Share milestones, updates, and progress so collaborators can trust your execution.",
    icon: GitBranch,
  },
];

export function FounderMatchingSection() {
  const router = useRouter();

  return (
    <section id="matching" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(129,140,248,0.07),transparent)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="space-y-4"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs font-semibold uppercase tracking-[0.35em] text-violet-300/90"
            >
              Founder matching
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              Find co-founders who match your skills, goals, and working style.
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-sm leading-relaxed text-zinc-400 sm:text-base">
              Starthub helps founders connect with builders, operators, and
              co-founders based on skills, commitment level, industry interest,
              and long-term vision.
            </motion.p>
          </motion.div>
          <div className="space-y-4">
            {lanes.map((lane, i) => (
              <motion.div
                key={lane.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.04] to-transparent p-5 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.9)]"
                onClick={() => router.push("/signup")}
                whileHover={{ y: -4 }}
                tabIndex={0}
                role="button"
                style={{ cursor: "pointer" }}
              >
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_80%_50%,rgba(167,139,250,0.12),transparent)] opacity-0 transition group-hover:opacity-100" />
                <div className="flex gap-4">
                  <span className="mt-1 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-violet-500/10 text-violet-100">
                    <lane.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-white">{lane.title}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{lane.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
