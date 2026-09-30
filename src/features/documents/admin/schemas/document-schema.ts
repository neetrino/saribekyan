import { z } from "zod";

import {
  optionalText,
  placementsSchema,
  requiredText,
} from "@/features/admin-shell/lib/form-parsing";

import { isValidDocumentPlacement } from "../../config/placements";
import { MIN_DOCUMENT_YEAR, maxDocumentYear } from "../../lib/document-limits";

const MAX_TITLE_LENGTH = 300;
const MAX_DESCRIPTION_LENGTH = 1000;

export const documentYearSchema = z.coerce
  .number({ message: "errors.year" })
  .int("errors.year")
  .min(MIN_DOCUMENT_YEAR, "errors.year")
  .refine((year) => year <= maxDocumentYear(), "errors.year");

export const documentSchema = z.object({
  titleHy: requiredText(MAX_TITLE_LENGTH),
  titleEn: requiredText(MAX_TITLE_LENGTH),
  descriptionHy: optionalText(MAX_DESCRIPTION_LENGTH),
  descriptionEn: optionalText(MAX_DESCRIPTION_LENGTH),
  year: documentYearSchema,
  placements: placementsSchema(isValidDocumentPlacement),
});

export type DocumentInput = z.infer<typeof documentSchema>;
