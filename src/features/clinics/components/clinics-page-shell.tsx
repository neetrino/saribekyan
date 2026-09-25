import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import {
  PageSectionNav,
  type PageSectionNavItem,
} from "@/shared/ui/page-section-nav";
import { SectionBadge } from "@/shared/ui/section-badge";
import { cn } from "@/shared/lib/cn";

import { clinicNavHrefs } from "../content/meta";
import { ClinicsSubnav } from "./clinics-subnav";

type ClinicsPageShellProps = {
  children: ReactNode;
  badge: string;
  title: string;
  highlight?: string;
  description: string;
  currentLabel?: string;
  activeHref?: string;
  compact?: boolean;
  sectionNav?: PageSectionNavItem[];
};

export async function ClinicsPageShell({
  children,
  badge,
  title,
  highlight,
  description,
  currentLabel,
  activeHref = "/clinics",
  compact = false,
  sectionNav,
}: ClinicsPageShellProps) {
  const t = await getTranslations("clinics");

  const navItems = clinicNavHrefs.map((item) => ({
    href: item.href,
    label: t(`nav.${item.key}`),
  }));

  return (
    <main>
      <section
        className={cn(
          "relative overflow-hidden bg-gradient-to-b from-brand-ink from-[18%] to-brand-mint",
          compact ? "pb-20 pt-0" : "pb-28 pt-0",
        )}
      >
        <div
          className={cn(
            "relative mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-20",
            compact ? "pb-6 pt-36" : "pb-10 pt-40",
          )}
        >
          <nav aria-label={t("breadcrumb.aria")} className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/70">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  {t("breadcrumb.home")}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              {currentLabel ? (
                <>
                  <li>
                    <Link
                      href="/clinics"
                      className="transition-colors hover:text-white"
                    >
                      {t("breadcrumb.clinics")}
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-white">{currentLabel}</li>
                </>
              ) : (
                <li className="text-white">{t("breadcrumb.clinics")}</li>
              )}
            </ol>
          </nav>
          <SectionBadge className="bg-white/15 text-white">{badge}</SectionBadge>
          <h1 className="mt-4 max-w-4xl text-[clamp(2rem,5vw,3.25rem)] font-light leading-[1.15] tracking-[-1px] text-white">
            {title}
            {highlight ? (
              <>
                {" "}
                <span className="font-semibold text-brand-lime">{highlight}</span>
              </>
            ) : null}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/85">
            {description}
          </p>
        </div>
      </section>

      <div className="relative z-10 -mt-10 rounded-t-[40px] bg-white px-6 pb-20 pt-8 sm:px-10 lg:-mt-14 lg:px-20 lg:pb-24 lg:pt-10">
        <div className="mx-auto max-w-[1280px]">
          {sectionNav && sectionNav.length > 0 ? (
            <PageSectionNav items={sectionNav} ariaLabel={t("sectionNavAria")} />
          ) : (
            <ClinicsSubnav
              items={navItems}
              ariaLabel={t("nav.aria")}
              activeHref={activeHref}
            />
          )}
          <div className="space-y-14 lg:space-y-16">{children}</div>
        </div>
      </div>
    </main>
  );
}
