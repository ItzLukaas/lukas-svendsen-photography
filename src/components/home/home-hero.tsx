import { HeroBackground } from "@/components/home/hero-background";
import { HeroPoster } from "@/components/home/hero-poster";
import { HeroVideoBackground } from "@/components/home/hero-video-background";
import { HomeHeroCopy } from "@/components/home/home-hero-copy";
import { preloadHeroMedia } from "@/components/home/hero-preload";
import { hasHeroVideoAssets } from "@/lib/hero-video.server";
import { heroImage, heroMobileImage } from "@/lib/data/projects";

/**
 * Framed, centered hero — first impression of the brand.
 * Poster/images for LCP; optional video loop when assets exist.
 */
export function HomeHero() {
  const useVideo = hasHeroVideoAssets();
  preloadHeroMedia(useVideo);

  return (
    <section aria-label="Intro" className="bg-paper pt-[var(--chrome-h)]">
      <div className="mx-auto max-w-[1600px] px-5 pt-5 pb-10 sm:pt-6 md:px-8 md:pt-8 md:pb-14 lg:px-12 lg:pt-10 lg:pb-16">
        <div className="relative aspect-[3/4] overflow-hidden bg-ink sm:aspect-[4/5] md:aspect-[16/10] lg:aspect-[2.05/1]">
          {useVideo ? (
            <>
              {/* Mobile: art-directed still. Desktop: poster frame under video. */}
              <div className="absolute inset-0 z-0 md:hidden">
                <HeroBackground
                  image={heroImage}
                  mobileImage={heroMobileImage}
                />
              </div>
              <HeroPoster className="hidden md:block" />
              <HeroVideoBackground />
            </>
          ) : (
            <HeroBackground image={heroImage} mobileImage={heroMobileImage} />
          )}

          {/* Soft veil — keeps action still readable under white type */}
          <div
            className="absolute inset-0 z-[2] bg-ink/38 md:bg-ink/32"
            aria-hidden
          />
          <div
            className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,rgb(14_14_13_/_0.52)_0%,rgb(14_14_13_/_0.36)_46%,rgb(14_14_13_/_0.2)_72%,rgb(14_14_13_/_0.12)_100%)]"
            aria-hidden
          />
          <div
            className="absolute inset-0 z-[2] bg-[linear-gradient(to_bottom,rgb(14_14_13_/_0.28)_0%,transparent_30%,transparent_70%,rgb(14_14_13_/_0.32)_100%)]"
            aria-hidden
          />

          <HomeHeroCopy />
        </div>
      </div>
    </section>
  );
}
