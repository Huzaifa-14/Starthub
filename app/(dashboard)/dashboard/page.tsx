"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MagneticButton } from "@/components/ui/glass";

export default function DashboardPage() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="space-y-8 p-8">
        <div>
          <h1 className="text-4xl font-bold text-white">Dashboard</h1>
          <p className="mt-2 text-zinc-400">Here's what's happening in your ecosystem today.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard number="14" label="Connections" />
          <StatCard number="28" label="Startups Viewed" />
          <StatCard number="6" label="Investors Active" />
          <StatCard number="12" label="Messages" />
        </div>

        {/* Content Panels */}
        <div className="grid grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
              <span>📋</span> Recent Activity
            </h2>
            <p className="text-sm text-zinc-400">
              No activity yet. Explore founders, startups, and investors to get started.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
              <span>✨</span> Suggested Matches
            </h2>
            <p className="text-sm text-zinc-400">
              Personalized opportunities will appear here once you begin your discovery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
      <p className="text-3xl font-bold text-white">{number}</p>
      <p className="mt-1 text-xs text-zinc-400">{label}</p>
    </div>
  );
}
