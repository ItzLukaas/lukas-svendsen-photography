"use client";

import { Quote } from "lucide-react";
import { testimonials } from "@/data/sections";
import { Section } from "../Section";
import { ScrollReveal } from "../ScrollReveal";
import { AnimatedHeading } from "../AnimatedHeading";
import { sectionLabel } from "@/lib/styles";

export function TestimonialsSection() {
  return (
    <Section>
      <ScrollReveal className="mb-16 text-center md:mb-24">
        <p className={sectionLabel}>Tillid</p>
        <AnimatedHeading className="font-display text-[2rem] font-light leading-[1.08] text-white sm:text-4xl lg:text-5xl">
          Ord fra samarbejdspartnere
        </AnimatedHeading>
      </ScrollReveal>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        {testimonials.map((item, index) => (
          <ScrollReveal key={index} delay={index * 0.1}>
            <blockquote className="relative border border-white/5 bg-white/[0.02] p-10 transition-all duration-500 ease-premium hover:border-white/10 lg:p-12">
              <Quote
                size={24}
                strokeWidth={1}
                className="text-white/15"
                aria-hidden="true"
              />
              <p className="mt-8 font-display text-2xl font-light leading-snug text-white/75 italic lg:text-[1.65rem]">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-8 border-t border-white/[0.06] pt-6 text-xs tracking-[0.25em] text-white/35 uppercase">
                {item.author}
              </footer>
            </blockquote>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
