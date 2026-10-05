"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";

import { adminSecondaryButtonClass } from "@/features/admin-shell/components/admin-field-styles";
import { useAdminConfirm } from "@/features/admin-shell/components/admin-confirm-dialog";
import { fieldErrorAttr } from "@/features/admin-shell/components/use-scroll-to-first-error";
import { useAdminI18n } from "@/features/admin-shell/i18n/admin-i18n-provider";

import { TeamAvatar } from "../../components/team-avatar";

type PhotoFieldProps = {
  memberName: string;
  currentUrl: string;
  error?: string;
};

/** Upload-only photo input with preview; the stored photo is kept unless replaced or removed. */
export function PhotoField({ memberName, currentUrl, error }: PhotoFieldProps) {
  const { t } = useAdminI18n();
  const { ask, dialog } = useAdminConfirm();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [remove, setRemove] = useState(false);

  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview);
  }, [preview]);

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setPreview(file ? URL.createObjectURL(file) : null);
    if (file) setRemove(false);
  }

  const storedUrl = remove ? null : currentUrl || null;
  const hasPhoto = Boolean(preview || storedUrl);

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
      {preview && !remove ? (
        // Blob previews cannot go through next/image.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt="" className="size-28 shrink-0 rounded-2xl object-cover" />
      ) : (
        <TeamAvatar
          name={memberName || "?"}
          imageUrl={storedUrl}
          sizes="112px"
          className="size-28 rounded-2xl bg-brand-ink text-2xl text-white"
        />
      )}
      <div className="space-y-3">
        <input
          ref={inputRef}
          type="file"
          name="photo"
          accept="image/jpeg,image/png,image/webp"
          onChange={onFileChange}
          className="sr-only"
          tabIndex={-1}
        />
        <button type="button" onClick={() => inputRef.current?.click()} className={adminSecondaryButtonClass}>
          {hasPhoto && !remove ? t("team.form.replacePhoto") : t("team.form.choosePhoto")}
        </button>
        <p className="text-xs text-[#6f6f6f]">{t("team.form.photoHint")}</p>
        {hasPhoto || remove ? (
          <label className="flex items-center gap-2 text-sm text-brand-ink">
            <input
              type="checkbox"
              name="removePhoto"
              checked={remove}
              onChange={(e) => {
                if (!e.target.checked) {
                  setRemove(false);
                  return;
                }
                ask(t("common.confirmDelete"), () => setRemove(true));
              }}
            />
            {t("team.form.removePhoto")}
          </label>
        ) : null}
        {error ? <p {...fieldErrorAttr} className="text-sm text-red-600">{t(error)}</p> : null}
      </div>
      {dialog}
    </div>
  );
}
