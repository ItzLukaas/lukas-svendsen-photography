"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { InquiryWizard } from "@/components/inquiry/InquiryWizard";
import { sectionHeading, sectionLabel } from "@/lib/styles";

const homeSectionShell =
  "bg-background px-6 py-16 sm:py-20 lg:px-8 lg:py-28";

export function InquirySection() {
  return (
    <section
      id="foresporgsel"
      className={`relative overflow-hidden ${homeSectionShell} scroll-mt-24 border-t border-foreground/[0.06] lg:scroll-mt-28`}
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 h-[32rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.025] blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <ScrollReveal className="mb-10 text-center md:mb-12">
          <p className={sectionLabel}>Forespørgsel</p>
          <AnimatedHeading as="h2" className={sectionHeading}>
            Skal vi skabe noget sammen?
          </AnimatedHeading>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-[0.95rem] md:leading-[1.7]">
            Fortæl mig om dit projekt — gratis og uforpligtende. Jeg guider dig trin for trin.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-px bg-gradient-to-b from-white/20 via-white/[0.06] to-white/[0.02]"
              aria-hidden="true"
            />
            <div className="relative rounded-md border border-border bg-card/90 p-5 shadow-[var(--shadow-sm)] backdrop-blur-md sm:p-6 lg:p-8">
              <div
                className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
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
