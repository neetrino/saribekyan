"use client";

import { useEffect, useRef, useState, useTransition, type KeyboardEvent, type PointerEvent, type RefObject } from "react";

/** Row of a reorderable admin table; `placementId` identifies the row inside the ordered section. */
export type DraggableRow = { id: string; placementId: string | null };

/** Persists a new order; resolves to whether it was saved. */
export type SaveRowOrder = (placementIds: string[]) => Promise<boolean>;

function placementKey(rows: readonly DraggableRow[]): string {
  return rows.map((row) => row.placementId ?? "").join("|");
}

function moveRow<Row>(rows: readonly Row[], from: number, to: number): Row[] | null {
  if (from === to || to < 0 || to >= rows.length) return null;
  const next = [...rows];
  const [item] = next.splice(from, 1);
  if (item === undefined) return null;
  next.splice(to, 0, item);
  return next;
}

function rowIndexAt(table: HTMLTableElement, clientY: number): number | null {
  for (const node of table.querySelectorAll<HTMLElement>("[data-index]")) {
    const rect = node.getBoundingClientRect();
    if (clientY >= rect.top && clientY <= rect.bottom) return Number(node.dataset.index);
  }
  return null;
}

export type RowDrag<Row> = {
  rows: Row[];
  activeIndex: number | null;
  tableRef: RefObject<HTMLTableElement | null>;
  startDrag: (event: PointerEvent<HTMLButtonElement>, index: number) => void;
  moveDrag: (event: PointerEvent<HTMLButtonElement>) => void;
  endDrag: (event: PointerEvent<HTMLButtonElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>, index: number) => void;
};

/** Pointer drag (and arrow keys) over table rows; the order is persisted via `save` (disabled when null). */
export function useRowDrag<Row extends DraggableRow>(initial: Row[], save: SaveRowOrder | null): RowDrag<Row> {
  const [rows, setRows] = useState(initial);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const rowsRef = useRef(initial);
  const savedRef = useRef(initial);
  const savedKey = useRef(placementKey(initial));
  const dragIndex = useRef<number | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const [, startTransition] = useTransition();
  const incoming = placementKey(initial);

  useEffect(() => {
    savedRef.current = initial;
    savedKey.current = incoming;
    rowsRef.current = initial;
    setRows(initial);
  }, [initial, incoming]);

  const apply = (next: Row[], index: number) => {
    rowsRef.current = next;
    dragIndex.current = index;
    setRows(next);
    setActiveIndex(index);
  };

  const commit = () => {
    if (!save) return;
    const ids = rowsRef.current.flatMap((row) => (row.placementId ? [row.placementId] : []));
    const key = ids.join("|");
    if (ids.length !== rowsRef.current.length || key === savedKey.current) return;
    const snapshot = savedRef.current;
    const committed = rowsRef.current;
    startTransition(async () => {
      if (await save(ids)) {
        savedKey.current = key;
        savedRef.current = committed;
        return;
      }
      if (placementKey(rowsRef.current) !== key) return;
      rowsRef.current = snapshot;
      setRows(snapshot);
    });
  };

  return {
    rows,
    activeIndex,
    tableRef,
    startDrag(event, index) {
      event.currentTarget.setPointerCapture(event.pointerId);
      dragIndex.current = index;
      setActiveIndex(index);
    },
    moveDrag(event) {
      const from = dragIndex.current;
      const table = tableRef.current;
      if (from === null || !table) return;
      const to = rowIndexAt(table, event.clientY);
      if (to === null || Number.isNaN(to)) return;
      const next = moveRow(rowsRef.current, from, to);
      if (next) apply(next, to);
    },
    endDrag(event) {
      if (dragIndex.current === null) return;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      dragIndex.current = null;
      setActiveIndex(null);
      commit();
    },
    onKeyDown(event, index) {
      const to = event.key === "ArrowUp" ? index - 1 : event.key === "ArrowDown" ? index + 1 : null;
      if (to === null) return;
      event.preventDefault();
      const next = moveRow(rowsRef.current, index, to);
      if (!next) return;
      rowsRef.current = next;
      setRows(next);
      commit();
      requestAnimationFrame(() => tableRef.current?.querySelector<HTMLButtonElement>(`[data-handle="${to}"]`)?.focus());
    },
  };
}
