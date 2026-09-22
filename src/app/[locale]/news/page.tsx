import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ComingSoonPage } from "@/shared/ui/coming-soon-page";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.news" });
  return { title: t("title") };
}

export default async function NewsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.news");

  return <ComingSoonPage title={t("title")} description={t("description")} />;
}
