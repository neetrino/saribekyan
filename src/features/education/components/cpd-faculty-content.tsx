import { getTranslations } from "next-intl/server";

import { cpdClinicalIds } from "../content/meta";
import { asStringList } from "../content/string-list";
import { EducationInfoGrid } from "./education-info-grid";
import { EducationSection } from "./education-section";

type PedagogyGroup = {
  title: string;
  items: string[];
};

type AssessmentRow = {
  method: string;
  description: string;
};

function readPedagogyGroups(value: unknown): PedagogyGroup[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((group) => {
    if (typeof group !== "object" || group === null) {
      return [];
    }

    const record = group as { title?: unknown; items?: unknown };
    if (typeof record.title !== "string") {
      return [];
    }

    return [{ title: record.title, items: asStringList(record.items) }];
  });
}

function readAssessmentRows(value: unknown): AssessmentRow[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((row) => {
    if (typeof row !== "object" || row === null) {
      return [];
    }

    const record = row as { method?: unknown; description?: unknown };
    if (typeof record.method !== "string" || typeof record.description !== "string") {
      return [];
    }

    return [{ method: record.method, description: record.description }];
  });
}

export async function CpdFacultyContent() {
  const t = await getTranslations("education");

  const clinical = cpdClinicalIds.map((id) => ({
    id,
    title: t(`cpd.clinical.items.${id}.title`),
    description: t(`cpd.clinical.items.${id}.description`),
  }));

  const formats = (["mode", "duration", "result"] as const).map((id) => ({
    id,
    title: t(`cpd.formats.items.${id}.title`),
    description: t(`cpd.formats.items.${id}.description`),
  }));

  const pedagogyGroups = readPedagogyGroups(t.raw("cpd.pedagogy.groups"));
  const assessmentRows = readAssessmentRows(t.raw("cpd.assessment.rows"));

  return (
    <>
      <EducationSection id="about" badge={t("sections.about")} title={t("sections.about")}>
        <div className="max-w-3xl space-y-4 text-base leading-7 text-[#6f6f6f]">
          {asStringList(t.raw("cpd.about.paragraphs")).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </EducationSection>

      <EducationSection
        id="clinical"
        badge={t("sections.clinical")}
        title={t("cpd.clinical.title")}
        description={t("cpd.clinical.description")}
      >
        <EducationInfoGrid items={clinical} />
      </EducationSection>

      <EducationSection
        id="pedagogy"
        badge={t("sections.pedagogy")}
        title={t("cpd.pedagogy.title")}
        description={t("cpd.pedagogy.description")}
      >
        <div className="grid gap-4">
          {pedagogyGroups.map((group) => (
            <section key={group.title} className="rounded-3xl bg-[#f5f5f5] px-5 py-4">
              <h3 className="text-base font-semibold text-brand-ink">{group.title}</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[#6f6f6f]">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </EducationSection>

      <EducationSection
        id="assessment"
        badge={t("sections.assessment")}
        title={t("cpd.assessment.title")}
        description={t("cpd.assessment.description")}
      >
        <div className="overflow-x-auto rounded-3xl border border-[#e8e8e8]">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-brand-ink text-white">
              <tr>
                <th className="px-5 py-4 font-semibold">{t("cpd.assessment.columns.method")}</th>
                <th className="px-5 py-4 font-semibold">
                  {t("cpd.assessment.columns.description")}
                </th>
              </tr>
            </thead>
            <tbody>
              {assessmentRows.map((row, index) => (
                <tr key={row.method} className={index % 2 === 0 ? "bg-white" : "bg-[#f7f8f8]"}>
                  <td className="px-5 py-4 font-medium text-brand-ink">{row.method}</td>
                  <td className="px-5 py-4 text-[#6f6f6f]">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </EducationSection>

      <EducationSection
        id="formats"
        badge={t("sections.formats")}
        title={t("cpd.formats.title")}
      >
        <EducationInfoGrid items={formats} />
      </EducationSection>
    </>
  );
}
