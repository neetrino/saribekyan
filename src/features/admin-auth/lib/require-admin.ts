import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { readAdminEnv } from "./admin-env";
import { ADMIN_SESSION_COOKIE, isValidSessionToken } from "./session";

export const ADMIN_LOGIN_PATH = "/admin/login";

export async function isAdminAuthenticated(): Promise<boolean> {
  const env = readAdminEnv();
  if (!env) {
    return false;
  }
  const store = await cookies();
  return isValidSessionToken(store.get(ADMIN_SESSION_COOKIE)?.value, env.sessionSecret);
}

/** Guards admin pages and server actions; redirects to login when the session is missing or invalid. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdminAuthenticated())) {
    redirect(ADMIN_LOGIN_PATH);
  }
}
