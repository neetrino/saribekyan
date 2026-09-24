import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import {
  ClinicsPageShell,
  FacilityContent,
  HospitalsContent,
  PracticalContent,
  TourContent,
  clinicSlugs,
  clinicsPageSections,
  getClinicNavHref,
  isClinicFacilitySlug,
  isClinicSlug,
  type ClinicSlug,
} from "@/features/clinics";

type ClinicsSubPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return clinicSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ClinicsSubPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isClinicSlug(slug)) {
    return { title: "Clinics" };
  }

  const t = await getTranslations({ locale, namespace: `clinics.${slug}` });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

function ClinicsSlugBody({ slug }: { slug: ClinicSlug }) {
  if (slug === "hospitals") {
    return <HospitalsContent />;
  }

  if (slug === "practical") {
    return <PracticalContent />;
  }

  if (slug === "tour") {
    return <TourContent />;
  }

  if (isClinicFacilitySlug(slug)) {
    return <FacilityContent slug={slug} />;
  }

  return null;
}

export default async function ClinicsSubPage({ params }: ClinicsSubPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!isClinicSlug(slug)) {
    notFound();
  }

  const t = await getTranslations(`clinics.${slug}`);
  const tRoot = await getTranslations("clinics");
  const sectionNav = clinicsPageSections[slug].map((section) => ({
    id: section.id,
    label: tRoot(section.labelKey),
  }));

  return (
    <ClinicsPageShell
      badge={t("badge")}
      title={t("title")}
      highlight={t("highlight")}
      description={t("description")}
      currentLabel={t("badge")}
      activeHref={getClinicNavHref(slug)}
      compact
      sectionNav={sectionNav}
    >
      <ClinicsSlugBody slug={slug} />
    </ClinicsPageShell>
  );
}
