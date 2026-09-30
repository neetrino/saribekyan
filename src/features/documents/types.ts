/** Localized document as rendered on public pages. */
export type PublicDocument = {
  id: string;
  title: string;
  description: string | null;
  year: number;
  href: string;
  /** Original file name, used as the download name. */
  fileName: string;
};
