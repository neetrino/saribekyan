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

export function AdmissionsSection({ steps }: AdmissionsSectionProps) {
  const t = useTranslations("home.admissions");
  const [activeTab, setActiveTab] = useState<TabId>("apply");

  return (
    <section className="bg-white px-6 py-16 sm:px-10 lg:px-[3.8rem] lg:py-20">
      <div className="mx-auto grid max-w-[1328px] items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
        <div>
          <div className="mb-8 flex h-auto flex-wrap items-center gap-2.5 rounded-[80px] bg-[#ededed] px-5 py-4 sm:h-[73px] sm:flex-nowrap">
            {tabIds.map((tabId) => (
              <button
                key={tabId}
                type="button"
                onClick={() => setActiveTab(tabId)}
                className={cn(
                  "inline-flex h-[42px] flex-1 items-center justify-center rounded-full px-3 text-base transition-colors sm:min-w-[160px]",
                  activeTab === tabId
                    ? "bg-brand-ink font-bold text-white"
                    : "bg-white text-[#8f8f8f]",
                )}
              >
                {t(`tabs.${tabId}`)}
              </button>
            ))}
          </div>

          <ul className="space-y-5">
            {steps.map((step, index) => {
              const accent = index % 2 === 0;

              return (
                <li
                  key={step.id}
                  className={cn(
                    "flex items-center justify-between gap-4 rounded-3xl p-6",
                    accent
                      ? "bg-gradient-to-r from-[#233b38] to-[#60a199] text-white shadow-md"
                      : "bg-[#ededed] text-slate-900",
                  )}
                >
                  <div className="max-w-[448px]">
                    <h3 className="text-lg font-medium leading-7">
                      {step.number} {step.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-1 text-sm leading-6",
                        accent ? "text-white/76" : "text-[#838383]",
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

        <div className="relative">
          <SectionBadge>{t("badge")}</SectionBadge>
          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-[clamp(2rem,4vw,3.125rem)] font-semibold leading-[1.28] tracking-[-0.56px] text-[#222]">
                {t("title")}
              </h2>
              <p className="mt-4 max-w-[520px] text-base leading-[23px] text-[#222]">
                {t("description")}
              </p>
            </div>
            <ArrowLink href="/admissions" label={t("aboutLink")} />
          </div>

          <div className="relative mt-8 aspect-[605/524] overflow-hidden rounded-[28px]">
            <Image
              src="/images/home/admissions.png"
              alt={t("imageAlt")}
              fill
              className="object-cover object-left"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
