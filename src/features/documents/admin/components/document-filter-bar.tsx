"use client";

import Link from "next/link";
import { useState } from "react";

import {
  adminInputClass,
  adminPrimaryButtonClass,
  adminSecondaryButtonClass,
} from "@/features/admin-shell/components/admin-field-styles";
import { useAdminI18n } from "@/features/admin-shell/i18n/admin-i18n-provider";

import { documentPages, findDocumentPage } from "../../config/placements";
import { documentPageLabel, documentSectionLabel } from "../lib/placement-copy";
import { buildDocumentListHref, type DocumentFilters } from "../services/document-filters";

type DocumentFilterBarProps = {
  filters: DocumentFilters;
  years: readonly number[];
};

const selectClass = `${adminInputClass} w-auto`;

/** Search + page/section/year filter submitted as GET params, so filtered views are linkable. */
export function DocumentFilterBar({ filters, years }: DocumentFilterBarProps) {
  const { t } = useAdminI18n();
  const [pageKey, setPageKey] = useState(filters.pageKey ?? "");
  const pages = documentPages.filter((page) => filters.tab === "all" || page.category === filters.tab);
  const sections = findDocumentPage(pageKey)?.sections ?? [];

  return (
    <form method="get" action="/admin/documents" className="flex flex-wrap items-end gap-3">
      {filters.tab !== "all" ? <input type="hidden" name="tab" value={filters.tab} /> : null}
      <input
        type="search"
        name="q"
        defaultValue={filters.q}
        placeholder={t("documents.searchPlaceholder")}
        aria-label={t("documents.searchAria")}
        className={`${adminInputClass} min-w-64 flex-1`}
      />
      <select name="page" value={pageKey} onChange={(event) => setPageKey(event.target.value)} aria-label={t("documents.filterPage")} className={selectClass}>
        <option value="">{t("documents.allPages")}</option>
        {pages.map((page) => (
          <option key={page.key} value={page.key}>{documentPageLabel(t, page.key, page.label)}</option>
        ))}
      </select>
      <select
        key={pageKey}
        name="section"
        defaultValue={pageKey === filters.pageKey ? (filters.sectionKey ?? "") : ""}
        disabled={sections.length === 0}
        aria-label={t("documents.filterSection")}
        className={selectClass}
      >
        <option value="">{t("documents.allSections")}</option>
        {sections.map((section) => (
          <option key={section.key} value={section.key}>{documentSectionLabel(t, pageKey, section.key, section.label)}</option>
        ))}
      </select>
      <select name="year" defaultValue={filters.year ?? ""} aria-label={t("documents.filterYear")} className={selectClass}>
        <option value="">{t("documents.allYears")}</option>
        {years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <button type="submit" className={adminPrimaryButtonClass}>{t("documents.apply")}</button>
      <Link href={buildDocumentListHref({ tab: filters.tab })} className={adminSecondaryButtonClass}>
        {t("documents.reset")}
      </Link>
    </form>
  );
}
