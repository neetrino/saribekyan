"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/shared/lib/cn";

import { useAdminI18n } from "../i18n/admin-i18n-provider";
import { adminSecondaryButtonClass } from "./admin-field-styles";

const MODAL_MS = 280;

type ConfirmRequest = {
  message: string;
  action: () => void;
};

/** Asks for a delete confirmation in an animated modal, then runs `action` only if accepted. */
export function useAdminConfirm() {
  const [request, setRequest] = useState<ConfirmRequest | null>(null);
  const [shown, setShown] = useState(false);

  const ask = useCallback((message: string, action: () => void) => {
    setRequest({ message, action });
    window.requestAnimationFrame(() => setShown(true));
  }, []);

  const close = useCallback((accepted: boolean) => {
    setShown(false);
    window.setTimeout(() => {
      setRequest((current) => {
        if (accepted) current?.action();
        return null;
      });
    }, MODAL_MS);
  }, []);

  const dialog = request ? (
    <AdminConfirmDialog message={request.message} shown={shown} onCancel={() => close(false)} onConfirm={() => close(true)} />
  ) : null;

  return { ask, dialog };
}

type AdminConfirmDialogProps = {
  message: string;
  shown: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

function AdminConfirmDialog({ message, shown, onCancel, onConfirm }: AdminConfirmDialogProps) {
  const { t } = useAdminI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="admin-confirm-title">
      <div
        className={cn("absolute inset-0 bg-brand-ink/40 transition-opacity duration-300 ease-out", shown ? "opacity-100" : "opacity-0")}
        onClick={onCancel}
        aria-hidden="true"
      />
      <div
        className={cn(
          "relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl transition-all duration-300 ease-out",
          shown ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-0",
        )}
      >
        <h2 id="admin-confirm-title" className="text-base font-semibold text-brand-ink">{t("common.confirmTitle")}</h2>
        <p className="mt-2 text-sm text-[#6f6f6f]">{message}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button type="button" onClick={onCancel} className={adminSecondaryButtonClass}>{t("common.cancel")}</button>
          <button type="button" onClick={onConfirm} className="inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
            {t("common.delete")}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
