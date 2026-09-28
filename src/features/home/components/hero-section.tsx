import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { CtaButton } from "@/shared/ui/cta-button";

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

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col px-4 pb-0 pt-6 sm:px-8 xl:h-full xl:min-h-0 xl:px-10 xl:pt-11 wide:px-[72px]">
        {/* Spacer for fixed SiteHeader in layout */}
        <div className="h-[69px] w-full shrink-0" aria-hidden />

        {/* Mobile — Figma HeroSection 198:992 */}
        <div className="relative min-h-[calc(100svh-93px)] flex-1 xl:hidden">
          {/* Students — Figma 198:1019: 742×414, nudged lower under text */}
          <div className="pointer-events-none absolute bottom-0 left-[-30%] z-0 h-[min(414px,48svh)] w-[185%] translate-y-12">
            <Image
              src="/images/home/hero-students.png"
              alt={t("studentsAlt")}
              fill
              priority
              className="object-contain object-bottom"
              sizes="185vw"
            />
          </div>

          <div className="relative z-10 flex flex-col px-2 pt-16">
            <h1 className="max-w-[354px] text-[48px] font-semibold leading-[49px] tracking-[-0.56px] text-white">
              <span className="block">
                {t("titleBefore")} {t("titleAfter")}
              </span>
              <span className="block text-brand-lime">{t("titleAccent")}</span>
            </h1>

            <CtaButton
              href="/admissions/apply"
              variant="light"
              className="mt-7 w-full max-w-[349px] justify-between shadow-[0_0_40px_rgba(104,239,189,0.55)]"
            >
              {t("applyCta")}
            </CtaButton>

            <p className="mt-8 max-w-[356px] text-sm leading-[18px] text-white">
              {tCommon("description")}
            </p>
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

          <p className="absolute bottom-[24%] left-0 max-w-[227px] text-base leading-6 text-white wide:bottom-auto wide:top-[400px]">
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
