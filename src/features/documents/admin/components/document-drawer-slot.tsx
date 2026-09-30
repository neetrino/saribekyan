import { AdminDeleteButton, adminDrawerDeleteClass } from "@/features/admin-shell/components/admin-delete-button";
import { AdminDrawerPanel } from "@/features/admin-shell/components/admin-drawer-panel";
import { getAdminI18n } from "@/features/admin-shell/i18n/get-admin-locale";
import { sectionCountKey, type PlacementDraft } from "@/features/admin-shell/lib/placement-registry";
import type { AdminDrawer } from "@/features/admin-shell/lib/search-params";

import { maxDocumentYear } from "../../lib/document-limits";
import { deleteDocument } from "../actions/document-actions";
import { emptyDocumentFormValues, toDocumentFormValues } from "../lib/form-values";
import { buildDocumentListHref, resolveFilterSection, type DocumentFilters } from "../services/document-filters";
import { getDocument, getDocumentSectionCounts, listDocumentYears } from "../services/document-queries";
import { DocumentForm } from "./document-form";

type DocumentDrawerSlotProps = {
  drawer: AdminDrawer;
  filters: DocumentFilters;
};

/** A new document added from a filtered section view is placed into that section at its end. */
function defaultPlacements(filters: DocumentFilters, sectionCounts: Record<string, number>): PlacementDraft[] {
  const section = resolveFilterSection(filters);
  if (!section) return [];
  const count = sectionCounts[sectionCountKey(section.pageKey, section.sectionKey)] ?? 0;
  return [{ pageKey: section.pageKey, sectionKey: section.sectionKey, sortOrder: count + 1 }];
}

/** Loads data for the add/edit drawer; renders nothing when the edited document no longer exists. */
export async function DocumentDrawerSlot({ drawer, filters }: DocumentDrawerSlotProps) {
  const { t } = await getAdminI18n();
  const closeHref = buildDocumentListHref(filters);
  const now = new Date();
  const [document, sectionCounts, years] = await Promise.all([
    drawer.mode === "edit" ? getDocument(drawer.id) : Promise.resolve(null),
    getDocumentSectionCounts(),
    listDocumentYears(now),
  ]);

  if (drawer.mode === "edit" && !document) {
    return null;
  }

  const title = document ? t("documents.editTitle", { name: document.titleHy }) : t("documents.addTitle");
  const values = document
    ? toDocumentFormValues(document)
    : emptyDocumentFormValues(filters.year ?? now.getFullYear(), defaultPlacements(filters, sectionCounts));

  return (
    <AdminDrawerPanel
      key={document?.id ?? "new"}
      title={title}
      closeHref={closeHref}
      headerActions={
        document ? (
          <AdminDeleteButton
            action={deleteDocument}
            id={document.id}
            returnTo={closeHref}
            label={t("documents.delete")}
            confirmMessage={t("documents.deleteConfirm", { name: document.titleHy })}
            className={adminDrawerDeleteClass}
          />
        ) : null
      }
    >
      <DocumentForm
        key={document?.id ?? "new"}
        values={values}
        years={years}
        maxYear={maxDocumentYear(now)}
        sectionCounts={sectionCounts}
        closeHref={closeHref}
      />
    </AdminDrawerPanel>
  );
}
