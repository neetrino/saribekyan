import { collectFieldErrors, parsePlacementsJson } from "@/features/admin-shell/lib/form-parsing";

import type { DocumentFormField, DocumentFormState } from "../actions/document-form-state";
import { documentSchema, type DocumentInput } from "../schemas/document-schema";

const textFields = ["titleHy", "titleEn", "descriptionHy", "descriptionEn", "year"] as const;

const formFields: readonly DocumentFormField[] = [...textFields, "placements"];

type ParseResult =
  | { ok: true; data: DocumentInput }
  | { ok: false; state: DocumentFormState };

/** Parses and validates the document form (except the file); returns field-level messages on failure. */
export function parseDocumentForm(formData: FormData): ParseResult {
  const raw: Record<string, unknown> = {};
  for (const field of textFields) {
    const value = formData.get(field);
    raw[field] = typeof value === "string" ? value : "";
  }
  raw.placements = parsePlacementsJson(formData.get("placements"));

  const parsed = documentSchema.safeParse(raw);
  if (parsed.success) {
    return { ok: true, data: parsed.data };
  }
  const fieldErrors = collectFieldErrors(parsed.error.issues, formFields);
  return { ok: false, state: { error: "errors.fixFields", fieldErrors } };
}
