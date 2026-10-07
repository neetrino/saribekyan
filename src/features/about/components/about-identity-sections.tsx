import {
  academicCouncilCopy,
  fundamentalPrinciples,
  historyItems,
  leadershipRoster,
  mainActivities,
  missionStatement,
  rectorateCopy,
  universityValues,
  visionDirections,
} from "../content/who-we-are";
import type { TeamPerson } from "@/features/team/types";

import { ContentSection } from "./content-section";
import { HistoryTimeline } from "./history-timeline";
import { InfoGrid } from "./info-grid";
import { TeamPeopleGrid } from "@/features/team";

type AboutIdentityTeam = {
  governance: TeamPerson[];
  "academic-council": TeamPerson[];
  rectorate: TeamPerson[];
  leadership: TeamPerson[];
};

type AboutIdentitySectionsProps = {
  team: AboutIdentityTeam;
};

export function AboutIdentitySections({ team }: AboutIdentitySectionsProps) {
  return (
    <>
      <ContentSection
        id="history"
        badge="Պատմություն"
        title="Համալսարանի պատմական ուղին"
        description="Հիմնադրումից մինչև ինստիտուցիոնալ հավատարմագրում՝ հիմնական փուլերը։"
      >
        <HistoryTimeline items={historyItems} />
      </ContentSection>

      <ContentSection
        id="mission"
        badge="Առաքելություն և տեսլական"
        title="Մեր նպատակը և ուղղությունը"
      >
        <article className="rounded-3xl bg-gradient-to-b from-brand-ink to-brand-teal p-7 text-white shadow-md lg:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-lime">
            {missionStatement.title}
          </p>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-white/90">
            {missionStatement.text}
          </p>
        </article>
        <div className="mt-4">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
            Համալսարանի տեսլականը
          </p>
          <InfoGrid items={visionDirections} />
        </div>
      </ContentSection>

      <ContentSection id="values" badge="Արժեքներ" title="Մնայուն արժեքներ">
        <InfoGrid items={universityValues} />
      </ContentSection>

      <ContentSection
        id="principles"
        badge="Սկզբունքներ"
        title="Հիմնարար սկզբունքներ"
      >
        <InfoGrid items={fundamentalPrinciples} />
      </ContentSection>

      <ContentSection
        id="activities"
        badge="Գործունեություն"
        title="Համալսարանի հիմնական գործունեությունը"
      >
        <InfoGrid items={mainActivities} />
      </ContentSection>

      <ContentSection
        id="governance"
        badge="Կառավարման խորհուրդ"
        title="Կառավարման խորհուրդ"
        description="Ռազմավարական որոշումներ և ինստիտուցիոնալ վերահսկողություն։"
      >
        <TeamPeopleGrid people={team.governance} featuredFirst />
      </ContentSection>

      <ContentSection
        id="academic-council"
        badge="Ակադեմիական խորհուրդ"
        title="Ակադեմիական խորհուրդ"
        description={academicCouncilCopy.description}
      >
        <h3 className="mb-6 text-lg font-semibold text-brand-ink">
          Ակադեմիական խորհրդի կազմը
        </h3>
        <TeamPeopleGrid people={team["academic-council"]} />
      </ContentSection>

      <ContentSection
        id="rectorate"
        badge="Ռեկտորատ"
        title="Ռեկտորատ"
        description={rectorateCopy.description}
      >
        <TeamPeopleGrid people={team.rectorate} featuredFirst />
      </ContentSection>

      <ContentSection
        id="leadership"
        badge="Ղեկավար կազմ"
        title="Ղեկավար կազմի և պատասխանատու անձանց տվյալներ"
      >
        <InfoGrid items={leadershipRoster} />
        {team.leadership.length > 0 ? (
          <div className="mt-8">
            <TeamPeopleGrid people={team.leadership} />
          </div>
        ) : null}
      </ContentSection>
    </>
  );
}
