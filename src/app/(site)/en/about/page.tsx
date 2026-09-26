import type { Metadata } from "next";

import { AboutPageView } from "@/components/about/about-page-view";
import {
  pageBreadcrumbJsonLd,
  pageMetadata,
  simplePageJsonLd,
} from "@/lib/seo";
import { getPageSeo } from "@/lib/seo-copy";

const seo = getPageSeo("en");

export const metadata: Metadata = pageMetadata({
  title: seo.om.title,
  description: seo.om.description,
  path: "/en/about",
  locale: "en",
});

export default function EnglishAboutPage() {
  const jsonLd = simplePageJsonLd({
    path: "/en/about",
    name: seo.om.title,
    description: seo.om.description,
    type: "AboutPage",
    locale: "en",
  });
  const breadcrumbJsonLd = pageBreadcrumbJsonLd([
    { name: "Home", path: "/en" },
    { name: "About", path: "/en/about" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AboutPageView />
    </>
  );
}
