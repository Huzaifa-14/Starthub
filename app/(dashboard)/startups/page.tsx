"use client";

import { useState } from "react";
import { StartupFlipCard, type StartupFlipCardData } from "@/components/platform/StartupFlipCard";

const STAGES = ["All", "Seed", "Pre-Seed", "Series A"];
const CATEGORIES = ["All", "EdTech", "AI", "Fintech", "Health", "Web3"];

const MOCK_STARTUPS: StartupFlipCardData[] = [
  {
    id: 1,
    name: "Tensor School",
    description: "A competitive programming and quant pipeline platform for students.",
    stage: "Series A",
    category: "EdTech",
    teamSize: "18",
    location: "Hyderabad, India",
    logo: "📘",
    founder: "Manas Kumar Verma",
    founded: "2026",
  },
  {
    id: 2,
    name: "AlgoUniversity",
    description: "Mentorship for tech careers with deep CS, product, and business guidance.",
    stage: "Seed",
    category: "EdTech",
    teamSize: "22",
    location: "Bengaluru, India",
    logo: "🧠",
    founder: "Swapnil Daga",
    founded: "2020",
  },
  {
    id: 3,
    name: "Nebula Labs",
    description: "AI-enabled supply chain automation",
    stage: "Series A",
    category: "AI",
    teamSize: "12",
    location: "San Francisco, CA",
    logo: "🌌",
    founder: "Ava Morgan",
    founded: "2021",
  },
  {
    id: 4,
    name: "Pulse Health",
    description: "Consumer health platform with clinician coaching",
    stage: "Seed",
    category: "Health",
    teamSize: "8",
    location: "New York, NY",
    logo: "💓",
    founder: "Eli Rivera",
    founded: "2023",
  },
  {
    id: 5,
    name: "Flux Finance",
    description: "Embedded finance tools for digital creators",
    stage: "Pre-Seed",
    category: "Fintech",
    teamSize: "5",
    location: "Austin, TX",
    logo: "⚡",
    founder: "Mina Patel",
    founded: "2024",
  },
  {
    id: 4,
    name: "Quantum Ventures",
    description: "Climate tech infrastructure platform",
    stage: "Series A",
    category: "Web3",
    teamSize: "15",
    location: "Boulder, CO",
    logo: "🔮",
    founder: "Noah Chen",
    founded: "2020",
  },
  {
    id: 5,
    name: "Orbit Commerce",
    description: "Web3-native e-commerce engine",
    stage: "Seed",
    category: "Web3",
    teamSize: "7",
    location: "Los Angeles, CA",
    logo: "🛸",
    founder: "Zara Clarke",
    founded: "2022",
  },
  {
    id: 6,
    name: "Luminous Labs",
    description: "ML infrastructure for enterprises",
    stage: "Series A",
    category: "AI",
    teamSize: "18",
    location: "Seattle, WA",
    logo: "✨",
    founder: "Omar Hassan",
    founded: "2019",
  },
];

export default function StartupsPage() {
  const [selectedStage, setSelectedStage] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStartups = MOCK_STARTUPS.filter((startup) => {
    const matchesSearch = startup.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStage = selectedStage === "All" || startup.stage === selectedStage;
    const matchesCategory =
      selectedCategory === "All" || startup.category === selectedCategory;
    return matchesSearch && matchesStage && matchesCategory;
  });

  return (
    <div className="flex-1 overflow-auto">
      <div className="space-y-8 p-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white">Startups</h1>
          <p className="mt-2 text-zinc-400">
            Discover the next generation of companies
          </p>
        </div>

        {/* Search */}
        <div>
          <input
            type="text"
            placeholder="Search startups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-indigo-400/50 focus:bg-black/60"
          />
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Stage
            </p>
            <div className="flex flex-wrap gap-2">
              {STAGES.map((stage) => (
                <button
                  key={stage}
                  onClick={() => setSelectedStage(stage)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    selectedStage === stage
                      ? "border-indigo-400/60 bg-indigo-500/15 text-white"
                      : "border border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Category
            </p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? "border-indigo-400/60 bg-indigo-500/15 text-white"
                      : "border border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Startups Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-2">
          {filteredStartups.map((startup) => (
            <div className="w-full" key={startup.id}>
              <StartupFlipCard startup={startup} />
            </div>
          ))}
        </div>

        {filteredStartups.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-12 text-center backdrop-blur-xl">
            <p className="text-zinc-400">
              No startups match your filters. Try adjusting your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
