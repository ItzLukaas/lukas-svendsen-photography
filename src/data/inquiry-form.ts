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
  icon: LucideIcon;
}[] = [
  { id: "Event", label: "Event", icon: Sparkles },
  { id: "Sport", label: "Sport", icon: Trophy },
  { id: "Festival", label: "Festival", icon: Music2 },
  { id: "Erhverv", label: "Erhverv", icon: Briefcase },
  { id: "Portræt", label: "Portræt", icon: Camera },
  { id: "Video", label: "Video", icon: Video },
  { id: "Drone", label: "Drone", icon: Plane },
  { id: "Andet", label: "Andet", icon: Clapperboard },
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
  "Detaljer",
  "Beskriv",
  "Kontakt",
] as const;

export const TOTAL_INQUIRY_STEPS = inquiryStepLabels.length;
