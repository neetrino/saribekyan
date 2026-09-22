"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";

import { submitContact } from "../actions/submit-contact";
import { initialContactFormState } from "../actions/contact-form-state";
import { contactFormDepartments } from "../content/meta";

const fieldClassName =
  "mt-2 w-full rounded-2xl border border-[#e0e0e0] bg-white px-4 py-3 text-sm text-brand-ink outline-none transition-colors placeholder:text-[#9a9a9a] focus:border-brand-teal";

const errorFieldClassName = "border-red-400 focus:border-red-500";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialContactFormState,
  );

  return (
    <form
      action={formAction}
      className="rounded-3xl border border-[#e8e8e8] bg-[#fafafa] p-6 sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-brand-ink">
          {t("name")}
          <input
            name="name"
            type="text"
            autoComplete="name"
            required
            className={`${fieldClassName} ${state.fieldErrors.name ? errorFieldClassName : ""}`}
          />
          {state.fieldErrors.name ? (
            <span className="mt-1 block text-xs text-red-600">
              {t("errors.name")}
            </span>
          ) : null}
        </label>

        <label className="block text-sm font-medium text-brand-ink">
          {t("email")}
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className={`${fieldClassName} ${state.fieldErrors.email ? errorFieldClassName : ""}`}
          />
          {state.fieldErrors.email ? (
            <span className="mt-1 block text-xs text-red-600">
              {t("errors.email")}
            </span>
          ) : null}
        </label>

        <label className="block text-sm font-medium text-brand-ink">
          {t("phone")}
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className={`${fieldClassName} ${state.fieldErrors.phone ? errorFieldClassName : ""}`}
          />
          {state.fieldErrors.phone ? (
            <span className="mt-1 block text-xs text-red-600">
              {t("errors.phone")}
            </span>
          ) : null}
        </label>

        <label className="block text-sm font-medium text-brand-ink">
          {t("department")}
          <select
            name="department"
            required
            defaultValue="general"
            className={`${fieldClassName} ${state.fieldErrors.department ? errorFieldClassName : ""}`}
          >
            {contactFormDepartments.map((id) => (
              <option key={id} value={id}>
                {t(`departments.${id}`)}
              </option>
            ))}
          </select>
          {state.fieldErrors.department ? (
            <span className="mt-1 block text-xs text-red-600">
              {t("errors.department")}
            </span>
          ) : null}
        </label>
      </div>

      <label className="mt-5 block text-sm font-medium text-brand-ink">
        {t("subject")}
        <input
          name="subject"
          type="text"
          required
          className={`${fieldClassName} ${state.fieldErrors.subject ? errorFieldClassName : ""}`}
        />
        {state.fieldErrors.subject ? (
          <span className="mt-1 block text-xs text-red-600">
            {t("errors.subject")}
          </span>
        ) : null}
      </label>

      <label className="mt-5 block text-sm font-medium text-brand-ink">
        {t("message")}
        <textarea
          name="message"
          required
          rows={5}
          className={`${fieldClassName} resize-y ${state.fieldErrors.message ? errorFieldClassName : ""}`}
        />
        {state.fieldErrors.message ? (
          <span className="mt-1 block text-xs text-red-600">
            {t("errors.message")}
          </span>
        ) : null}
      </label>

      {state.messageKey ? (
        <p
          role="status"
          className={`mt-5 rounded-2xl px-4 py-3 text-sm ${
            state.ok
              ? "bg-brand-mint/40 text-brand-ink"
              : "bg-red-50 text-red-700"
          }`}
        >
          {t(state.messageKey)}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-brand-ink px-7 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
