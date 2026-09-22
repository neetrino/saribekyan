import type { StatSnapshot } from "@prisma/client";
import { getLocale, getTranslations } from "next-intl/server";

import { CtaButton } from "@/shared/ui/cta-button";
import { SectionBadge } from "@/shared/ui/section-badge";
import { cn } from "@/shared/lib/cn";

type AboutSectionProps = {
  stats: StatSnapshot[];
};

const barStyles = [
  "h-[248px] bg-gradient-to-b from-gray-200 from-[36%] to-[#54cb80] text-gray-600",
  "h-[339px] bg-gradient-to-b from-[#97c6c0] to-[#ececec] text-gray-700",
  "h-full min-h-[420px] bg-gradient-to-b from-brand-ink to-brand-teal text-white shadow-lg",
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
    <section className="relative z-10 -mt-10 rounded-t-[40px] bg-white px-6 pb-16 pt-10 sm:px-10 lg:-mt-16 lg:px-20 lg:pb-20 lg:pt-[35px]">
      <div className="mx-auto grid max-w-[1280px] items-end gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionBadge>{t("badge")}</SectionBadge>
          <h2 className="mt-3.5 text-[clamp(2rem,4vw,3.125rem)] font-light leading-[1.2] tracking-[-1.5px] text-black">
            {t("titleBefore")}
            <br />
            {t("titleAfter")}{" "}
            <span className="font-extrabold">{t("titleAccent")}</span>
          </h2>
          <div className="mt-4 max-w-[520px] space-y-4 text-base leading-6 text-[#6f6f6f]">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
          </div>
          <CtaButton href="/about" className="mt-10">
            {t("readMore")}
          </CtaButton>
        </div>

        <div className="flex items-end justify-start gap-0 overflow-x-auto pb-2 lg:col-span-7 lg:justify-end">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={cn(
                "flex w-[min(100%,227px)] shrink-0 flex-col justify-between rounded-3xl p-7 first:ml-0",
                index > 0 && "ml-6 w-[min(100%,228px)] p-8",
                barStyles[index] ?? barStyles[0],
              )}
            >
              <p
                className={cn(
                  "font-jakarta text-xl font-extrabold leading-7",
                  index === 2 && "text-2xl text-white",
                )}
              >
                {stat.year}
              </p>
              <div className="space-y-1">
                <p
                  className={cn(
                    "font-jakarta text-2xl font-extrabold leading-8 text-gray-800",
                    index === 2 && "text-[1.875rem] leading-9 text-white",
                  )}
                >
                  {formatValue(stat.value, locale)}
                </p>
                <p
                  className={cn(
                    "text-xs font-medium leading-[18px]",
                    index === 0
                      ? "text-white"
                      : index === 2
                        ? "font-semibold text-white"
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
