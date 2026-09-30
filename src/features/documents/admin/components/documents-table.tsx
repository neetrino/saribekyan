import { getAdminI18n } from "@/features/admin-shell/i18n/get-admin-locale";

import { formatFileSize } from "../lib/format-file-size";
import { documentPlacementSummary } from "../lib/placement-copy";
import {
  buildDocumentListHref,
  resolveDocumentOrder,
  type DocumentFilters,
  type DocumentOrder,
} from "../services/document-filters";
import type { AdminDocument } from "../services/document-queries";
import type { DocumentTableRow } from "./document-row";
import { DocumentsTableView } from "./documents-table-view";

type DocumentsTableProps = {
  documents: AdminDocument[];
  filters: DocumentFilters;
};

function toRow(
  document: AdminDocument,
  filters: DocumentFilters,
  order: DocumentOrder | null,
  labelFor: (pageKey: string, sectionKey: string, sortOrder: number) => string,
): DocumentTableRow {
  const placement = order
    ? document.placements.find((item) => item.pageKey === order.pageKey && item.sectionKey === order.sectionKey)
    : undefined;
  return {
    id: document.id,
    placementId: placement?.id ?? null,
    titleHy: document.titleHy,
    titleEn: document.titleEn,
    year: document.year,
    fileUrl: document.fileUrl,
    fileName: document.fileName,
    fileSize: formatFileSize(document.fileSize),
    shownOn: document.placements.map((item) => ({
      id: item.id,
      label: labelFor(item.pageKey, item.sectionKey, item.sortOrder),
    })),
    editHref: buildDocumentListHref(filters, { mode: "edit", id: document.id }),
    returnTo: buildDocumentListHref(filters),
  };
}

export async function DocumentsTable({ documents, filters }: DocumentsTableProps) {
  const { t } = await getAdminI18n();
  const order = resolveDocumentOrder(filters);

  if (documents.length === 0) {
    return <p className="rounded-2xl bg-white p-8 text-center text-sm text-[#6f6f6f]">{t("documents.empty")}</p>;
  }

  const labelFor = (pageKey: string, sectionKey: string, sortOrder: number) =>
    `${documentPlacementSummary(t, pageKey, sectionKey)} · #${sortOrder}`;
  const rows = documents.map((document) => toRow(document, filters, order, labelFor));
  const canReorder = order !== null && rows.every((row) => row.placementId);

  return (
    <DocumentsTableView
      rows={rows}
      order={canReorder ? order : null}
      labels={{
        order: t("documents.columns.order"),
        document: t("documents.columns.document"),
        year: t("documents.columns.year"),
        file: t("documents.columns.file"),
        shownOn: t("documents.columns.shownOn"),
        actions: t("documents.columns.actions"),
        open: t("documents.open"),
        edit: t("documents.edit"),
        drag: t("documents.drag"),
        notShown: t("documents.notShown"),
      }}
    />
  );
}
