import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

type ComingSoonPageProps = {
  title: string;
  description?: string;
};

export async function ComingSoonPage({
  title,
  description,
}: ComingSoonPageProps) {
  const t = await getTranslations("common.comingSoon");

  return (
    <div className="relative min-h-dvh bg-gradient-to-b from-brand-ink to-brand-mint">
      <main className="mx-auto flex min-h-dvh max-w-3xl flex-col items-start justify-center px-6 py-32 text-white sm:px-10">
        <p className="rounded-full bg-white/10 px-4 py-1.5 text-xs">
          {t("badge")}
        </p>
        <h1 className="mt-4 text-[clamp(2rem,5vw,3rem)] font-semibold leading-tight">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-6 text-white/80">
          {description ?? t("defaultDescription")}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-white px-6 text-sm font-medium text-brand-ink transition-opacity hover:opacity-90"
        >
          {t("backHome")}
        </Link>
      </main>
    </div>
  );
}
