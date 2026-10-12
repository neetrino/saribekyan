export type PublicationGroupId =
  | "handbook"
  | "handbooks"
  | "book"
  | "articles"
  | "chapters";

export type PublicationGroup = {
  id: PublicationGroupId;
  items: string[];
};

export type PublicationYearId = "y2023" | "y2024" | "y2025";

export type PublicationYear = {
  id: PublicationYearId;
  groups: PublicationGroup[];
};
