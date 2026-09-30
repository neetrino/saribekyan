import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { LoginForm, isAdminAuthenticated } from "@/features/admin-auth";
import { AdminLocaleSwitch } from "@/features/admin-shell/components/admin-locale-switch";
import { getAdminI18n } from "@/features/admin-shell/i18n/get-admin-locale";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getAdminI18n();
  return { title: t("login.title") };
}

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin/team");
  }

  const { t } = await getAdminI18n();

  return (
    <main className="flex min-h-dvh items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
        <p className="font-jakarta text-sm font-extrabold uppercase tracking-wide text-brand-teal">
          {t("login.kicker")}
        </p>
        <h1 className="mt-2 text-2xl font-semibold">{t("login.title")}</h1>
        <div className="mt-6">
          <LoginForm />
        </div>
        <div className="mt-6">
          <AdminLocaleSwitch />
        </div>
      </div>
    </main>
  );
}
