"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

import { useAdminI18n } from "../i18n/admin-i18n-provider";

const DRAWER_MS = 320;

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
  const [shown, setShown] = useState(false);
  const closingRef = useRef(false);

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setShown(false);
    window.setTimeout(() => router.push(closeHref, { scroll: false }), DRAWER_MS);
  }, [router, closeHref]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setShown(true));
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [close]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-labelledby="admin-drawer-title">
      <div
        className={cn(
          "absolute inset-0 bg-brand-ink/40 transition-opacity duration-300 ease-out",
          shown ? "opacity-100" : "opacity-0",
        )}
        aria-hidden="true"
        onClick={close}
      />
      <div
        className={cn(
          "relative h-full w-full transition-transform duration-300 ease-out md:w-[70vw]",
          shown ? "translate-x-0" : "translate-x-full",
        )}
      >
        <button
          type="button"
          onClick={close}
          aria-label={t("common.close")}
          className="absolute top-[22px] left-4 z-30 flex h-[38px] w-20 items-center justify-center rounded-full bg-[#3f7a72] text-white transition-transform duration-200 hover:scale-[1.06] md:left-0 md:z-10 md:-translate-x-1/2 md:pr-10"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            aria-hidden="true"
            className="md:translate-x-0.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div
          ref={panelRef}
          tabIndex={-1}
          className="relative flex h-full flex-col overflow-hidden rounded-tl-3xl rounded-bl-3xl bg-[#f4f1ec] shadow-2xl outline-none md:z-20"
        >
          <header className="flex items-center justify-between gap-4 border-b border-black/5 bg-white px-6 py-4">
            <h2 id="admin-drawer-title" className="truncate text-xl font-semibold text-brand-ink">
              {title}
            </h2>
            {headerActions ? <div className="flex shrink-0 items-center gap-3">{headerActions}</div> : null}
          </header>
          <div className="flex-1 overflow-y-auto px-6 pt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
