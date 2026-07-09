import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { sendContactEmails } from "@/lib/contact-email";
import { rateLimit } from "@/lib/rate-limit";

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limit = rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000);

    if (!limit.success) {
      return NextResponse.json(
        { error: "For mange beskeder. Prøv igen senere." },
        { status: 429 },
      );
    }

    const body = await request.json();

    if (body._honeypot) {
      return NextResponse.json({ success: true });
    }

    const startedAt = body._formStartedAt as number | undefined;
    if (startedAt && Date.now() - startedAt < 3000) {
      return NextResponse.json({ error: "Ugyldig forespørgsel." }, { status: 400 });
    }

    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Valideringsfejl", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { _honeypot, _formStartedAt, ...data } = parsed.data;
    void _honeypot;
    void _formStartedAt;

    const { sent } = await sendContactEmails(data);

    if (!sent) {
      return NextResponse.json(
        { error: "E-mail kunne ikke sendes. Kontakt mig direkte på kontakt@lukassvendsen.dk." },
        { status: 503 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact] POST error:", error);
    return NextResponse.json(
      { error: "Der opstod en fejl. Prøv igen senere." },
      { status: 500 },
    );
  }
}
