import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { CtaButton } from "@/shared/ui/cta-button";
import { SiteHeader } from "@/shared/ui/site-header";

export async function HeroSection() {
  const t = await getTranslations("home.hero");
  const tCommon = await getTranslations("common.brand");

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-gradient-to-b from-brand-ink from-[12%] to-brand-mint">
      <div className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-70">
        <Image
          src="/images/home/hero-pattern.png"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <SiteHeader />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-6 pb-28 pt-36 sm:px-10 lg:px-[4.5rem] lg:pb-40 lg:pt-44">
        <div className="pointer-events-none absolute bottom-0 right-0 top-28 hidden w-[min(90%,1296px)] lg:block">
          <Image
            src="/images/home/hero-students.png"
            alt={t("studentsAlt")}
            fill
            priority
            className="object-contain object-bottom"
            sizes="(max-width: 1280px) 80vw, 1296px"
          />
        </div>

        <div className="relative z-10 max-w-[845px]">
          <h1 className="text-[clamp(2.5rem,6vw,3.8125rem)] font-normal leading-[1.1] tracking-[-0.56px] text-white">
            {t("titleBefore")}
            <br />
            {t("titleAfter")}{" "}
            <span className="font-bold text-brand-lime">{t("titleAccent")}</span>
          </h1>
        </div>

        <div className="relative z-10 mt-10 flex flex-col gap-8 sm:mt-16 sm:flex-row sm:items-end sm:justify-between lg:mt-24">
          <p className="max-w-[227px] text-base leading-6 text-white">
            {tCommon("description")}
          </p>
          <CtaButton
            href="/admissions/apply"
            variant="light"
            className="self-start sm:self-auto"
          >
            {t("applyCta")}
          </CtaButton>
        </div>

        <div className="relative z-10 mt-10 lg:hidden">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
            <Image
              src="/images/home/hero-students.png"
              alt={t("studentsAlt")}
              fill
              priority
              className="object-contain object-bottom"
              sizes="(max-width: 768px) 90vw, 448px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
