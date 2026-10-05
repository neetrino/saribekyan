"use client";

import type { ReactNode } from "react";

import { AdminDeleteButton } from "@/features/admin-shell/components/admin-delete-button";
import { AdminEditLink, AdminTrashIcon, adminIconDeleteClass } from "@/features/admin-shell/components/admin-row-actions";
import { DragHandle } from "@/features/admin-shell/components/drag-handle";
import { useRowDrag } from "@/features/admin-shell/components/use-row-drag";
import { useAdminI18n } from "@/features/admin-shell/i18n/admin-i18n-provider";
import { cn } from "@/shared/lib/cn";

import { TeamAvatar } from "../../components/team-avatar";
import { deleteTeamMember, reorderTeamSection } from "../actions/team-member-actions";
import type { OrderSection } from "../services/team-filters";
import type { TeamMemberTableRow } from "./team-member-row";

type TeamTableLabels = {
  order: string;
  member: string;
  contacts: string;
  shownOn: string;
  actions: string;
  edit: string;
  drag: string;
  notShown: string;
};

type TeamMembersTableViewProps = {
  rows: TeamMemberTableRow[];
  order: OrderSection | null;
  labels: TeamTableLabels;
};

function MemberIdentity({ row }: { row: TeamMemberTableRow }) {
  return (
    <div className="flex gap-3">
      <TeamAvatar name={row.nameEn} imageUrl={row.photoUrl} sizes="48px" className="size-12 rounded-xl bg-brand-ink text-sm text-white" />
      <div>
        <p className="font-semibold text-brand-ink">{row.nameHy}</p>
        <p className="text-[#6f6f6f]">{row.nameEn}</p>
        <p className="mt-1 text-xs text-[#6f6f6f]">{row.positionHy}</p>
      </div>
    </div>
  );
}

/** Admin member list. A grip handle is shown when the list is exactly one page section. */
export function TeamMembersTableView({ rows: initial, order, labels }: TeamMembersTableViewProps) {
  const { t } = useAdminI18n();
  const drag = useRowDrag(
    initial,
    order ? (placementIds) => reorderTeamSection({ ...order, placementIds }) : null,
  );

  return (
    <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-black/5">
      <table ref={drag.tableRef} className="w-full min-w-[860px] text-left text-sm">
        <thead className="border-b border-black/5 text-xs uppercase tracking-wide text-[#6f6f6f]">
          <tr>
            {order ? <th className="w-14 px-4 py-3">{labels.order}</th> : null}
            <th className="px-4 py-3">{labels.member}</th>
            <th className="px-4 py-3">{labels.contacts}</th>
            <th className="px-4 py-3">{labels.shownOn}</th>
            <th className="px-4 py-3 text-center">{labels.actions}</th>
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
                <td className="px-4 py-4">
                  <DragHandle index={index} label={labels.drag} drag={drag} />
                </td>
              ) : null}
              <td className="px-4 py-4"><MemberIdentity row={row} /></td>
              <td className="px-4 py-4 text-[#6f6f6f]">
                {row.email ? <p>{row.email}</p> : null}
                {row.phone ? <p>{row.phone}</p> : null}
              </td>
              <td className="px-4 py-4"><ShownOn row={row} empty={labels.notShown} /></td>
              <td className="px-4 py-4 align-middle">
                <div className="flex items-center justify-center gap-1">
                  <AdminEditLink href={row.editHref} label={labels.edit} />
                  <AdminDeleteButton
                    action={deleteTeamMember}
                    id={row.id}
                    returnTo={row.returnTo}
                    label={t("team.delete")}
                    confirmMessage={t("team.deleteConfirm", { name: row.nameHy })}
                    className={adminIconDeleteClass}
                  >
                    <AdminTrashIcon />
                  </AdminDeleteButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ShownOn({ row, empty }: { row: TeamMemberTableRow; empty: string }): ReactNode {
  if (row.shownOn.length === 0) return <span className="text-xs text-[#6f6f6f]">{empty}</span>;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {row.shownOn.map((item) => (
        <li key={item.id} className="rounded-full bg-[#f5f5f5] px-2.5 py-1 text-xs text-brand-ink">{item.label}</li>
      ))}
    </ul>
  );
}
