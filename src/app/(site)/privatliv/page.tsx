import type { Metadata } from "next";

import { PrivacyPageView } from "@/components/legal/privacy-page-view";
import { pageMetadata } from "@/lib/seo";
import { getPageSeo } from "@/lib/seo-copy";

const seo = getPageSeo("da");

export const metadata: Metadata = {
  ...pageMetadata({
    title: seo.privatliv.title,
    description: seo.privatliv.description,
    path: "/privatliv",
    locale: "da",
  }),
  robots: { index: false, follow: true },
};

export default function PrivatlivPage() {
  return <PrivacyPageView />;
}
