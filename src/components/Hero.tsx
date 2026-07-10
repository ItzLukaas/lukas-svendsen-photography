import Link from "next/link";
import { preload } from "react-dom";
import { ArrowRight } from "lucide-react";
import { HeroBackground } from "@/components/HeroBackground";
import { btnGhost, btnPrimary, heroTitle } from "@/lib/styles";

const HERO_IMAGE = "/images/portfolio/handbold/DSC02040.webp";

export function Hero() {
  preload(HERO_IMAGE, { as: "image", fetchPriority: "high" });

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#070707]">
      <HeroBackground />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 pt-36 lg:px-10 lg:pb-32 lg:pt-44">
        <div className="hero-content-rise max-w-3xl">
          <h1 className={`${heroTitle} text-balance`}>
            <span className="block">Ung, 16-årig fotograf</span>
            <span className="block">og videoproducent</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg sm:leading-relaxed">
            Jeg hedder Lukas Svendsen og er fotograf, videograf og dronepilot i Grindsted. Jeg
            skaber visuelt indhold for private og virksomheder gennem foto, video og droneoptagelser.
          </p>

          <div className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/portfolio" className={btnPrimary}>
              Se portefølje
              <ArrowRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-500 ease-premium group-hover:translate-x-1"
              />
            </Link>
            <Link href="#foresporgsel" className={btnGhost}>
              Start forespørgsel
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
