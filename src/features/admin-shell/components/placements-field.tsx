"use client";

import { useState } from "react";

import { useAdminI18n } from "../i18n/admin-i18n-provider";
import { sectionCountKey, type PlacementDraft, type PlacementPageDef } from "../lib/placement-registry";
import {
  createPlacementRow,
  emptyPlacementRow,
  placementRowsPayload,
  toPlacementRows,
  togglePlacementPage,
  togglePlacementSection,
  type PlacementRow,
} from "../lib/placement-rows";
import { adminInputClass, adminSecondaryButtonClass } from "./admin-field-styles";
import { CheckboxSelect, type CheckboxOption } from "./checkbox-select";
import { fieldErrorAttr } from "./use-scroll-to-first-error";

type PlacementsFieldProps = {
  pages: readonly PlacementPageDef[];
  pageLabel: (page: PlacementPageDef) => string;
  sectionLabel: (pageKey: string, section: PlacementPageDef["sections"][number]) => string;
  initial: PlacementDraft[];
  sectionCounts: Record<string, number>;
  error?: string;
  /** When false, rows cannot be added and at least one row is always kept. */
  multipleRows?: boolean;
};

/**
 * Edits where an entry is shown. Each row picks one or more pages and sections (checkbox
 * dropdowns) with a display order; the result is submitted as JSON in the hidden `placements` input.
 */
export function PlacementsField({
  pages,
  pageLabel,
  sectionLabel,
  initial,
  sectionCounts,
  error,
  multipleRows = true,
}: PlacementsFieldProps) {
  const { t } = useAdminI18n();
  const [rows, setRows] = useState<PlacementRow[]>(() => {
    const stored = toPlacementRows(initial);
    return multipleRows || stored.length > 0 ? stored : [emptyPlacementRow()];
  });
  const canRemove = multipleRows || rows.length > 1;

  const update = (uid: string, change: (row: PlacementRow) => PlacementRow) =>
    setRows((current) => current.map((row) => (row.uid === uid ? change(row) : row)));

  const pageOptions: CheckboxOption[] = pages.map((page) => ({ value: page.key, label: pageLabel(page) }));

  const sectionOptions = (row: PlacementRow): CheckboxOption[] =>
    row.pageKeys.flatMap((pageKey) => {
      const page = pages.find((item) => item.key === pageKey);
      if (!page) return [];
      const group = row.pageKeys.length > 1 ? pageLabel(page) : undefined;
      return page.sections.map((section) => ({
        value: sectionCountKey(page.key, section.key),
        label: sectionLabel(page.key, section),
        group,
      }));
    });

  return (
    <div className="space-y-3">
      <input type="hidden" name="placements" value={placementRowsPayload(pages, rows)} />
      {rows.length === 0 ? <p className="text-sm text-[#6f6f6f]">{t("common.placements.empty")}</p> : null}
      {rows.map((row) => (
        <div key={row.uid} className="grid gap-3 rounded-2xl bg-[#f5f5f5] p-4 md:grid-cols-[2fr_1.5fr_110px_auto] md:items-end">
          <div>
            <span className="text-xs font-medium text-[#6f6f6f]">{t("common.placements.page")}</span>
            <CheckboxSelect
              options={pageOptions}
              selected={row.pageKeys}
              placeholder={t("common.placements.selectPlaceholder")}
              onToggle={(pageKey, checked) => update(row.uid, (r) => togglePlacementPage(pages, r, pageKey, checked, sectionCounts))}
            />
          </div>
          <div>
            <span className="text-xs font-medium text-[#6f6f6f]">{t("common.placements.section")}</span>
            <CheckboxSelect
              options={sectionOptions(row)}
              selected={row.placementKeys}
              placeholder={t("common.placements.selectPlaceholder")}
              onToggle={(key, checked) => update(row.uid, (r) => togglePlacementSection(r, key, checked, sectionCounts))}
            />
          </div>
          <label className="block">
            <span className="text-xs font-medium text-[#6f6f6f]">{t("common.placements.order")}</span>
            <input
              type="number"
              min={0}
              value={row.sortOrder}
              onChange={(e) => update(row.uid, (r) => ({ ...r, sortOrder: Number(e.target.value) }))}
              className={`${adminInputClass} mt-1`}
            />
          </label>
          {canRemove ? (
            <button
              type="button"
              onClick={() => setRows((current) => current.filter((item) => item.uid !== row.uid))}
              className="py-2.5 text-sm font-semibold text-red-600 hover:underline"
            >
              {t("common.placements.remove")}
            </button>
          ) : null}
        </div>
      ))}
      {error ? <p {...fieldErrorAttr} className="text-sm text-red-600">{t(error)}</p> : null}
      {multipleRows ? (
        <button
          type="button"
          onClick={() => setRows((current) => [...current, createPlacementRow(pages, sectionCounts)])}
          className={adminSecondaryButtonClass}
        >
          {t("common.placements.add")}
        </button>
      ) : null}
    </div>
  );
}
