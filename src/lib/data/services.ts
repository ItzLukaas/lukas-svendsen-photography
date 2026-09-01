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
      "Jeg tager stillbilleder med et professionelt udtryk, der passer til den opgave, du står med. Materialet leveres redigeret og klar til det, du skal bruge det til.",
    icon: Camera,
  },
  {
    id: "video",
    title: "Video",
    bookingType: "Videoproduktion",
    description:
      "Jeg producerer film og bevægeligt materiale til kampagner, kommunikation og digitale kanaler. Det kan være kortere klip eller en større produktion, afhængigt af behovet.",
    icon: Video,
  },
  {
    id: "drone",
    title: "Drone",
    bookingType: "Droneproduktion",
    description:
      "Når opgaven kræver perspektiv fra oven, leverer jeg luftfoto og luftvideo som en naturlig del af produktionen eller som en selvstændig opgave.",
    icon: Plane,
  },
  {
    id: "content",
    title: "Content",
    bookingType: "Content",
    description:
      "Jeg laver visuelt materiale til web, sociale medier og løbende kommunikation. Det skal fungere i praksis og ikke bare se godt ud i et galleri.",
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
    title: "Tilpasset opgaven",
    body: "Hver opgave er forskellig. Vi tager udgangspunkt i dit behov og finder sammen ud af omfang, form og leverance, så det passer til det, du skal bruge.",
    icon: UserRound,
  },
];
