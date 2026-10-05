import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/cn";

type CtaButtonProps = {
  href: string;
  children: string;
  variant?: "light" | "dark";
  className?: string;
};

/**
 * Figma Button 198:626 — pill 56px, pl-28 pr-4, icon 48.
 * Hover fills the pill from the arrow disc.
 */
export function CtaButton({
  href,
  children,
  variant = "dark",
  className,
}: CtaButtonProps) {
  const isLight = variant === "light";

  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex h-14 items-center gap-[27px] overflow-hidden rounded-full py-1 pl-7 pr-1 text-base font-medium leading-4",
        isLight ? "bg-white text-brand-ink" : "bg-brand-ink text-white",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute top-1 right-1 size-12 origin-center rounded-full transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[14]",
          isLight ? "bg-brand-ink" : "bg-white",
        )}
      />
      <span
        className={cn(
          "relative z-10 whitespace-nowrap transition-colors duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isLight ? "group-hover:text-white" : "group-hover:text-brand-ink",
        )}
      >
        {children}
      </span>
      <span className="relative z-10 grid size-12 shrink-0 place-items-center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden
          className={cn(
            "transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-0.5",
            isLight ? "text-white" : "text-brand-ink",
          )}
        >
          <path
            d="M4 10h12M12 6l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
