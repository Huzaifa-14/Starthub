"use client";

import { MagneticButton } from "@/components/ui/glass";
import { useState } from "react";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="flex-1 overflow-auto">
      <div className="space-y-8 p-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white">Settings</h1>
          <p className="mt-2 text-zinc-400">Manage your account and preferences</p>
        </div>

        {/* Notifications */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
          <h2 className="mb-6 text-lg font-semibold text-white">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4">
              <div>
                <p className="font-semibold text-white">Email Notifications</p>
                <p className="text-xs text-zinc-400">
                  Receive updates about connections and matches
                </p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  emailNotifications ? "bg-indigo-500" : "bg-white/10"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                    emailNotifications ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
          <h2 className="mb-6 text-lg font-semibold text-white">Privacy</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4">
              <div>
                <p className="font-semibold text-white">Public Profile</p>
                <p className="text-xs text-zinc-400">
                  Allow others to discover your profile
                </p>
              </div>
              <button
                onClick={() => setPublicProfile(!publicProfile)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  publicProfile ? "bg-indigo-500" : "bg-white/10"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                    publicProfile ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
          <h2 className="mb-6 text-lg font-semibold text-white">Security</h2>
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">Password</p>
                  <p className="text-xs text-zinc-400">Last changed 3 months ago</p>
                </div>
                <MagneticButton>Change</MagneticButton>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4">
              <div>
                <p className="font-semibold text-white">Two-Factor Authentication</p>
                <p className="text-xs text-zinc-400">
                  Add extra protection to your account
                </p>
              </div>
              <button
                onClick={() => setTwoFactor(!twoFactor)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  twoFactor ? "bg-indigo-500" : "bg-white/10"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                    twoFactor ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8 backdrop-blur-xl">
          <h2 className="mb-4 text-lg font-semibold text-red-200">Danger Zone</h2>
          <p className="mb-6 text-sm text-zinc-400">
            These actions cannot be undone. Please proceed with caution.
          </p>
          <div className="space-y-3">
            <button className="w-full rounded-2xl border border-red-500/30 bg-red-500/5 px-4 py-2.5 text-sm font-semibold text-red-200 transition-all hover:bg-red-500/10">
              Reset Data
            </button>
            <button className="w-full rounded-2xl border border-red-500/30 bg-red-500/5 px-4 py-2.5 text-sm font-semibold text-red-200 transition-all hover:bg-red-500/10">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
