"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import type { Profile } from "@/lib/database.types";
import { createClient } from "@/supabase/client";
import { MagneticButton } from "@/components/ui/glass";

type DashboardSidebarProps = {
  profile: Profile | null;
  userEmail: string | null;
};

export function DashboardSidebar({ profile, userEmail }: DashboardSidebarProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const roleDisplay = profile?.role
    ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1)
    : "User";

  return (
    <div className="fixed left-0 top-0 h-full w-56 border-r border-white/10 bg-white/[0.02] backdrop-blur-xl">
      {/* Logo */}
      <div className="border-b border-white/10 px-6 py-6">
        <p className="text-sm font-semibold text-white">LaunchOS</p>
      </div>

      {/* Role Badge */}
      <div className="px-6 py-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5">
          <span className="text-xs font-semibold text-indigo-300">⚡ {roleDisplay}</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="space-y-1 px-4 py-6">
        <p className="px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Main</p>
        <NavLink href="/platform" icon="📊" label="Dashboard" />
        <NavLink href="/platform/founders" icon="👥" label="Founders" />
        <NavLink href="/platform/startups" icon="🚀" label="Startups" />
        <NavLink href="/platform/investors" icon="💰" label="Investors" />
      </div>

      {/* Account Section */}
      <div className="space-y-1 border-t border-white/10 px-4 py-6">
        <p className="px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Account</p>
        <NavLink href="/platform/profile" icon="👤" label="My Profile" />
        <NavLink href="/platform/settings" icon="⚙️" label="Settings" />
      </div>

      {/* User Footer */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-white/[0.02] p-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
            <span className="text-xs font-bold text-white">
              {profile?.full_name?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-white">
              {profile?.full_name || "User"}
            </p>
            <p className="truncate text-xs text-zinc-400">Free plan</p>
          </div>
        </div>
        <MagneticButton
          onClick={handleSignOut}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Signing out..." : "Sign out"}
        </MagneticButton>
      </div>
    </div>
  );
}

function NavLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition-all hover:bg-white/5 hover:text-white"
    >
      <span className="text-base">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
