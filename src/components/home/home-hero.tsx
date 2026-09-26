import { HeroBackground } from "@/components/home/hero-background";
import { HomeHeroCopy } from "@/components/home/home-hero-copy";
import { preloadHeroImages } from "@/components/home/hero-preload";
import { heroImage, heroMobileImage } from "@/lib/data/projects";
import type { Locale } from "@/lib/i18n/config";
import { localizeImageAlt } from "@/lib/i18n/localize-content";
import { getRequestLocale } from "@/lib/i18n/request-locale";

type HomeHeroProps = {
  locale?: Locale;
};

/**
 * Full-bleed hero — strongest visual on the site.
 */
export async function HomeHero({ locale: localeProp }: HomeHeroProps = {}) {
  const locale = localeProp ?? (await getRequestLocale());
  preloadHeroImages();

  const desktop = {
    ...heroImage,
    alt: localizeImageAlt(heroImage.alt, locale),
  };
  const mobile = {
    ...heroMobileImage,
    alt: localizeImageAlt(heroMobileImage.alt, locale),
  };

  return (
    <section
      aria-label={locale === "en" ? "Introduction" : "Intro"}
      className="relative bg-ink pt-[var(--chrome-h)]"
      data-hero-section
    >
      <div className="relative min-h-[calc(100svh-var(--chrome-h))] w-full overflow-hidden">
        <HeroBackground image={desktop} mobileImage={mobile} />

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
