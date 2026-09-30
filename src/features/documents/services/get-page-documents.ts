import type { SiteDocument } from "@prisma/client";
import { cache } from "react";

import { logger } from "@/shared/lib/logger";
import { prisma } from "@/shared/lib/prisma";

import {
  findDocumentPage,
  type DocumentPageKey,
  type DocumentSectionKey,
} from "../config/placements";
import { compareSectionEntries } from "../lib/section-order";
import type { PublicDocument } from "../types";

export type PageDocuments<P extends DocumentPageKey> = Record<DocumentSectionKey<P>, PublicDocument[]>;

function toPublicDocument(document: SiteDocument, locale: string): PublicDocument {
  const isEn = locale === "en";
  return {
    id: document.id,
    title: isEn ? document.titleEn : document.titleHy,
    description: (isEn ? document.descriptionEn : document.descriptionHy) ?? null,
    year: document.year,
    href: document.fileUrl,
    fileName: document.fileName,
  };
}

const loadPlacements = cache(async (pageKey: string) =>
  prisma.siteDocumentPlacement.findMany({
    where: { pageKey },
    include: { document: true },
  }),
);

/**
 * Returns documents for every registered section of a page in site display order.
 * On database failure logs the error and returns empty sections so the page still renders.
 */
export async function getPageDocuments<P extends DocumentPageKey>(
  pageKey: P,
  locale: string,
): Promise<PageDocuments<P>> {
  const sections = findDocumentPage(pageKey)?.sections ?? [];
  const result: Record<string, PublicDocument[]> = {};

  try {
    const placements = await loadPlacements(pageKey);
    for (const section of sections) {
      result[section.key] = placements
        .filter((placement) => placement.sectionKey === section.key)
        .map((placement) => ({ ...placement, year: placement.document.year }))
        .sort(compareSectionEntries(section.groupByYear))
        .map((placement) => toPublicDocument(placement.document, locale));
    }
  } catch (error) {
    logger.error("Failed to load page documents", error, { pageKey });
    for (const section of sections) result[section.key] = [];
  }

  return result as PageDocuments<P>;
}
