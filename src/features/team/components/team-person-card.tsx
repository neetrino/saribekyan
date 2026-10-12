import type { TeamPerson } from "../types";

import { TeamAvatar } from "./team-avatar";

type TeamPersonCardProps = {
  person: TeamPerson;
  featured?: boolean;
};

function PersonContacts({ person, featured }: { person: TeamPerson; featured: boolean }) {
  if (!person.email && !person.phone) {
    return null;
  }

  return (
    <div className="mt-auto space-y-1 pt-5 text-sm">
      {person.email ? (
        <a
          href={`mailto:${person.email}`}
          className={
            featured
              ? "block text-brand-mint transition-opacity hover:opacity-80"
              : "block text-brand-teal transition-opacity hover:opacity-80"
          }
        >
          {person.email}
        </a>
      ) : null}
      {person.phone ? (
        <a
          href={`tel:${person.phone.replace(/\s/g, "")}`}
          className={
            featured
              ? "block text-white/80 transition-opacity hover:opacity-80"
              : "block text-[#6f6f6f] transition-opacity hover:opacity-80"
          }
        >
          {person.phone}
        </a>
      ) : null}
    </div>
  );
}

export function TeamPersonCard({ person, featured = false }: TeamPersonCardProps) {
  if (featured) {
    return (
      <article className="flex h-full flex-col rounded-3xl bg-gradient-to-b from-brand-ink to-brand-teal p-7 text-white shadow-md">
        <div className="flex items-center gap-6">
          <TeamAvatar
            name={person.name}
            imageUrl={person.imageUrl}
            sizes="128px"
            className="size-32 shrink-0 rounded-2xl bg-white/15 text-2xl"
          />
          <div className="min-w-0">
            <h3 className="text-xl font-semibold leading-7">{person.name}</h3>
            <p className="mt-2 text-sm leading-5 text-white/80">{person.role}</p>
          </div>
        </div>
        {person.bio ? <p className="mt-5 text-sm leading-6 text-white/85">{person.bio}</p> : null}
        <PersonContacts person={person} featured />
      </article>
    );
  }

  return (
    <article className="flex h-full flex-col rounded-3xl bg-[#f5f5f5] p-7 text-brand-ink">
      <TeamAvatar
        name={person.name}
        imageUrl={person.imageUrl}
        className="size-20 rounded-2xl bg-brand-ink text-xl text-white"
      />
      <h3 className="mt-5 text-xl font-semibold leading-7">{person.name}</h3>
      <p className="mt-2 text-sm leading-5 text-[#6f6f6f]">{person.role}</p>
      {person.bio ? <p className="mt-4 text-sm leading-6 text-[#6f6f6f]">{person.bio}</p> : null}
      <PersonContacts person={person} featured={false} />
    </article>
  );
}
