"use client";

import type { FormEvent, ReactNode } from "react";

type AdminDeleteButtonProps = {
  /** Server action receiving `id` and `returnTo`. */
  action: (formData: FormData) => Promise<void>;
  id: string;
  returnTo: string;
  label: string;
  confirmMessage: string;
  className?: string;
  children?: ReactNode;
};

/** Delete form with a browser confirmation step. */
export function AdminDeleteButton({
  action,
  id,
  returnTo,
  label,
  confirmMessage,
  className,
  children,
}: AdminDeleteButtonProps) {
  function confirmDelete(event: FormEvent<HTMLFormElement>) {
    if (!window.confirm(confirmMessage)) {
      event.preventDefault();
    }
  }

  return (
    <form action={action} onSubmit={confirmDelete}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="returnTo" value={returnTo} />
      <button
        type="submit"
        aria-label={children ? label : undefined}
        title={children ? label : undefined}
        className={className ?? "text-sm font-semibold text-red-600 hover:underline"}
      >
        {children ?? label}
      </button>
    </form>
  );
}
