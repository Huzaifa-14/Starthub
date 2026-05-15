"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { fadeInUp, staggerContainer } from "@/lib/animations";
import { MagneticButton } from "@/components/ui/glass";

export function CtaSection() {
  const router = useRouter();
  return (
    <section className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(56,189,248,0.18),transparent_55%)]" />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={staggerContainer}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-indigo-600/25 via-[#0b0b18] to-cyan-500/15 px-6 py-16 text-center shadow-[0_40px_120px_-60px_rgba(99,102,241,0.65)] sm:px-12"
      >
        <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2760%27%20height%3D%2760%27%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%3E%3Cpath%20d%3D%27M60%200H0v60%27%20fill%3D%27none%27%20stroke%3D%27rgba%28255%2C255%2C255%2C0.04%29%27/%3E%3C/svg%3E')]" />
        <motion.h2
          variants={fadeInUp}
          className="relative z-10 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        >
          Claim your coordinates in the Starthub constellation.
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="relative z-10 mx-auto mt-4 max-w-xl text-sm text-zinc-300 sm:text-base"
        >
          Authentication unlocks the full platform — dashboards, deal rooms, and
          matching fabric ship next.
        </motion.p>
        <motion.div variants={fadeInUp} className="relative z-10 mt-10 flex justify-center">
          <MagneticButton type="button" onClick={() => router.push("/signup")}>
            Create your profile
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
