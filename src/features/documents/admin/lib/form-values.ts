import type { PlacementDraft } from "@/features/admin-shell/lib/placement-registry";

import type { AdminDocument } from "../services/document-queries";

/** Serializable values for the client-side document form. */
export type DocumentFormValues = {
  id: string | null;
  titleHy: string;
  titleEn: string;
  descriptionHy: string;
  descriptionEn: string;
  year: number;
  file: { url: string; name: string; size: number } | null;
  placements: PlacementDraft[];
};

export function emptyDocumentFormValues(year: number, placements: PlacementDraft[]): DocumentFormValues {
  return {
    id: null,
    titleHy: "",
    titleEn: "",
    descriptionHy: "",
    descriptionEn: "",
    year,
    file: null,
    placements,
  };
}

export function toDocumentFormValues(document: AdminDocument): DocumentFormValues {
  return {
    id: document.id,
    titleHy: document.titleHy,
    titleEn: document.titleEn,
    descriptionHy: document.descriptionHy ?? "",
    descriptionEn: document.descriptionEn ?? "",
    year: document.year,
    file: { url: document.fileUrl, name: document.fileName, size: document.fileSize },
    placements: document.placements.map((placement) => ({
      pageKey: placement.pageKey,
      sectionKey: placement.sectionKey,
      sortOrder: placement.sortOrder,
    })),
  };
}
