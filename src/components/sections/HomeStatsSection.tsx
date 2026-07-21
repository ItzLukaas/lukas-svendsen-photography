"use client";

import { useEffect, useRef, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { EASE_REVEAL } from "@/lib/motion";
import { sectionDivider } from "@/lib/styles";

const stats = [
  { value: 30, suffix: "+", label: "Virksomheder hjulpet", duration: 1800 },
  { value: 30000, suffix: "+", label: "Billeder taget", duration: 2400 },
  { value: 500, suffix: "+", label: "Timer brugt på redigering", duration: 2000 },
] as const;

function formatDaNumber(value: number): string {
  return new Intl.NumberFormat("da-DK").format(value);
}

function useInViewOnce<T extends Element>(ref: React.RefObject<T | null>) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const activate = () => setIsInView(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          activate();
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px" },
    );

    observer.observe(node);

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      activate();
      observer.disconnect();
    }

    return () => observer.disconnect();
  }, [ref]);

  return isInView;
}

function useCountUp(target: number, active: boolean, duration: number) {
  const [count, setCount] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!active) return;

    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    setCount(0);
    let start: number | null = null;
    let frame = 0;

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else setCount(target);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, duration, target, prefersReducedMotion]);

  return count;
}

function StatItem({
  value,
  suffix,
  label,
  duration,
  active,
  index,
}: (typeof stats)[number] & { active: boolean; index: number }) {
  const count = useCountUp(value, active, duration);

  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: EASE_REVEAL,
      }}
      className="flex flex-col items-center text-center sm:items-start sm:text-left"
    >
      <p className="stat-value tabular-nums">
        {formatDaNumber(count)}
        {suffix}
      </p>
      <p className="stat-label">{label}</p>
    </m.div>
  );
}

export function HomeStatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInViewOnce(ref);

  return (
    <section
      className={`bg-background px-6 py-14 sm:py-16 lg:px-8 lg:py-20 ${sectionDivider}`}
      aria-label="Nøgletal"
    >
      <div
        ref={ref}
        className="mx-auto grid max-w-3xl gap-10 sm:grid-cols-3 sm:gap-8"
      >
        {stats.map((stat, index) => (
          <StatItem key={stat.label} {...stat} active={isInView} index={index} />
        ))}
      </div>
    </section>
  );
}
