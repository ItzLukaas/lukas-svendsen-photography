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
      "Portrætter, produktbilleder og stemningsbilleder til hjemmeside, sociale medier og kampagner. Du får redigerede filer, der er klar til brug.",
    icon: Camera,
  },
  {
    id: "video",
    title: "Video",
    bookingType: "Videoproduktion",
    description:
      "Film til hjemmeside, sociale medier og markedsføring. Fra korte klip til større produktioner med et klart budskab.",
    icon: Video,
  },
  {
    id: "drone",
    title: "Drone",
    bookingType: "Droneproduktion",
    description:
      "Luftfoto og luftvideo, når opgaven har brug for overblik og bevægelse fra oven.",
    icon: Plane,
  },
  {
    id: "content",
    title: "Content",
    bookingType: "Content",
    description:
      "Billeder og film til løbende kommunikation på web og sociale medier. Materiale, der kan postes og bruges med det samme.",
    icon: Layers,
  },
];

export const videoServiceFeatures: VideoServiceFeature[] = [
  {
    id: "web-some",
    title: "Web og sociale medier",
    body: "Jeg producerer materiale til hjemmeside og sociale medier, som du kan begynde at bruge med det samme. Det formateres til de kanaler, det skal leve på.",
    icon: Camera,
  },
  {
    id: "campaigns",
    title: "Kampagner",
    body: "Når du skal lancere noget nyt eller holde kommunikationen i gang, kan foto og video hænge sammen i det samme udtryk gennem hele produktionen.",
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
