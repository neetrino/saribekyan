"use client";

import { cn } from "@/shared/lib/cn";

import type { RowDrag } from "./use-row-drag";

type DragHandleProps<Row> = {
  index: number;
  label: string;
  drag: RowDrag<Row>;
};

/** Grip button that starts a row drag; arrow keys move the row by one. */
export function DragHandle<Row>({ index, label, drag }: DragHandleProps<Row>) {
  const dragging = drag.activeIndex === index;

  return (
    <button
      type="button"
      data-handle={index}
      aria-label={label}
      onPointerDown={(event) => drag.startDrag(event, index)}
      onPointerMove={drag.moveDrag}
      onPointerUp={drag.endDrag}
      onPointerCancel={drag.endDrag}
      onKeyDown={(event) => drag.onKeyDown(event, index)}
      className={cn(
        "flex size-8 touch-none items-center justify-center rounded-lg border transition-colors",
        dragging
          ? "cursor-grabbing border-brand-teal bg-brand-teal/10 text-brand-teal"
          : "cursor-grab border-transparent text-[#9a9a9a] hover:border-black/10 hover:bg-[#f4f1ec] hover:text-brand-ink",
      )}
    >
      <span className="grid grid-cols-2 gap-0.5" aria-hidden="true">
        {Array.from({ length: 6 }, (_, dot) => (
          <span key={dot} className="size-1 rounded-full bg-current" />
        ))}
      </span>
    </button>
  );
}
