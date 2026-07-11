"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { photographyTypes } from "@/data/sections";
import { Section } from "../Section";
import { ScrollReveal } from "../ScrollReveal";
import { AnimatedHeading } from "../AnimatedHeading";
import { sectionLabel } from "@/lib/styles";

export function PhotographyTypesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section>
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal className="relative order-2 lg:order-1 lg:sticky lg:top-32">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#111] sm:aspect-[5/6]">
            <Image
              src="/images/IMG_3454.webp"
              alt="Lukas Svendsen — ung fotograf og videoproducent ved kamera"
              fill
              className="object-cover object-[50%_15%]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
        </ScrollReveal>

        <div className="order-1 lg:order-2">
          <ScrollReveal>
            <p className={sectionLabel}>Eksempler</p>
            <AnimatedHeading className="font-display text-[1.65rem] font-light leading-[1.08] text-white sm:text-3xl lg:text-4xl">
              Hvad jeg tilbyder som fotograf
            </AnimatedHeading>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/55 md:text-[0.95rem] md:leading-[1.7]">
              Jeg hjælper med at skabe stærkt visuelt indhold gennem fotografering, videoproduktion og
              droneflyvning til mange forskellige formål. Se eksemplerne i kategorierne herunder, og
              kontakt mig gerne, hvis din opgave ikke står på listen — jeg tager gerne imod nye idéer og
              udfordringer.
            </p>
          </ScrollReveal>

          <div className="mt-8 divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {photographyTypes.map((type, index) => {
              const isOpen = openIndex === index;

              return (
                <ScrollReveal key={type.title} delay={index * 0.05}>
                  <div>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-start justify-between gap-4 py-4 text-left transition-colors duration-500 ease-premium"
                    >
                      <div>
                        <h3
                          className={`font-display text-lg font-light transition-colors duration-500 ease-premium sm:text-xl ${
                            isOpen ? "text-white" : "text-white/80 group-hover:text-white"
                          }`}
                        >
                          {type.title}
                        </h3>
                        <p className="mt-1.5 max-w-md text-xs leading-relaxed text-white/50">
                          {type.description}
                        </p>
                      </div>
                      <ChevronDown
                        size={16}
                        strokeWidth={1.5}
                        className={`mt-1 shrink-0 text-white/40 transition-transform duration-500 ease-premium ${
                          isOpen ? "rotate-180 text-white/70" : "group-hover:text-white/60"
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-500 ease-premium ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <ul className="space-y-1.5 pb-4 pl-1">
                          {type.examples.map((example) => (
                            <li
                              key={example}
                              className="flex items-center gap-3 text-xs text-white/50"
                            >
                              <span className="h-px w-4 shrink-0 bg-white/20" aria-hidden="true" />
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
