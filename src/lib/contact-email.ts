import { siteConfig } from "@/data/photos";
import type { ContactInput } from "@/lib/contact-schema";
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

function buildOwnerHtml(contact: ContactInput) {
  const body = `
    ${emailParagraph(`Du har modtaget en ny besked fra ${contact.name}.`)}
    ${emailInfoTable(
      [
        emailRow("Emne", contact.subject),
        emailRow("Navn", contact.name),
        emailRow("E-mail", contact.email),
        emailRow("Besked", contact.message),
      ].join(""),
    )}
  `;

  return buildBrandedEmail({
    preheader: `Ny kontaktbesked fra ${contact.name}`,
    title: "Ny kontaktbesked",
    body,
    cta: {
      label: "Svar kunden",
      href: `mailto:${contact.email}`,
    },
  });
}

function buildConfirmationHtml(contact: ContactInput) {
  const body = `
    ${emailParagraph(`Hej ${contact.name},`)}
    ${emailParagraph(
      "Tak for din besked — jeg har modtaget den og vender tilbage hurtigst muligt.",
    )}
    ${emailParagraph("Her er en kopi af det, du sendte:")}
    ${emailInfoTable(
      [
        emailRow("Emne", contact.subject),
        emailRow("Besked", contact.message),
      ].join(""),
    )}
    ${emailParagraph("Du kan svare direkte på denne mail, hvis du vil tilføje noget.")}
    ${emailParagraph(`Kh ${siteConfig.name}`)}
  `;

  return buildBrandedEmail({
    preheader: "Tak for din besked — jeg vender tilbage hurtigst muligt",
    title: "Tak for din besked",
    body,
    cta: {
      label: "Besøg min hjemmeside",
      href: siteConfig.url,
    },
  });
}

export async function sendContactEmails(contact: ContactInput) {
  if (!resend) {
    console.warn("[contact] RESEND_API_KEY not set — emails skipped.");
    return { sent: false, error: "RESEND_API_KEY not configured" };
  }

  const ownerResult = await resend.emails.send({
    from: buildFromAddress(),
    to: toEmail,
    subject: `Kontakt — ${contact.subject} (${contact.name})`,
    html: buildOwnerHtml(contact),
    replyTo: contact.email,
  });

  if (ownerResult.error) {
    console.error("[contact] Resend owner error:", ownerResult.error);
    return {
      sent: false,
      error: ownerResult.error.message ?? "Kunne ikke sende kontakt-mail",
    };
  }

  const confirmResult = await resend.emails.send({
    from: buildFromAddress(),
    to: contact.email,
    subject: "Tak for din besked — Lukas Svendsen",
    html: buildConfirmationHtml(contact),
    replyTo: siteConfig.email,
  });

  if (confirmResult.error) {
    console.warn("[contact] Confirmation email failed:", confirmResult.error);
  }

  return { sent: true };
}
