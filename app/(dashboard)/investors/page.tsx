"use client";

import { MagneticButton } from "@/components/ui/glass";
import { useState } from "react";

const MOCK_INVESTORS = [
  {
    id: 1,
    name: "Sarah Chen",
    firm: "Crescent Capital",
    focusAreas: ["AI", "Climate", "DeepTech"],
    ticketSize: "$100K–$2M",
    initials: "SC",
  },
  {
    id: 2,
    name: "David Kumar",
    firm: "Nova Ventures",
    focusAreas: ["B2B SaaS", "Fintech", "Infrastructure"],
    ticketSize: "$50K–$500K",
    initials: "DK",
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    firm: "Luminous Fund",
    focusAreas: ["Marketplace", "E-commerce", "Web3"],
    ticketSize: "$250K–$1.5M",
    initials: "MR",
  },
  {
    id: 4,
    name: "James Patterson",
    firm: "Horizon Ventures",
    focusAreas: ["HealthTech", "Biotech", "MedDevice"],
    ticketSize: "$200K–$1M",
    initials: "JP",
  },
  {
    id: 5,
    name: "Lisa Wong",
    firm: "Zenith Partners",
    focusAreas: ["EdTech", "Enterprise", "Developer Tools"],
    ticketSize: "$100K–$750K",
    initials: "LW",
  },
  {
    id: 6,
    name: "Michael O'Brien",
    firm: "Summit Capital",
    focusAreas: ["Climate", "Sustainability", "Energy"],
    ticketSize: "$500K–$3M",
    initials: "MO",
  },
];

export default function InvestorsPage() {
  const [selectedFocusArea, setSelectedFocusArea] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInvestors = MOCK_INVESTORS.filter((investor) => {
    const matchesSearch =
      investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.firm.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFocus =
      !selectedFocusArea || investor.focusAreas.includes(selectedFocusArea);
    return matchesSearch && matchesFocus;
  });

  const allFocusAreas = Array.from(
    new Set(MOCK_INVESTORS.flatMap((i) => i.focusAreas))
  ).sort();

  return (
    <div className="flex-1 overflow-auto">
      <div className="space-y-8 p-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white">Investors</h1>
          <p className="mt-2 text-zinc-400">Meet the people funding tomorrow</p>
        </div>

        {/* Search */}
        <div>
          <input
            type="text"
            placeholder="Search investors or firms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-indigo-400/50 focus:bg-black/60"
          />
        </div>

        {/* Focus Area Filter */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Investment Focus
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedFocusArea(null)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                !selectedFocusArea
                  ? "border-indigo-400/60 bg-indigo-500/15 text-white"
                  : "border border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
              }`}
            >
              All
            </button>
            {allFocusAreas.map((area) => (
              <button
                key={area}
                onClick={() => setSelectedFocusArea(area)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  selectedFocusArea === area
                    ? "border-indigo-400/60 bg-indigo-500/15 text-white"
                    : "border border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* Investors Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredInvestors.map((investor) => (
            <div
              key={investor.id}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all hover:bg-white/[0.06]"
            >
              {/* Avatar & Name */}
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
                  <span className="text-lg font-bold text-white">
                    {investor.initials}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-white">{investor.name}</p>
                  <p className="text-xs text-indigo-300">{investor.firm}</p>
                </div>
              </div>

              {/* Focus Areas */}
              <div className="mb-4 flex flex-wrap gap-2">
                {investor.focusAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-300"
                  >
                    {area}
                  </span>
                ))}
              </div>

              {/* Ticket Size */}
              <div className="mb-4 rounded-xl border border-white/10 bg-black/20 p-3">
                <p className="text-xs text-zinc-500">Typical Check Size</p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {investor.ticketSize}
                </p>
              </div>

              {/* Button */}
              <MagneticButton className="w-full">
                View Profile
              </MagneticButton>
            </div>
          ))}
        </div>

        {filteredInvestors.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-12 text-center backdrop-blur-xl">
            <p className="text-zinc-400">
              No investors match your filters. Try adjusting your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
