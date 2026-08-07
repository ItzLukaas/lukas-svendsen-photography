"use client";

import { useReducedMotion } from "motion/react";

import {
  clientLogos,
  collaborationsSummary,
  type ClientLogo,
} from "@/lib/data/clients";
import { cn } from "@/lib/utils";

type LogoMarqueeProps = {
  className?: string;
};

function LogoItem({
  logo,
  decorative,
}: {
  logo: ClientLogo;
  /** Duplicate marquee set — hide from AT/SEO to avoid repetition */
  decorative?: boolean;
}) {
  return (
    <li
      className="flex h-14 shrink-0 list-none items-center justify-center md:h-16"
      aria-hidden={decorative || undefined}
    >
      <a
        href={logo.href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={decorative ? -1 : undefined}
        aria-label={
          decorative
            ? undefined
            : `${logo.name} — besøg officiel hjemmeside`
        }
        className="inline-flex items-center justify-center outline-none transition-opacity duration-300 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-foreground/25 focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo.src}
          alt={decorative ? "" : logo.alt}
          title={decorative ? undefined : logo.title ?? logo.name}
          width={logo.width}
          height={logo.height}
          className={cn(
            "w-auto max-w-none object-contain opacity-[0.58] transition-opacity duration-500 hover:opacity-100",
            logo.heightClass
          )}
          loading="lazy"
          decoding="async"
        />
      </a>
    </li>
  );
}

function LogoSet({ decorative }: { decorative?: boolean }) {
  return (
    <ul
      className="m-0 flex shrink-0 list-none items-center gap-14 p-0 pr-14 md:gap-[4.25rem] md:pr-[4.25rem] lg:gap-[4.75rem] lg:pr-[4.75rem]"
      aria-hidden={decorative || undefined}
    >
      {clientLogos.map((logo) => (
        <LogoItem
          key={`${logo.name}-${decorative ? "b" : "a"}`}
          logo={logo}
          decorative={decorative}
        />
      ))}
    </ul>
  );
}

/**
 * Contained trust band — logos live inside the content frame with soft edge fades.
 */
export function LogoMarquee({ className }: LogoMarqueeProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className={cn("bg-paper", className)}
      aria-labelledby="collaborations-heading"
    >
      <div className="mx-auto max-w-[1600px] px-5 pt-14 md:px-8 md:pt-20 lg:px-12 lg:pt-24">
        <p className="label-meta">Samarbejder &amp; opgaver</p>
        <h2 id="collaborations-heading" className="sr-only">
          Samarbejder og opgaver
        </h2>
        <p className="sr-only">{collaborationsSummary}</p>

        <div className="relative mt-7 overflow-hidden md:mt-9">
          {/* Soft paper fades — logos dissolve into the frame, not the viewport edge */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper via-paper/80 to-transparent md:w-24 lg:w-28"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper via-paper/80 to-transparent md:w-24 lg:w-28"
            aria-hidden
          />

          <div className="py-2 md:py-3">
            {reduceMotion ? (
              <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-x-12 gap-y-8 p-0 px-4 md:gap-x-16">
                {clientLogos.map((logo) => (
                  <LogoItem key={logo.name} logo={logo} />
                ))}
              </ul>
            ) : (
              <div className="flex w-max animate-logo-marquee hover:[animation-play-state:paused]">
                <LogoSet />
                <LogoSet decorative />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom air before featured work — outside the clipped frame */}
      <div className="h-16 md:h-24 lg:h-28" aria-hidden />
    </section>
  );
}
