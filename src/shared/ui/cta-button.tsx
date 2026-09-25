import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/cn";

type CtaButtonProps = {
  href: string;
  children: string;
  variant?: "light" | "dark";
  className?: string;
};

/**
 * Figma Button 198:626 — pill 56px, pl-28 pr-32, gap-27, icon 48.
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
        "inline-flex h-14 items-center gap-[27px] rounded-full py-1 pl-7 pr-1 text-base font-medium leading-4 transition-opacity hover:opacity-90",
        isLight ? "bg-white text-brand-ink" : "bg-brand-ink text-white",
        className,
      )}
    >
      <span className="whitespace-nowrap">{children}</span>
      <span className="relative size-12 shrink-0">
        <Image
          src={
            isLight
              ? "/icons/arrow-circle-dark.svg"
              : "/icons/arrow-circle-light.svg"
          }
          alt=""
          width={48}
          height={48}
          className="size-12"
        />
      </span>
    </Link>
  );
}
