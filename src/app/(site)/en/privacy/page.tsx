import type { Metadata } from "next";

import { PrivacyPageView } from "@/components/legal/privacy-page-view";
import { pageMetadata } from "@/lib/seo";
import { getPageSeo } from "@/lib/seo-copy";

const seo = getPageSeo("en");

export const metadata: Metadata = {
  ...pageMetadata({
    title: seo.privatliv.title,
    description: seo.privatliv.description,
    path: "/en/privacy",
    locale: "en",
  }),
  robots: { index: false, follow: true },
};

export default function EnglishPrivacyPage() {
  return <PrivacyPageView />;
}
