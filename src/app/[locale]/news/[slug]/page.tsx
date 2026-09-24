import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { ComingSoonPage } from "@/shared/ui/coming-soon-page";

type NewsDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const metadata: Metadata = { title: "Նորություն" };

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  return (
    <ComingSoonPage
      title="Նորություն"
      description={`«${slug}» հրապարակման էջը պատրաստման փուլում է։`}
    />
  );
}
