import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import type { HubCard } from "../content/types";

type HubCardsProps = {
  cards: HubCard[];
};

export async function HubCards({ cards }: HubCardsProps) {
  const t = await getTranslations("about");

  return (
    <ul className="grid gap-5 lg:grid-cols-3">
      {cards.map((card) => (
        <li key={card.id}>
          <Link
            href={card.href}
            className="group flex h-full min-h-[280px] flex-col justify-between rounded-3xl bg-gradient-to-b from-brand-ink to-brand-teal p-7 text-white shadow-md transition-transform hover:-translate-y-1"
          >
            <div>
              <p className="font-jakarta text-base font-extrabold text-brand-mint">
                {card.number}
              </p>
              <h2 className="mt-4 text-2xl font-semibold leading-8">
                {card.title}
              </h2>
              <p className="mt-3 text-base leading-6 text-white/85">
                {card.description}
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <span className="text-sm font-medium text-brand-lime">
                {t("viewSection")}
              </span>
              <span className="inline-flex size-14 items-center justify-center rounded-full bg-white transition-transform group-hover:scale-105">
                <span className="relative size-4 rotate-45">
                  <Image
                    src="/icons/arrow-up-right-dark.svg"
                    alt=""
                    fill
                    className="object-contain"
                    sizes="16px"
                  />
                </span>
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
