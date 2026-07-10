import Link from "next/link";
import { preload } from "react-dom";
import { ArrowRight } from "lucide-react";
import { HeroBackground } from "@/components/HeroBackground";
const heroTitleCompact =
  "font-display text-[1.5rem] font-light leading-[1.12] text-white sm:text-4xl sm:leading-[1.08] lg:text-5xl xl:text-[3.25rem]";

const btnPrimaryCompact =
  "group inline-flex min-h-10 items-center justify-center gap-2 border border-white px-7 py-2.5 text-[10px] tracking-[0.2em] text-white uppercase transition-all duration-500 ease-premium hover:bg-white hover:text-black active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const btnGhostCompact =
  "group inline-flex min-h-9 items-center justify-center gap-2 px-6 py-2 text-[10px] tracking-[0.2em] text-white/70 uppercase transition-all duration-500 ease-premium hover:text-white";

const HERO_IMAGE = "/images/portfolio/handbold/DSC02040.webp";

export function Hero() {
  preload(HERO_IMAGE, { as: "image", fetchPriority: "high" });

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#070707]">
      <HeroBackground />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-28 lg:px-10 lg:pb-24 lg:pt-36">
        <div className="hero-content-rise max-w-3xl">
          <h1 className={`${heroTitleCompact} text-balance`}>
            <span className="block">Ung, 16-årig fotograf</span>
            <span className="block">og videoproducent</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
            Jeg hedder Lukas Svendsen og er fotograf, videograf og dronepilot i Grindsted. Jeg
            skaber visuelt indhold for private og virksomheder gennem foto, video og droneoptagelser.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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
