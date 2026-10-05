import type { ReactNode } from "react";

import { SectionBadge } from "@/shared/ui/section-badge";

type ContactPageShellProps = {
  badge: string;
  title: string;
  highlight?: string;
  description: string;
  children: ReactNode;
};

export function ContactPageShell({
  badge,
  title,
  highlight,
  description,
  children,
}: ContactPageShellProps) {
  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-ink from-[18%] to-brand-mint pb-28 pt-0">
        <div className="relative mx-auto max-w-[1280px] px-6 pb-10 pt-40 sm:px-10 lg:px-20">
          <SectionBadge className="bg-white/15 text-white">{badge}</SectionBadge>
          <h1 className="mt-4 max-w-4xl text-[clamp(2rem,5vw,3.25rem)] font-light leading-[1.15] tracking-[-1px] text-white">
            {title}
            {highlight ? (
              <>
                {" "}
                <span className="font-semibold text-brand-lime">{highlight}</span>
              </>
            ) : null}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/85">
            {description}
          </p>
        </div>
      </section>

      <div className="relative z-10 -mt-10 rounded-t-[40px] bg-white px-6 pb-20 pt-8 sm:px-10 lg:-mt-14 lg:px-20 lg:pb-24 lg:pt-10">
        <div className="mx-auto max-w-[1280px] space-y-14 lg:space-y-16">
          {children}
        </div>
      </div>
    </main>
  );
}
