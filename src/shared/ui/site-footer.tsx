import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { footerColumns, siteConfig } from "@/shared/config/site";

const socialIcons = [
  {
    src: "/icons/facebook.svg",
    href: siteConfig.social.facebook,
    label: "Facebook",
  },
  {
    src: "/icons/instagram.svg",
    href: siteConfig.social.instagram,
    label: "Instagram",
  },
  {
    src: "/icons/telegram.svg",
    href: siteConfig.social.telegram,
    label: "Telegram",
  },
  {
    src: "/icons/youtube.svg",
    href: siteConfig.social.youtube,
    label: "YouTube",
  },
  { src: "/icons/social-1.svg", href: "#", label: "Social" },
  { src: "/icons/social-2.svg", href: "#", label: "Social" },
] as const;

export async function SiteFooter() {
  const t = await getTranslations("common");
  const brandLines = t("brand.nameLines").split("\n");

  return (
    <footer className="rounded-t-[40px] bg-gradient-to-r from-brand-ink to-brand-teal text-white">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] lg:gap-16 lg:px-[5.25rem] lg:pt-[9.25rem]">
        <div className="space-y-10">
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
            <p className="text-sm font-bold leading-5">
              {brandLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>

          <ul className="space-y-5 text-base tracking-[-0.35px]">
            <li className="flex items-center gap-[18px]">
              <span className="relative size-6 shrink-0">
                <Image src="/icons/phone.svg" alt="" fill sizes="24px" />
              </span>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-[18px]">
              <span className="relative size-6 shrink-0">
                <Image src="/icons/mail.svg" alt="" fill sizes="24px" />
              </span>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
            <li className="flex items-center gap-[18px]">
              <span className="relative size-6 shrink-0">
                <Image src="/icons/location.svg" alt="" fill sizes="24px" />
              </span>
              <span>{siteConfig.address}</span>
            </li>
          </ul>

          <ul className="flex items-center gap-[22px]">
            {socialIcons.map((item) => (
              <li key={item.src}>
                <a
                  href={item.href}
                  aria-label={item.label}
                  className="relative block h-6 w-6 opacity-90 transition-opacity hover:opacity-100"
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

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.titleKey} className="space-y-3">
              <h2 className="pb-2 text-base font-bold tracking-[1.2px]">
                {t(`footer.${column.titleKey}`)}
              </h2>
              <ul className="space-y-3 text-base text-white/65">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-white">
                      {t(`footer.${link.labelKey}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="border-t border-white/10 px-6 py-6 text-center text-sm text-white sm:px-10">
        {t.rich("footer.copyright", {
          company: (chunks) => (
            <span className="font-bold text-brand-gold">{chunks}</span>
          ),
        })}
      </p>
    </footer>
  );
}
