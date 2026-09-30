import { randomUUID } from "node:crypto";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import { logger } from "@/shared/lib/logger";

type LocalFileStoreOptions<Ext extends string> = {
  /** Directory under `storage/uploads/`. */
  folder: string;
  /** Public URL prefix served by a `/media/...` route, e.g. `/media/team/`. */
  publicPrefix: string;
  /** Allowed extensions mapped to the MIME type used when serving. */
  mimeTypes: Readonly<Record<Ext, string>>;
};

export type LocalFileStore<Ext extends string> = {
  /** Stores bytes under a random name and returns the public URL. */
  save: (bytes: Uint8Array, ext: Ext) => Promise<string>;
  /** Deletes a stored file; external URLs and static assets are ignored. */
  remove: (url: string | null) => Promise<void>;
  /** Reads a stored file by its generated name; returns null for unknown or missing files. */
  read: (fileName: string) => Promise<{ bytes: Buffer; mime: string } | null>;
};

const UPLOADS_ROOT = path.join(process.cwd(), "storage", "uploads");

/**
 * Local disk storage for admin uploads. Files live outside `public/` because Next.js
 * only serves public assets present at build time. Replace with object storage (e.g. R2)
 * for serverless deployments.
 */
export function createLocalFileStore<Ext extends string>({
  folder,
  publicPrefix,
  mimeTypes,
}: LocalFileStoreOptions<Ext>): LocalFileStore<Ext> {
  const dir = path.join(UPLOADS_ROOT, folder);
  const extensions = Object.keys(mimeTypes).join("|");
  const fileNamePattern = new RegExp(`^[0-9a-f-]{36}\\.(${extensions})$`, "u");

  return {
    async save(bytes, ext) {
      const fileName = `${randomUUID()}.${ext}`;
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, fileName), bytes);
      return `${publicPrefix}${fileName}`;
    },

    async remove(url) {
      const fileName = url?.startsWith(publicPrefix) ? url.slice(publicPrefix.length) : null;
      if (!fileName || !fileNamePattern.test(fileName)) return;
      try {
        await unlink(path.join(dir, fileName));
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
          logger.error("Failed to delete uploaded file", error, { folder, fileName });
        }
      }
    },

    async read(fileName) {
      const match = fileNamePattern.exec(fileName);
      if (!match) return null;
      try {
        const bytes = await readFile(path.join(dir, fileName));
        return { bytes, mime: mimeTypes[match[1] as Ext] };
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
          logger.error("Failed to read uploaded file", error, { folder, fileName });
        }
        return null;
      }
    },
  };
}
