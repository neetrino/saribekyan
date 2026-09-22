import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import {
  AboutPageShell,
  ContentSection,
  DocumentList,
  PeopleGrid,
  hrDocuments,
  hrIntro,
  hrStaff,
} from "@/features/about";

export const metadata: Metadata = {
  title: "Մարդկային ռեսուրսներ",
  description:
    "Մարդկային ռեսուրսների կառավարման և ընդհանուր բաժին՝ աշխատակազմ, կանոնակարգ և հաշվետվություններ։",
};

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HrStructurePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <AboutPageShell
      badge={hrIntro.badge}
      title={hrIntro.title}
      highlight={hrIntro.highlight}
      description={hrIntro.description}
      compact
    >
      <ContentSection
        id="staff"
        badge="Աշխատակազմ"
        title="Բաժնի աշխատակազմ"
      >
        <PeopleGrid people={hrStaff} featuredFirst />
      </ContentSection>

      <ContentSection
        id="documents"
        badge="Փաստաթղթեր"
        title="Կանոնակարգ և տարեկան հաշվետվություններ"
      >
        <DocumentList documents={hrDocuments} />
      </ContentSection>
    </AboutPageShell>
  );
}
