import type { Metadata } from "next";

import { WhatIDoPageView } from "@/components/services/what-i-do-page-view";
import {
  pageBreadcrumbJsonLd,
  pageMetadata,
  simplePageJsonLd,
} from "@/lib/seo";
import { getPageSeo } from "@/lib/seo-copy";

const seo = getPageSeo("en");

export const metadata: Metadata = pageMetadata({
  title: seo.hvadJegLaver.title,
  description: seo.hvadJegLaver.description,
  path: "/en/what-i-do",
  locale: "en",
});

export default function EnglishWhatIDoPage() {
  const jsonLd = simplePageJsonLd({
    path: "/en/what-i-do",
    name: seo.hvadJegLaver.title,
    description: seo.hvadJegLaver.description,
    type: "WebPage",
    mainEntityId: "service",
    locale: "en",
  });
  const breadcrumbJsonLd = pageBreadcrumbJsonLd([
    { name: "Home", path: "/en" },
    { name: "What I Do", path: "/en/what-i-do" },
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
