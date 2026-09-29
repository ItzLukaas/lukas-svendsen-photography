import { z } from "zod";

import { productionTypes } from "@/lib/booking/schema";

export type ContactValidationMessages = {
  nameRequired: string;
  emailInvalid: string;
  messageRequired: string;
};

export const contactValidationDa: ContactValidationMessages = {
  nameRequired: "Skriv dit navn",
  emailInvalid: "Skriv en gyldig email",
  messageRequired: "Skriv lidt mere i beskeden",
};

export function createContactSchema(messages: ContactValidationMessages) {
  return z.object({
    name: z.string().trim().min(2, messages.nameRequired),
    email: z.email(messages.emailInvalid),
    phone: z.string().trim().optional(),
    company: z.string().trim().optional(),
    projectType: z.union([z.enum(productionTypes), z.literal("")]).optional(),
    message: z.string().trim().min(10, messages.messageRequired),
  });
}

/** Default Danish schema for API validation. */
export const contactSchema = createContactSchema(contactValidationDa);

export type ContactInput = z.infer<typeof contactSchema>;
