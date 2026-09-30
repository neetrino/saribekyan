import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AboutPageShell, ContentSection, accountingIntro } from "@/features/about";
import { DocumentYearFilter, getPageDocuments } from "@/features/documents";

export const metadata: Metadata = {
  title: "Հաշվապահություն",
  description:
    "Հաշվապահության բաժնի փաստաթղթեր և ֆինանսական հաշվետվություններ ըստ տարիների։",
};

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AccountingStructurePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [documents, t] = await Promise.all([
    getPageDocuments("about-accounting", locale),
    getTranslations("documents"),
  ]);

  return (
    <AboutPageShell
      badge={accountingIntro.badge}
      title={accountingIntro.title}
      highlight={accountingIntro.highlight}
      description={accountingIntro.description}
      compact
    >
      <ContentSection
        id="documents"
        badge="Փաստաթղթեր"
        title="Ֆինանսական հաշվետվություններ և փաստաթղթեր"
        description="Ֆինանսական հաշվետվություններ և հաշվապահական փաստաթղթեր ըստ տարիների։"
      >
        <DocumentYearFilter documents={documents.financial} allLabel={t("all")} emptyLabel={t("empty")} />
      </ContentSection>
    </AboutPageShell>
  );
}
