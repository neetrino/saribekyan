import Image from "next/image";
import { getTranslations } from "next-intl/server";

import {
  partnerRegions,
  partnersByRegion,
  type PartnerRecord,
} from "../content/meta";

export async function PartnerGrid() {
  const t = await getTranslations("international.partners");

  return (
    <div className="space-y-10">
      {partnerRegions.map((region) => (
        <PartnerRegionGroup
          key={region}
          heading={t(`regions.${region}`)}
          visitLabel={t("visitWebsite")}
          partners={partnersByRegion(region)}
          getName={(id) => t(`${id}.name`)}
          getCountry={(id) => t(`${id}.country`)}
        />
      ))}
    </div>
  );
}

type PartnerRegionGroupProps = {
  heading: string;
  visitLabel: string;
  partners: PartnerRecord[];
  getName: (id: PartnerRecord["id"]) => string;
  getCountry: (id: PartnerRecord["id"]) => string;
};

function PartnerRegionGroup({
  heading,
  visitLabel,
  partners,
  getName,
  getCountry,
}: PartnerRegionGroupProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-brand-ink">{heading}</h3>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {partners.map((partner) => (
          <li key={partner.id}>
            <article className="flex h-full flex-col rounded-3xl bg-[#f5f5f5] p-6">
              <span className="relative mx-auto h-16 w-36">
                <Image
                  src={partner.logoUrl}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="144px"
                />
              </span>
              <h4 className="mt-5 text-base font-semibold leading-6 text-brand-ink">
                {getName(partner.id)}
              </h4>
              <p className="mt-1 text-sm text-[#6f6f6f]">
                {getCountry(partner.id)}
              </p>
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto pt-4 text-sm font-medium text-brand-teal transition-opacity hover:opacity-80 hover:underline"
              >
                {visitLabel}
              </a>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
