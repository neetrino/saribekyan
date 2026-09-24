export const admissionsHubCardMeta = [
  { id: "howToApply", number: "01", href: "/admissions/how-to-apply" },
  { id: "tuition", number: "02", href: "/admissions/tuition" },
  { id: "apply", number: "03", href: "/admissions/apply" },
] as const;

export type AdmissionsNavKey = "overview" | "howToApply" | "tuition" | "apply";

export const admissionsNavHrefs: Array<{
  key: AdmissionsNavKey;
  href: string;
}> = [
  { key: "overview", href: "/admissions" },
  { key: "howToApply", href: "/admissions/how-to-apply" },
  { key: "tuition", href: "/admissions/tuition" },
  { key: "apply", href: "/admissions/apply" },
];

export const howToApplyPathAliases = [
  "/admissions/documents",
  "/admissions/international",
] as const;

export const applicationStepIds = [
  "explore",
  "form",
  "documents",
  "assessment",
  "results",
  "enroll",
] as const;

export const requiredDocumentIds = [
  "application",
  "identity",
  "diploma",
  "transcript",
  "photos",
  "medical",
  "military",
] as const;

export const conditionIds = [
  "education",
  "competition",
  "language",
  "contract",
  "capacity",
] as const;

export const internationalRequirementIds = [
  "equivalence",
  "legalization",
  "translation",
  "passport",
  "insurance",
  "residence",
] as const;

export const regulationFiles = [
  {
    id: "admissions",
    href: "/documents/admissions/admissions-regulation.pdf",
    year: 2026,
  },
  {
    id: "tuition",
    href: "/documents/admissions/tuition-payment-rules.pdf",
    year: 2026,
  },
  {
    id: "internal",
    href: "/documents/admissions/internal-academic-rules.pdf",
    year: 2026,
  },
] as const;

export const deadlineIds = [
  "local",
  "international",
  "assessment",
  "results",
  "contract",
  "start",
] as const;

export const tuitionPrograms = [
  {
    id: "general-medicine",
    amountAmd: 1_200_000,
    billing: "year",
    from: false,
    imageUrl: "/images/home/program-medicine.png",
    href: "/education/medicine",
  },
  {
    id: "dentistry",
    amountAmd: 1_400_000,
    billing: "year",
    from: false,
    imageUrl: "/images/home/program-dentistry.png",
    href: "/education/dentistry",
  },
  {
    id: "cpd",
    amountAmd: 180_000,
    billing: "course",
    from: true,
    imageUrl: "/images/home/program-cpd.png",
    href: "/education/cpd",
  },
] as const;

export const paymentTermIds = [
  "annual",
  "installments",
  "enrollment",
  "late",
] as const;

export const paymentScheduleIds = ["first", "second"] as const;

export const paymentMethodIds = ["transfer", "cashier", "online"] as const;

export const applicationForms = [
  {
    id: "undergraduate",
    href: "/documents/admissions/undergraduate-application.pdf",
  },
  {
    id: "international",
    href: "/documents/admissions/international-application.pdf",
  },
  {
    id: "cpd",
    href: "/documents/admissions/cpd-application.pdf",
  },
] as const;
