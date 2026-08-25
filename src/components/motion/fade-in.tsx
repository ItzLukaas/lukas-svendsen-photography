"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  /** Animate on mount — use for above-the-fold hero content */
  immediate?: boolean;
};

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 12,
  once = true,
  immediate = false,
}: FadeInProps) {
  const reduceMotion = useReducedMotion();
  const skip = !!reduceMotion;
  /** Motion viewport.root expects a RefObject, not an Element */
  const scrollRootRef = useRef<Element | null>(null);

  useEffect(() => {
    scrollRootRef.current = document.getElementById("site-scroll");
  }, []);

  if (immediate) {
    return (
      <motion.div
        className={cn(className)}
        initial={skip ? false : { opacity: 0, y }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          skip
            ? { duration: 0 }
            : {
                duration: 0.55,
                delay,
                ease: [0.22, 1, 0.36, 1],
              }
        }
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      initial={skip ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once,
        margin: "0px 0px -6% 0px",
        amount: 0.12,
        root: scrollRootRef,
      }}
      transition={
        skip
          ? { duration: 0 }
          : {
              duration: 0.55,
              delay,
              ease: [0.22, 1, 0.36, 1],
            }
      }
    >
      {children}
    </motion.div>
  );
}
