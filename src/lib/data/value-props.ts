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
    body: "Foto, video, drone og content fra én kontakt.",
    icon: Camera,
  },
  {
    id: "on-site",
    title: "På opgaven",
    body: "Jeg møder op og fanger det, der skal med.",
    icon: Clapperboard,
  },
  {
    id: "delivery",
    title: "Klar til brug",
    body: "Leveret i de formater, du faktisk bruger.",
    icon: Layers,
  },
];
