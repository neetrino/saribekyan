import type { PublicDocument } from "../types";

type DocumentListProps = {
  documents: PublicDocument[];
  emptyLabel: string;
};

function PdfDownloadMark() {
  return (
    <span className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-3 text-xs font-semibold tracking-wide text-brand-ink">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="size-4"
      >
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5" />
        <path d="M12 11v6" />
        <path d="M9.5 14.5 12 17l2.5-2.5" />
      </svg>
      PDF
    </span>
  );
}

export function DocumentList({ documents, emptyLabel }: DocumentListProps) {
  if (documents.length === 0) {
    return <p className="text-base text-[#6f6f6f]">{emptyLabel}</p>;
  }

  return (
    <ul className="space-y-3">
      {documents.map((document) => (
        <li key={document.id}>
          <a
            href={document.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-3 rounded-3xl bg-[#f5f5f5] px-5 py-4 transition-colors hover:bg-[#ededed] sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="font-medium text-brand-ink group-hover:underline">
                {document.title}
              </p>
              {document.description ? (
                <p className="mt-1 text-sm text-[#6f6f6f]">{document.description}</p>
              ) : null}
            </div>
            <div className="flex items-center gap-2 self-end sm:self-center">
              <PdfDownloadMark />
              <span className="inline-flex h-9 w-fit shrink-0 items-center rounded-full bg-brand-ink px-4 text-sm font-semibold text-white">
                {document.year}
              </span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
