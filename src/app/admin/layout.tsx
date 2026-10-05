import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AdminI18nProvider } from "@/features/admin-shell/i18n/admin-i18n-provider";
import { getAdminI18n } from "@/features/admin-shell/i18n/get-admin-locale";
import { fontVariables } from "@/shared/config/fonts";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin" },
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
};

type AdminRootLayoutProps = {
  children: ReactNode;
};

export default async function AdminRootLayout({ children }: AdminRootLayoutProps) {
  const { locale, messages } = await getAdminI18n();

  return (
    <html lang={locale}>
      <body className={`${fontVariables} min-h-dvh bg-[#f4f1ec] font-sans text-brand-ink antialiased`}>
        <AdminI18nProvider locale={locale} messages={messages}>
          {children}
        </AdminI18nProvider>
      </body>
    </html>
  );
}
