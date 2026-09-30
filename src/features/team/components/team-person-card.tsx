import type { TeamPerson } from "../types";

import { TeamAvatar } from "./team-avatar";

type TeamPersonCardProps = {
  person: TeamPerson;
  featured?: boolean;
};

export function TeamPersonCard({ person, featured = false }: TeamPersonCardProps) {
  return (
    <article
      className={
        featured
          ? "flex h-full flex-col rounded-3xl bg-gradient-to-b from-brand-ink to-brand-teal p-7 text-white shadow-md"
          : "flex h-full flex-col rounded-3xl bg-[#f5f5f5] p-7 text-brand-ink"
      }
    >
      <TeamAvatar
        name={person.name}
        imageUrl={person.imageUrl}
        className={
          featured
            ? "size-20 rounded-2xl bg-white/15 text-xl"
            : "size-20 rounded-2xl bg-brand-ink text-xl text-white"
        }
      />
      <h3 className="mt-5 text-xl font-semibold leading-7">{person.name}</h3>
      <p
        className={
          featured
            ? "mt-2 text-sm leading-5 text-white/80"
            : "mt-2 text-sm leading-5 text-[#6f6f6f]"
        }
      >
        {person.role}
      </p>
      {person.bio ? (
        <p
          className={
            featured
              ? "mt-4 text-sm leading-6 text-white/85"
              : "mt-4 text-sm leading-6 text-[#6f6f6f]"
          }
        >
          {person.bio}
        </p>
      ) : null}
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
    </article>
  );
}
