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
    description: "Portræt, produkt, event, branding og private arrangementer.",
    icon: Camera,
  },
  {
    id: "video",
    title: "Video",
    bookingType: "Videoproduktion",
    description: "Profilfilm, eventfilm, SoMe og korte klip.",
    icon: Video,
  },
  {
    id: "drone",
    title: "Drone",
    bookingType: "Droneproduktion",
    description: "Luftfoto og luftvideo med klart overblik.",
    icon: Plane,
  },
  {
    id: "content",
    title: "Content",
    bookingType: "Content",
    description: "Web, SoMe, kampagner og løbende pakker.",
    icon: Layers,
  },
];

/**
 * Expanded content points under the service offers —
 * broad enough for companies, events, associations and one-off jobs.
 */
export const videoServiceFeatures: VideoServiceFeature[] = [
  {
    id: "web-brand",
    title: "Web og branding",
    body: "Foto og video til hjemmeside, branding og marketing. Materiale der ser skarpt ud og kan bruges med det samme.",
    icon: Camera,
  },
  {
    id: "some",
    title: "SoMe og kampagner",
    body: "Content til sociale medier, lanceringer og kampagner. Formateret til de platforme, det skal leve på.",
    icon: Clapperboard,
  },
  {
    id: "event-drone",
    title: "Events og drone",
    body: "Recaps, aftermovies, produktfilm og droneoptagelser. Når overblikket eller bevægelsen gør en forskel.",
    icon: Plane,
  },
  {
    id: "tailored",
    title: "Tilpasset opgaven",
    body: "Ét shoot, en eventproduktion eller en løbende contentpakke. Omfanget tilpasser vi sammen.",
    icon: UserRound,
  },
];
