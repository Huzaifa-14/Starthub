import type { UserRole } from "@/lib/database.types";

export const USER_ROLES: { value: UserRole; label: string; hint: string }[] = [
  { value: "founder", label: "Founder", hint: "Ship and showcase your startup" },
  { value: "investor", label: "Investor", hint: "Discover and back exceptional teams" },
  { value: "explorer", label: "Explorer", hint: "Browse the ecosystem" },
  { value: "cofounder", label: "Co-founder", hint: "Match with builders on your wavelength" },
];

export function normalizeRole(raw: string | undefined): UserRole {
  if (raw === "founder" || raw === "investor" || raw === "explorer" || raw === "cofounder") {
    return raw;
  }
  return "explorer";
}

export function roleLabel(role: UserRole) {
  return USER_ROLES.find((r) => r.value === role)?.label ?? role;
}
