import Link from "next/link";
import { preload } from "react-dom";
import { ArrowRight } from "lucide-react";
import { HeroBackground } from "@/components/HeroBackground";
const heroTitleCompact =
  "font-display text-[1.5rem] font-light leading-[1.12] text-white sm:text-4xl sm:leading-[1.08] lg:text-5xl xl:text-[3.25rem]";

const btnPrimaryCompact =
  "group inline-flex min-h-10 items-center justify-center gap-2 border border-white px-7 py-2.5 text-[10px] tracking-[0.2em] text-white uppercase transition-[color,background-color,transform,box-shadow,border-color] duration-500 ease-premium hover:-translate-y-px hover:bg-white hover:text-black hover:shadow-[0_0_24px_rgba(255,255,255,0.12)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const btnGhostCompact =
  "group inline-flex min-h-9 items-center justify-center gap-2 px-6 py-2 text-[10px] tracking-[0.2em] text-white/70 uppercase transition-[color,transform] duration-500 ease-premium hover:-translate-y-px hover:text-white";

const HERO_IMAGE = "/images/portfolio/handbold/DSC02040.webp";

export function Hero() {
  preload(HERO_IMAGE, { as: "image", fetchPriority: "high" });

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#070707]">
      <HeroBackground />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 text-center lg:px-10 lg:py-36">
        <div className="hero-content-rise mx-auto max-w-3xl">
          <h1 className={heroTitleCompact}>Fotograf i Grindsted</h1>
          <p className="mx-auto mt-3 max-w-xl text-xs leading-snug tracking-[0.08em] text-white/45 sm:mt-4 sm:text-sm sm:tracking-[0.06em] sm:text-white/50">
            Fotografering | videoproduktion | droneflyvning
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
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
