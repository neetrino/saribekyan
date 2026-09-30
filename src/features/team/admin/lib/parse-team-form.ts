import { collectFieldErrors, parsePlacementsJson } from "@/features/admin-shell/lib/form-parsing";

import type { TeamFormField, TeamFormState } from "../actions/team-form-state";
import { teamMemberSchema, type TeamMemberInput } from "../schemas/team-member-schema";

const textFields = [
  "nameHy",
  "nameEn",
  "positionHy",
  "positionEn",
  "bioHy",
  "bioEn",
  "email",
  "phone",
] as const;

const formFields: readonly TeamFormField[] = [...textFields, "placements"];

type ParseResult =
  | { ok: true; data: TeamMemberInput }
  | { ok: false; state: TeamFormState };

/** Parses and validates the member form; returns field-level messages on failure. */
export function parseTeamForm(formData: FormData): ParseResult {
  const raw: Record<string, unknown> = {};
  for (const field of textFields) {
    const value = formData.get(field);
    raw[field] = typeof value === "string" ? value : "";
  }
  raw.placements = parsePlacementsJson(formData.get("placements"));

  const parsed = teamMemberSchema.safeParse(raw);
  if (parsed.success) {
    return { ok: true, data: parsed.data };
  }
  const fieldErrors = collectFieldErrors(parsed.error.issues, formFields);
  return { ok: false, state: { error: "errors.fixFields", fieldErrors } };
}
