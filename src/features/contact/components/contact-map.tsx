import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/shared/config/site";

export async function ContactMap() {
  const t = await getTranslations("contact.map");

  return (
    <div className="overflow-hidden rounded-3xl border border-[#e8e8e8] bg-[#f5f5f5]">
      <iframe
        title={t("title")}
        src={siteConfig.map.embedUrl}
        className="h-[320px] w-full border-0 sm:h-[420px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
        <p className="text-sm text-[#6f6f6f]">{siteConfig.address}</p>
        <a
          href={siteConfig.map.externalUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center rounded-full bg-brand-ink px-5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          {t("openExternal")}
        </a>
      </div>
    </div>
  );
}
