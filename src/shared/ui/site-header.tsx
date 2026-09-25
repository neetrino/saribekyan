"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { AboutHeaderNavItem } from "@/features/about/components/about-header-nav-item";
import { AdmissionsHeaderNavItem } from "@/features/admissions/components/admissions-header-nav-item";
import { ClinicsHeaderNavItem } from "@/features/clinics/components/clinics-header-nav-item";
import { EducationHeaderNavItem } from "@/features/education/components/education-header-nav-item";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { locales, type AppLocale } from "@/i18n/routing";
import { mainNav } from "@/shared/config/site";
import { cn } from "@/shared/lib/cn";

type SiteHeaderProps = {
  /** When true, header sits in the parent content shell (no absolute / max-width row). */
  embedded?: boolean;
};

export function SiteHeader({ embedded = false }: SiteHeaderProps) {
  const t = useTranslations("common");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale() as AppLocale;
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    for (const item of mainNav) {
      router.prefetch(item.href);
    }
  }, [router]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!langRef.current?.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  function switchLocale(nextLocale: AppLocale) {
    setLangOpen(false);
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <header
      className={cn(
        "z-50",
        embedded ? "relative shrink-0" : "absolute inset-x-0 top-0",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-4",
          embedded
            ? "w-full gap-4 xl:gap-10 wide:gap-[75px]"
            : "mx-auto max-w-[1440px] px-4 pt-6 sm:px-8 xl:gap-10 xl:px-6 xl:pt-11 wide:gap-[75px] wide:px-[72px] wide:pt-[44px]",
        )}
      >
        <Link href="/" scroll={false} className="relative h-[69px] w-[62px] shrink-0">
          <Image
            src="/logos/logo.svg"
            alt={t("brand.logoAlt")}
            fill
            priority
            className="object-contain"
            sizes="62px"
          />
        </Link>

        <div className="ml-auto flex min-w-0 items-center gap-2 xl:ml-0 xl:flex-1">
          <nav
            aria-label={t("nav.mainAria")}
            className="hidden h-14 min-w-0 flex-1 items-center overflow-hidden rounded-[90px] bg-white xl:flex"
          >
            <ul className="flex w-full items-center justify-evenly px-3 text-base leading-[17px] text-brand-ink">
              {mainNav.map((item) => {
                if (item.key === "about") {
                  return <AboutHeaderNavItem key={item.href} />;
                }
                if (item.key === "education") {
                  return <EducationHeaderNavItem key={item.href} />;
                }
                if (item.key === "admissions") {
                  return <AdmissionsHeaderNavItem key={item.href} />;
                }
                if (item.key === "clinics") {
                  return <ClinicsHeaderNavItem key={item.href} />;
                }

                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.href} className="shrink-0">
                    <Link
                      href={item.href}
                      prefetch
                      scroll={false}
                      className={cn(
                        "inline-flex h-[38px] items-center whitespace-nowrap transition-colors",
                        active
                          ? "rounded-[40px] bg-brand-ink px-5 font-extrabold text-[#f5f5f5]"
                          : "hover:opacity-80",
                      )}
                    >
                      {t(`nav.${item.key}`)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="relative shrink-0" ref={langRef}>
            <button
              type="button"
              className="inline-flex h-14 w-24 items-center justify-center rounded-[29px] bg-brand-ink text-sm font-semibold tracking-[1.2px] text-[#f4f1ed] backdrop-blur-[7px]"
              aria-label={t("language.aria")}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
              onClick={() => setLangOpen((value) => !value)}
            >
              <span className="inline-flex items-center gap-2">
                <span className="relative size-5 shrink-0">
                  <Image src="/icons/globe.svg" alt="" fill sizes="20px" />
                </span>
                <span className="inline-flex items-center gap-px">
                  {t(`language.${locale}`)}
                  <span className="relative size-3.5 shrink-0">
                    <Image
                      src="/icons/chevron-down.svg"
                      alt=""
                      fill
                      sizes="14px"
                    />
                  </span>
                </span>
              </span>
            </button>

            {langOpen ? (
              <ul
                role="listbox"
                className="absolute right-0 top-full z-50 mt-2 min-w-full overflow-hidden rounded-2xl bg-white py-1 text-brand-ink shadow-lg"
              >
                {locales.map((item) => (
                  <li key={item} role="option" aria-selected={item === locale}>
                    <button
                      type="button"
                      className={cn(
                        "flex w-full px-4 py-2.5 text-left text-sm font-semibold tracking-[1.2px] transition-colors hover:bg-brand-ink/5",
                        item === locale && "bg-brand-ink/5",
                      )}
                      onClick={() => switchLocale(item)}
                    >
                      {t(`language.${item}`)}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <button
            type="button"
            className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-ink xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{t("nav.menu")}</span>
            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 bg-brand-ink" />
              <span className="block h-0.5 w-5 bg-brand-ink" />
              <span className="block h-0.5 w-5 bg-brand-ink" />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className={cn(
            "rounded-3xl bg-white p-4 shadow-lg xl:hidden",
            embedded ? "mt-3" : "mx-4",
          )}
        >
          <ul className="flex flex-col gap-1">
            {mainNav.map((item) => {
              if (item.key === "about") {
                return (
                  <AboutHeaderNavItem
                    key={item.href}
                    variant="mobile"
                    onNavigate={() => setOpen(false)}
                  />
                );
              }
              if (item.key === "education") {
                return (
                  <EducationHeaderNavItem
                    key={item.href}
                    variant="mobile"
                    onNavigate={() => setOpen(false)}
                  />
                );
              }
              if (item.key === "admissions") {
                return (
                  <AdmissionsHeaderNavItem
                    key={item.href}
                    variant="mobile"
                    onNavigate={() => setOpen(false)}
                  />
                );
              }
              if (item.key === "clinics") {
                return (
                  <ClinicsHeaderNavItem
                    key={item.href}
                    variant="mobile"
                    onNavigate={() => setOpen(false)}
                  />
                );
              }

              return (
                <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch
                  scroll={false}
                  className="block rounded-2xl px-4 py-3 text-brand-ink hover:bg-slate-100"
                  onClick={() => setOpen(false)}
                >
                  {t(`nav.${item.key}`)}
                </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
