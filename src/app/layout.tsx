import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Instrument_Sans } from "next/font/google";

import { CustomScrollbarLazy } from "@/components/layout/custom-scrollbar-lazy";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import { rootEntityGraphJsonLd, rootLayoutMetadata } from "@/lib/seo";
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

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  return rootLayoutMetadata(locale);
}

export const viewport: Viewport = {
  themeColor: "#f5f4f1",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getRequestLocale();
  const htmlLang = locale === "en" ? "en" : "da";
  const jsonLd = rootEntityGraphJsonLd(locale);

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
      {siteConfig.gaId ? <GoogleAnalytics gaId={siteConfig.gaId} /> : null}
    </html>
  );
}
