import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/photos";

export const alt = `${siteConfig.name} — fotograf og videoproducent`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#ffffff",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            opacity: 0.45,
          }}
        >
          Fotograf · Videograf · Dronepilot
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 300, lineHeight: 1.05, marginBottom: 24 }}>
            {siteConfig.name}
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.4, opacity: 0.72, maxWidth: 760 }}>
            Eventfotografi, sportsfotografi, erhvervsfoto og visuel produktion i Midt- og Syddanmark.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.2em",
            opacity: 0.4,
          }}
        >
          lukassvendsen.dk
        </div>
      </div>
    ),
    size,
  );
}
