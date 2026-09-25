import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { CtaButton } from "@/shared/ui/cta-button";
import { SiteHeader } from "@/shared/ui/site-header";

export async function HeroSection() {
  const t = await getTranslations("home.hero");
  const tCommon = await getTranslations("common.brand");

  return (
    <section className="relative min-h-[100svh] xl:h-[120svh] xl:min-h-[100svh] wide:h-[min(100svh,999px)] wide:min-h-0">
      {/* Students — bottom-anchored; lower on 13" so more hero background shows */}
      <div className="pointer-events-none absolute inset-0 hidden xl:block">
        <div className="relative mx-auto h-full w-full max-w-[1440px]">
          <div className="absolute inset-x-0 bottom-0 left-[6%] right-[1%] top-[36%] wide:left-[90px] wide:right-auto wide:top-[24%] wide:w-[min(1240px,calc(100%-90px))]">
            <Image
              src="/images/home/hero-students.png"
              alt={t("studentsAlt")}
              fill
              priority
              className="object-contain object-bottom"
              sizes="(min-width: 1440px) 1296px, 96vw"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col px-4 pb-16 pt-6 sm:px-8 xl:h-full xl:min-h-0 xl:px-10 xl:pb-0 xl:pt-11 wide:px-[72px]">
        <SiteHeader embedded />

        {/* Mobile */}
        <div className="flex flex-1 flex-col justify-end gap-8 pt-28 xl:hidden">
          <h1 className="max-w-[845px] text-[clamp(2.25rem,7vw,3.8125rem)] font-normal leading-[1.1] tracking-[-0.56px] text-white">
            {t("titleBefore")}
            <br />
            {t("titleAfter")}
            <br />
            <span className="font-bold text-brand-lime">{t("titleAccent")}</span>
          </h1>
          <p className="max-w-[227px] text-base leading-6 text-white">
            {tCommon("description")}
          </p>
          <CtaButton href="/admissions/apply" variant="light" className="self-start">
            {t("applyCta")}
          </CtaButton>
          <div className="relative mx-auto aspect-[1296/729] w-full max-w-xl">
            <Image
              src="/images/home/hero-students.png"
              alt={t("studentsAlt")}
              fill
              priority
              className="object-contain object-bottom"
              sizes="(max-width: 768px) 90vw, 576px"
            />
          </div>
        </div>

        {/* Desktop — Figma coords relative to padded 1440 shell (pad 72 / top 44) */}
        <div className="relative hidden flex-1 xl:block">
          <h1 className="absolute left-0 top-[6%] w-[min(845px,58%)] text-[clamp(2.75rem,4.2vw,3.8125rem)] font-normal leading-[1.1] tracking-[-0.56px] text-white wide:top-[48px] wide:w-[845px] wide:text-[61px] wide:leading-[67px]">
            {t("titleBefore")}
            <br />
            {t("titleAfter")}
            <br />
            <span className="font-bold text-brand-lime">{t("titleAccent")}</span>
          </h1>

          <p className="absolute bottom-[18%] left-0 max-w-[227px] text-base leading-6 text-white wide:bottom-auto wide:top-[450px]">
            {tCommon("description")}
          </p>

          <div className="absolute right-0 top-[32%] wide:top-[300px]">
            <CtaButton href="/admissions/apply" variant="light">
              {t("applyCta")}
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
