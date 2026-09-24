import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import {
  AboutPageShell,
  ContentSection,
  HistoryTimeline,
  InfoGrid,
  PeopleGrid,
  academicCouncil,
  boardOfTrustees,
  historyItems,
  leadershipContacts,
  mainActivities,
  missionVision,
  rectorate,
  universityValues,
  whoWeAreIntro,
  aboutPageSections,
} from "@/features/about";

export const metadata: Metadata = {
  title: "Ով ենք մենք",
  description:
    "Համալսարանի պատմություն, առաքելություն, տեսլական, արժեքներ և ղեկավար կազմ։",
};

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function WhoWeArePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <AboutPageShell
      badge={whoWeAreIntro.badge}
      title={whoWeAreIntro.title}
      highlight={whoWeAreIntro.highlight}
      description={whoWeAreIntro.description}
      sectionNav={aboutPageSections.whoWeAre}
    >
      <ContentSection
        id="history"
        badge="Պատմություն"
        title="Համալսարանի պատմական ուղին"
        description="Հիմնադրումից մինչև ինստիտուցիոնալ հավատարմագրում՝ հիմնական փուլերը։"
      >
        <HistoryTimeline items={historyItems} />
      </ContentSection>

      <ContentSection
        id="mission"
        badge="Առաքելություն և տեսլական"
        title="Մեր նպատակը և ուղղությունը"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-3xl bg-gradient-to-b from-brand-ink to-brand-teal p-7 text-white shadow-md">
            <h3 className="text-xl font-semibold">{missionVision.mission.title}</h3>
            <p className="mt-4 text-base leading-7 text-white/85">
              {missionVision.mission.text}
            </p>
          </article>
          <article className="rounded-3xl bg-[#f5f5f5] p-7 text-brand-ink">
            <h3 className="text-xl font-semibold">{missionVision.vision.title}</h3>
            <p className="mt-4 text-base leading-7 text-[#6f6f6f]">
              {missionVision.vision.text}
            </p>
          </article>
        </div>
      </ContentSection>

      <ContentSection
        id="values"
        badge="Արժեքներ"
        title="Այն, ինչով առաջնորդվում ենք"
      >
        <InfoGrid items={universityValues} />
      </ContentSection>

      <ContentSection
        id="activities"
        badge="Գործունեություն"
        title="Համալսարանի հիմնական գործունեությունը"
      >
        <InfoGrid items={mainActivities} />
      </ContentSection>

      <ContentSection
        id="governance"
        badge="Կառավարման խորհուրդ"
        title="Կառավարման խորհուրդ"
        description="Ռազմավարական որոշումներ և ինստիտուցիոնալ վերահսկողություն։"
      >
        <PeopleGrid people={boardOfTrustees} featuredFirst />
      </ContentSection>

      <ContentSection
        id="academic-council"
        badge="Գիտական խորհուրդ"
        title="Գիտական խորհուրդ"
        description="Ակադեմիական և գիտական քաղաքականության ձևավորում։"
      >
        <PeopleGrid people={academicCouncil} />
      </ContentSection>

      <ContentSection
        id="rectorate"
        badge="Ռեկտորատ"
        title="Ռեկտորատ"
        description="Օպերատիվ կառավարում և համալսարանի առօրյա ղեկավարում։"
      >
        <PeopleGrid people={rectorate} featuredFirst />
      </ContentSection>

      <ContentSection
        id="leadership"
        badge="Ղեկավար կազմ"
        title="Ղեկավար կազմի և պատասխանատու անձանց տվյալներ"
      >
        <PeopleGrid people={leadershipContacts} />
      </ContentSection>
    </AboutPageShell>
  );
}
