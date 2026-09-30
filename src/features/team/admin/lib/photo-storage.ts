import { createLocalFileStore } from "@/shared/lib/local-file-store";

const MAX_PHOTO_BYTES = 2 * 1024 * 1024;

const imageTypes = {
  jpg: { mime: "image/jpeg", magic: [0xff, 0xd8, 0xff] },
  png: { mime: "image/png", magic: [0x89, 0x50, 0x4e, 0x47] },
  webp: { mime: "image/webp", magic: [0x52, 0x49, 0x46, 0x46] },
} as const;

type ImageExt = keyof typeof imageTypes;

/** Served by `/media/team/[file]`. */
const store = createLocalFileStore<ImageExt>({
  folder: "team",
  publicPrefix: "/media/team/",
  mimeTypes: { jpg: imageTypes.jpg.mime, png: imageTypes.png.mime, webp: imageTypes.webp.mime },
});

export class PhotoValidationError extends Error {}

function detectExtension(bytes: Uint8Array): ImageExt | null {
  const entries = Object.entries(imageTypes) as Array<[ImageExt, (typeof imageTypes)[ImageExt]]>;
  const match = entries.find(([, type]) => type.magic.every((byte, i) => bytes[i] === byte));
  return match ? match[0] : null;
}

/** Validates type (by content, not client MIME) and size, stores the file, returns its public URL. */
export async function savePhoto(file: File): Promise<string> {
  if (file.size > MAX_PHOTO_BYTES) {
    throw new PhotoValidationError("errors.photoSize");
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const ext = detectExtension(bytes);
  if (!ext) {
    throw new PhotoValidationError("errors.photoType");
  }
  return store.save(bytes, ext);
}

/** Deletes a previously uploaded photo; external URLs and static assets are ignored. */
export const deletePhoto = store.remove;

export const readPhoto = store.read;
