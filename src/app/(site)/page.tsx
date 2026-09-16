import type { Metadata } from "next";

import { HomePage } from "@/components/home/home-page";
import { pageMetadata } from "@/lib/seo";
import { pageSeo } from "@/lib/seo-copy";

export const metadata: Metadata = pageMetadata({
  title: pageSeo.home.title,
  description: pageSeo.home.description,
  path: "/",
});

export default function Page() {
  return <HomePage />;
}
