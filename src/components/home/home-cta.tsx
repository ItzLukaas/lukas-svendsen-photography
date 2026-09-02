import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";

/**
 * Final homepage CTA — invitation, not a form dump.
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
          <div className="relative overflow-hidden bg-ink px-5 py-12 text-paper sm:px-8 sm:py-14 md:px-10 md:py-16 lg:px-12">
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden
            >
              <div className="absolute -top-24 -right-8 font-display text-[clamp(7rem,20vw,16rem)] leading-none tracking-[-0.06em] text-paper/[0.035] select-none">
                LS
              </div>
            </div>

            <div className="relative max-w-3xl">
              <p className="text-[0.6875rem] font-medium tracking-[0.14em] text-paper/60 uppercase">
                Kontakt
              </p>
              <h2
                id="booking-heading"
                className="mt-4 font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.02] tracking-[-0.035em] text-balance"
              >
                Har du en opgave?
              </h2>
              <p className="mt-5 max-w-xl text-[0.9375rem] leading-[1.7] text-paper/68 md:mt-6 md:text-[1.0625rem]">
                Fortæl kort, hvad du skal bruge, så finder vi ud af resten.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4 sm:mt-10">
                <Link
                  href="/booking"
                  className="btn-solid bg-paper text-ink"
                >
                  Fortæl om din opgave
                </Link>
                <Link href="/kontakt" className="btn-ghost-on-dark">
                  Kontakt mig
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
