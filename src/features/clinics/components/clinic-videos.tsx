import Image from "next/image";

type VideoItem = {
  id: string;
  poster: string;
  title: string;
  description: string;
};

type ClinicVideosProps = {
  items: VideoItem[];
  pendingLabel: string;
};

export function ClinicVideos({ items, pendingLabel }: ClinicVideosProps) {
  return (
    <ul className="grid gap-4 lg:grid-cols-2">
      {items.map((item) => (
        <li key={item.id}>
          <article className="overflow-hidden rounded-3xl bg-[#f5f5f5]">
            <div className="relative aspect-video">
              <Image
                src={item.poster}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <span className="absolute left-4 top-4 rounded-full bg-brand-ink/80 px-3 py-1 text-xs font-medium text-white">
                {pendingLabel}
              </span>
            </div>
            <div className="space-y-2 p-6">
              <h3 className="text-lg font-semibold text-brand-ink">
                {item.title}
              </h3>
              <p className="text-sm leading-6 text-[#6f6f6f]">
                {item.description}
              </p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
