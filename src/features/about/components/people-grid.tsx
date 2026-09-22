import type { AboutPerson } from "../content/types";

import { PersonCard } from "./person-card";

type PeopleGridProps = {
  people: AboutPerson[];
  featuredFirst?: boolean;
};

export function PeopleGrid({ people, featuredFirst = false }: PeopleGridProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {people.map((person, index) => (
        <li key={person.id}>
          <PersonCard person={person} featured={featuredFirst && index === 0} />
        </li>
      ))}
    </ul>
  );
}
