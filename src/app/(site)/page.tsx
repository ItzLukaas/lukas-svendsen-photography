import type { Metadata } from "next";

import { HomePage } from "@/components/home/home-page";
import { siteConfig } from "@/lib/site";

const title = "Lukas Svendsen | Fotograf, Videograf & Dronepilot";
const ogImage = {
  url: "/images/hero-poster.jpg",
  width: 1920,
  height: 1080,
  alt: "Droneoptagelse over landskab i Jylland — fotograf og dronepilot Lukas Svendsen",
};

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
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
    images: [{ url: ogImage.url, alt: ogImage.alt }],
  },
};

export default function Page() {
  return <HomePage />;
}
