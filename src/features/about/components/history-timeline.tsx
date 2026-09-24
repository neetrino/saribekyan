import type { TimelineItem } from "../content/types";

type HistoryTimelineProps = {
  items: TimelineItem[];
};

export function HistoryTimeline({ items }: HistoryTimelineProps) {
  return (
    <ol className="space-y-4">
      {items.map((item, index) => {
        const accent = index % 2 === 0;

        return (
          <li
            key={item.id}
            className={
              accent
                ? "rounded-3xl bg-gradient-to-r from-[#233b38] to-[#60a199] p-6 text-white shadow-md"
                : "rounded-3xl bg-[#ededed] p-6 text-slate-900"
            }
          >
            <p
              className={
                accent
                  ? "font-jakarta text-2xl font-extrabold text-brand-lime"
                  : "font-jakarta text-2xl font-extrabold text-brand-teal"
              }
            >
              {item.year}
            </p>
            <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
            <p
              className={
                accent
                  ? "mt-2 max-w-3xl text-base leading-6 text-white/85"
                  : "mt-2 max-w-3xl text-base leading-6 text-[#6f6f6f]"
              }
            >
              {item.description}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
