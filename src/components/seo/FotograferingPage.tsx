import { Breadcrumbs, type BreadcrumbItem } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import type { SeoService } from "@/data/seo-services";
import { getPhotoAltBySrc } from "@/data/photos";
import { webPageJsonLd } from "@/lib/json-ld";
import { IMAGE_QUALITY } from "@/lib/image";
import { sectionBody, sectionLabel } from "@/lib/styles";

const HERO_IMAGE = "/images/portfolio/handbold/DSC02502.webp";
const FEATURE_IMAGE = "/images/portfolio/andet/DSC05265.webp";
const GALLERY_IMAGES = [
  "/images/portfolio/andet/DSC05489.webp",
  "/images/portfolio/andet/DSC05724.webp",
  "/images/portfolio/andet/DSC04919.webp",
] as const;

const PULL_QUOTE =
  "De bedste billeder opstår, når man forstår situationen og menneskene foran kameraet.";

type FotograferingPageProps = {
  service: SeoService;
  breadcrumbs: BreadcrumbItem[];
};

export function FotograferingPage({ service, breadcrumbs }: FotograferingPageProps) {
  const [opening, ...rest] = service.paragraphs;
  const closing = rest.pop();
  const body = rest;

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          title: service.title,
          description: service.metaDescription,
          path: `/ydelser/${service.slug}`,
        })}
      />

      <div className="bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-6 pt-28 lg:px-10 lg:pt-32">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* Hero */}
        <section className="relative min-h-[50vh] overflow-hidden sm:min-h-[58vh] lg:min-h-[65vh]">
          <OptimizedImage
            src={HERO_IMAGE}
            alt={getPhotoAltBySrc(HERO_IMAGE, "Håndboldspillere fejrer sejr i klubtrøjer med pokal")}
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
            <h1 className="mt-4 max-w-3xl font-display text-[2.5rem] font-light leading-[1.06] text-white sm:text-5xl lg:text-6xl">
              {service.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl md:leading-[1.65]">
              {service.intro}
            </p>
          </div>
        </section>

        {/* Editorial body */}
        <section className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-24">
          {opening && (
            <p className="text-lg leading-[1.8] text-white/70 md:text-[1.125rem]">{opening}</p>
          )}

          <div className="relative my-14 aspect-[16/10] overflow-hidden sm:my-16">
            <OptimizedImage
              src={FEATURE_IMAGE}
              alt={getPhotoAltBySrc(FEATURE_IMAGE)}
              fill
              loading="lazy"
              quality={IMAGE_QUALITY.gallery}
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/30 to-transparent" />
          </div>

          <div className="space-y-6">
            {body.slice(0, 2).map((paragraph) => (
              <p key={paragraph} className={sectionBody}>
                {paragraph}
              </p>
            ))}
          </div>

          <blockquote className="my-14 border-l border-white/20 py-1 pl-6 sm:my-16 sm:pl-8">
            <p className="font-display text-2xl font-light leading-snug text-white/90 sm:text-3xl sm:leading-[1.25]">
              {PULL_QUOTE}
            </p>
          </blockquote>

          <div className="space-y-6">
            {body.slice(2).map((paragraph) => (
              <p key={paragraph} className={sectionBody}>
                {paragraph}
              </p>
            ))}
          </div>

          {closing && (
            <p className="mt-10 text-lg leading-[1.8] text-white/70 md:text-[1.125rem]">{closing}</p>
          )}
        </section>

        {service.sections?.map((section) => (
          <section
            key={section.heading}
            className="border-t border-white/[0.06] px-6 py-16 lg:px-8 lg:py-24"
          >
            <div className="mx-auto max-w-3xl">
              {section.label && <p className={sectionLabel}>{section.label}</p>}
              <h2 className="mt-4 font-display text-2xl font-light text-white sm:text-3xl lg:text-[2rem]">
                {section.heading}
              </h2>
              <div className="mt-8 space-y-6">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className={sectionBody}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Image strip */}
        <section className="border-t border-white/[0.06] px-6 py-14 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-3 sm:gap-4">
            {GALLERY_IMAGES.map((src) => (
              <div key={src} className="relative aspect-[4/5] overflow-hidden">
                <OptimizedImage
                  src={src}
                  alt={getPhotoAltBySrc(src)}
                  fill
                  loading="lazy"
                  quality={IMAGE_QUALITY.gallery}
                  className="object-cover object-center transition-transform duration-700 ease-premium hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
