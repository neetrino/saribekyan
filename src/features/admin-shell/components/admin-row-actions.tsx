import Link from "next/link";

const iconButtonClass =
  "inline-flex size-9 items-center justify-center rounded-lg text-brand-ink transition-colors hover:bg-[#f4f1ec]";

type AdminEditLinkProps = {
  href: string;
  label: string;
};

/** Outline pencil button that opens the edit drawer. */
export function AdminEditLink({ href, label }: AdminEditLinkProps) {
  return (
    <Link href={href} scroll={false} aria-label={label} title={label} className={iconButtonClass}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className="size-5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    </Link>
  );
}

/** Outline trash glyph for the delete button. */
export function AdminTrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className="size-5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}

export const adminIconDeleteClass =
  "inline-flex size-9 items-center justify-center rounded-lg text-red-600 transition-colors hover:bg-red-50";
