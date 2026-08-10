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
 */
export const concertSpotlightShots: ConcertSpotlightShot[] = [
  {
    id: "portrait",
    title: "Koncertfotografi — artistportræt",
    href: "/arbejde/bork-festival",
    placement: "primary",
    objectPosition: "50% 48%",
    image: {
      src: "/images/concert-spotlight/01-performer-green.jpg",
      alt: "Artist på scenen under grønt scenelys — koncertfotografi af Lukas Svendsen",
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
      src: "/images/projects/varde-open-air/03-dsc08653.jpg",
      alt: "Live performance på scenen til Varde Open Air",
      width: 2400,
      height: 3600,
      orientation: "portrait",
    },
  },
  {
    id: "stage",
    title: "Koncertfotografi — live energi",
    href: "/arbejde/varde-open-air",
    placement: "secondary",
    /** Keep face + cap in frame when the cell crops the portrait */
    objectPosition: "50% 32%",
    image: {
      src: "/images/concert-spotlight/02-performer-pink.jpg",
      alt: "Artist på scenen under pink scenelys — koncertfotografi af Lukas Svendsen",
      width: 1467,
      height: 2200,
      orientation: "portrait",
    },
  },
];
