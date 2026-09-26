import type { Metadata } from "next";

import { HomePage } from "@/components/home/home-page";
import { pageMetadata } from "@/lib/seo";
import { getPageSeo } from "@/lib/seo-copy";

const seo = getPageSeo("da");

export const metadata: Metadata = pageMetadata({
  title: seo.home.title,
  description: seo.home.description,
  path: "/",
  locale: "da",
});

export default function Page() {
  return <HomePage locale="da" />;
}
