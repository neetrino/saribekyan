export const scienceSectionIds = [
  "overview",
  "research",
  "projects",
  "publications",
  "events",
  "ugs",
  "reports",
  "contacts",
] as const;

export type ScienceSectionId = (typeof scienceSectionIds)[number];

export const researchDirectionIds = [
  "biomedical",
  "clinical",
  "publicHealth",
  "educationScience",
] as const;

export const projectMeta = [
  { id: "cardio", status: "current" as const },
  { id: "oral", status: "current" as const },
  { id: "infection", status: "completed" as const },
  { id: "simulation", status: "completed" as const },
] as const;

export const publicationMeta = [
  { id: "pub1", year: 2026, href: "#" },
  { id: "pub2", year: 2025, href: "#" },
  { id: "pub3", year: 2025, href: "#" },
  { id: "pub4", year: 2024, href: "#" },
] as const;

export const eventIds = ["conference", "seminar", "symposium"] as const;

export const ugsFocusIds = ["research", "events", "mentoring"] as const;

export const reportMeta = [
  { id: "annual2025", year: 2025, href: "#" },
  { id: "annual2024", year: 2024, href: "#" },
  { id: "plan2026", year: 2026, href: "#" },
] as const;

export const contactIds = ["viceRector", "scienceHead", "ugsCoordinator"] as const;

export const documentYears = [2026, 2025, 2024] as const;
