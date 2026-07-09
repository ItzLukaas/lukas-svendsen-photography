"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { EASE_CSS } from "@/lib/motion";

type CityRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/** Server-safe scroll reveal for SEO city pages — no framer-motion */
export function CityReveal({ children, className = "", delay = 0 }: CityRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-60px", threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayMs = Math.round(delay * 1000);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.75s ${EASE_CSS} ${delayMs}ms, transform 0.75s ${EASE_CSS} ${delayMs}ms`,
        willChange: visible ? "auto" : "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
