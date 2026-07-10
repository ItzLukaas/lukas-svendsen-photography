import { ImageResponse } from "next/og";

export const alt = "Lukas Svendsen — Fotograf | Videograf | Dronepilot";
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
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#ffffff",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 32,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            opacity: 0.55,
            marginBottom: 40,
          }}
        >
          Fotograf | Videograf | Dronepilot
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          Lukas Svendsen
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.18em",
            opacity: 0.45,
            marginTop: 48,
          }}
        >
          lukassvendsen.dk
        </div>
      </div>
    ),
    size,
  );
}
