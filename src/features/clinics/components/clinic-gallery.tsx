import Image from "next/image";

type GalleryItem = {
  id: string;
  src: string;
  alt: string;
};

type ClinicGalleryProps = {
  items: GalleryItem[];
};

export function ClinicGallery({ items }: ClinicGalleryProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.id}>
          <figure className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#f5f5f5]">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </figure>
        </li>
      ))}
    </ul>
  );
}
