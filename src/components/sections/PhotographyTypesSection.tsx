"use client";

import {
  Calendar,
  Lightbulb,
  User,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { photographyTypes } from "@/data/sections";
import { Section } from "../Section";
import { ScrollReveal } from "../ScrollReveal";
import { AnimatedHeading } from "../AnimatedHeading";
import { sectionBody, sectionLabel } from "@/lib/styles";

const iconMap: Record<(typeof photographyTypes)[number]["icon"], LucideIcon> = {
  user: User,
  calendar: Calendar,
  zap: Zap,
  lightbulb: Lightbulb,
};

export function PhotographyTypesSection() {
  return (
    <Section>
      <ScrollReveal className="mb-16 text-center md:mb-20">
        <p className={sectionLabel}>Projekttyper</p>
        <AnimatedHeading className="font-display text-3xl font-light leading-tight text-white md:text-4xl lg:text-5xl">
          Hvem jeg arbejder med
        </AnimatedHeading>
        <p className={`mx-auto mt-7 max-w-xl ${sectionBody}`}>
          Sport, events, portrætter og virksomheder — jeg arbejder med dem, der vil have visuelt
          indhold med personlighed og kvalitet.
        </p>
      </ScrollReveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
        {photographyTypes.map((type, index) => {
          const Icon = iconMap[type.icon];
          return (
            <ScrollReveal key={type.title} delay={index * 0.08}>
              <div className="group border border-white/5 p-8 transition-all duration-500 ease-premium hover:-translate-y-px hover:border-white/15 hover:bg-white/[0.02] lg:p-10">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-500 ease-premium group-hover:border-white/25 group-hover:text-white">
                  <Icon size={16} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-light text-white">
                  {type.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/45">
                  {type.description}
                </p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </Section>
  );
}
