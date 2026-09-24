import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import {
  AdmissionsPageShell,
  ApplyContent,
  admissionsPageSections,
} from "@/features/admissions";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admissions.apply" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ApplyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admissions.apply");
  const tRoot = await getTranslations("admissions");
  const sectionNav = admissionsPageSections.apply.map((section) => ({
    id: section.id,
    label: tRoot(section.labelKey),
  }));

  return (
    <AdmissionsPageShell
      badge={t("badge")}
      title={t("title")}
      highlight={t("highlight")}
      description={t("description")}
      sectionNav={sectionNav}
    >
      <ApplyContent />
    </AdmissionsPageShell>
  );
}
