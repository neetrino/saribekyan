"use client";

import Image from "next/image";
import type { Partner } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { ArrowLink } from "@/shared/ui/arrow-link";
import { SectionBadge } from "@/shared/ui/section-badge";
import { cn } from "@/shared/lib/cn";

type PartnersSectionProps = {
  partners: Partner[];
};

const SLOT_GAP = 16;
const SLOT_HEIGHT = 91;
const CENTER_HEIGHT = 101;
const STACK_HEIGHT = SLOT_HEIGHT * 4 + CENTER_HEIGHT + SLOT_GAP * 4;

function circularOffset(index: number, active: number, count: number): number {
  let offset = index - active;
  if (offset > count / 2) offset -= count;
  if (offset < -count / 2) offset += count;
  return offset;
}

function slotMetrics(offset: number): {
  widthPercent: number;
  opacity: number;
  height: number;
  logoHeight: number;
} {
  if (offset === 0) {
    return { widthPercent: 100, opacity: 1, height: CENTER_HEIGHT, logoHeight: 62 };
  }
  if (Math.abs(offset) === 1) {
    return { widthPercent: 85, opacity: 0.6, height: SLOT_HEIGHT, logoHeight: 40 };
  }
  return { widthPercent: 70, opacity: 0.3, height: SLOT_HEIGHT, logoHeight: 40 };
}

function slotTop(offset: number): number {
  // Positions for offsets -2..2 matching Figma stack
  const heights = [SLOT_HEIGHT, SLOT_HEIGHT, CENTER_HEIGHT, SLOT_HEIGHT, SLOT_HEIGHT];
  const index = offset + 2;
  let top = 0;
  for (let i = 0; i < index; i += 1) {
    top += heights[i]! + SLOT_GAP;
  }
  return top;
}

/** Figma PARTNERS 198:886 — smooth transform carousel */
export function PartnersSection({ partners }: PartnersSectionProps) {
  const t = useTranslations("home.partners");
  const count = partners.length;
  const [activeIndex, setActiveIndex] = useState(() =>
    count > 0 ? Math.min(2, count - 1) : 0,
  );

  if (count === 0) {
    return null;
  }

  const goPrev = () => {
    setActiveIndex((current) => (current - 1 + count) % count);
  };

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % count);
  };

  return (
    <section className="bg-white px-6 py-16 sm:px-10 lg:px-[4.375rem] lg:py-20">
      <div className="mx-auto grid max-w-[1300px] items-center gap-12 lg:grid-cols-[minmax(0,649px)_minmax(0,1fr)] lg:gap-8 xl:gap-12">
        <div className="relative max-w-[649px]">
          <SectionBadge>{t("badge")}</SectionBadge>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.125rem)] leading-[1.2] tracking-[-1.5px] text-black">
            <span className="font-normal">{t("titleBefore")}</span>
            <br />
            <span className="font-extrabold">{t("titleAccent")}</span>
          </h2>
          <p className="mt-8 max-w-[386px] text-base leading-6 text-[#424847]">
            {t("description")}
          </p>
          <ArrowLink
            href="/international"
            label={t("link")}
            className="mt-10 [&_span]:!rotate-0"
          />
        </div>

        <div className="relative flex items-center gap-4 lg:gap-5">
          <div className="flex shrink-0 flex-col gap-3">
            <button
              type="button"
              onClick={goPrev}
              aria-label={t("prevPartner")}
              className="inline-flex size-9 items-center justify-center rounded-full bg-[#f2f2f2] transition-opacity hover:opacity-80"
            >
              <span className="relative size-4 -rotate-90">
                <Image
                  src="/icons/arrow-up-right-dark.svg"
                  alt=""
                  fill
                  className="object-contain"
                  sizes="16px"
                />
              </span>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label={t("nextPartner")}
              className="inline-flex size-9 items-center justify-center rounded-full bg-[#f2f2f2] transition-opacity hover:opacity-80"
            >
              <span className="relative size-4 rotate-90">
                <Image
                  src="/icons/arrow-up-right-dark.svg"
                  alt=""
                  fill
                  className="object-contain"
                  sizes="16px"
                />
              </span>
            </button>
          </div>

          <div
            className="relative min-w-0 flex-1"
            style={{ height: STACK_HEIGHT }}
          >
            {partners.map((partner, index) => {
              const offset = circularOffset(index, activeIndex, count);
              const visible = Math.abs(offset) <= 2;
              const metrics = slotMetrics(
                visible ? offset : offset > 0 ? 2 : -2,
              );
              const top = slotTop(
                visible ? offset : offset > 0 ? 2 : -2,
              );

              return (
                <div
                  key={partner.id}
                  aria-hidden={!visible}
                  className={cn(
                    "absolute right-0 flex items-center justify-center overflow-hidden rounded-l-[80px] bg-[#ededed] px-8 py-2",
                    "transition-[transform,width,height,opacity,top] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    !visible && "pointer-events-none",
                  )}
                  style={{
                    top,
                    width: `${metrics.widthPercent}%`,
                    height: metrics.height,
                    opacity: visible ? metrics.opacity : 0,
                    zIndex: visible ? 5 - Math.abs(offset) : 0,
                  }}
                >
                  <span
                    className="relative w-40 transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ height: metrics.logoHeight }}
                  >
                    <Image
                      src={partner.logoUrl}
                      alt={partner.name}
                      fill
                      className="object-contain"
                      sizes="184px"
                    />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
