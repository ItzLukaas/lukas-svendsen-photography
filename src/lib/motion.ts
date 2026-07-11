export const EASE = [0.25, 0.4, 0.25, 1] as const;
export const EASE_REVEAL = [0.22, 0.61, 0.36, 1] as const;
export const EASE_CSS = "cubic-bezier(0.25, 0.4, 0.25, 1)";

export const transition = {
  fast: { duration: 0.3, ease: EASE },
  normal: { duration: 0.5, ease: EASE },
  slow: { duration: 0.8, ease: EASE },
} as const;

/** GPU-friendly transform for animated elements */
export const GPU_STYLE = {
  willChange: "transform, opacity",
  transform: "translateZ(0)",
} as const;
