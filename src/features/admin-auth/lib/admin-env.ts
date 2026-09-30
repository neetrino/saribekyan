import { createHash } from "node:crypto";

import { z } from "zod";

const SESSION_KEY_CONTEXT = "admin-session-v1";

const adminEnvSchema = z.object({
  ADMIN_EMAIL: z.email().transform((value) => value.toLowerCase()),
  ADMIN_PASSWORD: z.string().min(1),
});

export type AdminEnv = z.infer<typeof adminEnvSchema> & { sessionSecret: string };

/**
 * Returns validated admin env or `null` when misconfigured (admin access is then denied).
 * The session signing key is derived from the credentials, so changing them invalidates all sessions.
 */
export function readAdminEnv(): AdminEnv | null {
  const parsed = adminEnvSchema.safeParse({
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  });
  if (!parsed.success) {
    return null;
  }

  const sessionSecret = createHash("sha256")
    .update(`${SESSION_KEY_CONTEXT}:${parsed.data.ADMIN_EMAIL}:${parsed.data.ADMIN_PASSWORD}`)
    .digest("hex");
  return { ...parsed.data, sessionSecret };
}
