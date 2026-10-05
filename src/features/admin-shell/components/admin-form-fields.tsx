"use client";

import type { ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

import { adminInputClass, adminLabelClass } from "./admin-field-styles";
import { fieldErrorAttr } from "./use-scroll-to-first-error";

export type ContentLanguage = "hy" | "en";

type TextFieldProps<Name extends string> = {
  name: Name;
  label: string;
  defaultValue: string;
  error?: string;
  type?: "text" | "email" | "tel";
  required?: boolean;
  multiline?: boolean;
  onChange?: (value: string) => void;
};

export function TextField<Name extends string>({
  name,
  label,
  defaultValue,
  error,
  type = "text",
  required,
  multiline,
  onChange,
}: TextFieldProps<Name>) {
  const shared = {
    name,
    defaultValue,
    "aria-invalid": Boolean(error),
    "aria-required": required,
    className: cn(adminInputClass, "mt-1.5", error && "border-red-500"),
  };
  return (
    <label className="block">
      <span className={adminLabelClass}>
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </span>
      {multiline ? (
        <textarea {...shared} rows={4} onChange={(e) => onChange?.(e.target.value)} />
      ) : (
        <input {...shared} type={type} onChange={(e) => onChange?.(e.target.value)} />
      )}
      {error ? <span {...fieldErrorAttr} className="mt-1 block text-xs text-red-600">{error}</span> : null}
    </label>
  );
}

type FormCardProps = {
  title: string;
  description?: string;
  aside?: ReactNode;
  children: ReactNode;
};

export function FormCard({ title, description, aside, children }: FormCardProps) {
  return (
    <section className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-brand-ink">{title}</h3>
          {description ? <p className="mt-1 text-sm text-[#6f6f6f]">{description}</p> : null}
        </div>
        {aside}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

type LanguageSwitchProps = {
  value: ContentLanguage;
  onChange: (value: ContentLanguage) => void;
  labels: Record<ContentLanguage, string>;
  withErrors: Record<ContentLanguage, boolean>;
  ariaLabel: string;
  errorLabel: string;
};

const languages: ContentLanguage[] = ["hy", "en"];

export function LanguageSwitch({ value, onChange, labels, withErrors, ariaLabel, errorLabel }: LanguageSwitchProps) {
  return (
    <div role="tablist" aria-label={ariaLabel} className="relative inline-flex gap-1 rounded-full bg-[#f5f5f5] p-1">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1 bottom-1 left-1 w-[calc(50%-0.375rem)] rounded-full bg-brand-ink transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{ transform: value === "en" ? "translateX(calc(100% + 0.25rem))" : "translateX(0)" }}
      />
      {languages.map((language) => (
        <button
          key={language}
          type="button"
          role="tab"
          aria-selected={value === language}
          onClick={() => onChange(language)}
          className={cn(
            "relative z-10 min-w-24 flex-1 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-300",
            value === language ? "text-white" : "text-brand-ink hover:bg-white/70",
          )}
        >
          {labels[language]}
          {withErrors[language] ? (
            <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-red-500">
              <span className="sr-only">{errorLabel}</span>
            </span>
          ) : null}
        </button>
      ))}
    </div>
  );
}
