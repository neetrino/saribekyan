import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { tuitionPrograms } from "../content/hub";

function formatTuition(
  locale: string,
  amountAmd: number,
  fromLabel: string | null,
): string {
  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "AMD",
    maximumFractionDigits: 0,
  }).format(amountAmd);

  return fromLabel ? `${fromLabel} ${formatted}` : formatted;
}

type TuitionProgramsProps = {
  locale: string;
};

export async function TuitionPrograms({ locale }: TuitionProgramsProps) {
  const t = await getTranslations("admissions.tuition.programs");

  return (
    <ul className="grid gap-5 lg:grid-cols-3">
      {tuitionPrograms.map((program) => (
        <li key={program.id}>
          <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-[#f5f5f5]">
            <div className="relative aspect-[16/10]">
              <Image
                src={program.imageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-semibold text-brand-ink">
                {t(`${program.id}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#6f6f6f]">
                {t(`${program.id}.description`)}
              </p>
              <p className="mt-5 font-jakarta text-2xl font-extrabold text-brand-ink">
                {formatTuition(
                  locale,
                  program.amountAmd,
                  program.from ? t("from") : null,
                )}
              </p>
              <p className="mt-1 text-sm text-[#8f8f8f]">
                {t(`billing.${program.billing}`)}
              </p>
              <Link
                href={program.href}
                className="mt-auto pt-5 text-sm font-medium text-brand-teal hover:underline"
              >
                {t("viewProgram")}
              </Link>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
