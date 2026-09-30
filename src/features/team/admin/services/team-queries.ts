import type { Prisma } from "@prisma/client";

import { sectionCountKey } from "@/features/admin-shell/lib/placement-registry";
import { prisma } from "@/shared/lib/prisma";

import { getPageKeysByCategory } from "../../config/placements";
import { resolveOrderSection, type TeamFilters } from "./team-filters";

const memberWithPlacements = {
  include: {
    placements: { orderBy: [{ pageKey: "asc" }, { sectionKey: "asc" }] },
  },
} as const satisfies Prisma.TeamMemberDefaultArgs;

export type AdminTeamMember = Prisma.TeamMemberGetPayload<typeof memberWithPlacements>;

function placementWhere(filters: TeamFilters): Prisma.TeamMemberPlacementWhereInput | null {
  if (filters.pageKey) {
    return filters.sectionKey
      ? { pageKey: filters.pageKey, sectionKey: filters.sectionKey }
      : { pageKey: filters.pageKey };
  }
  if (filters.tab !== "all") {
    return { pageKey: { in: getPageKeysByCategory(filters.tab) } };
  }
  return null;
}

function searchWhere(q: string): Prisma.TeamMemberWhereInput | null {
  if (!q) {
    return null;
  }
  const contains = { contains: q, mode: "insensitive" } as const;
  return {
    OR: [
      { nameHy: contains },
      { nameEn: contains },
      { positionHy: contains },
      { positionEn: contains },
      { email: contains },
      { phone: contains },
    ],
  };
}

function compareBySection(pageKey: string, sectionKey: string) {
  return (a: AdminTeamMember, b: AdminTeamMember): number => {
    const left = a.placements.find((item) => item.pageKey === pageKey && item.sectionKey === sectionKey);
    const right = b.placements.find((item) => item.pageKey === pageKey && item.sectionKey === sectionKey);
    if (!left || !right) return left ? -1 : 1;
    return left.sortOrder - right.sortOrder || left.createdAt.getTime() - right.createdAt.getTime();
  };
}

/**
 * Lists members for the admin table. When a concrete page section is selected,
 * results are ordered by that section's display order; otherwise alphabetically.
 */
export async function listTeamMembers(filters: TeamFilters): Promise<AdminTeamMember[]> {
  const placement = placementWhere(filters);
  const search = searchWhere(filters.q);
  const and: Prisma.TeamMemberWhereInput[] = [];
  if (placement) and.push({ placements: { some: placement } });
  if (search) and.push(search);

  const members = await prisma.teamMember.findMany({
    ...memberWithPlacements,
    where: and.length > 0 ? { AND: and } : undefined,
    orderBy: { nameHy: "asc" },
  });

  const order = resolveOrderSection(filters);
  return order ? members.sort(compareBySection(order.pageKey, order.sectionKey)) : members;
}

export async function getTeamMember(id: string): Promise<AdminTeamMember | null> {
  return prisma.teamMember.findUnique({ ...memberWithPlacements, where: { id } });
}

/** Number of members per page section, used to default new placements to the end of a section. */
export async function getSectionCounts(): Promise<Record<string, number>> {
  const groups = await prisma.teamMemberPlacement.groupBy({
    by: ["pageKey", "sectionKey"],
    _count: { _all: true },
  });
  return Object.fromEntries(
    groups.map((group) => [sectionCountKey(group.pageKey, group.sectionKey), group._count._all]),
  );
}
