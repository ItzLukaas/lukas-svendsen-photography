"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { photographyTypes } from "@/data/sections";
import { Section } from "../Section";
import { ScrollReveal } from "../ScrollReveal";
import { AnimatedHeading } from "../AnimatedHeading";
import { sectionHeading, sectionLabel } from "@/lib/styles";

export function PhotographyTypesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section>
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal className="relative order-2 lg:order-1 lg:sticky lg:top-32">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-[var(--image-placeholder)] sm:aspect-[5/6]">
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
            <AnimatedHeading className={sectionHeading}>
              Hvad jeg tilbyder som fotograf
            </AnimatedHeading>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted md:text-[0.95rem] md:leading-[1.7]">
              Jeg hjælper med at skabe stærkt visuelt indhold gennem fotografering, videoproduktion og
              droneflyvning til mange forskellige formål. Se eksemplerne i kategorierne herunder, og
              kontakt mig gerne, hvis din opgave ikke står på listen — jeg tager gerne imod nye idéer og
              udfordringer.
            </p>
          </ScrollReveal>

          <div className="mt-8 divide-y divide-white/[0.06] border-y border-foreground/[0.06]">
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
                            isOpen ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"
                          }`}
                        >
                          {type.title}
                        </h3>
                        <p className="mt-1.5 max-w-md text-xs leading-relaxed text-muted">
                          {type.description}
                        </p>
                      </div>
                      <ChevronDown
                        size={16}
                        strokeWidth={1.5}
                        className={`mt-1 shrink-0 text-muted transition-transform duration-500 ease-premium ${
                          isOpen ? "rotate-180 text-foreground/70" : "group-hover:text-foreground/60"
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
                              className="flex items-center gap-3 text-xs text-muted"
                            >
                              <span className="h-px w-4 shrink-0 bg-primary/20" aria-hidden="true" />
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
