import type { Metadata } from "next";

import { BookingPageView } from "@/components/booking/booking-page-view";
import {
  pageBreadcrumbJsonLd,
  pageMetadata,
  simplePageJsonLd,
} from "@/lib/seo";
import { getPageSeo } from "@/lib/seo-copy";

const seo = getPageSeo("en");

export const metadata: Metadata = pageMetadata({
  title: seo.booking.title,
  description: seo.booking.description,
  path: "/en/booking",
  locale: "en",
});

export default function EnglishBookingPage() {
  const jsonLd = simplePageJsonLd({
    path: "/en/booking",
    name: seo.booking.title,
    description: seo.booking.description,
    type: "WebPage",
    mainEntityId: "service",
    locale: "en",
  });
  const breadcrumbJsonLd = pageBreadcrumbJsonLd([
    { name: "Home", path: "/en" },
    { name: "Book me", path: "/en/booking" },
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
