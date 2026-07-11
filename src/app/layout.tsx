import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Cookiebot } from "@/components/seo/Cookiebot";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { siteConfig } from "@/data/photos";
import { rootGraphJsonLd, standaloneLocalBusinessJsonLd } from "@/lib/json-ld";
import { defaultIcons } from "@/lib/seo";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "block",
  preload: true,
  adjustFontFallback: true,
});

/** Reveal after DOM ready — rules live in globals.css */
const antiFoucScript = `(function(){var d=document.documentElement;if(d.classList.contains("app-ready"))return;function r(){d.classList.add("app-ready")}Promise.race([new Promise(function(e){if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",e,{once:true});else e()}),new Promise(function(e){setTimeout(e,500)})]).then(function(){if(document.fonts&&document.fonts.ready)return document.fonts.ready.then(r,r);r()})})();`;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "photography",
  icons: defaultIcons,
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "da_DK",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — fotograf, videograf og dronepilot i Grindsted og Billund`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/opengraph-image"],
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
  alternates: {
    canonical: siteConfig.url,
    types: {
      "application/xml": "/sitemap.xml",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="da"
      className={inter.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: antiFoucScript }} />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: "html{visibility:visible!important}" }} />
        </noscript>
        <Cookiebot />
        <GoogleAnalytics />
        <JsonLd data={standaloneLocalBusinessJsonLd()} />
        <JsonLd data={rootGraphJsonLd()} />
      </head>
      <body
        className={`${inter.className} grain-overlay bg-background text-foreground antialiased`}
      >
        <ThemeProvider>
          <MotionProvider>
            <a href="#main-content" className="skip-link">
              Spring til indhold
            </a>
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
