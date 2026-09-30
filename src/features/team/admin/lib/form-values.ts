import type { PlacementDraft } from "@/features/admin-shell/lib/placement-registry";

import type { AdminTeamMember } from "../services/team-queries";

/** Serializable values for the client-side member form. */
export type TeamMemberFormValues = {
  id: string | null;
  nameHy: string;
  nameEn: string;
  positionHy: string;
  positionEn: string;
  bioHy: string;
  bioEn: string;
  email: string;
  phone: string;
  photoUrl: string;
  placements: PlacementDraft[];
};

export const emptyTeamMemberFormValues: TeamMemberFormValues = {
  id: null,
  nameHy: "",
  nameEn: "",
  positionHy: "",
  positionEn: "",
  bioHy: "",
  bioEn: "",
  email: "",
  phone: "",
  photoUrl: "",
  placements: [],
};

export function toTeamMemberFormValues(member: AdminTeamMember): TeamMemberFormValues {
  return {
    id: member.id,
    nameHy: member.nameHy,
    nameEn: member.nameEn,
    positionHy: member.positionHy,
    positionEn: member.positionEn,
    bioHy: member.bioHy ?? "",
    bioEn: member.bioEn ?? "",
    email: member.email ?? "",
    phone: member.phone ?? "",
    photoUrl: member.photoUrl ?? "",
    placements: member.placements.map((placement) => ({
      pageKey: placement.pageKey,
      sectionKey: placement.sectionKey,
      sortOrder: placement.sortOrder,
    })),
  };
}
