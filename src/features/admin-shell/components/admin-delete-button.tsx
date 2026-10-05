"use client";

import { useRef, type FormEvent, type ReactNode } from "react";

import { useAdminConfirm } from "./admin-confirm-dialog";

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

/** Delete form that asks in a modal before submitting. */
export function AdminDeleteButton({
  action,
  id,
  returnTo,
  label,
  confirmMessage,
  className,
  children,
}: AdminDeleteButtonProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const skipConfirm = useRef(false);
  const { ask, dialog } = useAdminConfirm();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    if (skipConfirm.current) return;
    event.preventDefault();
    ask(confirmMessage, () => {
      skipConfirm.current = true;
      formRef.current?.requestSubmit();
    });
  }

  return (
    <>
      <form ref={formRef} action={action} onSubmit={onSubmit}>
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
      {dialog}
    </>
  );
}
