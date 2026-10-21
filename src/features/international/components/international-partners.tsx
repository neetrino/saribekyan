import { getTranslations } from "next-intl/server";

import { partnerIds, partnerOrganizationIds } from "../content/meta";
import { InternationalBulletList } from "./international-text";

export async function InternationalPartners() {
  const t = await getTranslations("international.partners");

  return (
    <div className="space-y-8">
      <ul className="grid gap-4 sm:grid-cols-2">
        {partnerIds.map((id) => (
          <li
            key={id}
            className="flex min-h-[120px] items-center justify-center rounded-3xl bg-gradient-to-br from-brand-ink to-brand-teal px-6 py-8 text-center text-xl font-semibold text-white shadow-md"
          >
            {t(`items.${id}`)}
          </li>
        ))}
      </ul>
      <InternationalBulletList
        title={t("organizationsTitle")}
        items={partnerOrganizationIds.map((id) => t(`organizations.${id}`))}
      />
    </div>
  );
}
