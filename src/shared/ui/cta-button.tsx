import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/cn";

type CtaButtonProps = {
  href: string;
  children: string;
  variant?: "light" | "dark";
  className?: string;
};

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
        "inline-flex h-14 items-center gap-4 rounded-full py-4 pl-7 pr-8 text-base font-medium transition-opacity hover:opacity-90",
        isLight ? "bg-white text-brand-ink" : "bg-brand-ink text-white",
        className,
      )}
    >
      <span>{children}</span>
      <span className="relative size-12 shrink-0 overflow-hidden">
        <Image
          src={
            isLight
              ? "/icons/arrow-circle-dark.svg"
              : "/icons/arrow-circle-light.svg"
          }
          alt=""
          fill
          className="object-contain"
          sizes="48px"
        />
      </span>
    </Link>
  );
}
