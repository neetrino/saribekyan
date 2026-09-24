type DeadlineItem = {
  id: string;
  title: string;
  description: string;
  date: string;
};

type DeadlineGridProps = {
  items: DeadlineItem[];
};

export function DeadlineGrid({ items }: DeadlineGridProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex h-full flex-col rounded-3xl bg-[#f5f5f5] p-6"
        >
          <p className="text-sm text-[#8f8f8f]">{item.description}</p>
          <h3 className="mt-2 text-lg font-semibold text-brand-ink">
            {item.title}
          </h3>
          <p className="mt-4 font-jakarta text-base font-extrabold text-brand-teal">
            {item.date}
          </p>
        </li>
      ))}
    </ul>
  );
}
