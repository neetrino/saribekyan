type SpecialtyListProps = {
  items: string[];
};

export function EducationSpecialtyList({ items }: SpecialtyListProps) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-2xl bg-[#f5f5f5] px-5 py-4 text-base font-medium text-brand-ink"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
