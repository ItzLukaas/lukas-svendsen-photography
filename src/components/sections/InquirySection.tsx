"use client";

import { ObfuscatedEmail } from "@/components/ObfuscatedEmail";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { InquiryWizard } from "@/components/inquiry/InquiryWizard";
import { sectionBody, sectionLabel, sectionShell } from "@/lib/styles";

export function InquirySection() {
  return (
    <section
      id="foresporgsel"
      className={`relative overflow-hidden ${sectionShell} scroll-mt-24 border-t border-white/[0.06] lg:scroll-mt-28`}
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 h-[32rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <ScrollReveal className="mb-12 text-center md:mb-16">
          <p className={sectionLabel}>Forespørgsel</p>
          <AnimatedHeading
            as="h2"
            className="font-display text-[2rem] font-light leading-[1.08] text-white sm:text-4xl lg:text-5xl"
          >
            Skal vi skabe noget sammen?
          </AnimatedHeading>
          <p className={`mx-auto mt-7 max-w-xl ${sectionBody}`}>
            Fortæl mig om dit projekt — gratis og uforpligtende. Jeg guider dig trin for trin.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-px bg-gradient-to-b from-white/20 via-white/[0.06] to-white/[0.02]"
              aria-hidden="true"
            />
            <div className="relative border border-white/10 bg-[#0c0c0c]/90 p-6 backdrop-blur-md sm:p-8 lg:p-10">
              <div
                className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
                aria-hidden="true"
              />
              <InquiryWizard embedded />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="mt-8 text-center text-sm text-white/50">
            Eller skriv direkte til{" "}
            <ObfuscatedEmail className="text-white/60 underline decoration-white/20 underline-offset-4 transition-colors duration-500 ease-premium hover:text-white" />
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
