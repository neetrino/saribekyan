import {
  appendDrawerParams,
  firstParam,
  type AdminDrawer,
  type RawSearchParams,
} from "@/features/admin-shell/lib/search-params";

import {
  documentPages,
  findDocumentPage,
  findDocumentSection,
  isDocumentCategory,
  type DocumentCategory,
} from "../../config/placements";
import { documentYearSchema } from "../schemas/document-schema";

export type DocumentTab = "all" | DocumentCategory;

export type DocumentFilters = {
  tab: DocumentTab;
  q: string;
  pageKey: string | null;
  sectionKey: string | null;
  year: number | null;
};

const MAX_QUERY_LENGTH = 100;

/** Normalizes untrusted URL params; unknown tab/page/section/year values are dropped. */
export function parseDocumentFilters(params: RawSearchParams): DocumentFilters {
  const rawTab = firstParam(params.tab);
  const tab: DocumentTab = isDocumentCategory(rawTab) ? rawTab : "all";

  const page = findDocumentPage(firstParam(params.page));
  const pageInTab = page && (tab === "all" || page.category === tab) ? page : undefined;
  const rawSection = firstParam(params.section);
  const year = documentYearSchema.safeParse(firstParam(params.year) || undefined);

  return {
    tab,
    q: firstParam(params.q).slice(0, MAX_QUERY_LENGTH),
    pageKey: pageInTab?.key ?? null,
    sectionKey: pageInTab && findDocumentSection(pageInTab.key, rawSection) ? rawSection : null,
    year: year.success ? year.data : null,
  };
}

export function buildDocumentListHref(filters: Partial<DocumentFilters>, drawer?: AdminDrawer): string {
  const params = new URLSearchParams();
  if (filters.tab && filters.tab !== "all") params.set("tab", filters.tab);
  if (filters.q) params.set("q", filters.q);
  if (filters.pageKey) params.set("page", filters.pageKey);
  if (filters.sectionKey) params.set("section", filters.sectionKey);
  if (filters.year) params.set("year", String(filters.year));
  appendDrawerParams(params, drawer);
  const query = params.toString();
  return query ? `/admin/documents?${query}` : "/admin/documents";
}

export function isDocumentListPath(value: string): boolean {
  return /^\/admin\/documents(\?[\w\-.~%&=+]*)?$/u.test(value);
}

export type FilterSection = { pageKey: string; sectionKey: string; groupByYear: boolean };

/** The single page section the current filters narrow the list to, if any. */
export function resolveFilterSection(filters: DocumentFilters): FilterSection | null {
  const pages = filters.pageKey
    ? documentPages.filter((page) => page.key === filters.pageKey)
    : filters.tab === "all"
      ? []
      : documentPages.filter((page) => page.category === filters.tab);
  const sections = pages.flatMap((page) =>
    page.sections
      .filter((section) => !filters.sectionKey || section.key === filters.sectionKey)
      .map((section) => ({ pageKey: page.key, sectionKey: section.key, groupByYear: section.groupByYear })),
  );
  return sections.length === 1 ? (sections[0] ?? null) : null;
}

/** Section (and year for year-grouped sections) whose display order the current list represents. */
export type DocumentOrder = { pageKey: string; sectionKey: string; year: number | null };

/**
 * Lists can be reordered only when they are exactly one ordered group on the site:
 * one section, and for year-grouped sections one year. Search results cannot be reordered.
 */
export function resolveDocumentOrder(filters: DocumentFilters): DocumentOrder | null {
  const section = resolveFilterSection(filters);
  if (!section || filters.q) return null;
  if (section.groupByYear !== (filters.year !== null)) return null;
  return { pageKey: section.pageKey, sectionKey: section.sectionKey, year: filters.year };
}
