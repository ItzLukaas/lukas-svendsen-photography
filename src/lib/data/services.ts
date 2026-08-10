import type { LucideIcon } from "lucide-react";
import { Camera, Plane, Video } from "lucide-react";

import { productionTypes } from "@/lib/booking/schema";

export type ProductionType = (typeof productionTypes)[number];

export type HomeService = {
  id: string;
  title: string;
  bookingType: ProductionType;
  description: string;
  icon: LucideIcon;
};

/**
 * Three clear offers — each links straight to booking.
 */
export const homeServices: HomeService[] = [
  {
    id: "foto",
    title: "Fotografering",
    bookingType: "Fotografering",
    description: "Koncert, event, sport og brand.",
    icon: Camera,
  },
  {
    id: "video",
    title: "Videoproduktion",
    bookingType: "Videoproduktion",
    description: "Aftermovies, eventfilm og korte klip.",
    icon: Video,
  },
  {
    id: "drone",
    title: "Droneflyvning",
    bookingType: "Droneproduktion",
    description: "Luftfoto og video med klart overblik.",
    icon: Plane,
  },
];
