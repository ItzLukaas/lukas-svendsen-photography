import type { Metadata } from "next";

import { HomePage } from "@/components/home/home-page";
import { defaultShareImage } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const title = `${siteConfig.seo.homeTitle} | ${siteConfig.name}`;

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description: siteConfig.seo.homeDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title,
    description: siteConfig.seo.homeDescription,
    url: siteConfig.url,
    images: [defaultShareImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.seo.homeDescription,
    images: [{ url: defaultShareImage.url, alt: defaultShareImage.alt }],
  },
};

export default function Page() {
  return <HomePage />;
}
