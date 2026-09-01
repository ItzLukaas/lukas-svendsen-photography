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
      "Portrætter, produktbilleder og stemning fra dagen. Redigeret og klar til brug.",
    icon: Camera,
  },
  {
    id: "video",
    title: "Video",
    bookingType: "Videoproduktion",
    description:
      "Korte klip eller længere produktioner til web, sociale medier og markedsføring.",
    icon: Video,
  },
  {
    id: "drone",
    title: "Drone",
    bookingType: "Droneproduktion",
    description:
      "Luftfoto og luftvideo, når du har brug for overblik fra oven.",
    icon: Plane,
  },
  {
    id: "content",
    title: "Content",
    bookingType: "Content",
    description:
      "Billeder og film til det, du poster løbende på web og sociale medier.",
    icon: Layers,
  },
];

export const videoServiceFeatures: VideoServiceFeature[] = [
  {
    id: "web-some",
    title: "Web og sociale medier",
    body: "Materiale til hjemmeside og sociale medier, formateret til de kanaler, du skal bruge det på.",
    icon: Camera,
  },
  {
    id: "campaigns",
    title: "Kampagner",
    body: "Når du skal lancere noget eller holde kommunikationen i gang, kan foto og video følge samme linje gennem produktionen.",
    icon: Clapperboard,
  },
  {
    id: "drone",
    title: "Droneoptagelser",
    body: "Jeg laver luftfoto og luftvideo, når opgaven har brug for overblik, bevægelse eller et perspektiv, som ikke kan tages fra jorden.",
    icon: Plane,
  },
  {
    id: "tailored",
    title: "Til din opgave",
    body: "Vi aftaler omfang, format og leverance, så du får det, du har brug for, uden unødvendigt bureaukrati.",
    icon: UserRound,
  },
];
