import {
  appendDrawerParams,
  firstParam,
  type AdminDrawer,
  type RawSearchParams,
} from "@/features/admin-shell/lib/search-params";

import {
  findTeamPage,
  isTeamCategory,
  isValidPlacement,
  teamPages,
  type TeamCategory,
} from "../../config/placements";

export type TeamTab = "all" | TeamCategory;

export type TeamFilters = {
  tab: TeamTab;
  q: string;
  pageKey: string | null;
  sectionKey: string | null;
};

const MAX_QUERY_LENGTH = 100;

/** Normalizes untrusted URL params; unknown tab/page/section values are dropped. */
export function parseTeamFilters(params: RawSearchParams): TeamFilters {
  const rawTab = firstParam(params.tab);
  const tab: TeamTab = isTeamCategory(rawTab) ? rawTab : "all";

  const page = findTeamPage(firstParam(params.page));
  const pageInTab = page && (tab === "all" || page.category === tab) ? page : undefined;
  const rawSection = firstParam(params.section);

  return {
    tab,
    q: firstParam(params.q).slice(0, MAX_QUERY_LENGTH),
    pageKey: pageInTab?.key ?? null,
    sectionKey:
      pageInTab && isValidPlacement(pageInTab.key, rawSection) ? rawSection : null,
  };
}

export function buildTeamListHref(filters: Partial<TeamFilters>, drawer?: AdminDrawer): string {
  const params = new URLSearchParams();
  if (filters.tab && filters.tab !== "all") params.set("tab", filters.tab);
  if (filters.q) params.set("q", filters.q);
  if (filters.pageKey) params.set("page", filters.pageKey);
  if (filters.sectionKey) params.set("section", filters.sectionKey);
  appendDrawerParams(params, drawer);
  const query = params.toString();
  return query ? `/admin/team?${query}` : "/admin/team";
}

export function isTeamListPath(value: string): boolean {
  return /^\/admin\/team(\?[\w\-.~%&=+]*)?$/u.test(value);
}

export type OrderSection = { pageKey: string; sectionKey: string };

/**
 * The single page section whose display order the current list represents.
 * Search results and lists that mix several sections cannot be reordered.
 */
export function resolveOrderSection(filters: TeamFilters): OrderSection | null {
  if (filters.q) return null;
  if (filters.pageKey && filters.sectionKey) {
    return { pageKey: filters.pageKey, sectionKey: filters.sectionKey };
  }

  const pages = filters.pageKey
    ? teamPages.filter((page) => page.key === filters.pageKey)
    : filters.tab === "all"
      ? []
      : teamPages.filter((page) => page.category === filters.tab);
  const sections = pages.flatMap((page) =>
    page.sections.map((section) => ({ pageKey: page.key, sectionKey: section.key })),
  );
  return sections.length === 1 ? (sections[0] ?? null) : null;
}
