"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { AboutHeaderNavItem } from "@/features/about/components/about-header-nav-item";
import { AdmissionsHeaderNavItem } from "@/features/admissions/components/admissions-header-nav-item";
import { ClinicsHeaderNavItem } from "@/features/clinics/components/clinics-header-nav-item";
import { EducationHeaderNavItem } from "@/features/education/components/education-header-nav-item";
import { Link, usePathname } from "@/i18n/navigation";
import { mainNav, type NavKey } from "@/shared/config/site";
import { cn } from "@/shared/lib/cn";

type PillBox = {
  left: number;
  width: number;
  ready: boolean;
};

function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

type DesktopMainNavProps = {
  labels: Record<NavKey, string>;
  ariaLabel: string;
};

export function DesktopMainNav({ labels, ariaLabel }: DesktopMainNavProps) {
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef(new Map<string, HTMLElement>());
  const [pill, setPill] = useState<PillBox>({
    left: 0,
    width: 0,
    ready: false,
  });

  const setItemRef = useCallback((key: string, node: HTMLElement | null) => {
    if (node) {
      itemRefs.current.set(key, node);
    } else {
      itemRefs.current.delete(key);
    }
  }, []);

  const updatePill = useCallback(() => {
    const list = listRef.current;
    if (!list) {
      return;
    }

    const active = mainNav.find((item) => isNavActive(pathname, item.href));
    if (!active) {
      setPill((current) => ({ ...current, ready: false }));
      return;
    }

    const target = itemRefs.current.get(active.key);
    if (!target) {
      return;
    }

    const listRect = list.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    setPill({
      left: targetRect.left - listRect.left,
      width: targetRect.width,
      ready: true,
    });
  }, [pathname]);

  useLayoutEffect(() => {
    updatePill();

    const list = listRef.current;
    if (!list) {
      return;
    }

    const observer = new ResizeObserver(() => {
      updatePill();
    });
    observer.observe(list);

    window.addEventListener("resize", updatePill);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePill);
    };
  }, [updatePill, labels]);

  return (
    <nav
      aria-label={ariaLabel}
      className="relative hidden h-14 w-full max-w-full items-center rounded-[90px] bg-white xl:flex"
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-1/2 h-[38px] -translate-y-1/2 rounded-[40px] bg-brand-ink",
          pill.ready
            ? "opacity-100 transition-[left,width,opacity] duration-300 ease-out"
            : "opacity-0",
        )}
        style={{ left: pill.left, width: pill.width }}
      />
      <ul
        ref={listRef}
        className="relative z-10 flex w-full items-center justify-between gap-0.5 px-1.5 text-[12px] leading-[17px] text-brand-ink xl:gap-1 xl:px-2 xl:text-[13px] wide:gap-2 wide:px-3 wide:text-[15px]"
      >
        {mainNav.map((item) => {
          const active = isNavActive(pathname, item.href);

          if (item.key === "about") {
            return (
              <AboutHeaderNavItem
                key={item.href}
                slidingActive
                triggerRef={(node) => setItemRef(item.key, node)}
              />
            );
          }
          if (item.key === "education") {
            return (
              <EducationHeaderNavItem
                key={item.href}
                slidingActive
                triggerRef={(node) => setItemRef(item.key, node)}
              />
            );
          }
          if (item.key === "admissions") {
            return (
              <AdmissionsHeaderNavItem
                key={item.href}
                slidingActive
                triggerRef={(node) => setItemRef(item.key, node)}
              />
            );
          }
          if (item.key === "clinics") {
            return (
              <ClinicsHeaderNavItem
                key={item.href}
                slidingActive
                triggerRef={(node) => setItemRef(item.key, node)}
              />
            );
          }

          return (
            <li key={item.href} className="relative shrink-0">
              <Link
                href={item.href}
                prefetch
                scroll={false}
                className={cn(
                  "inline-flex h-[38px] items-center px-1.5 whitespace-nowrap transition-colors duration-300 xl:px-2 wide:px-3",
                  active
                    ? "font-extrabold text-[#f5f5f5]"
                    : "hover:opacity-80",
                )}
                ref={(node) => {
                  setItemRef(item.key, node);
                }}
              >
                {labels[item.key]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
