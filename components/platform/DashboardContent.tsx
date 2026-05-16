"use client";

import type { Profile } from "@/lib/database.types";

type DashboardContentProps = {
  profile?: Profile | null;
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
        <div>
          <h1 className="text-4xl font-bold text-white">{title}</h1>
          <p className="mt-2 text-zinc-400">{subtitle}</p>
        </div>

        {section === "dashboard" && (
          <>
            <div className="grid grid-cols-4 gap-4">
              <StatCard number="14" label="Connections" />
              <StatCard number="28" label="Startups Viewed" />
              <StatCard number="6" label="Investors Active" />
              <StatCard number="12" label="Messages" />
            </div>
            <div className="grid grid-cols-3 gap-6">
              <PanelCard title="Recent Activity" icon="📋">
                <p className="text-sm text-zinc-400">
                  No activity yet. Explore founders, startups, and investors to get started.
                </p>
              </PanelCard>
              <PanelCard title="Suggested Matches" icon="✨">
                <p className="text-sm text-zinc-400">
                  Personalized opportunities will appear here once you begin your discovery.
                </p>
              </PanelCard>
            </div>
          </>
        )}

        {section === "founders" && (
          <SectionCards
            title="Founder Matches"
            subtitle="Connect with founders who are looking for partners, funding, and mentorship."
            items={[
              {
                label: "Priya R.",
                description: "AI product strategist building a next-gen startup studio.",
              },
              {
                label: "Marco T.",
                description: "Serial founder focused on climate-tech and enterprise SaaS.",
              },
              {
                label: "Janelle S.",
                description: "Growth lead with a strong investor network in fintech.",
              },
            ]}
          />
        )}

        {section === "startups" && (
          <SectionCards
            title="Startups"
            subtitle="Browse emerging companies that match your interests and goals."
            items={[
              {
                label: "Nebula Labs",
                description: "AI-enabled supply chain automation for mid-market retailers.",
              },
              {
                label: "Pulse Health",
                description: "Consumer health platform with on-demand clinician coaching.",
              },
              {
                label: "Flux Finance",
                description: "Embedded finance tools for global digital creators.",
              },
            ]}
          />
        )}

        {section === "investors" && (
          <SectionCards
            title="Investors"
            subtitle="View investor profiles and reach out to those funding your industry."
            items={[
              {
                label: "Crescent Capital",
                description: "Early-stage deep tech fund focused on AI and climate.",
              },
              {
                label: "Nova Ventures",
                description: "Seed-stage investor for B2B SaaS founders.",
              },
              {
                label: "Luminous Fund",
                description: "Strategic investor supporting marketplace businesses.",
              },
            ]}
          />
        )}

        {section === "profile" && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <h2 className="mb-4 text-lg font-semibold text-white">Your Profile</h2>
              <dl className="space-y-4 text-sm text-zinc-300">
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Name
                  </dt>
                  <dd className="mt-1 text-white">{profile?.full_name ?? "Unknown"}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Email
                  </dt>
                  <dd className="mt-1 text-white">{profile?.email ?? "Unknown"}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Role
                  </dt>
                  <dd className="mt-1 text-white">{profile?.role ?? "Explorer"}</dd>
                </div>
              </dl>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <h2 className="mb-4 text-lg font-semibold text-white">Account settings</h2>
              <p className="text-sm text-zinc-400">
                Manage your membership, onboarding preferences, and profile visibility.
              </p>
            </div>
          </div>
        )}

        {section === "settings" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <h2 className="mb-4 text-lg font-semibold text-white">Platform settings</h2>
              <div className="grid gap-4 text-sm text-zinc-300">
                <SettingItem label="Email notifications" value="Enabled" />
                <SettingItem label="Public profile" value="Visible" />
                <SettingItem label="Two-factor auth" value="Off" />
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <h2 className="mb-4 text-lg font-semibold text-white">Security</h2>
              <p className="text-sm text-zinc-400">
                Update your password, manage sessions, and keep your account secure.
              </p>
            </div>
          </div>
        )}
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

function PanelCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
        <span>{icon}</span> {title}
      </h2>
      <div className="text-sm text-zinc-400">{children}</div>
    </div>
  );
}

function SectionCards({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: Array<{ label: string; description: string }>;
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-sm text-zinc-300 backdrop-blur-xl"
          >
            <p className="font-semibold text-white">{item.label}</p>
            <p className="mt-2 text-zinc-400">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
      <p className="text-sm text-zinc-300">{label}</p>
      <p className="mt-2 text-white">{value}</p>
    </div>
  );
}
