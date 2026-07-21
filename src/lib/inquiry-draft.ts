import type { ServiceType } from "@/types/inquiry";

export type TaskType =
  | "Event"
  | "Sport"
  | "Festival"
  | "Erhverv"
  | "Portræt"
  | "Video"
  | "Drone"
  | "Andet";

export interface InquiryDraft {
  step: number;
  taskType: TaskType | null;
  taskTypeOther: string;
  date: string;
  startTime: string;
  flexibleSchedule: boolean;
  location: string;
  description: string;
  name: string;
  company: string;
  phone: string;
  email: string;
}

export const INQUIRY_DRAFT_KEY = "lukas-inquiry-draft-v3";

export const initialInquiryDraft: InquiryDraft = {
  step: 1,
  taskType: null,
  taskTypeOther: "",
  date: "",
  startTime: "10:00",
  flexibleSchedule: false,
  location: "",
  description: "",
  name: "",
  company: "",
  phone: "",
  email: "",
};

export function loadInquiryDraft(): InquiryDraft | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(INQUIRY_DRAFT_KEY);
    if (!raw) return null;
    return { ...initialInquiryDraft, ...JSON.parse(raw) } as InquiryDraft;
  } catch {
    return null;
  }
}

export function saveInquiryDraft(draft: InquiryDraft) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(INQUIRY_DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // Storage full or unavailable — ignore silently
  }
}

export function clearInquiryDraft() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(INQUIRY_DRAFT_KEY);
}

export function mapTaskTypeToService(taskType: TaskType): ServiceType {
  if (taskType === "Video") return "videoproduktion";
  if (taskType === "Drone") return "droneproduktion";
  return "fotografering";
}

export function buildEndTime(startTime: string): string {
  const [h, m] = startTime.split(":").map(Number);
  const endHour = Math.min((h || 10) + 4, 23);
  return `${String(endHour).padStart(2, "0")}:${String(m || 0).padStart(2, "0")}`;
}
