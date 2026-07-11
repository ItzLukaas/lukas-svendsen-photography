"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 100, suffix: "+", label: "Portrætbilleder", duration: 1800 },
  { value: 999, suffix: "+", label: "Håndboldbilleder", duration: 2600 },
] as const;

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
      { threshold: 0.15, rootMargin: "0px" },
    );

    observer.observe(node);

    // Element kan allerede være synligt ved page load
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

  useEffect(() => {
    if (!active) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
  }, [active, duration, target]);

  return count;
}

function StatCounter({
  value,
  suffix,
  label,
  duration,
  active,
}: (typeof stats)[number] & { active: boolean }) {
  const count = useCountUp(value, active, duration);

  return (
    <div>
      <p className="font-display text-2xl font-light tabular-nums text-foreground">
        {count}
        {suffix}
      </p>
      <p className="mt-1.5 text-xs tracking-widest text-muted uppercase">{label}</p>
    </div>
  );
}

export function AboutStats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInViewOnce(ref);

  return (
    <div ref={ref} className="mt-14 flex flex-wrap gap-10 sm:gap-12">
      {stats.map((stat) => (
        <StatCounter key={stat.label} {...stat} active={isInView} />
      ))}
    </div>
  );
}
