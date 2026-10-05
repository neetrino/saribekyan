"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent, type ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

/** Movement before a press becomes a drag, so a short click still opens the pill. */
const DRAG_THRESHOLD_PX = 6;

type DragState = {
  pointerId: number;
  startX: number;
  startScrollLeft: number;
  moved: boolean;
};

type DragScrollNavProps = {
  ariaLabel: string;
  className?: string;
  children: ReactNode;
};

const SCROLL_HIDE = "overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

function edgeFlags(element: HTMLElement): { left: boolean; right: boolean } {
  const maxScroll = element.scrollWidth - element.clientWidth;
  return {
    left: element.scrollLeft > 8,
    right: maxScroll > 8 && element.scrollLeft < maxScroll - 8,
  };
}

/** Horizontal pill row. Dragging with the mouse moves the row by the same distance. */
export function DragScrollNav({ ariaLabel, className, children }: DragScrollNavProps) {
  const scrollerRef = useRef<HTMLElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const suppressClickRef = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [edges, setEdges] = useState({ left: false, right: false });

  const syncEdges = useCallback(() => {
    const element = scrollerRef.current;
    if (element) setEdges(edgeFlags(element));
  }, []);

  useEffect(() => {
    const element = scrollerRef.current;
    if (!element) return;
    syncEdges();
    element.addEventListener("scroll", syncEdges, { passive: true });
    const observer = new ResizeObserver(syncEdges);
    observer.observe(element);
    return () => {
      element.removeEventListener("scroll", syncEdges);
      observer.disconnect();
    };
  }, [syncEdges]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const state = dragRef.current;
      const element = scrollerRef.current;
      if (!state || !element || state.pointerId !== event.pointerId) return;
      const delta = event.clientX - state.startX;
      if (!state.moved) {
        if (Math.abs(delta) < DRAG_THRESHOLD_PX) return;
        state.moved = true;
        setDragging(true);
      }
      element.scrollLeft = state.startScrollLeft - delta;
    };
    const onUp = (event: PointerEvent) => {
      const state = dragRef.current;
      const element = scrollerRef.current;
      if (!state || state.pointerId !== event.pointerId) return;
      if (state.moved && element && element.scrollLeft !== state.startScrollLeft) {
        suppressClickRef.current = true;
      }
      dragRef.current = null;
      setDragging(false);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch" || event.button !== 0) return;
    const element = scrollerRef.current;
    if (!element || element.scrollWidth <= element.clientWidth) return;
    const link = (event.target as HTMLElement).closest("a");
    if (link) link.draggable = false;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: element.scrollLeft,
      moved: false,
    };
  };

  const onClickCapture = (event: MouseEvent<HTMLElement>) => {
    if (!suppressClickRef.current) return;
    suppressClickRef.current = false;
    event.preventDefault();
    event.stopPropagation();
  };

  const canDrag = edges.left || edges.right;

  return (
    <div className="w-full min-w-0">
      <nav
        ref={scrollerRef}
        aria-label={ariaLabel}
        onPointerDown={onPointerDown}
        onClickCapture={onClickCapture}
        onDragStart={(event) => event.preventDefault()}
        className={cn(
          className,
          "w-max max-w-full",
          SCROLL_HIDE,
          canDrag && "cursor-grab",
          dragging && "cursor-grabbing select-none",
        )}
      >
        {children}
      </nav>
    </div>
  );
}
