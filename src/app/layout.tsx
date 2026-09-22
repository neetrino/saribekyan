import type { ReactNode } from "react";

import "./globals.css";

type RootLayoutProps = {
  children: ReactNode;
};

/** Root shell — html/body live in `[locale]/layout` for locale-aware `lang`. */
export default function RootLayout({ children }: RootLayoutProps) {
  return children;
}
