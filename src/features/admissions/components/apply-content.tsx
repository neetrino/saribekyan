import { getLocale, getTranslations } from "next-intl/server";

import { getPageDocuments } from "@/features/documents";
import { siteConfig } from "@/shared/config/site";

import { ApplicationForms } from "./application-forms";
import { ContentSection } from "./content-section";
import { InfoCards } from "./info-cards";

export async function ApplyContent() {
  const locale = await getLocale();
  const [t, documents] = await Promise.all([
    getTranslations("admissions.apply"),
    getPageDocuments("admissions-apply", locale),
  ]);

  const submitItems = [
    {
      id: "inPerson",
      title: t("submit.inPerson.title"),
      description: t("submit.inPerson.description"),
    },
    {
      id: "email",
      title: t("submit.email.title"),
      description: t("submit.email.description", { email: siteConfig.email }),
    },
  ];

  return (
    <>
      <ContentSection
        id="forms"
        badge={t("forms.badge")}
        title={t("forms.title")}
        description={t("forms.description")}
      >
        <ApplicationForms forms={documents.forms} />
      </ContentSection>

      <ContentSection
        id="submit"
        badge={t("submit.badge")}
        title={t("submit.title")}
      >
        <InfoCards items={submitItems} />
      </ContentSection>
    </>
  );
}
