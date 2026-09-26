import type { Metadata } from "next";

import { AboutPageView } from "@/components/about/about-page-view";
import {
  pageBreadcrumbJsonLd,
  pageMetadata,
  simplePageJsonLd,
} from "@/lib/seo";
import { getPageSeo } from "@/lib/seo-copy";

const seo = getPageSeo("da");

export const metadata: Metadata = pageMetadata({
  title: seo.om.title,
  description: seo.om.description,
  path: "/om",
  locale: "da",
});

export default function OmPage() {
  const jsonLd = simplePageJsonLd({
    path: "/om",
    name: seo.om.title,
    description: seo.om.description,
    type: "AboutPage",
    locale: "da",
  });
  const breadcrumbJsonLd = pageBreadcrumbJsonLd([
    { name: "Forside", path: "/" },
    { name: "Om mig", path: "/om" },
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
