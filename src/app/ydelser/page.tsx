import type { Metadata } from "next";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { webPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

const pageDescription =
  "Eventfotograf, sportfotograf, koncertfotograf og erhvervsfotograf — plus videoproduktion og droneflyvning fra Lukas Svendsen i Grindsted og Billund.";

export const metadata: Metadata = pageMetadata({
  title: "Ydelser — foto, video og drone",
  description: pageDescription,
  path: "/ydelser",
  keywords: [
    "fotograf ydelser",
    "eventfotograf",
    "sportfotograf",
    "koncertfotograf",
    "festivalfotograf",
    "erhvervsfotograf",
    "videoproduktion",
    "droneflyvning",
    "Lukas Svendsen",
  ],
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
      <div className="min-h-screen bg-background pt-28">
        <ServicesSection />
      </div>
    </>
  );
}
