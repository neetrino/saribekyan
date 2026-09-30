import { AdminTabs } from "@/features/admin-shell/components/admin-tabs";
import { getAdminI18n } from "@/features/admin-shell/i18n/get-admin-locale";

import { teamCategories } from "../../config/placements";
import { placementCategoryLabel } from "../lib/placement-copy";
import { buildTeamListHref, type TeamFilters, type TeamTab } from "../services/team-filters";

type TeamTabsProps = {
  filters: TeamFilters;
};

/** Tabs are filters over the single members table, not separate collections. */
export async function TeamTabs({ filters }: TeamTabsProps) {
  const { t } = await getAdminI18n();
  const tabs: Array<{ key: TeamTab; label: string }> = [
    { key: "all", label: t("team.tabs.all") },
    ...teamCategories.map((category) => ({
      key: category.key,
      label: placementCategoryLabel(t, category.key, category.label),
    })),
  ];

  return (
    <AdminTabs
      ariaLabel={t("team.tabsAria")}
      activeKey={filters.tab}
      tabs={tabs.map((tab) => ({ ...tab, href: buildTeamListHref({ tab: tab.key, q: filters.q }) }))}
    />
  );
}
