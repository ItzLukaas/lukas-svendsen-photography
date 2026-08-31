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
    id: "sport",
    title: "Sport og håndbold",
    body: "DM-finaler, Super Cup og klubkampe — action, jubel og de øjeblikke, der afgør kampen.",
    icon: Trophy,
  },
  {
    id: "concert",
    title: "Koncert og festival",
    body: "Smukfest, Grøn Koncert, Varde Open Air og Suset — live fra scenen og publikum.",
    icon: Music2,
  },
  {
    id: "delivery",
    title: "Klar til brug",
    body: "Billeder og video leveret i de formater, kunderne faktisk bruger — web, SoMe og presse.",
    icon: Camera,
  },
];
