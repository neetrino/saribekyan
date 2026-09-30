import { revalidatePath } from "next/cache";

import { locales } from "@/i18n/routing";

import { findTeamPage } from "../../config/placements";

export const ADMIN_TEAM_PATH = "/admin/team";

/** Invalidates the admin list and every public page (all locales) touched by a change. */
export function revalidateTeamPages(pageKeys: Iterable<string>): void {
  for (const pageKey of new Set(pageKeys)) {
    const page = findTeamPage(pageKey);
    if (!page) {
      continue;
    }
    for (const locale of locales) {
      revalidatePath(`/${locale}${page.path}`);
    }
  }
  revalidatePath(ADMIN_TEAM_PATH);
}
