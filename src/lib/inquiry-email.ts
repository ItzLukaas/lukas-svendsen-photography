import { siteConfig } from "@/data/photos";
import { serviceLabels } from "@/data/inquiry-form";
import type { StoredInquiry } from "@/types/inquiry";
import {
  buildBrandedEmail,
  buildFromAddress,
  emailInfoTable,
  emailParagraph,
  emailRow,
} from "@/lib/email-template";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const toEmail = process.env.INQUIRY_TO_EMAIL ?? siteConfig.email;

function formatDateDa(date: string) {
  return new Intl.DateTimeFormat("da-DK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function formatSchedule(inquiry: StoredInquiry) {
  if (inquiry.flexibleSchedule) {
    return "Fleksibel med dato og tidspunkt";
  }

  return inquiry.schedule
    .map(
      (slot) =>
        `${formatDateDa(slot.date)} · ${slot.startTime}–${slot.endTime}`,
    )
    .join("\n");
}

function formatCategory(inquiry: StoredInquiry) {
  return inquiry.category === "Andet"
    ? `Andet — ${inquiry.categoryOther ?? ""}`
    : inquiry.category;
}

function buildOwnerHtml(inquiry: StoredInquiry) {
  const body = `
    ${emailParagraph(`Du har modtaget en ny forespørgsel fra ${inquiry.name}.`)}
    ${emailInfoTable(
      [
        emailRow("Ydelse", serviceLabels[inquiry.service]),
        emailRow("Kategori", formatCategory(inquiry)),
        emailRow("Dato og tid", formatSchedule(inquiry)),
        emailRow("Navn", inquiry.name),
        inquiry.company ? emailRow("Virksomhed", inquiry.company) : "",
        emailRow("E-mail", inquiry.email),
        emailRow("Telefon", inquiry.phone),
        emailRow("Lokation", inquiry.location),
        emailRow("Beskrivelse", inquiry.description),
      ].join(""),
    )}
    ${emailParagraph(`Forespørgsels-ID: ${inquiry.id}`)}
  `;

  return buildBrandedEmail({
    preheader: `Ny forespørgsel fra ${inquiry.name}`,
    title: "Ny forespørgsel modtaget",
    body,
    cta: {
      label: "Svar kunden",
      href: `mailto:${inquiry.email}`,
    },
  });
}

function buildConfirmationHtml(inquiry: StoredInquiry) {
  const body = `
    ${emailParagraph(`Hej ${inquiry.name},`)}
    ${emailParagraph(
      "Tak for din forespørgsel — jeg har modtaget den og glæder mig til at høre mere om dit projekt. Jeg vender tilbage hurtigst muligt, typisk inden for 24 timer på hverdage.",
    )}
    ${emailParagraph("Her er en kort opsummering af det, du har sendt:")}
    ${emailInfoTable(
      [
        emailRow("Ydelse", serviceLabels[inquiry.service]),
        emailRow("Kategori", formatCategory(inquiry)),
        emailRow("Dato og tid", formatSchedule(inquiry)),
        emailRow("Lokation", inquiry.location),
        emailRow("Din beskrivelse", inquiry.description),
      ].join(""),
    )}
    ${emailParagraph(
      "Har du brug for at tilføje noget, kan du bare svare direkte på denne mail.",
    )}
    ${emailParagraph(`Kh ${siteConfig.name}`)}
  `;

  return buildBrandedEmail({
    preheader: "Tak for din forespørgsel — jeg vender tilbage hurtigst muligt",
    title: "Tak for din forespørgsel",
    body,
    cta: {
      label: "Besøg min hjemmeside",
      href: siteConfig.url,
    },
  });
}

export async function sendInquiryEmails(inquiry: StoredInquiry) {
  if (!resend) {
    console.warn("[inquiry] RESEND_API_KEY not set — emails skipped, inquiry saved locally.");
    return { sent: false };
  }

  const [ownerResult, confirmResult] = await Promise.all([
    resend.emails.send({
      from: buildFromAddress(),
      to: toEmail,
      subject: `Ny forespørgsel — ${serviceLabels[inquiry.service]} (${inquiry.name})`,
      html: buildOwnerHtml(inquiry),
      replyTo: inquiry.email,
    }),
    resend.emails.send({
      from: buildFromAddress(),
      to: inquiry.email,
      subject: "Tak for din forespørgsel — Lukas Svendsen",
      html: buildConfirmationHtml(inquiry),
      replyTo: siteConfig.email,
    }),
  ]);

  if (ownerResult.error || confirmResult.error) {
    console.error("[inquiry] Resend error:", ownerResult.error ?? confirmResult.error);
    throw new Error("Kunne ikke sende forespørgsels-mails");
  }

  return { sent: true };
}
