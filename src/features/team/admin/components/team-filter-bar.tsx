"use client";

import Link from "next/link";
import { useState } from "react";

import {
  adminInputClass,
  adminPrimaryButtonClass,
  adminSecondaryButtonClass,
} from "@/features/admin-shell/components/admin-field-styles";
import { useAdminI18n } from "@/features/admin-shell/i18n/admin-i18n-provider";

import { findTeamPage, teamPages } from "../../config/placements";
import { placementPageLabel, placementSectionLabel } from "../lib/placement-copy";
import { buildTeamListHref, type TeamFilters } from "../services/team-filters";

type TeamFilterBarProps = {
  filters: TeamFilters;
};

/** Search + page/section filter submitted as GET params, so filtered views are linkable. */
export function TeamFilterBar({ filters }: TeamFilterBarProps) {
  const { t } = useAdminI18n();
  const [pageKey, setPageKey] = useState(filters.pageKey ?? "");
  const pages = teamPages.filter((page) => filters.tab === "all" || page.category === filters.tab);
  const sections = findTeamPage(pageKey)?.sections ?? [];

  return (
    <form method="get" action="/admin/team" className="flex flex-wrap items-end gap-3">
      {filters.tab !== "all" ? <input type="hidden" name="tab" value={filters.tab} /> : null}
      <input
        type="search"
        name="q"
        defaultValue={filters.q}
        placeholder={t("team.searchPlaceholder")}
        aria-label={t("team.searchAria")}
        className={`${adminInputClass} min-w-64 flex-1`}
      />
      <select
        name="page"
        value={pageKey}
        onChange={(event) => setPageKey(event.target.value)}
        aria-label={t("team.filterPage")}
        className={`${adminInputClass} w-auto`}
      >
        <option value="">{t("team.allPages")}</option>
        {pages.map((page) => (
          <option key={page.key} value={page.key}>
            {placementPageLabel(t, page.key, page.label)}
          </option>
        ))}
      </select>
      <select
        key={pageKey}
        name="section"
        defaultValue={pageKey === filters.pageKey ? (filters.sectionKey ?? "") : ""}
        disabled={sections.length === 0}
        aria-label={t("team.filterSection")}
        className={`${adminInputClass} w-auto`}
      >
        <option value="">{t("team.allSections")}</option>
        {sections.map((section) => (
          <option key={section.key} value={section.key}>
            {placementSectionLabel(t, pageKey, section.key, section.label)}
          </option>
        ))}
      </select>
      <button type="submit" className={adminPrimaryButtonClass}>
        {t("team.apply")}
      </button>
      <Link href={buildTeamListHref({ tab: filters.tab })} className={adminSecondaryButtonClass}>
        {t("team.reset")}
      </Link>
    </form>
  );
}
