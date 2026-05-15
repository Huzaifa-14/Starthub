"use client";

import { motion } from "framer-motion";
import { LineChart, Radar, Telescope } from "lucide-react";
import { useRouter } from "next/navigation";

import { fadeInUp, staggerContainer } from "@/lib/animations";
import { GlassCard } from "@/components/ui/glass";

const investors = [
  {
    name: "Lyra Capital",
    focus: "Deep infra & AI systems",
    icon: Telescope,
  },
  {
    name: "Horizon Syndicate",
    focus: "Climate & atoms-stage bets",
    icon: Radar,
  },
  {
    name: "Northwind Growth",
    focus: "Compound SaaS & fintech",
    icon: LineChart,
  },
];

export function InvestorDiscoverySection() {
  const router = useRouter();

  return (
    <section id="investors" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(56,189,248,0.08),transparent_50%)]" />
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
            className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/90"
          >
            For investors
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Signal-rich profiles, not spreadsheet archaeology.
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-sm leading-relaxed text-zinc-400 sm:text-base">
            Discover startups based on industry, stage, traction, funding needs,
            and founder quality — so you can find relevant opportunities without
            wasting hours searching.
          </motion.p>
        </motion.div>
        <div className="grid gap-6 lg:grid-cols-3">
          {investors.map((inv, i) => (
            <motion.div
              key={inv.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={() => router.push("/signup")}
                className="w-full"
              >
                <GlassCard className="h-full hover:border-cyan-400/25">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{inv.name}</h3>
                      <p className="mt-2 text-sm text-zinc-400">{inv.focus}</p>
                    </div>
                    <span className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/20 to-indigo-500/10 p-2.5 text-cyan-100">
                      <inv.icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-zinc-500">
                    View startup details
                  </p>
                </GlassCard>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
