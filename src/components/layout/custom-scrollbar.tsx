"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Draws a brand ink scrollbar for #site-scroll and hides the native OS bar.
 * Native ::-webkit-scrollbar is unreliable on Windows overlay/Fluent scrollbars.
 */
export function CustomScrollbar() {
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startY: number; startTop: number } | null>(null);
  const [visible, setVisible] = useState(false);
  const [metrics, setMetrics] = useState({ top: 0, height: 40 });

  const update = useCallback(() => {
    const root = document.getElementById("site-scroll");
    if (!root) return;

    const { scrollTop, scrollHeight, clientHeight } = root;
    const canScroll = scrollHeight > clientHeight + 1;
    setVisible(canScroll);

    if (!canScroll) return;

    const trackHeight = clientHeight;
    const ratio = clientHeight / scrollHeight;
    const thumbHeight = Math.max(48, Math.round(trackHeight * ratio));
    const maxTop = trackHeight - thumbHeight;
    const top =
      maxTop <= 0
        ? 0
        : Math.round((scrollTop / (scrollHeight - clientHeight)) * maxTop);

    setMetrics({ top, height: thumbHeight });
  }, []);

  useEffect(() => {
    const root = document.getElementById("site-scroll");
    if (!root) return;

    const frame = window.requestAnimationFrame(() => update());
    root.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const ro = new ResizeObserver(update);
    ro.observe(root);
    if (root.firstElementChild) ro.observe(root.firstElementChild);

    return () => {
      window.cancelAnimationFrame(frame);
      root.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, [update]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      const root = document.getElementById("site-scroll");
      if (!drag || !root) return;

      const { scrollHeight, clientHeight } = root;
      const maxScroll = scrollHeight - clientHeight;
      const maxTop = clientHeight - metrics.height;
      if (maxTop <= 0 || maxScroll <= 0) return;

      const nextTop = Math.min(
        maxTop,
        Math.max(0, drag.startTop + (event.clientY - drag.startY))
      );
      root.scrollTop = (nextTop / maxTop) * maxScroll;
    };

    const onUp = () => {
      dragRef.current = null;
      document.body.style.userSelect = "";
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [metrics.height]);

  if (!visible) return null;

  return (
    <div
      ref={trackRef}
      aria-hidden
      className="pointer-events-none fixed inset-y-0 right-0 z-[60] hidden w-3.5 border-l border-ink/10 bg-paper md:block"
    >
      <div
        ref={thumbRef}
        className="pointer-events-auto absolute right-1 w-2 cursor-pointer rounded-full bg-[rgba(14,14,14,0.7)] transition-[background-color] duration-200 hover:bg-[rgba(14,14,14,0.88)] active:bg-[rgba(14,14,14,0.96)]"
        style={{ top: metrics.top, height: metrics.height }}
        onPointerDown={(event) => {
          event.preventDefault();
          dragRef.current = {
            startY: event.clientY,
            startTop: metrics.top,
          };
          document.body.style.userSelect = "none";
        }}
      />
    </div>
  );
}
