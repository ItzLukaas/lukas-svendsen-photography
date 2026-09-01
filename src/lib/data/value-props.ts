import type { LucideIcon } from "lucide-react";
import { Camera, Clapperboard, Layers } from "lucide-react";

export type ValueProp = {
  id: string;
  title: string;
  body: string;
  icon: LucideIcon;
};

export const valueProps: ValueProp[] = [
  {
    id: "production",
    title: "Hel produktion",
    body: "Du får foto, video, drone og content fra én kontakt. Det giver et samlet udtryk og gør det nemmere at planlægge, uanset om opgaven er lille eller større.",
    icon: Camera,
  },
  {
    id: "on-site",
    title: "På opgaven",
    body: "Jeg møder op forberedt og tilpasser mig situationen på stedet. Målet er altid det samme: at levere materiale, du faktisk kan bruge bagefter.",
    icon: Clapperboard,
  },
  {
    id: "delivery",
    title: "Klar til brug",
    body: "Du modtager filer i de formater, der passer til dit behov. Klar til web, sociale medier, intern brug eller videre produktion.",
    icon: Layers,
  },
];
