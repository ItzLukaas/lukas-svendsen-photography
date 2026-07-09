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
      <ScrollReveal className="mb-16 text-center md:mb-20">
        <p className={sectionLabel}>Tillid</p>
        <AnimatedHeading className="font-display text-3xl font-light leading-tight text-white md:text-4xl lg:text-5xl">
          Ord fra kunder
        </AnimatedHeading>
      </ScrollReveal>

      <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
        {testimonials.map((item, index) => (
          <ScrollReveal key={index} delay={index * 0.1}>
            <blockquote className="border border-white/5 p-8 transition-all duration-500 ease-premium hover:border-white/10 lg:p-10">
              <Quote
                size={20}
                strokeWidth={1.5}
                className="text-white/20"
                aria-hidden="true"
              />
              <p className="mt-5 text-base leading-relaxed text-white/60 italic">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-6 text-xs tracking-widest text-white/30 uppercase">
                {item.author}
              </footer>
            </blockquote>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
