import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { HowToApplyPageView } from "@/features/admissions";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "admissions.howToApply",
  });

  return {
    title: t("international.title"),
    description: t("international.description"),
  };
}

export default async function AdmissionsInternationalPage({
  params,
}: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HowToApplyPageView />;
}
