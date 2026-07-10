import { siteConfig } from "@/data/photos";

export const SITE_LAST_MODIFIED = "2026-07-10";

export function absoluteAssetUrl(path: string) {
  return path.startsWith("http") ? path : `${siteConfig.url}${path}`;
}

export const LOCAL_BUSINESS_ID = `${siteConfig.url}/#localbusiness`;

export const mainNavigation = [
  { name: "Portefølje", path: "/portfolio" },
  { name: "Referencer", path: "/referencer" },
  { name: "Ydelser", path: "/ydelser" },
  { name: "Om mig", path: "/om-mig" },
  { name: "Kontakt", path: "/kontakt" },
  { name: "Få et tilbud", path: "/#foresporgsel" },
] as const;

function absoluteUrl(path: string) {
  return absoluteAssetUrl(path);
}

function postalAddress() {
  return {
    "@type": "PostalAddress" as const,
    addressLocality: siteConfig.address.addressLocality,
    addressRegion: siteConfig.address.addressRegion,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.addressCountry,
  };
}

function geoCoordinates() {
  return {
    "@type": "GeoCoordinates" as const,
    latitude: siteConfig.geo.latitude,
    longitude: siteConfig.geo.longitude,
  };
}

function contactPoint(areaServed: string | string[] = "DK") {
  return {
    "@type": "ContactPoint" as const,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    contactType: "customer service",
    areaServed,
    availableLanguage: ["Danish"],
  };
}

function offerCatalog() {
  return {
    "@type": "OfferCatalog" as const,
    name: "Fotografi og videoproduktion",
    itemListElement: siteConfig.services.map((service) => ({
      "@type": "Offer" as const,
      itemOffered: {
        "@type": "Service" as const,
        name: service,
        provider: { "@id": `${siteConfig.url}/#person` },
      },
    })),
  };
}

type LocalBusinessOptions = {
  url?: string;
  id?: string;
  name?: string;
  description?: string;
};

/** Primary LocalBusiness entity — used site-wide in layout */
export function primaryLocalBusinessJsonLd(options: LocalBusinessOptions = {}) {
  const areaServed = siteConfig.areaServed.map((city) => ({
    "@type": "City" as const,
    name: city,
  }));

  return {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": options.id ?? LOCAL_BUSINESS_ID,
    name: options.name ?? `${siteConfig.name} — Fotograf & videoproducent`,
    alternateName: siteConfig.name,
    url: options.url ?? siteConfig.url,
    image: [absoluteUrl(siteConfig.ogImage)],
    logo: absoluteUrl("/icon"),
    description: options.description ?? siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "$$",
    currenciesAccepted: "DKK",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    address: postalAddress(),
    geo: geoCoordinates(),
    areaServed,
    founder: { "@id": `${siteConfig.url}/#person` },
    parentOrganization: { "@id": `${siteConfig.url}/#organization` },
    contactPoint: contactPoint(),
    sameAs: [siteConfig.instagram],
    knowsAbout: siteConfig.services,
    hasOfferCatalog: offerCatalog(),
    inLanguage: "da-DK",
  };
}

/** City-specific LocalBusiness for SEO landing pages */
export function localBusinessJsonLd({
  cityName,
  path,
  description,
}: {
  cityName: string;
  path: string;
  description: string;
}) {
  const pageUrl = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${pageUrl}#localbusiness`,
    name: `${siteConfig.name} — Fotograf i ${cityName}`,
    alternateName: `Fotograf ${cityName}`,
    url: pageUrl,
    image: [absoluteUrl(siteConfig.ogImage)],
    logo: absoluteUrl("/icon"),
    description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "$$",
    currenciesAccepted: "DKK",
    address: postalAddress(),
    geo: geoCoordinates(),
    areaServed: {
      "@type": "City",
      name: cityName,
    },
    contactPoint: contactPoint(cityName),
    sameAs: [siteConfig.instagram],
    knowsAbout: siteConfig.services,
    hasOfferCatalog: offerCatalog(),
    founder: { "@id": `${siteConfig.url}/#person` },
    parentOrganization: { "@id": LOCAL_BUSINESS_ID },
    inLanguage: "da-DK",
  };
}

/** ContactPage schema for /kontakt */
export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${siteConfig.url}/kontakt#webpage`,
    url: `${siteConfig.url}/kontakt`,
    name: `Kontakt | ${siteConfig.name}`,
    description:
      "Kontakt Lukas Svendsen for fotografering, videoproduktion og droneflyvning i Midt- og Syddanmark.",
    inLanguage: "da-DK",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": LOCAL_BUSINESS_ID },
    mainEntity: { "@id": LOCAL_BUSINESS_ID },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function webPageJsonLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(path),
    inLanguage: "da-DK",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": LOCAL_BUSINESS_ID },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function rootGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "da-DK",
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": ["Person", "Photographer"],
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.name,
        url: siteConfig.url,
        image: absoluteUrl(siteConfig.ogImage),
        jobTitle: siteConfig.jobTitle,
        description: siteConfig.description,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        address: postalAddress(),
        sameAs: [siteConfig.instagram],
        worksFor: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: absoluteUrl("/icon"),
        image: absoluteUrl(siteConfig.ogImage),
        description: siteConfig.description,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        address: postalAddress(),
        sameAs: [siteConfig.instagram],
        contactPoint: contactPoint(),
        areaServed: siteConfig.areaServed.map((city) => ({
          "@type": "City" as const,
          name: city,
        })),
      },
      primaryLocalBusinessJsonLd(),
      {
        "@type": "ItemList",
        "@id": `${siteConfig.url}/#navigation`,
        name: "Hovednavigation",
        itemListElement: mainNavigation.map((item, index) => ({
          "@type": "SiteNavigationElement",
          position: index + 1,
          name: item.name,
          url: absoluteUrl(item.path),
        })),
      },
    ],
  };
}

export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${siteConfig.url}/#webpage`,
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        inLanguage: "da-DK",
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        about: { "@id": LOCAL_BUSINESS_ID },
        mainEntity: { "@id": LOCAL_BUSINESS_ID },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl(siteConfig.ogImage),
          width: siteConfig.ogImageWidth,
          height: siteConfig.ogImageHeight,
          caption: `${siteConfig.name} — fotograf og videoproducent`,
        },
      },
      {
        "@type": "ImageGallery",
        name: "Udvalgt portefølje",
        url: absoluteUrl("/portfolio"),
        author: { "@id": `${siteConfig.url}/#person` },
      },
    ],
  };
}

export function imageObjectJsonLd({
  src,
  alt,
  width,
  height,
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}) {
  const url = absoluteAssetUrl(src);

  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: url,
    url,
    name: alt,
    caption: caption ?? alt,
    width,
    height,
    creator: { "@id": `${siteConfig.url}/#person` },
    copyrightHolder: { "@id": `${siteConfig.url}/#person` },
  };
}

export function portfolioGalleryJsonLd(
  images: { src: string; alt: string; width: number; height: number }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Portefølje — Lukas Svendsen",
    description:
      "Sportsfotografi, eventfoto og visuelt indhold fra fotograf Lukas Svendsen i Midt- og Syddanmark.",
    url: absoluteAssetUrl("/portfolio"),
    author: { "@id": `${siteConfig.url}/#person` },
    image: images.map((image) => ({
      "@type": "ImageObject",
      contentUrl: absoluteAssetUrl(image.src),
      name: image.alt,
      width: image.width,
      height: image.height,
      creator: { "@id": `${siteConfig.url}/#person` },
    })),
  };
}

export function referenceArticleJsonLd({
  title,
  description,
  path,
  coverImage,
  datePublished,
}: {
  title: string;
  description: string;
  path: string;
  coverImage: { src: string; alt: string; width: number; height: number };
  datePublished?: string;
}) {
  const pageUrl = absoluteAssetUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: title,
    description,
    url: pageUrl,
    image: {
      "@type": "ImageObject",
      url: absoluteAssetUrl(coverImage.src),
      width: coverImage.width,
      height: coverImage.height,
      caption: coverImage.alt,
    },
    author: { "@id": `${siteConfig.url}/#person` },
    publisher: { "@id": LOCAL_BUSINESS_ID },
    datePublished: datePublished ?? SITE_LAST_MODIFIED,
    dateModified: SITE_LAST_MODIFIED,
    inLanguage: "da-DK",
    mainEntityOfPage: pageUrl,
  };
}
