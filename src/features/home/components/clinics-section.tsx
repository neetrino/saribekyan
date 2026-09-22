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
    <section className="bg-[#f7f8f8] px-6 py-16 sm:px-10 lg:px-[3.8rem] lg:py-20">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <SectionBadge>{t("badge")}</SectionBadge>
            <h2 className="text-[clamp(2rem,4vw,3.125rem)] font-light leading-[1.2] tracking-[-1.5px] text-black">
              {t("titleBefore")}{" "}
              <span className="font-semibold">{t("titleAccent")}</span>
            </h2>
            <p className="text-base leading-6 text-[#6f6f6f]">{t("description")}</p>
          </div>
          <CtaButton href="/clinics/tour" variant="dark">
            {t("tourCta")}
          </CtaButton>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {clinics.map((clinic) => (
            <Link
              key={clinic.id}
              href={clinic.href}
              className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow hover:shadow-md"
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
