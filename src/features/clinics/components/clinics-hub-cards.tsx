import { getTranslations } from "next-intl/server";

import { SectionBadge } from "@/shared/ui/section-badge";

import { clinicHubCards } from "../content/meta";
import { ClinicImageCards } from "./clinic-image-cards";

export async function ClinicsHubCards() {
  const t = await getTranslations("clinics");

  const items = clinicHubCards.map((card) => ({
    ...card,
    title: t(`cards.${card.id}.title`),
    description: t(`cards.${card.id}.description`),
  }));

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
      <ClinicImageCards items={items} viewLabel={t("hub.view")} />
    </section>
  );
}
