import type { Metadata } from "next";

import { NotFoundView } from "@/components/layout/not-found-view";
import { getPageSeo } from "@/lib/seo-copy";

const seo = getPageSeo("da");

export const metadata: Metadata = {
  title: seo.notFound.title,
  description: seo.notFound.description,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundView />;
}
