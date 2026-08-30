import type { ProjectImage } from "@/lib/data/projects";

export type ConcertSpotlightShot = {
  id: string;
  title: string;
  href: string;
  image: ProjectImage;
  /** Primary (tall) vs secondary (stacked) placement */
  placement: "primary" | "secondary";
  /** CSS object-position when the frame crops the photo */
  objectPosition?: string;
};

/**
 * Three concert frames from real jobs.
 * Green portrait: Thor Farlov — Smukfest.
 * Pink portrait: Sivas — Grøn Koncert.
 */
export const concertSpotlightShots: ConcertSpotlightShot[] = [
  {
    id: "portrait",
    title: "Thor Farlov — Smukfest",
    href: "/arbejde/thor-farlov-smukfest",
    placement: "primary",
    objectPosition: "50% 48%",
    image: {
      src: "/images/projects/thor-farlov-smukfest/01-thor-farlov-synger-pa-scenen-til-smukfest-under-spot.jpg",
      alt: "Thor Farlov synger på scenen til Smukfest under grønt scenelys",
      width: 1467,
      height: 2200,
      orientation: "portrait",
    },
  },
  {
    id: "live",
    title: "Koncertfotografi — live performance",
    href: "/arbejde/varde-open-air",
    placement: "secondary",
    objectPosition: "50% 45%",
    image: {
      src: "/images/projects/varde-open-air/03-sofie1998-varde-open-air.jpg",
      alt: "Sofie1998 på scenen til Varde Open Air",
      width: 2400,
      height: 3600,
      orientation: "portrait",
    },
  },
  {
    id: "stage",
    title: "Sivas — Grøn Koncert",
    href: "/arbejde/gron-koncert",
    placement: "secondary",
    /** Keep face + pink light in frame when the cell crops the portrait */
    objectPosition: "50% 32%",
    image: {
      src: "/images/projects/gron-koncert/01-sivas-smiler-pa-scenen-til-groen-koncert.jpg",
      alt: "Sivas smiler på scenen til Grøn Koncert",
      width: 1600,
      height: 2400,
      orientation: "portrait",
    },
  },
];
