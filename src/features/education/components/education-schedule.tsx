type ScheduleRow = {
  id: string;
  course: string;
  dates: string;
  format: string;
  hours: string;
};

type EducationScheduleProps = {
  columns: {
    course: string;
    dates: string;
    format: string;
    hours: string;
  };
  rows: ScheduleRow[];
};

export function EducationSchedule({ columns, rows }: EducationScheduleProps) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-[#e8e8e8]">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-brand-ink text-white">
          <tr>
            <th className="px-5 py-4 font-semibold">{columns.course}</th>
            <th className="px-5 py-4 font-semibold">{columns.dates}</th>
            <th className="px-5 py-4 font-semibold">{columns.format}</th>
            <th className="px-5 py-4 font-semibold">{columns.hours}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.id}
              className={index % 2 === 0 ? "bg-white" : "bg-[#f7f8f8]"}
            >
              <td className="px-5 py-4 font-medium text-brand-ink">
                {row.course}
              </td>
              <td className="px-5 py-4 text-[#6f6f6f]">{row.dates}</td>
              <td className="px-5 py-4 text-[#6f6f6f]">{row.format}</td>
              <td className="px-5 py-4 text-[#6f6f6f]">{row.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
