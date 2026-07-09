import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/inquiry-schema";
import { saveInquiry } from "@/lib/inquiry-storage";
import { sendInquiryEmails } from "@/lib/inquiry-email";
import { rateLimit } from "@/lib/rate-limit";

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function hashIp(ip: string) {
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limit = rateLimit(`inquiry:${ip}`);

    if (!limit.success) {
      return NextResponse.json(
        { error: "For mange forespørgsler. Prøv igen senere." },
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

    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Valideringsfejl", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { _honeypot, _formStartedAt, ...data } = parsed.data;
    void _honeypot;
    void _formStartedAt;

    const record = await saveInquiry(data, hashIp(ip));
    const { sent } = await sendInquiryEmails(record);

    if (!sent) {
      return NextResponse.json(
        { error: "E-mail kunne ikke sendes. Kontakt mig direkte på kontakt@lukassvendsen.dk." },
        { status: 503 },
      );
    }

    return NextResponse.json({ success: true, id: record.id });
  } catch (error) {
    console.error("[inquiry] POST error:", error);
    return NextResponse.json(
      { error: "Der opstod en fejl. Prøv igen senere." },
      { status: 500 },
    );
  }
}
