import { getImageProps } from "next/image";
import { preload } from "react-dom";

import { heroVideoPaths } from "@/lib/hero-video";
import { heroImage, heroMobileImage } from "@/lib/data/projects";

/**
 * LCP preloads — poster when hero video exists, else art-directed stills.
 */
export function preloadHeroMedia(useVideo: boolean) {
  if (useVideo) {
    const {
      props: { srcSet: desktopSrcSet, src: desktopSrc },
    } = getImageProps({
      alt: "",
      width: 1920,
      height: 1080,
      quality: 88,
      sizes: "(min-width: 1600px) 1600px, 100vw",
      src: heroVideoPaths.poster,
    });

    const {
      props: { srcSet: mobileSrcSet, src: mobileSrc },
    } = getImageProps({
      alt: heroMobileImage.alt,
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
    return;
  }

  const {
    props: { srcSet: desktopSrcSet, src: desktopSrc },
  } = getImageProps({
    alt: heroImage.alt,
    width: heroImage.width,
    height: heroImage.height,
    quality: 88,
    sizes: "(min-width: 1600px) 1600px, 100vw",
    src: heroImage.src,
  });

  const {
    props: { srcSet: mobileSrcSet, src: mobileSrc },
  } = getImageProps({
    alt: heroMobileImage.alt,
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

/** @deprecated Use preloadHeroMedia */
export function preloadHeroImages() {
  preloadHeroMedia(false);
}
