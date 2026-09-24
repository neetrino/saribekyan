"use client";

import { useTranslations } from "next-intl";

import { usePathname } from "@/i18n/navigation";
import { HeaderDropdown } from "@/shared/ui/header-dropdown";

import { admissionsHeaderNav } from "../content/hub";

type AdmissionsHeaderNavItemProps = {
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
};

export function AdmissionsHeaderNavItem({
  onNavigate,
  variant = "desktop",
}: AdmissionsHeaderNavItemProps) {
  const t = useTranslations("admissions");
  const pathname = usePathname();

  return (
    <HeaderDropdown
      label={t("breadcrumb.admissions")}
      overviewHref="/admissions"
      overviewLabel={t("nav.overview")}
      sectionsAriaLabel={t("sectionsDropdownAria")}
      isActive={
        pathname === "/admissions" || pathname.startsWith("/admissions/")
      }
      variant={variant}
      onNavigate={onNavigate}
      groups={admissionsHeaderNav.map((group) => ({
        key: group.key,
        href: group.href,
        label: t(`nav.${group.key}`),
        sections: group.sections.map((section) => ({
          id: section.id,
          label: t(section.labelKey),
        })),
      }))}
    />
  );
}
