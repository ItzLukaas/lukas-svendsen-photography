import { Breadcrumbs, type BreadcrumbItem } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import type { SeoService } from "@/data/seo-services";
import { webPageJsonLd } from "@/lib/json-ld";
import { sectionBody, sectionLabel, sectionTitle } from "@/lib/styles";

const PULL_QUOTE =
  "En god video handler ikke kun om flotte billeder – lyden, lyssætningen og den samlede fortælling er mindst lige så vigtige.";

type VideoproduktionPageProps = {
  service: SeoService;
  breadcrumbs: BreadcrumbItem[];
};

export function VideoproduktionPage({ service, breadcrumbs }: VideoproduktionPageProps) {
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

      <div className="min-h-screen bg-[#0a0a0a] pt-28">
        <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8 lg:py-24">
          <Breadcrumbs items={breadcrumbs} />

          <header className="mb-14">
            <p className={sectionLabel}>Ydelser</p>
            <h1 className={sectionTitle}>{service.h1}</h1>
            <p className={`mt-7 max-w-3xl ${sectionBody}`}>{service.intro}</p>
          </header>

          {sections.map((section, index) => (
            <article
              key={section.heading}
              className={index > 0 ? "mt-16 border-t border-white/[0.06] pt-16 sm:mt-20 sm:pt-20" : undefined}
            >
              {section.label && <p className={sectionLabel}>{section.label}</p>}
              <h2
                className={`font-display text-2xl font-light text-white sm:text-3xl${
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
                        ? "text-lg leading-[1.8] text-white/70 md:text-[1.125rem]"
                        : sectionBody
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {index === 1 && (
                <blockquote className="my-14 border-l border-white/20 py-1 pl-6 sm:my-16 sm:pl-8">
                  <p className="font-display text-2xl font-light leading-snug text-white/90 sm:text-3xl sm:leading-[1.25]">
                    {PULL_QUOTE}
                  </p>
                </blockquote>
              )}
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
