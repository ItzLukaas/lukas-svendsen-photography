import type { LucideIcon } from "lucide-react";
import { Camera, Music2, Trophy } from "lucide-react";

export type ValueProp = {
  id: string;
  title: string;
  body: string;
  icon: LucideIcon;
};

/** Concrete proof points — not generic agency copy. */
export const valueProps: ValueProp[] = [
  {
    id: "versatile",
    title: "Bredt setup",
    body: "Foto, video, drone og content. Private og erhverv. Vi finder løsningen til opgaven.",
    icon: Camera,
  },
  {
    id: "concert",
    title: "Koncert og festival",
    body: "Smukfest, Grøn Koncert, Varde Open Air og Suset. Live fra scenen og publikum.",
    icon: Music2,
  },
  {
    id: "delivery",
    title: "Klar til brug",
    body: "Billeder og video i de formater, du faktisk bruger. Web, SoMe og presse.",
    icon: Trophy,
  },
];
