import type { GalleryFormat, ProjectImage } from "@/lib/data/projects";
import { isPortrait } from "@/lib/data/projects";

export type GallerySlot =
  | { type: "full"; indices: [number] }
  | { type: "pair"; indices: [number, number] };

/**
 * Build an intentional editorial rhythm from native orientations.
 * Photography drives the pattern — not random size variation.
 *
 * wide     → landscape openers + occasional full-bleed breakers
 * festival → denser pairs with selective full-bleed landscapes
 * mixed    → orientation-aware packing (portrait pairs, lone landscapes full)
 */
export function buildGallerySlots(
  images: ProjectImage[],
  format: GalleryFormat
): GallerySlot[] {
  if (images.length === 0) return [];

  const slots: GallerySlot[] = [];
  let i = 0;
  let pairStreak = 0;

  while (i < images.length) {
    const image = images[i];
    const remaining = images.length - i;
    const portrait = isPortrait(image);

    // First frame: full-bleed when landscape or wide format
    if (i === 0) {
      if (format === "wide" || !portrait) {
        slots.push({ type: "full", indices: [i] });
        i += 1;
        pairStreak = 0;
        continue;
      }
    }

    // Lone trailing image — full width (centered styling handled in UI)
    if (remaining === 1) {
      slots.push({ type: "full", indices: [i] });
      break;
    }

    const next = images[i + 1];
    const nextPortrait = isPortrait(next);

    // Mixed: lone landscape gets full width when followed by a portrait
    if (format === "mixed" && !portrait && nextPortrait) {
      slots.push({ type: "full", indices: [i] });
      i += 1;
      pairStreak = 0;
      continue;
    }

    // Periodic full-bleed landscape breaker after a few pairs
    const breakerReady =
      !portrait &&
      pairStreak >= (format === "wide" ? 2 : 3) &&
      remaining >= 3;

    if (breakerReady && (format === "wide" || format === "festival")) {
      slots.push({ type: "full", indices: [i] });
      i += 1;
      pairStreak = 0;
      continue;
    }

    // Default: intentional pair (native ratios kept)
    slots.push({ type: "pair", indices: [i, i + 1] });
    i += 2;
    pairStreak += 1;
  }

  return slots;
}

export function formatGalleryCounter(index: number, total: number) {
  const pad = total >= 100 ? 3 : 2;
  return `${String(index + 1).padStart(pad, "0")} / ${String(total).padStart(pad, "0")}`;
}
