/** Serializable admin table row. `placementId` is set when the list is one reorderable section. */
export type TeamMemberTableRow = {
  id: string;
  placementId: string | null;
  nameHy: string;
  nameEn: string;
  positionHy: string;
  email: string | null;
  phone: string | null;
  photoUrl: string | null;
  shownOn: { id: string; label: string }[];
  editHref: string;
  returnTo: string;
};
