import { z } from "zod";

import { productionTypes } from "@/lib/booking/schema";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Skriv dit navn"),
  email: z.email("Skriv en gyldig email"),
  phone: z.string().trim().optional(),
  company: z.string().trim().optional(),
  projectType: z
    .union([z.enum(productionTypes), z.literal("")])
    .optional(),
  message: z.string().trim().min(10, "Skriv lidt mere i beskeden"),
});

export type ContactInput = z.infer<typeof contactSchema>;
