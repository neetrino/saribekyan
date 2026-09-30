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

export const eventIds = ["conference", "seminar", "symposium"] as const;

export const ugsFocusIds = ["research", "events", "mentoring"] as const;
