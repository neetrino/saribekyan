import { getLocale, getTranslations } from "next-intl/server";

import { TeamPeopleGrid, getTeamPageMembers } from "@/features/team";

import { medicineDepartmentIds } from "../content/meta";
import { asStringList } from "../content/string-list";
import { EducationDepartments } from "./education-departments";
import { EducationFacts } from "./education-facts";
import { EducationSection } from "./education-section";

export async function MedicineFacultyContent() {
  const t = await getTranslations("education");
  const team = await getTeamPageMembers("education-medicine", await getLocale());

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
          {asStringList(t.raw("medicine.about.paragraphs")).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </EducationSection>

      <EducationSection
        id="program"
        badge={t("sections.program")}
        title={t("medicine.program.title")}
        description={t("medicine.program.description")}
      >
        <ul className="mb-6 max-w-3xl list-disc space-y-2 pl-5 text-base leading-7 text-[#6f6f6f]">
          {asStringList(t.raw("medicine.program.items")).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <EducationFacts
          items={[
            {
              label: t("sections.duration"),
              value: t("medicine.duration"),
            },
            {
              label: t("sections.credits"),
              value: t("medicine.credits"),
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
        <TeamPeopleGrid people={team.leadership} featuredFirst />
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
