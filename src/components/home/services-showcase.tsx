import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Photo } from "@/components/photography/photo";
import { creativeServices } from "@/lib/data/services";

/**
 * Three service panels — photography first, icon as accent.
 */
export function ServicesShowcase() {
  return (
    <section
      aria-labelledby="services-heading"
      className="border-y border-foreground/10 bg-[color-mix(in_srgb,var(--ink)_2.5%,var(--paper))]"
    >
      <div className="mx-auto max-w-[1120px] px-5 py-16 md:px-8 md:py-24 lg:py-28">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="label-meta">Hvad jeg tilbyder</p>
          <h2
            id="services-heading"
            className="text-balance mt-3 font-display text-[clamp(1.85rem,3.6vw,2.55rem)] leading-[1.05] tracking-[-0.028em]"
          >
            Tre discipliner. Samme blik.
          </h2>
          <p className="text-body mx-auto mt-4 max-w-md text-balance">
            Fotografi, video og drone — tre måder at fortælle den samme historie
            på, når øjeblikket sker.
          </p>
        </FadeIn>

        <ul className="mt-12 grid list-none grid-cols-1 gap-5 p-0 md:mt-16 md:grid-cols-3 md:gap-6 lg:mt-20">
          {creativeServices.map((service, index) => {
            const Icon = service.icon;

            return (
              <li key={service.id}>
                <FadeIn delay={index * 0.06}>
                  <Link
                    href={`/booking?type=${encodeURIComponent(service.bookingType)}`}
                    className="group flex h-full flex-col overflow-hidden border border-foreground/10 bg-paper transition-[border-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-foreground/20 motion-safe:hover:-translate-y-0.5"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Photo
                        src={service.image.src}
                        alt={service.image.alt}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        quality={88}
                        className="absolute inset-0"
                        imageClassName="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                      />
                      <div
                        className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0_/_0.55)_0%,rgb(0_0_0_/_0.08)_55%,transparent_100%)]"
                        aria-hidden
                      />
                      <span className="absolute top-4 right-4 text-[0.6875rem] font-medium tracking-[0.08em] text-white/75 uppercase">
                        {service.index}
                      </span>
                      <div className="absolute bottom-4 left-4 flex size-11 items-center justify-center border border-white/20 bg-paper/92 backdrop-blur-[2px] transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-paper motion-safe:group-hover:-translate-y-0.5">
                        <Icon
                          className="size-5 stroke-[1.35] text-ink"
                          aria-hidden
                        />
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-7 md:p-8">
                      <h3 className="font-display text-[clamp(1.25rem,1.8vw,1.45rem)] leading-none tracking-[-0.025em]">
                        {service.title}
                      </h3>
                      <p className="mt-3 flex-1 text-[0.8125rem] leading-[1.65] text-muted-ink">
                        {service.description}
                      </p>
                      <span className="btn-ghost mt-7 self-start pt-0.5">
                        Booking
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
