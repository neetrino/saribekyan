export type DocumentFormField =
  | "titleHy"
  | "titleEn"
  | "descriptionHy"
  | "descriptionEn"
  | "year"
  | "file"
  | "placements";

export type DocumentFormState = {
  error: string | null;
  fieldErrors: Partial<Record<DocumentFormField, string>>;
};

export const initialDocumentFormState: DocumentFormState = { error: null, fieldErrors: {} };
