"use client";

import { useRef } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";
import { processSteps } from "@/data/sections";
import { Section } from "../Section";
import { ScrollReveal } from "../ScrollReveal";
import { AnimatedHeading } from "../AnimatedHeading";
import { sectionHeading, sectionLabel } from "@/lib/styles";
import { EASE_REVEAL } from "@/lib/motion";

function ProcessStep({
  step,
  index,
  animate,
}: {
  step: (typeof processSteps)[number];
  index: number;
  animate: boolean;
}) {
  return (
    <m.div
      className="process-step relative pl-14 lg:pl-0 lg:text-center"
      initial={{ opacity: 0, y: 14 }}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.72,
        delay: 0.1 + index * 0.08,
        ease: EASE_REVEAL,
      }}
    >
      <m.div
        className="process-step-marker absolute top-0 left-0 z-10 lg:relative lg:mx-auto"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={animate ? { opacity: 1, scale: 1 } : {}}
        transition={{
          duration: 0.55,
          delay: 0.18 + index * 0.08,
          ease: EASE_REVEAL,
        }}
      >
        <span className="process-step-number">{step.step}</span>
      </m.div>

      <h3 className="font-display text-base font-light text-foreground lg:mt-5">
        {step.title}
      </h3>
      <p className="mt-1.5 text-xs leading-relaxed text-muted lg:mx-auto lg:max-w-[13rem]">
        {step.description}
      </p>
    </m.div>
  );
}

export function ProcessSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const animate = isInView || Boolean(prefersReducedMotion);

  return (
    <Section>
      <div className="mb-12 md:mb-16 lg:flex lg:items-end lg:justify-between lg:gap-16">
        <ScrollReveal className="max-w-2xl">
          <p className={sectionLabel}>Proces</p>
          <AnimatedHeading className={sectionHeading}>
            Fra dit projekt til det færdige resultat
          </AnimatedHeading>
        </ScrollReveal>
        <ScrollReveal delay={0.08} className="mt-5 max-w-md lg:mt-0 lg:text-right">
          <p className="text-sm leading-relaxed text-muted md:text-[0.95rem] md:leading-[1.7]">
            En enkel proces — fra første besked til det færdige resultat. Du får løbende dialog undervejs,
            så du altid ved, hvor du er i forløbet som kunde.
          </p>
        </ScrollReveal>
      </div>

      <div ref={timelineRef} className="process-timeline relative">
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          aria-hidden="true"
        >
          <div className="process-timeline-rail" />
          <m.div
            className="process-timeline-rail-progress"
            initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
            animate={{ scaleX: animate ? 1 : 0 }}
            transition={{ duration: 1.15, ease: EASE_REVEAL, delay: 0.08 }}
          />
        </div>

        <div
          className="process-timeline-rail-vertical absolute top-0 bottom-0 left-[1.375rem] w-px lg:hidden"
          aria-hidden="true"
        >
          <m.div
            className="process-timeline-rail-progress-vertical h-full w-full origin-top"
            initial={{ scaleY: prefersReducedMotion ? 1 : 0 }}
            animate={{ scaleY: animate ? 1 : 0 }}
            transition={{ duration: 1, ease: EASE_REVEAL, delay: 0.08 }}
          />
        </div>

        <div className="grid gap-9 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-6">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={step.step}
              step={step}
              index={index}
              animate={animate}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
