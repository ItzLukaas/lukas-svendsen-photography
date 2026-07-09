import Link from "next/link";
import { preload } from "react-dom";
import { ArrowRight } from "lucide-react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { IMAGE_QUALITY } from "@/lib/image";
import { btnGhost, btnPrimary } from "@/lib/styles";

export function Hero() {
  preload("/images/IMG_3454.webp", { as: "image", fetchPriority: "high" });

  return (
    <section className="bg-[#070707] pt-[72px] lg:pt-[80px]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="font-display text-[1.68rem] leading-[1.12] font-light text-white sm:text-4xl sm:leading-[1.1] lg:text-[2.35rem] xl:text-4xl">
              <span className="block max-sm:whitespace-nowrap">Jeg skaber historier</span>
              <span className="block max-sm:whitespace-nowrap">gennem billeder og video.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
              Mit navn er Lukas Svendsen. Jeg er en 16-årig ambitiøs fotograf, der arbejder med foto,
              videoproduktion og droneoptagelser. Min passion er at skabe visuelt indhold med fokus på
              kvalitet, kreativitet og gode historier.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
              <Link href="/portfolio" className={btnPrimary}>
                Se portefølje
                <ArrowRight
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform duration-500 ease-premium group-hover:translate-x-1"
                />
              </Link>
              <Link href="#foresporgsel" className={btnGhost}>
                Kontakt mig
              </Link>
            </div>
          </div>

          <div className="group mx-auto w-full max-w-sm lg:max-w-md lg:justify-self-end">
            <div className="border border-white/15 p-2.5 transition-colors duration-500 ease-premium sm:p-3 group-hover:border-white/25">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#0a0a0a]">
                <OptimizedImage
                  src="/images/IMG_3454.webp"
                  alt="Portræt af Lukas Svendsen"
                  fill
                  priority
                  fetchPriority="high"
                  quality={IMAGE_QUALITY.hero}
                  className="object-cover object-[50%_15%] transition-transform duration-700 ease-premium group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 80vw, 400px"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
