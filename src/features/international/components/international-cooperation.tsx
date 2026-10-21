import { getTranslations } from "next-intl/server";

import {
  cooperationParagraphIds,
  localCooperationParagraphIds,
} from "../content/meta";
import { InternationalParagraphs } from "./international-text";

export async function InternationalCooperation() {
  const t = await getTranslations("international.cooperation");

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:items-start">
      <InternationalParagraphs
        paragraphs={cooperationParagraphIds.map((id) => t(`paragraphs.${id}`))}
      />
      <div className="rounded-3xl bg-[#f5f5f5] p-6 sm:p-8">
        <h3 className="mb-4 text-xl font-semibold text-[#2f6b63]">
          {t("localTitle")}
        </h3>
        <InternationalParagraphs
          paragraphs={localCooperationParagraphIds.map((id) =>
            t(`local.${id}`),
          )}
        />
      </div>
    </div>
  );
}
