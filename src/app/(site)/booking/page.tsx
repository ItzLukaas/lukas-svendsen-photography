import type { Metadata } from "next";

import { BookingPageView } from "@/components/booking/booking-page-view";
import {
  pageBreadcrumbJsonLd,
  pageMetadata,
  simplePageJsonLd,
} from "@/lib/seo";
import { getPageSeo } from "@/lib/seo-copy";

const seo = getPageSeo("da");

export const metadata: Metadata = pageMetadata({
  title: seo.booking.title,
  description: seo.booking.description,
  path: "/booking",
  locale: "da",
});

export default function BookingPage() {
  const jsonLd = simplePageJsonLd({
    path: "/booking",
    name: seo.booking.title,
    description: seo.booking.description,
    type: "WebPage",
    mainEntityId: "service",
    locale: "da",
  });
  const breadcrumbJsonLd = pageBreadcrumbJsonLd([
    { name: "Forside", path: "/" },
    { name: "Book mig", path: "/booking" },
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
      <BookingPageView />
    </>
  );
}
