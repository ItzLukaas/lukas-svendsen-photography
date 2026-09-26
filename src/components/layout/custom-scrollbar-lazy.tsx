"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CustomScrollbar = dynamic(
  () =>
    import("@/components/layout/custom-scrollbar").then(
      (mod) => mod.CustomScrollbar
    ),
  { ssr: false }
);

/** Defer the custom scrollbar until the browser is idle — not on the critical path. */
export function CustomScrollbarLazy() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof win.requestIdleCallback === "function") {
      const id = win.requestIdleCallback(() => setReady(true), { timeout: 1800 });
      return () => win.cancelIdleCallback?.(id);
    }

    const timer = window.setTimeout(() => setReady(true), 1);
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) return null;
  return <CustomScrollbar />;
}
