import type { StatSnapshot } from "@prisma/client";
import { getLocale, getTranslations } from "next-intl/server";

import { cn } from "@/shared/lib/cn";
import { ArrowLink } from "@/shared/ui/arrow-link";
import { CtaButton } from "@/shared/ui/cta-button";
import { SectionBadge } from "@/shared/ui/section-badge";

type AboutSectionProps = {
  stats: StatSnapshot[];
};

const barStyles = [
  "h-[130px] bg-gradient-to-b from-gray-200 from-[36%] to-[#54cb80] text-gray-600 lg:h-[248px]",
  "h-[160px] bg-gradient-to-b from-[#97c6c0] to-[#ececec] text-gray-700 lg:h-[339px]",
  "h-[200px] bg-gradient-to-b from-brand-ink to-brand-teal text-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] lg:h-full lg:min-h-[420px] lg:shadow-lg",
] as const;

function formatValue(value: number, locale: string): string {
  return new Intl.NumberFormat(locale === "hy" ? "hy-AM" : "en-US").format(
    value,
  );
}

export async function AboutSection({ stats }: AboutSectionProps) {
  const t = await getTranslations("home.about");
  const locale = await getLocale();

  return (
    <section className="relative z-10 -mt-10 rounded-t-[28px] bg-white px-5 py-8 sm:px-10 lg:rounded-t-[40px] lg:px-20 lg:pb-20 lg:pt-[35px]">
      <div className="mx-auto grid max-w-[1280px] items-end gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="flex items-center justify-between gap-4 lg:justify-start">
            <SectionBadge>{t("badge")}</SectionBadge>
            <ArrowLink
              href="/about"
              label={t("readMore")}
              className="lg:hidden"
            />
          </div>
          <h2 className="mt-1.5 text-[29px] font-normal leading-10 tracking-[-0.5px] text-black lg:mt-3.5 lg:text-[clamp(2rem,4vw,3.125rem)] lg:font-light lg:leading-[1.2] lg:tracking-[-1.5px]">
            {t("titleBefore")}
            <br />
            {t("titleAfter")}{" "}
            <span className="font-extrabold">{t("titleAccent")}</span>
          </h2>
          <div className="mt-3 max-w-[520px] space-y-0 text-sm leading-[22px] text-[#6f6f6f] lg:mt-4 lg:space-y-4 lg:text-base lg:leading-6">
            <p>{t("p1")}</p>
            <p className="mt-4 lg:mt-0">{t("p2")}</p>
          </div>
          <CtaButton href="/about" className="mt-10 hidden lg:inline-flex">
            {t("readMore")}
          </CtaButton>
        </div>

        <div className="flex min-w-0 items-end gap-3 lg:col-span-7 lg:justify-end lg:gap-0 lg:overflow-x-auto lg:pb-2">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={cn(
                "flex min-w-0 flex-1 flex-col justify-between rounded-[20px] p-4 lg:w-[min(100%,227px)] lg:shrink-0 lg:flex-none lg:rounded-3xl lg:p-7 lg:first:ml-0",
                index > 0 && "lg:ml-6 lg:w-[min(100%,228px)] lg:p-8",
                barStyles[index] ?? barStyles[0],
              )}
            >
              <p
                className={cn(
                  "font-jakarta text-sm font-extrabold leading-[21px] lg:text-xl lg:leading-7",
                  index === 2 && "lg:text-2xl lg:text-white",
                )}
              >
                {stat.year}
              </p>
              <div className="space-y-0.5 lg:space-y-1">
                <p
                  className={cn(
                    "font-jakarta text-lg font-extrabold leading-6 text-gray-800 lg:text-2xl lg:leading-8",
                    index === 2 &&
                      "text-xl leading-7 text-white lg:text-[1.875rem] lg:leading-9",
                  )}
                >
                  {formatValue(stat.value, locale)}
                </p>
                <p
                  className={cn(
                    "text-[11px] font-normal leading-4 lg:text-xs lg:font-medium lg:leading-[18px]",
                    index === 0
                      ? "text-white"
                      : index === 2
                        ? "text-white lg:font-semibold"
                        : "text-gray-600",
                  )}
                >
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
