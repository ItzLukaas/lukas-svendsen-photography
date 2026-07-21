import type { TaskType } from "@/lib/inquiry-draft";
import type { ServiceType } from "@/types/inquiry";

export type { TaskType };

export const inquiryTaskTypes: {
  id: TaskType;
  label: string;
}[] = [
  { id: "Event", label: "Event" },
  { id: "Sport", label: "Sport" },
  { id: "Festival", label: "Festival" },
  { id: "Erhverv", label: "Erhverv" },
  { id: "Portræt", label: "Portræt" },
  { id: "Video", label: "Video" },
  { id: "Drone", label: "Drone" },
  { id: "Andet", label: "Andet" },
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
