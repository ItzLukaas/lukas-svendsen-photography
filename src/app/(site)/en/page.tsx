import type { Metadata } from "next";

import { HomePage } from "@/components/home/home-page";
import { pageMetadata } from "@/lib/seo";
import { getPageSeo } from "@/lib/seo-copy";

const seo = getPageSeo("en");

export const metadata: Metadata = pageMetadata({
  title: seo.home.title,
  description: seo.home.description,
  path: "/en",
  locale: "en",
});

export default function EnglishHomePage() {
  return <HomePage locale="en" />;
}
