import { getTranslations } from "next-intl/server";

import { internationalSectionIds } from "../content/meta";
import { InternationalCooperation } from "./international-cooperation";
import { InternationalCta } from "./international-cta";
import { InternationalOffice } from "./international-office";
import { InternationalPageShell } from "./international-page-shell";
import { InternationalPartners } from "./international-partners";
import { InternationalSection } from "./international-section";
import { InternationalParagraphs } from "./international-text";
import { MemorandumList } from "./memorandum-list";

export async function InternationalPageView() {
  const t = await getTranslations("international");

  const sectionNav = internationalSectionIds.map((id) => ({
    id,
    label: t(`nav.${id}`),
  }));

  return (
    <InternationalPageShell
      badge={t("hero.badge")}
      title={t("hero.title")}
      highlight={t("hero.highlight")}
      description={t("hero.description")}
      sectionNav={sectionNav}
    >
      <InternationalSection
        id="office"
        badge={t("office.badge")}
        title={t("office.title")}
      >
        <InternationalOffice />
      </InternationalSection>

      <InternationalSection
        id="cooperation"
        badge={t("cooperation.badge")}
        title={t("cooperation.title")}
      >
        <InternationalCooperation />
      </InternationalSection>

      <InternationalSection
        id="partners"
        badge={t("partners.badge")}
        title={t("partners.title")}
      >
        <InternationalPartners />
      </InternationalSection>

      <InternationalSection
        id="memoranda"
        badge={t("memoranda.badge")}
        title={t("memoranda.title")}
      >
        <MemorandumList />
      </InternationalSection>

      <InternationalSection
        id="exchange"
        badge={t("exchange.badge")}
        title={t("exchange.title")}
      >
        <InternationalParagraphs paragraphs={[t("exchange.text")]} />
      </InternationalSection>

      <InternationalCta />
    </InternationalPageShell>
  );
}
