import { notFound, redirect } from "next/navigation";

import { createClient } from "@/supabase/server";
import { DashboardSidebar } from "@/components/platform/DashboardSidebar";
import { DashboardContent } from "@/components/platform/DashboardContent";
import type { Profile } from "@/lib/database.types";

export const dynamic = "force-dynamic";

type ClaimsShape = {
  sub?: string;
  email?: string;
  user_metadata?: { role?: string; full_name?: string };
};

const validSections = new Set([
  "founders",
  "startups",
  "investors",
  "profile",
  "settings",
]);

const sectionTitles: Record<string, string> = {
  founders: "Founders",
  startups: "Startups",
  investors: "Investors",
  profile: "My Profile",
  settings: "Settings",
};

type SectionPageProps = {
  params: {
    section: string;
  };
};

export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = params;
  if (!validSections.has(section)) {
    notFound();
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims?.sub) {
    redirect("/login");
  }

  const claims = data.claims as ClaimsShape;
  const userId = claims.sub as string;
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  const email =
    (typeof claims.email === "string" ? claims.email : null) ??
    profile?.email ??
    null;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-zinc-100">
      <DashboardSidebar profile={profile} userEmail={email} />
      <div className="flex flex-1 flex-col overflow-hidden pl-56">
        <DashboardContent
          profile={profile}
          section={section}
          sectionTitle={sectionTitles[section] ?? "Platform"}
        />
      </div>
    </div>
  );
}
