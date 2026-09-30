"use server";

import { redirect } from "next/navigation";

import { requireAdmin } from "@/features/admin-auth";
import { entryIdSchema } from "@/features/admin-shell/lib/form-parsing";
import { logger } from "@/shared/lib/logger";
import { prisma } from "@/shared/lib/prisma";

import { parseDocumentForm } from "../lib/parse-document-form";
import { deletePdf, PdfValidationError, savePdf, type StoredPdf } from "../lib/pdf-storage";
import { ADMIN_DOCUMENTS_PATH, revalidateDocumentPages } from "../lib/revalidate-document-pages";
import type { DocumentInput } from "../schemas/document-schema";
import { isDocumentListPath } from "../services/document-filters";
import type { DocumentFormState } from "./document-form-state";

type FileResult = { file: StoredPdf; uploaded: boolean } | { error: string };

function failure(error: string, fieldErrors: DocumentFormState["fieldErrors"] = {}): DocumentFormState {
  return { error, fieldErrors };
}

/** A new upload replaces the stored file; without one the current file is kept (required for new documents). */
async function resolveFile(formData: FormData, current: StoredPdf | null): Promise<FileResult> {
  const upload = formData.get("file");
  if (upload instanceof File && upload.size > 0) {
    try {
      return { file: await savePdf(upload), uploaded: true };
    } catch (error) {
      if (error instanceof PdfValidationError) return { error: error.message };
      throw error;
    }
  }
  return current ? { file: current, uploaded: false } : { error: "errors.fileRequired" };
}

async function persistDocument(id: string | null, data: DocumentInput & StoredPdf): Promise<void> {
  const { placements, ...document } = data;

  if (!id) {
    await prisma.siteDocument.create({ data: { ...document, placements: { create: placements } } });
    return;
  }

  await prisma.$transaction([
    prisma.siteDocument.update({ where: { id }, data: document }),
    prisma.siteDocumentPlacement.deleteMany({ where: { documentId: id } }),
    prisma.siteDocumentPlacement.createMany({
      data: placements.map((placement) => ({ ...placement, documentId: id })),
    }),
  ]);
}

function readDocumentId(formData: FormData): string | null | undefined {
  const raw = formData.get("id");
  if (typeof raw !== "string" || raw === "") return null;
  return entryIdSchema.safeParse(raw).success ? raw : undefined;
}

/** Only admin document list URLs are accepted to avoid open redirects. */
function readReturnPath(formData: FormData): string {
  const raw = formData.get("returnTo");
  return typeof raw === "string" && isDocumentListPath(raw) ? raw : ADMIN_DOCUMENTS_PATH;
}

/** Creates or updates a document, its PDF and all of its page/section placements. */
export async function saveDocument(_prev: DocumentFormState, formData: FormData): Promise<DocumentFormState> {
  await requireAdmin();

  const id = readDocumentId(formData);
  if (id === undefined) return failure("errors.invalidId");

  const parsed = parseDocumentForm(formData);
  if (!parsed.ok) return parsed.state;

  const existing = id
    ? await prisma.siteDocument.findUnique({ where: { id }, include: { placements: true } })
    : null;
  if (id && !existing) return failure("errors.documentNotFound");

  const result = await resolveFile(formData, existing);
  if ("error" in result) return failure("errors.fixFields", { file: result.error });
  const { fileUrl, fileName, fileSize } = result.file;

  try {
    await persistDocument(id, { ...parsed.data, fileUrl, fileName, fileSize });
  } catch (error) {
    logger.error("Failed to save document", error, { id });
    if (result.uploaded) await deletePdf(fileUrl);
    return failure("errors.documentSaveFailed");
  }

  if (existing && existing.fileUrl !== fileUrl) await deletePdf(existing.fileUrl);
  revalidateDocumentPages([
    ...(existing?.placements.map((placement) => placement.pageKey) ?? []),
    ...parsed.data.placements.map((placement) => placement.pageKey),
  ]);
  redirect(readReturnPath(formData));
}

export async function deleteDocument(formData: FormData): Promise<void> {
  await requireAdmin();

  const returnPath = readReturnPath(formData);
  const id = readDocumentId(formData);
  if (!id) redirect(returnPath);

  const document = await prisma.siteDocument.findUnique({ where: { id }, include: { placements: true } });
  if (document) {
    await prisma.siteDocument.delete({ where: { id } });
    await deletePdf(document.fileUrl);
    revalidateDocumentPages(document.placements.map((placement) => placement.pageKey));
  }
  redirect(returnPath);
}
