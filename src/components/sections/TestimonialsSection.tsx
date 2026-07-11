"use client";

import { Quote } from "lucide-react";
import { testimonials } from "@/data/sections";
import { Section } from "../Section";
import { ScrollReveal } from "../ScrollReveal";
import { AnimatedHeading } from "../AnimatedHeading";
import { sectionHeading, sectionLabel } from "@/lib/styles";

export function TestimonialsSection() {
  return (
    <Section>
      <ScrollReveal className="mb-12 text-center md:mb-16">
        <p className={sectionLabel}>Tillid</p>
        <AnimatedHeading className={sectionHeading}>
          Ord fra samarbejdspartnere
        </AnimatedHeading>
      </ScrollReveal>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        {testimonials.map((item, index) => (
          <ScrollReveal key={index} delay={index * 0.1}>
            <blockquote className="relative border border-foreground/5 bg-accent p-8 transition-all duration-500 ease-premium hover:border-border lg:p-10">
              <Quote
                size={20}
                strokeWidth={1}
                className="text-foreground/15"
                aria-hidden="true"
              />
              <p className="mt-6 font-display text-xl font-light leading-snug text-foreground/75 italic lg:text-2xl">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-6 border-t border-foreground/[0.06] pt-5 text-[10px] tracking-[0.25em] text-muted uppercase">
                {item.author}
              </footer>
            </blockquote>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
