import type { Metadata } from "next";

import { NotFoundView } from "@/components/layout/not-found-view";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import { getPageSeo } from "@/lib/seo-copy";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const seo = getPageSeo(locale);
  return {
    title: seo.notFound.title,
    description: seo.notFound.description,
    robots: { index: false, follow: true },
  };
}

export default function NotFound() {
  return <NotFoundView />;
}
