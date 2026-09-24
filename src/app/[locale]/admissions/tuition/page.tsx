import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AdmissionsPageShell, TuitionContent } from "@/features/admissions";

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

  return (
    <AdmissionsPageShell
      badge={t("badge")}
      title={t("title")}
      highlight={t("highlight")}
      description={t("description")}
    >
      <TuitionContent locale={locale} />
    </AdmissionsPageShell>
  );
}
