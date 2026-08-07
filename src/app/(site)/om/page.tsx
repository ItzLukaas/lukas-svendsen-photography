import type { Metadata } from "next";
import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Photo } from "@/components/photography/photo";
import { aboutPortrait } from "@/lib/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Om mig — Fotograf i Grindsted",
  description:
    "Mød Lukas Svendsen — fotograf, videograf og dronepilot fra Grindsted. Professionelt arbejde med koncerter, festivaler, sport, events og virksomheder i Jylland.",
  path: "/om",
  image: aboutPortrait.src,
  imageAlt: aboutPortrait.alt,
  imageWidth: aboutPortrait.width,
  imageHeight: aboutPortrait.height,
});

export default function OmPage() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="mx-auto grid max-w-[1600px] items-start gap-10 px-5 pb-16 md:grid-cols-12 md:gap-14 md:px-8 md:pb-24 lg:px-12">
        <FadeIn className="md:col-span-5 md:sticky md:top-28">
          <Photo
            src={aboutPortrait.src}
            alt={aboutPortrait.alt}
            width={aboutPortrait.width}
            height={aboutPortrait.height}
            sizes="(min-width: 768px) 40vw, 100vw"
            className="aspect-[4/5] w-full"
            priority
            quality={90}
          />
        </FadeIn>

        <div className="md:col-span-6 md:col-start-7">
          <FadeIn>
            <p className="label-meta">Om mig</p>
            <h1 className="mt-3 max-w-[12ch] font-display text-[clamp(2.65rem,5.8vw,4.5rem)] leading-[0.92] tracking-[-0.03em]">
              Lukas Svendsen
            </h1>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="mt-9 space-y-5 text-body">
              <p>
                Jeg hedder Lukas Svendsen, er 16 år og kommer fra Grindsted.
              </p>
              <p>
                Jeg har altid haft en passion for at fange de øjeblikke, der
                kun sker én gang. Det er alt fra energien foran scenen og
                intensiteten på banen til de små øjeblikke, man først lægger
                mærke til, når man ser billedet bagefter.
              </p>
              <p>
                Fra Grindsted arbejder jeg som fotograf, videograf og
                dronepilot med koncerter, festivaler, sport, events og
                virksomheder — også i Billund, Esbjerg, Vejle, Kolding og
                resten af Jylland. For mig handler fotografering ikke kun om
                at tage flotte billeder, men om at skabe billeder, der
                fortæller en historie og formidler den stemning, der gjorde
                øjeblikket særligt.
              </p>
              <p>
                Jeg går op i at være nærværende, nem at arbejde sammen med og
                levere et resultat, som både jeg og kunden kan være stolte af.
                Uanset om jeg fotograferer for en virksomhed, en festival, en
                sportsbegivenhed eller en privat kunde, er mit mål altid det
                samme: at skabe billeder, der føles ægte, og som gør indtryk.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="mt-16 border-t border-foreground/10 pt-11">
              <h2 className="label-meta">Hvad jeg tilbyder</h2>
              <ul className="mt-6 space-y-3.5">
                <li>
                  <Link
                    href="/arbejde"
                    className="font-display text-[1.65rem] leading-none tracking-[-0.02em] transition-opacity duration-300 hover:opacity-55 md:text-[2rem]"
                  >
                    Fotografi
                  </Link>
                </li>
                <li>
                  <Link
                    href="/booking"
                    className="font-display text-[1.65rem] leading-none tracking-[-0.02em] transition-opacity duration-300 hover:opacity-55 md:text-[2rem]"
                  >
                    Videoproduktion
                  </Link>
                </li>
                <li>
                  <Link
                    href="/booking"
                    className="font-display text-[1.65rem] leading-none tracking-[-0.02em] transition-opacity duration-300 hover:opacity-55 md:text-[2rem]"
                  >
                    Droneproduktion
                  </Link>
                </li>
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/booking" className="btn-solid bg-ink text-paper">
                Booking
              </Link>
              <Link href="/kontakt" className="btn-ghost">
                Kontakt mig
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
