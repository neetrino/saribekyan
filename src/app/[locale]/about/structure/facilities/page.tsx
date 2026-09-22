import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import {
  AboutPageShell,
  ContentSection,
  InfoGrid,
  facilitiesIntro,
  facilitiesResources,
} from "@/features/about";

export const metadata: Metadata = {
  title: "Տնտեսական մաս",
  description:
    "Շենքային և նյութատեխնիկական ռեսուրսներ, արդիականացումներ, վերանորոգումներ և սարքավորումներ։",
};

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function FacilitiesStructurePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <AboutPageShell
      badge={facilitiesIntro.badge}
      title={facilitiesIntro.title}
      highlight={facilitiesIntro.highlight}
      description={facilitiesIntro.description}
      compact
    >
      <ContentSection
        id="resources"
        badge="Ռեսուրսներ"
        title="Շենքային և նյութատեխնիկական ռեսուրսներ"
      >
        <InfoGrid items={facilitiesResources} />
      </ContentSection>
    </AboutPageShell>
  );
}
