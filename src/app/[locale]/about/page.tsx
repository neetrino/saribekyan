import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import {
  AboutPageShell,
  HubCards,
  aboutHubCardMeta,
} from "@/features/about";
import type { HubCard } from "@/features/about/content/types";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.hub" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");

  const cards: HubCard[] = aboutHubCardMeta.map((card) => ({
    id: card.id,
    number: card.number,
    href: card.href,
    title: t(`cards.${card.id}.title`),
    description: t(`cards.${card.id}.description`),
  }));

  return (
    <AboutPageShell
      badge={t("hub.badge")}
      title={t("hub.title")}
      highlight={t("hub.highlight")}
      description={t("hub.description")}
    >
      <HubCards cards={cards} />
    </AboutPageShell>
  );
}
