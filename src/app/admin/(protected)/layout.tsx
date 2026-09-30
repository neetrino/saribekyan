import type { ReactNode } from "react";

import { requireAdmin } from "@/features/admin-auth";
import { AdminSidebar } from "@/features/admin-shell/components/admin-sidebar";

type ProtectedAdminLayoutProps = {
  children: ReactNode;
};

export default async function ProtectedAdminLayout({ children }: ProtectedAdminLayoutProps) {
  await requireAdmin();

  return (
    <div className="flex min-h-dvh flex-col md:h-dvh md:flex-row md:overflow-hidden">
      <AdminSidebar />
      <main className="min-w-0 flex-1 px-6 py-8 md:overflow-y-auto">
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
