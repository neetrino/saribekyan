import { getTranslations } from "next-intl/server";

import { memorandumIds } from "../content/meta";

export async function MemorandumList() {
  const t = await getTranslations("international.memoranda");

  return (
    <ul className="space-y-3">
      {memorandumIds.map((id) => (
        <li
          key={id}
          className="flex flex-col gap-3 rounded-3xl bg-[#f5f5f5] px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0">
            <p className="font-medium text-brand-ink">{t(`${id}.title`)}</p>
            <p className="mt-1 text-sm text-[#6f6f6f]">
              {t(`${id}.description`)}
            </p>
          </div>
          <span className="inline-flex h-9 shrink-0 items-center rounded-full bg-brand-ink px-4 text-sm font-semibold text-white">
            {t(`${id}.year`)}
          </span>
        </li>
      ))}
    </ul>
  );
}
