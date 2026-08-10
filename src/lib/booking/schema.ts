import { z } from "zod";

export const productionTypes = [
  "Fotografering",
  "Videoproduktion",
  "Droneproduktion",
  "Content",
  "Andet",
] as const;

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Skriv dit navn"),
  company: z.string().trim().optional(),
  email: z.email("Skriv en gyldig email"),
  phone: z.string().trim().min(8, "Skriv et telefonnummer"),
  productionType: z.enum(productionTypes),
  datePeriod: z.string().trim().min(2, "Skriv dato eller periode"),
  location: z.string().trim().min(2, "Skriv lokation"),
  description: z.string().trim().min(10, "Beskriv opgaven kort"),
  budget: z.string().trim().optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
