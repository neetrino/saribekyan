/** Serializable admin table row. `placementId` is set when the list is one reorderable group. */
export type DocumentTableRow = {
  id: string;
  placementId: string | null;
  titleHy: string;
  titleEn: string;
  year: number;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  shownOn: { id: string; label: string }[];
  editHref: string;
  returnTo: string;
};
