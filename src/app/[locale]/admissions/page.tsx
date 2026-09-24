import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import {
  AdmissionsCta,
  AdmissionsPageShell,
  HubCards,
  admissionsHubCardMeta,
  type HubCard,
} from "@/features/admissions";

type AdmissionsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: AdmissionsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admissions.hub" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function AdmissionsPage({ params }: AdmissionsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("admissions");

  const cards: HubCard[] = admissionsHubCardMeta.map((card) => ({
    id: card.id,
    number: card.number,
    href: card.href,
    title: t(`cards.${card.id}.title`),
    description: t(`cards.${card.id}.description`),
  }));

  return (
    <AdmissionsPageShell
      badge={t("hub.badge")}
      title={t("hub.title")}
      highlight={t("hub.highlight")}
      description={t("hub.description")}
    >
      <HubCards cards={cards} />
      <div className="mt-14">
        <AdmissionsCta />
      </div>
    </AdmissionsPageShell>
  );
}
