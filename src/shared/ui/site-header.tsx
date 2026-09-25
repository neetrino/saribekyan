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
import { mainNav, type NavKey } from "@/shared/config/site";
import { cn } from "@/shared/lib/cn";
import { DesktopMainNav } from "@/shared/ui/desktop-main-nav";

export function SiteHeader() {
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

  const navLabels = {
    home: t("nav.home"),
    about: t("nav.about"),
    education: t("nav.education"),
    admissions: t("nav.admissions"),
    clinics: t("nav.clinics"),
    science: t("nav.science"),
    contact: t("nav.contact"),
    international: t("nav.international"),
  } satisfies Record<NavKey, string>;

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      <div className="mx-auto grid max-w-[1440px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 pb-3 pt-6 sm:px-8 xl:gap-6 xl:px-8 xl:pb-4 xl:pt-11 wide:gap-8 wide:px-[72px] wide:pt-[44px]">
          <Link
            href="/"
            scroll={false}
            className="relative h-[69px] w-[62px] shrink-0"
          >
            <Image
              src="/logos/logo.svg"
              alt={t("brand.logoAlt")}
              fill
              priority
              className="object-contain"
              sizes="62px"
            />
          </Link>

          <div className="hidden min-w-0 justify-center px-2 xl:flex">
            <DesktopMainNav
              ariaLabel={t("nav.mainAria")}
              labels={navLabels}
            />
          </div>

          <div className="flex items-center justify-end gap-2">
            <div className="relative shrink-0" ref={langRef}>
              <button
                type="button"
                className="inline-flex h-14 w-24 items-center justify-center rounded-[29px] bg-brand-ink text-sm font-semibold tracking-[1.2px] text-[#f4f1ed] backdrop-blur-[7px] transition-opacity hover:opacity-90"
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
                    <span
                      className={cn(
                        "relative size-3.5 shrink-0 transition-transform duration-200 ease-out",
                        langOpen && "rotate-180",
                      )}
                    >
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

              <ul
                role="listbox"
                className={cn(
                  "absolute right-0 top-full z-50 mt-2 min-w-full origin-top overflow-hidden rounded-2xl bg-white py-1 text-brand-ink shadow-lg transition-[opacity,transform] duration-200 ease-out",
                  langOpen
                    ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                    : "pointer-events-none -translate-y-1 scale-95 opacity-0",
                )}
              >
                {locales.map((item) => (
                  <li
                    key={item}
                    role="option"
                    aria-selected={item === locale}
                  >
                    <button
                      type="button"
                      tabIndex={langOpen ? 0 : -1}
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
            className="mx-4 mt-3 rounded-3xl bg-white p-4 shadow-lg xl:hidden"
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

