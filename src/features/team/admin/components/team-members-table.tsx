import { getAdminI18n } from "@/features/admin-shell/i18n/get-admin-locale";

import { placementSummary } from "../lib/placement-copy";
import { buildTeamListHref, resolveOrderSection, type TeamFilters } from "../services/team-filters";
import type { AdminTeamMember } from "../services/team-queries";
import type { TeamMemberTableRow } from "./team-member-row";
import { TeamMembersTableView } from "./team-members-table-view";

type TeamMembersTableProps = {
  members: AdminTeamMember[];
  filters: TeamFilters;
};

function placementId(member: AdminTeamMember, pageKey: string, sectionKey: string): string | null {
  return member.placements.find((item) => item.pageKey === pageKey && item.sectionKey === sectionKey)?.id ?? null;
}

function toRow(member: AdminTeamMember, filters: TeamFilters, labelFor: (pageKey: string, sectionKey: string, sortOrder: number) => string): TeamMemberTableRow {
  const order = resolveOrderSection(filters);
  return {
    id: member.id,
    placementId: order ? placementId(member, order.pageKey, order.sectionKey) : null,
    nameHy: member.nameHy,
    nameEn: member.nameEn,
    positionHy: member.positionHy,
    email: member.email,
    phone: member.phone,
    photoUrl: member.photoUrl,
    shownOn: member.placements.map((item) => ({
      id: item.id,
      label: labelFor(item.pageKey, item.sectionKey, item.sortOrder),
    })),
    editHref: buildTeamListHref(filters, { mode: "edit", id: member.id }),
    returnTo: buildTeamListHref(filters),
  };
}

export async function TeamMembersTable({ members, filters }: TeamMembersTableProps) {
  const { t } = await getAdminI18n();
  const order = resolveOrderSection(filters);

  if (members.length === 0) {
    return <p className="rounded-2xl bg-white p-8 text-center text-sm text-[#6f6f6f]">{t("team.empty")}</p>;
  }

  const labelFor = (pageKey: string, sectionKey: string, sortOrder: number) =>
    `${placementSummary(t, pageKey, sectionKey)} · #${sortOrder}`;
  const rows = members.map((member) => toRow(member, filters, labelFor));
  const canReorder = order !== null && rows.every((row) => row.placementId);

  return (
    <TeamMembersTableView
      rows={rows}
      order={canReorder ? order : null}
      labels={{
        order: t("team.columns.order"),
        member: t("team.columns.member"),
        contacts: t("team.columns.contacts"),
        shownOn: t("team.columns.shownOn"),
        actions: t("team.columns.actions"),
        edit: t("team.edit"),
        drag: t("team.drag"),
        notShown: t("team.notShown"),
      }}
    />
  );
}
