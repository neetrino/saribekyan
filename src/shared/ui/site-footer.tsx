import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";
import { footerColumns, siteConfig } from "@/shared/config/site";

const socialIcons = [
  {
    src: "/icons/facebook.svg",
    href: siteConfig.social.facebook,
    label: "Facebook",
    className: "h-5 w-[11px] lg:h-[23px] lg:w-[13px]",
  },
  {
    src: "/icons/instagram.svg",
    href: siteConfig.social.instagram,
    label: "Instagram",
    className: "size-5 lg:size-[23px]",
  },
  {
    src: "/icons/telegram.svg",
    href: siteConfig.social.telegram,
    label: "Telegram",
    className: "size-5 lg:size-6",
  },
  {
    src: "/icons/youtube.svg",
    href: siteConfig.social.youtube,
    label: "YouTube",
    className: "h-4 w-[22px] lg:h-[18px] lg:w-[25px]",
  },
  {
    src: "/icons/whatsapp.svg",
    href: siteConfig.social.whatsapp,
    label: "WhatsApp",
    className: "size-5 lg:size-6",
  },
  {
    src: "/icons/viber.svg",
    href: siteConfig.social.viber,
    label: "Viber",
    className: "h-5 w-[18px] lg:h-6 lg:w-[22px]",
  },
] as const;

function NeetrinoLink({ children }: { children: ReactNode }) {
  return (
    <a
      href="https://neetrino.com"
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-brand-gold transition-opacity hover:opacity-80"
    >
      {children}
    </a>
  );
}

function SocialList({ className }: { className?: string }) {
  return (
    <ul className={className}>
      {socialIcons.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            aria-label={item.label}
            className={`relative block opacity-90 transition-opacity hover:opacity-100 ${item.className}`}
          >
            <Image
              src={item.src}
              alt=""
              fill
              className="object-contain"
              sizes="24px"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Figma Footer — mobile 198:436, desktop 198:790 */
export async function SiteFooter() {
  const t = await getTranslations("common");
  const brandLines = t("brand.nameLines").split("\n");

  return (
    <footer
      className="overflow-hidden rounded-t-[32px] text-white lg:rounded-t-[40px]"
      style={{
        backgroundImage: "linear-gradient(269deg, #203734 8%, #5b9d94 76%)",
      }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-6 pt-8 sm:px-10 lg:px-[86px] lg:pb-12 lg:pt-[148px] lg:pr-[104px]">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          {/* Brand + contact */}
          <div className="flex w-full max-w-[340px] shrink-0 flex-col">
            <div className="flex items-center gap-4">
              <span className="relative h-10 w-9 shrink-0 lg:h-[51px] lg:w-[46px]">
                <Image
                  src="/logos/logo-footer.svg"
                  alt=""
                  fill
                  className="object-contain"
                  sizes="46px"
                />
              </span>
              <p className="text-xs font-normal leading-[18px] text-white lg:text-sm lg:font-bold lg:leading-5">
                {brandLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>

            <ul className="mt-6 flex flex-col gap-4 text-sm leading-[21px] lg:mt-[42px] lg:gap-[21px] lg:text-base lg:tracking-[-0.35px]">
              <li className="flex items-center gap-4 lg:gap-[18px]">
                <span className="relative size-5 shrink-0 lg:size-6">
                  <Image src="/icons/phone.svg" alt="" fill sizes="24px" />
                </span>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="text-white transition-opacity hover:opacity-80"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-4 lg:gap-[18px]">
                <span className="relative size-5 shrink-0 lg:size-6">
                  <Image src="/icons/mail.svg" alt="" fill sizes="24px" />
                </span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-white transition-opacity hover:opacity-80"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-4 lg:items-end lg:gap-[18px]">
                <span className="relative size-5 shrink-0 lg:size-6">
                  <Image src="/icons/location.svg" alt="" fill sizes="24px" />
                </span>
                <span className="text-white">{siteConfig.address}</span>
              </li>
            </ul>
          </div>

          {/* Social — mobile only (between contact and columns) */}
          <SocialList className="mt-7 flex items-center gap-5 lg:hidden" />

          {/* Link columns */}
          <div className="mt-8 grid min-w-0 grid-cols-2 gap-x-8 gap-y-6 lg:mt-0 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-10 xl:gap-x-[65px]">
            {footerColumns.map((column) => (
              <div key={column.titleKey} className="flex min-w-0 flex-col">
                <h2 className="text-sm font-normal leading-[21px] tracking-[1.2px] text-white lg:pb-2 lg:text-base lg:font-bold lg:leading-4">
                  {t(`footer.${column.titleKey}`)}
                </h2>
                <ul className="mt-2 flex flex-col gap-2 text-sm leading-[22px] text-white/65 lg:mt-3 lg:gap-3 lg:text-base lg:leading-6">
                  {column.links.map((link) => (
                    <li key={`${column.titleKey}-${link.labelKey}`}>
                      <Link
                        href={link.href}
                        className="transition-colors hover:text-white"
                      >
                        {t(`footer.${link.labelKey}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Social (desktop) + copyright */}
        <div className="mt-11 border-t border-white/15 pt-4 lg:mt-[52px] lg:flex lg:items-center lg:justify-between lg:gap-8 lg:border-0 lg:pt-0">
          <SocialList className="hidden items-center gap-[22px] lg:flex" />
          <p className="w-full text-center text-sm leading-5 text-white lg:text-right">
            {t.rich("footer.copyright", {
              br: () => <br className="lg:hidden" />,
              company: (chunks) => <NeetrinoLink>{chunks}</NeetrinoLink>,
            })}
          </p>
        </div>
      </div>
    </footer>
  );
}
