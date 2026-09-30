import { revalidatePath } from "next/cache";

import { locales } from "@/i18n/routing";

import { findDocumentPage } from "../../config/placements";

export const ADMIN_DOCUMENTS_PATH = "/admin/documents";

/** Invalidates the admin list and every public page (all locales and aliases) touched by a change. */
export function revalidateDocumentPages(pageKeys: Iterable<string>): void {
  for (const pageKey of new Set(pageKeys)) {
    for (const path of findDocumentPage(pageKey)?.paths ?? []) {
      for (const locale of locales) {
        revalidatePath(`/${locale}${path}`);
      }
    }
  }
  revalidatePath(ADMIN_DOCUMENTS_PATH);
}
