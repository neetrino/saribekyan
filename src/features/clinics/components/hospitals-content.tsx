import { getTranslations } from "next-intl/server";

import {
  clinicGalleryImages,
  hospitalDirectionIds,
  hospitalEquipmentIds,
  hospitalFacilityCards,
  hospitalGalleryIds,
  hospitalPracticeIds,
  hospitalServiceIds,
  hospitalSpecialistIds,
  hospitalVideoIds,
} from "../content/meta";
import {
  mapGallery,
  mapInfoItems,
  mapPeople,
  mapVideos,
} from "../content/map-items";
import { ClinicContact } from "./clinic-contact";
import { ClinicGallery } from "./clinic-gallery";
import { ClinicImageCards } from "./clinic-image-cards";
import { ClinicInfoGrid } from "./clinic-info-grid";
import { ClinicSection } from "./clinic-section";
import { ClinicSpecialists } from "./clinic-specialists";
import { ClinicVideos } from "./clinic-videos";

export async function HospitalsContent() {
  const t = await getTranslations("clinics");

  const facilities = hospitalFacilityCards.map((card) => ({
    ...card,
    title: t(`facilities.${card.id}.title`),
    description: t(`facilities.${card.id}.description`),
  }));

  return (
    <>
      <ClinicSection
        id="about"
        badge={t("sections.about")}
        title={t("hospitals.about.title")}
      >
        <div className="max-w-3xl space-y-4 text-base leading-7 text-[#6f6f6f]">
          <p>{t("hospitals.about.p1")}</p>
          <p>{t("hospitals.about.p2")}</p>
        </div>
      </ClinicSection>

      <ClinicSection
        id="facilities"
        badge={t("sections.facilities")}
        title={t("hospitals.facilitiesTitle")}
        description={t("hospitals.facilitiesDescription")}
      >
        <ClinicImageCards items={facilities} viewLabel={t("hub.view")} />
      </ClinicSection>

      <ClinicSection
        id="directions"
        badge={t("sections.directions")}
        title={t("sections.directions")}
        description={t("hospitals.directionsLead")}
      >
        <ClinicInfoGrid
          items={mapInfoItems(t, "hospitals.directions", hospitalDirectionIds)}
        />
      </ClinicSection>

      <ClinicSection
        id="services"
        badge={t("sections.services")}
        title={t("sections.services")}
      >
        <ClinicInfoGrid
          items={mapInfoItems(t, "hospitals.services", hospitalServiceIds)}
        />
      </ClinicSection>

      <ClinicSection
        id="practice"
        badge={t("sections.practice")}
        title={t("sections.practice")}
        description={t("hospitals.practiceLead")}
      >
        <ClinicInfoGrid
          items={mapInfoItems(t, "hospitals.practice", hospitalPracticeIds)}
        />
      </ClinicSection>

      <ClinicSection
        id="equipment"
        badge={t("sections.equipment")}
        title={t("sections.equipment")}
      >
        <ClinicInfoGrid
          items={mapInfoItems(t, "hospitals.equipment", hospitalEquipmentIds)}
        />
      </ClinicSection>

      <ClinicSection
        id="specialists"
        badge={t("sections.specialists")}
        title={t("sections.specialists")}
      >
        <ClinicSpecialists
          people={mapPeople(t, "hospitals.specialists", hospitalSpecialistIds)}
        />
      </ClinicSection>

      <ClinicSection
        id="gallery"
        badge={t("sections.gallery")}
        title={t("sections.gallery")}
      >
        <ClinicGallery
          items={mapGallery(
            t,
            "hospitals.gallery",
            hospitalGalleryIds,
            clinicGalleryImages.hospitals,
          )}
        />
      </ClinicSection>

      <ClinicSection
        id="videos"
        badge={t("sections.videos")}
        title={t("sections.videos")}
        description={t("media.videosLead")}
      >
        <ClinicVideos
          items={mapVideos(
            t,
            "hospitals.videos",
            hospitalVideoIds,
            clinicGalleryImages.hospitals,
          )}
          pendingLabel={t("media.videoPending")}
        />
      </ClinicSection>

      <ClinicSection
        id="contacts"
        badge={t("sections.contacts")}
        title={t("sections.contacts")}
      >
        <ClinicContact
          title={t("hospitals.contact.title")}
          description={t("hospitals.contact.description")}
          hoursLabel={t("media.hours")}
          hours={t("hospitals.contact.hours")}
        />
      </ClinicSection>
    </>
  );
}
