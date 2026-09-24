import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import {
  AboutPageShell,
  ContentSection,
  DocumentYearFilter,
  InfoGrid,
  PeopleGrid,
  anqaInfo,
  qualityDirections,
  qualityDocuments,
  qualityIntro,
  qualityTeam,
  aboutPageSections,
} from "@/features/about";

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
        badge="Բաժին"
        title="Որակի ապահովման բաժնի ներկայացում"
        description="Պատասխանատու անձինք՝ լուսանկարով և կոնտակտային տվյալներով։"
      >
        <PeopleGrid people={qualityTeam} featuredFirst />
      </ContentSection>

      <ContentSection
        id="directions"
        badge="Ուղղություններ"
        title="Գործունեության ուղղություններ"
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
              key={point}
              className="rounded-3xl bg-[#f5f5f5] px-5 py-4 text-sm leading-6 text-brand-ink"
            >
              {point}
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
        <DocumentYearFilter documents={qualityDocuments} years={[2026, 2025, 2024]} />
      </ContentSection>
    </AboutPageShell>
  );
}
