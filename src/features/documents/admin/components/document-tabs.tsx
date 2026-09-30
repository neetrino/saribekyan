import { AdminTabs } from "@/features/admin-shell/components/admin-tabs";
import { getAdminI18n } from "@/features/admin-shell/i18n/get-admin-locale";

import { documentCategories } from "../../config/placements";
import { documentCategoryLabel } from "../lib/placement-copy";
import { buildDocumentListHref, type DocumentFilters, type DocumentTab } from "../services/document-filters";

type DocumentTabsProps = {
  filters: DocumentFilters;
};

/** Tabs are filters over the single documents table, not separate collections. */
export async function DocumentTabs({ filters }: DocumentTabsProps) {
  const { t } = await getAdminI18n();
  const tabs: Array<{ key: DocumentTab; label: string }> = [
    { key: "all", label: t("documents.tabs.all") },
    ...documentCategories.map((category) => ({
      key: category.key,
      label: documentCategoryLabel(t, category.key, category.label),
    })),
  ];

  return (
    <AdminTabs
      ariaLabel={t("documents.tabsAria")}
      activeKey={filters.tab}
      tabs={tabs.map((tab) => ({
        ...tab,
        href: buildDocumentListHref({ tab: tab.key, q: filters.q, year: filters.year }),
      }))}
    />
  );
}
