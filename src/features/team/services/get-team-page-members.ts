import type { TeamMember } from "@prisma/client";
import { cache } from "react";

import { prisma } from "@/shared/lib/prisma";
import { logger } from "@/shared/lib/logger";

import {
  findTeamPage,
  type TeamPageKey,
  type TeamSectionKey,
} from "../config/placements";
import type { TeamPerson } from "../types";

export type TeamPageMembers<P extends TeamPageKey> = Record<
  TeamSectionKey<P>,
  TeamPerson[]
>;

function toTeamPerson(member: TeamMember, locale: string): TeamPerson {
  const isEn = locale === "en";
  const bio = isEn ? member.bioEn : member.bioHy;

  return {
    id: member.id,
    name: isEn ? member.nameEn : member.nameHy,
    role: isEn ? member.positionEn : member.positionHy,
    bio: bio ?? undefined,
    email: member.email ?? undefined,
    phone: member.phone ?? undefined,
    imageUrl: member.photoUrl ?? undefined,
  };
}

const loadPlacements = cache(async (pageKey: string) =>
  prisma.teamMemberPlacement.findMany({
    where: { pageKey },
    include: { member: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  }),
);

/**
 * Returns members for every registered section of a page, ordered per section.
 * On database failure logs the error and returns empty sections so the page still renders.
 */
export async function getTeamPageMembers<P extends TeamPageKey>(
  pageKey: P,
  locale: string,
): Promise<TeamPageMembers<P>> {
  const page = findTeamPage(pageKey);
  const result: Record<string, TeamPerson[]> = {};
  for (const section of page?.sections ?? []) {
    result[section.key] = [];
  }

  try {
    const placements = await loadPlacements(pageKey);
    for (const placement of placements) {
      result[placement.sectionKey]?.push(toTeamPerson(placement.member, locale));
    }
  } catch (error) {
    logger.error("Failed to load team members", error, { pageKey });
  }

  return result as TeamPageMembers<P>;
}
