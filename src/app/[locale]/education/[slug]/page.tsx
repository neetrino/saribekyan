import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import {
  CpdFacultyContent,
  DentistryFacultyContent,
  EducationAdmissionsCta,
  EducationPageShell,
  MedicineFacultyContent,
  educationPageSections,
  educationSlugs,
  isEducationSlug,
  type EducationSlug,
} from "@/features/education";

type EducationProgramPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return educationSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: EducationProgramPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isEducationSlug(slug)) {
    return { title: "Education" };
  }

  const t = await getTranslations({ locale, namespace: `education.${slug}` });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

function FacultyContent({ slug }: { slug: EducationSlug }) {
  switch (slug) {
    case "medicine":
      return <MedicineFacultyContent />;
    case "dentistry":
      return <DentistryFacultyContent />;
    case "cpd":
      return <CpdFacultyContent />;
  }
}

export default async function EducationProgramPage({
  params,
}: EducationProgramPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!isEducationSlug(slug)) {
    notFound();
  }

  const t = await getTranslations(`education.${slug}`);
  const tEducation = await getTranslations("education");

  const sectionNav = educationPageSections[slug].map((id) => ({
    id,
    label: tEducation(`sections.${id}`),
  }));

  return (
    <EducationPageShell
      badge={t("badge")}
      title={t("title")}
      highlight={t("highlight")}
      description={t("description")}
      currentLabel={t("badge")}
      compact
      sectionNav={sectionNav}
    >
      <FacultyContent slug={slug} />
      <EducationAdmissionsCta />
    </EducationPageShell>
  );
}
