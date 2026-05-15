"use client";

import type { Profile } from "@/lib/database.types";

type DashboardContentProps = {
  profile: Profile | null;
  section?: string;
  sectionTitle?: string;
};

export function DashboardContent({
  profile,
  section,
  sectionTitle,
}: DashboardContentProps) {
  const firstName = profile?.full_name?.split(" ")[0] || "there";
  const title = sectionTitle ?? "Dashboard";
  const subtitle = section
    ? `Explore the ${section.replace("-", " ")} section and manage your connections.`
    : `Here's what's happening in your ecosystem today.`;

  return (
    <div className="flex-1 overflow-auto">
      <div className="space-y-8 p-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white">{title}</h1>
          <p className="mt-2 text-zinc-400">{subtitle}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard number="0" label="Connections" />
          <StatCard number="0" label="Startups Viewed" />
          <StatCard number="0" label="Investors Active" />
          <StatCard number="0" label="Messages" />
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="col-span-2 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
              <span>📋</span> Recent Activity
            </h2>
            <div className="space-y-4">
              <p className="text-sm text-zinc-400">No activity yet. Start connecting!</p>
            </div>
          </div>

          {/* Suggested Connections */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
              <span>✨</span> Suggested
            </h2>
            <div className="space-y-4">
              <p className="text-sm text-zinc-400">No suggestions yet.</p>
            </div>
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
