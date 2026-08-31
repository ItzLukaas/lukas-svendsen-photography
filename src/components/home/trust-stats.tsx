"use client";

import {
  useEffect,
  useRef,
  useState,
  useEffectEvent,
} from "react";
import { useReducedMotion } from "motion/react";

import { FadeIn } from "@/components/motion/fade-in";
import { homeStats, type HomeStat } from "@/lib/data/stats";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function StatValue({
  stat,
  active,
  reduceMotion,
}: {
  stat: HomeStat;
  active: boolean;
  reduceMotion: boolean;
}) {
  const [display, setDisplay] = useState(reduceMotion ? stat.value : 0);

  useEffect(() => {
    if (reduceMotion) return;
    if (!active) return;

    let frame = 0;
    const duration = 900;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(easeOutCubic(progress) * stat.value));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduceMotion, stat.value]);

  if (reduceMotion && display !== stat.value) {
    setDisplay(stat.value);
  }

  return (
    <span className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-none tracking-[-0.04em] text-ink tabular-nums">
      {stat.prefix}
      {display}
      {stat.suffix}
    </span>
  );
}

/**
 * Editorial trust strip — open layout that leads into collaborations.
 */
export function TrustStats() {
  const reduceMotion = !!useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  const onIntersect = useEffectEvent((entries: IntersectionObserverEntry[]) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      setActive(true);
    }
  });

  useEffect(() => {
    if (active) return;

    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(onIntersect, {
      threshold: 0.35,
      rootMargin: "0px 0px -8% 0px",
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [active]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="trust-stats-heading"
      className="border-t border-foreground/8 bg-transparent"
    >
      <div className="mx-auto max-w-[1600px] px-5 pt-[var(--space-section)] pb-[var(--space-section-sm)] md:px-8 lg:px-12">
        <FadeIn>
          <div className="text-center">
            <p className="label-meta">I tal</p>
            <h2
              id="trust-stats-heading"
              className="mt-3 font-display text-[clamp(1.65rem,3vw,2.25rem)] leading-[1.08] tracking-[-0.03em]"
            >
              30+ Projekter og Samarbejder
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.06}>
          <div
            className="mt-10 grid grid-cols-1 divide-y divide-foreground/10 border-y border-foreground/10 sm:mt-12 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
            role="list"
          >
            {homeStats.map((stat) => (
              <div
                key={stat.id}
                role="listitem"
                className="flex flex-col items-center px-4 py-8 text-center sm:px-8 sm:py-11 first:sm:pl-0 last:sm:pr-0"
              >
                <StatValue
                  stat={stat}
                  active={active}
                  reduceMotion={reduceMotion}
                />
                <p className="mt-3.5 max-w-[16ch] text-[0.6875rem] font-medium tracking-[0.12em] text-muted-ink uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
