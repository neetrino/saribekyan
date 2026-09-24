import { getTranslations } from "next-intl/server";

import {
  paymentMethodIds,
  paymentScheduleIds,
  paymentTermIds,
} from "../content/hub";
import { AdmissionsCta } from "./admissions-cta";
import { ContentSection } from "./content-section";
import { InfoCards } from "./info-cards";
import { ProcessSteps } from "./process-steps";
import { TuitionPrograms } from "./tuition-programs";

type TuitionContentProps = {
  locale: string;
};

export async function TuitionContent({ locale }: TuitionContentProps) {
  const t = await getTranslations("admissions.tuition");

  const terms = paymentTermIds.map((id) => ({
    id,
    title: t(`terms.${id}.title`),
    description: t(`terms.${id}.description`),
  }));

  const schedule = paymentScheduleIds.map((id) => ({
    id,
    number: t(`schedule.${id}.number`),
    title: t(`schedule.${id}.title`),
    description: t(`schedule.${id}.description`),
  }));

  const methods = paymentMethodIds.map((id) => ({
    id,
    title: t(`methods.${id}.title`),
    description: t(`methods.${id}.description`),
  }));

  return (
    <>
      <ContentSection
        id="programs"
        badge={t("programs.badge")}
        title={t("programs.title")}
        description={t("programs.description")}
      >
        <TuitionPrograms locale={locale} />
      </ContentSection>

      <ContentSection
        id="terms"
        badge={t("terms.badge")}
        title={t("terms.title")}
      >
        <InfoCards items={terms} />
      </ContentSection>

      <ContentSection
        id="schedule"
        badge={t("schedule.badge")}
        title={t("schedule.title")}
        description={t("schedule.description")}
      >
        <ProcessSteps steps={schedule} />
      </ContentSection>

      <ContentSection
        id="methods"
        badge={t("methods.badge")}
        title={t("methods.title")}
      >
        <InfoCards items={methods} />
      </ContentSection>

      <AdmissionsCta />
    </>
  );
}
