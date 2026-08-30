import type { Metadata, Viewport } from "next";
import { Instrument_Sans } from "next/font/google";

import { CustomScrollbarLazy } from "@/components/layout/custom-scrollbar-lazy";
import { openingHoursJsonLd, serviceAreaPlaces } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

import "./globals.css";

/**
 * Single refined sans for UI + headings — editorial, calm, modern.
 * Headings use medium/semibold via .font-display (not ultra-bold).
 */
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Fotograf i Grindsted — koncert, sport og events | Lukas Svendsen",
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [
    "Lukas Svendsen",
    "fotograf Grindsted",
    "koncertfotograf",
    "sportsfotograf",
    "eventfotograf",
    "videograf",
    "dronefotograf",
    "videoproduktion",
  ],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Fotograf i Grindsted — koncert, sport og events | Lukas Svendsen",
    description: siteConfig.description,
    images: [
      {
        url: "/images/og-share.jpg",
        width: 1200,
        height: 630,
        alt: "Hvid kirke under blå himmel — fotografi af Lukas Svendsen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fotograf i Grindsted — koncert, sport og events | Lukas Svendsen",
    description: siteConfig.description,
    images: [
      {
        url: "/images/og-share.jpg",
        alt: "Hvid kirke under blå himmel — fotografi af Lukas Svendsen",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f4f1",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const areaServed = serviceAreaPlaces.map((place) => ({
  "@type": place.type,
  name: place.name,
}));

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.name,
      alternateName: ["Lukas Guldager Svendsen", "Lukas Svendsen Photography"],
      url: siteConfig.url,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      jobTitle: "Fotograf og videograf",
      description: siteConfig.description,
      image: `${siteConfig.url}/images/about-lukas-2026.jpg`,
      homeLocation: {
        "@type": "Place",
        name: "Grindsted",
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.location.street,
          postalCode: siteConfig.location.postalCode,
          addressLocality: siteConfig.location.city,
          addressRegion: "Syddanmark",
          addressCountry: "DK",
        },
      },
      knowsAbout: [
        "Fotografering",
        "Content creation",
        "Videoproduktion",
        "Droneproduktion",
        "Koncertfotografi",
        "Festivalfotografi",
        "Eventfotografi",
        "Sportsfotografi",
        "Virksomhedsfotografi",
        "Brand content",
        ...siteConfig.disciplines.map((item) => item.label),
      ],
      worksFor: { "@id": `${siteConfig.url}/#organization` },
      sameAs: [
        siteConfig.social.instagram,
        siteConfig.social.facebook,
        siteConfig.social.linkedin,
      ],
    },
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/apple-icon`,
        width: 180,
        height: 180,
      },
      email: siteConfig.email,
      telephone: siteConfig.phone,
      founder: { "@id": `${siteConfig.url}/#person` },
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.location.street,
        postalCode: siteConfig.location.postalCode,
        addressLocality: siteConfig.location.city,
        addressRegion: "Syddanmark",
        addressCountry: "DK",
      },
      areaServed,
      sameAs: [
        siteConfig.social.instagram,
        siteConfig.social.facebook,
        siteConfig.social.linkedin,
      ],
    },
    {
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": `${siteConfig.url}/#service`,
      name: `${siteConfig.name} — Fotograf i Grindsted`,
      alternateName: "Lukas Svendsen Photography",
      url: siteConfig.url,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      image: `${siteConfig.url}/images/about-lukas-2026.jpg`,
      description: siteConfig.description,
      provider: { "@id": `${siteConfig.url}/#person` },
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.location.street,
        postalCode: siteConfig.location.postalCode,
        addressLocality: siteConfig.location.city,
        addressRegion: "Syddanmark",
        addressCountry: "DK",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 55.761746,
        longitude: 8.953157,
      },
      areaServed,
      sameAs: [
        siteConfig.social.instagram,
        siteConfig.social.facebook,
        siteConfig.social.linkedin,
      ],
      openingHoursSpecification: openingHoursJsonLd(),
      serviceType: [
        "Koncert- og festivalfotografi",
        "Event- og erhvervsfotografi",
        "Sportsfotografi",
        "Business & brand content",
        "Contentproduktion",
        "Video & content",
        "Fotografering",
        "Videoproduktion",
        "Droneproduktion",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Foto, video, drone og content fra Grindsted",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Koncert & festival",
              description:
                "Koncert- og festivalfotografi — artister, publikum og stemning.",
              areaServed,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Event & erhverv",
              description:
                "Eventfotografi til virksomheder og arrangementer i Jylland.",
              areaServed,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Sport",
              description:
                "Sportsfotografi med fokus på action, jubel og afgørende øjeblikke.",
              areaServed,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Contentproduktion",
              description:
                "Skræddersyet content til web, SoMe, kampagner, events og brands.",
              areaServed,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Video & drone",
              description:
                "Aftermovies, film, branded video og droneoptagelser.",
              areaServed,
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: "da-DK",
      publisher: { "@id": `${siteConfig.url}/#organization` },
      about: { "@id": `${siteConfig.url}/#person` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="da"
      className={`${instrumentSans.variable} h-full overflow-hidden`}
    >
      <body className="h-full overflow-hidden bg-paper font-sans text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink focus:outline focus:outline-2 focus:outline-ink focus:outline-offset-2"
        >
          Spring til indhold
        </a>
        {/* Element scrollport — custom scrollbar CSS applies reliably here */}
        <div
          id="site-scroll"
          className="h-full overflow-x-hidden overflow-y-scroll"
        >
          {children}
        </div>
        <CustomScrollbarLazy />
      </body>
    </html>
  );
}
