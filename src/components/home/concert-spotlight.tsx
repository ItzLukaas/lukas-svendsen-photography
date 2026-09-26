"use client";

import Link from "next/link";

import { useLocale } from "@/components/i18n/locale-provider";
import { FadeIn } from "@/components/motion/fade-in";
import { Photo } from "@/components/photography/photo";
import { concertSpotlightShots } from "@/lib/data/concert-spotlight";
import { localizeImageAlt } from "@/lib/i18n/localize-content";
import { localizedHref } from "@/lib/i18n/paths";

const spotlightCopyEn: Record<
  string,
  { title: string; alt: string }
> = {
  portrait: {
    title: "Sport, Fredericia",
    alt: "Handball player celebrating a goal in Fredericia",
  },
  live: {
    title: "Concert photography, live performance",
    alt: "Sofie1998 on stage at Varde Open Air",
  },
  stage: {
    title: "Sivas, Grøn Koncert",
    alt: "Sivas smiling on stage at Grøn Koncert",
  },
};

/**
 * Editorial photography spotlight — framed trio + confident copy.
 */
export function ConcertSpotlight() {
  const { locale, dict } = useLocale();
  const primary = concertSpotlightShots.find((s) => s.placement === "primary")!;
  const secondary = concertSpotlightShots.filter(
    (s) => s.placement === "secondary"
  );

  function localizedShot(shot: (typeof concertSpotlightShots)[number]) {
    const en = spotlightCopyEn[shot.id];
    return {
      ...shot,
      href: localizedHref(shot.href, locale),
      title: locale === "en" && en ? en.title : shot.title,
      image: {
        ...shot.image,
        alt:
          locale === "en" && en
            ? en.alt
            : localizeImageAlt(shot.image.alt, locale),
      },
    };
  }

  const primaryLoc = localizedShot(primary);
  const secondaryLoc = secondary.map(localizedShot);

  return (
    <section
      aria-labelledby="photography-spotlight-heading"
      className="border-t border-foreground/8"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-[var(--space-section)] md:px-8 lg:px-12">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12 lg:gap-16 xl:gap-20">
          <FadeIn className="order-2 md:order-1 md:col-span-7">
            <div className="grid aspect-[5/4] grid-cols-2 grid-rows-2 gap-3 sm:gap-4 lg:gap-5">
              <Link
                href={primaryLoc.href}
                aria-label={primaryLoc.title}
                className="group relative row-span-2 border border-foreground/12 bg-paper p-2 transition-[border-color] duration-400 hover:border-foreground/22 focus-visible:border-foreground/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink sm:p-2.5 md:p-3"
              >
                <Photo
                  src={primaryLoc.image.src}
                  alt={primaryLoc.image.alt}
                  fill
                  sizes="(min-width: 768px) 28vw, 48vw"
                  className="absolute inset-2 sm:inset-2.5 md:inset-3"
                  imageClassName="object-cover"
                  objectPosition={primaryLoc.objectPosition}
                  interactive
                  quality={88}
                />
              </Link>

              {secondaryLoc.map((shot) => (
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
            <p className="label-meta">{dict.photography.eyebrow}</p>
            <h2
              id="photography-spotlight-heading"
              className="heading-section mt-3 max-w-[14ch] font-display"
            >
              {dict.photography.title}
            </h2>
            <div
              className="mt-3 h-px w-[min(100%,14rem)] bg-foreground/15"
              aria-hidden
            />

            <div className="mt-6 max-w-md space-y-4 text-[0.9375rem] leading-[1.7] text-muted-ink md:mt-7 md:text-[1rem]">
              <p>{dict.photography.body}</p>
            </div>

            <div className="mt-8 md:mt-10">
              <Link
                href={localizedHref("/arbejde", locale)}
                className="btn-outline"
              >
                {dict.photography.cta}
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
