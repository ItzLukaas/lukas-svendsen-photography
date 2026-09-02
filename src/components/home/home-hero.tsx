import { HeroBackground } from "@/components/home/hero-background";
import { HomeHeroCopy } from "@/components/home/home-hero-copy";
import { preloadHeroImages } from "@/components/home/hero-preload";
import { heroImage, heroMobileImage } from "@/lib/data/projects";

/**
 * Full-bleed hero — strongest visual on the site.
 */
export function HomeHero() {
  preloadHeroImages();

  return (
    <section
      aria-label="Intro"
      className="relative bg-ink pt-[var(--chrome-h)]"
      data-hero-section
    >
      <div className="relative min-h-[calc(100svh-var(--chrome-h))] w-full overflow-hidden">
        <HeroBackground image={heroImage} mobileImage={heroMobileImage} />

        <div className="absolute inset-0 bg-ink/35" aria-hidden />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(14_14_13_/_0.48)_0%,rgb(14_14_13_/_0.28)_50%,rgb(14_14_13_/_0.18)_100%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(14_14_13_/_0.22)_0%,transparent_35%,transparent_72%,rgb(14_14_13_/_0.38)_100%)]"
          aria-hidden
        />

        <HomeHeroCopy />
      </div>
    </section>
  );
}
