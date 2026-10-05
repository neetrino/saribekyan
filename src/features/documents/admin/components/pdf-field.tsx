"use client";

import { useRef, useState, type ChangeEvent } from "react";

import { adminSecondaryButtonClass } from "@/features/admin-shell/components/admin-field-styles";
import { useAdminConfirm } from "@/features/admin-shell/components/admin-confirm-dialog";
import { fieldErrorAttr } from "@/features/admin-shell/components/use-scroll-to-first-error";
import { useAdminI18n } from "@/features/admin-shell/i18n/admin-i18n-provider";

import { MAX_PDF_BYTES } from "../../lib/document-limits";
import { formatFileSize } from "../lib/format-file-size";
import type { DocumentFormValues } from "../lib/form-values";

type PdfFieldProps = {
  current: DocumentFormValues["file"];
  error?: string;
};

/** Upload-only PDF input; the stored file is kept unless a new one is chosen. */
export function PdfField({ current, error }: PdfFieldProps) {
  const { t } = useAdminI18n();
  const { ask, dialog } = useAdminConfirm();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<{ name: string; size: number } | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  // Oversized files are rejected here: they would exceed the Server Action body limit.
  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file && file.size > MAX_PDF_BYTES) {
      event.target.value = "";
      setSelected(null);
      setLocalError("errors.fileSize");
      return;
    }
    setLocalError(null);
    setSelected(file ? { name: file.name, size: file.size } : null);
  }

  function clearSelection() {
    ask(t("common.confirmDelete"), () => {
      if (inputRef.current) inputRef.current.value = "";
      setSelected(null);
      setLocalError(null);
    });
  }

  const message = localError ?? error;

  return (
    <div className="space-y-3">
      {current ? (
        <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-[#f5f5f5] px-4 py-3 text-sm">
          <span className="font-jakarta text-xs font-extrabold text-brand-teal">PDF</span>
          <span className="min-w-0 flex-1 truncate font-medium text-brand-ink">{current.name}</span>
          <span className="text-[#6f6f6f]">{formatFileSize(current.size)}</span>
          <a href={current.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-teal hover:underline">
            {t("documents.open")}
          </a>
        </div>
      ) : (
        <p className="text-sm text-[#6f6f6f]">{t("documents.form.noFile")}</p>
      )}
      <input
        ref={inputRef}
        type="file"
        name="file"
        accept="application/pdf,.pdf"
        onChange={onFileChange}
        className="sr-only"
        tabIndex={-1}
      />
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => inputRef.current?.click()} className={adminSecondaryButtonClass}>
          {current ? t("documents.form.replaceFile") : t("documents.form.chooseFile")}
        </button>
        {selected ? (
          <>
            <span className="text-sm text-brand-ink">
              {t("documents.form.selectedFile", { name: selected.name })} · {formatFileSize(selected.size)}
            </span>
            <button type="button" onClick={clearSelection} className="text-sm font-semibold text-red-600 hover:underline">
              {t("documents.form.clearFile")}
            </button>
          </>
        ) : null}
      </div>
      <p className="text-xs text-[#6f6f6f]">{t("documents.form.fileHint")}</p>
      {message ? <p {...fieldErrorAttr} className="text-sm text-red-600">{t(message)}</p> : null}
      {dialog}
    </div>
  );
}
