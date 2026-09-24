import { cn } from "@/shared/lib/cn";

type ChevronDownIconProps = {
  className?: string;
};

/** Chevron that inherits the surrounding text color. */
export function ChevronDownIcon({ className }: ChevronDownIconProps) {
  return (
    <svg
      className={cn("size-3.5 shrink-0", className)}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 5.25L7 8.75L10.5 5.25"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
