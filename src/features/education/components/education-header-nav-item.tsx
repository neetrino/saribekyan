"use client";

import { useTranslations } from "next-intl";

import { usePathname } from "@/i18n/navigation";
import { HeaderDropdown } from "@/shared/ui/header-dropdown";

import { educationHeaderNav } from "../content/meta";

type EducationHeaderNavItemProps = {
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
};

export function EducationHeaderNavItem({
  onNavigate,
  variant = "desktop",
}: EducationHeaderNavItemProps) {
  const t = useTranslations("education");
  const pathname = usePathname();

  return (
    <HeaderDropdown
      label={t("breadcrumb.education")}
      overviewHref="/education"
      overviewLabel={t("nav.overview")}
      sectionsAriaLabel={t("sectionsDropdownAria")}
      isActive={pathname === "/education" || pathname.startsWith("/education/")}
      variant={variant}
      onNavigate={onNavigate}
      groups={educationHeaderNav.map((group) => ({
        key: group.key,
        href: group.href,
        label: t(`nav.${group.key}`),
        sections: group.sectionIds.map((id) => ({
          id,
          label: t(`sections.${id}`),
        })),
      }))}
    />
  );
}
