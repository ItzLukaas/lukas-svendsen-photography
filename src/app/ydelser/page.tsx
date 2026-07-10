import type { Metadata } from "next";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { webPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

const pageDescription =
  "Fotografering, videoproduktion og droneflyvning fra Lukas Svendsen — fotograf i Grindsted og Billund. Se ydelser og book et uforpligtende tilbud.";

export const metadata: Metadata = pageMetadata({
  title: "Ydelser",
  description: pageDescription,
  path: "/ydelser",
  keywords: ["fotografering", "videoproduktion", "drone", "fotograf", "Lukas Svendsen"],
});

export default function YdelserIndexPage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          title: "Ydelser",
          description: pageDescription,
          path: "/ydelser",
        })}
      />
      <div className="min-h-screen bg-[#0a0a0a] pt-28">
        <ServicesSection />
      </div>
    </>
  );
}
