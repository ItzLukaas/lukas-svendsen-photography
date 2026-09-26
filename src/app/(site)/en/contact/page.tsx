import type { Metadata } from "next";

import { ContactPageView } from "@/components/contact/contact-page-view";
import {
  pageBreadcrumbJsonLd,
  pageMetadata,
  simplePageJsonLd,
} from "@/lib/seo";
import { getPageSeo } from "@/lib/seo-copy";

const seo = getPageSeo("en");

export const metadata: Metadata = pageMetadata({
  title: seo.kontakt.title,
  description: seo.kontakt.description,
  path: "/en/contact",
  locale: "en",
});

export default function EnglishContactPage() {
  const jsonLd = simplePageJsonLd({
    path: "/en/contact",
    name: seo.kontakt.title,
    description: seo.kontakt.description,
    type: "ContactPage",
    mainEntityId: "service",
    locale: "en",
  });
  const breadcrumbJsonLd = pageBreadcrumbJsonLd([
    { name: "Home", path: "/en" },
    { name: "Contact", path: "/en/contact" },
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
      <ContactPageView />
    </>
  );
}
