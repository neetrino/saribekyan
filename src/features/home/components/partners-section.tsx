import Image from "next/image";
import type { Partner } from "@prisma/client";
import { getTranslations } from "next-intl/server";

import { ArrowLink } from "@/shared/ui/arrow-link";
import { SectionBadge } from "@/shared/ui/section-badge";
import { cn } from "@/shared/lib/cn";

type PartnersSectionProps = {
  partners: Partner[];
};

export async function PartnersSection({ partners }: PartnersSectionProps) {
  const t = await getTranslations("home.partners");

  return (
    <section className="bg-white px-6 py-16 sm:px-10 lg:px-[4.375rem] lg:py-20">
      <div className="mx-auto grid max-w-[1300px] items-center gap-12 lg:grid-cols-2">
        <div className="relative max-w-[649px]">
          <SectionBadge>{t("badge")}</SectionBadge>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.125rem)] leading-[1.2] tracking-[-1.5px] text-black">
            <span className="font-normal">{t("titleBefore")}</span>
            <br />
            <span className="font-extrabold">{t("titleAccent")}</span>
          </h2>
          <p className="mt-8 max-w-[386px] text-base leading-6 text-[#424847]">
            {t("description")}
          </p>
          <ArrowLink
            href="/international"
            label={t("link")}
            className="mt-10"
          />
        </div>

        <div className="relative flex flex-col items-end gap-4">
          {partners.map((partner, index) => {
            const widthClass =
              index === 0 || index === partners.length - 1
                ? "w-[70%]"
                : index === 1 || index === partners.length - 2
                  ? "w-[85%]"
                  : "w-full";
            const opacityClass =
              index === 0 || index === partners.length - 1
                ? "opacity-30"
                : index === 1 || index === partners.length - 2
                  ? "opacity-60"
                  : "opacity-100";

            return (
              <div
                key={partner.id}
                className={cn(
                  "flex h-[91px] items-center justify-center rounded-l-[80px] bg-[#ededed] px-8 py-2",
                  widthClass,
                  opacityClass,
                  index === 2 && "h-[101px]",
                )}
              >
                <span className="relative h-10 w-40">
                  <Image
                    src={partner.logoUrl}
                    alt={partner.name}
                    fill
                    className="object-contain"
                    sizes="160px"
                  />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
