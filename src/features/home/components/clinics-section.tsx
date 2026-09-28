import Image from "next/image";
import type { Clinic } from "@prisma/client";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { CtaButton } from "@/shared/ui/cta-button";
import { SectionBadge } from "@/shared/ui/section-badge";

type ClinicsSectionProps = {
  clinics: Clinic[];
};

export async function ClinicsSection({ clinics }: ClinicsSectionProps) {
  const t = await getTranslations("home.clinics");

  return (
    <section className="overflow-x-clip bg-[#f7f8f8] px-5 py-10 sm:px-10 lg:px-[3.8rem] lg:py-20">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-8 flex min-w-0 flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 max-w-3xl space-y-3">
            <SectionBadge>{t("badge")}</SectionBadge>
            <h2 className="text-[29px] font-normal leading-10 tracking-[-0.5px] text-black lg:text-[clamp(2rem,4vw,3.125rem)] lg:font-light lg:leading-[1.2] lg:tracking-[-1.5px]">
              {t("titleBefore")}{" "}
              <span className="font-semibold">{t("titleAccent")}</span>
            </h2>
            <p className="text-sm leading-[22px] text-[#6f6f6f] lg:text-base lg:leading-6">
              {t("description")}
            </p>
          </div>
          <CtaButton href="/clinics/tour" variant="dark" className="shrink-0 self-start">
            {t("tourCta")}
          </CtaButton>
        </div>

        <div className="grid min-w-0 gap-4 md:grid-cols-3 md:gap-5">
          {clinics.map((clinic) => (
            <Link
              key={clinic.id}
              href={clinic.href}
              className="group min-w-0 overflow-hidden rounded-[20px] bg-white shadow-sm transition-shadow hover:shadow-md lg:rounded-3xl"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={clinic.imageUrl}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="space-y-2 p-6">
                <h3 className="text-xl font-bold text-brand-ink">{clinic.title}</h3>
                <p className="text-sm leading-6 text-[#6f6f6f]">
                  {clinic.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
