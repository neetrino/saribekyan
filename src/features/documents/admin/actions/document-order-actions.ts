"use server";

import { z } from "zod";

import { requireAdmin } from "@/features/admin-auth";
import { entryIdSchema } from "@/features/admin-shell/lib/form-parsing";
import { prisma } from "@/shared/lib/prisma";

import { findDocumentSection } from "../../config/placements";
import { revalidateDocumentPages } from "../lib/revalidate-document-pages";
import { documentYearSchema } from "../schemas/document-schema";

const MAX_REORDER_ITEMS = 500;

/** Year-grouped sections are ordered per year; other sections as a whole. */
const reorderSchema = z
  .object({
    pageKey: z.string(),
    sectionKey: z.string(),
    year: documentYearSchema.nullable(),
    placementIds: z.array(entryIdSchema).min(1).max(MAX_REORDER_ITEMS),
  })
  .refine((value) => {
    const section = findDocumentSection(value.pageKey, value.sectionKey);
    return section !== undefined && section.groupByYear === (value.year !== null);
  });

/**
 * Sets the display order of a section (or of one year inside a year-grouped section)
 * from a dragged list and renumbers it 1..n. Rejects a list that is not exactly that group.
 * @returns whether the order was saved.
 */
export async function reorderDocumentSection(input: {
  pageKey: string;
  sectionKey: string;
  year: number | null;
  placementIds: string[];
}): Promise<boolean> {
  await requireAdmin();

  const parsed = reorderSchema.safeParse(input);
  if (!parsed.success) return false;
  const { pageKey, sectionKey, year, placementIds } = parsed.data;
  if (new Set(placementIds).size !== placementIds.length) return false;

  const siblings = await prisma.siteDocumentPlacement.findMany({
    where: { pageKey, sectionKey, ...(year === null ? {} : { document: { year } }) },
    select: { id: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  const currentIds = new Set(siblings.map((item) => item.id));
  const sameSet = currentIds.size === placementIds.length && placementIds.every((id) => currentIds.has(id));
  if (!sameSet) return false;
  if (siblings.every((item, index) => item.id === placementIds[index])) return true;

  await prisma.$transaction(
    placementIds.map((id, index) =>
      prisma.siteDocumentPlacement.update({ where: { id }, data: { sortOrder: index + 1 } }),
    ),
  );
  revalidateDocumentPages([pageKey]);
  return true;
}
