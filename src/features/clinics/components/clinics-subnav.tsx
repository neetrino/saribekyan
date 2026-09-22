import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/cn";

type ClinicsSubnavItem = {
  label: string;
  href: string;
};

type ClinicsSubnavProps = {
  items: ClinicsSubnavItem[];
  ariaLabel: string;
  activeHref: string;
};

export function ClinicsSubnav({
  items,
  ariaLabel,
  activeHref,
}: ClinicsSubnavProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className="mb-12 overflow-x-auto rounded-[80px] bg-[#ededed] p-2 sm:p-3"
    >
      <ul className="flex min-w-max items-center gap-2">
        {items.map((item) => {
          const active = item.href === activeHref;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                prefetch
                className={cn(
                  "inline-flex h-11 items-center rounded-full px-5 text-sm transition-colors sm:text-base",
                  active
                    ? "bg-brand-ink font-bold text-white"
                    : "bg-white text-[#8f8f8f] hover:text-brand-ink",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
