import { messageOrFallback, type AdminT } from "@/features/admin-shell/i18n/translate";

import { findTeamPage } from "../../config/placements";

export function placementPageLabel(t: AdminT, pageKey: string, fallback: string): string {
  return messageOrFallback(t, `placements.pages.${pageKey}`, fallback);
}

export function placementSectionLabel(
  t: AdminT,
  pageKey: string,
  sectionKey: string,
  fallback: string,
): string {
  return messageOrFallback(t, `placements.sections.${pageKey}.${sectionKey}`, fallback);
}

export function placementCategoryLabel(t: AdminT, categoryKey: string, fallback: string): string {
  return messageOrFallback(t, `placements.categories.${categoryKey}`, fallback);
}

export function placementSummary(t: AdminT, pageKey: string, sectionKey: string): string {
  const page = findTeamPage(pageKey);
  const section = page?.sections.find((item) => item.key === sectionKey);
  if (!page || !section) return `${pageKey} / ${sectionKey}`;

  const pageLabel = placementPageLabel(t, page.key, page.label);
  const sectionLabel = placementSectionLabel(t, page.key, section.key, section.label);
  return `${pageLabel} · ${sectionLabel}`;
}
