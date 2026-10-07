"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const openMenusRef = useRef(new Set<string>());
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    for (const item of mainNav) {
      router.prefetch(item.href);
    }
  }, [router]);

  useEffect(() => {
    function onScroll(): void {
      setScrolled(window.scrollY > 12);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!langRef.current?.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const onMobileSubmenu = useCallback((key: string, isOpen: boolean) => {
    const menus = openMenusRef.current;
    if (isOpen) {
      menus.add(key);
    } else {
      menus.delete(key);
    }
    setSubmenuOpen(menus.size > 0);
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
    <header
      className="fixed inset-x-0 top-0 z-[100]"
      data-scrolled={scrolled ? "true" : "false"}
    >
      {/* Top bar only — glass stays behind logo/burger, not under the panel */}
      <div className="relative">
        {/* Scrolled glass background — Kamancha-style */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 rounded-b-[28px] bg-[linear-gradient(180deg,rgba(32,55,52,0.72)_0%,rgba(91,157,148,0.48)_100%)] backdrop-blur-[10px] transition-opacity duration-300 ease-out xl:rounded-b-[40px]",
            scrolled ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 rounded-b-[28px] transition-opacity duration-300 ease-out xl:rounded-b-[40px]",
            scrolled ? "opacity-100" : "opacity-0",
          )}
          style={{
            padding: 1,
            background:
              "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.04) 55%, rgba(255,255,255,0.12) 82%, rgba(255,255,255,0.22) 100%)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box exclude, linear-gradient(#fff 0 0)",
            mask: "linear-gradient(#fff 0 0) content-box exclude, linear-gradient(#fff 0 0)",
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 pb-3 pt-6 sm:px-8 xl:gap-6 xl:px-8 xl:pb-4 xl:pt-11 wide:gap-8 wide:px-[72px] wide:pt-[44px]">
          <Link
            href="/"
            scroll={false}
            className="relative h-[69px] w-[62px] shrink-0"
            onClick={() => {
              if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
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
            {/* Language — desktop only; mobile lives inside burger panel */}
            <div className="relative hidden shrink-0 xl:block" ref={langRef}>
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

            {/* Burger — Figma 200:1054 pill + 200:1055 charm:menu-hamburger → X */}
            <button
              type="button"
              className="relative z-20 inline-flex h-14 w-[111px] items-center justify-center rounded-[29px] border border-white/12 bg-white shadow-[0_0_32px_rgba(104,239,189,0.45)] xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? t("nav.closeMenu") : t("nav.menu")}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="relative block size-[38px]" aria-hidden>
                <span
                  className={cn(
                    "absolute left-[7px] block h-[2.5px] w-[25px] rounded-full bg-black transition-all duration-300 ease-in-out",
                    open ? "top-[17.75px] rotate-45" : "top-[11.75px] rotate-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-[7px] top-[18.25px] block h-[2.5px] w-[25px] rounded-full bg-black transition-all duration-300 ease-in-out",
                    open ? "opacity-0" : "opacity-100",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-[7px] block h-[2.5px] w-[25px] rounded-full bg-black transition-all duration-300 ease-in-out",
                    open ? "top-[17.75px] -rotate-45" : "top-[24.75px] rotate-0",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Menu panel opens below the bar — no glass behind it */}
      <nav
          id="mobile-nav"
          aria-hidden={!open}
          className={cn(
            "relative z-10 mx-4 rounded-3xl bg-white shadow-lg transition-[max-height,opacity,margin,padding] duration-300 ease-out xl:hidden",
            open
              ? "mt-3 p-4 opacity-100"
              : "pointer-events-none mt-0 max-h-0 overflow-hidden p-0 opacity-0",
            open && submenuOpen && "max-h-[min(70svh,640px)] overflow-y-auto overscroll-contain",
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
                      onMobileOpenChange={(isOpen) => onMobileSubmenu("about", isOpen)}
                    />
                  );
                }
                if (item.key === "education") {
                  return (
                    <EducationHeaderNavItem
                      key={item.href}
                      variant="mobile"
                      onNavigate={() => setOpen(false)}
                      onMobileOpenChange={(isOpen) => onMobileSubmenu("education", isOpen)}
                    />
                  );
                }
                if (item.key === "admissions") {
                  return (
                    <AdmissionsHeaderNavItem
                      key={item.href}
                      variant="mobile"
                      onNavigate={() => setOpen(false)}
                      onMobileOpenChange={(isOpen) => onMobileSubmenu("admissions", isOpen)}
                    />
                  );
                }
                if (item.key === "clinics") {
                  return (
                    <ClinicsHeaderNavItem
                      key={item.href}
                      variant="mobile"
                      onNavigate={() => setOpen(false)}
                      onMobileOpenChange={(isOpen) => onMobileSubmenu("clinics", isOpen)}
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
                      tabIndex={open ? 0 : -1}
                    >
                      {t(`nav.${item.key}`)}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-3 border-t border-brand-ink/10 pt-3">
              <p className="px-4 pb-2 text-xs font-semibold tracking-[1.2px] text-brand-ink/50">
                {t("language.aria")}
              </p>
              <ul className="flex gap-2 px-2" role="listbox" aria-label={t("language.aria")}>
                {locales.map((item) => (
                  <li key={item} role="option" aria-selected={item === locale}>
                    <button
                      type="button"
                      tabIndex={open ? 0 : -1}
                      className={cn(
                        "inline-flex h-11 min-w-[4.5rem] items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold tracking-[1.2px] transition-colors",
                        item === locale
                          ? "bg-brand-ink text-white"
                          : "bg-brand-ink/5 text-brand-ink hover:bg-brand-ink/10",
                      )}
                      onClick={() => {
                        switchLocale(item);
                        setOpen(false);
                      }}
                    >
                      {t(`language.${item}`)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
      </header>
  );
}

