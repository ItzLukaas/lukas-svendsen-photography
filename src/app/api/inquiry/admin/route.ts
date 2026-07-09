import { NextResponse } from "next/server";
import { listInquiries } from "@/lib/inquiry-storage";

export async function GET(request: Request) {
  const secret = process.env.INQUIRY_ADMIN_SECRET;
  const auth = request.headers.get("authorization");

  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const inquiries = await listInquiries();
  return NextResponse.json(inquiries);
}
