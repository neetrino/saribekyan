import { getTranslations } from "next-intl/server";

import {
  cisFocusIds,
  europeFocusIds,
  exchangeIds,
  internationalSectionIds,
  projectIds,
} from "../content/meta";
import { InternationalCta } from "./international-cta";
import { InternationalInfoGrid } from "./international-info-grid";
import { InternationalOffice } from "./international-office";
import { InternationalPageShell } from "./international-page-shell";
import { InternationalSection } from "./international-section";
import { MemorandumList } from "./memorandum-list";
import { PartnerGrid } from "./partner-grid";
import { PartnerLogos } from "./partner-logos";

function mapCards(
  ids: readonly string[],
  read: (id: string, field: "title" | "description") => string,
) {
  return ids.map((id) => ({
    id,
    title: read(id, "title"),
    description: read(id, "description"),
  }));
}

export async function InternationalPageView() {
  const t = await getTranslations("international");

  const sectionNav = internationalSectionIds.map((id) => ({
    id,
    label: t(`nav.${id}`),
  }));

  const europe = mapCards(europeFocusIds, (id, field) =>
    t(`europe.items.${id}.${field}`),
  );
  const cis = mapCards(cisFocusIds, (id, field) =>
    t(`cis.items.${id}.${field}`),
  );
  const exchange = mapCards(exchangeIds, (id, field) =>
    t(`exchange.items.${id}.${field}`),
  );
  const projects = mapCards(projectIds, (id, field) =>
    t(`projects.items.${id}.${field}`),
  );

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
        description={t("office.description")}
      >
        <InternationalOffice />
      </InternationalSection>

      <InternationalSection
        id="europe"
        badge={t("europe.badge")}
        title={t("europe.title")}
        description={t("europe.description")}
      >
        <InternationalInfoGrid items={europe} />
      </InternationalSection>

      <InternationalSection
        id="cis"
        badge={t("cis.badge")}
        title={t("cis.title")}
        description={t("cis.description")}
      >
        <InternationalInfoGrid items={cis} />
      </InternationalSection>

      <InternationalSection
        id="partners"
        badge={t("partners.badge")}
        title={t("partners.title")}
        description={t("partners.description")}
      >
        <div className="space-y-10">
          <PartnerLogos />
          <PartnerGrid />
        </div>
      </InternationalSection>

      <InternationalSection
        id="memoranda"
        badge={t("memoranda.badge")}
        title={t("memoranda.title")}
        description={t("memoranda.description")}
      >
        <MemorandumList />
      </InternationalSection>

      <InternationalSection
        id="exchange"
        badge={t("exchange.badge")}
        title={t("exchange.title")}
        description={t("exchange.description")}
      >
        <InternationalInfoGrid items={exchange} />
      </InternationalSection>

      <InternationalSection
        id="projects"
        badge={t("projects.badge")}
        title={t("projects.title")}
        description={t("projects.description")}
      >
        <InternationalInfoGrid items={projects} />
      </InternationalSection>

      <InternationalCta />
    </InternationalPageShell>
  );
}
