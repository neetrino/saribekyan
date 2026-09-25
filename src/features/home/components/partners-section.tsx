"use client";

import Image from "next/image";
import type { Partner } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Link } from "@/i18n/navigation";
import { SectionBadge } from "@/shared/ui/section-badge";
import { cn } from "@/shared/lib/cn";

type PartnersSectionProps = {
  partners: Partner[];
};

const SLOT_GAP = 16;
const SLOT_HEIGHT = 91;
const CENTER_HEIGHT = 101;
const STACK_HEIGHT = SLOT_HEIGHT * 4 + CENTER_HEIGHT + SLOT_GAP * 4;
const PARTNERS_HREF = "/international";

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
  const heights = [SLOT_HEIGHT, SLOT_HEIGHT, CENTER_HEIGHT, SLOT_HEIGHT, SLOT_HEIGHT];
  const index = offset + 2;
  let top = 0;
  for (let i = 0; i < index; i += 1) {
    top += heights[i]! + SLOT_GAP;
  }
  return top;
}

/** Figma PARTNERS 198:886 — click opens link; hover previews */
export function PartnersSection({ partners }: PartnersSectionProps) {
  const t = useTranslations("home.partners");
  const count = partners.length;
  const [activeIndex, setActiveIndex] = useState(() =>
    count > 0 ? Math.min(2, count - 1) : 0,
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (count === 0) {
    return null;
  }

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
        </div>

        <div
          className="relative min-w-0 w-full"
          style={{ height: STACK_HEIGHT }}
          onMouseLeave={() => {
            setHoveredIndex(null);
          }}
        >
          {partners.map((partner, index) => {
            const offset = circularOffset(index, activeIndex, count);
            const visible = Math.abs(offset) <= 2;
            const metrics = slotMetrics(
              visible ? offset : offset > 0 ? 2 : -2,
            );
            const top = slotTop(visible ? offset : offset > 0 ? 2 : -2);
            const isActive = index === activeIndex;
            const isHovered = hoveredIndex === index;
            const showPreview = isHovered && !isActive;
            const href = partner.website ?? PARTNERS_HREF;

            return (
              <Link
                key={partner.id}
                href={href}
                aria-hidden={!visible}
                aria-current={isActive ? "true" : undefined}
                tabIndex={visible ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => {
                  setHoveredIndex(index);
                  if (!isActive) {
                    setActiveIndex(index);
                  }
                }}
                className={cn(
                  "absolute right-0 flex items-center justify-center overflow-hidden rounded-l-[80px] bg-[#ededed] px-8 py-2",
                  "transition-[transform,width,height,opacity,top] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  visible ? "cursor-pointer" : "pointer-events-none",
                  showPreview && "ring-1 ring-brand-ink/15",
                )}
                style={{
                  top,
                  width: `${metrics.widthPercent}%`,
                  height: metrics.height,
                  opacity: visible
                    ? showPreview
                      ? Math.min(1, metrics.opacity + 0.35)
                      : metrics.opacity
                    : 0,
                  zIndex: visible
                    ? showPreview
                      ? 10
                      : 5 - Math.abs(offset)
                    : 0,
                  transform: showPreview ? "scale(1.02)" : "scale(1)",
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
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
