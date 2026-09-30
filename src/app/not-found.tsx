import Link from "next/link";

import { routing } from "@/i18n/routing";
import { fontVariables } from "@/shared/config/fonts";

/** Unmatched URLs render under the pass-through root layout, so html/body must be provided here. */
export default function RootNotFound() {
  return (
    <html lang={routing.defaultLocale}>
      <body className={`${fontVariables} flex min-h-dvh items-center justify-center bg-white font-sans text-brand-ink antialiased`}>
        <main className="flex flex-col items-center gap-4 px-6 text-center">
          <p className="text-6xl font-bold text-brand-teal">404</p>
          <h1 className="text-xl font-semibold">Էջը չի գտնվել · Page not found</h1>
          <Link href={`/${routing.defaultLocale}`} className="text-sm font-semibold text-brand-teal hover:underline">
            Գլխավոր էջ · Home
          </Link>
        </main>
      </body>
    </html>
  );
}
