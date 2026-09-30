import { stat } from "node:fs/promises";
import path from "node:path";

import type { PrismaClient } from "@prisma/client";

import { seedDocuments } from "./seed-documents-data";

async function fileSize(publicUrl: string): Promise<number> {
  const { size } = await stat(path.join(process.cwd(), "public", publicUrl));
  return size;
}

/** Seeds initial documents only into an empty table so admin-managed data is never overwritten. */
export async function seedSiteDocuments(prisma: PrismaClient): Promise<void> {
  const existing = await prisma.siteDocument.count();
  if (existing > 0) {
    return;
  }

  for (const document of seedDocuments) {
    await prisma.siteDocument.create({
      data: {
        titleHy: document.titleHy,
        titleEn: document.titleEn,
        descriptionHy: document.descriptionHy ?? null,
        descriptionEn: document.descriptionEn ?? null,
        year: document.year,
        fileUrl: document.file,
        fileName: path.posix.basename(document.file),
        fileSize: await fileSize(document.file),
        placements: {
          create: document.placements.map((placement) => ({
            pageKey: placement.page,
            sectionKey: placement.section,
            sortOrder: placement.order,
          })),
        },
      },
    });
  }
}
