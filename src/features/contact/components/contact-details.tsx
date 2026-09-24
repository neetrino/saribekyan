import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/shared/config/site";

import { contactHourIds } from "../content/meta";

function toTelHref(phone: string): string {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export async function ContactDetails() {
  const t = await getTranslations("contact.details");

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <article className="rounded-3xl bg-gradient-to-b from-brand-ink to-brand-teal p-7 text-white shadow-md">
        <div className="space-y-8">
          <div>
            <p className="text-sm font-medium text-brand-mint">{t("address")}</p>
            <p className="mt-3 flex items-start gap-3 text-base leading-7">
              <span className="relative mt-0.5 size-6 shrink-0">
                <Image src="/icons/location.svg" alt="" fill sizes="24px" />
              </span>
              <span>{siteConfig.address}</span>
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-brand-mint">{t("phones")}</p>
            <ul className="mt-3 space-y-3">
              {siteConfig.phones.map((phone) => (
                <li key={phone.id} className="flex items-center gap-3">
                  <span className="relative size-6 shrink-0">
                    <Image src="/icons/phone.svg" alt="" fill sizes="24px" />
                  </span>
                  <div>
                    <p className="text-xs text-white/65">
                      {t(`phoneLabels.${phone.id}`)}
                    </p>
                    <a
                      href={toTelHref(phone.value)}
                      className="text-base text-brand-mint transition-opacity hover:opacity-80"
                    >
                      {phone.value}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-brand-mint">{t("emails")}</p>
            <ul className="mt-3 space-y-3">
              {siteConfig.emails.map((email) => (
                <li key={email.id} className="flex items-center gap-3">
                  <span className="relative size-6 shrink-0">
                    <Image src="/icons/mail.svg" alt="" fill sizes="24px" />
                  </span>
                  <div>
                    <p className="text-xs text-white/65">
                      {t(`emailLabels.${email.id}`)}
                    </p>
                    <a
                      href={`mailto:${email.value}`}
                      className="text-base text-brand-mint transition-opacity hover:opacity-80"
                    >
                      {email.value}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      <article className="flex flex-col justify-between rounded-3xl bg-[#f5f5f5] p-7 text-brand-ink">
        <p className="text-sm font-medium text-brand-teal">{t("hours")}</p>
        <ul className="mt-6 space-y-5">
          {contactHourIds.map((id) => (
            <li
              key={id}
              className="flex items-baseline justify-between gap-4 border-b border-[#e0e0e0] pb-4 last:border-0 last:pb-0"
            >
              <span className="text-sm text-[#6f6f6f]">
                {t(`hoursItems.${id}.label`)}
              </span>
              <span className="text-right text-base font-semibold">
                {t(`hoursItems.${id}.value`)}
              </span>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
