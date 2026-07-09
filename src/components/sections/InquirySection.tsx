"use client";

import { Section } from "@/components/Section";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { InquiryWizard } from "@/components/inquiry/InquiryWizard";
import { sectionBody, sectionLabel } from "@/lib/styles";

export function InquirySection() {
  return (
    <Section id="foresporgsel" className="scroll-mt-24 lg:scroll-mt-28">
      <ScrollReveal className="mb-16 text-center md:mb-20">
        <p className={sectionLabel}>Forespørgsel</p>
        <AnimatedHeading
          as="h2"
          className="font-display text-3xl font-light leading-tight text-white md:text-4xl lg:text-5xl"
        >
          Skal vi skabe noget sammen?
        </AnimatedHeading>
        <p className={`mx-auto mt-7 max-w-xl ${sectionBody}`}>
          Fortæl mig om dit projekt — jeg guider dig trin for trin, uanset om det er foto, video eller
          drone.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="relative mx-auto max-w-3xl">
          <InquiryWizard />
        </div>
      </ScrollReveal>
    </Section>
  );
}
