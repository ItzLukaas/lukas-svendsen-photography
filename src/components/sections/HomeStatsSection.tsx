"use client";

import { useEffect, useRef, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { EASE_REVEAL } from "@/lib/motion";
import { sectionDivider } from "@/lib/styles";

const stats = [
  { value: 30, suffix: "+", label: "Virksomheder hjulpet", duration: 2000 },
  { value: 30000, suffix: "+", label: "Billeder taget", duration: 2800 },
  { value: 500, suffix: "+", label: "Timer brugt på redigering", duration: 2400 },
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
      { threshold: 0.2, rootMargin: "0px" },
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
      initial={{ opacity: 0, y: 14 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.72,
        delay: index * 0.1,
        ease: EASE_REVEAL,
      }}
      className="flex flex-col items-center text-center"
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
      className={`relative overflow-hidden bg-background px-6 py-20 sm:py-24 lg:px-8 lg:py-32 ${sectionDivider}`}
      aria-label="Nøgletal"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 h-[28rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.02] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <ScrollReveal className="mb-14 text-center md:mb-20">
          <p className="text-[10px] tracking-[0.35em] text-muted uppercase">
            Erfaring
          </p>
        </ScrollReveal>

        <div
          ref={ref}
          className="grid gap-14 sm:grid-cols-3 sm:gap-8 md:gap-12"
        >
          {stats.map((stat, index) => (
            <StatItem key={stat.label} {...stat} active={isInView} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
