import type { LucideIcon } from "lucide-react";
import {
  Camera,
  Clapperboard,
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
    title: "Droneoptagelser",
    bookingType: "Droneproduktion",
    description: "Luftfoto og video med klart overblik.",
    icon: Plane,
  },
];

/**
 * Expanded video & drone points shown under the service offers.
 */
export const videoServiceFeatures: VideoServiceFeature[] = [
  {
    id: "drone",
    title: "Droneoptagelser",
    body: "Få et helt andet perspektiv på dit projekt. Jeg bruger droneoptagelser til at skabe stemning, overblik og dynamik – uanset om det er en virksomhed, et event, en lokation eller noget helt fjerde.",
    icon: Plane,
  },
  {
    id: "some",
    title: "SoMe & YouTube",
    body: "Dit indhold skal kunne bruges mere end ét sted. Jeg tilpasser optagelserne, så de fungerer til både Instagram, TikTok, YouTube og andre platforme – så du får mest muligt ud af dit indhold.",
    icon: Clapperboard,
  },
  {
    id: "gear",
    title: "Professionelt udstyr",
    body: "Godt indhold starter med det rigtige udstyr. Jeg arbejder med professionelt kamera-, lyd- og lysudstyr for at sikre skarpe billeder, god lyd og et gennemført visuelt udtryk.",
    icon: Camera,
  },
  {
    id: "story",
    title: "Din historie, din stil",
    body: "Ingen projekter er ens. Derfor tager jeg udgangspunkt i dig, dit formål og det udtryk, du gerne vil skabe. Sammen finder vi den løsning, der passer bedst til projektet.",
    icon: UserRound,
  },
];
