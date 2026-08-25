import { HeroBackground } from "@/components/home/hero-background";
import { HomeHeroCopy } from "@/components/home/home-hero-copy";
import { preloadHeroImages } from "@/components/home/hero-preload";
import { heroImage, heroMobileImage } from "@/lib/data/projects";

/**
 * Framed, centered hero — first impression of the brand.
 * Media is server-rendered (LCP); copy/CTAs animate on the client.
 */
export function HomeHero() {
  preloadHeroImages();

  return (
    <section aria-label="Intro" className="bg-paper pt-[var(--chrome-h)]">
      <div className="mx-auto max-w-[1600px] px-5 pt-5 pb-10 sm:pt-6 md:px-8 md:pt-8 md:pb-14 lg:px-12 lg:pt-10 lg:pb-16">
        <div className="relative aspect-[3/4] overflow-hidden bg-ink sm:aspect-[4/5] md:aspect-[16/10] lg:aspect-[2.05/1]">
          <HeroBackground image={heroImage} mobileImage={heroMobileImage} />

          {/* Dark veil — Super Cup action stays visible; white type stays sharp */}
          <div
            className="absolute inset-0 bg-ink/50 md:bg-ink/42"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(14_14_13_/_0.32)_0%,rgb(14_14_13_/_0.14)_52%,transparent_76%)]"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(14_14_13_/_0.34)_0%,transparent_32%,transparent_64%,rgb(14_14_13_/_0.4)_100%)]"
            aria-hidden
          />

          <HomeHeroCopy />
        </div>
      </div>
    </section>
  );
}
