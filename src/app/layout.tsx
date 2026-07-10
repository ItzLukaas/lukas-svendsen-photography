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
  display: "block",
  preload: true,
  adjustFontFallback: true,
});

/** Inline in <head> — globals.css loads too late to prevent first-paint FOUC. */
const antiFoucCss = [
  "html{background-color:#0a0a0a;color-scheme:dark}",
  "html:not(.app-ready){visibility:hidden}",
  "html.app-ready{visibility:visible}",
  "html.app-ready body{animation:app-reveal .2s ease-out}",
  "@keyframes app-reveal{from{opacity:.98}to{opacity:1}}",
  "@media (prefers-reduced-motion:reduce){html.app-ready body{animation:none}}",
].join("");

const antiFoucScript = `(function(){var d=document.documentElement;if(d.classList.contains("app-ready"))return;function r(){d.classList.add("app-ready")}var f=document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve();Promise.race([Promise.all([new Promise(function(e){if(document.readyState==="complete")e();else window.addEventListener("load",e,{once:true})}),f]),new Promise(function(e){setTimeout(e,3e3)})]).then(r,r)})();`;

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
        <style dangerouslySetInnerHTML={{ __html: antiFoucCss }} />
        <script dangerouslySetInnerHTML={{ __html: antiFoucScript }} />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: "html{visibility:visible!important}" }} />
        </noscript>
        <Cookiebot />
        <GoogleAnalytics />
      </head>
      <body
        className={`${inter.className} bg-[#0a0a0a] text-white antialiased`}
      >
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
