"use client";

import { m, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

interface SuccessCheckmarkProps {
  size?: "sm" | "md";
}

export function SuccessCheckmark({ size = "md" }: SuccessCheckmarkProps) {
  const prefersReducedMotion = useReducedMotion();
  const dim = size === "sm" ? 56 : 72;
  const stroke = size === "sm" ? 2 : 2.5;

  return (
    <m.div
      initial={prefersReducedMotion ? false : { scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="relative flex items-center justify-center rounded-full border border-foreground/20 bg-primary/[0.06] shadow-[0_0_48px_rgba(255,255,255,0.08)]"
      style={{ width: dim, height: dim }}
      aria-hidden="true"
    >
      <svg
        width={dim * 0.45}
        height={dim * 0.45}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-foreground"
      >
        <m.path
          d="M5 13l4 4L19 7"
          initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
        />
      </svg>
      {!prefersReducedMotion && (
        <m.div
          className="absolute inset-0 rounded-full border border-foreground/10"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 1.35, opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
        />
      )}
    </m.div>
  );
}
