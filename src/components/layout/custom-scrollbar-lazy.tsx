"use client";

import dynamic from "next/dynamic";

const CustomScrollbar = dynamic(
  () =>
    import("@/components/layout/custom-scrollbar").then(
      (mod) => mod.CustomScrollbar
    ),
  { ssr: false }
);

/** Client island so root layout can defer the scrollbar without ssr:false in RSC. */
export function CustomScrollbarLazy() {
  return <CustomScrollbar />;
}
