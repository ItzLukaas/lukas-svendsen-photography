import { z } from "zod";

export const productionTypes = [
  "Fotografering",
  "Videoproduktion",
  "Droneproduktion",
  "Content",
  "Andet",
] as const;

export type BookingValidationMessages = {
  nameRequired: string;
  emailInvalid: string;
  phoneRequired: string;
  productionTypeRequired: string;
  datePeriodRequired: string;
  locationRequired: string;
  descriptionRequired: string;
};

export const bookingValidationDa: BookingValidationMessages = {
  nameRequired: "Skriv dit navn",
  emailInvalid: "Skriv en gyldig email",
  phoneRequired: "Skriv et telefonnummer",
  productionTypeRequired: "Vælg type produktion",
  datePeriodRequired: "Skriv dato eller periode",
  locationRequired: "Skriv lokation",
  descriptionRequired: "Beskriv opgaven kort",
};

export function createBookingSchema(messages: BookingValidationMessages) {
  return z.object({
    name: z.string().trim().min(2, messages.nameRequired),
    company: z.string().trim().optional(),
    email: z.email(messages.emailInvalid),
    phone: z.string().trim().min(8, messages.phoneRequired),
    productionType: z.enum(productionTypes, {
      message: messages.productionTypeRequired,
    }),
    datePeriod: z.string().trim().min(2, messages.datePeriodRequired),
    location: z.string().trim().min(2, messages.locationRequired),
    description: z.string().trim().min(10, messages.descriptionRequired),
    budget: z.string().trim().optional(),
  });
}

/** Default Danish schema for API validation. */
export const bookingSchema = createBookingSchema(bookingValidationDa);

export type BookingInput = z.infer<typeof bookingSchema>;
