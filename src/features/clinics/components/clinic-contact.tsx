import { siteConfig } from "@/shared/config/site";

type ClinicContactProps = {
  title: string;
  description: string;
  hoursLabel: string;
  hours: string;
};

export function ClinicContact({
  title,
  description,
  hoursLabel,
  hours,
}: ClinicContactProps) {
  const phoneHref = `tel:${siteConfig.phone.replace(/\s/g, "")}`;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <article className="rounded-3xl bg-gradient-to-b from-brand-ink to-brand-teal p-7 text-white shadow-md">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-4 text-base leading-7 text-white/85">{description}</p>
        <address className="mt-6 space-y-2 not-italic text-sm leading-6">
          <a className="block text-brand-mint hover:opacity-80" href={phoneHref}>
            {siteConfig.phone}
          </a>
          <a
            className="block text-brand-mint hover:opacity-80"
            href={`mailto:${siteConfig.email}`}
          >
            {siteConfig.email}
          </a>
          <p className="text-white/80">{siteConfig.address}</p>
        </address>
      </article>
      <article className="flex flex-col justify-between rounded-3xl bg-[#f5f5f5] p-7 text-brand-ink">
        <p className="text-sm font-medium text-brand-teal">{hoursLabel}</p>
        <p className="mt-3 text-2xl font-semibold leading-8">{hours}</p>
      </article>
    </div>
  );
}
