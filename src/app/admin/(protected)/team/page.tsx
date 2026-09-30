import type { Metadata } from "next";
import Link from "next/link";

import { requireAdmin } from "@/features/admin-auth";
import { adminPrimaryButtonClass } from "@/features/admin-shell/components/admin-field-styles";
import { adminCountLabel } from "@/features/admin-shell/i18n/translate";
import { getAdminI18n } from "@/features/admin-shell/i18n/get-admin-locale";
import { parseAdminDrawer } from "@/features/admin-shell/lib/search-params";
import {
  TeamDrawerSlot,
  TeamFilterBar,
  TeamMembersTable,
  TeamTabs,
  buildTeamListHref,
  listTeamMembers,
  parseTeamFilters,
  resolveOrderSection,
} from "@/features/team/admin";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getAdminI18n();
  return { title: t("team.title") };
}

type TeamAdminPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function TeamAdminPage({ searchParams }: TeamAdminPageProps) {
  await requireAdmin();
  const { locale, t } = await getAdminI18n();
  const params = await searchParams;
  const filters = parseTeamFilters(params);
  const drawer = parseAdminDrawer(params);
  const members = await listTeamMembers(filters);
  const showOrderHint = resolveOrderSection(filters) !== null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{t("team.title")}</h1>
          <p className="mt-1 text-sm text-[#6f6f6f]">{t("team.description")}</p>
        </div>
        <Link href={buildTeamListHref(filters, { mode: "new" })} scroll={false} className={adminPrimaryButtonClass}>
          {t("team.add")}
        </Link>
      </div>

      <TeamTabs filters={filters} />
      <TeamFilterBar key={`${filters.tab}-${filters.pageKey}-${filters.sectionKey}`} filters={filters} />

      <p className="text-sm text-[#6f6f6f]">
        {adminCountLabel(locale, members.length, t, "team.count")}
        {showOrderHint ? ` · ${t("team.orderHint")}` : ""}
      </p>
      <TeamMembersTable members={members} filters={filters} />
      {drawer ? <TeamDrawerSlot drawer={drawer} filters={filters} /> : null}
    </div>
  );
}
