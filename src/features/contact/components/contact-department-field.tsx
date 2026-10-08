"use client";

import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/shared/lib/cn";
import { ChevronDownIcon } from "@/shared/ui/chevron-down-icon";

import type { ContactFormDepartment } from "../content/meta";

type DepartmentOption = {
  value: ContactFormDepartment;
  label: string;
};

type ContactDepartmentFieldProps = {
  label: string;
  options: DepartmentOption[];
  defaultValue: ContactFormDepartment;
  error?: string;
  invalidClassName: string;
};

export function ContactDepartmentField({
  label,
  options,
  defaultValue,
  error,
  invalidClassName,
}: ContactDepartmentFieldProps) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  return (
    <div ref={rootRef} className="relative block text-sm font-medium text-brand-ink">
      <span>{label}</span>
      <input type="hidden" name="department" value={value} />
      <button
        type="button"
        className={cn(
          "mt-2 flex w-full items-center justify-between rounded-2xl border border-[#e0e0e0] bg-white px-4 py-3 text-left text-sm font-normal text-brand-ink outline-none transition-colors focus:border-brand-teal",
          error && invalidClassName,
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
          }
        }}
      >
        {selected?.label}
        <ChevronDownIcon className={cn("transition-transform", open && "rotate-180")} />
      </button>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white py-1 shadow-lg"
        >
          {options.map((option) => {
            const active = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={active}>
                <button
                  type="button"
                  className={cn(
                    "flex w-full px-4 py-2.5 text-left text-sm font-normal text-brand-ink hover:bg-brand-ink/5",
                    active && "bg-brand-ink/5 font-medium",
                  )}
                  onClick={() => {
                    setValue(option.value);
                    setOpen(false);
                  }}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
      {error ? <span className="mt-1 block text-xs font-normal text-red-600">{error}</span> : null}
    </div>
  );
}
