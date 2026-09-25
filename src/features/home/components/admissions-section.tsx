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

/** Figma Admissions 198:927 */
export function AdmissionsSection({ steps }: AdmissionsSectionProps) {
  const t = useTranslations("home.admissions");
  const [activeTab, setActiveTab] = useState<TabId>("apply");

  return (
    <section
      id="admissions"
      className="overflow-x-clip bg-white px-6 py-16 sm:px-10 lg:px-[3.8rem] lg:py-[60px]"
    >
      <div className="relative mx-auto grid max-w-[1328px] items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,521px)] lg:gap-x-8 xl:gap-x-12">
        {/* Left: tabs + steps */}
        <div className="min-w-0 lg:max-w-[753px]">
          <div className="mb-8 flex h-auto max-w-[594px] flex-wrap items-center gap-2.5 rounded-[80px] bg-[#ededed] py-[9px] pl-[21px] pr-6 sm:h-[73px] sm:flex-nowrap sm:pr-[55px]">
            {tabIds.map((tabId) => (
              <button
                key={tabId}
                type="button"
                onClick={() => setActiveTab(tabId)}
                className={cn(
                  "inline-flex h-[42px] flex-1 items-center justify-center rounded-full px-2.5 text-base transition-colors sm:min-w-0 sm:flex-none sm:w-[min(100%,183px)]",
                  activeTab === tabId
                    ? "bg-brand-ink font-bold text-white"
                    : "bg-white font-normal text-[#8f8f8f]",
                )}
              >
                {t(`tabs.${tabId}`)}
              </button>
            ))}
          </div>

          <ul className="flex flex-col gap-5">
            {steps.map((step, index) => {
              const accent = index % 2 === 0;

              return (
                <li
                  key={step.id}
                  className={cn(
                    "flex items-center justify-between gap-4 rounded-3xl p-6",
                    accent
                      ? "bg-gradient-to-r from-[#233b38] to-[#60a199] text-white shadow-[0_4px_6px_-1px_rgba(35,59,56,0.2),0_2px_4px_-2px_rgba(35,59,56,0.2)]"
                      : "bg-[#ededed] text-[#0f172a] shadow-[0_1px_1px_rgba(0,0,0,0.05)]",
                  )}
                >
                  <div className="min-w-0 max-w-[448px]">
                    <h3 className="text-lg font-medium leading-7">
                      {step.number} {step.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-1 text-sm",
                        accent
                          ? "leading-6 text-white/76"
                          : "leading-[21px] text-[#838383]",
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

        {/* Right: badge + title + copy + arrow + image (Figma) */}
        <div className="relative min-w-0 lg:pt-3">
          <SectionBadge>{t("badge")}</SectionBadge>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.125rem)] font-semibold leading-[64px] tracking-[-0.56px] text-[#222] lg:text-[50px]">
            {t("title")}
          </h2>
          <p className="mt-[17px] max-w-[562px] text-base leading-[23px] text-[#222]">
            {t("description")}
          </p>

          {/* Figma 198:987 — dark circle, arrow →, sits under copy in the column gap */}
          <ArrowLink
            href="/admissions"
            label={t("aboutLink")}
            className="mt-6 size-14 [&_span]:!rotate-0 lg:-ml-7"
          />

          {/* Figma 198:990 — books + gloves cutout, crop like Figma */}
          <div className="relative mt-8 aspect-[605/524] w-full max-w-[605px] overflow-hidden lg:mt-6 lg:h-[524px] lg:w-[605px] lg:max-w-none lg:aspect-auto">
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
