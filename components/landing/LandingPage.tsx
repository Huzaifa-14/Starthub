"use client";

import { ParticleCanvas } from "@/components/effects/ParticleCanvas";
import { LandingNav } from "@/components/layout/LandingNav";
import { CtaSection } from "@/sections/CtaSection";
import { FooterSection } from "@/sections/FooterSection";
import { FounderMatchingSection } from "@/sections/FounderMatchingSection";
import { HeroSection } from "@/sections/HeroSection";
import { InvestorDiscoverySection } from "@/sections/InvestorDiscoverySection";
import { StartupShowcaseSection } from "@/sections/StartupShowcaseSection";
import { StatisticsSection } from "@/sections/StatisticsSection";

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030308] text-zinc-100">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[#030308]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-[size:64px_64px]" />
      </div>
      <ParticleCanvas />
      <LandingNav />
      <main>
        <HeroSection />
        <StartupShowcaseSection />
        <InvestorDiscoverySection />
        <FounderMatchingSection />
        <StatisticsSection />
        <CtaSection />
      </main>
      <FooterSection />
    </div>
  );
}
