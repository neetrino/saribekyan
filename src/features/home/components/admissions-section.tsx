"use client";

import Image from "next/image";
import type { AdmissionStep } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Link } from "@/i18n/navigation";
import { ArrowLink } from "@/shared/ui/arrow-link";
import { SectionBadge } from "@/shared/ui/section-badge";
import { cn } from "@/shared/lib/cn";

type AdmissionsSectionProps = {
  steps: AdmissionStep[];
};

const tabIds = ["apply", "documents", "tuition"] as const;
type TabId = (typeof tabIds)[number];

const tabHrefs: Record<TabId, string> = {
  apply: "/admissions/apply",
  documents: "/admissions/how-to-apply#documents",
  tuition: "/admissions/tuition",
};

/** Figma Admissions — mobile 198:232, desktop 198:927 */
export function AdmissionsSection({ steps }: AdmissionsSectionProps) {
  const t = useTranslations("home.admissions");
  const [activeTab, setActiveTab] = useState<TabId>("apply");

  return (
    <section
      id="admissions"
      className="overflow-x-clip bg-white px-5 py-10 sm:px-10 lg:px-[3.8rem] lg:py-[60px]"
    >
      <div className="relative mx-auto grid max-w-[1328px] items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,521px)] lg:gap-x-8 lg:gap-y-10 xl:gap-x-12">
        {/* Mobile intro — desktop uses right column */}
        <div className="min-w-0 lg:hidden">
          <div className="flex items-center justify-between gap-4">
            <SectionBadge>{t("badge")}</SectionBadge>
            <ArrowLink href="/admissions" label={t("aboutLink")} className="shrink-0" />
          </div>
          <h2 className="mt-1.5 text-[29px] font-normal leading-10 tracking-[-0.5px] text-[#222]">
            {t("title")}
          </h2>
          <p className="mt-3 text-sm leading-[22px] text-[#6f6f6f]">
            {t("description")}
          </p>
        </div>

        {/* Tabs + steps */}
        <div className="min-w-0 lg:max-w-[753px] lg:order-1">
          <div
            className={cn(
              "mb-6 flex flex-wrap items-center gap-2",
              "lg:mb-8 lg:h-[73px] lg:max-w-[594px] lg:flex-nowrap lg:gap-2.5 lg:rounded-[80px] lg:bg-[#ededed] lg:p-[9px] lg:px-4",
            )}
          >
            {tabIds.map((tabId) => (
              <button
                key={tabId}
                type="button"
                onClick={() => setActiveTab(tabId)}
                className={cn(
                  "inline-flex h-[38px] items-center justify-center rounded-full px-4 text-sm leading-[21px] transition-colors",
                  "lg:h-[42px] lg:flex-1 lg:px-2.5 lg:text-base",
                  activeTab === tabId
                    ? "bg-brand-ink font-normal text-white lg:font-bold"
                    : "border border-[#e5e7eb] bg-white font-normal text-[#8f8f8f] lg:border-0",
                )}
              >
                {t(`tabs.${tabId}`)}
              </button>
            ))}
          </div>

          <ul className="flex flex-col gap-4 lg:gap-5">
            {steps.map((step, index) => {
              const accent = index % 2 === 0;

              return (
                <li
                  key={step.id}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-[20px] p-5 lg:gap-4 lg:rounded-3xl lg:p-6",
                    accent
                      ? "bg-gradient-to-r from-[#233b38] to-[#60a199] text-white lg:shadow-[0_4px_6px_-1px_rgba(35,59,56,0.2),0_2px_4px_-2px_rgba(35,59,56,0.2)]"
                      : "bg-[#ededed] text-[#0f172a] lg:shadow-[0_1px_1px_rgba(0,0,0,0.05)]",
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-normal leading-6 lg:text-lg lg:font-medium lg:leading-7">
                      {step.number} {step.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-1.5 text-[13px] leading-5 lg:mt-1 lg:text-sm",
                        accent
                          ? "text-white/80 lg:leading-6 lg:text-white/76"
                          : "text-[#838383] lg:leading-[21px]",
                      )}
                    >
                      {step.description}
                    </p>
                  </div>
                  <Link
                    href={tabHrefs[activeTab]}
                    aria-label={t("stepMore", { title: step.title })}
                    className={cn(
                      "inline-flex size-9 shrink-0 items-center justify-center rounded-full",
                      accent ? "bg-white/20" : "bg-white",
                    )}
                  >
                    <span className="relative size-4 rotate-45">
                      <Image
                        src={
                          accent
                            ? "/icons/arrow-up-right.svg"
                            : "/icons/arrow-up-right-dark.svg"
                        }
                        alt=""
                        fill
                        sizes="16px"
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Desktop intro + image */}
        <div className="relative hidden min-w-0 lg:order-2 lg:block lg:min-h-[720px] lg:pt-3">
          <SectionBadge>{t("badge")}</SectionBadge>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.125rem)] font-semibold leading-[64px] tracking-[-0.56px] text-[#222] lg:text-[50px]">
            {t("title")}
          </h2>
          <p className="mt-[17px] max-w-[520px] text-base leading-[23px] text-[#222]">
            {t("description")}
          </p>

          <ArrowLink
            href="/admissions"
            label={t("aboutLink")}
            className="z-10 mt-6 size-14 [&_span]:!rotate-0 lg:-ml-2"
          />

          <div className="relative mt-6 aspect-[605/524] w-full max-w-[605px] overflow-hidden lg:absolute lg:left-0 lg:top-[12.5rem] lg:mt-0 lg:h-[524px] lg:w-[605px] lg:max-w-none lg:aspect-auto">
            <div className="absolute inset-y-0 -left-[20%] w-[130%]">
              <Image
                src="/images/home/admissions.png"
                alt={t("imageAlt")}
                fill
                className="object-cover object-left"
                sizes="(max-width: 1024px) 90vw, 786px"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
