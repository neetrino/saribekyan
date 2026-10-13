import { getTranslations } from "next-intl/server";

import { cn } from "@/shared/lib/cn";
import { ArrowLink } from "@/shared/ui/arrow-link";
import { CtaButton } from "@/shared/ui/cta-button";
import { SectionBadge } from "@/shared/ui/section-badge";

const cohortIds = ["y2024", "y2025", "y2026"] as const;

const barStyles = [
  "min-h-[200px] bg-gradient-to-b from-gray-200 from-[36%] to-[#54cb80] text-gray-700 lg:min-h-[248px]",
  "min-h-[230px] bg-gradient-to-b from-[#97c6c0] to-[#ececec] text-gray-700 lg:min-h-[339px]",
  "min-h-[260px] bg-gradient-to-b from-brand-ink to-brand-teal text-white lg:min-h-[420px]",
] as const;

type CohortId = (typeof cohortIds)[number];

type CohortTranslator = Awaited<ReturnType<typeof getTranslations>>;

function CohortCards({ t }: { t: CohortTranslator }) {
  return (
    <div className="flex min-w-0 items-end gap-3 lg:col-span-7 lg:justify-end lg:gap-0 lg:overflow-x-auto lg:pb-2">
      {cohortIds.map((id, index) => (
        <CohortCard key={id} id={id} index={index} t={t} />
      ))}
    </div>
  );
}

function CohortCard({
  id,
  index,
  t,
}: {
  id: CohortId;
  index: number;
  t: CohortTranslator;
}) {
  return (
    <article
      className={cn(
        "flex min-w-0 flex-1 flex-col justify-between rounded-[20px] p-4 lg:w-[min(100%,227px)] lg:shrink-0 lg:flex-none lg:rounded-3xl lg:p-7",
        index > 0 && "lg:ml-6 lg:w-[min(100%,228px)] lg:p-8",
        barStyles[index],
      )}
    >
      <p
        className={cn(
          "font-jakarta text-sm font-extrabold leading-[21px] lg:text-xl lg:leading-7",
          index === 2 && "text-white lg:text-2xl",
        )}
      >
        {t(`cohorts.${id}.year`)}
      </p>
      <div className="space-y-2">
        <p className="text-[11px] font-medium leading-4 lg:text-xs lg:leading-[18px]">
          {t(`cohorts.${id}.total`)} {t(`cohorts.${id}.citizens`)}{" "}
          {t(`cohorts.${id}.foreign`)}
        </p>
        <p className="text-sm font-extrabold leading-5 lg:text-base">
          {t(`cohorts.${id}.graduates`)}
        </p>
      </div>
    </article>
  );
}

export async function AboutSection() {
  const t = await getTranslations("home.about");

  return (
    <section className="relative z-10 -mt-10 overflow-x-clip rounded-t-[28px] bg-white px-5 py-8 sm:px-10 lg:rounded-t-[40px] lg:px-20 lg:pb-20 lg:pt-[35px]">
      <div className="mx-auto grid max-w-[1280px] items-end gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="min-w-0 lg:col-span-5">
          <div className="flex items-center justify-between gap-4 lg:justify-start">
            <SectionBadge>{t("badge")}</SectionBadge>
            <ArrowLink
              href="/about"
              label={t("readMore")}
              className="shrink-0 lg:hidden"
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
        <CohortCards t={t} />
      </div>
    </section>
  );
}
