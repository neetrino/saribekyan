import type { PlacementPageDef, PlacementSectionDef } from "@/features/admin-shell/lib/placement-registry";

/**
 * Registry of site pages and sections that list PDF documents.
 * Adding a page/section here makes it available in the admin panel;
 * the public page still has to render it via `getPageDocuments`.
 */

export const documentCategories = [
  { key: "about", label: "About Us" },
  { key: "admissions", label: "Admissions" },
  { key: "science", label: "Science" },
] as const;

export type DocumentCategory = (typeof documentCategories)[number]["key"];

type DocumentSectionDef = PlacementSectionDef & {
  /** Section is shown with year filters: newest year first, admin order applies within a year. */
  readonly groupByYear: boolean;
};

type DocumentPageDef = Omit<PlacementPageDef, "sections"> & {
  readonly category: DocumentCategory;
  /** Locale-less public paths rendering this page, used for cache revalidation. */
  readonly paths: readonly string[];
  readonly sections: readonly DocumentSectionDef[];
};

export const documentPages = [
  {
    key: "about-quality",
    category: "about",
    label: "About Us → Quality Assurance",
    paths: ["/about/quality"],
    sections: [{ key: "reports", label: "Reports, Plans and Documents", groupByYear: true }],
  },
  {
    key: "about-hr",
    category: "about",
    label: "About Us → Structure → Human Resources",
    paths: ["/about/structure/hr"],
    sections: [{ key: "documents", label: "Documents", groupByYear: false }],
  },
  {
    key: "about-accounting",
    category: "about",
    label: "About Us → Structure → Accounting",
    paths: ["/about/structure/accounting"],
    sections: [{ key: "financial", label: "Financial Reports and Documents", groupByYear: true }],
  },
  {
    key: "admissions-how-to-apply",
    category: "admissions",
    label: "Admissions → How to Apply",
    paths: ["/admissions/how-to-apply", "/admissions/documents", "/admissions/international"],
    sections: [{ key: "regulations", label: "Regulatory Documents", groupByYear: false }],
  },
  {
    key: "admissions-apply",
    category: "admissions",
    label: "Admissions → Application",
    paths: ["/admissions/apply"],
    sections: [{ key: "forms", label: "Application Forms", groupByYear: false }],
  },
  {
    key: "science",
    category: "science",
    label: "Science",
    paths: ["/science"],
    sections: [
      { key: "publications", label: "Scientific Publications", groupByYear: true },
      { key: "reports", label: "Reports", groupByYear: true },
    ],
  },
] as const satisfies readonly DocumentPageDef[];

type DocumentPage = (typeof documentPages)[number];

export type DocumentPageKey = DocumentPage["key"];

export type DocumentSectionKey<P extends DocumentPageKey> = Extract<
  DocumentPage,
  { key: P }
>["sections"][number]["key"];

export function findDocumentPage(pageKey: string): DocumentPageDef | undefined {
  return documentPages.find((page) => page.key === pageKey);
}

export function findDocumentSection(pageKey: string, sectionKey: string): DocumentSectionDef | undefined {
  return findDocumentPage(pageKey)?.sections.find((section) => section.key === sectionKey);
}

export function isDocumentCategory(value: string): value is DocumentCategory {
  return documentCategories.some((category) => category.key === value);
}

export function isValidDocumentPlacement(pageKey: string, sectionKey: string): boolean {
  return findDocumentSection(pageKey, sectionKey) !== undefined;
}

export function getDocumentPageKeysByCategory(category: DocumentCategory): string[] {
  return documentPages.filter((page) => page.category === category).map((page) => page.key);
}
