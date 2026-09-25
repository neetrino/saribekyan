"use client";

import { useEffect, useId, useRef, useState } from "react";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/shared/lib/cn";
import { ChevronDownIcon } from "@/shared/ui/chevron-down-icon";

export type HeaderDropdownSection = {
  id: string;
  label: string;
};

export type HeaderDropdownGroup = {
  key: string;
  href: string;
  label: string;
  sections: HeaderDropdownSection[];
};

type HeaderDropdownProps = {
  label: string;
  overviewHref: string;
  overviewLabel: string;
  groups: HeaderDropdownGroup[];
  sectionsAriaLabel: string;
  isActive: boolean;
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
};

export function HeaderDropdown({
  label,
  overviewHref,
  overviewLabel,
  groups,
  sectionsAriaLabel,
  isActive,
  onNavigate,
  variant = "desktop",
}: HeaderDropdownProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expandedHref, setExpandedHref] = useState<string | null>(null);
  const rootRef = useRef<HTMLLIElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (variant !== "desktop") {
      return;
    }

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setExpandedHref(null);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        setExpandedHref(null);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [variant]);

  useEffect(() => {
    setOpen(false);
    setExpandedHref(null);
  }, [pathname]);

  function closeMenu() {
    setOpen(false);
    setExpandedHref(null);
    onNavigate?.();
  }

  if (variant === "mobile") {
    return (
      <li>
        <button
          type="button"
          className={cn(
            "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-brand-ink hover:bg-slate-100",
            isActive && "bg-slate-100 font-semibold",
          )}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {label}
          <ChevronDownIcon
            className={cn("transition-transform", open && "rotate-180")}
          />
        </button>
        {open ? (
          <ul className="mb-1 ml-2 space-y-1 border-l border-brand-ink/10 pl-3">
            <li>
              <Link
                href={overviewHref}
                prefetch
                className="block rounded-xl px-3 py-2 text-sm text-brand-ink hover:bg-slate-100"
                onClick={closeMenu}
              >
                {overviewLabel}
              </Link>
            </li>
            {groups.map((group) => {
              const groupOpen = expandedHref === group.href;

              return (
                <li key={group.href}>
                  <div className="flex items-center gap-1">
                    <Link
                      href={group.href}
                      prefetch
                      className="flex-1 rounded-xl px-3 py-2 text-sm text-brand-ink hover:bg-slate-100"
                      onClick={closeMenu}
                    >
                      {group.label}
                    </Link>
                    <button
                      type="button"
                      className="inline-flex size-9 items-center justify-center rounded-xl hover:bg-slate-100"
                      aria-expanded={groupOpen}
                      aria-label={sectionsAriaLabel}
                      onClick={() =>
                        setExpandedHref((current) =>
                          current === group.href ? null : group.href,
                        )
                      }
                    >
                      <ChevronDownIcon
                        className={cn(
                          "transition-transform",
                          groupOpen && "rotate-180",
                        )}
                      />
                    </button>
                  </div>
                  {groupOpen ? (
                    <ul className="mb-1 ml-2 space-y-0.5 border-l border-brand-ink/10 pl-2">
                      {group.sections.map((section) => (
                        <li key={section.id}>
                          <Link
                            href={{ pathname: group.href, hash: section.id }}
                            prefetch
                            className="block rounded-lg px-3 py-2 text-sm text-[#6f6f6f] hover:bg-slate-100 hover:text-brand-ink"
                            onClick={closeMenu}
                          >
                            {section.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        ) : null}
      </li>
    );
  }

  return (
    <li ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        className={cn(
          "inline-flex h-[38px] items-center whitespace-nowrap transition-colors",
          isActive
            ? "rounded-[40px] bg-brand-ink px-5 font-extrabold text-[#f5f5f5]"
            : "hover:opacity-80",
          open && !isActive && "opacity-80",
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute left-0 top-full z-50 mt-3 max-h-[70vh] w-[min(22rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl bg-white py-2 text-brand-ink shadow-lg"
        >
          <Link
            href={overviewHref}
            role="menuitem"
            prefetch
            className="block px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-brand-ink/5"
            onClick={closeMenu}
          >
            {overviewLabel}
          </Link>

          {groups.map((group) => {
            const groupOpen = expandedHref === group.href;

            return (
              <div key={group.href} className="border-t border-[#f0f0f0]">
                <div className="flex items-stretch">
                  <Link
                    href={group.href}
                    role="menuitem"
                    prefetch
                    className="flex-1 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-brand-ink/5"
                    onClick={closeMenu}
                  >
                    {group.label}
                  </Link>
                  <button
                    type="button"
                    className="inline-flex items-center border-l border-[#f0f0f0] px-3 transition-colors hover:bg-brand-ink/5"
                    aria-expanded={groupOpen}
                    aria-label={sectionsAriaLabel}
                    onClick={() =>
                      setExpandedHref((current) =>
                        current === group.href ? null : group.href,
                      )
                    }
                  >
                    <ChevronDownIcon
                      className={cn(
                        "transition-transform",
                        groupOpen && "rotate-180",
                      )}
                    />
                  </button>
                </div>
                {groupOpen ? (
                  <ul className="bg-[#fafafa] py-1">
                    {group.sections.map((section) => (
                      <li key={section.id} role="none">
                        <Link
                          href={{ pathname: group.href, hash: section.id }}
                          role="menuitem"
                          prefetch
                          className="block px-4 py-2 text-sm text-[#6f6f6f] transition-colors hover:bg-brand-ink/5 hover:text-brand-ink"
                          onClick={closeMenu}
                        >
                          {section.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}
    </li>
  );
}
