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
    <section className="bg-white px-5 py-10 sm:px-10 lg:px-[3.7rem] lg:py-20">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-6 flex flex-col gap-1.5 lg:mb-14 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
          <div className="max-w-[765px]">
            <div className="flex items-center justify-between gap-4 lg:justify-start">
              <SectionBadge>{t("badge")}</SectionBadge>
              <ArrowLink
                href="/education"
                label={t("allDirections")}
                className="lg:hidden"
              />
            </div>
            <h2 className="mt-1.5 text-[29px] font-normal leading-10 tracking-[-0.5px] text-black lg:mt-2 lg:text-[clamp(2rem,4vw,3.125rem)] lg:font-light lg:leading-[1.2] lg:tracking-[-1.5px]">
              {t("titleBefore")}{" "}
              <span className="font-semibold">{t("titleAccent")}</span>
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-[22px] text-[#6f6f6f] lg:mt-2 lg:pt-2 lg:text-base lg:leading-[23px]">
              {t("description")}
            </p>
          </div>
          <ArrowLink
            href="/education"
            label={t("allDirections")}
            className="hidden shrink-0 lg:inline-flex"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
          {programs.map((program) => (
            <Link
              key={program.id}
              href={program.href}
              className="group relative flex h-[297px] flex-col overflow-hidden rounded-[20px] lg:h-auto lg:min-h-[420px] lg:rounded-3xl xl:min-h-[481px]"
            >
              <Image
                src={program.imageUrl}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55" />
              <div className="relative z-10 flex h-full flex-col gap-8 p-6 text-white lg:absolute lg:inset-0 lg:gap-0 lg:p-[30px]">
                <div className="space-y-3 lg:space-y-4">
                  <p className="font-jakarta text-[15px] font-extrabold leading-[22.5px] lg:text-base lg:leading-6">
                    {program.number}
                  </p>
                  <h3 className="max-w-[18ch] text-2xl font-normal leading-[30px] lg:text-[1.75rem] lg:font-bold lg:leading-9">
                    {program.title}
                  </h3>
                </div>
                <div className="space-y-3 lg:mt-auto lg:space-y-5">
                  <div className="h-[5px] w-9 rounded-full bg-brand-gold lg:h-1.5 lg:w-10" />
                  <p className="text-sm leading-5 lg:text-base lg:leading-6">
                    {program.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
