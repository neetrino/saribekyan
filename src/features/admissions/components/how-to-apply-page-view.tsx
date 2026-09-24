import { getTranslations } from "next-intl/server";

import { admissionsPageSections } from "../content/hub";
import { AdmissionsPageShell } from "./admissions-page-shell";
import { HowToApplyContent } from "./how-to-apply-content";

export async function HowToApplyPageView() {
  const t = await getTranslations("admissions.howToApply");
  const tRoot = await getTranslations("admissions");

  const sectionNav = admissionsPageSections.howToApply.map((section) => ({
    id: section.id,
    label: tRoot(section.labelKey),
  }));

  return (
    <AdmissionsPageShell
      badge={t("badge")}
      title={t("title")}
      highlight={t("highlight")}
      description={t("description")}
      sectionNav={sectionNav}
    >
      <HowToApplyContent />
    </AdmissionsPageShell>
  );
}
