"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { logger } from "@/shared/lib/logger";

import { readAdminEnv } from "../lib/admin-env";
import { verifyPassword } from "../lib/password";
import { ADMIN_LOGIN_PATH } from "../lib/require-admin";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_TTL_SECONDS,
  createSessionToken,
} from "../lib/session";

export type LoginState = { error: "invalid" | "config" | null };

const MAX_PASSWORD_LENGTH = 256;
const MAX_EMAIL_LENGTH = 160;
const loginSchema = z.object({
  email: z.string().trim().toLowerCase().max(MAX_EMAIL_LENGTH),
  password: z.string().min(1).max(MAX_PASSWORD_LENGTH),
});

export async function loginAdmin(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const env = readAdminEnv();
  if (!env) {
    logger.error("Admin login attempted but ADMIN_EMAIL / ADMIN_PASSWORD are not configured");
    return { error: "config" };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: "invalid" };
  }

  // Always run the password check so response time does not reveal whether the email matched.
  const passwordOk = verifyPassword(parsed.data.password, env.ADMIN_PASSWORD);
  if (!passwordOk || parsed.data.email !== env.ADMIN_EMAIL) {
    logger.warn("Admin login failed");
    return { error: "invalid" };
  }

  const store = await cookies();
  store.set(ADMIN_SESSION_COOKIE, createSessionToken(env.sessionSecret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: ADMIN_SESSION_TTL_SECONDS,
  });
  redirect("/admin/team");
}

export async function logoutAdmin(): Promise<void> {
  const store = await cookies();
  store.delete({ name: ADMIN_SESSION_COOKIE, path: "/admin" });
  redirect(ADMIN_LOGIN_PATH);
}
