import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Photo } from "@/components/photography/photo";
import { aboutPortrait } from "@/lib/data/projects";

/**
 * Short personal intro — links to full Om page.
 */
export function HomeAboutPreview() {
  return (
    <section
      aria-labelledby="about-preview-heading"
      className="border-t border-foreground/8"
    >
      <div className="mx-auto grid max-w-[1600px] items-center gap-10 px-5 py-[var(--space-section-sm)] md:grid-cols-12 md:gap-14 md:px-8 lg:px-12">
        <FadeIn className="md:col-span-5">
          <Photo
            src={aboutPortrait.src}
            alt={aboutPortrait.alt}
            width={aboutPortrait.width}
            height={aboutPortrait.height}
            sizes="(min-width: 768px) 38vw, 100vw"
            className="aspect-[4/5] w-full max-w-md"
            quality={90}
          />
        </FadeIn>

        <div className="md:col-span-6 md:col-start-7">
          <FadeIn delay={0.05}>
            <p className="label-meta">Om mig</p>
            <h2
              id="about-preview-heading"
              className="mt-3 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.08] tracking-[-0.03em] text-ink"
            >
              Lukas Svendsen
            </h2>
            <p className="mt-2 text-[0.9375rem] text-muted-ink">
              Fotograf og videoproducent
            </p>
            <p className="mt-5 max-w-[48ch] text-[0.9375rem] leading-[1.65] text-muted-ink md:text-[1rem]">
              Jeg laver foto, video, drone og content til virksomheder,
              organisationer og private. For mig handler det om at forstå, hvad
              materialet skal bruges til, og levere noget, der faktisk kan tages i
              brug bagefter.
            </p>
            <p className="mt-8">
              <Link
                href="/om"
                className="group inline-flex items-center gap-0 text-[0.75rem] font-semibold tracking-[0.055em] text-ink transition-[gap] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:gap-[0.55em]"
              >
                Læs mere om mig
                <span
                  aria-hidden
                  className="inline-block max-w-0 overflow-hidden opacity-0 transition-[max-width,opacity,transform] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-[1.1em] group-hover:translate-x-0 group-hover:opacity-100 -translate-x-[0.3em]"
                >
                  →
                </span>
              </Link>
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
