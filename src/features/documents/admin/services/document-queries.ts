import type { Prisma } from "@prisma/client";

import { sectionCountKey } from "@/features/admin-shell/lib/placement-registry";
import { prisma } from "@/shared/lib/prisma";

import { getDocumentPageKeysByCategory } from "../../config/placements";
import { compareSectionEntries } from "../../lib/section-order";
import { resolveFilterSection, type DocumentFilters, type FilterSection } from "./document-filters";

const documentWithPlacements = {
  include: {
    placements: { orderBy: [{ pageKey: "asc" }, { sectionKey: "asc" }] },
  },
} as const satisfies Prisma.SiteDocumentDefaultArgs;

export type AdminDocument = Prisma.SiteDocumentGetPayload<typeof documentWithPlacements>;

function placementWhere(filters: DocumentFilters): Prisma.SiteDocumentPlacementWhereInput | null {
  if (filters.pageKey) {
    return filters.sectionKey
      ? { pageKey: filters.pageKey, sectionKey: filters.sectionKey }
      : { pageKey: filters.pageKey };
  }
  if (filters.tab !== "all") {
    return { pageKey: { in: getDocumentPageKeysByCategory(filters.tab) } };
  }
  return null;
}

function searchWhere(q: string): Prisma.SiteDocumentWhereInput | null {
  if (!q) return null;
  const contains = { contains: q, mode: "insensitive" } as const;
  return {
    OR: [
      { titleHy: contains },
      { titleEn: contains },
      { descriptionHy: contains },
      { descriptionEn: contains },
      { fileName: contains },
    ],
  };
}

/** Orders documents exactly like the given section on the site. */
function sortBySection(documents: AdminDocument[], section: FilterSection): AdminDocument[] {
  const entry = (document: AdminDocument) => {
    const placement = document.placements.find(
      (item) => item.pageKey === section.pageKey && item.sectionKey === section.sectionKey,
    );
    return { year: document.year, sortOrder: placement?.sortOrder ?? 0, createdAt: placement?.createdAt ?? document.createdAt };
  };
  const compare = compareSectionEntries(section.groupByYear);
  return [...documents].sort((a, b) => compare(entry(a), entry(b)));
}

/**
 * Lists documents for the admin table. When the filters narrow to one page section, results
 * follow that section's site order; otherwise newest year first, then alphabetically.
 */
export async function listDocuments(filters: DocumentFilters): Promise<AdminDocument[]> {
  const placement = placementWhere(filters);
  const search = searchWhere(filters.q);
  const and: Prisma.SiteDocumentWhereInput[] = [];
  if (placement) and.push({ placements: { some: placement } });
  if (search) and.push(search);
  if (filters.year) and.push({ year: filters.year });

  const documents = await prisma.siteDocument.findMany({
    ...documentWithPlacements,
    where: and.length > 0 ? { AND: and } : undefined,
    orderBy: [{ year: "desc" }, { titleHy: "asc" }],
  });

  const section = resolveFilterSection(filters);
  return section ? sortBySection(documents, section) : documents;
}

export async function getDocument(id: string): Promise<AdminDocument | null> {
  return prisma.siteDocument.findUnique({ ...documentWithPlacements, where: { id } });
}

/** Number of documents per page section, used to default new placements to the end of a section. */
export async function getDocumentSectionCounts(): Promise<Record<string, number>> {
  const groups = await prisma.siteDocumentPlacement.groupBy({
    by: ["pageKey", "sectionKey"],
    _count: { _all: true },
  });
  return Object.fromEntries(
    groups.map((group) => [sectionCountKey(group.pageKey, group.sectionKey), group._count._all]),
  );
}

/** Years used by any document plus the current year, newest first. New years appear once used. */
export async function listDocumentYears(now: Date = new Date()): Promise<number[]> {
  const rows = await prisma.siteDocument.findMany({ distinct: ["year"], select: { year: true } });
  const years = new Set([now.getFullYear(), ...rows.map((row) => row.year)]);
  return [...years].sort((a, b) => b - a);
}
