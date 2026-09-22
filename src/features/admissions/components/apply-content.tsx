import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/shared/config/site";

import { ApplicationForms } from "./application-forms";
import { ContentSection } from "./content-section";
import { InfoCards } from "./info-cards";

export async function ApplyContent() {
  const t = await getTranslations("admissions.apply");

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
        badge={t("forms.badge")}
        title={t("forms.title")}
        description={t("forms.description")}
      >
        <ApplicationForms />
      </ContentSection>

      <ContentSection badge={t("submit.badge")} title={t("submit.title")}>
        <InfoCards items={submitItems} />
      </ContentSection>
    </>
  );
}
