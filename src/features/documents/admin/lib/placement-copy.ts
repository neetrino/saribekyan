import { messageOrFallback, type AdminT } from "@/features/admin-shell/i18n/translate";

import { findDocumentPage } from "../../config/placements";

export function documentPageLabel(t: AdminT, pageKey: string, fallback: string): string {
  return messageOrFallback(t, `documents.placements.pages.${pageKey}`, fallback);
}

export function documentSectionLabel(t: AdminT, pageKey: string, sectionKey: string, fallback: string): string {
  return messageOrFallback(t, `documents.placements.sections.${pageKey}.${sectionKey}`, fallback);
}

export function documentCategoryLabel(t: AdminT, categoryKey: string, fallback: string): string {
  return messageOrFallback(t, `documents.placements.categories.${categoryKey}`, fallback);
}

export function documentPlacementSummary(t: AdminT, pageKey: string, sectionKey: string): string {
  const page = findDocumentPage(pageKey);
  const section = page?.sections.find((item) => item.key === sectionKey);
  if (!page || !section) return `${pageKey} / ${sectionKey}`;
  return `${documentPageLabel(t, page.key, page.label)} · ${documentSectionLabel(t, page.key, section.key, section.label)}`;
}