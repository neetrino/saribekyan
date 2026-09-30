import type { PrismaClient } from "@prisma/client";

import { clinicMembers } from "./seed-team-clinics";
import {
  aboutMembers,
  educationMembers,
  scienceMembers,
  type SeedTeamMember,
} from "./seed-team-data";
import { teamPeople } from "./seed-team-people";

const seedMembers: SeedTeamMember[] = [
  ...aboutMembers,
  ...educationMembers,
  ...clinicMembers,
  ...scienceMembers,
];

/** Seeds initial staff only into an empty table so admin-managed data is never overwritten. */
export async function seedTeam(prisma: PrismaClient): Promise<void> {
  const existing = await prisma.teamMember.count();
  if (existing > 0) {
    return;
  }

  if (teamPeople.length !== seedMembers.length) {
    throw new Error(`Team roster has ${teamPeople.length} people, seed has ${seedMembers.length}`);
  }

  for (const [index, member] of seedMembers.entries()) {
    const person = teamPeople[index];
    if (!person || person.positionHy !== member.hy.position) {
      throw new Error(`Team roster does not match seed position at index ${index}`);
    }
    await prisma.teamMember.create({
      data: {
        nameHy: person.nameHy,
        nameEn: person.nameEn,
        positionHy: member.hy.position,
        positionEn: member.en.position,
        bioHy: member.hy.bio ?? null,
        bioEn: member.en.bio ?? null,
        photoUrl: person.photoUrl,
        email: member.email ?? null,
        phone: member.phone ?? null,
        placements: {
          create: member.placements.map((placement) => ({
            pageKey: placement.page,
            sectionKey: placement.section,
            sortOrder: placement.order,
          })),
        },
      },
    });
  }
}
