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
import { sectionHeading, sectionLabel } from "@/lib/styles";

type ApproachIcon = "message" | "sparkles" | "sliders" | "heart";

const iconMap: Record<ApproachIcon, LucideIcon> = {
  message: MessageCircle,
  sparkles: Sparkles,
  sliders: SlidersHorizontal,
  heart: Heart,
};

export function ApproachSection() {
  return (
    <Section>
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <ScrollReveal>
            <p className={sectionLabel}>Min tilgang</p>
            <AnimatedHeading className={sectionHeading}>
              Sådan arbejder jeg som fotograf
            </AnimatedHeading>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/55 md:text-[0.95rem] md:leading-[1.7]">
              Du fortæller blot, hvad du har brug for. Jeg hjælper med at omsætte dine idéer til det
              færdige resultat, står for processen og sørger for, at alt bliver håndteret fra start til
              slut. Som fotograf i Grindsted lægger jeg vægt på tydelig kommunikation, god planlægning
              og levering af materiale, der er klar til web, sociale medier og tryk.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {approachPoints.map((point, index) => {
            const Icon = iconMap[point.icon];
            return (
              <ScrollReveal key={point.title} delay={index * 0.08}>
                <div className="group">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-500 ease-premium group-hover:border-white/25 group-hover:text-white">
                    <Icon size={15} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xs tracking-wide text-white">{point.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/45">
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
