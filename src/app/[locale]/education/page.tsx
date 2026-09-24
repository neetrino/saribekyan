import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import {
  EducationAdmissionsCta,
  EducationHubCards,
  EducationPageShell,
} from "@/features/education";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "education.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function EducationPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("education");

  return (
    <EducationPageShell
      badge={t("hero.badge")}
      title={t("hero.title")}
      highlight={t("hero.highlight")}
      description={t("hero.description")}
    >
      <EducationHubCards />
      <EducationAdmissionsCta />
    </EducationPageShell>
  );
}
