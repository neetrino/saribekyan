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

import { teamPages } from "../../config/placements";
import { saveTeamMember } from "../actions/team-member-actions";
import { initialTeamFormState, type TeamFormState } from "../actions/team-form-state";
import type { TeamMemberFormValues } from "../lib/form-values";
import { placementPageLabel, placementSectionLabel } from "../lib/placement-copy";
import { PhotoField } from "./photo-field";

type TeamMemberFormProps = {
  values: TeamMemberFormValues;
  sectionCounts: Record<string, number>;
  /** List URL (with current filters) to return to after save or cancel. */
  closeHref: string;
};

function languageErrors(errors: TeamFormState["fieldErrors"]): Record<ContentLanguage, boolean> {
  return {
    hy: Boolean(errors.nameHy || errors.positionHy || errors.bioHy),
    en: Boolean(errors.nameEn || errors.positionEn || errors.bioEn),
  };
}

export function TeamMemberForm({ values, sectionCounts, closeHref }: TeamMemberFormProps) {
  const { t } = useAdminI18n();
  const [state, formAction, pending] = useActionState(saveTeamMember, initialTeamFormState);
  const [language, setLanguage] = useState<ContentLanguage>("hy");
  const [displayName, setDisplayName] = useState(values.nameHy || values.nameEn);
  const errors = state.fieldErrors;
  const withErrors = languageErrors(errors);
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
        title={t("team.form.nameTitle")}
        description={t("team.form.nameDescription")}
        aside={
          <LanguageSwitch
            value={language}
            onChange={setLanguage}
            labels={{ hy: t("team.form.langHy"), en: t("team.form.langEn") }}
            withErrors={withErrors}
            ariaLabel={t("team.form.languageAria")}
            errorLabel={t("team.form.languageError")}
          />
        }
      >
        <div className={cn("grid gap-4 md:grid-cols-2", language !== "hy" && "hidden")}>
          <TextField name="nameHy" label={t("team.form.name")} defaultValue={values.nameHy} error={err(errors.nameHy)} required onChange={setDisplayName} />
          <TextField name="positionHy" label={t("team.form.position")} defaultValue={values.positionHy} error={err(errors.positionHy)} required />
          <div className="md:col-span-2">
            <TextField name="bioHy" label={t("team.form.bio")} defaultValue={values.bioHy} error={err(errors.bioHy)} multiline />
          </div>
        </div>
        <div className={cn("grid gap-4 md:grid-cols-2", language !== "en" && "hidden")}>
          <TextField name="nameEn" label={t("team.form.name")} defaultValue={values.nameEn} error={err(errors.nameEn)} required />
          <TextField name="positionEn" label={t("team.form.position")} defaultValue={values.positionEn} error={err(errors.positionEn)} required />
          <div className="md:col-span-2">
            <TextField name="bioEn" label={t("team.form.bio")} defaultValue={values.bioEn} error={err(errors.bioEn)} multiline />
          </div>
        </div>
      </FormCard>

      <FormCard title={t("team.form.photoTitle")}>
        <PhotoField memberName={displayName} currentUrl={values.photoUrl} error={errors.photo} />
      </FormCard>

      <FormCard title={t("team.form.contactsTitle")}>
        <div className="grid gap-4 md:grid-cols-2">
          <TextField name="email" type="email" label={t("team.form.email")} defaultValue={values.email} error={err(errors.email)} />
          <TextField name="phone" type="tel" label={t("team.form.phone")} defaultValue={values.phone} error={err(errors.phone)} />
        </div>
      </FormCard>

      <FormCard title={t("team.form.placementsTitle")} description={t("team.form.placementsDescription")}>
        <PlacementsField
          pages={teamPages}
          pageLabel={(page) => placementPageLabel(t, page.key, page.label)}
          sectionLabel={(pageKey, section) => placementSectionLabel(t, pageKey, section.key, section.label)}
          initial={values.placements}
          sectionCounts={sectionCounts}
          error={errors.placements}
        />
      </FormCard>

      <div className="sticky bottom-0 -mx-6 flex gap-3 border-t border-black/5 bg-white px-6 py-4">
        <button type="submit" disabled={pending} className={adminPrimaryButtonClass}>
          {pending ? t("team.form.saving") : values.id ? t("team.form.save") : t("team.form.create")}
        </button>
        <Link href={closeHref} scroll={false} className={adminSecondaryButtonClass}>{t("team.form.cancel")}</Link>
      </div>
    </form>
  );
}
