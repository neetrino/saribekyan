"use client";

import Link from "next/link";
import { useState } from "react";

import { AdminSearchField } from "@/features/admin-shell/components/admin-search-field";
import { AdminSelect } from "@/features/admin-shell/components/admin-select";
import { adminPrimaryButtonClass, adminSecondaryButtonClass } from "@/features/admin-shell/components/admin-field-styles";
import { useAdminI18n } from "@/features/admin-shell/i18n/admin-i18n-provider";

import { documentPages, findDocumentPage } from "../../config/placements";
import { documentPageLabel, documentSectionLabel } from "../lib/placement-copy";
import { buildDocumentListHref, type DocumentFilters } from "../services/document-filters";

type DocumentFilterBarProps = {
  filters: DocumentFilters;
  years: readonly number[];
};

/** Search + page/section/year filter submitted as GET params, so filtered views are linkable. */
export function DocumentFilterBar({ filters, years }: DocumentFilterBarProps) {
  const { t } = useAdminI18n();
  const [pageKey, setPageKey] = useState(filters.pageKey ?? "");
  const [sectionKey, setSectionKey] = useState(filters.sectionKey ?? "");
  const [year, setYear] = useState(filters.year === null ? "" : String(filters.year));
  const pages = documentPages.filter((page) => filters.tab === "all" || page.category === filters.tab);
  const sections = findDocumentPage(pageKey)?.sections ?? [];

  return (
    <form method="get" action="/admin/documents" className="flex flex-col gap-3">
      {filters.tab !== "all" ? <input type="hidden" name="tab" value={filters.tab} /> : null}
      <AdminSearchField
        name="q"
        defaultValue={filters.q}
        placeholder={t("documents.searchPlaceholder")}
        ariaLabel={t("documents.searchAria")}
      />
      <div className="flex w-full items-center gap-3">
      <AdminSelect
        name="page"
        value={pageKey}
        className="flex-[2]"
        ariaLabel={t("documents.filterPage")}
        onChange={(next) => {
          setPageKey(next);
          setSectionKey("");
        }}
        options={[
          { value: "", label: t("documents.allPages") },
          ...pages.map((page) => ({ value: page.key, label: documentPageLabel(t, page.key, page.label) })),
        ]}
      />
      <AdminSelect
        name="section"
        value={sections.some((section) => section.key === sectionKey) ? sectionKey : ""}
        disabled={sections.length === 0}
        ariaLabel={t("documents.filterSection")}
        onChange={setSectionKey}
        options={[
          { value: "", label: t("documents.allSections") },
          ...sections.map((section) => ({
            value: section.key,
            label: documentSectionLabel(t, pageKey, section.key, section.label),
          })),
        ]}
      />
      <AdminSelect
        name="year"
        value={year}
        className="w-36 shrink-0"
        ariaLabel={t("documents.filterYear")}
        onChange={setYear}
        options={[{ value: "", label: t("documents.allYears") }, ...years.map((item) => ({ value: String(item), label: String(item) }))]}
      />
      <button type="submit" className={`${adminPrimaryButtonClass} shrink-0`}>{t("documents.apply")}</button>
      <Link href={buildDocumentListHref({ tab: filters.tab })} className={`${adminSecondaryButtonClass} shrink-0`}>
        {t("documents.reset")}
      </Link>
      </div>
    </form>
  );
}
