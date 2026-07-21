import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Camera,
  Clapperboard,
  Music2,
  Plane,
  Sparkles,
  Trophy,
  Video,
} from "lucide-react";
import type { TaskType } from "@/lib/inquiry-draft";
import type { ServiceType } from "@/types/inquiry";

export type { TaskType };

export const inquiryTaskTypes: {
  id: TaskType;
  label: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    id: "Event",
    label: "Event",
    description: "Koncerter, arrangementer og oplevelser",
    icon: Sparkles,
  },
  {
    id: "Sport",
    label: "Sport",
    description: "Kampe, turneringer og action",
    icon: Trophy,
  },
  {
    id: "Festival",
    label: "Festival",
    description: "Musik, kultur og store begivenheder",
    icon: Music2,
  },
  {
    id: "Erhverv",
    label: "Erhverv",
    description: "Virksomheder, branding og content",
    icon: Briefcase,
  },
  {
    id: "Portræt",
    label: "Portræt",
    description: "Personer, teams og headshots",
    icon: Camera,
  },
  {
    id: "Video",
    label: "Video",
    description: "Film, content og produktion",
    icon: Video,
  },
  {
    id: "Drone",
    label: "Drone",
    description: "Luftfoto og luftvideo",
    icon: Plane,
  },
  {
    id: "Andet",
    label: "Andet",
    description: "Fortæl mig hvad du har brug for",
    icon: Clapperboard,
  },
];

/** @deprecated kept for email labels */
export const inquiryServices = inquiryTaskTypes;

export const inquiryCategories: Record<ServiceType, string[]> = {
  fotografering: [
    "Event",
    "Sport",
    "Festival",
    "Erhverv",
    "Portræt",
    "Andet",
  ],
  videoproduktion: ["Video", "Event", "Sport", "Erhverv", "Andet"],
  droneproduktion: ["Drone", "Event", "Erhverv", "Andet"],
};

export const serviceLabels: Record<ServiceType, string> = {
  fotografering: "Fotografering",
  videoproduktion: "Videoproduktion",
  droneproduktion: "Droneflyvning",
};

export const inquiryStepLabels = [
  "Type",
  "Hvornår",
  "Hvor",
  "Beskriv",
  "Kontakt",
  "Opsummering",
] as const;

export const TOTAL_INQUIRY_STEPS = inquiryStepLabels.length;
