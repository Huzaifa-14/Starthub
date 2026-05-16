"use client";

import { MagneticButton } from "@/components/ui/glass";
import { useState } from "react";

const MOCK_FOUNDERS = [
  {
    id: 1,
    name: "Manas Kumar Verma",
    role: "Founder · Tensor School",
    startup: "Tensor School",
    tags: ["EdTech", "CP", "Mentorship"],
    initials: "📘",
    bio: "India's top 15 competitive programmer and founder of Tensor School.",
  },
  {
    id: 2,
    name: "Swapnil Daga",
    role: "Co-founder & COO",
    startup: "AlgoUniversity",
    tags: ["EdTech", "CS", "Execution"],
    initials: "🧠",
    bio: "Leads academics at TensorSchool / AlgoUniversity and mentors strong CS careers.",
  },
  {
    id: 3,
    name: "Naman Jain",
    role: "Tech & Business Mentor",
    startup: "AlgoUniversity",
    tags: ["Product", "Mentorship", "Global"],
    initials: "💼",
    bio: "Brings global tech exposure with CS, product thinking, and business acumen.",
  },
  {
    id: 4,
    name: "Sarigama Yerra",
    role: "Brand & Growth Mentor",
    startup: "AlgoUniversity",
    tags: ["Growth", "Brand", "Storytelling"],
    initials: "🎨",
    bio: "Works on growth, branding, storytelling, and making ideas clear and presentable.",
  },
  {
    id: 5,
    name: "Priya Rajesh",
    role: "CEO & Co-Founder",
    startup: "Nebula Labs",
    tags: ["AI", "B2B", "SaaS"],
    initials: "PR",
  },
  {
    id: 6,
    name: "Marco Torelli",
    role: "Founder & Engineer",
    startup: "Pulse Health",
    tags: ["HealthTech", "B2C", "Mobile"],
    initials: "MT",
  },
  {
    id: 7,
    name: "Janelle Smith",
    role: "Chief Growth Officer",
    startup: "Flux Finance",
    tags: ["Fintech", "B2B2C", "API"],
    initials: "JS",
  },
  {
    id: 8,
    name: "Alex Chen",
    role: "Co-Founder & CTO",
    startup: "Luminous Labs",
    tags: ["ML", "Enterprise", "Infrastructure"],
    initials: "AC",
  },
  {
    id: 9,
    name: "Sofia Hernandez",
    role: "CEO",
    startup: "Quantum Ventures",
    tags: ["Climate", "DeepTech", "Hardware"],
    initials: "SH",
  },
  {
    id: 10,
    name: "David Okonkwo",
    role: "Founder",
    startup: "Orbit Commerce",
    tags: ["Web3", "E-commerce", "Blockchain"],
    initials: "DO",
  },
];

export default function FoundersPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFounders = MOCK_FOUNDERS.filter((founder) => {
    const matchesSearch = 
      founder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      founder.startup.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => founder.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const allTags = Array.from(
    new Set(MOCK_FOUNDERS.flatMap((f) => f.tags))
  ).sort();

  return (
    <div className="flex-1 overflow-auto">
      <div className="space-y-8 p-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white">Founders</h1>
          <p className="mt-2 text-zinc-400">Connect with builders shaping the future</p>
        </div>

        {/* Search */}
        <div>
          <input
            type="text"
            placeholder="Search founders or companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-indigo-400/50 focus:bg-black/60"
          />
        </div>

        {/* Tags Filter */}
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() =>
                setSelectedTags((prev) =>
                  prev.includes(tag)
                    ? prev.filter((t) => t !== tag)
                    : [...prev, tag]
                )
              }
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                selectedTags.includes(tag)
                  ? "border-indigo-400/60 bg-indigo-500/15 text-white"
                  : "border border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFounders.map((founder) => (
            <div
              key={founder.id}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all hover:bg-white/[0.06]"
            >
              {/* Avatar */}
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl">
                  <span>{founder.initials}</span>
                </div>
                <div>
                  <p className="font-semibold text-white">{founder.name}</p>
                  <p className="text-xs text-zinc-400">{founder.role}</p>
                </div>
              </div>

              <p className="mb-3 text-sm text-indigo-300">{founder.startup}</p>

              {founder.bio ? (
                <p className="mb-4 text-sm leading-6 text-zinc-400">{founder.bio}</p>
              ) : null}

              <div className="mb-4 flex flex-wrap gap-2">
                {founder.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <MagneticButton className="w-full">
                Connect
              </MagneticButton>
            </div>
          ))}
        </div>

        {filteredFounders.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-12 text-center backdrop-blur-xl">
            <p className="text-zinc-400">No founders match your filters. Try adjusting your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
