import { promises as fs } from "node:fs";
import path from "node:path";

import type { AppLocale } from "./routing";

const LOCALES_ROOT = path.join(process.cwd(), "locales");

/**
 * Loads and merges all `*.json` catalogs for a locale into namespaced messages.
 * Example: `locales/hy/home.json` → `messages.home`.
 */
export async function loadMessages(
  locale: AppLocale,
): Promise<Record<string, Record<string, unknown>>> {
  const localeDir = path.join(LOCALES_ROOT, locale);
  const entries = await fs.readdir(localeDir, { withFileTypes: true });
  const jsonFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => entry.name)
    .sort();

  const messages: Record<string, Record<string, unknown>> = {};

  await Promise.all(
    jsonFiles.map(async (fileName) => {
      const namespace = fileName.replace(/\.json$/u, "");
      const raw = await fs.readFile(path.join(localeDir, fileName), "utf8");
      messages[namespace] = JSON.parse(raw) as Record<string, unknown>;
    }),
  );

  return messages;
}
