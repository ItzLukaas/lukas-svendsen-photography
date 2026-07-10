import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Cookiebot } from "@/components/seo/Cookiebot";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { siteConfig } from "@/data/photos";
import { rootGraphJsonLd } from "@/lib/json-ld";
import { defaultIcons } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
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
        <Cookiebot />
      </head>
      <body className="bg-[#0a0a0a] text-white antialiased">
        <GoogleAnalytics />
        <JsonLd data={rootGraphJsonLd()} />
        <MotionProvider>
          <a href="#main-content" className="skip-link">
            Spring til indhold
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
