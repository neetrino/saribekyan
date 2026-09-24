export const educationSlugs = ["medicine", "dentistry", "cpd"] as const;

export type EducationSlug = (typeof educationSlugs)[number];

export function isEducationSlug(value: string): value is EducationSlug {
  return (educationSlugs as readonly string[]).includes(value);
}

export type EducationNavKey = "overview" | EducationSlug;

export const educationNavHrefs: Array<{ key: EducationNavKey; href: string }> =
  [
    { key: "overview", href: "/education" },
    { key: "medicine", href: "/education/medicine" },
    { key: "dentistry", href: "/education/dentistry" },
    { key: "cpd", href: "/education/cpd" },
  ];

export type EducationSectionId =
  | "about"
  | "program"
  | "leadership"
  | "departments"
  | "programs"
  | "residency"
  | "specialties"
  | "admission"
  | "courses"
  | "schedule";

export const educationPageSections: Record<
  EducationSlug,
  readonly EducationSectionId[]
> = {
  medicine: ["about", "program", "leadership", "departments"],
  dentistry: ["about", "program", "leadership", "departments"],
  cpd: [
    "about",
    "programs",
    "residency",
    "specialties",
    "admission",
    "courses",
    "schedule",
  ],
};

export const educationHeaderNav = [
  {
    key: "medicine" as const,
    href: "/education/medicine",
    sectionIds: educationPageSections.medicine,
  },
  {
    key: "dentistry" as const,
    href: "/education/dentistry",
    sectionIds: educationPageSections.dentistry,
  },
  {
    key: "cpd" as const,
    href: "/education/cpd",
    sectionIds: educationPageSections.cpd,
  },
];

export const educationHubCards = [
  {
    id: "medicine",
    number: "01",
    href: "/education/medicine",
    imageUrl: "/images/home/program-medicine.png",
  },
  {
    id: "dentistry",
    number: "02",
    href: "/education/dentistry",
    imageUrl: "/images/home/program-dentistry.png",
  },
  {
    id: "cpd",
    number: "03",
    href: "/education/cpd",
    imageUrl: "/images/home/program-cpd.png",
  },
] as const;

export const medicineDepartmentIds = [
  "humanities",
  "natural",
  "biomedical",
  "therapy",
  "surgery",
  "other",
] as const;

export const dentistryDepartmentIds = ["stomatology"] as const;

export const medicineLeadershipIds = ["dean", "viceDean", "methodist"] as const;

export const dentistryLeadershipIds = ["dean", "viceDean"] as const;

export const cpdProgramIds = ["residency", "cpd"] as const;

export const cpdSpecialtyIds = [
  "therapy",
  "surgery",
  "pediatrics",
  "obstetrics",
  "anesthesiology",
  "dentistry",
] as const;

export const cpdAdmissionIds = ["diploma", "documents", "selection"] as const;

export const cpdCourseIds = ["emergency", "diagnostics", "infection"] as const;

export const cpdScheduleRowIds = ["r1", "r2", "r3"] as const;
