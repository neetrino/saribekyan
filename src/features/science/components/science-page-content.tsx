import { getTranslations } from "next-intl/server";

import {
  contactIds,
  documentYears,
  eventIds,
  projectMeta,
  publicationMeta,
  reportMeta,
  researchDirectionIds,
  scienceSectionIds,
  ugsFocusIds,
} from "../content/meta";
import { ContentSection } from "./content-section";
import { DocumentYearFilter } from "./document-year-filter";
import { EventList } from "./event-list";
import { ProjectCards } from "./project-cards";
import { ScienceInfoGrid } from "./science-info-grid";
import { SciencePageShell } from "./science-page-shell";
import { SciencePeopleGrid } from "./science-people-grid";

export async function SciencePageContent() {
  const t = await getTranslations("science");

  const sectionNav = scienceSectionIds.map((id) => ({
    id,
    label: t(`nav.${id}`),
  }));

  const research = researchDirectionIds.map((id) => ({
    id,
    title: t(`research.items.${id}.title`),
    description: t(`research.items.${id}.description`),
  }));

  const projects = projectMeta.map((project) => ({
    id: project.id,
    status: project.status,
    title: t(`projects.items.${project.id}.title`),
    description: t(`projects.items.${project.id}.description`),
    period: t(`projects.items.${project.id}.period`),
  }));

  const publications = publicationMeta.map((item) => ({
    id: item.id,
    year: item.year,
    href: item.href,
    title: t(`publications.items.${item.id}.title`),
    type: t(`publications.items.${item.id}.type`),
  }));

  const events = eventIds.map((id) => ({
    id,
    title: t(`events.items.${id}.title`),
    description: t(`events.items.${id}.description`),
    date: t(`events.items.${id}.date`),
    venue: t(`events.items.${id}.venue`),
  }));

  const ugsFocus = ugsFocusIds.map((id) => ({
    id,
    title: t(`ugs.focus.${id}.title`),
    description: t(`ugs.focus.${id}.description`),
  }));

  const reports = reportMeta.map((item) => ({
    id: item.id,
    year: item.year,
    href: item.href,
    title: t(`reports.items.${item.id}.title`),
    type: t(`reports.items.${item.id}.type`),
  }));

  const contacts = contactIds.map((id) => ({
    id,
    name: t(`contacts.people.${id}.name`),
    role: t(`contacts.people.${id}.role`),
    bio: t(`contacts.people.${id}.bio`),
    email: t(`contacts.people.${id}.email`),
    phone: t(`contacts.people.${id}.phone`),
  }));

  return (
    <SciencePageShell
      badge={t("hero.badge")}
      title={t("hero.title")}
      highlight={t("hero.highlight")}
      description={t("hero.description")}
      sectionNav={sectionNav}
    >
      <ContentSection
        id="overview"
        badge={t("overview.badge")}
        title={t("overview.title")}
        description={t("overview.description")}
      >
        <div className="max-w-3xl space-y-4 text-base leading-7 text-[#6f6f6f]">
          <p>{t("overview.p1")}</p>
          <p>{t("overview.p2")}</p>
        </div>
      </ContentSection>

      <ContentSection
        id="research"
        badge={t("research.badge")}
        title={t("research.title")}
        description={t("research.description")}
      >
        <ScienceInfoGrid items={research} />
      </ContentSection>

      <ContentSection
        id="projects"
        badge={t("projects.badge")}
        title={t("projects.title")}
        description={t("projects.description")}
      >
        <ProjectCards
          projects={projects}
          labels={{
            all: t("projects.filters.all"),
            current: t("projects.filters.current"),
            completed: t("projects.filters.completed"),
            empty: t("projects.empty"),
          }}
        />
      </ContentSection>

      <ContentSection
        id="publications"
        badge={t("publications.badge")}
        title={t("publications.title")}
        description={t("publications.description")}
      >
        <DocumentYearFilter
          documents={publications}
          years={[...documentYears]}
          allLabel={t("filters.all")}
          emptyLabel={t("publications.empty")}
        />
      </ContentSection>

      <ContentSection
        id="events"
        badge={t("events.badge")}
        title={t("events.title")}
        description={t("events.description")}
      >
        <EventList events={events} />
      </ContentSection>

      <ContentSection
        id="ugs"
        badge={t("ugs.badge")}
        title={t("ugs.title")}
        description={t("ugs.description")}
      >
        <div className="mb-8 max-w-3xl space-y-4 text-base leading-7 text-[#6f6f6f]">
          <p>{t("ugs.p1")}</p>
        </div>
        <ScienceInfoGrid items={ugsFocus} />
      </ContentSection>

      <ContentSection
        id="reports"
        badge={t("reports.badge")}
        title={t("reports.title")}
        description={t("reports.description")}
      >
        <DocumentYearFilter
          documents={reports}
          years={[...documentYears]}
          allLabel={t("filters.all")}
          emptyLabel={t("reports.empty")}
        />
      </ContentSection>

      <ContentSection
        id="contacts"
        badge={t("contacts.badge")}
        title={t("contacts.title")}
        description={t("contacts.description")}
      >
        <SciencePeopleGrid people={contacts} featuredFirst />
      </ContentSection>
    </SciencePageShell>
  );
}
