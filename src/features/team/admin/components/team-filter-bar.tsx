"use client";

import Link from "next/link";
import { useState } from "react";

import { AdminSearchField } from "@/features/admin-shell/components/admin-search-field";
import { AdminSelect } from "@/features/admin-shell/components/admin-select";
import { adminPrimaryButtonClass, adminSecondaryButtonClass } from "@/features/admin-shell/components/admin-field-styles";
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
  const [sectionKey, setSectionKey] = useState(filters.sectionKey ?? "");
  const pages = teamPages.filter((page) => filters.tab === "all" || page.category === filters.tab);
  const sections = findTeamPage(pageKey)?.sections ?? [];

  return (
    <form method="get" action="/admin/team" className="flex flex-col gap-3">
      {filters.tab !== "all" ? <input type="hidden" name="tab" value={filters.tab} /> : null}
      <AdminSearchField
        name="q"
        defaultValue={filters.q}
        placeholder={t("team.searchPlaceholder")}
        ariaLabel={t("team.searchAria")}
      />
      <div className="flex w-full items-center gap-3">
      <AdminSelect
        name="page"
        value={pageKey}
        ariaLabel={t("team.filterPage")}
        onChange={(next) => {
          setPageKey(next);
          setSectionKey("");
        }}
        options={[
          { value: "", label: t("team.allPages") },
          ...pages.map((page) => ({ value: page.key, label: placementPageLabel(t, page.key, page.label) })),
        ]}
      />
      <AdminSelect
        name="section"
        value={sections.some((section) => section.key === sectionKey) ? sectionKey : ""}
        disabled={sections.length === 0}
        ariaLabel={t("team.filterSection")}
        onChange={setSectionKey}
        options={[
          { value: "", label: t("team.allSections") },
          ...sections.map((section) => ({
            value: section.key,
            label: placementSectionLabel(t, pageKey, section.key, section.label),
          })),
        ]}
      />
      <button type="submit" className={`${adminPrimaryButtonClass} shrink-0`}>
        {t("team.apply")}
      </button>
      <Link href={buildTeamListHref({ tab: filters.tab })} className={`${adminSecondaryButtonClass} shrink-0`}>
        {t("team.reset")}
      </Link>
      </div>
    </form>
  );
}
