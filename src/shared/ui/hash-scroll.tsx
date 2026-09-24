"use client";

import { useEffect } from "react";

import { usePathname } from "@/i18n/navigation";

function scrollToHashTarget(): void {
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) {
    return;
  }

  const target = document.getElementById(hash);
  if (!target) {
    return;
  }

  requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

/** Scrolls to the URL hash after client navigations. */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    scrollToHashTarget();
  }, [pathname]);

  return null;
}
