"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { photographyTypes } from "@/data/sections";
import { Section } from "../Section";
import { ScrollReveal } from "../ScrollReveal";
import { AnimatedHeading } from "../AnimatedHeading";
import { sectionBody, sectionLabel } from "@/lib/styles";

export function PhotographyTypesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section>
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
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
            <AnimatedHeading className="font-display text-[2rem] font-light leading-[1.08] text-white sm:text-4xl lg:text-5xl">
              Hvad jeg laver
            </AnimatedHeading>
            <p className={`mt-7 max-w-lg ${sectionBody}`}>
              Jeg laver foto, video og drone til mange forskellige projekter. Klik på en kategori
              for at se eksempler — og skriv endelig, hvis dit projekt ikke står på listen.
            </p>
          </ScrollReveal>

          <div className="mt-10 divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {photographyTypes.map((type, index) => {
              const isOpen = openIndex === index;

              return (
                <ScrollReveal key={type.title} delay={index * 0.05}>
                  <div>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-start justify-between gap-4 py-6 text-left transition-colors duration-500 ease-premium"
                    >
                      <div>
                        <h3
                          className={`font-display text-xl font-light transition-colors duration-500 ease-premium sm:text-2xl ${
                            isOpen ? "text-white" : "text-white/80 group-hover:text-white"
                          }`}
                        >
                          {type.title}
                        </h3>
                        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/50">
                          {type.description}
                        </p>
                      </div>
                      <ChevronDown
                        size={18}
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
                        <ul className="space-y-2 pb-6 pl-1">
                          {type.examples.map((example) => (
                            <li
                              key={example}
                              className="flex items-center gap-3 text-sm text-white/50"
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
