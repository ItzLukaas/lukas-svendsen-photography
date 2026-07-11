"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { getPhotoAltBySrc } from "@/data/photos";
import {
  IMAGE_QUALITY,
  IMAGE_SIZES,
} from "@/lib/image";

const HERO_IMAGES = [
  "/images/portfolio/handbold/DSC02040.webp",
  "/images/portfolio/handbold/DSC02512-2.webp",
  "/images/portfolio/andet/DSC02841.webp",
  "/images/portfolio/andet/DSC05265.webp",
  "/images/portfolio/andet/DSC05489.webp",
  "/images/portfolio/andet/DSC05100.webp",
  "/images/portfolio/andet/DSC05724.webp",
  "/images/portfolio/andet/DSC05727.webp",
  "/images/portfolio/handbold/DSC02547.webp",
  "/images/portfolio/andet/DSC05783.webp",
] as const;

const ROTATE_MS = 5000;
const SLIDE_COUNT = HERO_IMAGES.length;
const MOBILE_CAROUSEL_QUERY = "(max-width: 767px)";

function wrapIndex(value: number) {
  return ((value % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT;
}

export function HeroBackground() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(() => new Set([0]));

  const carouselEnabled = !isMobile && !prefersReducedMotion;
  const nextIndex = useMemo(() => wrapIndex(index + 1), [index]);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_CAROUSEL_QUERY);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!carouselEnabled) {
      setIndex(0);
      return;
    }

    const id = window.setInterval(() => {
      setIndex((current) => wrapIndex(current + 1));
    }, ROTATE_MS);

    return () => window.clearInterval(id);
  }, [carouselEnabled]);

  useEffect(() => {
    if (!carouselEnabled) {
      setLoadedSlides(new Set([0]));
      return;
    }

    setLoadedSlides((current) => {
      const next = new Set(current);
      next.add(index);
      next.add(nextIndex);
      return next;
    });
  }, [carouselEnabled, index, nextIndex]);

  const visibleImages = carouselEnabled
    ? HERO_IMAGES.map((src, imageIndex) => ({ src, imageIndex }))
    : [{ src: HERO_IMAGES[0], imageIndex: 0 }];

  return (
    <div className="absolute inset-0 bg-[#070707]" aria-hidden="true">
      {visibleImages.map(({ src, imageIndex }) => {
        const isActive = carouselEnabled ? imageIndex === index : true;
        const isVisible = carouselEnabled
          ? isActive || imageIndex === nextIndex
          : true;

        if (carouselEnabled && !loadedSlides.has(imageIndex) && !isVisible) {
          return null;
        }

        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-premium ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          >
            <OptimizedImage
              key={isActive ? `active-${index}` : src}
              src={src}
              alt={getPhotoAltBySrc(src, "Hero-baggrund fra Lukas Svendsens portefølje")}
              fill
              blur={false}
              priority={imageIndex === 0}
              loading={imageIndex === 0 ? "eager" : "lazy"}
              fetchPriority={imageIndex === 0 ? "high" : "low"}
              quality={IMAGE_QUALITY.heroCarousel}
              className={`object-cover object-center ${
                isActive && carouselEnabled ? "hero-slide-zoom" : "scale-100"
              }`}
              sizes={IMAGE_SIZES.heroCarousel}
            />
          </div>
        );
      })}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/55 to-[#0a0a0a]/25" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 hero-vignette" />

      {carouselEnabled && (
        <div
          className="pointer-events-none absolute right-6 bottom-8 left-6 flex justify-center gap-1.5 lg:right-10 lg:bottom-10 lg:left-10"
          aria-hidden="true"
        >
          {HERO_IMAGES.map((src, imageIndex) => (
            <span
              key={src}
              className={`h-1 rounded-full transition-all duration-500 ease-premium ${
                imageIndex === index ? "w-6 bg-white/70" : "w-1 bg-white/25"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
