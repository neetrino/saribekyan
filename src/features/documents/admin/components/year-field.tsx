"use client";

import { useState } from "react";

import { adminInputClass } from "@/features/admin-shell/components/admin-field-styles";
import { fieldErrorAttr } from "@/features/admin-shell/components/use-scroll-to-first-error";
import { useAdminI18n } from "@/features/admin-shell/i18n/admin-i18n-provider";
import { cn } from "@/shared/lib/cn";

import { MIN_DOCUMENT_YEAR } from "../../lib/document-limits";

type YearFieldProps = {
  /** Years already used by documents (plus the current year), newest first. */
  years: readonly number[];
  maxYear: number;
  defaultValue: number;
  error?: string;
};

const NEW_YEAR_OPTION = "new";

/** Pick a known year or type a new one; a newly saved year then appears everywhere automatically. */
export function YearField({ years, maxYear, defaultValue, error }: YearFieldProps) {
  const { t } = useAdminI18n();
  const [custom, setCustom] = useState(!years.includes(defaultValue));
  const [value, setValue] = useState(String(defaultValue));
  const inputClass = cn(adminInputClass, "mt-1.5 w-40", error && "border-red-500");

  return (
    <div>
      <span className="text-sm font-medium text-brand-ink">
        {t("documents.form.year")}
        <span className="text-red-600"> *</span>
      </span>
      <div className="flex flex-wrap items-center gap-3">
        {custom ? (
          <input
            type="number"
            name="year"
            min={MIN_DOCUMENT_YEAR}
            max={maxYear}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            aria-label={t("documents.form.year")}
            aria-invalid={Boolean(error)}
            className={inputClass}
          />
        ) : (
          <select
            name="year"
            value={value}
            onChange={(event) => {
              if (event.target.value !== NEW_YEAR_OPTION) {
                setValue(event.target.value);
                return;
              }
              setCustom(true);
              setValue(String((years[0] ?? defaultValue) + 1));
            }}
            aria-label={t("documents.form.year")}
            aria-invalid={Boolean(error)}
            className={inputClass}
          >
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
            <option value={NEW_YEAR_OPTION}>{t("documents.form.addYear")}</option>
          </select>
        )}
        {custom && years.length > 0 ? (
          <button
            type="button"
            onClick={() => {
              setCustom(false);
              setValue(String(years.includes(Number(value)) ? value : years[0]));
            }}
            className="mt-1.5 text-sm font-semibold text-brand-teal hover:underline"
          >
            {t("documents.form.backToYears")}
          </button>
        ) : null}
      </div>
      {error ? <span {...fieldErrorAttr} className="mt-1 block text-xs text-red-600">{t(error)}</span> : null}
    </div>
  );
}
