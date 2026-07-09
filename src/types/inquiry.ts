export type ServiceType = "fotografering" | "videoproduktion" | "droneproduktion";

export interface ScheduleSlot {
  date: string;
  startTime: string;
  endTime: string;
}

export interface InquiryPayload {
  service: ServiceType;
  category: string;
  categoryOther?: string;
  schedule: ScheduleSlot[];
  flexibleSchedule: boolean;
  name: string;
  company?: string;
  email: string;
  phone: string;
  location: string;
  description: string;
  _honeypot?: string;
  _formStartedAt?: number;
}

export interface StoredInquiry extends InquiryPayload {
  id: string;
  createdAt: string;
  ipHash?: string;
}
