import { getTranslations } from "next-intl/server";

import { AdmissionsPageShell } from "./admissions-page-shell";
import { HowToApplyContent } from "./how-to-apply-content";

export async function HowToApplyPageView() {
  const t = await getTranslations("admissions.howToApply");

  return (
    <AdmissionsPageShell
      badge={t("badge")}
      title={t("title")}
      highlight={t("highlight")}
      description={t("description")}
    >
      <HowToApplyContent />
    </AdmissionsPageShell>
  );
}
