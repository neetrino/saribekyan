export const clinicSectionSlugs = ["hospitals", "practical", "tour"] as const;
export const clinicFacilitySlugs = ["complex", "dental", "simulation"] as const;

export const clinicSlugs = [
  ...clinicSectionSlugs,
  ...clinicFacilitySlugs,
] as const;

export type ClinicSlug = (typeof clinicSlugs)[number];
export type ClinicFacilitySlug = (typeof clinicFacilitySlugs)[number];
export type ClinicNavKey = "overview" | "hospitals" | "practical" | "tour";

export function isClinicSlug(value: string): value is ClinicSlug {
  return (clinicSlugs as readonly string[]).includes(value);
}

export function isClinicFacilitySlug(
  value: string,
): value is ClinicFacilitySlug {
  return (clinicFacilitySlugs as readonly string[]).includes(value);
}

export const clinicNavHrefs: Array<{ key: ClinicNavKey; href: string }> = [
  { key: "overview", href: "/clinics" },
  { key: "hospitals", href: "/clinics/hospitals" },
  { key: "practical", href: "/clinics/practical" },
  { key: "tour", href: "/clinics/tour" },
];

export const clinicParentNav: Record<ClinicSlug, ClinicNavKey> = {
  hospitals: "hospitals",
  complex: "hospitals",
  dental: "hospitals",
  practical: "practical",
  simulation: "practical",
  tour: "tour",
};

export function getClinicNavHref(slug: ClinicSlug): string {
  const key = clinicParentNav[slug];
  const item = clinicNavHrefs.find((entry) => entry.key === key);
  return item?.href ?? "/clinics";
}

export const clinicHubCards = [
  {
    id: "hospitals",
    number: "01",
    href: "/clinics/hospitals",
    imageUrl: "/images/home/program-medicine.png",
  },
  {
    id: "practical",
    number: "02",
    href: "/clinics/practical",
    imageUrl: "/images/home/program-cpd.png",
  },
] as const;

export const hospitalFacilityCards = [
  {
    id: "complex",
    number: "01",
    href: "/clinics/complex",
    imageUrl: "/images/home/program-medicine.png",
  },
  {
    id: "dental",
    number: "02",
    href: "/clinics/dental",
    imageUrl: "/images/home/program-dentistry.png",
  },
] as const;

export const practicalFacilityCards = [
  {
    id: "simulation",
    number: "01",
    href: "/clinics/simulation",
    imageUrl: "/images/home/program-cpd.png",
  },
  {
    id: "dentalSim",
    number: "02",
    href: "/clinics/practical#dental-sim",
    imageUrl: "/images/home/program-dentistry.png",
  },
] as const;

export const hospitalDirectionIds = [
  "therapy",
  "surgery",
  "diagnostics",
  "dentistry",
  "emergency",
  "training",
] as const;

export const hospitalServiceIds = [
  "outpatient",
  "inpatient",
  "diagnostics",
  "dental",
  "prevention",
  "consultation",
] as const;

export const hospitalPracticeIds = [
  "bedside",
  "supervised",
  "cases",
  "rotations",
] as const;

export const hospitalEquipmentIds = [
  "imaging",
  "theatres",
  "icu",
  "lab",
  "dentalUnits",
  "sterile",
] as const;

export const hospitalSpecialistIds = [
  "director",
  "therapy",
  "surgery",
  "diagnostics",
  "dental",
  "coordinator",
] as const;

export const hospitalGalleryIds = ["g1", "g2", "g3"] as const;
export const hospitalVideoIds = ["v1", "v2"] as const;

export const practicalDentalSimIds = [
  "phantoms",
  "units",
  "supervision",
  "hygiene",
] as const;

export const practicalCourseIds = [
  "emergency",
  "clinical",
  "dental",
  "team",
] as const;

export const practicalSkillIds = [
  "procedures",
  "communication",
  "osce",
  "safety",
] as const;

export const practicalEquipmentIds = [
  "manikins",
  "virtual",
  "phantoms",
  "debrief",
] as const;

export const practicalGalleryIds = ["g1", "g2", "g3"] as const;
export const practicalVideoIds = ["v1", "v2"] as const;

export const facilityDirectionIds = {
  complex: ["therapy", "surgery", "diagnostics", "emergency"] as const,
  dental: ["therapy", "surgery", "orthodontics", "prevention"] as const,
  simulation: ["clinical", "dental", "emergency", "debrief"] as const,
};

export const facilityServiceIds = {
  complex: ["outpatient", "inpatient", "diagnostics", "consult"] as const,
  dental: ["treatment", "surgery", "imaging", "hygiene"] as const,
  simulation: ["skills", "osce", "team", "courses"] as const,
};

export const facilityPracticeIds = {
  complex: ["bedside", "procedures", "rounds"] as const,
  dental: ["chairside", "supervised", "cases"] as const,
  simulation: ["scenarios", "feedback", "repeat"] as const,
};

export const facilityEquipmentIds = {
  complex: ["imaging", "or", "icu", "lab"] as const,
  dental: ["units", "imaging", "sterile", "lab"] as const,
  simulation: ["manikins", "phantoms", "av", "virtual"] as const,
};

export const facilitySpecialistIds = {
  complex: ["director", "therapy", "surgery", "coordinator"] as const,
  dental: ["head", "surgeon", "therapist", "hygienist"] as const,
  simulation: ["head", "instructor", "dental", "technician"] as const,
};

export const facilityGalleryIds = ["g1", "g2", "g3"] as const;
export const facilityVideoIds = ["v1", "v2"] as const;

export const clinicGalleryImages = {
  hospitals: [
    "/images/home/program-medicine.png",
    "/images/home/hero-students.png",
    "/images/home/admissions.png",
  ],
  practical: [
    "/images/home/program-cpd.png",
    "/images/home/program-dentistry.png",
    "/images/home/hero-students.png",
  ],
  complex: [
    "/images/home/program-medicine.png",
    "/images/home/admissions.png",
    "/images/home/hero-students.png",
  ],
  dental: [
    "/images/home/program-dentistry.png",
    "/images/home/admissions.png",
    "/images/home/program-medicine.png",
  ],
  simulation: [
    "/images/home/program-cpd.png",
    "/images/home/hero-students.png",
    "/images/home/program-dentistry.png",
  ],
} as const;

export const tourPosterUrl = "/images/home/hero-students.png";
export const tourEmbedUrl: string | null = null;
