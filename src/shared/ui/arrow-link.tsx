import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/cn";

type ArrowLinkProps = {
  href: string;
  variant?: "light" | "dark" | "muted";
  className?: string;
  label: string;
};

export function ArrowLink({
  href,
  variant = "dark",
  className,
  label,
}: ArrowLinkProps) {
  const iconSrc =
    variant === "dark"
      ? "/icons/arrow-up-right.svg"
      : "/icons/arrow-up-right-dark.svg";

  const bg =
    variant === "dark"
      ? "bg-brand-ink"
      : variant === "muted"
        ? "bg-[#f2f2f2]"
        : "bg-white";

  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        "inline-flex size-14 items-center justify-center rounded-full transition-transform hover:scale-105",
        bg,
        className,
      )}
    >
      <span className="relative size-4 rotate-45">
        <Image src={iconSrc} alt="" fill className="object-contain" sizes="16px" />
      </span>
    </Link>
  );
}
