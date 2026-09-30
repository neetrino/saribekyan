import type { Metadata } from "next";
import Link from "next/link";

import { requireAdmin } from "@/features/admin-auth";
import { adminPrimaryButtonClass } from "@/features/admin-shell/components/admin-field-styles";
import { getAdminI18n } from "@/features/admin-shell/i18n/get-admin-locale";
import { adminCountLabel } from "@/features/admin-shell/i18n/translate";
import { parseAdminDrawer } from "@/features/admin-shell/lib/search-params";
import {
  DocumentDrawerSlot,
  DocumentFilterBar,
  DocumentTabs,
  DocumentsTable,
  buildDocumentListHref,
  listDocumentYears,
  listDocuments,
  parseDocumentFilters,
  resolveDocumentOrder,
  resolveFilterSection,
} from "@/features/documents/admin";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getAdminI18n();
  return { title: t("documents.title") };
}

type DocumentsAdminPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DocumentsAdminPage({ searchParams }: DocumentsAdminPageProps) {
  await requireAdmin();
  const { locale, t } = await getAdminI18n();
  const params = await searchParams;
  const filters = parseDocumentFilters(params);
  const drawer = parseAdminDrawer(params);
  const [documents, years] = await Promise.all([listDocuments(filters), listDocumentYears()]);
  const section = resolveFilterSection(filters);
  const orderHint = resolveDocumentOrder(filters)
    ? t("documents.orderHint")
    : section?.groupByYear && !filters.q
      ? t("documents.orderYearHint")
      : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{t("documents.title")}</h1>
          <p className="mt-1 text-sm text-[#6f6f6f]">{t("documents.description")}</p>
        </div>
        <Link href={buildDocumentListHref(filters, { mode: "new" })} scroll={false} className={adminPrimaryButtonClass}>
          {t("documents.add")}
        </Link>
      </div>

      <DocumentTabs filters={filters} />
      <DocumentFilterBar
        key={`${filters.tab}-${filters.pageKey}-${filters.sectionKey}-${filters.year}`}
        filters={filters}
        years={years}
      />

      <p className="text-sm text-[#6f6f6f]">
        {adminCountLabel(locale, documents.length, t, "documents.count")}
        {orderHint ? ` · ${orderHint}` : ""}
      </p>
      <DocumentsTable documents={documents} filters={filters} />
      {drawer ? <DocumentDrawerSlot drawer={drawer} filters={filters} /> : null}
    </div>
  );
}
