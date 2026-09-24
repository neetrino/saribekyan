"use client";

import { useMemo, useState } from "react";

import { cn } from "@/shared/lib/cn";

import type { AboutDocument } from "../content/types";
import { DocumentList } from "./document-list";

type DocumentYearFilterProps = {
  documents: AboutDocument[];
  years?: number[];
};

export function DocumentYearFilter({
  documents,
  years,
}: DocumentYearFilterProps) {
  const availableYears = useMemo(() => {
    if (years && years.length > 0) {
      return years;
    }

    return [...new Set(documents.map((document) => document.year))].sort(
      (a, b) => b - a,
    );
  }, [documents, years]);

  const [activeYear, setActiveYear] = useState<number | "all">("all");

  const filtered =
    activeYear === "all"
      ? documents
      : documents.filter((document) => document.year === activeYear);

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
          Բոլորը
        </button>
        {availableYears.map((year) => (
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
      <DocumentList documents={filtered} />
    </div>
  );
}
