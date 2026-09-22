import { getTranslations } from "next-intl/server";

import {
  applicationStepIds,
  conditionIds,
  deadlineIds,
  internationalRequirementIds,
  regulationFiles,
  requiredDocumentIds,
} from "../content/hub";
import { AdmissionsCta } from "./admissions-cta";
import { ContentSection } from "./content-section";
import { DeadlineGrid } from "./deadline-grid";
import { InfoCards } from "./info-cards";
import { PdfDownloadList } from "./pdf-download-list";
import { ProcessSteps } from "./process-steps";

export async function HowToApplyContent() {
  const t = await getTranslations("admissions.howToApply");

  const steps = applicationStepIds.map((id) => ({
    id,
    number: t(`steps.${id}.number`),
    title: t(`steps.${id}.title`),
    description: t(`steps.${id}.description`),
  }));

  const documents = requiredDocumentIds.map((id) => ({
    id,
    title: t(`documents.${id}.title`),
    description: t(`documents.${id}.description`),
  }));

  const conditions = conditionIds.map((id) => ({
    id,
    title: t(`conditions.${id}.title`),
    description: t(`conditions.${id}.description`),
  }));

  const international = internationalRequirementIds.map((id) => ({
    id,
    title: t(`international.${id}.title`),
    description: t(`international.${id}.description`),
  }));

  const regulations = regulationFiles.map((file) => ({
    id: file.id,
    title: t(`regulations.${file.id}.title`),
    description: t(`regulations.${file.id}.description`),
    href: file.href,
    meta: String(file.year),
  }));

  const deadlines = deadlineIds.map((id) => ({
    id,
    title: t(`deadlines.${id}.title`),
    description: t(`deadlines.${id}.description`),
    date: t(`deadlines.${id}.date`),
  }));

  return (
    <>
      <ContentSection
        id="steps"
        badge={t("steps.badge")}
        title={t("steps.title")}
        description={t("steps.description")}
      >
        <ProcessSteps steps={steps} />
      </ContentSection>

      <ContentSection
        id="documents"
        badge={t("documents.badge")}
        title={t("documents.title")}
        description={t("documents.description")}
      >
        <InfoCards items={documents} />
      </ContentSection>

      <ContentSection
        id="conditions"
        badge={t("conditions.badge")}
        title={t("conditions.title")}
        description={t("conditions.description")}
      >
        <InfoCards items={conditions} />
      </ContentSection>

      <ContentSection
        id="international"
        badge={t("international.badge")}
        title={t("international.title")}
        description={t("international.description")}
      >
        <InfoCards items={international} />
      </ContentSection>

      <ContentSection
        id="regulations"
        badge={t("regulations.badge")}
        title={t("regulations.title")}
        description={t("regulations.description")}
      >
        <PdfDownloadList items={regulations} />
      </ContentSection>

      <ContentSection
        id="deadlines"
        badge={t("deadlines.badge")}
        title={t("deadlines.title")}
        description={t("deadlines.description")}
      >
        <DeadlineGrid items={deadlines} />
      </ContentSection>

      <AdmissionsCta />
    </>
  );
}
