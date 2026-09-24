import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { tourEmbedUrl, tourPosterUrl } from "../content/meta";
import { ClinicSection } from "./clinic-section";

export async function TourContent() {
  const t = await getTranslations("clinics.tour");

  return (
    <>
      <ClinicSection
        id="about"
        badge={t("badge")}
        title={t("aboutTitle")}
        description={t("aboutDescription")}
      >
        <div className="max-w-3xl space-y-4 text-base leading-7 text-[#6f6f6f]">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
        </div>
      </ClinicSection>

      <ClinicSection
        id="viewer"
        badge={t("viewerBadge")}
        title={t("viewerTitle")}
        description={t("viewerDescription")}
      >
        {tourEmbedUrl ? (
          <iframe
            title={t("viewerTitle")}
            src={tourEmbedUrl}
            className="aspect-video w-full rounded-[32px] border-0"
            allowFullScreen
          />
        ) : (
          <div className="relative aspect-video overflow-hidden rounded-[32px] bg-brand-ink">
            <Image
              src={tourPosterUrl}
              alt=""
              fill
              className="object-cover opacity-50"
              sizes="100vw"
            />
            <div className="relative z-10 flex h-full flex-col items-start justify-end p-8 text-white sm:p-10">
              <p className="max-w-lg text-lg font-medium leading-7">
                {t("placeholder")}
              </p>
            </div>
          </div>
        )}
      </ClinicSection>
    </>
  );
}
