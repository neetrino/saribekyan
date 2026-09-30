"use client";

import { useActionState } from "react";

import { useAdminI18n } from "@/features/admin-shell/i18n/admin-i18n-provider";

import { loginAdmin, type LoginState } from "../actions/auth-actions";

const initialState: LoginState = { error: null };

export function LoginForm() {
  const { t } = useAdminI18n();
  const [state, formAction, pending] = useActionState(loginAdmin, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <label className="block">
        <span className="text-sm font-medium text-brand-ink">{t("login.email")}</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="username"
          className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-teal"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-brand-ink">{t("login.password")}</span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-teal"
        />
      </label>
      {state.error ? (
        <p role="alert" className="text-sm text-red-600">
          {t(`login.errors.${state.error}`)}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-brand-ink px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? t("login.pending") : t("login.submit")}
      </button>
    </form>
  );
}
