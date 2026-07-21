"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { InquiryWizard } from "@/components/inquiry/InquiryWizard";
import { sectionHeading, sectionLabel } from "@/lib/styles";

const homeSectionShell =
  "bg-background px-6 py-20 sm:py-24 lg:px-8 lg:py-32";

export function InquirySection() {
  return (
    <section
      id="foresporgsel"
      className={`relative overflow-hidden ${homeSectionShell} scroll-mt-24 border-t border-foreground/[0.06] lg:scroll-mt-28`}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 h-[36rem] w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.03] blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <ScrollReveal className="mb-12 text-center md:mb-14">
          <p className={sectionLabel}>Forespørgsel</p>
          <AnimatedHeading as="h2" className={sectionHeading}>
            Skal vi skabe noget sammen?
          </AnimatedHeading>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-[0.95rem] md:leading-[1.7]">
            Fortæl mig om dit projekt — gratis og uforpligtende. Jeg guider dig trin for trin.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-px rounded-md bg-gradient-to-b from-white/15 via-white/[0.05] to-transparent"
              aria-hidden="true"
            />
            <div className="relative rounded-md border border-border/90 bg-card/75 p-5 shadow-[var(--shadow-sm)] backdrop-blur-xl sm:p-7 lg:p-9">
              <div
                className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                aria-hidden="true"
              />
              <InquiryWizard embedded />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
