import Image from "next/image";
import type { ReactNode } from "react";

type HeroBandProps = {
  children: ReactNode;
};

/**
 * Shared hero gradient + pattern so About rounded corners
 * reveal the same background that continues under the white block.
 */
export function HeroBand({ children }: HeroBandProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-brand-ink from-[12%] to-brand-mint pb-10">
      <div className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-70">
        <Image
          src="/images/home/hero-pattern.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-left"
        />
      </div>
      {children}
    </div>
  );
}
