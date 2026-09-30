import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "admin_session";
export const ADMIN_SESSION_TTL_SECONDS = 8 * 60 * 60;

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

/** Stateless session token: `<expiresAtMs>.<hmac>`. */
export function createSessionToken(secret: string, now: number = Date.now()): string {
  const expiresAt = String(now + ADMIN_SESSION_TTL_SECONDS * 1000);
  return `${expiresAt}.${sign(expiresAt, secret)}`;
}

export function isValidSessionToken(
  token: string | undefined,
  secret: string,
  now: number = Date.now(),
): boolean {
  if (!token) {
    return false;
  }

  const [expiresAt, signature] = token.split(".");
  if (!expiresAt || !signature || Number(expiresAt) <= now) {
    return false;
  }

  const expected = Buffer.from(sign(expiresAt, secret));
  const actual = Buffer.from(signature);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
