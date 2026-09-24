import { Link } from "@/i18n/navigation";

import { ArrowLink } from "@/shared/ui/arrow-link";

import type { StructureUnit } from "../content/types";

type StructureUnitCardsProps = {
  units: StructureUnit[];
};

export function StructureUnitCards({ units }: StructureUnitCardsProps) {
  return (
    <ul className="grid gap-4 lg:grid-cols-3">
      {units.map((unit) => (
        <li key={unit.id}>
          <article className="flex h-full flex-col rounded-3xl bg-[#f5f5f5] p-6">
            <h3 className="text-lg font-semibold leading-7 text-brand-ink">
              {unit.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-6 text-[#6f6f6f]">
              {unit.description}
            </p>
            <div className="mt-6 flex items-center justify-between gap-3">
              <Link
                href={unit.href}
                className="text-sm font-medium text-brand-teal hover:underline"
              >
                Մանրամասն
              </Link>
              <ArrowLink href={unit.href} label={unit.title} variant="dark" />
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
