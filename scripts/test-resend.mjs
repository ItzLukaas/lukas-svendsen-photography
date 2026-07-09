import { readFileSync } from "node:fs";
import { Resend } from "resend";

function loadEnvLocal() {
  try {
    const content = readFileSync(".env.local", "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx === -1) continue;
      const key = trimmed.slice(0, idx);
      const value = trimmed.slice(idx + 1);
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    console.error("Could not read .env.local");
    process.exit(1);
  }
}

loadEnvLocal();

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.INQUIRY_FROM_EMAIL ?? "kontakt@lukassvendsen.dk";
const to = process.env.INQUIRY_TO_EMAIL ?? "kontakt@lukassvendsen.dk";

if (!apiKey) {
  console.error("RESEND_API_KEY missing");
  process.exit(1);
}

const resend = new Resend(apiKey);

const result = await resend.emails.send({
  from: `Lukas Svendsen <${from}>`,
  to,
  subject: "Test — mail fra lukassvendsen.dk",
  html: "<p>Resend-test OK. Mail-systemet er klar.</p>",
});

if (result.error) {
  console.error("FAILED:", result.error);
  process.exit(1);
}

console.log("SUCCESS: email sent, id =", result.data?.id);
