import Image from "next/image";
import type { NewsPost } from "@prisma/client";
import { getLocale, getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { SectionBadge } from "@/shared/ui/section-badge";
import { cn } from "@/shared/lib/cn";

type NewsSectionProps = {
  featured: NewsPost | null;
  items: NewsPost[];
};

const cardStyles = [
  "bg-gradient-to-br from-brand-ink to-brand-teal text-white",
  "bg-[#212121] text-white",
  "bg-[#ededed] text-[#212121]",
] as const;

function formatDate(value: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale === "hy" ? "hy-AM" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(value);
}

export async function NewsSection({ featured, items }: NewsSectionProps) {
  const t = await getTranslations("home.news");
  const locale = await getLocale();

  return (
    <section className="bg-white px-6 py-16 sm:px-10 lg:px-[3.9rem] lg:py-20">
      <div className="mx-auto grid max-w-[1314px] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-10">
        <div>
          <SectionBadge>{t("badge")}</SectionBadge>
          <h2 className="mt-6 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.12] tracking-[-1.5px] text-slate-900">
            <span className="font-light">{t("titleBefore")}</span>{" "}
            <span className="font-semibold">{t("titleAccent")}</span>
          </h2>

          {featured ? (
            <Link
              href={`/news/${featured.slug}`}
              className="mt-8 block overflow-hidden rounded-3xl bg-neutral-900"
            >
              <div className="relative m-4 aspect-[482/331] overflow-hidden rounded-[20px]">
                <Image
                  src={featured.coverImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="space-y-2 px-6 pb-8 pt-2 text-white">
                <p className="text-xs text-white/70">
                  {formatDate(featured.publishedAt, locale)}
                </p>
                <p className="text-base font-bold uppercase leading-4">
                  {featured.category}
                </p>
                <p className="max-w-[352px] text-sm font-light leading-[18px]">
                  {featured.excerpt}
                </p>
                <span className="inline-block pt-2 text-sm font-medium underline-offset-4 hover:underline">
                  {t("readMore")}
                </span>
              </div>
            </Link>
          ) : null}
        </div>

        <div className="flex flex-col justify-center gap-5 lg:pt-24">
          {items.map((item, index) => {
            const style = cardStyles[index] ?? cardStyles[0];
            const darkIcon = index === 2;

            return (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className={cn(
                  "relative flex min-h-[179px] items-center gap-5 overflow-hidden rounded-2xl p-2 pr-14",
                  style,
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
                <div className="space-y-2.5 py-6 pr-4 text-sm leading-4">
                  <p className="text-xs opacity-70">
                    {formatDate(item.publishedAt, locale)}
                  </p>
                  <p className="font-bold uppercase">{item.category}</p>
                  <p className="max-w-[341px] font-light">{item.excerpt}</p>
                  <span className="inline-block pt-1 text-xs font-medium">
                    {t("readMore")}
                  </span>
                </div>
                <span
                  className={cn(
                    "absolute right-5 top-5 inline-flex size-9 items-center justify-center rounded-full",
                    darkIcon ? "bg-[#212121]" : "bg-white",
                  )}
                >
                  <span className="relative size-4 rotate-45">
                    <Image
                      src={
                        darkIcon
                          ? "/icons/arrow-up-right.svg"
                          : "/icons/arrow-up-right-dark.svg"
                      }
                      alt=""
                      fill
                      sizes="16px"
                    />
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
