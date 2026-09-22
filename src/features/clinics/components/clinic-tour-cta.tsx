import { getTranslations } from "next-intl/server";

import { CtaButton } from "@/shared/ui/cta-button";
import { SectionBadge } from "@/shared/ui/section-badge";

export async function ClinicTourCta() {
  const t = await getTranslations("clinics.cta");

  return (
    <section className="overflow-hidden rounded-[32px] bg-gradient-to-r from-brand-ink to-brand-teal px-8 py-10 text-white sm:px-10 lg:px-14 lg:py-12">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl space-y-4">
          <SectionBadge className="bg-white/15 text-white">
            {t("badge")}
          </SectionBadge>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-[-0.5px]">
            {t("title")}
          </h2>
          <p className="text-base leading-7 text-white/85">{t("description")}</p>
        </div>
        <CtaButton href="/clinics/tour" variant="light">
          {t("button")}
        </CtaButton>
      </div>
    </section>
  );
}
