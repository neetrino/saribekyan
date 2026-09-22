import type { ScienceEvent } from "../content/types";

type EventListProps = {
  events: ScienceEvent[];
};

export function EventList({ events }: EventListProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <li
          key={event.id}
          className="flex h-full flex-col rounded-3xl bg-[#f5f5f5] p-6"
        >
          <p className="text-sm text-[#8f8f8f]">{event.venue}</p>
          <h3 className="mt-2 text-lg font-semibold text-brand-ink">
            {event.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-6 text-[#6f6f6f]">
            {event.description}
          </p>
          <p className="mt-4 font-jakarta text-base font-extrabold text-brand-teal">
            {event.date}
          </p>
        </li>
      ))}
    </ul>
  );
}
