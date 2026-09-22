import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { SectionBadge } from "@/shared/ui/section-badge";

import { educationHubCards } from "../content/meta";

export async function EducationHubCards() {
  const t = await getTranslations("education");

  return (
    <section>
      <div className="mb-10 max-w-[765px] space-y-3 lg:mb-14">
        <SectionBadge>{t("hub.badge")}</SectionBadge>
        <h2 className="text-[clamp(2rem,4vw,3.125rem)] font-light leading-[1.2] tracking-[-1.5px] text-black">
          {t("hub.title")}{" "}
          <span className="font-semibold">{t("hub.highlight")}</span>
        </h2>
        <p className="max-w-3xl text-base leading-[23px] text-[#6f6f6f]">
          {t("hub.description")}
        </p>
      </div>

      <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {educationHubCards.map((card) => (
          <li key={card.id}>
            <Link
              href={card.href}
              className="group relative flex min-h-[420px] overflow-hidden rounded-3xl lg:min-h-[481px]"
            >
              <Image
                src={card.imageUrl}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
              <div className="relative z-10 flex w-full flex-col justify-between p-[30px] text-white">
                <div className="space-y-4">
                  <p className="font-jakarta text-base font-extrabold leading-6">
                    {card.number}
                  </p>
                  <h3 className="max-w-[18ch] text-[1.75rem] font-bold leading-9">
                    {t(`cards.${card.id}.title`)}
                  </h3>
                </div>
                <div className="space-y-5">
                  <div className="h-1.5 w-10 rounded-full bg-brand-gold" />
                  <p className="text-base leading-6 text-white/95">
                    {t(`cards.${card.id}.description`)}
                  </p>
                  <span className="inline-flex text-sm font-medium text-brand-lime transition-opacity group-hover:opacity-90">
                    {t("hub.view")}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
