import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import {
  AboutPageShell,
  ContentSection,
  InfoGrid,
  anqaInfo,
  qualityDirections,
  qualityIntro,
  aboutPageSections,
} from "@/features/about";
import { DocumentYearFilter, getPageDocuments } from "@/features/documents";
import { TeamPeopleGrid, getTeamPageMembers } from "@/features/team";

export const metadata: Metadata = {
  title: "Որակի ապահովում",
  description:
    "Որակի ապահովման համակարգ, ANQA չափանիշներ, հաշվետվություններ և աշխատանքային պլաններ։",
};

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function QualityPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [team, documents, t] = await Promise.all([
    getTeamPageMembers("about-quality", locale),
    getPageDocuments("about-quality", locale),
    getTranslations("documents"),
  ]);

  return (
    <AboutPageShell
      badge={qualityIntro.badge}
      title={qualityIntro.title}
      highlight={qualityIntro.highlight}
      description={qualityIntro.description}
      sectionNav={aboutPageSections.quality}
    >
      <ContentSection
        id="team"
        badge="ՈԱ"
        title="ՈԱ համակարգի կառավարում"
        description="Պատասխանատու անձինք՝ լուսանկարով և կոնտակտային տվյալներով։"
      >
        <TeamPeopleGrid people={team.team} featuredFirst />
      </ContentSection>

      <ContentSection
        id="directions"
        badge="Ուղղություններ"
        title="Գործունեության հիմնական ուղղությունները"
      >
        <InfoGrid items={qualityDirections} />
      </ContentSection>

      <ContentSection
        id="anqa"
        badge="ANQA"
        title={anqaInfo.title}
        description={anqaInfo.text}
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {anqaInfo.points.map((point) => (
            <li
              key={point.title}
              className="rounded-3xl bg-[#f5f5f5] px-5 py-4 text-sm leading-6 text-brand-ink"
            >
              <p className="font-semibold">{point.title}</p>
              <p className="mt-1 text-brand-ink/80">{point.description}</p>
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection
        id="documents"
        badge="Փաստաթղթեր"
        title="Հաշվետվություններ, պլաններ և փաստաթղթեր"
        description="Ինքնավերլուծության հաշվետվություններ և 2024 թվականից սկսած տարեկան փաստաթղթեր։"
      >
        <DocumentYearFilter documents={documents.reports} allLabel={t("all")} emptyLabel={t("empty")} />
      </ContentSection>
    </AboutPageShell>
  );
}
