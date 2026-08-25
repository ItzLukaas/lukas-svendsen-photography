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
    title: "Fotografering",
    bookingType: "Fotografering",
    description: "Koncert, event, sport, portræt og brand.",
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
    title: "Droneoptagelser",
    bookingType: "Droneproduktion",
    description: "Luftfoto og video med klart overblik.",
    icon: Plane,
  },
  {
    id: "content",
    title: "Contentproduktion",
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
    title: "Web & branding",
    body: "Foto og video til ny hjemmeside, branding og marketing — materiale der ser skarpt ud og kan bruges med det samme.",
    icon: Camera,
  },
  {
    id: "some",
    title: "SoMe & kampagner",
    body: "Content til sociale medier, lanceringer og kampagner. Formateret til de platforme, hvor det faktisk skal leve.",
    icon: Clapperboard,
  },
  {
    id: "event-drone",
    title: "Events, film & drone",
    body: "Recaps, aftermovies, produkt- og virksomhedsfilm samt dronefotos og -video, når overblikket gør en forskel.",
    icon: Plane,
  },
  {
    id: "tailored",
    title: "Skræddersyet efter behov",
    body: "Én fotografering, en eventproduktion, materiale til en ny hjemmeside eller en løbende contentpakke — vi tilpasser omfanget.",
    icon: UserRound,
  },
];
