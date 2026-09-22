import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import {
  AboutPageShell,
  ContentSection,
  OrgChart,
  StructureUnitCards,
  orgChart,
  structureIntro,
  structureUnits,
} from "@/features/about";

export const metadata: Metadata = {
  title: "Կառուցվածք",
  description:
    "Համալսարանի կազմակերպչական կառուցվածքը, մարդկային ռեսուրսներ, հաշվապահություն և տնտեսական մաս։",
};

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function StructurePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <AboutPageShell
      badge={structureIntro.badge}
      title={structureIntro.title}
      highlight={structureIntro.highlight}
      description={structureIntro.description}
    >
      <ContentSection
        id="org-chart"
        badge="Սխեմա"
        title="Համալսարանի կառուցվածքային սխեմա"
        description="Կառավարման մարմինները և հիմնական վարչական ստորաբաժանումները։"
      >
        <OrgChart root={orgChart} />
      </ContentSection>

      <ContentSection
        id="units"
        badge="Ստորաբաժանումներ"
        title="Վարչական ստորաբաժանումներ"
      >
        <StructureUnitCards units={structureUnits} />
      </ContentSection>
    </AboutPageShell>
  );
}
