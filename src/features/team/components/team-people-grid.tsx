import type { TeamPerson } from "../types";

import { TeamPersonCard } from "./team-person-card";

type TeamPeopleGridProps = {
  people: TeamPerson[];
  featuredFirst?: boolean;
};

export function TeamPeopleGrid({ people, featuredFirst = false }: TeamPeopleGridProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {people.map((person, index) => (
        <li key={person.id}>
          <TeamPersonCard person={person} featured={featuredFirst && index === 0} />
        </li>
      ))}
    </ul>
  );
}
