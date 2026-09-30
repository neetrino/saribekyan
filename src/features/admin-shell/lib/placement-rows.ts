import { sectionCountKey, type PlacementDraft, type PlacementPageDef } from "./placement-registry";

/** One editor row: checked pages, checked `pageKey:sectionKey` placements and a shared display order. */
export type PlacementRow = {
  uid: string;
  pageKeys: string[];
  placementKeys: string[];
  sortOrder: number;
};

type SectionCounts = Record<string, number>;

type Pages = readonly PlacementPageDef[];

function nextOrder(counts: SectionCounts, placementKeys: readonly string[]): number {
  const first = placementKeys[0];
  return first ? (counts[first] ?? 0) + 1 : 1;
}

function firstPlacementKey(pages: Pages, pageKey: string): string | null {
  const section = pages.find((page) => page.key === pageKey)?.sections[0];
  return section ? sectionCountKey(pageKey, section.key) : null;
}

/** Groups stored placements into rows by page and order so every existing order is preserved. */
export function toPlacementRows(placements: readonly PlacementDraft[]): PlacementRow[] {
  const rows = new Map<string, PlacementRow>();
  for (const placement of placements) {
    const uid = `${placement.pageKey}:${placement.sortOrder}`;
    const row = rows.get(uid) ?? { uid, pageKeys: [placement.pageKey], placementKeys: [], sortOrder: placement.sortOrder };
    row.placementKeys.push(sectionCountKey(placement.pageKey, placement.sectionKey));
    rows.set(uid, row);
  }
  return [...rows.values()];
}

export function emptyPlacementRow(): PlacementRow {
  return { uid: crypto.randomUUID(), pageKeys: [], placementKeys: [], sortOrder: 1 };
}

export function createPlacementRow(pages: Pages, counts: SectionCounts): PlacementRow {
  const pageKey = pages[0]?.key;
  const placementKeys = pageKey ? [firstPlacementKey(pages, pageKey)].filter((key): key is string => key !== null) : [];
  return {
    uid: crypto.randomUUID(),
    pageKeys: pageKey ? [pageKey] : [],
    placementKeys,
    sortOrder: nextOrder(counts, placementKeys),
  };
}

export function togglePlacementPage(
  pages: Pages,
  row: PlacementRow,
  pageKey: string,
  checked: boolean,
  counts: SectionCounts,
): PlacementRow {
  const firstKey = firstPlacementKey(pages, pageKey);
  const placementKeys = checked
    ? [...row.placementKeys, ...(firstKey ? [firstKey] : [])]
    : row.placementKeys.filter((key) => !key.startsWith(`${pageKey}:`));
  const pageKeys = checked ? [...row.pageKeys, pageKey] : row.pageKeys.filter((key) => key !== pageKey);
  return { ...row, pageKeys, placementKeys, sortOrder: nextOrder(counts, placementKeys) };
}

export function togglePlacementSection(row: PlacementRow, key: string, checked: boolean, counts: SectionCounts): PlacementRow {
  const placementKeys = checked ? [...row.placementKeys, key] : row.placementKeys.filter((item) => item !== key);
  return { ...row, placementKeys, sortOrder: nextOrder(counts, placementKeys) };
}

/** Flattens rows into the `placements` JSON payload expected by save actions. */
export function placementRowsPayload(pages: Pages, rows: readonly PlacementRow[]): string {
  const placements = rows.flatMap((row) =>
    pages.flatMap((page) =>
      page.sections
        .filter((section) => row.placementKeys.includes(sectionCountKey(page.key, section.key)))
        .map((section) => ({ pageKey: page.key, sectionKey: section.key, sortOrder: row.sortOrder })),
    ),
  );
  return JSON.stringify(placements);
}
