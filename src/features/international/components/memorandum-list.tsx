import { getTranslations } from "next-intl/server";

import { memorandumIds } from "../content/meta";

export async function MemorandumList() {
  const t = await getTranslations("international.memoranda");

  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {memorandumIds.map((id) => (
        <li
          key={id}
          className="flex items-start gap-3 rounded-3xl bg-[#f5f5f5] px-5 py-4 text-base font-medium leading-6 text-brand-ink"
        >
          <span
            aria-hidden
            className="mt-2 size-2 shrink-0 rounded-full bg-brand-gold"
          />
          <span>{t(`items.${id}`)}</span>
        </li>
      ))}
    </ul>
  );
}
