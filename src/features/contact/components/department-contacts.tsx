import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/shared/config/site";

import { contactDepartmentIds } from "../content/meta";

function toTelHref(phone: string): string {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export async function DepartmentContacts() {
  const t = await getTranslations("contact.departments");

  return (
    <ul className="grid gap-4 lg:grid-cols-2">
      {contactDepartmentIds.map((id) => {
        const contacts = siteConfig.departments[id];

        return (
          <li key={id}>
            <article className="flex h-full flex-col rounded-3xl border border-[#e8e8e8] bg-white p-7">
              <div className="mb-4 h-1.5 w-10 rounded-full bg-brand-gold" />
              <h3 className="text-xl font-semibold text-brand-ink">
                {t(`${id}.title`)}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-[#6f6f6f]">
                {t(`${id}.description`)}
              </p>
              <address className="mt-6 space-y-2 not-italic text-sm leading-6">
                <p>
                  <span className="text-[#6f6f6f]">{t(`${id}.phone`)}: </span>
                  <a
                    href={toTelHref(contacts.phone)}
                    className="font-medium text-brand-teal transition-opacity hover:opacity-80"
                  >
                    {contacts.phone}
                  </a>
                </p>
                <p>
                  <span className="text-[#6f6f6f]">{t(`${id}.email`)}: </span>
                  <a
                    href={`mailto:${contacts.email}`}
                    className="font-medium text-brand-teal transition-opacity hover:opacity-80"
                  >
                    {contacts.email}
                  </a>
                </p>
              </address>
            </article>
          </li>
        );
      })}
    </ul>
  );
}

