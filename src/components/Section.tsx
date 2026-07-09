"use client";

import type { ReactNode } from "react";
import { sectionDivider, sectionShell } from "@/lib/styles";

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
      className={`${sectionShell} ${border ? sectionDivider : ""} ${className}`}
    >
      <div className={`mx-auto ${narrow ? "max-w-3xl" : "max-w-7xl"}`}>{children}</div>
    </section>
  );
}
