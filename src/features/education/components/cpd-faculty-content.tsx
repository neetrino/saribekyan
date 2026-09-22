import { getTranslations } from "next-intl/server";

import {
  cpdAdmissionIds,
  cpdCourseIds,
  cpdProgramIds,
  cpdScheduleRowIds,
  cpdSpecialtyIds,
} from "../content/meta";
import { EducationFacts } from "./education-facts";
import { EducationInfoGrid } from "./education-info-grid";
import { EducationSchedule } from "./education-schedule";
import { EducationSection } from "./education-section";
import { EducationSpecialtyList } from "./education-specialty-list";

export async function CpdFacultyContent() {
  const t = await getTranslations("education");

  const programs = cpdProgramIds.map((id) => ({
    id,
    title: t(`cpd.programs.items.${id}.title`),
    description: t(`cpd.programs.items.${id}.description`),
  }));

  const specialties = cpdSpecialtyIds.map((id) =>
    t(`cpd.specialties.${id}`),
  );

  const admission = cpdAdmissionIds.map((id) => ({
    id,
    title: t(`cpd.admission.items.${id}.title`),
    description: t(`cpd.admission.items.${id}.description`),
  }));

  const courses = cpdCourseIds.map((id) => ({
    id,
    title: t(`cpd.courses.items.${id}.title`),
    description: t(`cpd.courses.items.${id}.description`),
  }));

  const scheduleRows = cpdScheduleRowIds.map((id) => ({
    id,
    course: t(`cpd.schedule.rows.${id}.course`),
    dates: t(`cpd.schedule.rows.${id}.dates`),
    format: t(`cpd.schedule.rows.${id}.format`),
    hours: t(`cpd.schedule.rows.${id}.hours`),
  }));

  return (
    <>
      <EducationSection
        id="about"
        badge={t("sections.about")}
        title={t("sections.about")}
      >
        <div className="max-w-3xl space-y-4 text-base leading-7 text-[#6f6f6f]">
          <p>{t("cpd.about.p1")}</p>
          <p>{t("cpd.about.p2")}</p>
        </div>
      </EducationSection>

      <EducationSection
        id="programs"
        badge={t("sections.programs")}
        title={t("cpd.programs.title")}
        description={t("cpd.programs.description")}
      >
        <EducationInfoGrid items={programs} />
      </EducationSection>

      <EducationSection
        id="residency"
        badge={t("sections.residency")}
        title={t("cpd.residency.title")}
        description={t("cpd.residency.description")}
      >
        <EducationFacts
          items={[
            {
              label: t("sections.duration"),
              value: t("cpd.duration"),
            },
          ]}
        />
      </EducationSection>

      <EducationSection
        id="specialties"
        badge={t("sections.specialties")}
        title={t("sections.specialties")}
      >
        <EducationSpecialtyList items={specialties} />
      </EducationSection>

      <EducationSection
        id="admission"
        badge={t("sections.admission")}
        title={t("cpd.admission.title")}
      >
        <EducationInfoGrid items={admission} />
      </EducationSection>

      <EducationSection
        id="courses"
        badge={t("sections.courses")}
        title={t("cpd.courses.title")}
        description={t("cpd.courses.description")}
      >
        <EducationInfoGrid items={courses} />
      </EducationSection>

      <EducationSection
        id="schedule"
        badge={t("sections.schedule")}
        title={t("cpd.schedule.title")}
        description={t("cpd.schedule.description")}
      >
        <EducationSchedule
          columns={{
            course: t("cpd.schedule.columns.course"),
            dates: t("cpd.schedule.columns.dates"),
            format: t("cpd.schedule.columns.format"),
            hours: t("cpd.schedule.columns.hours"),
          }}
          rows={scheduleRows}
        />
      </EducationSection>
    </>
  );
}
