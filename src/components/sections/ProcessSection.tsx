"use client";

import { processSteps } from "@/data/sections";
import { Section } from "../Section";
import { ScrollReveal } from "../ScrollReveal";
import { AnimatedHeading } from "../AnimatedHeading";
import { sectionBody, sectionLabel } from "@/lib/styles";

export function ProcessSection() {
  return (
    <Section>
      <ScrollReveal className="mb-16 text-center md:mb-20">
        <p className={sectionLabel}>Proces</p>
        <AnimatedHeading className="font-display text-3xl font-light leading-tight text-white md:text-4xl lg:text-5xl">
          Sådan foregår det
        </AnimatedHeading>
        <p className={`mx-auto mt-7 max-w-xl ${sectionBody}`}>
          En enkel og gennemsigtig proces — fra første kontakt til færdigt visuelt materiale.
        </p>
      </ScrollReveal>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {processSteps.map((step, index) => (
          <ScrollReveal key={step.step} delay={index * 0.1}>
            <div className="group relative">
              <span className="font-display text-4xl font-light text-white/15 transition-colors duration-500 ease-premium group-hover:text-white/25">
                {step.step}
              </span>
              <h3 className="mt-4 text-sm tracking-wide text-white">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/45">
                {step.description}
              </p>
              {index < processSteps.length - 1 && (
                <div
                  className="absolute top-5 -right-4 hidden h-px w-8 bg-white/10 lg:block"
                  aria-hidden="true"
                />
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
