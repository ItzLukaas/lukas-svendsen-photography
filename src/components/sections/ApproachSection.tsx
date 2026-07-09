"use client";

import {
  Heart,
  MessageCircle,
  SlidersHorizontal,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { approachPoints } from "@/data/sections";
import { Section } from "../Section";
import { ScrollReveal } from "../ScrollReveal";
import { AnimatedHeading } from "../AnimatedHeading";
import { sectionBody, sectionLabel } from "@/lib/styles";

const iconMap: Record<(typeof approachPoints)[number]["icon"], LucideIcon> = {
  message: MessageCircle,
  sparkles: Sparkles,
  sliders: SlidersHorizontal,
  heart: Heart,
};

export function ApproachSection() {
  return (
    <Section>
      <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <ScrollReveal>
            <p className={sectionLabel}>Min tilgang</p>
            <AnimatedHeading className="font-display text-3xl font-light leading-tight text-white md:text-4xl lg:text-5xl">
              Min tilgang til visuelt indhold
            </AnimatedHeading>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className={`mt-8 max-w-lg ${sectionBody}`}>
              Et stærkt resultat handler ikke kun om udstyr. Det handler om stemning, timing og de små
              detaljer — uanset om det er foto, video eller drone.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {approachPoints.map((point, index) => {
            const Icon = iconMap[point.icon];
            return (
              <ScrollReveal key={point.title} delay={index * 0.08}>
                <div className="group">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-500 ease-premium group-hover:border-white/25 group-hover:text-white">
                    <Icon size={16} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm tracking-wide text-white">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/45">
                    {point.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
