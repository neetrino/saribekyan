import { getLocale, getTranslations } from "next-intl/server";

import { TeamPeopleGrid, getTeamPageMembers } from "@/features/team";

import {
  clinicGalleryImages,
  facilityDirectionIds,
  facilityEquipmentIds,
  facilityGalleryIds,
  facilityPracticeIds,
  facilityServiceIds,
  facilityVideoIds,
  type ClinicFacilitySlug,
} from "../content/meta";
import { mapGallery, mapInfoItems, mapVideos } from "../content/map-items";
import { ClinicContact } from "./clinic-contact";
import { ClinicGallery } from "./clinic-gallery";
import { ClinicInfoGrid } from "./clinic-info-grid";
import { ClinicSection } from "./clinic-section";
import { ClinicTourCta } from "./clinic-tour-cta";
import { ClinicVideos } from "./clinic-videos";

type FacilityContentProps = {
  slug: ClinicFacilitySlug;
};

const facilityTeamPageKeys = {
  complex: "clinics-complex",
  dental: "clinics-dental",
  simulation: "clinics-simulation",
} as const satisfies Record<ClinicFacilitySlug, string>;

export async function FacilityContent({ slug }: FacilityContentProps) {
  const t = await getTranslations("clinics");
  const images = clinicGalleryImages[slug];
  const team = await getTeamPageMembers(facilityTeamPageKeys[slug], await getLocale());

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
          {slug === "complex" ? (
            <>
              <p>{t("complex.about.p3")}</p>
              <p className="font-medium text-brand-ink">{t("complex.about.tagline")}</p>
            </>
          ) : null}
        </div>
      </ClinicSection>

      <ClinicSection
        id="directions"
        badge={slug === "complex" ? t("sections.keyAreas") : t("sections.directions")}
        title={
          slug === "complex" ? t("complex.headings.directions") : t("sections.directions")
        }
      >
        <ClinicInfoGrid
          items={mapInfoItems(t, `${slug}.directions`, facilityDirectionIds[slug])}
        />
      </ClinicSection>

      <ClinicSection
        id="services"
        badge={slug === "complex" ? t("sections.care") : t("sections.services")}
        title={slug === "complex" ? t("complex.headings.care") : t("sections.services")}
        description={slug === "complex" ? t("complex.services.intro") : undefined}
      >
        <ClinicInfoGrid
          items={mapInfoItems(t, `${slug}.services`, facilityServiceIds[slug])}
        />
      </ClinicSection>

      <ClinicSection
        id="practice"
        badge={
          slug === "simulation"
            ? t("sections.skills")
            : slug === "complex"
              ? t("sections.environment")
              : t("sections.practice")
        }
        title={
          slug === "simulation"
            ? t("sections.skills")
            : slug === "complex"
              ? t("complex.headings.environment")
              : t("sections.practice")
        }
        description={slug === "complex" ? t("complex.practice.intro") : undefined}
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
        badge={slug === "complex" ? t("sections.technology") : t("sections.equipment")}
        title={
          slug === "complex" ? t("complex.headings.technology") : t("sections.equipment")
        }
        description={slug === "complex" ? t("complex.equipment.intro") : undefined}
      >
        <ClinicInfoGrid
          items={mapInfoItems(t, `${slug}.equipment`, facilityEquipmentIds[slug])}
        />
      </ClinicSection>

      {slug === "complex" ? (
        <>
          <ClinicSection
            id="leadership"
            badge={t("sections.leadership")}
            title={t("complex.headings.leadership")}
          >
            <ClinicInfoGrid
              items={mapInfoItems(t, "complex.leadership", [
                "chief",
                "inpatient",
                "outpatient",
              ])}
            />
          </ClinicSection>
          <ClinicSection
            id="website"
            badge={t("sections.website")}
            title={t("complex.website.title")}
          >
            <p className="max-w-3xl text-base leading-7 text-[#6f6f6f]">
              {t("complex.website.note")}
            </p>
            <span className="mt-6 inline-flex h-12 cursor-not-allowed items-center rounded-full bg-brand-ink/40 px-6 text-sm font-medium text-white">
              {t("complex.website.button")}
            </span>
          </ClinicSection>
        </>
      ) : null}

      <ClinicSection
        id="specialists"
        badge={t("sections.specialists")}
        title={t("sections.specialists")}
      >
        <TeamPeopleGrid people={team.specialists} featuredFirst />
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
