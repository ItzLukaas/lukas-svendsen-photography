import { getImageProps } from "next/image";
import { preload } from "react-dom";

import { heroImage, heroMobileImage } from "@/lib/data/projects";

/**
 * Art-directed LCP preloads — matches HeroBackground getImageProps.
 * Call from a Server Component on the homepage only.
 */
export function preloadHeroImages() {
  const {
    props: { srcSet: desktopSrcSet, src: desktopSrc },
  } = getImageProps({
    alt: "",
    width: heroImage.width,
    height: heroImage.height,
    quality: 88,
    sizes: "(min-width: 1600px) 1600px, 100vw",
    src: heroImage.src,
  });

  const {
    props: { srcSet: mobileSrcSet, src: mobileSrc },
  } = getImageProps({
    alt: "",
    width: heroMobileImage.width,
    height: heroMobileImage.height,
    quality: 82,
    sizes: "100vw",
    src: heroMobileImage.src,
  });

  preload(mobileSrc, {
    as: "image",
    imageSrcSet: mobileSrcSet,
    imageSizes: "100vw",
    media: "(max-width: 767px)",
    fetchPriority: "high",
  });

  preload(desktopSrc, {
    as: "image",
    imageSrcSet: desktopSrcSet,
    imageSizes: "(min-width: 1600px) 1600px, 100vw",
    media: "(min-width: 768px)",
    fetchPriority: "high",
  });
}
