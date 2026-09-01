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
    body: "Foto, video, drone og content fra én kontakt. Du får et samlet udtryk, uanset om det er ét job eller en større produktion.",
    icon: Camera,
  },
  {
    id: "on-site",
    title: "På opgaven",
    body: "Jeg møder op og fanger det, der skal med. Praktisk, rolig og fokuseret på at levere det, du har brug for.",
    icon: Clapperboard,
  },
  {
    id: "delivery",
    title: "Klar til brug",
    body: "Materialet leveres i de formater, du faktisk bruger. Klar til web, sociale medier og videre brug.",
    icon: Layers,
  },
];
