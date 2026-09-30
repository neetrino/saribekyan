import { AdminDeleteButton, adminDrawerDeleteClass } from "@/features/admin-shell/components/admin-delete-button";
import { AdminDrawerPanel } from "@/features/admin-shell/components/admin-drawer-panel";
import { getAdminI18n } from "@/features/admin-shell/i18n/get-admin-locale";
import type { AdminDrawer } from "@/features/admin-shell/lib/search-params";

import { deleteTeamMember } from "../actions/team-member-actions";
import { emptyTeamMemberFormValues, toTeamMemberFormValues } from "../lib/form-values";
import { buildTeamListHref, type TeamFilters } from "../services/team-filters";
import { getSectionCounts, getTeamMember } from "../services/team-queries";
import { TeamMemberForm } from "./team-member-form";

type TeamDrawerSlotProps = {
  drawer: AdminDrawer;
  filters: TeamFilters;
};

/** Loads data for the add/edit drawer; renders nothing when the edited member no longer exists. */
export async function TeamDrawerSlot({ drawer, filters }: TeamDrawerSlotProps) {
  const { t } = await getAdminI18n();
  const closeHref = buildTeamListHref(filters);
  const [member, sectionCounts] = await Promise.all([
    drawer.mode === "edit" ? getTeamMember(drawer.id) : Promise.resolve(null),
    getSectionCounts(),
  ]);

  if (drawer.mode === "edit" && !member) {
    return null;
  }

  const title = member ? t("team.editTitle", { name: member.nameHy }) : t("team.addTitle");

  return (
    <AdminDrawerPanel
      key={member?.id ?? "new"}
      title={title}
      closeHref={closeHref}
      headerActions={
        member ? (
          <AdminDeleteButton
            action={deleteTeamMember}
            id={member.id}
            returnTo={closeHref}
            label={t("team.delete")}
            confirmMessage={t("team.deleteConfirm", { name: member.nameHy })}
            className={adminDrawerDeleteClass}
          />
        ) : null
      }
    >
      <TeamMemberForm
        key={member?.id ?? "new"}
        values={member ? toTeamMemberFormValues(member) : emptyTeamMemberFormValues}
        sectionCounts={sectionCounts}
        closeHref={closeHref}
      />
    </AdminDrawerPanel>
  );
}
