"use client";

import { useRef } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";
import { processSteps } from "@/data/sections";
import { Section } from "../Section";
import { ScrollReveal } from "../ScrollReveal";
import { AnimatedHeading } from "../AnimatedHeading";
import { sectionBody, sectionLabel } from "@/lib/styles";
import { EASE } from "@/lib/motion";

function ProcessStep({
  step,
  index,
}: {
  step: (typeof processSteps)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();
  const animate = isInView || prefersReducedMotion;

  return (
    <m.div
      ref={ref}
      className="relative pl-12 lg:pl-0 lg:text-center"
      initial={{ opacity: 0, y: 24 }}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.1, ease: EASE }}
    >
      <m.span
        className="absolute top-0 left-0 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a] text-[10px] tracking-[0.2em] text-white/50 lg:relative lg:mx-auto"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={animate ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.55, delay: 0.15 + index * 0.1, ease: EASE }}
      >
        {step.step}
        {!prefersReducedMotion && (
          <m.span
            className="absolute inset-0 rounded-full border border-white/40"
            initial={{ scale: 1, opacity: 0 }}
            animate={animate ? { scale: 2, opacity: [0, 0.35, 0] } : {}}
            transition={{ duration: 1.4, delay: 0.35 + index * 0.1, ease: EASE }}
            aria-hidden="true"
          />
        )}
      </m.span>

      <h3 className="font-display text-lg font-light text-white lg:mt-8">{step.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/50 lg:mx-auto lg:max-w-[13rem]">
        {step.description}
      </p>
    </m.div>
  );
}

export function ProcessSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const animate = isInView || prefersReducedMotion;

  return (
    <Section>
      <div className="mb-16 md:mb-24 lg:flex lg:items-end lg:justify-between lg:gap-16">
        <ScrollReveal className="max-w-2xl">
          <p className={sectionLabel}>Proces</p>
          <AnimatedHeading className="font-display text-[2rem] font-light leading-[1.08] text-white sm:text-4xl lg:text-5xl">
            Sådan foregår det
          </AnimatedHeading>
        </ScrollReveal>
        <ScrollReveal delay={0.08} className="mt-7 max-w-md lg:mt-0 lg:text-right">
          <p className={sectionBody}>
            En enkel og gennemsigtig proces — fra første kontakt til færdigt visuelt materiale.
          </p>
        </ScrollReveal>
      </div>

      <div ref={timelineRef} className="relative">
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          aria-hidden="true"
        >
          <div className="absolute top-[1.125rem] right-[6%] left-[6%] h-px bg-white/[0.06]" />
          <m.div
            className="absolute top-[1.125rem] right-[6%] left-[6%] h-px origin-left bg-gradient-to-r from-white/10 via-white/35 to-white/10"
            initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
            animate={{ scaleX: animate ? 1 : 0 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
          />
          {processSteps.slice(0, -1).map((step, index) => (
            <m.span
              key={step.step}
              className="absolute top-[0.72rem] text-[10px] text-white/25"
              style={{ left: `${22 + index * 19}%` }}
              initial={{ opacity: 0, x: -4 }}
              animate={animate ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.15, ease: EASE }}
              aria-hidden="true"
            >
              →
            </m.span>
          ))}
        </div>

        <div
          className="absolute top-0 bottom-0 left-[1.125rem] w-px origin-top bg-white/10 lg:hidden"
          aria-hidden="true"
        >
          <m.div
            className="h-full w-full origin-top bg-gradient-to-b from-white/10 via-white/30 to-white/10"
            initial={{ scaleY: prefersReducedMotion ? 1 : 0 }}
            animate={{ scaleY: animate ? 1 : 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
          />
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step, index) => (
            <ProcessStep key={step.step} step={step} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}
