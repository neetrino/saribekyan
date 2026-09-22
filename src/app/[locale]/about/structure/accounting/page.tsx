import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import {
  AboutPageShell,
  ContentSection,
  DocumentYearFilter,
  accountingDocuments,
  accountingIntro,
} from "@/features/about";

export const metadata: Metadata = {
  title: "Հաշվապահություն",
  description:
    "Հաշվապահության բաժնի 2025 և 2026 թվականների փաստաթղթեր և ֆինանսական հաշվետվություններ։",
};

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AccountingStructurePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

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
        title="2025 և 2026 թվականների փաստաթղթեր"
        description="Ֆինանսական հաշվետվություններ և հաշվապահական փաստաթղթեր ըստ տարիների։"
      >
        <DocumentYearFilter
          documents={accountingDocuments}
          years={[2026, 2025]}
        />
      </ContentSection>
    </AboutPageShell>
  );
}
