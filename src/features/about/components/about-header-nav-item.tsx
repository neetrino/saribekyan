"use client";

import { useTranslations } from "next-intl";

import { usePathname } from "@/i18n/navigation";
import { HeaderDropdown } from "@/shared/ui/header-dropdown";

import { aboutHeaderNav } from "../content/hub";

type AboutHeaderNavItemProps = {
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
};

export function AboutHeaderNavItem({
  onNavigate,
  variant = "desktop",
}: AboutHeaderNavItemProps) {
  const t = useTranslations("about");
  const pathname = usePathname();

  return (
    <HeaderDropdown
      label={t("breadcrumb.about")}
      overviewHref="/about"
      overviewLabel={t("nav.overview")}
      sectionsAriaLabel={t("sectionsDropdownAria")}
      isActive={pathname === "/about" || pathname.startsWith("/about/")}
      variant={variant}
      onNavigate={onNavigate}
      groups={aboutHeaderNav.map((group) => ({
        key: group.key,
        href: group.href,
        label: t(`nav.${group.key}`),
        sections: group.sections,
      }))}
    />
  );
}
