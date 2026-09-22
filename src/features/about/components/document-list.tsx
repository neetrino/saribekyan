import type { AboutDocument } from "../content/types";

type DocumentListProps = {
  documents: AboutDocument[];
  emptyLabel?: string;
};

export function DocumentList({
  documents,
  emptyLabel = "Փաստաթղթեր շուտով կհրապարակվեն։",
}: DocumentListProps) {
  if (documents.length === 0) {
    return <p className="text-base text-[#6f6f6f]">{emptyLabel}</p>;
  }

  return (
    <ul className="space-y-3">
      {documents.map((document) => (
        <li key={document.id}>
          <a
            href={document.href}
            className="group flex flex-col gap-3 rounded-3xl bg-[#f5f5f5] px-5 py-4 transition-colors hover:bg-[#ededed] sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="font-medium text-brand-ink group-hover:underline">
                {document.title}
              </p>
              <p className="mt-1 text-sm text-[#6f6f6f]">{document.type}</p>
            </div>
            <span className="inline-flex h-9 shrink-0 items-center rounded-full bg-brand-ink px-4 text-sm font-semibold text-white">
              {document.year}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
