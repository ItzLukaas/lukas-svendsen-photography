import { Breadcrumbs, type BreadcrumbItem } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import type { SeoService } from "@/data/seo-services";
import { getPhotoAltBySrc } from "@/data/photos";
import { webPageJsonLd } from "@/lib/json-ld";
import { IMAGE_QUALITY } from "@/lib/image";
import { sectionBody, sectionLabel } from "@/lib/styles";

const DRONE_IMAGE = "/images/portfolio/drone/Drone.webp";

const PULL_QUOTE =
  "Den rigtige luftoptagelse kan fortælle en historie, fremhæve en lokation og give en oplevelse, som traditionelle billeder ikke kan.";

type DronePageProps = {
  service: SeoService;
  breadcrumbs: BreadcrumbItem[];
};

export function DronePage({ service, breadcrumbs }: DronePageProps) {
  const sections = service.sections ?? [];

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          title: service.title,
          description: service.metaDescription,
          path: `/ydelser/${service.slug}`,
        })}
      />

      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-6 pt-28 lg:px-10 lg:pt-32">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <section className="relative min-h-[50vh] overflow-hidden sm:min-h-[58vh] lg:min-h-[65vh]">
          <OptimizedImage
            src={DRONE_IMAGE}
            alt={getPhotoAltBySrc("/images/portfolio/drone/Drone.webp")}
            fill
            priority
            blur={false}
            quality={IMAGE_QUALITY.heroCarousel}
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/55 to-[#0a0a0a]/20" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/70 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 hero-vignette" />

          <div className="relative z-10 mx-auto flex min-h-[50vh] w-full max-w-7xl flex-col justify-end px-6 pb-14 sm:min-h-[58vh] lg:min-h-[65vh] lg:px-10 lg:pb-20">
            <p className={sectionLabel}>Ydelser</p>
            <h1 className="mt-4 max-w-3xl font-display text-[2.5rem] font-light leading-[1.06] text-foreground sm:text-5xl lg:text-6xl">
              {service.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/75 md:text-xl md:leading-[1.65]">
              {service.intro}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-24">
          {sections.map((section, index) => (
            <article
              key={section.heading}
              className={index > 0 ? "mt-16 border-t border-foreground/[0.06] pt-16 sm:mt-20 sm:pt-20" : undefined}
            >
              {section.label && <p className={sectionLabel}>{section.label}</p>}
              <h2
                className={`font-display text-2xl font-light text-foreground sm:text-3xl${
                  section.label ? " mt-4" : ""
                }`}
              >
                {section.heading}
              </h2>

              <div className={`space-y-6 ${index === 0 ? "mt-8" : "mt-7"}`}>
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraph}
                    className={
                      index === 0 && paragraphIndex === 0
                        ? "text-lg leading-[1.8] text-foreground/70 md:text-[1.125rem]"
                        : sectionBody
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {index === 1 && (
                <blockquote className="my-14 border-l border-foreground/20 py-1 pl-6 sm:my-16 sm:pl-8">
                  <p className="font-display text-2xl font-light leading-snug text-foreground/90 sm:text-3xl sm:leading-[1.25]">
                    {PULL_QUOTE}
                  </p>
                </blockquote>
              )}
            </article>
          ))}
        </section>
      </div>
    </>
  );
}
