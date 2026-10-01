import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { FooterLinkKey } from "@/shared/config/site";

import { ComingSoonPage } from "./coming-soon-page";

type FooterComingSoonPageProps = {
  locale: string;
  labelKey: FooterLinkKey;
};

/** Placeholder for footer links whose full page is not implemented yet. */
export async function FooterComingSoonPage({
  locale,
  labelKey,
}: FooterComingSoonPageProps) {
  setRequestLocale(locale);
  const t = await getTranslations("common.footer");
  return <ComingSoonPage title={t(labelKey)} />;
}

export async function footerComingSoonMetadata(
  locale: string,
  labelKey: FooterLinkKey,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "common.footer" });
  return { title: t(labelKey) };
}
