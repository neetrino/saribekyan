import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { partners } from "../content/meta";

export async function PartnerLogos() {
  const t = await getTranslations("international.partners");

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {partners.map((partner) => (
        <li key={partner.id}>
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[91px] items-center justify-center rounded-[80px] bg-[#ededed] px-6 transition-opacity hover:opacity-80"
            aria-label={`${t(`${partner.id}.name`)} — ${t("visitWebsite")}`}
          >
            <span className="relative h-10 w-36">
              <Image
                src={partner.logoUrl}
                alt={t(`${partner.id}.name`)}
                fill
                className="object-contain"
                sizes="144px"
              />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
