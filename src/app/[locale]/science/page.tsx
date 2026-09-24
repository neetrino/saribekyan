import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { SciencePageContent } from "@/features/science";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "science.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function SciencePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SciencePageContent />;
}
