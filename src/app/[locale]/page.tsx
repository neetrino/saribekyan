import { setRequestLocale } from "next-intl/server";

import {
  AboutSection,
  AdmissionsSection,
  ClinicsSection,
  getHomeContent,
  HeroSection,
  NewsSection,
  PartnersSection,
  ProgramsSection,
} from "@/features/home";

/** ISR — CMS content refresh without full rebuild */
export const revalidate = 60;

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = await getHomeContent();

  return (
    <main>
      <HeroSection />
      <AboutSection stats={content.stats} />
      <ProgramsSection programs={content.programs} />
      <AdmissionsSection steps={content.admissionSteps} />
      <ClinicsSection clinics={content.clinics} />
      <PartnersSection partners={content.partners} />
      <NewsSection featured={content.featuredNews} items={content.news} />
    </main>
  );
}
