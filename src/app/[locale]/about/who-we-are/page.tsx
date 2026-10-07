import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import {
  AboutIdentitySections,
  AboutPageShell,
  aboutPageSections,
  whoWeAreIntro,
} from "@/features/about";
import { getTeamPageMembers } from "@/features/team";

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
  const team = await getTeamPageMembers("about-who-we-are", locale);

  return (
    <AboutPageShell
      badge={whoWeAreIntro.badge}
      title={whoWeAreIntro.title}
      highlight={whoWeAreIntro.highlight}
      description={whoWeAreIntro.description}
      sectionNav={aboutPageSections.whoWeAre}
    >
      <AboutIdentitySections team={team} />
    </AboutPageShell>
  );
}
