"use client";

import { useMemo, useState } from "react";

import { cn } from "@/shared/lib/cn";

import type { ScienceDocument } from "../content/types";
import { DocumentList } from "./document-list";

type DocumentYearFilterProps = {
  documents: ScienceDocument[];
  years: number[];
  allLabel: string;
  emptyLabel: string;
};

export function DocumentYearFilter({
  documents,
  years,
  allLabel,
  emptyLabel,
}: DocumentYearFilterProps) {
  const [activeYear, setActiveYear] = useState<number | "all">("all");

  const filtered = useMemo(() => {
    if (activeYear === "all") {
      return documents;
    }

    return documents.filter((document) => document.year === activeYear);
  }, [activeYear, documents]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveYear("all")}
          className={cn(
            "inline-flex h-10 items-center rounded-full px-4 text-sm transition-colors",
            activeYear === "all"
              ? "bg-brand-ink font-semibold text-white"
              : "bg-[#ededed] text-[#6f6f6f] hover:text-brand-ink",
          )}
        >
          {allLabel}
        </button>
        {years.map((year) => (
          <button
            type="button"
            key={year}
            onClick={() => setActiveYear(year)}
            className={cn(
              "inline-flex h-10 items-center rounded-full px-4 text-sm transition-colors",
              activeYear === year
                ? "bg-brand-ink font-semibold text-white"
                : "bg-[#ededed] text-[#6f6f6f] hover:text-brand-ink",
            )}
          >
            {year}
          </button>
        ))}
      </div>
      <DocumentList documents={filtered} emptyLabel={emptyLabel} />
    </div>
  );
}
