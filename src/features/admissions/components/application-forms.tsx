import { getTranslations } from "next-intl/server";

import { applicationForms } from "../content/hub";

export async function ApplicationForms() {
  const t = await getTranslations("admissions");

  return (
    <ul className="grid gap-5 lg:grid-cols-3">
      {applicationForms.map((form) => (
        <li key={form.id}>
          <article className="flex h-full flex-col rounded-3xl bg-gradient-to-b from-brand-ink to-brand-teal p-7 text-white shadow-md">
            <p className="font-jakarta text-sm font-extrabold tracking-wide text-brand-mint">
              PDF
            </p>
            <h3 className="mt-4 text-xl font-semibold leading-7">
              {t(`apply.forms.${form.id}.title`)}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-6 text-white/85">
              {t(`apply.forms.${form.id}.description`)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={form.href}
                download
                className="inline-flex h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-brand-ink transition-opacity hover:opacity-90"
              >
                {t("downloadPdf")}
              </a>
              <a
                href={form.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center rounded-full border border-white/30 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                {t("openPdf")}
              </a>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
