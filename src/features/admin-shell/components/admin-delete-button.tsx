"use client";

import type { FormEvent } from "react";

type AdminDeleteButtonProps = {
  /** Server action receiving `id` and `returnTo`. */
  action: (formData: FormData) => Promise<void>;
  id: string;
  returnTo: string;
  label: string;
  confirmMessage: string;
  className?: string;
};

/** Delete form with a browser confirmation step. */
export function AdminDeleteButton({ action, id, returnTo, label, confirmMessage, className }: AdminDeleteButtonProps) {
  function confirmDelete(event: FormEvent<HTMLFormElement>) {
    if (!window.confirm(confirmMessage)) {
      event.preventDefault();
    }
  }

  return (
    <form action={action} onSubmit={confirmDelete}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="returnTo" value={returnTo} />
      <button type="submit" className={className ?? "text-sm font-semibold text-red-600 hover:underline"}>
        {label}
      </button>
    </form>
  );
}

export const adminDrawerDeleteClass =
  "rounded-xl px-4 py-2 text-sm font-semibold text-red-600 ring-1 ring-red-200 hover:bg-red-50";
