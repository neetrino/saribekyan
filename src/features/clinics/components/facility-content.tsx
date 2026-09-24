import { getTranslations } from "next-intl/server";

import {
  clinicGalleryImages,
  facilityDirectionIds,
  facilityEquipmentIds,
  facilityGalleryIds,
  facilityPracticeIds,
  facilityServiceIds,
  facilitySpecialistIds,
  facilityVideoIds,
  type ClinicFacilitySlug,
} from "../content/meta";
import {
  mapGallery,
  mapInfoItems,
  mapPeople,
  mapVideos,
} from "../content/map-items";
import { ClinicContact } from "./clinic-contact";
import { ClinicGallery } from "./clinic-gallery";
import { ClinicInfoGrid } from "./clinic-info-grid";
import { ClinicSection } from "./clinic-section";
import { ClinicSpecialists } from "./clinic-specialists";
import { ClinicTourCta } from "./clinic-tour-cta";
import { ClinicVideos } from "./clinic-videos";

type FacilityContentProps = {
  slug: ClinicFacilitySlug;
};

export async function FacilityContent({ slug }: FacilityContentProps) {
  const t = await getTranslations("clinics");
  const images = clinicGalleryImages[slug];

  return (
    <>
      <ClinicSection
        id="about"
        badge={t("sections.about")}
        title={t(`${slug}.about.title`)}
      >
        <div className="max-w-3xl space-y-4 text-base leading-7 text-[#6f6f6f]">
          <p>{t(`${slug}.about.p1`)}</p>
          <p>{t(`${slug}.about.p2`)}</p>
        </div>
      </ClinicSection>

      <ClinicSection
        id="directions"
        badge={t("sections.directions")}
        title={t("sections.directions")}
      >
        <ClinicInfoGrid
          items={mapInfoItems(t, `${slug}.directions`, facilityDirectionIds[slug])}
        />
      </ClinicSection>

      <ClinicSection
        id="services"
        badge={t("sections.services")}
        title={t("sections.services")}
      >
        <ClinicInfoGrid
          items={mapInfoItems(t, `${slug}.services`, facilityServiceIds[slug])}
        />
      </ClinicSection>

      <ClinicSection
        id="practice"
        badge={
          slug === "simulation" ? t("sections.skills") : t("sections.practice")
        }
        title={
          slug === "simulation" ? t("sections.skills") : t("sections.practice")
        }
      >
        <ClinicInfoGrid
          items={mapInfoItems(
            t,
            `${slug}.practice`,
            facilityPracticeIds[slug],
          )}
        />
      </ClinicSection>

      <ClinicSection
        id="equipment"
        badge={t("sections.equipment")}
        title={t("sections.equipment")}
      >
        <ClinicInfoGrid
          items={mapInfoItems(t, `${slug}.equipment`, facilityEquipmentIds[slug])}
        />
      </ClinicSection>

      <ClinicSection
        id="specialists"
        badge={t("sections.specialists")}
        title={t("sections.specialists")}
      >
        <ClinicSpecialists
          people={mapPeople(
            t,
            `${slug}.specialists`,
            facilitySpecialistIds[slug],
          )}
        />
      </ClinicSection>

      <ClinicSection
        id="gallery"
        badge={t("sections.gallery")}
        title={t("sections.gallery")}
      >
        <ClinicGallery
          items={mapGallery(t, `${slug}.gallery`, facilityGalleryIds, images)}
        />
      </ClinicSection>

      <ClinicSection
        id="videos"
        badge={t("sections.videos")}
        title={t("sections.videos")}
        description={t("media.videosLead")}
      >
        <ClinicVideos
          items={mapVideos(t, `${slug}.videos`, facilityVideoIds, images)}
          pendingLabel={t("media.videoPending")}
        />
      </ClinicSection>

      <ClinicSection
        id="contacts"
        badge={t("sections.contacts")}
        title={t("sections.contacts")}
      >
        <ClinicContact
          title={t(`${slug}.contact.title`)}
          description={t(`${slug}.contact.description`)}
          hoursLabel={t("media.hours")}
          hours={t(`${slug}.contact.hours`)}
        />
      </ClinicSection>

      {slug === "simulation" ? <ClinicTourCta /> : null}
    </>
  );
}
