import { getImageProps } from "next/image";

import type { ProjectImage } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

type HeroBackgroundProps = {
  /** Wide landscape — desktop */
  image: ProjectImage;
  /** Portrait — mobile */
  mobileImage: ProjectImage;
  className?: string;
};

/**
 * Art-directed hero stills — one <picture>, one fetch per viewport.
 * Server Component so the LCP image is in the initial HTML (no Motion opacity:0).
 * Pair with preloadHeroImages() for early discovery.
 */
export function HeroBackground({
  image,
  mobileImage,
  className,
}: HeroBackgroundProps) {
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    alt: image.alt,
    width: image.width,
    height: image.height,
    quality: 88,
    sizes: "(min-width: 1600px) 1600px, 100vw",
    src: image.src,
  });

  const {
    props: { srcSet: mobileSrcSet, src: mobileSrc, ...rest },
  } = getImageProps({
    alt: mobileImage.alt,
    width: mobileImage.width,
    height: mobileImage.height,
    quality: 82,
    sizes: "100vw",
    src: mobileImage.src,
  });

  // Prefer a mid-size fallback src (picture <source> still drives modern browsers)
  const fallbackSrc =
    mobileSrcSet
      ?.split(",")
      .map((entry) => entry.trim())
      .find((entry) => entry.endsWith("1200w"))
      ?.split(/\s+/)[0] ?? mobileSrc;

  return (
    <div className={cn("absolute inset-0", className)}>
      <picture>
        <source
          media="(min-width: 768px)"
          srcSet={desktopSrcSet}
          sizes="(min-width: 1600px) 1600px, 100vw"
        />
        <source
          media="(max-width: 767px)"
          srcSet={mobileSrcSet}
          sizes="100vw"
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- art-directed <picture> via getImageProps */}
        <img
          {...rest}
          src={fallbackSrc}
          alt={mobileImage.alt}
          className="absolute inset-0 h-full w-full object-cover object-[50%_38%] md:object-[40%_42%]"
          // Override getImageProps default loading="lazy" — this is the LCP image
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
    </div>
  );
}
