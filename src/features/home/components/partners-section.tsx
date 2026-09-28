"use client";

import Image from "next/image";
import type { Partner } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useState, useSyncExternalStore } from "react";

import { Link } from "@/i18n/navigation";
import { ArrowLink } from "@/shared/ui/arrow-link";
import { SectionBadge } from "@/shared/ui/section-badge";
import { cn } from "@/shared/lib/cn";

type PartnersSectionProps = {
  partners: Partner[];
};

type StackMetrics = {
  slotGap: number;
  slotHeight: number;
  centerHeight: number;
  stackHeight: number;
  widths: [number, number, number];
  logoHeights: [number, number, number];
  navSizeClass: string;
};

const MOBILE_METRICS: StackMetrics = {
  slotGap: 11,
  slotHeight: 61,
  centerHeight: 69,
  stackHeight: 357,
  widths: [62, 80, 100],
  logoHeights: [25, 37, 51],
  navSizeClass: "size-10",
};

const DESKTOP_METRICS: StackMetrics = {
  slotGap: 16,
  slotHeight: 91,
  centerHeight: 101,
  stackHeight: 529,
  widths: [70, 85, 100],
  logoHeights: [40, 40, 62],
  navSizeClass: "size-9",
};

const PARTNERS_HREF = "/international";

function subscribeLg(onStoreChange: () => void): () => void {
  const mq = window.matchMedia("(min-width: 1024px)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getLgSnapshot(): boolean {
  return window.matchMedia("(min-width: 1024px)").matches;
}

function getServerLgSnapshot(): boolean {
  return true;
}

function useIsLg(): boolean {
  return useSyncExternalStore(subscribeLg, getLgSnapshot, getServerLgSnapshot);
}

function circularOffset(index: number, active: number, count: number): number {
  let offset = index - active;
  if (offset > count / 2) offset -= count;
  if (offset < -count / 2) offset += count;
  return offset;
}

function slotMetrics(
  offset: number,
  metrics: StackMetrics,
): {
  widthPercent: number;
  opacity: number;
  height: number;
  logoHeight: number;
} {
  const abs = Math.abs(offset);
  if (abs === 0) {
    return {
      widthPercent: metrics.widths[2],
      opacity: 1,
      height: metrics.centerHeight,
      logoHeight: metrics.logoHeights[2],
    };
  }
  if (abs === 1) {
    return {
      widthPercent: metrics.widths[1],
      opacity: 0.6,
      height: metrics.slotHeight,
      logoHeight: metrics.logoHeights[1],
    };
  }
  return {
    widthPercent: metrics.widths[0],
    opacity: 0.3,
    height: metrics.slotHeight,
    logoHeight: metrics.logoHeights[0],
  };
}

function slotTop(offset: number, metrics: StackMetrics): number {
  const heights = [
    metrics.slotHeight,
    metrics.slotHeight,
    metrics.centerHeight,
    metrics.slotHeight,
    metrics.slotHeight,
  ];
  const index = offset + 2;
  let top = 0;
  for (let i = 0; i < index; i += 1) {
    top += heights[i]! + metrics.slotGap;
  }
  return top;
}

/** Figma PARTNERS — mobile 198:397, desktop 198:886 */
export function PartnersSection({ partners }: PartnersSectionProps) {
  const t = useTranslations("home.partners");
  const isLg = useIsLg();
  const metrics = isLg ? DESKTOP_METRICS : MOBILE_METRICS;
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
    <section className="bg-white px-5 py-10 sm:px-10 lg:px-[4.375rem] lg:py-20">
      <div className="mx-auto grid max-w-[1300px] items-center gap-6 lg:grid-cols-[minmax(0,649px)_minmax(0,1fr)] lg:gap-8 xl:gap-12">
        <div className="relative max-w-[649px]">
          <div className="flex items-center justify-between gap-4 lg:justify-start">
            <SectionBadge>{t("badge")}</SectionBadge>
            <ArrowLink
              href={PARTNERS_HREF}
              label={t("link")}
              className="lg:hidden"
            />
          </div>
          <h2 className="mt-1.5 text-[29px] font-normal leading-10 tracking-[-0.5px] text-black lg:mt-4 lg:text-[clamp(2rem,4vw,3.125rem)] lg:leading-[1.2] lg:tracking-[-1.5px]">
            <span className="font-normal">{t("titleBefore")}</span>
            <br />
            <span className="font-extrabold">{t("titleAccent")}</span>
          </h2>
          <p className="mt-3 max-w-[386px] text-sm leading-[22px] text-[#424847] lg:mt-8 lg:text-base lg:leading-6">
            {t("description")}
          </p>
        </div>

        <div className="relative flex items-center gap-3 overflow-x-clip lg:gap-5">
          <div className="flex shrink-0 flex-col gap-3">
            <button
              type="button"
              onClick={goPrev}
              aria-label={t("prevPartner")}
              className={cn(
                "inline-flex items-center justify-center rounded-full bg-[#f2f2f2] transition-opacity hover:opacity-80",
                metrics.navSizeClass,
              )}
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
              className={cn(
                "inline-flex items-center justify-center rounded-full bg-[#f2f2f2] transition-opacity hover:opacity-80",
                metrics.navSizeClass,
              )}
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
            style={{ height: metrics.stackHeight }}
          >
            {partners.map((partner, index) => {
              const offset = circularOffset(index, activeIndex, count);
              const visible = Math.abs(offset) <= 2;
              const slot = slotMetrics(
                visible ? offset : offset > 0 ? 2 : -2,
                metrics,
              );
              const top = slotTop(
                visible ? offset : offset > 0 ? 2 : -2,
                metrics,
              );
              const isActive = index === activeIndex;
              const href = partner.website ?? PARTNERS_HREF;

              return (
                <Link
                  key={partner.id}
                  href={href}
                  aria-hidden={!visible}
                  aria-current={isActive ? "true" : undefined}
                  tabIndex={visible ? 0 : -1}
                  className={cn(
                    "absolute right-0 flex items-center justify-center overflow-hidden rounded-l-[80px] bg-[#ededed] px-5 py-2 lg:px-8",
                    "transition-[transform,width,height,opacity,top] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    visible ? "cursor-pointer" : "pointer-events-none",
                  )}
                  style={{
                    top,
                    width: `${slot.widthPercent}%`,
                    height: slot.height,
                    opacity: visible ? slot.opacity : 0,
                    zIndex: visible ? 5 - Math.abs(offset) : 0,
                  }}
                >
                  <span
                    className="relative w-[7.5rem] transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:w-40"
                    style={{ height: slot.logoHeight }}
                  >
                    <Image
                      src={partner.logoUrl}
                      alt={partner.name}
                      fill
                      className="object-contain"
                      sizes="184px"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
