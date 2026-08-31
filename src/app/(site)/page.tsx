import type { Metadata } from "next";

import { HomePage } from "@/components/home/home-page";
import { defaultShareImage } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const title =
  "Fotograf & videograf i Grindsted, Billund og Vejle | Lukas Svendsen";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [defaultShareImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
    images: [{ url: defaultShareImage.url, alt: defaultShareImage.alt }],
  },
};

export default function Page() {
  return <HomePage />;
}
