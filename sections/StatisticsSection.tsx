"use client";

import { animate, motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

import { fadeInUp, staggerContainer } from "@/lib/animations";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 90, damping: 18 });
  const inView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: 2.2, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, mv, value]);

  useEffect(() => {
    const unsub = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(latest).toLocaleString()}${suffix}`;
      }
    });
    return () => unsub();
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const stats = [
  { label: "Startups orbiting", value: 1840, suffix: "+" },
  { label: "Investor desks", value: 320, suffix: "" },
  { label: "Intros orchestrated", value: 9600, suffix: "+" },
  { label: "Avg. time to first call", value: 36, suffix: "h" },
];

export function StatisticsSection() {
  return (
    <section id="stats" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.12),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mb-12 max-w-2xl space-y-4"
        >
          <motion.p
            variants={fadeInUp}
            className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-200/90"
          >
            Live signals
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Proof that the network is breathing.
          </motion.h2>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-white/10 bg-[#070712]/80 p-6 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] backdrop-blur-xl"
            >
              <div className="font-[family-name:var(--font-display)] text-3xl font-semibold tabular-nums text-white sm:text-4xl">
                <AnimatedNumber value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
