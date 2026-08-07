import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";

import { CustomScrollbar } from "@/components/layout/custom-scrollbar";
import { serviceAreaPlaces } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-display",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Lukas Svendsen | Fotograf i Grindsted — Video & Drone",
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [
    "Lukas Svendsen",
    "fotograf Grindsted",
    "fotograf",
    "fotograf Billund",
    "fotograf Esbjerg",
    "fotograf Vejle",
    "fotograf Kolding",
    "eventfotograf Jylland",
    "koncertfotograf Danmark",
    "virksomhedsfotograf",
    "festivalfotograf",
    "sportfotograf",
    "videograf",
    "dronepilot",
    "Grindsted",
    "Billund",
    "Esbjerg",
    "Vejle",
    "Kolding",
    "Jylland",
  ],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Lukas Svendsen | Fotograf i Grindsted — Video & Drone",
    description: siteConfig.description,
    images: [
      {
        url: "/images/hero-poster.jpg",
        width: 1920,
        height: 1080,
        alt: "Droneoptagelse af fotograf Lukas Svendsen fra Grindsted",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lukas Svendsen | Fotograf i Grindsted — Video & Drone",
    description: siteConfig.description,
    images: [
      {
        url: "/images/hero-poster.jpg",
        alt: "Droneoptagelse af fotograf Lukas Svendsen fra Grindsted",
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
  themeColor: "#f4f4f2",
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
      url: siteConfig.url,
      email: siteConfig.email,
      jobTitle: "Fotograf, Videograf & Dronepilot",
      description: siteConfig.description,
      image: `${siteConfig.url}/images/about.jpg`,
      homeLocation: {
        "@type": "Place",
        name: "Grindsted",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Grindsted",
          addressRegion: "Syddanmark",
          addressCountry: "DK",
        },
      },
      knowsAbout: [
        "Fotografering",
        "Videoproduktion",
        "Droneproduktion",
        "Eventfotografi",
        "Festivalfotografi",
        "Koncertfotografi",
        "Sportsfotografi",
        "Virksomhedsfotografi",
        ...siteConfig.disciplines.map((item) => item.label),
      ],
      worksFor: { "@id": `${siteConfig.url}/#organization` },
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
      founder: { "@id": `${siteConfig.url}/#person` },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Grindsted",
        addressRegion: "Syddanmark",
        addressCountry: "DK",
      },
      areaServed,
    },
    {
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": `${siteConfig.url}/#service`,
      name: `${siteConfig.name} — Fotograf i Grindsted`,
      alternateName: "Lukas Svendsen Photography",
      url: siteConfig.url,
      email: siteConfig.email,
      image: `${siteConfig.url}/images/about.jpg`,
      description: siteConfig.description,
      priceRange: "$$",
      provider: { "@id": `${siteConfig.url}/#person` },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Grindsted",
        addressRegion: "Syddanmark",
        addressCountry: "DK",
      },
      areaServed,
      serviceType: [
        "Fotografering",
        "Videoproduktion",
        "Droneproduktion",
        "Eventfotografi",
        "Festivalfotografi",
        "Koncertfotografi",
        "Sportsfotografi",
        "Virksomhedsfotografi",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Fotografi- og videoydelser fra Grindsted",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Fotografering",
              description:
                "Koncert-, festival-, sport-, event- og virksomhedsfotografi fra Grindsted — også i Billund, Esbjerg, Vejle, Kolding og resten af Jylland.",
              areaServed: { "@type": "City", name: "Grindsted" },
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Videoproduktion",
              description:
                "Aftermovies, eventfilm og branded content fra Grindsted til hele Jylland.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Droneproduktion",
              description:
                "Luftfoto og dronevideo til events og brands — baseret i Grindsted.",
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
      className={`${plusJakarta.variable} ${syne.variable} h-full overflow-hidden`}
    >
      <body className="h-full overflow-hidden bg-paper text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:inline-block focus:h-auto focus:w-auto focus:overflow-visible focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink focus:outline focus:outline-2 focus:outline-ink focus:outline-offset-2"
        >
          Spring til indhold
        </a>
        {/* Element scrollport — custom scrollbar CSS applies reliably here */}
        <div id="site-scroll" className="h-full overflow-x-hidden overflow-y-scroll">
          {children}
        </div>
        <CustomScrollbar />
      </body>
    </html>
  );
}
