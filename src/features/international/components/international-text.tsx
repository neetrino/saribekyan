type InternationalParagraphsProps = {
  paragraphs: string[];
};

export function InternationalParagraphs({
  paragraphs,
}: InternationalParagraphsProps) {
  return (
    <div className="max-w-4xl space-y-4 text-base leading-7 text-[#6f6f6f]">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

type InternationalBulletListProps = {
  title: string;
  items: string[];
};

export function InternationalBulletList({
  title,
  items,
}: InternationalBulletListProps) {
  return (
    <div className="rounded-3xl bg-[#f5f5f5] p-6 sm:p-8">
      <h3 className="text-lg font-semibold text-[#2f6b63]">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-base leading-7 text-[#4f4f4f]"
          >
            <span
              aria-hidden
              className="mt-[11px] size-2 shrink-0 rounded-full bg-brand-gold"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
