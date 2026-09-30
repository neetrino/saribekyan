"use client";

import { useMemo, useState } from "react";

import { cn } from "@/shared/lib/cn";

import type { PublicDocument } from "../types";
import { DocumentList } from "./document-list";

type DocumentYearFilterProps = {
  documents: PublicDocument[];
  allLabel: string;
  emptyLabel: string;
};

const chipClass = "inline-flex h-10 items-center rounded-full px-4 text-sm transition-colors";
const activeChipClass = "bg-brand-ink font-semibold text-white";
const idleChipClass = "bg-[#ededed] text-[#6f6f6f] hover:text-brand-ink";

/** Year chips are derived from the documents, so a newly used year appears automatically. */
export function DocumentYearFilter({ documents, allLabel, emptyLabel }: DocumentYearFilterProps) {
  const years = useMemo(
    () => [...new Set(documents.map((document) => document.year))].sort((a, b) => b - a),
    [documents],
  );
  const [activeYear, setActiveYear] = useState<number | "all">("all");

  const filtered =
    activeYear === "all" ? documents : documents.filter((document) => document.year === activeYear);

  return (
    <div>
      {years.length > 0 ? (
        <div className="mb-6 flex flex-wrap gap-2">
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
              key={year}
              onClick={() => setActiveYear(year)}
              className={cn(chipClass, activeYear === year ? activeChipClass : idleChipClass)}
            >
              {year}
            </button>
          ))}
        </div>
      ) : null}
      <DocumentList documents={filtered} emptyLabel={emptyLabel} />
    </div>
  );
}
