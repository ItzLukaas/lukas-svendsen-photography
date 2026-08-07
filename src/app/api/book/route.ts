import { NextResponse } from "next/server";
import { Resend } from "resend";

import { bookingSchema } from "@/lib/booking/schema";
import { siteConfig } from "@/lib/site";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);

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
      console.info("[booking]", data);
      return NextResponse.json({
        ok: true,
        mode: "logged",
      });
    }

    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.BOOKING_FROM_EMAIL ?? "book@lukassvendsen.dk",
      to,
      replyTo: data.email,
      subject: `Booking: ${data.productionType} — ${data.name}`,
      text: [
        `Navn: ${data.name}`,
        `Virksomhed: ${data.company || "—"}`,
        `Email: ${data.email}`,
        `Telefon: ${data.phone}`,
        `Type: ${data.productionType}`,
        `Dato/periode: ${data.datePeriod}`,
        `Lokation: ${data.location}`,
        `Budget: ${data.budget || "—"}`,
        "",
        data.description,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[booking]", error);
    return NextResponse.json(
      { error: "Kunne ikke sende forespørgslen" },
      { status: 500 }
    );
  }
}
