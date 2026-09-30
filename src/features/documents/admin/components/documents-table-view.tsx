"use client";

import Link from "next/link";

import { AdminDeleteButton } from "@/features/admin-shell/components/admin-delete-button";
import { DragHandle } from "@/features/admin-shell/components/drag-handle";
import { useRowDrag } from "@/features/admin-shell/components/use-row-drag";
import { useAdminI18n } from "@/features/admin-shell/i18n/admin-i18n-provider";
import { cn } from "@/shared/lib/cn";

import { deleteDocument } from "../actions/document-actions";
import { reorderDocumentSection } from "../actions/document-order-actions";
import type { DocumentOrder } from "../services/document-filters";
import type { DocumentTableRow } from "./document-row";

type DocumentsTableLabels = {
  order: string;
  document: string;
  year: string;
  file: string;
  shownOn: string;
  actions: string;
  open: string;
  edit: string;
  drag: string;
  notShown: string;
};

type DocumentsTableViewProps = {
  rows: DocumentTableRow[];
  order: DocumentOrder | null;
  labels: DocumentsTableLabels;
};

function ShownOn({ row, empty }: { row: DocumentTableRow; empty: string }) {
  if (row.shownOn.length === 0) return <span className="text-xs text-[#6f6f6f]">{empty}</span>;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {row.shownOn.map((item) => (
        <li key={item.id} className="rounded-full bg-[#f5f5f5] px-2.5 py-1 text-xs text-brand-ink">{item.label}</li>
      ))}
    </ul>
  );
}

function FileCell({ row, openLabel }: { row: DocumentTableRow; openLabel: string }) {
  return (
    <div className="max-w-56">
      <p className="truncate text-brand-ink" title={row.fileName}>{row.fileName}</p>
      <p className="mt-0.5 text-xs text-[#6f6f6f]">
        {row.fileSize} ·{" "}
        <a href={row.fileUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-teal hover:underline">
          {openLabel}
        </a>
      </p>
    </div>
  );
}

/** Admin documents list. A grip handle is shown when the list is exactly one ordered group. */
export function DocumentsTableView({ rows: initial, order, labels }: DocumentsTableViewProps) {
  const { t } = useAdminI18n();
  const drag = useRowDrag(
    initial,
    order ? (placementIds) => reorderDocumentSection({ ...order, placementIds }) : null,
  );

  return (
    <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-black/5">
      <table ref={drag.tableRef} className="w-full min-w-[960px] text-left text-sm">
        <thead className="border-b border-black/5 text-xs uppercase tracking-wide text-[#6f6f6f]">
          <tr>
            {order ? <th className="w-14 px-4 py-3">{labels.order}</th> : null}
            <th className="px-4 py-3">{labels.document}</th>
            <th className="px-4 py-3">{labels.year}</th>
            <th className="px-4 py-3">{labels.file}</th>
            <th className="px-4 py-3">{labels.shownOn}</th>
            <th className="px-4 py-3 text-right">{labels.actions}</th>
          </tr>
        </thead>
        <tbody>
          {drag.rows.map((row, index) => (
            <tr
              key={row.id}
              data-index={index}
              className={cn("border-b border-black/5 align-top last:border-0", drag.activeIndex === index && "bg-[#f5f5f5]")}
            >
              {order ? (
                <td className="px-4 py-4"><DragHandle index={index} label={labels.drag} drag={drag} /></td>
              ) : null}
              <td className="px-4 py-4">
                <p className="font-semibold text-brand-ink">{row.titleHy}</p>
                <p className="text-[#6f6f6f]">{row.titleEn}</p>
              </td>
              <td className="px-4 py-4 font-semibold text-brand-ink">{row.year}</td>
              <td className="px-4 py-4"><FileCell row={row} openLabel={labels.open} /></td>
              <td className="px-4 py-4"><ShownOn row={row} empty={labels.notShown} /></td>
              <td className="px-4 py-4">
                <div className="flex justify-end gap-4">
                  <Link href={row.editHref} scroll={false} className="text-sm font-semibold text-brand-teal hover:underline">
                    {labels.edit}
                  </Link>
                  <AdminDeleteButton
                    action={deleteDocument}
                    id={row.id}
                    returnTo={row.returnTo}
                    label={t("documents.delete")}
                    confirmMessage={t("documents.deleteConfirm", { name: row.titleHy })}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
