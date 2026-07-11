"use client";

import { m, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { EASE } from "@/lib/motion";

interface AnimatedHeadingProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
  id?: string;
}

export function AnimatedHeading({
  children,
  className = "",
  as: Tag = "h2",
  delay = 0,
  id,
}: AnimatedHeadingProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <m.div
      initial={{ opacity: 1, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className="will-change-transform"
    >
      <Tag id={id} className={className}>
        {children}
      </Tag>
    </m.div>
  );
}
