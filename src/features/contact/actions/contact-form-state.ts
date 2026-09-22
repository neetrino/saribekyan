export type ContactFormState = {
  ok: boolean;
  messageKey: "success" | "error" | null;
  fieldErrors: Partial<
    Record<
      "name" | "email" | "phone" | "department" | "subject" | "message",
      true
    >
  >;
};

export const initialContactFormState: ContactFormState = {
  ok: false,
  messageKey: null,
  fieldErrors: {},
};
