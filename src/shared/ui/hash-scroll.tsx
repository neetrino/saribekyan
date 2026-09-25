"use client";

import { useEffect } from "react";

import { usePathname } from "@/i18n/navigation";

function smoothScrollToHash(): boolean {
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) {
    return false;
  }

  const target = document.getElementById(hash);
  if (!target) {
    return false;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

function smoothScrollToTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Smooth scroll on navbar / route changes and hash targets.
 */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const scrolledToHash = smoothScrollToHash();
      if (!scrolledToHash) {
        smoothScrollToTop();
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    function onHashChange(): void {
      requestAnimationFrame(() => {
        if (!smoothScrollToHash()) {
          smoothScrollToTop();
        }
      });
    }

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
