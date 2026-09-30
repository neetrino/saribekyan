import { createLocalFileStore } from "@/shared/lib/local-file-store";

import { MAX_PDF_BYTES } from "../../lib/document-limits";

/** Served by `/media/documents/[file]`. */
const store = createLocalFileStore<"pdf">({
  folder: "documents",
  publicPrefix: "/media/documents/",
  mimeTypes: { pdf: "application/pdf" },
});

/** `%PDF-` file signature. */
const PDF_MAGIC = [0x25, 0x50, 0x44, 0x46, 0x2d] as const;
const MAX_FILE_NAME_LENGTH = 200;
const FALLBACK_FILE_NAME = "document.pdf";

export class PdfValidationError extends Error {}

export type StoredPdf = {
  fileUrl: string;
  fileName: string;
  fileSize: number;
};

const RESERVED_FILE_NAME_CHARS = new Set(['<', '>', ':', '"', "|", "?", "*"]);

function isSafeFileNameChar(char: string): boolean {
  const code = char.codePointAt(0) ?? 0;
  return code >= 0x20 && code !== 0x7f && !RESERVED_FILE_NAME_CHARS.has(char);
}

/** Keeps the original name for downloads, without path parts or characters invalid in file names. */
function sanitizeFileName(name: string): string {
  const base = name.split(/[\\/]/u).pop() ?? "";
  const cleaned = Array.from(base, (char) => (isSafeFileNameChar(char) ? char : " "))
    .join("")
    .replace(/\s+/gu, " ")
    .trim()
    .slice(0, MAX_FILE_NAME_LENGTH);
  if (!cleaned) return FALLBACK_FILE_NAME;
  return /\.pdf$/iu.test(cleaned) ? cleaned : `${cleaned}.pdf`;
}

/** Validates type (by content, not client MIME) and size, stores the file and returns its metadata. */
export async function savePdf(file: File): Promise<StoredPdf> {
  if (file.size > MAX_PDF_BYTES) {
    throw new PdfValidationError("errors.fileSize");
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!PDF_MAGIC.every((byte, index) => bytes[index] === byte)) {
    throw new PdfValidationError("errors.fileType");
  }

  const fileUrl = await store.save(bytes, "pdf");
  return { fileUrl, fileName: sanitizeFileName(file.name), fileSize: file.size };
}

/** Deletes a previously uploaded PDF; static assets under `public/` are ignored. */
export const deletePdf = store.remove;

export const readPdf = store.read;
