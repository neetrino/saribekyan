import { z } from "zod";

import {
  entryIdSchema,
  optionalText,
  placementsSchema,
  requiredText,
} from "@/features/admin-shell/lib/form-parsing";

import { isValidPlacement } from "../../config/placements";

const MAX_NAME_LENGTH = 160;
const MAX_POSITION_LENGTH = 200;
const MAX_BIO_LENGTH = 1000;
const MAX_EMAIL_LENGTH = 160;

export const teamMemberSchema = z.object({
  nameHy: requiredText(MAX_NAME_LENGTH),
  nameEn: requiredText(MAX_NAME_LENGTH),
  positionHy: requiredText(MAX_POSITION_LENGTH),
  positionEn: requiredText(MAX_POSITION_LENGTH),
  bioHy: optionalText(MAX_BIO_LENGTH),
  bioEn: optionalText(MAX_BIO_LENGTH),
  email: optionalText(MAX_EMAIL_LENGTH).refine(
    (value) => value === null || z.email().safeParse(value).success,
    "errors.email",
  ),
  phone: optionalText(40).refine(
    (value) => value === null || /^[+\d\s()-]{6,40}$/u.test(value),
    "errors.phone",
  ),
  placements: placementsSchema(isValidPlacement),
});

export type TeamMemberInput = z.infer<typeof teamMemberSchema>;

export const teamMemberIdSchema = entryIdSchema;
