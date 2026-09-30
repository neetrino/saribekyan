"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, type ReactNode } from "react";

import { useAdminI18n } from "../i18n/admin-i18n-provider";

type AdminDrawerPanelProps = {
  title: string;
  closeHref: string;
  headerActions?: ReactNode;
  children: ReactNode;
};

/** Right-side panel (70% width on desktop, full width on mobile) over an admin list. */
export function AdminDrawerPanel({ title, closeHref, headerActions, children }: AdminDrawerPanelProps) {
  const { t } = useAdminI18n();
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => router.push(closeHref, { scroll: false }), [router, closeHref]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [close]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-labelledby="admin-drawer-title">
      <div className="absolute inset-0 bg-brand-ink/40" aria-hidden="true" onClick={close} />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative flex h-full w-full flex-col bg-[#f5f5f5] shadow-2xl outline-none md:w-[70vw]"
      >
        <header className="flex items-center justify-between gap-4 border-b border-black/5 bg-white px-6 py-4">
          <h2 id="admin-drawer-title" className="truncate text-xl font-semibold text-brand-ink">
            {title}
          </h2>
          <div className="flex shrink-0 items-center gap-3">
            {headerActions}
            <button
              type="button"
              onClick={close}
              aria-label={t("common.close")}
              className="flex size-10 items-center justify-center rounded-full text-2xl leading-none text-brand-ink transition-colors hover:bg-[#f5f5f5]"
            >
              ×
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto px-6 pt-6">{children}</div>
      </div>
    </div>
  );
}
