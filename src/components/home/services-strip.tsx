import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { homeServices } from "@/lib/data/services";

/**
 * Clear service offers — scannable, icon-led, each path leads to booking.
 */
export function ServicesStrip() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-[var(--chrome-h)] border-y border-foreground/8 bg-transparent"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-[var(--space-section-sm)] md:px-8 lg:px-12">
        <FadeIn>
          <p className="label-meta">Ydelser</p>
          <h2
            id="services-heading"
            className="mt-3 font-display text-[clamp(1.55rem,2.8vw,2.1rem)] leading-[1.08] tracking-[-0.03em]"
          >
            Hvad jeg leverer
          </h2>
        </FadeIn>

        <ul className="mt-8 m-0 grid list-none grid-cols-1 gap-px border border-foreground/10 bg-foreground/10 p-0 sm:mt-10 sm:grid-cols-3">
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
                    className="group flex h-full flex-col px-5 py-7 outline-none transition-[background-color] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-mist/70 focus-visible:bg-mist/70 sm:px-6 sm:py-8 md:px-8 md:py-9"
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
                    <p className="mt-2 max-w-[28ch] text-[0.875rem] leading-[1.6] text-muted-ink">
                      {service.description}
                    </p>

                    <span className="mt-auto pt-7 inline-flex items-center gap-1.5 text-[0.75rem] font-semibold tracking-[0.055em] text-ink">
                      Book mig
                      <ArrowUpRight
                        aria-hidden
                        className="size-3.5 text-muted-ink transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.5}
                      />
                    </span>
                  </Link>
                </FadeIn>
              </li>
            );
          })}
        </ul>

        <FadeIn delay={0.12} className="mt-8 sm:mt-10">
          <Link
            href="/arbejde"
            className="link-quiet inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink underline-offset-4 hover:underline"
          >
            Se udvalgte jobs
            <ArrowUpRight className="size-3.5 text-muted-ink" strokeWidth={1.5} aria-hidden />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
