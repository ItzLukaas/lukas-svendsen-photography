import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { seoServices } from "@/data/seo-services";
import { webPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { sectionBody, sectionLabel, sectionTitle } from "@/lib/styles";

const pageDescription =
  "Eventfotograf, sportsfotograf, koncertfotograf, bryllupsfotograf, erhvervsfotograf, videograf og dronefoto. Se alle ydelser fra Lukas Svendsen.";

export const metadata: Metadata = pageMetadata({
  title: "Ydelser",
  description: pageDescription,
  path: "/ydelser",
  keywords: [
    "eventfotograf",
    "sportsfotograf",
    "koncertfotograf",
    "bryllupsfotograf",
    "erhvervsfotograf",
    "videograf",
    "dronefoto",
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
      <div className="min-h-screen bg-[#0a0a0a] pt-28">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-24">
          <Breadcrumbs
            items={[
              { name: "Forside", path: "/" },
              { name: "Ydelser", path: "/ydelser" },
            ]}
          />
          <header className="mb-14 text-center">
            <p className={sectionLabel}>Ydelser</p>
            <h1 className={sectionTitle}>Foto, video og drone</h1>
            <p className={`mx-auto mt-7 max-w-3xl ${sectionBody}`}>
              Jeg arbejder med fotografering, videoproduktion og droneoptagelser til events, sport,
              erhverv og private projekter i Midt- og Syddanmark.
            </p>
          </header>

          <section aria-labelledby="services-heading">
            <h2 id="services-heading" className="sr-only">
              Alle ydelser
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {seoServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/ydelser/${service.slug}`}
                    className="block border border-white/10 px-5 py-4 text-sm text-white/60 transition-colors duration-500 ease-premium hover:border-white/20 hover:text-white"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
