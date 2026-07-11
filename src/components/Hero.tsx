import Link from "next/link";
import { preload } from "react-dom";
import { ArrowRight } from "lucide-react";
import { HeroBackground } from "@/components/HeroBackground";
const heroTitleCompact =
  "font-display text-[1.5rem] font-light leading-[1.12] text-foreground sm:text-4xl sm:leading-[1.08] lg:text-5xl xl:text-[3.25rem]";

const btnPrimaryCompact =
  "group inline-flex min-h-10 items-center justify-center gap-2 rounded-sm border border-foreground/20 px-7 py-2.5 text-[10px] tracking-[0.2em] text-foreground uppercase transition-[color,background-color,transform,box-shadow,border-color] duration-300 ease-premium hover:-translate-y-px hover:border-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-[var(--shadow-sm)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const btnGhostCompact =
  "group inline-flex min-h-9 items-center justify-center gap-2 px-6 py-2 text-[10px] tracking-[0.2em] text-foreground/70 uppercase transition-[color,transform] duration-500 ease-premium hover:-translate-y-px hover:text-foreground";

const HERO_IMAGE = "/images/portfolio/handbold/DSC02040.webp";

export function Hero() {
  preload(HERO_IMAGE, { as: "image", fetchPriority: "high" });

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-surface">
      <HeroBackground />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 text-center lg:px-10 lg:py-36">
        <div className="hero-content-rise hero-content-frame mx-auto max-w-3xl -translate-y-5 sm:-translate-y-7 lg:-translate-y-9">
          <div className="hero-content-accent" aria-hidden="true" />
          <h1 className={`hero-title-shadow ${heroTitleCompact}`}>Fotograf i Grindsted</h1>
          <p className="hero-tagline mx-auto mt-3 max-w-xl text-xs leading-snug tracking-[0.1em] text-muted sm:mt-4 sm:text-sm sm:tracking-[0.08em] sm:text-muted">
            Fotografering | videoproduktion | droneflyvning
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <Link href="/portfolio" className={btnPrimaryCompact}>
              Se portefølje
              <ArrowRight
                size={13}
                strokeWidth={1.5}
                className="transition-transform duration-500 ease-premium group-hover:translate-x-1"
              />
            </Link>
            <Link href="#foresporgsel" className={btnGhostCompact}>
              Start forespørgsel
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
