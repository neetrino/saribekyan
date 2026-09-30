/** Section of a public page that can list CMS entries (team members, documents, ...). */
export type PlacementSectionDef = {
  readonly key: string;
  readonly label: string;
};

/** Public page with its placeable sections; feature registries extend this shape. */
export type PlacementPageDef = {
  readonly key: string;
  readonly label: string;
  readonly sections: readonly PlacementSectionDef[];
};

/** One stored placement of an entry: page section plus display order. */
export type PlacementDraft = {
  pageKey: string;
  sectionKey: string;
  sortOrder: number;
};

export function sectionCountKey(pageKey: string, sectionKey: string): string {
  return `${pageKey}:${sectionKey}`;
}
