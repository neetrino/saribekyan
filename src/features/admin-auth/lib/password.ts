import { createHash, timingSafeEqual } from "node:crypto";

function digest(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

/** Constant-time comparison of the submitted password with `ADMIN_PASSWORD`. */
export function verifyPassword(password: string, expectedPassword: string): boolean {
  return timingSafeEqual(digest(password), digest(expectedPassword));
}
