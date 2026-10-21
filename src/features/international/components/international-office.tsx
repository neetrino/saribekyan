import { getTranslations } from "next-intl/server";

import { officeFunctionIds, officeParagraphIds } from "../content/meta";
import {
  InternationalBulletList,
  InternationalParagraphs,
} from "./international-text";

export async function InternationalOffice() {
  const t = await getTranslations("international.office");

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:items-start">
      <InternationalParagraphs
        paragraphs={officeParagraphIds.map((id) => t(`paragraphs.${id}`))}
      />
      <InternationalBulletList
        title={t("functionsTitle")}
        items={officeFunctionIds.map((id) => t(`functions.${id}`))}
      />
    </div>
  );
}
