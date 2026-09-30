/** Upload limit for a single PDF; keep in sync with `serverActions.bodySizeLimit` in `next.config.ts`. */
export const MAX_PDF_BYTES = 10 * 1024 * 1024;

export const MIN_DOCUMENT_YEAR = 1990;

/** Documents may be dated a few years ahead (plans, budgets). */
const FUTURE_YEARS_ALLOWED = 5;

export function maxDocumentYear(now: Date = new Date()): number {
  return now.getFullYear() + FUTURE_YEARS_ALLOWED;
}
