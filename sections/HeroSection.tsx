"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useRef } from "react";

import { fadeInUp, staggerContainer } from "@/lib/animations";
import { MagneticButton, Spotlight } from "@/components/ui/glass";

export function HeroSection() {
  const router = useRouter();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} className="relative overflow-hidden pb-24 pt-32 sm:pb-32 sm:pt-40">
      <Spotlight className="z-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.35),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <motion.div style={{ y }} className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-3xl space-y-8"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-indigo-200/90 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            The operating system for ambitious startups
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            A living ecosystem where{" "}
            <span className="bg-gradient-to-r from-indigo-200 via-white to-cyan-200 bg-clip-text text-transparent">
              capital meets conviction
            </span>
            .
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            Starthub unifies discovery, diligence, and chemistry — founders ship
            narratives, investors surface signal, and co-founders collide with
            intent.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <MagneticButton type="button" onClick={() => router.push("/signup")}>
              Enter the network
              <ArrowUpRight className="ml-2 inline h-4 w-4" />
            </MagneticButton>
            <Link
              href="#showcase"
              className="inline-flex items-center rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-white/30 hover:text-white"
            >
              View the orbit
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
