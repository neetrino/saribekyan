import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/shared/config/site";

import { officeFocusIds } from "../content/meta";
import { InternationalInfoGrid } from "./international-info-grid";

function toTelHref(phone: string): string {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export async function InternationalOffice() {
  const t = await getTranslations("international.office");
  const contacts = siteConfig.departments.international;

  const focuses = officeFocusIds.map((id) => ({
    id,
    title: t(`focus.${id}.title`),
    description: t(`focus.${id}.description`),
  }));

  return (
    <div className="space-y-8">
      <div className="max-w-3xl space-y-4 text-base leading-7 text-[#6f6f6f]">
        <p>{t("p1")}</p>
        <p>{t("p2")}</p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        <li className="rounded-3xl bg-gradient-to-br from-brand-ink to-brand-teal p-7 text-white shadow-md">
          <p className="text-sm font-medium text-brand-mint">{t("phone")}</p>
          <a
            href={toTelHref(contacts.phone)}
            className="mt-3 block text-2xl font-semibold leading-8 transition-opacity hover:opacity-90"
          >
            {contacts.phone}
          </a>
        </li>
        <li className="rounded-3xl bg-[#f5f5f5] p-7 text-brand-ink">
          <p className="text-sm font-medium text-brand-teal">{t("email")}</p>
          <a
            href={`mailto:${contacts.email}`}
            className="mt-3 block break-all text-2xl font-semibold leading-8 transition-opacity hover:opacity-80"
          >
            {contacts.email}
          </a>
        </li>
      </ul>

      <InternationalInfoGrid items={focuses} />
    </div>
  );
}
