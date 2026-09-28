import Image from "next/image";
import type { NewsPost } from "@prisma/client";
import { getLocale, getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { ArrowLink } from "@/shared/ui/arrow-link";
import { SectionBadge } from "@/shared/ui/section-badge";
import { cn } from "@/shared/lib/cn";

type NewsSectionProps = {
  featured: NewsPost | null;
  items: NewsPost[];
};

const desktopCardStyles = [
  "",
  "lg:bg-none lg:bg-[#212121]",
  "lg:bg-none lg:bg-[#ededed] lg:text-[#212121]",
] as const;

function formatDate(value: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale === "hy" ? "hy-AM" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(value);
}

/** Figma News — mobile 198:320 */
export async function NewsSection({ featured, items }: NewsSectionProps) {
  const t = await getTranslations("home.news");
  const locale = await getLocale();

  return (
    <section className="bg-white px-5 py-10 sm:px-10 lg:px-[3.9rem] lg:py-20">
      <div className="mx-auto grid max-w-[1314px] gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-10">
        <div>
          <div className="flex items-center justify-between gap-4 lg:justify-start">
            <SectionBadge>{t("badge")}</SectionBadge>
            <ArrowLink href="/news" label={t("readMore")} className="lg:hidden" />
          </div>
          <h2 className="mt-1.5 text-[32px] font-normal leading-[48px] tracking-[-0.5px] text-slate-900 lg:mt-6 lg:text-[clamp(2.25rem,5vw,3.75rem)] lg:leading-[1.12] lg:tracking-[-1.5px]">
            <span className="font-normal lg:font-light">{t("titleBefore")}</span>{" "}
            <span className="font-semibold">{t("titleAccent")}</span>
          </h2>

          {featured ? (
            <Link
              href={`/news/${featured.slug}`}
              className="mt-6 block overflow-hidden rounded-[24px] bg-[#171717] lg:mt-8 lg:rounded-3xl lg:bg-neutral-900"
            >
              <div className="relative mx-3.5 mt-5 aspect-[336/231] overflow-hidden rounded-[20px] lg:m-4 lg:aspect-[482/331]">
                <Image
                  src={featured.coverImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="space-y-1.5 px-3.5 pb-7 pt-7 text-white lg:space-y-2 lg:px-6 lg:pb-8 lg:pt-2">
                <p className="hidden text-xs text-white/70 lg:block">
                  {formatDate(featured.publishedAt, locale)}
                </p>
                <p className="text-base font-bold uppercase leading-4">
                  {featured.category}
                </p>
                <p className="max-w-[335px] text-sm font-light leading-[18px]">
                  {featured.excerpt}
                </p>
                <span className="hidden pt-2 text-sm font-medium underline-offset-4 hover:underline lg:inline-block">
                  {t("readMore")}
                </span>
              </div>
            </Link>
          ) : null}
        </div>

        <div className="flex flex-col gap-5 lg:justify-center lg:pt-24">
          {items.map((item, index) => {
            const darkIcon = index === 2;

            return (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className={cn(
                  "relative flex min-h-[179px] items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-ink to-brand-teal p-2 pr-12 text-white lg:gap-5 lg:pr-14",
                  desktopCardStyles[index] ?? desktopCardStyles[0],
                )}
              >
                <div className="relative h-[164px] w-[172px] shrink-0 overflow-hidden rounded-[10px]">
                  <Image
                    src={item.coverImage}
                    alt=""
                    fill
                    className="object-cover object-bottom"
                    sizes="172px"
                  />
                </div>
                <div className="min-w-0 flex-1 space-y-2.5 py-3 pr-2 lg:py-6 lg:pr-4">
                  <p className="hidden text-xs opacity-70 lg:block">
                    {formatDate(item.publishedAt, locale)}
                  </p>
                  <p className="text-sm font-bold uppercase leading-4 lg:text-base lg:leading-4">
                    {item.category}
                  </p>
                  <p className="max-w-[165px] text-xs font-light leading-[15px] lg:max-w-[341px] lg:text-sm lg:leading-4">
                    {item.excerpt}
                  </p>
                  <span className="hidden pt-1 text-xs font-medium lg:inline-block">
                    {t("readMore")}
                  </span>
                </div>
                <span
                  className={cn(
                    "absolute bottom-2 right-2 inline-flex size-9 items-center justify-center rounded-full bg-white lg:bottom-auto lg:right-5 lg:top-5",
                    darkIcon && "lg:bg-[#212121]",
                  )}
                >
                  <span className="relative size-4 rotate-45">
                    <Image
                      src="/icons/arrow-up-right-dark.svg"
                      alt=""
                      fill
                      sizes="16px"
                      className={cn(darkIcon && "lg:hidden")}
                    />
                    {darkIcon ? (
                      <Image
                        src="/icons/arrow-up-right.svg"
                        alt=""
                        fill
                        sizes="16px"
                        className="hidden lg:block"
                      />
                    ) : null}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
