"use client";

import { useState, type ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

import type { PublicationYear, PublicationYearId } from "../content/publication-types";

type PublicationCatalogProps = {
  years: PublicationYear[];
  yearLabels: Record<PublicationYearId, string>;
  groupLabels: Record<PublicationYear["groups"][number]["id"], string>;
  allLabel: string;
};

const chipClass = "inline-flex h-10 items-center rounded-full px-4 text-sm transition-colors";
const activeChipClass = "bg-brand-ink font-semibold text-white";
const idleChipClass = "bg-[#ededed] text-[#6f6f6f] hover:text-brand-ink";
const URL_PATTERN = /https?:\/\/[^\s]+/g;

function linkify(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(URL_PATTERN)) {
    const url = match[0].replace(/[),.;]+$/, "");
    const index = match.index ?? 0;
    if (index > lastIndex) {
      nodes.push(text.slice(lastIndex, index));
    }
    nodes.push(
      <a
        key={`${index}-${url}`}
        href={url}
        target="_blank"
        rel="noreferrer"
        className="break-all text-brand-teal underline underline-offset-2"
      >
        {url}
      </a>,
    );
    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export function PublicationCatalog({
  years,
  yearLabels,
  groupLabels,
  allLabel,
}: PublicationCatalogProps) {
  const [activeYear, setActiveYear] = useState<PublicationYearId | "all">("all");
  const visible = activeYear === "all" ? years : years.filter((year) => year.id === activeYear);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveYear("all")}
          className={cn(chipClass, activeYear === "all" ? activeChipClass : idleChipClass)}
        >
          {allLabel}
        </button>
        {years.map((year) => (
          <button
            type="button"
            key={year.id}
            onClick={() => setActiveYear(year.id)}
            className={cn(chipClass, activeYear === year.id ? activeChipClass : idleChipClass)}
          >
            {yearLabels[year.id]}
          </button>
        ))}
      </div>
      <div className="space-y-12">
        {visible.map((year) => (
          <section key={year.id}>
            <h3 className="text-xl font-medium text-brand-ink">{yearLabels[year.id]}</h3>
            <div className="mt-6 space-y-8">
              {year.groups.map((group) => (
                <div key={group.id}>
                  <h4 className="text-base font-semibold text-brand-ink">{groupLabels[group.id]}</h4>
                  <ul className="mt-3 list-disc space-y-3 pl-5 text-sm leading-6 text-[#424847]">
                    {group.items.map((item) => (
                      <li key={item}>{linkify(item)}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
