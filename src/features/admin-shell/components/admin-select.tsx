"use client";

import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/shared/lib/cn";
import { ChevronDownIcon } from "@/shared/ui/chevron-down-icon";

import { adminInputClass } from "./admin-field-styles";

export type AdminSelectOption = {
  value: string;
  label: string;
};

type AdminSelectProps = {
  name: string;
  value: string;
  options: readonly AdminSelectOption[];
  ariaLabel: string;
  disabled?: boolean;
  className?: string;
  onChange: (value: string) => void;
};

/** Custom dropdown that submits its value with the surrounding GET form. */
export function AdminSelect({ name, value, options, ariaLabel, disabled = false, className, onChange }: AdminSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative min-w-0", className ?? "flex-1")}>
      <input type="hidden" name={name} value={value} disabled={disabled} />
      <button
        type="button"
        disabled={disabled}
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
        className={cn(adminInputClass, "flex items-center justify-between gap-2 text-left disabled:cursor-not-allowed disabled:opacity-50")}
      >
        <span className="truncate">{selected?.label}</span>
        <ChevronDownIcon className={cn("transition-transform duration-300", open && "rotate-180")} />
      </button>
      <ul
        id={listId}
        role="listbox"
        aria-label={ariaLabel}
        className={cn(
          "absolute inset-x-0 top-full z-30 mt-1 max-h-72 origin-top overflow-y-auto rounded-xl bg-white py-1 shadow-xl ring-1 ring-black/10 transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]",
          open ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0",
        )}
      >
        {options.map((option) => {
          const active = option.value === value;
          return (
            <li key={option.value} role="option" aria-selected={active}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={cn(
                  "w-full truncate px-4 py-2 text-left text-sm text-brand-ink transition-colors hover:bg-[#f4f1ec]",
                  active && "bg-[#f4f1ec] font-semibold",
                )}
              >
                {option.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
