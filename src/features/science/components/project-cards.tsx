"use client";

import { useMemo, useState } from "react";

import { cn } from "@/shared/lib/cn";

import type { ScienceProject } from "../content/types";

type ProjectFilter = "all" | "current" | "completed";

type ProjectCardsProps = {
  projects: ScienceProject[];
  labels: {
    all: string;
    current: string;
    completed: string;
    empty: string;
  };
};

export function ProjectCards({ projects, labels }: ProjectCardsProps) {
  const [filter, setFilter] = useState<ProjectFilter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") {
      return projects;
    }

    return projects.filter((project) => project.status === filter);
  }, [filter, projects]);

  const chips: Array<{ id: ProjectFilter; label: string }> = [
    { id: "all", label: labels.all },
    { id: "current", label: labels.current },
    { id: "completed", label: labels.completed },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {chips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() => setFilter(chip.id)}
            className={cn(
              "inline-flex h-10 items-center rounded-full px-4 text-sm transition-colors",
              filter === chip.id
                ? "bg-brand-ink font-semibold text-white"
                : "bg-[#ededed] text-[#6f6f6f] hover:text-brand-ink",
            )}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-base text-[#6f6f6f]">{labels.empty}</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {filtered.map((project) => (
            <li
              key={project.id}
              className="flex h-full flex-col rounded-3xl bg-[#f5f5f5] p-6"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "inline-flex h-8 items-center rounded-full px-3 text-xs font-semibold",
                    project.status === "current"
                      ? "bg-brand-ink text-white"
                      : "bg-white text-[#6f6f6f]",
                  )}
                >
                  {project.status === "current"
                    ? labels.current
                    : labels.completed}
                </span>
                <span className="text-sm text-[#8f8f8f]">{project.period}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-brand-ink">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#6f6f6f]">
                {project.description}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
