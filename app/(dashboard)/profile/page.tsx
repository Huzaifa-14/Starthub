"use client";

import { useEffect, useState } from "react";
import type { Profile } from "@/lib/database.types";
import { createClient } from "@/supabase/client";
import { MagneticButton } from "@/components/ui/glass";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();
      const { data: authData } = await supabase.auth.getUser();
      if (authData?.user?.email) {
        setEmail(authData.user.email);
      }

      if (authData?.user?.id) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", authData.user.id)
          .maybeSingle();

        if (profileData) {
          setProfile(profileData);
        }
      }
      setLoading(false);
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-zinc-400">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="space-y-8 p-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white">My Profile</h1>
          <p className="mt-2 text-zinc-400">Manage your Starthub identity and connections</p>
        </div>

        {/* Profile Info */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Main Profile Card */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
            <h2 className="mb-6 text-lg font-semibold text-white">Profile Information</h2>

            <div className="mb-8 flex items-center gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
                <span className="text-2xl font-bold text-white">
                  {profile?.full_name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{profile?.full_name || "Unknown"}</p>
                <p className="text-sm text-zinc-400">{email || "No email"}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-wider text-zinc-500">Role</p>
                <p className="mt-2 text-white">
                  {profile?.role
                    ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1)
                    : "Explorer"}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-wider text-zinc-500">Member Since</p>
                <p className="mt-2 text-white">
                  {profile?.created_at
                    ? new Date(profile.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Recently"}
                </p>
              </div>
            </div>

            <MagneticButton className="mt-6 w-full">
              Edit Profile
            </MagneticButton>
          </div>

          {/* Connections Card */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
            <h2 className="mb-6 text-lg font-semibold text-white">Your Activity</h2>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-wider text-zinc-500">Connections</p>
                <p className="mt-2 text-3xl font-bold text-white">14</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-wider text-zinc-500">Startups Viewed</p>
                <p className="mt-2 text-3xl font-bold text-white">28</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-wider text-zinc-500">Messages</p>
                <p className="mt-2 text-3xl font-bold text-white">12</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interests Section */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
          <h2 className="mb-4 text-lg font-semibold text-white">Your Interests</h2>
          <p className="mb-4 text-sm text-zinc-400">
            These help us recommend relevant founders, startups, and investors.
          </p>
          <div className="flex flex-wrap gap-3">
            {["AI", "B2B SaaS", "Fintech", "Climate", "Web3", "HealthTech"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-xs font-semibold text-indigo-200"
              >
                {tag}
              </span>
            ))}
          </div>
          <MagneticButton className="mt-6">
            Customize Interests
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
