type InfoCard = {
  id: string;
  title: string;
  description: string;
};

type InternationalInfoGridProps = {
  items: InfoCard[];
};

export function InternationalInfoGrid({ items }: InternationalInfoGridProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item.id}
          className="rounded-3xl border border-[#e8e8e8] bg-white p-6"
        >
          <div className="mb-4 h-1.5 w-10 rounded-full bg-brand-gold" />
          <h3 className="text-lg font-semibold text-brand-ink">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-[#6f6f6f]">
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
