import type { LucideIcon } from "lucide-react";
import {
  Aperture,
  Camera,
  Layers,
  LayoutTemplate,
  Timer,
  UserRound,
} from "lucide-react";

export type ValueProp = {
  id: string;
  title: string;
  body: string;
  icon: LucideIcon;
};

/**
 * Why choose Lukas — compact benefit cards for the homepage value section.
 */
export const valueProps: ValueProp[] = [
  {
    id: "personal",
    title: "Personlig tilgang",
    body: "Jeg går ind i hvert projekt med fokus på dig, dit brand og det, du gerne vil fortælle — privat, forening eller virksomhed.",
    icon: UserRound,
  },
  {
    id: "creative",
    title: "Kreativt blik",
    body: "Jeg tænker i stemning, fortælling og udtryk — ikke kun i enkeltstående billeder.",
    icon: Aperture,
  },
  {
    id: "pro",
    title: "Professionelt resultat",
    body: "Udstyr, lys og efterbehandling er gennemtænkt, så resultatet står skarpt og professionelt.",
    icon: Camera,
  },
  {
    id: "flexible",
    title: "Skræddersyet produktion",
    body: "Fra én fotografering til event, web-materiale eller løbende content — omfanget tilpasses dig.",
    icon: Layers,
  },
  {
    id: "delivery",
    title: "Hurtig levering",
    body: "Du får det færdige materiale leveret effektivt, så du hurtigt kan bruge det.",
    icon: Timer,
  },
  {
    id: "usable",
    title: "Indhold der kan bruges",
    body: "Indholdet tænkes til web, SoMe, kampagner og de formater, hvor det faktisk skal leve.",
    icon: LayoutTemplate,
  },
];
