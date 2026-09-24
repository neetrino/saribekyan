import Image from "next/image";

import { siteConfig } from "@/shared/config/site";

import { contactSocialLinks } from "../content/meta";

const socialHrefs = {
  facebook: siteConfig.social.facebook,
  instagram: siteConfig.social.instagram,
  telegram: siteConfig.social.telegram,
  youtube: siteConfig.social.youtube,
} as const;

export function ContactSocial() {
  return (
    <article className="rounded-3xl bg-gradient-to-r from-brand-ink to-brand-teal p-7 text-white shadow-md">
      <ul className="flex flex-wrap items-center gap-[22px]">
        {contactSocialLinks.map((item) => (
          <li key={item.id}>
            <a
              href={socialHrefs[item.id]}
              aria-label={item.id}
              className="relative block size-6 opacity-90 transition-opacity hover:opacity-100"
            >
              <Image
                src={item.icon}
                alt=""
                fill
                className="object-contain"
                sizes="24px"
              />
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}
