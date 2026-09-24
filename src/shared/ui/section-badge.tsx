import { cn } from "@/shared/lib/cn";

type SectionBadgeProps = {
  children: string;
  className?: string;
};

export function SectionBadge({ children, className }: SectionBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-slate-100 px-4 py-1.5 text-xs text-slate-700",
        className,
      )}
    >
      {children}
    </span>
  );
}
