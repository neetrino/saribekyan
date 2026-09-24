import { getTranslations } from "next-intl/server";

import {
  dentistryDepartmentIds,
  dentistryLeadershipIds,
} from "../content/meta";
import { EducationDepartments } from "./education-departments";
import { EducationFacts } from "./education-facts";
import { EducationLeadership } from "./education-leadership";
import { EducationSection } from "./education-section";

export async function DentistryFacultyContent() {
  const t = await getTranslations("education");

  const leadership = dentistryLeadershipIds.map((id) => ({
    id,
    name: t(`dentistry.leadership.${id}.name`),
    role: t(`dentistry.leadership.${id}.role`),
    bio: t(`dentistry.leadership.${id}.bio`),
  }));

  const departments = dentistryDepartmentIds.map((id) => ({
    id,
    title: t(`dentistry.departments.${id}.title`),
    description: t(`dentistry.departments.${id}.description`),
  }));

  return (
    <>
      <EducationSection
        id="about"
        badge={t("sections.about")}
        title={t("sections.about")}
      >
        <div className="max-w-3xl space-y-4 text-base leading-7 text-[#6f6f6f]">
          <p>{t("dentistry.about.p1")}</p>
          <p>{t("dentistry.about.p2")}</p>
        </div>
      </EducationSection>

      <EducationSection
        id="program"
        badge={t("sections.program")}
        title={t("dentistry.program.title")}
        description={t("dentistry.program.description")}
      >
        <EducationFacts
          items={[
            {
              label: t("sections.duration"),
              value: t("dentistry.duration"),
            },
            {
              label: t("sections.qualification"),
              value: t("dentistry.qualification"),
            },
          ]}
        />
      </EducationSection>

      <EducationSection
        id="leadership"
        badge={t("sections.leadership")}
        title={t("sections.leadership")}
      >
        <EducationLeadership people={leadership} />
      </EducationSection>

      <EducationSection
        id="departments"
        badge={t("sections.departments")}
        title={t("sections.departments")}
      >
        <EducationDepartments items={departments} />
      </EducationSection>
    </>
  );
}
