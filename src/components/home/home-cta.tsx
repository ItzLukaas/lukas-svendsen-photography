import { ArrowUpRight, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { HomeCtaForm } from "@/components/home/home-cta-form";
import { FadeIn } from "@/components/motion/fade-in";
import { aboutPortrait } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site";

/**
 * Final homepage CTA — strong ink panel, one-line headline on desktop,
 * form on paper inset. Clear close before the footer.
 */
export function HomeCta() {
  return (
    <section
      id="foresporgsel"
      aria-labelledby="booking-heading"
      className="scroll-mt-[var(--chrome-h)] bg-transparent"
    >
      <div className="mx-auto max-w-[1600px] px-5 pt-[var(--space-section)] pb-[calc(var(--space-section)+0.5rem)] md:px-8 lg:px-12">
        <FadeIn y={16}>
          <div className="relative overflow-hidden bg-ink text-paper">
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden
            >
              <div className="absolute -top-28 -right-12 font-display text-[clamp(8rem,22vw,18rem)] leading-none tracking-[-0.06em] text-paper/[0.035] select-none">
                LS
              </div>
            </div>

            <div className="relative px-5 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-16 lg:py-20">
              <p className="text-[0.6875rem] font-medium tracking-[0.14em] text-paper/60 uppercase">
                Book mig
              </p>

              <h2
                id="booking-heading"
                className="mt-4 font-display text-[clamp(1.85rem,3.6vw,3rem)] leading-[1.08] tracking-[-0.035em] text-balance lg:whitespace-nowrap"
              >
                Har du et job?
              </h2>

              <div className="mt-5 h-px w-14 bg-paper/22" aria-hidden />

              <p className="mt-5 max-w-xl text-[0.9375rem] leading-[1.7] text-paper/68 md:mt-6 md:text-[1.0625rem]">
                Skriv kort, hvad du skal bruge. Så tager vi den derfra.
              </p>

              <div className="mt-10 grid items-start gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-14">
                <div className="flex flex-col gap-7 sm:flex-row sm:items-center lg:col-span-4 lg:flex-col lg:items-start lg:gap-8">
                  <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-full border border-paper/12 sm:w-28 lg:w-32">
                    <Image
                      src={aboutPortrait.src}
                      alt={aboutPortrait.alt}
                      width={aboutPortrait.width}
                      height={aboutPortrait.height}
                      sizes="128px"
                      className="h-full w-full object-cover object-[center_20%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]"
                      quality={88}
                    />
                  </div>

                  <div className="space-y-3.5">
                    <p className="text-[0.8125rem] leading-relaxed text-paper/55">
                      Personlig kontakt. Hurtigt svar.
                    </p>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="group flex items-center gap-2.5 text-[0.875rem] font-medium text-paper transition-opacity duration-300 hover:opacity-70"
                    >
                      <Phone
                        className="size-3.5 shrink-0 text-paper/55 transition-transform duration-300 group-hover:translate-x-0.5"
                        strokeWidth={1.4}
                        aria-hidden
                      />
                      <span>{siteConfig.phoneDisplay}</span>
                    </a>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="group flex items-center gap-2.5 text-[0.875rem] font-medium text-paper transition-opacity duration-300 hover:opacity-70"
                    >
                      <Mail
                        className="size-3.5 shrink-0 text-paper/55 transition-transform duration-300 group-hover:translate-x-0.5"
                        strokeWidth={1.4}
                        aria-hidden
                      />
                      <span>{siteConfig.email}</span>
                    </a>
                    <Link
                      href="/booking"
                      className="group inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-paper transition-opacity duration-300 hover:opacity-70"
                    >
                      <span>Fuld bookingformular</span>
                      <ArrowUpRight
                        className="size-3.5 text-paper/55 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.4}
                        aria-hidden
                      />
                    </Link>
                  </div>
                </div>

                <div className="border border-paper/10 bg-paper p-5 text-ink sm:p-6 md:p-8 lg:col-span-8">
                  <p className="text-[0.6875rem] font-medium tracking-[0.12em] text-muted-ink uppercase">
                    Send en forespørgsel
                  </p>
                  <HomeCtaForm />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
