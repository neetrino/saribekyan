/**
 * Registry of site pages and sections that can display team members.
 * Adding a new page/section here makes it available in the admin panel;
 * the public page still has to render it via `getTeamPageMembers`.
 */

export const teamCategories = [
  { key: "about", label: "About Us" },
  { key: "education", label: "Education" },
  { key: "clinics", label: "Clinics" },
  { key: "science", label: "Science" },
] as const;

export type TeamCategory = (typeof teamCategories)[number]["key"];

type TeamSectionDef = {
  readonly key: string;
  readonly label: string;
};

type TeamPageDef = {
  readonly key: string;
  readonly category: TeamCategory;
  readonly label: string;
  /** Locale-less public path, used for cache revalidation. */
  readonly path: string;
  readonly sections: readonly TeamSectionDef[];
};

export const teamPages = [
  {
    key: "about-who-we-are",
    category: "about",
    label: "About Us → Who We Are",
    path: "/about/who-we-are",
    sections: [
      { key: "governance", label: "Board of Trustees" },
      { key: "academic-council", label: "Academic Council" },
      { key: "rectorate", label: "Rectorate" },
      { key: "leadership", label: "Leadership" },
    ],
  },
  {
    key: "about-quality",
    category: "about",
    label: "About Us → Quality Assurance",
    path: "/about/quality",
    sections: [{ key: "team", label: "Quality Assurance Staff" }],
  },
  {
    key: "about-hr",
    category: "about",
    label: "About Us → Structure → Human Resources",
    path: "/about/structure/hr",
    sections: [{ key: "staff", label: "Department Staff" }],
  },
  {
    key: "education-medicine",
    category: "education",
    label: "Education → Faculty of Medicine",
    path: "/education/medicine",
    sections: [{ key: "leadership", label: "Faculty Leadership" }],
  },
  {
    key: "education-dentistry",
    category: "education",
    label: "Education → Faculty of Dentistry",
    path: "/education/dentistry",
    sections: [{ key: "leadership", label: "Faculty Leadership" }],
  },
  {
    key: "clinics-hospitals",
    category: "clinics",
    label: "Clinics → Hospitals",
    path: "/clinics/hospitals",
    sections: [{ key: "specialists", label: "Medical Specialists" }],
  },
  {
    key: "clinics-complex",
    category: "clinics",
    label: "Clinics → Hospitals → Medical Complex",
    path: "/clinics/complex",
    sections: [{ key: "specialists", label: "Medical Specialists" }],
  },
  {
    key: "clinics-dental",
    category: "clinics",
    label: "Clinics → Hospitals → Dental Center",
    path: "/clinics/dental",
    sections: [{ key: "specialists", label: "Center Specialists" }],
  },
  {
    key: "clinics-simulation",
    category: "clinics",
    label: "Clinics → Practical Centers → Simulation Center",
    path: "/clinics/simulation",
    sections: [{ key: "specialists", label: "Center Specialists" }],
  },
  {
    key: "science",
    category: "science",
    label: "Science",
    path: "/science",
    sections: [{ key: "contacts", label: "Research Leads" }],
  },
] as const satisfies readonly TeamPageDef[];

type TeamPage = (typeof teamPages)[number];

export type TeamPageKey = TeamPage["key"];

export type TeamSectionKey<P extends TeamPageKey> = Extract<
  TeamPage,
  { key: P }
>["sections"][number]["key"];

export function findTeamPage(pageKey: string): TeamPageDef | undefined {
  return teamPages.find((page) => page.key === pageKey);
}

export function isTeamCategory(value: string): value is TeamCategory {
  return teamCategories.some((category) => category.key === value);
}

export function isValidPlacement(pageKey: string, sectionKey: string): boolean {
  const page = findTeamPage(pageKey);
  return page?.sections.some((section) => section.key === sectionKey) ?? false;
}

export function getPageKeysByCategory(category: TeamCategory): string[] {
  return teamPages
    .filter((page) => page.category === category)
    .map((page) => page.key);
}
