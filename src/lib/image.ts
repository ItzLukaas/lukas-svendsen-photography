/** Tiny neutral blur — used as placeholder while images load */
export const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A0//Z";

export const IMAGE_QUALITY = {
  hero: 82,
  heroCarousel: 75,
  gallery: 78,
  card: 75,
} as const;

export const IMAGE_SIZES = {
  hero: "100vw",
  heroCarousel: "(max-width: 640px) 640px, (max-width: 1080px) 1080px, 1920px",
  gallery: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  card: "(max-width: 1024px) 100vw, 33vw",
  full: "100vw",
} as const;

/** Max width served for fullscreen hero carousel (SEO / LCP friendly). */
export const HERO_CAROUSEL_WIDTH = 1920;
