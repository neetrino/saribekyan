type DepartmentItem = {
  id: string;
  title: string;
  description: string;
};

type EducationDepartmentsProps = {
  items: DepartmentItem[];
};

export function EducationDepartments({ items }: EducationDepartmentsProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((item, index) => (
        <li
          key={item.id}
          className="rounded-3xl border border-[#e8e8e8] bg-white p-6"
        >
          <p className="font-jakarta text-sm font-extrabold text-brand-teal">
            {String(index + 1).padStart(2, "0")}
          </p>
          <div className="mt-4 mb-3 h-1.5 w-10 rounded-full bg-brand-gold" />
          <h3 className="text-lg font-semibold text-brand-ink">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-[#6f6f6f]">
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
