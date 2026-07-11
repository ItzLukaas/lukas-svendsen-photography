"use client";

import { ChevronDown } from "lucide-react";

export function HeroScrollIndicator() {
  return (
    <div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-hero-bounce"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-2.5">
        <span className="text-[10px] tracking-[0.3em] text-muted uppercase">
          Scroll
        </span>
        <ChevronDown size={14} strokeWidth={1.5} className="text-muted-subtle" />
      </div>
    </div>
  );
}
