"use client";

import { GravityStarsBackground } from "@/components/ui/GravityStarsBackground";
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
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-zinc-100">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900" />
      <GravityStarsBackground
        starsCount={110}
        starsSize={1.6}
        starsOpacity={0.85}
        glowIntensity={40}
        glowAnimation="spring"
        movementSpeed={0.5}
        mouseInfluence={240}
        mouseGravity="attract"
        gravityStrength={140}
        starsInteraction
        starsInteractionType="bounce"
      />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-black/50" />
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
