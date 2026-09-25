import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { footerColumns, siteConfig } from "@/shared/config/site";

const socialIcons = [
  {
    src: "/icons/facebook.svg",
    href: siteConfig.social.facebook,
    label: "Facebook",
    className: "h-[23px] w-[13px]",
  },
  {
    src: "/icons/instagram.svg",
    href: siteConfig.social.instagram,
    label: "Instagram",
    className: "size-[23px]",
  },
  {
    src: "/icons/telegram.svg",
    href: siteConfig.social.telegram,
    label: "Telegram",
    className: "size-6",
  },
  {
    src: "/icons/youtube.svg",
    href: siteConfig.social.youtube,
    label: "YouTube",
    className: "h-[18px] w-[25px]",
  },
  {
    src: "/icons/whatsapp.svg",
    href: siteConfig.social.whatsapp,
    label: "WhatsApp",
    className: "size-6",
  },
  {
    src: "/icons/viber.svg",
    href: siteConfig.social.viber,
    label: "Viber",
    className: "h-6 w-[22px]",
  },
] as const;

/** Figma Footer 198:790 */
export async function SiteFooter() {
  const t = await getTranslations("common");
  const brandLines = t("brand.nameLines").split("\n");

  return (
    <footer
      className="overflow-hidden rounded-t-[40px] text-white"
      style={{
        backgroundImage:
          "linear-gradient(267deg, #203734 6%, #5b9d94 77%)",
      }}
    >
      <div className="mx-auto max-w-[1440px] px-6 pb-8 pt-16 sm:px-10 lg:px-[86px] lg:pb-10 lg:pt-[148px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-[65px]">
          <div className="flex max-w-[340px] shrink-0 flex-col gap-[42px]">
            <div className="flex items-center gap-4">
              <span className="relative h-[51px] w-[46px] shrink-0">
                <Image
                  src="/logos/logo-footer.svg"
                  alt=""
                  fill
                  className="object-contain"
                  sizes="46px"
                />
              </span>
              <p className="text-sm font-bold leading-5 text-white">
                {brandLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>

            <ul className="flex flex-col gap-[21px] text-base tracking-[-0.35px]">
              <li className="flex items-center gap-[18px]">
                <span className="relative size-6 shrink-0">
                  <Image src="/icons/phone.svg" alt="" fill sizes="24px" />
                </span>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="leading-5 text-white transition-opacity hover:opacity-80"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-[18px]">
                <span className="relative size-6 shrink-0">
                  <Image src="/icons/mail.svg" alt="" fill sizes="24px" />
                </span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="leading-5 text-white transition-opacity hover:opacity-80"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-end gap-[18px]">
                <span className="relative size-6 shrink-0">
                  <Image src="/icons/location.svg" alt="" fill sizes="24px" />
                </span>
                <span className="leading-5 text-white">{siteConfig.address}</span>
              </li>
            </ul>

            <ul className="flex items-center gap-[22px]">
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
          </div>

          <div className="grid min-w-0 flex-1 grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:gap-x-[65px]">
            {footerColumns.map((column) => (
              <div key={column.titleKey} className="flex flex-col gap-3">
                <h2 className="pb-2 text-base font-bold leading-4 tracking-[1.2px] text-white">
                  {t(`footer.${column.titleKey}`)}
                </h2>
                <ul className="flex flex-col gap-3 text-base leading-6 text-white/65">
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

        <p className="mt-14 text-center text-sm leading-5 text-white lg:mt-16">
          {t.rich("footer.copyright", {
            company: (chunks) => (
              <span className="font-bold text-brand-gold">{chunks}</span>
            ),
          })}
        </p>
      </div>
    </footer>
  );
}
