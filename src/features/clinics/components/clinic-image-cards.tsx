import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/cn";

export type ClinicImageCard = {
  id: string;
  number: string;
  href: string;
  imageUrl: string;
  title: string;
  description: string;
};

type ClinicImageCardsProps = {
  items: ClinicImageCard[];
  viewLabel: string;
};

function toIntlHref(href: string) {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) {
    return href;
  }

  return {
    pathname: href.slice(0, hashIndex),
    hash: href.slice(hashIndex + 1),
  };
}

export function ClinicImageCards({ items, viewLabel }: ClinicImageCardsProps) {
  return (
    <ul
      className={cn(
        "grid gap-5",
        items.length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3",
      )}
    >
      {items.map((card) => (
        <li key={card.id}>
          <Link
            href={toIntlHref(card.href)}
            className="group relative flex min-h-[380px] overflow-hidden rounded-3xl lg:min-h-[440px]"
          >
            <Image
              src={card.imageUrl}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            <div className="relative z-10 flex w-full flex-col justify-between p-[30px] text-white">
              <div className="space-y-4">
                <p className="font-jakarta text-base font-extrabold leading-6">
                  {card.number}
                </p>
                <h3 className="max-w-[18ch] text-[1.75rem] font-bold leading-9">
                  {card.title}
                </h3>
              </div>
              <div className="space-y-5">
                <div className="h-1.5 w-10 rounded-full bg-brand-gold" />
                <p className="text-base leading-6 text-white/95">
                  {card.description}
                </p>
                <span className="inline-flex text-sm font-medium text-brand-lime transition-opacity group-hover:opacity-90">
                  {viewLabel}
                </span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
