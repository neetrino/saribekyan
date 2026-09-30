export type TeamFormField =
  | "nameHy"
  | "nameEn"
  | "positionHy"
  | "positionEn"
  | "bioHy"
  | "bioEn"
  | "email"
  | "phone"
  | "photo"
  | "placements";

export type TeamFormState = {
  error: string | null;
  fieldErrors: Partial<Record<TeamFormField, string>>;
};

export const initialTeamFormState: TeamFormState = { error: null, fieldErrors: {} };
