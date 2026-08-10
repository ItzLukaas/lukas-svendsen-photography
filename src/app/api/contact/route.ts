import { NextResponse } from "next/server";
import { Resend } from "resend";

import { contactSchema } from "@/lib/contact/schema";
import { siteConfig } from "@/lib/site";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Ugyldig forespørgsel" },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.BOOKING_TO_EMAIL ?? siteConfig.email;

    if (!apiKey) {
      if (process.env.NODE_ENV === "production") {
        console.error("[contact] RESEND_API_KEY is not configured");
        return NextResponse.json(
          { error: "Kontaktformularen er midlertidigt utilgængelig" },
          { status: 503 }
        );
      }
      console.info("[contact] RESEND_API_KEY missing — accepted in development");
      return NextResponse.json({ ok: true, mode: "dev" });
    }

    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.BOOKING_FROM_EMAIL ?? "kontakt@lukassvendsen.dk",
      to,
      replyTo: data.email,
      subject: `Kontakt: ${data.name}`,
      text: [
        `Navn: ${data.name}`,
        `Email: ${data.email}`,
        `Telefon: ${data.phone || "—"}`,
        `Virksomhed: ${data.company || "—"}`,
        "",
        data.message,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    console.error("[contact] send failed");
    return NextResponse.json(
      { error: "Kunne ikke sende beskeden" },
      { status: 500 }
    );
  }
}
