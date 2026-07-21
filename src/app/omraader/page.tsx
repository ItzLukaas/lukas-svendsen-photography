import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { seoCities, cityPath } from "@/data/seo-cities";
import { webPageJsonLd } from "@/lib/json-ld";
import { btnPrimary, sectionBody, sectionLabel, sectionTitle } from "@/lib/styles";
import { pageMetadata } from "@/lib/seo";

const pageDescription =
  "Oversigt over områder, hvor Lukas Svendsen tilbyder fotografering, videoproduktion og droneflyvning — baseret i Grindsted og Billund, med opgaver i hele Danmark.";

export const metadata: Metadata = pageMetadata({
  title: "Fotograf i Danmark — områder",
  description: pageDescription,
  path: "/omraader",
  keywords: [
    "fotograf Danmark",
    "fotograf Grindsted",
    "fotograf Billund",
    "fotograf Vejle",
    "fotograf Kolding",
    "fotograf Midtjylland",
    "fotograf Syddanmark",
    "eventfotograf",
    "Lukas Svendsen",
  ],
});

const regionOrder = ["Syddanmark", "Midtjylland", "Jylland", "Fyn", "Sjælland"] as const;

function citiesByRegion() {
  const grouped = new Map<string, typeof seoCities>();

  for (const city of seoCities) {
    const list = grouped.get(city.region) ?? [];
    list.push(city);
    grouped.set(city.region, list);
  }

  return regionOrder
    .filter((region) => grouped.has(region))
    .map((region) => ({
      region,
      cities: grouped.get(region)!.sort((a, b) => a.name.localeCompare(b.name, "da")),
    }));
}

export default function OmraaderPage() {
  const regions = citiesByRegion();

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          title: "Områder",
          description: pageDescription,
          path: "/omraader",
        })}
      />
      <div className="min-h-screen bg-background pt-28">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <Breadcrumbs
            items={[
              { name: "Forside", path: "/" },
              { name: "Områder", path: "/omraader" },
            ]}
          />

          <div className="max-w-2xl">
            <p className={sectionLabel}>Områder</p>
            <h1 className={sectionTitle}>Hvor jeg tager opgaver</h1>
            <p className={`mt-8 ${sectionBody}`}>
              Jeg er baseret i Grindsted og tager opgaver i hele Danmark med fotografering,
              videoproduktion og droneflyvning. Her finder du et overblik over byer og områder,
              jeg ofte arbejder i.
            </p>
          </div>

          <div className="mt-16 space-y-14 md:mt-20">
            {regions.map(({ region, cities }) => (
              <section key={region} aria-labelledby={`region-${region}`}>
                <h2
                  id={`region-${region}`}
                  className="text-xs tracking-[0.25em] text-muted uppercase"
                >
                  {region}
                </h2>
                <ul className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                  {cities.map((city) => (
                    <li key={city.slug}>
                      <Link
                        href={cityPath(city)}
                        className="inline-flex min-h-11 items-center text-sm text-muted transition-colors duration-500 ease-premium hover:text-foreground"
                      >
                        {city.h1}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-20 border-t border-foreground/[0.06] pt-14 text-center">
            <p className="font-display text-xl font-light text-foreground sm:text-2xl">
              Dit område står ikke på listen?
            </p>
            <p className={`mx-auto mt-4 max-w-md ${sectionBody}`}>
              Skriv endelig — jeg tager opgaver i hele Danmark efter aftale.
            </p>
            <Link href="/kontakt" className={`mt-8 ${btnPrimary}`}>
              Kontakt mig
              <ArrowRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-500 ease-premium group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
