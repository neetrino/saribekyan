import { getTranslations } from "next-intl/server";

import { ContactDetails } from "./contact-details";
import { ContactForm } from "./contact-form";
import { ContactMap } from "./contact-map";
import { ContactPageShell } from "./contact-page-shell";
import { ContactSection } from "./contact-section";
import { ContactSocial } from "./contact-social";
import { DepartmentContacts } from "./department-contacts";

export async function ContactPageView() {
  const t = await getTranslations("contact");

  return (
    <ContactPageShell
      badge={t("hero.badge")}
      title={t("hero.title")}
      highlight={t("hero.highlight")}
      description={t("hero.description")}
    >
      <ContactSection
        id="details"
        badge={t("details.badge")}
        title={t("details.title")}
        description={t("details.description")}
      >
        <ContactDetails />
      </ContactSection>

      <ContactSection
        id="departments"
        badge={t("departments.badge")}
        title={t("departments.title")}
        description={t("departments.description")}
      >
        <DepartmentContacts />
      </ContactSection>

      <ContactSection
        id="social"
        badge={t("social.badge")}
        title={t("social.title")}
        description={t("social.description")}
      >
        <ContactSocial />
      </ContactSection>

      <ContactSection
        id="map"
        badge={t("map.badge")}
        title={t("map.title")}
        description={t("map.description")}
      >
        <ContactMap />
      </ContactSection>

      <ContactSection
        id="form"
        badge={t("form.badge")}
        title={t("form.title")}
        description={t("form.description")}
      >
        <ContactForm />
      </ContactSection>
    </ContactPageShell>
  );
}
