import Image from "next/image";
import type { Program } from "@prisma/client";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { ArrowLink } from "@/shared/ui/arrow-link";
import { SectionBadge } from "@/shared/ui/section-badge";

type ProgramsSectionProps = {
  programs: Program[];
};

export async function ProgramsSection({ programs }: ProgramsSectionProps) {
  const t = await getTranslations("home.programs");

  return (
    <section className="bg-white px-6 py-16 sm:px-10 lg:px-[3.7rem] lg:py-20">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-10 flex items-start justify-between gap-6 lg:mb-14">
          <div className="max-w-[765px] space-y-2">
            <SectionBadge>{t("badge")}</SectionBadge>
            <h2 className="text-[clamp(2rem,4vw,3.125rem)] font-light leading-[1.2] tracking-[-1.5px] text-black">
              {t("titleBefore")}{" "}
              <span className="font-semibold">{t("titleAccent")}</span>
            </h2>
            <p className="max-w-3xl pt-2 text-base leading-[23px] text-[#6f6f6f]">
              {t("description")}
            </p>
          </div>
          <ArrowLink
            href="/education"
            label={t("allDirections")}
            className="hidden shrink-0 lg:inline-flex"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {programs.map((program) => (
            <Link
              key={program.id}
              href={program.href}
              className="group relative min-h-[420px] overflow-hidden rounded-3xl lg:min-h-[481px]"
            >
              <Image
                src={program.imageUrl}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55" />
              <div className="absolute inset-x-0 top-0 space-y-4 p-[30px] text-white">
                <p className="font-jakarta text-base font-extrabold leading-6">
                  {program.number}
                </p>
                <h3 className="max-w-[18ch] text-[1.75rem] font-bold leading-9">
                  {program.title}
                </h3>
              </div>
              <div className="absolute inset-x-0 bottom-0 space-y-5 p-[30px] text-white">
                <div className="h-1.5 w-10 rounded-full bg-brand-gold" />
                <p className="text-base leading-6">{program.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
