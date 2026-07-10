import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  Briefcase,
  CalendarHeart,
  Layers,
  MessageCircle,
  Send,
  Sparkles,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { CityReferenceCard } from "@/components/seo/CityReferenceCard";
import { CityReveal } from "@/components/seo/CityReveal";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import type { SeoCity } from "@/data/seo-cities";
import { cityPath } from "@/data/seo-cities";
import {
  applyCityName,
  cityServiceCategories,
  getCityWhyChoose,
  type CityServiceCategory,
} from "@/data/city-landing";
import { photos, siteConfig } from "@/data/photos";
import { getReferenceBySlug } from "@/data/references";
import { localBusinessJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { IMAGE_QUALITY } from "@/lib/image";
import { ClientLogoSlider } from "@/components/sections/ClientLogoSlider";
import { clientLogos } from "@/data/clients";
import { btnGhost, btnPrimary, sectionBody, sectionLabel, sectionTitle } from "@/lib/styles";

const citySection = "bg-[#0a0a0a] px-6 py-32 lg:px-8 lg:py-40";
const cityDivider = "border-t border-white/[0.06]";

const serviceIcons: Record<
  Exclude<CityServiceCategory["icon"], "drone">,
  LucideIcon
> = {
  private: CalendarHeart,
  sport: Zap,
  events: Sparkles,
  business: Briefcase,
  production: Layers,
};

function DroneIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M4 8V6a2 2 0 0 1 2-2h2M20 8V6a2 2 0 0 0-2-2h-2M4 16v2a2 2 0 0 0 2 2h2M20 16v2a2 2 0 0 1-2 2h-2" />
    </svg>
  );
}

const whyIcons = {
  layers: Layers,
  users: Users,
  delivery: Send,
  dialog: MessageCircle,
} as const;

const InquiryWizard = dynamic(
  () =>
    import("@/components/inquiry/InquiryWizard").then((mod) => ({
      default: mod.InquiryWizard,
    })),
  {
    loading: () => (
      <div className="min-h-[320px] w-full animate-pulse bg-white/[0.03]" aria-hidden="true" />
    ),
  },
);

type CityLandingPageProps = {
  city: SeoCity;
};

export function CityLandingPage({ city }: CityLandingPageProps) {
  const path = cityPath(city);
  const portfolioPhotos = city.portfolioPhotoIds
    .map((id) => photos.find((photo) => photo.id === id))
    .filter((photo): photo is NonNullable<typeof photo> => Boolean(photo));

  const references = city.referenceSlugs
    .map((slug) => getReferenceBySlug(slug))
    .filter((reference): reference is NonNullable<typeof reference> => Boolean(reference));

  const whyChoose = getCityWhyChoose(city.name, city.preposition);

  return (
    <div className="city-landing">
      <JsonLd
        data={webPageJsonLd({
          title: city.title,
          description: city.metaDescription,
          path,
        })}
      />
      <JsonLd
        data={localBusinessJsonLd({
          cityName: city.name,
          path,
          description: city.metaDescription,
        })}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#070707] pt-[72px] lg:pt-[80px]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.04),transparent_55%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <CityReveal>
            <Breadcrumbs
              items={[
                { name: "Forside", path: "/" },
                { name: city.h1, path },
              ]}
            />
          </CityReveal>

          <div className="mt-10 grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
            <CityReveal delay={0.08} className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <p className={sectionLabel}>Fotograf · {city.region}</p>
              <h1 className="font-display text-[1.68rem] leading-[1.12] font-light text-white sm:text-4xl sm:leading-[1.1] lg:text-[2.5rem] xl:text-5xl">
                {city.h1}
              </h1>
              <p className={`mt-7 max-w-lg text-base leading-relaxed sm:text-lg ${sectionBody}`}>
                {city.intro}
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
                <Link href="#foresporgsel" className={btnPrimary}>
                  Få et tilbud
                  <ArrowRight
                    size={14}
                    strokeWidth={1.5}
                    className="transition-transform duration-500 ease-premium group-hover:translate-x-1"
                  />
                </Link>
                <Link href="/portfolio" className={btnGhost}>
                  Se portefølje
                </Link>
              </div>
            </CityReveal>

            <CityReveal delay={0.14} className="group mx-auto w-full max-w-sm lg:max-w-md lg:justify-self-end">
              <div className="border border-white/15 p-2.5 transition-all duration-700 ease-premium sm:p-3 group-hover:border-white/25">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#0a0a0a]">
                  <OptimizedImage
                    src={siteConfig.ogImage}
                    alt={`${siteConfig.name} — fotograf ${city.preposition} ${city.name}`}
                    fill
                    priority
                    fetchPriority="high"
                    quality={IMAGE_QUALITY.hero}
                    className="object-cover object-[50%_15%] transition-transform duration-700 ease-premium group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 80vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-transparent" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                </div>
              </div>
            </CityReveal>
          </div>

          <CityReveal delay={0.18} className="mt-20 border-t border-white/[0.06] pt-14 lg:mt-24 lg:pt-16">
            <p className="text-center text-xs tracking-[0.3em] text-white/40 uppercase">
              Betroet af stærke brands
            </p>
            <div className="mt-10 w-full">
              <ClientLogoSlider logos={clientLogos} />
            </div>
          </CityReveal>
        </div>
      </section>

      {/* Portfolio */}
      <section className={`${citySection} ${cityDivider}`} aria-labelledby="portfolio-heading">
        <div className="mx-auto max-w-7xl">
          <CityReveal>
            <h2 id="portfolio-heading" className="font-display text-2xl font-light text-white md:text-3xl lg:text-4xl">
              Udvalgte billeder
            </h2>
            <p className={`mt-5 max-w-2xl ${sectionBody}`}>
              Et udvalg af mit arbejde fra {city.name} og omegn — fanget med fokus på stemning, action og detaljer.
            </p>
          </CityReveal>
          <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
            {portfolioPhotos.map((photo, index) => (
              <CityReveal key={photo.id} delay={index * 0.05}>
                <li className="relative aspect-[4/3] overflow-hidden bg-[#0a0a0a]">
                  <OptimizedImage
                    src={photo.src}
                    alt={`${photo.alt} — fotograf ${city.preposition} ${city.name}`}
                    fill
                    loading="lazy"
                    quality={IMAGE_QUALITY.gallery}
                    className="object-cover transition-transform duration-700 ease-premium hover:scale-[1.04]"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </li>
              </CityReveal>
            ))}
          </ul>
          <CityReveal delay={0.1}>
            <div className="mt-12 text-center">
              <Link
                href="/portfolio"
                className="text-xs tracking-[0.2em] text-white/50 uppercase transition-colors duration-500 ease-premium hover:text-white"
              >
                Se hele porteføljen
              </Link>
            </div>
          </CityReveal>
        </div>
      </section>

      {/* Services */}
      <section className={`${citySection} ${cityDivider}`} aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl">
          <CityReveal className="mb-16 text-center md:mb-20">
            <p className={sectionLabel}>Ydelser</p>
            <h2 id="services-heading" className={sectionTitle}>
              {city.servicesHeading}
            </h2>
            <p className={`mx-auto mt-7 max-w-2xl ${sectionBody}`}>{city.servicesIntro}</p>
          </CityReveal>

          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3 lg:gap-8">
            {cityServiceCategories.map((category, index) => {
              const Icon = category.icon !== "drone" ? serviceIcons[category.icon] : null;
              return (
                <CityReveal key={category.title} delay={index * 0.06}>
                  <article className="group h-full border border-white/5 p-8 transition-all duration-500 ease-premium hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.02] lg:p-10">
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-500 ease-premium group-hover:border-white/25 group-hover:text-white">
                      {Icon ? <Icon size={16} strokeWidth={1.5} /> : <DroneIcon />}
                    </div>
                    <h3 className="font-display text-xl font-light text-white">{category.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/45">
                      {applyCityName(category.description, city.name)}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {category.items.map((item) => (
                        <li
                          key={item}
                          className="border border-white/10 px-3 py-1.5 text-xs tracking-wide text-white/55 transition-colors duration-500 group-hover:border-white/15"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                </CityReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className={`${citySection} ${cityDivider}`} aria-labelledby="why-heading">
        <div className="mx-auto max-w-7xl">
          <CityReveal className="mb-16 text-center md:mb-20">
            <p className={sectionLabel}>Samarbejde</p>
            <h2 id="why-heading" className={sectionTitle}>
              Hvorfor vælge mig?
            </h2>
            <p className={`mx-auto mt-7 max-w-xl ${sectionBody}`}>
              Jeg arbejder med private, virksomheder, sport og events — og gør det nemt at få
              professionel fotografering, videoproduktion og droneflyvning fra én kontakt.
            </p>
          </CityReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            {whyChoose.map((point, index) => {
              const Icon = whyIcons[point.icon];
              return (
                <CityReveal key={point.title} delay={index * 0.08}>
                  <article className="group h-full border border-white/5 p-8 transition-all duration-500 ease-premium hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.02] lg:p-10">
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-500 ease-premium group-hover:border-white/25 group-hover:text-white">
                      <Icon size={16} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-xl font-light text-white">{point.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/45">{point.description}</p>
                  </article>
                </CityReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* References */}
      {references.length > 0 && (
        <section className={`${citySection} ${cityDivider}`} aria-labelledby="references-heading">
          <div className="mx-auto max-w-7xl">
            <CityReveal>
              <h2
                id="references-heading"
                className="font-display text-2xl font-light text-white md:text-3xl lg:text-4xl"
              >
                Referencer i området
              </h2>
            </CityReveal>
            <div className="mt-14 space-y-12">
              {references.map((reference, index) => (
                <CityReveal key={reference.slug} delay={index * 0.1}>
                  <CityReferenceCard reference={reference} />
                </CityReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Booking form */}
      <section
        id="foresporgsel"
        className={`${citySection} scroll-mt-24 lg:scroll-mt-28`}
        aria-labelledby="inquiry-heading"
      >
        <div className="mx-auto max-w-3xl">
          <CityReveal className="mb-16 text-center">
            <p className={sectionLabel}>Forespørgsel</p>
            <h2
              id="inquiry-heading"
              className="font-display text-3xl font-light leading-tight text-white md:text-4xl lg:text-5xl"
            >
              Få et uforpligtende tilbud
            </h2>
            <p className={`mx-auto mt-7 max-w-xl ${sectionBody}`}>
              Fortæl mig om dit projekt {city.preposition} {city.name} — jeg guider dig trin for trin og vender tilbage hurtigst muligt.
            </p>
          </CityReveal>
          <CityReveal delay={0.1}>
            <InquiryWizard />
          </CityReveal>
        </div>
      </section>

      <nav aria-label="Relaterede sider" className="sr-only">
        <ul>
          <li>
            <Link href="/ydelser/fotografering">Fotografering</Link>
          </li>
          <li>
            <Link href="/ydelser/videoproduktion">Videoproduktion</Link>
          </li>
          <li>
            <Link href="/ydelser/drone">Droneflyvning</Link>
          </li>
          <li>
            <Link href="/portfolio">Portefølje</Link>
          </li>
          <li>
            <Link href="/referencer">Referencer</Link>
          </li>
          <li>
            <Link href="/kontakt">Kontakt</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
