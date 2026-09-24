import type { ReactNode } from "react";

import { SectionBadge } from "@/shared/ui/section-badge";

type ContentSectionProps = {
  id?: string;
  badge?: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function ContentSection({
  id,
  badge,
  title,
  description,
  children,
}: ContentSectionProps) {
  return (
    <section id={id} className="scroll-mt-28 py-10 lg:py-14">
      {badge ? <SectionBadge>{badge}</SectionBadge> : null}
      <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-[1.2] tracking-[-1px] text-black">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-3xl text-base leading-7 text-[#6f6f6f]">
          {description}
        </p>
      ) : null}
      <div className="mt-8">{children}</div>
    </section>
  );
}
