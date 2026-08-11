"use client";

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
 * Avoid next/image `priority` preload (it targets the fallback <img> src and
 * can download the wrong crop). `fetchPriority="high"` lets the browser
 * prioritize whichever <source> matches.
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
    quality: 90,
    sizes: "(min-width: 1600px) 1600px, 100vw",
    src: image.src,
  });

  const {
    props: { srcSet: mobileSrcSet, ...rest },
  } = getImageProps({
    alt: mobileImage.alt,
    width: mobileImage.width,
    height: mobileImage.height,
    quality: 90,
    sizes: "100vw",
    src: mobileImage.src,
  });

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
          alt={mobileImage.alt}
          className="absolute inset-0 h-full w-full object-cover object-[50%_40%] md:object-[50%_45%]"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
    </div>
  );
}
