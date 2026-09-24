"use client";

import { useTranslations } from "next-intl";

import { usePathname } from "@/i18n/navigation";
import { HeaderDropdown } from "@/shared/ui/header-dropdown";

import { clinicsHeaderNav } from "../content/meta";

type ClinicsHeaderNavItemProps = {
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
};

export function ClinicsHeaderNavItem({
  onNavigate,
  variant = "desktop",
}: ClinicsHeaderNavItemProps) {
  const t = useTranslations("clinics");
  const pathname = usePathname();

  return (
    <HeaderDropdown
      label={t("breadcrumb.clinics")}
      overviewHref="/clinics"
      overviewLabel={t("nav.overview")}
      sectionsAriaLabel={t("sectionsDropdownAria")}
      isActive={pathname === "/clinics" || pathname.startsWith("/clinics/")}
      variant={variant}
      onNavigate={onNavigate}
      groups={clinicsHeaderNav.map((group) => ({
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
