import { z } from "zod";

const MAX_SORT_ORDER = 9999;
const MAX_PLACEMENTS = 20;

/**
 * Placement list submitted by `PlacementsField`, validated against a feature registry.
 * Duplicated page sections are rejected.
 */
export function placementsSchema(isValidPlacement: (pageKey: string, sectionKey: string) => boolean) {
  const placement = z
    .object({
      pageKey: z.string(),
      sectionKey: z.string(),
      sortOrder: z.coerce.number().int().min(0).max(MAX_SORT_ORDER),
    })
    .refine((item) => isValidPlacement(item.pageKey, item.sectionKey), {
      message: "errors.unknownPlacement",
    });

  return z
    .array(placement)
    .max(MAX_PLACEMENTS)
    .refine(
      (items) => new Set(items.map((p) => `${p.pageKey}:${p.sectionKey}`)).size === items.length,
      "errors.duplicatePlacement",
    );
}

export const requiredText = (max: number) => z.string().trim().min(2).max(max);

export const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((value) => (value === "" ? null : value));

export const entryIdSchema = z.string().min(1).max(64).regex(/^[a-z0-9]+$/u);

/** Reads the hidden `placements` JSON input; malformed JSON becomes `null` so validation fails. */
export function parsePlacementsJson(raw: FormDataEntryValue | null): unknown {
  if (typeof raw !== "string" || raw === "") {
    return [];
  }
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Maps a zod issue to an admin catalog message key. */
export function issueMessageKey(issue: { message: string; code: string }): string {
  if (issue.message.startsWith("errors.")) return issue.message;
  if (issue.code === "too_small") return "errors.tooShort";
  if (issue.code === "too_big") return "errors.tooLong";
  return "errors.invalid";
}

/** Collects the first message key per known form field. */
export function collectFieldErrors<Field extends string>(
  issues: z.ZodError["issues"],
  fields: readonly Field[],
): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {};
  for (const issue of issues) {
    const key = issue.path[0];
    if (typeof key === "string" && (fields as readonly string[]).includes(key) && !errors[key as Field]) {
      errors[key as Field] = issueMessageKey(issue);
    }
  }
  return errors;
}
