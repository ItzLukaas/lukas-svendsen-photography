import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Photo } from "@/components/photography/photo";
import { concertSpotlightShots } from "@/lib/data/concert-spotlight";

/**
 * Editorial concert spotlight — framed trio + confident copy.
 */
export function ConcertSpotlight() {
  const primary = concertSpotlightShots.find((s) => s.placement === "primary")!;
  const secondary = concertSpotlightShots.filter(
    (s) => s.placement === "secondary"
  );

  return (
    <section
      aria-labelledby="concert-spotlight-heading"
      className="border-t border-foreground/8 bg-mist/30"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-[var(--space-section)] md:px-8 lg:px-12">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12 lg:gap-16 xl:gap-20">
          <FadeIn className="order-2 md:order-1 md:col-span-7">
            <div className="grid aspect-[5/4] grid-cols-2 grid-rows-2 gap-3 sm:gap-4 lg:gap-5">
              <Link
                href={primary.href}
                aria-label={primary.title}
                className="group relative row-span-2 border border-foreground/12 bg-paper p-2 transition-[border-color] duration-400 hover:border-foreground/22 focus-visible:border-foreground/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink sm:p-2.5 md:p-3"
              >
                <Photo
                  src={primary.image.src}
                  alt={primary.image.alt}
                  fill
                  sizes="(min-width: 768px) 28vw, 48vw"
                  className="absolute inset-2 sm:inset-2.5 md:inset-3"
                  imageClassName="object-cover"
                  objectPosition={primary.objectPosition}
                  interactive
                  quality={88}
                />
              </Link>

              {secondary.map((shot) => (
                <Link
                  key={shot.id}
                  href={shot.href}
                  aria-label={shot.title}
                  className="group relative border border-foreground/12 bg-paper p-2 transition-[border-color] duration-400 hover:border-foreground/22 focus-visible:border-foreground/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink sm:p-2.5 md:p-3"
                >
                  <Photo
                    src={shot.image.src}
                    alt={shot.image.alt}
                    fill
                    sizes="(min-width: 768px) 22vw, 48vw"
                    className="absolute inset-2 sm:inset-2.5 md:inset-3"
                    imageClassName="object-cover"
                    objectPosition={shot.objectPosition}
                    interactive
                    quality={88}
                  />
                </Link>
              ))}
            </div>
          </FadeIn>

          <FadeIn
            delay={0.06}
            className="order-1 flex flex-col md:order-2 md:col-span-5 lg:col-span-4 lg:col-start-9"
          >
            <p className="label-meta">Live</p>
            <h3
              id="concert-spotlight-heading"
              className="mt-3 max-w-[14ch] font-display text-[clamp(1.85rem,3.8vw,2.85rem)] leading-[1.05] tracking-[-0.03em]"
            >
              Live og events
            </h3>
            <div
              className="mt-3 h-px w-[min(100%,14rem)] bg-foreground/15"
              aria-hidden
            />

            <div className="mt-6 max-w-md space-y-4 text-[0.9375rem] leading-[1.7] text-muted-ink md:mt-7 md:text-[1rem]">
              <p>
                Der sker meget på kort tid, og lyset skifter hele tiden. Jeg
                arbejder hurtigt, fanger energien og leverer billeder og film,
                der kan bruges til presse, sociale medier og efterfølgende
                kommunikation.
              </p>
            </div>

            <div className="mt-8 md:mt-10">
              <Link href="/arbejde?kategori=koncerter" className="btn-outline">
                Se livearbejde
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
