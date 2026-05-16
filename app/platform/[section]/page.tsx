import { notFound } from "next/navigation";

import { DashboardContent } from "@/components/platform/DashboardContent";

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

export default function SectionPage({ params }: SectionPageProps) {
  const { section } = params;
  if (!validSections.has(section)) {
    notFound();
  }

  return (
    <DashboardContent
      section={section}
      sectionTitle={sectionTitles[section] ?? "Platform"}
    />
  );
}
