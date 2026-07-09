import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Navn skal udfyldes").max(120),
  email: z.string().email("Ugyldig e-mail"),
  subject: z.string().min(2, "Emne skal udfyldes").max(200),
  message: z.string().min(20, "Beskeden skal være mindst 20 tegn").max(5000),
  _honeypot: z.string().max(0).optional(),
  _formStartedAt: z.number().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
