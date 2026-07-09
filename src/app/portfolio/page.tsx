import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { GallerySkeleton } from "@/components/ui/GallerySkeleton";
import { photos } from "@/data/photos";
import { breadcrumbJsonLd, portfolioGalleryJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { sectionBody, sectionLabel, sectionTitle } from "@/lib/styles";

const MasonryGallery = dynamic(
  () =>
    import("@/components/MasonryGallery").then((mod) => ({
      default: mod.MasonryGallery,
    })),
  { loading: () => <GallerySkeleton /> },
);

export const metadata: Metadata = pageMetadata({
  title: "Portefølje",
  description:
    "Portefølje med sportsfotografi, eventfoto, koncertfoto og erhvervsfoto fra Lukas Svendsen — fotograf, videograf og dronepilot i Midt- og Syddanmark.",
  path: "/portfolio",
  keywords: [
    "portefølje fotograf",
    "sportsfotograf Danmark",
    "eventfotograf",
    "håndboldfoto",
    "Lukas Svendsen",
    "fotograf Grindsted",
  ],
});

export default function PortfolioPage() {
  const gallerySchemaImages = photos.slice(0, 20);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Forside", path: "/" },
          { name: "Portefølje", path: "/portfolio" },
        ])}
      />
      <JsonLd data={portfolioGalleryJsonLd(gallerySchemaImages)} />
      <div className="min-h-screen bg-[#0a0a0a] pt-28">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <Breadcrumbs
            items={[
              { name: "Forside", path: "/" },
              { name: "Portefølje", path: "/portfolio" },
            ]}
          />
          <ScrollReveal className="mb-20 text-center">
            <p className={sectionLabel}>Galleri</p>
            <h1 className={sectionTitle}>Portefølje</h1>
            <p className={`mx-auto mt-7 max-w-lg ${sectionBody}`}>
              Et udvalg af mine billeder — hvert et øjeblik fanget med hjertet.
            </p>
          </ScrollReveal>

          <MasonryGallery photos={photos} />
        </div>
      </div>
    </>
  );
}
