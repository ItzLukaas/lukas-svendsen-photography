import type { Metadata } from "next";

import { WhatIDoPageView } from "@/components/services/what-i-do-page-view";
import {
  pageBreadcrumbJsonLd,
  pageMetadata,
  simplePageJsonLd,
} from "@/lib/seo";
import { getPageSeo } from "@/lib/seo-copy";

const seo = getPageSeo("da");

export const metadata: Metadata = pageMetadata({
  title: seo.hvadJegLaver.title,
  description: seo.hvadJegLaver.description,
  path: "/hvad-jeg-laver",
  locale: "da",
});

export default function HvadJegLaverPage() {
  const jsonLd = simplePageJsonLd({
    path: "/hvad-jeg-laver",
    name: seo.hvadJegLaver.title,
    description: seo.hvadJegLaver.description,
    type: "WebPage",
    mainEntityId: "service",
    locale: "da",
  });
  const breadcrumbJsonLd = pageBreadcrumbJsonLd([
    { name: "Forside", path: "/" },
    { name: "Hvad jeg laver", path: "/hvad-jeg-laver" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <WhatIDoPageView />
    </>
  );
}
