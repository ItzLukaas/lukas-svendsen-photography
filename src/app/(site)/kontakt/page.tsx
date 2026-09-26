import type { Metadata } from "next";

import { ContactPageView } from "@/components/contact/contact-page-view";
import {
  pageBreadcrumbJsonLd,
  pageMetadata,
  simplePageJsonLd,
} from "@/lib/seo";
import { getPageSeo } from "@/lib/seo-copy";

const seo = getPageSeo("da");

export const metadata: Metadata = pageMetadata({
  title: seo.kontakt.title,
  description: seo.kontakt.description,
  path: "/kontakt",
  locale: "da",
});

export default function KontaktPage() {
  const jsonLd = simplePageJsonLd({
    path: "/kontakt",
    name: seo.kontakt.title,
    description: seo.kontakt.description,
    type: "ContactPage",
    mainEntityId: "service",
    locale: "da",
  });
  const breadcrumbJsonLd = pageBreadcrumbJsonLd([
    { name: "Forside", path: "/" },
    { name: "Kontakt", path: "/kontakt" },
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
