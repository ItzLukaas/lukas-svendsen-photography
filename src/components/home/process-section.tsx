"use client";

import Link from "next/link";
import {
  motion,
  useInView,
  useReducedMotion,
  type Transition,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

import { FadeIn } from "@/components/motion/fade-in";
import { processSteps } from "@/lib/data/process-steps";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;
const lineDuration = 2.6;
const lineTransition: Transition = {
  duration: lineDuration,
  ease,
};

function ProcessNode({
  step,
  active,
  reached,
}: {
  step: number;
  active: boolean;
  reached: boolean;
}) {
  const label = String(step).padStart(2, "0");

  return (
    <div
      className={cn(
        "relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border transition-[border-color,background-color,color,box-shadow] duration-500 ease-out",
        reached
          ? "border-ink bg-ink text-paper shadow-[0_0_0_4px_rgb(23_23_22_/_0.06)]"
          : "border-foreground/18 bg-paper text-muted-ink",
        active && reached && "shadow-[0_0_0_5px_rgb(23_23_22_/_0.08)]"
      )}
      aria-hidden
    >
      <span className="font-mono text-[0.6875rem] font-medium tracking-[0.12em]">
        {label}
      </span>
    </div>
  );
}

function DesktopConnector({
  animate,
  reduceMotion,
}: {
  animate: boolean;
  reduceMotion: boolean;
}) {
  const showComplete = reduceMotion || animate;

  return (
    <div
      className="pointer-events-none absolute top-[1.125rem] right-[calc(16.666%-1.125rem)] left-[calc(16.666%-1.125rem)] hidden h-9 lg:block"
      aria-hidden
    >
      <div className="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 bg-foreground/10" />
      <motion.div
        className="absolute top-1/2 left-0 h-px -translate-y-1/2 bg-foreground/30"
        initial={{ width: "0%" }}
        animate={{ width: showComplete ? "100%" : "0%" }}
        transition={reduceMotion ? { duration: 0 } : lineTransition}
      />
      {!reduceMotion ? (
        <motion.div
          className="absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink shadow-[0_0_10px_rgb(23_23_22_/_0.28)]"
          initial={{ left: "0%" }}
          animate={{ left: animate ? ["0%", "50%", "100%"] : "0%" }}
          transition={
            animate
              ? {
                  duration: lineDuration,
                  ease,
                  times: [0, 0.5, 1],
                }
              : { duration: 0 }
          }
        />
      ) : null}
    </div>
  );
}

function MobileConnector({
  filled,
  reduceMotion,
}: {
  filled: boolean;
  reduceMotion: boolean;
}) {
  return (
    <div
      className="relative my-2 h-10 w-9 shrink-0 lg:hidden"
      aria-hidden
    >
      <div className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-foreground/10" />
      <motion.div
        className="absolute top-0 left-1/2 w-px -translate-x-1/2 bg-foreground/30"
        initial={{ height: "0%" }}
        animate={{ height: filled || reduceMotion ? "100%" : "0%" }}
        transition={
          reduceMotion ? { duration: 0 } : { duration: 0.55, ease }
        }
      />
    </div>
  );
}

/**
 * Process — connected steps with a single animated journey line.
 */
export function ProcessSection() {
  const reduceMotion = !!useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRootRef = useRef<Element | null>(null);
  const [activeIndex, setActiveIndex] = useState(
    reduceMotion ? processSteps.length - 1 : -1
  );
  const [lineActive, setLineActive] = useState(reduceMotion);

  useEffect(() => {
    scrollRootRef.current = document.getElementById("site-scroll");
  }, []);

  const inView = useInView(sectionRef, {
    once: true,
    amount: 0.28,
    root: scrollRootRef,
  });

  useEffect(() => {
    if (!inView) return;

    if (reduceMotion) {
      setActiveIndex(processSteps.length - 1);
      setLineActive(true);
      return;
    }

    setActiveIndex(0);
    setLineActive(true);

    const stepTwo = window.setTimeout(() => setActiveIndex(1), 900);
    const stepThree = window.setTimeout(
      () => setActiveIndex(processSteps.length - 1),
      1800
    );

    return () => {
      window.clearTimeout(stepTwo);
      window.clearTimeout(stepThree);
    };
  }, [inView, reduceMotion]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="process-heading"
      className="border-t border-foreground/8 bg-mist/25"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-[var(--space-section)] md:px-8 lg:px-12">
        <FadeIn>
          <p className="label-meta">Proces</p>
          <h2
            id="process-heading"
            className="mt-3 max-w-[18ch] font-display text-[clamp(1.9rem,4.4vw,3.15rem)] leading-[1.05] tracking-[-0.035em] text-ink"
          >
            Sådan foregår det
          </h2>
        </FadeIn>

        <ol
          role="list"
          className="relative mt-10 m-0 list-none p-0 sm:mt-12 lg:mt-14"
        >
          <DesktopConnector animate={lineActive} reduceMotion={reduceMotion} />

          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
            {processSteps.map((item, index) => {
              const reached = activeIndex >= index;
              const current = activeIndex === index;
              const isLast = index === processSteps.length - 1;

              return (
                <li
                  key={item.id}
                  className={cn(
                    "relative",
                    !isLast && "pb-2 lg:pb-0"
                  )}
                >
                  <div className="flex gap-4 lg:block lg:gap-0">
                    <div className="flex flex-col items-center lg:items-start">
                      <ProcessNode
                        step={item.step}
                        active={current}
                        reached={reached}
                      />
                      {!isLast ? (
                        <MobileConnector
                          filled={activeIndex > index}
                          reduceMotion={reduceMotion}
                        />
                      ) : null}
                    </div>

                    <div className="min-w-0 pt-0.5 lg:mt-5 lg:pt-0">
                      <h3
                        className={cn(
                          "font-display text-[1.125rem] leading-[1.2] tracking-[-0.022em] transition-colors duration-500 md:text-[1.2rem]",
                          reached ? "text-ink" : "text-muted-ink/80"
                        )}
                      >
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-[42ch] text-[0.875rem] leading-[1.65] text-muted-ink md:text-[0.9375rem]">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </div>
        </ol>

        <FadeIn delay={0.14}>
          <div className="mt-10 sm:mt-12">
            <Link href="/booking" className="btn-solid bg-ink text-paper">
              Book en opgave
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
