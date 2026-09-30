"use client";

import type { RowDrag } from "./use-row-drag";

type DragHandleProps<Row> = {
  index: number;
  label: string;
  drag: RowDrag<Row>;
};

/** Grip button that starts a row drag; arrow keys move the row by one. */
export function DragHandle<Row>({ index, label, drag }: DragHandleProps<Row>) {
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
      className="grid cursor-grab touch-none grid-cols-2 gap-0.5 rounded-lg p-2 active:cursor-grabbing"
    >
      {Array.from({ length: 6 }, (_, dot) => (
        <span key={dot} className="size-1 rounded-full bg-[#9a9a9a]" />
      ))}
    </button>
  );
}
