"use client";

import {
  useCallback,
  useEffect,
  useEffectEvent,
  useState,
  type TransitionEvent,
} from "react";
import { useReducedMotion } from "motion/react";

import { FadeIn } from "@/components/motion/fade-in";
import {
  clientLogos,
  collaborationsSummary,
  type ClientLogo,
} from "@/lib/data/clients";
import { cn } from "@/lib/utils";

type LogoMarqueeProps = {
  className?: string;
};

/** Stillness between one-logo steps */
const HOLD_MS = 4000;
/** One-logo horizontal shift */
const TRANSITION_MS = 900;
const EASING = "cubic-bezier(0.45, 0, 0.55, 1)";

function getPerPage(width: number) {
  if (width >= 1024) return 4;
  if (width >= 640) return 3;
  return 2;
}

function LogoItem({
  logo,
  widthPercent,
}: {
  logo: ClientLogo;
  widthPercent: number;
}) {
  return (
    <li
      className="flex h-11 shrink-0 list-none items-center justify-center md:h-12"
      style={{ width: `${widthPercent}%` }}
    >
      <a
        href={logo.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${logo.name} — besøg officiel hjemmeside`}
        className="inline-flex items-center justify-center outline-none transition-opacity duration-300 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo.src}
          alt={logo.alt}
          title={logo.title ?? logo.name}
          width={logo.width}
          height={logo.height}
          className={cn(
            "w-auto max-w-[7.5rem] object-contain opacity-[0.72] transition-opacity duration-500 hover:opacity-100 sm:max-w-[8.5rem] md:max-w-none",
            logo.heightClass
          )}
          loading="lazy"
          decoding="async"
        />
      </a>
    </li>
  );
}

/**
 * One-logo-at-a-time showcase — pause, slide one step, pause.
 * Not a continuous marquee; not a full-page carousel.
 */
function LogoStepper() {
  const reduceMotion = !!useReducedMotion();
  const [perPage, setPerPage] = useState(4);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animate, setAnimate] = useState(true);

  const total = clientLogos.length;
  const canStep = total > perPage;

  const syncPerPage = useEffectEvent(() => {
    const next = getPerPage(window.innerWidth);
    setPerPage((current) => {
      if (current === next) return current;
      setIndex(0);
      return next;
    });
  });

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => syncPerPage());
    window.addEventListener("resize", syncPerPage);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", syncPerPage);
    };
  }, []);

  /**
   * Clone the first visible logos onto the end so the wrap
   * from last → first is a forward slide, then snap.
   */
  const track: ClientLogo[] = canStep
    ? [...clientLogos, ...clientLogos.slice(0, perPage)]
    : clientLogos;

  const trackCount = track.length;
  const itemWidthPercent = 100 / trackCount;
  /** One logo step as % of the track element */
  const stepPercent = 100 / trackCount;

  const goNext = useCallback(() => {
    if (!canStep) return;
    setAnimate(true);
    setIndex((current) => current + 1);
  }, [canStep]);

  useEffect(() => {
    if (reduceMotion || paused || !canStep) return;
    // Don't schedule while parked on the clone strip
    if (index >= total) return;

    const id = window.setTimeout(goNext, HOLD_MS);
    return () => window.clearTimeout(id);
  }, [canStep, goNext, index, paused, reduceMotion, total]);

  const handleTransitionEnd = (event: TransitionEvent<HTMLUListElement>) => {
    if (event.propertyName !== "transform") return;
    if (index < total) return;

    // Seamless wrap: jump to real start without animating backwards
    setAnimate(false);
    setIndex(0);
  };

  useEffect(() => {
    if (animate || index !== 0) return;
    const id = window.requestAnimationFrame(() => setAnimate(true));
    return () => window.cancelAnimationFrame(id);
  }, [animate, index]);

  if (reduceMotion) {
    return (
      <ul className="m-0 grid list-none grid-cols-2 gap-x-8 gap-y-8 p-0 sm:grid-cols-3 lg:grid-cols-4">
        {clientLogos.map((logo) => (
          <li
            key={logo.name}
            className="flex h-11 list-none items-center justify-center md:h-12"
          >
            <a
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${logo.name} — besøg officiel hjemmeside`}
              className="inline-flex items-center justify-center outline-none transition-opacity duration-300 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
                title={logo.title ?? logo.name}
                width={logo.width}
                height={logo.height}
                className={cn(
                  "w-auto max-w-[7.5rem] object-contain opacity-[0.72] transition-opacity duration-500 hover:opacity-100 sm:max-w-[8.5rem] md:max-w-none",
                  logo.heightClass
                )}
                loading="lazy"
                decoding="async"
              />
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
      aria-label="Samarbejdspartnere"
    >
      <ul
        className="m-0 flex list-none items-center p-0 will-change-transform"
        onTransitionEnd={handleTransitionEnd}
        style={{
          width: `${(trackCount / perPage) * 100}%`,
          transform: `translateX(-${index * stepPercent}%)`,
          transition: animate
            ? `transform ${TRANSITION_MS}ms ${EASING}`
            : "none",
        }}
      >
        {track.map((logo, i) => (
          <LogoItem
            key={`${logo.name}-${i}`}
            logo={logo}
            widthPercent={itemWidthPercent}
          />
        ))}
      </ul>
    </div>
  );
}

/**
 * Editorial collaborations strip — fixed copy left, one-step logo showcase right.
 */
export function LogoMarquee({ className }: LogoMarqueeProps) {
  return (
    <section
      className={cn("bg-transparent", className)}
      aria-labelledby="collaborations-heading"
    >
      <div className="mx-auto max-w-[1600px] px-5 pb-[var(--space-section)] md:px-8 lg:px-12">
        <FadeIn>
          <div className="flex flex-col border border-foreground/10 md:flex-row md:items-stretch">
            <div className="flex shrink-0 flex-col justify-center px-5 py-10 md:w-[32%] md:max-w-[22rem] md:px-8 md:py-12 lg:px-10 lg:py-14">
              <p className="label-meta">Samarbejder</p>
              <h2
                id="collaborations-heading"
                className="mt-3 font-display text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.15] tracking-[-0.022em]"
              >
                Udvalgte samarbejder
              </h2>
              <p className="mt-2 text-[0.8125rem] leading-[1.55] text-muted-ink md:text-[0.875rem]">
                Private, foreninger, organisationer og brands
              </p>
              <p className="sr-only">{collaborationsSummary}</p>
            </div>

            <div
              className="h-px w-full bg-foreground/10 md:hidden"
              aria-hidden
            />

            <div
              className="hidden w-px shrink-0 self-stretch bg-foreground/10 md:block"
              aria-hidden
            />

            <div className="relative min-w-0 flex-1 px-5 py-8 md:flex md:items-center md:px-8 md:py-10 lg:px-10 lg:py-12">
              <LogoStepper />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
