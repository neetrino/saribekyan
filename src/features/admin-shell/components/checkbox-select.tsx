"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { cn } from "@/shared/lib/cn";

import { adminInputClass } from "./admin-field-styles";

export type CheckboxOption = {
  value: string;
  label: string;
  /** Optional heading shown above options that share it. */
  group?: string;
};

type CheckboxSelectProps = {
  options: readonly CheckboxOption[];
  selected: readonly string[];
  placeholder: string;
  onToggle: (value: string, checked: boolean) => void;
};

/** Select-like dropdown where every option has a checkbox, allowing multiple values. */
export function CheckboxSelect({ options, selected, placeholder, onToggle }: CheckboxSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const summary = options.filter((option) => selected.includes(option.value)).map((option) => option.label).join(", ");

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Escape closes only the dropdown, not the surrounding drawer.
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && open) {
      event.stopPropagation();
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="relative mt-1" onKeyDown={onKeyDown}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={cn(adminInputClass, "flex items-center justify-between gap-2 text-left")}
      >
        <span className={cn("truncate", !summary && "text-[#6f6f6f]")}>{summary || placeholder}</span>
        <span aria-hidden="true" className={cn("shrink-0 text-[10px] transition-transform", open && "rotate-180")}>▼</span>
      </button>
      {open ? (
        <ul className="absolute inset-x-0 top-full z-20 mt-1 max-h-72 overflow-y-auto rounded-xl bg-white py-1 shadow-xl ring-1 ring-black/10">
          {options.map((option, index) => (
            <li key={option.value}>
              {option.group && option.group !== options[index - 1]?.group ? (
                <p className="px-3 pb-1 pt-2 text-xs font-semibold text-[#6f6f6f]">{option.group}</p>
              ) : null}
              <label className="flex cursor-pointer items-center gap-3 px-3 py-2 text-sm text-brand-ink hover:bg-[#f5f5f5]">
                <input
                  type="checkbox"
                  checked={selected.includes(option.value)}
                  onChange={(e) => onToggle(option.value, e.target.checked)}
                  className="size-4 shrink-0 accent-brand-teal"
                />
                {option.label}
              </label>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
