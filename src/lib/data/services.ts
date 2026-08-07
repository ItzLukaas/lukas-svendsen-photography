import { Camera, Drone, Video, type LucideIcon } from "lucide-react";

import { productionTypes } from "@/lib/booking/schema";
import type { ProjectImage } from "@/lib/data/projects";

export type ProductionType = (typeof productionTypes)[number];

export type CreativeService = {
  id: string;
  index: string;
  title: string;
  description: string;
  bookingType: ProductionType;
  icon: LucideIcon;
  image: ProjectImage;
};

/** Three capabilities — photo-led panels with booking. */
export const creativeServices: CreativeService[] = [
  {
    id: "fotografering",
    index: "01",
    title: "Fotografering",
    description:
      "Sport, events, koncerter og brands — professionel fotografering i Esbjerg, Vejle, Billund og hele Jylland.",
    bookingType: "Fotografering",
    icon: Camera,
    image: {
      src: "/images/festival.jpg",
      alt: "Festivalfotograf fanger publikum og scenelys i Jylland — Lukas Svendsen",
      width: 2400,
      height: 1600,
      orientation: "landscape",
    },
  },
  {
    id: "video",
    index: "02",
    title: "Videoproduktion",
    description:
      "Aftermovies, eventfilm og branded content til virksomheder og events i Jylland.",
    bookingType: "Videoproduktion",
    icon: Video,
    image: {
      src: "/images/event-1.jpg",
      alt: "Eventfotografi og videoproduktion med publikum — Lukas Svendsen",
      width: 2400,
      height: 1600,
      orientation: "landscape",
    },
  },
  {
    id: "drone",
    index: "03",
    title: "Droneproduktion",
    description:
      "Luftfoto og dronevideo fra oven — perspektiv til events, festivals og brands.",
    bookingType: "Droneproduktion",
    icon: Drone,
    image: {
      src: "/images/hero-poster.jpg",
      alt: "Dronefoto over landskab i Jylland — dronepilot Lukas Svendsen",
      width: 1920,
      height: 1080,
      orientation: "landscape",
    },
  },
];
