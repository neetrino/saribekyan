"use client";

import { useEffect, useRef, type RefObject } from "react";

/** Marks a rendered field error so the form can scroll to it. */
export const fieldErrorAttr = { "data-field-error": "" } as const;

const FIELD_ERROR_SELECTOR = "[data-field-error]";
const FORM_ALERT_SELECTOR = "[role='alert']";
const FOCUSABLE_SELECTOR = "input:not([type='hidden']):not(.sr-only), select, textarea, button";

function firstVisible(form: HTMLFormElement, selector: string): HTMLElement | undefined {
  return [...form.querySelectorAll<HTMLElement>(selector)].find((element) => element.offsetParent !== null);
}

function focusFieldNear(errorElement: Element): void {
  const field = errorElement.parentElement?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
  field?.focus({ preventScroll: true });
}

function revealFirstError(form: HTMLFormElement): void {
  const fieldError = firstVisible(form, FIELD_ERROR_SELECTOR);
  const target = fieldError ?? firstVisible(form, FORM_ALERT_SELECTOR);
  target?.scrollIntoView({ behavior: "smooth", block: "center" });
  if (fieldError) focusFieldNear(fieldError);
}

/**
 * After each failed submit, scrolls the first visible field error (or the form alert) into view
 * and focuses the related field.
 * Runs two frames later so tab switches triggered by the same result are already painted.
 */
export function useScrollToFirstError<State>(formRef: RefObject<HTMLFormElement | null>, state: State, hasErrors: boolean): void {
  const initialState = useRef(state);

  useEffect(() => {
    if (state === initialState.current || !hasErrors) return;
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        if (formRef.current) revealFirstError(formRef.current);
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [formRef, state, hasErrors]);
}
