/** Locale-resolved team member as rendered on public pages. */
export type TeamPerson = {
  id: string;
  name: string;
  role: string;
  bio?: string;
  email?: string;
  phone?: string;
  imageUrl?: string;
};
