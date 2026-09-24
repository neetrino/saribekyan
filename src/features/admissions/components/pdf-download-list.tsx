import { getTranslations } from "next-intl/server";

import type { DownloadItem } from "../content/types";

type PdfDownloadListProps = {
  items: DownloadItem[];
};

export async function PdfDownloadList({ items }: PdfDownloadListProps) {
  const t = await getTranslations("admissions");

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={item.href}
            download
            className="group flex flex-col gap-3 rounded-3xl bg-[#f5f5f5] px-5 py-4 transition-colors hover:bg-[#ededed] sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="font-medium text-brand-ink group-hover:underline">
                {item.title}
              </p>
              <p className="mt-1 text-sm text-[#6f6f6f]">{item.description}</p>
            </div>
            <span className="inline-flex h-9 shrink-0 items-center rounded-full bg-brand-ink px-4 text-sm font-semibold text-white">
              {item.meta ?? t("downloadPdf")}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
