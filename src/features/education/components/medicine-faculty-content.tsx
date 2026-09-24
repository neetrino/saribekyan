import { getTranslations } from "next-intl/server";

import {
  medicineDepartmentIds,
  medicineLeadershipIds,
} from "../content/meta";
import { EducationDepartments } from "./education-departments";
import { EducationFacts } from "./education-facts";
import { EducationLeadership } from "./education-leadership";
import { EducationSection } from "./education-section";

export async function MedicineFacultyContent() {
  const t = await getTranslations("education");

  const leadership = medicineLeadershipIds.map((id) => ({
    id,
    name: t(`medicine.leadership.${id}.name`),
    role: t(`medicine.leadership.${id}.role`),
    bio: t(`medicine.leadership.${id}.bio`),
  }));

  const departments = medicineDepartmentIds.map((id) => ({
    id,
    title: t(`medicine.departments.${id}.title`),
    description: t(`medicine.departments.${id}.description`),
  }));

  return (
    <>
      <EducationSection
        id="about"
        badge={t("sections.about")}
        title={t("sections.about")}
      >
        <div className="max-w-3xl space-y-4 text-base leading-7 text-[#6f6f6f]">
          <p>{t("medicine.about.p1")}</p>
          <p>{t("medicine.about.p2")}</p>
        </div>
      </EducationSection>

      <EducationSection
        id="program"
        badge={t("sections.program")}
        title={t("medicine.program.title")}
        description={t("medicine.program.description")}
      >
        <EducationFacts
          items={[
            {
              label: t("sections.duration"),
              value: t("medicine.duration"),
            },
            {
              label: t("sections.qualification"),
              value: t("medicine.qualification"),
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
