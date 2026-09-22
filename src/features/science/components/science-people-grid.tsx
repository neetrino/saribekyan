import type { SciencePerson } from "../content/types";

type SciencePeopleGridProps = {
  people: SciencePerson[];
  featuredFirst?: boolean;
};

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function SciencePeopleGrid({
  people,
  featuredFirst = false,
}: SciencePeopleGridProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {people.map((person, index) => {
        const featured = featuredFirst && index === 0;

        return (
          <li key={person.id}>
            <article
              className={
                featured
                  ? "flex h-full flex-col rounded-3xl bg-gradient-to-b from-brand-ink to-brand-teal p-7 text-white shadow-md"
                  : "flex h-full flex-col rounded-3xl bg-[#f5f5f5] p-7 text-brand-ink"
              }
            >
              <div
                className={
                  featured
                    ? "flex size-20 items-center justify-center rounded-2xl bg-white/15 font-jakarta text-xl font-extrabold"
                    : "flex size-20 items-center justify-center rounded-2xl bg-brand-ink font-jakarta text-xl font-extrabold text-white"
                }
                aria-hidden="true"
              >
                {initials(person.name)}
              </div>
              <h3 className="mt-5 text-xl font-semibold leading-7">
                {person.name}
              </h3>
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
          </li>
        );
      })}
    </ul>
  );
}
