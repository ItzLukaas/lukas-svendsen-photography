import type { LucideIcon } from "lucide-react";
import {
  Camera,
  Clapperboard,
  Layers,
  Plane,
  UserRound,
  Video,
} from "lucide-react";

import { productionTypes } from "@/lib/booking/schema";

export type ProductionType = (typeof productionTypes)[number];

export type HomeService = {
  id: string;
  title: string;
  bookingType: ProductionType;
  description: string;
  icon: LucideIcon;
};

export type VideoServiceFeature = {
  id: string;
  title: string;
  body: string;
  icon: LucideIcon;
};

/**
 * Four clear offers — each links straight to booking.
 * Content sits beside foto/video/drone as a natural extension.
 */
export const homeServices: HomeService[] = [
  {
    id: "foto",
    title: "Foto",
    bookingType: "Fotografering",
    description: "Stillebilleder med professionelt udtryk.",
    icon: Camera,
  },
  {
    id: "video",
    title: "Video",
    bookingType: "Videoproduktion",
    description: "Film og bevægeligt materiale.",
    icon: Video,
  },
  {
    id: "drone",
    title: "Drone",
    bookingType: "Droneproduktion",
    description: "Luftfoto og luftvideo.",
    icon: Plane,
  },
  {
    id: "content",
    title: "Content",
    bookingType: "Content",
    description: "Materiale til digitale kanaler.",
    icon: Layers,
  },
];

export const videoServiceFeatures: VideoServiceFeature[] = [
  {
    id: "web-some",
    title: "Web og sociale medier",
    body: "Materiale til hjemmeside og SoMe.",
    icon: Camera,
  },
  {
    id: "campaigns",
    title: "Kampagner",
    body: "Til lanceringer og løbende kommunikation.",
    icon: Clapperboard,
  },
  {
    id: "tailored",
    title: "Tilpasset opgaven",
    body: "Omfang og form finder vi sammen.",
    icon: UserRound,
  },
];
