import { getTranslations } from "next-intl/server";

import {
  clinicGalleryImages,
  practicalCourseIds,
  practicalDentalSimIds,
  practicalEquipmentIds,
  practicalFacilityCards,
  practicalGalleryIds,
  practicalSkillIds,
  practicalVideoIds,
} from "../content/meta";
import {
  mapGallery,
  mapInfoItems,
  mapVideos,
} from "../content/map-items";
import { ClinicGallery } from "./clinic-gallery";
import { ClinicImageCards } from "./clinic-image-cards";
import { ClinicInfoGrid } from "./clinic-info-grid";
import { ClinicSection } from "./clinic-section";
import { ClinicTourCta } from "./clinic-tour-cta";
import { ClinicVideos } from "./clinic-videos";

export async function PracticalContent() {
  const t = await getTranslations("clinics");

  const facilities = practicalFacilityCards.map((card) => ({
    ...card,
    title: t(`facilities.${card.id}.title`),
    description: t(`facilities.${card.id}.description`),
  }));

  return (
    <>
      <ClinicSection
        id="about"
        badge={t("sections.about")}
        title={t("practical.about.title")}
      >
        <div className="max-w-3xl space-y-4 text-base leading-7 text-[#6f6f6f]">
          <p>{t("practical.about.p1")}</p>
          <p>{t("practical.about.p2")}</p>
        </div>
      </ClinicSection>

      <ClinicSection
        id="centers"
        badge={t("sections.centers")}
        title={t("practical.centersTitle")}
        description={t("practical.centersDescription")}
      >
        <ClinicImageCards items={facilities} viewLabel={t("hub.view")} />
      </ClinicSection>

      <ClinicSection
        id="dental-sim"
        badge={t("sections.dentalSim")}
        title={t("practical.dentalSim.title")}
        description={t("practical.dentalSim.description")}
      >
        <ClinicInfoGrid
          items={mapInfoItems(
            t,
            "practical.dentalSim.items",
            practicalDentalSimIds,
          )}
        />
      </ClinicSection>

      <ClinicSection
        id="courses"
        badge={t("sections.courses")}
        title={t("sections.courses")}
        description={t("practical.coursesLead")}
      >
        <ClinicInfoGrid
          items={mapInfoItems(t, "practical.courses", practicalCourseIds)}
        />
      </ClinicSection>

      <ClinicSection
        id="equipment"
        badge={t("sections.equipment")}
        title={t("sections.equipment")}
      >
        <ClinicInfoGrid
          items={mapInfoItems(t, "practical.equipment", practicalEquipmentIds)}
        />
      </ClinicSection>

      <ClinicSection
        id="skills"
        badge={t("sections.skills")}
        title={t("sections.skills")}
        description={t("practical.skillsLead")}
      >
        <ClinicInfoGrid
          items={mapInfoItems(t, "practical.skills", practicalSkillIds)}
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
            "practical.gallery",
            practicalGalleryIds,
            clinicGalleryImages.practical,
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
            "practical.videos",
            practicalVideoIds,
            clinicGalleryImages.practical,
          )}
          pendingLabel={t("media.videoPending")}
        />
      </ClinicSection>

      <ClinicTourCta />
    </>
  );
}
