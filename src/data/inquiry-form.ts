import type { LucideIcon } from "lucide-react";
import { Camera, Plane, Video } from "lucide-react";
import type { ServiceType } from "@/types/inquiry";

export const inquiryServices: {
  id: ServiceType;
  label: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    id: "fotografering",
    label: "Fotografering",
    description: "Events, sport, portrætter og virksomhed",
    icon: Camera,
  },
  {
    id: "videoproduktion",
    label: "Videoproduktion",
    description: "Film, content og professionel videoproduktion",
    icon: Video,
  },
  {
    id: "droneproduktion",
    label: "Droneproduktion",
    description: "Luftoptagelser og dronevideo",
    icon: Plane,
  },
];

export const inquiryCategories: Record<ServiceType, string[]> = {
  fotografering: [
    "Eventfotografering",
    "Sportfotografering",
    "Virksomhedsfotografering",
    "Portrætfotografering",
    "Bryllupsfotografering",
    "Konfirmation",
    "Produktfotografering",
    "Andet",
  ],
  videoproduktion: [
    "Eventvideo",
    "Sportsproduktion",
    "Reklamefilm",
    "Virksomhedsvideo",
    "Social media content",
    "Privatfilm",
    "Andet",
  ],
  droneproduktion: [
    "Ejendomsfilm",
    "Virksomhedsprofil",
    "Eventoptagelser",
    "Natur/lokationsvideo",
    "Sport og action",
    "Inspektion",
    "Andet",
  ],
};

export const serviceLabels: Record<ServiceType, string> = {
  fotografering: "Fotografering",
  videoproduktion: "Videoproduktion",
  droneproduktion: "Droneproduktion",
};

export const inquiryStepLabels = [
  "Ydelse",
  "Kategori",
  "Dato",
  "Detaljer",
  "Gennemgang",
] as const;
