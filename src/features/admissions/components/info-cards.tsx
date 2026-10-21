import { cn } from "@/shared/lib/cn";

import type { InfoCard } from "../content/types";

type InfoCardsProps = {
  items: InfoCard[];
  columns?: 2 | 3;
};

export function InfoCards({ items, columns = 2 }: InfoCardsProps) {
  return (
    <ul
      className={cn(
        "grid gap-4 sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
      )}
    >
      {items.map((item) => (
        <li
          key={item.id}
          className="rounded-3xl border border-[#e8e8e8] bg-white p-6"
        >
          <div className="mb-4 h-1.5 w-10 rounded-full bg-brand-gold" />
          <h3 className="text-lg font-semibold text-brand-ink">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-[#6f6f6f]">
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
