import Link from "next/link";

import { FeaturedWork } from "@/components/home/featured-work";
import { HeroBackground } from "@/components/home/hero-background";
import { LogoMarquee } from "@/components/home/logo-marquee";
import { ServicesShowcase } from "@/components/home/services-showcase";
import { FadeIn } from "@/components/motion/fade-in";
import { Photo } from "@/components/photography/photo";
import { getCollaborationsJsonLd } from "@/lib/data/clients";
import { aboutPortrait, heroImage, heroMobileImage, heroVideoHevcSrc, heroVideoSrc } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site";

export function HomePage() {
  const collaborationsJsonLd = getCollaborationsJsonLd(siteConfig.url);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collaborationsJsonLd),
        }}
      />

      {/* 1. Hero — brand first, photography as the stage */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink">
        <HeroBackground
          poster={heroImage}
          mobilePoster={heroMobileImage}
          videoSrc={heroVideoSrc}
          videoSrcHevc={heroVideoHevcSrc}
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0_/_0.78)_0%,rgb(0_0_0_/_0.32)_40%,rgb(0_0_0_/_0.1)_70%,transparent_100%)]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-14 pt-28 sm:pb-16 md:px-8 md:pb-24 md:pt-32 lg:px-12 lg:pb-28">
          <FadeIn y={10}>
            <h1 className="font-display max-w-[11ch] text-[clamp(2.85rem,12vw,7rem)] leading-[0.88] tracking-[-0.038em] text-white">
              {siteConfig.name}
            </h1>
          </FadeIn>
          <FadeIn delay={0.08} y={6}>
            <p className="mt-6 max-w-[20rem] text-[0.9375rem] leading-[1.7] text-white/70 sm:max-w-[26rem] md:mt-7 md:text-[1.0625rem]">
              Fotograf, videograf og dronepilot fra Grindsted — koncerter,
              events og brands i hele Jylland.
            </p>
          </FadeIn>
          <FadeIn delay={0.14} y={4}>
            <div className="mt-11 flex flex-wrap items-center gap-x-9 gap-y-4 md:mt-12">
              <Link href="/arbejde" className="btn-solid bg-paper text-ink">
                Se mit arbejde
              </Link>
              <Link href="/booking" className="btn-ghost-on-dark">
                Booking
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. Trust */}
      <LogoMarquee />

      {/* 3. Featured work */}
      <FeaturedWork />

      {/* 4. Services — photography leads */}
      <ServicesShowcase />

      {/* 5. About — personal beat before CTA */}
      <section className="mx-auto grid max-w-[1600px] items-center gap-12 px-5 py-16 md:grid-cols-12 md:gap-10 md:px-8 md:py-24 lg:gap-12 lg:px-12 lg:py-28">
        <FadeIn className="order-2 md:order-1 md:col-span-5 md:pr-2 lg:pr-8">
          <p className="label-meta">Personligt</p>
          <h2 className="mt-2.5 max-w-[10ch] font-display text-[clamp(1.85rem,3.6vw,2.55rem)] leading-[1.05] tracking-[-0.028em]">
            Om mig
          </h2>
          <div className="mt-6 max-w-[26rem] space-y-4 text-body">
            <p>
              Jeg hedder Lukas Svendsen, er 16 år og kommer fra Grindsted.
            </p>
            <p>
              Herfra arbejder jeg med koncerter, festivaler, sport,
              virksomheder, events og portrætter — også i Billund, Esbjerg,
              Vejle og Kolding. Mit mål er at fange øjeblikke, der føles ægte,
              og skabe billeder, der fortæller en historie.
            </p>
            <p>
              Uanset om opgaven er stor eller lille, går jeg op i at levere
              billeder med kvalitet, personlighed og et udtryk, der passer til
              netop den oplevelse, der skal huskes.
            </p>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href="/om" className="btn-ghost">
              Mere om mig
            </Link>
            <Link
              href="/booking"
              className="text-[0.8125rem] font-medium tracking-[0.03em] text-muted-ink transition-opacity duration-300 hover:opacity-70"
            >
              Book en produktion →
            </Link>
          </div>
        </FadeIn>
        <FadeIn
          delay={0.05}
          className="order-1 md:order-2 md:col-span-6 md:col-start-7"
        >
          <Photo
            src={aboutPortrait.src}
            alt={aboutPortrait.alt}
            width={aboutPortrait.width}
            height={aboutPortrait.height}
            sizes="(min-width: 768px) 45vw, 100vw"
            className="aspect-[4/5] w-full"
            interactive
            quality={90}
          />
        </FadeIn>
      </section>

      {/* 6. Closing CTA */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgb(255_255_255_/_0.06),transparent_55%)]"
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-[1600px] flex-col items-center px-5 py-24 text-center md:px-8 md:py-32 lg:px-12 lg:py-36">
          <FadeIn y={8} className="flex w-full max-w-xl flex-col items-center">
            <p className="label-meta text-white/45">Næste skridt</p>
            <h2 className="mt-3 max-w-[14ch] font-display text-[clamp(2.15rem,5.4vw,3.6rem)] leading-[0.98] tracking-[-0.032em]">
              Klar til at skabe noget?
            </h2>
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-[1.7] text-paper/65 md:text-[1rem]">
              Book fotografi, video eller drone fra Grindsted — eller skriv
              først, hvis du hellere vil starte en samtale.
            </p>
            <div className="mt-11 flex flex-wrap items-center justify-center gap-x-9 gap-y-4">
              <Link href="/booking" className="btn-solid bg-paper text-ink">
                Booking
              </Link>
              <Link href="/kontakt" className="btn-ghost-on-dark">
                Kontakt mig
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
