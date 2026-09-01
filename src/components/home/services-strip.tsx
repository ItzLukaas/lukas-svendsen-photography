import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { homeServices, videoServiceFeatures } from "@/lib/data/services";

/**
 * Clear service offers — scannable, icon-led, each path leads to booking.
 * Content expands below as a natural extension of foto, video and drone.
 */
export function ServicesStrip() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-[var(--chrome-h)] border-t border-foreground/8 bg-transparent"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-[var(--space-section-sm)] md:px-8 lg:px-12">
        <FadeIn>
          <p className="label-meta">Ydelser</p>
          <h2
            id="services-heading"
            className="mt-3 font-display text-[clamp(1.55rem,2.8vw,2.1rem)] leading-[1.08] tracking-[-0.03em]"
          >
            Foto, video og content
          </h2>
          <p className="mt-3 max-w-[56ch] text-[0.9375rem] leading-[1.65] text-muted-ink">
            Jeg laver foto og video til hjemmesider, sociale medier og
            kampagner. For private handler det ofte om at få en dag eller et
            øjeblik fanget ordentligt.
          </p>
        </FadeIn>

        <ul className="mt-8 m-0 grid list-none grid-cols-1 gap-px border border-foreground/10 bg-foreground/10 p-0 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {homeServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <li key={service.id} className="bg-paper">
                <FadeIn
                  delay={Math.min(0.04 + index * 0.05, 0.16)}
                  className="h-full"
                >
                  <Link
                    href={`/booking?type=${encodeURIComponent(service.bookingType)}`}
                    className="group flex h-full flex-col px-5 py-7 transition-[background-color] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-mist/70 focus-visible:bg-mist/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ink sm:px-6 sm:py-8 md:px-7 md:py-9"
                  >
                    <span className="flex size-9 items-center justify-center border border-foreground/12 transition-[border-color,background-color] duration-400 group-hover:border-foreground/28 group-hover:bg-paper">
                      <Icon
                        aria-hidden
                        className="size-3.5 text-ink transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-px"
                        strokeWidth={1.4}
                      />
                    </span>

                    <h3 className="mt-6 font-display text-[1.125rem] leading-[1.15] tracking-[-0.022em] text-ink md:text-[1.2rem]">
                      {service.title}
                    </h3>
                    <p className="mt-2 max-w-[36ch] text-[0.875rem] leading-[1.6] text-muted-ink">
                      {service.description}
                    </p>

                    <span className="mt-auto inline-flex items-center gap-0 pt-7 text-[0.75rem] font-semibold tracking-[0.055em] text-ink transition-[gap] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:gap-[0.55em]">
                      Book mig
                      <span
                        aria-hidden
                        className="inline-block max-w-0 overflow-hidden opacity-0 transition-[max-width,opacity,transform] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-[1.1em] group-hover:translate-x-0 group-hover:opacity-100 -translate-x-[0.3em]"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                </FadeIn>
              </li>
            );
          })}
        </ul>

        <FadeIn delay={0.08}>
          <p className="mt-6">
            <Link
              href="/arbejde"
              className="group inline-flex items-center gap-0 text-[0.75rem] font-semibold tracking-[0.055em] text-ink transition-[gap] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:gap-[0.55em]"
            >
              Se mit arbejde
              <span
                aria-hidden
                className="inline-block max-w-0 overflow-hidden opacity-0 transition-[max-width,opacity,transform] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-[1.1em] group-hover:translate-x-0 group-hover:opacity-100 -translate-x-[0.3em]"
              >
                →
              </span>
            </Link>
          </p>
        </FadeIn>

        <div className="mt-10 border-t border-foreground/8 pt-10 sm:mt-12 sm:pt-12">
          <div className="mx-auto flex max-w-full flex-col items-center">
            <FadeIn className="max-w-full text-center">
              <h3
                id="video-drone-heading"
                className="font-display text-[clamp(1.55rem,2.8vw,2.1rem)] leading-[1.08] tracking-[-0.03em] text-ink"
              >
                Video og drone
              </h3>
              <p className="mx-auto mt-3 max-w-[52ch] text-[0.9375rem] leading-[1.65] text-muted-ink">
                Jeg filmer og bruger drone, når opgaven kræver det. Det kan være
                en del af en større produktion eller stå alene.
              </p>
            </FadeIn>

            <ul className="mt-8 m-0 grid w-fit max-w-full list-none grid-cols-1 gap-8 p-0 text-left sm:mt-10 sm:grid-cols-[auto_auto] sm:gap-x-10 sm:gap-y-9 lg:gap-x-14">
              {videoServiceFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <li
                    key={feature.id}
                    className="max-w-[min(100%,calc(42ch+2.875rem))]"
                  >
                    <FadeIn delay={Math.min(0.04 + index * 0.05, 0.18)}>
                      <div className="flex items-start gap-3.5">
                        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center border border-foreground/12">
                          <Icon
                            aria-hidden
                            className="size-3.5 text-ink"
                            strokeWidth={1.4}
                          />
                        </span>
                        <div className="min-w-0 max-w-[42ch]">
                          <h4 className="font-display text-[1.0625rem] leading-[1.2] tracking-[-0.02em] text-ink md:text-[1.125rem]">
                            {feature.title}
                          </h4>
                          <p className="mt-2.5 text-[0.875rem] leading-[1.65] text-muted-ink md:text-[0.9375rem]">
                            {feature.body}
                          </p>
                        </div>
                      </div>
                    </FadeIn>
                  </li>
                );
              })}
            </ul>

            <FadeIn delay={0.12}>
              <div className="mt-9 sm:mt-10">
                <Link
                  href="/booking?type=Content"
                  className="group inline-flex items-center gap-0 text-[0.75rem] font-semibold tracking-[0.055em] text-ink transition-[gap] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:gap-[0.55em]"
                >
                  Book content
                  <span
                    aria-hidden
                    className="inline-block max-w-0 overflow-hidden opacity-0 transition-[max-width,opacity,transform] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-[1.1em] group-hover:translate-x-0 group-hover:opacity-100 -translate-x-[0.3em]"
                  >
                    →
                  </span>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
