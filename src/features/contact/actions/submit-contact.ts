"use server";

import { z } from "zod";

import { contactFormDepartments } from "../content/meta";
import type { ContactFormState } from "./contact-form-state";

const contactFormSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .transform((value) => value ?? "")
    .refine(
      (value) => value === "" || /^[+\d\s()-]{6,40}$/u.test(value),
      "phone",
    ),
  department: z.enum(contactFormDepartments),
  subject: z.string().trim().min(2).max(160),
  message: z.string().trim().min(10).max(4000),
});

function fieldErrorMap(
  issues: z.ZodIssue[],
): ContactFormState["fieldErrors"] {
  const fieldErrors: ContactFormState["fieldErrors"] = {};

  for (const issue of issues) {
    const key = issue.path[0];
    if (
      key === "name" ||
      key === "email" ||
      key === "phone" ||
      key === "department" ||
      key === "subject" ||
      key === "message"
    ) {
      fieldErrors[key] = true;
    }
  }

  return fieldErrors;
}

/**
 * Validates contact form input. Email delivery can be wired later.
 */
export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") ?? "",
    department: formData.get("department"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      messageKey: "error",
      fieldErrors: fieldErrorMap(parsed.error.issues),
    };
  }

  // Placeholder acceptance until outbound mail / CRM is connected.
  void parsed.data;

  return {
    ok: true,
    messageKey: "success",
    fieldErrors: {},
  };
}
