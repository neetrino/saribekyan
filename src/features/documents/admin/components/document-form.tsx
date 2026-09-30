"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent } from "react";

import { adminPrimaryButtonClass, adminSecondaryButtonClass } from "@/features/admin-shell/components/admin-field-styles";
import {
  FormCard,
  LanguageSwitch,
  TextField,
  type ContentLanguage,
} from "@/features/admin-shell/components/admin-form-fields";
import { PlacementsField } from "@/features/admin-shell/components/placements-field";
import { useScrollToFirstError } from "@/features/admin-shell/components/use-scroll-to-first-error";
import { useAdminI18n } from "@/features/admin-shell/i18n/admin-i18n-provider";
import { cn } from "@/shared/lib/cn";

import { documentPages } from "../../config/placements";
import { saveDocument } from "../actions/document-actions";
import { initialDocumentFormState, type DocumentFormState } from "../actions/document-form-state";
import type { DocumentFormValues } from "../lib/form-values";
import { documentPageLabel, documentSectionLabel } from "../lib/placement-copy";
import { PdfField } from "./pdf-field";
import { YearField } from "./year-field";

type DocumentFormProps = {
  values: DocumentFormValues;
  years: readonly number[];
  maxYear: number;
  sectionCounts: Record<string, number>;
  /** List URL (with current filters) to return to after save or cancel. */
  closeHref: string;
};

function languageErrors(errors: DocumentFormState["fieldErrors"]): Record<ContentLanguage, boolean> {
  return {
    hy: Boolean(errors.titleHy || errors.descriptionHy),
    en: Boolean(errors.titleEn || errors.descriptionEn),
  };
}

export function DocumentForm({ values, years, maxYear, sectionCounts, closeHref }: DocumentFormProps) {
  const { t } = useAdminI18n();
  const [state, formAction, pending] = useActionState(saveDocument, initialDocumentFormState);
  const [language, setLanguage] = useState<ContentLanguage>("hy");
  const errors = state.fieldErrors;
  const err = (message: string | undefined) => (message ? t(message) : undefined);
  const formRef = useRef<HTMLFormElement>(null);
  useScrollToFirstError(formRef, state, Boolean(state.error));

  useEffect(() => {
    const current = languageErrors(state.fieldErrors);
    if (!current.hy && current.en) setLanguage("en");
    if (current.hy) setLanguage("hy");
  }, [state.fieldErrors]);

  // Submitting manually keeps typed values when the server returns validation errors
  // (React resets uncontrolled fields after a form `action` completes).
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6">
      {values.id ? <input type="hidden" name="id" value={values.id} /> : null}
      <input type="hidden" name="returnTo" value={closeHref} />
      {state.error ? (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{t(state.error)}</p>
      ) : null}

      <FormCard
        title={t("documents.form.contentTitle")}
        description={t("documents.form.contentDescription")}
        aside={
          <LanguageSwitch
            value={language}
            onChange={setLanguage}
            labels={{ hy: t("documents.form.langHy"), en: t("documents.form.langEn") }}
            withErrors={languageErrors(errors)}
            ariaLabel={t("documents.form.languageAria")}
            errorLabel={t("documents.form.languageError")}
          />
        }
      >
        <div className={cn("grid gap-4", language !== "hy" && "hidden")}>
          <TextField name="titleHy" label={t("documents.form.title")} defaultValue={values.titleHy} error={err(errors.titleHy)} required />
          <TextField name="descriptionHy" label={t("documents.form.description")} defaultValue={values.descriptionHy} error={err(errors.descriptionHy)} multiline />
        </div>
        <div className={cn("grid gap-4", language !== "en" && "hidden")}>
          <TextField name="titleEn" label={t("documents.form.title")} defaultValue={values.titleEn} error={err(errors.titleEn)} required />
          <TextField name="descriptionEn" label={t("documents.form.description")} defaultValue={values.descriptionEn} error={err(errors.descriptionEn)} multiline />
        </div>
      </FormCard>

      <FormCard title={t("documents.form.fileTitle")}>
        <PdfField current={values.file} error={errors.file} />
      </FormCard>

      <FormCard title={t("documents.form.yearTitle")} description={t("documents.form.yearDescription")}>
        <YearField years={years} maxYear={maxYear} defaultValue={values.year} error={errors.year} />
      </FormCard>

      <FormCard title={t("documents.form.placementsTitle")} description={t("documents.form.placementsDescription")}>
        <PlacementsField
          pages={documentPages}
          pageLabel={(page) => documentPageLabel(t, page.key, page.label)}
          sectionLabel={(pageKey, section) => documentSectionLabel(t, pageKey, section.key, section.label)}
          initial={values.placements}
          sectionCounts={sectionCounts}
          error={errors.placements}
          multipleRows={false}
        />
      </FormCard>

      <div className="sticky bottom-0 -mx-6 flex gap-3 border-t border-black/5 bg-white px-6 py-4">
        <button type="submit" disabled={pending} className={adminPrimaryButtonClass}>
          {pending ? t("documents.form.saving") : values.id ? t("documents.form.save") : t("documents.form.create")}
        </button>
        <Link href={closeHref} scroll={false} className={adminSecondaryButtonClass}>{t("documents.form.cancel")}</Link>
      </div>
    </form>
  );
}
