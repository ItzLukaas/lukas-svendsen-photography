import { z } from "zod";

const scheduleSlotSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Ugyldig dato"),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Ugyldigt starttidspunkt"),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, "Ugyldigt sluttidspunkt"),
});

export const inquirySchema = z
  .object({
    service: z.enum(["fotografering", "videoproduktion", "droneproduktion"]),
    category: z.string().min(1, "Vælg en kategori").max(120),
    categoryOther: z.string().max(500).optional(),
    schedule: z.array(scheduleSlotSchema),
    flexibleSchedule: z.boolean(),
    name: z.string().min(2, "Navn skal udfyldes").max(120),
    company: z.string().max(120).optional(),
    email: z.string().email("Ugyldig e-mail"),
    phone: z.string().min(6, "Telefonnummer skal udfyldes").max(30),
    location: z.string().min(2, "Lokation skal udfyldes").max(200),
    description: z.string().min(20, "Beskriv projektet med mindst 20 tegn").max(5000),
    _honeypot: z.string().max(0).optional(),
    _formStartedAt: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.category === "Andet" && !data.categoryOther?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Beskriv venligst din kategori",
        path: ["categoryOther"],
      });
    }

    if (!data.flexibleSchedule) {
      if (data.schedule.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Vælg mindst én dato eller marker fleksibel",
          path: ["schedule"],
        });
      }

      for (const slot of data.schedule) {
        if (slot.startTime >= slot.endTime) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Sluttidspunkt skal være efter starttidspunkt",
            path: ["schedule"],
          });
          break;
        }
      }
    }
  });

export type InquiryInput = z.infer<typeof inquirySchema>;
