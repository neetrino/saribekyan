type FactItem = {
  label: string;
  value: string;
};

type EducationFactsProps = {
  items: FactItem[];
};

export function EducationFacts({ items }: EducationFactsProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item.label}
          className="rounded-3xl bg-gradient-to-br from-brand-ink to-brand-teal p-7 text-white shadow-md"
        >
          <p className="text-sm font-medium text-brand-mint">{item.label}</p>
          <p className="mt-3 text-2xl font-semibold leading-8">{item.value}</p>
        </li>
      ))}
    </ul>
  );
}
