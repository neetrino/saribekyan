import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AboutPageShell, ContentSection, hrIntro } from "@/features/about";
import { DocumentList, getPageDocuments } from "@/features/documents";
import { TeamPeopleGrid, getTeamPageMembers } from "@/features/team";

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
  const [team, documents, t] = await Promise.all([
    getTeamPageMembers("about-hr", locale),
    getPageDocuments("about-hr", locale),
    getTranslations("documents"),
  ]);

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
        <TeamPeopleGrid people={team.staff} featuredFirst />
      </ContentSection>

      <ContentSection
        id="documents"
        badge="Փաստաթղթեր"
        title="Կանոնակարգ և տարեկան հաշվետվություններ"
      >
        <DocumentList documents={documents.documents} emptyLabel={t("empty")} />
      </ContentSection>
    </AboutPageShell>
  );
}
