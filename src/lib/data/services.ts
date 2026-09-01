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
    description:
      "Stillebilleder til det, du skal bruge dem til. Professionelt udtryk og levering, der er klar til brug.",
    icon: Camera,
  },
  {
    id: "video",
    title: "Video",
    bookingType: "Videoproduktion",
    description:
      "Film og bevægeligt materiale til kampagner, kommunikation og digitale kanaler.",
    icon: Video,
  },
  {
    id: "drone",
    title: "Drone",
    bookingType: "Droneproduktion",
    description:
      "Luftfoto og luftvideo som del af en samlet produktion eller som selvstændig opgave.",
    icon: Plane,
  },
  {
    id: "content",
    title: "Content",
    bookingType: "Content",
    description:
      "Visuelt materiale til web, sociale medier og løbende kommunikation.",
    icon: Layers,
  },
];

export const videoServiceFeatures: VideoServiceFeature[] = [
  {
    id: "web-some",
    title: "Web og sociale medier",
    body: "Materiale til hjemmeside, SoMe og digitale kanaler, der skal bruges med det samme.",
    icon: Camera,
  },
  {
    id: "campaigns",
    title: "Kampagner",
    body: "Til lanceringer, kampagner og løbende kommunikation, hvor billeder og video skal hænge sammen.",
    icon: Clapperboard,
  },
  {
    id: "tailored",
    title: "Tilpasset opgaven",
    body: "Omfang, form og leverance finder vi sammen ud fra det, du skal bruge materialet til.",
    icon: UserRound,
  },
];
