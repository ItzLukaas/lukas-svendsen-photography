"use client";

import type { ReactNode } from "react";
import { sectionDivider } from "@/lib/styles";

const homeSectionShell =
  "bg-background px-6 py-20 sm:py-24 lg:px-8 lg:py-32";

interface SectionProps {
  children: ReactNode;
  className?: string;
  border?: boolean;
  narrow?: boolean;
  id?: string;
}

export function Section({
  children,
  className = "",
  border = true,
  narrow = false,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${homeSectionShell} ${border ? sectionDivider : ""} ${className}`}
    >
      <div className={`mx-auto ${narrow ? "max-w-3xl" : "max-w-7xl"}`}>{children}</div>
    </section>
  );
}
