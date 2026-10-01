import type { Metadata } from "next";

import {
  FooterComingSoonPage,
  footerComingSoonMetadata,
} from "@/shared/ui/footer-coming-soon-page";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return footerComingSoonMetadata(locale, "sitemap");
}

export default async function SitemapPage({ params }: PageProps) {
  const { locale } = await params;
  return <FooterComingSoonPage locale={locale} labelKey="sitemap" />;
}
