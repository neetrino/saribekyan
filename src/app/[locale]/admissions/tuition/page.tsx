import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import {
  AdmissionsPageShell,
  TuitionContent,
  admissionsPageSections,
} from "@/features/admissions";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admissions.tuition" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function TuitionPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admissions.tuition");
  const tRoot = await getTranslations("admissions");
  const sectionNav = admissionsPageSections.tuition.map((section) => ({
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
      <TuitionContent locale={locale} />
    </AdmissionsPageShell>
  );
}
