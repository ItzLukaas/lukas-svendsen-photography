import type { Metadata, Viewport } from "next";
import { Instrument_Sans } from "next/font/google";

import { CustomScrollbarLazy } from "@/components/layout/custom-scrollbar-lazy";
import { getRequestLocale } from "@/lib/i18n/request-locale";
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
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.homeTitle,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.seo.homeDescription,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [
    "Lukas Svendsen",
    "fotograf",
    "videograf",
    "fotograf Grindsted",
    "videograf Danmark",
    "foto og video",
    "videoproduktion",
    "dronefoto",
    "contentproduktion",
    "sportsfotografi",
    "koncertfotografi",
  ],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.seo.homeTitle,
    description: siteConfig.seo.homeDescription,
    images: [
      {
        url: "/images/og-share.jpg",
        width: 1200,
        height: 630,
        alt: "Lukas Svendsen, fotograf og videoproducent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.homeTitle,
    description: siteConfig.seo.homeDescription,
    images: [
      {
        url: "/images/og-share.jpg",
        alt: "Lukas Svendsen, fotograf og videoproducent",
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
  icons: {
    icon: [{ url: "/brand/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/brand/apple-icon.svg", sizes: "180x180" }],
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
      "@type": ["Person", "Photographer"],
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.name,
      alternateName: ["Lukas Guldager Svendsen", "Lukas Svendsen Photography"],
      url: siteConfig.url,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      jobTitle: "Fotograf og videograf / Photographer and videographer",
      knowsLanguage: ["da", "en"],
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
        "Videoproduktion",
        "Droneproduktion",
        "Contentproduktion",
        "Sportsfotografi",
        "Koncertfotografi",
        "Eventfotografi",
        "Virksomhedsfotografering",
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
        url: `${siteConfig.url}/brand/apple-icon.svg`,
        width: 180,
        height: 180,
      },
      image: `${siteConfig.url}/images/og-share.jpg`,
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
      "@type": ["ProfessionalService", "LocalBusiness", "Photographer"],
      "@id": `${siteConfig.url}/#service`,
      name: siteConfig.name,
      alternateName: [
        "Lukas Svendsen Photography",
        "Lukas Svendsen Fotograf og Videoproducent",
      ],
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
        "Fotografering",
        "Videoproduktion",
        "Droneproduktion",
        "Contentproduktion",
        "Sportsfotografi",
        "Koncert- og eventfotografi",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Foto, video, drone og content",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Fotografering",
              description:
                "Professionelle stillebilleder til virksomheder, organisationer og private, der har brug for materiale med et klart og professionelt udtryk.",
              areaServed,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Videoproduktion",
              description:
                "Film og bevægeligt materiale til kommunikation, kampagner og digitale kanaler, der skal kunne bruges direkte efter levering.",
              areaServed,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Droneproduktion",
              description:
                "Luftfoto og luftvideo som en naturlig del af foto og videoproduktion, når opgaven kræver perspektiv fra oven.",
              areaServed,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Contentproduktion",
              description:
                "Visuelt materiale til web, sociale medier og løbende kommunikation, produceret så det kan bruges i praksis.",
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

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getRequestLocale();
  const htmlLang = locale === "en" ? "en" : "da";

  return (
    <html
      lang={htmlLang}
      className={`${instrumentSans.variable} h-full overflow-hidden`}
    >
      <body className="h-full overflow-hidden bg-paper font-sans text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
